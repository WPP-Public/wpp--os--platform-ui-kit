import React, { useState } from 'react'
import styles from './index.module.scss'
import { CardGroupChangeEventDetail, CardGroupValue } from '@platform-ui-kit/components-library'
import { WppCard, WppCardGroup, WppTypography, WppButton } from '@platform-ui-kit/components-library-react'

const CardGroupIssue = () => {
  const [multipleGroupValue, setMultipleGroupValue] = useState<CardGroupValue>(['item-a'])
  const [cardList, setCardList] = useState([
    { id: 0, value: 'item-a', label: 'Item A' },
    { id: 1, value: 'item-b', label: 'Item B' },
    { id: 2, value: 'item-c', label: 'Item C' },
  ])

  const handleMultipleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)

    setMultipleGroupValue(event.detail.value)
  }

  const handleRemoveItem = () => {
    setCardList([
      { id: 0, value: 'item-a', label: 'Item A' },
      { id: 2, value: 'item-c', label: 'Item C' },
    ])
  }

  const handleAddItem = () => {
    setCardList([
      { id: 0, value: 'item-a', label: 'Item A' },
      { id: 1, value: 'item-b', label: 'Item B' },
      { id: 2, value: 'item-c', label: 'Item C' },
      { id: 3, value: 'item-D', label: 'Item D' },
    ])
  }

  return (
    <div className={styles.group}>
      <h3>Multiple Group</h3>

      <div className={styles.actions}>
        <WppButton onClick={handleRemoveItem}>Remove Elements</WppButton>
        <WppButton onClick={handleAddItem}>Add Elements</WppButton>
      </div>

      <WppCardGroup
        className={styles.cardGroupWrapper}
        multiple
        value={multipleGroupValue}
        size="s"
        onWppChange={handleMultipleCardGroupChange}
      >
        <div className={styles.itemsWrapper}>
          {cardList.map((el, ndx) => (
            <WppCard className={styles.item} value={el.value} key={`wrapper-${ndx}`}>
              <div>{el.label}</div>
              <WppTypography slot="header" type="s-strong">
                <div>{el.label}</div>
              </WppTypography>
            </WppCard>
          ))}
        </div>
      </WppCardGroup>

      <WppCardGroup
        className={styles.cardGroupWrapper}
        multiple
        value={multipleGroupValue}
        size="s"
        onWppChange={handleMultipleCardGroupChange}
      >
        {cardList.map((el, ndx) => (
          <WppCard className={styles.item} value={el.value} key={`group-${ndx}`}>
            <div>{el.label}</div>
            <WppTypography slot="header" type="s-strong">
              <div>{el.label}</div>
            </WppTypography>
          </WppCard>
        ))}
      </WppCardGroup>
    </div>
  )
}

export default CardGroupIssue
