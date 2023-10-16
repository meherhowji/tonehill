import React, {useRef, useState, useEffect} from 'react';
import {PitchDetector} from 'react-native-pitch-detector';
import {getNoteMeta, mapNoteToValue} from '../utils/utils';
import {MetaObject, DataArray, PitchDataObject} from '../types/types';
import {DEFAULT_DATA, DEFAULT_META, DEFAULT_CHART_DATA, FREQUENCY_PRECISION} from '../utils/constants';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';
import negate from 'ramda/es/negate';
import LineChart from '../components/LineChart';
import ToneDisplay from '../components/ToneDisplay';
import {observer} from 'mobx-react-lite';
import {useRootStore} from '../stores';
import InfoBar from '../components/InfoBar';
import {screenBg, screenMargin} from '../styles/globals';
// import {getTimeZone} from 'react-native-localize';
import {DateTime} from 'luxon';
import SessionSaveModal from '../components/SessionSaveModal';

const PracticeScreen: React.FC = observer(() => {
  const {common, stats} = useRootStore();
  const counter = useRef<number>(0);
  const [data, setData] = useState<PitchDataObject>(DEFAULT_DATA);
  const [chartData, setChartData] = useState<DataArray>(DEFAULT_CHART_DATA);
  const [metaData, setMetaData] = useState<MetaObject>(DEFAULT_META);
  const [isRecording, setIsRecording] = useState(false);
  const [showSessionSaveModal, setShowSessionSaveModal] = useState(false);
  const [sessionId, setSessionId] = useState<null | number>(null); // use timestamp as sessionId
  const inTuneRange = common.inTuneRange;
  // console.log(DateTime.now().toMillis(), Date.now(), getTimeZone(), ' <><><><><><><> ');

  const onRecord = async (isStart: boolean) => {
    if (isStart) {
      await PitchDetector.start();
      const timestamp = DateTime.now().toMillis(); // timestamp contains no TZ, hence luxon package
      setSessionId(timestamp);
    } else {
      await PitchDetector.stop();
      setSessionId(null); // reset timestamp
      setShowSessionSaveModal(true);
    }
    const status = await PitchDetector.isRecording();
    setIsRecording(status);
  };

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

    const simpleFrequency = parseFloat(data.frequency.toFixed(FREQUENCY_PRECISION)); // NOTE: accuracy reduction
    const meta = getNoteMeta(simpleFrequency); // get note, accuracy, cents
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

    // sessionId can be null in that we don't want to store any data as it indicated the record button is OFF
    if (note && cents && sessionId) {
      const type = cents < negate(inTuneRange) ? 'flats' : cents > inTuneRange ? 'sharps' : 'perfect';
      stats.addValue(type, note, cents, sessionId);
    }
  }, [metaData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <InfoBar onRecord={onRecord} isRecording={isRecording} />
          <ToneDisplay audioData={metaData} />
          <LineChart data={chartData} />
          <SessionSaveModal visible={showSessionSaveModal} onSetModalVisible={setShowSessionSaveModal} />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const styles = StyleSheet.create({
  safeContainer: {
    ...screenBg,
    flex: 1,
  },
  container: {
    ...screenMargin,
    flex: 1,
    flexDirection: 'column',
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
});

export default PracticeScreen;
