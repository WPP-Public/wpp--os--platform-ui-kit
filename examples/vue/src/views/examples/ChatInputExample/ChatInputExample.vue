<script setup lang="ts">
import { ref } from 'vue'
import { WppChatInput, WppActionButton, WppSelect } from '@platform-ui-kit/components-library-vue'

const messages = [
  'What is the best way to market a product?',
  'How to create a marketing strategy?',
  'What are the latest trends in digital marketing?',
  'How to measure the success of a marketing campaign?',
  'What are the best tools for social media marketing?',
]
const randomizeMessage = () => messages[Math.floor(Math.random() * messages.length)]
const charactersLimit = ref(200)
const disable = ref(false)
const chatValue = ref('')
const disableDebounce = ref(true)

const fileUploadConfig = ref({
  acceptConfig: {},
  accept: [],
  size: 50,
  maxFiles: 5,
  // multiple: true,
  // showOnlyNewErrors: true,
  // controlled: false,
  // locales: {
  //   sizeError: 'File exceeds the allowed size limit',
  //   formatError: 'Invalid file format',
  // },
})

const handleSendMessage = (event: CustomEvent) => {
  const { message, attachments } = event.detail
  console.log('🚀 ~ handleSendMessage ~ Message sent:', message)
  console.log('🚀 ~ handleSendMessage ~ Attachments:', attachments)

  chatValue.value = ''
}

const handleChange = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)

  selectValue.value = event.detail.value
}

const toggleDisable = () => {
  disable.value = !disable.value
}

const chatValueChange = () => {
  chatValue.value = randomizeMessage()
}

const handleMessageChanged = (event: CustomEvent) => {
  console.log('🚀 ~ handleMessageChange ~ Message changed:', event.detail)

  chatValue.value = event.detail.value
}
</script>

<template>
  <div class="chatContainer">
    <WppChatInput
      :enableAttach="true"
      :fileUploadConfig="fileUploadConfig"
      :charactersLimit="charactersLimit"
      :disabled="disable"
      :text-value="chatValue"
      :debounce-enabled="disableDebounce"
      @wppSend="handleSendMessage"
      @wppMessageChanged="handleMessageChanged"
      withSelect
    >
      <WppSelect type="text" @wppChange="handleChange" placeholder="Select models" slot="select" :disabled="disable">
        <wpp-list-item value="gpt4.1">
          <p slot="label">GPT-4.1</p>
        </wpp-list-item>
        <wpp-list-item value="claudesonnet3.5" disabled>
          <p slot="label">Claude sonnet 3.5</p>
        </wpp-list-item>
        <wpp-list-item value="gpt4o">
          <p slot="label">GPT-4o</p>
        </wpp-list-item>
      </WppSelect>
    </WppChatInput>

    <WppChatInput :enableAttach="true" :fileUploadConfig="fileUploadConfig" :charactersLimit="charactersLimit"
      :disabled="disable"
      withSelect
      @wppSend="handleSendMessage"
      :size="'s'"
      :text-value="chatValue"
    >
      <wpp-select type="text" @wppChange="handleChange" placeholder="Select models" slot="select" :disabled="disable">
        <wpp-list-item value="gpt4.1">
          <p slot="label">GPT-4.1</p>
        </wpp-list-item>
        <wpp-list-item value="claudesonnet3.5" disabled>
          <p slot="label">Claude sonnet 3.5</p>
        </wpp-list-item>
        <wpp-list-item value="gpt4o">
          <p slot="label">GPT-4o</p>
        </wpp-list-item>
      </wpp-select>
    </WppChatInput>
  </div>
  <div class="actionsContainer">
    <WppActionButton @click="toggleDisable">Disable</WppActionButton>

    <WppActionButton @click="chatValueChange">Change Input Message</WppActionButton>

    <WppActionButton @click="disableDebounce = !disableDebounce"
      >Debounce - {{ disableDebounce ? 'On' : 'Off' }}</WppActionButton
    >
  </div>
</template>
<style scoped>
.chatContainer {
  display: flex;
  align-items: flex-end;
  justify-items: center;
  box-sizing: border-box;
  height: 100vh;
}

.actionsContainer {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}
</style>
