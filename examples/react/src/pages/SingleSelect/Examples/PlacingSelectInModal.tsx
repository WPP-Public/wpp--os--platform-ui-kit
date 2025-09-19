import React, { useState } from 'react'
import styles from '../SingleSelect.module.scss'
import {
  WppButton,
  WppDivider,
  WppModal,
  WppSelect,
  WppTypography,
  WppSideModal,
  WppFullScreenModal,
} from '@platform-ui-kit/components-library-react'
import { SAMPLE_LIST_2, SelectTypes } from '../consts'
import { WppSelectCustomEvent } from '@platform-ui-kit/components-library/src/components'
import { SelectChangeEventDetail } from '@platform-ui-kit/components-library'

const PlacingSelectInModal = ({ type }: { type: SelectTypes }) => {
  const [value, setValue] = useState(type === 'multiple' ? [] : '')

  const [sideModalOpen, setSideModalOpen] = useState<boolean>(false)
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const [fullscreenModalOpen, setFullscreenModalOpen] = useState<boolean>(false)

  const handleOpenSideModal = () => {
    setSideModalOpen(true)
  }

  const handleCloseSideModal = () => {
    setSideModalOpen(false)
  }

  const handleOpenFullscreenModal = () => {
    setFullscreenModalOpen(true)
  }

  const handleCloseFullscreenModal = () => {
    setFullscreenModalOpen(false)
  }

  const handleOpenModal = () => {
    setModalOpen(true)
  }

  const handleCloseModal = () => {
    setModalOpen(false)
  }

  return (
    <div className={styles.scenario}>
      <WppTypography className={styles.title} type="xl-heading">
        Scenario {type === 'multiple' ? '10' : '09'}: Placing select in modals.
      </WppTypography>

      <WppTypography className={styles.subTitle} type="l-body">
        The dropdown of the select should not be clipped by the modal bounderies. It should display over the modals. The
        search of the select needs to be tested as well, to check that it works properly.
      </WppTypography>

      <WppModal open={modalOpen} onWppModalClose={handleCloseModal} onWppModalOpen={handleOpenModal}>
        <div slot="header">Modal Title</div>
        <div slot="body">
          <p>Modal content that is really really really really really very loooooong</p>

          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`modal-${type}-select-m`}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            list={SAMPLE_LIST_2}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
          />
        </div>
        <div slot="actions">
          <WppButton variant="secondary" onClick={handleCloseModal}>
            Cancel
          </WppButton>
        </div>
      </WppModal>

      <WppSideModal open={sideModalOpen} onWppSideModalClose={handleCloseSideModal} size="m">
        <div slot="header">First Page Title</div>

        <div slot="body">
          <p style={{ padding: '170px 0' }}>First Page Body</p>
          <WppSelect
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`side-modal-${type}-select-m`}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            list={SAMPLE_LIST_2}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
          />
        </div>
        <div slot="actions">
          <WppButton variant="secondary" onClick={handleCloseSideModal}>
            Cancel
          </WppButton>
        </div>
      </WppSideModal>

      <WppFullScreenModal open={fullscreenModalOpen} onWppFullScreenModalClose={handleCloseFullscreenModal}>
        <div slot="header">Page Title</div>
        <div slot="body">
          <WppSelect
            style={{ marginTop: '350px' }}
            withFolder
            type={type}
            required
            name="select-component"
            className={styles.selectItem}
            data-testid={`fullscreen-modal-${type}-select-m`}
            labelConfig={{
              text: 'Size M',
            }}
            placeholder={'Choose option'}
            value={value}
            list={SAMPLE_LIST_2}
            onWppChange={(e: WppSelectCustomEvent<SelectChangeEventDetail>) => {
              console.log(`On Change ${type}`, e.detail)

              setValue(e.detail.value)
            }}
          />
        </div>
        <div slot="actions">
          <WppButton variant="secondary" onClick={handleCloseFullscreenModal}>
            Cancel
          </WppButton>
        </div>
      </WppFullScreenModal>

      <div className={styles.actions}>
        <WppButton className={styles.buttonItem} onClick={handleOpenSideModal}>
          Open Side Modal
        </WppButton>

        <WppButton className={styles.buttonItem} onClick={handleOpenModal}>
          Open Modal
        </WppButton>

        <WppButton className={styles.buttonItem} onClick={handleOpenFullscreenModal}>
          Open Fullscreen Modal
        </WppButton>
      </div>

      <WppDivider />
    </div>
  )
}

export default PlacingSelectInModal
