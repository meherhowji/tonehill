import React from 'react';
import {View} from 'react-native';
import {
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {notes} from './frequencyToNote';

const VocalPitchChart = ({data}) => {
  return (
    <View>
      <VictoryChart>
        <VictoryAxis tickValues={notes} tickFormat={note => note} />
        <VictoryAxis dependentAxis style={{axis: {stroke: 'transparent'}}} />
        <VictoryLine data={data} x="frequency" y="time" />
      </VictoryChart>
    </View>
  );
};

export default VocalPitchChart;
