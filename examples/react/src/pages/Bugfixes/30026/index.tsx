import { useState } from 'react'
import { WppStepper, WppStep, WppButton, WppCheckbox, WppRadio } from '@platform-ui-kit/components-library-react'
import { StepChangeEventDetail } from '@platform-ui-kit/components-library'

import styles from './index.module.scss'

const LAST_PAGE_COUNT = 6
const FIRST_PAGE_COUNT = 1
const REQUIRED_STEP_NUMBER = 4

const StepperResizeObserverIssue = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_PAGE_COUNT)
  const [isChecked, setIsChecked] = useState(false)
  const [isError, setIsError] = useState(false)

  const handleNextStep = () => {
    if (currentStep === LAST_PAGE_COUNT) return
    if (currentStep === REQUIRED_STEP_NUMBER && !isChecked) setIsError(true)

    setCurrentStep(currentStep + 1)
  }
  const handlePreviousStep = () => {
    if (currentStep === FIRST_PAGE_COUNT) return

    setCurrentStep(currentStep - 1)
  }

  const handleCheckbox = ({ detail }: CustomEvent) => {
    const { checked } = detail

    setIsChecked(checked)
    setIsError(!checked)
  }

  const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
    if (!event.detail.index) return

    setCurrentStep(event.detail.index)
  }

  return (
    <div className={styles.main}>
      <div className={`${styles.wrapper} ${styles.column}`}>
        <div className={styles['full-width-stepper']}>
          <WppStepper
            useResizeObserver={false}
            activeStep={currentStep}
            orientation="horizontal"
            onWppChange={handleStepClick}
          >
            <WppStep>
              <p slot="label" className={styles.text}>
                Step
              </p>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step
              </p>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step
              </p>
            </WppStep>
            <WppStep error={isError} iconDescription="Error message">
              <p slot="label" className={styles.text}>
                Step
              </p>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step
              </p>
            </WppStep>
          </WppStepper>
        </div>
        <div className={styles.pages} data-testid="pages">
          <div className={`${styles.inner} ${styles[`page${currentStep}`]}`}>
            <div className={styles.page}>
              <h3>Page 1</h3>
              <WppRadio
                className={styles.margin}
                labelConfig={{ text: 'Option 1' }}
                required
                data-testid="stepper-radio-button"
              />
            </div>
            <div className={styles.page} data-testid="second-page">
              <h3>Page 2</h3>
            </div>
            <div className={styles.page}>
              <h3>Page 3</h3>
            </div>
            <div className={styles.page} data-testid="fourth-page">
              <h3>Page 4</h3>
              <WppCheckbox className={styles.margin} required onWppChange={handleCheckbox} />
            </div>
            <div className={styles.page}>
              <h3>Page 5</h3>
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

export default StepperResizeObserverIssue
