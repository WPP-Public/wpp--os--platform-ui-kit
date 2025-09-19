<script setup lang="ts">
import type { RadioGroupChangeEvent, RadioGroupValue } from '@platform-ui-kit/components-library'
import { WppButton, WppRadio, WppRadioGroup, WppTypography } from '@platform-ui-kit/components-library-vue'
import type { WppRadioGroupCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { ref } from 'vue'

const radioGroupValue = ref<RadioGroupValue>('option-1')

const setValue = (value: RadioGroupValue) => {
  radioGroupValue.value = value
}
</script>

<template>
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
      :labelConfig="{ text: 'Option 2' }"
      required
      data-testid="radio-button-with-label"
    />

    <WppRadio
      name="wpp-radio-3"
      class="item"
      :labelConfig="{
        icon: 'wpp-icon-info',
        text: 'Option 3',
        description: 'Description',
        locales: {
          optional: 'Optional',
        },
      }"
      required
      data-testid="radio-button-with-icon"
    />

    <WppRadio class="item" :labelConfig="{ text: 'Option 4' }" data-testid="radio-button-with-optional-label" />

    <WppRadio name="wpp-radio-5" class="item" :labelConfig="{ text: 'Option 5' }" disabled required />

    <WppRadio
      name="wpp-radio-6"
      class="item"
      :labelConfig="{ text: 'Hover test' }"
      data-testid="hover-radio-button"
      required
    />

    <h3>Without Label</h3>
    <WppRadio class="item" required data-testid="radio-button-without-label" />

    <h3>Radio Groups</h3>
    <div class="radioGroupContainer">
      <div class="radioGroupElement">
        <WppTypography type="xl-heading">With 3 items</WppTypography>
        <WppRadioGroup
          class="radioGroup"
          :value="radioGroupValue"
          :labelConfig="{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }"
          @wppChange="(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) => setValue(e.detail.value || '')"
        >
          <WppRadio required value="option-1" :labelConfig="{ text: 'Option-1' }" />
          <WppRadio required value="option-2" :labelConfig="{ text: 'Option-2' }" />
          <WppRadio required value="option-3" :labelConfig="{ text: 'Option-3' }" />
        </WppRadioGroup>
      </div>

      <div class="radioGroupElement">
        <WppTypography type="xl-heading">With error message</WppTypography>
        <WppRadioGroup
          class="radioGroup"
          :value="radioGroupValue"
          :labelConfig="{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }"
          message="Error message"
          messageType="error"
          @wppChange="(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) => setValue(e.detail.value || '')"
        >
          <WppRadio required value="option-1" :labelConfig="{ text: 'Option-1' }" />
          <WppRadio required value="option-2" :labelConfig="{ text: 'Option-2' }" />
          <WppRadio required value="option-3" :labelConfig="{ text: 'Option-3' }" />
          <WppRadio required value="option-4" :labelConfig="{ text: 'Option-4' }" />
        </WppRadioGroup>
      </div>

      <div class="radioGroupElement">
        <WppTypography type="xl-heading">With warning message</WppTypography>
        <WppRadioGroup
          class="radioGroup"
          :value="radioGroupValue"
          :labelConfig="{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }"
          message="Warning message"
          messageType="warning"
          @wppChange="(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) => setValue(e.detail.value || '')"
        >
          <WppRadio required value="option-1" :labelConfig="{ text: 'Option-1' }" />
          <WppRadio required value="option-2" :labelConfig="{ text: 'Option-2' }" />
          <WppRadio required value="option-3" :labelConfig="{ text: 'Option-3' }" />
          <WppRadio required value="option-4" :labelConfig="{ text: 'Option-4' }" />
          <WppRadio required value="option-5" :labelConfig="{ text: 'Option-5' }" />
        </WppRadioGroup>
      </div>

      <div class="radioGroupElement">
        <WppTypography type="xl-heading">With truncation on warning message</WppTypography>
        <WppRadioGroup
          class="radioGroup"
          :value="radioGroupValue"
          :labelConfig="{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }"
          message="Warning message"
          messageType="warning"
          :maxMessageLength="10"
          @wppChange="(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) => setValue(e.detail.value || '')"
        >
          <WppRadio required value="option-1" :labelConfig="{ text: 'Option-1' }" />
          <WppRadio required value="option-2" :labelConfig="{ text: 'Option-2' }" />
          <WppRadio required value="option-3" :labelConfig="{ text: 'Option-3' }" />
          <WppRadio required value="option-4" :labelConfig="{ text: 'Option-4' }" />
          <WppRadio required value="option-5" :labelConfig="{ text: 'Option-5' }" />
        </WppRadioGroup>
      </div>
    </div>

    <h4>Programmatically set value of radio group:</h4>

    <div class="buttons">
      <WppButton size="s" variant="secondary" @click="setValue('option-1')"> Set option-1 </WppButton>
      <WppButton size="s" variant="secondary" @click="setValue('option-2')"> Set option-2 </WppButton>
      <WppButton size="s" variant="secondary" @click="setValue('option-3')"> Set option-3 </WppButton>
      <WppButton size="s" variant="secondary" @click="setValue('')"> Reset </WppButton>
    </div>
  </div>
</template>

<style>
.item {
  margin-right: 15px;
}
.buttons {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: flex-start;
}

.radioGroupContainer {
  display: flex;
  width: 1200px;
  margin-top: 20px;
}

.radioGroupElement {
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 20px;
}

.radioGroup {
  margin-top: 20px;
}
</style>
