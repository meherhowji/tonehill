import React, {useState, useEffect} from 'react';
import {Canvas, Path, Skia, SkPath} from '@shopify/react-native-skia';
import {curveBasis, line, scaleLinear, scaleTime, min, max} from 'd3';
import {View, StyleSheet} from 'react-native';

interface DataPoint {
  date: number;
  value: number;
}

interface LineChartProps {
  data: DataPoint[];
}

const LineChart: React.FC<LineChartProps> = ({data}) => {
  const [path, setPath] = useState<SkPath | null>();
  const height = 400;
  const width = 360;

  useEffect(() => {
    var xMin = min(data, function (d) {
      return Math.min(d.date);
    });
    var xMax = max(data, function (d) {
      return Math.max(d.date);
    });
    const y = scaleLinear().domain([-50, 50]).range([height, 35]);
    const x = scaleTime()
      .domain([xMin!, xMax!])
      .range([10, width - 10]);

    const curvedLine =
      line<DataPoint>()
        .x(d => x(d.date))
        .y(d => y(d.value))
        .curve(curveBasis)(data) || '';

    const skPath = Skia.Path.MakeFromSVGString(curvedLine);
    setPath(skPath!);
  }, [data]);

  return (
    <View style={styles.container}>
      <Canvas style={{width, height}}>
        {path && <Path style="stroke" path={path} strokeWidth={4} color="purple" />}
      </Canvas>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    // backgroundColor: 'white',
    flex: 2,
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
