import { html } from 'lit-html';
const meta = {
  title: 'Design System/Components/Data display/Video Player',
  component: 'wpp-video-player',
  argTypes: {
    src: {
      control: 'text',
      description: 'URL or array of URLs for the video source',
      table: {
        type: { summary: 'string | string[]' },
        defaultValue: { summary: '' },
      },
    },
    thumbnail: {
      control: 'text',
      description: 'URL for the video thumbnail image',
      table: {
        type: { summary: 'string' },
        defaultValue: { summary: 'undefined' },
      },
    },
    size: {
      control: 'object',
      description: 'Video player dimensions',
      table: {
        type: { summary: '{ width: number | string, height: number | string }' },
        defaultValue: { summary: '{ width: 640, height: 360 }' },
      },
    },
    controlPanelConfig: {
      control: 'object',
      description: 'Configuration for the control panel',
      table: {
        type: { summary: '{ autoplay: boolean, loop: boolean, mute: boolean, fullscreen: boolean }' },
        defaultValue: { summary: '{ autoplay: false, loop: true, mute: false, fullscreen: false }' },
      },
    },
  },
};
export default meta;
export const Default = {
  render: args => html `
    <wpp-video-player-v3-3-0
      .src=${args.src}
      .thumbnail=${args.thumbnail}
      .size=${args.size}
      .controlPanelConfig=${args.controlPanelConfig}
    ></wpp-video-player-v3-3-0>
  `,
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    size: { width: 640, height: 360 },
    thumbnail: 'https://dummyimage.com/640x360/0015cc/ffffff.jpg',
    controlPanelConfig: {
      autoplay: false,
      loop: false,
      showFullscreenButton: true,
      showVolumeButton: true,
    },
  },
};
export const Autoplay = {
  render: Default.render,
  parameters: {
    controls: { exclude: ['thumbnail'] },
  },
  args: {
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    size: { width: 640, height: 360 },
    controlPanelConfig: {
      autoplay: true,
      loop: true,
    },
  },
};
