import { Story, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { WppBreadcrumb } from './wpp-breadcrumb'
import readme from './readme.md'

export default {
  title: 'Design System/Components/Navigation/Breadcrumbs',

  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },

    notes: readme,
  },

  argTypes: {
    items: {
      control: 'array',
    },

    maxLabelLength: {
      type: 'number',
    },

    middleTruncation: {
      type: 'boolean',
    },
    nativeLink: { control: { type: 'boolean' } },
  },
} as Meta<typeof WppBreadcrumb>

export const Breadcrumbs: Story<Components.WppBreadcrumb> = (
  args: Components.WppBreadcrumb,
) => html`<wpp-breadcrumb-v3-1-1
  .items="${args.items}"
  .maxLabelLength="${args.maxLabelLength}"
  .middleTruncation="${args.middleTruncation}"
  .nativeLink=${args.nativeLink}
/>`

Breadcrumbs.args = {
  items: [
    {
      label: 'Home',
      path: '/',
    },

    {
      label: 'Alfa',
      path: '/alfa',
    },

    {
      label: 'Bravo (International Radiotelephony Spelling Alphabet)',
      path: '/alfa/bravo',
    },

    {
      label: 'Charlie',
      path: '/alfa/bravo/charlie',
    },

    {
      label: 'Delta (International Radiotelephony Spelling Alphabet)',
      path: '/alfa/bravo/charlie/delta',
    },

    {
      label: 'Echo',
      path: '/alfa/bravo/charlie/delta/echo',
    },

    {
      label: 'Foxtrot',
      path: '/alfa/bravo/charlie/delta/echo/foxtrot',
    },
  ],

  nativeLink: false,
  maxLabelLength: 30,
  middleTruncation: false,
}
