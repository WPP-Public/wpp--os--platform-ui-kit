<script lang="ts">
import { defineComponent } from "vue";

import {
  WppTypography,
  WppIconSort,
} from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppTypography: WppTypography,
    WppIconSort: WppIconSort,
  },
  setup(props) {
    const { displayName, enableSorting } = props.params;

    return {
      params: props.params,
      enableSorting,
      displayName,
    };
  },
  methods: {
    handleHeaderCellClick() {
      const props = this.params;
      if (!props.enableSorting) return;

      const items: ("asc" | "desc" | null)[] = ["asc", "desc", null];
      const selectedSort = props.column.getSort();
      const selectedSortIndex = selectedSort ? items.indexOf(selectedSort) : -1;
      const nextSortType =
        selectedSortIndex === -1 || selectedSortIndex === items.length - 1
          ? "asc"
          : items[selectedSortIndex + 1];

      props.setSort(nextSortType);
    },
  },
});
</script>

<template>
  <div class="ag-header-cell-comp" @click="handleHeaderCellClick">
    <WppTypography type="s-strong">{{ displayName }}</WppTypography>
    <div class="ag-sorting" v-if="enableSorting">
      <WppIconSort class="top-sort-icon" />
    </div>
  </div>
</template>

<style scoped></style>
