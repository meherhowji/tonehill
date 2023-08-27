import React from 'react';
import {View} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';

const frequencyToNote = {
  261.63: 'C4',
  293.66: 'D4',
  329.63: 'E4',
  349.23: 'F4',
  392.0: 'G4',
  440.0: 'A4',
  493.88: 'B4',
};

const VocalPitchChart = ({data}) => {
  const mappedData = data.map(({time, frequency}) => ({
    time,
    note: frequencyToNote[frequency] || '',
  }));

  return (
    <View>
      <VictoryChart width={300} height={200}>
        <VictoryAxis
          dependentAxis
          label="Musical Note"
          tickValues={Object.keys(frequencyToNote)}
          tickFormat={f => frequencyToNote[f]}
          orientation="bottom"
        />
        <VictoryLine
          data={mappedData}
          x="time"
          y="frequency"
          style={{
            data: {stroke: '#2196F3'},
            parent: {border: '1px solid #ccc'},
          }}
        />
      </VictoryChart>
    </View>
  );
};

export default VocalPitchChart;
