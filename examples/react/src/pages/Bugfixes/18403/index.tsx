import { WppButton, WppSelect } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import React, { useState } from 'react'

const MultiSelectDropDownDisabledItem = () => {
  const [multipleItems, setMultipleItems] = useState<any[] | undefined>(['car', 'house'])

  const handleResetClick = () => {
    setMultipleItems([])
  }

  const isItemDisaled = (itemValue: string) => multipleItems?.includes(itemValue) && multipleItems.length === 1

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-18403">
            Bugfix #18403 - Multiple select issue with disabled item
          </a>
        </h1>
      </div>
      <div className={styles.page}>
        <div className={styles.pageSection}>
          <WppSelect
            placeholder="Choose options"
            type="multiple"
            required
            withFolder
            withSearch
            labelConfig={{ text: 'Multiple Select with search' }}
            data-testid="focus-multiple-select"
            onWppChange={(e: CustomEvent) => setMultipleItems(e.detail.value)}
            className={styles.item}
            value={multipleItems}
            list={[
              {
                disabled: isItemDisaled('car'),
                label: 'Car',
                value: 'car',
              },
              {
                disabled: isItemDisaled('house'),
                label: 'House',
                value: 'house',
              },
              {
                disabled: isItemDisaled('apartment'),
                label: 'Apartment',
                value: 'apartment',
              },
              {
                disabled: isItemDisaled('building'),
                label: 'Building',
                value: 'building',
              },
            ]}
          ></WppSelect>
          <div style={{ marginTop: '20px' }}>
            <WppButton variant="secondary" onClick={handleResetClick} data-testid="reset-button">
              Reset
            </WppButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MultiSelectDropDownDisabledItem
