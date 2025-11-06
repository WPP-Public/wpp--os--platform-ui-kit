import { html } from 'lit-html';
import readme from './readme.md';
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
};
export const Pagination = () => 
// TODO: src will be replaced with our own react dev environment soon
html `<iframe
    width="100%"
    height="800px"
    src="https://sweet-stroopwafel-02c65d.netlify.app/ag-grid-table-pagination?storybook-demo"
  ></iframe>`;
export const InfiniteScroll = () => 
// TODO: src will be replaced with our own react dev environment soon
html `<iframe
    width="100%"
    height="800px"
    src="https://sweet-stroopwafel-02c65d.netlify.app/ag-grid-table-infinite-scroll?storybook-demo"
  ></iframe>`;
export const LoadMore = () => 
// TODO: src will be replaced with our own react dev environment soon
html `<iframe
    width="100%"
    height="2000px"
    src="https://sweet-stroopwafel-02c65d.netlify.app/ag-grid-table-load-more?storybook-demo"
  ></iframe>`;
