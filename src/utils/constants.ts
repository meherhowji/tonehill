const DEFAULT_ACCIDENTAL: string = '#';
const SHARP: string = '#';
const FLAT: string = 'b';

// const DEFAULT_CHART_DATA: {date: number; value: number}[] = [{date: 0, value: 0}];
// const DEFAULT_CHART_DATA: {date: number; value: number}[] = Array.from({length: 10}, () => ({date: 0, value: 0}));
const DEFAULT_CHART_DATA: {date: number; value: number}[] = Array.from({length: 10}, () => ({date: 0, value: 0}));

const FREQUENCY_PRECISION = 2; // decimal points, such that the function can be memoised for meta calculation
const DEFAULT_META: {note: string | null; accuracy: number | null; cents: number | null} = {
  note: null,
  accuracy: null,
  cents: null,
};
const DEFAULT_DATA: {tone: string; frequency: number} = {tone: '', frequency: 0};

const SCALES: Record<string, string[]> = {
  MAJOR: ['W', 'W', 'H', 'W', 'W', 'W', 'H'],
  MINOR: ['W', 'H', 'W', 'W', 'H', 'W', 'W'],
};
const SOLFEGE: {WESTERN: string[]; INDIAN: string[]} = {
  WESTERN: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'],
  INDIAN: ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'],
};

const NOTE_SCORE_PALETTE_FULL: string[] = [
  '#B5FF00',
  '#D0FF00',
  '#E6FF00',
  '#FBFE00',
  '#FFEC00',
  '#FFD900',
  '#FFC500',
  '#FFB217',
  '#FF9F22',
  '#FF8B29',
  '#FF752F',
  '#FF7230',
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
  FREQUENCY_PRECISION,
  NOTE_SCORE_PALETTE_FULL,
};
