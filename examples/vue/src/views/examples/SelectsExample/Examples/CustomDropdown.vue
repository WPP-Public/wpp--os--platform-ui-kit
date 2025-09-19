<script setup lang="ts">
import { WppInput, WppIconChevron, WppPopover, WppListItem } from '@platform-ui-kit/components-library-vue'

const OPTIONS_LIST = ['Admin', 'Country Admin', 'User']
import { ref } from 'vue'

const selectedOption = ref()
const isActive = ref<boolean>(false)
const popoverRef = ref<HTMLWppPopoverElement>()

const handleOptionSelect = (chosenOption: string) => {
  selectedOption.value = chosenOption
  popoverRef.value?.closePopover
}

const style: Record<string, string> = { '--wpp-list-item-width': '200px' }
</script>

<template>
  <WppPopover
    :ref='popoverRef'
    :config="{
    onShow: () => isActive = true,
    onHide: () => isActive = false,
    triggerElementWidth: true,
    }"
  >
    <WppInput
      :value='selectedOption'
      slot="trigger-element"
      placeholder="Select user role"
      :labelConfig="{ text: 'Role (Custom dropdown using WppInput + WppPoppover)' }"
      name="custom-input-name"
      required
    >
      <WppIconChevron slot="icon-end" :direction="isActive ? 'up' : 'down'" />
    </WppInput>
    <div :style='style'>
      <WppListItem
        v-for="option in OPTIONS_LIST"
        :key='option'
        :checked='selectedOption === option'
        @wppChangeListItem='handleOptionSelect(option)'
      >
        <p slot="label">{{ option }}</p>
      </WppListItem>
    </div>
  </WppPopover>
</template>
