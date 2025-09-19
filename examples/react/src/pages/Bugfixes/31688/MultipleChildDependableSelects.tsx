import { useEffect, useState } from 'react'
import styles from './MultipleChildDependableSelects.module.scss'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { delay } from '@platform-ui-kit/react-example/src/utils'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import { SELECT_OPTIONS_MULTIPLE, Value } from './multipleSelectConsts'

const MultipleChildDependableSelects = () => {
  const [parentSelectValue, setParentSelectValue] = useState<string>('')
  const [firstChildValues, setFirstChildValues] = useState<Value[]>([])
  const [firstChildSelectedValues, setFirstChildSelectedValues] = useState<string[]>([])

  const [secondChildValues, setSecondChildValues] = useState<Value[]>([])
  const [secondChildSelectedValues, setSecondChildSelectedValues] = useState<string[]>([])

  const [isLoading, setIsLoading] = useState(false)

  // Function to handle Parent Select change
  const handleParentSelectChange = async (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    setIsLoading(true)
    const selectedValue = event.detail.value as string

    setParentSelectValue(selectedValue)

    console.log('Parent select event', event)

    await delay(1000) // Simulate API call delay

    // Simulate setting First Child options based on Parent Select value
    let newFirstChildValues: Value[] = []

    if (selectedValue === 'optionA') {
      newFirstChildValues = SELECT_OPTIONS_MULTIPLE.optionA.firstChild
    } else if (selectedValue === 'optionB') {
      newFirstChildValues = SELECT_OPTIONS_MULTIPLE.optionB.firstChild
    }

    setFirstChildValues(newFirstChildValues)

    // Select only the first two values by slicing
    const defaultFirstChildValues = newFirstChildValues.slice(0, 2).map(child => child.value)

    setFirstChildSelectedValues(defaultFirstChildValues)

    setIsLoading(false)
  }

  // useEffect to update Second Child options whenever Parent or First Child selected values change
  useEffect(() => {
    const updateSecondChildOptions = async () => {
      if (!parentSelectValue || firstChildSelectedValues.length === 0) {
        // Reset Second Child if Parent or First Child has no selection
        setSecondChildValues([])
        setSecondChildSelectedValues([])

        return
      }

      await delay(1000) // Simulate API call delay

      // Aggregate all secondChild options based on multiple firstChild selections
      let aggregatedSecondChildValues: Value[] = []

      firstChildSelectedValues.forEach(selectedFirstChild => {
        const options =
          SELECT_OPTIONS_MULTIPLE[parentSelectValue as 'optionA' | 'optionB'].secondChild[
            selectedFirstChild as keyof (typeof SELECT_OPTIONS_MULTIPLE)['optionA' | 'optionB']['secondChild']
          ] || []

        aggregatedSecondChildValues = [...aggregatedSecondChildValues, ...options]
      })

      // Remove duplicates
      const uniqueSecondChildValues = Array.from(
        new Map(aggregatedSecondChildValues.map(item => [item.value, item])).values(),
      )

      setSecondChildValues(uniqueSecondChildValues)

      // Set default selected values for Second Child
      const defaultSecondChildValues = uniqueSecondChildValues
        .filter((_, index) => index % 2 === 0)
        .map(child => child.value)

      setSecondChildSelectedValues(defaultSecondChildValues)
    }

    updateSecondChildOptions()
  }, [parentSelectValue, firstChildSelectedValues])

  // Function to handle First Child Select change
  const handleFirstChildSelectChange = (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    const selectedValues = event.detail.value as string[]

    setFirstChildSelectedValues(selectedValues)

    console.log('First Child select event', event)
  }

  // Function to handle Second Child Select change
  const handleSecondChildSelectChange = (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    const selectedValues = event.detail.value as string[]

    console.log('Second Child select event', event)
    setSecondChildSelectedValues(selectedValues)
  }

  // Optional: Debugging useEffect to log values
  useEffect(() => {
    console.log('secondChildValues:', secondChildValues)
    console.log('secondChildSelectedValues:', secondChildSelectedValues)
  }, [secondChildValues, secondChildSelectedValues])

  return (
    <div className={styles.multipleSelectContainer}>
      <WppTypography className={styles.title} type="xl-heading">
        Multiple Select Dropdown Dependency Example
      </WppTypography>

      {/* Parent Dropdown */}
      <WppSelect
        placeholder="Select Parent Option"
        required
        withFolder
        withSearch
        labelConfig={{ text: 'Parent Select' }}
        onWppChange={handleParentSelectChange}
        value={parentSelectValue}
        data-testid="parent-select-multiple"
        list={[
          {
            value: 'optionA',
            label: 'Parent Option A',
          },
          {
            value: 'optionB',
            label: 'Parent Option B',
          },
        ]}
      ></WppSelect>

      {isLoading && (
        <WppTypography className={styles.loading} type="l-body">
          Data is loading...
        </WppTypography>
      )}

      {/* First Child Dropdown */}
      <WppSelect
        placeholder="Select First Child Options"
        required
        withFolder
        withSearch
        type="multiple"
        disabled={!firstChildValues.length}
        labelConfig={{ text: 'First Child' }}
        value={firstChildSelectedValues}
        onWppChange={handleFirstChildSelectChange}
        data-testid="first-child-select-multiple"
        list={firstChildValues.map(child => ({
          value: child.value,
          label: child.label,
        }))}
      ></WppSelect>

      {/* Second Child Dropdown */}
      <WppSelect
        placeholder="Select Second Child Options"
        required
        withFolder
        withSearch
        type="multiple"
        disabled={!secondChildValues.length}
        labelConfig={{ text: 'Second Child' }}
        value={secondChildSelectedValues}
        onWppChange={handleSecondChildSelectChange}
        data-testid="second-child-select-multiple"
        list={secondChildValues.map(child => ({
          value: child.value,
          label: child.label,
        }))}
      ></WppSelect>
    </div>
  )
}

export default MultipleChildDependableSelects
