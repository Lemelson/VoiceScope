const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");

const { build, languagePages, pages } = require("../scripts/build-seo-pages.js");
const { LANGUAGES } = require("../i18n.js");

function buildTemporarySite() {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), "voicescope-seo-"));
  build(directory);
  return directory;
}

test("builds every search-intent, trust, and language page", () => {
  const directory = buildTemporarySite();
  const slugs = [...pages, ...languagePages].map((page) => page.slug);
  assert.equal(slugs.length, 20);

  for (const page of [...pages, ...languagePages]) {
    const filename = path.join(directory, page.slug, "index.html");
    assert.ok(fs.existsSync(filename), `${page.slug} must be generated`);
    const html = fs.readFileSync(filename, "utf8");
    assert.match(html, new RegExp(`<html lang=["']${page.lang || "en"}`));
    assert.match(html, new RegExp(`<link rel=["']canonical["'] href=["']https://lemelson\\.github\\.io/VoiceScope/${page.slug}/`));
    assert.match(html, /<meta name="description" content="[^"].+">/);
    assert.match(html, /<h1>[^<]+<\/h1>/);
  }
});

test("localized landing pages are mutually linked with hreflang", () => {
  const directory = buildTemporarySite();
  for (const language of languagePages) {
    const html = fs.readFileSync(path.join(directory, language.slug, "index.html"), "utf8");
    assert.match(html, /hreflang="x-default"/);
    for (const alternate of languagePages) {
      assert.match(html, new RegExp(`hreflang=["']${alternate.code}["']`));
    }
    for (const englishChrome of ["Read the guide", "At a glance", "Open analyzer", "Language versions"]) {
      assert.doesNotMatch(html, new RegExp(englishChrome), `${language.code} must localize ${englishChrome}`);
    }
  }
});

test("SEO language routes exactly match the supported application languages", () => {
  assert.deepEqual(
    languagePages.map((language) => language.code).sort(),
    LANGUAGES.map((language) => language.code).filter((code) => code !== "en").sort(),
  );
});

test("generated sitemap contains every canonical route and language alternates", () => {
  const directory = buildTemporarySite();
  const sitemap = fs.readFileSync(path.join(directory, "sitemap.xml"), "utf8");
  assert.match(sitemap, /xmlns:xhtml="http:\/\/www\.w3\.org\/1999\/xhtml"/);
  assert.match(sitemap, /<loc>https:\/\/lemelson\.github\.io\/VoiceScope\/<\/loc>/);
  for (const page of [...pages, ...languagePages]) {
    assert.match(sitemap, new RegExp(`<loc>https://lemelson\\.github\\.io/VoiceScope/${page.slug}/</loc>`));
  }
  for (const language of languagePages) {
    assert.match(sitemap, new RegExp(`hreflang=["']${language.code}["']`));
  }
});

test("the checked-in sitemap reference cannot drift from generated routes", () => {
  const directory = buildTemporarySite();
  const generated = fs.readFileSync(path.join(directory, "sitemap.xml"), "utf8");
  const reference = fs.readFileSync(path.join(__dirname, "..", "sitemap.xml"), "utf8");
  const locations = (xml) => [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).sort();
  assert.deepEqual(locations(reference), locations(generated));
});

test("main analyzer contains indexable guidance and routes explicit languages", () => {
  const html = fs.readFileSync(path.join(__dirname, "..", "index.html"), "utf8");
  assert.match(html, /class="seo-home"/);
  assert.match(html, /Free online voice pitch analyzer/);
  assert.match(html, /new URLSearchParams\(location\.search\)\.get\('lang'\)/);
  for (const route of [
    "voice-pitch-analyzer", "voice-frequency-test", "how-deep-is-my-voice",
    "voicecel-test", "voicecel-alternative", "methodology", "accuracy", "faq",
    "about", "privacy",
  ]) {
    assert.match(html, new RegExp(`href=["']${route}/["']`), `${route} needs a link from the analyzer`);
  }
});
