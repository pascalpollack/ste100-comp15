// Pinned values for the comp15 rebuild of ste100-comp14.
// Model and flags mirror the original entry's reproduction command
// (original/control/transcript.md): same model name, --disallowedTools "*",
// system prompt per arm, one session per run. Machine: the LAN PC, the only
// host with a valid Claude Code login; the CLI version is recorded in every
// manifest.

export const PC = {
  host: 'pollack@192.168.1.100',
  claude: 'C:\\Users\\polla\\.local\\bin\\claude.exe',
  root: 'C:/Users/polla/comp15r',
};

export const PINNED = {
  model: 'claude-sonnet-5',
  timeoutSec: 420,
  maxAttempts: 3,
  fullRuns: 2,
};

// Arm names and where their transcripts land.
export const FULL_ARMS = {
  control: 'run-original',
  rules: 'run-original',      // original rules.md, alone in the system prompt
  folder: 'run-original',     // original full folder (identity+rules+examples)
  r_rules: 'run-rebuild',     // rebuild rules.md, alone in the system prompt
  r_folder: 'run-rebuild',    // rebuild full folder (+ extracts in the prompt)
};

export const Q9_ARMS = {
  control: 'control',
  o_rules: 'o_rules',
  o_folder: 'o_folder',
  r_rules: 'r_rules',
  r_folder: 'r_folder',
};
