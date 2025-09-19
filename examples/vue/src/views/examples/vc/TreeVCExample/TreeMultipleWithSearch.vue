<script setup lang="ts">
import { ref } from "vue";

import { WppInput, WppTree } from "@platform-ui-kit/components-library-vue";

import { debounce } from "lodash";

import { dataWithLongNames } from "./config";

const treeData = ref(dataWithLongNames);
const search = ref("");

const handleTreeChange = (ev: CustomEvent) => {
  treeData.value = ev.detail.treeState;
};

const handleSearch = (ev: CustomEvent) => {
  search.value = ev.detail.value || "";
};

// In order to prevent rendering issues on big data, use debounce for search handler
const debouncedHandleSearch = debounce(handleSearch, 400);
</script>

<template>
  <h3 class="title">Multiple tree with search</h3>

  <WppInput
    class="search"
    type="search"
    placeholder="Search"
    @wppChange="debouncedHandleSearch"
  />

  <WppTree
    class="tree"
    :data="treeData"
    :search="search"
    multiple
    @wppChange="handleTreeChange"
    data-testid="multiple-tree"
  />
</template>
