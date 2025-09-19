import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../../../components'

import { WppCard } from './wpp-card'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Surfaces/Card',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
      if: { arg: 'interactive', truthy: false },
    },
    size: {
      options: ['s', 'm', 'l', 'xl', '2xl'],
      control: { type: 'select' },
    },
  },
} as Meta<typeof WppCard>

type CardStoryArgs = Components.WppCard & { withActions: boolean; extendedHeaderExample: boolean; header: string }

const handleBackgroundColor = (interactive: boolean) => {
  if (interactive) {
    return 'var(--wpp-grey-color-100)'
  }

  return 'var(--wpp-grey-color-300)'
}

const handleTypographyType = (size: 's' | 'm' | 'l' | 'xl' | '2xl') => {
  if (size === 's') return 's-strong'
  if (size === 'm') return 'm-strong'
  if (size === 'l') return 'l-strong'
  if (size === 'xl') return 'xl-heading'
  if (size === '2xl') return '2xl-heading'
}

export const Regular: Story<CardStoryArgs> = (args: CardStoryArgs) => html`
  <div
    style="position: fixed; inset: 0; background-color: ${handleBackgroundColor(
      args.interactive,
    )}; display: flex; align-items: center; justify-content: center"
  >
    <wpp-card-v3-1-1
      .variant="${args.variant}"
      .size="${args.size}"
      .interactive="${args.interactive}"
      style="width: 400px"
    >
      <div style="width: 400px; height: 200px"></div>
      <div
        style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding-right: 32px"
        slot="header"
      >
        <wpp-typography-v3-1-1
          type=${handleTypographyType(args.size)}
          style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
          >${args.header}</wpp-typography-v3-1-1
        >
        ${args.extendedHeaderExample
          ? html`
              <div style="display: flex; align-items: center; margin-right: 32px">
                <wpp-typography-v3-1-1 type="s-body" style="margin-right: 18px"> 35% Complete</wpp-typography-v3-1-1>
                <wpp-progress-indicator-v3-1-1 progress="35" width="173px" />
              </div>
            `
          : null}
      </div>
      ${args.withActions
        ? html`
          <wpp-action-button-v3-1-1 variant="secondary" slot="actions">
            <wpp-icon-more-v3-1-1 slot="icon-start" direction='horizontal'></wpp-icon-plus>
          </wpp-action-button-v3-1-1>
        `
        : null}
    </wpp-card-v3-1-1>
  </div>
`

Regular.args = {
  header: 'Title',
  variant: 'primary',
  size: 'm',
  interactive: false,
  withActions: true,
  extendedHeaderExample: false,
}

Regular.parameters = {
  controls: { exclude: ['interactive'] },
}

export const Clickable: Story<CardStoryArgs> = (args: CardStoryArgs) => html`
  <div
    style="position: fixed; inset: 0; background-color: ${handleBackgroundColor(
      args.interactive,
    )}; display: flex; align-items: center; justify-content: center"
  >
    <wpp-card-v3-1-1
      .variant="${args.variant}"
      .size="${args.size}"
      .interactive="${args.interactive}"
      style="width: 400px"
    >
      <div style="width: 400px; height: 200px"></div>
      <div
        style="width: 100%; display: flex; justify-content: space-between; align-items: center; padding-right: 32px"
        slot="header"
      >
        <wpp-typography-v3-1-1
          type=${handleTypographyType(args.size)}
          style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;"
          >${args.header}</wpp-typography-v3-1-1
        >
        ${args.extendedHeaderExample
          ? html`
              <div style="display: flex; align-items: center; margin-right: 32px">
                <wpp-typography-v3-1-1 type="s-body" style="margin-right: 18px"> 35% Complete</wpp-typography-v3-1-1>
                <wpp-progress-indicator-v3-1-1 progress="35" width="173px" />
              </div>
            `
          : null}
      </div>
      ${args.withActions
        ? html`
          <wpp-action-button-v3-1-1 variant="secondary" slot="actions">
            <wpp-icon-more-v3-1-1 slot="icon-start" direction='horizontal'></wpp-icon-plus>
          </wpp-action-button-v3-1-1>
        `
        : null}
    </wpp-card-v3-1-1>
  </div>
`

Clickable.args = {
  header: 'Title',
  variant: 'primary',
  size: 'm',
  interactive: true,
  withActions: true,
  extendedHeaderExample: false,
}

Clickable.parameters = {
  controls: { exclude: ['interactive', 'variant'] },
}
