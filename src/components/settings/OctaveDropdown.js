import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {useRootStore} from '../../stores/RootStoreProvider';
import {observer} from 'mobx-react-lite';

const OctaveDropdown = observer(() => {
  const {commonStore} = useRootStore();
  const [value, setValue] = useState('Show');

  const update = () => {
    setValue(prev => (prev === 'Show' ? 'Hide' : 'Show'));
    commonStore.toggleOctave();
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

export default OctaveDropdown;
