/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';
// import VocalPitchChart from './VocalPitchChart';
import LineChart from './chart';
import {findNearestNote, mapNoteToValue} from './utils';

export default function App() {
  const [data, setData] = React.useState({tone: '♭♯', frequency: 0});
  const [chartData, setChartData] = React.useState([]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [metaData, setMetaData] = React.useState({});
  const [avg, setAvg] = React.useState({});

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
      let _data = mapNoteToValue(meta, 'C2');

      if (chartData.length > 25) {
        newData = [...chartData];
        newData.shift();
        nextData = [...newData, {time: counter, hz: _data}];
      } else {
        nextData = [...chartData, {time: counter, hz: _data}];
      }
      setChartData(nextData);
      setCounter(counter + 0.1);
      setMetaData(meta);
    }
  }, [data]);

  React.useEffect(() => {
    if (metaData.cents) {
      const existing = avg[metaData.note];
      const now = metaData.cents;
      setAvg({
        [metaData.note]: [...existing, metaData.cents],
      });
    }
  }, [metaData]);

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
