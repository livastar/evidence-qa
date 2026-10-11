# Setup in your own environment

This public manual describes the purchased Evidence QA v1 source kit. Commands and runtime files referenced below belong to that kit and are not included in this documentation repository.

Use Node.js 22 or newer and run all commands from the extracted kit's root. Runtime commands use Node built-ins; no package installation is needed. Creating a distribution ZIP with `npm run package` also requires Python 3. The downloaded purchase already includes the runnable source.

## 1. Check the offline example

```bash
node scripts/cli.mjs demo
node scripts/cli.mjs validate --rubric examples/support-rubric.json
npm test
npm run check
```

Confirm the [demo totals](demo.md) and inspect the HTML report. These commands use fictional data and do not establish provider-account access.

## 2. Prepare provider access

| Provider | Buyer setup | Runtime use |
| --- | --- | --- |
| Zoom | Account-authorized server-to-server OAuth application and completed cloud-recording transcripts for configured users. Verify current scopes for listing user recordings and transcript download in Zoom's endpoint documentation. | Token request at `https://zoom.us/oauth/token`, then `/v2/users/{user_id}/recordings` and eligible transcript downloads. |
| OpenAI | API account, usable API key, and access to a model that supports the Responses API and strict structured output. | One draft-assessment request for each new source/content/rubric/model identity; `store: false`. |
| Google | Cloud project with Drive and Sheets APIs enabled, OAuth client, buyer consent, and an offline refresh token. | Refresh-token exchange, native report creation through Drive, and draft rows through Sheets. |

Follow [Zoom's server-to-server OAuth guide](https://developers.zoom.us/docs/internal-apps/s2s-oauth/) and verify the scopes for [List all recordings](https://developers.zoom.us/docs/api/rest/reference/zoom-api/methods/#operation/recordingsList). Account/API eligibility and transcript production are prerequisites; this kit does not turn on recording or transcription.

For Google, follow the [official OAuth web-server flow](https://developers.google.com/identity/protocols/oauth2/web-server) with your own OAuth client and an approved redirect URI. Obtain an offline refresh token; configure the consent audience and any required app verification for your use case. This kit consumes the token but does not provide an interactive consent callback or Google Picker UI.

The documented scope combination is:

```text
https://www.googleapis.com/auth/spreadsheets
https://www.googleapis.com/auth/drive.file
```

Verify the actual granted scopes and destination access. The Sheets scope covers spreadsheets rather than an individual tab. `drive.file` covers app-created or explicitly app-authorized files; owning an existing Drive folder alone does not establish app access. See [Sheets scopes](https://developers.google.com/workspace/sheets/api/scopes) and [Drive scopes](https://developers.google.com/workspace/drive/api/guides/api-specific-auth).

## 3. Prepare Google destinations

Create a dedicated Google Sheet with an empty tab named `AI Draft`, or choose another empty tab and configure that exact name. The first write initializes the required headers. V1 does not create missing spreadsheets or tabs. Existing headers must match exactly; never point it at your official review sheet.

Choose a report folder accessible to the same OAuth application. If an existing folder is not app-authorized under `drive.file`, create a dedicated folder through the Drive API using that same application's authorized access token. The one-time request is `POST https://www.googleapis.com/drive/v3/files` with this JSON and a Bearer header supplied securely by your OAuth tool:

```json
{
  "name": "Evidence QA Reports",
  "mimeType": "application/vnd.google-apps.folder"
}
```

Use the returned folder ID as `reports_folder_id`. This folder-creation step is manual; the kit does not create or authorize folders. Confirm that the application can access the chosen folder before starting a live run. Reports are created as native Google Docs by [importing HTML through Drive](https://developers.google.com/workspace/drive/api/guides/manage-uploads).

## 4. Set credentials

Supply these variables through your process manager or secret store:

```text
ZOOM_ACCOUNT_ID
ZOOM_CLIENT_ID
ZOOM_CLIENT_SECRET
OPENAI_API_KEY
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GOOGLE_REFRESH_TOKEN
```

Credentials are read from the environment. The kit does not load `.env` files automatically. Do not put secret values in the JSON configuration, commit them, or paste them into a support request. Tokens are cached in process memory and refreshed through their providers.

## 5. Configure the flow

Copy `examples/config.example.json` to your own configuration path and replace every `REPLACE_` value. Validate your rubric separately. Relative `rubric_file` and `state_dir` paths resolve from the command's current working directory, so run from the extracted root consistently.

| Setting | Meaning |
| --- | --- |
| `rubric_file` | Your rubric JSON. |
| `state_dir` | Private local checkpoint directory; share only with the same single-writer deployment. |
| `zoom.users[].user_id` | Zoom account user whose cloud recordings are read. |
| `zoom.users[].subject_speaker` | Exact transcript label to evaluate for that user's recordings. This is a configuration mapping, not proof of real identity. |
| `zoom.lookback_days` | Overlap window of 1–30 days. Default example: 7. |
| `zoom.max_transcripts_per_run` | Cap of 1–100 pending assessment/publication attempts. Default example: 10. Completed files can still be downloaded to check content changes. |
| `openai.model` | Buyer-selected compatible model. The example is a starting setting, not a calibration claim. |
| `openai.max_output_tokens` | Integer 256–100000 for the core request; the selected model's own limits also apply. Size it for the rubric; incomplete output fails instead of publishing. |
| `google.spreadsheet_id` | Destination spreadsheet ID. |
| `google.sheet_tab` | Existing draft tab's exact name. |
| `google.reports_folder_id` | OAuth-application-accessible report folder ID. |

The live Zoom flow processes eligible completed transcript files for the configured users within the lookback window. It has no topic filter or manual per-meeting allowlist in v1. Select users and a window for which this use is authorized. Each recording transcript file is its own source: segmented recordings are not combined into a complete-session review.

## 6. Verify one authorized live conversation

For your initial test, use one configured Zoom user, a small lookback window, `max_transcripts_per_run: 1`, and separate draft destinations. Run:

```bash
node scripts/cli.mjs scan --config examples/config.example.json
```

If you copied the example, substitute your actual configuration path. Inspect the local checkpoint, native Google Doc, Sheet row, quotes, subject mapping, blank criteria, and coverage. Compare them with the original recording/transcript. Run the same configuration again and confirm the completed checkpoint is reused without another model request or output write.

Record the successful provider calls and actual destination artifacts before treating the buyer account as verified. If a provider setup or destination permission is missing, keep scheduling inactive. See [operations](operations.md) for scheduling and recovery, and [privacy](privacy.md) for storage and retention.
