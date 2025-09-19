```vue

<script setup lang="ts">
import { ref } from 'vue';
import {
  WppNavSidebar,
  WppNavSidebarItem,
  WppIconGlobe,
  WppIconFavorites,
  WppIconCalendar,
  WppIconMail,
} from '@platform-ui-kit/components-library-vue';

const activePath = ref('/dashboard');

const handleChangeRoute = (event: CustomEvent) => {
  console.log('Route changed:', event.detail);
  activePath.value = event.detail.path;
};
</script>

<template>
  <WppNavSidebar :activePath="activePath" @wppChange="handleChangeRoute">
    <div slot="icon">
      <svg-icon />
      <p>App Name</p>
    </div>
    <WppNavSidebarItem label="Dashboard" path="/dashboard">
      <WppIconGlobe slot="icon-start" />
    </WppNavSidebarItem>
    <WppNavSidebarItem label="Projects" path="/projects" extended>
      <WppIconFavorites slot="icon-start" />
      <WppNavSidebarItem label="Projects 01" path="/project1" />
      <WppNavSidebarItem label="Projects 02" path="/project2" />
    </WppNavSidebarItem>
    <WppNavSidebarItem label="Scheduled reporting" path="/scheduled" extended groupTitle="Reporting">
      <WppIconCalendar slot="icon-start" />
      <WppNavSidebarItem label="Scheduled 01" path="/scheduled1" />
      <WppNavSidebarItem label="Scheduled 02" path="/scheduled2" />
    </WppNavSidebarItem>
    <WppNavSidebarItem label="Attachments" path="/attachments">
      <WppIconMail slot="icon-start" />
    </WppNavSidebarItem>
  </WppNavSidebar>
</template>


```
