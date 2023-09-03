/* eslint-disable react-native/no-inline-styles */
import React, {useState, memo} from 'react';
import {View, Text, ScrollView, StyleSheet, TouchableHighlight} from 'react-native';
import {notes} from './utils/frequencyToNote';
import LinearGradient from 'react-native-linear-gradient';

export function MusicalNotePicker({onNoteSelect}) {
  const [selectedNote, setSelectedNote] = useState('C#');
  const [selectedOctave, setSelectedOctave] = useState(3);

  const handleNoteSelect = note => {
    setSelectedNote(note);
    onNoteSelect(String(note + selectedOctave));
  };

  const handleOctaveSelect = octave => {
    setSelectedOctave(octave);
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {notes.map((note, index) => (
          <View key={index} style={[styles.noteItem, {opacity: selectedNote === note ? 1 : 0.4}]}>
            <LinearGradient colors={selectedNote === note ? ['#68defb', '#d76aff'] : ['#fff0']} style={styles.gradient}>
              <TouchableHighlight style={styles.cell} underlayColor={'#fff0'} onPress={() => handleNoteSelect(note)}>
                <Text style={[styles.noteText, {opacity: selectedNote === note ? 1 : 0.4}]}>{note}</Text>
              </TouchableHighlight>
            </LinearGradient>
          </View>
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((octave, index) => (
          <View key={index} style={[styles.noteItem, {opacity: selectedOctave === octave ? 1 : 0.4}]}>
            <TouchableHighlight style={styles.cell} underlayColor={'#fff0'} onPress={() => handleOctaveSelect(octave)}>
              <Text style={[styles.noteText, {opacity: selectedOctave === octave ? 1 : 0.4}]}>{octave}</Text>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  gradient: {
    flex: 1,
    width: '100%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noteItem: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  noteText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  cell: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const MemoisedNotePicker = memo(MusicalNotePicker);
