<script setup lang="ts">
import type { InputChangeEventDetail, TreeActionClickEventDetail } from '@platform-ui-kit/components-library'
import { debounce } from 'lodash'
import { ref } from 'vue'
import { data } from '@/views/examples/vc/TreeVCExample/config'
import { WppInput, WppTree } from '@platform-ui-kit/components-library-vue'

const search = ref('')
const treeData = ref(data)

const multipleWordSearch = (title: string, multipleWord: string[]) =>
  multipleWord.find(element => element && title.includes(element)) !== undefined

const exactMatchSearch = (title: string, exactMatchChunks: string[]) =>
  exactMatchChunks.find(element => element && title.includes(element)) !== undefined

const searchConfig = {
  isMatchSearch: (title: any, search: any) => {
    const exactMatch: string[] = []
    const multipleWord: string[] = []
    const regx = /("(.*?)"|\S+)/g

    for (const match of search.matchAll(regx) as unknown as any) {
      match[2] ? exactMatch.push(match[2]) : multipleWord.push(match[1].toLowerCase())
    }
    const scTitle = title.toLowerCase()

    return exactMatchSearch(title, exactMatch) || multipleWordSearch(scTitle, multipleWord)
  },
  transformSearchQuery: (search: any) => search.replace(/"/g, ''),
}

const handleSearch = (e: CustomEvent<InputChangeEventDetail>) => {
  search.value = e.detail.value || ''
}

const debouncedHandleSearch = debounce(handleSearch, 400)

const handleTreeChange = (event: CustomEvent) => {
  console.log('handleTreeChange event :>> ', event.detail)
  treeData.value = event.detail.treeState
}

const handleActionClick = (event: CustomEvent<TreeActionClickEventDetail>) => {
  console.log('handleActionClick', event.detail)
}
</script>

<template>
  <div :style="{ marginTop: '1px' }" data-testid="quotation-marks-tree-area">
    <h3 class="title">Single tree with search with quotation marks</h3>
    <WppInput class="search" @wppChange="debouncedHandleSearch" type="search" placeholder="Search"
              data-testid="quotation-marks-input"/>
    <WppTree
      class="tree"
      :data="treeData"
      @wppChange="handleTreeChange"
      data-testid="quotation-marks-tree"
      @wppActionClick="handleActionClick"
      :search="search"
      :searchConfig="searchConfig"
    />
  </div>
</template>
