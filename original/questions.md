# Fragen und erwartete Antworten (vor den Läufen festgelegt)

Zehn Fragen zu ASD-STE100 Issue 9 (2025-01-15), *Simplified Technical English*.
Jede erwartete Antwort ist an einer konkreten Regel oder einem konkreten
Wörterbucheintrag der Ausgabe festgemacht, nicht an allgemeinem Wissen über
"technisches Englisch". Die Fundstellen sind Regelnummern aus Teil 1 und
Stichwörter aus Teil 2 (Dictionary) der Ausgabe, die unter
`folder/reference/ASD-STE100-Issue9.pdf` liegt. Diese Datei wird vor jedem der
beiden Läufe committet; der Git-Verlauf ist der Beleg dafür.

---

**Q1.** Ist "should" ein zugelassenes Modalverb in STE? Wenn nicht, nenne die
zugelassenen Modalverben.

*Erwartet:* Nein. "should" steht nicht im Wörterbuch. Die zugelassenen
Modalverben sind CAN, MAY, MUST, MUST NOT und WILL (Dictionary-Einträge
CAN (v), MUST (v), WILL (v), jeweils als "Auxiliary modal verb").

---

**Q2.** Schreibe folgenden Satz in STE um: "The technician should remove the
panel before he fixes the engine."

*Erwartet:* Imperativ statt "should", zugelassenes Verb REPAIR statt "fix"
(FIX steht nicht im Wörterbuch, REPAIR (v) ist zugelassen), kurzer Satz.
Beispiel einer zulässigen Fassung: "Remove the panel before you repair the
engine." (Rule 4.1: kurze, klare Sätze; Dictionary: REPAIR (v) zugelassen.)

---

**Q3.** Welche Verbformen und Zeitformen lässt STE zu (Rule 3.2)?

*Erwartet:* Infinitiv, Imperativ, einfaches Präsens, einfaches Präteritum,
einfaches Futur, Partizip Perfekt nur als Adjektiv. Nicht zugelassen:
Present Perfect, Past Perfect, Progressive-Formen und andere komplexe
Verbkonstruktionen (Rule 3.2, Rule 3.4).

---

**Q4.** Richtig oder falsch: "The unit is being tested" ist STE-konform.

*Erwartet:* Falsch. "is being tested" ist eine Progressive-Form, die Rule 3.2
ausdrücklich nicht zulässt. Zulässig wäre z.B. "Test the unit." (Imperativ)
oder "Technicians test the unit." (einfaches Präsens, aktiv, Rule 3.6).

---

**Q5.** Was verlangt Rule 4.1 für Anweisungen in Prozeduren?

*Erwartet:* Kurze, klare Sätze, die dem Leser direkt im Imperativ eine
Anweisung geben, pro Schritt eine Handlung. Rule 4.1 nennt das Beispiel, einen
langen Nicht-STE-Satz mit mehreren Handlungen in eine nummerierte Liste
einzelner Imperativsätze aufzuteilen.

---

**Q6.** Sind Kontraktionen (z.B. "don't", "can't") in STE zulässig?

*Erwartet:* Nein. Rule 4.2 verbietet ausdrücklich, Wörter auszulassen oder
Kontraktionen zu benutzen, um Sätze kürzer zu machen.

---

**Q7.** Wann erlaubt STE das Passiv?

*Erwartet:* Nur in beschreibenden Texten (nicht in Prozeduren), und nur wenn
der Handelnde unbekannt ist. Sonst gilt Aktiv (Rule 3.6).

---

**Q8.** Schreibe folgenden Satz in STE um: "Having removed the cover, the
technician checked the seal."

*Erwartet:* Die "-ing"-Form als Partizipialkonstruktion ist nicht zulässig
(Rule 3.5: "-ing" nur als technisches Nomen oder Modifikator eines solchen).
Der Satz wird in zwei einfache, aktive Sätze mit zugelassenen Verbformen
aufgeteilt, z.B.: "Remove the cover. Examine the seal."

---

**Q9.** Welche Rechtschreibkonvention schreibt STE vor, und welche Ausnahme
nennt Rule 1.14?

*Erwartet:* Amerikanisches Englisch, ausser wenn andere offizielle
Vorgaben (z.B. firmen- oder behördenseitig) etwas anderes verlangen
(Rule 1.14, Dictionary-Einleitung: "American English spelling ... as defined
in the Merriam-Webster's dictionary").

---

**Q10.** Ein Wörterbucheintrag listet ein Wort nur mit "(n)", nicht mit "(v)".
Darf man es in STE als Verb benutzen?

*Erwartet:* Nein. Rule 1.2 verlangt, zugelassene Wörter nur in der im
Wörterbuch angegebenen Wortart zu benutzen. Das Beispiel im Regeltext selbst
nennt genau diesen Fall: "Test" ist ein zugelassenes Nomen, aber kein
zugelassenes Verb.

---

*Hinweis zur Durchführung:* Beide Läufe (Control ohne Ordner, Treatment mit
Ordner) bekommen exakt diesen Fragenkatalog, Wort für Wort, in derselben
Reihenfolge, mit demselben Modell (`anthropic/claude-sonnet-5`). Die
Transkripte liegen roh und ungekürzt in `control/transcript.md` und
`treatment/transcript.md`.
