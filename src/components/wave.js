import React from 'react';
import {View, Dimensions, StyleSheet, Text} from 'react-native';
import {VictoryChart, VictoryLine, VictoryAxis, VictoryLabel, LineSegment} from 'victory-native';
import {Defs, LinearGradient, Stop} from 'react-native-svg';
import {calculateGridStyle} from '../utils/utils';
import {useRootStore} from '../stores/RootStoreProvider';
import {observer} from 'mobx-react-lite';

const LineChart = observer(({data}) => {
  const {commonStore} = useRootStore();
  return (
    <View style={styles.container}>
      <VictoryChart width={Dimensions.get('window').width} padding={{top: 50, bottom: 50, left: 15, right: 15}}>
        <VictoryAxis
          dependentAxis
          tickValues={[-50, -40, -30, -20, -10, 0, 10, 20, 30, 40, 50]}
          axisComponent={<LineSegment type={'axis'} style={styles.hide} />}
          tickLabelComponent={
            <VictoryLabel
              dy={0}
              dx={0}
              textAnchor="start"
              text={({datum}) => (datum === 0 || datum === 50 || datum === -50 ? datum : '')}
            />
          }
          orientation="right"
          style={{
            grid: {
              stroke: ({tick}) => calculateGridStyle(tick, true),
              strokeWidth: ({tick}) => calculateGridStyle(tick, false),
            },
            tickLabels: {fontSize: 8, padding: 0, opacity: commonStore.showAxisLabel ? 1 : 0, color: 'white'},
          }}
        />
        <GradientLine />
        <VictoryLine
          interpolation="natural"
          style={{
            axis: {stroke: '#756f6a', opacity: 0},
            data: {
              stroke: 'url(#gradient)',
              strokeWidth: 4,
              strokeLinecap: 'round',
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
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'brown',
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
