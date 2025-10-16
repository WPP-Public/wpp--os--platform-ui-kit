```tsx
import { WppChatInput } from '@wppopen/components-library-react'

export const ChatInputExample = () => {
  const [chatValue, setChatValue] = useState('')
  const handleFileUploadChange = ({ detail }) => {
    console.log('Files uploaded:', detail.value)
  }

  const handleSend = ({ detail }) => {
    console.log('Message Sent:', detail.message)
    console.log('Attachments:', detail.attachments)

    setChatValue('')
  }

  const handleMessageChanged = (event) => {
    console.log('Message changed:', event.detail.value)

    setChatValue(event.detail.value)
  }

  return (
    <>
      {/* Basic Usage */}
      <WppChatInput onWppSend={handleSend}
                    onWppMessageChanged={handleMessageChanged}
                    textValue={chatValue}
                    placeholder="Type your message..." />

      {/* Chat Input with Attachments */}
      <WppChatInput
        onWppMessageChanged={handleMessageChanged}
        enableAttach={true}
        charactersLimit={500}
        fileUploadConfig={{
          maxFiles: 5,
          size: 100,
          accept: ['.jpg', '.png', '.pdf']
        }}
        onWppChange={handleFileUploadChange}
        onWppSend={handleSend}
        textValue={chatValue}
      />
    </>
  )
}
```
