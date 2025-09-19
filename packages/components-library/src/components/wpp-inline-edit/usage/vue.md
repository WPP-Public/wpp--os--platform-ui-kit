```vue
<script setup lang="ts">
import {
  WppInlineEdit,
  WppInput,
  WppTextareaInput,
} from "@platform-ui-kit/components-library-vue";
import { ref } from "vue";

const inputMode = ref("read");
const textareaMode = ref("read");
const inputText = ref("input text");
const textareaText = ref("textarea text");
const textareaInlineEditConfig = {
  placement: "bottom-start",
};

const handleInputModeChange = (event: CustomEvent) => {
  inputMode.value = event.detail.mode;
  if (event.detail.mode === "read") {
    event.detail.closePopover();
  }
};

const handleTextareaModeChange = (event: CustomEvent) => {
  textareaMode.value = event.detail.mode;
  if (event.detail.mode === "read") {
    event.detail.closePopover();
  }
};

const handleInputValueChange = (event: CustomEvent) => {
  inputText.value = event.detail.value;
};

const handleTextareaValueChange = (event: CustomEvent) => {
  textareaText.value = event.detail.value;
};
</script>

<template>
  <div class="container">
    <div class="block">
      <h3>Inline Edit Input</h3>
      <WppInlineEdit
        :value="inputText"
        :mode="inputMode"
        @WppModeChange="handleInputModeChange"
        :inputWidth="'300px'"
      >
        <WppInput
          size="s"
          slot="form-element"
          :value="inputText"
          @WppChange="handleInputValueChange"
        />
      </WppInlineEdit>
    </div>

    <div class="block">
      <h3>Inline Edit Textarea</h3>
      <WppInlineEdit
        :mode="textareaMode"
        :value="textareaText"
        :dropdownConfig="textareaInlineEditConfig"
        @WppModeChange="handleTextareaModeChange"
        :inputWidth="'300px'"
      >
        <WppTextareaInput
          slot="form-element"
          size="s"
          :value="textareaText"
          @WppChange="handleTextareaValueChange"
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
