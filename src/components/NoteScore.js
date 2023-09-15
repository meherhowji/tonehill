import React, {memo, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {generateScale, getRgbForPercent} from '../utils/utils';
import {useRootStore} from '../stores/RootStoreProvider';
import {observer} from 'mobx-react-lite';

const NoteScore = observer(({stats}) => {
  const {commonStore, statsStore} = useRootStore();
  const [selectedNote, setSelectedNote] = useState(commonStore.userKey + 3);
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        <View style={styles.row}>
          {generateScale(commonStore.userKey, commonStore.userScale).map((note, index) => (
            <View
              key={index}
              style={[
                styles.noteItem,
                {backgroundColor: getRgbForPercent(statsStore.data?.perfect[note + 3]?.percentage)},
                {shadowColor: getRgbForPercent(statsStore.data?.perfect[note + 3]?.percentage)},
              ]}>
              <TouchableOpacity style={styles.cell} underlayColor={'#fff0'} onPress={() => setSelectedNote(note)}>
                <Text style={styles.noteText}>{note}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
        <View style={styles.row}>
          <TouchableOpacity style={styles.tally} underlayColor={'#fff0'}>
            <Text style={styles.tallyText}>
              {`In Tune: ${statsStore.data?.perfect[selectedNote + 3]?.percentage?.toFixed(0) || '-'}%`}{' '}
            </Text>
            {/* <Text style={styles.tallyText}>
              {`Flat: ${statsStore.data?.flats[selectedNote + 3]?.percentage || '-'}`}{' '}
            </Text>
            <Text style={styles.tallyText}>
              {`Sharp: ${statsStore.data?.sharps[selectedNote + 3]?.percentage || '-'}`}{' '}
            </Text> */}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flex: 1,
    // backgroundColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  tally: {
    margin: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gradient: {
    flex: 1,
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteItem: {
    flexDirection: 'row',
    width: 36,
    height: 36,
    borderRadius: 20,
    marginHorizontal: 5,
    // borderWidth: 1,
    backgroundColor: '#ffffff',
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
  },
  noteText: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Bold',
    color: '#fff',
    opacity: 1,
  },
  tallyText: {
    fontSize: 16,
    fontFamily: 'RobotoMono-Bold',
    color: '#fff',
    opacity: 1,
  },
  cell: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'blue',
  },
});

export const MemoisedNoteScore = memo(NoteScore);
