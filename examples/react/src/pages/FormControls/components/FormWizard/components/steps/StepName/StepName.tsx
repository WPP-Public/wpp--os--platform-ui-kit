import { FC } from 'react'
import { WppInput, WppButton } from '@platform-ui-kit/components-library-react'

import { useValidationInput } from '../../../hooks/useValidationInput'

import { ComponentPropsType } from '../../../types'

import commonStyles from '../StepsCommonStyles.module.scss'

interface FormValues {
  name: string
}

export const StepName: FC<ComponentPropsType<FormValues>> = ({ form, handleNextStepClick, currentStep }) => {
  const { handleButtonClick, isSubmit } = useValidationInput({ form, handleNextStepClick, currentStep })

  return (
    <>
      <WppInput
        id="name"
        name="name"
        labelConfig={{ text: 'Name' }}
        required={currentStep?.isRequired}
        placeholder="Name"
        value={form?.values?.name}
        onWppChange={form?.handleChange}
        onWppBlur={form?.handleBlur}
        message={form?.errors?.name ? form?.errors?.name : ''}
        messageType={form?.errors?.name ? 'error' : undefined}
        data-testid="name"
      />
      <div className={commonStyles.buttonWrapper}>
        <WppButton
          onClick={handleButtonClick}
          className={commonStyles.button}
          disabled={!isSubmit}
          data-testid="next-button"
        >
          Next Step
        </WppButton>
      </div>
    </>
  )
}
