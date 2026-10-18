// Sonnenstand und Sonnenschutz-Tipp.

const RAD = Math.PI / 180;

// Sonnenstand (Azimut von Nord im Uhrzeigersinn, Höhe über dem Horizont).
export function sunPos(date, lat, lon) {
  const d = date.getTime() / 86400000 + 2440587.5 - 2451545.0;
  const g = (357.529 + 0.98560028 * d) % 360;
  const q = (280.459 + 0.98564736 * d) % 360;
  const lng = q + 1.915 * Math.sin(g * RAD) + 0.02 * Math.sin(2 * g * RAD);
  const e = 23.439 - 0.00000036 * d;
  const ra =
    Math.atan2(Math.cos(e * RAD) * Math.sin(lng * RAD), Math.cos(lng * RAD)) /
    RAD;
  const dec = Math.asin(Math.sin(e * RAD) * Math.sin(lng * RAD)) / RAD;
  const gmst = (((18.697374558 + 24.06570982441908 * d) % 24) + 24) % 24;
  const h = ((((gmst * 15 + lon - ra) % 360) + 540) % 360) - 180;
  const el =
    Math.asin(
      Math.sin(lat * RAD) * Math.sin(dec * RAD) +
        Math.cos(lat * RAD) * Math.cos(dec * RAD) * Math.cos(h * RAD)
    ) / RAD;
  const az =
    (Math.atan2(
      -Math.sin(h * RAD),
      Math.tan(dec * RAD) * Math.cos(lat * RAD) -
        Math.sin(lat * RAD) * Math.cos(h * RAD)
    ) /
      RAD +
      360) %
    360;
  return { az, el };
}

export const angleDiff = (a, b) => Math.abs(((a - b + 540) % 360) - 180);

const NAMES = [
  "Nord", "Nordnordost", "Nordost", "Ostnordost", "Ost", "Ostsüdost",
  "Südost", "Südsüdost", "Süd", "Südsüdwest", "Südwest", "Westsüdwest",
  "West", "Westnordwest", "Nordwest", "Nordnordwest",
];
export const directionName = (az) => NAMES[Math.round(az / 22.5) % 16];

export const SUN_TIP_DEFAULTS = {
  position: 30,
  lux_threshold: 20000,
  spread: 70,
  min_elevation: 5,
  reopen: true,
  reopen_position: 100,
};

function onWall(sun, cfg) {
  return (
    sun.el > cfg.min_elevation && angleDiff(sun.az, cfg.direction) < cfg.spread
  );
}

// Zeitfenster, in denen die Sonne an einem Tag auf die Wand scheint.
export function sunWindows(day, lat, lon, direction, cfg = SUN_TIP_DEFAULTS) {
  const c = { ...SUN_TIP_DEFAULTS, ...cfg, direction };
  const ranges = [];
  let start = null;
  for (let m = 0; m <= 24 * 60; m += 5) {
    const t = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 0, m);
    const hit = onWall(sunPos(t, lat, lon), c);
    if (hit && !start) start = t;
    if (!hit && start) {
      ranges.push([start, t]);
      start = null;
    }
  }
  return ranges;
}

/**
 * Was der Tipp gerade vorschlägt: zumachen, wieder öffnen oder nichts.
 * Er schlägt nur vor, gefahren wird erst auf Tippen.
 */
export function computeSunTip(hass, tipConfig, coverPos, roomTemp) {
  if (!tipConfig || tipConfig.enabled === false) return null;
  if (typeof tipConfig.direction !== "number") return null;
  if (typeof coverPos !== "number") return null;
  const cfg = { ...SUN_TIP_DEFAULTS, ...tipConfig };
  const lat = hass.config?.latitude;
  const lon = hass.config?.longitude;
  if (typeof lat !== "number" || typeof lon !== "number") return null;

  const now = new Date();
  const sun = sunPos(now, lat, lon);
  let bright = true;
  if (cfg.lux_entity) {
    const lux = Number(hass.states[cfg.lux_entity]?.state);
    bright = !Number.isNaN(lux) && lux >= cfg.lux_threshold;
  } else if (cfg.weather_entity) {
    bright = ["sunny", "partlycloudy", "clear-day"].includes(
      hass.states[cfg.weather_entity]?.state
    );
  }
  const warmEnough =
    typeof cfg.min_temp !== "number" ||
    (typeof roomTemp === "number" && roomTemp >= cfg.min_temp);

  const shining = onWall(sun, cfg) && bright;
  if (shining && warmEnough && coverPos > cfg.position + 2) {
    return { kind: "close", target: cfg.position };
  }

  // Wieder öffnen erst, wenn die Sonne weitergewandert ist (nicht bei jeder
  // Wolke), nur tagsüber und nur, wenn sie vor kurzem noch drauf stand.
  if (!onWall(sun, cfg) && cfg.reopen && sun.el > 0) {
    const earlier = sunPos(new Date(now.getTime() - 90 * 60000), lat, lon);
    const nearShade = Math.abs(coverPos - cfg.position) <= 5;
    if (
      onWall(earlier, cfg) &&
      nearShade &&
      coverPos < cfg.reopen_position - 2
    ) {
      return { kind: "open", target: cfg.reopen_position };
    }
  }
  return null;
}
