/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';
import LineChart from './chart';
import {findNearestNote, mapNoteToValue, calculateAverage} from './utils';
import {MetaShape, DynamicObject, DataArray} from './types';

const CENT_THRESHOLD = 2;
const DEFAULT_CHART_DATA = [{time: 0, hz: 0}];

export default function App() {
  const counter = React.useRef(0);
  const avg = React.useRef<DynamicObject>({});
  const [data, setData] = React.useState({tone: '♭♯', frequency: 0});
  const [chartData, setChartData] = React.useState<DataArray>(DEFAULT_CHART_DATA);
  const [isRecording, setIsRecording] = React.useState(false);
  const [metaData, setMetaData] = React.useState<MetaShape>({
    note: null,
    accuracy: null,
    cents: null,
  });

  const start = async () => {
    await PitchDetector.start();
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  const stop = async () => {
    await PitchDetector.stop();
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

  const reset = () => {
    setChartData([]);
    avg.current = {};
  };

  React.useEffect(() => {
    PitchDetector.addListener(setData);
    return () => {
      PitchDetector.removeListener();
    };
  }, []);

  React.useEffect(() => {
    if (typeof data.frequency === 'number') {
      let newData, nextData;
      let meta = findNearestNote(data.frequency);
      if (meta.note !== null) {
        let _data = mapNoteToValue(meta, 'C2');

        if (chartData.length > 50) {
          newData = [...chartData];
          newData.shift();
          nextData = [...newData, {time: counter.current, hz: _data}];
        } else {
          nextData = [...chartData, {time: counter.current, hz: _data}];
        }
        setChartData(nextData);
        counter.current = counter.current + 1;
        setMetaData(meta);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  React.useEffect(() => {
    const note = metaData.note;
    const newnote = metaData.cents;
    const obj = avg.current;
    const ct = CENT_THRESHOLD;

    if (note && obj[note] && newnote) {
      if (newnote < ct * -1) {
        obj[note].flat.push(newnote);
      } else if (newnote > ct) {
        obj[note].sharp.push(newnote);
      } else {
        obj[note].perfect.push(newnote);
      }

      // Calculate the average values for flat, sharp, and perfect arrays
      const flatArray = obj[note]?.flat || [];
      const sharpArray = obj[note]?.sharp || [];
      const perfectArray = obj[note]?.perfect || [];

      const averageFlat = calculateAverage(flatArray);
      const averageSharp = calculateAverage(sharpArray);
      const averagePerfect = calculateAverage(perfectArray);

      // Calculate the percentages relative to the total length of notes
      const totalNotesLength = flatArray.length + sharpArray.length + perfectArray.length;
      const rawPercentageFlat = (flatArray.length / totalNotesLength) * 100;
      const rawPercentageSharp = (sharpArray.length / totalNotesLength) * 100;
      const rawPercentagePerfect = (perfectArray.length / totalNotesLength) * 100;

      // Calculate rounded percentages
      const roundedPercentageFlat = Math.round(rawPercentageFlat);
      const roundedPercentageSharp = Math.round(rawPercentageSharp);
      const roundedPercentagePerfect = Math.round(rawPercentagePerfect);

      // Adjust one of the rounded percentages to ensure the total is exactly 100%
      const totalRoundedPercentage = roundedPercentageFlat + roundedPercentageSharp + roundedPercentagePerfect;
      const adjustment = 100 - totalRoundedPercentage;
      const adjustedPercentages = [roundedPercentageFlat, roundedPercentageSharp, roundedPercentagePerfect];

      // Apply the adjustment to the first non-zero percentage
      for (let i = 0; i < adjustedPercentages.length; i++) {
        if (adjustedPercentages[i] !== 0) {
          adjustedPercentages[i] += adjustment;
          break;
        }
      }

      obj[note] = {
        ...obj[note],
        stats: {
          averageFlat,
          averageSharp,
          averagePerfect,
          percentageFlat: adjustedPercentages[0],
          percentageSharp: adjustedPercentages[1],
          percentagePerfect: adjustedPercentages[2],
        },
      };
    } else if (newnote && note) {
      obj[note] = {
        flat: newnote < ct * -1 ? [newnote] : [],
        sharp: newnote > ct ? [newnote] : [],
        perfect: newnote < ct && newnote > ct * -1 ? [newnote] : [],
      };
    }
    console.log(obj?.C4?.stats, ' <<<<<<<< ');
  }, [metaData]);

  return (
    <View style={styles.container}>
      <LineChart data={chartData} />
      <Text style={styles.tone}>{data?.tone}</Text>
      <Text style={styles.frequency}>{data?.frequency?.toFixed(2)}hz</Text>
      <Text style={styles.meta}>{`Note: ${metaData.note} | Cents: ${metaData.cents}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={isRecording ? stop : start}>
          <Text style={styles.label}>{isRecording ? 'Stop' : 'Start'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={reset}>
          <Text style={styles.label}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tone: {
    marginBottom: 10,
    fontSize: 72,
    fontWeight: 'bold',
    opacity: 0.6,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 30,
    backgroundColor: '#555',
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  frequency: {
    fontSize: 20,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  meta: {
    marginTop: 5,
    marginBottom: 10,
  },
});
