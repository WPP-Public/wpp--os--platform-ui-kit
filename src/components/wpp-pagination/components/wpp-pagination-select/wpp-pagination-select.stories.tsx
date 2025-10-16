import { StoryObj } from '@storybook/web-components'
import { html } from 'lit-html'
import { Components } from '../../../../components'

export default {
  title: 'Design System/Components/Navigation/Pagination/Pagination Type',
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
}

export const Select: StoryObj<Components.WppPaginationSelect> = (args: Components.WppPaginationSelect) =>
  html` <wpp-pagination-select-v3-2-0 .count="${args.count}" .activePageNumber="${args.activePageNumber}" />`

Select.args = {
  count: 8,
  activePageNumber: 2,
}

export const Input: StoryObj<Components.WppPaginationSelect> = (args: Components.WppPaginationSelect) =>
  html` <wpp-pagination-select-v3-2-0 .count="${args.count}" .activePageNumber="${args.activePageNumber}" />`

Input.args = {
  count: 10,
  activePageNumber: 2,
}
