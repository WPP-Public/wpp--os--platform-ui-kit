import { useState, useEffect, Dispatch } from 'react'
import { FormikProps } from 'formik'

import { FormConfigValuesTypes } from '../../../../types'
import { FormValues } from '../StepPhoneNumber'

interface Props {
  form?: FormikProps<FormValues>
  handleNextStepClick?: () => Dispatch<FormConfigValuesTypes> | void
}

export const usePhoneNumberState = ({ form, handleNextStepClick }: Props) => {
  const [isSubmit, setSubmit] = useState(false)

  useEffect(() => {
    if (!form?.touched.phoneNumber) return

    if (!form?.errors.phoneNumber && form.values.phoneNumber) {
      setSubmit(true)
    } else {
      setSubmit(false)
    }
  }, [form?.errors, form?.touched])

  const handleButtonClick = async () => {
    if (form?.validateField) {
      await form.validateField('phoneNumber')
    }

    if (isSubmit && handleNextStepClick) return handleNextStepClick()
  }

  const handleChange = (event: CustomEvent) => {
    const number = event.detail.value
      .match(/\d*/g)
      .join('')
      .match(/(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/)
      .slice(1)
      .join('-')
      .replace(/-*$/g, '')

    if (!number) {
      setSubmit(false)
    }

    form?.setFieldValue('phoneNumber', number)
  }

  return {
    handleButtonClick,
    isSubmit,
    handleChange,
  }
}
