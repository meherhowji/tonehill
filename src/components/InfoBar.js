import React from 'react';
import {View, StyleSheet} from 'react-native';
import {UserKey} from './UserKey';
import {UserScale} from './UserScale';
import RecordButton from './RecordButton';
import {StatsBar} from './StatsBar';

function InfoBar({onRecord, isRecording}) {
  return (
    <View style={styles.infoBar}>
      <View style={styles.recordBar}>
        <View style={styles.selectKeyScale}>
          <UserKey />
          {/* <UserScale /> */}
        </View>
        <View>
          <RecordButton startRecording={onRecord} isRecording={isRecording} />
        </View>
      </View>
      {/* <StatsBar /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  infoBar: {
    flex: 0.4,
    // backgroundColor: 'rgba(0,0,255,0.5)',
  },
  recordBar: {
    // marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // marginTop: 10,
    // backgroundColor: 'gray',
  },
  selectKeyScale: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
});

export default InfoBar;
