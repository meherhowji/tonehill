import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
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
            {stats.daysFromSession.map((dateObj, index) => (
              <View>
                <View style={css.monthItem}>
                  <Text style={[css.monthText, {opacity: 1}]}>{`${dateObj.month} ${dateObj.year}`}</Text>
                </View>
                <View key={index} style={[css.dayItem, {opacity: 1}]}>
                  <TouchableHighlight
                    style={css.cell}
                    underlayColor={'#fff0'}
                    onPress={() => handleOctaveSelect(dateObj)}>
                    <Text style={[css.dayText, {opacity: 1}]}>{dateObj.day}</Text>
                  </TouchableHighlight>
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
    // backgroundColor: 'red'
  },
  settingHeader: {
    fontSize: 45,
    color: 'white',
    fontFamily: 'Inter-Bold',
  },
  scrollContainer: {marginTop: 25, backgroundColor: 'rgba(0,255,0,0)'},
  cell: {},
  dayItem: {
    backgroundColor: 'gray',
    width: 40,
    height: 40,
    borderRadius: 8,
    color: 'white',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
	monthItem: {marginBottom: 10},
  monthText: {color: 'white', fontSize: 20, fontWeight: 'bold', fontFamily: 'Inter-Regular'},
  dayText: {color: 'white', fontSize: 24, fontWeight: 'bold', fontFamily: 'Inter-Regular', letterSpacing: -1},
});

export default StatsScreen;
