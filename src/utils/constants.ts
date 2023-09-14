const DEFAULT_ACCIDENTAL: string = '#';
const SHARP: string = '#';
const FLAT: string = 'b';

const DEFAULT_CHART_DATA: {time: number; hz: number}[] = [{time: 0, hz: 0}];
const DEFAULT_META: {note: string | null; accuracy: number | null; cents: number | null} = {
  note: null,
  accuracy: null,
  cents: null,
};
const DEFAULT_DATA: {tone: string; frequency: number} = {tone: '-', frequency: 0};

const SCALES: Record<string, string[]> = {
  MAJOR: ['W', 'W', 'H', 'W', 'W', 'W', 'H'],
  MINOR: ['W', 'H', 'W', 'W', 'H', 'W', 'W'],
};

const SOLFEGE: {western: string[]; indian: string[]} = {
  western: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'],
  indian: ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'],
};

const NOTE_SCORE_PALETTE: string[] = [
  'rgb(151,29,43)',
  'rgb(198,64,50)',
  'rgb(227,117,79)',
  'rgb(241,177,110)',
  'rgb(249,225,150)',
  'rgb(255,255,198)',
  'rgb(221,238,151)',
  'rgb(177,216,120)',
  'rgb(123,187,109)',
  'rgb(71,150,87)',
  'rgb(43,102,60)',
];

export {
  SOLFEGE,
  SHARP,
  FLAT,
  DEFAULT_META,
  DEFAULT_DATA,
  DEFAULT_CHART_DATA,
  DEFAULT_ACCIDENTAL,
  SCALES,
  NOTE_SCORE_PALETTE,
};
