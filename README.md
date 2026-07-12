# VoiceScope

A local, in-browser voice pitch analyzer. Records your voice from the microphone, detects the
fundamental pitch with the **YIN** algorithm and shows **which notes your voice hit, second by second**.

**Open the app:** [lemelson.github.io/VoiceScope](https://lemelson.github.io/VoiceScope/)

All analysis runs locally in your browser. Audio is never uploaded to GitHub or any other server.

## Features
- **Unlimited recording length** with manual stop (button or Space).
- **Pitch contour over time** as a piano roll: notes vertically, seconds horizontally.
- **Live view while recording**: real-time pitch chart, current note/Hz, and a running median.
- **MA and EMA smoothing lines** — see how the voice moved up and down.
- **Outlier trimming**: a median filter removes single-frame octave spikes; percentile trimming
  cuts hiss (too high) and random dips (too low); a hybrid MAD mode targets short glitches only.
- **Neutral statistics** (median, mean, range, spread) instead of labels.
- **10 interface languages** — English is the default and remains first in the selector; the
  browser/OS language is promoted to the second option when supported. Reading passages follow
  the selected language and can be shuffled with "Another text".
- **Consistent custom playback controls** across desktop and mobile, plus chart seeking and WAV download.
- **Readable local history** with pitch, note, speaking zone, duration, profile, playback, and reopen actions.
- Light/dark theme, remembered between visits.

## Running locally

The microphone needs a secure context (https, localhost, or `file://`).

**Option 1 — double click.** Open `index.html` in Chrome or Firefox (`file://` usually works).

**Option 2 — local server** (most reliable, recommended for Safari):

```bash
cd VoiceCellCopy
python3 -m http.server 8000
```
Then open http://localhost:8000 and allow microphone access.

## Controls
- **Start recording / Stop** — buttons or the **Space** key.
- No auto-stop timer: the recording runs until you stop it.
- Under the chart, "Analysis settings" holds the processing profile, display toggles
  (points/EMA/MA), trimming mode, and fine-tuning sliders — all re-render instantly
  without re-recording.

## Playback
- **Chart playhead**: a vertical line follows the contour during playback.
- **Chart controls**: click the chart to play from that point; click near the line to pause;
  hover shows the time. The audio player below works too.
- **History playback**: play any saved recording right from the list (▶) or delete it (✕).

## Processing profiles and fine-tuning
Quick **profiles** above the chart: Raw · Gentle · Smart (default) · Strict · Maximum.
Each sets sensitivity, MA window, EMA span and trimming mode at once. Smart uses the hybrid
MAD trimmer, which combines local pitch context with YIN confidence instead of blindly cutting
percentiles. Clear short phrases are preserved while low-confidence glitches are removed. Any
manual tweak in Analysis settings switches to a Custom profile.

- **Outlier trimming**: Off / Light 1% / Medium 3% / Strict 5% / Aggressive 10% /
  Smart (hybrid MAD — compares each frame against neighbouring speech and additionally catches
  low-confidence global extremes near pauses; clear and sustained pitch changes are preserved).
- **Sensitivity** — confidence threshold of the pitch detector (lower = catches more quiet/noisy
  material; higher = only clear tone).
- **MA window** — width of the centred moving average.
- **EMA span** — responsiveness of the exponential line.
- **Octave correction** — fixes short 2× errors when the detector confuses the octave. It compares
  against unchanged neighbouring frames on both sides, so a noisy burst can't drag subsequent
  normal speech to the wrong octave.
- **Min duration** — drops very short bursts (clicks, artifacts).
- **Adaptive silence floor** — estimates background noise and cuts anything quieter.

## F0 reference
The results include a descriptive speaking-F0 zone and percentile estimates based on a simple
statistical model: men **116±16 Hz**, women **190±25 Hz**. Note that "100 Hz is lower than ~84%
of men" means only about **16%** sit at 100 Hz or below. These are statistical references,
not a diagnosis. Sources: Awan et al. 2017, Hudson & Holbrook 1981, Fernández Liesa et al. 1999,
Barsties 2013.

## Parallel recording protection
The app takes a browser `navigator.locks` lock named `voicescope-recording`. If a recording is
already running in another VoiceScope tab, a new tab shows a warning instead of grabbing the
microphone a second time. Browsers without Web Locks still get single-tab double-start protection.

## Recording history (local)
The last **30 recordings** are stored in the browser (IndexedDB), up to **1 GB** total — older ones
are pruned automatically. Each can be reopened (same contour), played, downloaded as WAV, or
deleted. Stored per recording: WAV, pitch contour (f0/confidence/loudness per frame), median,
and the settings used.

### Planned: trim calibration from collected recordings
The **Export JSON** button downloads `voicescope-data.json` with all pitch contours (no audio,
compact). Future task (on request): analyze the accumulated ~30 recordings to check whether edge
trimming is too aggressive or too weak — i.e. whether real low/high voice segments are being
discarded instead of random artifacts — and adjust the default presets/percentiles accordingly.

## How it works
1. PCM capture from the microphone (no noise suppression/AGC, to avoid distorting the pitch).
2. Decimation to ~16 kHz, frame-by-frame YIN (~33 ms window, 8 ms hop) → frequency + confidence.
3. Filtering: confidence threshold, 55–600 Hz range, median filter, local octave correction,
   min-run, then percentile or local-MAD trimming.
4. Hz → notes (MIDI), MA/EMA in semitone space, canvas rendering.

## Tests

```bash
node --test tests/*.test.js
```

## Search pages and deployment

The analyzer remains a single fast application. Search-intent, trust, and localized landing pages
are generated as static HTML during the GitHub Pages workflow by `scripts/build-seo-pages.js`.
The build currently publishes:

- voice pitch analyzer, voice frequency test, voice depth, Voicecel test, and Voicecel alternative guides;
- About, Privacy, Methodology, Accuracy, and FAQ pages;
- localized landing pages for Russian, Spanish, German, French, Portuguese, Chinese, Japanese,
  Korean, and Hindi;
- a Russian long-tail page for `измерить частоту голоса`;
- a sitemap containing every canonical URL and reciprocal `hreflang` alternates.

Build the same artifact locally:

```bash
mkdir -p public
cp index.html i18n.js content.js analysis-core.js seo.css favicon.svg og-image.png robots.txt public/
HOME_LASTMOD="$(git log -1 --format=%cs -- index.html)" \
SITE_LASTMOD="$(git log -1 --format=%cs -- scripts/build-seo-pages.js)" \
node scripts/build-seo-pages.js public
```

After a production deploy, the site owner should:

1. Verify the current URL or custom domain in Google Search Console and Yandex Webmaster.
2. Submit `https://lemelson.github.io/VoiceScope/sitemap.xml` (or the custom-domain equivalent).
3. Request indexing for the home page and the priority English and Russian landing pages.
4. Monitor excluded URLs, impressions, queries, and click-through rate before changing titles.

When moving to a custom domain, update the `SITE` constant in `scripts/build-seo-pages.js`, the
canonical/alternate URLs in `index.html`, `robots.txt`, and the static reference `sitemap.xml` in
the same commit. Relative CSS and favicon paths already work on either hosting layout.

For the mobile recording layout regression, run the local server and open
`http://localhost:8000/tests/mobile-recording-harness.html`. The harness repeatedly changes live
pitch values and passes only when the reading text remains at a stable vertical position.
