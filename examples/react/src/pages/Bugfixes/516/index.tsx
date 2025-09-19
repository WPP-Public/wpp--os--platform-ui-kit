import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  WppButton,
  WppCard,
  WppCardGroup,
  WppSideModal,
  WppTypography,
} from '@platform-ui-kit/components-library-react'
import { CardGroupChangeEventDetail, CardGroupValue } from '@platform-ui-kit/components-library'

const CardGroupNesting = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [multipleGroupValue, setMultipleGroupValue] = useState<CardGroupValue>(['item-a'])

  const handleMultipleCardGroupChange = (event: CustomEvent<CardGroupChangeEventDetail>) => {
    console.log('event.detail =>', event.detail)
    setMultipleGroupValue(event.detail.value)
  }

  return (
    <div className={styles.container}>
      <WppCard>
        <WppButton onClick={() => setIsModalOpen(true)}>Open Modal</WppButton>
        <WppSideModal open={isModalOpen} size="m" onWppSideModalClose={() => setIsModalOpen(false)}>
          <div slot="body">
            <WppCardGroup multiple value={multipleGroupValue} onWppChange={handleMultipleCardGroupChange}>
              <WppCard value="item-a">
                <div>Information about item a</div>
                <WppTypography slot="header">Item A</WppTypography>
              </WppCard>
              <WppCard value="item-b">
                <div>Information about item b</div>
                <WppTypography slot="header">Item B</WppTypography>
              </WppCard>
              <WppCard value="item-c">
                <div>Information about item c</div>
                <WppTypography slot="header">Item C</WppTypography>
              </WppCard>
            </WppCardGroup>
          </div>
        </WppSideModal>
      </WppCard>
    </div>
  )
}

export default CardGroupNesting
