/* eslint-disable react-native/no-inline-styles */
import React, {memo} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {generateScale} from '../utils/utils';
import {useRootStore} from '../stores/RootStoreProvider';
import {observer} from 'mobx-react-lite';

const MusicalNotePicker = observer(({stats}) => {
  const {commonStore} = useRootStore();

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {generateScale(commonStore.userKey, commonStore.userScale).map((note, index) => (
          <View key={index} style={[styles.noteItem, {backgroundColor: 1 ? '' : ''}]}>
            {/* <LinearGradient colors={selectedNote === note ? ['#68defb', '#d76aff'] : ['#fff0']} style={styles.gradient}> */}
            <TouchableOpacity style={styles.cell} underlayColor={'#fff0'}>
              <Text style={[styles.noteText, {opacity: 0.4}]}>{note}</Text>
            </TouchableOpacity>
            {/* </LinearGradient> */}
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
    // flex: 1,
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
  },
  noteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MemoisedNotePicker = memo(MusicalNotePicker);
