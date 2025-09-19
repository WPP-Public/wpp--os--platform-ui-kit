<script lang="ts">
import { defineComponent } from 'vue'

import {
  WppFileUpload,
  WppButton,
  WppStepper,
  WppStep,
  WppRadio,
  WppSelect,
  WppListItem,
} from '@platform-ui-kit/components-library-vue'

export default defineComponent({
  name: 'ThirdPage',
  components: {
    WppFileUpload: WppFileUpload,
    WppButton: WppButton,
    WppStepper: WppStepper,
    WppStep: WppStep,
    WppRadio: WppRadio,
    WppSelect: WppSelect,
    WppListItem: WppListItem,
  },
  methods: {
    handleCloseSideModal() {
      this.$emit('closeSideModal')
    },
  },
})
</script>

<template>
  <div slot="header">Page Title</div>
  <div slot="body">
    Page Body
    <WppFileUpload />
    <WppSelect
      placeholder="Placeholder"
      :list="[
        {
          value: 1,
          label: 'Car',
        },
        {
          value: 2,
          label: 'House',
          disabled: true,
        },
        {
          value: 3,
          label: 'Apartment',
        },
        {
          value: 4,
          label: 'Flat',
        },
        {
          value: 5,
          label: 'Stone',
        },
        {
          value: 6,
          label: 'Plane',
        },
        {
          value: 7,
          label: 'Chair',
        },
      ]"
    >
    </WppSelect>
    <div class="main">
      <div class="wrapper" :style="{ height: '200px' }">
        <div class="stepper">
          <WppStepper :activeStep="1">
            <WppStep>
              <p slot="label" class="text">Step</p>
            </WppStep>
            <WppStep>
              <p slot="label" class="text">Step</p>
            </WppStep>
            <WppStep>
              <p slot="label" class="text">Step</p>
            </WppStep>
          </WppStepper>
        </div>
        <div class="pages">
          <div class="inner">
            <div class="page" :style="{ height: '200px' }">
              <h3>Page 1</h3>
              <WppRadio class="margin" :labelConfig="{ text: 'Option 1' }" required />
            </div>
          </div>
        </div>
      </div>
      <div class="buttons">
        <WppButton>Previous Step</WppButton>
        <WppButton>Next Step</WppButton>
      </div>
    </div>
  </div>
  <div slot="actions" class="buttons">
    <WppButton variant="secondary" @click="handleCloseSideModal" class="button"> Cancel </WppButton>
    <WppButton variant="primary">Select</WppButton>
  </div>
</template>

<style scoped>
.message p {
  line-height: 1.3;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.button {
  margin-right: 12px;
}

.main {
  padding: 20px;
}

.text {
  margin: 0;
}

.stepper {
  width: 200px;
  text-align: center;
}

.pages {
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  background-color: var(--wpp-grey-color-100);
  box-shadow: 0 2px 1px -1px rgb(0 0 0 / 20%), 0 1px 1px 0 rgb(0 0 0 / 14%), 0 1px 3px 0 rgb(0 0 0 / 12%);
}

.margin {
  margin-left: 20px;
}

.wrapper {
  display: flex;
}

.buttons {
  display: flex;
  align-items: baseline;
  justify-content: flex-end;
  margin-top: 16px;
}

.button {
  margin-left: 8px;
}

.inner {
  transition: 0.6s ease-in-out;
}
</style>
