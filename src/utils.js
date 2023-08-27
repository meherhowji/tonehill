import {frequencyToNote, notes} from './frequencyToNote';

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

function getNotesInKey(musicalKey, scaleIntervals) {
  const selectedKey = musicalKey.toUpperCase();

  if (notes.includes(selectedKey)) {
    const keyIndex = notes.indexOf(selectedKey);

    const notesInKey = [selectedKey];
    let currentNoteIndex = keyIndex;

    for (const interval of scaleIntervals) {
      currentNoteIndex += interval;
      if (currentNoteIndex >= notes.length) {
        currentNoteIndex -= notes.length;
      }
      notesInKey.push(notes[currentNoteIndex]);
    }

    return notesInKey;
  }

  // If the provided key is not valid, return the default diatonic notes
  return notes;
}

// Example usage
// const musicalKey = 'D'; // Change this to the desired key
// const majorScaleIntervals = [2, 2, 1, 2, 2, 2, 1]; // Major scale intervals
// const notesInKey = getNotesInKey(musicalKey, majorScaleIntervals);
// console.log(notesInKey);

export {findNearestNote};
