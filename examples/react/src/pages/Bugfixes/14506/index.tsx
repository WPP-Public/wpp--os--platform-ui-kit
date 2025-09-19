import {
  WppButton,
  WppModal,
  WppStep,
  WppStepper,
  WppTypography,
  WppSideModal,
} from '@platform-ui-kit/components-library-react'
import { OrientationType } from '@platform-ui-kit/components-library'

import styles from './index.module.scss'
import React, { useState } from 'react'

const Stepper: React.FC<{ orientation: OrientationType; totalSteps: number }> = ({ orientation, totalSteps }) => (
  <WppStepper activeStep={2} orientation={orientation} className={styles.stepper}>
    {Array.from({ length: totalSteps }).map((_, i) => (
      <WppStep key={i} orientation={orientation}>
        <p slot="label" className={styles.text}>
          Step
        </p>
      </WppStep>
    ))}
  </WppStepper>
)

const ModalChangesWidthOrHeightWithStepper = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSideModalOpen, setSideModalOpen] = useState(false)
  const [stepperOrientation, setStepperOrientation] = useState<OrientationType>('vertical')

  const handleOpenModal = () => setModalOpen(true)
  const handleCloseModal = () => setModalOpen(false)

  const handleOpenSideModal = () => setSideModalOpen(true)
  const handleCloseSideModal = () => setSideModalOpen(false)

  const handleCloseReasonForModal = () => {
    setModalOpen(false)
    setSideModalOpen(false)
  }

  const handleChangeStepperOrientation = () => {
    if (stepperOrientation === 'horizontal') setStepperOrientation('vertical')
    if (stepperOrientation === 'vertical') setStepperOrientation('horizontal')
  }

  return (
    <div>
      <div>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-14506">
            Bugfix #14506 - Modal: width of the component increases if there is a Horizontal Stepper inside
          </a>
        </h1>
      </div>
      <div>
        <div className={styles.openButtons}>
          <WppButton onClick={handleOpenModal}>Open Modal</WppButton>
          <WppButton onClick={handleOpenSideModal}>Open Side Modal</WppButton>

          <WppButton variant="secondary" onClick={handleChangeStepperOrientation}>
            Change stepper orientation
          </WppButton>
        </div>

        <WppModal
          size="s"
          open={isModalOpen}
          onWppModalClose={handleCloseReasonForModal}
          onWppModalOpen={handleOpenModal}
        >
          <WppTypography slot="header" type="xl-heading">
            Header
          </WppTypography>
          <div slot="body" className={stepperOrientation === 'vertical' ? styles.modalBody : ''}>
            <Stepper orientation={stepperOrientation} totalSteps={7} />
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={handleCloseModal}>
              Close
            </WppButton>
          </div>
        </WppModal>

        <WppSideModal
          size="s"
          open={isSideModalOpen}
          onWppSideModalClose={handleCloseReasonForModal}
          onWppSideModalOpen={handleOpenSideModal}
        >
          <WppTypography slot="header" type="xl-heading">
            Header
          </WppTypography>
          <div slot="body" className={`${styles.sideModalBody} ${styles[stepperOrientation]}`}>
            <Stepper orientation={stepperOrientation} totalSteps={8} />
          </div>
          <div slot="actions" className={styles.actions}>
            <WppButton variant="secondary" size="m" onClick={handleCloseSideModal}>
              Close
            </WppButton>
          </div>
        </WppSideModal>
      </div>
    </div>
  )
}

export default ModalChangesWidthOrHeightWithStepper
