import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {notes} from './utils/mappings';

const MusicalNoteRadioGroup = ({selectedNote, onSelectNote = () => {}}) => {
  const rows = Math.ceil(notes.length / 2); // Calculate the number of rows
  const firstRow = notes.slice(0, rows);
  const secondRow = notes.slice(rows);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {firstRow.map(note => (
          <TouchableOpacity
            key={note}
            style={[styles.radioButton, selectedNote === note && styles.selectedButton]}
            onPress={() => onSelectNote(note)}>
            <Text style={[styles.radioText, selectedNote === note && styles.selectedText]}>{note}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.row}>
        {secondRow.map(note => (
          <TouchableOpacity
            key={note}
            style={[styles.radioButton, selectedNote === note && styles.selectedButton]}
            onPress={() => onSelectNote(note)}>
            <Text style={[styles.radioText, selectedNote === note && styles.selectedText]}>{note}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  radioButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: 'white', // White background for selected button
    borderColor: 'white', // White border color for selected button
  },
  radioText: {
    fontSize: 16,
    textAlign: 'center',
    color: 'black',
  },
  selectedText: {
    color: 'white', // White text color for selected button
  },
});

export default MusicalNoteRadioGroup;
