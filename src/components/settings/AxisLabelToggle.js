import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useRootStore} from '../../stores';
import {observer} from 'mobx-react-lite';

const AxisLabelToggle = observer(() => {
  const {common} = useRootStore();
  const [value, setValue] = useState(common.axisLabelVisibility);

  const update = () => {
    setValue(prev => (prev === 'Show' ? 'Hide' : 'Show'));
    common.toggleAxisLabel();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={update}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(57,56,61)',
    borderRadius: 8,
    minHeight: 35,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    padding: 0,
    textAlign: 'center',
  },
});

export default AxisLabelToggle;
