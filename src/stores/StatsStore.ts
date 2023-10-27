import {makeAutoObservable} from 'mobx';
import {hydrateStore, makePersistable, PersistStoreMap} from 'mobx-persist-store';
import {DateTime} from 'luxon';

/**
 * `StatsStore` is a MobX store for calculating running averages and percentages of musical notes.
 * It keeps track of the sums and counts for three types of notes: flats, sharps, and perfect.
 */
export class StatsStore implements IStore {
  data: Record<number, TimestampedNoteData[]> = {};

  /**
   * Object to store the sums of different types and notes.
   * Example: {flats: {C: 10, D: 5}, sharps: {C: 5, D: 10}, perfect: {C: 0, D: 0}}
   */
  // sums: Record<string, Record<string, number>> = {
  //   flats: {},
  //   sharps: {},
  //   perfect: {},
  // };

  /**
   * Object to store the counts of different types and notes.
   * Example: {flats: {C: 2, D: 1}, sharps: {C: 1, D: 2}, perfect: {C: 0, D: 0}}
   */
  // counts: Record<string, Record<string, number>> = {
  //   flats: {},
  //   sharps: {},
  //   perfect: {},
  // };

  // Property to store the current cent value.
  
	cents: number = 0;
  // Property to store timestamps
  timestamps: number[] = [];

  constructor() {
    makeAutoObservable(this);

    // REF: https://github.com/quarrant/mobx-persist-store/issues/64
    const persist = () => {
      makePersistable(this, {
        name: StatsStore.name,
        properties: ['data', 'cents', 'timestamps'],
      });
    };

    const persistedStore = Array.from(PersistStoreMap.values()).find(el => el.storageName.includes(StatsStore.name));
    persistedStore && persistedStore.stopPersisting();
    persist();
  }

  /**
   * Adds a new value for a specific type and note and updates the sums and counts accordingly.
   * @param type - The type of the note (flats, sharps, or perfect)
   * @param note - The musical note (e.g., 'C', 'D')
   * @param value - The value to add
   * @param timestamp - The session-id is timestamp
   */
  addValue(type: string, note: string, value: number, timestamp: number) {
    const noteData: TimestampedNoteData = {type, note, value};

    if (!this.data[timestamp]) {
      this.data[timestamp] = [];
    }

    if (!this.timestamps.includes(timestamp)) {
      this.timestamps.push(timestamp);
    }

    this.data[timestamp].push(noteData);
    this.cents = value;
  }

  // Get all the data associated with a specific timestamp
  getDataByTimestamp(timestamp: number): TimestampedNoteData[] {
    return this.data[timestamp] || [];
  }

  /**
   * Get all timestamps for a specific day.
   * @param date - The date for which you want to fetch timestamps.
   * @returns An array of timestamps for the specified day.
   */
  getTimestampsForDay(date: Date): number[] {
    const dayTimestamps: number[] = [];

    // Iterate through all timestamps and check if they belong to the specified day
    for (const timestamp of Object.keys(this.data).map(Number)) {
      const timestampDate = new Date(timestamp);
      if (
        timestampDate.getDate() === date.getDate() &&
        timestampDate.getMonth() === date.getMonth() &&
        timestampDate.getFullYear() === date.getFullYear()
      ) {
        dayTimestamps.push(timestamp);
      }
    }

    return dayTimestamps;
  }

  /**
   * Get a list of unique days from the stored timestamps.
   * @returns An array of unique Luxon DateTime objects representing days.
   */
  get daysFromSession(): Array<{day: string; month: string; year: string}> {
    const uniqueDays: Set<string> = new Set();

    // Iterate through all timestamps and add their corresponding days to the set
    for (const timestamp of Object.keys(this.data).map(Number)) {
      const timestampDate = DateTime.fromMillis(timestamp).toFormat('dd-LLLL-yyyy');
      timestampDate && uniqueDays.add(timestampDate);
    }

    // Convert the set to an array of Luxon DateTime objects
    return Array.from(uniqueDays).map(date => {
      const [day, month, year] = date.split('-');
      return {day, month, year};
    });
  }

  /**
   * Get a list of all timestamps associated with the recorded data.
   * @returns An array of timestamps.
   */
  get sessions(): number[] {
    return Object.keys(this.data).map(timestamp => parseInt(timestamp));
  }

  /**
   * Calculates the running averages and percentages of notes based on the stored data.
   * @returns A record containing running averages and percentages for each type and note.
   */
  details(timestamp: number): Record<string, Record<string, NoteStatistics>> {
    const data = this.getDataByTimestamp(timestamp);
    const result: Record<string, Record<string, NoteStatistics>> = {};

    for (const noteData of data) {
      const {type, note, value} = noteData;

      if (!result[type]) {
        result[type] = {};
      }

      if (!result[type][note]) {
        result[type][note] = {average: 0, percentage: 0, count: 0};
      }

      // Update the average and count
      result[type][note].average =
        (result[type][note].average * result[type][note].count + value) / (result[type][note].count + 1);
      result[type][note].count += 1;

      // Calculate percentages
      const totalNotes = Object.values(result[type]).reduce((total, noteStatistics) => total + noteStatistics.count, 0);

      for (const n in result[type]) {
        result[type][n].percentage = (result[type][n].count / totalNotes) * 100;
      }
    }

    return result;
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

  deleteSession(sessionId: number) {
    if (this.data[sessionId]) {
      delete this.data[sessionId];
    }

		const timestampIndex = this.timestamps.indexOf(sessionId);
    if (timestampIndex !== -1) {
      this.timestamps.splice(timestampIndex, 1);
    }
  }

  // Hydration
  hydrate = async (): PVoid => {
    await hydrateStore(this);
  };
}
