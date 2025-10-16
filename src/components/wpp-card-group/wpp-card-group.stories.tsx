import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

export default {
  title: 'Design System/Components/Surfaces/Card Group',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['s', 'm', 'l', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppCardGroup>

type CardStoryArgsTypes = Components.WppCardGroup & Components.WppCard & { header: string }
type CardSingleStoryArgsTypes = CardStoryArgsTypes & {
  allowEmptySelection: boolean
}

const handleTypographyType = (size: 's' | 'm' | 'l' | 'xl' | '2xl') => {
  if (size === 's') return 's-strong'
  if (size === 'm') return 'm-strong'
  if (size === 'l') return 'l-strong'
  if (size === 'xl') return 'xl-heading'
  if (size === '2xl') return '2xl-heading'
}

const handleDisabledText = (disabled: boolean) => {
  if (disabled === true) return 'color: var(--wpp-grey-color-500)'
  else return 'color: var(--wpp-grey-color-1000)'
}

export const SingleSelectGroup: StoryObj<CardSingleStoryArgsTypes> = (args: CardSingleStoryArgsTypes) => {
  const handleCardGroupChange = (event: CustomEvent) => {
    console.log('event.detail :>> ', event.detail)
  }

  return html`
    <wpp-card-group-v3-2-0
      .size="${args.size}"
      .required="${args.required}"
      .withRadioOrCheckbox="${args.withRadioOrCheckbox}"
      .allowEmptySelection="${args.allowEmptySelection}"
      @wppChange="${handleCardGroupChange}"
      style="width: 1000px; justify-content: space-between"
    >
      <wpp-card-v3-2-0 name="item-a" value="item-a">
        <div style="width: 238px; height: 200px"></div>
        <wpp-typography-v3-2-0 type=${handleTypographyType(args.size)} slot="header">Item A</wpp-typography-v3-2-0>
      </wpp-card-v3-2-0>
      <wpp-card-v3-2-0 name="item-b" value="item-b">
        <div style="width: 238px; height: 200px"></div>
        <wpp-typography-v3-2-0 type=${handleTypographyType(args.size)} slot="header">Item B</wpp-typography-v3-2-0>
      </wpp-card-v3-2-0>
      <wpp-card-v3-2-0 value="item-c" .disabled="${args.disabled}">
        <div style="width: 238px; height: 200px"></div>
        <div slot="header" style="display: flex; align-items: center">
          <wpp-icon-user-v3-2-0 style="margin-right: 8px"></wpp-icon-user-v3-2-0>
          <wpp-typography-v3-2-0
            type=${handleTypographyType(args.size)}
            style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis; ${handleDisabledText(args.disabled)}"
            >${args.header}</wpp-typography-v3-2-0
          >
        </div>
      </wpp-card-v3-2-0>
    </wpp-card-group-v3-2-0>
  `
}

SingleSelectGroup.args = {
  size: 'm',
  disabled: false,
  withRadioOrCheckbox: true,
  allowEmptySelection: false,
  header: 'Item C',
}

export const MultipleSelectGroup: StoryObj<CardStoryArgsTypes> = {
  render: args => {
    const cardGroupValue = ['item-a', 'item-c']

    const handleCardGroupChange = (event: CustomEvent) => {
      console.log('event.detail :>> ', event.detail)
    }

    return html`
      <wpp-card-group-v3-2-0
        multiple
        .value="${cardGroupValue}"
        .size="${args.size}"
        .required="${args.required}"
        .withRadioOrCheckbox="${args.withRadioOrCheckbox}"
        @wppChange="${handleCardGroupChange}"
        style="width: 1000px; justify-content: space-between"
      >
        <wpp-card-v3-2-0 header="Item A" value="item-a">
          <div style="width: 238px; height: 200px"></div>
          <wpp-typography-v3-2-0 type=${handleTypographyType(args.size)} slot="header">Item A</wpp-typography-v3-2-0>
        </wpp-card-v3-2-0>
        <wpp-card-v3-2-0 header="Item B" value="item-b">
          <div style="width: 238px; height: 200px"></div>
          <wpp-typography-v3-2-0 type=${handleTypographyType(args.size)} slot="header">Item B</wpp-typography-v3-2-0>
        </wpp-card-v3-2-0>
        <wpp-card-v3-2-0 value="item-c" .disabled="${args.disabled}">
          <div style="width: 238px; height: 200px"></div>
          <wpp-typography-v3-2-0 type=${handleTypographyType(args.size)} slot="header"
            >${args.header}
          </wpp-typography-v3-2-0>
        </wpp-card-v3-2-0>
      </wpp-card-group-v3-2-0>
    `
  },
  args: {
    size: 'm',
    disabled: false,
    withRadioOrCheckbox: true,
    header: 'Item C',
  },
}
