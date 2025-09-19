<script setup lang="ts">
import { ref } from 'vue'

import { WppTree } from '@platform-ui-kit/components-library-vue'

import { dataWithEndContent } from './config'

const treeData = ref(dataWithEndContent)

const handleTreeChange = (event: CustomEvent) => {
  console.log('handleTreeChange event :>> ', event.detail)

  treeData.value = event.detail.treeState
}

const handleActionClick = (event: CustomEvent) => {
  console.log('handleActionClick', event.detail)
}
</script>

<template>
  <div data-testid="single-tree-container">
    <h3 class="title">Single tree with End Content</h3>
    <WppTree class="tree" :data="treeData" @wppChange="handleTreeChange" @wppActionClick="handleActionClick" multiple
      data-testid="single-tree-end-content" />
  </div>
</template>
