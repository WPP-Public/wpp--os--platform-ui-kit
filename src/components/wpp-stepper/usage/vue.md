```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppButton, WppCheckbox, WppStepper, WppStep, WppRadio } from '@wppopen/components-library-vue'
import type { StepChangeEventDetail } from '@wppopen/components-library/src'

const LAST_PAGE = 7
const FIRST_PAGE = 1
const REQUIRED_STEP = 5

const currentStep = ref(FIRST_PAGE)
const isChecked = ref(false)
const isError = ref(false)

const handleNextStep = () => {
  if (currentStep.value >= LAST_PAGE) return
  if (currentStep.value === REQUIRED_STEP && !isChecked.value) {
    isError.value = true
    return
  }

  currentStep.value += 1
}

const handlePreviousStep = () => {
  if (currentStep.value === FIRST_PAGE) return

  currentStep.value -= 1
}

const handleCheckbox = ({ detail }: CustomEvent) => {
  const { checked } = detail

  isChecked.value = checked
  isError.value = !checked
}

const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
  const clickedIndex = event.detail.index

  if (!clickedIndex) return

  currentStep.value = clickedIndex
}
</script>

<template>
  <div class="main">
    <div class="wrapper">
      <div class="stepper">
        <WppStepper :activeStep="currentStep" @wppChange="handleStepClick">
          <WppStep>
            <p slot="label" class="text">Step 1</p>
            <span slot="description">
              First step (this text gets truncated if it's too long and a tooltip is displayed)
            </span>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 2</p>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 3</p>
            <span slot="description">With substeps</span>
            <WppStep substep>
              <p class="subtext">Sub step 3.1</p>
            </WppStep>
            <WppStep substep :error="isError" iconDescription="Error message">
              <p class="subtext" slot="label">Sub step 3.2</p>
            </WppStep>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 4</p>
            <span slot="description">Last Step</span>
          </WppStep>
        </WppStepper>
      </div>
      <div class="pages">
        <div :class="`inner page-${currentStep}`">
          <div class="page" data-testid="first-page">
            <h3>Page 1</h3>
            <WppRadio class="margin" :labelConfig="{ text: 'Option 1' }" required data-testid="stepper-radio-button" />
          </div>
          <div class="page">
            <h3>Page 2</h3>
          </div>
          <div class="page" data-testid="third-page">
            <h3>Sub page 3.1</h3>
          </div>
          <div class="page">
            <h3>Sub page 3.2</h3>
            <WppCheckbox class="margin" required @wppChange="handleCheckbox" />
          </div>
          <div class="page">
            <h3>Page 4</h3>
          </div>
          <div class="page">
            <h3>FINAL</h3>
          </div>
        </div>
      </div>
    </div>
    <div class="buttons">
      <WppButton @click="handlePreviousStep" data-testid="previous-button">Previous Step</WppButton>
      <WppButton @click="handleNextStep" class="button" data-testid="next-button"> Next Step </WppButton>
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

.page-7 {
  transform: translateY(-3900px);
}
</style>
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WppButton, WppCheckbox, WppStepper, WppStep, WppRadio } from '@wppopen/components-library-vue'
import type { StepChangeEventDetail } from '@wppopen/components-library/src'

const LAST_PAGE = 4
const FIRST_PAGE = 1
const REQUIRED_STEP = 3.2

const currentStep = ref(FIRST_PAGE)
const isChecked = ref(false)
const isError = ref(false)

const stepsMap: { [key: number]: { next?: number; prev?: number } } = {
  1: { next: 2 },
  2: { next: 3.1, prev: 1 },
  3: { next: 3.2, prev: 2 },
  3.1: { next: 3.2, prev: 2 },
  3.2: { next: 3.3, prev: 3.1 },
  3.3: { next: 4, prev: 3.2 },
  4: { prev: 3.3 },
}

const getNextStep = (step: number) => stepsMap[step]?.next ?? step
const getPreviousStep = (step: number) => stepsMap[step]?.prev ?? step

const handleNextStep = () => {
  if (currentStep.value >= LAST_PAGE) return
  if (currentStep.value === REQUIRED_STEP && !isChecked.value) {
    isError.value = true
    return
  }

  currentStep.value = getNextStep(currentStep.value)
}

const handlePreviousStep = () => {
  if (currentStep.value === FIRST_PAGE) return
  currentStep.value = getPreviousStep(currentStep.value)
}

const handleCheckbox = ({ detail }: CustomEvent) => {
  const { checked } = detail
  isChecked.value = checked
  isError.value = !checked
}

const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
  const clickedIndex = event.detail.step
  if (!clickedIndex) return
  currentStep.value = clickedIndex
}
</script>

<template>
  <div class="main">
    <div class="wrapper">
      <div class="stepper">
        <WppStepper :activeStep="currentStep" @wppChange="handleStepClick" :useDecimalSubSteps="true">
          <WppStep>
            <p slot="label" class="text">Step 1</p>
            <span slot="description">First step</span>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 2</p>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 3</p>
            <span slot="description">With substeps</span>
            <WppStep substep>
              <p class="subtext">Sub step 3.1</p>
            </WppStep>
            <WppStep substep :error="isError" iconDescription="Error message">
              <p class="subtext" slot="label">Sub step 3.2</p>
            </WppStep>
            <WppStep substep>
              <p class="subtext">Sub step 3.3</p>
            </WppStep>
          </WppStep>
          <WppStep>
            <p slot="label" class="text">Step 4</p>
            <span slot="description">Last Step</span>
          </WppStep>
        </WppStepper>
      </div>
      <div class="pages">
        <div :class="`inner decimal-page-${currentStep.toString().replace('.', '_')}`">
          <div class="page" data-testid="first-page">
            <h3>Page 1</h3>
            <WppRadio class="margin" :labelConfig="{ text: 'Option 1' }" required data-testid="stepper-radio-button" />
          </div>
          <div class="page">
            <h3>Page 2</h3>
          </div>
          <div class="page">
            <h3>Page 3</h3>
          </div>
          <div class="page" data-testid="third-page-subpage-one">
            <h3>Sub page 3.1</h3>
          </div>
          <div class="page" data-testid="third-page-subpage-two">
            <h3>Sub page 3.2</h3>
            <WppCheckbox class="margin" required @wppChange="handleCheckbox" />
          </div>
          <div class="page" data-testid="third-page-subpage-three">
            <h3>Sub page 3.3</h3>
          </div>
          <div class="page">
            <h3>Page 4</h3>
          </div>
          <div class="page">
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

.text,
.subtext {
  margin: 0;
  font-weight: 400;
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

.decimal-page-1 {
  transform: translateY(0);
}

.decimal-page-2 {
  transform: translateY(-670px);
}

.decimal-page-3 {
  transform: translateY(-1320px);
}

.decimal-page-3_1 {
  transform: translateY(-1990px);
}

.decimal-page-3_2 {
  transform: translateY(-2620px);
}

.decimal-page-3_3 {
  transform: translateY(-3230px);
}

.decimal-page-4 {
  transform: translateY(-3900px);
}

.decimal-page-5 {
  transform: translateY(-4570px);
}
</style>
```
