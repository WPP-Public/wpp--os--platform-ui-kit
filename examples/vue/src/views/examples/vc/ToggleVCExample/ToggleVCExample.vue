<script setup>
import { WppToggle } from "@platform-ui-kit/components-library-vue";

const labelConfig = {
  text: "Label Text",
};

const labelConfigHover = {
  icon: "wpp-icon-info",
  text: "Hover Test",
  description: "Description",
  locales: {
    optional: "Optional",
  },
};
</script>

<template>
  <div class="toggles">
    <h3>With Label</h3>
    <WppToggle
      class="item"
      :labelConfig="labelConfig"
      required
      autoFocus
      data-testid="focus-toggle"
    />

    <WppToggle
      class="item"
      :labelConfig="labelConfigHover"
      data-testid="hover-toggle"
      required
    />

    <WppToggle class="item" :labelConfig="labelConfig" disabled required />

    <WppToggle class="item" :labelConfig="labelConfig" checked required />

    <WppToggle
      class="item"
      :labelConfig="labelConfig"
      disabled
      checked
      required
    />

    <WppToggle class="item" :labelConfig="labelConfig" />

    <h3>Without Label</h3>
    <WppToggle class="item" :ariaProps="{ label: 'no label' }" />

    <WppToggle class="item" disabled :ariaProps="{ label: 'no label' }" />

    <WppToggle class="item" checked :ariaProps="{ label: 'no label' }" />

    <WppToggle class="item" disabled checked :ariaProps="{ label: 'no label' }" />

    <WppToggle class="item" required :ariaProps="{ label: 'no label' }" />
  </div>
</template>
<style scoped>
.item {
  margin-right: 15px;
}
</style>
