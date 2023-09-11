import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import head from 'ramda/es/head';
import last from 'ramda/es/last';
import equals from 'ramda/es/equals';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../stores/RootStoreProvider';

const flatAccidentalStyle = {
  transform: [{rotate: '180deg'}, {scaleX: -1}, {skewY: '10deg'}],
  top: -1,
  fontSize: 30,
};

// needs note, accidental, octave, frequency
const ToneDisplay = observer(({audioData}) => {
  const {commonStore} = useRootStore();
  const [data, setData] = useState({tone: '', accidentals: '', frequency: '', octave: ''});

  useEffect(() => {
    if (audioData) {
      let note = head(audioData?.tone);
      // const getMappedNote = propOr(note, note, sharpToFlatMapping);
      // if (accidental === '#' && sharpToFlatMapping[note]) {
      //   note = getMappedNote(note);
      // }
      setData({
        tone: note,
        accidentals: audioData?.tone?.length > 1 ? last(audioData?.tone) : '',
        octave: '1',
      });
    }
  }, [audioData]);

  return (
    <View style={styles.toneContainer}>
      <View style={styles.toneText}>
        <Text style={styles.tone} includeFontPadding>
          {data.tone}
        </Text>
        <View style={styles.toneMeta}>
          <Text style={[styles.accidentals, equals(commonStore.accidental, 'p') && flatAccidentalStyle]}>
            {commonStore.accidental}
          </Text>
          <Text style={styles.octave}>{data.octave}</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  toneContainer: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  toneText: {
    position: 'relative',
    // backgroundColor: 'green',
    height: 90,
    width: 105,
    overflow: 'hidden',
  },
  tone: {
    position: 'absolute',
    left: 0,
    top: -34,
    color: '#fff',
    fontSize: 150,
    fontWeight: 'bold',
    fontFamily: 'Righteous',
    textAlign: 'center',
    // backgroundColor: 'red',
  },
  toneMeta: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: 20,
    height: 90,
    // backgroundColor: 'gray',
  },
  accidentals: {
    color: '#fff',
    fontWeight: 'bold',
    fontFamily: 'Righteous',
    textAlign: 'center',
    fontSize: 40,
    // backgroundColor: 'pink',
    position: 'absolute',
    left: 0,
    top: -10,
  },
  octave: {
    position: 'absolute',
    left: 2,
    bottom: -2,
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Righteous',
    // backgroundColor: 'cyan',
  },
});

export default ToneDisplay;
