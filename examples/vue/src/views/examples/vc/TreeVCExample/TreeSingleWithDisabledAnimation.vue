<script setup lang="ts">
import { ref } from 'vue'
import { data } from './config'
import { WppTree } from '@platform-ui-kit/components-library-vue'
import type { TreeActionClickEventDetail } from '@platform-ui-kit/components-library/src'

const treeData = ref(data)

const handleTreeChange = (event: CustomEvent) => {
  console.log('handleTreeChange event :>> ', event.detail)
  treeData.value = event.detail.treeState
}

const handleActionClick = (event: CustomEvent<TreeActionClickEventDetail>) => {
  console.log('handleActionClick', event.detail)
}
</script>

<template>
  <div>
    <h3 class="title">Single tree with disabled open/close animation</h3>
    <WppTree
      class="tree"
      :data="treeData"
      @wppChange="handleTreeChange"
      data-testid="single-tree"
      @wppActionClick="handleActionClick"
      disableOpenCloseAnimation=true
    />
  </div>
</template>
