<script setup lang="ts">
import { WppRadio } from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <div class="control-bars">
    <div class="radioButtons">
      <h3>With Label</h3>
      <WppRadio
        name="wpp-radio-1"
        class="item"
        :labelConfig="{ text: 'Option 1' }"
        required
        autoFocus
        data-testid="focus-radio-button"
      />

      <WppRadio
        name="wpp-radio-2"
        class="item"
        :labelConfig="{
          icon: 'wpp-icon-info',
          text: 'Option 2',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }"
        required
      />

      <WppRadio class="item" :labelConfig="{ text: 'Option 1' }" />

      <WppRadio
        name="wpp-radio-3"
        class="item"
        :labelConfig="{ text: 'Option 1' }"
        disabled
        required
      />

      <WppRadio
        name="wpp-radio-4"
        class="item"
        :labelConfig="{ text: 'Option 1' }"
        checked
        required
      />

      <WppRadio
        name="wpp-radio-5"
        class="item"
        :labelConfig="{ text: 'Option 1' }"
        checked
        disabled
        required
      />

      <WppRadio
        name="wpp-radio-6"
        class="item"
        :labelConfig="{ text: 'Hover test' }"
        data-testid="hover-radio-button"
        required
      />

      <h3>Without Label</h3>
      <WppRadio class="item" required />

      <WppRadio class="item" />

      <WppRadio class="item" disabled required />

      <WppRadio class="item" checked required />

      <WppRadio class="item" checked disabled required />
    </div>
  </div>
</template>
<style scoped>
.item {
  margin-right: 15px;
}
</style>
