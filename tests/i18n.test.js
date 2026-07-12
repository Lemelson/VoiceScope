const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const {
  LANGUAGES,
  STRINGS,
  matchLanguageTag,
  normalizeLanguageTag,
  preferredLanguage,
  orderedLanguages,
  translate,
} = require("../i18n.js");

test("ships ten complete language bundles", () => {
  assert.equal(LANGUAGES.length, 10);
  const englishKeys = Object.keys(STRINGS.en).sort();
  for (const language of LANGUAGES) {
    assert.deepEqual(Object.keys(STRINGS[language.code]).sort(), englishKeys);
  }
});

test("every language option has a native name, flag, and locale", () => {
  for (const language of LANGUAGES) {
    assert.ok(language.name);
    assert.match(language.flag, /\p{Regional_Indicator}{2}/u);
    assert.ok(language.locale);
  }
});

test("ships reading passages for every interface language", () => {
  const sandbox = { window: {} };
  const source = fs.readFileSync(
    path.join(__dirname, "..", "content.js"),
    "utf8",
  );
  vm.runInNewContext(source, sandbox);
  assert.deepEqual(
    Object.keys(sandbox.window.VS_CONTENT.TEXTS_BY_LANG).sort(),
    LANGUAGES.map((language) => language.code).sort(),
  );
  for (const language of LANGUAGES) {
    assert.ok(
      sandbox.window.VS_CONTENT.TEXTS_BY_LANG[language.code].length >= 2,
    );
  }
  for (const zone of sandbox.window.VS_CONTENT.ZONES) {
    assert.ok(zone.id);
    for (const language of LANGUAGES) {
      assert.ok(STRINGS[language.code][zone.labelKey]);
      assert.ok(STRINGS[language.code][zone.hintKey]);
    }
  }
});

test("English stays first and the operating-system language is second", () => {
  assert.deepEqual(
    orderedLanguages("ja-JP").slice(0, 3).map((language) => language.code),
    ["en", "ja", "ru"],
  );
  assert.equal(orderedLanguages("en-US")[0].code, "en");
});

test("language matching handles regional tags and falls back to English", () => {
  assert.equal(matchLanguageTag("it-IT"), null);
  assert.equal(normalizeLanguageTag("pt-BR"), "pt");
  assert.equal(preferredLanguage(["it-IT", "zh-Hans-CN"]), "zh");
  assert.equal(normalizeLanguageTag("it-IT"), "en");
});

test("translations interpolate dynamic values", () => {
  assert.equal(
    translate("ru", "below", { hz: 80 }),
    "ниже 80 Гц",
  );
});

test("user-facing banners use localization keys", () => {
  const html = fs.readFileSync(
    path.join(__dirname, "..", "index.html"),
    "utf8",
  );
  assert.doesNotMatch(html, /showBanner\(\s*["']/);
  assert.match(html, /showBanner\(t\('recordingTooShort'\)\)/);
});
