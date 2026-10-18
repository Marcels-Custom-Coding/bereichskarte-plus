// Ansichten im Bildbereich: Rollladen (R7) und Klima (K3).
import { html, nothing, svg } from "lit";

const MODE_ICON = {
  cool: "mdi:snowflake",
  heat: "mdi:fire",
  heat_cool: "mdi:sun-snowflake-variant",
  auto: "mdi:thermostat-auto",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power",
};
const MODE_NAME = {
  cool: "Kühlen",
  heat: "Heizen",
  heat_cool: "Heizen/Kühlen",
  auto: "Automatik",
  dry: "Entfeuchten",
  fan_only: "Lüften",
  off: "Aus",
};
export const modeIcon = (mode) => MODE_ICON[mode] || "mdi:thermostat";
export const modeName = (mode) => MODE_NAME[mode] || mode;

const fmtTemp = (v) =>
  v.toLocaleString("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

// ---------- kleine Felder auf dem Bild ----------

export function renderPills(c) {
  const pills = [];
  const tip = c._sunTip();
  if (tip) {
    pills.push(html`<button
      class="bkp-pill sun"
      @click=${(ev) => c._openView(ev, "shutter")}
    >
      <ha-icon icon="mdi:white-balance-sunny"></ha-icon>
      ${tip.kind === "close"
        ? `Sonnenschutz ${tip.target} %?`
        : "Wieder öffnen?"}
    </button>`);
  }
  const cl = c._climate();
  if (cl) {
    const on = cl.st.state !== "off";
    pills.push(html`<button
      class="bkp-pill climate ${on ? `on m-${cl.st.state}` : ""}"
      @click=${(ev) => c._openView(ev, "climate")}
    >
      <ha-icon .icon=${on ? modeIcon(cl.st.state) : "mdi:air-conditioner"}></ha-icon>
      ${on
        ? html`${typeof cl.target === "number" ? `${fmtTemp(cl.target)}°` : ""}${cl.power
            ? html`<span class="dot">·</span>${cl.power}`
            : nothing}`
        : "Klima aus"}
    </button>`);
  }
  return pills.length ? html`<div class="bkp-pills">${pills}</div>` : nothing;
}

// ---------- Rollladen ----------

function renderWindow(c, sh) {
  const shown = c._shownPos(sh);
  const closed = 100 - shown;
  return html`<div
    class="bkp-win ${sh.canSet ? "drag" : ""} ${sh.moving || c._dragPos != null ? "moving" : ""}"
    @pointerdown=${(ev) => c._windowDown(ev)}
    title=${sh.canSet ? "Ziehen, um die Höhe einzustellen" : ""}
  >
    <div class="bkp-outside"></div>
    <div class="bkp-shutter" style="height:${closed}%"></div>
    ${sh.canSet
      ? html`<div class="bkp-grip" style="top:${closed}%"></div>`
      : nothing}
  </div>`;
}

export function renderShutterView(c) {
  const sh = c._cover();
  if (!sh) return nothing;
  const tip = c._sunTip();
  const shown = Math.round(c._shownPos(sh));
  const label =
    shown === 0 ? "geschlossen" : shown === 100 ? "ganz offen" : "offen";
  let side;
  if (tip?.kind === "close") {
    side = html`<small>Sonne steht auf dem Fenster</small>
      <b>Empfohlen ${tip.target} %</b>
      <small>jetzt ${shown} % offen</small>
      <button class="bkp-cta" @click=${() => c._coverTo(tip.target)}>
        Übernehmen
      </button>`;
  } else if (tip?.kind === "open") {
    side = html`<small>Die Sonne ist weg</small>
      <b>Wieder öffnen?</b>
      <small>jetzt ${shown} % offen</small>
      <button class="bkp-cta" @click=${() => c._coverTo(tip.target)}>
        Auf ${tip.target} %
      </button>`;
  } else {
    side = html`<div class="bkp-num"><span class="bkp-numv">${shown}</span><span>%</span></div>
      <small>${sh.moving
        ? sh.st.state === "opening"
          ? "fährt hoch …"
          : "fährt runter …"
        : label}</small>
      <div class="bkp-row">
        <button class="bkp-rb" title="Auf" @click=${() => c._coverCmd("open_cover")}>
          <ha-icon icon="mdi:arrow-up"></ha-icon>
        </button>
        <button class="bkp-rb" title="Stopp" @click=${() => c._coverCmd("stop_cover")}>
          <ha-icon icon="mdi:stop"></ha-icon>
        </button>
        <button class="bkp-rb" title="Zu" @click=${() => c._coverCmd("close_cover")}>
          <ha-icon icon="mdi:arrow-down"></ha-icon>
        </button>
      </div>`;
  }
  return html`<div class="bkp-view bkp-shutterview ${tip ? "sunny" : ""}">
    ${renderWindow(c, sh)}
    <div class="bkp-side">${side}</div>
  </div>`;
}

// ---------- Klima ----------

function renderHistory(c, cl) {
  const pts = c._history?.points;
  if (!pts || pts.length < 2) {
    return html`<div class="bkp-hist"><small>Leistung</small><div class="bkp-hist-empty">
      ${c._history?.error ? "kein Verlauf" : "lädt …"}
    </div></div>`;
  }
  const t0 = pts[0][0];
  const t1 = pts[pts.length - 1][0];
  const max = Math.max(...pts.map((p) => p[1]), 1);
  const x = (t) => ((t - t0) / Math.max(t1 - t0, 1)) * 100;
  const y = (v) => 38 - (v / max) * 34;
  let d = `M0,${y(pts[0][1]).toFixed(1)}`;
  for (let i = 1; i < pts.length; i++) {
    d += ` H${x(pts[i][0]).toFixed(1)} V${y(pts[i][1]).toFixed(1)}`;
  }
  d += " H100";
  return html`<div class="bkp-hist">
    <small>Leistung · ${c._climateCfg().history_hours} h</small>
    <svg viewBox="0 0 100 40" preserveAspectRatio="none">
      ${svg`<path class="area" d="${d} V40 H0 Z"></path><path class="line" d="${d}"></path>`}
    </svg>
    <small class="max">max ${c._formatWatt(max)}</small>
  </div>`;
}

export function renderClimateView(c) {
  const cl = c._climate();
  if (!cl) return nothing;
  const cfg = c._climateCfg();
  const st = cl.st;
  const mode = st.state;
  const on = mode !== "off";
  const action = st.attributes.hvac_action;
  const blowing = on && (!action || !["idle", "off"].includes(action));
  const target = c._pendingTarget ?? cl.target;
  const modes = (st.attributes.hvac_modes || []).filter((m) => m !== "off");
  return html`<div
    class="bkp-view bkp-climateview m-${on ? mode : "off"} ${cfg.show_history
      ? "with-hist"
      : ""}"
  >
    <div class="bkp-stage">
      <div class="bkp-unit"><i></i></div>
      ${blowing
        ? html`<svg class="bkp-air" viewBox="0 0 100 60" aria-hidden="true">
            ${svg`<path d="M28,4 C24,18 34,26 29,40"></path>
              <path d="M50,4 C46,18 56,26 51,40"></path>
              <path d="M72,4 C68,18 78,26 73,40"></path>`}
          </svg>`
        : nothing}
    </div>
    <span class="bkp-chip">
      ${on ? modeName(mode) : "Aus"}${cl.power
        ? html` · ${cl.power}`
        : nothing}${on && action === "idle" ? " · wartet" : ""}
    </span>
    ${cfg.show_history ? renderHistory(c, cl) : nothing}
    <div class="bkp-bar">
      <button
        class="bkp-rb ${on ? "power-on" : ""}"
        title=${on ? "Ausschalten" : "Einschalten"}
        @click=${() => c._climateToggle()}
      >
        <ha-icon icon="mdi:power"></ha-icon>
      </button>
      <button class="bkp-rb flat" title="Kälter" ?disabled=${typeof target !== "number"} @click=${() => c._climateStep(-1)}>
        <ha-icon icon="mdi:minus"></ha-icon>
      </button>
      <span class="bkp-target">${typeof target === "number" ? html`${fmtTemp(target)}<span class="unit"> °C</span>` : "–"}</span>
      <button class="bkp-rb flat" title="Wärmer" ?disabled=${typeof target !== "number"} @click=${() => c._climateStep(1)}>
        <ha-icon icon="mdi:plus"></ha-icon>
      </button>
      <button
        class="bkp-rb flat"
        title="Betriebsart wechseln"
        ?disabled=${modes.length < 2 && on}
        @click=${() => c._climateCycle(modes)}
      >
        <ha-icon .icon=${modeIcon(on ? mode : modes[0])}></ha-icon>
      </button>
    </div>
  </div>`;
}

export function renderOverlay(c) {
  const view = c._view;
  return html`
    ${view === "home" ? renderPills(c) : nothing}
    ${view !== "home"
      ? html`<div class="bkp-layer" @pointerdown=${() => c._bump()}>
          ${view === "shutter" ? renderShutterView(c) : renderClimateView(c)}
          <button
            class="bkp-close"
            title=${view === c._defaultView() ? "Bild zeigen" : "Zurück"}
            @click=${() => c._setView(view === c._defaultView() ? "home" : c._defaultView())}
          >
            <ha-icon icon="mdi:close"></ha-icon>
          </button>
          ${c._sticky() ? nothing : html`<div class="bkp-timer" style="--bkp-t:${c._timeout()}s"></div>`}
        </div>`
      : nothing}
  `;
}

export const overlayCss = `
  .bkp-overlay { position: absolute; inset: 0; z-index: 2; pointer-events: none; font-family: var(--ha-font-family-body, Roboto, sans-serif); }
  .bkp-overlay button { font: inherit; cursor: pointer; }
  .bkp-overlay ha-icon { --mdc-icon-size: 18px; display: inline-flex; }
  .bkp-pills { position: absolute; top: 8px; right: 8px; display: flex; flex-direction: column; align-items: flex-end; gap: 6px; pointer-events: auto; }
  .bkp-pill { display: inline-flex; align-items: center; gap: 4px; border: 0; border-radius: 999px; padding: 5px 10px 5px 8px; font-size: 12px; font-weight: 500; background: rgb(255 255 255 / 0.85); color: #2d3440; box-shadow: 0 1px 4px rgb(0 0 0 / 0.18); backdrop-filter: blur(6px); }
  .bkp-pill ha-icon { --mdc-icon-size: 16px; }
  .bkp-pill .dot { margin: 0 2px; }
  .bkp-pill.climate.on { color: #fff; background: #2f86d4; }
  .bkp-pill.climate.on.m-heat { background: #e2692f; }
  .bkp-pill.climate.on.m-auto, .bkp-pill.climate.on.m-heat_cool { background: #6b55c9; }
  .bkp-pill.climate.on.m-dry, .bkp-pill.climate.on.m-fan_only { background: #2a9d8f; }
  .bkp-pill.sun { background: #ffd56b; color: #4a3510; }

  .bkp-layer { position: absolute; inset: 0; pointer-events: auto; animation: bkp-in 0.25s ease-out; }
  @keyframes bkp-in { from { opacity: 0; } to { opacity: 1; } }
  .bkp-view { position: absolute; inset: 0; overflow: hidden; container-type: inline-size; }
  .bkp-close { position: absolute; top: 8px; right: 8px; z-index: 3; width: 28px; height: 28px; border-radius: 50%; border: 0; display: grid; place-items: center; background: rgb(0 0 0 / 0.3); color: #fff; }
  .bkp-close ha-icon { --mdc-icon-size: 16px; }
  .bkp-timer { position: absolute; left: 0; bottom: 0; height: 3px; background: var(--primary-color); z-index: 3; animation: bkp-count var(--bkp-t, 20s) linear forwards; }
  @keyframes bkp-count { from { width: 100%; } to { width: 0; } }

  .bkp-rb { width: 36px; height: 36px; border-radius: 50%; border: 0; display: grid; place-items: center; background: #fff; color: #2d3440; box-shadow: 0 1px 2px rgb(0 0 0 / 0.12); flex: none; }
  .bkp-rb:disabled { opacity: 0.4; cursor: default; }
  .bkp-rb:active { transform: scale(0.94); }
  .bkp-row { display: flex; gap: 8px; }

  /* Rollladen */
  .bkp-shutterview { background: #ece6dd; color: #3a342b; display: flex; align-items: center; gap: 6%; padding: 0 6%; box-sizing: border-box; }
  .bkp-shutterview.sunny { background: linear-gradient(135deg, #fff1cf, #ffd497); color: #4a3510; }
  .bkp-shutterview.sunny::before { content: ""; position: absolute; right: -24px; top: -24px; width: 96px; height: 96px; border-radius: 50%; background: radial-gradient(circle, #fff6c9 35%, rgb(255 214 102 / 0.6) 36%, transparent 70%); }
  .bkp-win { position: relative; height: 80%; aspect-ratio: 4 / 5; border: 6px solid #fff; border-radius: 6px; overflow: hidden; box-shadow: 0 2px 8px rgb(0 0 0 / 0.14); flex: none; touch-action: none; }
  .bkp-win.drag { cursor: ns-resize; }
  .bkp-outside { position: absolute; inset: 0; background: radial-gradient(ellipse 80% 38% at 25% 104%, #77a95f 60%, transparent 61%), radial-gradient(ellipse 70% 32% at 88% 104%, #5d9450 60%, transparent 61%), linear-gradient(#8ec5f2, #dcefff); }
  .bkp-win::after { content: ""; position: absolute; left: 50%; top: 0; bottom: 0; width: 4px; margin-left: -2px; background: #fff; z-index: 1; }
  /* Lamellen hängen an der Unterkante: fährt der Rollladen, laufen sie mit. */
  .bkp-shutter { position: absolute; left: 0; right: 0; top: 0; z-index: 2; background-image: linear-gradient(#d6cfc3 0 9px, #bcb4a6 9px 11px); background-size: 100% 11px; background-position: left bottom; background-repeat: repeat-y; border-bottom: 4px solid #9d9485; box-sizing: border-box; box-shadow: 0 2px 4px rgb(0 0 0 / 0.25); transition: height 0.4s ease-out; }
  .bkp-win.moving .bkp-shutter { transition: none; }
  .bkp-shutter[style*="height:0%"], .bkp-shutter[style*="height: 0%"] { border-bottom-width: 0; }
  .bkp-grip { position: absolute; left: 50%; z-index: 3; width: 30px; height: 6px; margin: -3px 0 0 -15px; border-radius: 3px; background: #fff; box-shadow: 0 1px 3px rgb(0 0 0 / 0.35); }
  .bkp-side { position: relative; display: grid; gap: 6px; justify-items: start; min-width: 0; }
  .bkp-side small { font-size: 12px; opacity: 0.8; }
  .bkp-side b { font-size: 18px; font-weight: 500; }
  .bkp-num { font-size: 40px; font-weight: 300; line-height: 1; font-variant-numeric: tabular-nums; }
  .bkp-num span:not(.bkp-numv) { font-size: 18px; margin-left: 2px; }
  .bkp-cta { border: 0; border-radius: 999px; padding: 7px 14px; background: #4a3510; color: #fff3d6; font-size: 12.5px; font-weight: 500; }

  /* Klima */
  .bkp-climateview { background: linear-gradient(#e7f2fb, #d3e8f8); color: #2d3440; --mc: #2f86d4; }
  .bkp-climateview.m-heat { background: linear-gradient(#fdf0e6, #f8dcc6); --mc: #e2692f; }
  .bkp-climateview.m-auto, .bkp-climateview.m-heat_cool { background: linear-gradient(#efedfb, #e0dbf6); --mc: #6b55c9; }
  .bkp-climateview.m-dry, .bkp-climateview.m-fan_only { background: linear-gradient(#e6f5f2, #d2ece7); --mc: #2a9d8f; }
  .bkp-climateview.m-off { background: linear-gradient(#eeedf0, #e1dfe4); --mc: #8d8996; }
  .bkp-stage { position: absolute; left: 0; right: 0; top: 0; bottom: 56px; }
  .with-hist .bkp-stage { right: 40%; }
  .bkp-unit { position: absolute; left: 50%; top: 14%; width: 62%; height: 26%; transform: translateX(-50%); background: #fff; border-radius: 10px 10px 16px 16px; box-shadow: 0 3px 8px rgb(40 60 90 / 0.15); }
  .bkp-unit::after { content: ""; position: absolute; left: 10%; right: 10%; bottom: 18%; height: 3px; border-radius: 2px; background: #d6dde5; }
  .bkp-unit i { position: absolute; right: 10%; top: 26%; width: 6px; height: 6px; border-radius: 50%; background: var(--mc); }
  .bkp-air { position: absolute; left: 19%; width: 62%; top: 42%; height: 52%; overflow: visible; }
  .bkp-air path { fill: none; stroke: var(--mc); stroke-width: 2.2; stroke-linecap: round; stroke-dasharray: 6 8; vector-effect: non-scaling-stroke; animation: bkp-blow 1.4s linear infinite; }
  .bkp-air path:nth-child(2) { animation-delay: -0.5s; opacity: 0.7; }
  .bkp-air path:nth-child(3) { animation-delay: -0.9s; opacity: 0.5; }
  @keyframes bkp-blow { to { stroke-dashoffset: -28; } }
  .bkp-chip { position: absolute; left: 10px; top: 10px; background: rgb(255 255 255 / 0.8); border-radius: 999px; padding: 5px 10px; font-size: 12px; font-weight: 500; }
  .bkp-hist { position: absolute; right: 10px; top: 44px; bottom: 64px; width: calc(40% - 16px); background: rgb(255 255 255 / 0.7); border-radius: 12px; padding: 6px 8px; box-sizing: border-box; display: flex; flex-direction: column; gap: 2px; }
  .bkp-hist small { font-size: 10.5px; opacity: 0.75; }
  .bkp-hist small.max { text-align: right; }
  .bkp-hist svg { flex: 1; width: 100%; min-height: 0; }
  .bkp-hist .area { fill: var(--mc); opacity: 0.18; }
  .bkp-hist .line { fill: none; stroke: var(--mc); stroke-width: 1.6; vector-effect: non-scaling-stroke; }
  .bkp-hist-empty { flex: 1; display: grid; place-items: center; font-size: 11px; opacity: 0.6; }
  .bkp-bar { position: absolute; left: 10px; right: 10px; bottom: 10px; height: 46px; border-radius: 16px; background: rgb(255 255 255 / 0.78); backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); display: flex; align-items: center; justify-content: space-between; padding: 0 5px; box-sizing: border-box; }
  .bkp-bar .bkp-rb.flat { background: transparent; box-shadow: none; }
  .bkp-bar .bkp-rb.power-on { background: var(--mc); color: #fff; }
  .bkp-target { font-size: 20px; font-variant-numeric: tabular-nums; white-space: nowrap; }

  /* schmale Karten */
  @container (max-width: 300px) {
    .bkp-hist { display: none; }
    .with-hist .bkp-stage { right: 0; }
  }
  @container (max-width: 260px) {
    .bkp-rb { width: 30px; height: 30px; }
    .bkp-overlay ha-icon, .bkp-rb ha-icon { --mdc-icon-size: 16px; }
    .bkp-bar { left: 6px; right: 6px; bottom: 6px; height: 40px; padding: 0 3px; border-radius: 14px; }
    .bkp-target { font-size: 16px; }
    .bkp-target .unit { display: none; }
    .bkp-chip { left: 6px; top: 6px; padding: 4px 8px; font-size: 11px; max-width: calc(100% - 50px); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; box-sizing: border-box; }
    .bkp-stage { bottom: 46px; }
    .bkp-unit { top: 38%; width: 66%; height: 22%; }
    .bkp-air { top: 56%; height: 40%; }
    .bkp-shutterview { gap: 5%; padding: 0 5%; }
    .bkp-shutterview:not(.sunny) { padding-right: 40px; }
    .bkp-win { height: 56%; border-width: 4px; }
    .bkp-side { gap: 4px; position: static; }
    .bkp-shutterview .bkp-row { position: absolute; right: 6px; bottom: 6px; flex-direction: column; gap: 4px; }
    .bkp-shutterview .bkp-rb { width: 28px; height: 28px; }
    .bkp-num { font-size: 22px; }
    .bkp-num span:not(.bkp-numv) { font-size: 12px; }
    .bkp-num span:not(.bkp-numv) { font-size: 14px; }
    .bkp-side small { font-size: 11px; }
    .bkp-side b { font-size: 14px; }
    .bkp-row { gap: 4px; }
    .bkp-cta { padding: 5px 10px; font-size: 11.5px; }
  }

  /* dunkles Design */
  .bkp-overlay.dark .bkp-shutterview { background: #2b2723; color: #ece4d8; }
  .bkp-overlay.dark .bkp-shutterview.sunny { background: linear-gradient(135deg, #43361f, #5a3f17); color: #ffe6b5; }
  .bkp-overlay.dark .bkp-cta { background: #ffd56b; color: #3a2a0c; }
  .bkp-overlay.dark .bkp-win, .bkp-overlay.dark .bkp-win::after { border-color: #d9d4cc; }
  .bkp-overlay.dark .bkp-climateview { background: linear-gradient(#1d2a38, #16212c); color: #e8ecf2; --mc: #62adf0; }
  .bkp-overlay.dark .bkp-climateview.m-heat { background: linear-gradient(#3a261b, #2c1c14); --mc: #ff8d55; }
  .bkp-overlay.dark .bkp-climateview.m-off { background: linear-gradient(#26252a, #1e1d22); --mc: #8d8996; }
  .bkp-overlay.dark .bkp-unit { background: #3a3f47; }
  .bkp-overlay.dark .bkp-unit::after { background: #555b64; }
  .bkp-overlay.dark .bkp-chip, .bkp-overlay.dark .bkp-hist, .bkp-overlay.dark .bkp-bar { background: rgb(0 0 0 / 0.35); }
  .bkp-overlay.dark .bkp-rb { background: #3a3f47; color: #e8ecf2; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.flat { background: transparent; }
  .bkp-overlay.dark .bkp-bar .bkp-rb.power-on { background: var(--mc); color: #fff; }

  @media (prefers-reduced-motion: reduce) {
    .bkp-air path, .bkp-layer { animation: none; }
  }
`;
