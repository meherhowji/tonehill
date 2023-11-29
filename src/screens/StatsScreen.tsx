import React from 'react';
import {View, Text, StyleSheet, ScrollView, Pressable} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {screenBg} from '../styles/globals';
import {useRootStore} from '../stores';
import {StatsBar} from '../components/StatsBar';
import {observer} from 'mobx-react-lite';

const StatsScreen = observer(() => {
  const {stats} = useRootStore();
  const selectedOctave = 1;

  const handleOctaveSelect = (v: any) => v;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={css.safeContainer}>
        <View style={css.container}>
          <Text style={css.settingHeader}>Stats</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={css.scrollContainer}>
            {Object.keys(stats.dateGroupByMonthYear).map((dateObj, index) => (
              <View key={index}>
                <View style={css.monthItem}>
                  <Text style={[css.monthText, {opacity: 1}]}>{dateObj}</Text>
                </View>
                <View style={{flexDirection: 'row', gap: 10}}>
                  {stats.dateGroupByMonthYear[dateObj].map((day, index) => (
                    <Pressable
                      key={index}
                      style={({pressed}) => [css.dayItem, {backgroundColor: pressed ? '#fff0' : 'rgb(45,48,57)'}]}
                      onPress={() => handleOctaveSelect(dateObj)}>
                      <Text style={[css.dayText, {opacity: 1}]}>{day}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            ))}
          </ScrollView>

          {/* <StatsBar /> */}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
});

const css = StyleSheet.create({
  safeContainer: {
    flex: 1,
    ...screenBg,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 50,
    paddingTop: 50,
    height: '100%',
    minHeight: 0,
  },
  scrollContainer: {
    flexDirection: 'row',
    marginTop: 25,
    alignSelf: 'flex-start',
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
  monthItem: {marginBottom: 10},
  monthText: {color: 'white', fontSize: 18, fontWeight: 'bold', fontFamily: 'Inter-Regular'},
  dayText: {color: 'white', fontSize: 21, fontWeight: 'bold', fontFamily: 'Inter-Regular', letterSpacing: -1},
});

export default StatsScreen;
