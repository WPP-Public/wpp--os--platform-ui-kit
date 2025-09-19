<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { WppButton, WppCheckbox, WppStepper, WppStep, WppRadio } from '@platform-ui-kit/components-library-vue'
import type { StepChangeEventDetail } from '@platform-ui-kit/components-library/src'

const LAST_PAGE = 12
const FIRST_PAGE = 1
const REQUIRED_STEP = 7

const currentStep = ref(FIRST_PAGE)
const isChecked = ref(false)
const isError = ref(false)

const updatePageHeight = () => {
  const pageElement = document.querySelector('.page') as HTMLElement | null
  const pageHeight = pageElement?.offsetHeight || window.innerHeight

  document.documentElement.style.setProperty('--page-height', `${pageHeight}px`)
}

onMounted(() => {
  updatePageHeight()
  window.addEventListener('resize', updatePageHeight)

  return () => window.removeEventListener('resize', updatePageHeight)
})

const handleNextStep = () => {
  if (currentStep.value === LAST_PAGE) return
  if (currentStep.value === REQUIRED_STEP && !isChecked.value) {
    isError.value = true
    return
  }

  currentStep.value += 1
}

const handlePreviousStep = () => {
  if (currentStep.value < 0) return
  currentStep.value -= 1
}

const handleCheckbox = ({ detail }: CustomEvent) => {
  const { checked } = detail

  isChecked.value = checked
  isError.value = !checked
}

const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
  const clickedIndex = event.detail.index

  if (clickedIndex === undefined || clickedIndex === null) return

  currentStep.value = clickedIndex
}
</script>

<template>
  <div class="main">
    <div class="wrapper">
      <div class="stepper">
        <WppStepper :stepperWidth="'100%'" :activeStep="currentStep" @wppChange="handleStepClick">
          <WppStep>
            <p slot="label" class="text">Step with a long text and even longer text</p>
            <span slot="description">
              First step (this text gets truncated if it's too long and a tooltip is displayed)
            </span>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 2</p>
            <span slot="description">With substeps</span>
            <WppStep substep>
              <p class="subtext" slot="label">Step 2 Sub step 1</p>
            </WppStep>
            <WppStep substep>
              <p class="subtext" slot="label">Step 2 Sub step 2</p>
            </WppStep>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 3 which also has a really long text</p>
            <span slot="description">With substeps and a really long description</span>
            <WppStep substep>
              <p class="subtext" slot="label">Step 3 Sub step 1</p>
            </WppStep>
            <WppStep substep :error="isError" iconDescription="Error message">
              <p class="subtext" slot="label">Step 3 Sub step 2</p>
            </WppStep>
            <WppStep substep>
              <p class="subtext" slot="label">Step 3 Sub step 3</p>
            </WppStep>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 4</p>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 5 with a long text that gets truncated</p>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 6 and again a really long text</p>
            <span slot="description">Last Step with a really really long text</span>
          </WppStep>
        </WppStepper>
      </div>
      <div class="pages">
        <div :class="`inner page-${currentStep}`">
          <div class="page" data-testid="first-page">
            <h3>Page 1</h3>
            <WppRadio class="margin" :labelConfig="{ text: 'Option 1' }" required data-testid="stepper-radio-button" />
          </div>
          <div class="page" data-testid="second-page">
            <h3>Page 2</h3>
          </div>
          <div class="page" data-testid="second-page-subpage-one">
            <h3>Page 2 Sub page 1</h3>
          </div>
          <div class="page" data-testid="second-page-subpage-two">
            <h3>Page 2 Sub page 2</h3>
          </div>
          <div class="page" data-testid="third-page">
            <h3>Page 3</h3>
          </div>
          <div class="page" data-testid="third-page-subpage-one">
            <h3>Page 3 Sub page 1</h3>
          </div>
          <div class="page" data-testid="third-page-subpage-two">
            <h3>Page 3 Sub page 2</h3>
            <WppCheckbox class="margin" required @wppChange="handleCheckbox" />
          </div>
          <div class="page" data-testid="third-page-subpage-three">
            <h3>Page 3 Sub page 3</h3>
          </div>
          <div class="page" data-testid="forth-page">
            <h3>Page 4</h3>
          </div>
          <div class="page" data-testid="fifth-page">
            <h3>Page 5</h3>
          </div>
          <div class="page" data-testid="sixth-page">
            <h3>Page 6</h3>
          </div>
          <div class="page" data-testid="final-page">
            <h3>FINAL</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <WppButton @click="handlePreviousStep" data-testid="previous-button">Previous Step</WppButton>
      <WppButton @click="handleNextStep" class="button" data-testid="next-button">Next Step</WppButton>
    </div>
  </div>
</template>

<style scoped lang="scss">
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
  width: 25%;
  text-align: center;
}

.full-width-stepper {
  width: 100%;
}

.pages {
  width: 75%;
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
  transform: translateY(calc(var(--page-height) * 0));
}

.page-2 {
  transform: translateY(calc(var(--page-height) * -1));
}

.page-3 {
  transform: translateY(calc(var(--page-height) * -2));
}

.page-4 {
  transform: translateY(calc(var(--page-height) * -3));
}

.page-5 {
  transform: translateY(calc(var(--page-height) * -4));
}

.page-6 {
  transform: translateY(calc(var(--page-height) * -5));
}

.page-7 {
  transform: translateY(calc(var(--page-height) * -6));
}

.page-8 {
  transform: translateY(calc(var(--page-height) * -7));
}

.page-9 {
  transform: translateY(calc(var(--page-height) * -8));
}

.page-10 {
  transform: translateY(calc(var(--page-height) * -9));
}

.page-11 {
  transform: translateY(calc(var(--page-height) * -10));
}

.page-12 {
  transform: translateY(calc(var(--page-height) * -11));
}
</style>
