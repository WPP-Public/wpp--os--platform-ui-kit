```vue
<script setup lang="ts">
import { WppInlineEdit, WppInput, WppTextareaInput } from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'

const inputMode = ref('read')
const textareaMode = ref('read')
const inputText = ref('input text')
const textareaText = ref('textarea text')
const textareaInlineEditConfig = {
  placement: 'bottom-start',
}

const handleInputModeChange = (event: CustomEvent) => {
  inputMode.value = event.detail.mode
  if (event.detail.mode === 'read') {
    event.detail.closePopover()
  }
}

const handleTextareaModeChange = (event: CustomEvent) => {
  textareaMode.value = event.detail.mode
  if (event.detail.mode === 'read') {
    event.detail.closePopover()
  }
}

const handleInputValueChange = (event: CustomEvent) => {
  inputText.value = event.detail.value
}

const handleTextareaValueChange = (event: CustomEvent) => {
  textareaText.value = event.detail.value
}

const simulateServerRequest = (value: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (value.length < 5) {
        reject(new Error(`The value needs to be at least 5 characters long! Current length: ${value.length}`))
      } else {
        resolve()
      }
    }, 1000)
  })
}

const handleConfirm = (event: CustomEvent) => {
  const { value, waitUntil } = event.detail

  waitUntil(simulateServerRequest(value))
}
</script>

<template>
  <div class="container">
    <div class="block">
      <h3>Inline Edit Input</h3>
      <WppInlineEdit
        :value="inputText"
        :mode="inputMode"
        :inputWidth="'300px'"
        @wppModeChange="handleInputModeChange"
        @wppConfirm="handleConfirm"
      >
        <WppInput size="s" slot="form-element" name="test" :value="inputText" @wppChange="handleInputValueChange" />
      </WppInlineEdit>
    </div>

    <div class="block">
      <h3>Inline Edit Textarea</h3>
      <WppInlineEdit
        :value="textareaText"
        :mode="textareaMode"
        :inputWidth="'300px'"
        :dropdownConfig="textareaInlineEditConfig"
        @wppModeChange="handleTextareaModeChange"
        @wppConfirm="handleConfirm"
      >
        <WppTextareaInput
          slot="form-element"
          size="s"
          :rows="3"
          :value="textareaText"
          @wppChange="handleTextareaValueChange"
        />
      </WppInlineEdit>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
}
.block {
  width: 400px;
  margin-right: 30px;
}
</style>
```
