# Fragen und erwartete Antworten (vor den Läufen festgelegt)

Fünfzehn Fragen zu ASD-STE100 Issue 9 (2025-01-15), *Simplified Technical
English*. Q1 bis Q10 sind die Originalfragen aus Commit `9a06b4d`,
wortgleich. Q11 bis Q15 sind neu und nach dem Feedback gewählt: sie messen
die Stellen, an denen reines Trainingswissen ausläuft (Issue-9-Änderungen
gegenüber früheren Ausgaben, Mehrfachnomengruppen, Wegweisungswörter im
Dictionary, Längenregeln). Jede erwartete Antwort ist an einem wörtlichen
Satz aus dem Dokument festgemacht; der Satz mit Regelnummer und PDF-Seite
steht in `rebuild/reference/extracts.md`.

**Korrigierter Schlüssel zu Q1.** Der Schlüssel der Original-Einreichung
listete MAY als zugelassenes Modalverb. Das Feedback hat darauf
hingewiesen, dass mehrere Quellen das Gegenteil sagen. Nachgeprüft im
Dokument selbst: `may (v)` ist **kein** zugelassener Eintrag; die Spalte
"Approved meaning/ALTERNATIVES" weist auf CAN (v) (Möglichkeit) bzw.
POSSIBLY (adv) (Unsicherheit). Der Schlüssel steht hier in der korrigierten
Fassung. Die Konsequenz für das Original (sein Treatment-Ordner lehrte das
Modell die falsche Antwort, und results.md zählte sie als Sieg) wird in
`results.md` ausgetragen.

---

**Q1.** Ist "should" ein zugelassenes Modalverb in STE? Wenn nicht, nenne die
zugelassenen Modalverben.

*Erwartet (korrigiert):* Nein. "should" steht nicht im Wörterbuch (Wegweisung:
MUST (v)). Die zugelassenen Modalverben sind CAN, CANNOT, MUST und WILL
(jeweils als "Auxiliary modal verb" im Dictionary). MAY ist kein zugelassener
Eintrag; es wird auf CAN (v) bzw. POSSIBLY (adv) gewiesen. "MUST NOT" ist
keine eigene Eintragung, sondern MUST (v) + NOT (adv).

---

**Q2.** Schreibe folgenden Satz in STE um: "The technician should remove the
panel before he fixes the engine."

*Erwartet:* Imperativ statt "should", zugelassenes Verb REPAIR statt "fix"
(FIX hat keinen Dictionary-Eintrag, REPAIR (v) ist zugelassen), kurzer Satz.
Beispiel einer zulässigen Fassung: "Remove the panel before you repair the
engine." (Rule 4.1; Dictionary: REPAIR (v) zugelassen, should (v) -> MUST (v).)

---

**Q3.** Welche Verbformen und Zeitformen lässt STE zu (Rule 3.2)?

*Erwartet:* Infinitiv, Imperativ, einfaches Präsens, einfaches Präteritum,
einfaches Futur, Partizip Perfekt nur als Adjektiv. Nicht zugelassen:
Present Perfect, Past Perfect, Progressive-Formen und andere komplexe
Verbkonstruktionen (Rule 3.2, Rule 3.4).

---

**Q4.** Richtig oder falsch: "The unit is being tested" ist STE-konform.

*Erwartet:* Falsch. "is being tested" ist eine Progressive-Form, die Rule 3.2
nicht zulässt. Zulässig wäre z.B. "Test the unit." (Imperativ) oder
"Technicians test the unit." (einfaches Präsens, aktiv, Rule 3.6).

---

**Q5.** Was verlangt Rule 4.1 für Anweisungen in Prozeduren?

*Erwartet:* Kurze, klare Sätze (wörtlich: "Write short and clear
sentences."), die dem Leser direkt eine Anweisung geben; in Prozeduren
Imperativ, eine Handlung pro Satz.

---

**Q6.** Sind Kontraktionen (z.B. "don't", "can't") in STE zulässig?

*Erwartet:* Nein. Rule 4.2 verbietet ausdrücklich, Wörter auszulassen oder
Kontraktionen zu benutzen, um Sätze kürzer zu machen.

---

**Q7.** Wann erlaubt STE das Passiv?

*Erwartet:* Nur in beschreibenden Texten, und nur wenn der Handelnde
unbekannt ist. Sonst Aktiv (Rule 3.6).

---

**Q8.** Schreibe folgenden Satz in STE um: "Having removed the cover, the
technician checked the seal."

*Erwartet:* Die "-ing"-Form als Partizipialkonstruktion ist nicht zulässig
(Rule 3.5: "-ing" nur als technisches Nomen oder Modifikator eines solchen).
Zwei einfache, aktive Sätze mit zugelassenen Verbformen, z.B.: "Remove the
cover. Examine the seal."

---

**Q9.** Welche Rechtschreibkonvention schreibt STE vor, und welche Ausnahme
nennt Rule 1.14?

*Erwartet:* Amerikanisches Englisch, ausser wenn andere offizielle Vorgaben
etwas anderes verlangen (Rule 1.14; Part 2, introduction: "The dictionary
uses American English spelling as defined in the Merriam-Webster's
dictionary"). Die Ausnahme ist also keine feste Zweitkonvention, sondern
jedes andere offizielle Vorgabe-Dokument.

---

**Q10.** Ein Wörterbucheintrag listet ein Wort nur mit "(n)", nicht mit "(v)".
Darf man es in STE als Verb benutzen?

*Erwartet:* Nein. Rule 1.2 verlangt, zugelassene Wörter nur in der im
Wörterbuch angegebenen Wortart zu benutzen. Das Beispiel im Regeltext: "Test"
ist ein zugelassenes Nomen, aber kein zugelassenes Verb (Dictionary:
TEST (n) vorhanden, kein TEST (v)).

---

**Q11.** Die Ausgabe Issue 9 trägt eine Highlights-Liste gegenüber den
früheren Ausgaben. Welche zwei neuen Kategorien sind laut dieser Liste bei
Rule 1.5 (technische Nomen) hinzugekommen?

*Erwartet:* Kategorie 21 "Law and regulations" und Kategorie 22 "Animals,
plants, and other life forms" (Highlights zu Rule 1.5).

---

**Q12.** Ist "main-gear-door-retraction-winch handle" als technisches Nomen
STE-konform? Wenn nicht, nenne die konforme Fassung.

*Erwartet:* Nein. Bindestriche dürfen keine Gruppe von mehr als drei Wörtern
verbinden. Konform: "main-gear-door retraction-winch handle" (Beispiel aus
der Method-2-Erklärung, wörtlich als Non-STE/STE-Gegenpaar abgedruckt).

---

**Q13.** Ist "could" eine zugelassene Form des Eintrags CAN (v)?

*Erwartet:* Nein. Der Eintrag CAN (v) sagt wörtlich: "Do not use COULD (v) to
show possibility."

---

**Q14.** Sind "however" und "ensure" in STE zugelassen? Wenn nicht, wie
weist das Dictionary darauf hin?

*Erwartet:* Nein. In der Liste der wiederkehrenden Fehler: "however (adv) ->
BUT (conj)" und "ensure (v) -> MAKE SURE (v)"; im Alphabet stehen beide mit
der Spalte "Approved meaning/ALTERNATIVES".

---

**Q15.** Welche Längenregeln gelten für Sätze und Absätze in STE?

*Erwartet:* In Prozeduren maximal 20 Wörter pro Satz (Rule 5.1) und kein
Absatz mit mehr als sechs Sätzen (Rule 6.6); dazu Rule 4.1: kurze, klare
Sätze.

---

*Hinweis zur Durchführung:* Alle Arme (Control ohne Ordner, Rules-Only,
voller Ordner) bekommen exakt diesen Fragenkatalog, Wort für Wort, in
derselben Reihenfolge, mit demselben Modell und derselben CLI. Die Transkripte
liegen roh in `run-original/`, `run-rebuild/` und `q9-battery/`.
