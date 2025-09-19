import { WppSelect } from '@platform-ui-kit/components-library-react'
import styles from './SelectsVC.module.scss'
import { useState } from 'react'
import { CustomValueObject } from './Examples/CustomValueObject'

export const SelectsVCPage = () => {
  const [value, setValue] = useState('')
  const [valueMultiple, setValueMultiple] = useState([])
  const [multipleCustom, setMultipleCustom] = useState([
    { id: 'item-0', name: 'Item 1' },
    { id: 'item-1', name: 'Item 2' },
  ])

  return (
    <div>
      <h2>Dropdown Sizes</h2>
      <div className={styles.selectRange}>
        {[...new Array(10)].map((_, i) => (
          <WppSelect
            key={`single-select-${i}`}
            name={`wpp-single-select-${i}`}
            type="single"
            size="m"
            placeholder="Choose options"
            className={styles.item}
            required
            withSearch
            value={value}
            labelConfig={{ text: `Select ${i + 1} items` }}
            onWppChange={e => {
              console.log('Event name: ', e.detail.name)
              setValue(e.detail.value)
            }}
            list={[...new Array(i + 1)].map((_, index) => ({
              value: index + 1,
              label: `Item ${index + 1}`,
              slots: [{ type: 'p', props: { slot: 'cation', children: 'Item caption' } }],
            }))}
          ></WppSelect>
        ))}
      </div>

      <div className={styles.selectRange}>
        {[...new Array(10)].map((_, i) => (
          <WppSelect
            key={`multiple-select-${i}`}
            name={`wpp-multiple-select-${i}`}
            type="multiple"
            size="m"
            placeholder="Choose options"
            className={styles.item}
            required
            withSearch
            withFolder
            value={valueMultiple}
            labelConfig={{ text: `Select ${i + 1} items` }}
            onWppChange={e => {
              console.log('Event name: ', e.detail.name)
              setValueMultiple(e.detail.value)
            }}
            list={[...new Array(i + 1)].map((_, index) => ({
              value: index + 1,
              label: `Item ${index + 1}`,
              slots: [{ type: 'p', props: { slot: 'cation', children: 'Item caption' } }],
            }))}
          ></WppSelect>
        ))}
      </div>

      <div className={styles.multiple} style={{ width: '33%' }}>
        <WppSelect
          name="wpp-multiple-select-object"
          type="multiple"
          size="m"
          placeholder="Choose options"
          className={styles.item}
          required
          withFolder
          value={multipleCustom}
          withSearch
          onWppChange={(event: CustomEvent) => setMultipleCustom(event.detail.value)}
          labelConfig={{ text: 'Multiple Select with object values' }}
          list={[...new Array(10)].map((_, index) => ({
            value: { id: `item-${index}`, name: `Item ${index + 1}` },
            label: `Item ${index + 1}`,
            slots: [{ type: 'p', props: { slot: 'cation', children: 'Item caption' } }],
          }))}
        ></WppSelect>
      </div>

      <div className={styles.row}>
        <CustomValueObject />
        <CustomValueObject
          initialValue={{
            number: 123,
            name: 'House',
            additionalField: true,
          }}
        />
        <CustomValueObject multiple />
        <CustomValueObject
          multiple
          initialValue={[
            {
              number: 234,
              name: 'House',
              additionalField: true,
            },
          ]}
        />
      </div>
    </div>
  )
}
