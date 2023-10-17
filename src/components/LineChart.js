import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, LineSegment} from 'victory-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {calculateGridStyle} from '../utils/utils';
import {useRootStore} from '../stores';
import {observer} from 'mobx-react-lite';

const GradientLine = React.memo(() => (
  <Defs>
    <LinearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
      <Stop offset="0%" stopColor="#ff1178" stopOpacity="1" />
      <Stop offset="70%" stopColor="#8318f6" stopOpacity="1" />
    </LinearGradient>
  </Defs>
));

const LineSeg = React.memo(() => <LineSegment type={'axis'} style={styles.hide} />);

const TickLabel = React.memo(props => (
  <VictoryLabel
    {...props}
    dy={0}
    dx={0}
    textAnchor="start"
    style={{
      fill: 'rgba(255,255,255, 0.20)',
      fontSize: 8,
    }}
    text={({datum}) => (datum === 0 || datum === 50 || datum === -50 ? datum : '')}
  />
));

const LineChart = observer(({data}) => {
  const {common} = useRootStore();
  return (
    <View style={styles.container}>
      <VictoryChart padding={{top: 60, bottom: 60, left: 0, right: 30}}>
        <VictoryAxis
          dependentAxis
          tickValues={[-60, -50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50, 60]}
          axisComponent={<LineSeg />}
          tickLabelComponent={common.showAxisLabel ? <TickLabel /> : <></>}
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
        <GradientLine />
        <VictoryLine
				  // domain={{ x: [0, 20], y: [-50, 50] }}
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
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'tan',
    marginTop: 10,
    // marginBottom: 20,
    // borderRadius: 10,
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

export default LineChart;

{
  /* adding another axis creates interesting effect but hits the performance*/
}
{
  /* <VictoryAxis
          label=""
          standalone={false}
          // width="100%"
          tickValues={[0, 20]}
          style={{
            tickLabels: {opacity: 0},
          }}
        /> */
}
