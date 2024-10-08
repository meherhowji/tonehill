import {frequencyToNote, notes} from './mappings';
import both from 'ramda/es/both';
import complement from 'ramda/es/complement';
import equals from 'ramda/es/equals';
import is from 'ramda/es/is';
import memoizeWith from 'ramda/es/memoizeWith';
import identity from 'ramda/es/identity';
// import {NOTE_SCORE_PALETTE_SINGLE} from './constants';

// used in app.tsx
let getNoteMeta = frequency => {
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

// function to map the -50 to 50 ka range to the color pallate index list of 11
// originally was supposed to be used with tone display label color change based on cent value
// now this feature is moved to mobx store
// function mapValueToIndex(value) {
//   const index = Math.floor((Math.abs(value) / 50) * (NOTE_SCORE_PALETTE_SINGLE.length - 1));
//   return NOTE_SCORE_PALETTE_SINGLE[index];
// }

// Memoized, TODO: need to benchmark
getNoteMeta = memoizeWith(identity, getNoteMeta);

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
function mapNoteToValue({note, cents}, fixedNote, resetToZero, inTuneRange) {
  if (resetToZero) {
    let adjustedCents = cents >= inTuneRange * -1 && cents <= inTuneRange ? 0 : cents;
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

const calculateGridStyle = (tick, isStroke) => {
  let stroke,
    strokeWidth,
    tickAbs = Math.abs(tick);

  switch (tickAbs) {
    case 0:
      strokeWidth = 1;
      stroke = 'rgba(169, 255, 153, 0.3)';
      break;
    case 10:
      stroke = 'rgba(169, 255, 153, 0.15)';
      strokeWidth = 1;
      break;
    case 20:
      stroke = 'rgba(238, 122, 67, 0.2)';
      strokeWidth = 0.5;
      break;
    case 30:
      stroke = 'rgba(238, 122, 67, 0.1)';
      strokeWidth = 0.5;
      break;
    case 40:
      stroke = 'rgba(238, 122, 67, 0.1)';
      strokeWidth = 0.5;
      break;
    case 50:
      stroke = 'rgba(238, 122, 67, 0.1)';
      strokeWidth = 0.5;
      break;
    default:
      stroke = 'rgba(0, 0, 0, 0)';
      strokeWidth = 0.5;
  }

  if (tickAbs <= 10) {
  }

  return isStroke ? stroke : strokeWidth;
};

let parseNote = note => {
  const noteRegex = /^([A-Ga-g])([b#]?)(\d*)$/;
  const match = note.match(noteRegex);

  if (!match) {
    throw new Error('Invalid note format');
  }

  const [, noteName, accidental, octave] = match;

  return {
    note: noteName.toUpperCase(),
    accidental: accidental === 'b' ? 'p' : accidental || '',
    octave: octave ? parseInt(octave, 10) : '',
  };
};

parseNote = memoizeWith(identity, parseNote);

function generateScale(key, scaleFormula) {
  // Define the possible note names
  const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Find the index of the key in the noteNames array
  const keyIndex = noteNames.indexOf(key);

  if (keyIndex === -1) {
    return 'Invalid key';
  }

  // Initialize the scale with the key
  const noteList = [key];

  // Generate the major scale notes
  let currentIndex = keyIndex;

  for (const step of scaleFormula) {
    if (step === 'W') {
      currentIndex = (currentIndex + 2) % 12;
    } else {
      currentIndex = (currentIndex + 1) % 12;
    }
    noteList.push(noteNames[currentIndex]);
  }

  return noteList;
}

function noteToSolfege(note, scale, solfege) {
  // Find the index of the note within the scale
  const noteIndex = scale.indexOf(note);

  if (noteIndex === -1) {
    return 'Note not found in the scale';
  }

  // Calculate the solfege index based on the note index within the scale
  const solfegeIndex = (noteIndex + 7) % 7;

  return solfege[solfegeIndex];
}

const isValidNumber = both(is(Number), complement(equals(NaN)));

export {
  getNoteMeta,
  getNotes,
  mapNoteToValue,
  calculateGridStyle,
  isValidNumber,
  parseNote,
  generateScale,
  noteToSolfege,
  // mapValueToIndex,
};
