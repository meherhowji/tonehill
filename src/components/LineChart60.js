import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CartesianChart, Line} from 'victory-native';

function LineChart60() {
  const DATA = Array.from({length: 20}, (_, i) => ({
    day: i,
    highTmp: 20 + 30 * Math.random(),
  }));

  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <CartesianChart data={DATA} xKey="day" yKeys={['highTmp']}>
          {({points}) => <Line points={points.highTmp} color="red" strokeWidth={3} curveType={'natural'} />}
        </CartesianChart>
        <View style={styles.grid}></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'tan',
    // marginTop: 10,
    // marginBottom: 20,
    // borderRadius: 10,
  },
  chart: {
    flex: 1,
    width: '100%',
    height: '50%',
    position: 'absolute',
    // backgroundColor: 'gray',
  },
  grid: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(255,0,0,0.2)',
  },
});

export default LineChart60;
