// Karte im Editor: Hauswand antippen, Fensterrichtung ablesen.
import { LitElement, html, css, nothing } from "lit";
import { directionName, sunWindows } from "./sun.js";

const LEAFLET = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4";
const OVERPASS = [
  "https://overpass-api.de/api/interpreter",
  "https://overpass.private.coffee/api/interpreter",
];
const RAD = Math.PI / 180;

let leafletPromise;
function loadLeaflet() {
  if (window.L?.map) return Promise.resolve(window.L);
  leafletPromise ||= new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `${LEAFLET}/leaflet.min.js`;
    script.onload = () => resolve(window.L);
    script.onerror = () => reject(new Error("Leaflet nicht ladbar"));
    document.head.appendChild(script);
  });
  return leafletPromise;
}

class BkpDirectionMap extends LitElement {
  static properties = {
    hass: { attribute: false },
    _result: { state: true },
    _status: { state: true },
    _satellite: { state: true },
    _drawing: { state: true },
  };

  constructor() {
    super();
    this._satellite = true;
    this._status = "Lade Karte …";
  }

  async firstUpdated() {
    let L;
    try {
      L = await loadLeaflet();
    } catch (err) {
      this._status = "Die Karte ließ sich nicht laden. Trag die Gradzahl direkt ein.";
      return;
    }
    this.L = L;
    const lat = this.hass.config.latitude;
    const lon = this.hass.config.longitude;
    this.home = [lat, lon];
    const map = L.map(this.renderRoot.querySelector("#map"), { maxZoom: 21 }).setView(this.home, 19);
    this.map = map;
    this.sat = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      { maxNativeZoom: 19, maxZoom: 21, attribution: "Luftbild © Esri" }
    ).addTo(map);
    this.plain = L.tileLayer(
      "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
      { maxNativeZoom: 20, maxZoom: 21, subdomains: "abcd", attribution: "© OpenStreetMap © CARTO" }
    );
    L.circleMarker(this.home, { radius: 5, color: "#fff", weight: 2, fillColor: "#6b55c9", fillOpacity: 1 })
      .addTo(map)
      .bindTooltip("Zuhause");
    this.walls = L.layerGroup().addTo(map);
    this.sel = L.layerGroup().addTo(map);
    this.tmp = L.layerGroup().addTo(map);
    map.on("click", (ev) => this._mapClick(ev));
    // Im Dialog hat die Karte erst nach dem Aufbau ihre Größe.
    setTimeout(() => map.invalidateSize(), 200);
    this._loadBuildings();
  }

  _toXY([lat, lon]) {
    return [(lon - this.home[1]) * Math.cos(this.home[0] * RAD) * 111320, (lat - this.home[0]) * 110540];
  }

  _toLL([x, y]) {
    return [this.home[0] + y / 110540, this.home[1] + x / (Math.cos(this.home[0] * RAD) * 111320)];
  }

  async _loadBuildings() {
    this._status = "Lade Gebäude aus OpenStreetMap …";
    const [lat, lon] = this.home;
    const q = `[out:json][timeout:25];(way(around:120,${lat},${lon})["building"];relation(around:120,${lat},${lon})["building"];);out geom;`;
    let data;
    for (const url of OVERPASS) {
      try {
        const res = await fetch(url, {
          method: "POST",
          body: `data=${encodeURIComponent(q)}`,
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          signal: AbortSignal.timeout(20000),
        });
        if (res.ok) {
          data = await res.json();
          break;
        }
      } catch (err) {
        // nächsten Server versuchen
      }
    }
    if (!data) {
      this._status = "error";
      return;
    }
    let count = 0;
    for (const el of data.elements) {
      if (el.type === "way" && el.geometry) {
        this._addRing(el.geometry.map((p) => [p.lat, p.lon]));
        count++;
      }
      if (el.type === "relation") {
        for (const m of el.members || []) {
          if (m.role === "outer" && m.geometry) {
            this._addRing(m.geometry.map((p) => [p.lat, p.lon]));
            count++;
          }
        }
      }
    }
    this._status = count
      ? "Tipp auf die Hauswand, in der das Fenster ist."
      : "Keine Gebäude gefunden. Zeichne die Wand selbst ein.";
  }

  _addRing(coords) {
    const L = this.L;
    if (coords.length < 3) return;
    const xy = coords.map((c) => this._toXY(c));
    let area = 0;
    for (let i = 0; i < xy.length - 1; i++) area += xy[i][0] * xy[i + 1][1] - xy[i + 1][0] * xy[i][1];
    const ccw = area > 0;
    L.polygon(coords, { color: "#fff", weight: 1.5, opacity: 0.9, fillColor: "#6b55c9", fillOpacity: 0.12, interactive: false }).addTo(this.walls);
    for (let i = 0; i < coords.length - 1; i++) {
      const dx = xy[i + 1][0] - xy[i][0];
      const dy = xy[i + 1][1] - xy[i][1];
      const len = Math.hypot(dx, dy);
      if (len < 0.5) continue;
      const normal = ccw ? [dy / len, -dx / len] : [-dy / len, dx / len];
      const a = coords[i];
      const b = coords[i + 1];
      const line = L.polyline([a, b], { color: "#f0a020", weight: 14, opacity: 0 }).addTo(this.walls);
      line.on("mouseover", () => line.setStyle({ opacity: 0.55 }));
      line.on("mouseout", () => line.setStyle({ opacity: 0 }));
      line.on("click", (ev) => {
        L.DomEvent.stop(ev);
        if (!this._drawing) this._show(a, b, normal);
      });
    }
  }

  _mapClick(ev) {
    if (!this._drawing) return;
    const L = this.L;
    this._points = [...(this._points || []), [ev.latlng.lat, ev.latlng.lng]];
    L.circleMarker(ev.latlng, { radius: 5, color: "#fff", weight: 2, fillColor: "#f0a020", fillOpacity: 1 }).addTo(this.tmp);
    if (this._points.length === 2) {
      const [p, q] = this._points;
      const A = this._toXY(p);
      const B = this._toXY(q);
      const dx = B[0] - A[0];
      const dy = B[1] - A[1];
      const len = Math.hypot(dx, dy) || 1;
      this.tmp.clearLayers();
      this._drawing = false;
      this._points = [];
      this._show(p, q, [dy / len, -dx / len]);
    }
  }

  _toggleDraw() {
    this._drawing = !this._drawing;
    this._points = [];
    this.tmp?.clearLayers();
  }

  _show(a, b, normal) {
    const L = this.L;
    const az = (Math.atan2(normal[0], normal[1]) / RAD + 360) % 360;
    this._result = { a, b, normal, az };
    this.sel.clearLayers();
    L.polyline([a, b], { color: "#f0a020", weight: 7, opacity: 0.95 }).addTo(this.sel);
    const A = this._toXY(a);
    const B = this._toXY(b);
    const mid = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2];
    const len = Math.max(4, Math.min(9, Math.hypot(B[0] - A[0], B[1] - A[1]) * 0.6));
    const tip = [mid[0] + normal[0] * len, mid[1] + normal[1] * len];
    const side = [-normal[1], normal[0]];
    const h1 = [tip[0] - normal[0] * 1.6 + side[0] * 1.1, tip[1] - normal[1] * 1.6 + side[1] * 1.1];
    const h2 = [tip[0] - normal[0] * 1.6 - side[0] * 1.1, tip[1] - normal[1] * 1.6 - side[1] * 1.1];
    L.polyline([this._toLL(mid), this._toLL(tip)], { color: "#6b55c9", weight: 4 }).addTo(this.sel);
    L.polygon([this._toLL(tip), this._toLL(h1), this._toLL(h2)], { color: "#6b55c9", fillColor: "#6b55c9", fillOpacity: 1, weight: 1 }).addTo(this.sel);
  }

  _flip() {
    const r = this._result;
    if (r) this._show(r.a, r.b, [-r.normal[0], -r.normal[1]]);
  }

  _accept() {
    this.dispatchEvent(
      new CustomEvent("direction-picked", {
        detail: { value: Math.round(this._result.az) },
        bubbles: true,
        composed: true,
      })
    );
  }

  _layer(satellite) {
    this._satellite = satellite;
    if (!this.map) return;
    if (satellite) {
      this.map.removeLayer(this.plain);
      this.sat.addTo(this.map);
    } else {
      this.map.removeLayer(this.sat);
      this.plain.addTo(this.map);
    }
  }

  _sunRows() {
    const { latitude, longitude } = this.hass.config;
    const y = new Date().getFullYear();
    const hm = (t) => t.toLocaleTimeString("de-DE", { hour: "2-digit", minute: "2-digit" });
    return [
      ["Heute", new Date()],
      ["21. Juni", new Date(y, 5, 21)],
      ["21. Dezember", new Date(y, 11, 21)],
    ].map(([name, day]) => {
      const r = sunWindows(day, latitude, longitude, this._result.az);
      return html`<div><span>${name}</span><span>${r.length ? r.map(([a, b]) => `${hm(a)}–${hm(b)}`).join(", ") : "gar nicht"}</span></div>`;
    });
  }

  render() {
    const r = this._result;
    return html`
      <link rel="stylesheet" href="${LEAFLET}/leaflet.min.css" />
      <div class="bar">
        <button class=${this._satellite ? "on" : ""} @click=${() => this._layer(true)}>Luftbild</button>
        <button class=${this._satellite ? "" : "on"} @click=${() => this._layer(false)}>Karte</button>
        <button class=${this._drawing ? "on" : ""} @click=${this._toggleDraw}>Wand selbst einzeichnen</button>
      </div>
      <div id="map"></div>
      <div class="status">
        ${this._drawing
          ? "Tipp auf den Anfang der Wand, dann auf ihr Ende."
          : this._status === "error"
            ? html`Gebäude ließen sich nicht laden.
                <button @click=${this._loadBuildings}>Nochmal versuchen</button>
                oder zeichne die Wand selbst ein.`
            : this._status}
      </div>
      ${r
        ? html`<div class="result">
            <div class="deg"><b>${Math.round(r.az)}°</b><span>${directionName(r.az)}</span></div>
            <div class="hint">Der Pfeil zeigt nach draußen. Zeigt er ins Haus, tippe „Andere Seite“.</div>
            <div class="sun"><b>Sonne auf dieser Wand</b>${this._sunRows()}</div>
            <div class="bar">
              <button class="primary" @click=${this._accept}>${Math.round(r.az)}° übernehmen</button>
              <button @click=${this._flip}>Andere Seite</button>
            </div>
          </div>`
        : nothing}
    `;
  }

  static styles = css`
    :host { display: grid; gap: 8px; }
    #map { height: 320px; border-radius: 12px; overflow: hidden; z-index: 0; }
    .bar { display: flex; flex-wrap: wrap; gap: 6px; }
    button { font: inherit; font-size: 13px; border: 1px solid var(--divider-color); background: var(--card-background-color); color: var(--primary-text-color); border-radius: 999px; padding: 5px 12px; cursor: pointer; }
    button.on { border-color: var(--primary-color); color: var(--primary-color); }
    button.primary { background: var(--primary-color); border-color: var(--primary-color); color: var(--text-primary-color, #fff); }
    .status, .hint { font-size: 13px; color: var(--secondary-text-color); }
    .result { display: grid; gap: 8px; border: 1px solid var(--divider-color); border-radius: 12px; padding: 12px; }
    .deg { display: flex; align-items: baseline; gap: 8px; }
    .deg b { font-size: 32px; font-weight: 300; }
    .sun { display: grid; gap: 2px; font-size: 13px; }
    .sun div { display: flex; justify-content: space-between; gap: 8px; }
    .sun span:last-child { color: var(--secondary-text-color); font-variant-numeric: tabular-nums; }
  `;
}

customElements.define("bkp-direction-map", BkpDirectionMap);
