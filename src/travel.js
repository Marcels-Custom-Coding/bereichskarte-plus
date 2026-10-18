// Fahrzeiten des Rollladens aus seinem eigenen Verlauf.
// Shelly & Co. melden beim Fahren etwa jede Sekunde die Position. Daraus
// ergibt sich die Geschwindigkeit, getrennt für hoch und runter.

const DEFAULT_SECONDS = 20;
const memory = new Map();
const pending = new Map();

const median = (list) => {
  const s = [...list].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

function fromRows(rows) {
  const rates = { opening: [], closing: [] };
  let prev;
  let attrs = {};
  for (const row of rows) {
    if (row.a) attrs = row.a;
    const cur = {
      state: row.s,
      pos: attrs.current_position,
      t: row.lu ?? row.lc,
    };
    if (
      prev &&
      cur.state === prev.state &&
      rates[cur.state] &&
      typeof cur.pos === "number" &&
      typeof prev.pos === "number" &&
      cur.pos !== prev.pos
    ) {
      const dt = cur.t - prev.t;
      if (dt > 0.3 && dt < 5) rates[cur.state].push(Math.abs(cur.pos - prev.pos) / dt);
    }
    prev = cur;
  }
  const secs = (list) => (list.length >= 3 ? 100 / median(list) : undefined);
  return {
    open: secs(rates.opening),
    close: secs(rates.closing),
    samples: rates.opening.length + rates.closing.length,
  };
}

// Liefert sofort, was bekannt ist, und lädt im Hintergrund nach.
export function travelTimes(hass, entityId, onLoaded) {
  const known = memory.get(entityId);
  if (known && Date.now() - known.at < 6 * 3600000) return known;
  if (!known) {
    try {
      const stored = JSON.parse(localStorage.getItem(`bkp-travel-${entityId}`));
      if (stored && Date.now() - stored.at < 24 * 3600000) {
        memory.set(entityId, stored);
        return stored;
      }
    } catch (err) {
      // ohne Speicher geht es auch
    }
  }
  if (!pending.has(entityId)) {
    const end = new Date();
    const start = new Date(end.getTime() - 10 * 86400000);
    pending.set(
      entityId,
      hass
        .callWS({
          type: "history/history_during_period",
          start_time: start.toISOString(),
          end_time: end.toISOString(),
          entity_ids: [entityId],
          minimal_response: false,
          no_attributes: false,
          significant_changes_only: false,
        })
        .then((res) => {
          const learned = { ...fromRows(res[entityId] || []), at: Date.now() };
          memory.set(entityId, learned);
          try {
            localStorage.setItem(`bkp-travel-${entityId}`, JSON.stringify(learned));
          } catch (err) {
            // egal
          }
          onLoaded?.(learned);
        })
        .catch(() => memory.set(entityId, { at: Date.now() }))
        .finally(() => pending.delete(entityId))
    );
  }
  return known;
}

export function secondsFor(times, opening) {
  const s = opening ? times?.open : times?.close;
  return s ?? (opening ? times?.close : times?.open) ?? DEFAULT_SECONDS;
}

// Position jetzt, aus der letzten Meldung und der Fahrgeschwindigkeit.
export function livePosition(stateObj, times) {
  const pos = stateObj.attributes.current_position;
  if (typeof pos !== "number") return undefined;
  const opening = stateObj.state === "opening";
  if (!opening && stateObj.state !== "closing") return pos;
  const since = (Date.now() - Date.parse(stateObj.last_updated)) / 1000;
  // Bleibt eine Meldung aus, nicht endlos weiterrechnen.
  const t = Math.min(Math.max(since, 0), 3);
  const delta = (100 / secondsFor(times, opening)) * t;
  return Math.min(100, Math.max(0, pos + (opening ? delta : -delta)));
}
