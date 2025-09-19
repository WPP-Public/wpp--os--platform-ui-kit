<script lang="ts">
import { defineComponent } from "vue";

import {
  WppAvatar,
  WppCard,
  WppButton,
} from "@platform-ui-kit/components-library-vue";

export default defineComponent({
  name: "FirstPage",
  components: {
    WppAvatar: WppAvatar,
    WppCard: WppCard,
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
  <div slot="header">Second Page Title</div>
  <div slot="body">
    <div class="message">
      <WppAvatar withTooltip size="s" name="John Smith Junior" />
      <WppCard>
        <p>
          Good morning team,
          <br />
          Will take a sick leave for today 🍋
          <br />
          <br />
          🙏 Please water my plants, thanks!
        </p>
      </WppCard>
    </div>
  </div>
  <div slot="actions">
    <WppButton variant="destructive" @click="handleCloseSideModal">
      Close
    </WppButton>
  </div>
</template>

<style scoped>
.message {
  display: flex;
  margin: 16px 0;
}

.message p {
  line-height: 1.3;
}
</style>
