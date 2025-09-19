import { FormConfigTypes } from '../types'

export const formConfig: FormConfigTypes = {
  name: {
    name: 'name',
    stepNumber: 1,
    isRequired: true,
    initialValue: '',
  },
  email: {
    name: 'email',
    stepNumber: 2,
    isRequired: true,
    initialValue: '',
  },
  content: {
    name: 'content',
    stepNumber: 3,
    isRequired: true,
    initialValue: '',
  },
  activities: {
    name: 'activities',
    stepNumber: 4,
    isRequired: true,
    initialValue: [],
  },
  select: {
    name: 'select',
    stepNumber: 4,
    isRequired: true,
    initialValue: '',
  },
  age: {
    name: 'age',
    stepNumber: 5,
    isRequired: true,
    initialValue: '',
  },
  phoneNumber: {
    name: 'phoneNumber',
    stepNumber: 6,
    isRequired: true,
    initialValue: '',
  },
  countries: {
    name: 'countries',
    stepNumber: 7,
    isRequired: true,
    initialValue: '',
  },
  cities: {
    name: 'cities',
    stepNumber: 7,
    isRequired: true,
    initialValue: '',
  },
}
