import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {generateScale} from '../utils/utils';
import {useRootStore} from '../stores';
import {observer} from 'mobx-react-lite';

const StatsBar = observer(() => {
  const {common, stats} = useRootStore();
  const [selectedNote, toggleSelectedNote] = useState('');
  return (
    <View style={styles.container}>
      <View style={[styles.row, styles.firstRow]}>
        {generateScale(common.userKey, common.userScale).map((note, index) => (
          <View key={index} style={styles.noteItem}>
            <TouchableOpacity
              style={[styles.cell, styles.noteLabel]}
              underlayColor={'#fff0'}
              onPress={() => toggleSelectedNote(prev => (prev === note ? '' : note))}>
              <Text style={styles.noteText}>{note}</Text>
            </TouchableOpacity>
            <View style={[styles.cell, styles.rule]}></View>
            <View style={[styles.cell, styles.noteValue]}>
              <Text style={styles.noteValueText}>{`${stats.details?.perfect[note + 3]?.percentage?.toFixed(0)}%`}</Text>
            </View>
          </View>
        ))}
      </View>
      <View style={[styles.row, styles.lastRow]}>
        <TouchableOpacity style={styles.tally} underlayColor={'#fff0'}>
          <Text style={styles.tallyValue}>
            {`${stats.details?.perfect[selectedNote + 3]?.percentage?.toFixed(0) || '—'}`}
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
    // padding: 15,
    paddingTop: 0,
    // marginTop: 10,
  },
  row: {
    flex: 1,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    gap: 5,
  },
  firstRow: {
    display: 'none',
    // backgroundColor: 'rgba(255,0,0,0.5)',
    marginTop: 10,
  },
  lastRow: {
    display: 'none',
    // backgroundColor: 'red',
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flex: 1,
    // marginHorizontal: 5,
    // backgroundColor: 'red',
  },
  noteText: {
    // backgroundColor: '#ffffff',
    fontSize: 14,
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
    fontSize: 10,
    fontFamily: 'RobotoMono-Bold',
    color: '#fff',
    opacity: 1,
  },
  cell: {
    flex: 1,
    width: '100%',
    color: '#fff',
    paddingLeft: 10,
    // height: '100%',
    // justifyContent: 'center',
    // backgroundColor: 'blue',
  },
  noteLabel: {
    // alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  noteValue: {},
  noteValueText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'RobotoMono-Regular',
  },
  rule: {
    flex: 0,
    width: '80%',
    // backgroundColor: 'red',
    marginLeft: 10,
    borderBottomWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
});

export {StatsBar};
