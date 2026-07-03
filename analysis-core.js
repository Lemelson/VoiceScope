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
   * fallback catches very short extreme runs next to pauses. Both tests retain
   * long candidate runs so a sustained pitch change is not treated as noise.
   */
  function localMadOutlierMask(values, options = {}) {
    const radius = options.radius ?? 31;
    const minSide = options.minSide ?? 3;
    const maxSideDifference = options.maxSideDifference ?? 3.5;
    const sigma = options.sigma ?? 3;
    const minDeviation = options.minDeviation ?? 3;
    const maxRun = options.maxRun ?? 24;
    const globalSigma = options.globalSigma ?? 4;
    const globalMinDeviation = options.globalMinDeviation ?? 8;
    const globalMaxRun = options.globalMaxRun ?? maxRun;
    const candidates = new Array(values.length).fill(false);

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
      candidates[index] = Math.abs(value - centre) > threshold;
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
      addShortRuns(globalCandidates, globalMaxRun);
    }

    return result;
  }

  return {
    correctOctaveOutliers,
    localMadOutlierMask,
    median,
    percentile
  };
});
