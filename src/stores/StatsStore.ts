import {makeAutoObservable} from 'mobx';
import * as R from 'ramda';
import {hydrateStore, makePersistable} from 'mobx-persist-store';

/**
 * `StatsStore` is a MobX store for calculating running averages and percentages of musical notes.
 * It keeps track of the sums and counts for three types of notes: flats, sharps, and perfect.
 */
export class StatsStore implements IStore {
  /**
   * Object to store the sums of different types and notes.
   * Example: {flats: {C: 10, D: 5}, sharps: {C: 5, D: 10}, perfect: {C: 0, D: 0}}
   */
  sums: Record<string, Record<string, number>> = {
    flats: {},
    sharps: {},
    perfect: {},
  };

  /**
   * Object to store the counts of different types and notes.
   * Example: {flats: {C: 2, D: 1}, sharps: {C: 1, D: 2}, perfect: {C: 0, D: 0}}
   */
  counts: Record<string, Record<string, number>> = {
    flats: {},
    sharps: {},
    perfect: {},
  };

  /**
   * Property to store the cents value.
   */
  cents: number = 0;

  constructor() {
    makeAutoObservable(this);

    makePersistable(this, {
      name: StatsStore.name,
      properties: ['sums', 'counts', 'cents'],
    });
  }

  /**
   * Adds a new value for a specific type and note and updates the sums and counts accordingly.
   * @param type - The type of the note (flats, sharps, or perfect).
   * @param note - The musical note (e.g., 'C', 'D').
   * @param value - The value to add.
   */
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

  /**
   * Calculates the running averages and percentages of notes based on the stored data.
   * @returns A record containing running averages and percentages for each type and note.
   */
  get data(): Record<string, Record<string, NoteStatistics>> {
    const data: Record<string, Record<string, NoteStatistics>> = {};

    // Loop through the types (flats, sharps, perfect)
    for (const type in this.sums) {
      if (R.has(type)(this.sums)) {
        data[type] = {};

        // Loop through the notes within the type
        for (const note in this.sums[type]) {
          if (R.has(note)(this.sums[type]) && this.counts[type][note] > 0) {
            const totalNoteCount = Object.values(this.counts).reduce(
              (total, typeCounts) => total + (typeCounts[note] || 0),
              0,
            );
            // Calculate the percentage of the current note within its type
            const percentage = (this.counts[type][note] / totalNoteCount) * 100;
            // Store the average and percentage for the current type and note
            data[type][note] = {
              average: Math.round((this.sums[type][note] / this.counts[type][note]) * 100) / 100,
              percentage: Math.round(percentage * 100) / 100,
            };
          } else {
            // Initialize with default values if no data exists
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

  get toneLabelColor(): string {
    // TODO: put StatsStore value, intunerange here
    return this.cents > -5 && this.cents < 5 ? '#B5FF00' : '#FFFFFF';
  }

  // Unified set methods
  set<T extends StoreKeysOf<StatsStore>>(what: T, value: StatsStore[T]) {
    (this as StatsStore)[what] = value;
  }
  setMany<T extends StoreKeysOf<StatsStore>>(obj: Record<T, StatsStore[T]>) {
    for (const [k, v] of Object.entries(obj)) {
      this.set(k as T, v as StatsStore[T]);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
