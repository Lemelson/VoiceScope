const test = require("node:test");
const assert = require("node:assert/strict");

const {
  adaptiveVoicingMask,
  correctOctaveOutliers,
  decodePitchEvidence,
  encodePitchEvidence,
  localMadOutlierMask,
  medianFromHistogram
} = require("../analysis-core.js");

test("adaptive voicing removes a quiet persistent tone without targeting a fixed frequency", () => {
  const frames = [];
  for (let index = 0; index < 600; index++) {
    const speaking = (index >= 80 && index < 210) ||
      (index >= 280 && index < 410) ||
      (index >= 470 && index < 560);
    frames.push(speaking
      ? {
          f0: 105 + (index % 37) * 0.7,
          conf: 0.88,
          rms: 0.018 + (index % 11) * 0.0007
        }
      : {
          f0: 173 + (index % 3) * 0.12,
          conf: 0.62,
          rms: 0.0058 + (index % 5) * 0.0002
        });
  }

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(result.mask.filter(Boolean).length, 350);
  assert.equal(result.mask.slice(0, 80).some(Boolean), false);
  assert.equal(result.mask.slice(80, 210).every(Boolean), true);
  assert.ok(result.noiseToneFrames >= 200);
});

test("adaptive voicing keeps quiet expressive speech instead of using a blunt loudness gate", () => {
  const frames = Array.from({ length: 240 }, (_, index) => ({
    f0: 92 + 18 * Math.sin(index / 13) + (index % 7) * 0.35,
    conf: 0.91,
    rms: 0.0055 + (index % 9) * 0.00025
  }));

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(result.mask.every(Boolean), true);
  assert.equal(result.noiseToneFrames, 0);
});

test("adaptive voicing preserves a clear sustained sung note", () => {
  const frames = Array.from({ length: 360 }, (_, index) => ({
    f0: 220 + Math.sin(index / 25) * 0.35,
    conf: 0.94,
    rms: 0.006 + (index % 13) * 0.00012
  }));

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(result.mask.every(Boolean), true);
  assert.equal(result.noiseToneFrames, 0);
});

test("adaptive voicing preserves quiet sustained singing beside louder speech", () => {
  const loudSpeech = Array.from({ length: 350 }, (_, index) => ({
    f0: 105 + (index % 43) * 0.8,
    conf: 0.92,
    rms: 0.020,
    thresholdHit: true,
    boundaryMinimum: false
  }));
  const quietSinging = Array.from({ length: 250 }, (_, index) => ({
    f0: 220 + Math.sin(index / 30) * 0.3,
    conf: 0.94,
    rms: 0.005,
    thresholdHit: true,
    boundaryMinimum: false
  }));

  const result = adaptiveVoicingMask(loudSpeech.concat(quietSinging), {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(result.mask.slice(350).every(Boolean), true);
  assert.equal(result.noiseToneFrames, 0);
});

test("adaptive voicing retains loud voice frames that overlap the background frequency", () => {
  const frames = [];
  for (let index = 0; index < 360; index++) {
    const loudVoice = index >= 150 && index < 190;
    frames.push({
      f0: 118 + (index % 3) * 0.08,
      conf: loudVoice ? 0.91 : 0.63,
      rms: loudVoice ? 0.024 : 0.005
    });
  }

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.ok(result.mask.slice(0, 150).filter(Boolean).length <= 12);
  assert.equal(result.mask.slice(150, 190).every(Boolean), true);
  assert.ok(result.mask.slice(190).filter(Boolean).length <= 12);
});

test("adaptive voicing rejects a quiet persistent fallback pinned to the detector boundary", () => {
  const frames = Array.from({ length: 360 }, (_, index) => {
    const speaking = index >= 140 && index < 220;
    return speaking
      ? {
          f0: 110 + (index % 23),
          conf: 0.91,
          rms: 0.024,
          thresholdHit: true,
          boundaryMinimum: false
        }
      : {
          f0: 60.1,
          conf: 0.78,
          rms: 0.005,
          thresholdHit: false,
          boundaryMinimum: true
        };
  });

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.ok(result.mask.slice(0, 140).filter(Boolean).length <= 12);
  assert.equal(result.mask.slice(140, 220).every(Boolean), true);
  assert.ok(result.mask.slice(220).filter(Boolean).length <= 12);
  assert.equal(result.noiseToneFrames, 280);
});

test("adaptive voicing preserves a genuine threshold hit at the same boundary frequency", () => {
  const frames = Array.from({ length: 120 }, () => ({
    f0: 60.1,
    conf: 0.94,
    rms: 0.006,
    thresholdHit: true,
    boundaryMinimum: true
  }));

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(result.mask.every(Boolean), true);
  assert.equal(result.noiseToneFrames, 0);
});

test("adaptive voicing preserves a loud boundary fallback without a noise profile", () => {
  const frames = Array.from({ length: 120 }, () => ({
    f0: 60.1,
    conf: 0.78,
    rms: 0.018,
    thresholdHit: false,
    boundaryMinimum: true
  }));

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(result.mask.every(Boolean), true);
  assert.equal(result.noiseToneFrames, 0);
});

test("adaptive voicing keeps loud boundary voice over the same quiet background tone", () => {
  const frames = Array.from({ length: 360 }, (_, index) => {
    const loudVoice = index >= 140 && index < 220;
    return {
      f0: 60.1,
      conf: loudVoice ? 0.78 : 0.70,
      rms: loudVoice ? 0.024 : 0.005,
      thresholdHit: false,
      boundaryMinimum: true
    };
  });

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.ok(result.mask.slice(0, 140).filter(Boolean).length <= 12);
  assert.equal(result.mask.slice(140, 220).every(Boolean), true);
  assert.ok(result.mask.slice(220).filter(Boolean).length <= 12);
});

test("adaptive voicing preserves a clear quiet boundary note beside louder speech", () => {
  const loudSpeech = Array.from({ length: 350 }, (_, index) => ({
    f0: 105 + (index % 43) * 0.8,
    conf: 0.92,
    rms: 0.020,
    thresholdHit: true,
    boundaryMinimum: false
  }));
  const quietBoundaryNote = Array.from({ length: 250 }, () => ({
    f0: 60.1,
    conf: 0.94,
    rms: 0.005,
    thresholdHit: true,
    boundaryMinimum: true
  }));

  const result = adaptiveVoicingMask(loudSpeech.concat(quietBoundaryNote), {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(result.mask.slice(350).every(Boolean), true);
});

test("adaptive voicing preserves repeated quiet phrase endings near strong speech", () => {
  const frames = [];
  for (let region = 0; region < 8; region++) {
    for (let index = 0; index < 90; index++) {
      frames.push({
        f0: 105 + (index % 37) * 0.7,
        conf: 0.91,
        rms: 0.020,
        thresholdHit: true,
        boundaryMinimum: false
      });
    }
    for (let index = 0; index < 10; index++) {
      frames.push({
        f0: 120,
        conf: 0.72,
        rms: 0.005,
        thresholdHit: false,
        boundaryMinimum: false
      });
    }
  }

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  for (let region = 0; region < 8; region++) {
    assert.equal(result.mask.slice(region * 100 + 90, region * 100 + 100).every(Boolean), true);
  }
});

test("pitch evidence survives compact history serialization", () => {
  const frames = [
    { thresholdHit: false, boundaryMinimum: true },
    { thresholdHit: true, boundaryMinimum: false },
    { thresholdHit: true, boundaryMinimum: true }
  ];

  const encoded = encodePitchEvidence(frames);

  assert.deepEqual(Array.from(encoded), [2, 1, 3]);
  assert.deepEqual(decodePitchEvidence(encoded, 0), {
    thresholdHit: false,
    boundaryMinimum: true
  });
  assert.deepEqual(decodePitchEvidence(encoded, 1), {
    thresholdHit: true,
    boundaryMinimum: false
  });
  assert.deepEqual(decodePitchEvidence(encoded, 2), {
    thresholdHit: true,
    boundaryMinimum: true
  });
});

test("legacy history without pitch evidence remains backward compatible", () => {
  assert.deepEqual(decodePitchEvidence(undefined, 0), {
    thresholdHit: undefined,
    boundaryMinimum: undefined
  });
});

test("disabling adaptive filtering keeps the fixed legacy loudness gate", () => {
  const frames = [
    {
      f0: 60.1,
      conf: 0.78,
      rms: 0.005,
      thresholdHit: false,
      boundaryMinimum: true
    },
    {
      f0: 120,
      conf: 0.95,
      rms: 0.0039,
      thresholdHit: true,
      boundaryMinimum: false
    }
  ];

  const result = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: false
  });

  assert.deepEqual(result.mask, [true, false]);
  assert.equal(result.noiseToneFrames, 0);
  assert.equal(result.silenceFloor, 0.004);
});

test("adaptive voicing is stable across microphone gain changes", () => {
  const frames = Array.from({ length: 400 }, (_, index) => {
    const speaking = index >= 100 && index < 300;
    return speaking
      ? { f0: 108 + (index % 29), conf: 0.90, rms: 0.024 }
      : { f0: 185, conf: 0.64, rms: 0.005 };
  });
  const quieterFrames = frames.map(frame => ({ ...frame, rms: frame.rms * 0.1 }));

  const normal = adaptiveVoicingMask(frames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });
  const quiet = adaptiveVoicingMask(quieterFrames, {
    confidenceThreshold: 0.55,
    adaptive: true
  });

  assert.equal(normal.mask.slice(0, 100).some(Boolean), false);
  assert.equal(normal.mask.slice(100, 300).every(Boolean), true);
  assert.equal(normal.mask.slice(300).some(Boolean), false);
  assert.deepEqual(quiet.mask, normal.mask);
});

test("histogram median interpolates the two middle ranks for even samples", () => {
  const bins = new Int32Array(1280);
  bins[600] = 10;
  bins[1200] = 10;

  assert.equal(medianFromHistogram(bins, 20, 10), 90);
});

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
