<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="header">
    <div class="wrapper">
      <nav></nav>
    </div>
  </div>

  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
