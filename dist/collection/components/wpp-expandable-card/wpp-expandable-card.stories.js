import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Surfaces/Expandable Card',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: {
      options: ['s', 'm', 'l', 'xl', '2xl'],
      control: { type: 'select' },
    },
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'select' },
    },
  },
};
const handleTypographyType = (size) => {
  if (size === 's')
    return 's-strong';
  if (size === 'm')
    return 'm-strong';
  if (size === 'l')
    return 'l-strong';
  if (size === 'xl')
    return 'xl-heading';
  if (size === '2xl')
    return '2xl-heading';
};
export const Expandable = {
  render: args => html `
  <div style="display: flex; gap: 10px; flex-direction: column">
  <wpp-expandable-card-v4-1-0 .size="${args.size}" .variant="${args.variant}">
    <wpp-typography-v4-1-0 type="s-body">
      Having a proactive Board and strong leadership that is deeply committed to high ethical standards is a business
      imperative for ensuring sustainable success.Lorem Ipsum is simply dummy text of the printing and typesetting
      industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
      took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with
      the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
      like Aldus PageMaker including versions of Lorem Ipsum.
    </wpp-typography-v4-1-0>
    <wpp-typography-v4-1-0
      style='overflow: hidden; white-space: nowrap; text-overflow: ellipsis'
      type=${handleTypographyType(args.size)}
      slot="header"
    >Governance & Ethics</wpp-typography-v4-1-0>
    <div slot="actions">
      <wpp-action-button-v4-1-0 variant="secondary">
        Action
        <wpp-icon-plus-v4-1-0 slot="icon-start"></wpp-icon-plus>
      </wpp-action-button-v4-1-0>
    </div>
  </wpp-expandable-card-v4-1-0>

  <wpp-expandable-card-v4-1-0 .size="${args.size}" .variant="${args.variant}" is-expanded>
    <wpp-typography-v4-1-0
      style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis"
      type=${handleTypographyType(args.size)}
      slot="header"
      >Card with interactive content</wpp-typography-v4-1-0
    >
    <div style="display: flex; flex-direction: column; gap: 12px; padding: 8px 0">
      <wpp-input-v4-1-0
        .labelConfig=${{ text: 'Text input' }}
        placeholder="Type here -- card should not collapse"
      ></wpp-input-v4-1-0>
      <wpp-textarea-input-v4-1-0
        .labelConfig=${{ text: 'Textarea' }}
        placeholder="Type here -- card should not collapse"
      ></wpp-textarea-input-v4-1-0>
    </div>
  </wpp-expandable-card-v4-1-0>
  </div>
`,
  args: {
    size: 'm',
    variant: 'primary',
  },
};
