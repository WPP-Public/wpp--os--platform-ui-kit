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
const controlledResetFile = {
  url: 'https://test.png',
  name: 'below_1MB-file-1.png',
  size: 171615,
  type: '',
  lastModified: 1778255189233,
};
const getControlledResetValue = () => [{ ...controlledResetFile }];
export const FileUpload = {
  render: args => html ` <wpp-file-upload-v4-1-0
      .disabled=${args.disabled}
      .acceptConfig=${args.acceptConfig}
      .size=${args.size}
      .maxFiles=${args.maxFiles}
      .multiple=${args.multiple}
      .messageType=${args.messageType}
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
export const ControlledReset = {
  render: () => {
    const fileUploadId = `controlled-reset-${Math.random().toString(36).slice(2, 9)}`;
    let controlledValue = getControlledResetValue();
    const updateControlledValue = (fileUpload, value) => {
      if (!fileUpload)
        return;
      controlledValue = value;
      fileUpload.value = controlledValue;
    };
    const getFileUpload = () => document.getElementById(fileUploadId);
    return html `
      <div style="display: flex; flex-direction: column; gap: 12px; width: 320px;">
        <wpp-file-upload-v4-1-0
          id=${fileUploadId}
          controlled
          .value=${controlledValue}
          .labelConfig=${{
      text: 'Controlled file-upload',
      icon: 'wpp-icon-info',
      description: 'Description',
    }}
          @wppChange=${(event) => {
      updateControlledValue(event.currentTarget, [
        ...(event.detail.value || []),
        ...event.detail.errorFiles,
      ]);
    }}
        />
        <div style="display: flex; gap: 8px;">
          <wpp-button-v4-1-0 @click=${() => updateControlledValue(getFileUpload(), [])}>
            Reset controlled value
          </wpp-button-v4-1-0>
          <wpp-button-v4-1-0 @click=${() => updateControlledValue(getFileUpload(), getControlledResetValue())}>
            Restore controlled value
          </wpp-button-v4-1-0>
        </div>
      </div>
    `;
  },
};
