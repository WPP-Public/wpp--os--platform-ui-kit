import React, { useState } from 'react'
import styles from './index.module.scss'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { delay } from '@platform-ui-kit/react-example/src/utils'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import { MULTIPLE_VALUES, SELECTED_MULTIPLE_VALUES, SELECTED_SINGLE_VALUE, SINGLE_VALUES, Value } from './consts'

const DependableSelectsIssue = () => {
  const [multipleSelectValues, setMultipleSelectValues] = useState<Value[]>([])
  const [multipleSelectedValues, setMultipleSelectedValues] = useState<string[]>([])

  const [singleSelectValues, setSingleSelectValues] = useState<Value[]>([])
  const [singleSelectedValue, setSingleSelectedValue] = useState<string>('')

  const [isLoading, setIsLoading] = useState(false)

  const setValuesForMultipleSelect = () => {
    setMultipleSelectValues(MULTIPLE_VALUES)
    setMultipleSelectedValues(SELECTED_MULTIPLE_VALUES)
  }

  const setValuesForSingleSelect = () => {
    setSingleSelectValues(SINGLE_VALUES)
    setSingleSelectedValue(SELECTED_SINGLE_VALUE)
  }

  const handleParentSelectChange = async (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    setIsLoading(true)

    console.log('Parent select event', event)

    await delay(2000)

    setValuesForMultipleSelect()
    setValuesForSingleSelect()

    setIsLoading(false)
  }

  const handleMultipleSelectChange = (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    console.log('Multiple select event', event)
    setMultipleSelectedValues(event.detail.value)
  }

  const handleSingleSelectChange = (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    console.log('Single select event', event)
    setSingleSelectedValue(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <WppTypography className={styles.title} type="xl-heading">
        After value is selected in first select, API call is triggered. Wait for 2 seconds (until "Data is loading" text
        disappears). New values should be available in "Multiple" and "Single" select.
      </WppTypography>

      <WppSelect
        placeholder="Choose option"
        required
        withFolder
        withSearch
        labelConfig={{ text: 'Parent Select' }}
        onWppChange={handleParentSelectChange}
        data-testid="parent-single-select"
        list={[
          {
            value: 'tree',
            label: 'Tree',
          },
          {
            value: 'car',
            label: 'Car',
            disabled: true,
          },
          {
            value: 'House',
            label: 'house',
          },
        ]}
      ></WppSelect>

      {isLoading && (
        <WppTypography className={styles.loading} type="l-body">
          Data is loading
        </WppTypography>
      )}

      <WppSelect
        placeholder="Choose options"
        type="multiple"
        value={multipleSelectedValues}
        required
        withFolder
        withSearch
        labelConfig={{ text: 'Multiple Select' }}
        onWppChange={handleMultipleSelectChange}
        data-testid="multiple-select"
        className={styles.secondSelect}
        list={multipleSelectValues.map(item => ({
          value: item.value,
          label: item.label,
        }))}
      ></WppSelect>

      <WppSelect
        placeholder="Choose option"
        value={singleSelectedValue}
        required
        withFolder
        withSearch
        labelConfig={{ text: 'Single Select' }}
        onWppChange={handleSingleSelectChange}
        data-testid="single-select"
        className={styles.secondSelect}
        list={singleSelectValues.map(item => ({
          value: item.value,
          label: item.label,
        }))}
      ></WppSelect>
    </div>
  )
}

export default DependableSelectsIssue
