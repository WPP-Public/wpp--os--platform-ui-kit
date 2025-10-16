```vue

<script setup lang="ts">
import "@wppopen/components-library/dist/collection/grid.css";

const list = [...new Array(24)]

const gridStyle = {
  '--wpp-grid-row-spacing': 2,
  '--wpp-grid-column-spacing': 2
}
</script>

<template>
  <div class="wpp-grid-container-root" :style="gridStyle">
    <div v-if="(el, i) in list" class="wpp-grid-item-xs-1">
      <p>Col {{ i + 1 }}</p>
    </div>
  </div>
</template>


```
