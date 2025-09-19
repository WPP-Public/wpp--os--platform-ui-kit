<script setup lang="ts">
import { ref } from "vue";

import { WppTree } from "@platform-ui-kit/components-library-vue";

import { dataWithLongNames } from "./config";

const treeData = ref(dataWithLongNames);

const handleTreeChange = (event: CustomEvent) => {
  console.log("handleTreeChange event :>> ", event.detail);

  treeData.value = event.detail.treeState;
};

const handleActionClick = (event: CustomEvent) => {
  console.log("handleActionClick", event.detail);
};
</script>

<template>
  <h3 class="title">Multiple tree with selected by default</h3>

  <WppTree
    class="tree"
    :data="treeData"
    multiple
    @wppChange="handleTreeChange"
    @wppActionClick="handleActionClick"
    :defaultSelectedIds="['2-1', '1']"
    data-testid="multiple-tree"
  />
</template>
