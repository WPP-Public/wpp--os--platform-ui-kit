<script lang="ts">
import { WppIconZoomOut, WppTypography } from '@platform-ui-kit/components-library-vue'
import { icons } from './config'
import { defineComponent } from "vue";

export default defineComponent({
  name: "Icons",
  components: {
    WppTypography: WppTypography,
    WppIconZoomOut: WppIconZoomOut,
  },
  data() {
    return {
      icons: icons,
    };
  },
});
</script>

<template>
  <div class="icons" data-testid="icons-container">
    <div v-for="sector in icons" class="container" :key="sector.title">
      <WppTypography type="xl-heading" tag="h3" class="title">
        {{ sector.title }}
      </WppTypography>
      <div class="iconsList">
        <div v-for="icon in sector.icons" class="info" :key="icon.name">
          <WppTypography type="xs-body" class="name">
            {{ icon.name }}
          </WppTypography>
          <component :is="icon.html"></component>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.icons {
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.title {
  display: flex;
}

.info {
  display: inline-flex;
  flex-direction: column-reverse;
  align-items: center;
  width: 100px;
  height: 60px;
  margin: 15px 10px 15px 0;
  padding: 20px;
  color: #333;
  border: 1px solid #00000010;
  border-radius: 5px;
}

.iconsList {
  display: flex;
  flex-wrap: wrap;
}

.name {
  display: flex;
  margin: 15px 0 10px;
  font-weight: 400;
  font-size: 12px;
  font-family: var(--wpp-font-family);
  font-style: normal;
  white-space: nowrap;
  text-align: center;
}
</style>
