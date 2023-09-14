import React from 'react';
import SegmentedControl from '@react-native-segmented-control/segmented-control';
import {SHARP, FLAT} from '../../utils/constants';
import {StyleSheet} from 'react-native';
import {useRootStore} from '../../stores/RootStoreProvider';
import {observer} from 'mobx-react-lite';

const AccidentalSwitch = observer(() => {
  const {commonStore} = useRootStore();
  return (
    <SegmentedControl
      style={css.segmentedControl}
      values={[SHARP, FLAT]}
      selectedIndex={commonStore.accidental === SHARP ? 0 : 1}
      onChange={event => {
        // let _selectedIndex = event.nativeEvent.selectedSegmentIndex;
        commonStore.toggleAccidental();
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
