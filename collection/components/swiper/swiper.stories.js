import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Surfaces/Swiper (Carousel)',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
    notes: { readme },
  },
};
export const CustomElement = () => html `<iframe width="100%" height="800px" src="https://ag-test.surge.sh/swiper?storybook-demo"></iframe>`;
