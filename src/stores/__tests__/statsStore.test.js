import '../_hydration.ts'
import {StatsStore as S} from '../StatsStore';

// Reset the store before each test
let stats;

// TODO: fix tests as they are failing due to persisting
beforeEach(() => {
  stats = new S();
	stats.stopPersisting()
});

test('Adding values and calculating percentages', () => {
  // Add some values for testing
  stats.addValue('flats', 'C', 5);
  stats.addValue('sharps', 'D', 10);
  stats.addValue('perfect', 'E', 5);
  stats.addValue('flats', 'C', 4);
  stats.addValue('sharps', 'D', 1);
  stats.addValue('perfect', 'E', 3);

  // Calculate the running averages and percentages
  const data = stats.data;

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
  stats.addValue('sharps', 'C', 3);
  stats.addValue('flats', 'D', 8);
  stats.addValue('perfect', 'E', 4);

  stats.addValue('perfect', 'C', 3);
  stats.addValue('sharps', 'D', 8);
  stats.addValue('perfect', 'E', 4);

  stats.addValue('sharps', 'C', 3);
  stats.addValue('flats', 'D', 8);
  stats.addValue('sharps', 'E', 4);
  stats.addValue('flats', 'E', 4);

  // Calculate the running averages and percentages again
  const newData = stats.data;

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
  const data = stats.data;
  expect(data.flats.C).toBe(undefined);
});
