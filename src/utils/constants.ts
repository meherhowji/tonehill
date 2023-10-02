const DEFAULT_ACCIDENTAL: string = '#';
const SHARP: string = '#';
const FLAT: string = 'b';

const DEFAULT_CHART_DATA: {time: number; hz: number}[] = [{time: 0, hz: 0}];
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
  '#FF7230',
  '#FF752F',
  '#FF8B29',
  '#FF9F22',
  '#FFB217',
  '#FFC500',
  '#FFD900',
  '#FFEC00',
  '#FBFE00',
  '#E6FF00',
  '#D0FF00',
  '#B5FF00',
];

const NOTE_SCORE_PALETTE: string[] = ['#FF7230', '#FF9F22', '#FFD900', '#E6FF00'];

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
