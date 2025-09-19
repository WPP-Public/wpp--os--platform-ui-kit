<script setup lang="ts">
import {
  WppNavSidebar,
  WppNavSidebarItem,
  WppIconGlobe,
  WppIconFavourites,
  WppIconCalendar,
  WppIconUser,
  WppIconMail,
  WppIconSubscribe,
  WppIconUpload,
  WppIconBookmarkSelected,
  WppTypography,
} from '@platform-ui-kit/components-library-vue'
import { ref } from 'vue'

const activePath = ref('/dashboard')

const handleChangeRoute = (event: CustomEvent) => {
  console.log('Route changed to:', event.detail.path)
  activePath.value = event.detail.path
}

const setActivePath = (path: string) => {
  activePath.value = path
}
</script>

<template>
  <div class="wrapper open">
    <div class="control-panel">
      <WppTypography type="m-strong">Control Active Path</WppTypography>
      <button @click="setActivePath('/dashboard')">Go to Dashboard</button>
      <button @click="setActivePath('/projects')">Go to Projects</button>
      <button @click="setActivePath('/scheduled')">Go to Scheduled Reporting</button>
      <button @click="setActivePath('/shared-reports')">Go to Shared Reports</button>
    </div>

    <WppNavSidebar :activePath="activePath" @wppChange="handleChangeRoute" nativeLink>
      <div slot="header">
        <div class="icon">
          <WppIconBookmarkSelected />
        </div>
        <WppTypography type="m-strong" class="name" tag="p"> App Name </WppTypography>
      </div>
      <WppNavSidebarItem label="Dashboard" path="/dashboard" target="_blank">
        <WppIconGlobe slot="icon-start" />
      </WppNavSidebarItem>
      <WppNavSidebarItem label="Projects" path="/projects" extended expanded>
        <WppIconFavourites slot="icon-start" />
        <WppNavSidebarItem label="Projects 01" path="/projects1" target="_blank"></WppNavSidebarItem>
        <WppNavSidebarItem label="Projects 02" path="/projects2" target="_blank"></WppNavSidebarItem>
        <WppNavSidebarItem label="Projects 03" path="/projects3" target="_blank"></WppNavSidebarItem>
      </WppNavSidebarItem>
      <WppNavSidebarItem
        label="Scheduled reporting"
        path="/scheduled"
        extended
        groupTitle="Reporting"
        data-testid="tooltip-item"
      >
        <WppIconCalendar slot="icon-start" />
        <WppNavSidebarItem label="Scheduled 01" path="/scheduled1"></WppNavSidebarItem>
        <WppNavSidebarItem label="Scheduled 02" path="/scheduled2"></WppNavSidebarItem>
      </WppNavSidebarItem>
      <WppNavSidebarItem label="Shared reports" path="/shared-reports" divide>
        <WppIconUser slot="icon-start" />
      </WppNavSidebarItem>
      <WppNavSidebarItem label="Attachments" path="/attachments">
        <WppIconMail slot="icon-start" />
      </WppNavSidebarItem>
      <WppNavSidebarItem label="Archive" path="/archive" divide>
        <WppIconSubscribe slot="icon-start" />
      </WppNavSidebarItem>
      <WppNavSidebarItem label="Applications" path="/applications">
        <WppIconUpload slot="icon-start" />
      </WppNavSidebarItem>
    </WppNavSidebar>
    <div>
      <WppTypography type="m-body" tag="p"> Content Area: The content updates based on the active item. </WppTypography>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  margin-left: 72px;
  padding: 20px;
  background-color: var(--wpp-grey-color-300);
  transition: 0.5s ease-in-out;
}

.open {
  margin-left: 240px;
}

.control-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.control-panel button {
  padding: 8px 12px;
  background-color: var(--wpp-primary-color-500);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.control-panel button:hover {
  background-color: var(--wpp-primary-color-600);
}

.control-panel button:active {
  background-color: var(--wpp-primary-color-700);
}

.icon {
  display: inline-block;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgb(0 0 0 / 20%);
}

.name {
  display: flex;
  justify-content: center;
  margin-top: 8px;
  color: var(--wpp-grey-color-1000);
}
</style>
