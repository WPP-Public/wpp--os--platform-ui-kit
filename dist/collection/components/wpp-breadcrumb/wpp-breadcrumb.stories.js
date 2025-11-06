import { html } from 'lit-html';
import readme from './readme.md';
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
};
export const Breadcrumbs = (args) => html `<wpp-breadcrumb-v2-22-0
  .items="${args.items}"
  .maxLabelLength="${args.maxLabelLength}"
  .middleTruncation="${args.middleTruncation}"
  .nativeLink=${args.nativeLink}
/>`;
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
};
