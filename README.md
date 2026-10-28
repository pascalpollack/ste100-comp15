# ste100-comp15 — Rebuild von ste100-comp14

Rebuild-Einreichung für Weekly Comp 15 "The Rebuild". Gegenstand: unsere
eigene Comp-14-Einreichung `ste100-comp14` (pascalpollack), die zu spät
kam, nicht gewertet wurde, aber trotzdem ein Feedback bekam.

## Was das Feedback sagt, und was der Rebuild tut

Das Feedback (unverändert in `feedback.md`) nennt zwei Fixes und einen
Vergleich mit einer eingebaute Frage. Der Rebuild trägt alle drei:

1. **Ship the reference, or ship excerpts with locators.** Das Original
   zitierte `ASD-STE100-Issue9.pdf` als Autorität hinter jeder erwarteten
   Antwort, und die Datei war in keinem Commit auf keiner Branch im Repo.
   Der PDF-Anteil des Fixes fällt weg, und zwar wegen der Lizenz: das
   Dokument gehört ASD, es ist frei *abrufbar* (asd-ste100.org), aber nicht
   frei *weiterveröffentlichbar*. Geschickt wird, was das Feedback als
   zweite Variante nennt: `rebuild/reference/extracts.md` enthält für jede
   Frage den wörtlichen Satz aus dem Dokument mit Regelnummer oder
   Wörterbucheintrag und der im Dokument gedruckten Seitenangabe. Jede
   erwartete Antwort ist damit in unter einer Minute gegen die Quelle
   nachprüfbar, und die Quelle selbst ist per URL und Version (Issue 9,
   2025-01-15) eindeutig.

2. **Ein dritter Arm und zwei Wiederholungen.** Neu: ein Rules-Only-Arm
   (`rules.md` allein im System-Prompt, kein Ordner), und jeder Arm läuft
   zweimal über den vollen Katalog. Dazu eine Q9-Batterie: die Frage allein,
   viermal pro Arm, als Antwort auf den Einwand, der ganze Befund ruhe auf
   einem Lauf pro Arm und Q9 könne je nach Harness wandern.

3. **Der korrigierte Schlüssel zu Q1.** Das Feedback hat vermutet, MAY sei
   kein zugelassenes Modalverb, und es konnte nicht entscheiden, weil das
   einzige Dokument, das es entscheiden könnte, fehlte. Jetzt ist es da, und
   es sagt: `may (v)` ist kein zugelassener Eintrag, sondern eine
   Wegweisung auf CAN (v) bzw. POSSIBLY (adv). Der Original-Schlüssel war
   falsch, der Original-Ordner lehrte das Modell die falsche Antwort, und
   `results.md` des Originals zählte sie als Sieg Treatment. Das wird hier
   nicht verschwiegen; die korrigierte Fassung steht in `questions.md`.

Neu aufgenommen sind die Fragen Q11 bis Q15 (Issue-9-Änderungen,
Bindestrichgruppen, Wegweisungswörter, Längenregeln): die Stellen, an denen
reines Trainingswissen ausläuft, das Feedback hat bemängelt, die Hälfte des
Original-Katalogs messe nichts.

## Aufbau

- `original/` — die Einreichung exakt bei dem gepinnten Commit `9a06b4d`
  (11.10.2026), das letzte Commit vor der Comp-14-Deadline.
- `feedback.md` — das Feedback, unverändert, wie geliefert.
- `questions.md` — der Fragenkatalog mit den erwarteten Antworten,
  vor jedem Lauf committet. Q1 bis Q10 wortgleich mit dem Original, Q1 mit
  korrigiertem Schlüssel, Q11 bis Q15 neu.
- `rebuild/` — der neue Treatment-Ordner: `identity.md` und `examples.md`
  unverändert, `rules.md` korrigiert und erweitert, `reference/` neu.
- `run-original/` — die drei Arme (Control, Rules-Only, voller Ordner) mit
  dem Original-Ordner bei `9a06b4d`, je zweimal.
- `run-rebuild/` — dieselben drei Arme mit dem Rebuild-Ordner, je zweimal.
- `q9-battery/` — Q9 allein, viermal pro Arm, alle fünf Arme.
- `results.md` — Frage für Frage, Lauf für Lauf, mit Gleichständen und
  Verlusten, nicht nur mit Siegen.
- `harness/` — die Runner, deterministisch, mit Manifest je Lauf.

## Methode, in einem Absatz

Dasselbe Modell in derselben Claude Code CLI, `--disallowedTools "*"`,
System-Prompt pro Arm, User-Prompt Wort für Wort identisch in allen Läufen,
eine Sitzung pro Lauf, Rohtranskript committet. Der Original-Lauf vom
11.10.2026 lief auf der Maschine des Autors mit CLI 2.1.258; diese Rebuild-
Läufe laufen auf einer zweiten Maschine (LAN, Windows, CLI-Version in jedem
Manifest), weil der PC die einzige Anlage ist, auf der die CLI mit einem
gültigen Login läuft. Die CLI-Version ist eine bekannte Variable und wird in
`results.md` mitgeführt.
