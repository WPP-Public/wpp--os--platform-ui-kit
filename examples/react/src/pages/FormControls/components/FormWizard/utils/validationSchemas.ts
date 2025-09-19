import * as yup from 'yup'
import { includesCyrillic, nameRegExp } from './validationRegExp'

export const commonValidationSchemas = {
  name: yup
    .string()
    .matches(nameRegExp, 'Use only letters')
    .min(2, 'Name should have at least 2 letters')
    .max(24, 'Name should less then 24 letters')
    .required('Please, enter your name'),
  email: yup
    .string()
    .email('Email is invalid')
    .test('excludeCyrillic', 'Email must contain only english letters', value => !includesCyrillic.test(value || ''))
    .required('Please, enter your email'),
  content: yup.string().required('Please, enter your content'),
  age: yup
    .string()
    .required('Date of birthday required')
    .test('DOB', 'Should be more than 18 years old', (value?: string) => {
      if (!value) return false
      const currentYear = new Date().getFullYear()
      const year = new Date(value).getFullYear()

      return currentYear - year >= 18 ? true : false
    }),
}
