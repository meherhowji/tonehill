import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

function ToneDisplay({tone}) {
  return (
    <View style={styles.toneContainer}>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  tone: {
    color: '#fff',
    fontSize: 150,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
});

export {ToneDisplay};
