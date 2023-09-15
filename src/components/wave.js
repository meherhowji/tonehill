import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, LineSegment} from 'victory-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {calculateGridStyle} from '../utils/utils';

const LineChart = ({data}) => {
  return (
    <View style={styles.container}>
      <VictoryChart
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height * 0.25}
        padding={{top: 0, bottom: 0, left: 0, right: 0}}>
        <VictoryAxis
          dependentAxis
          tickValues={[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]}
          axisComponent={<LineSegment type={'axis'} style={styles.hide} />}
          tickLabelComponent={<VictoryLabel dy={-10} textAnchor="start" />}
          orientation="right"
          style={{
            grid: {
              stroke: ({tick}) => calculateGridStyle(tick, true),
              strokeWidth: ({tick}) => calculateGridStyle(tick, false),
            },
            tickLabels: {fontSize: 8, padding: -15, opacity: 0},
          }}
        />
        <GradientLine />
        <VictoryLine
          interpolation="natural"
          style={{
            axis: {stroke: '#756f6a', opacity: 0},
            data: {
              stroke: 'url(#gradient)',
              strokeWidth: 5,
              strokeLinecap: 'round',
              opacity: 1,
            },
          }}
          data={data}
          x="time"
          y="hz"
        />
      </VictoryChart>
    </View>
  );
};

const GradientLine = React.memo(() => {
  return (
    <Defs>
      <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#ff1178" stopOpacity="1" />
        <Stop offset="50%" stopColor="#8318f6" stopOpacity="1" />
      </LinearGradient>
    </Defs>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  hide: {
    stroke: '#fff0',
  },
});

export default React.memo(LineChart);
