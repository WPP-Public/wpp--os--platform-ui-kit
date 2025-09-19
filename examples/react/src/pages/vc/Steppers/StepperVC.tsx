import { useState } from 'react'
import { WppTabs, WppTab } from '@platform-ui-kit/components-library-react'
import { VerticalStepper } from './VerticalStepperVC'
import { HorizontalStepper } from './HorizontalStepperVC'
import styles from './StepperVC.module.scss'
import { DecimalVerticalStepper } from './DecimalVerticalStepperVC'
import { VerticalStepperWWidth } from './VerticalStepperWidth'

export const StepperVCPage = () => {
  const [currentTab, setCurrentTab] = useState('vertical')

  const handleTabChange = (event: CustomEvent) => {
    console.log('handleTabChange', event)
    setCurrentTab(event.detail.value)
  }

  return (
    <div className={styles.tabs} data-testid="stepper">
      <WppTabs value={currentTab} onWppChange={handleTabChange}>
        <WppTab value="vertical">Vertical Stepper</WppTab>
        <WppTab value="verticalStepperWidthWidth">Vertical Stepper with width</WppTab>
        <WppTab value="verticalStepperWithDecimalSubSteps">Vertical Stepper with decimal sub steps</WppTab>
        <WppTab value="horizontal">Horizontal Stepper</WppTab>
      </WppTabs>
      <div className={styles.content}>
        {
          {
            vertical: <VerticalStepper />,
            verticalStepperWithDecimalSubSteps: <DecimalVerticalStepper />,
            verticalStepperWidthWidth: <VerticalStepperWWidth />,
            horizontal: <HorizontalStepper />,
          }[currentTab]
        }
      </div>
    </div>
  )
}
