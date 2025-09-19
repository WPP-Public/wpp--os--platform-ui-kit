<script setup lang="ts">
import { ref } from "vue";

import { WppTree } from "@platform-ui-kit/components-library-vue";

const data: any[] = [
  {
    id: "0",
    title: "Cars",
    children: [
      {
        id: "0-0",
        title: "Toyota",
        iconsEnd: [
          {
            name: "remove",
            icon: "wpp-icon-info",
          },
          {
            name: "save",
            icon: "wpp-icon-cross",
          },
        ],
      },
    ],
  },
  {
    id: "1",
    title: "Planes",
    isNotSelectable: true,
    children: [
      {
        id: "1-0",
        title: "B-52",
      },
      {
        id: "1-1",
        title: "MIG-21",
      },
    ],
  },
];

const treeData = ref(data);

const handleTreeChange = (event: CustomEvent) => {
  console.log("handleTreeChange event :>> ", event.detail);

  treeData.value = event.detail.treeState;
};
</script>

<template>
  <h3 class="title">Multiple tree with not selectable Planes item</h3>

  <WppTree
    class="tree"
    :data="treeData"
    multiple
    @wppChange="handleTreeChange"
    data-testid="multiple-tree"
  />
</template>
