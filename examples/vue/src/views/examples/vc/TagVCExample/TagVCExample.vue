<script setup lang="ts">
import { WppIconAsk, WppIconDrag, WppIconPlus, WppIconSearch, WppTag } from '@platform-ui-kit/components-library-vue'
</script>

<template>
  <div class="tags">
    <div>
      <h3>With Variants</h3>
      <WppTag class="item" label="Neutral" variant="neutral" />

      <WppTag class="item" label="Warning" variant="warning" />

      <WppTag class="item" label="Positive" variant="positive" />

      <WppTag class="item" label="Negative" variant="negative" />
    </div>

    <div>
      <h3>With Icons</h3>
      <WppTag class="item" label="Neutral" variant="neutral" withIcon>
        <WppIconAsk slot="icon-start" />
      </WppTag>

      <WppTag class="item" label="Warning" variant="warning" withIcon>
        <WppIconSearch slot="icon-start" />
      </WppTag>

      <WppTag class="item" label="Positive" variant="positive" withIcon>
        <WppIconPlus slot="icon-start" />
      </WppTag>

      <WppTag class="item" label="Negative" variant="negative" withIcon>
        <WppIconDrag slot="icon-start" />
      </WppTag>
    </div>

    <div>
      <h3>With categoricalColorIndex</h3>

      <WppTag class="item" label="Color Index 1" variant="Cat-1" />
      <WppTag class="item" label="Color Index 2" variant="Cat-2" />
      <WppTag class="item" label="Color Index 3" variant="Cat-3" />
      <WppTag class="item" label="Color Index 4" variant="Cat-4" />
      <WppTag class="item" label="Color Index 5" variant="Cat-5" />
      <WppTag class="item" label="Color Index 6" variant="Cat-6" />
      <WppTag class="item" label="Color Index 7" variant="Cat-7" />
      <WppTag class="item" label="Color Index 8" variant="Cat-8" />
      <WppTag class="item" label="Color Index 9" variant="Cat-9" />
    </div>

    <div>
      <h3>With truncation</h3>
      <WppTag class="item" label="Truncation" variant="warning" :maxLabelLength="5" />
    </div>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.item {
  margin: 5px;
}
</style>
