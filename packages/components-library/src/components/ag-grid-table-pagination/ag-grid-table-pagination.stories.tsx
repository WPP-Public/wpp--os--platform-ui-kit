import { html } from 'lit-html'

import readme from './readme.md'
import tooltipReadme from '../ag-grid-table/tooltipReadme.md'

export default {
  title: 'Design System/Components/Data display/Table AG Grid',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
    notes: { Examples: readme, Tooltip: tooltipReadme },
  },
}

export const Pagination = () =>
  // TODO: src will be replaced with our own react dev environment soon
  html`<iframe
    width="100%"
    height="800px"
    src="https://sweet-stroopwafel-02c65d.netlify.app/ag-grid-table-pagination?storybook-demo"
  ></iframe>`
