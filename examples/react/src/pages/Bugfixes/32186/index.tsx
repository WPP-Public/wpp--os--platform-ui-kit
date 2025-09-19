import React, { useRef, useState } from 'react'
import styles from './index.module.scss'
import {
  WppButton,
  WppFullScreenModal,
  WppModal,
  WppSideModal,
  WppTypography,
} from '@platform-ui-kit/components-library-react'

const ModalEventsIssues = () => {
  const sideModalRef = useRef<HTMLWppSideModalElement | null>(null)
  const modalRef = useRef<HTMLWppModalElement | null>(null)
  const fullScreenModalRef = useRef<HTMLWppFullScreenModalElement | null>(null)
  const [visibleSideModal, setIsVisibleSideModal] = useState<boolean>(false)
  const [visibleModal, setIsVisibleModal] = useState<boolean>(false)
  const [visibleFullScreenModal, setIsVisibleFullScreenModal] = useState<boolean>(false)

  const closeModalWithRef = (type: 'modal' | 'side-modal' | 'fullscreen-modal') => {
    if (type === 'side-modal') {
      sideModalRef.current?.closeModal()
    } else if (type === 'modal') {
      modalRef.current?.closeModal()
    } else {
      fullScreenModalRef.current?.closeFullScreenModal()
    }
  }

  const openModalWithRef = (type: 'modal' | 'side-modal' | 'fullscreen-modal') => {
    if (type === 'side-modal') {
      sideModalRef.current?.openModal()
    } else if (type === 'modal') {
      modalRef.current?.openModal()
    } else {
      fullScreenModalRef.current?.openFullScreenModal()
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Side Modal
        </WppTypography>
        <WppButton onClick={() => setIsVisibleSideModal(true)}>Open Side Modal</WppButton>
        <WppSideModal
          open={visibleSideModal}
          size="s"
          onWppSideModalClose={() => {
            console.log('Called: onWppSideModalClose')
            setIsVisibleSideModal(false)
          }}
          onWppSideModalCloseStart={(event: CustomEvent) => {
            console.log('Close Start', event)
          }}
          onWppSideModalCloseComplete={(event: CustomEvent) => {
            console.log('Close End', event)
          }}
          onWppSideModalOpenStart={(event: CustomEvent) => {
            console.log('Open Start', event)
          }}
          onWppSideModalOpenComplete={(event: CustomEvent) => {
            console.log('Open End', event)
          }}
        >
          <div slot="header">Modal Header</div>
          <div slot="body">
            <h2>Body of Modal</h2>
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={() => setIsVisibleSideModal(false)}>
              Cancel
            </WppButton>
          </div>
        </WppSideModal>
      </div>

      <div className={styles.section}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Side Modal with Ref
        </WppTypography>
        <WppButton onClick={() => openModalWithRef('side-modal')}>Open Side Modal through ref</WppButton>
        <WppSideModal
          ref={sideModalRef}
          size="s"
          onWppSideModalClose={() => {
            console.log('Called: onWppSideModalClose')
            closeModalWithRef('side-modal')
          }}
          onWppSideModalCloseStart={(event: CustomEvent) => {
            console.log('Close Start', event)
          }}
          onWppSideModalCloseComplete={(event: CustomEvent) => {
            console.log('Close End', event)
          }}
          onWppSideModalOpenStart={(event: CustomEvent) => {
            console.log('Open Start', event)
          }}
          onWppSideModalOpenComplete={(event: CustomEvent) => {
            console.log('Open End', event)
          }}
        >
          <div slot="header">Modal Header</div>
          <div slot="body">
            <h2>Body of Modal</h2>
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={() => closeModalWithRef('side-modal')}>
              Cancel
            </WppButton>
          </div>
        </WppSideModal>
      </div>

      <div className={styles.section}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Modal
        </WppTypography>
        <WppButton onClick={() => setIsVisibleModal(true)}>Open Modal</WppButton>
        <WppModal
          open={visibleModal}
          size="s"
          onWppModalClose={() => {
            console.log('Called: onWppModalClose')
            setIsVisibleModal(false)
          }}
          onWppModalCloseStart={(event: CustomEvent) => {
            console.log('Close Start', event)
          }}
          onWppModalCloseComplete={(event: CustomEvent) => {
            console.log('Close End', event)
          }}
          onWppModalOpenStart={(event: CustomEvent) => {
            console.log('Open Start', event)
          }}
          onWppModalOpenComplete={(event: CustomEvent) => {
            console.log('Open End', event)
          }}
        >
          <div slot="header">Modal Header</div>
          <div slot="body">
            <h2>Body of Modal</h2>
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={() => setIsVisibleModal(false)}>
              Cancel
            </WppButton>
          </div>
        </WppModal>
      </div>

      <div className={styles.section}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Modal with Ref
        </WppTypography>
        <WppButton onClick={() => openModalWithRef('modal')}>Open Modal through ref</WppButton>
        <WppModal
          ref={modalRef}
          size="s"
          onWppModalClose={() => {
            console.log('Called: onWppModalClose')
            closeModalWithRef('modal')
          }}
          onWppModalCloseStart={(event: CustomEvent) => {
            console.log('Close Start', event)
          }}
          onWppModalCloseComplete={(event: CustomEvent) => {
            console.log('Close End', event)
          }}
          onWppModalOpenStart={(event: CustomEvent) => {
            console.log('Open Start', event)
          }}
          onWppModalOpenComplete={(event: CustomEvent) => {
            console.log('Open End', event)
          }}
        >
          <div slot="header">Modal Header</div>
          <div slot="body">
            <h2>Body of Modal</h2>
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={() => closeModalWithRef('modal')}>
              Cancel
            </WppButton>
          </div>
        </WppModal>
      </div>

      <div className={styles.section}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Full Screen Modal
        </WppTypography>
        <WppButton onClick={() => setIsVisibleFullScreenModal(true)}>Open Full Screen Modal</WppButton>
        <WppFullScreenModal
          open={visibleFullScreenModal}
          onWppFullScreenModalClose={() => {
            console.log('Called: onWppFullScreenModalClose')
            setIsVisibleFullScreenModal(false)
          }}
          onWppFullScreenModalCloseStart={(event: CustomEvent) => {
            console.log('Close Start', event)
          }}
          onWppFullScreenModalCloseComplete={(event: CustomEvent) => {
            console.log('Close End', event)
          }}
          onWppFullScreenModalOpenStart={(event: CustomEvent) => {
            console.log('Open Start', event)
          }}
          onWppFullScreenModalOpenComplete={(event: CustomEvent) => {
            console.log('Open End', event)
          }}
        >
          <div slot="header">Modal Header</div>
          <div slot="body">
            <h2>Body of Modal</h2>
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={() => setIsVisibleFullScreenModal(false)}>
              Cancel
            </WppButton>
          </div>
        </WppFullScreenModal>
      </div>

      <div className={styles.section}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Full Screen Modal with Ref
        </WppTypography>
        <WppButton onClick={() => openModalWithRef('fullscreen-modal')}>Open Full Screen Modal through ref</WppButton>
        <WppFullScreenModal
          ref={fullScreenModalRef}
          onWppFullScreenModalClose={() => {
            console.log('Called: onWppFullScreenModalClose')
            closeModalWithRef('fullscreen-modal')
          }}
          onWppFullScreenModalCloseStart={(event: CustomEvent) => {
            console.log('Close Start', event)
          }}
          onWppFullScreenModalCloseComplete={(event: CustomEvent) => {
            console.log('Close End', event)
          }}
          onWppFullScreenModalOpenStart={(event: CustomEvent) => {
            console.log('Open Start', event)
          }}
          onWppFullScreenModalOpenComplete={(event: CustomEvent) => {
            console.log('Open End', event)
          }}
        >
          <div slot="header">Modal Header</div>
          <div slot="body">
            <h2>Body of Modal</h2>
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={() => closeModalWithRef('fullscreen-modal')}>
              Cancel
            </WppButton>
          </div>
        </WppFullScreenModal>
      </div>
    </div>
  )
}

export default ModalEventsIssues
