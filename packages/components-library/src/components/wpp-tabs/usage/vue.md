```vue

<script setup lang="ts">
import { ref } from "vue"

import { WppTabs, WppTab, WppTypography } from "@platform-ui-kit/components-library-vue"

const currentTab = ref("cars")

const handleTabChange = (event: CustomEvent) => {
  currentTab.value = event.detail.value
}
</script>

<template>
  <WppTabs :value="currentTab" @wppChange="handleTabChange">
    <WppTab value="houses">Houses</WppTab>
    <WppTab value="cars">Cars</WppTab>
    <WppTab disabled counter="2" value="food">
      Food
    </WppTab>
    <WppTab value="drinks">Drinks</WppTab>
  </WppTabs>

  <WppTypography v-if="currentTab === 'houses'" type="xs-body-regular" class="tab-content">
    First content
  </WppTypography>
  <WppTypography v-if="currentTab === 'cars'" type="xs-body-regular" class="tab-content">
    Second content
  </WppTypography>
  <WppTypography v-if="currentTab === 'drinks'" type="xs-body-regular" class="tab-content">
    Fourth content
  </WppTypography>
</template>


```
