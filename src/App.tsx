import React, {useRef, useState, useEffect} from 'react';
import {View} from 'react-native';
import {PitchDetector} from 'react-native-pitch-detector';
import LineChart from './chart/wave';
import {findNearestNote, mapNoteToValue, calculateAverage} from './utils/utils';
import {MetaObject, DynamicObject, DataArray, PitchDataObject} from './types/types';
import {DEFAULT_DATA, DEFAULT_META, DEFAULT_CHART_DATA, CENT_THRESHOLD} from './utils/constants';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {StatsBar} from './StatsBar';
import {ToneDisplay} from './ToneDisplay';
import {PitchGraph} from './chart/pitchGraph';
import {styles} from './styles';

export default function App() {
  const counter = useRef<number>(0);
  const [stats, setStats] = useState<DynamicObject>({});
  const [data, setData] = useState<PitchDataObject>(DEFAULT_DATA);
  const [chartData, setChartData] = useState<DataArray>(DEFAULT_CHART_DATA);
  const [metaData, setMetaData] = useState<MetaObject>(DEFAULT_META);

  // const reset = () => {
  //   setChartData([]);
  //   avg.current = {};
  // };

  useEffect(() => {
    PitchDetector.addListener(setData);
    PitchDetector.start();
    return () => {
      PitchDetector.removeListener();
    };
  }, []);

  useEffect(() => {
    if (typeof data.frequency === 'number') {
      let newData, nextData;
      let meta = findNearestNote(data.frequency);
      if (meta.note !== null) {
        let _data = mapNoteToValue(meta, 'C2', true);

        if (chartData.length > 25) {
          newData = [...chartData];
          newData.shift();
          nextData = [...newData, {time: counter.current, hz: _data}];
        } else {
          nextData = [...chartData, {time: counter.current, hz: _data}];
        }
        setChartData(nextData);
        counter.current = counter.current + 1;
        setMetaData(meta);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
  }, [metaData]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <LinearGradient colors={['rgb(32,38,45)', 'rgb(41,48,58)', 'rgb(32,38,45)']} style={styles.gradient}>
            <ToneDisplay tone={data?.tone} />
            <LineChart data={chartData} />
            <StatsBar stats={stats} />
            {/* <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={reset}>
                <Text style={styles.label}>Start New Session</Text>
              </TouchableOpacity>
            </View> */}
          </LinearGradient>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
