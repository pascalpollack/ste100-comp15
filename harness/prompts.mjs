// Builds the exact user prompt and per-arm system prompts. The user prompt is
// the original prompt_questions.txt header plus all fifteen questions,
// verbatim; the Q9 battery uses the same header plus Q9 alone.

import { mkdirSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');

const BASE = 'You are a helpful technical-writing assistant. Answer directly and concisely in plain text. Do not use any tools.';
const FOLDER_INTRO = ' You have been given the following reference folder about ASD-STE100 (Simplified Technical English). Use it as the basis for your answers, citing rule numbers where the folder gives them.';

const USER_HEADER = 'Beantworte die folgenden Fragen zu ASD-STE100 (Simplified Technical English) der Reihe nach, mit der Nummer. Antworte direkt und knapp, ohne Werkzeuge zu benutzen, nur aus deinem eigenen Wissen bzw. dem dir gegebenen Kontext.\n';

// Q texts verbatim from the original (9a06b4d) user prompt, in original order.
const QUESTIONS = {
  Q1: 'Ist "should" ein zugelassenes Modalverb in STE? Wenn nicht, nenne die zugelassenen Modalverben.',
  Q2: 'Schreibe folgenden Satz in STE um: "The technician should remove the panel before he fixes the engine."',
  Q3: 'Welche Verbformen und Zeitformen lässt STE zu (Rule 3.2)?',
  Q4: 'Richtig oder falsch: "The unit is being tested" ist STE-konform.',
  Q5: 'Was verlangt Rule 4.1 für Anweisungen in Prozeduren?',
  Q6: 'Sind Kontraktionen (z.B. "don\'t", "can\'t") in STE zulässig?',
  Q7: 'Wann erlaubt STE das Passiv?',
  Q8: 'Schreibe folgenden Satz in STE um: "Having removed the cover, the technician checked the seal."',
  Q9: 'Welche Rechtschreibkonvention schreibt STE vor, und welche Ausnahme nennt Rule 1.14?',
  Q10: 'Ein Wörterbucheintrag listet ein Wort nur mit "(n)", nicht mit "(v)". Darf man es in STE als Verb benutzen?',
  Q11: 'Die Ausgabe Issue 9 trägt eine Highlights-Liste gegenüber den früheren Ausgaben. Welche zwei neuen Kategorien sind laut dieser Liste bei Rule 1.5 (technische Nomen) hinzugekommen?',
  Q12: 'Ist "main-gear-door-retraction-winch handle" als technisches Nomen STE-konform? Wenn nicht, nenne die konforme Fassung.',
  Q13: 'Ist "could" eine zugelassene Form des Eintrags CAN (v)?',
  Q14: 'Sind "however" und "ensure" in STE zugelassen? Wenn nicht, wie weist das Dictionary darauf hin?',
  Q15: 'Welche Längenregeln gelten für Sätze und Absätze in STE?',
};
const ORDER = Object.keys(QUESTIONS);

function userPrompt(ids = ORDER) {
  const body = ids.map((id) => `${id}. ${QUESTIONS[id]}`).join('\n\n');
  return USER_HEADER + body + '\n';
}

function folderText(prefix) {
  const dir = join(REPO, prefix);
  return ['identity.md', 'rules.md', 'examples.md']
    .map((f) => readFileSync(join(dir, f), 'utf8'))
    .join('\n');
}

export function buildPrompts(outDir = join(HERE, '.prompts')) {
  rmSync(outDir, { recursive: true, force: true });
  mkdirSync(outDir, { recursive: true });
  const sys = {
    control: BASE + '\n',
    rules: BASE + FOLDER_INTRO.replace('the following reference folder', 'the following rules extract') + '\n\n' + readFileSync(join(REPO, 'original/folder/rules.md'), 'utf8'),
    folder: BASE + FOLDER_INTRO + '\n\n' + folderText('original/folder'),
    r_rules: BASE + FOLDER_INTRO.replace('the following reference folder', 'the following rules extract') + '\n\n' + readFileSync(join(REPO, 'rebuild/rules.md'), 'utf8'),
    r_folder: BASE + FOLDER_INTRO + '\n\n' + folderText('rebuild') + '\n' + readFileSync(join(REPO, 'rebuild/reference/extracts.md'), 'utf8'),
  };
  for (const [name, text] of Object.entries(sys)) writeFileSync(join(outDir, `sys_${name}.txt`), text);
  writeFileSync(join(outDir, 'user_full15.txt'), userPrompt());
  writeFileSync(join(outDir, 'user_q9.txt'), userPrompt(['Q9']));
  return { sys, userFull: userPrompt(), userQ9: userPrompt(['Q9']) };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  buildPrompts();
  console.log('prompts built');
}
