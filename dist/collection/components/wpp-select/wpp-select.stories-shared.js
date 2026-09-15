// Shared sample list and argTypes used by the Single, Multiple, Border Only and Button Anchor select stories.
export const getSelectStoryList = (type) => [
  {
    value: 1,
    label: 'Car',
  },
  {
    value: 2,
    disabled: true,
    label: 'House',
  },
  {
    value: 3,
    label: 'Some looooooooooooooooong text in the item to test truncate',
    slots: [{ type: 'p', props: { slot: 'caption', children: 'Text should be truncated' } }],
  },
  {
    value: 4,
    label: 'Text',
    slots: type === 'single' ? [{ type: 'wpp-icon-plus', props: { slot: 'left' } }] : [],
  },
  {
    value: 5,
    label: 'Text',
    slots: [{ type: 'p', props: { slot: 'caption', children: 'Creates a new element' } }],
  },
  {
    value: 6,
    label: 'Rob Adi',
    slots: type === 'single' ? [{ type: 'wpp-avatar', props: { slot: 'left', name: 'Rob Adi' } }] : [],
  },
  {
    value: 7,
    label: 'Some looooooooooooooooong text in the item to test truncate',
  },
  {
    value: 8,
    label: 'Item without information',
  },
  {
    value: 9,
    label: 'Multiple Cars',
  },
  {
    value: 10,
    label: 'Item with Avatar and Subtitle',
    slots: type === 'single'
      ? [
        {
          type: 'wpp-avatar',
          props: {
            size: 's',
            name: 'Ava Subtitle',
            slot: 'left',
          },
        },
        {
          type: 'span',
          props: {
            slot: 'subtitle',
            children: 'This is a subtitle',
          },
        },
        {
          type: 'wpp-tag',
          props: {
            label: 'Text',
            variant: 'positive',
            slot: 'right',
            disabled: true,
          },
        },
      ]
      : [
        {
          type: 'span',
          props: {
            slot: 'subtitle',
            children: 'This is a subtitle',
          },
        },
        {
          type: 'wpp-tag',
          props: {
            label: 'Text',
            variant: 'positive',
            slot: 'right',
            disabled: true,
          },
        },
      ],
  },
];
export const selectStoryArgTypes = {
  placeholder: { type: 'string' },
  message: { control: { type: 'text' } },
  messageType: {
    options: ['null', 'warning', 'error'],
    control: { type: 'select' },
  },
  messageInTooltip: { control: { type: 'boolean' } },
  size: {
    options: ['s', 'm'],
    control: { type: 'select' },
  },
  maximumSelectedItems: {
    options: ['none', '3', '5'],
    control: { type: 'select' },
  },
  disabled: { control: { type: 'boolean' } },
  required: { control: { type: 'boolean' } },
  withSearch: { control: { type: 'boolean' } },
  showSelectAllText: { control: { type: 'boolean' } },
  showSelectAllOption: { control: { type: 'boolean' } },
  dropdownConfig: { control: 'object' },
  consistentSearch: { control: { type: 'boolean' } },
};
