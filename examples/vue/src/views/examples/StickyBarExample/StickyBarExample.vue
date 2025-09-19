<script setup lang="ts">
import { WppStickyBar, WppTypography } from '@platform-ui-kit/components-library-vue'
import { btns_list_1, tabs_list_1 } from './consts'

const onClickBackIcon = () => {
  console.log('Has Clicked Back Icon')
}

const onClickBtn = (event: CustomEvent) => {
  console.log(event.detail)
}

const onClickTab = (event: CustomEvent) => {
  console.log(event.detail)
}
</script>

<template>
  <WppStickyBar
    variant="two-lines-with-tabs"
    :buttons="btns_list_1"
    :tabs="tabs_list_1"
    barTitle="Page Title"
    @wppClickBackIcon="onClickBackIcon"
    @wppClickBtn="onClickBtn"
    @wppClickTab="onClickTab"
  ></WppStickyBar>
  <div class="container">
    <div class="additionalSpace">
      <WppTypography type="2xl-heading">Additional space on page</WppTypography>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 50px;
}

.additionalSpace {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  width: 70%;
  height: 500vh;
  padding: 50px;
  background: rgb(173 216 230);
  border: 4px dashed gray;
  border-radius: 50px;
  opacity: 0.5;
}
</style>
