import React, {useRef, useState, useEffect, useCallback} from 'react';
import {PitchDetector} from 'react-native-pitch-detector';
import {getNoteMeta, mapNoteToValue} from '../utils/utils';
import {MetaObject, DataArray, PitchDataObject} from '../types/types';
import {DEFAULT_DATA, DEFAULT_META, DEFAULT_CHART_DATA} from '../utils/constants';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';
import negate from 'ramda/es/negate';
import LineChart from '../components/wave';
import {UserKey} from '../components/UserKey';
import {UserScale} from '../components/UserScale';
import ToneDisplay from '../components/ToneDisplay';
import RecordButton from '../components/RecordButton';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../stores/RootStoreProvider';
import {StatsBar} from '../components/StatsBar';

const PracticeScreen: React.FC = observer(() => {
  const {commonStore, statsStore} = useRootStore();
  const counter = useRef<number>(0);
  const [data, setData] = useState<PitchDataObject>(DEFAULT_DATA);
  const [chartData, setChartData] = useState<DataArray>(DEFAULT_CHART_DATA);
  const [metaData, setMetaData] = useState<MetaObject>(DEFAULT_META);
  const [isRecording, setIsRecording] = useState(false);
  const inTuneRange = commonStore.inTuneRange;

  const onRecord = useCallback(async (isStart: boolean) => {
    if (isStart) {
      await PitchDetector.start();
    } else {
      await PitchDetector.stop();
      setChartData(DEFAULT_CHART_DATA);
    }
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  }, []);

  useEffect(() => {
    PitchDetector.addListener(setData);
    return () => {
      PitchDetector.removeListener();
    };
  }, []);

  useEffect(() => {
    if (!data.frequency && !data.tone) {
      return;
    }

    // TODO: frequency > 67.60563659667969, how can we memoize
    const meta = getNoteMeta(data.frequency);
    setChartData(prevChartData => {
      let updatedChartData = [...prevChartData];
      // TODO: how can we make the chart animation of data shifting/adding with ease
      updatedChartData.length > 20 && updatedChartData.shift();
      updatedChartData.push({time: counter.current, hz: mapNoteToValue(meta, 'C2', true, inTuneRange)});
      return updatedChartData;
    });

    setMetaData(meta);
    // TODO: how can we use time here instead of counter inc
    counter.current = counter.current + 1;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    const {note, cents} = metaData;

    if (note && cents) {
      const type = cents < negate(inTuneRange) ? 'flats' : cents > inTuneRange ? 'sharps' : 'perfect';
      statsStore.addValue(type, note, cents);
    }
  }, [metaData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ToneDisplay audioData={metaData} />
          <LineChart data={chartData} />
          <View style={styles.infoBar}>
            <View style={styles.userKeyScale}>
              {/* <View style={styles.userControls}>
                <UserKey />
                <UserScale />
              </View> */}
              <View>
                <RecordButton startRecording={onRecord} isRecording={isRecording} />
              </View>
            </View>
            <StatsBar />
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#111',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    // backgroundColor: '#010101',
    backgroundColor: '#111',
  },
  gradient: {
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    margin: 10,
    marginBottom: 30,
    backgroundColor: '#555',
  },
  label: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  frequency: {
    fontSize: 20,
  },
  meta: {
    color: 'white',
    marginTop: 5,
    marginBottom: 10,
  },
  userKeyScale: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginTop: 10,
    // backgroundColor: 'gray',
  },
  userControls: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  infoBar: {
    flex: 1,
    // backgroundColor: '#000',
    backgroundColor: '#111',
    borderRadius: 10,
    // margin: 10,
  },
});

export default PracticeScreen;
