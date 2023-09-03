import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {MemoisedNotePicker} from './noteScroller';
// import {MusicalNotePicker} from './noteScroller';

function StatsBar({stats}) {
  const [toggleFlat, setToggleFlat] = useState(true);
  const [togglePerfect, setTogglePerfect] = useState(true);
  const [toggleSharp, setToggleSharp] = useState(true);
  const [selectedNote, setSelectedNote] = useState('C');
  const data = stats;

  return (
    <View style={styles.container} width={Dimensions.get('window').width}>
      <View style={[styles.row, styles.firstRow]}>
        <MemoisedNotePicker onNoteSelect={setSelectedNote} />
      </View>
      <View style={[styles.row, styles.lastRow]}>
        <View style={styles.cell}>
          <TouchableOpacity style={styles.cell} onPress={() => setToggleFlat(!toggleFlat)}>
            <Text style={styles.textLabel}>Flat</Text>
            {toggleFlat ? (
              <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.averageFlat || 0}`}</Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.percentageFlat || 0}`}</Text>
                <Text style={styles.percentSymbol}>%</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cell}>
          <TouchableOpacity style={styles.cell} onPress={() => setTogglePerfect(!togglePerfect)}>
            <Text style={styles.textLabel}>Perfect</Text>
            {togglePerfect ? (
              <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.averagePerfect || 0}`}</Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.percentagePerfect || 0}`}</Text>
                <Text style={styles.percentSymbol}>%</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cell}>
          <TouchableOpacity style={styles.cell} onPress={() => setToggleSharp(!toggleSharp)}>
            <Text style={styles.textLabel}>Sharp</Text>
            {toggleSharp ? (
              <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.averageSharp || 0}`}</Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.percentageSharp || 0}`}</Text>
                <Text style={styles.percentSymbol}>%</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'start',
    // backgroundColor: 'red',
  },
  row: {
    flex: '1',
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
  },
  firstRow: {
    marginTop: 20,
  },
  lastRow: {
    marginTop: 35,
  },
  cell: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    color: 'white',
    fontSize: 14,
  },
  textValue: {
    color: 'white',
    fontSize: 48,
    fontFamily: 'Inter-Bold',
  },
  percentSymbol: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    verticalAlign: 'middle',
    alignSelf: 'center',
  },
});

export {StatsBar};
