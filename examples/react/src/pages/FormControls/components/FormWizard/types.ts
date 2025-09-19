import { ReactElement, Dispatch } from 'react'
import { FormikProps } from 'formik'

export interface FormConfigValuesTypes {
  name: string
  stepNumber: number
  isRequired: boolean
  initialValue: any // initial value could include any type, from number to array
}

export type FormConfigTypes = Record<string, FormConfigValuesTypes>

export interface FormType {
  formConfig: FormConfigTypes
  validationSchema: any | (() => any) // this is type from formik
}

export interface StepHandlerTypes {
  children: ReactElement[]
  config: FormConfigTypes
  form: FormikProps<Record<string, string>>
  initialStep: FormConfigValuesTypes
}

export interface StepTypes {
  children: ReactElement
  config?: FormConfigTypes
  form?: FormikProps<Record<string, string>>
  currentStep?: FormConfigValuesTypes
  nextStep?: FormConfigValuesTypes
  prevStep?: FormConfigValuesTypes
  setCurrentStep?: Dispatch<FormConfigValuesTypes>
  step: FormConfigValuesTypes
  handleNextStepClick?: () => Dispatch<FormConfigValuesTypes> | void
}

export interface ComponentPropsType<T> {
  form?: FormikProps<T>
  currentStep?: FormConfigValuesTypes
  handleNextStepClick?: () => Dispatch<FormConfigValuesTypes> | void
  handlePrevStepClick?: () => Dispatch<FormConfigValuesTypes> | void
}
