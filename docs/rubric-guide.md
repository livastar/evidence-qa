# Define your review criteria

This public manual describes the purchased Evidence QA v1 source kit. Commands and runtime files referenced below belong to that kit and are not included in this documentation repository.

The rubric is your source of truth for criteria, allowed labels, and points. The model proposes a label and exact excerpts; code validates the contract and assigns the configured points. It does not invent criteria or calculate a total.

Start with `examples/support-rubric.json`. For your own configuration, copy it to a buyer-owned file and set `rubric_file` to that path. Run commands from the extracted root: relative configuration paths resolve against the current working directory.

## Contract

The rubric requires exactly these root fields:

```json
{
  "id": "my-conversation-review",
  "version": "1.0.0",
  "title": "My conversation QA rubric",
  "criteria": [
    {
      "id": "next_step",
      "title": "Gives a concrete next step",
      "description": "The evaluated speaker gives an action and explains the expected outcome.",
      "observable": true,
      "evidence_scope": "subject",
      "labels": [
        {
          "id": "partial",
          "description": "The quoted action does not explain an expected outcome.",
          "points": 1
        },
        {
          "id": "clear",
          "description": "The quote states a concrete action and expected outcome.",
          "points": 2
        }
      ]
    }
  ]
}
```

Use 1–40 criteria and 1–20 labels per criterion. Criterion IDs must be unique within the rubric; label IDs must be unique within their criterion. IDs use letters, digits, underscores, periods, or hyphens and begin with a letter or digit. Points must be finite, nonnegative numbers; each criterion needs a positive maximum. Unknown fields are rejected. The maximum is calculated from the highest label points, not supplied as a separate total.

Validate before a run:

```bash
node scripts/cli.mjs validate --rubric examples/support-rubric.json
```

## Choose the evidence scope

- `subject`: all supporting excerpts must be spoken by the configured evaluated speaker. Use this for that person's observable conversation behavior.
- `conversation`: excerpts may come from any speaker. Use this deliberately for a conversation outcome such as a customer's explicit confirmation. Do not present that outcome as independent proof of employee performance.

The subject is always required even if some criteria use conversation scope. `subject_speaker` must match a transcript speaker exactly; the mapping does not prove that speaker's real-world identity.

V1 accepts up to 200,000 transcript characters. WEBVTT cues require explicit `Speaker: text` or voice-tag speaker labels; a cue containing multiple speakers is rejected and must be split at the source. Plain text requires one `Speaker: text` turn per nonblank line; internal blank lines are rejected. No source format guesses the evaluated speaker.

## Make labels reviewable

Describe behavior that can be supported by an excerpt. Define the difference between labels so that two reviewers can apply it. Prefer “states an action and expected outcome” over “is professional.” Give each criterion its intended scope and weight.

Do not use quoted evidence to claim a behavior never occurred throughout an entire conversation. A zero-point label can describe a quoted shortfall, but v1 does not verify semantic absence or measurements. There is no rationale-only bypass that awards points without eligible excerpts.

Set `observable: false` for anything requiring video, external records, an observer, or a measurement not implemented in this kit. Its labels define the intended human rubric but remain unscored in the automated draft. Human-only maximum points stay in the coverage denominator.

## Scoring and versioning

For each scored criterion, code looks up the proposed label's points. A requested human review, unknown or mismatched quote, wrong subject speaker, or nonobservable criterion does not earn points. Review-required cells stay blank.

- `score_pct = awarded points / maximum points of scored criteria × 100`
- `coverage_pct = maximum points of scored criteria / maximum points of all criteria × 100`

If nothing is scored, `score_pct` is null. Coverage still reports the lack of checked results. Full-rubric coverage does not indicate how much of a Zoom session was transcribed: separate transcript files are assessed separately.

Change `version` when you change criteria, labels, descriptions, or weights. Content is also hashed, so even an accidental change without a version bump creates a distinct assessment identity. The source, content, subject, title, occurrence timestamp, rubric, model, configured output-token budget, and assessment version identify a draft. Changing model-input metadata, the rubric, or model settings produces a new draft, which must be calibrated and reviewed. Use a new empty draft tab when rubric changes alter the output columns; v1 refuses a mismatched header row.

## Calibrate before drawing conclusions

Choose a set of authorized examples spanning clear successes, quoted shortfalls, ambiguous cases, and missing evidence. Have reviewers label them independently. Compare each proposed label and its quoted support, record disagreements, and decide an acceptance threshold. Keep calibration separate from the kit's contract tests.

The included support rubric demonstrates the format. It has not been validated as a general support, sales, coaching, or employment standard.
