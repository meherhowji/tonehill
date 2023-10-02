import {StatsStore} from '../StatsStore';

// Reset the store before each test
let statsStore;

beforeEach(() => {
  statsStore = new StatsStore();
});

test('Adding values and calculating percentages', () => {
  // Add some values for testing
  statsStore.addValue('flats', 'C', 5);
  statsStore.addValue('sharps', 'D', 10);
  statsStore.addValue('perfect', 'E', 5);
  statsStore.addValue('flats', 'C', 4);
  statsStore.addValue('sharps', 'D', 1);
  statsStore.addValue('perfect', 'E', 3);

  // Calculate the running averages and percentages
  const data = statsStore.data;

  // Test the percentages for specific notes and types
  expect(data.flats.C.percentage).toBe(100);
  expect(data.sharps.C.percentage).toBe(0);
  expect(data.perfect.C.percentage).toBe(0);
  expect(data.flats.D.percentage).toBe(0);
  expect(data.sharps.D.percentage).toBe(100);
  expect(data.perfect.D.percentage).toBe(0);
  expect(data.flats.E.percentage).toBe(0);
  expect(data.sharps.E.percentage).toBe(0);
  expect(data.perfect.E.percentage).toBe(100);

  // Add more values for testing
  statsStore.addValue('sharps', 'C', 3);
  statsStore.addValue('flats', 'D', 8);
  statsStore.addValue('perfect', 'E', 4);

  statsStore.addValue('perfect', 'C', 3);
  statsStore.addValue('sharps', 'D', 8);
  statsStore.addValue('perfect', 'E', 4);

  statsStore.addValue('sharps', 'C', 3);
  statsStore.addValue('flats', 'D', 8);
  statsStore.addValue('sharps', 'E', 4);
  statsStore.addValue('flats', 'E', 4);

  // Calculate the running averages and percentages again
  const newData = statsStore.data;

  // Test the updated percentages for specific notes and types
  expect(newData.flats.C.percentage).toBe(40);
  expect(newData.sharps.C.percentage).toBe(40);
  expect(newData.perfect.C.percentage).toBe(20);

  expect(newData.flats.D.percentage).toBe(40);
  expect(newData.sharps.D.percentage).toBe(60);
  expect(newData.perfect.D.percentage).toBe(0);

  expect(newData.flats.E.percentage).toBe(16.67);
  expect(newData.sharps.E.percentage).toBe(16.67);
  expect(newData.perfect.E.percentage).toBe(66.67);
});

test('Negative test case: Note to not exist when no values added', () => {
  const data = statsStore.data;
  expect(data.flats.C).toBe(undefined);
});
