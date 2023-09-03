import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function ToneDisplay({tone, octave = 0}) {
  return (
    <View style={styles.toneContainer}>
      {/* <Text style={styles.octave}>{octave}</Text> */}
      <Text style={styles.tone}>{tone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toneContainer: {
    flex: 1,
    width: '100%',
    // marginTop: 60,
    // marginBottom: 30,
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tone: {
    color: '#fff',
    fontSize: 150,
    fontWeight: 'bold',
    fontFamily: 'Righteous',
    textAlign: 'center',
  },
  octave: {
    marginTop: 77,
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Righteous',
  },
});

export {ToneDisplay};
