import styles from './index.module.scss'
import {
  WppAvatar,
  WppButton,
  WppCard,
  WppDatepicker,
  WppSideModal,
  WppTextareaInput,
  WppTypography,
} from '@platform-ui-kit/components-library-react'
import React, { useState } from 'react'

const DropdownGetsCropped = () => {
  const [isSideModalOpen, setSideModalOpen] = useState(false)

  const handleOpenSideModal = () => setSideModalOpen(true)

  const handleCloseReasonForSideModal = () => setSideModalOpen(false)

  const handleCloseSideModal = () => setSideModalOpen(false)

  return (
    <div className={styles.container}>
      <WppTypography type="xl-heading">Dropdown gets cropped by parent</WppTypography>

      <WppButton class={styles.modalButton} onClick={handleOpenSideModal}>
        Open Modal (size s)
      </WppButton>
      <WppSideModal
        open={isSideModalOpen}
        onWppSideModalClose={handleCloseReasonForSideModal}
        onWppSideModalOpen={handleOpenSideModal}
        size="m"
      >
        <div slot="header">Side Modal Title</div>
        <div slot="body">
          <div className={styles.message}>
            <WppAvatar
              class="hover-avatar"
              withTooltip
              size="s"
              name="John Smith Junior"
              color="var(--wpp-dataviz-color-cat-dark-9)"
            />
            <WppCard>
              <p>
                Good morning team,
                <br />
                Will take a sick leave for today 🍋
                <br />
                <br />
                🙏 Please water my plants, thanks!
              </p>
            </WppCard>
          </div>
          <WppDatepicker
            class={styles.datepicker}
            value="21/02/2023"
            toggleSelected
            data-testid="single-select-datepicker"
          />
          <WppTextareaInput
            placeholder="Enter text"
            name="asd"
            charactersLimit={10}
            warningThreshold={5}
            data-testid="regular-limited-text-area"
            required
            autoFocus
            labelConfig={{
              icon: 'wpp-icon-info',
              text: 'Regular Text Area with Limit',
              description: 'Description',
              locales: {
                optional: 'Optional',
              },
            }}
          />
        </div>
        <div slot="actions" className={styles.buttons}>
          <WppButton variant="secondary" onClick={handleCloseSideModal} className={styles.button}>
            Cancel
          </WppButton>
          <WppButton variant="primary">Select</WppButton>
        </div>
      </WppSideModal>
    </div>
  )
}

export default DropdownGetsCropped
