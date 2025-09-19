import { WppButton, WppModal, WppSideModal, WppTypography } from '@platform-ui-kit/components-library-react'
import styles from './index.module.scss'
import React, { useState } from 'react'

const SideModals = () => {
  const [isSideModalOpen, setIsSideModalOpen] = useState(false)
  const [isSecondSideModalOpen, setIsSecondSideModalOpen] = useState(false)

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false)

  const [isThirdModalOpen, setIsThirdModalOpen] = useState(false)
  const [isFourthModalOpen, setIsFourthModalOpen] = useState(false)
  const [isFifthModalOpen, setIsFifthModalOpen] = useState(false)

  return (
    <div>
      <div className={styles.link}>
        <h1 style={{ textDecoration: 'underline' }}>
          <a href="https://jira.uhub.biz/browse/WPPLONOP-17148">Bugfix #17148 - issue with overflow: hidden</a>
        </h1>
      </div>
      <div className={styles.page}>
        <div className={styles.pageSection}>
          <WppTypography class={styles.info} type="m-strong">
            Side Modal opens Side Modal
          </WppTypography>
          <WppButton onClick={() => setIsSideModalOpen(true)}>Open Side Modal</WppButton>
          <WppSideModal
            open={isSideModalOpen}
            onWppSideModalClose={() => setIsSideModalOpen(false)}
            onWppSideModalOpen={() => setIsSideModalOpen(true)}
          >
            <div slot="header">Modal Title</div>
            <p slot="body">Modal content</p>
            <div slot="actions">
              <WppButton
                className={styles.btnWMargin}
                variant="secondary"
                onClick={() => setIsSecondSideModalOpen(true)}
              >
                Open second Modal
              </WppButton>
              <WppButton variant="destructive" className={styles.margin} onClick={() => setIsSideModalOpen(false)}>
                Cancel
              </WppButton>
            </div>
          </WppSideModal>

          <WppSideModal
            open={isSecondSideModalOpen}
            onWppSideModalClose={() => setIsSecondSideModalOpen(false)}
            onWppSideModalOpen={() => setIsSecondSideModalOpen(true)}
          >
            <div slot="header">Modal Title</div>
            <p slot="body">Modal content</p>
            <div slot="actions">
              <WppButton
                variant="destructive"
                className={styles.margin}
                onClick={() => setIsSecondSideModalOpen(false)}
              >
                Close second modal
              </WppButton>
            </div>
          </WppSideModal>
        </div>

        <div className={styles.pageSection}>
          <WppTypography class={styles.info} type="m-strong">
            Modal opens Modal
          </WppTypography>
          <WppButton onClick={() => setIsModalOpen(true)}>Open Modal</WppButton>
          <WppModal
            open={isModalOpen}
            onWppModalClose={() => setIsModalOpen(false)}
            onWppModalOpen={() => setIsModalOpen(true)}
          >
            <div slot="header">Modal Title</div>
            <p slot="body">Modal content</p>
            <div slot="actions">
              <WppButton className={styles.btnWMargin} variant="secondary" onClick={() => setIsSecondModalOpen(true)}>
                Open second Modal
              </WppButton>
              <WppButton variant="destructive" className={styles.margin} onClick={() => setIsModalOpen(false)}>
                Cancel
              </WppButton>
            </div>
          </WppModal>
          <WppModal
            open={isSecondModalOpen}
            onWppModalClose={() => setIsSecondModalOpen(false)}
            onWppModalOpen={() => setIsSecondModalOpen(true)}
          >
            <div slot="header">Modal Title</div>
            <p slot="body">Modal content</p>
            <div slot="actions">
              <WppButton variant="destructive" className={styles.margin} onClick={() => setIsSecondModalOpen(false)}>
                Close second modal
              </WppButton>
            </div>
          </WppModal>
        </div>

        <div className={styles.pageSection}>
          <WppTypography class={styles.info} type="m-strong">
            Modal opens Side Modal opens Modal
          </WppTypography>
          <WppButton onClick={() => setIsThirdModalOpen(true)}>Open Modal</WppButton>
          <WppModal
            open={isThirdModalOpen}
            onWppModalClose={() => setIsThirdModalOpen(false)}
            onWppModalOpen={() => setIsThirdModalOpen(true)}
          >
            <div slot="header">Modal Title</div>
            <p slot="body">Modal content</p>
            <div slot="actions">
              <WppButton className={styles.btnWMargin} variant="secondary" onClick={() => setIsFourthModalOpen(true)}>
                Open second Modal
              </WppButton>
              <WppButton variant="destructive" className={styles.margin} onClick={() => setIsThirdModalOpen(false)}>
                Cancel
              </WppButton>
            </div>
          </WppModal>
          <WppSideModal
            class={styles.maxZIndex}
            open={isFourthModalOpen}
            onWppSideModalClose={() => setIsFourthModalOpen(false)}
            onWppSideModalOpen={() => setIsFourthModalOpen(true)}
          >
            <div slot="header">Modal Title</div>
            <p slot="body">Modal content</p>
            <div slot="actions">
              <WppButton className={styles.btnWMargin} variant="secondary" onClick={() => setIsFifthModalOpen(true)}>
                Open third Modal
              </WppButton>
              <WppButton variant="destructive" className={styles.margin} onClick={() => setIsFourthModalOpen(false)}>
                Close second modal
              </WppButton>
            </div>
          </WppSideModal>
          <WppModal
            class={styles.maxZIndex}
            open={isFifthModalOpen}
            onWppModalClose={() => setIsFifthModalOpen(false)}
            onWppModalOpen={() => setIsFifthModalOpen(true)}
          >
            <div slot="header">Modal Title</div>
            <p slot="body">Modal content</p>
            <div slot="actions">
              <WppButton variant="destructive" className={styles.margin} onClick={() => setIsFifthModalOpen(false)}>
                Close third modal
              </WppButton>
            </div>
          </WppModal>
        </div>
      </div>
    </div>
  )
}

export default SideModals
