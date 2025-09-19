import { WppButton, WppDatepicker, WppInput, WppSelect } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import React, { useState } from 'react'
import { DatePickerEventDetail } from '@platform-ui-kit/components-library'
import { SAMPLE_LIST_MULTIPLE } from '../../SingleSelect/consts'

const MultiSelectDropDown = () => {
  const [multipleItems, setMultipleItems] = useState<any[] | undefined>(['car', 'long'])
  const [normalInputValue, setNormalInputValue] = useState<string | undefined>(undefined)
  const [dateValue, setDateValue] = useState('')
  const [isDateValid, setDateValid] = useState<boolean | null>(null)
  const [rangeDatePicker, setRangeDatePicker] = useState<string[]>(['19/02/2023', '21/02/2023'])

  const handleResetClick = () => {
    setMultipleItems([])
  }

  const setRandomItems = () => setMultipleItems(['house', 'long', 'car'])

  const setSecondAndThird = () => setMultipleItems(['long', 'house'])

  const clearNormalInput = () => setNormalInputValue(undefined)

  const handleValidateDate = (event: CustomEvent<DatePickerEventDetail>) => {
    const date = event.detail.date

    if (!date) {
      setDateValue('')
      setDateValid(null)

      return
    }

    if (!Array.isArray(date)) {
      const currentYear = new Date().getFullYear()

      setDateValue(date.toDateString())
      setDateValid(currentYear - date.getDate() >= 18 ? true : false)
    }
  }

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-16077">
            Bugfix #16077 - All components based on inputs should be stateless
          </a>
        </h1>
      </div>
      <div className={styles.page}>
        <div className={styles.pageSection}>
          <WppSelect
            placeholder="Choose options"
            type="multiple"
            required
            withFolder
            withSearch
            labelConfig={{ text: 'Multiple Select with search' }}
            onWppChange={(e: CustomEvent) => setMultipleItems(e.detail.value)}
            className={styles.item}
            value={multipleItems}
            list={SAMPLE_LIST_MULTIPLE}
          ></WppSelect>
          <div style={{ marginTop: '20px' }}>
            <WppButton variant="secondary" onClick={handleResetClick} data-testid="reset-button">
              Reset
            </WppButton>
            <WppButton
              class={styles.middleBtn}
              variant="secondary"
              onClick={setRandomItems}
              data-testid="set-version1-button"
            >
              Set First 3 items
            </WppButton>
            <WppButton variant="secondary" onClick={setSecondAndThird} data-testid="set-version2-button">
              Select 2nd and 3rd items
            </WppButton>
          </div>
        </div>

        <div className={styles.pageSection}>
          <WppInput
            name="wpp-input"
            placeholder="Enter text"
            data-testid="regular-m-input"
            required
            autoFocus
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Normal Input',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
            value={normalInputValue}
            onWppChange={e => setNormalInputValue(e.detail.value)}
          />
          <div style={{ marginTop: '20px' }}>
            <WppButton variant="secondary" onClick={clearNormalInput} data-testid="reset-button">
              Reset
            </WppButton>
            <WppButton
              class={styles.middleBtn}
              variant="secondary"
              onClick={() => setNormalInputValue('This is a test')}
              data-testid="set-version1-button"
            >
              Set value: This is a test
            </WppButton>
            <WppButton
              variant="secondary"
              onClick={() => setNormalInputValue('This tries to be better but never is')}
              data-testid="set-version2-button"
            >
              Set value to something else
            </WppButton>
          </div>
        </div>

        <div className={styles.pageSection}>
          <WppDatepicker
            name="datepicker"
            labelConfig={{ text: 'Birthday' }}
            required
            onWppChange={handleValidateDate}
            message={isDateValid === false ? 'Should be more than 18 years old' : undefined}
            className={styles.topMargin}
            value={dateValue}
          />

          <div style={{ marginTop: '20px' }}>
            <WppButton variant="secondary" onClick={() => setDateValue('')} data-testid="reset-button">
              Reset
            </WppButton>
            <WppButton
              class={styles.middleBtn}
              variant="secondary"
              onClick={() => setDateValue('29/10/2023')}
              data-testid="set-datep-button"
            >
              Set date to: 29/10/2023
            </WppButton>
          </div>
        </div>

        <div className={styles.pageSection}>
          <WppDatepicker range value={rangeDatePicker} data-testid="range-datepicker" />

          <div style={{ marginTop: '20px' }}>
            <WppButton variant="secondary" onClick={() => setRangeDatePicker([])} data-testid="reset-button">
              Reset
            </WppButton>
            <WppButton
              class={styles.middleBtn}
              variant="secondary"
              onClick={() => setRangeDatePicker(['29/10/2023', '10/11/2023'])}
              data-testid="set-datep-button"
            >
              Set date to: 29/10/2023 - 10/11/2023
            </WppButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiSelectDropDown
