<script setup>
import { ref } from 'vue'
import { WppOverlay, WppTypography, WppButton } from '@platform-ui-kit/components-library-vue'

const isVisible = ref(true)

function handleOverlayChange() {
  console.log('Overlay Clicked:')
}

function toggleOverlay() {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div class="container" data-testid="overlay-container">
    <WppTypography class="title" type="2xl-heading"> Overlay component </WppTypography>

    <div class="scenarios">
      <WppTypography class="scenarioTitle" type="xl-heading">
        Scenario: render overlay in the body of a page.
      </WppTypography>

      <div class="section">
        <div class="header">
          <WppTypography class="text" type="s-body"> Header </WppTypography>
        </div>
        <div class="body">
          <WppTypography class="text" type="s-body"> Body </WppTypography>
          <WppOverlay :isVisible="isVisible" @wppClick="handleOverlayChange" />
        </div>
      </div>
    </div>

    <WppButton class="button" variant="primary" @click="toggleOverlay"> Toggle overlay </WppButton>

  </div>
</template>

<style scoped>
.container {
  padding: 20px 50px;
}

.text {
  margin: 10px 0;
  display: block;
}

.scenarioTitle {
  margin-bottom: 20px;
}

.section {
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 20px;
  border: 1px solid var(--wpp-grey-color-300);
  border-radius: var(--wpp-border-radius-m);
  background-color: var(--wpp-grey-color-100);
}

.header {
  height: 50px;
  border-bottom: 1px solid var(--wpp-grey-color-300);
  width: 100%;
  padding-left: 20px;
  box-sizing: border-box;
}

.body {
  height: 100%;
  width: 100%;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}
</style>
