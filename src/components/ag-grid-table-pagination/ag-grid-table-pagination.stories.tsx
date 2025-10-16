import { html } from 'lit-html'

export default {
  title: 'Design System/Components/Data display/Table AG Grid/Pagination',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
  },
}

export const Pagination = () =>
  // TODO: src will be replaced with our own react dev environment soon
  html`<iframe
    width="100%"
    height="800px"
    src="https://sweet-stroopwafel-02c65d.netlify.app/ag-grid-table-pagination?storybook-demo"
  ></iframe>`
