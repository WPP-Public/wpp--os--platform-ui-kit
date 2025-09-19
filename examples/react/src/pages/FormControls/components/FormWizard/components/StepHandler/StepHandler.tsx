import React, { useState, FC } from 'react'

import { StepHandlerTypes, StepTypes } from '../../types'

// returns any because react would allow an array to be returned from a component render function, but TypeScript (currently) does not https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20356
export const StepHandler: FC<StepHandlerTypes> = ({ config, initialStep, children, ...rest }): any => {
  const [currentStep, setCurrentStep] = useState(initialStep || config.initialStep)

  return React.Children.map(children, child => {
    if (!child) return null

    return React.cloneElement(child, {
      currentStep,
      setCurrentStep,
      config,
      ...rest,
    })
  })
}

export const Step: FC<StepTypes> = ({
  setCurrentStep,
  children,
  currentStep,
  config,
  nextStep,
  prevStep,
  step,
  ...rest
}): any => {
  const handlePrevStepClick = () => {
    if (prevStep && setCurrentStep) {
      setCurrentStep(prevStep)
    }
  }
  const handleNextStepClick = () => {
    if (nextStep && setCurrentStep) {
      setCurrentStep(nextStep)
    }
  }

  if (step.name === currentStep?.name)
    return React.Children.map(children, child =>
      React.cloneElement(child, {
        currentStep,
        setCurrentStep,
        handleNextStepClick,
        handlePrevStepClick,
        config,
        ...rest,
      }),
    )

  return null
}
