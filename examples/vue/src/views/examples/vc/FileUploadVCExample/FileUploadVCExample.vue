<script setup lang="ts">
import { ref } from "vue";

import { WppFileUpload } from "@platform-ui-kit/components-library-vue";

const hasError = ref(false);
const errorMessage = ref("");

const handleFileUploadChange = (event: CustomEvent) => {
  console.log("event :>> ", event.detail);
};

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

const twoLineLocale = {
  label: 'Choose a file',
  text: 'to upload or drag it here, only .jpg, .jpeg, .png can be uploaded',
  info: () => `Only .jpg, .jpeg, .png file at 50 MB or less. Supported formats include JPEG, JPG, PNG.`,
  sizeError: 'File exceeds size limit',
  formatError: 'Wrong format',
};

</script>

<template>
  <div class="container" data-testid="file-uploads">
    <div class="items">
      <h3 class="text">Default File Upload</h3>
      <WppFileUpload name="file-upload" @wppChange="handleFileUploadChange" />

      <h3 class="text">Default File Upload (Single File)</h3>
      <WppFileUpload :multiple="false" @wppChange="handleFileUploadChange" />

      <h3 class="text">Disabled File Upload</h3>
      <WppFileUpload disabled />

      <h3 class="text">File Upload with Spanish locale</h3>
      <WppFileUpload :multiple="false" @wppChange="handleFileUploadChange" :accept="['.bmp']" size="9"
        :locales="spanishLocale" />

      <h3 class="text">File Upload with 2 line text info</h3>
      <WppFileUpload :multiple="false" @wppChange="handleFileUploadChange" size="9" :locales="twoLineLocale" />
    </div>

    <div class="items">
      <h3 class="text">File Upload with no file limits</h3>
      <WppFileUpload @wppChange="handleFileUploadChange" :accept="[]" data-testid="uploader" />

      <h3 class="text">File Upload with label, description and custom width</h3>
      <WppFileUpload class="loader" @wppChange="handleFileUploadChange">
        <h3 slot="label">Baseplan</h3>
        <p slot="description">
          Download template, fill and upload it into this area
        </p>
      </WppFileUpload>

      <h3 class="text">File Upload with different accept format and size</h3>
      <WppFileUpload @wppChange="handleFileUploadChange" :accept="['.mov', '.avi']" size="100" />

      <h3 class="text">File Upload with errors</h3>
      <WppFileUpload @wppChange="handleFileUploadErrorChange" size="1" class="fileLoader"
        :messageType="hasError ? 'error' : undefined" :message="errorMessage" data-testid="uploader-with-error" />
    </div>
  </div>
</template>
<style scoped>
.text {
  margin: 20px 0;
}

.container {
  display: flex;
  flex-direction: row;
  padding-left: 10px;

  --wpp-file-upload-item-max-width: 500px;
}

.loader {
  --wpp-file-upload-width: 638px;
}

.fileLoader {
  --wpp-file-upload-item-max-width: 500px;
}

.items {
  width: 500px;
  margin-right: 30px;
}
</style>
