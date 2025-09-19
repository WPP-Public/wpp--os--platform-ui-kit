import { useEffect, useState } from 'react'
import styles from './SingleChildDependableSelects.module.scss'
import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { delay } from '@platform-ui-kit/react-example/src/utils'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/dist/types/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import { SELECT_OPTIONS_SINGLE, Value } from './singleSelectConsts'

const SingleChildDependableSelects = () => {
  const [parentSelectValue, setParentSelectValue] = useState<string>('')
  const [firstChildValues, setFirstChildValues] = useState<Value[]>([])
  const [firstChildSelectedValue, setFirstChildSelectedValue] = useState<string>('')

  const [secondChildValues, setSecondChildValues] = useState<Value[]>([])
  const [secondChildSelectedValue, setSecondChildSelectedValue] = useState<string>('')

  const [isLoading, setIsLoading] = useState(false)

  // Function to handle Parent Select change
  const handleParentSelectChange = async (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    setIsLoading(true)
    const selectedValue = event.detail.value

    setParentSelectValue(selectedValue)

    console.log('Parent select event', event)

    await delay(1000) // Simulate API call delay

    // Simulate setting First Child options based on Parent Select value
    let newFirstChildValues: Value[] = []

    if (selectedValue === 'optionA') {
      newFirstChildValues = SELECT_OPTIONS_SINGLE.option1.firstChild
    } else if (selectedValue === 'optionB') {
      newFirstChildValues = SELECT_OPTIONS_SINGLE.option2.firstChild
    }

    setFirstChildValues(newFirstChildValues)

    // Set default selected value for First Child
    if (newFirstChildValues.length > 0) {
      const defaultFirstChildValue = newFirstChildValues[0].value

      setFirstChildSelectedValue(defaultFirstChildValue)
    } else {
      setFirstChildSelectedValue('')
    }

    setIsLoading(false)
  }

  // useEffect to update Second Child options whenever First Child selected value changes
  useEffect(() => {
    const updateSecondChildOptions = async () => {
      if (!parentSelectValue || !firstChildSelectedValue) {
        // Reset Second Child if Parent or First Child has no selection
        setSecondChildValues([])
        setSecondChildSelectedValue('')

        return
      }

      await delay(1000) // Simulate API call delay

      // Simulate setting Second Child options based on Parent and First Child value
      let newSecondChildValues: Value[] = []

      if (parentSelectValue === 'optionA') {
        newSecondChildValues =
          SELECT_OPTIONS_SINGLE.option1.secondChild[
            firstChildSelectedValue as keyof typeof SELECT_OPTIONS_SINGLE.option1.secondChild
          ] || []
      } else if (parentSelectValue === 'optionB') {
        newSecondChildValues =
          SELECT_OPTIONS_SINGLE.option2.secondChild[
            firstChildSelectedValue as keyof typeof SELECT_OPTIONS_SINGLE.option2.secondChild
          ] || []
      }

      setSecondChildValues(newSecondChildValues)

      // Set default selected value for Second Child
      if (newSecondChildValues.length > 0) {
        const defaultSecondChildValue = newSecondChildValues[0].value

        setSecondChildSelectedValue(defaultSecondChildValue)
      } else {
        setSecondChildSelectedValue('')
      }
    }

    updateSecondChildOptions()
  }, [parentSelectValue, firstChildSelectedValue])

  // Function to handle First Child Select change
  const handleFirstChildSelectChange = (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    const selectedValue = event.detail.value

    setFirstChildSelectedValue(selectedValue)

    console.log('First Child select event', event)
  }

  // Function to handle Second Child Select change
  const handleSecondChildSelectChange = (event: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    console.log('Second Child select event', event)
    setSecondChildSelectedValue(event.detail.value)
  }

  // Optional: Debugging useEffect to log values
  useEffect(() => {
    console.log('secondChildValues:', secondChildValues)
    console.log('secondChildSelectedValue:', secondChildSelectedValue)
  }, [secondChildValues, secondChildSelectedValue])

  return (
    <div className={styles.singleSelectContainer}>
      <WppTypography className={styles.title} type="xl-heading">
        Single Select Dropdown Dependency Example
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
        data-testid="parent-select-single"
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
        placeholder="Select First Child Option"
        required
        withFolder
        withSearch
        disabled={!firstChildValues.length}
        labelConfig={{ text: 'First Child' }}
        value={firstChildSelectedValue}
        onWppChange={handleFirstChildSelectChange}
        data-testid="first-child-select-single"
        list={firstChildValues.map(child => ({
          value: child.value,
          label: child.label,
        }))}
      ></WppSelect>

      {/* Second Child Dropdown */}
      <WppSelect
        placeholder="Select Second Child Option"
        required
        withFolder
        withSearch
        disabled={!secondChildValues.length}
        labelConfig={{ text: 'Second Child' }}
        value={secondChildSelectedValue}
        onWppChange={handleSecondChildSelectChange}
        data-testid="second-child-select-single"
        list={secondChildValues.map(child => ({
          value: child.value,
          label: child.label,
        }))}
      ></WppSelect>
    </div>
  )
}

export default SingleChildDependableSelects
