import React from 'react';
import {InTuneRangeDropdown, AccidentalSwitch, CentsDropdown, FrequencyDropdown, OctaveDropdown} from './';

const settingsData = [
  {
    title: 'Display',
    data: ['Accidental', 'Octave', 'Cents'],
  },
  {
    title: 'Tuner',
    data: ['In-Tune Range'],
  },
  {
    title: 'Stats',
    data: ['Delete Stats'],
  },
  {
    title: 'App',
    data: ['How to Use & FAQs', 'Share with Friends', 'Leave a Review', 'About'],
  },
  {
    title: 'Account',
    data: ['Log Out', 'Reset Settings'],
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
