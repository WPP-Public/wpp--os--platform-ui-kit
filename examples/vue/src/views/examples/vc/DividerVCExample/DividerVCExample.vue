<script setup lang="ts">
import {
  WppDivider,
  WppTypography,
} from "@platform-ui-kit/components-library-vue";
</script>

<template>
  <form class="form" data-testid="divider-form">
    <WppTypography tag="h3" type="xl-heading" class="title">
      Horizontal Divider
    </WppTypography>
    <WppDivider class="divider" />
    <WppTypography tag="h3" type="xl-heading" class="title">
      Vertical Divider
    </WppTypography>
    <div class="verticalContainer">
      <WppDivider vertical class="vertical" />
    </div>
  </form>
</template>

<style scoped>
.form {
  width: 500px;
  height: 300px;
  margin: 20px;
  background-color: gray;
}

.title {
  margin-bottom: 10px;
}

.divider {
  margin-bottom: 10px;
}

.verticalContainer {
  height: 150px;
  display: flex;
  justify-content: center;
}
</style>
