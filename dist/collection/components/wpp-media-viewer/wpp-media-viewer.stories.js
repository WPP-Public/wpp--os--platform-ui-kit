import { html } from 'lit-html';
// Khronos glTF sample asset "Box Textured" (CC BY 4.0, Cesium), loaded from the Khronos repository
const SAMPLE_MODEL = 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/BoxTextured/glTF-Binary/BoxTextured.glb';
const meta = {
  title: 'Design System/Components/Data display/Media Viewer',
  component: 'wpp-media-viewer',
  argTypes: {
    src: {
      control: 'text',
      description: 'URL of the model, or a list of URLs for a model split over several files',
      table: { type: { summary: 'string | string[]' }, defaultValue: { summary: "''" } },
    },
    size: {
      control: 'object',
      description: 'Viewer size in pixels or percent; never smaller than 400 × 400',
      table: {
        type: { summary: "{ width: number | '<n>%', height: number | '<n>%' }" },
        defaultValue: { summary: '{ width: 400, height: 400 }' },
      },
    },
    navigationMode: {
      control: 'inline-radio',
      options: ['free', 'fixed-up'],
      description: 'free turns the model on all three axes; fixed-up keeps its up axis vertical',
      table: { type: { summary: "'free' | 'fixed-up'" }, defaultValue: { summary: "'free'" } },
    },
    controlPanelConfig: {
      control: 'object',
      description: 'Which toolbars to show',
      table: {
        type: { summary: '{ showUploadButton?: boolean, showZoomControls?: boolean, showFullscreenButton?: boolean }' },
        defaultValue: { summary: '{ showUploadButton: true, showZoomControls: true, showFullscreenButton: true }' },
      },
    },
    maxFileSize: {
      control: 'number',
      description: 'Largest file, in MB, that can be uploaded or dropped',
      table: { type: { summary: 'number' }, defaultValue: { summary: 'undefined' } },
    },
  },
};
export default meta;
export const Default = {
  render: args => html `
    <wpp-media-viewer-v4-6-0
      .src=${args.src}
      .size=${args.size}
      .navigationMode=${args.navigationMode}
      .controlPanelConfig=${args.controlPanelConfig}
      .maxFileSize=${args.maxFileSize}
    ></wpp-media-viewer-v4-6-0>
  `,
  args: {
    src: SAMPLE_MODEL,
    size: { width: 400, height: 400 },
    navigationMode: 'free',
    controlPanelConfig: { showUploadButton: true, showZoomControls: true, showFullscreenButton: true },
  },
};
export const Empty = {
  render: Default.render,
  args: { src: '', size: { width: 400, height: 400 } },
};
