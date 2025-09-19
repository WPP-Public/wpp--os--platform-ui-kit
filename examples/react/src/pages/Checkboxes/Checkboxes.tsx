import { WppButton, WppCheckbox, WppCheckboxGroup, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './Checkboxes.module.scss'
import { WppCheckboxGroupCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { CheckboxGroupChangeEvent } from '@platform-ui-kit/components-library'
import { useState } from 'react'
import { CheckboxGroupValue } from '@platform-ui-kit/components-library'

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
    <div className="checkboxes">
      <h3> With Label</h3>
      <WppCheckbox
        className={styles.checkbox}
        labelConfig={{ text: 'Option 1' }}
        name="options 1"
        required
        autoFocus
        data-testid="focus-checkbox"
      />

      <WppCheckbox
        className={styles.checkbox}
        name="options 2"
        labelConfig={{ text: 'Option 2' }}
        data-testid="сheckbox-with-label"
        required
      />

      <WppCheckbox
        className={styles.checkbox}
        labelConfig={{
          icon: 'wpp-icon-info',
          text: 'Option 3',
          description: 'Description',
          locales: {
            optional: 'Optional',
          },
        }}
        name="options 3"
        required
        data-testid="checkbox-with-icon"
      />

      <WppCheckbox
        className={styles.checkbox}
        labelConfig={{
          text: 'Option 4',
        }}
        name="options 4"
        data-testid="checkbox-with-optional-label"
      />

      <WppCheckbox
        className={styles.checkbox}
        labelConfig={{
          text: 'Option 5',
        }}
        name="options 5"
        indeterminate
        required
        data-testid="indeterminate-checkbox"
      />

      <WppCheckbox
        className={styles.checkbox}
        labelConfig={{ text: 'Option 6' }}
        required
        messageType="error"
        message="Error message"
        maxMessageLength={10}
        name="options 6"
        data-testid="checkbox-with-inline-message"
      />

      <div className={styles.checkboxGroupContainer}>
        <div className={styles.checkboxGroupElement}>
          <WppTypography type={'xl-heading'}>With 3 items</WppTypography>
          <WppCheckboxGroup
            labelConfig={{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }}
            className={styles.checkboxGroup}
            value={value}
            onWppChange={handleWppChange}
            required
          >
            {checkboxes.map(checkbox => (
              <WppCheckbox
                key={checkbox.value}
                required
                value={checkbox.value}
                name={checkbox.text}
                labelConfig={{ text: checkbox.text }}
              />
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

        <div className={styles.checkboxGroupElement}>
          <WppTypography type={'xl-heading'}>With error message</WppTypography>
          <WppCheckboxGroup
            className={styles.checkboxGroup}
            value={value}
            labelConfig={{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }}
            message={'Error message'}
            messageType={'error'}
            onWppChange={handleWppChange}
          >
            <WppCheckbox required value="option-1" name="option-1 name" labelConfig={{ text: 'Option-1' }} />
            <WppCheckbox required value="option-2" name="option-2 name" labelConfig={{ text: 'Option-2' }} />
            <WppCheckbox required value="option-3" name="option-3 name" labelConfig={{ text: 'Option-3' }} />
            <WppCheckbox required value="option-4" name="option-4 name" labelConfig={{ text: 'Option-4' }} />
          </WppCheckboxGroup>
        </div>

        <div className={styles.checkboxGroupElement}>
          <WppTypography type={'xl-heading'}>With warning message</WppTypography>
          <WppCheckboxGroup
            className={styles.checkboxGroup}
            value={value}
            labelConfig={{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }}
            message={'Warning message'}
            messageType={'warning'}
            onWppChange={handleWppChange}
          >
            <WppCheckbox required value="option-1" name="option-1 name" labelConfig={{ text: 'Option-1' }} />
            <WppCheckbox required value="option-2" name="option-2 name" labelConfig={{ text: 'Option-2' }} />
            <WppCheckbox required value="option-3" name="option-3 name" labelConfig={{ text: 'Option-3' }} />
            <WppCheckbox required value="option-4" name="option-4 name" labelConfig={{ text: 'Option-4' }} />
            <WppCheckbox required value="option-5" name="option-5 name" labelConfig={{ text: 'Option-5' }} />
          </WppCheckboxGroup>
        </div>

        <div className={styles.checkboxGroupElement}>
          <WppTypography type={'xl-heading'}>With truncation on warning message</WppTypography>
          <WppCheckboxGroup
            className={styles.checkboxGroup}
            value={value}
            labelConfig={{ text: 'Checkbox Group', description: 'Checkbox Group description', icon: 'wpp-icon-info' }}
            message={'Warning message'}
            messageType={'warning'}
            maxMessageLength={10}
            onWppChange={handleWppChange}
          >
            <WppCheckbox required value="option-1" name="option-1 name" labelConfig={{ text: 'Option-1' }} />
            <WppCheckbox required value="option-2" name="option-2 name" labelConfig={{ text: 'Option-2' }} />
            <WppCheckbox required value="option-3" name="option-3 name" labelConfig={{ text: 'Option-3' }} />
            <WppCheckbox required value="option-4" name="option-4 name" labelConfig={{ text: 'Option-4' }} />
            <WppCheckbox required value="option-5" name="option-5 name" labelConfig={{ text: 'Option-5' }} />
          </WppCheckboxGroup>
        </div>
      </div>

      <h3> Without Label</h3>
      <WppCheckbox
        // ariaProps={{ label: 'Option 4' }}
        name={'Option 4'}
        className={styles.checkbox}
        required
        data-testid="checkbox-without-label"
      />
    </div>
  )
}
