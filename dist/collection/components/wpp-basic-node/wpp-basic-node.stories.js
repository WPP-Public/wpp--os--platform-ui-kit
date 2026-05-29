import { html } from 'lit-html';
import { useState } from 'storybook/internal/preview-api';
import { LOCALES_DEFAULTS } from './consts';
const meta = {
  title: 'Design System/Components/AI/BasicNode',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    isSelected: { control: 'boolean' },
  },
};
export default meta;
export const BasicNode = {
  args: {
    nodeTitle: 'Title of the node that is truncated',
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
    isSelected: false,
  },
  render: args => {
    const [isLoading, setIsLoading] = useState(false);
    const handleActionClick = (event) => {
      console.log('Event', event);
      if (event.detail.icon === 'wpp-icon-play') {
        setIsLoading(true);
      }
      else if (event.detail.icon === 'wpp-icon-stop') {
        setIsLoading(false);
      }
    };
    return html `
      <div
        class="react-flow__node react-flow__node-imageNode nopan selectable draggable"
        style="display: inline-block; outline: none; width: 280px; height: 280px"
        role="group"
        aria-roledescription="node"
        tabindex="0"
      >
        <wpp-basic-node-v4-1-0
          .nodeTitle=${args.nodeTitle}
          .actions=${args.actions}
          .isSelected=${args.isSelected}
          .isLoading=${isLoading}
          .locales=${args.locales}
          @wppActionClick=${handleActionClick}
        >
          <div slot="body" style="display: flex; flex-direction: column; gap: 10px;">
            <wpp-typography-v4-1-0>This is the body of the basic node.</wpp-typography-v4-1-0>
            <wpp-typography-v4-1-0
              >You can put any content here, and it will become scrollable if it exceeds the maximum
              height.</wpp-typography-v4-1-0
            >
          </div>
        </wpp-basic-node-v4-1-0>
      </div>
    `;
  },
};
