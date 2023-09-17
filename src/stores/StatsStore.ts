import {makeAutoObservable} from 'mobx';
import * as R from 'ramda';

interface NoteStatistics {
  average: number;
  percentage: number;
}

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

  cents: number = 0;

  constructor() {
    makeAutoObservable(this);
  }

  addValue(type: string, note: string, value: number) {
    // Initialize the sums and counts for all types and notes if they don't exist
    for (const t of ['flats', 'sharps', 'perfect']) {
      if (!this.sums[t]) {
        this.sums[t] = {};
        this.counts[t] = {};
      }

      if (!this.sums[t][note]) {
        this.sums[t][note] = 0;
        this.counts[t][note] = 0;
      }
    }
    this.cents = value;
    this.sums[type][note] += value;
    this.counts[type][note] += 1;
  }

  get data(): Record<string, Record<string, NoteStatistics>> {
    const data: Record<string, Record<string, NoteStatistics>> = {};

    // only 3 types so not an expensive loop
    for (const type in this.sums) {
      if (R.has(type)(this.sums)) {
        data[type] = {};

        for (const note in this.sums[type]) {
          if (R.has(note)(this.sums[type]) && this.counts[type][note] > 0) {
            const totalNoteCount = Object.values(this.counts).reduce(
              (total, typeCounts) => total + (typeCounts[note] || 0),
              0,
            );

            const percentage = (this.counts[type][note] / totalNoteCount) * 100;

            data[type][note] = {
              average: Math.round((this.sums[type][note] / this.counts[type][note]) * 100) / 100,
              percentage: Math.round(percentage * 100) / 100,
            };
          } else {
            data[type][note] = {
              average: 0,
              percentage: 0,
            };
          }
        }
      }
    }

    return data;
  }
}
