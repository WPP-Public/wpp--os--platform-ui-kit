import { WppRadio, WppRadioGroup, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './RadioButtons.module.scss'
import { useState } from 'react'
import { WppButton } from '@platform-ui-kit/components-library-react'
import { WppRadioGroupCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { RadioGroupChangeEvent } from '@platform-ui-kit/components-library'
import { RadioGroupValue } from '@platform-ui-kit/components-library'

export const RadioButtonsPage = () => {
  const [value, setValue] = useState<RadioGroupValue>('option-1')

  return (
    <div className="radioButtons">
      <h3>With Label</h3>
      <WppRadio
        name="wpp-radio-1"
        className={styles.item}
        labelConfig={{ text: 'Option 1' }}
        required
        autoFocus
        data-testid="focus-radio-button"
      />

      <WppRadio
        name="wpp-radio-2"
        className={styles.item}
        labelConfig={{ text: 'Option 2' }}
        required
        data-testid="radio-button-with-label"
      />

      <WppRadio
        name="wpp-radio-3"
        className={styles.item}
        labelConfig={{
          icon: 'wpp-icon-info',
          text: 'Option 3',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }}
        required
        data-testid="radio-button-with-icon"
      />

      <WppRadio
        className={styles.item}
        labelConfig={{ text: 'Option 4' }}
        data-testid="radio-button-with-optional-label"
      />

      <WppRadio name="wpp-radio-4" className={styles.item} labelConfig={{ text: 'Option 5' }} disabled required />

      <WppRadio
        name="wpp-radio-5"
        className={styles.item}
        labelConfig={{ text: 'Hover test' }}
        data-testid="hover-radio-button"
        required
      />

      <h3>Without Label</h3>
      <WppRadio className={styles.item} required data-testid="radio-button-without-label" />

      <h3>Radio Groups</h3>

      <div className={styles.radioGroupContainer}>
        <div className={styles.radioGroupElement}>
          <WppTypography type={'xl-heading'}>With 3 items</WppTypography>
          <WppRadioGroup
            className={styles.radioGroup}
            value={value}
            onWppChange={(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) =>
              setValue(e.detail.value as RadioGroupValue)
            }
            labelConfig={{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }}
          >
            <WppRadio required value="option-1" labelConfig={{ text: 'Option-1' }} />
            <WppRadio required value="option-2" labelConfig={{ text: 'Option-2' }} />
            <WppRadio required value="option-3" labelConfig={{ text: 'Option-3' }} />
          </WppRadioGroup>
        </div>

        <div className={styles.radioGroupElement}>
          <WppTypography type={'xl-heading'}>With error message</WppTypography>
          <WppRadioGroup
            className={styles.radioGroup}
            value={value}
            labelConfig={{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }}
            message={'Error message'}
            messageType={'error'}
            onWppChange={(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) =>
              setValue(e.detail.value as RadioGroupValue)
            }
          >
            <WppRadio required value="option-1" labelConfig={{ text: 'Option-1' }} />
            <WppRadio required value="option-2" labelConfig={{ text: 'Option-2' }} />
            <WppRadio required value="option-3" labelConfig={{ text: 'Option-3' }} />
            <WppRadio required value="option-4" labelConfig={{ text: 'Option-4' }} />
          </WppRadioGroup>
        </div>

        <div className={styles.radioGroupElement}>
          <WppTypography type={'xl-heading'}>With warning message</WppTypography>
          <WppRadioGroup
            className={styles.radioGroup}
            value={value}
            labelConfig={{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }}
            message={'Warning message'}
            messageType={'warning'}
            onWppChange={(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) =>
              setValue(e.detail.value as RadioGroupValue)
            }
          >
            <WppRadio required value="option-1" labelConfig={{ text: 'Option-1' }} />
            <WppRadio required value="option-2" labelConfig={{ text: 'Option-2' }} />
            <WppRadio required value="option-3" labelConfig={{ text: 'Option-3' }} />
            <WppRadio required value="option-4" labelConfig={{ text: 'Option-4' }} />
            <WppRadio required value="option-5" labelConfig={{ text: 'Option-5' }} />
          </WppRadioGroup>
        </div>

        <div className={styles.radioGroupElement}>
          <WppTypography type={'xl-heading'}>With truncation on warning message</WppTypography>
          <WppRadioGroup
            className={styles.radioGroup}
            value={value}
            labelConfig={{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }}
            message={'Warning message'}
            messageType={'warning'}
            maxMessageLength={10}
            onWppChange={(e: WppRadioGroupCustomEvent<RadioGroupChangeEvent>) =>
              setValue(e.detail.value as RadioGroupValue)
            }
          >
            <WppRadio required value="option-1" labelConfig={{ text: 'Option-1' }} />
            <WppRadio required value="option-2" labelConfig={{ text: 'Option-2' }} />
            <WppRadio required value="option-3" labelConfig={{ text: 'Option-3' }} />
            <WppRadio required value="option-4" labelConfig={{ text: 'Option-4' }} />
            <WppRadio required value="option-5" labelConfig={{ text: 'Option-5' }} />
          </WppRadioGroup>
        </div>
      </div>

      <h4>Programmatically set value of radio group:</h4>
      <div className={styles.buttons}>
        <WppButton size="s" variant="secondary" onClick={() => setValue('option-1')}>
          Set option-1
        </WppButton>
        <WppButton size="s" variant="secondary" onClick={() => setValue('option-2')}>
          Set option-2
        </WppButton>
        <WppButton size="s" variant="secondary" onClick={() => setValue('option-3')}>
          Set option-3
        </WppButton>
        <WppButton size="s" variant="secondary" onClick={() => setValue('')}>
          Reset
        </WppButton>
      </div>
    </div>
  )
}
