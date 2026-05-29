import { html } from 'lit-html';
const meta = {
  title: 'Design System/Components/AI/Handle',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    type: {
      options: ['source', 'target'],
      control: { type: 'select' },
    },
    isSelected: {
      control: 'boolean',
    },
  },
};
export default meta;
export const Handle = {
  args: {
    type: 'source',
    isSelected: false,
  },
  render: args => html `
    <div
      class="react-flow__node react-flow__node-imageNode nopan selectable draggable"
      style="display: inline-block; outline: none; position: relative"
      role="group"
      aria-roledescription="node"
      tabindex="0"
    >
      <wpp-artefact-v4-1-0
        .size="m"
        .isSelected=${args.isSelected}
        @wppActionClick=${(e) => console.log('Action clicked:', e.detail)}
      >
        <div slot="handles">
          <div
            style="position: absolute; right: ${args.type === 'source'
    ? '0'
    : '100%'}; top: 32px; transform: translate(50%, -50%); width: 6px;
    height: 6px;"
          >
            <wpp-handle-v4-1-0 .isSelected=${args.isSelected} .type=${args.type} />
          </div>
        </div>
      </wpp-artefact-v4-1-0>
    </div>
  `,
};
