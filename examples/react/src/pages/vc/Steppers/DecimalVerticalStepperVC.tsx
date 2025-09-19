import { useState, useEffect } from 'react'
import { WppStepper, WppStep, WppButton, WppCheckbox, WppRadio } from '@platform-ui-kit/components-library-react'
import { StepChangeEventDetail } from '@platform-ui-kit/components-library'

import styles from './CommonStepperVC.module.scss'

const LAST_PAGE = 5
const FIRST_PAGE = 1
const REQUIRED_STEP = 3.2

export const DecimalVerticalStepper = () => {
  const [currentStep, setCurrentStep] = useState(FIRST_PAGE)
  const [isChecked, setIsChecked] = useState(false)
  const [isError, setIsError] = useState(false)

  const updatePageHeight = () => {
    const pageElement = document.querySelector(`.${styles.page}`) as HTMLElement | null
    const pageHeight = pageElement?.offsetHeight || window.innerHeight

    document.documentElement.style.setProperty('--page-height', `${pageHeight}px`)
  }

  useEffect(() => {
    updatePageHeight()

    window.addEventListener('resize', updatePageHeight)

    return () => window.removeEventListener('resize', updatePageHeight)
  }, [])

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

    const nextStep = getNextStep(currentStep)

    setCurrentStep(nextStep)
  }

  const handlePreviousStep = () => {
    if (currentStep <= FIRST_PAGE) return
    const previousStep = getPreviousStep(currentStep)

    setCurrentStep(previousStep)
  }

  const handleCheckbox = ({ detail }: CustomEvent) => {
    const { checked } = detail

    setIsChecked(checked)
    setIsError(!checked)
  }

  const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
    const clickedStep = event.detail.step

    if (clickedStep === undefined || clickedStep === null) return

    setCurrentStep(clickedStep)
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.stepper}>
          <WppStepper activeStep={currentStep} onWppChange={handleStepClick} useDecimalSubSteps>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step with a long text
              </p>
              <span slot="description">
                First step (this text gets truncated if it's too long and a tooltip is displayed)
              </span>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 2
              </p>
              <span slot="description">With substeps</span>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Sub step 2.1
                </p>
              </WppStep>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Sub step 2.2
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
                  Sub step 3.1
                </p>
              </WppStep>
              <WppStep substep error={isError} iconDescription="Error message">
                <p className={styles.subtext} slot="label">
                  Sub step 3.2
                </p>
              </WppStep>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Sub step 3.3
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
          <div className={`${styles.inner} ${styles[`dpage${currentStep.toString().replace('.', '_')}`]}`}>
            <div className={styles.page} data-testid="first-page">
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
            <div className={styles.page} data-testid="two-page-subpage-one">
              <h3>Sub page 2.1</h3>
            </div>
            <div className={styles.page} data-testid="two-page-subpage-two">
              <h3>Sub page 2.2</h3>
            </div>
            <div className={styles.page} data-testid="third-page">
              <h3>Page 3</h3>
            </div>
            <div className={styles.page} data-testid="third-page-subpage-one">
              <h3>Sub page 3.1</h3>
            </div>
            <div className={styles.page} data-testid="third-page-subpage-two">
              <h3>Sub page 3.2</h3>
              <WppCheckbox className={styles.margin} required onWppChange={handleCheckbox} />
            </div>
            <div className={styles.page} data-testid="third-page-subpage-three">
              <h3>Sub page 3.3</h3>
            </div>
            <div className={styles.page} data-testid="forth-page">
              <h3>Page 4</h3>
            </div>
            <div className={styles.page} data-testid="final-page">
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
