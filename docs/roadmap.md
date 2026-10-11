# Improvement and extension plan

This public manual describes the purchased Evidence QA v1 source kit. Commands and runtime files referenced below belong to that kit and are not included in this documentation repository.

V1 is a standalone purchase. This is a prioritized product plan, not a commitment to dates or included future features. Updates published on the existing v1 Agensi listing are free to its owners under [Agensi's update terms](https://www.agensi.io/terms). A future major edition or pack would have its own paid listing and optional purchase.

| Priority | Proposed release | Buyer outcome | Acceptance evidence before release |
| --- | --- | --- | --- |
| 1 | V1.1 update, included in v1 | Easier first setup and evidence-based rubric calibration. | A clean buyer-environment setup drill, useful configuration errors, a reviewer-labelled golden set, per-criterion disagreement results, and a documented acceptance threshold. |
| 2 | V1.1 update, included in v1 | Know actual processing latency and API usage. | Per-run stage timing and provider usage recorded without leaking transcript content; documented measurement boundaries and cost estimates derived from actual usage and current pricing. |
| 3 | Separate paid v2 edition | Review, correct, and approve drafts with a visible decision history. | Reviewer UI with access control, checked artifact links, explicit overrides, reviewer identity, edit history, and tests showing that drafts cannot silently become approvals. |
| 4 | Separate paid v2 edition | Run larger workloads with durable queueing and multiple workers. | Postgres persistence, lease/fencing behavior, crash recovery, concurrency tests, migration/backup drills, and no duplicate publication during retries. |
| 5 | Separate paid v2 edition | Use additional transcript sources. | Each supported source has a documented provider contract, source identity, speaker mapping, fixtures, live smoke test, privacy notes, and retry tests. |
| 6 | Separate paid domain rubric packs | Start support, sales, or coaching reviews from calibrated examples. | Original domain rubrics, licensed synthetic or authorized examples, multiple reviewer labels, disagreement analysis, stated use-case limits, and a separate versioned acceptance report. |
| 7 | Separate paid hosted edition | Operate the workflow without managing a Node service. | Tenant isolation, authentication, secrets handling, retention/deletion, access logs, backup/restore, incident process, capacity/cost limits, and operational monitoring verified before sale. |

## What to learn first

Collect buyer evidence before extending scope: where setup fails, which criteria produce disagreements, how much transcript coverage is useful, how reviewers use the excerpts, and which output failures require intervention. Measure preparation time and reviewer effort separately. That evidence determines whether a UI, a new source, or a domain pack provides the next distinct paid outcome.

V1 remains usable if a buyer chooses no later edition. Provider changes may require compatible maintenance; no indefinite compatibility or future delivery schedule is promised.
