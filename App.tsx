/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Dimensions} from 'react-native';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';
import {LineChart} from 'react-native-chart-kit';

export default function App() {
  const [data, setData] = React.useState({tone: '--', frequency: 0});
  const [chartData, setChartData] = React.useState([{value: 0, timestamp: 0}]);
  const [isRecording, setIsRecording] = React.useState(false);
  const [counter, setCounter] = React.useState(0);

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

  React.useEffect(() => {
    PitchDetector.addListener(setData);
    return () => {
      PitchDetector.removeListener();
    };
  }, []);

  React.useEffect(() => {
    if (typeof data.frequency === 'number') {
      let newData, nextData;

      if (chartData.length > 50) {
        newData = [...chartData];
        newData.shift();
        nextData = [...newData, {value: data.frequency.toFixed(3), counter}];
      } else {
        nextData = [...chartData, {value: data.frequency.toFixed(3), counter}];
      }

      setChartData(nextData);
      setCounter(counter + 1);
    }
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.tone}>{data?.tone}</Text>
      <Text style={styles.frequency}>{data?.frequency?.toFixed(1)}hz</Text>
      <Text style={[styles.status, {color: isRecording ? 'green' : 'red'}]}>
        {isRecording ? 'ON' : 'OFF'}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={isRecording ? stop : start}>
        <Text style={styles.label}>{isRecording ? 'STOP' : 'START'}</Text>
      </TouchableOpacity>
      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={Dimensions.get('window').width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tone: {
    fontSize: 40,
    fontColor: 'black',
  },

  frequency: {
    fontSize: 20,
  },

  button: {
    marginTop: 20,
    backgroundColor: 'black',
    width: '50%',
    minHeight: 50,
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
