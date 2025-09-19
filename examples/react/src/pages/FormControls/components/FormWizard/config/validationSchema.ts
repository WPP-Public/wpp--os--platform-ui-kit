import * as yup from 'yup'

import { commonValidationSchemas } from '../utils/validationSchemas'
import { phoneRegExp } from '../utils/validationRegExp'

export const validationSchema = () => {
  const { name, email, content, age } = commonValidationSchemas

  return yup.object().shape({
    name,
    email,
    content,
    age,
    activities: yup.array().min(2, 'Select at least 2 activities'),
    select: yup.string().required('Select item'),
    phoneNumber: yup.string().matches(phoneRegExp, 'Phone number is not valid'),
    countries: yup.string().required('Select Country'),
    cities: yup.string().required('Select City'),
  })
}
