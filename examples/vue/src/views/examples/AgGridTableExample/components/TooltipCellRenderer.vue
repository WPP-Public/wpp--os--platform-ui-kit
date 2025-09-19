<script lang="ts">
import { defineComponent } from "vue";

import {
  WppTooltip,
  WppIconSmile,
} from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  components: {
    WppTooltip: WppTooltip,
    WppIconSmile: WppIconSmile,
  },
});
</script>

<template>
  <WppTooltip text="icon-smile">
    <WppIconSmile />
  </WppTooltip>
</template>

<style scoped></style>
