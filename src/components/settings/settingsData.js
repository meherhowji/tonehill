import React from 'react';
import {InTuneRangeDropdown, AccidentalSwitch, CentsDropdown, FrequencyDropdown, OctaveDropdown} from './';
import AxisLabelToggle from './AxisLabelToggle';

const settingsData = [
  {
    title: 'Display',
    data: ['Accidental', 'Octave', 'Cents', 'Axis Labels'],
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

// TODO: setting to toggle confirm the delete actions
const settingsConfig = [
  {name: 'Accidental', component: <AccidentalSwitch />},
  {name: 'In-Tune Range', component: <InTuneRangeDropdown />},
  {name: 'Cents', component: <CentsDropdown />},
  {name: 'Frequency', component: <FrequencyDropdown />},
  {name: 'Octave', component: <OctaveDropdown />},
  {name: 'Axis Labels', component: <AxisLabelToggle />},
];

export {settingsData, settingsConfig};
