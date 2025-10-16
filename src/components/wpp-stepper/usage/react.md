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
