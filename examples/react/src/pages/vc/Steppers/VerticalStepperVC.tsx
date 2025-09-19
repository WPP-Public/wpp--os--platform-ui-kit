import { useEffect, useState } from 'react'
import { WppStepper, WppStep, WppButton, WppCheckbox, WppRadio } from '@platform-ui-kit/components-library-react'
import { StepChangeEventDetail } from '@platform-ui-kit/components-library'

import styles from './CommonStepperVC.module.scss'

const LAST_PAGE = 10
const FIRST_PAGE = 1
const REQUIRED_STEP = 7

export const VerticalStepper = () => {
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

  const handleNextStep = () => {
    if (currentStep >= LAST_PAGE) return
    if (currentStep === REQUIRED_STEP && !isChecked) return setIsError(true)

    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStep <= FIRST_PAGE) return

    setCurrentStep(currentStep - 1)
  }

  const handleCheckbox = ({ detail }: CustomEvent) => {
    const { checked } = detail

    setIsChecked(checked)
    setIsError(!checked)
  }

  const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
    const clickedIndex = event.detail.index

    if (clickedIndex === undefined || clickedIndex === null) return

    setCurrentStep(clickedIndex)
  }

  return (
    <div className={styles.main}>
      <div className={styles.wrapper}>
        <div className={styles.stepper}>
          <WppStepper activeStep={currentStep} onWppChange={handleStepClick}>
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
                <div slot="label">
                  <p className={styles.subtext}>Step 2 Sub step 1</p>
                </div>
              </WppStep>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Step 2 Sub step 2
                </p>
              </WppStep>
            </WppStep>
            <WppStep>
              <p slot="label" className={styles.text}>
                Step 3
              </p>
              <span slot="description">With substeps</span>
              <WppStep substep>
                <div slot="label">
                  <p className={styles.subtext}>Step 3 Sub step 1</p>
                </div>
              </WppStep>
              <WppStep substep error={isError} iconDescription="Error message">
                <p className={styles.subtext} slot="label">
                  Step 3 Sub step 2
                </p>
              </WppStep>
              <WppStep substep>
                <p className={styles.subtext} slot="label">
                  Step 3 Sub step 3
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
            <div className={styles.page} data-testid="two-page-subpage-one">
              <h3>Page 2 Sub page 1</h3>
            </div>
            <div className={styles.page} data-testid="two-page-subpage-two">
              <h3>Page 2 Sub page 2</h3>
            </div>
            <div className={styles.page} data-testid="third-page">
              <h3>Page 3</h3>
            </div>
            <div className={styles.page} data-testid="third-page-subpage-one">
              <h3>Page 3 Sub page 1</h3>
            </div>
            <div className={styles.page} data-testid="third-page-subpage-two">
              <h3>Page 3 Sub page 2</h3>
              <WppCheckbox className={styles.margin} required onWppChange={handleCheckbox} />
            </div>
            <div className={styles.page} data-testid="third-page-subpage-three">
              <h3>Page 3 Sub page 3</h3>
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
