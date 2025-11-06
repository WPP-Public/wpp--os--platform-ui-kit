import { html } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Selection and input/File Upload',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    size: { type: 'number' },
    maxFiles: { type: 'number' },
    multiple: { type: 'boolean' },
    maxLabelLength: {
      type: 'number',
    },
    messageType: {
      options: [null, 'error'],
      control: { type: 'select' },
    },
  },
};
export const FileUpload = (args) => html ` <wpp-file-upload-v2-22-0
    .disabled=${args.disabled}
    .acceptConfig=${args.acceptConfig}
    .size=${args.size}
    .maxFiles=${args.maxFiles}
    .multiple=${args.multiple}
    .messageType=${args.messageType}
    .maxLabelLength=${args.maxLabelLength}
    .message=${args.message}
    .locales=${args.locales}
    @wppFileUploadItemDelete="${(e) => console.log('wppFileUploadItemDelete', e.detail)}"
    @wppFileUploadItemClick="${(e) => console.log('wppFileUploadItemClick', e.detail)}"
  />`;
FileUpload.args = {
  disabled: false,
  size: 50,
  multiple: true,
  maxFiles: 0,
  acceptConfig: {
    'image/png': ['.png'],
    'text/html': ['.htm', '.html'],
  },
  maxLabelLength: 30,
  message: '',
  locales: {
    label: 'Choose a file',
    text: 'to upload or drag it here',
    sizeError: 'File exceeds size limit',
    formatError: 'Wrong format',
    info: (accept, size) => `Only ${accept} file at ${size} MB or less`,
  },
};
