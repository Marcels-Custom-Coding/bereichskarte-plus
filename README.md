# Bereichskarte Plus

Die Bereichskarte von Home Assistant, nur dass du selbst bestimmst, welche Werte unter dem Namen stehen.

Die eingebaute Bereichskarte bildet die Infozeile aus allen Sensoren im Bereich: Temperatur und Luftfeuchte als Mittelwert, Leistung als Summe. Hängt ein Schimmelindikator (in %) oder ein Mittelwert-Sensor im selben Raum, stimmen die Zahlen nicht mehr. Diese Karte behält alles von der Bereichskarte (Bild, Kamera, Warnsymbole, Schaltknöpfe) und ersetzt nur die Infozeile.

## Was du einstellen kannst

Alles im grafischen Editor, Abschnitt **Werte in der Infozeile**:

- **Temperatur / Luftfeuchte**: einen festen Sensor wählen. Leer gelassen gilt der Sensor aus den Bereichseinstellungen, sonst der Mittelwert.
- **Leistung (Summe)**: alle Leistungssensoren im Bereich mit Schalter. Was doppelt zählt, schaltest du ab. Sensoren aus anderen Bereichen kannst du dazunehmen.
- **Beliebiger Sensor**: zeigt den Zustand genau eines Sensors.
- Reihenfolge ändern, Werte entfernen, **Symbole vor den Werten** ein- oder ausschalten, eigene Symbole wählen.

## Installation

HACS → oben rechts ⋮ → **Benutzerdefinierte Repositories** → diese Adresse, Typ **Dashboard**. Danach „Bereichskarte Plus“ herunterladen und die Seite neu laden.

In der Kartenauswahl heißt sie **Bereichskarte Plus**.

## YAML

```yaml
type: custom:bereichskarte-plus
area: marcel
display_type: camera
show_icons: true
sensors:
  - type: temperature
    entity: sensor.raum_temperatur
  - type: humidity
    entity: sensor.raum_luftfeuchte
  - type: power
    exclude:
      - sensor.klima_leistung_1h_mittel
    include: []
  - type: entity
    entity: sensor.co2
    icon: mdi:molecule-co2
features:
  - type: area-controls
```

Alle übrigen Schlüssel sind die der eingebauten Bereichskarte. Ohne `sensors` verhält sich die Karte genau wie das Original.
