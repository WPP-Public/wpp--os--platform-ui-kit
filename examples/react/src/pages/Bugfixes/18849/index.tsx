import { WppSelect, WppTypography } from '@platform-ui-kit/components-library-react'
import React, { useState } from 'react'

import styles from './index.module.scss'

const items = [
  {
    id: 1,
    label: 'Car',
    value: 'car',
  },
  {
    id: 2,
    label: 'House',
    value: 'house',
  },
  {
    id: 3,
    label: 'Some looooooooooooooooong text in the item to test truncate and even even even even longer',
    value: 'long',
  },
  {
    id: 4,
    label: 'Text',
    value: 4,
  },
  {
    id: 5,
    label: 'Text',
    value: [5, 55],
  },
  {
    id: 6,
    label: 'Rob Adi',
    value: 6,
  },
  {
    id: 7,
    label: 'Some text',
    value: 7,
  },
  {
    id: 8,
    label: 'Flat',
    value: 8,
  },
  {
    id: 9,
    label: 'Watermelon',
    value: 'watermelon',
  },
  {
    id: 10,
    label: 'Pineapple',
    value: 'pineapple',
  },
]

const TextSelect2Lines = () => {
  const [textItems, setTextItems] = useState<string>('long')

  return (
    <div>
      <div className={styles.row}>
        <WppTypography className={styles.rowText} type="m-body">
          Text Select <WppTypography type="m-strong">WITH</WppTypography> truncation on trigger element (new default)
        </WppTypography>
        <WppSelect
          placeholder="Choose options"
          type="text"
          required
          data-testid="text-select"
          onWppChange={(e: CustomEvent) => setTextItems(e.detail.value)}
          className={styles.text}
          value={textItems}
          list={items}
        ></WppSelect>
      </div>

      <div className={styles.row}>
        <WppTypography className={styles.rowText} type="m-body">
          Text Select <WppTypography type="m-strong">WITHOUT</WppTypography> truncation on trigger element
        </WppTypography>
        <WppSelect
          placeholder="Choose options"
          type="text"
          required
          data-testid="text-select"
          onWppChange={(e: CustomEvent) => setTextItems(e.detail.value)}
          className={styles.text}
          value={textItems}
          truncate={false}
          list={items}
        ></WppSelect>
      </div>
    </div>
  )
}

export default TextSelect2Lines
