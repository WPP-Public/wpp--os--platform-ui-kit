import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { styleMap } from 'lit-html/directives/style-map.js'

export default {
  title: 'Design System/Components/Feedback/Tooltip',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    config: {
      control: 'object',
    },
    wordBreak: {
      options: ['break-word', 'break-all', 'auto-phrase'],
      control: { type: 'select' },
    },
    theme: {
      options: ['dark', 'light'],
      control: { type: 'select' },
    },
  },
} as Meta<Components.WppTooltip>

export const TitleAndText: StoryObj<Components.WppTooltip> = (args: Components.WppTooltip) => html`
  <wpp-tooltip-v3-3-0
    .dropdownWidth="${args.dropdownWidth}"
    .header="${args.header}"
    .text="${args.text}"
    .theme="${args.theme}"
    .config="${args.config}"
    .wordBreak="${args.wordBreak}"
    .warning="${args.warning}"
    .error="${args.error}"
  >
    <wpp-button-v3-3-0 variant="${args.error ? 'destructive' : 'primary'}">
      ${args.error ? 'Error tooltip' : args.warning ? 'Warning tooltip' : 'Tooltip'}
    </wpp-button-v3-3-0>
  </wpp-tooltip-v3-3-0>
`

TitleAndText.args = {
  header: 'Title',
  text: 'Lorem ipsum\n\nDolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation\n\nFugiat nulla pariatur',
  config: { placement: 'bottom' },
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
  warning: false,
  error: false,
}

TitleAndText.parameters = {
  layout: 'centered',
}

export const Value: StoryObj<Components.WppTooltip> = (args: Components.WppTooltip) =>
  html` <wpp-tooltip-v3-3-0
    .text="${args.text}"
    .value="${args.value}"
    .theme="${args.theme}"
    .config="${args.config}"
    .dropdownWidth="${args.dropdownWidth}"
    .wordBreak="${args.wordBreak}"
  >
    <wpp-button-v3-3-0 variant="primary">Button</wpp-button-v3-3-0>
  </wpp-tooltip-v3-3-0>`

Value.args = {
  text: 'Label',
  value: '$100,000',
  config: {},
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
}

Value.parameters = {
  layout: 'centered',
}

const styles = {
  typographyDark: {
    '--wpp-typography-color': 'var(--wpp-grey-color-000)',
  },
  typographyLight: {
    '--wpp-typography-color': 'var(--wpp-grey-color-900)',
  },
}

export const CustomContent: StoryObj<Components.WppTooltip> = (args: Components.WppTooltip) => html`
  <wpp-tooltip-v3-3-0
    .dropdownWidth="${args.dropdownWidth}"
    .text="${args.text}"
    .config="${args.config}"
    .theme="${args.theme}"
    .wordBreak="${args.wordBreak}"
  >
    <wpp-button-v3-3-0 data-testid="allow-html-tooltip-button">Tooltip with Custom Content</wpp-button-v3-3-0>
    <div slot="tooltip-content">
      <wpp-typography-v3-3-0
        tag="h2"
        type="m-strong"
        style=${args.theme === 'dark' ? styleMap(styles.typographyDark) : styleMap(styles.typographyLight)}
        >Bold Content
      </wpp-typography-v3-3-0>
      <wpp-typography-v3-3-0
        tag="p"
        type="s-body"
        style=${args.theme === 'dark' ? styleMap(styles.typographyDark) : styleMap(styles.typographyLight)}
      >
        Body content
      </wpp-typography-v3-3-0>
    </div>
  </wpp-tooltip-v3-3-0>
`

CustomContent.args = {
  text: 'Tooltip Text',
  config: {
    allowHTML: true,
    placement: 'right',
  },
  theme: 'dark',
  dropdownWidth: 'auto',
  wordBreak: 'break-word',
}

CustomContent.parameters = {
  layout: 'centered',
}
