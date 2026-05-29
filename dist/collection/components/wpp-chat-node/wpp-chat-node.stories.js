import { html } from 'lit-html';
const CHAT_ACTIONS = [
  { icon: 'wpp-icon-document', label: 'Attach brief' },
  { icon: 'wpp-icon-image', label: 'Add reference image' },
];
const CHAT_MODELS = [
  { id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' },
  { id: 'claude-sonnet', label: 'Claude Sonnet', icon: 'wpp-icon-ai' },
];
const LONG_TITLE = 'AI-generated title that should truncate to one row and show the full value in the tooltip';
const CHAT_MESSAGES = [
  {
    id: 'story-user-1',
    role: 'user',
    content: 'Create a launch concept using the attached references.',
    attachments: [
      {
        name: 'street-reference.jpg',
        type: 'image/jpeg',
        url: 'https://picsum.photos/seed/chat-node-reference/240/180',
        alt: 'Street reference',
      },
      {
        name: 'motion-study.mp4',
        type: 'video/mp4',
        thumbnailUrl: 'https://picsum.photos/seed/chat-node-motion/240/180',
        alt: 'Motion study',
      },
    ],
  },
  {
    id: 'story-assistant-1',
    role: 'assistant',
    content: 'Here is a first pass with a concise visual direction, draft messaging, and a few production notes. The longer response intentionally creates body overflow so the stable scrollbar gutter and balanced padding can be reviewed in this single story.',
  },
  {
    id: 'story-user-2',
    role: 'user',
    content: 'Make the tone sharper and keep the layout compact for the canvas view.',
  },
  {
    id: 'story-assistant-2',
    role: 'assistant',
    content: 'Updated direction: tighter copy, stronger hierarchy, and a compact response that still leaves enough content in the node body to verify scrolling, message actions, avatars, and the footer controls together.',
  },
];
const seedStoryMessages = (nodeId) => {
  requestAnimationFrame(() => {
    const node = document.getElementById(nodeId);
    if (!node || node.dataset.messagesSeeded === 'true')
      return;
    node.dataset.messagesSeeded = 'true';
    CHAT_MESSAGES.forEach(message => {
      void node.addMessage(message);
    });
  });
};
const meta = {
  title: 'Design System/Components/AI/Chat Node',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    nodeTitle: {
      control: { type: 'text' },
    },
    titleIcon: {
      control: { type: 'text' },
    },
    isLoading: {
      control: { type: 'boolean' },
    },
    isSelected: {
      control: { type: 'boolean' },
    },
    size: {
      options: ['s', 'm'],
      control: { type: 'select' },
    },
    actions: {
      control: { type: 'object' },
    },
    messageActions: {
      control: { type: 'object' },
    },
    models: {
      control: { type: 'object' },
    },
    selectedModelId: {
      options: CHAT_MODELS.map(model => model.id),
      control: { type: 'select' },
    },
    locales: {
      control: { type: 'object' },
    },
  },
};
export default meta;
export const ChatNode = {
  args: {
    nodeTitle: LONG_TITLE,
    titleIcon: 'wpp-icon-service',
    isLoading: false,
    isSelected: false,
    size: 'm',
    actions: CHAT_ACTIONS,
    models: CHAT_MODELS,
    selectedModelId: 'gpt-45',
    locales: {},
  },
  render: args => {
    const nodeId = 'chat-node-story-node';
    seedStoryMessages(nodeId);
    return html `<div
      class="react-flow__node react-flow__node-chatNode nopan selectable draggable"
      style="display: inline-block; position: relative; outline: none; padding: 24px; background: var(--wpp-grey-color-100); height: auto; width: 100%; box-sizing: border-box;"
      role="group"
      aria-roledescription="node"
      tabindex="0"
    >
      <div style="position: relative; width: 320px; height: 360px;">
        <wpp-chat-node-v4-1-0
          id=${nodeId}
          .nodeTitle=${args.nodeTitle}
          .titleIcon=${args.titleIcon}
          .isLoading=${args.isLoading}
          .isSelected=${args.isSelected}
          .size=${args.size}
          .actions=${args.actions ?? []}
          .messageActions=${args.messageActions}
          .models=${args.models ?? []}
          .selectedModelId=${args.selectedModelId}
          .locales=${args.locales ?? {}}
        />
      </div>
    </div>`;
  },
};
