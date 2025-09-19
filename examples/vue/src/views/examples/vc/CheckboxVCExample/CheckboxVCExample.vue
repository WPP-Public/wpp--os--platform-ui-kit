<script setup lang="ts">
import { ref } from "vue";

import { WppCheckbox } from "@platform-ui-kit/components-library-vue";

const firstSelect = ref(true);

const handleChange = (ev: CustomEvent) => {
  console.log("checkbox change event: ", ev.detail);

  firstSelect.value = ev.detail.checked;
};
</script>

<template>
  <div class="checkboxes">
    <h3>With Label</h3>
    <WppCheckbox
      :labelConfig="{ text: 'Option 1' }"
      class="checkbox"
      name="options"
      required
      autoFocus
      @wppChange="handleChange"
      data-testid="focus-checkbox"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{
        icon: 'wpp-icon-info',
        text: 'Option 1',
        description: 'Description',
        locales: {
          optional: 'Optional',
        },
      }"
      required
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      name="options"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      name="options"
      disabled
      required
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      name="options"
      checked
      required
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      name="options"
      checked
      disabled
      required
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      name="options"
      indeterminate
      required
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      name="options"
      indeterminate
      disabled
      required
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Hover test' }"
      required
      data-testid="hover-сheckbox"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      required
      messageType="error"
      message="Error message"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      required
      messageType="error"
      message="Error message"
      maxMessageLength="10"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      required
      messageType="warning"
      message="Warning message"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      required
      messageType="warning"
      message="Warning message"
      maxMessageLength="10"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      required
      message="Info message"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      required
      message="Info message"
      maxMessageLength="10"
    />

    <h3>Without Label</h3>
    <WppCheckbox class="checkbox" required />

    <WppCheckbox class="checkbox" />

    <WppCheckbox class="checkbox" disabled required />

    <WppCheckbox class="checkbox" checked required />

    <WppCheckbox class="checkbox" checked disabled required />

    <WppCheckbox class="checkbox" indeterminate required />

    <WppCheckbox class="checkbox" indeterminate disabled required />

    <WppCheckbox
      class="checkbox"
      required
      messageType="error"
      message="Error message"
    />

    <WppCheckbox
      class="checkbox"
      required
      messageType="error"
      message="Error message"
      maxMessageLength="10"
    />

    <WppCheckbox
      class="checkbox"
      required
      messageType="warning"
      message="Warning message"
    />

    <WppCheckbox
      class="checkbox"
      required
      messageType="warning"
      message="Warning message"
      maxMessageLength="10"
    />

    <WppCheckbox class="checkbox" required message="Info message" />

    <WppCheckbox
      class="checkbox"
      required
      message="Info message"
      maxMessageLength="10"
    />
  </div>
</template>

<style scoped>
.checkbox {
  margin-right: 15px;
}
</style>
