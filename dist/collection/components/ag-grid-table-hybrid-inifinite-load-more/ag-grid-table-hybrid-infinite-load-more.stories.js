import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Data display/Table AG Grid/Hybrid',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
  },
};
export const HybridInfiniteScroll = () => 
// TODO: src will be replaced with our own react dev environment soon
html `<iframe
    width="100%"
    height="800px"
    src="https://statuesque-longma-ba5133.netlify.app/ag-grid-table-hybrid-infinite-scroll?storybook-demo"
  ></iframe>`;
