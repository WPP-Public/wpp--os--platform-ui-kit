<script lang="ts">
import { defineComponent } from "vue";

import {
  WppFileUpload,
  WppButton,
} from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  name: "ThirdPage",
  components: {
    WppFileUpload: WppFileUpload,
    WppButton: WppButton,
  },
  methods: {
    handleCloseSideModal() {
      this.$emit("closeSideModal");
    },
  },
});
</script>

<template>
  <div slot="header">Page Title</div>
  <div slot="body">
    Page Body
    <WppFileUpload />
  </div>
  <div slot="actions" class="buttons">
    <WppButton variant="secondary" @click="handleCloseSideModal" class="button">
      Cancel
    </WppButton>
    <WppButton variant="primary">Select</WppButton>
  </div>
</template>

<style scoped>
.message p {
  line-height: 1.3;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.button {
  margin-right: 12px;
}
</style>
