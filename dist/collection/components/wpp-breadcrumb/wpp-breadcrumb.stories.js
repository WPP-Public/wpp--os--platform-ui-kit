import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Navigation/Breadcrumbs',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    items: {
      control: 'array',
      if: { arg: 'backBtnLabel', truthy: false }, // Only show items when backBtnLabel is not set
    },
    maxLabelLength: {
      control: 'number',
      if: { arg: 'backBtnLabel', truthy: false }, // Only show when backBtnLabel is not set
    },
    middleTruncation: {
      control: 'boolean',
      if: { arg: 'backBtnLabel', truthy: false }, // Only show when backBtnLabel is not set
    },
    nativeLink: {
      control: 'boolean',
      if: { arg: 'backBtnLabel', truthy: false }, // Only show when backBtnLabel is not set
    },
    backBtnLabel: {
      control: 'text',
      description: 'If provided, renders a back button with the specified label instead of the breadcrumb. Clear this field to show normal breadcrumb.',
    },
  },
};
export const Breadcrumbs = {
  render: args => {
    console.log('Rendering with backBtnLabel:', args.backBtnLabel);
    return html `
      <div>
        <p style="margin-bottom: 20px; color: #666;">
          ${args.backBtnLabel
      ? `Back button mode: "${args.backBtnLabel}"`
      : 'Breadcrumb mode (clear backBtnLabel to switch to back button)'}
        </p>
        <wpp-breadcrumb-v4-1-0
          .items="${args.backBtnLabel ? undefined : args.items}"
          .maxLabelLength="${args.backBtnLabel ? undefined : args.maxLabelLength}"
          .middleTruncation="${args.backBtnLabel ? undefined : args.middleTruncation}"
          .nativeLink="${args.backBtnLabel ? undefined : args.nativeLink}"
          .backBtnLabel="${args.backBtnLabel || undefined}"
          @wppChange="${(e) => {
      console.log('Event received:', e.detail);
      alert(`Clicked: ${JSON.stringify(e.detail)}`);
    }}"
        />
      </div>
    `;
  },
  args: {
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
    backBtnLabel: '',
  },
};
