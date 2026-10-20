// Gemeinsame Helfer für Karte und Editor.

export const KINDS = {
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

export const DEFAULT_SENSORS = [
  { type: "temperature" },
  { type: "humidity" },
  { type: "power" },
];

const POWER_TO_WATT = { mW: 0.001, W: 1, kW: 1000, MW: 1e6, GW: 1e9 };

const isUsable = (stateObj) =>
  stateObj && !["unavailable", "unknown"].includes(stateObj.state);

export const isNumeric = (stateObj) =>
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

export function formatNumber(hass, value, digits = 1) {
  return new Intl.NumberFormat(numberLocale(hass), {
    maximumFractionDigits: digits,
  }).format(value);
}

const withUnit = (value, unit) =>
  unit ? `${value}${unit === "°" ? "" : " "}${unit}` : value;

export function formatState(hass, stateObj) {
  if (!isUsable(stateObj)) return undefined;
  if (typeof hass.formatEntityState === "function") {
    return hass.formatEntityState(stateObj);
  }
  return withUnit(stateObj.state, stateObj.attributes.unit_of_measurement);
}

// Suchen über alle Entitäten sind teuer (bei Marcel ~4500). Ergebnisse gelten,
// bis sich die Entitätenliste ändert; Home Assistant ersetzt dann hass.entities.
const lookups = new WeakMap();
function cached(hass, key, compute) {
  let map = lookups.get(hass.entities);
  if (!map) {
    map = new Map();
    lookups.set(hass.entities, map);
  }
  if (!map.has(key)) map.set(key, compute());
  return map.get(key);
}

// Alle Entitäten eines Bereichs: eigener Bereich oder der Bereich des Geräts.
export function areaEntityIds(hass, areaId, deviceClass) {
  if (!hass || !areaId) return [];
  return cached(hass, `sensor|${areaId}|${deviceClass ?? ""}`, () =>
    findAreaSensors(hass, areaId, deviceClass)
  );
}

function findAreaSensors(hass, areaId, deviceClass) {
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

// Ganze Watt reichen; Nachkommastellen kosten in der Infozeile nur Platz.
export function formatWatt(hass, watt) {
  return withUnit(formatNumber(hass, watt, Math.abs(watt) >= 10 ? 0 : 1), "W");
}

// In der Infozeile zählt jeder Pixel: zwischen Zahl und Einheit nur ein
// schmales Leerzeichen.
const tight = (text) =>
  typeof text === "string"
    ? text.replace(/^(-?[\d.,]+)[\s ]+(\S{1,6})$/, "$1 $2")
    : text;

// Ein Wert der Infozeile: Text plus Symbol.
export function computeItem(hass, area, item) {
  const kind = KINDS[item.type] ? item.type : "entity";
  const icon = item.icon || KINDS[kind].icon;

  if (kind === "entity") {
    const stateObj = item.entity ? hass.states[item.entity] : undefined;
    return {
      text: tight(formatState(hass, stateObj)),
      icon:
        item.icon || stateObj?.attributes.icon || KINDS.entity.icon,
    };
  }

  if (kind === "power") {
    const sum = powerSum(hass, powerEntityIds(hass, area.area_id, item));
    return {
      text: sum === undefined ? undefined : tight(formatWatt(hass, sum)),
      icon,
    };
  }

  // Temperatur oder Luftfeuchte: gewählter Sensor, dann Bereichseinstellung,
  // zuletzt der Median aller passenden Sensoren im Bereich.
  const chosen = item.entity || area[`${kind}_entity_id`];
  if (chosen) {
    return { text: tight(formatState(hass, hass.states[chosen])), icon };
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
    text: tight(withUnit(formatNumber(hass, median(values)), unit)),
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


// Entitäten einer Domäne im Bereich (eigener Bereich oder Bereich des Geräts).
export function areaDomainIds(hass, areaId, domain) {
  if (!hass || !areaId) return [];
  return cached(hass, `domain|${areaId}|${domain}`, () => findAreaDomain(hass, areaId, domain));
}

function findAreaDomain(hass, areaId, domain) {
  return Object.entries(hass.entities || {})
    .filter(([id, entry]) => {
      if (!id.startsWith(`${domain}.`) || entry.entity_category || entry.hidden) {
        return false;
      }
      const area =
        entry.area_id ||
        (entry.device_id ? hass.devices?.[entry.device_id]?.area_id : undefined);
      return area === areaId && hass.states[id];
    })
    .map(([id]) => id);
}

// Klimagerät: eines, das kühlen kann, sonst das erste.
export function pickClimate(hass, areaId) {
  if (!hass || !areaId) return undefined;
  return cached(hass, `climate|${areaId}`, () => findClimate(hass, areaId));
}

function findClimate(hass, areaId) {
  const ids = areaDomainIds(hass, areaId, "climate");
  return (
    ids.find((id) => hass.states[id].attributes.hvac_modes?.includes("cool")) ||
    ids[0]
  );
}

// Leistungssensor am selben Gerät, Mittelwerte zuletzt.
export function pickPower(hass, climateId) {
  if (!hass || !climateId) return undefined;
  return cached(hass, `power|${climateId}`, () => findPower(hass, climateId));
}

function findPower(hass, climateId) {
  const device = hass.entities?.[climateId]?.device_id;
  if (!device) return undefined;
  const ids = Object.entries(hass.entities)
    .filter(
      ([id, e]) =>
        e.device_id === device &&
        id.startsWith("sensor.") &&
        hass.states[id]?.attributes.device_class === "power"
    )
    .map(([id]) => id);
  return ids.find((id) => !/mittel|avg|average|mean/i.test(id)) || ids[0];
}
