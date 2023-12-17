import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {screenBg} from '../styles/globals';
import {useRootStore} from '../stores';
import {observer} from 'mobx-react-lite';
import {DateTime} from 'luxon';
// import {StatsBar} from '../components/StatsBar';
// import {notes} from '../utils/mappings';
// import LinearGradient from 'react-native-linear-gradient';

const RenderPercentageBox: React.FC<{percentage: string; text: string}> = ({percentage, text}) => {
  return (
    <View style={css.percentageBox}>
      <Text style={css.percentageText}>{percentage}</Text>
      <Text style={css.percentageSubText}>{text}</Text>
    </View>
  );
};

const StatsScreen = observer(() => {
  const {stats} = useRootStore();
  const isToday = DateTime.now().day;
  const [sessionInADay, setSessionsInADay] = useState<number[]>([]);

  const handleOctaveSelect = (timestamps: number[]) => {
    setSessionsInADay(timestamps);
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={css.safeContainer}>
        <View style={css.container}>
          <Text style={css.settingHeader}>Stats</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={css.scrollContainer}>
            {Object.keys(stats.dateGroupByMonthYear).map((month, index) => (
              <View key={index}>
                <View style={css.monthItem}>
                  <Text style={[css.monthText]}>{month}</Text>
                </View>
                <View style={css.buttonView}>
                  {stats.dateGroupByMonthYear[month].map(({day, timestamps}) => (
                    <View key={day}>
                      <Pressable
                        style={({pressed}) => [
                          css.dayItem,
                          {backgroundColor: pressed ? '#fff0' : '#121212'},
                          isToday === parseInt(day, 10) ? css.highlightToday : null,
                        ]}
                        onPress={() => handleOctaveSelect(timestamps)}>
                        <Text style={[css.dayText]}>{day}</Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={[css.details]}>
            <View style={css.detailsRowItems}>
              <RenderPercentageBox percentage="80%" text={`Today you were in-tune ${80}% of the time`} />
              <RenderPercentageBox percentage="A#" text={`Your best note today, ${85}% accuracy.`} />
            </View>

            {/* <View style={{gap: 10}}>
              <LinearGradient colors={['#1E1E1E', '#121212']} style={{borderRadius: 15}}>
                <View style={css.overallBox}>
                  <Text style={css.overallTitle}>Overall</Text>
                  <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-between'}}>
                    {notes.map((note, index) => (
                      <Text key={index} style={css.overallNote}>
                        {note}
                      </Text>
                    ))}
                  </View>
                </View>
              </LinearGradient>
            </View> */}
          </View>

          {/* TODO:
           * Make this secion show stat for the current session
           * Also, make a common component to achieve this
           */}
          <View>
            {sessionInADay.map(session => {
              return (
                <Text key={session} style={{color: 'white'}}>
                  {session}
                </Text>
              );
            })}
          </View>

          {/* <StatsBar /> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const css = StyleSheet.create({
  safeContainer: {
    ...screenBg,
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 50,
    paddingTop: 50,
    flexDirection: 'column',
  },
  scrollContainer: {
    gap: 5,
    marginTop: 25,
    width: '100%',
  },
  details: {
    gap: 20,
    marginTop: 30,
    width: '100%',
  },
  detailsRowItems: {
    flexDirection: 'row',
    gap: 15,
  },
  settingHeader: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  dayItem: {
    width: 44,
    height: 40,
    borderRadius: 2,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightToday: {
    borderWidth: 1,
    borderColor: '#fff3',
    borderRadius: 2,
  },
  monthItem: {
    marginBottom: 10,
  },
  monthText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
    opacity: 1,
  },
  dayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
    letterSpacing: -1,
    opacity: 1,
  },
  buttonView: {
    flexDirection: 'row',
    gap: 5,
  },
  overallBox: {
    padding: 15,
  },
  overallTitle: {
    color: 'white',
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
    opacity: 1,
  },
  overallNote: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
    paddingLeft: 5,
    paddingTop: 3,
  },
  percentageBox: {
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
    flex: 1,
    // borderRadius: 30,
  },
  percentageText: {fontSize: 28, color: '#e6e6e6', fontFamily: 'Inter-ExtraBold'},
  percentageSubText: {fontSize: 13, color: '#e6e6e6', textAlign: 'center', marginTop: 5},
});

export default StatsScreen;
