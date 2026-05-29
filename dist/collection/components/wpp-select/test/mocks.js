/**
 * Centralized mocks for wpp-select tests.
 * Import from here to avoid duplicating test data across test files.
 */
export const MOCK_MULTIPLE_LIST = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b' },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
  { label: 'Option E', value: 'e' },
];
export const MOCK_MULTIPLE_LIST_WITH_DISABLED = [
  { label: 'Option A', value: 'a' },
  { label: 'Option B', value: 'b', disabled: true },
  { label: 'Option C', value: 'c' },
  { label: 'Option D', value: 'd' },
  { label: 'Option E', value: 'e' },
];
export const MOCK_SINGLE_LIST = [
  { label: 'Car', value: 'car' },
  { label: 'House', value: 'house', disabled: true },
  { label: 'Apartment', value: 'apartment' },
];
export const MOCK_LARGE_LIST = Array.from({ length: 16 }, (_, i) => ({
  label: `Item ${i + 1}`,
  value: `item-${i + 1}`,
}));
export const MOCK_NUMERIC_LIST = [
  { label: 'Dimension 1', value: 0 },
  { label: 'Dimension 2', value: 1 },
  { label: 'Dimension 3', value: 2 },
];
