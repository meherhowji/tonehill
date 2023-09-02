// function getNotesInKey(musicalKey, scaleIntervals) {
//   // Example usage
//   // const musicalKey = 'D'; // Change this to the desired key
//   // const majorScaleIntervals = [2, 2, 1, 2, 2, 2, 1]; // Major scale intervals
//   // const notesInKey = getNotesInKey(musicalKey, majorScaleIntervals);
//   const selectedKey = musicalKey.toUpperCase();

//   if (notes.includes(selectedKey)) {
//     const keyIndex = notes.indexOf(selectedKey);

//     const notesInKey = [selectedKey];
//     let currentNoteIndex = keyIndex;

//     for (const interval of scaleIntervals) {
//       currentNoteIndex += interval;
//       if (currentNoteIndex >= notes.length) {
//         currentNoteIndex -= notes.length;
//       }
//       notesInKey.push(notes[currentNoteIndex]);
//     }

//     return notesInKey;
//   }

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
