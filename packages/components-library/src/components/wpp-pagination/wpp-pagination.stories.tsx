import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppPagination } from './wpp-pagination'
import WppPaginationReadme from './readme.md'
import WppPaginationSelectReadme from './components/wpp-pagination-select/readme.md'

export default {
  title: 'Design System/Components/Navigation/Pagination',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: { Container: WppPaginationReadme, Items: WppPaginationSelectReadme },
  },
  argTypes: {
    count: { type: 'number' },
    itemsPerPage: { type: 'array' },
    pageSelectThreshold: { type: 'number' },
    activePageNumber: { type: 'number' },
    selectedItemPerPage: { type: 'number' },
  },
} as Meta<typeof WppPagination>

export const PaginationControl: Story<Components.WppPagination> = (
  args: Components.WppPagination,
) => html`<wpp-pagination-v3-1-1
  .selectedItemPerPage="${args.selectedItemPerPage}"
  .count="${args.count}"
  .itemsPerPage="${args.itemsPerPage}"
  .pageSelectThreshold="${args.pageSelectThreshold}"
  .activePageNumber="${args.activePageNumber}"
  .selectedItemPerPage="${args.selectedItemPerPage}"
  .locales="${args.locales}"
  locales="${args.locales}"
/>`

PaginationControl.args = {
  count: 78,
  itemsPerPage: [5, 10, 20, 50],
  pageSelectThreshold: 8,
  activePageNumber: 3,
  selectedItemPerPage: 10,
  locales: {
    itemsPerPage: 'Items per page',
    of: 'of',
    items: 'items',
  },
}
