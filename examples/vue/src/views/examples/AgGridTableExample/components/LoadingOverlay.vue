<script lang="ts">
import { defineComponent } from "vue";
import { WppSpinner } from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppSpinner: WppSpinner,
  },
});
</script>

<template>
  <WppSpinner size="m" />
</template>

<style scoped></style>
