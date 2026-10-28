# Control-Lauf (ohne Ordner)

Modell: `claude-sonnet-5` (Claude Code CLI 2.1.258, `-p`, keine Werkzeuge
zugelassen). Datum: 2026-10-11.

## Reproduktionsbefehl

```
claude -p --model claude-sonnet-5 \
  --system-prompt "You are a helpful technical-writing assistant. Answer directly and concisely in plain text. Do not use any tools." \
  --disallowedTools "*" \
  < prompt_questions.txt
```

`prompt_questions.txt` enthält genau den User-Prompt unten, Wort für Wort.

## System-Prompt

```
You are a helpful technical-writing assistant. Answer directly and concisely in plain text. Do not use any tools.
```

## User-Prompt

```
Beantworte die folgenden zehn Fragen zu ASD-STE100 (Simplified Technical English) der Reihe nach, mit der Nummer. Antworte direkt und knapp, ohne Werkzeuge zu benutzen, nur aus deinem eigenen Wissen bzw. dem dir gegebenen Kontext.

Q1. Ist "should" ein zugelassenes Modalverb in STE? Wenn nicht, nenne die zugelassenen Modalverben.

Q2. Schreibe folgenden Satz in STE um: "The technician should remove the panel before he fixes the engine."

Q3. Welche Verbformen und Zeitformen lässt STE zu (Rule 3.2)?

Q4. Richtig oder falsch: "The unit is being tested" ist STE-konform.

Q5. Was verlangt Rule 4.1 für Anweisungen in Prozeduren?

Q6. Sind Kontraktionen (z.B. "don't", "can't") in STE zulässig?

Q7. Wann erlaubt STE das Passiv?

Q8. Schreibe folgenden Satz in STE um: "Having removed the cover, the technician checked the seal."

Q9. Welche Rechtschreibkonvention schreibt STE vor, und welche Ausnahme nennt Rule 1.14?

Q10. Ein Wörterbucheintrag listet ein Wort nur mit "(n)", nicht mit "(v)". Darf man es in STE als Verb benutzen?
```

## Rohe Antwort (ungeändert)

```
1. Nein, "should" ist kein zugelassenes Modalverb in STE. Zugelassen sind: **can**, **may**, **must**, **will** (jeweils mit festgelegter Bedeutung: can = Fähigkeit/Möglichkeit, may = Erlaubnis, must = Verpflichtung, will = zukünftige Tatsache).

2. "Remove the panel before you fix the engine."
(Anweisungen in Prozeduren stehen im Imperativ, aktives Subjekt "you" entfällt; "should" wird vermieden.)

3. STE lässt nur die **einfache Gegenwart (Simple Present)**, die **einfache Vergangenheit (Simple Past)** und den **Imperativ** zu. Keine Verlaufsformen (-ing), kein Perfekt, keine komplexen Zeitformen.

4. Falsch. "is being tested" ist eine Verlaufsform (Progressive) und in STE nicht zulässig. Korrekt (aktiv, wo möglich): "Test the unit." oder passiv, falls nötig: "The unit is tested."

5. Rule 4.1 verlangt, dass Anweisungen in Prozeduren im **Imperativ** geschrieben werden (direkte Befehlsform), nicht als Aussagesatz oder mit Modalverben wie "should"/"must".

6. Nein. Kontraktionen wie "don't", "can't" sind in STE nicht zulässig; es muss ausgeschrieben werden ("do not", "cannot").

7. STE erlaubt das Passiv, wenn das Subjekt (der Handelnde) unbekannt, unwichtig ist oder wenn der Fokus auf dem Objekt/Ergebnis der Handlung liegt – z. B. bei allgemeinen Beschreibungen oder wenn der Akteur nicht relevant ist. Wo möglich, soll jedoch das Aktiv bevorzugt werden.

8. "Remove the cover. Then check the seal."
(Partizipialkonstruktionen wie "Having removed..." sind nicht zulässig; stattdessen einfache, kurze Sätze mit Imperativ/Simple Present verwenden.)

9. STE schreibt die **britische Rechtschreibung** vor. Rule 1.14 nennt als Ausnahme: Wenn ein zugelassenes Wort im Wörterbuch nur mit amerikanischer Schreibweise aufgeführt ist (bzw. wenn ein technischer Fachbegriff üblicherweise in amerikanischer Schreibweise verwendet wird), darf diese amerikanische Schreibweise verwendet werden.

10. Nein. Wenn ein Wort im STE-Wörterbuch nur als Nomen "(n)" markiert ist, darf es nicht als Verb verwendet werden. Jedes Wort darf nur in der im Wörterbuch angegebenen Wortart(en) genutzt werden.
```
