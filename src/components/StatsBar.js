import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {MemoisedNotePicker} from './noteScroller';

function StatsBar() {
  // const [toggleFlat, setToggleFlat] = useState(true);
  // const [togglePerfect, setTogglePerfect] = useState(true);
  // const [toggleSharp, setToggleSharp] = useState(true);
  // const [selectedNote, setSelectedNote] = useState('C');

  return (
    <View style={styles.container} width={Dimensions.get('window').width}>
      <View style={[styles.row, styles.firstRow]}>
        <MemoisedNotePicker />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
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
