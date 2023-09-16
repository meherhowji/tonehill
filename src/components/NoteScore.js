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
        {/* <View style={styles.row}>
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
        </View> */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.tally} underlayColor={'#fff0'}>
            <Text style={styles.tallyValue}>
              {`${statsStore.data?.perfect[selectedNote + 3]?.percentage?.toFixed(0) || '-'}`}
            </Text>
            <Text style={styles.tallyLabel}>In Tune %</Text>
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
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    // backgroundColor: 'green',
  },
  tally: {
    flex: 1,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'center',
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
    // backgroundColor: 'green',
    // flexDirection: 'row',
    // justifyContent: 'space-around',
    flex: 1,
    width: 36,
    height: 30,
    borderRadius: 3,
    // marginHorizontal: 5,
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
  tallyValue: {
    fontSize: 60,
    fontFamily: 'Righteous',
    color: '#fff',
    opacity: 1,
  },
  tallyLabel: {
    fontSize: 9,
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
