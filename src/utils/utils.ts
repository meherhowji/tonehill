import { frequencyToNote, notes } from './mappings';
import both from 'ramda/es/both';
import complement from 'ramda/es/complement';
import equals from 'ramda/es/equals';
import is from 'ramda/es/is';
import memoizeWith from 'ramda/es/memoizeWith';
import identity from 'ramda/es/identity';

type NoteMeta = {
  note: string | null;
  accuracy: number | null;
  cents: number | null;
};

// TODO: why mix type, maybe return null or string or strigified number
type NoteMap = Record<string, string | number>;

let getNoteMeta = (frequency: number): NoteMeta => {
  let nearestNote: string | null = null;
  let minDifference: number = Infinity;
  let nearestFrequency: number | null = null;
  const centMax: number = 50;

  for (const [freq, note] of Object.entries(frequencyToNote)) {
    const difference = Math.abs(parseFloat(freq) - frequency);

    if (difference < minDifference) {
      minDifference = difference;
      nearestNote = note;
      nearestFrequency = parseFloat(freq);
    }
  }

  if (frequency > 0 && nearestFrequency) {
    const cents = parseInt((1200 * Math.log2(frequency / nearestFrequency)).toFixed(0), 10);
    const accuracy = parseInt(((1 - Math.abs(cents) / centMax) * 100).toFixed(0), 10);

    return { note: nearestNote, accuracy, cents };
  } else {
    return { note: null, accuracy: null, cents: null };
  }
};

getNoteMeta = memoizeWith((frequency: number) => frequency.toString(), getNoteMeta);

function getNotes(startNote: string, endNote: string): string[] {
  const startNoteIndex = notes.indexOf(startNote.slice(0, -1));
  const endNoteIndex = notes.indexOf(endNote.slice(0, -1));

  const startOctave = parseInt(startNote.slice(-1), 10);
  const endOctave = parseInt(endNote.slice(-1), 10);
  const _notes: string[] = [];

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

function mapNoteToValue({ note, cents }: NoteMeta, fixedNote: string, resetToZero: boolean, inTuneRange: number): number {
  if (resetToZero) {
    let adjustedCents = cents && cents >= inTuneRange * -1 && cents <= inTuneRange ? 0 : cents;
    return adjustedCents || 0;
  }

  const [, noteName, octave] = note && note.match(/([A-Ga-g#b]+)([0-9]+)/) || [];
  const [, fixedNoteName, fixedOctave] = fixedNote.match(/([A-Ga-g#b]+)([0-9]+)/) || [];

  if (!noteName || !octave) {
    throw new Error('Invalid note format');
  }

  if (!fixedNoteName || !fixedOctave) {
    throw new Error('Invalid fixedNote format');
  }

  const fixedNoteValue = notes.indexOf(fixedNoteName) + parseInt(fixedOctave, 10) * notes.length;
  const noteValue = notes.indexOf(noteName) + parseInt(octave, 10) * notes.length;
  const relativeValue = noteValue > 0 ? noteValue - fixedNoteValue + (cents || 0) / 100 : 0;
  return relativeValue;
}

const calculateGridStyle = (tick: number, isStroke: boolean): string | number => {
  let stroke: string | undefined;
  let strokeWidth: number | undefined;
  const tickAbs = Math.abs(tick);

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

  return isStroke ? stroke : strokeWidth;
};

let parseNote = (note: string): NoteMap => {
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

function generateScale(key: string, scaleFormula: string[]): string[] | 'Invalid key' {
  const noteNames: string[] = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
  const keyIndex = noteNames.indexOf(key);

  if (keyIndex === -1) {
    return 'Invalid key';
  }

  const noteList: string[] = [key];
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

function noteToSolfege(note: string, scale: string[], solfege: string[]): string | 'Note not found in the scale' {
  const noteIndex = scale.indexOf(note);

  if (noteIndex === -1) {
    return 'Note not found in the scale';
  }

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
};
