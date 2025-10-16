import { html } from 'lit-html'

export default {
  title: 'Design System/Components/Data display/Table AG Grid/Load More',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
  },
}

export const LoadMore = () =>
  // TODO: src will be replaced with our own react dev environment soon
  html`<iframe
    width="100%"
    height="2000px"
    src="https://sweet-stroopwafel-02c65d.netlify.app/ag-grid-table-load-more?storybook-demo"
  ></iframe>`
