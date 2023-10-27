import React, {useState, useEffect} from 'react';
import {Canvas, Path, Skia, SkPath, LinearGradient, vec} from '@shopify/react-native-skia';
import {curveBasis, line, scaleLinear, scaleTime} from 'd3';
import {View, StyleSheet} from 'react-native';

interface DataPoint {
  date: number;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({data}) => {
  const height = 200;
  const width = 360;
  const xMin = data[0].date;
  const xMax = data[data.length - 1].date;

  const y = scaleLinear().domain([-50, 50]).range([height, 0]);
  const x = scaleTime().domain([xMin, xMax]).range([0, width]);

  const curvedLine = line<DataPoint>()
    .x(d => x(d.date))
    .y(d => y(d.value))
    .curve(curveBasis)(data);

  const skPath = Skia.Path.MakeFromSVGString(curvedLine!);

  return (
    <View style={styles.container}>
      <Canvas style={{width, height, backgroundColor: 'rgba(0,0,0,0)'}}>
        <Path style="stroke" path={skPath!} strokeWidth={4} color="purple">
          <LinearGradient start={vec(0, height / 2)} end={vec(height, 0)} colors={['#ff1178', '#8318f6']} />
        </Path>
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1.2,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonStyle: {
    marginRight: 20,
    backgroundColor: '#6231ff',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  textStyle: {
    color: 'white',
    fontSize: 20,
  },
});

export {LineChart};
