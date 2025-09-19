<script setup lang="ts">
import { ref } from "vue";

import {
  WppTabs,
  WppTab,
  WppTypography,
} from "@platform-ui-kit/components-library-vue";

const currentTab = ref("drinks");

const handleTabChange = (event: CustomEvent) => {
  currentTab.value = event.detail.value;
};
</script>

<template>
  <div data-testid="tab-control">
    <h2 class="title">Tabs example M Size</h2>
    <div class="page">
      <WppTabs :value="currentTab" @wppChange="handleTabChange">
        <WppTab value="houses">Houses</WppTab>
        <WppTab value="cars">Cars</WppTab>
        <WppTab disabled counter="2" value="food"> Food </WppTab>
        <WppTab value="drinks" counter="4"> Drinks </WppTab>
      </WppTabs>

      <div class="content">
        <WppTypography
          v-if="currentTab === 'houses'"
          type="xs-body"
          class="content"
        >
          First content
        </WppTypography>
        <WppTypography
          v-if="currentTab === 'cars'"
          type="xs-body"
          class="content"
        >
          Second content
        </WppTypography>
        <WppTypography
          v-if="currentTab === 'drinks'"
          type="xs-body"
          class="content"
        >
          Fourth content
        </WppTypography>
      </div>
    </div>

    <h2 class="title">Tabs example S Size</h2>
    <div class="page">
      <WppTabs size="s" :value="currentTab" @wppChange="handleTabChange">
        <WppTab value="houses">Houses</WppTab>
        <WppTab value="cars">Cars</WppTab>
        <WppTab disabled counter="2" value="food"> Food </WppTab>
        <WppTab value="drinks" counter="4"> Drinks </WppTab>
      </WppTabs>

      <div class="content">
        <WppTypography
          v-if="currentTab === 'houses'"
          type="xs-body"
          class="content"
        >
          First content
        </WppTypography>
        <WppTypography
          v-if="currentTab === 'cars'"
          type="xs-body"
          class="content"
        >
          Second content
        </WppTypography>
        <WppTypography
          v-if="currentTab === 'drinks'"
          type="xs-body"
          class="content"
        >
          Fourth content
        </WppTypography>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding: 20px 20px 50px;
}

.title {
  font-weight: 600;
  font-size: 28px;
  font-family: var(--wpp-font-family);
  font-style: normal;
  line-height: 40px;
  letter-spacing: 0;
  text-align: center;
}

.content {
  margin-top: 20px;
  padding: 16px;
}
</style>
