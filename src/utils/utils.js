import {frequencyToNote, notes} from './frequencyToNote';
import {CENT_THRESHOLD} from './constants';

// used in app.tsx
const findNearestNote = frequency => {
  // Initialize variables to store the nearest note, frequency, and minimum difference
  let nearestNote = null;
  let minDifference = Infinity;
  let nearestFrequency = null;
  // Define the maximum deviation in cents that corresponds to 0 percent accuracy
  const centMax = 50;

  // Iterate through the frequencyToNote object using entries
  for (const [freq, note] of Object.entries(frequencyToNote)) {
    // Calculate the absolute difference between the current frequency and the target frequency
    const difference = Math.abs(freq - frequency);

    // Check if the current difference is smaller than the minimum difference
    if (difference < minDifference) {
      // Update the nearestNote, nearestFrequency, and minDifference variables
      minDifference = difference;
      nearestNote = note;
      nearestFrequency = freq;
    }
  }

  // Check if the input frequency is positive
  if (frequency > 0) {
    // Calculate the deviation in cents from the nearest note
    const cents = parseInt((1200 * Math.log2(frequency / nearestFrequency)).toFixed(0), 10);

    // Calculate the accuracy as a percentage based on the deviation in cents
    const accuracy = parseInt(((1 - Math.abs(cents) / centMax) * 100).toFixed(0), 10);

    // Return an object with the nearest note, accuracy, and cents
    return {note: nearestNote, accuracy, cents};
  } else {
    // Return an object with null values if the input frequency is not positive
    return {note: null, accuracy: null, cents: null};
  }
};

// used in chart.js
function getNotes(startNote, endNote) {
  // Get the index of the start and end notes' base names (without octave)
  const startNoteIndex = notes.indexOf(startNote.slice(0, -1));
  const endNoteIndex = notes.indexOf(endNote.slice(0, -1));

  // Extract the octaves from the start and end notes
  const startOctave = parseInt(startNote.slice(-1), 10);
  const endOctave = parseInt(endNote.slice(-1), 10);

  // Create an array to store the generated notes
  const _notes = [];

  // Iterate through octaves from start to end
  for (let octave = startOctave; octave <= endOctave; octave++) {
    // Calculate the starting and ending index for the current octave
    const startIndex = octave === startOctave ? startNoteIndex : 0;
    const endIndex = octave === endOctave ? endNoteIndex : notes.length - 1;

    // Generate notes for the current octave and add them to the _notes array
    for (let i = startIndex; i <= endIndex; i++) {
      const note = `${notes[i]}${octave}`;
      _notes.push(note);
    }
  }

  // Return the array of generated notes
  return _notes;
}

// used in app.tsx
function mapNoteToValue({note, cents}, fixedNote, resetToZero) {
  if (resetToZero) {
    let adjustedCents = cents >= CENT_THRESHOLD * -1 && cents <= CENT_THRESHOLD ? 0 : cents;
    return adjustedCents;
  }
  // Split the input note into its note name and octave
  const [, noteName, octave] = note.match(/([A-Ga-g#b]+)([0-9]+)/) || [];
  // Calculate the value of the fixedNote
  const [, fixedNoteName, fixedOctave] = fixedNote.match(/([A-Ga-g#b]+)([0-9]+)/) || [];

  if (!noteName || !octave) {
    throw new Error('Invalid note format');
  }

  if (!fixedNoteName || !fixedOctave) {
    throw new Error('Invalid fixedNote format');
  }

  const fixedNoteValue = notes.indexOf(fixedNoteName) + parseInt(fixedOctave, 10) * notes.length;

  // Calculate the value of the input note
  const noteValue = notes.indexOf(noteName) + parseInt(octave, 10) * notes.length;

  // Calculate the relative value from the fixedNote, considering cents
  const relativeValue = noteValue > 0 ? noteValue - fixedNoteValue + cents / 100 : 0;

  return relativeValue;
}

function calculateAverage(arr) {
  if (arr.length === 0) {
    return 0; // Handle the case when there are no elements in the array.
  }
  const sum = arr.reduce((acc, num) => acc + num, 0);
  return Math.round(sum / arr.length);
}

export {findNearestNote, getNotes, mapNoteToValue, calculateAverage};
