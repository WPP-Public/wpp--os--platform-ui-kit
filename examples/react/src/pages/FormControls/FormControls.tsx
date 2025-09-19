import { useState } from 'react'
import { WppTabs, WppTab } from '@platform-ui-kit/components-library-react'

import { FormVanillaJs } from './components/FormVanillaJs/FormVanillaJs'
import { FormFormik } from './components/FormFormik/FormFormik'
import { FormWizard } from './components/FormWizard/FormWizard'

import styles from './FormControls.module.scss'

const RegularForms = () => (
  <div className={styles.wrapper}>
    <h3>Vanilla JS form with custom validation</h3>
    <FormVanillaJs />
    <h3>Form with Formik.js</h3>
    <FormFormik />
  </div>
)

export const FormControlsPage = () => {
  const [currentTab, setCurrentTab] = useState('regularForm')

  const handleTabChange = (event: CustomEvent) => {
    setCurrentTab(event.detail.value)
  }

  return (
    <div className={styles.wrapper}>
      <WppTabs value={currentTab} onWppChange={handleTabChange}>
        <WppTab value="regularForm">Regular Forms</WppTab>
        <WppTab value="wizardForm" data-testid="wizard-tab">
          Wizard Form
        </WppTab>
      </WppTabs>
      <div className={styles.content}>
        {
          {
            regularForm: <RegularForms />,
            wizardForm: <FormWizard />,
          }[currentTab]
        }
      </div>
    </div>
  )
}
