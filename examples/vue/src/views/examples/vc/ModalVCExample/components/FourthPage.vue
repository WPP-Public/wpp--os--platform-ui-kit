<script lang="ts">
import { defineComponent } from 'vue'

import { WppFileUpload, WppAvatar, WppCard } from '@platform-ui-kit/components-library-vue'

export default defineComponent({
  name: 'FourthPage',
  components: {
    WppFileUpload: WppFileUpload,
    WppAvatar: WppAvatar,
    WppCard: WppCard,
  },
})
</script>

<template>
  <div slot="header">Fourth Page Title</div>
  <div slot="body">
    <div class="message">
      <WppAvatar
        class="avatar hover-avatar"
        withTooltip
        size="s"
        name="John Smith Junior"
        color="var(--wpp-dataviz-color-cat-dark-9)"
      />
      <WppCard class="card">
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
    <h3>File Upload</h3>
    <WppFileUpload />
  </div>
</template>

<style scoped>
.message {
  display: flex;
  margin: 16px 0;
}

.avatar {
  flex: 0 0 auto;
  margin-top: 8px;
  margin-right: 16px;
}

.card {
  flex: 1 1 auto;
}

.message p {
  line-height: 1.3;
}
</style>
