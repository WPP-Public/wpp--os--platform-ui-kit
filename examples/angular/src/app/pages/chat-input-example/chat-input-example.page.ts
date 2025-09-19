import { Component } from '@angular/core'
import { FileUploadConfig, SendEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-chat-input-example',
  templateUrl: './chat-input-example.page.html',
  styleUrls: ['./chat-input-example.page.scss'],
})
export class ChatInputExamplePage {
  messages = [
    'What is the best way to market a product?',
    'How to create a marketing strategy?',
    'What are the latest trends in digital marketing?',
    'How to measure the success of a marketing campaign?',
    'What are the best tools for social media marketing?',
  ]

  randomizeMessage = () => this.messages[Math.floor(Math.random() * this.messages.length)]
  charactersLimit = 200
  disable = false
  chatValue = ''
  disableDebounce = true

  fileUploadConfig: Partial<FileUploadConfig> = {
    acceptConfig: {},
    accept: [],
    size: 50,
    // maxFiles: 5,
    // multiple: true,
    // showOnlyNewErrors: true,
    // accept: ['.png', '.jpg', '.jpeg', '.pdf']
    // showOnlyNewErrors: true // Optional: Replace old errors with new ones
    // acceptConfig: {
    //   'image/png': ['.png'],
    //   'image/jpeg': ['.jpg', '.jpeg'],
    //   'application/pdf': ['.pdf'],
    // }
  }
  public LIST = [
    {
      value: 'car',
      label: 'Car',
    },
    {
      value: 'house',
      label: 'House',
      disabled: true,
    },
    {
      value: 'apartment',
      label: 'Apartment',
    },
  ]

  handleSendMessage(event: Event): void {
    const customEvent = event as CustomEvent<SendEventDetail>
    const { message, attachments } = customEvent.detail

    console.log('🚀 ~ handleSendMessage ~ Message sent:', message)
    console.log('🚀 ~ handleSendMessage ~ Attachments:', attachments)

    this.chatValue = ''
  }

  handleChange(event: Event): void {
    const customEvent = event as CustomEvent

    console.log('value :>> ', customEvent.detail)
  }

  toggleDisable(): void {
    this.disable = !this.disable
  }

  chatValueChange(): void {
    this.chatValue = this.randomizeMessage()
  }

  handleMessageChanged = (event: Event) => {
    const customEvent = event as CustomEvent

    console.log('🚀 ~ handleMessageChange ~ Message changed:', customEvent.detail)

    this.chatValue = customEvent.detail.value
  }

  toggleDebounce = () => {
    this.disableDebounce = !this.disableDebounce
  }
}
