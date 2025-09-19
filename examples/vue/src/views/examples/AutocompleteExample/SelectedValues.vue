<script lang="ts">
import { defineComponent } from "vue";

import { WppPill } from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  name: "SelectedValues",
  components: {
    WppPill: WppPill,
  },
  props: ["values"],
  methods: {
    handleCloseClick(value: number) {
      this.$emit("closeClick", value);
    },
  },
});
</script>

<template>
  <div slot="selected-values">
    <WppPill
      v-for="value in values"
      :key="JSON.stringify(value)"
      :label="value.label"
      removable
      :value="value.id"
      type="display"
      class="pill"
      @wppClose="() => handleCloseClick(value.id)"
    >
      {{ value.label }}
    </WppPill>
  </div>
</template>

<style scoped></style>
