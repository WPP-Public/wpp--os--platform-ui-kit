import { StoryObj, Meta } from '@storybook/web-components'
import { html, render } from 'lit-html'

import { Components } from '../../../../components'
import { transformToVersionedTag } from '../../../../utils/utils'

export default {
  title: 'Design System/Components/Communication/Chat Input',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    placeholder: { control: { type: 'text' }, defaultValue: 'Type your message...' },
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
  },
} as Meta<Components.WppChatInput>

export const DefaultChatInput: StoryObj<Components.WppChatInput> = {
  render: args => {
    let textValue = args.textValue || ''
    let messageHistory: string[] = []
    let renderChatInput = (messages: string[]) => {
      console.log(messages)
    }

    const handleSendMessage = (event: CustomEvent) => {
      const { message, attachments } = event.detail

      console.log('Message Sent:', message, 'Attachments:', attachments)

      messageHistory = [...messageHistory, message]
      renderChatInput(messageHistory)

      const chatHtmlTag = transformToVersionedTag('wpp-chat-input')
      const updatedEl = document.querySelector(chatHtmlTag)

      textValue = ''
      if (updatedEl) (updatedEl as HTMLWppChatInputElement).textValue = ''
    }

    const handleMessageChanged = (event: CustomEvent) => {
      const chatHtmlTag = transformToVersionedTag('wpp-chat-input')
      const updatedEl = document.querySelector(chatHtmlTag)

      textValue = event.detail.value
      if (updatedEl) (updatedEl as HTMLWppChatInputElement).textValue = event.detail.value
    }

    renderChatInput = (updatedMessages: string[]) => {
      const container = document.getElementById('chat-input-story')

      if (container) {
        render(
          html`
            <div
              style=${'display: flex; flex-direction: column; height: 100vh; padding: 20px; box-sizing: border-box;'}
            >
              <div style=${'display: flex;'}>
                <wpp-typography-v3-3-0>Message History:</wpp-typography-v3-3-0>
                <ul>
                  ${updatedMessages.map(msg => html`<li><wpp-typography-v3-3-0>${msg}</wpp-typography-v3-3-0></li>`)}
                </ul>
              </div>

              <div style=${'display: flex; align-items: flex-end; height: 100vh;'}>
                <wpp-chat-input-v3-3-0
                  .placeholder=${args.placeholder}
                  .enableAttach=${args.enableAttach}
                  .disabled=${args.disabled}
                  .charactersLimit=${args.charactersLimit}
                  .fileUploadConfig=${args.fileUploadConfig}
                  .size=${args.size}
                  .textValue=${textValue}
                  .debounceEnabled=${args.debounceEnabled}
                  .debounceDelay=${args.debounceDelay}
                  @wppSend=${handleSendMessage}
                  @wppMessageChanged=${handleMessageChanged}
                >
                </wpp-chat-input-v3-3-0>
              </div>
            </div>
          `,
          container,
        )
      } else {
        console.error('Could not find container element with id "chat-input-story"')
      }
    }

    setTimeout(() => {
      renderChatInput(messageHistory)
    }, 0)

    return html`<div id="chat-input-story"></div>`
  },
  args: {
    placeholder: 'Type your message...',
    enableAttach: true,
    size: 's',
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
        limitError: 'Files limit reached',
      },
    },
  },
}
