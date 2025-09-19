<script lang="ts">
import { WppTypography } from '@platform-ui-kit/components-library-vue'
import { images } from './config'
import { defineComponent } from "vue";

export default defineComponent({
  name: "Images",
  components: {
    WppTypography: WppTypography,
  },
  data() {
    return {
      images: images,
    };
  },
});
</script>

<template>
  <div class="images">
    <div v-for="section in images" class="container" :key="section.title">
      <WppTypography type="xl-heading" tag="h3" class="title">
        {{ section.title }}
      </WppTypography>
      <div class="section">
        <div v-for="image in section.images" class="item" :key="image.name">
          <component :is="image.html"></component>
          <WppTypography type="xs-body" class="info">
            {{ image.name }}
          </WppTypography>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.container {
  margin: 15px;
}

.section {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 15px;
}

.item {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  margin: 0 15px 15px 0;
  padding: 20px;
  border: 1px solid var(--wpp-grey-color-300);
  border-radius: 5px;
}

.info {
  display: flex;
  margin: 15px 0 10px;
  white-space: nowrap;
  text-align: center;
}
</style>
