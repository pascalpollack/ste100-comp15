# Treatment-Ordner (Rebuild)

Vier Dateien statt dreien: `identity.md`, `rules.md`, `examples.md` und
neu `reference/extracts.md`.

Gegenüber dem Original-Ordner (Commit `9a06b4d`) ist genau eines
geändert und eines neu:

- `identity.md` — unverändert.
- `rules.md` — der Abschnitt "Modalverben" war falsch: er listete MAY als
  zugelassenes Auxiliary modal verb. Im Dictionary ist `MAY (v)` kein
  Eintrag; `may (v)` weist auf CAN (v) bzw. POSSIBLY (adv) (Seite
  2-1-M4). Korrigiert: zugelassen sind CAN (v), CANNOT (v), MUST (v),
  WILL (v). Dazu drei fehlende Stellen aus Teil 1: Section 5 (Rule 5.1,
  5.3), Section 6 (Rule 6.6) und Method 2 (Bindestrichgruppen, Seite
  1-2-3). Die Quelle-Zeile zeigt jetzt auf `reference/extracts.md`, nicht
  auf ein PDF, das es im Repo nie gab.
- `examples.md` — unverändert.
- `reference/extracts.md` — neu. Für jede Testfrage der wörtliche Satz
  aus ASD-STE100 Issue 9 mit Regelnummer oder Wörterbucheintrag und
  Seitenangabe. Das ist der Teil, der jede erwartete Antwort in
  `../questions.md` in unter einer Minute nachprüfbar macht. Das PDF wird
  wegen der Lizenz nicht mitverteilt (frei verfügbar unter
  asd-ste100.org); das steht auch hier.
