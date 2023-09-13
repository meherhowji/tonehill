import {InTuneRangeDropdown, AccidentalSwitch, CentsDropdown, FrequencyDropdown, OctaveDropdown} from './';

const settingsData = [
  {
    title: 'Display',
    data: ['Accidental', 'Octave', 'Cents', 'Frequency'],
  },
  {
    title: 'Tuner',
    data: ['In-Tune Range'],
    // data: ['In-Tune Range', 'Mic Sensitivity'],
  },
  {
    title: 'Stats',
    data: ['Delete Stats', 'Delete All Stats'],
  },
  {
    title: 'About App',
    data: ['Share with Friends', 'Leave a Review', 'Contact', 'FAQ'],
  },
  {
    title: 'Account',
    data: ['Log Out', 'Delete Data', 'Reset Settings', 'Delete Account'],
  },
];

const settingsConfig = [
  {name: 'Accidental', component: <AccidentalSwitch />},
  {name: 'In-Tune Range', component: <InTuneRangeDropdown />},
  {name: 'Cents', component: <CentsDropdown />},
  {name: 'Frequency', component: <FrequencyDropdown />},
  {name: 'Octave', component: <OctaveDropdown />},
];

export {settingsData, settingsConfig};
