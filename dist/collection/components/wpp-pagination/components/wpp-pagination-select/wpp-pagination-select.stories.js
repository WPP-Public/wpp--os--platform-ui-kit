import { html } from 'lit-html';
import WppPaginationSelectReadme from './readme.md';
import WppPaginationItemReadme from '../wpp-pagination-item/readme.md';
export default {
  title: 'Design System/Components/Navigation/Pagination',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: WppPaginationSelectReadme, Items: WppPaginationItemReadme },
  },
  argTypes: {
    count: { type: 'number' },
    activePageNumber: { type: 'number' },
  },
};
export const PageNumberSelect = (args) => html ` <wpp-pagination-select-v2-22-0 .count="${args.count}" .activePageNumber="${args.activePageNumber}" />`;
PageNumberSelect.args = {
  count: 8,
  activePageNumber: 2,
};
export const PageNumberInput = (args) => html ` <wpp-pagination-select-v2-22-0 .count="${args.count}" .activePageNumber="${args.activePageNumber}" />`;
PageNumberInput.args = {
  count: 10,
  activePageNumber: 2,
};
