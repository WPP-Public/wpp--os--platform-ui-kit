import { html } from 'lit-html'
// NOTE: There are some issues with typings from storybook side.
// Waiting for the fix https://github.com/storybookjs/storybook/issues/16839
// import { Story, Meta } from '@storybook/web-components';
import { Components } from '../../../../components'
import WppPaginationSelectReadme from './readme.md'
import WppPaginationItemReadme from '../wpp-pagination-item/readme.md'

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
}

export const PageNumberSelect = (args: Components.WppPaginationSelect) =>
  html` <wpp-pagination-select-v3-1-1 .count="${args.count}" .activePageNumber="${args.activePageNumber}" />`

PageNumberSelect.args = {
  count: 8,
  activePageNumber: 2,
}

export const PageNumberInput = (args: Components.WppPaginationSelect) =>
  html` <wpp-pagination-select-v3-1-1 .count="${args.count}" .activePageNumber="${args.activePageNumber}" />`

PageNumberInput.args = {
  count: 10,
  activePageNumber: 2,
}
