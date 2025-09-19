import React, { useRef } from 'react'
import styles from './index.module.scss'
import {
  WppButton,
  WppInlineMessage,
  WppSideModal,
  WppTypography,
  WppModal,
} from '@platform-ui-kit/components-library-react'

const SideModalScrollbarIssue = () => {
  const sideModalRef = useRef<HTMLWppSideModalElement | null>(null)
  const secondSideModalRef = useRef<HTMLWppSideModalElement | null>(null)
  const modalRef = useRef<HTMLWppModalElement | null>(null)

  const handleCloseSideModal = (modal: 'first' | 'second') => {
    if (modal === 'first') {
      sideModalRef.current?.closeModal()
    } else {
      secondSideModalRef.current?.closeModal()
    }
  }

  const handleOpenSideModal = (modal: 'first' | 'second') => {
    if (modal === 'first') {
      sideModalRef.current?.openModal()
    } else {
      secondSideModalRef.current?.openModal()
    }
  }

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.closeModal()
    }
  }

  const handleOpenModalWRef = () => {
    if (modalRef.current) {
      modalRef.current.openModal()
    }
  }

  return (
    <div className={styles.container}>
      <WppTypography className={styles.text} type="xl-heading">
        Opening the side modal through a ref should now remove the scrollbar
      </WppTypography>
      <WppButton className={styles.btn} onClick={() => handleOpenSideModal('first')}>
        Open side-modal programatically (using ref)
      </WppButton>
      <WppSideModal ref={sideModalRef} onWppSideModalClose={() => handleCloseSideModal('first')} size="s">
        <div slot="header">First Side Modal</div>
        <div slot="body">
          <WppInlineMessage
            size="m"
            message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
            type="information"
          />
        </div>
        <div slot="actions">
          <WppButton className={styles.modalBtn} variant="secondary" onClick={() => handleCloseSideModal('first')}>
            Cancel
          </WppButton>
          <WppButton variant="secondary" onClick={() => handleOpenSideModal('second')}>
            Open 2nd Side Modal
          </WppButton>
        </div>
      </WppSideModal>
      <WppSideModal ref={secondSideModalRef} onWppSideModalClose={() => handleCloseSideModal('second')} size="s">
        <div slot="header">Second Side Modal</div>
        <div slot="body">
          <WppInlineMessage
            size="m"
            message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
            type="information"
          />
        </div>
        <div slot="actions">
          <WppButton variant="secondary" onClick={() => handleCloseSideModal('second')}>
            Cancel
          </WppButton>
        </div>
      </WppSideModal>

      <WppTypography className={styles.text} type="xl-heading">
        Opening the modal through a ref should now remove the scrollbar
      </WppTypography>
      <WppButton className={styles.btn} onClick={handleOpenModalWRef}>
        Open modal programatically (using ref)
      </WppButton>
      <WppModal ref={modalRef} onWppModalClose={handleCloseModal} size="s">
        <div slot="header">First Page Title</div>
        <div slot="body">
          <WppInlineMessage
            size="m"
            message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
            type="information"
          />
        </div>
        <div slot="actions">
          <WppButton variant="secondary" onClick={handleCloseModal}>
            Cancel
          </WppButton>
        </div>
      </WppModal>
    </div>
  )
}

export default SideModalScrollbarIssue
