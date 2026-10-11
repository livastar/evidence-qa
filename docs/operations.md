# Operate and recover the flow

This public manual describes the purchased Evidence QA v1 source kit. Commands and runtime files referenced below belong to that kit and are not included in this documentation repository.

Run the CLI from the extracted root:

```bash
node scripts/cli.mjs scan --config examples/config.example.json
```

Use your actual configuration file path after setup. The scan lists completed Zoom transcript files across all pages, orders them oldest first, downloads them, parses the selected speaker, and identifies the source/content/rubric/model/destinations. New work is assessed and checked before any report or Sheet write.

## Checkpoints and retries

The private `state_dir` separates assessment reuse from destination publication:

- `<assessment_key>.assessment.json` stores the validated result and its integrity hash.
- `<assessment_key>-<destination_hash>.publication.json` stores the result snapshot/hash, destination identity, saved headers/hash, report-attempt intent, report reference when known, and `published` status.

The result contains quoted evidence, model interpretation, identifiers, and review flags; protect both file types as conversation data. Pending publication files for the currently configured Google destinations are recovered before Zoom discovery, using their saved result and headers.

| Point of failure | What is saved | Next scan for the configured Google destinations |
| --- | --- | --- |
| Before the assessment checkpoint | No validated result. | Retries assessment; an earlier unconfirmed model request may have been billed. |
| Assessment saved, report stage attempted but not confirmed | Validated result and `report_attempted: true`, no report reference. | Searches for an existing Google report by stable assessment key. If found, continues output. If absent, stops for investigation instead of repeating creation. |
| Report saved, Sheet not confirmed | Validated result and report reference. | Re-reads the Sheet by assessment key and updates or appends the draft row. |
| Published checkpoint | Result, report reference, `published: true`. | Re-downloads source to detect changes, then reuses matching completed work without model or output writes. |

Retry by running `scan` again. There is no separate retry command. Keep the same Google destinations to resume their pending publication checkpoints. Recovery from those files does not need the original transcript, a Zoom download, or another model request; it uses the saved assessment and headers. A later Zoom discovery failure can still make the overall scan report failure even after saved outputs recover. Inspect its per-result stages.

Changing the current rubric or model does not rewrite an existing pending result: the recovery pass publishes its saved version. New assessments use the current configuration. To publish the same assessed source to newly selected destinations, the scan rediscovers and parses that source, then reuses the matching assessment cache without a new model call.

The adapters do not blindly retry a write whose outcome is unknown. A later scan reconciles the Doc using its app property and the Sheet using its first-column assessment key. Duplicate keys fail and require operator investigation. This is one-writer recovery behavior, not a distributed exactly-once guarantee.

### Unresolved report creation

The runner saves `report_attempted: true` before its initial report attempt. If a response is lost, Drive search can temporarily miss a newly created report. A retry that finds nothing therefore does not issue another create request. Leave the checkpoint intact, wait for destination indexing, and retry the same scan.

If reconciliation continues to find no report, stop scheduling and verify the destination using the checkpoint's assessment key, folder, provider request history, and actual files. Only after the buyer has confirmed that no report was created may the operator change `report_attempted` to `false` in that specific pending `.publication.json` file and run one manual scan. Preserve the result, its hash, destination identity, saved headers/hash, and all unrelated checkpoints. Do not reset the flag merely because one API search returned no match. There is no automatic reset command in v1.

Changed source content, subject, title, occurrence timestamp, rubric, model, output-token budget, or assessment version produces a distinct draft. Changing destinations produces a distinct local publication checkpoint and can reuse the assessed result. Human edits belong in a separate review tab or system: output retry can replace an existing draft row for the same key. A new model draft does not overwrite an older key.

## One-writer lock

One process at a time may write a particular `state_dir`. The scan creates `scan.lock/owner.json` containing its PID and start time, then removes the lock on normal completion or handled failure. Use a local filesystem; do not use this lock as multi-host coordination.

After a process crash, an old lock may remain. Stop the schedule, read `owner.json`, check that the recorded PID is not the active scan process, and inspect the deployment's process manager. For the example state path:

```bash
cat .data/scan.lock/owner.json
ps -p RECORDED_PID -o pid,lstart,command
```

Substitute the numeric PID from `owner.json`. PID reuse is possible, so compare start time and process identity. Remove only that confirmed abandoned `scan.lock` directory through your local file tool, then run one manual scan. Do not remove a lock while a scan is active.

Do not delete checkpoints to retry publication. Losing a checkpoint can trigger a new model call. Back up the private state directory according to your retention policy; editing the saved result makes its integrity check fail.

## Authenticated engine

Set `EVIDENCE_QA_SERVER_TOKEN` to a private random string of at least 32 characters. Generate and store it with your secret manager. Optionally set `EVIDENCE_QA_PORT` to a valid port; the default is 8787.

```bash
node scripts/server.mjs --config examples/config.example.json
```

The engine binds to `127.0.0.1`. `GET /health` returns minimal health and scan-active state without authentication. `POST /scan` requires `Authorization: Bearer <your token>`. This route triggers the configured Zoom scan; it does not accept transcript uploads or runtime configuration. Concurrent HTTP scans return 409. Failed candidates produce a failed scan response so a scheduler can detect failure.

The server has no built-in TLS, public bind option, user accounts, or hosted service. For a remote scheduler, place it behind your own HTTPS reverse proxy and private network/access controls. Keep the bearer secret in the scheduler's credential store. Deploy one engine writer for the selected state directory.

## n8n schedule

Import `exports/evidence-qa-schedule.workflow.json`. The workflow is inactive and contains two nodes: an hourly Schedule Trigger and an HTTP Request to the engine.

1. Replace `https://YOUR_PRIVATE_ENGINE_HOST/scan` with the reachable private HTTPS engine endpoint. If n8n runs on the same host, configure the appropriate reachable local endpoint.
2. Create an HTTP Header Auth credential with name `Authorization` and value `Bearer <your server token>`; select it in the HTTP Request node.
3. Choose the required schedule and timezone. The included hourly schedule uses UTC.
4. Run one manual execution, verify the engine response and Google draft artifacts, then activate the authorized schedule.

No provider credentials or server token are embedded in the exported workflow. Its request timeout is five minutes; a large sequential scan can take longer. Start with a small per-run cap and measure your workload before choosing intervals. Do not schedule overlapping work. A scheduler timeout does not prove the engine stopped; check `/health` and the process before retrying. The workflow does not include an alert channel or email sender.

## Recovery drills

Before relying on a schedule, run the synthetic tests and then a controlled buyer-account drill:

- Temporarily make the destination draft tab unavailable after an assessment is saved. Restore it, rerun the same scan, and confirm publication resumes from the checkpoint with no new model call.
- Inspect exact headers and first-column keys before resolving a mismatch or duplicate; do not delete another reviewer's data to make a scan pass.
- Stop the process during a controlled run, verify whether a lock remains, follow the abandoned-lock procedure, and confirm saved output resumes.
- Confirm your backup can restore state without changing identities. Keep real transcript content out of support logs.

Provider calls have a bounded request timeout and fail on refused, incomplete, malformed, or oversized responses. The CLI exposes failure stages such as `checkpoint`, `report`, `sheet`, `download`, `assessment`, or `discovery` without printing upstream response bodies or secret values. Investigate the corresponding local checkpoint and provider dashboards with the buyer's administrator.
