import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface RecordButtonProps {
  isRecording: boolean;
  startRecording: (arg0: boolean) => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({isRecording, startRecording}) => {
  const goLive = () => {
    isRecording ? startRecording(false) : startRecording(true);
  };
  return (
    <View style={styles.recordBox}>
      <TouchableOpacity style={[styles.button, isRecording && styles.buttonLive]} onPress={goLive}>
        <Text style={[styles.recordDot, isRecording && styles.recordDotLive]}>●</Text>
        <Text style={[styles.recordText, isRecording && styles.recordTextLive]}>
          {isRecording ? 'ON' : 'OFF'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recordBox: {
    padding: 15,
    // alignSelf: 'flex-end',
    // backgroundColor: 'magenta',
  },
  button: {
    // display: 'inline-flex',
    flexDirection: 'row',
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgb(38,18,9)',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLive: {
    backgroundColor: 'rgb(238,122,67)',
  },
  recordDot: {
    paddingRight: 5,
    fontSize: 12,
    color: 'rgb(238,122,67)',
  },
  recordDotLive: {color: 'rgb(27,1,1)'},
  recordText: {
    fontFamily: 'RobotoMono-Medium',
    color: 'rgb(238,122,67)',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  recordTextLive: {color: 'rgb(27,1,1)'},
});

export default RecordButton;
