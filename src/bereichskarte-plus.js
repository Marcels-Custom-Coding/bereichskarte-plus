import { LitElement, html, css, nothing, render } from "lit";

const VERSION = "0.1.0";
const CARD = "bereichskarte-plus";
const EDITOR = `${CARD}-editor`;

const KINDS = {
  temperature: {
    label: "Temperatur",
    icon: "mdi:thermometer",
    deviceClass: "temperature",
  },
  humidity: {
    label: "Luftfeuchte",
    icon: "mdi:water-percent",
    deviceClass: "humidity",
  },
  power: {
    label: "Leistung (Summe)",
    icon: "mdi:flash",
    deviceClass: "power",
  },
  entity: { label: "Beliebiger Sensor", icon: "mdi:eye" },
};

const DEFAULT_SENSORS = [
  { type: "temperature" },
  { type: "humidity" },
  { type: "power" },
];

const POWER_TO_WATT = { mW: 0.001, W: 1, kW: 1000, MW: 1e6, GW: 1e9 };

const isUsable = (stateObj) =>
  stateObj && !["unavailable", "unknown"].includes(stateObj.state);

const isNumeric = (stateObj) =>
  isUsable(stateObj) &&
  stateObj.state !== "" &&
  !Number.isNaN(Number(stateObj.state));

// Zahlen so formatieren, wie es der Nutzer in seinem Profil eingestellt hat.
function numberLocale(hass) {
  const lang = hass.locale?.language || hass.language || "de";
  switch (hass.locale?.number_format) {
    case "comma_decimal":
      return ["en-US", "en"];
    case "decimal_comma":
      return ["de", "es", "it"];
    case "space_comma":
      return ["fr", "sv", "cs"];
    case "system":
      return undefined;
    default:
      return lang;
  }
}

function formatNumber(hass, value, digits = 1) {
  return new Intl.NumberFormat(numberLocale(hass), {
    maximumFractionDigits: digits,
  }).format(value);
}

const withUnit = (value, unit) =>
  unit ? `${value}${unit === "°" ? "" : " "}${unit}` : value;

function formatState(hass, stateObj) {
  if (!isUsable(stateObj)) return undefined;
  if (typeof hass.formatEntityState === "function") {
    return hass.formatEntityState(stateObj);
  }
  return withUnit(stateObj.state, stateObj.attributes.unit_of_measurement);
}

// Alle Entitäten eines Bereichs: eigener Bereich oder der Bereich des Geräts.
export function areaEntityIds(hass, areaId, deviceClass) {
  if (!hass || !areaId) return [];
  const result = [];
  for (const [entityId, entry] of Object.entries(hass.entities || {})) {
    if (!entityId.startsWith("sensor.")) continue;
    if (entry.entity_category || entry.hidden) continue;
    const area =
      entry.area_id ||
      (entry.device_id ? hass.devices?.[entry.device_id]?.area_id : undefined);
    if (area !== areaId) continue;
    const stateObj = hass.states[entityId];
    if (!stateObj) continue;
    if (deviceClass && stateObj.attributes.device_class !== deviceClass) {
      continue;
    }
    result.push(entityId);
  }
  return result;
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[mid]
    : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function powerEntityIds(hass, areaId, item) {
  const exclude = new Set(item.exclude || []);
  const ids = areaEntityIds(hass, areaId, "power").filter(
    (id) => !exclude.has(id)
  );
  for (const id of item.include || []) {
    if (!ids.includes(id) && !exclude.has(id)) ids.push(id);
  }
  return ids;
}

export function powerSum(hass, ids) {
  let sum = 0;
  let count = 0;
  for (const id of ids) {
    const stateObj = hass.states[id];
    if (!isNumeric(stateObj)) continue;
    const factor =
      POWER_TO_WATT[stateObj.attributes.unit_of_measurement] ?? 1;
    sum += Number(stateObj.state) * factor;
    count++;
  }
  return count ? sum : undefined;
}

export function formatWatt(hass, watt) {
  return withUnit(formatNumber(hass, watt), "W");
}

// Ein Wert der Infozeile: Text plus Symbol.
export function computeItem(hass, area, item) {
  const kind = KINDS[item.type] ? item.type : "entity";
  const icon = item.icon || KINDS[kind].icon;

  if (kind === "entity") {
    const stateObj = item.entity ? hass.states[item.entity] : undefined;
    return {
      text: formatState(hass, stateObj),
      icon:
        item.icon || stateObj?.attributes.icon || KINDS.entity.icon,
    };
  }

  if (kind === "power") {
    const sum = powerSum(hass, powerEntityIds(hass, area.area_id, item));
    return { text: sum === undefined ? undefined : formatWatt(hass, sum), icon };
  }

  // Temperatur oder Luftfeuchte: gewählter Sensor, dann Bereichseinstellung,
  // zuletzt der Median aller passenden Sensoren im Bereich.
  const chosen = item.entity || area[`${kind}_entity_id`];
  if (chosen) {
    return { text: formatState(hass, hass.states[chosen]), icon };
  }
  const values = [];
  let unit;
  for (const id of areaEntityIds(hass, area.area_id, KINDS[kind].deviceClass)) {
    const stateObj = hass.states[id];
    if (!isNumeric(stateObj)) continue;
    const u = stateObj.attributes.unit_of_measurement;
    unit ??= u;
    if (u === unit) values.push(Number(stateObj.state));
  }
  if (!values.length) return { text: undefined, icon };
  return {
    text: withUnit(formatNumber(hass, median(values)), unit),
    icon,
  };
}

// Alte Karten ohne eigene Liste: aus den Sensorklassen ableiten.
export function sensorsFromConfig(config) {
  if (Array.isArray(config?.sensors)) return config.sensors;
  const classes = config?.sensor_classes || ["temperature", "humidity"];
  return classes
    .filter((dc) => KINDS[dc] && dc !== "entity")
    .map((dc) => ({ type: dc }));
}

const cardStyles = new CSSStyleSheet();
cardStyles.replaceSync(`
  .bkp-values {
    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .bkp-value {
    display: inline-flex;
    align-items: center;
    gap: 2px;
    vertical-align: middle;
  }
  .bkp-value ha-icon {
    --mdc-icon-size: 15px;
    color: var(--secondary-text-color);
  }
  .bkp-sep {
    margin: 0 5px;
    vertical-align: middle;
  }
`);

async function loadAreaCard() {
  if (!customElements.get("hui-area-card")) {
    const helpers = await window.loadCardHelpers();
    // Lädt die eingebaute Bereichskarte nach, falls sie noch fehlt.
    helpers.createCardElement({ type: "area", area: "" });
  }
  return customElements.whenDefined("hui-area-card");
}

function defineCard(Base) {
  class BereichskartePlus extends Base {
    static get styles() {
      return [...[super.styles].flat(), cardStyles];
    }

    static async getConfigElement() {
      // Sorgt dafür, dass der eingebaute Editor geladen ist.
      await Base.getConfigElement();
      return document.createElement(EDITOR);
    }

    static getStubConfig(hass) {
      const area = Object.values(hass.areas || {})[0];
      return {
        type: `custom:${CARD}`,
        area: area?.area_id || "",
        display_type: "picture",
        sensors: DEFAULT_SENSORS,
        show_icons: true,
        features: [{ type: "area-controls" }],
      };
    }

    _items() {
      const area = this.hass?.areas?.[this._config?.area];
      if (!area) return [];
      return sensorsFromConfig(this._config)
        .map((item) => computeItem(this.hass, area, item))
        .filter((part) => part.text);
    }

    _computeSensorsDisplay() {
      if (!Array.isArray(this._config?.sensors)) {
        return super._computeSensorsDisplay();
      }
      return this._items()
        .map((part) => part.text)
        .join(" · ");
    }

    updated(changed) {
      super.updated?.(changed);
      this._renderIcons();
    }

    // Mit Symbolen: eigene Zeile in den Platz für den zweiten Text stecken.
    _renderIcons() {
      const info = this.shadowRoot?.querySelector("ha-tile-info");
      if (!info) return;
      let slot = info.querySelector(":scope > .bkp-values");
      if (!this._config?.show_icons || !Array.isArray(this._config.sensors)) {
        slot?.remove();
        return;
      }
      if (!slot) {
        slot = document.createElement("span");
        slot.slot = "secondary";
        slot.className = "bkp-values";
        info.appendChild(slot);
      }
      const items = this._items();
      render(
        html`${items.map(
          (part, i) =>
            html`${i ? html`<span class="bkp-sep">·</span>` : nothing}<span
                class="bkp-value"
                ><ha-icon .icon=${part.icon}></ha-icon>${part.text}</span
              >`
        )}`,
        slot
      );
    }
  }
  customElements.define(CARD, BereichskartePlus);
}

// ---------- Editor ----------

const PATH_UP = "M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z";
const PATH_DOWN = "M11,4H13V16L18.5,10.5L19.92,11.92L12,19.84L4.08,11.92L5.5,10.5L11,16V4Z";
const PATH_DELETE = "M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z";
const PATH_PLUS = "M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z";

const OWN_KEYS = ["sensors", "show_icons"];

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

  updated(changed) {
    if (changed.has("hass") && this._native) this._native.hass = this.hass;
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

  _selector(selector, value, label, helper, onChange) {
    return html`<ha-selector
      .hass=${this.hass}
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
    `;
  }

  static styles = css`
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

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD,
  name: "Bereichskarte Plus",
  description:
    "Wie die Bereichskarte, aber du wählst selbst, welche Werte unter dem Namen stehen.",
  preview: true,
});

loadAreaCard().then(defineCard);

console.info(`%c BEREICHSKARTE-PLUS %c ${VERSION} `, "color:#fff;background:#6b5b95;font-weight:700", "color:#6b5b95;background:#fff");
