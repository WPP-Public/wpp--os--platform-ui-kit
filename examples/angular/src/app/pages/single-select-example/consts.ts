import { ListItemInterface } from '@platform-ui-kit/components-library'

export type SelectTypes = 'single' | 'multiple' | 'text' | 'combined'

const helperCreateElement = (type: string, props?: any, children?: any) => ({
  type,
  props: props || {},
  ...(children && { children: Array.isArray(children) ? children : [children] }),
})

export const SAMPLE_LIST_1: ListItemInterface[] = [
  {
    label: 'This is the end',
    value: 'end',
    slots: [helperCreateElement('wpp-icon-plus', { slot: 'left' })],
  },
  {
    label: 'Tree',
    value: 'tree',
    checked: true,
  },
  {
    label: 'Car',
    value: 'car',
    disabled: true,
  },
  {
    label: 'House',
    value: 'house',
    slots: [helperCreateElement('wpp-icon-success', { slot: 'right' })],
  },
  {
    label: 'Magazine',
    value: 'magazine',
    slots: [helperCreateElement('wpp-icon-plus', { slot: 'left' })],
  },
  {
    label: 'Website',
    value: 'website',
  },
]

export const SAMPLE_LIST_2: ListItemInterface[] = [
  {
    label: 'Option 1',
    value: 'option-1',
    slots: [helperCreateElement('wpp-icon-plus', { slot: 'left' })],
  },
  {
    label: 'Option 2',
    value: 'option-2',
    checked: true,
  },
  {
    label: 'Option 3',
    value: 'option-3',
    disabled: true,
  },
  {
    label: 'Option 4',
    value: 'option-4',
    slots: [helperCreateElement('wpp-icon-success', { slot: 'right' })],
  },
  {
    label: 'Option 5',
    value: 'option-5',
    slots: [helperCreateElement('wpp-icon-plus', { slot: 'left' })],
  },
  {
    label: 'Option 6',
    value: 'option-6',
  },
  {
    label: 'Option 7',
    value: 'option-7',
  },
  {
    label: 'Option 8',
    value: 'option-8',
  },
  {
    label: 'Option 9',
    value: 'option-9',
  },
  {
    label: 'Option 10',
    value: 'option-10',
  },
  {
    label: 'Option 11',
    value: 'option-11',
  },
  {
    label: 'Option 12',
    value: 'option-12',
  },
  {
    label: 'Option 13',
    value: 'option-13',
  },
  {
    label: 'Option 14',
    value: 'option-14',
  },
  {
    label: 'Option 15',
    value: 'option-15',
  },
  {
    label: 'Option 16',
    value: 'option-16',
  },
  {
    label: 'Option 17',
    value: 'option-17',
  },
  {
    label: 'Option 18',
    value: 'option-18',
  },
  {
    label: 'Option 19',
    value: 'option-19',
  },
  {
    label: 'Option 20',
    value: 'option-20',
  },
]

export const SAMPLE_LIST_3: ListItemInterface[] = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
  {
    label: 'Polygender',
    value: 'Polygender',
  },
  {
    label: 'Agender',
    value: 'Agender',
  },
]

export const SAMPLE_LIST_MULTIPLE: ListItemInterface[] = [
  {
    label: 'Option 1',
    value: 'option-1',
  },
  {
    label: 'Option 2',
    value: 'option-2',
    checked: true,
  },
  {
    label: 'Option 3',
    value: 'option-3',
    disabled: true,
  },
  {
    label: 'Option 4',
    value: 'option-4',
  },
  {
    label: 'Option 5',
    value: 'option-5',
  },
  {
    label: 'Option 6',
    value: 'option-6',
  },
  {
    label: 'Option 7',
    value: 'option-7',
  },
  {
    label: 'Option 8',
    value: 'option-8',
  },
  {
    label: 'Option 9',
    value: 'option-9',
  },
  {
    label: 'Option 10',
    value: 'option-10',
  },
  {
    label: 'Option 11',
    value: 'option-11',
  },
  {
    label: 'Option 12',
    value: 'option-12',
  },
  {
    label: 'Option 13',
    value: 'option-13',
  },
  {
    label: 'Option 14',
    value: 'option-14',
  },
  {
    label: 'Option 15',
    value: 'option-15',
  },
  {
    label: 'Option 16',
    value: 'option-16',
  },
  {
    label: 'Option 17',
    value: 'option-17',
  },
  {
    label: 'Option 18',
    value: 'option-18',
  },
  {
    label: 'Option 19',
    value: 'option-19',
  },
  {
    label: 'Option 20',
    value: 'option-20',
  },
]

export const SAMPLE_LIST_COMBINED: ListItemInterface[] = [
  {
    id: 1,
    label: 'UAH',
    value: 'uah',
  },
  {
    id: 2,
    label: 'USD',
    value: 'usd',
  },
  {
    id: 3,
    label: 'EUR',
    value: 'eur',
  },
]
