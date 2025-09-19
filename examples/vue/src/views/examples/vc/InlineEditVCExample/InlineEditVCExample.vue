<script setup lang="ts">
import {
  WppInlineEdit,
  WppInput,
  WppTextareaInput,
} from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'

const inputMode1 = ref('read')
const inputMode2 = ref('read')
const textareaMode = ref('read')
const inputText1 = ref('')
const inputText2 = ref('')
const textareaText = ref('text area value')
const textareaInlineEditConfig = {
  placement: 'bottom-start',
}

const handleInputModeChange1 = (event: CustomEvent) => {
  console.log(event.detail)
  inputMode1.value = event.detail.mode
  if (event.detail.mode === 'read') {
    event.detail.closePopover()
  }
}
const handleInputModeChange2 = (event: CustomEvent) => {
  console.log(event.detail)
  inputMode2.value = event.detail.mode
  if (event.detail.mode === 'read') {
    event.detail.closePopover()
  }
}

const handleTextareaModeChange = (event: CustomEvent) => {
  console.log(event.detail)
  textareaMode.value = event.detail.mode
  if (event.detail.mode === 'read') {
    event.detail.closePopover()
  }
}

const handleInputValueChange1 = (event: CustomEvent) => {
  inputText1.value = event.detail.value
}
const handleInputValueChange2 = (event: CustomEvent) => {
  inputText2.value = event.detail.value
}

const handleTextareaValueChange = (event: CustomEvent) => {
  textareaText.value = event.detail.value
}
</script>

<template>
  <div class="container">
    <div class="block" data-testid="input-inline-edit-container">
      <h3>Inline Edit Input (With inputWidth)</h3>
      <WppInlineEdit :value="inputText1" :mode="inputMode1" @wppModeChange="handleInputModeChange1"
        data-testid="default-input-inline-edit" :inputWidth="'300px'">
        <WppInput size="s" slot="form-element" :value="inputText1" @wppChange="handleInputValueChange1" />
      </WppInlineEdit>

      <p class="bottomItem">Icon Placement test</p>
      <WppInlineEdit :value="inputText1" :mode="inputMode1" :dropdownConfig="{ placement: 'bottom' }"
        @wppModeChange="handleInputModeChange1" data-testid="bottom-input-inline-edit" :inputWidth="'300px'">
        <WppInput size="s" slot="form-element" name="test" :value="inputText1" />
      </WppInlineEdit>
    </div>

    <!-- Example without inputWidth to use the default width -->
    <div class="block" data-testid="input-inline-edit-container-default">
      <h3>Inline Edit Input (Default Width)</h3>
      <WppInlineEdit :value="inputText2" :mode="inputMode2" @wppModeChange="handleInputModeChange2"
        data-testid="default-width-input-inline-edit">
        <WppInput size="s" slot="form-element" :value="inputText2" @wppChange="handleInputValueChange2" />
      </WppInlineEdit>
    </div>

    <div class="block" data-testid="textarea-inline-edit-container">
      <h3>Inline Edit Textarea</h3>
      <WppInlineEdit :mode="textareaMode" :value="textareaText" :dropdownConfig="textareaInlineEditConfig"
        @wppModeChange="handleTextareaModeChange" data-testid="default-textarea-inline-edit" :inputWidth="'300px'">
        <WppTextareaInput slot="form-element" size="s" rows="3" :value="textareaText"
          @wppChange="handleTextareaValueChange" />
      </WppInlineEdit>

      <p class="bottomItem">Icon Placement test</p>
      <WppInlineEdit :mode="textareaMode" :value="textareaText" :dropdownConfig="{ placement: 'bottom' }"
        data-testid="bottom-textarea-inline-edit" :inputWidth="'300px'">
        <WppTextareaInput slot="form-element" size="s" rows="3" :value="textareaText" />
      </WppInlineEdit>
    </div>
  </div>
</template>

<style>
.container {
  display: flex;
  gap: 10px;
  height: 400px;
}

.block {
  width: 450px;
  height: 200px;
  word-break: break-word;
}

.bottomItem {
  margin-top: 800px;
}

</style>
