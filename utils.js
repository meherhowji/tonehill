import frequencyToNote from './frequencyToNote';

const findNearestNote = frequency => {
  let nearestNote = null;
  let minDifference = Infinity;
  let nearestFrequency = null;
  const maxAccuracyCents = 50; // 50 cents corresponds to 0 percent accuracy

  for (const [freq, note] of Object.entries(frequencyToNote)) {
    const difference = Math.abs(freq - frequency);
    if (difference < minDifference) {
      minDifference = difference;
      nearestNote = note;
      nearestFrequency = freq;
    }
  }

  const cents = (1200 * Math.log2(frequency / nearestFrequency)).toFixed(0);
  const accuracyPercentage = (
    (1 - Math.abs(cents) / maxAccuracyCents) *
    100
  ).toFixed(2);

  return {nearestNote, accuracyPercentage, cents};
};

export {findNearestNote};
