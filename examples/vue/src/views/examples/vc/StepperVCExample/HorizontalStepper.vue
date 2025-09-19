<script setup lang="ts">
import { ref } from 'vue'

import { WppButton, WppCheckbox, WppStepper, WppStep, WppRadio } from '@platform-ui-kit/components-library-vue'
import type { StepChangeEventDetail } from '@platform-ui-kit/components-library/src'

const LAST_PAGE_COUNT = 6
const FIRST_PAGE_COUNT = 1
const REQUIRED_STEP_NUMBER = 4

const currentStep = ref(FIRST_PAGE_COUNT)
const isChecked = ref(false)
const isError = ref(false)

const handleNextStep = () => {
  if (currentStep.value === LAST_PAGE_COUNT) return
  if (currentStep.value === REQUIRED_STEP_NUMBER && !isChecked.value) {
    isError.value = true

    return
  }

  currentStep.value = currentStep.value + 1
}

const handlePreviousStep = () => {
  if (currentStep.value === FIRST_PAGE_COUNT) return

  currentStep.value = currentStep.value - 1
}

const handleCheckbox = ({ detail }: CustomEvent) => {
  const { checked } = detail
  console.log(checked)
  isChecked.value = checked
  isError.value = !checked
}

const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
  if (!event.detail.index) return

  currentStep.value = event.detail.index
}
</script>

<template>
  <div class="main">
    <div class="wrapper column">
      <div :class="['full-width-stepper']">
        <WppStepper :activeStep="currentStep" orientation="horizontal" @wppChange="handleStepClick">
          <WppStep>
            <p slot="label" class="text">Step</p>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step</p>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step</p>
          </WppStep>
          <WppStep :error="isError" iconDescription="Error message">
            <p slot="label" class="text">Step</p>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step</p>
          </WppStep>
        </WppStepper>
      </div>
      <div class="pages" data-testid="pages">
        <div :class="`inner page-${currentStep}`">
          <div class="page">
            <h3>Page 1</h3>
            <WppRadio class="margin" :labelConfig="{ text: 'Option 1' }" required data-testid="stepper-radio-button" />
          </div>
          <div class="page" data-testid="second-page">
            <h3>Page 2</h3>
          </div>
          <div class="page">
            <h3>Page 3</h3>
          </div>
          <div class="page" data-testid="fourth-page">
            <h3>Page 4</h3>
            <WppCheckbox class="margin" required @wppChange="handleCheckbox" />
          </div>
          <div class="page">
            <h3>Page 5</h3>
          </div>
          <div class="page">
            <h3>FINAL</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <WppButton @click="handlePreviousStep" data-testid="previous-button">Previous Step</WppButton>
      <WppButton @click="handleNextStep" class="button" data-testid="next-button"> Next Step</WppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
$pageHeight: 70vh;

.main {
  padding: 20px;
}

.text {
  margin: 0;
}

.subtext {
  margin: 0;
  font-weight: 400;
}

.stepper {
  width: 200px;
  text-align: center;
}

.full-width-stepper {
  width: 100%;
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

.column {
  flex-direction: column;
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

.page-1 {
  transform: translateY(0);
}

.page-2 {
  transform: translateY(-670px);
}

.page-3 {
  transform: translateY(-1320px);
}

.page-4 {
  transform: translateY(-1990px);
}

.page-5 {
  transform: translateY(-2620px);
}

.page-6 {
  transform: translateY(-3230px);
}
</style>
