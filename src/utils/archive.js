//   // If the provided key is not valid, return the default diatonic notes
//   return notes;
// }

// function getFrequenciesBetween(noteStart, noteEnd) {
//   const frequencies = [];

//   // Find the indices of the start and end notes
//   const startIndex = Object.keys(noteToFrequency).indexOf(noteStart);
//   const endIndex = Object.keys(noteToFrequency).indexOf(noteEnd);

//   if (startIndex === -1 || endIndex === -1) {
//     throw new Error('Invalid note names provided.');
//   }

//   // Extract frequencies between the start and end indices
//   for (let i = startIndex; i <= endIndex; i++) {
//     const note = Object.keys(noteToFrequency)[i];
//     frequencies.push(noteToFrequency[note]);
//   }

//   return frequencies;
// }

// const start = async () => {
// await PitchDetector.start();
// const status = await PitchDetector.isRecording();
// setIsRecording(status);
// };

// const stop = async () => {
// await PitchDetector.stop();
// const status = await PitchDetector.isRecording();
// setIsRecording(status);
// };

/* <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((octave, index) => (
          <View key={index} style={[styles.noteItem, {opacity: selectedOctave === octave ? 1 : 0.4}]}>
            <TouchableHighlight style={styles.cell} underlayColor={'#fff0'} onPress={() => handleOctaveSelect(octave)}>
              <Text style={[styles.noteText, {opacity: selectedOctave === octave ? 1 : 0.4}]}>{octave}</Text>
            </TouchableHighlight>
          </View>
        ))}
      </ScrollView> */

{
  /* <View style={[styles.row, styles.lastRow]}>
        <View style={styles.cell}>
          <TouchableOpacity style={styles.cell} onPress={() => setToggleFlat(!toggleFlat)}>
            <Text style={styles.textLabel}>Flat</Text>
            {toggleFlat ? (
              <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.averageFlat || 0}`}</Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.percentageFlat || 0}`}</Text>
                <Text style={styles.percentSymbol}>%</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cell}>
          <TouchableOpacity style={styles.cell} onPress={() => setTogglePerfect(!togglePerfect)}>
            <Text style={styles.textLabel}>Perfect</Text>
            {togglePerfect ? (
              <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.averagePerfect || 0}`}</Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.percentagePerfect || 0}`}</Text>
                <Text style={styles.percentSymbol}>%</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.cell}>
          <TouchableOpacity style={styles.cell} onPress={() => setToggleSharp(!toggleSharp)}>
            <Text style={styles.textLabel}>Sharp</Text>
            {toggleSharp ? (
              <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.averageSharp || 0}`}</Text>
            ) : (
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.textValue}>{`${data[selectedNote]?.stats?.percentageSharp || 0}`}</Text>
                <Text style={styles.percentSymbol}>%</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>
      </View> */
}
