<script setup lang="ts">
import { WppProgressIndicator } from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <div class="progress-indicators-container">
    <div class="progress-indicator-items">
      <h2 class="title">Linear Progress Indicators</h2>

      <h4>Default (value not provided, shows indeterminate)</h4>
      <WppProgressIndicator class="item" />

      <h4>Indicator with Progress (85%)</h4>
      <WppProgressIndicator class="item" :value="85" />

      <h4>Indicator with Progress and Percentage (45%)</h4>
      <WppProgressIndicator class="item" isShowPercentage :value="45" />

      <h4>Indicator with Text (no value, still indeterminate)</h4>
      <WppProgressIndicator class="item" label="Loading..." />

      <h4>Indicator with Fixed Width (500px)</h4>
      <WppProgressIndicator class="item" width="500" />

      <h4>Indicator with All Properties (800px, 15%)</h4>
      <WppProgressIndicator class="item" isShowPercentage :value="15" :width="800" label="Progressing..." />

      <h4>Indicator with Progress and Percentage (1%)</h4>
      <WppProgressIndicator class="item" isShowPercentage :value="1" />

      <h4>Indicator with Progress and Percentage (100%)</h4>
      <WppProgressIndicator class="item" isShowPercentage :value="100" label="Completed" />

      <h4>**New Intermediate State (0% empty bar)**</h4>
      <WppProgressIndicator class="item" isShowPercentage :value="0" forceIntermediateEmptyState
        label="Just started (0%)" />
    </div>

    <div class="indicator-items">
      <h2 class="title">Circle Progress Indicators</h2>

      <h4>Default (value not provided, shows indeterminate)</h4>
      <WppProgressIndicator class="item" variant="circle" />

      <h4>Indicator with Progress (85%)</h4>
      <WppProgressIndicator class="item" variant="circle" :value="85" />

      <h4>Indicator with Progress and Percentage (45%)</h4>
      <WppProgressIndicator class="item" variant="circle" isShowPercentage :value="45" />

      <h4>Indicator with Text (no value, indeterminate)</h4>
      <WppProgressIndicator class="item" variant="circle" label="Circular Load..." />

      <h4>Indicator with Fixed Width (150px)</h4>
      <WppProgressIndicator class="item" variant="circle" :width="150" />

      <h4>Indicator with All Properties (300px and 15%)</h4>
      <WppProgressIndicator class="item" variant="circle" isShowPercentage :value="15" :width="300"
        label="Circle Progress..." />

      <h4>Indicator with Progress and Percentage (1%)</h4>
      <WppProgressIndicator class="item" variant="circle" isShowPercentage :value="1" />

      <h4>Indicator with Progress and Percentage (100%)</h4>
      <WppProgressIndicator class="item" variant="circle" isShowPercentage :value="100" label="Circle Complete" />

      <h4>**New Intermediate State (0% empty bar)**</h4>
      <WppProgressIndicator class="item" variant="circle" isShowPercentage :value="0" forceIntermediateEmptyState
        label="Just started (0%)" />
    </div>
  </div>
</template>

<style scoped>
.title {
  text-align: center;
}

.item {
  width: 700px;
  margin-bottom: 30px;
}
</style>
