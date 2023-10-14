import React from 'react';
import {View, StyleSheet} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, LineSegment} from 'victory-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {calculateGridStyle} from '../utils/utils';
import {useRootStore} from '../stores';
import {observer} from 'mobx-react-lite';

const LineChart = observer(({data}) => {
  const {common} = useRootStore();
  const dater = [];
  for (let x = -50; x <= 50; x += 1) {
    dater.push({x, y: Math.sin(x / 10) * 50}); // You can adjust the oscillation pattern here
  }
  return (
    <View style={styles.container}>
      <VictoryChart padding={{top: 60, bottom: 60, left: 0, right: 30}}>
        <VictoryAxis
          dependentAxis
          tickValues={[-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60]}
          axisComponent={<LineSegment type={'axis'} style={styles.hide} />}
          tickLabelComponent={
            <VictoryLabel
              dy={0}
              dx={0}
              textAnchor="start"
              style={{
                fill: 'rgba(255,255,255, 0.25)',
                fontSize: 8,
                opacity: common.showAxisLabel ? 1 : 0,
              }}
              text={({datum}) => (datum === 0 || datum === 50 || datum === -50 ? datum : '')}
            />
          }
          orientation="right"
          style={{
            grid: {
              stroke: ({tick}) => calculateGridStyle(tick, true),
              strokeWidth: ({tick}) => calculateGridStyle(tick, false),
              strokeColor: 'green',
            },
            tickLabels: {padding: 1},
          }}
        />
        {/* adding another axis creates interesting effect but hits the performance*/}
        {/* <VictoryAxis
          label=""
          standalone={false}
          // width="100%"
          tickValues={[0, 20]}
          style={{
            tickLabels: {opacity: 0},
          }}
        /> */}
        <GradientLine />
        <VictoryLine
          interpolation="natural"
          style={{
            axis: {stroke: '#756f6a', opacity: 0},
            data: {
              stroke: 'url(#gradient)',
              strokeWidth: 3,
              strokeLinecap: 'round',
              opacity: 1,
            },
          }}
          data={data}
          x="time"
          y="hz"
        />
      </VictoryChart>
      {/* <View style={{flex: 1, backgroundColor: 'red', height: 100}}>
        <VictoryChart
          domain={{x: [-50, 50]}} // Set the x-axis domain to -50 to 50
        >
          <VictoryScatter
            data={[{x: -30}]} // Pass your data as an array of objects with x-values
            size={6} // Adjust the size of the circle as needed
            style={{data: {fill: 'blue'}}} // Change the circle color as desired
          />
        </VictoryChart>
      </View> */}
    </View>
  );
});

const GradientLine = React.memo(() => {
  return (
    <Defs>
      <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <Stop offset="0%" stopColor="#ff1178" stopOpacity="1" />
        <Stop offset="70%" stopColor="#8318f6" stopOpacity="1" />
        {/* <Stop offset="0%" stopColor="#a82343" stopOpacity="1" />
        <Stop offset="60%" stopColor="#322083" stopOpacity="1" /> */}
      </LinearGradient>
    </Defs>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'rgb(10,10,10)',
    marginTop: 10,
    // marginBottom: 20,
    borderRadius: 10,
  },
  centAxis: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '100%',
    height: '100%',
    // backgroundColor: 'rgba(255,0,0,0.5)',
  },
  cent: {
    // backgroundColor: 'rgba(255,0,0,0.5)',
    position: 'absolute',
    right: 0,
    fontSize: 8,
    opacity: 0.2,
    color: 'white',
  },
  topCent: {
    top: 0,
    transform: [{translateY: -3}],
  },
  middleCent: {
    top: '50%',
    transform: [{translateY: -4}],
  },
  bottomCent: {
    bottom: 0,
    transform: [{translateY: 3}],
  },
  hide: {
    stroke: '#fff0',
  },
});

export default React.memo(LineChart);
