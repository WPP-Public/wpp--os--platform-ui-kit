import { FC } from 'react'
import { WppToggle, WppSelect, WppButton } from '@platform-ui-kit/components-library-react'

import { countries, cities } from './config'
import { useStepCountriesState } from './hooks/useStepCountriesState'

import { ComponentPropsType } from '../../../types'
import { FormValues } from './types'

import commonStyles from '../StepsCommonStyles.module.scss'
import styles from './StepCountries.module.scss'

export const StepCountries: FC<ComponentPropsType<FormValues>> = ({ handlePrevStepClick, form, currentStep }) => {
  const { isSubmit, handleToggleChange, isValidCountries, isChecked } = useStepCountriesState({ form })

  const handleSubmitForm = () => {
    if (isSubmit) form?.submitForm()
  }

  return (
    <>
      <WppSelect
        name="countries"
        labelConfig={{ text: 'Select Countries' }}
        placeholder="Choose country"
        message={isValidCountries !== null && form?.errors?.countries ? form?.errors?.countries : ''}
        messageType={isValidCountries !== null && form?.errors?.countries ? 'error' : undefined}
        onWppChange={form?.handleChange}
        required={currentStep?.isRequired}
        onWppBlur={form?.handleBlur}
        className={commonStyles.topMargin}
        value={form?.values?.countries}
        id="select"
        data-testid="countries"
        list={countries.map(({ id, label }) => ({
          value: id,
          label,
        }))}
      ></WppSelect>
      {isValidCountries && (
        <WppSelect
          name="cities"
          labelConfig={{ text: 'Select City' }}
          placeholder="Choose city"
          message={form?.errors?.cities ? form?.errors?.cities : ''}
          messageType={form?.errors?.cities ? 'error' : undefined}
          required={currentStep?.isRequired}
          onWppChange={form?.handleChange}
          onWppBlur={form?.handleBlur}
          className={commonStyles.topMargin}
          value={form?.values?.cities}
          id="select"
          data-testid="city"
          list={cities[form?.values?.countries || ''].map(({ id, label }) => ({
            value: id,
            label,
          }))}
        ></WppSelect>
      )}
      <WppToggle
        labelConfig={{ text: 'By registering, I am confirming that I am over 18 years of age, and that I accept the' }}
        onWppChange={handleToggleChange}
        checked={isChecked}
        required
        className={`${styles.agreement} ${!isChecked && styles.agreementDisabled}`}
        data-testid="age"
      />
      <div className={commonStyles.buttonWrapper}>
        <WppButton variant="secondary" onClick={handlePrevStepClick} className={commonStyles.rightMargin}>
          Prev Step
        </WppButton>
        <WppButton
          disabled={!isSubmit}
          className={commonStyles.button}
          onClick={handleSubmitForm}
          data-testid="next-button"
        >
          Next Step
        </WppButton>
      </div>
    </>
  )
}
