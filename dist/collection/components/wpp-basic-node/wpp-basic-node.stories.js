import { html } from 'lit-html';
import { LOCALES_DEFAULTS } from './consts';
import { renderHandles } from './utils';
const meta = {
  title: 'Design System/Components/AI/BasicNode',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    isSelected: { control: 'boolean' },
    numberOfHandles: { control: 'select', options: ['1 handle', '3 handles'] },
    isLoading: { control: 'boolean' },
  },
};
export default meta;
export const BasicNode = {
  args: {
    nodeTitle: 'Title of the node that is truncated',
    numberOfHandles: '1 handle',
    isSelected: false,
    isLoading: false,
    actions: [
      {
        icon: 'wpp-icon-pinned',
        label: 'Pin Node',
      },
      {
        icon: 'wpp-icon-eye-on',
        label: 'View Node',
      },
    ],
    locales: LOCALES_DEFAULTS,
  },
  render: args => {
    const handleActionClick = (event) => {
      console.log('Event', event);
    };
    return html `
      <div
        class="react-flow__node react-flow__node-imageNode nopan selectable draggable"
        style="display: inline-block; outline: none; width: 280px; height: 280px; position: relative"
        role="group"
        aria-roledescription="node"
        tabindex="0"
      >
        <wpp-basic-node-v4-2-0
          .nodeTitle=${args.nodeTitle}
          .actions=${args.actions}
          .isSelected=${args.isSelected}
          .isLoading=${args.isLoading}
          .locales=${args.locales}
          @wppActionClick=${handleActionClick}
        >
          <div slot="body" style="display: flex; flex-direction: column; gap: 10px;">
            <wpp-typography-v4-2-0>This is the body of the basic node.</wpp-typography-v4-2-0>
            <wpp-typography-v4-2-0
              >You can put any content here, and it will become scrollable if it exceeds the maximum
              height.</wpp-typography-v4-2-0
            >
          </div>
          <div slot="handles">${renderHandles(args.numberOfHandles, args.isSelected, args.isLoading)}</div>
        </wpp-basic-node-v4-2-0>
      </div>
    `;
  },
};
