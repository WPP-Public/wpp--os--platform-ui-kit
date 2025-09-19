```tsx
import { ListItemInterface } from '@platform-ui-kit/components-library'
import { WppSelect, WppIconClock } from '@platform-ui-kit/components-library-react'

const SAMPLE_LIST: ListItemInterface[] = [
  {
    label: 'This is the end',
    value: 'end',
    slots: [
      {
        type: 'wpp-icon-plus',
        props: {
          slot: 'left',
        },
      },
    ],
  },
  {
    label: 'Tree',
    value: 'tree',
    checked: true,
  },
  {
    label: 'Car',
    value: 'car',
    disabled: true,
  },
  {
    label: 'House',
    value: 'house',
    slots: [
      {
        type: 'wpp-icon-success',
        props: {
          slot: 'right',
        },
      },
    ],
  },
  {
    label: 'Magazine',
    value: 'magazine',
    slots: [
      {
        type: 'wpp-icon-plus',
        props: {
          slot: 'left',
        },
      },
    ],
  },
  {
    label: 'Website',
    value: 'website',
  },
]

export const SelectExample = () => {
  const [value, setValue] = useState<string>('')

  return (
    <WppSelect
      name="select-component"
      className={styles.selectItem}
      list={SAMPLE_LIST}
      labelConfig={{
        text: 'Single Select size M',
      }}
      placeholder="Choose option"
      value={value}
      autoFocus
      onWppChange={(e: CustomEvent) => {
        console.log('On Change single', e.detail)

        setValue(e.detail.value)
      }}
    >
      <WppIconClock slot="icon-start" />
    </WppSelect>
  )
}
```

```tsx
import { useState } from 'react'
import { h } from '@stencil/core'
import { ListItemInterface } from '@platform-ui-kit/components-library'
import { WppSelect } from '@platform-ui-kit/components-library-react'

export const SAMPLE_LIST: ListItemInterface[] = [
  {
    id: 1,
    label: 'None',
    value: '',
  },
  {
    id: 2,
    label: 'UAH',
    value: 'uah',
  },
  {
    id: 3,
    label: 'USD',
    value: 'usd',
  },
  {
    id: 4,
    label: 'EUR',
    value: 'eur',
  },
]

export const SelectCombinedExample = () => {
  const [value, setValue] = useState('usd')
  const [inputValue, setInputValue] = useState('100')

  const handleWppChange = (e: CustomEvent) => {
    const { value: newValue, inputValue: newInputValue } = e.detail

    setValue(newValue)
    setInputValue(newInputValue)
    console.log('WppChange event:', newValue, newInputValue)
  }

  return (
    <div>
      <h1>Selects Combined</h1>
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
        list={SAMPLE_LIST}
      />
    </div>
  )
}
```
