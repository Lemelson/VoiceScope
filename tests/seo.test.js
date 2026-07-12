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
    const figures = [...html.matchAll(/<figure class="feature-visual[^>]*>[\s\S]*?<\/figure>/g)];
    assert.ok(figures.length >= 1 && figures.length <= 2, `${page.slug} needs one or two useful figures`);
    for (const [figure] of figures) {
      assert.match(figure, /<img[^>]+width="1200"[^>]+height="675"[^>]+alt="[^"]+"/);
      assert.match(figure, /<figcaption>[^<]+<\/figcaption>/);
      const asset = figure.match(/src="[^"]*assets\/([^"]+\.svg)"/)?.[1];
      assert.ok(asset, `${page.slug} figure needs a local SVG asset`);
      assert.ok(fs.existsSync(path.join(__dirname, "..", "assets", asset)), `${asset} must exist`);
    }
    assert.match(html, /"primaryImageOfPage":\{"@type":"ImageObject"/);
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
  assert.match(sitemap, /xmlns:image="http:\/\/www\.google\.com\/schemas\/sitemap-image\/1\.1"/);
  assert.match(sitemap, /<loc>https:\/\/lemelson\.github\.io\/VoiceScope\/<\/loc>/);
  for (const page of [...pages, ...languagePages]) {
    assert.match(sitemap, new RegExp(`<loc>https://lemelson\\.github\\.io/VoiceScope/${page.slug}/</loc>`));
  }
  assert.match(sitemap, /<image:loc>https:\/\/lemelson\.github\.io\/VoiceScope\/assets\/pitch-contour\.svg<\/image:loc>/);
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
  assert.equal((html.match(/class="seo-figure/g) || []).length, 2);
  assert.match(html, /src="assets\/pitch-contour\.svg"[^>]+alt="[^"]+"/);
  assert.match(html, /src="assets\/smart-filter\.svg"[^>]+alt="[^"]+"/);
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

test("Pages workflow publishes the local visual assets", () => {
  const workflow = fs.readFileSync(path.join(__dirname, "..", ".github", "workflows", "pages.yml"), "utf8");
  assert.match(workflow, /cp -R assets public\/assets/);
});
