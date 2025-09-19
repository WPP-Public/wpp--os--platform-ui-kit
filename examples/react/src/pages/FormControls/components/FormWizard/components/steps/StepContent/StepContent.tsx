import { FC } from 'react'
import { WppButton, WppRichtext } from '@platform-ui-kit/components-library-react'

import { useValidationInput } from '../../../hooks/useValidationInput'

import { ComponentPropsType } from '../../../types'

import commonStyles from '../StepsCommonStyles.module.scss'

interface FormValues {
  content: string
}

export const StepContent: FC<ComponentPropsType<FormValues>> = ({
  form,
  handlePrevStepClick,
  handleNextStepClick,
  currentStep,
}) => {
  const { handleButtonClick, isSubmit } = useValidationInput({ form, handleNextStepClick, currentStep })

  return (
    <>
      <WppRichtext
        name="content"
        placeholder="Type content here..."
        labelConfig={{ text: 'Content' }}
        value={form?.values?.content}
        onWppChange={form?.handleChange}
        message={form?.errors?.content ? form?.errors?.content : ''}
        messageType={form?.errors?.content ? 'error' : undefined}
        characters-limit={200}
        warningThreshold={180}
        data-testid="content"
      />
      <div className={commonStyles.buttonWrapper}>
        <WppButton variant="secondary" onClick={handlePrevStepClick} className={commonStyles.rightMargin}>
          Prev Step
        </WppButton>
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
