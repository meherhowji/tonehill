import React, {memo} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {generateScale, getRgbForPercent} from '../utils/utils';
import {useRootStore} from '../stores/RootStoreProvider';
import {observer} from 'mobx-react-lite';

const MusicalNotePicker = observer(({stats}) => {
  const {commonStore, statsStore} = useRootStore();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {generateScale(commonStore.userKey, commonStore.userScale).map((note, index) => (
          <View
            key={index}
            style={[
              styles.noteItem,
              {backgroundColor: getRgbForPercent(statsStore.data?.perfect[note + 3]?.percentage)},
              {shadowColor: getRgbForPercent(statsStore.data?.perfect[note + 3]?.percentage)},
            ]}>
            <TouchableOpacity style={styles.cell} underlayColor={'#fff0'}>
              <Text style={styles.noteText}>{note}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    height: 90,
  },
  scrollContainer: {
    alignItems: 'center',
  },
  gradient: {
    flex: 1,
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteItem: {
    width: 36,
    height: 36,
    borderRadius: 20,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '$fff5',
    color: '#fff',
    backgroundColor: '#fff',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1, // Adjust the opacity to control the glow intensity
    shadowRadius: 1, // Adjust the radius to control the spread
  },
  noteText: {
    fontSize: 13,
    fontFamily: 'RobotoMono-Bold',
    color: '#fff',
    opacity: 1,
  },
  cell: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MemoisedNotePicker = memo(MusicalNotePicker);
