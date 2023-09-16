import {makeAutoObservable} from 'mobx';
import {SCALES} from '../utils/constants';

export class CommonStore {
  accidental: string = '#';
  showOctave: boolean = true;
  showCents: boolean = true;
  showFrequency: boolean = false;
  showAxisLabel: boolean = true;
  inTuneRange: number = 5;
  userKey: string = 'C#';
  userScale: string[] = SCALES.MAJOR;

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

  toggleAxisLabel() {
    this.showAxisLabel = !this.showAxisLabel;
  }

  setInTuneRange(cent: number) {
    this.inTuneRange = cent;
  }

  setUserKey(key: string) {
    this.userKey = key;
  }

  setUserScale(scale: string) {
    this.userScale = SCALES[scale.toUpperCase()] || SCALES.MAJOR;
  }
}
