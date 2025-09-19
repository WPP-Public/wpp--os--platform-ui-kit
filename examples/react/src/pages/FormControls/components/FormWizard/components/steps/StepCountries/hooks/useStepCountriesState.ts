import { useState, useEffect } from 'react'
import { FormikProps } from 'formik'

import { FormValues } from '../types'

export const useStepCountriesState = ({ form }: { form?: FormikProps<FormValues> }) => {
  const [isValidCountries, setValidCountries] = useState<boolean | null>(null)
  const [isValidCities, setValidCities] = useState<boolean | null>(null)
  const [isChecked, setChecked] = useState(false)

  useEffect(() => {
    if (!form?.touched.countries) return

    if (!form.errors.countries) {
      setValidCountries(true)
    } else {
      setValidCountries(false)
    }

    if (!form.errors.cities) {
      setValidCities(true)
    } else {
      setValidCities(false)
    }
  }, [form?.errors, form?.touched])

  const handleToggleChange = () => setChecked(!isChecked)

  const isSubmit = isValidCountries && isValidCities && isChecked

  return {
    handleToggleChange,
    isSubmit,
    isValidCountries,
    isValidCities,
    isChecked,
  }
}
