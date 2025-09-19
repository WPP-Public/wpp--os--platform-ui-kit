import React, { useState } from 'react'
import {
  WppActionButton,
  WppCard,
  WppIconAppFolder,
  WppIconCollection,
  WppIconEdit,
  WppIconMore,
  WppIconPlus,
  WppIconRemoveCircle,
  WppListItem,
  WppMenuContext,
  WppTooltip,
  WppTypography,
} from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'

import { LIST_ITEMS } from './config'

const ListItem: React.FC<{ labelText: string }> = ({ labelText }) => (
  <WppListItem className={styles.listItem}>
    <WppIconAppFolder slot="left"></WppIconAppFolder>
    <span slot="label">{labelText}</span>
    <div slot="right">
      <WppMenuContext appendToListWrapper>
        <WppActionButton slot="trigger-element" variant="secondary">
          <WppIconMore direction="horizontal" slot="icon-start"></WppIconMore>
        </WppActionButton>
        <div>
          <WppListItem>
            <WppIconEdit slot="left" />
            <span slot="label">Edit</span>
          </WppListItem>
          <WppListItem>
            <WppIconRemoveCircle slot="left" />
            <span slot="label">Remove</span>
          </WppListItem>
        </div>
      </WppMenuContext>
    </div>
  </WppListItem>
)

const CheckTruncateListItem = () => {
  const [addListItem, setAddListItem] = useState(false)

  return (
    <div>
      <div>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-13723">
            Bugfix #13723 - Truncated app group name is displayed w/o three dots at the end
          </a>
        </h1>
      </div>
      <div className={styles.page}>
        <WppCard className={styles.card} size="xl">
          <div slot="header" className={styles.header}>
            <WppTypography type="m-strong">AppGroups</WppTypography>
            <WppTypography type="xs-body">Manage list of app groups used in Hierarchy.</WppTypography>
          </div>
          <WppTooltip slot="actions" text="Add app group">
            <WppActionButton>
              <WppIconPlus slot="icon-start" />
            </WppActionButton>
          </WppTooltip>
          <div className={styles.body}>
            {LIST_ITEMS.map((item, key) => (
              <ListItem labelText={item.label} key={key} />
            ))}
            {addListItem && <ListItem labelText="New Flesh-Eating Subhumanoid Zombified Living Dead" />}
            <WppActionButton onClick={() => setAddListItem(!addListItem)}>
              <WppIconCollection slot="icon-start" />
              Add/Remove app group
            </WppActionButton>
          </div>
        </WppCard>
      </div>
    </div>
  )
}

export default CheckTruncateListItem
