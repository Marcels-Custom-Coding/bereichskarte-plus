# Bereichskarte Plus

Die Bereichskarte von Home Assistant, nur dass du selbst bestimmst, welche Werte unter dem Namen stehen.

Die eingebaute Bereichskarte bildet die Infozeile aus allen Sensoren im Bereich: Temperatur und Luftfeuchte als Mittelwert, Leistung als Summe. Hängt ein Schimmelindikator (in %) oder ein Mittelwert-Sensor im selben Raum, stimmen die Zahlen nicht mehr. Diese Karte behält alles von der Bereichskarte (Bild, Kamera, Warnsymbole, Schaltknöpfe) und ersetzt nur die Infozeile.

## Was du einstellen kannst

Alles im grafischen Editor, Abschnitt **Werte in der Infozeile**:

- **Temperatur / Luftfeuchte**: einen festen Sensor wählen. Leer gelassen gilt der Sensor aus den Bereichseinstellungen, sonst der Mittelwert.
- **Leistung (Summe)**: alle Leistungssensoren im Bereich mit Schalter. Was doppelt zählt, schaltest du ab. Sensoren aus anderen Bereichen kannst du dazunehmen.
- **Beliebiger Sensor**: zeigt den Zustand genau eines Sensors.
- Reihenfolge ändern, Werte entfernen, **Symbole vor den Werten** ein- oder ausschalten, eigene Symbole wählen.

## Ansichten im Bild

**Rollladen:** Fährst du den Rollladen über die Taste unten, zeigt das Bild ein Fenster. Am weißen Griff ziehst du die Höhe, daneben stehen Auf, Stopp und Zu.

**Sonnenschutz-Tipp:** Scheint die Sonne aufs Fenster, erscheint im Bild „Sonnenschutz 30 %?“. Ein Tipp öffnet die Rollladen-Ansicht mit „Übernehmen“. Die Karte fährt nie von selbst. Die Fensterrichtung wählst du im Editor auf einer Karte: Hauswand antippen, fertig.

**Klima:** Oben rechts im Bild steht ein kleines Klima-Feld. Ein Tipp öffnet die Bedienung mit an und aus, Betriebsart, Zieltemperatur und Leistung, auf Wunsch mit Leistungsverlauf an der Seite.

**Startansicht:** Bild oder gleich die Klima-Ansicht (`default_view: climate`). Andere Ansichten kehren nach 20 Sekunden ohne Berührung dorthin zurück (einstellbar), mit dem × kommst du jederzeit zum Bild.

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
shutter_view:
  entity: cover.marcel_rolladen
  sun_tip:
    direction: 162
    position: 30
    lux_entity: sensor.wettersensor_beleuchtungsstarke
    lux_threshold: 20000
climate_view:
  entity: climate.klimaanlage
  power_entity: sensor.klimaanlage_leistung
  show_history: true
  history_hours: 6
view_timeout: 20
default_view: climate
features:
  - type: area-controls
```

Alle übrigen Schlüssel sind die der eingebauten Bereichskarte. Ohne `sensors` verhält sich die Karte genau wie das Original.
