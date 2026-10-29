# results.md — Comp 15 "The Rebuild", ste100-comp14

**Was hier steht.** Die Auswertung des Rebuilds der eigenen Comp-14-
Einreichung `ste100-comp14`, gepinnt bei `9a06b4d` (11.10.2026, letztes
Commit vor der Comp-14-Deadline), im Repo als `original/` ab Commit
`aaa27bb`. Feedback: David, Comp #14, 24.10.2026, unverändert in
`feedback.md`. Spät eingereicht, keine Platzierung, Feedback trotzdem
vollständig.

**Die drei Feedbackpunkte und was der Rebuild dafür getan hat.**

1. *Ship the reference, or ship excerpts with locators.* →
   `rebuild/reference/extracts.md`: für jede der 15 Fragen der wörtliche
   Satz aus dem Dokument, mit Regelnummer oder Wörterbucheintrag und der
   im Dokument gedruckten Seitenangabe. Das PDF wird nicht
   weiterverteilt, wegen der Lizenz: frei abrufbar auf asd-ste100.org,
   nicht frei weiterveröffentlichbar; das steht im README. Die vom
   Richter genannte Prüfung, *can every expected answer be traced to
   something in reference?*, geht damit jetzt durch.
2. *Ein dritter Arm und zwei Wiederholungen.* → Fünf Arme (control,
   o_rules, o_folder, r_rules, r_folder), jeder zweimal über den vollen
   Katalog, dazu Q9-Batterie: Q9 allein, viermal pro Arm.
3. *Overbuilt test, Fragen, an denen Trainingswissen ausläuft.* → Q11
   bis Q15 neu, mit `questions.md` vor jedem Lauf committet:
   Issue-9-Änderungen (Q11), Method-2-Cluster (Q12), Dictionary-Formen
   (Q13), Wegweisungswörter (Q14), Längenregeln (Q15).

**Die Schlüsselkorrektur zu Q1.** Das Original listete MAY als
zugelassenes Modalverb. Das Dokument selbst sagt: `may (v)` ist kein
zugelassener Eintrag, die Spalte "Approved meaning/ALTERNATIVES" weist auf
CAN (v) bzw. POSSIBLY (adv). Zugelassen sind genau vier Einträge: CAN (v)
(2-1-B10), CANNOT (v) (2-1-C1), MUST (v) (2-1-M9), WILL (v) (2-1-W4).
"MUST NOT" ist die Konstruktion MUST (v) + NOT (adv), keine eigene
Eintragung. Die Konsequenz, gemessen an dieser Auswertung: der
Original-Ordner lehrte das Modell die falsche Antwort (sein `rules.md`:
"Zugelassen: CAN, MAY, MUST, MUST NOT, WILL"), und die Original-`results.md`
zählte sie als Sieg Treatment. Mit dem alten Schlüssel bestünden alle 10
Läufe hier Q1, mit dem korrigierten besteht keiner.

## Laufkonfiguration

- Modell: `claude-sonnet-5`, gepinnt in `harness/config.mjs`.
- CLI: Claude Code **2.1.312**, in jedem Manifest; Maschine: LAN-PC
  (`C:\Users\polla\comp15r`), die einzige Anlage mit gültigem Login.
- Flags: `--setting-sources project --permission-mode dontAsk
  --strict-mcp-config --disable-slash-commands --disallowedTools '*'
  --output-format stream-json --verbose`.
- System-Prompt je Arm, User-Prompt wortgleich in allen Läufen (15 Fragen;
  Batterie: Q9 allein), Prompt-Transport via stdin. Die erste Fassung
  transportierte den Prompt als `-p`-Argument; Anführungszeichen führten
  zur Trunkation, die Läufe waren ungültig und liegen in
  `sicherungen/pclaeufe_ungueltig_2026-10-28/`. Fix in Commit `425c81b`,
  danach neu gefahren.
- Leak-Check vor jedem Lauf: keine user-level Instruktionen
  (`AGENTS.md`, `.claude/CLAUDE.md`) auf dem PC; vor den Läufen aus dem
  Sichtfeld entfernt, danach zurückgestellt, SHA256-Hashes identisch.
- Preflight: nach der ersten Session geprüft, dass alle 15 Fragen im
  Transkript sichtbar sind, sonst Abbruch.
- Timeout 420 s (Batterie 180 s), max. 3 Versuche pro Session.
- Rohtranskripte (stream-json) in `run-original/`, `run-rebuild/`,
  `q9-battery/`; Manifeste mit Modell, Tool-Version und Prompt-Pfaden.
- Reproduktion: `node harness/run.mjs full [arm ...]`,
  `node harness/run.mjs battery [arm ...]`; fertige Prompts in
  `harness/.prompts/`.

Arme, Unterschied nur im System-Prompt, alle Stage-Verzeichnisse leer:

| Arm | Inhalt im System-Prompt | Größe |
|---|---|---|
| control | Baseline ohne Regelinhalt | 114 B |
| o_rules | Original-`rules.md` allein | 2001 B |
| o_folder | Original identity+rules+examples | 4627 B |
| r_rules | Rebuild-`rules.md` allein | 3716 B |
| r_folder | Rebuild identity+rules+examples+`reference/extracts.md` | 12300 B |

Laufzeit: 28.10.2026 23:30 bis 29.10.2026 01:09, alle 30 Sessions
(10 full + 20 Batterie) sauber beendet, 0 Fehler-Sessions.

## Bewertungsmaßstab

Vier Klassen, festgelegt, bevor die Transkripte gelesen wurden:

- **R** richtig: die erwartete Antwort aus `questions.md` (vor den Läufen
  committet) ist da.
- **P** teilweise: Kern richtig, mit Fehlzusatz, fehlendem Kernstück oder
  falscher Regelnummer.
- **D** abgelehnt: keine materielle Antwort, offene Verweigerung.
- **W** falsch: widerspricht dem Schlüssel.

Ein Auswerter, mit Frage-für-Frage-Notizen weiter unten, damit ein zweiter
Auswerter auf Frage-Ebene widersprechen kann, nicht auf Schlüssel-Ebene.

## Ergebnis je Frage je Lauf

| Q | control r1/r2 | o_rules r1/r2 | o_folder r1/r2 | r_rules r1/r2 | r_folder r1/r2 |
|---|---|---|---|---|---|
| 1 | P P | P P | P P | P P | P P |
| 2 | P P | P P | P P | P P | R P |
| 3 | R P | R R | P P | P P | P P |
| 4 | R R | R R | R R | R R | R R |
| 5 | P R | R R | R P | P P | R R |
| 6 | R R | R R | R R | R R | R R |
| 7 | P P | R R | P P | P P | P P |
| 8 | R R | R R | R R | R R | R R |
| 9 | P P | R R | P P | P P | P P |
| 10 | R R | R R | P P | R R | R P |
| 11 | D D | D D | D D | D D | D D |
| 12 | P P | P P | P P | P P | P P |
| 13 | R R | R R | P R | R R | R R |
| 14 | R R | R R | R R | R R | R R |
| 15 | R R | R P | R R | R R | D R |

## Summen je Arm (30 Antworten)

| Arm | R | P | D | W |
|---|---|---|---|---|
| control | 16 | 12 | 2 | 0 |
| o_rules | 21 | 7 | 2 | 0 |
| o_folder | 12 | 16 | 2 | 0 |
| r_rules | 14 | 14 | 2 | 0 |
| r_folder | 15 | 12 | 3 | 0 |

## Q9-Batterie (Q9 allein, viermal pro Arm)

| Arm | r1 | r2 | r3 | r4 |
|---|---|---|---|---|
| control | P | P | P | P |
| o_rules | R | R | R | R |
| o_folder | P | P | P | P |
| r_rules | P | P | P | P |
| r_folder | P | P | P | P |

Die 16 P-Antworten tragen 16 verschiedene erfundene Ausnahmen, keine kommt
zweimal vor. Die Regel selbst (amerikanische Schreibweise) kennen 20/20.

## Notizen je Frage, für den zweiten Auswerter

- **Q1.** Alle 10 Läufe listen MAY als zugelassen. Bei r_rules und r_folder
  war die ausdrückliche Korrektur im Kontext (Rebuild-`rules.md`: "MAY ist
  kein zugelassener Eintrag"), gelistet wurde MAY trotzdem, 2/2 in beiden
  Armen. Vier Läufe listen MUST NOT als eigenen Eintrag.
- **Q2.** REPAIR liefert nur r_folder r1 ("Remove the panel before you
  repair the engine."), alle anderen 9 "fix". `examples.md` verdient genau
  diese Frage (Richter); gemessen hier: 0/2 bei o_folder, 1/2 bei r_folder,
  `examples.md` ist im Rebuild unverändert.
- **Q3.** Den Infinitiv nennen 3/10; die restlichen 7 lassen ihn aus.
- **Q5.** "Eine Handlung pro Satz" nennen o_rules 2/2, r_folder 2/2,
  o_folder 1/2; r_rules nennt nur "in der Reihenfolge".
- **Q6.** 10/10 R (Kontraktionen abgelehnt). Rule 4.2 zitieren nur die
  o_rules-Läufe; die r_folder-Läufe vermerken offen, die Regelnummer nicht
  belegen zu können.
- **Q7.** "Agent unbekannt" allein, wörtlich an Rule 3.6: nur o_rules 2/2.
  8 Läufe ergänzen "unwichtig" oder "Fokus auf Objekt/Ergebnis".
- **Q8.** 10/10 R (Partizipialkonstruktion in einfache aktive Sätze
  aufgelöst). r_folder r2 zitiert 3.2, wo 3.5 gilt.
- **Q9.** Die korrekte Ausnahme ("andere offizielle Vorgaben") liefern
  o_rules 2/2 plus Batterie 4/4. Alle übrigen 8 full-Läufe und 16
  Batterie-Läufe erfinden Ausnahmen: Eigennamen, Firmenwörterbuch,
  durchgängig britische Schreibweise, Merriam-Webster-Vorgabe.
- **Q10.** Die richtige Regelnummer (1.2) bei 7/10. o_folder zitiert 1.3
  (r1) und 1.1 (r2), r_folder r2 zitiert 1.1.
- **Q11.** 10/10 D, 0 Erfindungen. r_folder hatte die wörtliche Antwort im
  Kontext (`extracts.md`, Highlights HI-2: "Category 21, Law and
  regulations, added. Category 22, Animals, plants, and other life forms,
  added.") und lehnte trotzdem ab.
- **Q12.** 0/10 reproduzieren die kanonische Fassung "main-gear-door
  retraction-winch handle", die bei den r-Armen wörtlich im Kontext stand
  (`rules.md` Method 2, `extracts.md`). Alle Läufe bieten eine
  Präpositions-Umfassung an.
- **Q13.** 9/10 R; o_folder r1 antwortet richtig, aber offen "eine
  Vermutung, keine Prüfung".
- **Q15.** Die Zahlen (20 Wörter, 6 Sätze) liefern 8 Läufe aus
  Trainingswissen ohne Regelnummer. o_rules r2 ohne die "6". r_folder r1
  lehnt die Zahlen ab, r_folder r2 liefert sie "aus allgemeiner
  Erinnerung", die Zahlen standen im Kontext (Rule 5.1, Rule 6.6 in
  `rules.md` und `extracts.md`). Die eingebaute Frage des Richters
  (Satz- und Absatzlängen, in `rules.md` des Originals nicht enthalten):
  Control und o-Arme liefern die Zahlen, o_folder r1 mit offenem Vorbehalt,
  r_folder r1 verweigert.

## Befund, gerankt

**Eine Hauptursache: der Effekt sitzt in der Zeile der Regel, nicht im
Ordner, und der Ordner verwässert ihn.**

1. **Der beste Arm ist o_rules (21/30).** Der Original-Ordner mit derselben
   `rules.md` misst 12/30, also 9 unter seiner eigenen Regeln-Datei und 4
   unter dem Control. Der Rebuild-Ordner (15/30) liegt auf dem
   Rebuild-Rules-Arm (14/30). Maßstäb an der committed decision rule von
   Jeff (Comp 14): *the folder earns its place only if it beats the same
   documents with no instructions; threshold 9/10 right answers.*
   o_folder: 12/30 = 4/10 pro Wiederholungspaar, schlägt die Regeln-Datei
   nicht. r_folder: 15/30 = 5/10, schlägt sie nicht. In beiden Fällen
   verdient sich der Ordner nicht.
2. **Der Rebuild hat das Original nicht geschlagen: r_rules 14 < o_rules
   21.** Frage für Frage: Q3 0/2 statt 2/2, Q5 0/2 statt 2/2, Q7 0/2 statt
   2/2, Q9 0/2 statt 2/2 (schlechter), Q15 2/2 statt 1/2 (besser). Die
   größere Regel-Datei (3417 B, englische wörtliche Zitate) produziert
   weniger wörtliche Reproduktion als die kürzere deutsche Umformulierung
   (1702 B). Gemessen an 1.14: deutsche Umformulierung → korrekte Ausnahme
   6/6 (2 full + 4 Batterie); englisches wörtliches Zitat → erfundene
   Ausnahme 6/6. Kleine n, konsistente Richtung in beiden Messreihen.
3. **Q9 als "schärfster Fall" ist tot.** Die Comp-14-Einreichung behauptete,
   der Ordner gewinne Q9. Der Richter konnte es nicht reproduzieren
   (Messages API), und dieser CLI-Lauf nicht: o_folder 0/6, r_folder 0/6,
   o_rules 6/6. Die Behauptung wird hier zurückgezogen.
4. **Das Modell erfindet Ausnahmen, nicht Regeln** (die schärfere
   Formulierung des Richters, hier bestätigt): die Regel kennen 20/20,
   die Ausnahme wird 16/20 erfunden.
5. **MAY ist aus dem Kontext nicht korrigierbar.** 10/10 listen MAY,
   davon 4 mit der ausdrücklichen Korrektur im Kontext.
6. **Die Verweigerung ist konsistent, die Quellen im Kontext werden
   ungenutzt gelassen.** Q11: 10/10 D, 0 Erfindungen (der identity.md-
   Effekt, den der Richter erkannt hat, ist real). Aber r_folder verweigert
   trotz wörtlicher Antwort im Kontext, und bei Q12 nutzt kein Lauf die
   wörtliche Kanonform aus dem eigenen Kontext.

## Gleichstände und Regressions, wie verlangt

**Gleichstände:** Q4, Q6, Q8, Q14 sind in allen Armen identisch
(10/10 R in jeder). Q1 steht in allen 10 auf P, Q12 in allen 10 auf P,
Q11 in allen 10 auf D. Vier von fünfzehn Fragen unterscheiden keinen Arm,
und zwei entscheiden sich gar nicht.

**Regressions:**

- r_rules gegen o_rules: −7 (21→14).
- o_folder gegen o_rules: −9 (21→12).
- o_folder gegen control: −4 (16→12). Der Original-Ordner misst auf diesem
  Satz unter dem kahlen Modell, wohingegen er in Comp 14 fünf von zehn
  gewann.
- r_folder gegen control: −1 (16→15).

## Was besser wurde

- **Die Referenz ist jetzt prüfbar.** Alle 15 erwarteten Antworten lassen
  sich gegen `extracts.md` mit wörtlichem Satz, Regelnummer und Seite
  nachvollziehen. Das war der einzige Punkt des Feedbacks, der die
  Einreichung von "claims" zu "checks" macht.
- **Zwei Wiederholungen plus Batterie zeigen die Varianz.** Q9 war in
  Comp 14 ein Lauf, jetzt sind es sechs pro Arm, und sie zeigt, worauf
  die alte Behauptung ruhte.
- **Die Q1-Schlüsselkorrektur ist im Repo.** Der alte Schlüssel zählte die
  falsche Antwort als Sieg; das steht hier als messbare Tatsache, nicht
  als Fußnote.
- **Acht von 15 Fragen trennen die Arme** (Q2, Q3, Q5, Q7, Q9, Q10, Q13,
  Q15); Q1 trennt den Schlüssel; Q4, Q6, Q8, Q14 sind gesättigt; Q11 und
  Q12 entscheiden sich in 10/10 nicht.

## Kontingent-Lage

Gemessen auf dem PC vor den Läufen (OAuth-Endpunkt): five_hour 3 %,
seven_day 95 %, iguana_necktie (250-USD-Kappe) 100 %. Alle 30 Sessions
beendet, ohne 429, die 10 full-Läufe passten ins Fünfstundenfenster, die
Woche mit ihren 95 % hat sie getragen. Die vorgesehene Kürzung auf einen
Lauf pro Arm (notiert in der 00:41er-Meldung) war nicht nötig.

## Grenzen

- n=2 pro Arm über den vollen Satz; die Batterie liefert n=4 nur für Q9.
- Ein Modell, eine CLI, eine Maschine. Der Richter lief die Messages API;
  der Harness-Unterschied bleibt für die Q9-Gruppe (sein Caveat, hier
  genauso gültig).
- Q11/Q12: die r-Arme hatten die Antwort im Kontext und verweigerten bzw.
  umfassten trotzdem. Nicht getrennt werden kann, ob das die identity-
  Verweigerung ist oder Aufmerksamkeit in einem 12-kB-System-Prompt. Das
  ist die Grenze dieses Designs, nicht ein Messfehler.
- Die Wertung stammt von einem Auswerter; die Notizen erlauben den
  Widerspruch auf Frage-Ebene.
