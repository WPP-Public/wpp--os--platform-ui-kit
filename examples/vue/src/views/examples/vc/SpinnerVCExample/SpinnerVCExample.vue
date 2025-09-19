<script setup lang="ts">
import { WppSpinner } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <div class="container" data-testid="spinners-container">
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
      <WppSpinner size="s" color="var(--wpp-grey-color-800)" />

      <h3>Spinner M (grey 000)</h3>
      <div class="containerBlack">
        <WppSpinner size="m" color="var(--wpp-grey-color-000)" />
      </div>

      <h3>Spinner L (grey 000)</h3>
      <div class="containerBlack">
        <WppSpinner size="l" color="var(--wpp-grey-color-000)" />
      </div>
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

.containerBlack {
  background-color: var(--wpp-grey-color-900);
}
</style>
