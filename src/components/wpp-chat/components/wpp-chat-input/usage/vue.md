```vue
<template>
  <div>
    <wpp-chat-input
      @wppSend="handleSend"
      @wppMessageChanged="handleMessageChanged"
      :textValue="chatValue"
      placeholder="Type your message..."
    />

    <wpp-chat-input
      placeholder="Type your message..."
      :enableAttach="true"
      :charactersLimit="500"
      :fileUploadConfig="{
        maxFiles: 5,
        size: 100,
        accept: ['.jpg', '.png', '.pdf']
      }"
      @wppChange="handleFileUploadChange"
      @wppMessageChanged="handleMessageChanged"
      @wppSend="handleSend"
      :textValue="chatValue"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      chatValue: ''
    }
  },
  methods: {
    handleFileUploadChange(event) {
      console.log('Files uploaded:', event.detail.value)
    },
    handleSend(event) {
      console.log('Message Sent:', event.detail.message)
      console.log('Attachments:', event.detail.attachments)

      this.chatValue = ''
    },
    handleMessageChanged(event) {
      console.log('Message changed:', event.detail.value)

      this.chatValue = event.detail.value
    }
  }
}
</script>
```
