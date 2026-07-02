import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Navigation/Pagination/Pagination Select',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    count: { type: 'number' },
    activePageNumber: { type: 'number' },
  },
};
export const Default = (args) => html ` <wpp-pagination-select-v4-2-0
    .itemsPerPage=${args.itemsPerPage}
    .pageSelectThreshold=${args.pageSelectThreshold}
    .count="${args.count}"
    .activePageNumber="${args.activePageNumber}"
  />`;
Default.args = {
  count: 8,
  activePageNumber: 2,
  itemsPerPage: 1,
  pageSelectThreshold: 10,
};
