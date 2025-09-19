<script setup lang="ts">
import { ref } from 'vue'

import { WppInput, WppTree } from '@platform-ui-kit/components-library-vue'

import { debounce } from 'lodash'

import { data } from './config'
import type { TreeType } from '@platform-ui-kit/components-library/dist/types/components/wpp-tree/types'

const searchConfig = {
  isMatchingSearch: (item: TreeType, search: string) => item.title.toLocaleLowerCase().includes(search.toLowerCase()),
}

const search = ref('')
const treeData = ref(data)

const handleTreeChange = (event: CustomEvent) => {
  console.log('handleTreeChange event :>> ', event.detail)

  treeData.value = event.detail.treeState
}

const handleSearch = (ev: CustomEvent) => {
  search.value = ev.detail.value || ''
}

// In order to prevent rendering issues on big data, use debounce for search handler
const debouncedHandleSearch = debounce(handleSearch, 400)
</script>

<template>
  <h3 class="title">
    Single tree with new custom search: tree-item's text should include search string (not case sensitive)
  </h3>

  <WppInput class="search" type="search" placeholder="Search" @wppChange="debouncedHandleSearch" />

  <WppTree
    class="tree"
    :data="treeData"
    :search="search"
    :searchConfig="searchConfig"
    @wppChange="handleTreeChange"
    data-testid="single-tree-custom-search"
  />
</template>
