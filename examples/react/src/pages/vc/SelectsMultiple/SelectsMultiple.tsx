import { WppSelect, WppIconClock } from '@platform-ui-kit/components-library-react'
import styles from './SelectsMultiple.module.scss'

import { SAMPLE_LIST_MULTIPLE } from '../../SingleSelect/consts'
import { useState } from 'react'

export const SelectsMultipleVCPage = () => {
  const [value, setValue] = useState([])

  return (
    <div className={styles.multiple} data-testid="multiple-selects">
      <h2>Multiple Selects</h2>

      <div className={styles.select}>
        <WppSelect
          name="wpp-multiple-select"
          type="multiple"
          size="m"
          placeholder="Choose options"
          className={styles.item}
          required
          value={value}
          onWppChange={(event: CustomEvent) => setValue(event.detail.value)}
          labelConfig={{ text: 'Regular Multiple Select with left Icon' }}
          list={SAMPLE_LIST_MULTIPLE}
        >
          <WppIconClock slot="icon-start" />
        </WppSelect>

        <WppSelect
          name="wpp-multiple-select"
          type="multiple"
          size="m"
          placeholder="Choose options"
          className={styles.item}
          required
          value={value}
          onWppChange={(event: CustomEvent) => setValue(event.detail.value)}
          withFolder
          labelConfig={{ text: 'Multiple Select with folder' }}
          data-testid="multiple-select-with-folder"
          showSelectAllText={false}
          list={SAMPLE_LIST_MULTIPLE}
        >
          <WppIconClock slot="icon-start" />
        </WppSelect>

        <div className={styles.multipleContainer} data-testid="multiple-select-container">
          <WppSelect
            name="wpp-multiple-select"
            type="multiple"
            size="m"
            placeholder="Choose options"
            className={styles.item}
            required
            value={value}
            onWppChange={(event: CustomEvent) => setValue(event.detail.value)}
            withFolder
            withSearch
            data-testid="search-and-folder-multiple-select"
            labelConfig={{ text: 'Multiple Select with search' }}
            list={SAMPLE_LIST_MULTIPLE}
          >
            <WppIconClock slot="icon-start" />
          </WppSelect>
        </div>
      </div>
    </div>
  )
}
