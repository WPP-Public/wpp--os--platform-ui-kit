import { FC, Dispatch } from 'react'
import { WppAutocomplete, WppSelect, WppButton, WppListItem } from '@platform-ui-kit/components-library-react'

import { activityOptions, itemsOptions } from './config'
import { useActivityState } from './hooks/useActivityState'

import { FormConfigValuesTypes } from '../../../types'

import commonStyles from '../StepsCommonStyles.module.scss'

interface Props {
  form?: any
  currentStep?: FormConfigValuesTypes
  handleNextStepClick?: () => Dispatch<FormConfigValuesTypes> | void
  handlePrevStepClick?: () => Dispatch<FormConfigValuesTypes> | void
}

export const StepActivity: FC<Props> = ({ form, handleNextStepClick, handlePrevStepClick }) => {
  const { errors, values, handleChange, handleBlur } = form

  const { handleButtonClick, isActivitiesPassValidation, isValidActivitiesField, isValidSelectField } =
    useActivityState({ form, handleNextStepClick })

  return (
    <>
      <WppAutocomplete
        name="activities"
        labelConfig={{ text: 'Preferred Activities' }}
        placeholder="Select activities"
        message={isValidActivitiesField !== null && Boolean(errors?.activities) ? errors?.activities : ''}
        messageType={errors?.activities ? 'error' : undefined}
        value={values?.activities}
        onWppChange={handleChange}
        data-testid="activities"
      >
        {activityOptions.map(({ id, disabled, label }) => (
          <WppListItem key={id} disabled={disabled} value={id} label={label} />
        ))}
      </WppAutocomplete>
      <WppSelect
        name="select"
        labelConfig={{ text: 'Select Item' }}
        placeholder="Choose item"
        disabled={!isActivitiesPassValidation}
        message={isActivitiesPassValidation && Boolean(errors?.select) ? errors?.select : ''}
        messageType={isActivitiesPassValidation && errors?.select ? 'error' : undefined}
        onWppChange={handleChange}
        onWppBlur={handleBlur}
        className={commonStyles.topMargin}
        value={values?.select}
        required
        id="select"
        data-testid="item"
        list={itemsOptions.map(({ id, label }) => ({
          value: id,
          label,
        }))}
      ></WppSelect>
      <div className={commonStyles.buttonWrapper}>
        <WppButton variant="secondary" onClick={handlePrevStepClick} className={commonStyles.rightMargin}>
          Prev Step
        </WppButton>
        <WppButton
          onClick={handleButtonClick}
          className={commonStyles.button}
          disabled={!isValidActivitiesField || !isValidSelectField}
          data-testid="next-button"
        >
          Next Step
        </WppButton>
      </div>
    </>
  )
}
