<script setup lang="ts">
import { WppSpinner } from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <div class="container">
    <div class="spinners">
      <h3>Spinner S</h3>
      <WppSpinner size="s" />

      <h3>Spinner M</h3>
      <WppSpinner size="m" />

      <h3>Spinner L</h3>
      <WppSpinner size="l" />
    </div>

    <div class="spinners">
      <h3>Spinner S (grey 600)</h3>
      <WppSpinner size="s" color="var(--wpp-grey-color-600)" />

      <h3>Spinner M (cat-dark-9)</h3>
      <WppSpinner size="m" color="var(--wpp-dataviz-color-cat-dark-9)" />

      <h3>Spinner L (cat-dark-5)</h3>
      <WppSpinner size="l" color="var(--wpp-dataviz-color-cat-dark-5)" />
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
}

.spinners {
  display: flex;
  flex-direction: column;
  margin-right: 50px;
}
</style>
