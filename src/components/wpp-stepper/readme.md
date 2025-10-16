# wpp-stepper

The Stepper component is a bar that guides users on their progress through a multi-step and sub-steps process. A stepper with sub-steps allows the user to complete the steps in sequence, validating the step by completing the nested sub-steps.

<!-- Auto Generated Below -->


## Usage

### Angular

```ts
export class VerticalStepper {
  public LAST_PAGE = 7
  public FIRST_PAGE = 1
  public REQUIRED_STEP = 5

  public currentStep = this.FIRST_PAGE
  public isChecked = false
  public isError = false

  handleNextStep = () => {
    if (this.currentStep === this.LAST_PAGE) return
    if (this.currentStep === this.REQUIRED_STEP && !this.isChecked) {
      this.isError = true

      return
    }

    this.currentStep += 1
  }

  handlePreviousStep = () => {
    if (this.currentStep < 0) return
    const previousStep = this.getPreviousStep(this.currentStep)

    this.currentStep -= 1
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  handleChange = (event: Event) => {
    const clickedIndex = (event as CustomEvent).detail.index

    if (clickedIndex === undefined || clickedIndex === null) return

    this.currentStep = clickedIndex
  }

  handleCheckbox = ({ detail }: any) => {
    const { checked } = detail

    this.isChecked = checked
    this.isError = !checked
  }

  getPageClassName = () => `inner page-${this.currentStep}`
}
```

```html
<div class="main">
  <div class="wrapper">
    <div class="stepper">
      <wpp-stepper [activeStep]="currentStep" (wppChange)="handleChange($event)">
        <wpp-step>
          <p slot="label" class="text">Step 1</p>
          <span slot="description">
            First step (this text gets truncated if it's too long and a tooltip is displayed)
          </span>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 2</p>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 3</p>
          <span slot="description">With substeps</span>
          <wpp-step substep optional>
            <p class="subtext">Sub step 3.1</p>
          </wpp-step>
          <wpp-step substep [error]="isError" icon-description="Error message">
            <p class="subtext" slot="label">Sub step 3.2</p>
          </wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 4</p>
          <span slot="description">Last Step</span>
        </wpp-step>
      </wpp-stepper>
    </div>
    <div class="pages">
      <div [class]="getPageClassName()">
        <div class="page" data-testid="first-page">
          <h3>Page 1</h3>
          <wpp-radio
            class="margin"
            [labelConfig]="getLabelConfig('Option 1')"
            required
            data-testid="stepper-radio-button"
          ></wpp-radio>
        </div>
        <div class="page">
          <h3>Page 2</h3>
        </div>
        <div class="page">
          <h3>Page 3</h3>
        </div>
        <div class="page">
          <h3>Sub page 3.1</h3>
        </div>
        <div class="page">
          <h3>Sub page 3.2</h3>
          <wpp-checkbox class="margin" required (wppChange)="handleCheckbox($event)"></wpp-checkbox>
        </div>
        <div class="page" data-testid="fourth-page">
          <h3>Page 4</h3>
        </div>
        <div class="page">
          <h3>FINAL</h3>
        </div>
      </div>
    </div>
  </div>
  <div class="buttons">
    <wpp-button (click)="handlePreviousStep()" data-testid="previous-button">Previous Step</wpp-button>
    <wpp-button (click)="handleNextStep()" class="button" data-testid="next-button"> Next Step</wpp-button>
  </div>
</div>
```

```scss
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

.pages {
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $pageHeight;
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
```

```ts
export class VerticalDecimalStepper {
  public LAST_PAGE = 5
  public FIRST_PAGE = 1
  public REQUIRED_STEP = 3.2

  public currentStep = this.FIRST_PAGE
  public isChecked = false
  public isError = false

  public stepsMap: { [key: number]: { next?: number; prev?: number } } = {
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

  handleNextStep = () => {
    if (this.currentStep >= this.LAST_PAGE) return
    if (this.currentStep === this.REQUIRED_STEP && !this.isChecked) {
      this.isError = true
      return
    }

    const nextStep = this.stepsMap[this.currentStep]?.next ?? this.currentStep
    this.currentStep = nextStep
  }

  handlePreviousStep = () => {
    if (this.currentStep <= this.FIRST_PAGE) return

    const previousStep = this.stepsMap[this.currentStep]?.prev ?? this.currentStep
    this.currentStep = previousStep
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  handleChange = (event: Event) => {
    const clickedIndex = (event as CustomEvent).detail.step

    if (clickedIndex === undefined || clickedIndex === null) return

    this.currentStep = clickedIndex
  }

  handleCheckbox = ({ detail }: any) => {
    const { checked } = detail

    this.isChecked = checked
    this.isError = !checked
  }

  getPageClassName = () => `inner decimal-page-${this.currentStep.toString().replace('.', '_')}`
}
```

```html
<div class="main">
  <div class="wrapper">
    <div class="stepper">
      <wpp-stepper [activeStep]="currentStep" (wppChange)="handleChange($event)">
        <wpp-step>
          <p slot="label" class="text">Step 1</p>
          <span slot="description">
            First step (this text gets truncated if it's too long and a tooltip is displayed)
          </span>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 2</p>
          <wpp-step substep>
            <p class="subtext" slot="label">Sub-step 2.1</p>
          </wpp-step>
          <wpp-step substep>
            <p class="subtext" slot="label">Sub-step 2.2</p>
          </wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 3</p>
          <span slot="description">With substeps</span>
          <wpp-step substep>
            <p class="subtext" slot="label">Sub-step 3.1</p>
          </wpp-step>
          <wpp-step substep [error]="isError" icon-description="Error message">
            <p class="subtext" slot="label">Sub-step 3.2</p>
          </wpp-step>
        </wpp-step>
        <wpp-step>
          <p slot="label" class="text">Step 4</p>
          <span slot="description">Last Step</span>
        </wpp-step>
      </wpp-stepper>
    </div>
    <div class="pages">
      <div [class]="getPageClassName()">
        <div class="page" data-testid="first-page">
          <h3>Page 1</h3>
          <wpp-radio
            class="margin"
            [labelConfig]="getLabelConfig('Option 1')"
            required
            data-testid="stepper-radio-button"
          ></wpp-radio>
        </div>
        <div class="page">
          <h3>Page 2</h3>
        </div>
        <div class="page">
          <h3>Sub-page 2.1</h3>
        </div>
        <div class="page">
          <h3>Sub-page 2.2</h3>
        </div>
        <div class="page">
          <h3>Sub-page 3.1</h3>
        </div>
        <div class="page">
          <h3>Sub-page 3.2</h3>
          <wpp-checkbox class="margin" required (wppChange)="handleCheckbox($event)"></wpp-checkbox>
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
    <wpp-button (click)="handlePreviousStep()" data-testid="previous-button">Previous Step</wpp-button>
    <wpp-button (click)="handleNextStep()" class="button" data-testid="next-button">Next Step</wpp-button>
  </div>
</div>
```

```scss
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

.pages {
  width: 100%;
  height: 70vh;
  overflow: hidden;
}

.page {
  display: flex;
  align-items: center;
  justify-content: center;
  height: $pageHeight;
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

.decimal-page-2_1 {
  transform: translateY(-1320px);
}

.decimal-page-2_2 {
  transform: translateY(-1990px);
}

.decimal-page-3 {
  transform: translateY(-2620px);
}

.decimal-page-3_1 {
  transform: translateY(-3230px);
}

.decimal-page-3_2 {
  transform: translateY(-3900px);
}

.decimal-page-4 {
  transform: translateY(-4570px);
}

.decimal-page-5 {
  transform: translateY(-5230px);
}
```


### React

```tsx
import { useState } from 'react'
import { WppStepper, WppStep, WppButton, WppCheckbox, WppRadio } from '@wppopen/components-library-react'
import { StepChangeEventDetail } from '@wppopen/components-library'

import styles from './CommonStepperVC.module.scss'

const LAST_PAGE = 7
const FIRST_PAGE = 1
const REQUIRED_STEP = 5

export const StepperExample = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_PAGE)
  const [isChecked, setIsChecked] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleNextStep = () => {
    if (currentStep >= LAST_PAGE) return
    if (currentStep === REQUIRED_STEP && !isChecked) {
      setIsError(true)
      return
    }

    setCurrentStep(getNextStep(currentStep))
  }

  const handlePreviousStep = () => {
    if (currentStep === FIRST_PAGE) return

    setCurrentStep(getPreviousStep(currentStep))
  }

  const handleCheckbox = ({ detail }: CustomEvent) => {
    const { checked } = detail

    setIsChecked(checked)
    setIsError(!checked)
  }

  const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
    const clickedIndex = event.detail.index

    if (!clickedIndex) return

    setCurrentStep(clickedIndex)
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.stepper}>
          <WppStepper activeStep={currentStep} onWppChange={handleStepClick}>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 1
              </p>
              <span slot="description">
                First step (this text gets truncated if it's too long and a tooltip is displayed)
              </span>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 2
              </p>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 3
              </p>
              <span slot="description">With substeps</span>
              <WppStep substep>
                <p className={styles.subtext}>Sub step 3.1</p>
              </WppStep>
              <WppStep substep error={isError} iconDescription="Error message">
                <p className={styles.subtext} slot="label">
                  Sub step 3.2
                </p>
              </WppStep>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 4
              </p>
              <span slot="description">Last Step</span>
            </WppStep>
          </WppStepper>
        </div>
        <div className={styles.pages}>
          <div className={`${styles.inner} ${styles[`page${currentStep}`]}`}>
            <div className={styles.page} data-testid="first-page">
              <h3>Page 1</h3>
              <WppRadio
                className={styles.margin}
                labelConfig={{ text: 'Option 1' }}
                required
                data-testid="stepper-radio-button"
              />
            </div>
            <div className={styles.page}>
              <h3>Page 2</h3>
            </div>
            <div className={styles.page} data-testid="third-page">
              <h3>Page 3</h3>
            </div>
            <div className={styles.page} data-testid="fourth-page">
              <h3>Sub page 3.1</h3>
            </div>
            <div className={styles.page}>
              <h3>Sub page 3.2</h3>
              <WppCheckbox className={styles.margin} required onWppChange={handleCheckbox} />
            </div>
            <div className={styles.page}>
              <h3>Page 4</h3>
            </div>
            <div className={styles.page}>
              <h3>FINAL</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <WppButton onClick={handlePreviousStep} data-testid="previous-button">
          Previous Step
        </WppButton>
        <WppButton onClick={handleNextStep} className={styles.button} data-testid="next-button">
          Next Step
        </WppButton>
      </div>
    </div>
  )
}
```

```scss
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

.page1 {
  transform: translateY(0);
}

.page2 {
  transform: translateY(-670px);
}

.page3 {
  transform: translateY(-1320px);
}

.page4 {
  transform: translateY(-1990px);
}

.page5 {
  transform: translateY(-2620px);
}

.page6 {
  transform: translateY(-3230px);
}

.page7 {
  transform: translateY(-3900px);
}
```

```tsx
import { useState } from 'react'
import { WppStepper, WppStep, WppButton, WppCheckbox, WppRadio } from '@wppopen/components-library-react'
import { StepChangeEventDetail } from '@wppopen/components-library'

import styles from './CommonStepperVC.module.scss'

const LAST_PAGE = 5
const FIRST_PAGE = 1
const REQUIRED_STEP = 3.2

export const DecimalStepperExample = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_PAGE)
  const [isChecked, setIsChecked] = useState(false)
  const [isError, setIsError] = useState(false)

  const stepsMap: { [key: number]: { next?: number; prev?: number } } = {
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
    if (currentStep >= LAST_PAGE) return
    if (currentStep === REQUIRED_STEP && !isChecked) return setIsError(true)

    setCurrentStep(getNextStep(currentStep))
  }

  const handlePreviousStep = () => {
    if (currentStep <= FIRST_PAGE) return

    setCurrentStep(getPreviousStep(currentStep))
  }

  const handleCheckbox = ({ detail }: CustomEvent) => {
    const { checked } = detail

    setIsChecked(checked)
    setIsError(!checked)
  }

  const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
    const clickedIndex = event.detail.step

    if (!clickedIndex) return

    setCurrentStep(clickedIndex)
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.stepper}>
          <WppStepper activeStep={currentStep} onWppChange={handleStepClick} useDecimalSubSteps>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 1
              </p>
              <span slot="description">
                First step (this text gets truncated if it's too long and a tooltip is displayed)
              </span>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 2
              </p>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Sub-step 2.1
                </p>
              </WppStep>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Sub-step 2.2
                </p>
              </WppStep>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 3
              </p>
              <span slot="description">With substeps</span>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Sub-step 3.1
                </p>
              </WppStep>
              <WppStep substep error={isError} iconDescription="Error message">
                <p className={styles.subtext} slot="label">
                  Sub-step 3.2
                </p>
              </WppStep>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Sub-step 3.3
                </p>
              </WppStep>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 4
              </p>
              <span slot="description">Last Step</span>
            </WppStep>
          </WppStepper>
        </div>
        <div className={styles.pages}>
          <div className={`${styles.inner} ${styles[`decimalPage${currentStep.toString().replace('.', '_')}`]}`}>
            <div className={styles.page} data-testid="first-page">
              <h3>Page 1</h3>
              <WppRadio
                className={styles.margin}
                labelConfig={{ text: 'Option 1' }}
                required
                data-testid="stepper-radio-button"
              />
            </div>
            <div className={styles.page}>
              <h3>Page 2</h3>
            </div>
            <div className={styles.page}>
              <h3>Sub page 2.1</h3>
            </div>
            <div className={styles.page}>
              <h3>Sub page 2.2</h3>
            </div>
            <div className={styles.page}>
              <h3>Sub page 3.1</h3>
            </div>
            <div className={styles.page}>
              <h3>Sub page 3.2</h3>
              <WppCheckbox className={styles.margin} required onWppChange={handleCheckbox} />
            </div>
            <div className={styles.page}>
              <h3>Sub page 3.3</h3>
            </div>
            <div className={styles.page}>
              <h3>Page 4</h3>
            </div>
            <div className={styles.page}>
              <h3>FINAL</h3>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.buttons}>
        <WppButton onClick={handlePreviousStep} data-testid="previous-button">
          Previous Step
        </WppButton>
        <WppButton onClick={handleNextStep} className={styles.button} data-testid="next-button">
          Next Step
        </WppButton>
      </div>
    </div>
  )
}
```

```scss
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

.inner {
  transition: 0.6s ease-in-out;
}

.decimalPage1 {
  transform: translateY(0);
}

.decimalPage2 {
  transform: translateY(calc(var(--page-height) * -1));
}

.decimalPage2_1 {
  transform: translateY(calc(var(--page-height) * -2));
}

.decimalPage2_2 {
  transform: translateY(calc(var(--page-height) * -3));
}

.decimalPage3 {
  transform: translateY(calc(var(--page-height) * -4));
}

.decimalPage3_1 {
  transform: translateY(calc(var(--page-height) * -5));
}

.decimalPage3_2 {
  transform: translateY(calc(var(--page-height) * -6));
}

.decimalPage3_3 {
  transform: translateY(calc(var(--page-height) * -7));
}

.decimalPage4 {
  transform: translateY(calc(var(--page-height) * -8));
}

.decimalPage5 {
  transform: translateY(calc(var(--page-height) * -9));
}
```


### Vue

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



## Properties

| Property                  | Attribute               | Description                                                                                                                                                                                                                                                                        | Type                         | Default      |
| ------------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------ |
| `activeStep` _(required)_ | `active-step`           | Defines the current active step, including support for sub-steps like `3.1`                                                                                                                                                                                                        | `number`                     | `undefined`  |
| `completedSteps`          | `completed-steps`       | Defines the amount of the completed steps.                                                                                                                                                                                                                                         | `number`                     | `0`          |
| `orientation`             | `orientation`           | Defines the stepper orientation.                                                                                                                                                                                                                                                   | `"horizontal" \| "vertical"` | `'vertical'` |
| `stepAmount`              | `step-amount`           | Defines how many steps can be visible on the screen while the rest are hidden. Use only in the horizontal stepper. If you don't provide a value for this prop, all steps are shown.                                                                                                | `number`                     | `0`          |
| `stepperWidth`            | `stepper-width`         | Defines the width of the stepper. Accepts string values in pixels, such as: "400px", or string values in percetages: "100%". Note: This property should be used just for the vertical Stepper.                                                                                     | `string`                     | `undefined`  |
| `useDecimalSubSteps`      | `use-decimal-sub-steps` | Determines whether sub-steps should be represented as decimal values (e.g., 3.1, 3.2). When set to true, sub-steps will follow a decimal notation, providing clearer differentiation between main steps and their sub-steps. If set to false, sub-steps will use integer notation. | `boolean`                    | `false`      |
| `useResizeObserver`       | `use-resize-observer`   | By default, the "horizontal" stepper uses ResizeObserver to adjust its dimension on page resize. If set to "false", the stepper won't use the ResizeObserver. Note: the ResizeObserver is used just by the "horziontal" stepper.                                                   | `boolean`                    | `true`       |


## Events

| Event       | Description                                                                                                                                                                                                                                                                                                                                                                          | Type                                 |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------ |
| `wppChange` | If `useDecimalSubSteps` is true, emits the `step`, `index`, and `substep` properties of the active step. The `step` value may include decimal values to represent sub-steps (e.g., 2.1, 3.2). The `substep` property is a boolean that indicates whether the current step is a sub-step. This ensures both the main step and its sub-steps can be identified and tracked accurately. | `CustomEvent<StepChangeEventDetail>` |


## Slots

| Slot | Description                                                                              |
| ---- | ---------------------------------------------------------------------------------------- |
|      | Can contain only the `wpp-step` component. The default slot, without the name attribute. |


## Shadow Parts

| Part          | Description               |
| ------------- | ------------------------- |
| `"indicator"` | step indicator element    |
| `"inner"`     | Content slot element      |
| `"wrapper"`   | component wrapper element |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
