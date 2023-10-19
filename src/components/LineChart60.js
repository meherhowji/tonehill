import React from 'react';
import {View, StyleSheet} from 'react-native';
import {CartesianChart, Line} from 'victory-native';
import {LinearGradient, vec, useFont} from '@shopify/react-native-skia';
import inter from '../assets/fonts/Inter-Regular.ttf';

function LineChart60({data}) {
  const font = useFont(inter, 8);
  return (
    <View style={styles.container}>
      <View style={styles.chart}>
        <CartesianChart
          data={data}
          xKey="time"
          yKeys={['hz']}
          domain={{y: [-60, 60]}}
          axisOptions={{
            font,
            lineColor: {grid: 'rgba(255,255,255,0.5)', frame: 'rgba(0,0,0,0)'},
            // tickCount: {
            //   x: 0,
            //   y: 3,
            // },
            axisSide: {
              x: 'bottom',
              y: 'right',
            },
            labelColor: 'rgba(255,255,255,0.4)',
            // formatXLabel: label => ''
          }}>
          {({points}) => (
            <Line points={points.hz} color="red" strokeWidth={3} curveType={'natural'}>
              <LinearGradient start={vec(0, 50)} end={vec(200, 0)} colors={['#ff1178', '#8318f6']} />
            </Line>
          )}
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
    // backgroundColor: 'rgba(255,0,0,0.2)',
  },
});

export default LineChart60;
