import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';
import {useStopwatch} from '../utils/hooks/useStopwatch';

interface RecordButtonProps {
  isRecording: boolean;
  startRecording: (arg0: boolean) => void;
}

const RecordButton: React.FC<RecordButtonProps> = ({isRecording, startRecording}) => {
  console.log('🚀 ~ file: RecordButton.tsx:28 ~ RecordButton:');
  const {start, formattedTime} = useStopwatch();

  const goLive = () => {
    isRecording ? startRecording(false) : startRecording(true);
  };

  return (
    <View style={styles.recordBox}>
      <TouchableOpacity
        style={[styles.button, isRecording && styles.buttonLive]}
        onPress={() => {
          goLive();
          start();
        }}>
        <Text style={[styles.recordDot, isRecording && styles.recordDotLive]}>●</Text>
        <Text style={[styles.recordText, isRecording && styles.recordTextLive]}>
          {isRecording ? `RECORDING ${formattedTime}` : `RECORD`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  recordBox: {
    // padding: 15,
    // paddingBottom: 0,
    // alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  button: {
    // display: 'inline-flex',
    flexDirection: 'row',
    height: 30,
    padding: 5,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: 'rgb(38,18,9)',
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  reset: {
    marginLeft: 10,
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
