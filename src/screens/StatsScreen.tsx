import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {screenBg} from '../styles/globals';
import {useRootStore} from '../stores';
import {StatsBar} from '../components/StatsBar';
import {observer} from 'mobx-react-lite';
import {notes} from '../utils/mappings';
import {DateTime} from 'luxon';
import LinearGradient from 'react-native-linear-gradient';

const StatsScreen = observer(() => {
  const {stats} = useRootStore();
  const selectedOctave = 1;
  const isToday = DateTime.now().day;

  const handleOctaveSelect = (v: any) => v;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={css.safeContainer}>
        <View style={css.container}>
          <Text style={css.settingHeader}>Stats</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={css.scrollContainer}>
            {Object.keys(stats.dateGroupByMonthYear).map((dateObj, index) => (
              <View key={index} style={css.gap5}>
                <View style={css.monthItem}>
                  <Text style={[css.monthText]}>{dateObj}</Text>
                </View>
                <View style={css.buttonView}>
                  {stats.dateGroupByMonthYear[dateObj].map((day, index) => (
                    <Pressable
                      key={index}
                      style={({pressed}) => [
                        css.dayItem,
                        {backgroundColor: pressed ? '#fff0' : 'rgb(45,48,57)'},
                        isToday === parseInt(day, 10) ? css.highlightToday : null,
                      ]}
                      onPress={() => handleOctaveSelect(dateObj)}>
                      <Text style={[css.dayText]}>{day}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={css.details}>
            <LinearGradient colors={['#1E1E1E', '#131300']} style={{borderRadius: 15}}>
              <View style={{padding: 15, borderRadius: 15, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 36, fontWeight: 'bold', color: 'white'}}>80%</Text>
                <Text style={{fontSize: 18, color: 'white'}}>You were in-tune 80% of the time</Text>
              </View>
            </LinearGradient>

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
    gap: 10,
    marginTop: 25,
    width: '100%',
  },
  details: {
    marginTop: 25,
    width: '100%',
  },
  settingHeader: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  dayItem: {
    width: 42,
    height: 44,
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  highlightToday: {
    borderWidth: 1,
    borderColor: '#fff5',
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
    fontSize: 21,
    fontWeight: 'bold',
    fontFamily: 'Inter-Regular',
    letterSpacing: -1,
    opacity: 1,
  },
  gap5: {
    gap: 5,
  },
  buttonView: {
    flexDirection: 'row',
    gap: 10,
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
});

export default StatsScreen;
