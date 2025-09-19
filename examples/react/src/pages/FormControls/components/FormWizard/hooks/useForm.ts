import { useFormik } from 'formik'
import mapValues from 'lodash/mapValues'

import { FormType } from '../types'

export const useForm = ({ validationSchema, formConfig }: FormType) => {
  const initialValues = mapValues(formConfig, step => step.initialValue)

  return useFormik({
    initialValues,
    validationSchema,
    onSubmit: values => {
      alert(
        `Submit name:${values.name}, email:${values.email}, activities: [${values.activities
          .map((activity: { label: string }) => activity.label)
          .join(', ')}], age: ${values.age}, city: ${values.cities}, country: ${values.countries}, phone number: ${
          values.phoneNumber
        }, selected id ${values.select}`,
      )
    },
  })
}
