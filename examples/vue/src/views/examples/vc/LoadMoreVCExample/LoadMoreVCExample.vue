<script setup lang="ts">
import { ref } from 'vue'
import { WppLoadMore } from '@platform-ui-kit/components-library-vue'

const itemsLoaded = ref(30)
const loading = ref(false)
const incrementBy = 20
const totalItems = 100

const handleLoadMore = (event: CustomEvent<{ newItemsLoaded: number; incrementBy: number }>) => {
  const { newItemsLoaded } = event.detail

  loading.value = true
  setTimeout(() => {
    itemsLoaded.value = newItemsLoaded
    loading.value = false
  }, 1000)
}
</script>

<template>
  <div>
    <h1>Load More</h1>
    <div class="container">
      <div class="load-more">
        <h3>with progress bar</h3>
        <WppLoadMore :total-items="totalItems" :items-loaded="itemsLoaded" :show-progress-bar="true" :loading="loading"
          :increment-by="incrementBy" @wppClickLoadMore="handleLoadMore" />
      </div>

      <div class="load-more">
        <h3>without progress bar</h3>
        <WppLoadMore :total-items="totalItems" :items-loaded="50" />
      </div>

      <div class="load-more">
        <h3>Disabled</h3>
        <WppLoadMore :total-items="totalItems" :show-progress-bar="true" :disabled="true" :items-loaded="50" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: grid;
  gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}
.load-more {
  padding: 10px;
}
</style>
