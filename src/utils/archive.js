
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
