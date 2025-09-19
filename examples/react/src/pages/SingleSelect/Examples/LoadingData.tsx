import React, { useEffect, useState } from 'react'
import styles from '../SingleSelect.module.scss'
import { WppButton, WppDivider, WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_1, SAMPLE_LIST_2, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const LoadingData = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? [] : '')
  const [list, setList] = useState(SAMPLE_LIST_2)
  const [loadingData, setLoadingData] = useState(false)
  const [shouldRequestData, setShouldRequestData] = useState(false)

  useEffect(() => {
    setLoadingData(true)

    setTimeout(() => {
      setList(shouldRequestData ? SAMPLE_LIST_1 : SAMPLE_LIST_2)

      setLoadingData(false)
    }, 2000)
  }, [shouldRequestData])

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario 06: Loading data in select.
      </WppTypography>

      <div className={styles.selects}>
        <WppSelect
          withFolder
          type={type}
          required
          name="select-component"
          className={styles.selectItem}
          data-testid={`loading-${type}-select-m`}
          labelConfig={{
            text: 'Size M',
          }}
          placeholder={'Choose option'}
          value={value}
          loading={loadingData}
          list={list}
          onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
            console.log(`On Change ${type}`, e.detail)

            setValue(e.detail.value)
          }}
        />

        {type !== 'text' && (
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`loading-${type}-select-s`}
            labelConfig={{
              text: 'Size S',
            }}
            placeholder={'Choose option'}
            loading={loadingData}
            size="s"
            value={value}
            list={list}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
          />
        )}
      </div>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={() => setShouldRequestData(!shouldRequestData)}>
          Request new data
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default LoadingData
