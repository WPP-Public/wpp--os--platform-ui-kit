```tsx
import { WppButton, WppCheckbox, WppCheckboxGroup, WppTypography } from '@wppopen/components-library-react'
import { WppCheckboxGroupCustomEvent } from '@wppopen/components-library/dist/types/components'
import { CheckboxGroupChangeEvent } from '@wppopen/components-library'
import { useState } from 'react'
import { CheckboxGroupValue } from '@wppopen/components-library'

export const CheckboxesPage = () => {
  const [checkboxes, setCheckboxes] = useState([
    {
      value: 'option-1',
      text: 'Option 1',
    },
    {
      value: 'option-2',
      text: 'Option 2',
    },
    {
      value: 'option-3',
      text: 'Option 3',
    },
  ])
  const [value, setValue] = useState<CheckboxGroupValue[]>(['option-1', 'option-2', 'option-3'])

  const handleWppChange = (event: WppCheckboxGroupCustomEvent<CheckboxGroupChangeEvent>) => {
    const eventValue = event.detail.value as CheckboxGroupValue[]

    setValue(eventValue)
  }

  const handleAddOption = () => {
    if (checkboxes.length < 5) {
      setCheckboxes([
        ...checkboxes,
        { value: `option-${checkboxes.length + 1}`, text: `Option ${checkboxes.length + 1}` },
      ])
    }
  }

  return (
    <div>
      <WppTypography type={'xl-heading'}>With 3 items</WppTypography>
      <WppCheckboxGroup
        labelConfig={{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }}
        className={styles.checkboxGroup}
        value={value}
        onWppChange={handleWppChange}
      >
        {checkboxes.map(checkbox => (
          <WppCheckbox key={checkbox.value} required value={checkbox.value} labelConfig={{ text: checkbox.text }} />
        ))}
      </WppCheckboxGroup>

      <WppButton style={{ marginTop: '10px' }} disabled={checkboxes.length === 5} onClick={handleAddOption}>
        Add option
      </WppButton>
      <WppButton
        style={{ marginTop: '10px' }}
        onClick={() => setValue(['option-1', 'option-2', 'option-3', 'option-4', 'option-5'])}
      >
        Select All options
      </WppButton>
    </div>
  )
}
```
