import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {generateScale, getRgbForPercent} from '../utils/utils';
import {useRootStore} from '../stores/RootStoreProvider';
import {observer} from 'mobx-react-lite';

const StatsBar = observer(({stats}) => {
  const {commonStore, statsStore} = useRootStore();
  const [selectedNote, setSelectedNote] = useState(commonStore.userKey + 3);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {generateScale(commonStore.userKey, commonStore.userScale).map((note, index) => (
          <View
            key={index}
            style={[
              styles.noteItem,
              // {backgroundColor: getRgbForPercent(statsStore.data?.perfect[note + 3]?.percentage)},
              // {shadowColor: getRgbForPercent(statsStore.data?.perfect[note + 3]?.percentage)},
            ]}>
            <TouchableOpacity style={styles.cell} underlayColor={'#fff0'} onPress={() => setSelectedNote(note)}>
              <Text style={styles.noteText}>{note}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
      <View style={[styles.row, styles.lastRow]}>
        <TouchableOpacity style={styles.tally} underlayColor={'#fff0'}>
          <Text style={styles.tallyValue}>
            {`${statsStore.data?.perfect[selectedNote + 3]?.percentage?.toFixed(0) || '-'}`}
          </Text>
          <Text style={styles.tallyLabel}>In Tune %</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: 'green',
    padding: 15,
    paddingTop: 0,
  },
  row: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    marginTop: 10,
    gap: 5,
  },
  lastRow: {
    marginTop: 20,
  },
  tally: {
    flex: 1,
    // margin: 15,
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
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    width: 36,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
    // marginHorizontal: 5,
  },
  noteText: {
    // backgroundColor: '#ffffff',
    fontSize: 12,
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

export {StatsBar};
