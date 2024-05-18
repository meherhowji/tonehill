import React from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {SHARP, FLAT} from '../../utils/constants';
import {StyleSheet} from 'react-native';
import {useRootStore} from '../../stores';
import {observer} from 'mobx-react';

const AccidentalSwitch = observer(() => {
  const {common} = useRootStore();
  return (
    <SegmentedControl
      style={css.segmentedControl}
      values={[SHARP, FLAT]}
      selectedIndex={common.accidental === SHARP ? 0 : 1}
      onChange={event => {
        // let _selectedIndex = event.nativeEvent.selectedSegmentIndex;
        common.toggleAccidental();
      }}
    />
  );
});

const css = StyleSheet.create({
  segmentedControl: {
    borderWidth: 0,
    marginRight: -2,
  },
});

export default AccidentalSwitch;
