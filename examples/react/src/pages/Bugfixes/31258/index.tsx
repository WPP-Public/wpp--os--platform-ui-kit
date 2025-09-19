import React, { useState } from 'react'
import styles from './index.module.scss'
import { WppButton, WppStep, WppStepper } from '@platform-ui-kit/components-library-react'
import { StepChangeEventDetail } from '@platform-ui-kit/components-library'

const StepDynamicContent = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [showDescription, setShowDescription] = useState(false)

  const handleStepClick = (event: CustomEvent<StepChangeEventDetail>) => {
    const clickedIndex = event.detail.index

    if (clickedIndex === undefined || clickedIndex === null) return

    setCurrentStep(clickedIndex)
  }

  const handleNextStep = () => {
    if (currentStep >= 6) return

    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    if (currentStep <= 1) return

    setCurrentStep(currentStep - 1)
  }

  return (
    <div className={styles.container}>
      <div className="content">
        <WppStepper activeStep={currentStep} onWppChange={handleStepClick}>
          <WppStep>
            <p slot="label" className={styles.text}>
              Step with a long text
            </p>
            {showDescription && (
              <span slot="description">
                First step (this text gets truncated if it's too long and a tooltip is displayed)
              </span>
            )}
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
            <span slot="description">Last Step</span>
          </WppStep>
        </WppStepper>
      </div>

      <div className={styles.buttons}>
        <WppButton className={styles.button} onClick={handlePreviousStep} data-testid="previous-button">
          Previous Step
        </WppButton>
        <WppButton className={styles.button} onClick={handleNextStep} data-testid="next-button">
          Next Step
        </WppButton>
        <WppButton onClick={() => setShowDescription(!showDescription)} data-testid="next-button">
          {showDescription ? 'Remove' : 'Add'} description
        </WppButton>
      </div>
    </div>
  )
}

export default StepDynamicContent
