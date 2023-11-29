import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import equals from 'ramda/es/equals';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../stores';
import {FLAT} from '../utils/constants';
import {isValidNumber, parseNote, mapValueToIndex} from '../utils/utils';
import {sharpToFlatMapping} from '../utils/mappings';

// audioData is metaData containing note, accuracy and cent
const ToneDisplay = observer(({audioData}) => {
  const {common, stats} = useRootStore();
  const [data, setData] = useState({note: '', accidental: '', frequency: '', octave: '', cents: ''});

  useEffect(() => {
    if (audioData?.note) {
      let {note, accidental, octave} = parseNote(audioData.note);
      if (common.accidental === FLAT) {
        const mappedNote = sharpToFlatMapping[note + accidental];
        const mappedParsedNote = parseNote(mappedNote);
        ({note, accidental} = mappedParsedNote);
      }

      setData({note, accidental, octave: isValidNumber(octave) ? octave : '', cents: audioData.cents});
    } else {
      setData({note: '', accidental: '', frequency: '', octave: '', cents: ''});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioData]);

  return (
    <View style={styles.toneContainer}>
      {/* {console.log('🚀 ~ rendered: ToneDisplay.js')} */}
      {data.note ? (
        <View style={styles.toneText}>
          <Text style={[styles.tone, {color: stats.toneLabelColor}]} includeFontPadding>
            {data.note}
          </Text>
          <View style={styles.toneMeta}>
            <Text style={[styles.accidentals, equals(data.accidental, 'p') && styles.flatAccidentalStyle]}>
              {data.accidental}
            </Text>
            {common.showOctave && <Text style={styles.octave}>{data.octave}</Text>}
          </View>
          {common.showCents && (
            <View style={styles.cents}>
              <Text style={styles.centsValue}>{data.cents > 0 ? `+${data.cents}` : data.cents}</Text>
              <Text style={styles.centsLabel}>¢</Text>
            </View>
          )}
        </View>
      ) : (
        <View style={styles.toneTextFallback}>
          <Text style={styles.toneFallback}>-</Text>
        </View>
      )}
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
    // backgroundColor: 'green',
    zIndex: -1,
  },
  toneText: {
    position: 'relative',
    height: 90,
    width: 105,
    // overflow: 'hidden',
  },
  toneTextFallback: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  toneFallback: {
    fontSize: 120,
    color: 'rgba(255,255,255, 0.8)',
  },
  centsLabel: {
    alignSelf: 'center',
    fontFamily: 'RobotoMono-Medium',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: -1,
    opacity: 0.8,
  },
  centsValue: {
    alignSelf: 'center',
    fontFamily: 'RobotoMono-Medium',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    opacity: 0.8,
  },
  cents: {
    position: 'absolute',
    bottom: -50,
    left: 0,
    width: '100%',
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tone: {
    position: 'absolute',
    left: 0,
    top: -34,
    height: 124,
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
  flatAccidentalStyle: {
    transform: [{rotate: '180deg'}, {scaleX: -1}, {skewY: '10deg'}],
    top: -1,
    fontSize: 30,
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
