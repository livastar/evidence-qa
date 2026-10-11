# Data, storage, and retention

This public manual describes the purchased Evidence QA v1 source kit. Commands and runtime files referenced below belong to that kit and are not included in this documentation repository.

Use only conversations that your organization has authorized for this review flow and for transfer to the selected providers. The kit does not determine consent, lawful use, employment policy, or account eligibility.

| Location | Data handled | Retention control |
| --- | --- | --- |
| Zoom | Original recording and transcript; account/user and recording-file metadata. | Buyer's Zoom account settings. |
| Running Node process | Downloaded transcript, parsed turns, rubric, credentials, and model response. | Process memory; the flow does not save the complete input transcript as a separate file. |
| OpenAI request | Transcript text, speaker labels, rubric, and source metadata needed for the draft. | Request sets `store: false`; this does not itself promise zero provider retention. Check the buyer's applicable provider settings and terms. |
| Local `state_dir` | Validated draft, exact supporting excerpts, reasons, source/assessment identities, report reference, and publication state. | Buyer-managed storage and backups; no automatic purge in v1. |
| Google report and Sheet | Draft labels, excerpts/reasons, points, coverage, flags, and report links. | Buyer's access, retention, and deletion settings. |
| n8n | Engine request and result metadata when used as scheduler. | Included export disables saving success/error execution data; verify actual workspace settings and operational logging. |

The demo writes fictional artifacts to `demo-output`. Live checkpoint files contain real excerpts and identifiers. Keep real configuration, state, backups, and outputs outside any redistributed source package or repository. Provider credentials belong in the environment or secret store, never the JSON configuration.

New checkpoint files are created with mode `0600`; newly created state and lock directories request mode `0700`. Existing directories, storage encryption, backups, administrators, and platform-specific permission behavior remain the buyer's responsibility. V1 does not encrypt the state directory or provide tenant isolation.

## Choose retention deliberately

Set a retention period for drafts, excerpts, provider artifacts, and backups before live use. V1 has no automatic deletion job. Retain the checkpoint as long as a scan could revisit that source, because deleting it can cause another model request and publication attempt. Plan archival or source-window changes together with retention; do not delete state as a publication retry method.

Revoking credentials stops future access but does not delete existing reports, Sheet rows, checkpoints, or backups. Remove those through the respective storage systems under your approved retention process. Avoid sharing report links or raw errors in public issues. [Support](support.md) describes the sanitized information useful for a reproduction.
