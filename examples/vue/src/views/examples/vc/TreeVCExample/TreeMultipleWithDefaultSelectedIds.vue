<script setup lang="ts">
import { ref } from 'vue'
import { WppTree } from '@platform-ui-kit/components-library-vue'
import { data } from './config'
import type { TreeChangeEventDetail } from '@platform-ui-kit/components-library'

const treeData = ref(data)

const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
  treeData.value = event.detail.treeState
}
</script>

<template>
  <div>
    <h3 class="title">Multiple tree with default selected ids ['0-1', '1']</h3>
    <WppTree
      class="tree"
      :data="treeData"
      :defaultSelectedIds="['0-1', '1']"
      multiple
      @wppChange="handleTreeChange"
      data-testid="multiple-tree"
    />
  </div>
</template>
