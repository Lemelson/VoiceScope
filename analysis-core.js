(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.VoiceScopeAnalysis = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  function percentile(sorted, p) {
    if (!sorted.length) return NaN;
    if (sorted.length === 1) return sorted[0];
    const index = (p / 100) * (sorted.length - 1);
    const lower = Math.floor(index);
    const upper = Math.ceil(index);
    const fraction = index - lower;
    return sorted[lower] + (sorted[upper] - sorted[lower]) * fraction;
  }

  function median(values) {
    if (!values.length) return NaN;
    return percentile([...values].sort((a, b) => a - b), 50);
  }

  function encodePitchEvidence(frames) {
    return Uint8Array.from(frames, frame =>
      (frame.thresholdHit === true ? 1 : 0) |
      (frame.boundaryMinimum === true ? 2 : 0)
    );
  }

  function decodePitchEvidence(encoded, index) {
    if (!encoded || index < 0 || index >= encoded.length) {
      return { thresholdHit: undefined, boundaryMinimum: undefined };
    }
    const flags = encoded[index];
    return {
      thresholdHit: Boolean(flags & 1),
      boundaryMinimum: Boolean(flags & 2)
    };
  }

  function medianFromHistogram(counts, total, scale = 1) {
    if (!counts?.length || total <= 0) return NaN;
    const lowerRank = Math.floor((total - 1) / 2);
    const upperRank = Math.ceil((total - 1) / 2);
    let cumulative = 0;
    let lowerValue = null;
    let upperValue = null;
    for (let index = 0; index < counts.length; index++) {
      cumulative += counts[index];
      if (lowerValue == null && cumulative > lowerRank) lowerValue = index / scale;
      if (cumulative > upperRank) {
        upperValue = index / scale;
        break;
      }
    }
    if (lowerValue == null || upperValue == null) return NaN;
    return (lowerValue + upperValue) / 2;
  }

  /**
   * Classify pitch frames while rejecting a quiet, persistent background tone.
   *
   * A stationary frequency alone is not enough to call something noise: a sung
   * note can be stationary too. A tone is removed only when it is spread across
   * a substantial part of the recording, lives in the low-energy population,
   * and is clearly quieter or less reliable than the stronger signal. Loud
   * frames at the same frequency are retained.
   */
  function adaptiveVoicingMask(frames, options = {}) {
    const confidenceThreshold = options.confidenceThreshold ?? 0.55;
    const minFrequency = options.minFrequency ?? 55;
    const maxFrequency = options.maxFrequency ?? 600;
    const adaptive = options.adaptive !== false;
    const observedRms = frames
      .map(frame => frame?.rms)
      .filter(value => Number.isFinite(value))
      .sort((a, b) => a - b);
    const adaptiveFloor = observedRms.length
      ? Math.max(1e-5, Math.min(0.003, percentile(observedRms, 5) * 0.8))
      : 0.003;
    const absoluteFloor = options.absoluteFloor ?? (adaptive ? adaptiveFloor : 0.004);
    const reliableConfidence = options.reliableConfidence ??
      Math.min(0.85, confidenceThreshold + 0.27);
    const baseMask = frames.map(frame =>
      Number.isFinite(frame?.f0) &&
      Number.isFinite(frame?.conf) &&
      Number.isFinite(frame?.rms) &&
      frame.f0 >= minFrequency &&
      frame.f0 <= maxFrequency &&
      frame.conf >= confidenceThreshold &&
      frame.rms >= absoluteFloor
    );
    const noiseMask = new Array(frames.length).fill(false);

    function result(maskDetails = {}) {
      return {
        mask: baseMask.map((voiced, index) => voiced && !noiseMask[index]),
        noiseMask,
        noiseToneFrames: noiseMask.filter(Boolean).length,
        silenceFloor: absoluteFloor,
        ...maskDetails
      };
    }

    const baseIndices = [];
    for (let index = 0; index < frames.length; index++) {
      if (baseMask[index]) baseIndices.push(index);
    }

    // YIN's fallback always returns a frequency, even for broadband household
    // noise. In a long recording with no real voice, scattered fallback points
    // and one short pitched mechanical sound can otherwise become a plausible
    // contour. Reject that recording only when pitch-evidence flags are present
    // for every accepted frame and there is neither enough clear voice evidence
    // nor a coherent sustained note. Legacy history without evidence skips this
    // guard, and short recordings keep the existing low-latency behaviour.
    const minimumEvidenceRecordingFrames =
      options.minimumEvidenceRecordingFrames ?? 375;
    const minimumClearSpeechFrames =
      options.minimumClearSpeechFrames ?? 75;
    const minimumStableClearFrames =
      options.minimumStableClearFrames ?? 8;
    const minimumStableFallbackFrames =
      options.minimumStableFallbackFrames ?? 50;
    const stablePitchSpreadSemitones =
      options.stablePitchSpreadSemitones ?? 1.5;
    const hasCompletePitchEvidence = baseIndices.length > 0 &&
      baseIndices.every(index => typeof frames[index].thresholdHit === "boolean");

    function hasStableRun(predicate, minimumFrames) {
      let start = 0;
      while (start < frames.length) {
        if (!baseMask[start] || !predicate(frames[start])) {
          start++;
          continue;
        }
        let end = start + 1;
        while (end < frames.length && baseMask[end] && predicate(frames[end])) {
          end++;
        }
        if (end - start >= minimumFrames) {
          const midi = [];
          for (let index = start; index < end; index++) {
            midi.push(69 + 12 * Math.log2(frames[index].f0 / 440));
          }
          midi.sort((a, b) => a - b);
          if (percentile(midi, 90) - percentile(midi, 10) <= stablePitchSpreadSemitones) {
            return true;
          }
        }
        start = end;
      }
      return false;
    }

    if (adaptive &&
        frames.length >= minimumEvidenceRecordingFrames &&
        hasCompletePitchEvidence) {
      const clearSpeechFrames = baseIndices.filter(index =>
        frames[index].thresholdHit === true &&
        frames[index].conf >= reliableConfidence
      ).length;
      const hasStableClearNote = hasStableRun(
        frame => frame.thresholdHit === true,
        minimumStableClearFrames
      );
      const hasStableFallbackNote = hasStableRun(
        frame => frame.thresholdHit === false,
        minimumStableFallbackFrames
      );
      if (clearSpeechFrames < minimumClearSpeechFrames &&
          !hasStableClearNote &&
          !hasStableFallbackNote) {
        for (const index of baseIndices) noiseMask[index] = true;
        return result({ noiseOnlyRejected: true });
      }
    }

    if (!adaptive || frames.length < 80 || baseIndices.length < 24 || !observedRms.length) {
      return result();
    }

    const baseRms = baseIndices.map(index => frames[index].rms).sort((a, b) => a - b);
    const noiseReference = percentile(observedRms, 10);
    const strongSignalReference = percentile(baseRms, 90);
    const quietCeiling = Math.max(
      absoluteFloor,
      Math.min(noiseReference * 2.2, strongSignalReference * 0.55)
    );
    if (!Number.isFinite(quietCeiling) || strongSignalReference <= quietCeiling * 1.35) {
      return result();
    }
    const strongVoiceMask = frames.map((frame, index) =>
      baseMask[index] &&
      frame.rms >= strongSignalReference * 0.65 &&
      (frame.thresholdHit === true || frame.conf >= reliableConfidence)
    );
    function isNearStrongVoice(index, frequency) {
      const radius = options.strongVoiceContextFrames ?? 12;
      const pitchRadius = options.strongVoiceContextSemitones ?? 3;
      const midi = 69 + 12 * Math.log2(frequency / 440);
      const start = Math.max(0, index - radius);
      const end = Math.min(frames.length - 1, index + radius);
      for (let cursor = start; cursor <= end; cursor++) {
        if (!strongVoiceMask[cursor]) continue;
        const nearbyMidi = 69 + 12 * Math.log2(frames[cursor].f0 / 440);
        if (Math.abs(nearbyMidi - midi) <= pitchRadius) return true;
      }
      return false;
    }

    // Three quarters of a semitone is wide enough for detector jitter but much
    // narrower than normal speech movement. Binning in MIDI space makes the
    // tolerance relative, so it works at any pitch instead of targeting 60 Hz.
    const binWidth = options.binWidthSemitones ?? 0.75;
    const frequencyBinKey = frame =>
      Math.round((69 + 12 * Math.log2(frame.f0 / 440)) / binWidth);
    const quietIndices = baseIndices.filter(index => frames[index].rms <= quietCeiling);
    const bins = new Map();
    for (const index of quietIndices) {
      const frame = frames[index];
      const key = frequencyBinKey(frame);
      let bin = bins.get(key);
      if (!bin) {
        bin = { indices: [], rms: [], confidence: [], fallbackCount: 0 };
        bins.set(key, bin);
      }
      bin.indices.push(index);
      bin.rms.push(frame.rms);
      bin.confidence.push(frame.conf);
      if (frame.thresholdHit === false) {
        bin.fallbackCount++;
      }
    }

    // About half a second at the application's 8 ms hop. Requiring several
    // separated time regions prevents repeated short phrase endings from
    // looking like a continuous appliance tone.
    const minimumFrames = options.minimumToneFrames ?? Math.max(
      63,
      Math.ceil(frames.length * 0.015)
    );
    for (const [key, bin] of bins.entries()) {
      if (bin.indices.length < minimumFrames) continue;
      const first = bin.indices[0];
      const last = bin.indices[bin.indices.length - 1];
      const temporalCoverage = (last - first + 1) / frames.length;
      const quietOccupancy = bin.indices.length / Math.max(1, quietIndices.length);
      const occupiedRegions = new Set(bin.indices.map(index =>
        Math.min(7, Math.floor(index / Math.max(1, frames.length) * 8))
      )).size;
      if (temporalCoverage < 0.35 && bin.indices.length < frames.length * 0.10) continue;
      if (occupiedRegions < 4) continue;
      if (quietOccupancy < 0.12) continue;

      const binRms = median(bin.rms);
      const binConfidence = median(bin.confidence);
      const energyContrast = strongSignalReference / Math.max(binRms, 1e-9);
      const fallbackShare = bin.fallbackCount / bin.indices.length;
      const weakPitchEvidence = binConfidence < reliableConfidence || fallbackShare >= 0.25;
      if (energyContrast < 1.8 || !weakPitchEvidence) continue;

      for (const index of bin.indices) {
        const frame = frames[index];
        const clearPitchEvidence =
          frame.thresholdHit === true && frame.conf >= reliableConfidence;
        if (!clearPitchEvidence && !isNearStrongVoice(index, frame.f0)) {
          noiseMask[index] = true;
        }
      }
      for (const index of baseIndices) {
        const frame = frames[index];
        if (frequencyBinKey(frame) === key &&
            frame.thresholdHit === false &&
            frame.boundaryMinimum === true &&
            frame.rms <= binRms * 1.8 &&
            !isNearStrongVoice(index, frame.f0)) {
          noiseMask[index] = true;
        }
      }

      // Speech can raise the RMS of the proven background tone for a few
      // frames, making it look louder. Remove only very short bursts near the
      // learned tone, including an isolated threshold hit inside the burst.
      // Sustained same-pitch voice and normal phrase endings remain protected
      // by the strict run-length limit.
      const toneCentreMidi = key * binWidth;
      const burstRadius = options.backgroundBurstRadiusSemitones ?? 3;
      const maxBurstFrames = options.maxBackgroundBurstFrames ?? 12;
      function isBackgroundBurstCandidate(index) {
        if (!baseMask[index] || noiseMask[index]) return false;
        const frame = frames[index];
        if (frame.rms <= quietCeiling) return false;
        const midi = 69 + 12 * Math.log2(frame.f0 / 440);
        return Math.abs(midi - toneCentreMidi) <= burstRadius;
      }
      let burstStart = 0;
      while (burstStart < frames.length) {
        if (!isBackgroundBurstCandidate(burstStart)) {
          burstStart++;
          continue;
        }
        let burstEnd = burstStart + 1;
        while (burstEnd < frames.length && isBackgroundBurstCandidate(burstEnd)) {
          burstEnd++;
        }
        const burstIndices = [];
        for (let index = burstStart; index < burstEnd; index++) {
          burstIndices.push(index);
        }
        const weakEvidence = index => {
          const frame = frames[index];
          return frame.thresholdHit !== true || frame.conf < reliableConfidence;
        };
        const weakCount = burstIndices.filter(weakEvidence).length;
        const clearIndices = burstIndices.filter(index => !weakEvidence(index));
        const isolatedClearHit = clearIndices.length === 0 ||
          (clearIndices.length === 1 &&
            clearIndices[0] > burstStart &&
            clearIndices[0] < burstEnd - 1 &&
            weakEvidence(clearIndices[0] - 1) &&
            weakEvidence(clearIndices[0] + 1));
        if (burstEnd - burstStart <= maxBurstFrames &&
            weakCount / burstIndices.length >= 0.75 &&
            isolatedClearHit) {
          for (let index = burstStart; index < burstEnd; index++) {
            noiseMask[index] = true;
          }
        }
        burstStart = burstEnd;
      }
    }

    return result({ quietCeiling });
  }

  /**
   * Correct only short, locally bracketed octave errors.
   *
   * The reference is computed from the original neighbours, never from already
   * corrected values. This prevents a bad frame from moving the reference and
   * making the following valid frames jump by an octave.
   */
  function correctOctaveOutliers(values, options = {}) {
    const radius = options.radius ?? 8;
    const minSide = options.minSide ?? 2;
    const maxSideDifference = options.maxSideDifference ?? 3;
    const minImprovement = options.minImprovement ?? 5;
    const maxTargetDistance = options.maxTargetDistance ?? 3;
    const low = options.low ?? -Infinity;
    const high = options.high ?? Infinity;
    const output = values.slice();

    for (let index = 0; index < values.length; index++) {
      const value = values[index];
      if (value == null) continue;

      const left = [];
      const right = [];
      for (let offset = 1; offset <= radius; offset++) {
        const before = values[index - offset];
        const after = values[index + offset];
        if (before != null) left.push(before);
        if (after != null) right.push(after);
      }
      if (left.length < minSide || right.length < minSide) continue;

      const leftMedian = median(left);
      const rightMedian = median(right);
      if (Math.abs(leftMedian - rightMedian) > maxSideDifference) continue;

      const reference = median(left.concat(right));
      let best = value;
      let bestDistance = Math.abs(value - reference);
      for (const shift of [-24, -12, 12, 24]) {
        const candidate = value + shift;
        if (candidate < low || candidate > high) continue;
        const distance = Math.abs(candidate - reference);
        if (distance < bestDistance) {
          best = candidate;
          bestDistance = distance;
        }
      }

      const improvement = Math.abs(value - reference) - bestDistance;
      if (best !== value && improvement >= minImprovement && bestDistance <= maxTargetDistance) {
        output[index] = best;
      }
    }
    return output;
  }

  /**
   * Hybrid MAD detector for brief anomalies.
   *
   * The primary test uses stable context on both sides. A conservative global
   * fallback catches very short extreme runs next to pauses. When detector
   * reliability is available, clear pitch changes are protected and only
   * low-confidence anomalies are removed. Long runs are always retained.
   */
  function localMadOutlierMask(values, options = {}) {
    const radius = options.radius ?? 31;
    const minSide = options.minSide ?? 3;
    const maxSideDifference = options.maxSideDifference ?? 3.5;
    const sigma = options.sigma ?? 3;
    const minDeviation = options.minDeviation ?? 3;
    const maxRun = options.maxRun ?? 6;
    const globalSigma = options.globalSigma ?? 4;
    const globalMinDeviation = options.globalMinDeviation ?? 6;
    const globalMaxRun = options.globalMaxRun ?? maxRun;
    const reliability = options.reliability;
    const thresholdHits = options.thresholdHits;
    const reliabilityFloor = options.reliabilityFloor ?? 0.75;
    const reliabilityDrop = options.reliabilityDrop ?? 0.12;
    const candidates = new Array(values.length).fill(false);

    const reliableValues = reliability
      ? reliability.filter(value => Number.isFinite(value))
      : [];
    const typicalReliability = reliableValues.length ? median(reliableValues) : null;
    function isUnreliable(index) {
      if (thresholdHits?.[index] === true) return false;
      if (!reliability) return true;
      const value = reliability[index];
      if (!Number.isFinite(value)) return true;
      return value < reliabilityFloor &&
        (typicalReliability == null || value < typicalReliability - reliabilityDrop);
    }

    for (let index = 0; index < values.length; index++) {
      const value = values[index];
      if (value == null) continue;

      const left = [];
      const right = [];
      for (let offset = 1; offset <= radius; offset++) {
        const before = values[index - offset];
        const after = values[index + offset];
        if (before != null) left.push(before);
        if (after != null) right.push(after);
      }
      if (left.length < minSide || right.length < minSide) continue;

      const leftMedian = median(left);
      const rightMedian = median(right);
      if (Math.abs(leftMedian - rightMedian) > maxSideDifference) continue;

      const context = left.concat(right);
      const centre = median(context);
      const deviations = context.map(item => Math.abs(item - centre)).sort((a, b) => a - b);
      const mad = percentile(deviations, 50);
      const threshold = Math.max(minDeviation, 1.4826 * sigma * mad);
      candidates[index] = Math.abs(value - centre) > threshold && isUnreliable(index);
    }

    const result = new Array(values.length).fill(false);

    function addShortRuns(mask, limit) {
      let index = 0;
      while (index < mask.length) {
        if (!mask[index]) {
          index++;
          continue;
        }
        let end = index + 1;
        while (end < mask.length && mask[end]) end++;
        if (end - index <= limit) {
          for (let cursor = index; cursor < end; cursor++) result[cursor] = true;
        }
        index = end;
      }
    }

    addShortRuns(candidates, maxRun);

    // Fallback for isolated octave/subharmonic errors near pauses, where one
    // side may not contain enough voiced neighbours for the rolling test.
    // Only short extreme runs are removed; a sustained new register survives.
    const voiced = values.filter(value => value != null);
    if (voiced.length >= 12) {
      const centre = median(voiced);
      const deviations = voiced.map(value => Math.abs(value - centre)).sort((a, b) => a - b);
      const mad = percentile(deviations, 50);
      const threshold = Math.max(globalMinDeviation, 1.4826 * globalSigma * mad);
      const globalCandidates = values.map(value =>
        value != null && Math.abs(value - centre) > threshold
      );
      for (let index = 0; index < globalCandidates.length; index++) {
        globalCandidates[index] = globalCandidates[index] && isUnreliable(index);
      }
      addShortRuns(globalCandidates, globalMaxRun);
    }

    return result;
  }

  return {
    adaptiveVoicingMask,
    correctOctaveOutliers,
    decodePitchEvidence,
    encodePitchEvidence,
    localMadOutlierMask,
    median,
    medianFromHistogram,
    percentile
  };
});
