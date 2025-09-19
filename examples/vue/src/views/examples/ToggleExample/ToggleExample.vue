<script setup>
import { WppToggle } from '@platform-ui-kit/components-library-vue'

const labelConfig = {
  text: 'Label Text',
}

const labelConfigIcon = {
  icon: 'wpp-icon-info',
  text: 'Label with Icon',
  description: 'Description',
  locales: {
    optional: 'Optional',
  },
}

const labelConfigTest = {
  text: 'Label Test',
  description: 'Description',
  locales: {
    optional: 'Optional',
  },
}
</script>

<template>
  <div class="toggles">
    <h3>With Label</h3>
    <WppToggle class="item" :labelConfig="labelConfig" required autoFocus data-testid="focus-toggle"/>

    <WppToggle class="item" :labelConfig="labelConfigTest" required data-testid="toggle-with-label"/>

    <WppToggle class="item" :labelConfig="labelConfigIcon" data-testid="toggle-with-icon" required/>

    <WppToggle class="item" :labelConfig="labelConfig" data-testid="toggle-with-optional-label"/>

    <WppToggle class="item" :labelConfig="labelConfig" disabled required/>

    <WppToggle
      class="item"
      :labelConfig="{
      text: 'Controlled Toggle',
    }"
      required
      controlled
      data-testid="controlled-toggle"
    />

    <h3>Without Label</h3>
    <WppToggle class="item" data-testid="toggle-without-label" :ariaProps="{ label: 'no label' }" />
  </div>
</template>

<style>
.item {
  margin-right: 15px;
}
</style>
