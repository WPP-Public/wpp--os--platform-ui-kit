<script lang="ts">
import { defineComponent } from "vue";

import { WppTypography } from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  name: "ResultsView",
  components: {
    WppTypography: WppTypography,
  },
  props: ["value"],
});
</script>

<template>
  <div class="results">
    <WppTypography type="s-body">Selected values:</WppTypography>
    <pre class="mono">{{ JSON.stringify(value, null, 2) }}</pre>
  </div>
</template>

<style scoped>
.results {
  margin-top: 16px;
}

.mono {
  margin: 0;
  padding: 8px;
  overflow: hidden;
  white-space: pre-wrap;
  background-color: #faf9f5;
  border: 1px solid var(--wpp-grey-color-600);
  border-radius: 4px;
}
</style>
