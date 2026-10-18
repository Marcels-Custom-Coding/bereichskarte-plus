// Editor: eingebauter Bereichskarten-Editor plus eigene Abschnitte.
import { LitElement, html, css, nothing } from "lit";
import {
  KINDS,
  areaDomainIds,
  areaEntityIds,
  computeItem,
  formatState,
  formatWatt,
  pickClimate,
  pickPower,
  powerEntityIds,
  powerSum,
  sensorsFromConfig,
} from "./common.js";
import { SUN_TIP_DEFAULTS, angleDiff, directionName, sunPos } from "./sun.js";
import "./direction-map.js";
import { travelTimes } from "./travel.js";

const EDITOR = "bereichskarte-plus-editor";

const PATH_UP = "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";
const PATH_DOWN = "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z";
const PATH_DELETE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const PATH_PLUS = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";

const OWN_KEYS = ["sensors", "show_icons", "shutter_view", "climate_view", "view_timeout", "default_view"];

function dropField(schema, name) {
  return schema
    .filter((entry) => entry.name !== name)
    .map((entry) =>
      Array.isArray(entry.schema)
        ? { ...entry, schema: dropField(entry.schema, name) }
        : entry
    );
}

class BereichskartePlusEditor extends LitElement {
  static properties = {
    hass: { attribute: false },
    _config: { state: true },
  };

  setConfig(config) {
    this._config = config;
    this._native?.setConfig(this._nativeConfig(config));
  }

  _nativeConfig(config) {
    const rest = { ...config, type: "area" };
    for (const key of OWN_KEYS) delete rest[key];
    return rest;
  }

  _ensureNative() {
    if (this._native) return;
    const native = document.createElement("hui-area-card-editor");
    // Die Auswahl „Sensorklassen“ ersetzt diese Karte durch eine eigene Liste.
    const schema = native._schema;
    if (typeof schema === "function") {
      let lastIn;
      let lastOut;
      native._schema = (...args) => {
        const out = schema(...args);
        if (out !== lastIn) {
          lastIn = out;
          lastOut = dropField(out, "sensor_classes");
        }
        return lastOut;
      };
    }
    native.addEventListener("config-changed", (ev) => {
      ev.stopPropagation();
      const next = { ...ev.detail.config, type: this._config.type };
      delete next.sensor_classes;
      for (const key of OWN_KEYS) {
        if (this._config[key] !== undefined) next[key] = this._config[key];
      }
      this._fire(next);
    });
    native.hass = this.hass;
    native.setConfig(this._nativeConfig(this._config));
    this._native = native;
  }

  // Zustände ändern sich mehrmals pro Sekunde; der Editor muss nicht jedes
  // Mal alle Auswahlfelder neu aufbauen. Neue Entitäten, Bereiche oder
  // Sprache kommen sofort durch, reine Messwerte höchstens alle 1,5 s.
  shouldUpdate(changed) {
    if (this.hasUpdated && changed.size === 1 && changed.has("hass")) {
      const prev = changed.get("hass");
      const cur = this.hass;
      const structural =
        !prev ||
        !cur ||
        prev.entities !== cur.entities ||
        prev.devices !== cur.devices ||
        prev.areas !== cur.areas ||
        prev.localize !== cur.localize ||
        prev.themes !== cur.themes ||
        prev.config !== cur.config;
      const since = Date.now() - (this._hassRendered || 0);
      if (!structural && since < 1500) {
        if (!this._hassTimer) {
          this._hassTimer = setTimeout(() => {
            this._hassTimer = undefined;
            this.requestUpdate("hass", prev);
          }, 1500 - since);
        }
        return false;
      }
    }
    if (changed.has("hass")) this._hassRendered = Date.now();
    return true;
  }

  updated(changed) {
    if (changed.has("hass") && this._native) this._native.hass = this.hass;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    clearTimeout(this._hassTimer);
    this._hassTimer = undefined;
  }

  _fire(config) {
    this._config = config;
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config },
        bubbles: true,
        composed: true,
      })
    );
  }

  _setSensors(sensors) {
    const next = { ...this._config, sensors };
    delete next.sensor_classes;
    this._fire(next);
  }

  _updateItem(index, patch) {
    const sensors = [...sensorsFromConfig(this._config)];
    const item = { ...sensors[index], ...patch };
    for (const [key, value] of Object.entries(item)) {
      if (
        value === undefined ||
        value === "" ||
        (Array.isArray(value) && !value.length)
      ) {
        delete item[key];
      }
    }
    sensors[index] = item;
    this._setSensors(sensors);
  }

  _changeKind(index, type) {
    const sensors = [...sensorsFromConfig(this._config)];
    sensors[index] = { type };
    this._setSensors(sensors);
  }

  _move(index, delta) {
    const sensors = [...sensorsFromConfig(this._config)];
    const target = index + delta;
    if (target < 0 || target >= sensors.length) return;
    [sensors[index], sensors[target]] = [sensors[target], sensors[index]];
    this._setSensors(sensors);
  }

  _remove(index) {
    const sensors = [...sensorsFromConfig(this._config)];
    sensors.splice(index, 1);
    this._setSensors(sensors);
  }

  _add() {
    const sensors = [...sensorsFromConfig(this._config)];
    const used = new Set(sensors.map((s) => s.type));
    const type =
      ["temperature", "humidity", "power"].find((t) => !used.has(t)) ||
      "entity";
    sensors.push({ type });
    this._setSensors(sensors);
  }

  _togglePower(index, entityId, included) {
    const item = sensorsFromConfig(this._config)[index];
    const exclude = new Set(item.exclude || []);
    if (included) exclude.delete(entityId);
    else exclude.add(entityId);
    this._updateItem(index, { exclude: [...exclude] });
  }

  _name(entityId) {
    const stateObj = this.hass.states[entityId];
    return stateObj?.attributes.friendly_name || entityId;
  }

  // Gleiche Auswahl = gleiches Objekt, sonst baut HA die Listen bei jedem
  // Zustandswechsel neu auf (bei tausenden Entitäten spürbar langsam).
  _stable(selector) {
    this._selectors ||= new Map();
    const key = JSON.stringify(selector);
    if (!this._selectors.has(key)) this._selectors.set(key, selector);
    return this._selectors.get(key);
  }

  _selector(selector, value, label, helper, onChange) {
    selector = this._stable(selector);
    return html`<ha-selector
      .hass=${this.hass}
      .required=${false}
      .selector=${selector}
      .value=${value}
      .label=${label}
      .helper=${helper}
      @value-changed=${(ev) => {
        ev.stopPropagation();
        onChange(ev.detail.value);
      }}
    ></ha-selector>`;
  }

  _renderPower(item, index, area) {
    const inArea = areaEntityIds(this.hass, area?.area_id, "power");
    const exclude = new Set(item.exclude || []);
    const sum = powerSum(
      this.hass,
      powerEntityIds(this.hass, area?.area_id, item)
    );
    return html`
      <div class="hint">
        Alle Leistungssensoren im Bereich werden zusammengezählt. Schalte ab,
        was doppelt zählt (zum Beispiel ein Mittelwert-Sensor neben dem
        eigentlichen Messwert).
      </div>
      ${inArea.length
        ? html`<div class="power-list">
            ${inArea.map((id) => {
              const included = !exclude.has(id);
              return html`<label class="power-row ${included ? "" : "off"}">
                <ha-switch
                  .checked=${included}
                  @change=${(ev) =>
                    this._togglePower(index, id, ev.target.checked)}
                ></ha-switch>
                <span class="power-name" title=${id}>${this._name(id)}</span>
                <span class="power-value"
                  >${formatState(this.hass, this.hass.states[id]) ?? "–"}</span
                >
              </label>`;
            })}
          </div>`
        : html`<div class="hint">Im Bereich gibt es keine Leistungssensoren.</div>`}
      ${this._selector(
        {
          entity: {
            multiple: true,
            filter: { domain: "sensor", device_class: "power" },
          },
        },
        item.include || [],
        "Weitere Leistungssensoren",
        "Sensoren aus anderen Bereichen, die hier mitgezählt werden sollen.",
        (value) => this._updateItem(index, { include: value })
      )}
      <div class="total">
        Summe jetzt: <b>${sum === undefined ? "–" : formatWatt(this.hass, sum)}</b>
      </div>
    `;
  }

  _renderClimate(item, index, area) {
    const kind = KINDS[item.type];
    const areaSetting = area?.[`${item.type}_entity_id`];
    const fallback = areaSetting
      ? `Leer lassen: nimmt „${this._name(areaSetting)}“ aus den Bereichseinstellungen.`
      : `Leer lassen: Mittelwert aller ${kind.label}-Sensoren im Bereich.`;
    return this._selector(
      {
        entity: {
          filter: { domain: "sensor", device_class: kind.deviceClass },
        },
      },
      item.entity || "",
      "Sensor",
      fallback,
      (value) => this._updateItem(index, { entity: value })
    );
  }

  _renderItem(item, index, count, area) {
    const kind = KINDS[item.type] ? item.type : "entity";
    const current = area ? computeItem(this.hass, area, item).text : undefined;
    return html`
      <div class="item">
        <div class="item-head">
          <ha-icon
            class="item-icon"
            .icon=${item.icon || KINDS[kind].icon}
          ></ha-icon>
          <div class="item-kind">
            ${this._selector(
              {
                select: {
                  mode: "dropdown",
                  options: Object.entries(KINDS).map(([value, k]) => ({
                    value,
                    label: k.label,
                  })),
                },
              },
              kind,
              "Wert",
              undefined,
              (value) => value && value !== kind && this._changeKind(index, value)
            )}
          </div>
          <span class="current" title="Wird gerade so angezeigt"
            >${current ?? "–"}</span
          >
          <ha-icon-button
            .path=${PATH_UP}
            .label=${"Nach vorne"}
            title="Nach vorne"
            .disabled=${index === 0}
            @click=${() => this._move(index, -1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${PATH_DOWN}
            .label=${"Nach hinten"}
            title="Nach hinten"
            .disabled=${index === count - 1}
            @click=${() => this._move(index, 1)}
          ></ha-icon-button>
          <ha-icon-button
            .path=${PATH_DELETE}
            .label=${"Entfernen"}
            title="Entfernen"
            @click=${() => this._remove(index)}
          ></ha-icon-button>
        </div>
        <div class="item-body">
          ${kind === "power"
            ? this._renderPower(item, index, area)
            : kind === "entity"
              ? this._selector(
                  { entity: {} },
                  item.entity || "",
                  "Sensor",
                  "Zeigt den Zustand genau dieses Sensors.",
                  (value) => this._updateItem(index, { entity: value })
                )
              : this._renderClimate(item, index, area)}
          ${this._config.show_icons
            ? this._selector(
                { icon: { placeholder: KINDS[kind].icon } },
                item.icon || "",
                "Symbol",
                "Leer lassen für das Standardsymbol.",
                (value) => this._updateItem(index, { icon: value })
              )
            : nothing}
        </div>
      </div>
    `;
  }

  // ---------- Rollladen und Klima ----------

  _setSub(key, patch) {
    const sub = { ...(this._config[key] || {}), ...patch };
    for (const [k, v] of Object.entries(sub)) {
      if (v === undefined || v === "" || v === null) delete sub[k];
    }
    const next = { ...this._config, [key]: sub };
    if (!Object.keys(sub).length) delete next[key];
    this._fire(next);
  }

  _setTip(patch) {
    const tip = { ...(this._config.shutter_view?.sun_tip || {}), ...patch };
    for (const [k, v] of Object.entries(tip)) {
      if (v === undefined || v === "" || v === null) delete tip[k];
    }
    this._setSub("shutter_view", {
      sun_tip: Object.keys(tip).length ? tip : undefined,
    });
  }

  _num(min, max, step, unit, mode = "slider") {
    return { number: { min, max, step, mode, unit_of_measurement: unit } };
  }

  _sunNow(direction) {
    const { latitude, longitude } = this.hass.config;
    const sun = sunPos(new Date(), latitude, longitude);
    if (sun.el <= 0) return "Gerade ist die Sonne untergegangen.";
    const hits =
      typeof direction === "number" && angleDiff(sun.az, direction) < 70;
    return `Gerade steht die Sonne bei ${Math.round(sun.az)}° (${directionName(
      sun.az
    )}), ${Math.round(sun.el)}° hoch${
      typeof direction === "number"
        ? hits
          ? " und scheint auf dieses Fenster."
          : ", also nicht auf dieses Fenster."
        : "."
    }`;
  }

  _renderSunTip(sv) {
    const tip = sv.sun_tip || {};
    const on = Boolean(sv.sun_tip) && tip.enabled !== false;
    const d = SUN_TIP_DEFAULTS;
    const luxNow = tip.lux_entity
      ? formatState(this.hass, this.hass.states[tip.lux_entity])
      : undefined;
    return html`
      ${this._selector(
        { boolean: {} },
        on,
        "Sonnenschutz-Tipp",
        "Scheint die Sonne aufs Fenster, schlägt die Karte eine Höhe vor. Sie fährt nur, wenn du „Übernehmen“ tippst.",
        (value) => this._setTip({ enabled: value })
      )}
      ${on
        ? html`<div class="sub">
            <div class="dir-row">
              ${this._selector(
                this._num(0, 359, 1, "°", "box"),
                tip.direction,
                "Fensterrichtung",
                "Wohin die Wand mit dem Fenster zeigt: 0 = Nord, 90 = Ost, 180 = Süd, 270 = West.",
                (value) => this._setTip({ direction: value })
              )}
              <button class="ghost" @click=${() => (this._mapOpen = !this._mapOpen, this.requestUpdate())}>
                <ha-icon icon="mdi:map-marker-radius"></ha-icon>
                ${this._mapOpen ? "Karte schließen" : "Auf Karte wählen"}
              </button>
            </div>
            ${this._mapOpen
              ? html`<bkp-direction-map
                  .hass=${this.hass}
                  @direction-picked=${(ev) => {
                    this._mapOpen = false;
                    this._setTip({ direction: ev.detail.value });
                  }}
                ></bkp-direction-map>`
              : nothing}
            <div class="hint">${this._sunNow(tip.direction)}</div>
            ${this._selector(
              this._num(0, 100, 5, "%"),
              tip.position ?? d.position,
              "Sonnenschutz-Höhe",
              "Diese Höhe schlägt die Karte vor. 0 % ist ganz zu.",
              (value) => this._setTip({ position: value })
            )}
            ${this._selector(
              { entity: { filter: { domain: "sensor", device_class: "illuminance" } } },
              tip.lux_entity || "",
              "Helligkeitssensor draußen",
              "Damit die Karte weiß, ob die Sonne wirklich scheint. Ohne Sensor zählt nur der Sonnenstand.",
              (value) => this._setTip({ lux_entity: value })
            )}
            ${tip.lux_entity
              ? this._selector(
                  this._num(0, 150000, 500, "lx", "box"),
                  tip.lux_threshold ?? d.lux_threshold,
                  "Sonne scheint ab",
                  `Ab dieser Helligkeit gilt die Sonne als scheinend. Gerade misst der Sensor ${luxNow ?? "nichts"}. Schau an einem sonnigen Tag, welcher Wert dann kommt.`,
                  (value) => this._setTip({ lux_threshold: value })
                )
              : this._selector(
                  { entity: { filter: { domain: "weather" } } },
                  tip.weather_entity || "",
                  "Wetter (Ersatz)",
                  "Ohne Helligkeitssensor: zählt nur bei „sonnig“ oder „teils sonnig“.",
                  (value) => this._setTip({ weather_entity: value })
                )}
            ${this._selector(
              this._num(30, 90, 5, "°"),
              tip.spread ?? d.spread,
              "Seitlicher Winkel",
              "Wie schräg die Sonne noch aufs Fenster scheinen darf.",
              (value) => this._setTip({ spread: value })
            )}
            ${this._selector(
              this._num(0, 40, 1, "°"),
              tip.min_elevation ?? d.min_elevation,
              "Sonne ab Höhe",
              "Darunter verdecken Nachbarhäuser oder Bäume die Sonne. Höher stellen, wenn bei dir etwas im Weg steht.",
              (value) => this._setTip({ min_elevation: value })
            )}
            ${this._selector(
              this._num(10, 35, 0.5, "°C", "box"),
              tip.min_temp,
              "Nur wenn der Raum wärmer ist als",
              "Leer lassen: Tipp auch im Winter. Gemessen mit der Temperatur aus der Infozeile.",
              (value) => this._setTip({ min_temp: value })
            )}
            ${this._selector(
              { boolean: {} },
              tip.reopen ?? d.reopen,
              "Danach wieder öffnen vorschlagen",
              "Ist die Sonne weg, fragt die Karte, ob der Rollladen wieder hoch soll.",
              (value) => this._setTip({ reopen: value })
            )}
            ${(tip.reopen ?? d.reopen)
              ? this._selector(
                  this._num(0, 100, 5, "%"),
                  tip.reopen_position ?? d.reopen_position,
                  "Wieder öffnen auf",
                  undefined,
                  (value) => this._setTip({ reopen_position: value })
                )
              : nothing}
          </div>`
        : nothing}
    `;
  }

  _travelHint(entity) {
    if (!entity) return nothing;
    const t = travelTimes(this.hass, entity, () => this.requestUpdate());
    const f = (v) => v.toLocaleString("de-DE", { maximumFractionDigits: 1 });
    let text;
    if (!t) text = "Fahrzeiten werden aus dem Verlauf gelesen …";
    else if (t.open || t.close) {
      text = `Fahrzeit aus dem Verlauf des Rollladens: ganz hoch ${t.open ? `${f(t.open)} s` : "unbekannt"}, ganz runter ${t.close ? `${f(t.close)} s` : "unbekannt"}. Damit läuft die Animation so schnell wie der echte Rollladen.`;
    } else {
      text = "Noch keine Fahrten im Verlauf gefunden. Bis dahin rechnet die Animation mit 20 Sekunden.";
    }
    return html`<div class="hint">${text}</div>`;
  }

  _renderShutterSection(area) {
    const sv = this._config.shutter_view || {};
    const auto = areaDomainIds(this.hass, area?.area_id, "cover")[0];
    const on = sv.enabled !== false;
    return html`<details class="section" ?open=${this._openShutter} @toggle=${(ev) => this._toggleSection("_openShutter", ev)}>
      <summary><ha-icon icon="mdi:window-shutter"></ha-icon>Rollladen-Ansicht</summary>
      ${!this._openShutter ? nothing : html`<div class="body">
        ${this._selector(
          { boolean: {} },
          on,
          "Rollladen-Ansicht zeigen",
          "Fährst du den Rollladen über die Taste unten, zeigt das Bild ein Fenster, an dem du die Höhe ziehen kannst.",
          (value) => this._setSub("shutter_view", { enabled: value ? undefined : false })
        )}
        ${on
          ? html`
              ${this._selector(
                { entity: { filter: { domain: "cover" } } },
                sv.entity || "",
                "Rollladen",
                auto
                  ? `Leer lassen: „${this._name(auto)}“ aus dem Bereich.`
                  : "Im Bereich ist kein Rollladen. Wähle einen aus.",
                (value) => this._setSub("shutter_view", { entity: value })
              )}
              ${this._travelHint(sv.entity || auto)}
              ${this._selector(
                { boolean: {} },
                Boolean(sv.follow_moves),
                "Auch zeigen, wenn er von selbst fährt",
                "Sonst nur, wenn du ihn über die Taste unten fährst.",
                (value) => this._setSub("shutter_view", { follow_moves: value || undefined })
              )}
              ${this._renderSunTip(sv)}
            `
          : nothing}
      </div>`}
    </details>`;
  }

  // Zugeklappte Abschnitte werden gar nicht erst aufgebaut; das spart beim
  // Öffnen des Editors ein Dutzend Auswahlfelder.
  _toggleSection(key, ev) {
    this[key] = ev.target.open;
    this.requestUpdate();
  }

  _renderClimateSection(area) {
    const cv = this._config.climate_view || {};
    const auto = pickClimate(this.hass, area?.area_id);
    const climate = cv.entity || auto;
    const autoPower = climate ? pickPower(this.hass, climate) : undefined;
    const on = cv.enabled !== false;
    return html`<details class="section" ?open=${this._openClimate} @toggle=${(ev) => this._toggleSection("_openClimate", ev)}>
      <summary><ha-icon icon="mdi:air-conditioner"></ha-icon>Klima-Ansicht</summary>
      ${!this._openClimate ? nothing : html`<div class="body">
        ${this._selector(
          { boolean: {} },
          on,
          "Klima-Ansicht zeigen",
          "Oben rechts im Bild erscheint ein kleines Klima-Feld. Ein Tipp darauf öffnet die Bedienung: an und aus, Betriebsart, Zieltemperatur, Leistung.",
          (value) => this._setSub("climate_view", { enabled: value ? undefined : false })
        )}
        ${on
          ? html`
              ${this._selector(
                { entity: { filter: { domain: "climate" } } },
                cv.entity || "",
                "Klimagerät",
                auto
                  ? `Leer lassen: „${this._name(auto)}“ aus dem Bereich.`
                  : "Im Bereich ist kein Klimagerät. Wähle eines aus.",
                (value) => this._setSub("climate_view", { entity: value })
              )}
              ${this._selector(
                { entity: { filter: { domain: "sensor", device_class: "power" } } },
                cv.power_entity || "",
                "Leistungssensor",
                autoPower
                  ? `Leer lassen: „${this._name(autoPower)}“ vom selben Gerät.`
                  : "Wähle den Sensor, der die Leistung der Anlage misst.",
                (value) => this._setSub("climate_view", { power_entity: value })
              )}
              ${this._selector(
                { boolean: {} },
                Boolean(cv.show_history),
                "Leistungsverlauf an der Seite",
                "Zeigt rechts neben dem Gerät, wie viel die Anlage in den letzten Stunden gezogen hat.",
                (value) => this._setSub("climate_view", { show_history: value || undefined })
              )}
              ${cv.show_history
                ? this._selector(
                    this._num(1, 48, 1, "h"),
                    cv.history_hours ?? 6,
                    "Verlauf über",
                    undefined,
                    (value) => this._setSub("climate_view", { history_hours: value })
                  )
                : nothing}
              ${this._selector(
                { boolean: {} },
                Boolean(cv.stay_while_on),
                "Ansicht bleibt, solange die Anlage läuft",
                "Sonst geht die Karte nach der eingestellten Zeit zurück zum Bild.",
                (value) => this._setSub("climate_view", { stay_while_on: value || undefined })
              )}
            `
          : nothing}
      </div>`}
    </details>`;
  }

  _renderGeneral() {
    return html`${this._selector(
      {
        select: {
          mode: "dropdown",
          options: [
            { value: "home", label: "Bild (Foto, Kamera oder Symbol)" },
            { value: "climate", label: "Klima-Ansicht" },
          ],
        },
      },
      this._config.default_view || "home",
      "Startansicht",
      "Was die Karte normalerweise zeigt. Rollladen- und andere Ansichten kehren nach der eingestellten Zeit hierher zurück. Mit dem × kommst du jederzeit zum Bild.",
      (value) => this._fire({ ...this._config, default_view: value === "home" ? undefined : value })
    )}${this._selector(
      this._num(5, 120, 5, "s"),
      this._config.view_timeout ?? 20,
      "Zurück zum Bild nach",
      "So lange bleibt eine andere Ansicht ohne Berührung offen, dann kommt wieder die Startansicht.",
      (value) => this._fire({ ...this._config, view_timeout: value })
    )}`;
  }

  render() {
    if (!this.hass || !this._config) return nothing;
    this._ensureNative();
    const area = this.hass.areas?.[this._config.area];
    const sensors = sensorsFromConfig(this._config);
    return html`
      ${this._native}
      <div class="own">
        <div class="own-title">
          <ha-icon icon="mdi:format-list-bulleted"></ha-icon>
          Werte in der Infozeile
        </div>
        <div class="hint">
          Diese Werte stehen unter dem Namen des Bereichs, in dieser
          Reihenfolge.
        </div>
        ${this._selector(
          { boolean: {} },
          Boolean(this._config.show_icons),
          "Symbole vor den Werten",
          "Zeigt vor jedem Wert ein kleines Symbol, damit man sie auseinanderhält.",
          (value) => this._fire({ ...this._config, show_icons: value })
        )}
        ${sensors.map((item, index) =>
          this._renderItem(item, index, sensors.length, area)
        )}
        <button class="add" @click=${this._add}>
          <ha-svg-icon .path=${PATH_PLUS}></ha-svg-icon>
          Wert hinzufügen
        </button>
      </div>
      <div class="own">
        <div class="own-title">
          <ha-icon icon="mdi:image-filter-center-focus"></ha-icon>
          Ansichten im Bild
        </div>
        ${this._renderShutterSection(area)}
        ${this._renderClimateSection(area)}
        ${this._renderGeneral()}
      </div>
    `;
  }

  static styles = css`
    .section {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
    }
    .section summary {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      cursor: pointer;
      font-weight: var(--ha-font-weight-medium, 500);
      list-style: none;
    }
    .section summary::-webkit-details-marker {
      display: none;
    }
    .section summary::after {
      content: "▾";
      margin-left: auto;
      color: var(--secondary-text-color);
      transition: transform 0.2s;
    }
    .section[open] summary::after {
      transform: rotate(180deg);
    }
    .section .body {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding: 0 14px 14px;
    }
    .sub {
      display: flex;
      flex-direction: column;
      gap: 14px;
      padding-left: 12px;
      border-left: 2px solid var(--divider-color);
    }
    .dir-row {
      display: flex;
      gap: 8px;
      align-items: flex-start;
    }
    .dir-row ha-selector {
      flex: 1;
      min-width: 0;
    }
    .ghost {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid var(--divider-color);
      background: transparent;
      color: var(--primary-color);
      font: inherit;
      white-space: nowrap;
      cursor: pointer;
    }
    .own {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .own-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: var(--ha-font-size-l, 18px);
      font-weight: var(--ha-font-weight-medium, 500);
    }
    .hint {
      color: var(--secondary-text-color);
      font-size: var(--ha-font-size-s, 13px);
      line-height: 1.4;
    }
    .item {
      border: 1px solid var(--divider-color);
      border-radius: var(--ha-border-radius-lg, 12px);
      padding: 8px 8px 12px 12px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .item-head {
      display: flex;
      align-items: center;
      gap: 4px;
    }
    .item-icon {
      color: var(--state-icon-color, var(--secondary-text-color));
      margin-right: 6px;
    }
    .item-kind {
      flex: 1;
      min-width: 0;
    }
    .current {
      margin: 0 6px;
      color: var(--secondary-text-color);
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
    }
    .item-body {
      display: flex;
      flex-direction: column;
      gap: 12px;
      padding-right: 4px;
    }
    .power-list {
      display: flex;
      flex-direction: column;
      border-radius: var(--ha-border-radius-md, 8px);
      background: var(--secondary-background-color);
      padding: 4px 0;
    }
    .power-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 6px 12px;
      cursor: pointer;
    }
    .power-row.off .power-name,
    .power-row.off .power-value {
      opacity: 0.45;
      text-decoration: line-through;
    }
    .power-name {
      flex: 1;
      min-width: 0;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .power-value {
      white-space: nowrap;
      font-variant-numeric: tabular-nums;
      color: var(--secondary-text-color);
    }
    .total {
      text-align: right;
    }
    .add {
      align-self: flex-start;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px 8px 12px;
      border: none;
      border-radius: 999px;
      background: var(--primary-color);
      color: var(--text-primary-color, #fff);
      font: inherit;
      font-weight: var(--ha-font-weight-medium, 500);
      cursor: pointer;
    }
    .add:hover {
      filter: brightness(1.08);
    }
    .add:active {
      transform: scale(0.97);
    }
  `;
}

customElements.define(EDITOR, BereichskartePlusEditor);