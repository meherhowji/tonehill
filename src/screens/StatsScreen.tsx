import React from 'react';
import {View, Text, StyleSheet, ScrollView, TouchableHighlight} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';
import {screenBg} from '../styles/globals';

const StatsScreen = () => {
  const selectedOctave = 1;
  const handleOctaveSelect = (v: any) => v;
  return (
    <SafeAreaProvider>
      <SafeAreaView style={css.safeContainer}>
        <View style={css.container}>
          <Text style={css.settingHeader}>Stats</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={css.scrollContainer}>
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((octave, index) => (
              <View key={index} style={[css.noteItem, {opacity: selectedOctave === octave ? 1 : 0.4}]}>
                <TouchableHighlight style={css.cell} underlayColor={'#fff0'} onPress={() => handleOctaveSelect(octave)}>
                  <Text style={[css.noteText, {opacity: selectedOctave === octave ? 1 : 0.4}]}>{octave}</Text>
                </TouchableHighlight>
              </View>
            ))}
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

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
  scrollContainer: {},
  cell: {},
  noteItem: {backgroundColor: 'transparent', padding: 15, fontSize: 14},
  noteText: {color: 'white', fontSize: 32},
});

export default StatsScreen;
