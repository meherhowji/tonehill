import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import {getNotes} from './utils';

const FrequencyTimeChart = ({data}) => {
  const range = getNotes('C2', 'C4');
  const numRange = Array.from({length: range.length}, (_, index) => index);
  const screenWidth = Dimensions.get('window').width;
  const displayNone = {display: 'none'};

  const chartWidth = screenWidth;
  const chartHeight = 500;

  return (
    <View style={styles.chartContainer}>
      <VictoryChart
        width={chartWidth}
        height={chartHeight}
        minDomain={{y: 0}}
        maxDomain={{y: 24}}>
        <VictoryAxis
          dependentAxis
          tickValues={numRange}
          tickFormat={v => range[v]}
          orientation="right"
          style={{
            tickLabels: {fontSize: 8},
            grid: {stroke: 'black', opacity: 0.1},
            axis: {stroke: 'black', opacity: 0.4},
          }}
        />
        <VictoryAxis
          style={{
            axis: displayNone,
            tickLabels: displayNone,
          }}
        />
        <VictoryLine data={data} x="time" y="hz" interpolation="natural" />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default FrequencyTimeChart;
