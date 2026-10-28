// Runs the comp15 ste100 rebuild arms on the PC over the LAN.
// One Claude Code session per (arm, rep): the pinned model, the per-arm
// system prompt, the verbatim user prompt, no tools. The raw stream-json of
// every session is committed to run-*/ and q9-battery/.
//
// Arms (system prompt differences only, all stage dirs empty):
//   control  = BASE line only                        (shared by both runs)
//   o_rules  = original rules.md alone
//   o_folder = original identity + rules + examples
//   r_rules  = rebuild rules.md alone
//   r_folder = rebuild identity + rules + examples + reference/extracts.md
//
// Usage:
//   node harness/run.mjs full [arm ...]     (default: all five arms, 2 reps)
//   node harness/run.mjs battery [arm ...]  (default: all five arms, 4 reps)

import { mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PINNED, PC } from './config.mjs';
import { pc, scpTo } from './pc.mjs';
import { buildPrompts } from './prompts.mjs';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');
const PS_NL = '"' + '`' + 'n' + '"';

const FULL_HOME = { control: 'run-original', o_rules: 'run-original', o_folder: 'run-original', r_rules: 'run-rebuild', r_folder: 'run-rebuild' };
const SYS = { control: 'sys_control.txt', o_rules: 'sys_rules.txt', o_folder: 'sys_folder.txt', r_rules: 'sys_r_rules.txt', r_folder: 'sys_r_folder.txt' };
const ALL_ARMS = Object.keys(FULL_HOME);
const BATTERY_RUNS = 4;

const claudeFlags =
  `--setting-sources project --model ${PINNED.model} ` +
  `--permission-mode dontAsk --strict-mcp-config --disable-slash-commands ` +
  `--disallowedTools '*' --output-format stream-json --verbose`;

function psSession(outRel, arm, userFile) {
  return [
    `$s = Get-Content -Raw '${PC.root}\\prompts\\${SYS[arm]}'`,
    `$p = Get-Content -Raw '${PC.root}\\prompts\\${userFile}'`,
    `Set-Location '${PC.root}\\stage\\${arm}'`,
    `$r = $p | & ${PC.claude} -p --system-prompt $s ${claudeFlags} 2>&1`,
    `[System.IO.File]::WriteAllText('${PC.root}\\out\\${outRel}', (($r | ForEach-Object { $_.ToString() }) -join ${PS_NL}), [System.Text.Encoding]::UTF8)`,
  ].join('\n');
}

function eventsOf(txt) {
  const events = [];
  for (const line of txt.split('\n')) {
    if (!line.trim()) continue;
    try { events.push(JSON.parse(line)); } catch { events.push(null); }
  }
  return events;
}

function cleanResult(txt) {
  const res = eventsOf(txt).find((e) => e && e.type === 'result');
  return Boolean(res && !res.is_error && typeof res.result === 'string' && res.result.trim());
}

export async function stagePrompts() {
  buildPrompts();
  let r = pc(
    `Remove-Item -Recurse -Force '${PC.root}\\stage','${PC.root}\\out','${PC.root}\\prompts' -ErrorAction SilentlyContinue; ` +
    `New-Item -ItemType Directory -Force -Path '${PC.root}\\stage','${PC.root}\\out','${PC.root}\\prompts' | Out-Null; ` +
    `${ALL_ARMS.map((a) => `New-Item -ItemType Directory -Force -Path '${PC.root}\\stage\\${a}' | Out-Null`).join('; ')}; ` +
    `$leak = @('C:\\Users\\polla\\CLAUDE.md','C:\\Users\\polla\\AGENTS.md','C:\\Users\\polla\\.claude\\CLAUDE.md','C:\\Users\\polla\\.claude\\AGENTS.md') | Where-Object { Test-Path $_ }; ` +
    `if ($leak) { "LEAK: $leak" } else { "LEAK: none" }; "DIRS_OK"`, 120,
  );
  if (!r.out.includes('DIRS_OK')) throw new Error('PC dir prep failed: ' + r.out);
  if (!r.out.includes('LEAK: none')) throw new Error('user-level instruction file would leak: ' + r.out);
  r = pc(`& ${PC.claude} --version 2>&1 | Out-String`, 60);
  const version = (r.out.match(/\d+\.\d+\.\d+/) || ['unknown'])[0];
  for (const f of Object.values(SYS).concat(['user_full15.txt', 'user_q9.txt'])) {
    const s = scpTo(join(REPO, 'harness', '.prompts', f), `${PC.root}/prompts/${f}`);
    if (!s.ok) throw new Error(`scp ${f}: ${s.out}`);
  }
  return version;
}

async function oneSession(arm, userFile, localFile, timeoutSec) {
  const outRel = localFile.replace(/\\/g, '/').split('/').pop();
  for (let attempt = 1; attempt <= PINNED.maxAttempts && !(existsSync(localFile) && cleanResult(readFileSync(localFile, 'utf8'))); attempt++) {
    const r = pc(psSession(outRel, arm, userFile), timeoutSec + 60);
    if (!r.ok) { console.error(`${arm} ${outRel} a${attempt}: pc ${r.out.slice(0, 160)}`); continue; }
    const got = await scpFromPc(`${PC.root}/out/${outRel}`, localFile);
    if (!got.ok) { console.error(`${arm} ${outRel} a${attempt}: scp ${got.slice(0, 160)}`); continue; }
    const txt = readFileSync(localFile, 'utf8');
    if (!cleanResult(txt)) {
      const res = eventsOf(txt).find((e) => e && e.type === 'result');
      console.error(`${arm} ${outRel} a${attempt}: ${res ? `${res.subtype} ${JSON.stringify(res.result ?? res.error ?? '').slice(0, 140)}` : 'no result; ' + txt.slice(0, 160)}`);
      writeFileSync(localFile, '');
    }
  }
  if (!existsSync(localFile) || !cleanResult(readFileSync(localFile, 'utf8'))) {
    throw new Error(`${arm} ${outRel}: no clean session after ${PINNED.maxAttempts} attempts.`);
  }
}

async function scpFromPc(remotePath, localFile) {
  const { execFileSync } = await import('node:child_process');
  try {
    execFileSync('scp', ['-o', 'BatchMode=yes', `${PC.host}:${remotePath}`, localFile],
      { encoding: 'utf8', timeout: 120000, stdin: 'ignore' });
    return { ok: true };
  } catch (err) {
    return { ok: false, out: String(err.stderr ?? '') + '\n' + err.message };
  }
}

export async function runFull(arms) {
  const version = await stagePrompts();
  console.log(`tool ${version}`);
  let preflight = false;
  for (const arm of arms) {
    const home = join(REPO, FULL_HOME[arm]);
    mkdirSync(home, { recursive: true });
    for (let run = 1; run <= PINNED.fullRuns; run++) {
      const f = `${arm}_full15_r${run}.jsonl`;
      await oneSession(arm, 'user_full15.txt', join(home, f), PINNED.timeoutSec);
      if (!preflight) {
        const txt = readFileSync(join(home, f), 'utf8');
        if (!/Q15\.|15\./.test(txt.slice(0, 200000))) throw new Error('PREFLIGHT FAILED: das Modell hat nicht alle 15 Fragen gesehen (Prompt-Transport kaputt), Lauf abgebrochen.');
        preflight = true;
        console.log('preflight ok: alle 15 Fragen sichtbar');
      }
      console.log(`full ${arm} r${run} ok`);
    }
    writeFileSync(join(home, `manifest_${arm}.json`), JSON.stringify({
      arm, home: FULL_HOME[arm], model: PINNED.model, toolVersion: version,
      systemPrompt: `harness/.prompts/${SYS[arm]}`, userPrompt: 'harness/.prompts/user_full15.txt',
      runs: Array.from({ length: PINNED.fullRuns }, (_, i) => `${arm}_full15_r${i + 1}.jsonl`),
    }, null, 1));
  }
  return version;
}

export async function runBattery(arms) {
  const version = await stagePrompts();
  for (const arm of arms) {
    const home = join(REPO, 'q9-battery', arm);
    mkdirSync(home, { recursive: true });
    for (let run = 1; run <= BATTERY_RUNS; run++) {
      const f = `q9_r${run}.jsonl`;
      await oneSession(arm, 'user_q9.txt', join(home, f), Math.min(PINNED.timeoutSec, 180));
      console.log(`q9 ${arm} r${run} ok`);
    }
    writeFileSync(join(home, 'manifest.json'), JSON.stringify({
      arm, model: PINNED.model, toolVersion: version,
      systemPrompt: `harness/.prompts/${SYS[arm]}`, userPrompt: 'harness/.prompts/user_q9.txt',
      runs: Array.from({ length: BATTERY_RUNS }, (_, i) => `q9_r${i + 1}.jsonl`),
    }, null, 1));
  }
  return version;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const [mode, ...arms] = process.argv.slice(2);
  (async () => {
    if (mode === 'full') await runFull(arms.length ? arms : ALL_ARMS);
    else if (mode === 'battery') await runBattery(arms.length ? arms : ALL_ARMS);
    else throw new Error('usage: node harness/run.mjs full|battery [arm ...]');
    console.log('done');
  })().catch((e) => { console.error('FATAL', e.message); process.exit(1); });
}
