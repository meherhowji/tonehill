import {makeAutoObservable} from 'mobx';

export class StatsStore {
  sums: Record<string, Record<string, number>> = {
    flats: {},
    sharps: {},
    perfect: {},
  };

  counts: Record<string, Record<string, number>> = {
    flats: {},
    sharps: {},
    perfect: {},
  };

  constructor() {
    makeAutoObservable(this);
  }

  addValue(note: string, type: string, value: number) {
    if (!this.sums[type][note]) {
      this.sums[type][note] = 0;
      this.counts[type][note] = 0;
    }

    this.sums[type][note] += value;
    this.counts[type][note] += 1;
  }

  get runningAverage(): Record<string, Record<string, number>> {
    const averages: Record<string, Record<string, number>> = {};

    for (const type in this.sums) {
      if (Object.prototype.hasOwnProperty.call(this.sums, type)) {
        averages[type] = {};
        for (const note in this.sums[type]) {
          if (Object.prototype.hasOwnProperty.call(this.sums[type], note) && this.counts[type][note] > 0) {
            averages[type][note] = this.sums[type][note] / this.counts[type][note];
          } else {
            averages[type][note] = 0;
          }
        }
      }
    }

    return averages;
  }
}

// runningAvgStore.addValue('flats', 'C', 5);
// runningAvgStore.addValue('sharps', 'D', 10);
// runningAvgStore.addValue('perfect', 'E', 5);
// runningAvgStore.addValue('flats', 'C', 4);
// runningAvgStore.addValue('sharps', 'D', 1);
// runningAvgStore.addValue('perfect', 'E', 3);

// console.log('Running averages:', runningAvgStore.runningAverage);
