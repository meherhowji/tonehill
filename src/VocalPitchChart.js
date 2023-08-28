import React, {useState, useEffect} from 'react';
import {View, Text, useWindowDimensions} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {notes, frequencyToNote, noteToFrequency} from './frequencyToNote';
import {getFrequenciesBetween} from './utils';

const VocalPitchChart = ({data}) => {
  const [xAxis, setXaxis] = useState([]);
  const [lineData, setLineData] = useState([]);
  const {height, width, scale, fontScale} = useWindowDimensions();

  useEffect(() => {
    const freqs = getFrequenciesBetween('C2', 'C4');
    setXaxis(freqs);
  }, []);

  return (
    <View>
      <VictoryChart width={width} maxDomain={{y: noteToFrequency.C3}}>
        <VictoryAxis
          dependentAxis
          orientation={'right'}
          tickValues={xAxis}
          maxDomain={{y: noteToFrequency.C3}}
          style={{
            axis: {stroke: '#756f6a'},
            axisLabel: {fontSize: 20, padding: 30},
            grid: {stroke: 'grey'},
            ticks: {stroke: 'grey', size: 5},
            tickLabels: {fontSize: 15, padding: 5},
          }}
          tickFormat={hz => `${frequencyToNote[hz]}`}
        />
        <VictoryAxis style={{axis: {stroke: 'transparent'}}} />
        <VictoryLine data={data} x="time" y="hz" interpolation="natural" />
      </VictoryChart>
    </View>
  );
};

export default VocalPitchChart;
