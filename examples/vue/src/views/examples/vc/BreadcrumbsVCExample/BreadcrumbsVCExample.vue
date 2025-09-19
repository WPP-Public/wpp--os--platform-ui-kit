<script setup lang="ts">
import { WppBreadcrumb } from "@platform-ui-kit/components-library-vue";

const items = [
  {
    label: "Home",
    path: "/breadcrumb",
  },
  {
    label: "Alfa",
    path: "/breadcrumb/alfa",
  },
  {
    label: "Bravo (International Radiotelephony Spelling Alphabet)",
    path: "/breadcrumb/alfa/bravo",
  },
  {
    label: "Charlie",
    path: "/breadcrumb/alfa/bravo/charlie",
  },
  {
    label: "Delta (International Radiotelephony Spelling Alphabet)",
    path: "/breadcrumb/alfa/bravo/charlie/delta",
  },
  {
    label: "Echo",
    path: "/breadcrumb/alfa/bravo/charlie/delta/echo",
  },
  {
    label: "Foxtrot (International Radiotelephony Spelling Alphabet)",
    path: "/breadcrumb/alfa/bravo/charlie/delta/echo/foxtrot",
  },
];

const handleRouteChange = (event: CustomEvent) => {
  console.log(event.detail.path);
};
</script>

<template>
  <div class="breadcrumbs" data-testid="breadcrumbs">
    <div>
      <h3>Regular Breadcrumb</h3>
      <WppBreadcrumb :items="items" @wppChange="handleRouteChange" data-testid="without-native-link" />
    </div>

    <div>
      <h3>Breadcrumb with 3 elements</h3>
      <WppBreadcrumb :items="items.slice(0, 3)" nativeLink data-testid="with-native-link" />
    </div>

    <div>
      <h3>Breadcrumb with 4 elements</h3>
      <WppBreadcrumb :items="items.slice(0, 4)" />
    </div>

    <div>
      <h3>Breadcrumb with 5 elements</h3>
      <WppBreadcrumb :items="items.slice(0, 5)" />
    </div>

    <div>
      <h3>Breadcrumb with middleTruncation</h3>
      <WppBreadcrumb
        :items="items"
        middleTruncation
        @wppChange="handleRouteChange"
        data-testid="breadcrumb-truncation"
      />
    </div>
  </div>
</template>

<style scoped>
.breadcrumbs {
  height: 550px;
}
</style>
