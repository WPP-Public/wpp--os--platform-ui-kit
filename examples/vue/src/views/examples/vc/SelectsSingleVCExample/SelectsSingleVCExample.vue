<script setup lang="ts">
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-vue'
import { SAMPLE_LIST_1 } from '../../SingleSelect/consts'
import { CUSTOM_LIST, LIST } from './consts'
import { ref } from 'vue'

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const handleChange1 = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)
  value1.value = event.detail.value
}

const handleChange2 = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)
  value2.value = event.detail.value
}

const handleChange3 = (event: CustomEvent) => {
  console.log('value :>> ', event.detail)
  value3.value = event.detail.value
}

const message =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices enim nunc, nec molestie nibh commodo at home'
</script>

<template>
  <h2>Single Selects</h2>

  <div class="selects" data-testid="single-selects">
    <div class="size">
      <h3>M Size</h3>
      <WppSelect
        name="wpp-select"
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Regular Single' }"
        autoFocus
        data-testid="focus-single-select"
      />

      <WppSelect
        size="m"
        class="item"
        placeholder="Choose option"
        required
        :labelConfig="{ text: 'Disabled Regular Single Select' }"
        disabled
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Info Single Select' }"
        message="Info message"
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Warning Single Select' }"
        message="Warning message"
        messageType="warning"
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Error Single Select' }"
        message="Error message"
        messageType="error"
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Info Single Select with max message length' }"
        :message="message"
        :maxMessageLength="50"
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{
          text: 'Warning Single Select with max message length',
        }"
        :message="message"
        messageType="warning"
        :maxMessageLength="50"
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Error Single Select with max message length' }"
        :message="message"
        messageType="error"
        :maxMessageLength="50"
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Disabled Info Single Select' }"
        message="Info message"
        disabled
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Disabled Warning Single Select' }"
        message="Warning message"
        messageType="warning"
        disabled
      />

      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Disabled Error Single Select' }"
        message="Error message"
        messageType="error"
        disabled
      />

      <WppSelect size="m" placeholder="Choose option" class="item" :labelConfig="{ text: 'Optional Single Select' }" />

      <WppTypography type="s-body">Text Select without Label (required) </WppTypography>

      <WppSelect size="m" placeholder="Choose option" class="item" required />
    </div>

    <div class="size">
      <h3>S Size</h3>
      <WppSelect
        name="wpp-select"
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Regular Single Select' }"
        :list="SAMPLE_LIST_1"
        :value="value1"
        @wppChange="handleChange1"
      >
      </WppSelect>

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Disabled Regular Single Select' }"
        disabled
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Info Single Select' }"
        message="Info message"
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Warning Single Select' }"
        message="Warning message"
        messageType="warning"
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Error Single Select' }"
        message="Error message"
        messageType="error"
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Info Single Select with max message length' }"
        :message="message"
        :maxMessageLength="50"
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{
          text: 'Warning Single Select with max message length',
        }"
        :message="message"
        messageType="warning"
        :maxMessageLength="50"
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Error Single Select with max message length' }"
        :message="message"
        messageType="error"
        :maxMessageLength="50"
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Disabled Info Single Select' }"
        message="Info message"
        disabled
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Disabled Warning Single Select' }"
        message="Warning message"
        messageType="warning"
        disabled
      />

      <WppSelect
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{ text: 'Disabled Error Single Select' }"
        message="Error message"
        messageType="error"
        disabled
      />

      <WppSelect size="s" placeholder="Choose option" class="item" :labelConfig="{ text: 'Optional Single Select' }" />

      <WppTypography type="s-body">Text Select without Label (required) </WppTypography>

      <WppSelect size="s" placeholder="Choose option" class="item" required />

      <!-- Single Select with Avatar Logos and Subtitles -->
      <WppSelect
        name="wpp-select"
        size="s"
        placeholder="Choose option"
        class="item"
        required
        :label-config="{ text: 'Single Select with Avatars and Subtitles' }"
        :list="CUSTOM_LIST"
        :value="value2"
        @wppChange="handleChange2"
        auto-focus
        data-testid="select-with-avatars-subtitles"
      >
      </WppSelect>
    </div>

    <div class="expanded">
      <h3>Select With Items and left Icon</h3>
      <WppSelect
        size="m"
        placeholder="Choose option"
        class="item"
        required
        :labelConfig="{
          icon: 'wpp-icon-info',
          text: 'Single Select With Items and left Icon',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }"
        data-testid="select-with-items"
        :list="LIST"
        :value="value3"
        @wppChange="handleChange3"
      >
      </WppSelect>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-bottom: 30px;
}

.item p {
  margin: 0;
}

.selects {
  display: flex;
}

.size {
  width: 400px;
  margin-right: 50px;
}

.expanded {
  width: 200px;
}

.selectRange .item {
  min-width: 250px;
  padding: 8px;
}
</style>
