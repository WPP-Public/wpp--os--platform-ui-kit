import { useState } from 'react'
import { WppSelect } from '@platform-ui-kit/components-library-react'
import styles from './SelectsCombinedVC.module.scss'
import { SAMPLE_LIST_COMBINED } from '../../SingleSelect/consts'

const LIST = [...SAMPLE_LIST_COMBINED]

export const SelectsCombinedVCPage = () => {
  const [value, setValue] = useState('usd')
  const [inputValue, setInputValue] = useState('100')

  const handleWppChange = (e: CustomEvent) => {
    const { value: newValue, inputValue: newInputValue } = e.detail

    setValue(newValue)
    setInputValue(newInputValue)
    console.log('WppChange event:', newValue, newInputValue)
  }

  return (
    <div className={styles.container}>
      <h1 className="title">Selects Combined</h1>

      <h3 className="subtitle">Size M</h3>
      <div className={styles.variants}>
        <WppSelect
          type="combined"
          name="combined-select"
          value={value}
          inputValue={inputValue}
          placeholder="Placeholder"
          size="m"
          disabled={false}
          required
          labelConfig={{ text: 'Currency' }}
          dropdownWidth="auto"
          onWppChange={handleWppChange}
          list={LIST}
        ></WppSelect>

        <WppSelect
          type="combined"
          name="combined-select"
          value={value}
          inputValue={inputValue}
          placeholder="Placeholder"
          size="m"
          disabled={true}
          required
          labelConfig={{ text: 'Currency' }}
          dropdownWidth="auto"
          onWppChange={handleWppChange}
          list={LIST}
        ></WppSelect>
      </div>

      <h3 className="subtitle">Size S</h3>
      <div className={styles.variants}>
        <WppSelect
          type="combined"
          name="combined-select"
          value={value}
          inputValue={inputValue}
          placeholder="Placeholder"
          size="s"
          disabled={false}
          required
          labelConfig={{ text: 'Currency' }}
          dropdownWidth="auto"
          onWppChange={handleWppChange}
          list={LIST}
        ></WppSelect>

        <WppSelect
          type="combined"
          name="combined-select"
          value={value}
          inputValue={inputValue}
          placeholder="Placeholder"
          size="s"
          disabled={true}
          required
          labelConfig={{ text: 'Currency' }}
          dropdownWidth="auto"
          onWppChange={handleWppChange}
          list={LIST}
        ></WppSelect>
      </div>
    </div>
  )
}
