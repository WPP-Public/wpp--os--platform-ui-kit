<script setup lang="ts">
import { ref } from 'vue'

import { WppButton, WppTree } from '@platform-ui-kit/components-library-vue'

import { data } from './config'

const treeData = ref(data)
const loading = ref(true)

const handleTreeChange = (event: CustomEvent) => {
  console.log('handleTreeChange event :>> ', event.detail)

  treeData.value = event.detail.treeState
}

const toggleLoading = () => {
  loading.value = !loading.value
}
</script>

<template>
  <div data-testid="single-tree-container">
    <h3 class="title">Skeleton Loading tree</h3>
    <WppTree
      class="tree"
      :data="treeData"
      @wppChange="handleTreeChange"
      @wppActionClick="handleActionClick"
      data-testid="single-tree"
      skeleton-number-items="3"
      :loading="loading"
    />

    <WppButton @click="toggleLoading">Toggle loading</WppButton>
  </div>
</template>

<style lang="scss">
.wpp-button {
  margin-top: 40px;
}
</style>
