import { FC } from 'react'
import { WppInput, WppButton } from '@platform-ui-kit/components-library-react'

import { useValidationInput } from '../../../hooks/useValidationInput'

import { ComponentPropsType } from '../../../types'

import commonStyles from '../StepsCommonStyles.module.scss'

interface FormValues {
  email: string
}

export const StepEmail: FC<ComponentPropsType<FormValues>> = ({
  form,
  currentStep,
  handleNextStepClick,
  handlePrevStepClick,
}) => {
  const { handleButtonClick, isSubmit } = useValidationInput({ form, handleNextStepClick, currentStep })

  return (
    <>
      <WppInput
        id="email"
        name="email"
        labelConfig={{ text: 'Email' }}
        placeholder="Email"
        required={currentStep?.isRequired}
        value={form?.values.email}
        onWppChange={form?.handleChange}
        onWppBlur={form?.handleBlur}
        message={isSubmit !== null && form?.errors.email ? form?.errors.email : ''}
        messageType={isSubmit !== null && form?.errors.email ? 'error' : undefined}
        data-testid="email"
      />
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
