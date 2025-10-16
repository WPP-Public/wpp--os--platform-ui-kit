# wpp-navigation-sidebar



<!-- Auto Generated Below -->


## Usage

### Angular

```ts
@Component({
  ...
})
export class NavSidebarExample {
  public activePath: string = '/dashboard';

  public changeRoute(event): void {
    console.log('Route changed:', event.detail);
    this.activePath = event.detail.path;
  }
}
```

```html
<wpp-nav-sidebar
  [activePath]="activePath"
  (wppChange)="changeRoute($event)"
>
  <div slot="icon">
    <svg-icon></svg-icon>
    <p>App Name</p>
  </div>
  <wpp-nav-sidebar-item label="Dashboard" path="/dashboard">
    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
  </wpp-nav-sidebar-item>
  <wpp-nav-sidebar-item label="Projects" extended>
    <wpp-icon-favorites slot="icon-start"></wpp-icon-favorites>
    <wpp-nav-sidebar-item label="Projects 01" path="/project1"></wpp-nav-sidebar-item>
    <wpp-nav-sidebar-item label="Projects 02" path="/project2"></wpp-nav-sidebar-item>
  </wpp-nav-sidebar-item>
  <wpp-nav-sidebar-item
    label="Scheduled reporting"
    path="/scheduled"
    extended
    groupTitle="Reporting"
  >
    <wpp-icon-calendar slot="icon-start"></wpp-icon-calendar>
    <wpp-nav-sidebar-item label="Scheduled 01" path="/scheduled1"></wpp-nav-sidebar-item>
    <wpp-nav-sidebar-item label="Scheduled 02" path="/scheduled2"></wpp-nav-sidebar-item>
  </wpp-nav-sidebar-item>
  <wpp-nav-sidebar-item label="Attachments" path="/attachments">
    <wpp-icon-mail slot="icon-start"></wpp-icon-mail>
  </wpp-nav-sidebar-item>
</wpp-nav-sidebar>
```


### React

```tsx
import { useState } from 'react';
import {
  WppNavSidebar,
  WppNavSidebarItem,
  WppIconGlobe,
  WppIconFavorites,
  WppIconCalendar,
  WppIconMail,
} from '@platform-ui-kit/components-library-react';

export const NavSidebarExample = () => {
  const [activePath, setActivePath] = useState('/dashboard');

  const handleChangeRoute = (event: CustomEvent) => {
    console.log('Route changed:', event.detail);
    setActivePath(event.detail.path);
  };

  return (
    <WppNavSidebar activePath={activePath} onWppChange={handleChangeRoute}>
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
      <WppNavSidebarItem
        label="Scheduled reporting"
        path="/scheduled"
        extended
        groupTitle="Reporting"
      >
        <WppIconCalendar slot="icon-start" />
        <WppNavSidebarItem label="Scheduled 01" path="/scheduled1" />
        <WppNavSidebarItem label="Scheduled 02" path="/scheduled2" />
      </WppNavSidebarItem>
      <WppNavSidebarItem label="Attachments" path="/attachments">
        <WppIconMail slot="icon-start" />
      </WppNavSidebarItem>
    </WppNavSidebar>
  );
};
```


### Vue

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



## Properties

| Property      | Attribute      | Description                                                                                                                                                                                                                                                                         | Type                  | Default               |
| ------------- | -------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- | --------------------- |
| `activePath`  | `active-path`  | Defines the current active path. Input any valid path that matches the `path` property of the sidebar items. Invalid values will have no effect and will not change the active item.                                                                                                | `string \| undefined` | `undefined`           |
| `initialPath` | `initial-path` | <span style="color:red">**[DEPRECATED]**</span> initialPath is being deprecated and will be deleted in v4.0.0. Use `activePath` instead.<br/><br/>Defines the initial current path.                                                                                                 | `string \| undefined` | `undefined`           |
| `nativeLink`  | `native-link`  | If the navigation link behaves as an `a` tag. If the app uses `client side render`, leave as `false`, and if the app uses `server side render`, change to `true`. This prop is not dynamic, so, when changing its value in Storybook, refresh the page to see the change reflected. | `boolean`             | `false`               |
| `zIndex`      | `z-index`      | Defines the z-index of the WppNavSidebar.                                                                                                                                                                                                                                           | `number`              | `Z_INDEX.NAV_SIDEBAR` |


## Events

| Event       | Description                                                                         | Type                                     |
| ----------- | ----------------------------------------------------------------------------------- | ---------------------------------------- |
| `wppChange` | Emitted when app routes change, return object like { path: '/home', label: 'Home' } | `CustomEvent<NavSidebarItemEventDetail>` |


## Slots

| Slot | Description                                                                                          |
| ---- | ---------------------------------------------------------------------------------------------------- |
|      | May contain only the `wpp-nav-sidebar-item` component. The default slot, without the name attribute. |


## Shadow Parts

| Part            | Description                |
| --------------- | -------------------------- |
| `"body"`        | Main content wrapper       |
| `"nav-sidebar"` | Sidebar navigation wrapper |


## CSS Custom Properties

| Name                                     | Description |
| ---------------------------------------- | ----------- |
| `--wpp-nav-sidebar-background-color`     |             |
| `--wpp-nav-sidebar-border-color`         |             |
| `--wpp-nav-sidebar-border-style`         |             |
| `--wpp-nav-sidebar-border-width`         |             |
| `--wpp-nav-sidebar-close-label-margin`   |             |
| `--wpp-nav-sidebar-close-padding`        |             |
| `--wpp-nav-sidebar-close-wrapper-height` |             |
| `--wpp-nav-sidebar-min-width`            |             |
| `--wpp-nav-sidebar-open-padding`         |             |
| `--wpp-nav-sidebar-padding`              |             |
| `--wpp-nav-sidebar-title-margin`         |             |
| `--wpp-nav-sidebar-top-position`         |             |
| `--wpp-nav-sidebar-width`                |             |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
