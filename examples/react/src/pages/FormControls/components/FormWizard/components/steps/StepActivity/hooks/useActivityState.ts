import { useState, useEffect, Dispatch } from 'react'

import { FormConfigValuesTypes } from '../../../../types'

export const useActivityState = ({
  form,
  handleNextStepClick,
}: {
  form?: any
  handleNextStepClick?: () => Dispatch<FormConfigValuesTypes> | void
}) => {
  const [isValidActivitiesField, setValidActivitiesField] = useState<boolean | null>(null)
  const [isValidSelectField, setValidSelectField] = useState<boolean | null>(null)
  const { validateField, errors, touched, values } = form

  useEffect(() => {
    if (!errors?.activities) {
      setValidActivitiesField(true)
    } else {
      setValidActivitiesField(false)
    }

    if (!touched?.select) return

    if (!errors?.select) {
      setValidSelectField(true)
    } else {
      setValidSelectField(false)
    }
  }, [errors, touched])

  const handleButtonClick = async () => {
    await validateField('activities')
    await validateField('select')
    if (isValidActivitiesField && isValidSelectField && handleNextStepClick) handleNextStepClick()
  }

  const isActivitiesPassValidation = values?.activities && values.activities.length >= 2

  return {
    handleButtonClick,
    isActivitiesPassValidation,
    isValidActivitiesField,
    isValidSelectField,
  }
}
