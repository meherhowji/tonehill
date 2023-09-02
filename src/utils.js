import {
  frequencyToNote,
  notes,
  noteToFrequency,
  noteToId,
} from './frequencyToNote';

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
  const accuracy =
    ((1 - Math.abs(cents) / maxAccuracyCents) * 100).toFixed(0) + '%';

  return {note: nearestNote, accuracy, cents};
};

function getNotesInKey(musicalKey, scaleIntervals) {
  // Example usage
  // const musicalKey = 'D'; // Change this to the desired key
  // const majorScaleIntervals = [2, 2, 1, 2, 2, 2, 1]; // Major scale intervals
  // const notesInKey = getNotesInKey(musicalKey, majorScaleIntervals);
  // console.log(notesInKey);
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

function getFrequenciesBetween(noteStart, noteEnd) {
  const frequencies = [];

  // Find the indices of the start and end notes
  const startIndex = Object.keys(noteToFrequency).indexOf(noteStart);
  const endIndex = Object.keys(noteToFrequency).indexOf(noteEnd);

  if (startIndex === -1 || endIndex === -1) {
    throw new Error('Invalid note names provided.');
  }

  // Extract frequencies between the start and end indices
  for (let i = startIndex; i <= endIndex; i++) {
    const note = Object.keys(noteToFrequency)[i];
    frequencies.push(noteToFrequency[note]);
  }

  return frequencies;
}

function getNotes(startNote, endNote) {
  const startNoteIndex = notes.indexOf(startNote.slice(0, -1));
  const endNoteIndex = notes.indexOf(endNote.slice(0, -1));
  const startOctave = parseInt(startNote.slice(-1), 10);
  const endOctave = parseInt(endNote.slice(-1), 10);
  const _notes = [];

  for (let octave = startOctave; octave <= endOctave; octave++) {
    const startIndex = octave === startOctave ? startNoteIndex : 0;
    const endIndex = octave === endOctave ? endNoteIndex : notes.length - 1;

    for (let i = startIndex; i <= endIndex; i++) {
      const note = `${notes[i]}${octave}`;
      _notes.push(note);
    }
  }

  return _notes;
}

function getNoteId(startNote, endNote) {
  const startValue = noteToId[startNote];
  const endValue = noteToId[endNote];

  if (startValue === undefined || endValue === undefined) {
    throw new Error('Invalid note names');
  }

  if (startValue > endValue) {
    throw new Error('Start note should be lower than or equal to end note');
  }

  const values = [];
  for (let value = startValue; value <= endValue; value++) {
    values.push(value);
  }

  return values;
}

function mapNoteToValue({note, cents}, fixedNote) {
  // Split the input note into its note name and octave
  const [, noteName, octave] = note.match(/([A-Ga-g#b]+)([0-9]+)/) || [];

  if (!noteName || !octave) {
    throw new Error('Invalid note format');
  }

  // Calculate the value of the fixedNote
  const [, fixedNoteName, fixedOctave] =
    fixedNote.match(/([A-Ga-g#b]+)([0-9]+)/) || [];
  if (!fixedNoteName || !fixedOctave) {
    throw new Error('Invalid fixedNote format');
  }

  const fixedNoteValue =
    notes.indexOf(fixedNoteName) + parseInt(fixedOctave, 10) * notes.length;

  // Calculate the value of the input note
  const noteValue =
    notes.indexOf(noteName) + parseInt(octave, 10) * notes.length;

  // Calculate the relative value from the fixedNote, considering cents
  const relativeValue = noteValue - fixedNoteValue + cents / 100;

  return relativeValue;
}

export {
  findNearestNote,
  getNotesInKey,
  getFrequenciesBetween,
  getNotes,
  getNoteId,
  mapNoteToValue,
};
