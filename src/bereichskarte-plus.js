import { html, nothing, render } from "lit";
import {
  DEFAULT_SENSORS,
  areaDomainIds,
  computeItem,
  formatState,
  formatWatt,
  isNumeric,
  pickClimate,
  pickPower,
  sensorsFromConfig,
} from "./common.js";
import { computeSunTip } from "./sun.js";
import { livePosition, travelTimes } from "./travel.js";
import { overlayCss, renderOverlay } from "./views.js";
import "./editor.js";

const VERSION = "0.3.3";
const CARD = "bereichskarte-plus";
const EDITOR = `${CARD}-editor`;
const POWER_TO_WATT = { mW: 0.001, W: 1, kW: 1000, MW: 1e6 };

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
  ${overlayCss}
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
    _view = "home";

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

    disconnectedCallback() {
      super.disconnectedCallback?.();
      clearTimeout(this._viewTimer);
      clearInterval(this._histTimer);
      if (this._raf) cancelAnimationFrame(this._raf);
      this._raf = null;
    }

    // ---------- Infozeile ----------

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
      render(
        html`${this._items().map(
          (part, i) =>
            html`${i ? html`<span class="bkp-sep">·</span>` : nothing}<span
                class="bkp-value"
                ><ha-icon .icon=${part.icon}></ha-icon>${part.text}</span
              >`
        )}`,
        slot
      );
    }

    // ---------- Rollladen ----------

    _shutterCfg() {
      const cfg = this._config?.shutter_view || {};
      if (cfg.enabled === false) return null;
      const entity =
        cfg.entity || areaDomainIds(this.hass, this._config.area, "cover")[0];
      return entity ? { ...cfg, entity } : null;
    }

    _cover() {
      const cfg = this._shutterCfg();
      const st = cfg && this.hass.states[cfg.entity];
      if (!st) return null;
      const raw = st.attributes.current_position;
      const pos =
        typeof raw === "number" ? raw : st.state === "closed" ? 0 : 100;
      return {
        st,
        pos,
        moving: st.state === "opening" || st.state === "closing",
        canSet: Boolean((st.attributes.supported_features ?? 0) & 4),
        times: travelTimes(this.hass, cfg.entity, () => this.requestUpdate()),
      };
    }

    // Beim Fahren zwischen den Meldungen weiterrechnen, damit es flüssig läuft.
    _shownPos(sh) {
      if (this._dragPos != null) return this._dragPos;
      if (this._pendingPos != null && !sh.moving) return this._pendingPos;
      if (sh.moving) return livePosition(sh.st, sh.times) ?? sh.pos;
      return sh.pos;
    }

    _tick() {
      this._raf = null;
      const sh = this._cover();
      if (!sh?.moving || this._view !== "shutter" || this._dragPos != null) return;
      const pos = this._shownPos(sh);
      const root = this.shadowRoot;
      const shutter = root?.querySelector(".bkp-shutter");
      if (shutter) shutter.style.height = `${100 - pos}%`;
      const grip = root?.querySelector(".bkp-grip");
      if (grip) grip.style.top = `${100 - pos}%`;
      // Nur den Textknoten ändern, den Lit selbst verwaltet.
      const num = root?.querySelector(".bkp-numv");
      const text = num && [...num.childNodes].find((n) => n.nodeType === 3);
      if (text) text.nodeValue = String(Math.round(pos));
      this._raf = requestAnimationFrame(() => this._tick());
    }

    _roomTemp() {
      const area = this.hass.areas?.[this._config.area];
      const item = sensorsFromConfig(this._config).find(
        (s) => s.type === "temperature"
      );
      const id = item?.entity || area?.temperature_entity_id;
      const value = id ? Number(this.hass.states[id]?.state) : NaN;
      return Number.isNaN(value) ? undefined : value;
    }

    _sunTip() {
      const sh = this._cover();
      if (!sh) return null;
      return computeSunTip(
        this.hass,
        this._shutterCfg().sun_tip,
        this._shownPos(sh),
        this._roomTemp()
      );
    }

    _coverCmd(service) {
      const cfg = this._shutterCfg();
      this._pendingPos = null;
      this.hass.callService("cover", service, {}, { entity_id: cfg.entity });
      this._bump();
    }

    _coverTo(position) {
      const cfg = this._shutterCfg();
      this._pendingPos = position;
      this._pendingSince = Date.now();
      this.hass.callService(
        "cover",
        "set_cover_position",
        { position },
        { entity_id: cfg.entity }
      );
      this.requestUpdate();
      this._bump();
    }

    _windowDown(ev) {
      const sh = this._cover();
      if (!sh?.canSet) return;
      ev.preventDefault();
      const el = ev.currentTarget;
      el.setPointerCapture(ev.pointerId);
      const calc = (e) => {
        const r = el.getBoundingClientRect();
        const f = 1 - (e.clientY - r.top) / r.height;
        this._dragPos = Math.round(Math.min(1, Math.max(0, f)) * 100);
        this.requestUpdate();
      };
      const up = () => {
        el.removeEventListener("pointermove", calc);
        el.removeEventListener("pointerup", up);
        el.removeEventListener("pointercancel", up);
        const target = this._dragPos;
        this._dragPos = null;
        if (target != null) this._coverTo(target);
      };
      el.addEventListener("pointermove", calc);
      el.addEventListener("pointerup", up);
      el.addEventListener("pointercancel", up);
      calc(ev);
      this._bump();
    }

    // ---------- Klima ----------

    _climateCfg() {
      const cfg = this._config?.climate_view || {};
      if (cfg.enabled === false) return null;
      const entity = cfg.entity || pickClimate(this.hass, this._config.area);
      if (!entity) return null;
      return {
        show_history: false,
        history_hours: 6,
        stay_while_on: false,
        ...cfg,
        entity,
        power_entity: cfg.power_entity || pickPower(this.hass, entity),
      };
    }

    _formatWatt(watt) {
      return formatWatt(this.hass, watt);
    }

    _climate() {
      const cfg = this._climateCfg();
      const st = cfg && this.hass.states[cfg.entity];
      if (!st) return null;
      const target = st.attributes.temperature;
      if (
        this._pendingTarget != null &&
        (target === this._pendingTarget ||
          (this._targetSent && Date.now() - this._targetSent > 10000))
      ) {
        this._pendingTarget = null;
        this._targetSent = null;
      }
      const pst = cfg.power_entity ? this.hass.states[cfg.power_entity] : null;
      return {
        st,
        cfg,
        target: typeof target === "number" ? target : undefined,
        power: isNumeric(pst) ? formatState(this.hass, pst) : undefined,
      };
    }

    _climateToggle() {
      const cl = this._climate();
      const features = cl.st.attributes.supported_features ?? 0;
      const target = { entity_id: cl.cfg.entity };
      if (cl.st.state !== "off") {
        if (features & 128) this.hass.callService("climate", "turn_off", {}, target);
        else this.hass.callService("climate", "set_hvac_mode", { hvac_mode: "off" }, target);
      } else if (features & 256) {
        this.hass.callService("climate", "turn_on", {}, target);
      } else {
        const mode = (cl.st.attributes.hvac_modes || []).find((m) => m !== "off");
        if (mode) this.hass.callService("climate", "set_hvac_mode", { hvac_mode: mode }, target);
      }
      this._bump();
    }

    _climateStep(direction) {
      const cl = this._climate();
      const a = cl.st.attributes;
      const step = a.target_temp_step || 0.5;
      const base = this._pendingTarget ?? cl.target;
      if (typeof base !== "number") return;
      const next = Math.min(
        a.max_temp ?? 35,
        Math.max(a.min_temp ?? 7, Math.round((base + direction * step) / step) * step)
      );
      this._pendingTarget = next;
      this._targetSent = null;
      this.requestUpdate();
      clearTimeout(this._targetTimer);
      // Erst nach kurzer Pause senden, damit mehrfaches Tippen ein Befehl wird.
      this._targetTimer = setTimeout(() => {
        this._targetSent = Date.now();
        this.hass.callService(
          "climate",
          "set_temperature",
          { temperature: next },
          { entity_id: cl.cfg.entity }
        );
      }, 700);
      this._bump();
    }

    _climateCycle(modes) {
      const cl = this._climate();
      if (!modes.length) return;
      const current = cl.st.state;
      const next =
        current === "off"
          ? modes[0]
          : modes[(modes.indexOf(current) + 1) % modes.length];
      this.hass.callService(
        "climate",
        "set_hvac_mode",
        { hvac_mode: next },
        { entity_id: cl.cfg.entity }
      );
      this._bump();
    }

    async _loadHistory() {
      const cfg = this._climateCfg();
      const id = cfg?.power_entity;
      if (!id) return;
      const end = new Date();
      const start = new Date(end.getTime() - cfg.history_hours * 3600000);
      try {
        const res = await this.hass.callWS({
          type: "history/history_during_period",
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          entity_ids: [id],
          minimal_response: true,
          no_attributes: true,
          significant_changes_only: false,
        });
        const unit = this.hass.states[id]?.attributes.unit_of_measurement;
        const factor = POWER_TO_WATT[unit] ?? 1;
        const points = (res[id] || [])
          .map((p) => [
            Math.max((p.lu ?? p.lc ?? 0) * 1000, start.getTime()),
            Number(p.s) * factor,
          ])
          .filter((p) => !Number.isNaN(p[1]));
        if (points.length) points.push([end.getTime(), points[points.length - 1][1]]);
        this._history = { points };
      } catch (err) {
        this._history = { points: [], error: true };
      }
      this.requestUpdate();
    }

    // ---------- Ansichten ----------

    _timeout() {
      return this._config?.view_timeout ?? 20;
    }

    // Was die Karte normalerweise zeigt: Bild oder gleich die Klima-Ansicht.
    _defaultView() {
      return this._config?.default_view === "climate" && this._climate()
        ? "climate"
        : "home";
    }

    _sticky() {
      if (this._view === this._defaultView()) return true;
      if (this._view !== "climate") return false;
      const cl = this._climate();
      return Boolean(cl?.cfg.stay_while_on && cl.st.state !== "off");
    }

    _openView(ev, view) {
      ev.stopPropagation();
      this._setView(view);
    }

    _setView(view) {
      this._view = view;
      this._dragPos = null;
      clearInterval(this._histTimer);
      if (view === "climate" && this._climateCfg()?.show_history) {
        this._history = null;
        this._loadHistory();
        this._histTimer = setInterval(() => this._loadHistory(), 300000);
      }
      this.requestUpdate();
      this._bump();
    }

    // Jede Berührung startet die Zeit bis zur Rückkehr neu.
    _bump() {
      clearTimeout(this._viewTimer);
      const bar = this.shadowRoot?.querySelector(".bkp-timer");
      if (bar) {
        bar.style.animation = "none";
        void bar.offsetWidth;
        bar.style.animation = "";
      }
      if (this._view === this._defaultView()) return;
      this._viewTimer = setTimeout(() => {
        if (this._sticky()) this._bump();
        else this._setView(this._defaultView());
      }, this._timeout() * 1000);
    }

    _renderOverlay() {
      const header = this.shadowRoot?.querySelector(".header");
      const active = this._shutterCfg() || this._climateCfg();
      let overlay = header?.querySelector(":scope > .bkp-overlay");
      if (!header || !active) {
        overlay?.remove();
        return;
      }
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "bkp-overlay";
        header.appendChild(overlay);
      }
      overlay.classList.toggle("dark", Boolean(this.hass.themes?.darkMode));
      render(renderOverlay(this), overlay);
    }

    // Rollladen über die Taste unten gefahren: Ansicht wechseln.
    _watchCover() {
      const sh = this._cover();
      if (!sh) return;
      const state = sh.st.state;
      if (
        this._pendingPos != null &&
        (sh.moving ||
          sh.pos === this._pendingPos ||
          Date.now() - this._pendingSince > 8000)
      ) {
        this._pendingPos = null;
      }
      const armed =
        Date.now() < (this._armedUntil || 0) || this._shutterCfg().follow_moves;
      if (
        this._lastCoverState &&
        state !== this._lastCoverState &&
        sh.moving &&
        armed &&
        this._view !== "shutter"
      ) {
        this._setView("shutter");
      }
      this._lastCoverState = state;
    }

    updated(changed) {
      super.updated?.(changed);
      if (!this._clickHooked && this.shadowRoot) {
        this._clickHooked = true;
        this.shadowRoot.addEventListener(
          "click",
          (ev) => {
            if (ev.composedPath().some((n) => n.tagName === "HUI-CARD-FEATURES")) {
              this._armedUntil = Date.now() + 5000;
            }
          },
          true
        );
      }
      if (!this.hass || !this._config) return;
      // Startansicht beim ersten Mal und wenn sie im Editor geändert wird.
      const start = this._defaultView();
      if (start !== this._lastDefault) {
        this._lastDefault = start;
        this._setView(start);
        return;
      }
      this._renderIcons();
      this._watchCover();
      this._renderOverlay();
      if (this._view === "shutter" && !this._raf && this._cover()?.moving) {
        this._raf = requestAnimationFrame(() => this._tick());
      }
    }
  }
  customElements.define(CARD, BereichskartePlus);
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: CARD,
  name: "Bereichskarte Plus",
  description:
    "Wie die Bereichskarte, aber du wählst selbst, welche Werte unter dem Namen stehen. Mit Rollladen- und Klima-Ansicht.",
  preview: true,
});

loadAreaCard().then(defineCard);

console.info(
  `%c BEREICHSKARTE-PLUS %c ${VERSION} `,
  "color:#fff;background:#6b55c9;font-weight:700",
  "color:#6b55c9;background:#fff"
);
