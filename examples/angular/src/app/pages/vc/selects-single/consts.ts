export const CUSTOM_LIST = [
  {
    value: 1,
    label: 'Option 1',
    slots: [
      {
        type: 'wpp-avatar',
        props: {
          slot: 'left',
          size: 's',
          name: 'John Doe',
          withTooltip: true,
          color: 'var(--wpp-dataviz-color-cat-dark-1)',
        },
      },
      {
        type: 'span',
        props: {
          slot: 'caption',
          children: 'This is the caption for Option 1',
        },
      },
      {
        type: 'wpp-tag',
        props: {
          slot: 'right',
          label: 'Positive',
          variant: 'positive',
        },
      },
    ],
  },
  {
    value: 2,
    label: 'Option 2',
    slots: [
      {
        type: 'wpp-avatar',
        props: {
          slot: 'left',
          size: 's',
          name: 'John Doe',
          withTooltip: true,
          color: 'var(--wpp-dataviz-color-cat-dark-2)',
        },
      },
      {
        type: 'span',
        props: {
          slot: 'caption',
          children: 'This is the caption for Option 2',
        },
      },
    ],
  },
  {
    value: 3,
    label: 'Option 3',
    slots: [
      {
        type: 'wpp-avatar',
        props: {
          slot: 'left',
          size: 's',
          name: 'John Doe',
          withTooltip: true,
          color: 'var(--wpp-dataviz-color-cat-dark-3)',
        },
      },
      {
        type: 'span',
        props: {
          slot: 'caption',
          children: 'This is the caption for Option 3',
        },
      },
    ],
  },
  {
    value: 4,
    label: 'Option 4',
    slots: [
      {
        type: 'wpp-avatar',
        props: {
          slot: 'left',
          size: 's',
          name: 'John Doe',
          withTooltip: true,
          color: 'var(--wpp-dataviz-color-cat-dark-4)',
        },
      },
      {
        type: 'span',
        props: {
          slot: 'caption',
          children: 'This is the caption for Option 4',
        },
      },
    ],
  },
  {
    value: 5,
    label: 'Option 5',
    slots: [
      {
        type: 'wpp-avatar',
        props: {
          slot: 'left',
          size: 's',
          name: 'John Doe',
          withTooltip: true,
          color: 'var(--wpp-dataviz-color-cat-dark-5)',
        },
      },
      {
        type: 'span',
        props: {
          slot: 'caption',
          children: 'This is the caption for Option 5',
        },
      },
    ],
  },
  {
    value: 6,
    label: 'Option 6',
    slots: [
      {
        type: 'wpp-avatar',
        props: {
          slot: 'left',
          size: 's',
          src: 'https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028',
        },
      },
      {
        type: 'span',
        props: {
          slot: 'caption',
          children: 'This is the caption for Option 6',
        },
      },
    ],
  },
  {
    value: 7,
    label: 'Option 7',
    slots: [
      {
        type: 'wpp-avatar',
        props: {
          slot: 'left',
          size: 's',
          variant: 'square',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJizK-O7rjmwzro2mvul2xv-Uw1AuPEQajqA&usqp=CAU',
        },
      },
      {
        type: 'span',
        props: {
          slot: 'caption',
          children: 'This is the caption for Option 7',
        },
      },
    ],
  },
]

export const message =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc, nec molestie nibh commodo at home'

export const LIST = [
  {
    value: 1,
    label: 'Item 1',
    slots: [
      {
        type: 'wpp-icon-plus',
        props: {
          slot: 'left',
        },
      },
    ],
  },
  {
    value: 2,
    label: 'Item 2',
  },
  {
    value: 3,
    label: 'Item 3',
    disabled: true,
  },
  {
    value: 4,
    label: 'Item 4',
    slots: [
      {
        type: 'wpp-icon-success',
        props: {
          slot: 'right',
        },
      },
    ],
  },
  {
    value: 5,
    label: 'withPlus',
    slots: [
      {
        type: 'wpp-icon-plus',
        props: {
          slot: 'left',
        },
      },
    ],
  },
  {
    value: 6,
    label: 'text',
  },
  {
    value: 7,
    label: message,
  },
]
