import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';

function OctaveDropdown() {
  const [value, setValue] = useState('Show');
  const [isDisabled, setIsDisabled] = useState(true);

  return (
    <TouchableOpacity
      style={[styles.container, isDisabled && styles.disabled]}
      onPress={() => setValue(prev => (prev === 'Show' ? 'Hide' : 'Show'))}
      disabled={isDisabled}>
      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
}

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

export default OctaveDropdown;
