import { html, render } from 'lit-html';
import { transformToVersionedTag } from '../../../../utils/utils';
export default {
  title: 'Design System/Components/Selection and input/Chat Input',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    enableAttach: { control: { type: 'boolean' }, defaultValue: false },
    // enableMic: { control: { type: 'boolean' }, defaultValue: false },
    disabled: { control: { type: 'boolean' }, defaultValue: false },
    charactersLimit: { control: { type: 'number' }, defaultValue: 280 },
    fileUploadConfig: { control: { type: 'object' } },
    size: {
      control: { type: 'select' },
      options: ['s', 'm'],
      defaultValue: 'm',
    },
    textValue: { control: { type: 'text' }, defaultValue: '' },
    debounceEnabled: { control: { type: 'boolean' }, defaultValue: true },
    debounceDelay: { control: { type: 'number' }, defaultValue: 300 },
    locales: { control: { type: 'object' } },
    ariaProps: { control: { type: 'object' } },
    htmlAttributes: { control: { type: 'object' } },
  },
};
export const DefaultChatInput = {
  render: args => {
    let textValue = args.textValue || '';
    let messageHistory = [];
    let isSelectOpen = false;
    let selectedModel = 'Select models';
    let renderChatInput = (messages) => {
      console.log(messages);
    };
    const modelOptions = [
      { label: 'GPT-4.1', value: 'gpt-4.1' },
      { label: 'Claude sonnet 3.5', value: 'claude-sonnet-3.5' },
      { label: 'GPT-4o', value: 'gpt-4o' },
    ];
    const dropdownConfig = {
      onShow: () => {
        isSelectOpen = true;
        renderChatInput(messageHistory);
      },
      onHide: () => {
        isSelectOpen = false;
        renderChatInput(messageHistory);
      },
    };
    const handleModelSelect = (model) => {
      selectedModel = model.label;
      renderChatInput(messageHistory);
    };
    const handleSendMessage = (event) => {
      const { message, attachments } = event.detail;
      console.log('Message Sent:', message, 'Attachments:', attachments);
      messageHistory = [...messageHistory, message];
      renderChatInput(messageHistory);
      const chatHtmlTag = transformToVersionedTag('wpp-chat-input');
      const el = document.querySelector(chatHtmlTag);
      textValue = '';
      if (el)
        el.textValue = '';
    };
    const handleMessageChanged = (event) => {
      const chatHtmlTag = transformToVersionedTag('wpp-chat-input');
      const el = document.querySelector(chatHtmlTag);
      textValue = event.detail.value;
      if (el)
        el.textValue = event.detail.value;
    };
    renderChatInput = (updatedMessages) => {
      const container = document.getElementById('chat-input-story');
      if (!container) {
        console.error('Could not find container element with id "chat-input-story"');
        return;
      }
      render(html `
          <div style=${'display: flex; flex-direction: column; height: 100vh; padding: 20px; box-sizing: border-box;'}>
            <div style=${'display: flex;'}>
              <wpp-typography-v4-0-0>Message History:</wpp-typography-v4-0-0>
              <ul style="margin:0;">
                ${updatedMessages.map(msg => html `<li><wpp-typography-v4-0-0>${msg}</wpp-typography-v4-0-0></li>`)}
              </ul>
            </div>

            <div style=${'display: flex; align-items: flex-end; height: 100vh;'}>
              <wpp-chat-input-v4-0-0
                .enableAttach=${args.enableAttach}
                .disabled=${args.disabled}
                .charactersLimit=${args.charactersLimit}
                .fileUploadConfig=${args.fileUploadConfig}
                .size=${args.size}
                .textValue=${textValue}
                .debounceEnabled=${args.debounceEnabled}
                .debounceDelay=${args.debounceDelay}
                .locales=${args.locales}
                .ariaProps=${args.ariaProps}
                .htmlAttributes=${args.htmlAttributes}
                .withSelect=${args.withSelect}
                @wppSend=${handleSendMessage}
                @wppMessageChanged=${handleMessageChanged}
              >
                <wpp-menu-context-v4-0-0 .slot=${'select'} .dropdownConfig=${dropdownConfig}>
                  <wpp-action-button-v4-0-0
                    slot="trigger-element"
                    variant="secondary"
                    .disabled=${args.disabled}
                    style="--wpp-action-button-font-weight: 400; --wpp-action-button-secondary-icon-color: var(--wpp-grey-color-600);"
                  >
                    ${selectedModel}
                    <wpp-icon-chevron-v4-0-0
                      slot="icon-end"
                      direction=${isSelectOpen ? 'up' : 'down'}
                    ></wpp-icon-chevron-v4-0-0>
                  </wpp-action-button-v4-0-0>
                  <div>
                    ${modelOptions.map(model => html `
                        <wpp-list-item-v4-0-0
                          .checked=${selectedModel === model.label}
                          @wppChangeListItem=${() => handleModelSelect(model)}
                        >
                          <span slot="label">${model.label}</span>
                        </wpp-list-item-v4-0-0>
                      `)}
                  </div>
                </wpp-menu-context-v4-0-0>
              </wpp-chat-input-v4-0-0>
            </div>
          </div>
        `, container);
    };
    setTimeout(() => {
      renderChatInput(messageHistory);
    }, 0);
    return html `<div id="chat-input-story"></div>`;
  },
  args: {
    enableAttach: true,
    size: 's',
    disabled: false,
    charactersLimit: 280,
    debounceEnabled: true,
    debounceDelay: 300,
    // Use locales for visible strings (including placeholder)
    locales: {
      placeholder: 'Type your message...',
      minimizedDescription: 'Expand message input',
      actionsToolbarLabel: 'Message actions',
      attachmentsLabel: 'Attachments',
      sendLabel: 'Send message',
      attachLabel: 'Attach file',
      rightActionsGroupLabel: 'Send and character counter',
      leftActionsGroupLabel: 'Attachments and tools',
      messageInputLabel: 'Message input',
    },
    // ARIA overrides (scoped Pick of AriaProps in the component)
    ariaProps: {
      minimizedTrigger: { label: 'Type your message...' },
      textarea: { label: 'Message input' },
      actionsToolbar: { label: 'Message actions' },
      leftActionsGroup: { label: 'Attachments and tools' },
      rightActionsGroup: { label: 'Send and character counter' },
      sendButton: { label: 'Send message' },
      attachButton: { label: 'Attach file' },
    },
    // Grouped native attributes; DO NOT set maxLength here to allow typing beyond charactersLimit
    htmlAttributes: {
      textarea: { id: 'message', name: 'message', autocomplete: 'off' },
      attachmentsInput: { id: 'ci-files', name: 'attachments', accept: '.jpg,.png,.pdf', multiple: true },
    },
    fileUploadConfig: {
      format: 'base64',
      multiple: true,
      maxFiles: 5,
      size: 50,
      acceptConfig: {
        'image/png': ['.png'],
        'image/jpeg': ['.jpg', '.jpeg'],
        'application/pdf': ['.pdf'],
      },
      locales: {
        sizeError: 'File too large!',
        formatError: 'Invalid file format!',
        limitError: 'Files limit reached',
      },
    },
    withSelect: false,
  },
};
