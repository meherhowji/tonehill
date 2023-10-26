import React from 'react';
import {LineGraph} from 'react-native-graph';
import {View, StyleSheet} from 'react-native';
const GRADIENT_FILL_COLORS = ['#7476df5D', '#7476df4D', '#7476df00'];

export const LineChart: React.FC<LineChartProps> = ({data}) => {
  return (
    <View style={styles.container}>
      <LineGraph
        points={data}
        animated={false}
        gradientFillColors={GRADIENT_FILL_COLORS}
        color="#4484B2"
        style={styles.miniGraph}
        range={{
          x: {
            min: data[0].date,
            max: data[19] && data[19].date,
          },
          y: {
            min: -50,
            max: 50,
          },
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'white',
    flex: 1,
  },
  miniGraph: {
    flex: 1,
    flexGrow: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0)',
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
