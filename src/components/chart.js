import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis} from 'victory-native';
import {getNotes} from '../utils/utils';

const FrequencyTimeChart = ({data}) => {
  const range = getNotes('C2', 'C4');
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={styles.chartContainer}>
      <VictoryChart width={screenWidth} height={500} minDomain={{y: 0}} maxDomain={{y: 24}}>
        <VictoryAxis
          dependentAxis
          tickValues={range.map((_, index) => index)}
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
            axis: {display: 'none'},
            tickLabels: {display: 'none'},
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
