```vue

<script setup lang="ts">
import { useRoute } from 'vue-router'

import { WppBreadcrumb } from '@platform-ui-kit/components-library-vue';

const items = [
  {
    label: 'Home',
    path: '/'
  },

  {
    label: 'Alfa',
    path: '/alfa'
  },

  {
    label: 'Bravo (International Radiotelephony Spelling Alphabet)',
    path: '/alfa/bravo'
  },

  {
    label: 'Charlie',
    path: '/alfa/bravo/charlie'
  },

  {
    label: 'Delta (International Radiotelephony Spelling Alphabet)',
    path: '/alfa/bravo/charlie/delta'
  },

  {
    label: 'Echo',
    path: '/alfa/bravo/charlie/delta/echo'
  },

  {
    label: 'Foxtrot',
    path: '/alfa/bravo/charlie/delta/echo/foxtrot'
  }
];

const router = useRoute()

const handleRouteChange = (event: CustomEvent) => {
  router.push(event.detail);
};
</script>

<template>
  <WppBreadcrumb :items="items" middleTruncation @wppChange="handleRouteChange" />
</template>


```
