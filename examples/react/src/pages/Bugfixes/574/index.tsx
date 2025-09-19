import React, { useState } from 'react'
import styles from './index.module.scss'
import {
  WppTypography,
  WppSelect,
  WppIconClock,
  WppButton,
  WppSideModal,
  WppDivider,
} from '@platform-ui-kit/components-library-react'
import { ListItemInterface } from '@platform-ui-kit/components-library'

const helperCreateElement = (type: string, props?: any, children?: any): ListItemInterface => ({
  type,
  props: props || {},
  ...(children && { children: Array.isArray(children) ? children : [children] }),
})

const LIST = [
  {
    value: 1,
    label: 'Car',
    slots: [helperCreateElement('span', { slot: 'subtitle', children: 'Subtitle1' })],
  },
  {
    value: 2,
    label: 'House',
    disabled: true,
    slots: [helperCreateElement('span', { slot: 'subtitle', children: 'Subtitle2' })],
  },
  {
    value: 3,
    label: 'Some looooooooooooooooong text in the item to test truncate',
    slots: [
      helperCreateElement('span', { slot: 'subtitle', children: 'Subtitle2' }),
      helperCreateElement('span', { slot: 'caption', children: 'Text should be truncated' }),
      helperCreateElement('wpp-tag', { slot: 'right', label: 'Positive', variant: 'positive' }),
    ],
  },
  {
    value: 4,
    label: 'Text',
    slots: [helperCreateElement('wpp-icon-plus', { slot: 'left' })],
  },
  {
    value: 5,
    label: 'Text',
    slots: [
      helperCreateElement('wpp-icon-plus', { slot: 'left' }),
      helperCreateElement('span', { slot: 'caption', children: 'Creates a new element' }),
    ],
  },
  {
    value: 6,
    label: 'Rob Adi',
    slots: [
      helperCreateElement('wpp-avatar', { slot: 'left', name: 'Rob Adi' }),
      helperCreateElement('span', { slot: 'caption', children: 'Creates a new element' }),
    ],
  },
  {
    value: 7,
    label: 'Some looooooooooooooooong text in the item to test truncate',
  },
]

const MultipleSelectIssues = () => {
  const [value, setValue] = useState([])
  const [isSideModalOpen, setSideModalOpen] = useState(false)

  // *** Side Modal Specific ***
  const handleOpenSideModal = () => setSideModalOpen(true)

  const handleCloseReasonForSideModal = (event: CustomEvent) => {
    console.log('event :>> ', event?.detail)
    setSideModalOpen(false)
  }

  const handleCloseSideModal = () => {
    setSideModalOpen(false)
  }
  // ***************************

  // *** Modal Specific ***

  return (
    <div className={styles.container}>
      <div className={styles.scenario}>
        <WppTypography className={styles.scenarioTitle} type="2xl-heading">
          Scenario 01: Issue with maximumSelectedItems
        </WppTypography>

        <WppTypography className={styles.scenarioSubTitle} type="l-body">
          When `maximumSelectedItem` property is enabled, the "Select All" button should always be disabled. The
          `maximumSelectedItem` property is set to 3 for the following example.
        </WppTypography>

        <WppSelect
          name="wpp-multiple-select"
          type="multiple"
          size="m"
          placeholder="Choose options"
          className={styles.item}
          required
          withSearch
          withFolder
          onWppChange={(e: CustomEvent) => setValue(e.detail.value)}
          maximumSelectedItems={3}
          value={value}
          labelConfig={{ text: 'Regular Multiple Select with left Icon' }}
          list={LIST}
        >
          <WppIconClock slot="icon-start" />
        </WppSelect>

        <WppDivider />
      </div>

      <div className={styles.scenario}>
        <WppTypography className={styles.scenarioTitle} type="2xl-heading">
          Scenario 02: Issue with search when select is placed in side-modal.
        </WppTypography>

        <WppTypography className={styles.scenarioSubTitle} type="l-body">
          When the select component is placed inside a side-modal component, the search stops working properly once the
          user searches for a string that does not match any list-item (When "Nothing found" is displayed in dropdown's
          list)
        </WppTypography>

        <WppButton className={styles.modalBtn} onClick={handleOpenSideModal}>
          Open Side Modal
        </WppButton>

        <WppSideModal size="s" open={isSideModalOpen} onWppSideModalClose={handleCloseReasonForSideModal}>
          <h3 slot="header">First Page Title</h3>
          <div slot="body">
            <WppSelect
              name="wpp-multiple-select"
              type="multiple"
              size="m"
              placeholder="Choose options"
              className={styles.item}
              required
              withSearch
              withFolder
              onWppChange={(e: CustomEvent) => setValue(e.detail.value)}
              maximumSelectedItems={3}
              value={value}
              labelConfig={{ text: 'Regular Multiple Select with left Icon' }}
              list={LIST}
            >
              <WppIconClock slot="icon-start" />
            </WppSelect>
          </div>
          <div slot="actions">
            <WppButton variant="secondary" onClick={handleCloseSideModal}>
              Cancel
            </WppButton>
          </div>
        </WppSideModal>
      </div>
    </div>
  )
}

export default MultipleSelectIssues
