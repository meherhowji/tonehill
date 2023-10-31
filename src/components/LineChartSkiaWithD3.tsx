import React, {useState, useEffect} from 'react';
import {Canvas, Path, Skia, SkPath, Line, LinearGradient, vec} from '@shopify/react-native-skia';
import {curveBasis, line, scaleLinear, scaleTime} from 'd3';
import {View, Text, StyleSheet} from 'react-native';
import {getStrokeColor} from '../utils/utils';

interface DataPoint {
  date: number;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({data}) => {
  const height = 180;
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
      <View style={{backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'center'}}>
        <Text
          style={{
            position: 'absolute',
            alignSelf: 'center',
            right: -14,
            fontSize: 24,
            color: 'rgba(0,255,0,0.5)',
            fontFamily: 'RobotoMono-Regular',
          }}>
          •
        </Text>
        <Canvas style={{width, height, backgroundColor: 'rgba(0,0,0,0)'}}>
          {/* <Text x={width - 10} y={height / 2} text="Hello World" /> */}
          <LineGenerator width={width} height={height} numLines={11} />
          <Path style="stroke" path={skPath!} strokeWidth={4} color="purple">
            <LinearGradient start={vec(0, height / 2)} end={vec(width / 1.5, 0)} colors={['#ff1178', '#8318f6']} />
          </Path>
        </Canvas>
      </View>
    </View>
  );
};

function LineGenerator({width, height, numLines}: {width: number; height: number; numLines: number}) {
  const lines = [];

  for (let i = 0; i < numLines; i++) {
    let y = height / (10 / i);
    y = y === height ? height - 1 : y; // setting the exact height makes the stroke disappear out of bounds
    const color = getStrokeColor(i);
    const strokeWidth = i === (numLines % 2 === 0 ? numLines / 2 : (numLines - 1) / 2) ? 3 : 1;
    lines.push(<Line key={i} p1={vec(0, y)} p2={vec(width, y)} color={color} strokeWidth={strokeWidth} />);
  }

  return <>{lines}</>;
}

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
