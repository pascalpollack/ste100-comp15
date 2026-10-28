// Runs a PowerShell command on the PC over SSH, using -EncodedCommand so that
// neither shell has anything left to break apart (the quoting trap, see
// anlage/rechner.md).

import { execFileSync } from 'node:child_process';
import { PC } from './config.mjs';

const b64 = (s) => Buffer.from(s, 'utf16le').toString('base64');

export function pc(ps, timeoutSec = 300) {
  const remote = `powershell -NoProfile -EncodedCommand ${b64(ps)}`;
  try {
    const out = execFileSync(
      'ssh', ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=8', PC.host, remote],
      { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024, timeout: timeoutSec * 1000, stdin: 'ignore' },
    );
    return { ok: true, out };
  } catch (err) {
    return { ok: false, out: String(err.stdout ?? '') + '\n' + String(err.stderr ?? '') + '\n' + err.message };
  }
}

export function scpTo(local, remotePath, timeoutSec = 300) {
  try {
    execFileSync('scp', ['-o', 'BatchMode=yes', local, `${PC.host}:${remotePath}`],
      { encoding: 'utf8', timeout: timeoutSec * 1000, stdin: 'ignore' });
    return { ok: true };
  } catch (err) {
    return { ok: false, out: String(err.stderr ?? '') + '\n' + err.message };
  }
}

export function scpFrom(remotePath, local, timeoutSec = 300) {
  try {
    execFileSync('scp', ['-o', 'BatchMode=yes', `${PC.host}:${remotePath}`, local],
      { encoding: 'utf8', timeout: timeoutSec * 1000, stdin: 'ignore' });
    return { ok: true };
  } catch (err) {
    return { ok: false, out: String(err.stderr ?? '') + '\n' + err.message };
  }
}
