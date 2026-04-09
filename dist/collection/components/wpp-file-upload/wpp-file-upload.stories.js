import { html } from 'lit-html';
export default {
  title: 'Design System/Components/Selection and input/File Upload',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    size: { type: 'number' },
    maxFiles: { type: 'number' },
    multiple: { type: 'boolean' },
    maxLabelLength: {
      type: 'number',
    },
    required: { type: 'boolean' },
    messageType: {
      options: [null, 'error'],
      control: { type: 'select' },
    },
  },
};
export const FileUpload = {
  render: args => html ` <wpp-file-upload-v3-6-0
      .disabled=${args.disabled}
      .acceptConfig=${args.acceptConfig}
      .size=${args.size}
      .maxFiles=${args.maxFiles}
      .multiple=${args.multiple}
      .messageType=${args.messageType}
      .maxLabelLength=${args.maxLabelLength}
      .labelConfig=${args.labelConfig}
      .required=${args.required}
      .message=${args.message}
      .locales=${args.locales}
      @wppFileUploadItemDelete="${(e) => console.log('wppFileUploadItemDelete', e.detail)}"
      @wppFileUploadItemClick="${(e) => console.log('wppFileUploadItemClick', e.detail)}"
      @wppError="${(e) => console.log('wppError', e.detail)}"
    />`,
  args: {
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
    labelConfig: {
      text: 'File Upload',
      icon: 'wpp-icon-info',
      description: 'More info',
    },
    required: true,
    locales: {
      label: 'Choose a file',
      text: 'to upload or drag it here',
      sizeError: 'File exceeds size limit',
      formatError: 'Wrong format',
      info: (accept, size) => `Only ${accept} file at ${size} MB or less`,
      singleFileLimitError: 'Only one file is allowed',
      multipleFileLimitError: 'Too many files uploaded',
    },
  },
};
