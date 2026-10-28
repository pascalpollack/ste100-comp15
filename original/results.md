# Ergebnis: Control vs. Treatment

Modell beide Male `claude-sonnet-5`, identische zehn Fragen in identischer
Reihenfolge, einziger Unterschied der Ordner (`folder/identity.md` +
`folder/rules.md` + `folder/examples.md`) im System-Prompt des
Treatment-Laufs. Volle Transkripte in `control/transcript.md` und
`treatment/transcript.md`. Die erwarteten Antworten standen laut Git-Verlauf
vor beiden Läufen fest, siehe `questions.md`.

| # | Control | Treatment | Urteil |
|---|---------|-----------|--------|
| 1 | Nennt nur CAN, MAY, MUST, WILL. **MUST NOT fehlt.** | Nennt CAN, MAY, MUST, MUST NOT, WILL. Vollständig. | **Sieg Treatment** |
| 2 | "fix the engine" — FIX ist kein Wörterbucheintrag, also nicht STE-konform. | "repair the engine" — REPAIR (v) ist zugelassen. | **Sieg Treatment** |
| 3 | Nennt nur Simple Present, Simple Past, Imperativ; lässt Futur und Partizip Perfekt als Adjektiv weg; sagt pauschal "keine -ing", ohne die Ausnahme (technisches Nomen) zu nennen. | Nennt alle sechs zugelassenen Formen korrekt und vollständig, mit Regelverweis. | **Sieg Treatment** |
| 4 | Richtig ("Falsch", Progressive-Form). | Richtig, mit Regelverweis (Rule 3.2). | **Gleichstand** |
| 5 | Richtig, im Kern wie Treatment. | Richtig, zusätzlich "eine Handlung pro Satz" explizit genannt. | **Gleichstand** (beide in der Sache richtig) |
| 6 | Richtig. | Richtig, mit Regelverweis (Rule 4.2). | **Gleichstand** |
| 7 | Ungenau: nennt mehrere vage Gründe ("unwichtig", "Fokus auf dem Objekt"), die so nicht in der Regel stehen, und erwähnt die Einschränkung auf beschreibende Texte nicht. | Präzise: nur in beschreibenden Texten, wenn der Handelnde unbekannt ist (Rule 3.6). | **Sieg Treatment** |
| 8 | Richtig ("Remove the cover. Then check the seal."). | Richtig ("Remove the cover. Check the seal."). | **Gleichstand** |
| 9 | **Falsch.** Behauptet, STE schreibe britische Rechtschreibung vor, und erfindet eine Ausnahme, die es nicht gibt. Das ist die klarste Fehlantwort im ganzen Lauf. | Richtig: amerikanische Rechtschreibung (Rule 1.14). | **Sieg Treatment, deutlichster Fall** |
| 10 | Richtig. | Richtig, mit Regelverweis (Rule 1.2) und dem Originalbeispiel ("Test"). | **Gleichstand** |

## Zusammenfassung

**5 klare Siege für das Treatment** (Q1, Q2, Q3, Q7, Q9), **5 Gleichstände**
(Q4, Q5, Q6, Q8, Q10), **keine Frage, bei der der Ordner schlechter war als
ohne ihn.**

Das ist kein Nullresultat: Bei den Gleichständen traf das Modell die Sache
auch ohne Ordner richtig, weil ASD-STE100 in seinem Training vorkommt.
Der Unterschied zeigt sich dort, wo reines Trainingswissen nicht reicht oder
in die Irre führt: **Q9 ist der schärfste Fall.** Ohne Ordner kehrt das
Modell die Regel um (britisch statt amerikanisch) und erfindet dazu eine
nicht existierende Ausnahme, das ist eine überzeugend klingende, aber
falsche Antwort. Mit Ordner liegt die Regel explizit im Kontext, und die
Antwort ist richtig und kurz.

**Ehrlich zur Methode:** Zehn Fragen sind ein kleiner Stichprobenumfang. Der
Ordner wirkt hier, weil die Regeln eng, nummeriert und nachschlagbar sind,
nicht weil ein Ordner grundsätzlich Wissen hinzufügt, das dem Modell fehlt.
Bei Fragen, die reines Weltwissen ohne Regelzitat verlangen (Q4 bis Q6, Q8,
Q10), macht der Ordner keinen messbaren Unterschied. Wer das Repo klont und
beide Arme neu ausführt (siehe Reproduktionsbefehle in den Transkripten),
sollte ungefähr dasselbe Muster sehen: Gleichstand bei den einfachen Fragen,
Vorteil für den Ordner bei den Fragen, die eine genaue Regelnummer oder einen
genauen Wörterbucheintrag brauchen.
