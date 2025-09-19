<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { WppStepper, WppStep, WppButton, WppCheckbox, WppRadio } from '@platform-ui-kit/components-library-vue'
import type { StepChangeEventDetail } from '@platform-ui-kit/components-library-vue'

const LAST_PAGE = 5
const FIRST_PAGE = 1
const REQUIRED_STEP = 3.2

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
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updatePageHeight)
})

const stepsMap = {
    1: { next: 2.1 },
    2: { next: 2.2, prev: 1 },
    2.1: { next: 2.2, prev: 1 },
    2.2: { next: 3.1, prev: 2.1 },
    3: { next: 3.2, prev: 2.2 },
    3.1: { next: 3.2, prev: 2.2 },
    3.2: { next: 3.3, prev: 3.1 },
    3.3: { next: 4, prev: 3.2 },
    4: { next: 5, prev: 3.3 },
    5: { prev: 4 },
}

const getNextStep = (step: number) => stepsMap[step]?.next ?? step
const getPreviousStep = (step: number) => stepsMap[step]?.prev ?? step

const handleNextStep = () => {
    if (currentStep.value >= LAST_PAGE) return
    if (currentStep.value === REQUIRED_STEP && !isChecked.value) return (isError.value = true)

    const nextStep = getNextStep(currentStep.value)
    currentStep.value = nextStep
}

const handlePreviousStep = () => {
    if (currentStep.value <= FIRST_PAGE) return
    const previousStep = getPreviousStep(currentStep.value)
    currentStep.value = previousStep
}

const handleCheckbox = ({ detail }: CustomEvent) => {
    const { checked } = detail
    isChecked.value = checked
    isError.value = !checked
}

const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
    const clickedStep = event.detail.step
    if (clickedStep === undefined || clickedStep === null) return

    currentStep.value = clickedStep
}
</script>

<template>
    <div class="main">
        <div class="wrapper">
            <div class="stepper">
                <WppStepper :activeStep="currentStep" @wppChange="handleStepClick" useDecimalSubSteps>
                    <WppStep>
                        <p slot="label" class="text">
                            Step with a long text
                        </p>
                        <span slot="description">
                            First step (this text gets truncated if it's too long and a tooltip is displayed)
                        </span>
                    </WppStep>
                    <WppStep>
                        <p slot="label" class="text">Step 2</p>
                        <span slot="description">With substeps</span>
                        <WppStep substep>
                            <p class="subtext" slot="label">Sub step 2.1</p>
                        </WppStep>
                        <WppStep substep>
                            <p class="subtext" slot="label">Sub step 2.2</p>
                        </WppStep>
                    </WppStep>
                    <WppStep>
                        <p slot="label" class="text">Step 3</p>
                        <span slot="description">With substeps</span>
                        <WppStep substep>
                            <p class="subtext" slot="label">Sub step 3.1</p>
                        </WppStep>
                        <WppStep substep :error="isError" iconDescription="Error message">
                            <p class="subtext" slot="label">Sub step 3.2</p>
                        </WppStep>
                        <WppStep substep>
                            <p class="subtext" slot="label">Sub step 3.3</p>
                        </WppStep>
                    </WppStep>
                    <WppStep>
                        <p slot="label" class="text">Step 4</p>
                        <span slot="description">Last Step</span>
                    </WppStep>
                </WppStepper>
            </div>
            <div class="pages">
                <div :class="`inner dpage-${currentStep.toString().replace('.', '_')}`">
                    <div class="page" data-testid="first-page">
                        <h3>Page 1</h3>
                        <WppRadio class="margin" :labelConfig="{ text: 'Option 1' }" required
                            data-testid="stepper-radio-button" />
                    </div>
                    <div class="page" data-testid="second-page">
                        <h3>Page 2</h3>
                    </div>
                    <div class="page" data-testid="two-page-subpage-one">
                        <h3>Sub page 2.1</h3>
                    </div>
                    <div class="page" data-testid="two-page-subpage-two">
                        <h3>Sub page 2.2</h3>
                    </div>
                    <div class="page" data-testid="third-page">
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
                    <div class="page" data-testid="forth-page">
                        <h3>Page 4</h3>
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

.dpage-1 {
  transform: translateY(calc(var(--page-height) * 0));
}

.dpage-2 {
  transform: translateY(calc(var(--page-height) * -1));
}

.dpage-2_1 {
  transform: translateY(calc(var(--page-height) * -2));
}

.dpage-2_2 {
  transform: translateY(calc(var(--page-height) * -3));
}

.dpage-3 {
  transform: translateY(calc(var(--page-height) * -4));
}

.dpage-3_1 {
  transform: translateY(calc(var(--page-height) * -5));
}

.dpage-3_2 {
  transform: translateY(calc(var(--page-height) * -6));
}

.dpage-3_3 {
  transform: translateY(calc(var(--page-height) * -7));
}

.dpage-4 {
  transform: translateY(calc(var(--page-height) * -8));
}

.dpage-5 {
  transform: translateY(calc(var(--page-height) * -9));
}
</style>
