const test = require("node:test");
const assert = require("node:assert/strict");

const {
  correctOctaveOutliers,
  localMadOutlierMask
} = require("../analysis-core.js");

test("octave correction fixes short bracketed octave mistakes", () => {
  const baseline = 43;
  const values = [
    baseline, baseline + 0.2, baseline - 0.1, baseline + 0.1,
    baseline + 12, baseline + 12.1, baseline + 11.9,
    baseline, baseline - 0.2, baseline + 0.1, baseline
  ];

  const corrected = correctOctaveOutliers(values, { radius: 5 });

  assert.ok(Math.abs(corrected[4] - baseline) < 0.5);
  assert.ok(Math.abs(corrected[5] - baseline) < 0.5);
  assert.ok(Math.abs(corrected[6] - baseline) < 0.5);
});

test("octave correction does not let a bad burst pull following speech up an octave", () => {
  const baseline = 43;
  const values = [
    ...Array(24).fill(baseline),
    baseline + 24,
    baseline + 24,
    baseline + 24,
    ...Array(64).fill(baseline)
  ];

  const corrected = correctOctaveOutliers(values, { radius: 8 });

  for (let index = 27; index < corrected.length; index++) {
    assert.equal(corrected[index], baseline);
  }
});

test("local MAD removes brief local spikes", () => {
  const baseline = 43;
  const values = [
    ...Array(40).fill(baseline),
    baseline + 12,
    baseline + 11.5,
    ...Array(40).fill(baseline)
  ];

  const mask = localMadOutlierMask(values, { radius: 12, maxRun: 6 });

  assert.equal(mask[40], true);
  assert.equal(mask[41], true);
  assert.equal(mask[39], false);
  assert.equal(mask[42], false);
});

test("global fallback removes a short extreme run next to unvoiced gaps", () => {
  const baseline = 43;
  const values = [
    ...Array(30).fill(baseline),
    null, null, null,
    67, 67, 67, 67,
    null, null, null,
    ...Array(30).fill(baseline)
  ];

  const mask = localMadOutlierMask(values, { radius: 8, maxRun: 6 });

  assert.deepEqual(mask.slice(33, 37), [true, true, true, true]);
});

test("smart filtering preserves a clear short phrase in a different register", () => {
  const baseline = 43;
  const values = [
    ...Array(30).fill(baseline),
    null, null, null,
    55, 55.2, 54.8, 55,
    null, null, null,
    ...Array(30).fill(baseline)
  ];
  const reliability = values.map((value, index) => {
    if(value == null) return null;
    return index >= 33 && index < 37 ? 0.82 : 0.96;
  });

  const mask = localMadOutlierMask(values, {
    radius: 8,
    maxRun: 6,
    reliability
  });

  assert.deepEqual(mask.slice(33, 37), [false, false, false, false]);
});

test("smart filtering removes the same isolated burst when detection is unreliable", () => {
  const baseline = 43;
  const values = [
    ...Array(30).fill(baseline),
    null, null, null,
    55, 55.2, 54.8, 55,
    null, null, null,
    ...Array(30).fill(baseline)
  ];
  const reliability = values.map((value, index) => {
    if(value == null) return null;
    return index >= 33 && index < 37 ? 0.61 : 0.96;
  });

  const mask = localMadOutlierMask(values, {
    radius: 8,
    maxRun: 6,
    reliability
  });

  assert.deepEqual(mask.slice(33, 37), [true, true, true, true]);
});

test("local MAD preserves sustained pitch changes", () => {
  const baseline = 43;
  const sustained = 55;
  const values = [
    ...Array(40).fill(baseline),
    ...Array(36).fill(sustained),
    ...Array(40).fill(baseline)
  ];

  const mask = localMadOutlierMask(values, { radius: 12, maxRun: 6 });

  assert.equal(mask.some(Boolean), false);
});
