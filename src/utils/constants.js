const DEFAULT_CHART_DATA = [{time: 0, hz: 0}];
const DEFAULT_META = {note: null, accuracy: null, cents: null};
const DEFAULT_DATA = {tone: '-', frequency: 0};
const DEFAULT_ACCIDENTAL = '#';
const SHARP = '#';
const FLAT = 'b';
const MAJOR_SCALE_FORMULA = ['W', 'W', 'H', 'W', 'W', 'W', 'H'];
const SOLFEGE = {
  western: ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Ti'],
  indian: ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'],
};

export {DEFAULT_CHART_DATA, DEFAULT_META, DEFAULT_DATA, DEFAULT_ACCIDENTAL, SHARP, FLAT, MAJOR_SCALE_FORMULA, SOLFEGE};
