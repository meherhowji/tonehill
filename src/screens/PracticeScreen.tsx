import React, {useRef, useState, useEffect} from 'react';
import {PitchDetector} from 'react-native-pitch-detector';
import {findNearestNote, mapNoteToValue, calculateAverage} from '../utils/utils';
import {MetaObject, DynamicObject, DataArray, PitchDataObject} from '../types/types';
import {DEFAULT_DATA, DEFAULT_META, DEFAULT_CHART_DATA, CENT_THRESHOLD} from '../utils/constants';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {View} from 'react-native';
import LineChart from '../components/wave';
import LinearGradient from 'react-native-linear-gradient';
// import {StatsBar} from '../components/StatsBar';
import {UserKey} from '../components/UserKey';
import {UserScale} from '../components/UserScale';
import ToneDisplay from '../components/ToneDisplay';
import {styles} from '../styles/styles';
import RecordButton from '../components/RecordButton';

const PracticeScreen: React.FC = () => {
  const counter = useRef<number>(0);
  const [stats, setStats] = useState<DynamicObject>({});
  const [data, setData] = useState<PitchDataObject>(DEFAULT_DATA);
  const [chartData, setChartData] = useState<DataArray>(DEFAULT_CHART_DATA);
  const [metaData, setMetaData] = useState<MetaObject>(DEFAULT_META);
  const [isRecording, setIsRecording] = useState(false);

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
    if (typeof data.frequency !== 'number' || !data.tone) {
      return;
    }

    const meta = findNearestNote(data.frequency);
    setChartData(prevChartData => {
      let updatedChartData = [...prevChartData];
      updatedChartData.length > 25 && updatedChartData.shift();
      updatedChartData.push({time: counter.current, hz: mapNoteToValue(meta, 'C2', true)});
      return updatedChartData;
    });

    setMetaData(meta);
    counter.current = counter.current + 1;
  }, [data]);

  useEffect(() => {
    const note = metaData.note;
    const newnote = metaData.cents;
    const obj = {...stats};
    const ct = CENT_THRESHOLD;

    if (note && obj[note] && newnote) {
      if (newnote < ct * -1) {
        obj[note].flat.push(newnote);
      } else if (newnote > ct) {
        obj[note].sharp.push(newnote);
      } else {
        obj[note].perfect.push(newnote);
      }

      // Calculate the average values for flat, sharp, and perfect arrays
      const flatArray = obj[note]?.flat || [];
      const sharpArray = obj[note]?.sharp || [];
      const perfectArray = obj[note]?.perfect || [];

      const averageFlat = calculateAverage(flatArray);
      const averageSharp = calculateAverage(sharpArray);
      const averagePerfect = calculateAverage(perfectArray);

      // Calculate the percentages relative to the total length of notes
      const totalNotesLength = flatArray.length + sharpArray.length + perfectArray.length;
      const rawPercentageFlat = (flatArray.length / totalNotesLength) * 100;
      const rawPercentageSharp = (sharpArray.length / totalNotesLength) * 100;
      const rawPercentagePerfect = (perfectArray.length / totalNotesLength) * 100;

      // Calculate rounded percentages
      const roundedPercentageFlat = Math.round(rawPercentageFlat);
      const roundedPercentageSharp = Math.round(rawPercentageSharp);
      const roundedPercentagePerfect = Math.round(rawPercentagePerfect);

      // Adjust one of the rounded percentages to ensure the total is exactly 100%
      const totalRoundedPercentage = roundedPercentageFlat + roundedPercentageSharp + roundedPercentagePerfect;
      const adjustment = 100 - totalRoundedPercentage;
      const adjustedPercentages = [roundedPercentageFlat, roundedPercentageSharp, roundedPercentagePerfect];

      // Apply the adjustment to the first non-zero percentage
      for (let i = 0; i < adjustedPercentages.length; i++) {
        if (adjustedPercentages[i] !== 0) {
          adjustedPercentages[i] += adjustment;
          break;
        }
      }

      obj[note] = {
        ...stats[note],
        stats: {
          averageFlat,
          averageSharp,
          averagePerfect,
          percentageFlat: adjustedPercentages[0],
          percentageSharp: adjustedPercentages[1],
          percentagePerfect: adjustedPercentages[2],
        },
      };
      setStats(obj);
    } else if (newnote && note) {
      obj[note] = {
        flat: newnote < ct * -1 ? [newnote] : [],
        sharp: newnote > ct ? [newnote] : [],
        perfect: newnote < ct && newnote > ct * -1 ? [newnote] : [],
      };
      setStats(obj);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [metaData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
            <LinearGradient colors={['rgb(2,8,15)', 'rgb(11,18,28)', 'rgb(2,8,15)']} style={styles.gradient}>
            <ToneDisplay audioData={metaData} />
            <LineChart data={chartData} />
            <View
              style={{
                flex: 0.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                // backgroundColor: 'white',
                alignItems: 'start',
              }}>
              <UserKey />
              <UserScale />
              <RecordButton startRecording={onRecord} isRecording={isRecording} />
            </View>
            {/* <StatsBar stats={stats} /> */}
          </LinearGradient>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default PracticeScreen;
