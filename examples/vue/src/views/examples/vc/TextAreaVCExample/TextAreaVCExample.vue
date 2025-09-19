<script setup>
import { WppTextareaInput } from "@platform-ui-kit/components-library-vue";

const messageText =
  "Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the longest and detailed warning messages ever met in the User Interface. Probably, one of the long";
</script>

<template>
  <div>
    <h2 class="title">Text areas</h2>
    <div class="inputs" data-testid="text-area-inputs">
      <WppTextareaInput
        placeholder="Enter text"
        name="asd"
        charactersLimit="10"
        warningThreshold="5"
        data-testid="regular-limited-text-area"
        required
        autoFocus
        :labelConfig="{
          icon: 'wpp-icon-info',
          text: 'Regular Text Area with Limit',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }"
      />

      <WppTextareaInput
        name="wpp-text-area"
        placeholder="Enter text"
        :labelConfig="{ text: 'Regular Text Area w/o Limit' }"
        warningThreshold="5"
        data-testid="regular-limitless-text-area"
        required
      />

      <WppTextareaInput
        name="wpp-text-area"
        placeholder="Enter text"
        :labelConfig="{ text: 'Disabled Regular Text Area' }"
        disabled
        warningThreshold="5"
        data-testid="disabled-limitless-text-area"
        required
      />

      <WppTextareaInput
        name="wpp-text-area"
        placeholder="Enter text"
        :labelConfig="{ text: 'Limited Text Area with Error' }"
        warningThreshold="5"
        charactersLimit="10"
        maxMessageLength="120"
        messageType="error"
        :message="messageText"
        data-testid="limited-error-text-area"
        required
      />

      <WppTextareaInput
        name="wpp-text-area"
        placeholder="Enter text"
        :labelConfig="{ text: 'Limitless Text Area with Error' }"
        warningThreshold="5"
        maxMessageLength="120"
        messageType="error"
        :message="messageText"
        data-testid="limitless-error-text-area"
        required
      />

      <WppTextareaInput
        name="wpp-text-area"
        placeholder="Enter text"
        :labelConfig="{ text: 'Limitless Text Area with Warning' }"
        warningThreshold="5"
        maxMessageLength="120"
        messageType="warning"
        :message="messageText"
        data-testid="limitless-warning-text-area"
        required
      />

      <WppTextareaInput
        name="wpp-text-area"
        :labelConfig="{ text: 'Limited Text Area with Warning' }"
        warningThreshold="5"
        charactersLimit="10"
        maxMessageLength="120"
        messageType="warning"
        :message="messageText"
        data-testid="limited-warning-text-area"
        required
      />

      <WppTextareaInput
        placeholder="Enter text"
        :labelConfig="{ text: 'All In Text Area' }"
        charactersLimit="10"
        disabled
        warningThreshold="5"
        maxMessageLength="120"
        messageType="error"
        name="all-in-text-area"
        value="Test text"
        :message="messageText"
        data-testid="all-in-text-area"
      />
    </div>
  </div>
</template>
<style scoped>
.inputs {
  width: 800px;
  margin: auto;
  padding: 20px;
  border: 1px solid rgb(0 0 0 / 50%);
  border-radius: 20px;
}

.title {
  text-align: center;
}
</style>
