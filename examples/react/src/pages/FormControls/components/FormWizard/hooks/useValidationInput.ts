import { useState, useEffect, Dispatch } from 'react'

import { FormConfigValuesTypes } from '../types'

interface Props {
  form?: any
  currentStep?: FormConfigValuesTypes
  handleNextStepClick?: () => Dispatch<FormConfigValuesTypes> | void
}

export const useValidationInput = ({ form, currentStep, handleNextStepClick }: Props) => {
  const [isSubmit, setSubmit] = useState(false)

  useEffect(() => {
    if (!form || !currentStep) return

    if (!form.errors[currentStep.name] && form.values[currentStep.name]) {
      setSubmit(true)
    } else {
      setSubmit(false)
    }
  }, [form?.errors, form?.touched])

  const handleButtonClick = async () => {
    if (isSubmit && handleNextStepClick) handleNextStepClick()
  }

  return {
    handleButtonClick,
    isSubmit,
  }
}
