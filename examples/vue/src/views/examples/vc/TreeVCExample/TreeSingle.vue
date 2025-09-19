<script setup lang="ts">
import { ref } from 'vue'

import { WppTree } from '@platform-ui-kit/components-library-vue'

import { data } from './config'

const treeData = ref(data)

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
    <h3 class="title">Single tree</h3>
    <WppTree
      class="tree"
      :data="treeData"
      @wppChange="handleTreeChange"
      @wppActionClick="handleActionClick"
      data-testid="single-tree"
    />
  </div>
</template>
