const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
const pagesWorkflow = fs.readFileSync(
  path.join(__dirname, "..", ".github", "workflows", "pages.yml"),
  "utf8",
);

test("GitHub Pages publishes every local script loaded by the app", () => {
  const localScripts = [...html.matchAll(/<script\s+src=["']([^"']+)["']/g)]
    .map((match) => match[1])
    .filter((source) => !/^https?:\/\//.test(source));

  for (const source of localScripts) {
    assert.match(
      pagesWorkflow,
      new RegExp(`\\b${source.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&")}\\b`),
      `${source} must be copied into the Pages artifact`,
    );
  }
});

test("recording playback uses the cross-platform custom controls", () => {
  assert.doesNotMatch(html, /<audio[^>]*\scontrols(?:\s|>)/i);
  for (const id of ["playerToggle", "playerTime", "playerSeek", "playerMute", "playerVolume"]) {
    assert.match(html, new RegExp(`id=["']${id}["']`));
  }
});

test("history keeps download in Recording and omits per-item WAV actions", () => {
  assert.match(html, /id="download"[^>]*download="voicescope\.wav"/);
  assert.doesNotMatch(html, /act-wav/);
  assert.match(html, /class="hist-zone"/);
});

test("mobile live status uses a stable grid instead of wrapping flex content", () => {
  assert.match(html, /#live\.on\{display:grid;/);
  assert.match(html, /#live \.live-stat\{grid-row:2;/);
  assert.match(html, /\.live-stat b\{height:26px; line-height:26px\}/);
});

test("mobile recording controls remain reachable and touch-friendly", () => {
  assert.match(html, /#live\.on\{position:sticky;/);
  assert.match(html, /\.theme-btn\{width:44px; height:44px\}/);
  assert.match(html, /\.btn-ghost\{min-height:44px\}/);
  assert.match(html, /#live \.btn-stop\{[^}]*min-height:44px/);
  assert.match(html, /\.ibtn\{min-height:44px\}/);
  assert.match(html, /\.hero-hint\{display:none\}/);
});
