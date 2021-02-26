import {getAge} from './';

test('Getting age from date object', () => {
  expect(getAge(new Date(2000, 1, 1))).toBe(21);
  expect(getAge(new Date(2021, 1, 1))).toBe(0);
});

test('Test error throwing while incorrect type', () => {
  expect(getAge(2021)).toBe(null);
  expect(getAge('hello')).toBe(null);
  expect(getAge(null)).toBe(null);
  expect(getAge({})).toBe(null);
  expect(getAge([])).toBe(null);
});

