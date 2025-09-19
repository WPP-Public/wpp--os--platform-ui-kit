export interface Value {
  label: string
  value: string
}

export const SELECT_OPTIONS_MULTIPLE = {
  optionA: {
    label: 'Parent Option A',
    value: 'optionA',
    firstChild: [
      { label: 'Parent Option A - First Child - Option 1', value: 'Parent Option A - First Child - Option 1' },
      { label: 'Parent Option A - First Child - Option 2', value: 'Parent Option A - First Child - Option 2' },
      { label: 'Parent Option A - First Child - Option 3', value: 'Parent Option A - First Child - Option 3' },
      { label: 'Parent Option A - First Child - Option 4', value: 'Parent Option A - First Child - Option 4' },
      { label: 'Parent Option A - First Child - Option 5', value: 'Parent Option A - First Child - Option 5' },
    ],
    secondChild: {
      'Parent Option A - First Child - Option 1': [
        {
          label: 'Parent Option A - First Child - Option 1 - Second Child - Option 1',
          value: 'Parent Option A - First Child - Option 1 - Second Child - Option 1',
        },
        {
          label: 'Parent Option A - First Child - Option 1 - Second Child - Option 2',
          value: 'Parent Option A - First Child - Option 1 - Second Child - Option 2',
        },
      ],
      'Parent Option A - First Child - Option 2': [
        {
          label: 'Parent Option A - First Child - Option 2 - Second Child - Option 3',
          value: 'Parent Option A - First Child - Option 2 - Second Child - Option 3',
        },
        {
          label: 'Parent Option A - First Child - Option 2 - Second Child - Option 4',
          value: 'Parent Option A - First Child - Option 2 - Second Child - Option 4',
        },
      ],
      'Parent Option A - First Child - Option 3': [
        {
          label: 'Parent Option A - First Child - Option 3 - Second Child - Option 5',
          value: 'Parent Option A - First Child - Option 3 - Second Child - Option 5',
        },
        {
          label: 'Parent Option A - First Child - Option 3 - Second Child - Option 6',
          value: 'Parent Option A - First Child - Option 3 - Second Child - Option 6',
        },
      ],
      'Parent Option A - First Child - Option 4': [
        {
          label: 'Parent Option A - First Child - Option 4 - Second Child - Option 7',
          value: 'Parent Option A - First Child - Option 4 - Second Child - Option 7',
        },
        {
          label: 'Parent Option A - First Child - Option 4 - Second Child - Option 8',
          value: 'Parent Option A - First Child - Option 4 - Second Child - Option 8',
        },
      ],
      'Parent Option A - First Child - Option 5': [
        {
          label: 'Parent Option A - First Child - Option 5 - Second Child - Option 9',
          value: 'Parent Option A - First Child - Option 5 - Second Child - Option 9',
        },
        {
          label: 'Parent Option A - First Child - Option 5 - Second Child - Option 10',
          value: 'Parent Option A - First Child - Option 5 - Second Child - Option 10',
        },
      ],
    },
  },
  optionB: {
    label: 'Parent Option B',
    value: 'optionB',
    firstChild: [
      { label: 'Parent Option B - First Child - Option 6', value: 'Parent Option B - First Child - Option 6' },
      { label: 'Parent Option B - First Child - Option 7', value: 'Parent Option B - First Child - Option 7' },
      { label: 'Parent Option B - First Child - Option 8', value: 'Parent Option B - First Child - Option 8' },
      { label: 'Parent Option B - First Child - Option 9', value: 'Parent Option B - First Child - Option 9' },
      { label: 'Parent Option B - First Child - Option 10', value: 'Parent Option B - First Child - Option 10' },
    ],
    secondChild: {
      'Parent Option B - First Child - Option 6': [
        {
          label: 'Parent Option B - First Child - Option 6 - Second Child - Option 11',
          value: 'Parent Option B - First Child - Option 6 - Second Child - Option 11',
        },
        {
          label: 'Parent Option B - First Child - Option 6 - Second Child - Option 12',
          value: 'Parent Option B - First Child - Option 6 - Second Child - Option 12',
        },
      ],
      'Parent Option B - First Child - Option 7': [
        {
          label: 'Parent Option B - First Child - Option 7 - Second Child - Option 13',
          value: 'Parent Option B - First Child - Option 7 - Second Child - Option 13',
        },
        {
          label: 'Parent Option B - First Child - Option 7 - Second Child - Option 14',
          value: 'Parent Option B - First Child - Option 7 - Second Child - Option 14',
        },
      ],
      'Parent Option B - First Child - Option 8': [
        {
          label: 'Parent Option B - First Child - Option 8 - Second Child - Option 15',
          value: 'Parent Option B - First Child - Option 8 - Second Child - Option 15',
        },
        {
          label: 'Parent Option B - First Child - Option 8 - Second Child - Option 16',
          value: 'Parent Option B - First Child - Option 8 - Second Child - Option 16',
        },
      ],
      'Parent Option B - First Child - Option 9': [
        {
          label: 'Parent Option B - First Child - Option 9 - Second Child - Option 17',
          value: 'Parent Option B - First Child - Option 9 - Second Child - Option 17',
        },
        {
          label: 'Parent Option B - First Child - Option 9 - Second Child - Option 18',
          value: 'Parent Option B - First Child - Option 9 - Second Child - Option 18',
        },
      ],
      'Parent Option B - First Child - Option 10': [
        {
          label: 'Parent Option B - First Child - Option 10 - Second Child - Option 19',
          value: 'Parent Option B - First Child - Option 10 - Second Child - Option 19',
        },
        {
          label: 'Parent Option B - First Child - Option 10 - Second Child - Option 20',
          value: 'Parent Option B - First Child - Option 10 - Second Child - Option 20',
        },
      ],
    },
  },
}
