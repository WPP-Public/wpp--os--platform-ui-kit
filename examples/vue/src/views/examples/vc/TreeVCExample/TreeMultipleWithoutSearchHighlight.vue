<script setup lang="ts">
import { ref } from 'vue'
import { WppTree, WppInput } from '@platform-ui-kit/components-library-vue'

import { dataWithLongNames } from "./config";
import type { InputChangeEventDetail, TreeChangeEventDetail } from '@platform-ui-kit/components-library'
import { debounce } from "lodash";

const treeData = ref(dataWithLongNames)
const search = ref('')

const handleTreeChange = (event: CustomEvent<TreeChangeEventDetail>) => {
  treeData.value = event.detail.treeState
}

const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
  search.value = e.detail.value || ''
}

// In order to prevent rendering issues on big data, use debounce for search handler
const debouncedHandleSearch = debounce(handleSearch, 400);
</script>

<template>
  <div>
    <h3 class="title">Multiple tree without search highlight</h3>
    <WppInput class="search" @wppChange="debouncedHandleSearch" type="search" placeholder="Search"/>
    <WppTree
      class="tree"
      :data="treeData"
      :search="search"
      multiple
      @wppChange="handleTreeChange"
      disableSearchHighlight
      data-testid="multiple-tree"
    />
  </div>
</template>
