<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="header">
    <div class="wrapper">
      <nav>
        <RouterLink to="/vc/accordions">Accordions</RouterLink>
        <RouterLink to="/vc/autocomplete">Autocomplete</RouterLink>
        <RouterLink to="/vc/avatars">Avatars</RouterLink>
        <RouterLink to="/vc/breadcrumbs">Breadcrumbs</RouterLink>
        <RouterLink to="/vc/buttons">Buttons</RouterLink>
        <RouterLink to="/vc/cards">Cards</RouterLink>
        <RouterLink to="/vc/card-group">Card Group</RouterLink>
        <RouterLink to="/vc/checkboxes">Checkboxes</RouterLink>
        <RouterLink to="/vc/combined-inputs">Combined Inputs</RouterLink>
        <RouterLink to="/vc/counters">Counters</RouterLink>
        <RouterLink to="/vc/countries">Countries</RouterLink>
        <RouterLink to="/vc/datepicker">Datepicker</RouterLink>
        <RouterLink to="/vc/divider">Divider</RouterLink>
        <RouterLink to="/vc/expandable-card">Expandable Card</RouterLink>
        <RouterLink to="/vc/file-upload">File Upload</RouterLink>
        <RouterLink to="/vc/grid-css">Grids</RouterLink>
        <RouterLink to="/vc/icons">Icons</RouterLink>
        <RouterLink to="/vc/images">Images</RouterLink>
        <RouterLink to="/vc/inline-edit">Inline Edit</RouterLink>
        <RouterLink to="/vc/inline-messages">Inline Messages</RouterLink>
        <RouterLink to="/vc/inputs">Inputs</RouterLink>
        <RouterLink to="/vc/labels">Labels</RouterLink>
        <RouterLink to="/vc/list-items">List Items</RouterLink>
        <RouterLink to="/vc/load-more">Load More</RouterLink>
        <RouterLink to="/vc/menu-context">Menu Context</RouterLink>
        <RouterLink to="/vc/modals">Modals</RouterLink>
        <RouterLink to="/vc/nav-sidebar">Nav Sidebar</RouterLink>
        <RouterLink to="/vc/pagination">Paginations</RouterLink>
        <RouterLink to="/vc/pills">Pills</RouterLink>
        <RouterLink to="/vc/popovers">Popovers</RouterLink>
        <RouterLink to="/vc/progress-indicators">Progress Indicators</RouterLink>
        <RouterLink to="/vc/radio-buttons">Radio Buttons</RouterLink>
        <RouterLink to="/vc/search">Search</RouterLink>
        <RouterLink to="/vc/segmented-controls">Segmented Controls</RouterLink>
        <RouterLink to="/vc/selects-multiple">Selects Multiple</RouterLink>
        <RouterLink to="/vc/selects-single">Selects Single</RouterLink>
        <RouterLink to="/vc/selects-text">Selects Text</RouterLink>
        <RouterLink to="/vc/selects-combined">Selects Combined</RouterLink>
        <RouterLink to="/vc/sliders">Sliders</RouterLink>
        <RouterLink to="/vc/spinner">Spinners</RouterLink>
        <RouterLink to="/vc/skeleton">Skeleton</RouterLink>
        <RouterLink to="/vc/stepper">Stepper</RouterLink>
        <RouterLink to="/vc/tabs">Tab Control</RouterLink>
        <RouterLink to="/vc/tags">Tags</RouterLink>
        <RouterLink to="/vc/text-areas">Text Areas</RouterLink>
        <RouterLink to="/vc/toasts">Message Toasts</RouterLink>
        <RouterLink to="/vc/toggles">Toggles</RouterLink>
        <RouterLink to="/vc/tooltips">Tooltips</RouterLink>
        <RouterLink to="/vc/topbar">Topbar</RouterLink>
        <RouterLink to="/vc/tree">Tree</RouterLink>
        <RouterLink to="/vc/typography">Typography</RouterLink>
      </nav>
    </div>
  </div>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
