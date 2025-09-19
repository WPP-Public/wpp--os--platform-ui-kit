<script lang="ts">
import { defineComponent } from "vue";

import { WppTypography } from "@platform-ui-kit/components-library-vue";
import { capitalize } from "@/utils";

export default defineComponent({
  components: {
    WppTypography: WppTypography,
  },
  data() {
    return {
      firstPart: "",
      secondPart: "",
      search: "",
      value: "",
    };
  },
  beforeMount() {
    this.calculateDisplayParts(this.params);
  },
  methods: {
    calculateDisplayParts(params) {
      if (params) {
        const { value, search: initSearch, column, searchColumn } = params;

        this.value = value;

        if (initSearch && column?.getColId() === searchColumn) {
          const splittedValue = value
            .toLowerCase()
            .split(initSearch.toLowerCase());

          this.firstPart = splittedValue[0];
          this.secondPart = splittedValue[1];

          if (this.firstPart) {
            this.firstPart = capitalize(this.firstPart);
          }

          this.search = this.firstPart ? initSearch : capitalize(initSearch);
        }
      }
    },
  },
});
</script>

<template>
  <WppTypography type="s-body" v-if="!search">{{ value }}</WppTypography>
  <WppTypography type="s-body" class="cell-text" v-if="search">
    {{ firstPart }}<span class="ag-search-highlight">{{ search }}</span
    >{{ secondPart }}
  </WppTypography>
</template>

<style scoped></style>
