import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';

function StatsBar({stats}) {
  return (
    <View style={styles.container} width={Dimensions.get('window').width}>
      <View style={styles.cell}>
        <Text style={styles.textLabel}>Flat</Text>
        <Text style={styles.textValue}>{`${stats.averageFlat || 0}`}</Text>
        {/* <Text style={styles.textValue}>{`${stats.percentageFlat || 0}`}</Text> */}
      </View>
      <View style={styles.cell}>
        <Text style={styles.textLabel}>Perfect</Text>
        <Text style={styles.textValue}>{`${stats.averagePerfect || 0}`}</Text>
        {/* <Text style={styles.textValue}>{`${stats.percentagePerfect || 0}`}</Text> */}
      </View>
      <View style={styles.cell}>
        <Text style={styles.textLabel}>Sharp</Text>
        <Text style={styles.textValue}>{`${stats.averageSharp || 0}`}</Text>
        {/* <Text style={styles.textValue}>{`${stats.percentageSharp || 0}`}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // backgroundColor: 'red',
  },
  cell: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textLabel: {
    color: 'white',
    fontSize: 14,
  },
  textValue: {
    color: 'white',
    fontSize: 64,
    fontFamily: 'Righteous',
  },
});

export {StatsBar};
