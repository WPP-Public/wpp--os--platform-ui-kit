import { FC } from 'react'
import { WppInput, WppButton } from '@platform-ui-kit/components-library-react'

import { usePhoneNumberState } from './hooks/usePhoneNumberState'

import { ComponentPropsType } from '../../../types'

import commonStyles from '../StepsCommonStyles.module.scss'

export interface FormValues {
  phoneNumber: string
}

export const StepPhoneNumber: FC<ComponentPropsType<FormValues>> = ({
  form,
  currentStep,
  handleNextStepClick,
  handlePrevStepClick,
}) => {
  const { handleButtonClick, isSubmit, handleChange } = usePhoneNumberState({ form, handleNextStepClick })

  return (
    <>
      <WppInput
        id="phoneNumber"
        name="phoneNumber"
        labelConfig={{ text: 'Phone number' }}
        required={currentStep?.isRequired}
        placeholder="XXX-XXX-XX-XX"
        value={form?.values?.phoneNumber}
        onWppChange={handleChange}
        onWppBlur={form?.handleBlur}
        message={form?.errors.phoneNumber ? form?.errors.phoneNumber : ''}
        messageType={form?.errors.phoneNumber ? 'error' : undefined}
        data-testid="phone"
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
