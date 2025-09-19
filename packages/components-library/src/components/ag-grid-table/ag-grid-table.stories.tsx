import { html } from 'lit-html'

import readme from './readme.md'

export default {
  title: 'Design System/Components/Data display/Table AG Grid',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
    notes: { readme },
  },
}

export const Documentation = () => html`Refer notes for general documentation.`
