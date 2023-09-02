import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryLabel} from 'victory-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {calculateGridStyle} from '../utils/utils';

const LineChart = ({data}) => {
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height * 0.25;
  return (
    <View style={styles.container}>
      <VictoryChart width={screenWidth} height={screenHeight} padding={{top: 0, bottom: 0, left: 0, right: 0}}>
        <VictoryAxis
          dependentAxis
          tickValues={[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]}
          tickLabelComponent={<VictoryLabel dy={-10} textAnchor="start" />}
          orientation="right"
          style={{
            axis: {stroke: '#756f6a', opacity: 0},

            grid: {
              stroke: ({tick}) => calculateGridStyle(tick, true),
              strokeWidth: ({tick}) => calculateGridStyle(tick, false),
            },
            tickLabels: {fontSize: 10, padding: -20, opacity: 0},
          }}
        />
        <VictoryAxis
          style={{
            axis: {stroke: '#756f6a', opacity: 0},
            tickLabels: {display: 'none'},
          }}
        />
        <Defs>
          <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <Stop offset="0%" stopColor="#ff1178" stopOpacity="1" />
            <Stop offset="75%" stopColor="#8318f6" stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <VictoryLine
          interpolation="natural"
          style={{
            // data: {stroke: '#FD7272', strokeWidth: 5, strokeLinecap: 'round', opacity: 0.8},
            data: {
              stroke: 'url(#gradient)',
              strokeWidth: 5,
              strokeLinecap: 'round',
              opacity: 1,
              shadowColor: '#fff',
              shadowOffset: {
                width: 10,
                height: 10,
              },
              shadowOpacity: 1,
              shadowRadius: 110,
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    // backgroundColor: 'blue',
  },
});

// Usage in VictoryAxis style:

export default LineChart;
