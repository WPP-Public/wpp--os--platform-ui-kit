<script setup lang="ts">
import { ref } from "vue";

import { WppTabs, WppTab } from "@platform-ui-kit/components-library-vue";

import BannerNavbar from "./BannerNavbar.vue";
import BannerTopbar from "./BannerTopbar.vue";
import BannerStates from "./BannerStates.vue";

const currentTab = ref("bannerTopBar");

const handleTabChange = (event: CustomEvent) => {
  currentTab.value = event.detail.value;
};
</script>

<template>
  <div class="tabs">
    <WppTabs :value="currentTab" @wppChange="handleTabChange">
      <WppTab value="bannerNavBar" data-testid="nav-bar">
        Banner Navbar
      </WppTab>
      <WppTab value="bannerTopBar" data-testid="top-bar">
        Banner Topbar
      </WppTab>
      <WppTab value="bannerStates" data-testid="states"> Banner States </WppTab>
    </WppTabs>
    <div class="content">
      <BannerNavbar v-if="currentTab === 'bannerNavBar'" />
      <BannerTopbar v-if="currentTab === 'bannerTopBar'" />
      <BannerStates v-if="currentTab === 'bannerStates'" />
    </div>
  </div>
</template>

<style scoped>
.tabs {
  padding: 20px 20px 50px;
}

.content {
  margin-top: 20px;
  padding: 16px 0;
}
</style>
