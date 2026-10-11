# Offline demonstration

This public manual describes the purchased Evidence QA v1 source kit. Commands and runtime files referenced below belong to that kit and are not included in this documentation repository.

Run from the extracted kit's root using Node.js 22 or newer:

```bash
node scripts/cli.mjs demo
```

The command reads `examples/support.vtt`, `examples/support-rubric.json`, and `examples/assessment.json`. All three are fictional. The saved assessment input stands in for an OpenAI reply; the demo makes no provider call.

The command writes:

- `demo-output/report.html`: a readable draft report.
- `demo-output/assessment.json`: checked results and flags.
- `demo-output/sheet.csv`: the draft row and its headers.

Choose another output directory with `node scripts/cli.mjs demo --output my-demo`. Existing files with those names in the chosen directory are overwritten.

## Expected result

| Criterion | Proposed label | Checked result | Points |
| --- | --- | --- | --- |
| Clarifies the customer's problem | `clear` | Agent excerpt in turn `t2`. | 2 / 2 |
| Gives a concrete next step | `clear` | Agent excerpt in turn `t4`. | 2 / 2 |
| Customer confirms the proposed resolution | `confirmed` | Customer excerpt in turn `t5`, permitted by conversation scope. | 1 / 1 |
| Visual attention | None | Unassessable from transcript; human review remains. | Blank / 1 |

The printed totals are:

```json
{
  "points": 5,
  "assessed_possible": 5,
  "total_possible": 6,
  "scored_count": 3,
  "coverage_pct": 83.33,
  "score_pct": 100
}
```

Read this as **5 points out of the 5 points assessed, with 83.33% of the full rubric's point weight covered**. It is not a complete 100% employee-performance judgment. The visual criterion remains blank, and all results are drafts.

For example, the third criterion cites the synthetic customer: “I see the link now. That answers my question, thank you.” The exact excerpt is checked against `t5`; interpreting it as confirmation is still a model proposal for review. The second criterion's real quote does not prove that the agent's product instructions are factually correct outside this conversation.

## Customize after the demo

Read [the rubric guide](rubric-guide.md), copy the example rubric, choose your own allowed labels and points, validate it, and review examples before using it for real conversations. See [evidence and limits](evidence-and-limits.md) for the distinction between a checked excerpt and a justified judgment.

To measure local processing, run `npm run benchmark`. It repeats parsing, validation, and report rendering on the small synthetic fixture. It does not time a live Zoom → OpenAI → Google review.
