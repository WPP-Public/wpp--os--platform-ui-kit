import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppSelect } from './wpp-select'
import SingleSelectReadme from './readme.md'
import ListItemReadme from '../wpp-list-item/readme.md'

const getList = (type: 'single' | 'multiple') => [
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
    slots:
      type === 'single'
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
]

export default {
  title: 'Design System/Components/Selection and input/Select',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: SingleSelectReadme, Items: ListItemReadme },
  },
  argTypes: {
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
    dropdownConfig: { control: 'object' },
  },
} as Meta<typeof WppSelect>

type SelectStoryArgs = Components.WppSelect & { showIconStart: boolean }

export const Single: Story<SelectStoryArgs> = (args: SelectStoryArgs) => {
  let selectedValue: any = null

  const handleChange = (event: CustomEvent) => {
    selectedValue = event.detail.value
    console.log('Event:', event)

    const updatedEl = document.querySelector('wpp-select-v2-21-0')

    if (updatedEl) (updatedEl as HTMLWppSelectElement).value = selectedValue
  }

  return html`
    <wpp-select-v3-1-1
      type="single"
      name="single-select"
      .message=${args.message}
      .messageType=${args.messageType}
      .placeholder=${args.placeholder}
      .size=${args.size}
      .messageInTooltip=${args.messageInTooltip}
      .disabled=${args.disabled}
      .required=${args.required}
      .dropdownConfig=${args.dropdownConfig}
      .labelConfig=${args.labelConfig}
      .withSearch=${args.withSearch}
      .maximumSelectedItems=${args.maximumSelectedItems}
      .dropdownWidth=${args.dropdownWidth}
      .list=${getList('single')}
      .value=${selectedValue}
      @wppChange=${handleChange}
    >
      ${args.showIconStart
        ? html`
            <wpp-icon-clock-v3-1-1
              slot="icon-start"
              @click="${(e: any) => {
                e.stopPropagation()
                console.log('Left icon clicked')
              }}"
            ></wpp-icon-clock-v3-1-1>
          `
        : null}
    </wpp-select-v3-1-1>
  `
}

Single.args = {
  message: '',
  placeholder: 'Placeholder',
  dropdownWidth: 'auto',
  size: 'm',
  disabled: false,
  messageInTooltip: false,
  required: true,
  withSearch: false,
  showIconStart: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
}

Single.parameters = {
  controls: { exclude: ['placeholder'] },
}

export const Multiple: Story<SelectStoryArgs> = (args: SelectStoryArgs) => {
  let selectedValue: any = []

  const handleChange = (event: CustomEvent) => {
    selectedValue = event.detail.value
    console.log('Event:', event)

    const updatedEl = document.querySelector('wpp-select-v2-21-0')

    if (updatedEl) (updatedEl as HTMLWppSelectElement).value = selectedValue
  }

  return html`
    <wpp-select-v3-1-1
      type="multiple"
      name="multiple-select"
      .message=${args.message}
      .messageType=${args.messageType}
      .placeholder=${args.placeholder}
      .size=${args.size}
      .messageInTooltip=${args.messageInTooltip}
      .disabled=${args.disabled}
      .required=${args.required}
      .dropdownConfig=${args.dropdownConfig}
      .labelConfig=${args.labelConfig}
      .withSearch=${args.withSearch}
      .withFolder=${args.withFolder}
      .showSelectAllText=${args.showSelectAllText}
      .dropdownWidth=${args.dropdownWidth}
      .value=${selectedValue}
      .maximumSelectedItems="${args.maximumSelectedItems}"
      .list=${getList('multiple')}
      @wppChange=${handleChange}
    >
      ${args.showIconStart
        ? html`
            <wpp-icon-clock-v3-1-1
              slot="icon-start"
              @click="${(e: any) => {
                e.stopPropagation()
                console.log('Left icon clicked')
              }}"
            ></wpp-icon-clock-v3-1-1>
          `
        : null}
    </wpp-select-v3-1-1>
  `
}

Multiple.args = {
  message: '',
  placeholder: 'Placeholder',
  dropdownWidth: 'auto',
  size: 'm',
  messageInTooltip: false,
  disabled: false,
  required: true,
  withSearch: false,
  withFolder: true,
  showSelectAllText: true,
  showIconStart: true,
  labelConfig: {
    icon: '',
    text: '',
    description: '',
    locales: {
      optional: 'Optional',
    },
  },
}

Multiple.parameters = {
  controls: { exclude: ['placeholder'] },
}

const LIST_TEXT = [
  {
    value: 'cars',
    label: 'Cars',
  },
  {
    value: 'houses',
    label: 'Houses',
    disabled: true,
  },
  {
    value: 'trains',
    label: 'Trains',
  },
  {
    value: 'long-text',
    label: 'A Bit Longer Text',
  },
  {
    value: 'food',
    label: 'Food',
  },
  {
    value: 'drinks',
    label: 'Drinks',
  },
  {
    value: 'fruits',
    label: 'Fruits',
  },
]

export const Text: Story<Components.WppSelect & { showIconStart: boolean }> = (
  args: Components.WppSelect & { showIconStart: boolean },
) => {
  let selectedValue: any = ''

  const handleChange = (event: CustomEvent) => {
    selectedValue = event.detail.value
    console.log('Event:', event)

    const updatedEl = document.querySelector('wpp-select-v2-21-0')

    if (updatedEl) (updatedEl as HTMLWppSelectElement).value = selectedValue
  }

  return html` <wpp-select-v3-1-1
    .disabled="${args.disabled}"
    .placeholder="${args.placeholder}"
    .dropdownWidth="${args.dropdownWidth}"
    value="long-text"
    type="text"
    name="text-select"
    .valie=${selectedValue}
    .dropdownConfig=${args.dropdownConfig}
    .list=${LIST_TEXT}
    @wppChange=${handleChange}
  >
    ${args.showIconStart
      ? html`
          <wpp-icon-clock-v3-1-1
            slot="icon-start"
            @click="${(e: any) => {
              e.stopPropagation()
              console.log('Left icon clicked')
            }}"
          ></wpp-icon-clock-v3-1-1>
        `
      : null}
  </wpp-select-v3-1-1>`
}

Text.args = {
  placeholder: 'Select option',
  dropdownWidth: 'auto',
  disabled: false,
  showIconStart: true,
}

Text.parameters = {
  controls: { exclude: ['message', 'messageType', 'size', 'withSearch'] },
}
