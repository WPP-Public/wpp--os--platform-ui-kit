import { useEffect, useState, FC } from 'react'
import { WppDatepicker, WppLabel, WppButton } from '@platform-ui-kit/components-library-react'

import { ComponentPropsType } from '../../../types'

import styles from './StepAge.module.scss'

import commonStyles from '../StepsCommonStyles.module.scss'

// TODO: update datepicker after release/1.2.0 will be merge to develop

interface FormValues {
  age: string
}

export const StepAge: FC<ComponentPropsType<FormValues>> = ({ form, handlePrevStepClick, handleNextStepClick }) => {
  const [isSubmit, setSubmit] = useState(false)

  useEffect(() => {
    if (!form?.errors.age && form?.values.age) {
      setSubmit(true)
    } else {
      setSubmit(false)
    }
  }, [form?.values, form?.errors])

  const handleButtonClick = async () => {
    if (isSubmit && handleNextStepClick) handleNextStepClick()
  }

  const handleDateChange = (event: CustomEvent) => {
    form?.setFieldValue('age', event.detail.date)
  }

  return (
    <>
      <div className={styles.labelWrapper}>
        <WppLabel
          htmlFor="age"
          config={{ text: 'Birthday' }}
          typography="s-strong"
          className={styles.label}
          data-testid="birthday-label"
        />
      </div>
      <WppDatepicker id="age" onWppChange={handleDateChange} onBlur={form?.handleBlur} data-testid="birthday" />
      <p className={styles.errorText}>{form?.touched.age && Boolean(form?.errors.age) ? form.errors.age : ''}</p>
      <div className={commonStyles.buttonWrapper}>
        <WppButton variant="secondary" onClick={handlePrevStepClick} className={commonStyles.rightMargin}>
          Prev Step
        </WppButton>
        <WppButton
          disabled={!isSubmit}
          className={commonStyles.button}
          onClick={handleButtonClick}
          data-testid="next-button"
        >
          Next Step
        </WppButton>
      </div>
    </>
  )
}
