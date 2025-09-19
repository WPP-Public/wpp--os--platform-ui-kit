<script setup lang="ts">
import { ref } from 'vue'

import { WppTab, WppTabs } from '@platform-ui-kit/components-library-vue'

import HorizontalStepper from './HorizontalStepper.vue'
import VerticalStepper from './VerticalStepper.vue'
import VerticalStepperDecimalVC from './VerticalStepperDecimalVC.vue' // Import the new decimal vertical stepper
import VerticalStepperWWidth from './VerticalStepperWWidth.vue'

const currentTab = ref('vertical')

const handleTabChange = (event: CustomEvent) => {
  console.log('handleTabChange', event)
  currentTab.value = event.detail.value
}
</script>

<template>
  <div class="tabs" data-testid="stepper">
    <WppTabs :value="currentTab" @wppChange="handleTabChange">
      <WppTab value="vertical">Vertical Stepper</WppTab>
      <WppTab value="vertical-decimal">Vertical Stepper with Decimal Sub Steps</WppTab>
      <WppTab value="vertical-with-width">Vertical Stepper with width</WppTab>
      <WppTab value="horizontal">Horizontal Stepper</WppTab>
    </WppTabs>
    <div class="content">
      <VerticalStepper v-if="currentTab === 'vertical'" />
      <VerticalStepperDecimalVC v-if="currentTab === 'vertical-decimal'" />
      <VerticalStepperWWidth v-if="currentTab === 'vertical-with-width'" />
      <HorizontalStepper v-if="currentTab === 'horizontal'" />
    </div>
  </div>
</template>

<style scoped>
.tabs {
  padding: 20px 20px 50px;
}

.content {
  margin-top: 20px;
  padding: 16px;
}
</style>
