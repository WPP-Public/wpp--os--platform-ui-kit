<script setup lang="ts">
import { ref } from "vue";

import { WppInput, WppTree } from "@platform-ui-kit/components-library-vue";

import { debounce } from "lodash";

import { chosData } from "./config";

const search = ref("");
const treeData = ref(chosData);

const handleTreeChange = (event: CustomEvent) => {
  console.log("handleTreeChange event :>> ", event.detail);

  treeData.value = event.detail.treeState;
};

const handleSearch = (ev: CustomEvent) => {
  search.value = ev.detail.value || "";
};

const handleActionClick = (event: CustomEvent) => {
  console.log("handleActionClick", event.detail);
};

// In order to prevent rendering issues on big data, use debounce for search handler
const debouncedHandleSearch = debounce(handleSearch, 400);
</script>

<template>
  <h3 class="title">Single tree with search</h3>

  <WppInput
    class="search"
    type="search"
    placeholder="Search"
    @wppChange="debouncedHandleSearch"
    data-testid="search-input"
  />

  <WppTree
    class="tree"
    :data="treeData"
    :search="search"
    @wppChange="handleTreeChange"
    @wppActionClick="handleActionClick"
  />
</template>
