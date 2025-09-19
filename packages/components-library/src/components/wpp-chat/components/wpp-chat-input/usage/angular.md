```html

<wpp-chat-input
  (wppSend)="onMessageSend($event)"
  (wppMessageChanged)="onMessageChanged($event)"
  [textValue]="chatValue"
  placeholder="Type your message..."
></wpp-chat-input>

<wpp-chat-input
  placeholder="Type your message..."
  enableAttach="true"
  [charactersLimit]="500"
  [fileUploadConfig]="{
    maxFiles: 5,
    size: 100,
    accept: ['.jpg', '.png', '.pdf']
  }"
  (wppChange)="onFileUploadChange($event)"
  (wppMessageChanged)="onMessageChanged($event)"
  (wppSend)="onMessageSend($event)"
  [textValue]="chatValue"
></wpp-chat-input>
```

```ts
import { Component } from '@angular/core'

@Component({
  selector: 'app-chat-input',
  templateUrl: './chat-input.page.html',
  styleUrls: ['./chat-input.page.scss'],
})
export class ChatInputPage {
  chatValue: string = ''

  onFileUploadChange(event: Event) {
    console.log('Files uploaded:', event.detail.value)
  }

  onMessageSend(event: Event) {
    console.log('Message Sent:', event.detail.message)
    console.log('Attachments:', event.detail.attachments)

    this.chatValue = ''
  }

  onMessageChanged(event: Event) {
    console.log('Message changed:', event.detail.value)

    this.chatValue = event.detail.value
  }
}
```
