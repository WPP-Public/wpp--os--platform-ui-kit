<script setup lang="ts">
import { ref } from 'vue'

import { WppFileUpload } from '@platform-ui-kit/components-library-vue'

const file = ref([])

const handleFileUploadChange = (event: CustomEvent) => {
  file.value = (event.detail.value)
}
</script>

<template>
  <div class="container">
    <h3 class="text">File Upload with no limitations</h3>
    <pre>accept=[] </pre>
    <pre>acceptConfig={}</pre>
    <WppFileUpload
      :value="file"
      @wppChange="handleFileUploadChange"
      data-testid="file-upload-multiple"
      size="1"
      :accept="[]"
      :acceptConfig="{}"
    />
  </div>
</template>

<style>
.text {
  margin: 20px 0;
}

.container {
  display: flex;
  flex-direction: column;
  width: 500px;
  padding-left: 10px;

  --wpp-file-upload-item-max-width: 500px;
}

.fileLoader {
  --wpp-file-upload-item-max-width: 500px;
}

.items {
  width: 500px;
  margin-right: 30px;
}
</style>
