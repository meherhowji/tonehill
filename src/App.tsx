/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';
import VocalPitchChart from './VocalPitchChart';
import {findNearestNote} from './utils';

export default function App() {
  const [data, setData] = React.useState({tone: '--', frequency: 0});
  const [chartData, setChartData] = React.useState([]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [counter, setCounter] = React.useState(0);
  const [metaData, setMetaData] = React.useState({});

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

      if (chartData.length > 25) {
        newData = [...chartData];
        newData.shift();
        nextData = [
          ...newData,
          {time: counter, hz: parseFloat(data.frequency.toFixed(2))},
        ];
      } else {
        nextData = [
          ...chartData,
          {time: counter, hz: parseFloat(data.frequency.toFixed(2))},
        ];
      }
      setChartData(nextData);
      setCounter(counter + 1);
      setMetaData(meta);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.tone}>{data?.tone}</Text>
      <Text style={styles.frequency}>{data?.frequency?.toFixed(2)}hz</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stop : start}>
        <Text style={styles.label}>{isRecording ? 'Stop' : 'Start'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={reset}>
        <Text style={styles.label}>Reset</Text>
      </TouchableOpacity>
      <Text>{`Closest: ${metaData.nearestNote}`}</Text>
      <Text>{`Accuracy: ${metaData.accuracyPercentage}`}</Text>
      <Text>{`Cents: ${metaData.cents}`}</Text>
      <VocalPitchChart data={chartData} />
    </View>
  );
}

const styles = StyleSheet.create({
  tone: {
    fontSize: 40,
  },

  frequency: {
    fontSize: 20,
  },

  button: {
    marginTop: 20,
    backgroundColor: 'black',
    width: '50%',
    minHeight: 40,
    borderRadius: 100,
    justifyContent: 'center',
  },

  label: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },

  status: {
    marginTop: 16,
    color: 'black',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
