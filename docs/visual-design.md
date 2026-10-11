# Visual design and media release plan

## Intended buyer outcome

Show the work a technical buyer can accomplish with v1: prepare repeatable conversation reviews against a defined rubric, inspect quoted evidence and code-calculated points, and recover Google publication from saved assessments. The media should help a buyer understand the purchase before connecting accounts.

Use these three messages consistently:

- **Repeatable preparation:** your criteria and explicit speaker mapping produce a structured draft rather than a blank scorecard.
- **Inspect the evidence:** exact excerpts, cited turns, permitted speakers, and deterministic arithmetic make the draft reviewable. A real quotation does not establish that the model's label is correct.
- **Recover publication:** save the assessment before creating a report or writing the Sheet. Retry pending output from saved state without another model request after that checkpoint.

These are implementation outcomes, not accuracy or time-saving guarantees. The source kit requires buyer accounts, manual setup, calibration, and human review. Marketing examples use fictional support data only.

## Design direction

Use a restrained operational visual language: a clear reading order, visible sources, separate score and coverage, and explicit draft states. Navy headings establish hierarchy; teal paths connect stages; pale mint groups checked evidence; amber draws attention to review-required results. These are intentional design choices for this product, not scientifically established guarantees of trust, conversion, or business performance.

Prefer a process diagram and a readable synthetic report excerpt over abstract AI imagery. Show concrete outputs early. Preserve visual continuity between the product cover, public preview, report still, and workflow animation. Avoid decorative dashboards that imply a shipped reviewer application.

## Six-color palette

| Token | Value | Intended use |
| --- | --- | --- |
| `navy` | `#17324D` | Titles, stage labels, primary text on light surfaces. |
| `teal` | `#087F8C` | Connectors, icons, large accent labels, geometric emphasis. |
| `mint` | `#E7F5F3` | Evidence panels and quiet grouping surfaces. |
| `amber` | `#9A6500` | Review-required icons and labels on paper; always paired with words. |
| `paper` | `#F6F8FB` | Main canvas and card surfaces. |
| `copy` | `#34465B` | Body text, descriptions, captions, and supporting labels. |

Calculated opaque-color contrast ratios: navy/paper 12.34:1; copy/paper 9.08:1; navy/mint 11.72:1; copy/mint 8.63:1; amber/paper 4.66:1. Teal/paper is 4.46:1 and teal/mint is 4.24:1: use navy or copy for small text on those surfaces. Do not assume alpha, gradients, or resized exported text retain these ratios; check the rendered asset.

## Typography and layout

Use a system sans-serif stack for working previews: `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`. Choose a compatible embedded or available sans-serif for raster/video rendering. Avoid serif/sans mixtures, condensed type, all-cap paragraphs, and fabricated provider wordmarks. Use weight and spacing to establish hierarchy, with no more than three type sizes on a single frame.

Compose at 16:9 for the process explanation and adapt the cover to the marketplace's actual image slot. Keep critical content inside a 6% safe margin. Use a consistent grid, generous gaps, left-aligned labels, and short lines. At a 1280×720 reference size, start with 44–56 px titles, 28–34 px stage labels, and at least 22 px supporting text. Verify at the displayed preview size; remove content rather than shrink required disclaimers into unreadable type.

Score and coverage must remain side by side with their denominators. Do not use a single green completion ring to imply overall employee performance. The fictional demo is **5 / 5 assessed points**, **83.33% coverage of the full 6-point rubric**, and **3 / 4 criteria scored**. Label it “Synthetic example · Draft for human review.”

## Actual v1 flow to depict

1. **Configure:** choose a rubric, allowed labels and points, exact subject speaker, and buyer-owned provider destinations.
2. **Receive:** the buyer-operated scan discovers completed Zoom cloud-recording transcript files. Files are assessed separately; recording segments are not combined.
3. **Draft:** OpenAI proposes criterion labels and excerpt references using the configured rubric.
4. **Check:** code validates rubric/output contracts, exact Unicode excerpts, cited turns, permitted speakers, and review requests; eligible labels map to configured points. Unsupported criteria remain unscored.
5. **Save:** persist the validated assessment and integrity hash before publication.
6. **Publish:** reconcile/create a Google Doc and upsert a Google Sheet draft row using stable identities and one writer per local state directory.
7. **Review:** a person reads the draft and decides whether its interpretation and rubric fit the conversation. This is a separate human process, not an included approval application.

The inactive n8n export schedules an authenticated HTTP call to the buyer's Node engine. Depict it as scheduling, not as an all-in-one n8n implementation. Recovery of pending publications runs before Zoom discovery. An uncertain Doc creation is reconciled; if unresolved, it stops for operator investigation instead of blindly creating another report.

Suggested animation sequence: introduce the buyer's rubric and subject; move through transcript, proposed labels, evidence checks, saved assessment, and Google outputs; pause on separate score/coverage and a review-required blank; end with the human review boundary. Each frame should explain one operation, and the narration or captions should remain understandable without animated connectors.

## States and labels

| Visible state | What it establishes | Suggested treatment |
| --- | --- | --- |
| AI proposal | A model selected a label and reason. | Neutral paper panel; “AI interpretation.” |
| Checked excerpt | Exact text exists in the cited eligible turn. | Mint panel; quote mark, turn and speaker label. |
| Scored draft | Eligible evidence and label passed code checks; points were mapped. | Navy value; “Draft,” with score and coverage denominators. |
| Human review requested | The model requested review; no points assigned. | Amber icon and “Needs human review”; blank points. |
| Unassessable or invalid evidence | Required support is missing, mismatched, outside scope, or nonobservable. | Written reason and blank points; no red employee-failure badge. |
| Publication pending | Saved evidence exists; output awaits completion or reconciliation. | Written “Saved · Publication pending” and a checkpoint symbol. |
| Published draft | Google output has a confirmed publication checkpoint. | Document and row symbols with “Draft published”; no “Approved” state. |

No protected-trait inference, autonomous employment decision, semantic accuracy percentage, or measured live time saving belongs in the visuals. Reviewer UI, approval history, distributed workers, new sources, domain packs, and hosted service are proposed future editions, not shipped screens. If versions are mentioned, say that future major editions, if released, are optional separate paid purchases; same-listing updates follow marketplace terms.

## Accessibility and motion

Use text and shape alongside every state color. Provide concise alt text for static previews and a full text description of the process for motion media. Include captions or equivalent visible stage explanations so audio is optional. If narration is supplied, distinguish proposed judgments from checked provenance.

Avoid flashes, rapid zooms, spinning AI motifs, bouncing labels, and continuous background motion. Use restrained fades or short linear transitions, holding each important state long enough to read. Do not make timing or motion the sole carrier of meaning. A static poster and textual flow must convey the same outcome. In an interactive preview, respect `prefers-reduced-motion: reduce`, use the poster without autoplay, and provide pause controls; a video or GIF export needs an accessible static alternative beside it.

## Concrete release verification

- [ ] Compare every stage, state, claim, and example number with [the demo](demo.md), [evidence boundaries](evidence-and-limits.md), and [operations](operations.md).
- [ ] Confirm only fictional data appears: no client rubric, names, transcript, destinations, private URLs, credentials, historical outcomes, or source paths.
- [ ] Confirm the media shows buyer configuration and human review, not an included reviewer UI or fully proven employee evaluation.
- [ ] Inspect the cover, report still, first frame, each stage transition, recovery frame, and final frame at full size and marketplace preview size; check clipping, label order, typos, readable denominators, and no overlapping text.
- [ ] Check actual rendered contrast. Use navy/copy for small text; retain text/icon labels when rendered in grayscale.
- [ ] For motion exports, verify frame dimensions, duration, codec, file size, looping behavior, and that the uploaded marketplace slot supports the chosen format. Provide a poster if animation is unsupported.
- [ ] Verify caption/alt-text equivalents and that the static reduced-motion alternative includes all stages and limits.
- [ ] Verify demo values: 5 / 5 assessed points, 83.33% full-rubric coverage, 3 / 4 scored criteria; mark every example synthetic and every output a draft.
- [ ] Check final public media and downloaded assets after upload. Keep acceptance, pending review, publication, and live integration as separate evidence states.
- [ ] Record asset paths, checksums, rendering/inspection evidence, marketplace upload/status evidence, and any remaining accessibility or provider-operation gap in the root task record.

Definition of done: consistent readable media explains the actual v1 buyer outcome, all exported/uploaded artifacts pass the checks above, and the task record describes the verified delivery state. No runtime behavior or release claim changes are required for this media update.
