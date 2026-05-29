import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Feedback/Skeleton',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    variant: {
      options: ['rectangle', 'circle'],
      control: { type: 'select' },
    },
  },
};
/**
 * Basic Skeleton Example
 */
export const Skeleton = (args) => html `
  <wpp-skeleton-v4-1-0 .variant="${args.variant}" .width=${args.width} .height=${args.height} />
`;
Skeleton.args = {
  variant: 'rectangle',
  width: '',
  height: '',
};
