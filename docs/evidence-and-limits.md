# What the evidence establishes

This public manual describes the purchased Evidence QA v1 source kit. Commands and runtime files referenced below belong to that kit and are not included in this documentation repository.

Evidence QA prepares a draft review. It separates what code checks from what a model proposes and what a reviewer must decide.

| Result | Checked by the implementation | Requires buyer or reviewer evidence |
| --- | --- | --- |
| Rubric | Valid schema, allowed labels, unique criteria, and configured points. | Criteria are useful, fair, and appropriate for the job and conversation. |
| Subject | The selected speaker label exists in the parsed transcript. | The label represents the intended real person. Transcript labels can be wrong. |
| Excerpt | Exact Unicode text occurs in the cited turn. Subject criteria require the selected speaker; conversation criteria allow other speakers. | The transcript accurately reflects the recording. |
| Label | The value belongs to the criterion's allowed labels. | The excerpt justifies the label and captures relevant context. |
| Points | Code maps the accepted label to the rubric's points. | The rubric's weights represent the intended quality standard. |
| Coverage | Code reports how much of the rubric received checked, scored results. | The available transcript contains enough evidence for a useful review. |
| Publication | Saved assessment and stable output identity support recovery. | The buyer's accounts, permissions, network, destinations, and operations work. |

A matched quote is evidence of provenance. It is not a semantic accuracy certificate. A model can select a real quote and still interpret it poorly. Review the relevant turn and surrounding context.

## Review-required results

A criterion remains unscored when a quote cannot be checked, when the wrong speaker is cited, when the model requests human review, or when the criterion cannot be judged from transcript excerpts. Keep these cells blank. A blank is missing evidence, not a failed employee.

V1 has no rationale-only scoring path for absence or measurements. Every scored result needs eligible exact transcript evidence. A label describing ineffective quoted behavior differs from claiming something never happened. Hidden actions, physical appearance, screen sharing, and unsupported measurement rules belong in human review. If you need rules such as “speaking share below 40%,” define and verify an actual measurement implementation before treating that rule as scored evidence.

Score and coverage have different denominators. Score is awarded points divided by the maximum points of criteria actually scored. Coverage is those criteria's maximum points divided by the maximum points of the full rubric, including human-only criteria. Coverage is weighted by rubric points; it is not the fraction of a recording processed. High points on a small covered portion do not establish overall performance.

## Verification levels

1. **Local contract verification:** malformed rubrics/output, unsupported quotes, wrong speakers, Unicode excerpts, deterministic arithmetic, and review requests are tested without provider accounts.
2. **Synthetic adapter verification:** controlled HTTP fixtures exercise provider requests and failure recovery. This establishes behavior against the test contracts.
3. **Buyer-account smoke test:** the buyer must run one authorized conversation through its own Zoom, OpenAI, Google, and scheduling environment and inspect the results.
4. **Semantic calibration:** reviewers must compare model labels with their own reviewed examples. This is a separate acceptance task and is not supplied by green local tests.

No release claim should collapse these four levels into “fully proven employee evaluation.” Use the kit for coaching and conversation QA drafts. Employment eligibility, pay, promotion, and discipline decisions require a separate human process.

The included n8n export is generated inactive and its structure is checked locally. Actual n8n import/execution and live Zoom/OpenAI/Google operation were not verified for this release. Complete the buyer-account smoke test before depending on a schedule.

## Speed and cost

The flow automates repetitive preparation and publication. Run `npm run benchmark` to measure the included local synthetic workload on your machine. The benchmark excludes Zoom availability, live model inference, provider latency, network outages, and reviewer effort.

There is no guaranteed minutes-per-conversation, cost-per-review, accuracy percentage, or savings figure. Transcript length, model choice, provider pricing, scheduling, and calibration determine the buyer's actual result. Record live latency and usage during your smoke test before making a business claim.
