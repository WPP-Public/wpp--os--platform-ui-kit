```vue

<template>
  <div>
    <WppLoadMore
      :total-items="100"
      :items-loaded="itemsLoaded"
      :show-progress-bar="true"
      :loading="loading"
      :increment-by="incrementBy"
      @wppClickLoadMore="handleLoadMore"
    />

    <WppLoadMore
      :total-items="100"
      :items-loaded="50"
      :show-progress-bar="true"
      :loading="false"
      :increment-by="10"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const itemsLoaded = ref(30);
const loading = ref(false);
const incrementBy = 10;

const handleLoadMore = (event: CustomEvent<{ newItemsLoaded: number; incrementBy: number }>) => {
  const { newItemsLoaded, incrementBy } = event.detail;
  loading.value = true;
  setTimeout(() => {
    itemsLoaded.value = newItemsLoaded;
    loading.value = false;
  }, 1000);
};
</script>

<style scoped>
/* Add your styles here */
</style>

```
