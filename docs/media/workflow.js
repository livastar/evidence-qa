'use strict';

(() => {
  const exactStepQuote = 'Please open the order page and select “Delivery details”.';
  const steps = [
    {
      title: 'Define what counts.',
      description: 'Supply a rubric with observable criteria and label points. Name the exact speaker to assess; the kit does not infer identity.',
      contract: 'Rubric + explicit subject speaker',
      illustration: '<div class="rubric-paper paper"><div class="paper-heading"><span class="document-tab">Rubric</span><span>1.0.0</span></div><h3>support-coaching</h3><div class="criterion-line"><span>Clarify the problem</span><b>0 · 1 · 2</b></div><div class="criterion-line"><span>Give a next step</span><b>0 · 1 · 2</b></div><div class="criterion-line"><span>Customer confirmation</span><b>0 · 1</b></div><div class="criterion-line muted-line"><span>Visual attention</span><b>Unscored</b></div><p class="paper-footnote">Visual behavior is outside transcript evidence.</p></div><div class="speaker-ticket"><span>Subject speaker</span><strong>Agent</strong><span>Exact label required</span></div>',
    },
    {
      title: 'Start with an eligible transcript.',
      description: 'The buyer-operated scan obtains an eligible Zoom transcript. Turns carry explicit speaker labels and available cue timestamps.',
      contract: 'Authorized source → speaker-labelled turns',
      illustration: `<div class="transcript-paper paper"><div class="paper-heading"><span class="document-tab">Zoom transcript</span><span>Synthetic WEBVTT</span></div><h3>Subject speaker: Agent</h3><div class="transcript-turn"><span>t1</span><p><b>Customer · 0–5 s</b>My order confirmation arrived, but I can’t find the tracking link.</p></div><div class="transcript-turn"><span>t2</span><p><b>Agent · 5–12 s</b>Do you see an order number in the email? I want to confirm that the missing item is the tracking link, not the confirmation itself.</p></div><div class="transcript-turn highlight-turn"><span>t4</span><p><b>Agent · 16–25 s</b>${exactStepQuote}</p></div></div><div class="source-ticket"><span>Source content</span>SHA-256 retained</div>`,
    },
    {
      title: 'Ask for a criterion draft.',
      description: 'OpenAI proposes a label, reason and cited excerpts for each criterion. The model does not supply the final point totals.',
      contract: 'Rubric + transcript → structured draft',
      illustration: '<div class="model-draft paper"><div class="raw-heading"><h3>OpenAI criterion draft</h3><span class="draft-stamp">AI interpretation</span></div><div class="raw-row header-row"><span>Criterion</span><span>Label</span><span>Evidence</span></div><div class="raw-row"><span>clarify</span><span>clear</span><span>t2</span></div><div class="raw-row"><span>next_step</span><span>clear</span><span>t4</span></div><div class="raw-row"><span>confirmation</span><span>confirmed</span><span>t5</span></div><div class="raw-row raw-unscored"><span>visual_attention</span><span>null</span><span>none</span></div><p class="paper-footnote">Reasons and labels remain interpretations for review.</p></div><div class="floating-label">No model-calculated totals</div>',
    },
    {
      title: 'Check the quotation and speaker.',
      description: 'Code requires an exact Unicode excerpt in the cited turn. Subject-scoped criteria require the subject’s own words. Invalid evidence prevents scoring.',
      contract: 'Exact excerpt + cited turn + eligible speaker',
      illustration: `<div class="quote-comparison"><div class="quote-source"><p><strong>Source turn t4</strong> · Agent · 16–25 seconds</p><blockquote>${exactStepQuote}</blockquote></div><div class="literal-bridge"><span aria-hidden="true"></span>Exact Unicode substring</div><div class="quote-check"><strong>next_step · subject scope</strong><p class="quote-small">${exactStepQuote}</p><div class="check-rules"><span>Turn exists</span><span>Quote matches</span><span>Speaker is Agent</span></div></div></div>`,
    },
    {
      title: 'Calculate points in code.',
      description: 'Known labels map to the rubric’s points. Missing evidence, nonobservable criteria and needs_human judgments stay unscored. Coverage is shown separately.',
      contract: 'Synthetic demo: 3 of 4 criteria scored',
      illustration: '<div class="score-artifact"><div class="score-top"><div class="score-main">5 <span>/ 5</span></div><p class="score-label">Points on assessed criteria<br>100% assessed score</p></div><div class="point-rail" aria-label="Five assessed points and one unscored possible point"><span class="point-unit"></span><span class="point-unit"></span><span class="point-unit"></span><span class="point-unit"></span><span class="point-unit"></span><span class="point-unit unscored-unit"></span></div><div class="coverage-caption"><strong>83.33% coverage</strong><span>5 of 6 possible points</span></div><div class="unscored-note"><span aria-hidden="true">◌</span><div><strong>Visual attention: unscored</strong><p>The source contains no eligible visual observation.</p></div></div><p class="score-disclaimer">Checked arithmetic does not establish whether a proposed label is correct.</p></div>',
    },
    {
      title: 'Save before publishing.',
      description: 'The validated draft assessment is saved locally before output publication. Its identity binds the source, rubric, speaker and assessment settings.',
      contract: 'A durable restart point for publication',
      illustration: '<div class="saved-illustration"><div class="folder-back"></div><div class="saved-record"><span class="document-tab">Validated draft</span><h3>Saved assessment</h3><div class="identity-row"><span>Source + rubric hashes</span><strong>Retained</strong></div><div class="identity-row"><span>Exact subject + model settings</span><strong>Bound to key</strong></div><div class="identity-row"><span>Quotes, points, review flags</span><strong>Saved</strong></div><div class="identity-row"><span>Review status</span><strong>draft</strong></div></div><div class="save-band"><span aria-hidden="true">✓</span>Assessment saved before Google publication</div></div>',
    },
    {
      title: 'Publish reviewable drafts.',
      description: 'The output step creates or reconciles a Google Doc report and a criterion-level Sheet row. Both retain draft status and the assessment identity.',
      contract: 'Google Doc + Google Sheet · draft outputs',
      illustration: `<div class="publication-artifact"><div class="output-doc"><span class="document-tab">Google Doc</span><h3>Conversation QA draft</h3><p class="output-subhead">Reason + quotations + review flags</p><p class="doc-quote">${exactStepQuote}</p><p class="doc-result">5 / 5 assessed points<br>83.33% evidence coverage</p></div><div class="output-doc sheet-output"><span class="document-tab">Google Sheet</span><h3>Criterion-level record</h3><p class="output-subhead">Shared assessment key</p><div class="sheet-grid"><span>Criterion</span><span>Points</span><span>Status</span><span>clarify</span><span>2</span><span>scored</span><span>next_step</span><span>2</span><span>scored</span><span>confirmation</span><span>1</span><span>scored</span></div><p class="doc-result">Each criterion: label, points,<br>status, reason, evidence</p></div><div class="publication-chip">Drafts linked by assessment key</div></div>`,
    },
    {
      title: 'Keep the judgment human.',
      description: 'A reviewer checks the evidence in context and calibrates the rubric’s labels. The v1 outputs remain drafts; a reviewer interface is not included.',
      contract: 'Coaching and QA · human judgment required',
      illustration: '<div class="human-review-artifact"><div class="review-paper paper"><span class="document-tab">Human review</span><h3>A draft invites a decision.</h3><p>The kit prepares the record. Your reviewer checks the interpretation before acting.</p><ul class="review-questions"><li>Does the quote support this criterion?</li><li>Does the proposed label fit your standard?</li><li>What context or unscored evidence is missing?</li></ul></div><div class="review-tag">Draft status stays visible</div></div>',
    },
  ];

  const tabs = [...document.querySelectorAll('[data-view]')];
  const stops = [...document.querySelectorAll('[data-step]')];
  const panels = [...document.querySelectorAll('.view-panel')];
  const playButton = document.querySelector('#play-button');
  const frameToggle = document.querySelector('#frame-mode');
  const stage = document.querySelector('#artifact-stage');
  const announcement = document.querySelector('#stage-announcement');
  const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  const query = new URLSearchParams(window.location.search);
  const requestedFrame = query.get('frame');
  const validFrame = requestedFrame !== null && /^[0-7]$/.test(requestedFrame);
  let step = validFrame ? Number(requestedFrame) : 0;
  let view = 'overview';
  let frameMode = validFrame;
  let timer = null;

  function writeFrameQuery() {
    const url = new URL(window.location.href);
    if (frameMode) url.searchParams.set('frame', String(step));
    else url.searchParams.delete('frame');
    try { window.history.replaceState(null, '', url); } catch { /* Local file previews may restrict history changes. */ }
  }

  function renderStep(next, announce = false) {
    step = Math.max(0, Math.min(steps.length - 1, next));
    const selected = steps[step];
    document.querySelector('#step-count').textContent = `${frameMode ? 'Frame' : 'Step'} ${step + 1} of 8`;
    document.querySelector('#stage-title').textContent = selected.title;
    document.querySelector('#stage-description').textContent = selected.description;
    document.querySelector('#stage-contract').textContent = selected.contract;
    stage.innerHTML = selected.illustration;
    stage.classList.remove('is-changing');
    if (!frameMode && !motionQuery.matches) {
      void stage.offsetWidth;
      stage.classList.add('is-changing');
    }
    stops.forEach((button, index) => {
      button.classList.toggle('is-complete', index < step);
      if (index === step) button.setAttribute('aria-current', 'step');
      else button.removeAttribute('aria-current');
    });
    document.querySelector('#trail-progress').style.width = `${step / 7 * 100}%`;
    if (announce) announcement.textContent = `Step ${step + 1} of 8. ${selected.title} ${selected.description}`;
    if (frameMode) writeFrameQuery();
  }

  function updateControls() {
    playButton.innerHTML = timer === null ? '<span aria-hidden="true">▶</span> Play' : '<span aria-hidden="true">Ⅱ</span> Pause';
    playButton.setAttribute('aria-label', timer === null ? 'Play the eight-step walkthrough' : 'Pause the walkthrough');
    playButton.disabled = frameMode;
    frameToggle.checked = frameMode;
    document.body.dataset.frameMode = String(frameMode);
    document.querySelector('#motion-note').textContent = frameMode ? 'Deterministic frame mode. Select a step to change frames.' : motionQuery.matches ? 'Reduced motion enabled. Starts paused; steps are available manually.' : 'Starts paused. Choose any step below.';
  }

  function pause() {
    if (timer !== null) window.clearInterval(timer);
    timer = null;
    updateControls();
  }

  function selectView(next, focus = false) {
    view = next;
    if (view !== 'overview') pause();
    tabs.forEach((tab) => {
      const selected = tab.dataset.view === view;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus();
    });
    panels.forEach((panel) => { panel.hidden = panel.id !== `view-${view}`; });
  }

  playButton.addEventListener('click', () => {
    if (timer !== null) { pause(); return; }
    if (frameMode) return;
    if (step === steps.length - 1) renderStep(0, true);
    timer = window.setInterval(() => {
      renderStep(step + 1, true);
      if (step === steps.length - 1) pause();
    }, 4500);
    updateControls();
  });
  document.querySelector('#restart-button').addEventListener('click', () => { pause(); renderStep(0, true); });
  frameToggle.addEventListener('change', () => {
    const requestedMode = frameToggle.checked;
    pause();
    frameMode = requestedMode;
    updateControls();
    writeFrameQuery();
    renderStep(step);
  });
  stops.forEach((button) => {
    button.addEventListener('click', () => { pause(); renderStep(Number(button.dataset.step), true); });
    button.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? 7 : (Number(button.dataset.step) + (event.key === 'ArrowRight' ? 1 : 7)) % 8;
      pause();
      renderStep(next, true);
      stops[next].focus();
    });
  });
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectView(tab.dataset.view));
    tab.addEventListener('keydown', (event) => {
      if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
      event.preventDefault();
      const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
      selectView(tabs[next].dataset.view, true);
    });
  });
  motionQuery.addEventListener('change', () => { pause(); stage.classList.remove('is-changing'); });
  document.addEventListener('visibilitychange', () => { if (document.hidden) pause(); });
  const logo = document.querySelector('.brand-symbol img');
  logo.addEventListener('error', () => { logo.hidden = true; });
  if (logo.complete && logo.naturalWidth === 0) logo.hidden = true;
  updateControls();
  renderStep(step);
  // Offline inspection contract: deterministic, read-only state for screenshot tools.
  window.evidenceQaIllustration = Object.freeze({ getState: () => ({ step, view, frameMode, playing: timer !== null }), frameCount: steps.length });
})();
