import {
  WppIconDataViewList,
  WppIconGrid,
  WppIconSearch,
  WppInput,
  WppSegmentedControl,
  WppSegmentedControlItem,
  WppSelect,
} from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import { useState } from 'react'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'
import { SAMPLE_LIST_2 } from '../../SingleSelect/consts'

const SizeSComponentsHeights = () => {
  const [value, setValue] = useState([])

  return (
    <div>
      <h2>S Size</h2>
      <div className={styles.container}>
        <div>
          <p>Select</p>
          <WppSelect
            size="s"
            class={styles.select}
            withFolder
            onWppChange={(event: WppSelectCustomEvent<SelectChangeEventDetail>): void => {
              setValue(event.detail.value)
            }}
            value={value}
            type="multiple"
            withSearch
            list={SAMPLE_LIST_2}
          ></WppSelect>
        </div>

        <div>
          <p>Input</p>
          <WppInput name="wpp-input" placeholder="Enter text" data-testid="search-icon-m-input" required size="s">
            <WppIconSearch slot="icon-start" />
          </WppInput>
        </div>

        <div>
          <p>Segmented Control</p>
          <WppSegmentedControl variant="icon" value="4" size="s" width="500px" hugContentOff>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>

      <div className={styles.container}>
        <div>
          <p>Text variant</p>
          <WppSegmentedControl value="1" size="s">
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled={true}>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter={3}>
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter={3} disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>

      <h2>M Size</h2>
      <div className={styles.container}>
        <div>
          <p>Select</p>
          <WppSelect
            size="m"
            class={styles.select}
            withFolder
            onWppChange={(event: WppSelectCustomEvent<SelectChangeEventDetail>): void => {
              setValue(event.detail.value)
            }}
            value={value}
            type="multiple"
            withSearch
            list={SAMPLE_LIST_2}
          ></WppSelect>
        </div>

        <div>
          <p>Input</p>
          <WppInput name="wpp-input" placeholder="Enter text" data-testid="search-icon-m-input" required size="m">
            <WppIconSearch slot="icon-start" />
          </WppInput>
        </div>

        <div>
          <p>Segmented Control</p>
          <WppSegmentedControl variant="icon" value="4" size="m" width="500px" hugContentOff>
            <WppSegmentedControlItem variant="icon" value="1">
              <WppIconGrid />
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="icon" value="2">
              <WppIconDataViewList />
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>

      <div className={styles.container}>
        <div>
          <p>Text variant</p>
          <WppSegmentedControl value="1">
            <WppSegmentedControlItem variant="text" value="1">
              Item 1
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="2">
              Item 2
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="3" disabled={true}>
              Item 3
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="4" counter={3}>
              Item 4
            </WppSegmentedControlItem>
            <WppSegmentedControlItem variant="text" value="5" counter={3} disabled>
              Item 5
            </WppSegmentedControlItem>
          </WppSegmentedControl>
        </div>
      </div>
    </div>
  )
}

export default SizeSComponentsHeights
