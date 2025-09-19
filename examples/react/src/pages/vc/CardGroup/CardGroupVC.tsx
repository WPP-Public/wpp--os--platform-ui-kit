import React, { useState } from 'react'
import { WppButton, WppCard, WppCardGroup, WppIconUser, WppTypography } from '@platform-ui-kit/components-library-react'
import { CardGroupChangeEventDetail, CardGroupValue } from '@platform-ui-kit/components-library'

import styles from './CardGroupVC.module.scss'

export const CardGroupVC = () => {
  const [isShown, setIsShown] = useState(false)
  const [singleGroupValue, setSingleGroupValue] = useState<CardGroupValue>('item-a')
  const [singleGroupValueWithEmpty, setSingleGroupValueWithEmpty] = useState<CardGroupValue>()
  const [singleGroupWithoutRadioValue, setSingleGroupWithoutRadioValue] = useState<CardGroupValue>('item-a')
  const [multipleGroupValue, setMultipleGroupValue] = useState<CardGroupValue>(['item-a'])
  const [dynamicMultipleGroupValue, setDynamicMultipleGroupValue] = useState<CardGroupValue>(['item-b'])

  const handleMultipleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
    setMultipleGroupValue(event.detail.value)
  }

  const handleDynamicMultipleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
    setDynamicMultipleGroupValue(event.detail.value)
  }

  const handleSingleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
    setSingleGroupValue(event.detail.value)
  }

  const handleSingleCardGroupWithEmptyChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
    setSingleGroupValueWithEmpty(event.detail.value)
  }

  const handleSingleCardGroupWithoutRadioChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
    setSingleGroupWithoutRadioValue(event.detail.value)
  }

  const cardList = [
    { id: 0, value: 'item-a', label: 'Item A' },
    { id: 1, value: 'item-b', label: 'Item B' },
    { id: 2, value: 'item-c', label: 'Item C' },
  ]

  return (
    <div className={styles.group} data-testid="cards-group-container">
      <h3>Multiple Group</h3>

      <WppCardGroup
        className={styles.multiple}
        multiple
        value={multipleGroupValue}
        size="s"
        onWppChange={handleMultipleCardGroupChange}
        name="multiple-group-1"
      >
        <div>
          <WppCard className={styles.item} value="item-a" data-testid="multiple-card-item-a">
            <div>Information about item a</div>
            <WppTypography slot="header" type="s-strong">
              Item A
            </WppTypography>
          </WppCard>
          <WppCard className={styles.item} value="item-b" data-testid="multiple-card-item-b">
            <div>Information about item b</div>
            <WppTypography slot="header" type="s-strong">
              Item B
            </WppTypography>
          </WppCard>
          <WppCard className={styles.item} value="item-c">
            <div>Information about item c</div>
            <WppTypography slot="header" type="s-strong">
              Item C
            </WppTypography>
          </WppCard>
        </div>
      </WppCardGroup>

      <WppCardGroup
        className={styles.multiple}
        multiple
        value={multipleGroupValue}
        size="s"
        name="multiple-group-2"
        onWppChange={handleMultipleCardGroupChange}
      >
        <WppCard className={styles.item} value="item-a" data-testid="multiple-card-item-a">
          <div>Information about item a</div>
          <WppTypography slot="header" type="s-strong">
            Item A
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-b" data-testid="multiple-card-item-b">
          <div>Information about item b</div>
          <WppTypography slot="header" type="s-strong">
            Item B
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-c">
          <div>Information about item c</div>
          <WppTypography slot="header" type="s-strong">
            Item C
          </WppTypography>
        </WppCard>
      </WppCardGroup>

      <h3>Multiple Group with dynamic value</h3>
      <WppButton className={styles.multipleButton} onClick={() => setIsShown(!isShown)}>
        Click to show/hide Cards
      </WppButton>
      <WppCardGroup
        className={styles.multiple}
        multiple
        value={dynamicMultipleGroupValue}
        size="m"
        name="dynamic-multiple-group"
        onWppChange={handleDynamicMultipleCardGroupChange}
      >
        {isShown &&
          cardList.map(({ id, value, label }) => (
            <WppCard className={styles.item} value={value} key={id}>
              <div>Information about {label}</div>
              <WppTypography slot="header" type="s-strong">
                {label}
              </WppTypography>
            </WppCard>
          ))}
      </WppCardGroup>

      <h3>Single Group</h3>
      <WppCardGroup
        className={styles.single}
        value={singleGroupValue}
        size="l"
        name="single-group"
        onWppChange={handleSingleCardGroupChange}
      >
        <WppCard className={styles.item} value="item-a" data-testid="single-card-item-a">
          <WppTypography slot="header" type="l-strong">
            Item A
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-b" data-testid="single-card-item-b">
          <WppTypography slot="header" type="l-strong">
            Item B
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-c" disabled>
          <div slot="header" className={styles.cardHeader}>
            <WppIconUser className={styles.userIcon}></WppIconUser>
            <WppTypography className={styles.disabledLabel} slot="header" type="l-strong">
              Item C
            </WppTypography>
          </div>
        </WppCard>
      </WppCardGroup>

      <h3>Single Group - Allow Empty Value</h3>
      <WppCardGroup
        className={styles.single}
        value={singleGroupValueWithEmpty}
        size="l"
        name="single-group-with-empty"
        onWppChange={handleSingleCardGroupWithEmptyChange}
        allowEmptySelection
      >
        <WppCard className={styles.item} value="item-a">
          <WppTypography slot="header" type="l-strong">
            Item A
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-b">
          <WppTypography slot="header" type="l-strong">
            Item B
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-c">
          <div slot="header" className={styles.cardHeader}>
            <WppIconUser className={styles.userIcon}></WppIconUser>
            <WppTypography slot="header" type="l-strong">
              Item C
            </WppTypography>
          </div>
        </WppCard>
      </WppCardGroup>

      <h3>Single Group without radio</h3>
      <WppCardGroup
        className={styles.single}
        value={singleGroupWithoutRadioValue}
        size="l"
        name="single-group-without-radio"
        withRadioOrCheckbox={false}
        onWppChange={handleSingleCardGroupWithoutRadioChange}
      >
        <WppCard className={styles.item} value="item-a">
          <WppTypography slot="header" type="l-strong">
            Item A
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-b">
          <WppTypography slot="header" type="l-strong">
            Item B
          </WppTypography>
        </WppCard>
        <WppCard className={styles.item} value="item-c">
          <WppTypography slot="header" type="l-strong">
            Item C
          </WppTypography>
        </WppCard>
      </WppCardGroup>
    </div>
  )
}
