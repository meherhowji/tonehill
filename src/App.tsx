/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';
// import VocalPitchChart from './VocalPitchChart';
import LineChart from './chart';
import {findNearestNote, mapNoteToValue} from './utils';

type DynamicObject = {
  [key: string]: {
    flat: any[];
    sharp: any[];
    perfect: any[];
    stats: {
      averageFlat: number;
      averageSharp: number;
      averagePerfect: number;
      percentageFlat: number;
      percentageSharp: number;
      percentagePerfect: number;
    };
  };
};

export default function App() {
  const [data, setData] = React.useState({tone: '♭♯', frequency: 0});
  const [chartData, setChartData] = React.useState([{time: 0, hz: 0}]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [metaData, setMetaData] = React.useState({
    note: null,
    accuracy: null,
    cents: null,
  });
  const avg = React.useRef<DynamicObject>({});

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
          nextData = [...newData, {time: counter, hz: _data}];
        } else {
          nextData = [...chartData, {time: counter, hz: _data}];
        }
        setChartData(nextData);
        setCounter(counter + 1);
        setMetaData(meta);
      }
    }
  }, [data]);

  React.useEffect(() => {
    const note = metaData.note;
    const newnote = metaData.cents;
    const obj = avg.current;
    if (note && obj[note] && newnote) {
      if (newnote < 0) {
        obj[note].flat.push(newnote);
      } else if (newnote > 0) {
        obj[note].sharp.push(newnote);
      } else if (newnote === 0) {
        obj[note].perfect.push(newnote);
      }
      const flatArray = obj[note]?.flat || [];
      const sharpArray = obj[note]?.sharp || [];
      const perfectArray = obj[note]?.perfect || [];

      const averageFlat = calculateAverage(flatArray);
      const averageSharp = calculateAverage(sharpArray);
      const averagePerfect = calculateAverage(perfectArray);

      // Calculate the percentages relative to the total length of notes
      const totalNotesLength =
        flatArray.length + sharpArray.length + perfectArray.length;
      const percentageFlat = (flatArray.length / totalNotesLength) * 100;
      const percentageSharp = (sharpArray.length / totalNotesLength) * 100;
      const percentagePerfect = (perfectArray.length / totalNotesLength) * 100;

      obj[note] = {
        flat: flatArray,
        sharp: sharpArray,
        perfect: perfectArray,
        stats: {
          averageFlat,
          averageSharp,
          averagePerfect,
          percentageFlat,
          percentageSharp,
          percentagePerfect,
        },
      };
    } else if (newnote && note) {
      obj[note] = {
        flat: newnote < 0 ? [newnote] : [],
        sharp: newnote > 0 ? [newnote] : [],
        perfect: newnote === 0 ? [newnote] : [],
      };
    }
    console.log(obj, ' <<<<<<<< ');
  }, [metaData]);

  function calculateAverage(arr) {
    if (arr.length === 0) {
      return 0; // Handle the case when there are no elements in the array.
    }
    const sum = arr.reduce((acc, num) => acc + num, 0);
    return parseInt((sum / arr.length).toFixed(0), 10);
  }

  return (
    <View style={styles.container}>
      <LineChart data={chartData} width={300} height={200} />
      <Text style={styles.tone}>{data?.tone}</Text>
      <Text style={styles.frequency}>{data?.frequency?.toFixed(2)}hz</Text>
      <Text
        style={
          styles.meta
        }>{`Note: ${metaData.note} | Cents: ${metaData.cents}`}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={isRecording ? stop : start}>
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
