import { html, render } from 'lit-html';
import readme from './readme.md';
export default {
  title: 'Design System/Components/Communication/Chat Input',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    notes: readme,
  },
  argTypes: {
    placeholder: { control: { type: 'text' }, defaultValue: 'Type your message...' },
    enableAttach: { control: { type: 'boolean' }, defaultValue: false },
    // enableMic: { control: { type: 'boolean' }, defaultValue: false },
    disabled: { control: { type: 'boolean' }, defaultValue: false },
    charactersLimit: { control: { type: 'number' }, defaultValue: 280 },
    fileUploadConfig: { control: { type: 'object' } },
  },
};
export const DefaultChatInput = (args) => {
  let messageHistory = [];
  let renderChatInput = (messages) => {
    console.log(messages);
  };
  const handleSendMessage = (event) => {
    const { message, attachments } = event.detail;
    console.log('Message Sent:', message, 'Attachments:', attachments);
    messageHistory = [...messageHistory, message];
    renderChatInput(messageHistory);
  };
  renderChatInput = (updatedMessages) => {
    const container = document.getElementById('chat-input-story');
    if (container) {
      render(html `
          <div style=${'display: flex; flex-direction: column; height: 100vh; padding: 20px; box-sizing: border-box;'}>
            <div style=${'display: flex;'}>
              <wpp-typography-v2-22-0>Message History:</wpp-typography-v2-22-0>
              <ul>
                ${updatedMessages.map(msg => html `<li><wpp-typography-v2-22-0>${msg}</wpp-typography-v2-22-0></li>`)}
              </ul>
            </div>

            <div style=${'display: flex; align-items: flex-end; height: 100vh;'}>
              <wpp-chat-input-v2-22-0
                .placeholder=${args.placeholder}
                .enableAttach=${args.enableAttach}
                .disabled=${args.disabled}
                .charactersLimit=${args.charactersLimit}
                .fileUploadConfig=${args.fileUploadConfig}
                @wppSend=${handleSendMessage}
              >
              </wpp-chat-input-v2-22-0>
            </div>
          </div>
        `, container);
    }
    else {
      console.error('Could not find container element with id "chat-input-story"');
    }
  };
  setTimeout(() => {
    renderChatInput(messageHistory);
  }, 0);
  return html `<div id="chat-input-story"></div>`;
};
DefaultChatInput.args = {
  placeholder: 'Type your message...',
  enableAttach: true,
  //   enableMic: false,
  disabled: false,
  charactersLimit: 280,
  fileUploadConfig: {
    format: 'base64',
    multiple: true,
    maxFiles: 5,
    size: 50,
    accept: ['.jpg', '.jpeg', '.png', '.pdf'],
    acceptConfig: {
      'image/png': ['.png'],
      'application/pdf': ['.pdf'],
    },
    locales: {
      sizeError: 'File too large!',
      formatError: 'Invalid file format!',
    },
  },
};
// DefaultChatInput.parameters = {
//   controls: { exclude: ['fileUploadConfig'] },
// }
