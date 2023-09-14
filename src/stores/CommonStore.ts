import {makeAutoObservable} from 'mobx';

export class CommonStore {
  accidental = '#';
  showOctave = true;
  showCents = true;
  showFrequency = false;
  inTuneRange = 5;

  constructor() {
    makeAutoObservable(this);
  }

  toggleAccidental() {
    this.accidental = this.accidental === '#' ? 'b' : '#';
  }

  toggleOctave() {
    this.showOctave = !this.showOctave;
  }

  toggleCents() {
    this.showCents = !this.showCents;
  }

  toggleFrequency() {
    this.showFrequency = !this.showFrequency;
  }

  setInTuneRange(v: number) {
    this.inTuneRange = v;
  }
}
