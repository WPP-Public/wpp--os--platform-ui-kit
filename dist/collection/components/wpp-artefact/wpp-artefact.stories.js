import { html } from 'lit-html';
const meta = {
  title: 'Design System/Components/AI/Artefact',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    size: {
      options: ['xs', 's', 'm', 'l', 'xl'],
      control: { type: 'select' },
    },
    isSelected: { control: 'boolean' },
  },
};
export default meta;
export const Artefact = {
  args: {
    artefactTitle: 'Title of the artefact',
    size: 'xs',
    actions: [
      {
        icon: 'wpp-icon-eye-off',
        label: 'Hide',
      },
      {
        icon: 'wpp-icon-eye-on',
        label: 'View',
      },
    ],
    titleIcon: 'wpp-icon-document',
  },
  render: args => html `
    <div
      class="react-flow__node react-flow__node-imageNode nopan selectable draggable"
      style="display: inline-block; outline: none"
      role="group"
      aria-roledescription="node"
      tabindex="0"
    >
      <wpp-artefact-v4-1-0
        .artefactTitle=${args.artefactTitle}
        .size=${args.size}
        .actions=${args.actions}
        .titleIcon=${args.titleIcon}
        .isSelected=${args.isSelected}
        @wppActionClick=${(e) => console.log('Action clicked:', e.detail)}
      >
        <div slot="body" style="display: flex; flex-direction: column; gap: 10px;">
          <wpp-typography-v4-1-0>This is the body of the artefact.</wpp-typography-v4-1-0>
          <wpp-typography-v4-1-0
            >You can put any content here, and it will become scrollable if it exceeds the maximum
            height.</wpp-typography-v4-1-0
          >
        </div>
      </wpp-artefact-v4-1-0>
    </div>
  `,
};
