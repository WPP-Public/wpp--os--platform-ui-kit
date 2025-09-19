import { FormEvent } from 'react'

import { StepHandler, Step } from './components/StepHandler/StepHandler'

import { StepName } from './components/steps/StepName/StepName'
import { StepEmail } from './components/steps/StepEmail/StepEmail'
import { StepActivity } from './components/steps/StepActivity/StepActivity'
import { StepAge } from './components/steps/StepAge/StepAge'
import { StepPhoneNumber } from './components/steps/StepPhoneNumber/StepPhoneNumber'
import { StepCountries } from './components/steps/StepCountries/StepCountries'

import { formConfig } from './config/formConfig'
import { useForm } from './hooks/useForm'
import { validationSchema } from './config/validationSchema'

import wppImageSource from './assets/wpp.jpeg'

import styles from './FormWizard.module.scss'
import { StepContent } from './components/steps/StepContent/StepContent'

export const FormWizard = () => {
  const form = useForm({ validationSchema, formConfig })

  return (
    <div className={styles.formWrapper}>
      <form
        className={styles.form}
        onSubmit={(event: FormEvent) => {
          event.preventDefault()
        }}
      >
        <div className={styles.stepWrapper}>
          <StepHandler form={form} config={formConfig} initialStep={formConfig.name}>
            <Step step={formConfig.name} nextStep={formConfig.email}>
              <StepName />
            </Step>
            <Step step={formConfig.email} prevStep={formConfig.name} nextStep={formConfig.content}>
              <StepEmail />
            </Step>
            <Step step={formConfig.content} prevStep={formConfig.email} nextStep={formConfig.activities}>
              <StepContent />
            </Step>
            <Step step={formConfig.activities} prevStep={formConfig.content} nextStep={formConfig.age}>
              <StepActivity />
            </Step>
            <Step step={formConfig.age} prevStep={formConfig.activities} nextStep={formConfig.phoneNumber}>
              <StepAge />
            </Step>
            <Step step={formConfig.phoneNumber} prevStep={formConfig.age} nextStep={formConfig.countries}>
              <StepPhoneNumber />
            </Step>
            <Step step={formConfig.countries} prevStep={formConfig.phoneNumber}>
              <StepCountries />
            </Step>
          </StepHandler>
        </div>
        <img src={wppImageSource} className={styles.img} />
      </form>
    </div>
  )
}
