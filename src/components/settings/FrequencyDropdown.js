import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useRootStore} from '../../stores';
import {observer} from 'mobx-react-lite';

const FrequencyDropdown = observer(() => {
  const {common} = useRootStore();
  const [isDisabled, setIsDisabled] = useState(true);

  const [value, setValue] = useState('Show');

  const update = () => {
    setValue(prev => (prev === 'Show' ? 'Hide' : 'Show'));
    common.toggleFrequency();
  };

  return (
    <TouchableOpacity style={[styles.container, isDisabled && styles.disabled]} onPress={update} disabled={isDisabled}>
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
  disabled: {
    opacity: 0.5,
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    padding: 0,
    textAlign: 'center',
  },
});

export default FrequencyDropdown;
