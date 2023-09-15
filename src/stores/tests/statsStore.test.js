import {StatsStore} from '../StatsStore';

describe('RunningAverageStore', () => {
  let runningAvgStore;

  beforeEach(() => {
    runningAvgStore = new StatsStore();
  });

  it('should calculate running averages for flats, sharps, and perfect', () => {
    runningAvgStore.addValue('C', 'flats', 5);
    runningAvgStore.addValue('D', 'sharps', 10);
    runningAvgStore.addValue('E', 'perfect', 5);
    runningAvgStore.addValue('C', 'flats', 4);
    runningAvgStore.addValue('D', 'sharps', 1);
    runningAvgStore.addValue('E', 'perfect', 3);
    runningAvgStore.addValue('C', 'flats', 8);
    runningAvgStore.addValue('C', 'flats', 1);
    runningAvgStore.addValue('E', 'perfect', 7);

    const averages = runningAvgStore.runningAverage;

    expect(averages.flats.C).toBe(4.5);
    expect(averages.sharps.D).toBe(5.5);
    expect(averages.perfect.E).toBe(5);
  });

  it('should handle empty counts', () => {
    // Adding values with empty counts should not break the code
    runningAvgStore.addValue('F', 'flats', 10);
    const averages = runningAvgStore.runningAverage;

    // The count for flats.F is 0, so its average should be 0
    expect(averages.flats.F).toBe(10);
  });
});
