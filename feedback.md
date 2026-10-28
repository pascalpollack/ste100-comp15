
# Comp #14 — The Control · feedback for Pascal Pollack

**Entry — `ste100-comp14`** · https://github.com/pascalpollack/ste100-comp14
**Placed:** not placed — late entry, outside the results
**Judged by:** David

> **Why there's no placement.** This arrived after the round closed, so it was never on
> the manifest and is not tallied; the ranking stands without it. It was read against the
> same rubric as the eleven entries anyway, so the commentary below is the same kind your
> peers got. Ship the reference your key cites and this competes.

Scores are not published — reasoning is. Everything below was written with your repo open,
after pinning it to the last commit before the 13 Oct deadline (`9a06b4d`, 11 Oct) and
re-running your arms independently. It is one judge's words, unedited.

---

**The read.** You built a real control, not a demo. The questions were committed before the
runs, both transcripts are raw and carry their exact prompts, and the reproduction commands
work — I rebuilt your treatment system prompt from your own `cat` line and it came out
line-for-line identical to the committed one. That is the part most entries get wrong and
you got right. What holds it back is that the test cannot be checked by anyone but you.
`folder/reference/ASD-STE100-Issue9.pdf` is cited by `questions.md`, `folder/rules.md` and
`folder/README.md` as the authority behind every expected answer, and it is not in the repo
— it never was, in any commit on any branch, despite the commit message of `11d208e` saying
it was added. Every expected answer is a claim a reader has to take on trust. And the one
result your summary leans on hardest — Q9, *"der schärfste Fall"* — did not reproduce for
me. The folder does work. It works on three questions rather than five.

**What worked.** `control/transcript.md` and `treatment/transcript.md` — the best
reproducibility in anything I read this round. Model, settings, the system prompt in full,
the user prompt verbatim, and a runnable command, with the treatment file stating the user
prompt is identical to the control's, which it is. Nobody else made the re-run this easy.
And `folder/` is correctly small — 4.6 KB across three files, which is the "underbuild the
folder" instruction followed rather than nodded at. Small enough that I could run the files
separately and price each one: `rules.md` carries almost the whole effect on its own,
`examples.md` earns exactly one question (FIX → REPAIR, which `rules.md` doesn't cover),
and `identity.md` earns nothing on your question set but is the file that makes the model
say "I can't source this" instead of inventing a rule number. Three files, three
distinguishable jobs. That is good folder design, and it is rare to be able to show it.

**Two fixes for this week.**
1. **Ship the reference, or ship excerpts with locators.** This is the single biggest mover
   and it is the check for this round: can every expected answer be traced to something in
   `reference/`? Right now none of them can. Your 14 Oct commit swapping the dead path for
   `asd-ste100.org` is better, but a URL to a 400-page standard is not a checkable citation.
   If licensing stops you shipping the PDF, say so in the README and ship
   `reference/extracts.md` instead — for each question, the verbatim sentence, rule number
   and page. Ten short quotations is 3 KB and converts every expected answer from a claim
   into something checkable in thirty seconds. This is not theoretical: your Q1 key lists
   **MAY** among the approved modal verbs, several sources say it isn't approved and that
   the standard directs writers from *may* to *can*, and I could not settle it — because
   the only thing in your repo that could is the document under test. If `may` is wrong,
   your folder taught the model a wrong answer and scored it as a win, and nothing in the
   repo would ever catch that.
2. **Add a third arm — `rules.md` pasted alone, no folder — and run every arm twice.** The
   third arm costs you one run and it ties your full folder on nearly every question, which
   means the measured effect of "the folder" is mostly the effect of one 2 KB file.
   Reporting that about yourself is worth more than reporting five wins. The second rep
   matters just as much: your whole result rests on one run per arm, and Q9 is exactly the
   question a second rep would have caught.

**What would have moved you up.** Half your question set measures nothing, and your own
results show it — five of ten tied for you and tied for me. You diagnosed it correctly,
that ASD-STE100 is in the training data, but you diagnosed it *after* the runs instead of
designing around it before. Five live questions is a small instrument and the brief asked
for an overbuilt test. STE gives you plenty of questions where general knowledge genuinely
runs out: dictionary entries for specific technical verbs, approved meanings that differ
from ordinary English, the Issue 9 changes against Issue 8, whether a given multi-word noun
cluster is legal. Twenty questions chosen for that property, plus the extracts, and this is
a strong entry — the transcript discipline is already there, and that is the part people
usually cannot fix. The other thing worth saying plainly: your sharpest claim is that
without the folder the model reverses the spelling rule to British. It doesn't, in four
separate runs with no rule content in them. What *does* reproduce is the second half — each
one invents a different wrong exception to Rule 1.14. The narrower finding is the better
one and it is yours for the taking: the bare model knows the rule and invents the
exception; the folder fixes the exception, not the rule.

**My re-run:** mostly matched (three of five claimed wins hold cleanly, one narrows, Q9
doesn't reproduce) · **My planted question:** STE sentence and paragraph length limits, core
Part 1 and absent from your `rules.md` → folder **lost**, honourably — it refused and
pointed at the missing reference, while the bare model gave the right numbers with
fabricated rule citations. A checker that invents rule numbers is worse than one that says
"not in my source", and `identity.md` is why yours said it.

**One caveat on all of the above.** You ran Claude Code CLI with `--disallowedTools "*"`;
I ran the Messages API with your exact prompts, because this machine has no Claude Code.
Q9 carries most of my disagreement with your write-up and is precisely the kind of answer
that can move between harnesses — four of my arms against one of yours. Anyone with Claude
Code should run your literal command before treating "Q9 doesn't reproduce" as settled.

---

*Comp #14, 24 Oct 2026 — late entry, feedback only. If you think a fact here is wrong — a
file your judge missed, an arm they ran differently — reply in the thread. The full case
note behind this exists and can be shared with you on request.*
