<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="header">
    <div class="wrapper">
      <h2 class="app-title">Components Library Examples</h2>

      <nav>
        <RouterLink to="/accordion">Accordion</RouterLink>
        <RouterLink to="/ag-grid-table-pagination">AG Grid table - Pagination</RouterLink>
        <RouterLink to="/ag-grid-table-load-more">AG Grid table - Load More</RouterLink>
        <RouterLink to="/ag-grid-table-infinite-scroll">AG Grid table - Infinite Scroll</RouterLink>
        <RouterLink to="/autocomplete"> Autocomplete with pills</RouterLink>
        <RouterLink to="/back-to-top-button">Back To Top Button</RouterLink>
        <RouterLink to="/banners">Banners</RouterLink>
        <RouterLink to="/chat-input">Chat Input</RouterLink>
        <RouterLink to="/checkboxes">Checkboxes</RouterLink>
        <RouterLink to="/colors-generator">Colors Generator</RouterLink>
        <RouterLink to="/color-picker">Colors Pickers</RouterLink>
        <RouterLink to="/datepickers">Datepickers</RouterLink>
        <RouterLink to="/echarts">ECharts</RouterLink>
        <RouterLink to="/file-upload">File Upload</RouterLink>
        <RouterLink to="/form-controls">Form Controls</RouterLink>
        <RouterLink to="/menu-context">Menu Context</RouterLink>
        <RouterLink to="/menu-context-based-components">Menu Context based components </RouterLink>
        <RouterLink to="/modals">Modals</RouterLink>
        <RouterLink to="/overlay">Overlay</RouterLink>
        <RouterLink to="/radio-buttons">Radio Buttons</RouterLink>
        <RouterLink to="/richtext">Rich Text</RouterLink>
        <RouterLink to="/search">Search</RouterLink>
        <RouterLink to="/selects">Selects</RouterLink>
        <RouterLink to="/single-select">Single Select</RouterLink>
        <RouterLink to="/multiple-select">Multiple Select</RouterLink>
        <RouterLink to="/text-select">Text Select</RouterLink>
        <RouterLink to="/combined-select">Combined Select</RouterLink>
        <RouterLink to="/skeleton">Skeleton</RouterLink>
        <RouterLink to="/sticky-bar">Sticky bar</RouterLink>
        <RouterLink to="/swiper">Swiper / Carousel</RouterLink>
        <RouterLink to="/time-picker">Time Picker</RouterLink>
        <RouterLink to="/toggles">Toggles</RouterLink>
        <RouterLink to="/topbar">Topbar</RouterLink>
        <RouterLink to="/bugfixes">Bugfixes</RouterLink>
        <RouterLink to="/bugfixes">Performance</RouterLink>
        <RouterLink to="/bugfixes">Custom Select</RouterLink>
        <RouterLink to="/vc">Visual Comparison</RouterLink>
      </nav>
    </div>
  </header>

  <main>
    <RouterView />
  </main>
</template>

<style>
body {
  font-family: var(--wpp-font-family);
}

.app-title {
  padding-left: 12px;
}

main {
  margin-top: 16px;
}

nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  border-bottom: solid 1px;
  padding-bottom: 1rem;
}

nav a {
  padding: 8px 12px;
  color: black;
  text-decoration: none;
}

nav a.active {
  text-decoration: underline;
}
</style>
