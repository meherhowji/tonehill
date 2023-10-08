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
import {useRootStore} from '../stores/RootStoreProvider';
import InfoBar from '../components/InfoBar';
import {screenBg, screenMargin} from '../styles/globals';

const PracticeScreen: React.FC = observer(() => {
  const {commonStore, statsStore} = useRootStore();
  const counter = useRef<number>(0);
  const [data, setData] = useState<PitchDataObject>(DEFAULT_DATA);
  const [chartData, setChartData] = useState<DataArray>(DEFAULT_CHART_DATA);
  const [metaData, setMetaData] = useState<MetaObject>(DEFAULT_META);
  const [isRecording, setIsRecording] = useState(false);
  const inTuneRange = commonStore.inTuneRange;

  const onRecord = async (isStart: boolean) => {
    if (isStart) {
      await PitchDetector.start();
    } else {
      await PitchDetector.stop();
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
          <InfoBar onRecord={onRecord} isRecording={isRecording} />
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
