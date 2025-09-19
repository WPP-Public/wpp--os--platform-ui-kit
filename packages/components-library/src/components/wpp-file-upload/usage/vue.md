```vue
<script setup lang="ts">
import { ref } from "vue";

import { WppFileUpload } from "@platform-ui-kit/components-library-vue";

const hasError = ref(false);
const errorMessage = ref("");

const handleFileUploadErrorChange = (event: CustomEvent) => {
  console.log("event :>> ", event.detail);
  if (event.detail.hasError) {
    hasError.value = event.detail.hasError;
    errorMessage.value = `${event.detail.errorFiles.length} files have to be successfully uploaded`;

    return;
  }

  hasError.value = false;
  errorMessage.value = "";
};

const spanishLocale = {
  label: "Escoge un archivo",
  text: "para subirlo o arrastrarlo aquí",
  info: (accept: string, size: number) =>
    `Solamente ${accept} archivo a ${size} MB o menos`,
  sizeError: "El archivo supera el límite de tamaño",
  formatError: "Formato erróneo",
};
</script>

<template>
  <WppFileUpload
    @wppChange="handleFileUploadErrorChange"
    size="1"
    class="fileLoader"
    :messageType="hasError ? 'error' : undefined"
    :message="errorMessage"
    :locales="spanishLocale"
    data-testid="uploader-with-error"
  />
</template>
```
