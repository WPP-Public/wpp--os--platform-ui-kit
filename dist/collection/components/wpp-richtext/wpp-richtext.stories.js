import { html } from 'lit-html';
import { formats } from './types';
// @ts-ignore Vite raw import
import value from './test/test-value.html?raw';
export default {
  title: 'Design System/Components/Selection and input/Rich Text',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {},
  options: {
    storySort: {
      order: ['Editor', 'View', '*'],
      method: 'alphabetical',
    },
  },
};
const modules = JSON.stringify({
  toolbar: {
    aliases: {
      // Add image, video and attachments buttons to the embed section of toolbar
      embed: ['link', 'image', 'video', 'attachment'],
    },
  },
  // Enable custom upload handler for image, video and attachment
  imageUpload: true,
  videoUpload: true,
  attachmentUpload: true,
});
const changeHandler = {
  handleEvent(e) {
    console.log('wppChange', e);
  },
};
const selectionChangeHandler = {
  handleEvent(e) {
    console.log('wppSelectionChange', { ...e.detail.range }, e);
  },
};
function upload(file) {
  return new Promise(resolve => {
    const delay = 1000 + Math.floor(Math.random() * 2000);
    // Embed image as Data URL
    // const reader = new FileReader()
    //
    // reader.onload = function () {
    //   setTimeout(() => resolve(reader.result as string), delay)
    // }
    // reader.readAsDataURL(file)
    // Or embed via Blob URL for local experiments
    setTimeout(() => resolve(URL.createObjectURL(file)), delay);
  });
}
// There is also need to enable respective embed button in toolbar (image, video and attachment)
// and respective upload modules (imageUpload, videoUpload and attachmentUpload)
const uploadRequestHandler = {
  handleEvent(e) {
    console.log('wppUploadRequest', e);
    const type = e.detail.type;
    const callback = e.detail.callback;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = type === 'attachment' ? '*' : `${type}/*`;
    input.multiple = true;
    input.onchange = () => {
      const uploadItems = Array.from(input.files).map(file => ({
        file,
        promise: upload(file),
      }));
      callback(uploadItems);
    };
    input.click();
  },
};
/**
 * EDITOR STORY
 */
export const Editor = {
  render: (args) => html `
    <wpp-richtext-v4-1-0
      @wppChange="${changeHandler}"
      @wppSelectionChange="${selectionChangeHandler}"
      @wppUploadRequest="${uploadRequestHandler}"
      .name=${args.name}
      .value=${value}
      .placeholder=${args.placeholder}
      .modules=${args.modules}
      .format=${args.format}
      .disabled=${args.disabled}
      .required=${args.required}
      .labelConfig="${args.labelConfig}"
      .message="${args.message}"
      .messageType="${args.messageType}"
      .auto-focus="${args.autoFocus}"
      characters-limit="${args.charactersLimit}"
      warning-threshold="${args.warningThreshold}"
      style="width: 900px; height: 600px"
      class="custom-class-1"
    ></wpp-richtext-v4-1-0>
  `,
  args: {
    name: 'content',
    placeholder: 'Insert text here...',
    format: formats.markdown,
    modules,
    disabled: false,
    required: false,
    labelConfig: {
      icon: '',
      text: 'Content',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    message: '',
    messageType: undefined,
    autoFocus: false,
    charactersLimit: 0,
    warningThreshold: 0,
  },
  argTypes: {
    format: {
      options: Object.values(formats),
      control: { type: 'select' },
    },
    messageType: {
      options: [undefined, 'warning', 'error'],
      control: { type: 'select' },
    },
    charactersLimit: {
      type: 'number',
    },
  },
};
/**
 * VIEW STORY
 * Shows an empty Richtext editor and a live-updating Richtext view below it.
 */
export const View = {
  render: (args) => {
    // Local variable to store the current value
    let currentValue = '';
    // Change handler updates the view's value
    const liveChangeHandler = {
      handleEvent(e) {
        currentValue = e.detail.value;
        const viewEl = document.querySelector('wpp-richtext-view-v3-2-0');
        if (viewEl) {
          const viewInstance = viewEl;
          viewInstance.value = currentValue;
        }
      },
    };
    return html `
      <wpp-richtext-v4-1-0
        @wppChange="${liveChangeHandler}"
        @wppSelectionChange="${selectionChangeHandler}"
        @wppUploadRequest="${uploadRequestHandler}"
        .name="markdownContent"
        .value=${value}
        .placeholder=${args.placeholder}
        .modules=${args.modules}
        .format=${args.format}
        .disabled=${args.disabled}
        .required=${args.required}
        .labelConfig="${args.labelConfig}"
        .message="${args.message}"
        .messageType="${args.messageType}"
        .auto-focus="${args.autoFocus}"
        characters-limit="${args.charactersLimit}"
        warning-threshold="${args.warningThreshold}"
        style="width: 900px; height: 300px"
        class="custom-class-1"
      ></wpp-richtext-v4-1-0>

      <wpp-typography-v4-1-0 type="m-strong">Markdown view with preserve whitespace</wpp-typography-v4-1-0>

      <wpp-richtext-view-v4-1-0
        .value=${value}
        .format=${args.format}
        .name="markdownContent"
      ></wpp-richtext-view-v4-1-0>
    `;
  },
  args: {
    name: 'markdownContent',
    placeholder: 'Insert text here...',
    format: formats.markdown,
    modules,
    disabled: false,
    required: false,
    labelConfig: {
      icon: '',
      text: 'Content',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    message: '',
    messageType: undefined,
    autoFocus: false,
    charactersLimit: 0,
    warningThreshold: 0,
    value: '',
  },
  argTypes: {
    format: {
      options: Object.values(formats),
      control: { type: 'select' },
    },
  },
};
