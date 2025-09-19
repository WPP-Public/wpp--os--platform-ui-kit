<script setup lang="ts">
import type { CheckboxGroupChangeEvent, CheckboxGroupValue } from '@platform-ui-kit/components-library'
import { WppCheckbox, WppTypography, WppCheckboxGroup, WppButton } from '@platform-ui-kit/components-library-vue'
import type { WppCheckboxGroupCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { ref } from 'vue'

const checkboxes = ref([
  {
    value: 'option-1',
    text: 'Option 1',
  },
  {
    value: 'option-2',
    text: 'Option 2',
  },
  {
    value: 'option-3',
    text: 'Option 3',
  },
])
const valueRef = ref<CheckboxGroupValue[]>(['option-1', 'option-2', 'option-3'])

const handleWppChange = (event: WppCheckboxGroupCustomEvent<CheckboxGroupChangeEvent>) => {
  const eventValue = event.detail.value as CheckboxGroupValue[]

  valueRef.value = eventValue
}

const handleAddOption = () => {
  if (checkboxes.value.length < 5) {
    checkboxes.value = [
      ...checkboxes.value,
      { value: `option-${checkboxes.value.length + 1}`, text: `Option ${checkboxes.value.length + 1}` },
    ]
  }
}

const selectAllOptions = () => {
  valueRef.value = ['option-1', 'option-2', 'option-3', 'option-4', 'option-5']
}
</script>

<template>
  <div class="checkboxes">
    <h3>With Label</h3>
    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 1' }"
      :name="'options 1'"
      required
      autoFocus
      data-testid="focus-checkbox"
    />

    <WppCheckbox
      class="checkbox"
      :name="'options 2'"
      :labelConfig="{ text: 'Option 2' }"
      data-testid="сheckbox-with-label"
      required
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{
        icon: 'wpp-icon-info',
        text: 'Option 3',
        description: 'Description',
        locales: {
          optional: 'Optional',
        },
      }"
      :name="'options 3'"
      required
      data-testid="checkbox-with-icon"
    />

    <WppCheckbox
      class="checkbox"
      :name="'options 4'"
      :labelConfig="{ text: 'Option 4' }"
      data-testid="checkbox-with-optional-label"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 5' }"
      :name="'options 5'"
      indeterminate
      required
      data-testid="indeterminate-checkbox"
    />

    <WppCheckbox
      class="checkbox"
      :labelConfig="{ text: 'Option 6' }"
      required
      messageType="error"
      :name="'options 6'"
      message="Error message"
      :maxMessageLength="10"
      data-testid="checkbox-with-inline-message"
    />

    <div class="checkboxGroupContainer">
      <div class="checkboxGroupElement">
        <WppTypography type="xl-heading">With 3 items</WppTypography>
        <WppCheckboxGroup
          :labelConfig="{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }"
          class="checkboxGroup"
          :value="valueRef"
          @wppChange="handleWppChange"
        >
          <WppCheckbox
            v-for="checkbox in checkboxes"
            :key="checkbox.value"
            :name="checkbox.text"
            required
            :value="checkbox.value"
            :labelConfig="{ text: checkbox.text }"
          />
        </WppCheckboxGroup>

        <WppButton :style="{ marginTop: '10px' }" :disabled="checkboxes.length === 5" @click="handleAddOption">
          Add option
        </WppButton>
        <WppButton :style="{ marginTop: '10px' }" @click="selectAllOptions"> Select All options </WppButton>
      </div>

      <div class="checkboxGroupElement">
        <WppTypography type="xl-heading">With error message</WppTypography>
        <WppCheckboxGroup
          class="checkboxGroup"
          :value="valueRef"
          :labelConfig="{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }"
          message="Error message"
          messageType="error"
          @wppChange="handleWppChange"
        >
          <WppCheckbox required value="option-1" name="options 1" :labelConfig="{ text: 'Option-1' }" />
          <WppCheckbox required value="option-2" name="options 2" :labelConfig="{ text: 'Option-2' }" />
          <WppCheckbox required value="option-3" name="options 3" :labelConfig="{ text: 'Option-3' }" />
          <WppCheckbox required value="option-4" name="options 4" :labelConfig="{ text: 'Option-4' }" />
        </WppCheckboxGroup>
      </div>

      <div class="checkboxGroupElement">
        <WppTypography type="xl-heading">With warning message</WppTypography>
        <WppCheckboxGroup
          class="checkboxGroup"
          :value="valueRef"
          :labelConfig="{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }"
          message="Warning message"
          messageType="warning"
          @wppChange="handleWppChange"
        >
          <WppCheckbox required value="option-1" name="options 1" :labelConfig="{ text: 'Option-1' }" />
          <WppCheckbox required value="option-2" name="options 2" :labelConfig="{ text: 'Option-2' }" />
          <WppCheckbox required value="option-3" name="options 3" :labelConfig="{ text: 'Option-3' }" />
          <WppCheckbox required value="option-4" name="options 4" :labelConfig="{ text: 'Option-4' }" />
          <WppCheckbox required value="option-5" name="options 5" :labelConfig="{ text: 'Option-5' }" />
        </WppCheckboxGroup>
      </div>

      <div class="checkboxGroupElement">
        <WppTypography type="xl-heading">With truncation on warning message</WppTypography>
        <WppCheckboxGroup
          class="checkboxGroup"
          :value="valueRef"
          :labelConfig="{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }"
          message="Warning message"
          messageType="warning"
          :maxMessageLength="10"
          @wppChange="handleWppChange"
        >
          <WppCheckbox required value="option-1" name="options 1" :labelConfig="{ text: 'Option-1' }" />
          <WppCheckbox required value="option-2" name="options 2" :labelConfig="{ text: 'Option-2' }" />
          <WppCheckbox required value="option-3" name="options 3" :labelConfig="{ text: 'Option-3' }" />
          <WppCheckbox required value="option-4" name="options 4" :labelConfig="{ text: 'Option-4' }" />
          <WppCheckbox required value="option-5" name="options 5" :labelConfig="{ text: 'Option-5' }" />
        </WppCheckboxGroup>
      </div>
    </div>

    <h3>Without Label</h3>
    <WppCheckbox class="checkbox" name="options-1" required data-testid="checkbox-without-label" />
  </div>
</template>

<style>
.checkbox {
  margin-right: 15px;
}

.checkboxGroupContainer {
  display: flex;
  width: 1200px;
  margin-top: 20px;
}

.checkboxGroupElement {
  display: flex;
  flex-direction: column;
  width: 250px;
  margin-right: 20px;
}

.checkboxGroup {
  margin-top: 20px;
}
</style>
