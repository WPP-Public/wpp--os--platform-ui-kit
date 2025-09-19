import React, { useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppButton, WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_1, SAMPLE_LIST_2, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const TestingSearch = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? [] : '')
  const [list, setList] = useState(SAMPLE_LIST_2)

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 02: Testing Search
      </WppTypography>

      <WppTypography className={styles.subTitle} type="l-body">
        When search = "auto", the search is displayed only when the number of list items is {'>='} 10
      </WppTypography>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`search-auto-${type}-select-m`}
          labelConfig={{
            text: 'Size M - withSearch = "auto"',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          withSearch="auto"
        />

        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`search-auto-${type}-select-s`}
          labelConfig={{
            text: 'Size S - withSearch = "auto"',
          }}
          placeholder={'Choose option'}
          size="s"
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          withSearch="auto"
        />
      </div>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`search-true-${type}-select-m`}
          labelConfig={{
            text: 'Size M - withSearch = true',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          withSearch={true}
        />

        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`search-true-${type}-select-s`}
          labelConfig={{
            text: 'Size S  - withSearch = true',
          }}
          placeholder={'Choose option'}
          size="s"
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          withSearch={true}
        />
      </div>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`search-false-${type}-select-m`}
          labelConfig={{
            text: 'Size M - withSearch = false',
          }}
          placeholder={'Choose option'}
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          withSearch={false}
        />

        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`search-false-${type}-select-s`}
          labelConfig={{
            text: 'Size S  - withSearch = false',
          }}
          placeholder={'Choose option'}
          size="s"
          value={value}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
          withSearch={false}
        />
      </div>

      <div className={styles.actions}>
        <WppButton
          className={styles.buttonItem}
          onClick={() => setList(list.length === SAMPLE_LIST_2.length ? SAMPLE_LIST_1 : SAMPLE_LIST_2)}
        >
          Change list to: {list.length === SAMPLE_LIST_2.length ? '6 items' : '20 items'}
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default TestingSearch
