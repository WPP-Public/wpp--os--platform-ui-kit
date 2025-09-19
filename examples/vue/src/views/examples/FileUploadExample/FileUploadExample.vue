<script setup lang="ts">
import { ref } from "vue";

import { WppFileUpload } from "@platform-ui-kit/components-library-vue";
import type {
  FileItemType,
  FileUploadEventDetail,
} from "@platform-ui-kit/components-library/src";
import AcceptProp from "@/views/examples/FileUploadExample/Examples/AcceptProp.vue";
import AcceptConfigAndAcceptProp from "@/views/examples/FileUploadExample/Examples/AcceptConfigAndAcceptProp.vue";
import AcceptConfig from "@/views/examples/FileUploadExample/Examples/AcceptConfig.vue";
import NoLimitations from "@/views/examples/FileUploadExample/Examples/NoLimitations.vue";
import { fileValidator } from "./utils";

const hasError = ref(false);
const defaultValueWithUrl = {
  url: "https://test.png",
  name: "below_1MB-file-1.png",
  size: 171615,
  type: "",
};

const file = ref([defaultValueWithUrl]);
const handleFileUploadChange = (event: CustomEvent) => {
  console.log(
    JSON.stringify(
      transformChangeDetailToJson({ ...event.detail, eventType: "wppChange" })
    )
  );
  file.value = event.detail.value;
};

const mapFileArrayToObject = (arr: FileItemType[] | undefined) =>
  arr?.map((elem) => {
    if ("url" in elem) return elem;

    return { name: elem.name, size: elem.size };
  });

const transformChangeDetailToJson = (obj: FileUploadEventDetail) => {
  const value = mapFileArrayToObject(obj.value);
  const errorFiles = mapFileArrayToObject(obj.errorFiles);

  return {
    ...obj,
    value,
    errorFiles,
  };
};
</script>

<template>
  <div class="container">
    <div data-testid="multiple-file-upload-container">
      <h3 class="text">Multiple File Upload</h3>
      <WppFileUpload
        :value="file"
        @wppChange="handleFileUploadChange"
        data-testid="file-upload-multiple"
        size="1"
        :validator="fileValidator"
      />
    </div>

    <h3 class="text">Single File Upload</h3>
    <WppFileUpload
      :value="file"
      :multiple="false"
      size="1"
      @wppChange="handleFileUploadChange"
      data-testid="file-upload-single"
    />

    <AcceptProp />
    <AcceptConfig />
    <AcceptConfigAndAcceptProp />
    <NoLimitations />

    <h3 class="text">File Upload with limited amount of files</h3>
    <WppFileUpload
      size="2"
      maxFiles="2"
      @wppChange="{handleFileUploadChange}"
      data-testid="limited-file-upload"
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
