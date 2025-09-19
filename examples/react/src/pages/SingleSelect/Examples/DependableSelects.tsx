import React, { useEffect, useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import {
  ListItemInterface,
  SelectTypes,
  WppSelectCustomEvent,
} from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import DependableMultipleSelects from './components/DependableMultipleSelects'

const CONTINENTS: ListItemInterface[] = [
  {
    id: 1,
    label: 'Europe',
    value: 'europe',
  },
  {
    id: 2,
    label: 'Asia',
    value: 'asia',
  },
  {
    id: 3,
    label: 'Africa',
    value: 'africa',
  },
]

const EUROPE_COUNTRIES_1 = [
  {
    id: 1,
    label: 'France',
    value: 'france',
  },
  {
    id: 2,
    label: 'Spain',
    value: 'spain',
  },
  {
    id: 3,
    label: 'Germany',
    value: 'germany',
  },
]
const ASIA_COUNTRIES_1 = [
  {
    id: 1,
    label: 'China',
    value: 'china',
  },
  {
    id: 2,
    label: 'India',
    value: 'india',
  },
  {
    id: 3,
    label: 'Singapore',
    value: 'singapore',
  },
]
const AFRICA_COUNTRIES_1 = [
  {
    id: 1,
    label: 'Nigeria',
    value: 'nigeria',
  },
  {
    id: 2,
    label: 'Egypt',
    value: 'egypt',
  },
  {
    id: 3,
    label: 'South Africa',
    value: 'south_africa',
  },
]

const EUROPE_COUNTRIES_2 = [
  {
    id: 1,
    label: 'Romania',
    value: 'romania',
  },
  {
    id: 2,
    label: 'Ukraine',
    value: 'ukraine',
  },
  {
    id: 3,
    label: 'Poland',
    value: 'poland',
  },
]
const ASIA_COUNTRIES_2 = [
  {
    id: 1,
    label: 'Vietnam',
    value: 'vietnam',
  },
  {
    id: 2,
    label: 'Japan',
    value: 'japan',
  },
  {
    id: 3,
    label: 'South Korea',
    value: 'south_korea',
  },
]
const AFRICA_COUNTRIES_2 = [
  {
    id: 1,
    label: 'Mali',
    value: 'mali',
  },
  {
    id: 2,
    label: 'Somalia',
    value: 'somalia',
  },
  {
    id: 3,
    label: 'Ethiopia',
    value: 'ethiopia',
  },
]

const DependableSelects = ({ type }: { type: SelectTypes }) => {
  const [parentValue, setParentValue] = useState<string | string[]>(type === 'multiple' ? [] : '')
  const [child1Value, setChild1Value] = useState(type === 'multiple' ? [] : '')
  const [child2Value, setChild2Value] = useState(type === 'multiple' ? [] : '')
  const [child1List, setChild1List] = useState<ListItemInterface[]>([])
  const [child2List, setChild2List] = useState<ListItemInterface[]>([])

  useEffect(() => {
    if (type === 'multiple') {
      let finalChildList1: ListItemInterface[] = []
      let finalChildList2: ListItemInterface[] = []

      if (parentValue.includes('europe')) {
        finalChildList1 = EUROPE_COUNTRIES_1
        finalChildList2 = EUROPE_COUNTRIES_2
      }

      if (parentValue.includes('asia')) {
        finalChildList1 = [...finalChildList1, ...ASIA_COUNTRIES_1]
        finalChildList2 = [...finalChildList2, ...ASIA_COUNTRIES_2]
      }

      if (parentValue.includes('africa')) {
        finalChildList1 = [...finalChildList1, ...AFRICA_COUNTRIES_1]
        finalChildList2 = [...finalChildList2, ...AFRICA_COUNTRIES_2]
      }

      setChild1List(finalChildList1)
      setChild2List(finalChildList2)
    } else {
      if (parentValue === 'europe') {
        setChild1List(EUROPE_COUNTRIES_1)
        setChild2List(EUROPE_COUNTRIES_2)
      } else if (parentValue === 'asia') {
        setChild1List(ASIA_COUNTRIES_1)
        setChild2List(ASIA_COUNTRIES_2)
      } else {
        setChild1List(AFRICA_COUNTRIES_1)
        setChild2List(AFRICA_COUNTRIES_2)
      }
    }
  }, [parentValue])

  const handleParentChange = (e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
    console.log(`On Change ${type}`, e.detail)

    setParentValue(e.detail.value)
  }

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 03: Dependable Selects
      </WppTypography>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`dependable-parent-${type}-select-m`}
          labelConfig={{
            text: 'Size M - Parent select',
          }}
          placeholder={'Choose option'}
          value={parentValue}
          list={CONTINENTS}
          onWppChange={handleParentChange}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`dependable-parent-${type}-select-s`}
            labelConfig={{
              text: 'Size S - Parent Select',
            }}
            placeholder={'Choose option'}
            size="s"
            value={parentValue}
            list={CONTINENTS}
            onWppChange={handleParentChange}
          />
        )}
      </div>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`dependable-child-1-${type}-select-m`}
          labelConfig={{
            text: 'Size M - Child 01 select',
          }}
          placeholder={'Choose option'}
          list={child1List}
          value={child1Value}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setChild1Value(e.detail.value)
          }}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`dependable-child-1-${type}-select-s`}
            labelConfig={{
              text: 'Size S - Child 01 Select',
            }}
            placeholder={'Choose option'}
            size="s"
            value={child1Value}
            list={child1List}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setChild1Value(e.detail.value)
            }}
          />
        )}
      </div>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`dependable-child-2-${type}-select-m`}
          labelConfig={{
            text: 'Size M - Child 02 select',
          }}
          placeholder={'Choose option'}
          value={child2Value}
          list={child2List}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setChild2Value(e.detail.value)
          }}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`dependable-child-2-${type}-select-s`}
            labelConfig={{
              text: 'Size S - Child 02 Select',
            }}
            placeholder={'Choose option'}
            value={child2Value}
            size="s"
            list={child2List}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setChild2Value(e.detail.value)
            }}
          />
        )}
      </div>

      {type === 'multiple' || type === 'single' ? (
        <div className={styles.multipleSelectsEx}>
          <DependableMultipleSelects type={type} />
        </div>
      ) : null}

      <WppDivider />
    </div>
  )
}

export default DependableSelects
