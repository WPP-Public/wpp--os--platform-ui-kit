import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data display/Table AG Grid/Infinite Scroll',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
  },
};
export const InfiniteScroll = () => 
// TODO: src will be replaced with our own react dev environment soon
html `<iframe
    width="100%"
    allow="clipboard-write; clipboard-read"
    height="800px"
    src="https://statuesque-longma-ba5133.netlify.app/ag-grid-table-infinite-scroll?storybook-demo"
  ></iframe>`;
