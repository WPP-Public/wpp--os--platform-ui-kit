```tsx
import { WppRadioGroup, WppRadio, WppTypography, WppButton } from '@wppopen/components-library-react'
import { WppRadioGroupCustomEvent } from '@wppopen/components-library/dist/types/components'
import { RadioGroupChangeEvent } from '@wppopen/components-library'

export const RadioGroupExample = () => {
  const [value, setValue] = useState('email')

  return (
    <div>
      <WppTypography type={'xl-heading'}>With truncation on warning message</WppTypography>
      <WppRadioGroup
        className={styles.radioGroup}
        value={value}
        message={'Warning message'}
        messageType={'warning'}
        maxMessageLength={10}
        labelConfig={{ text: 'Radio Group', description: 'Radio Group description', icon: 'wpp-icon-info' }}
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

      <h4>Programmatically set value of radio group:</h4>
      <div>
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
```
