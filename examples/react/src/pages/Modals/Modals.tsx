import { useState } from 'react'
import {
  WppAvatar,
  WppButton,
  WppCard,
  WppIconError,
  WppIconWarning,
  WppModal,
  WppSideModal,
  WppSelect,
  WppToast,
  WppInlineMessage,
  WppTypography,
} from '@platform-ui-kit/components-library-react'

import styles from './Modals.module.scss'

const FirstPage = ({
  handleNextPage,
  handleCloseSideModal,
}: {
  handleNextPage: () => void
  handleCloseSideModal: () => void
}) => (
  <>
    <div slot="header">First Page Title</div>
    <div slot="body">
      {/* TODO: remove after test https://jira.uhub.biz/browse/WPPLONOP-3763 */}
      <WppInlineMessage
        size="m"
        message="Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum"
        type="information"
      />
      <WppAvatar
        size="m"
        name="John Doe"
        withTooltip
        tooltipConfig={{
          placement: 'left',
          popperOptions: {
            modifiers: [
              {
                name: 'flip',
                options: {
                  fallbackPlacements: ['left'],
                },
              },
            ],
          },
        }}
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8huvp8b3bXl2v8ac6MSqz0Uk3zqauY2ttIA&usqp=CAU"
      />
      <p style={{ padding: '200px 0' }}>First Page Body</p>
      <WppSelect
        placeholder="Placeholder"
        list={[
          { value: 1, label: 'Car' },
          { value: 2, label: 'House', disabled: true },
          { value: 3, label: 'Apartment' },
        ]}
      ></WppSelect>
    </div>
    <div className={styles.modalActions} slot="actions">
      <WppButton variant="secondary" onClick={handleCloseSideModal}>
        Cancel
      </WppButton>
      <WppButton variant="destructive" className={styles.margin} onClick={handleNextPage}>
        Next Page
      </WppButton>
    </div>
  </>
)

const SecondPage = ({ handleCloseSideModal }: { handleCloseSideModal: () => void }) => (
  <>
    <div slot="header">Second Page Title</div>
    <div slot="body">
      <div className={styles.message}>
        <WppAvatar withTooltip size="s" name="John Smith Junior" />
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
    </div>
    <div className={styles.modalActions} slot="actions">
      <WppButton variant="destructive" onClick={handleCloseSideModal}>
        Close
      </WppButton>
    </div>
  </>
)

const ThirdPage = ({ handleCloseSideModal }: { handleCloseSideModal: () => void }) => (
  <>
    <div slot="header">Page Title</div>
    <p slot="body">Page Body</p>
    <div slot="actions" className={styles.buttons}>
      <WppButton variant="secondary" onClick={handleCloseSideModal} className={styles.button}>
        Cancel
      </WppButton>
      <WppButton variant="primary">Select</WppButton>
    </div>
  </>
)

const FourthPage = () => (
  <>
    <div slot="header">Fourth Page Title</div>
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
    </div>
  </>
)

export const ModalsPage = () => {
  const [isShowSecondPage, setSecondPage] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSideModalOpen, setSideModalOpen] = useState(false)

  const handleCloseModal = () => setModalOpen(false)
  const [isRegularModalOpen, setRegularModalStatus] = useState(false)
  const [isWarningModalOpen, setWarningModalStatus] = useState(false)
  const [isErrorModalOpen, setErrorModalStatus] = useState(false)
  const [isSideModalWithControlsOpen, setSideModalWithControlsStatus] = useState(false)
  const [isSideModalWithoutControlsOpen, setSideModalWithoutControlsStatus] = useState(false)
  const [isSideModalXLOpen, setIsSideModalXLOpen] = useState(false)
  const [isSideModal2XLOpen, setIsSideModal2XLOpen] = useState(false)
  const [isSideModalBackdropOpen, setIsSideModalBackdropOpen] = useState(false)

  const handleCloseRegularModal = () => setRegularModalStatus(false)
  const handleOpenRegularModal = () => setRegularModalStatus(true)

  const handleCloseWarningModal = () => setWarningModalStatus(false)
  const handleOpenWarningModal = () => setWarningModalStatus(true)

  const handleCloseErrorModal = () => setErrorModalStatus(false)
  const handleOpenErrorModal = () => setErrorModalStatus(true)

  const handleCloseReasonForModal = (event: CustomEvent) => {
    console.log('event :>> ', event?.detail)
    setModalOpen(false)
  }
  const handleOpenModal = () => setModalOpen(true)

  const handleCloseSideModal = () => {
    setSideModalOpen(false)

    if (isSideModalBackdropOpen) {
      setIsSideModalBackdropOpen(false)
    }
  }

  const handleCloseReasonForSideModal = (event: CustomEvent) => {
    console.log('event :>> ', event?.detail)
    setSideModalOpen(false)
  }

  const handleOpenSideModal = () => setSideModalOpen(true)

  const handleCloseSideModalWithControls = () => setSideModalWithControlsStatus(false)
  const handleOpenSideModalWithControls = () => setSideModalWithControlsStatus(true)

  const handleCloseSideModalWithoutControls = () => setSideModalWithoutControlsStatus(false)
  const handleOpenSideModalWithoutControls = () => setSideModalWithoutControlsStatus(true)

  const handleActionModal = () => {
    alert('Confirm')
    handleCloseModal()
    handleCloseSideModal()
  }

  const handleNextPage = () => {
    setSecondPage(true)
  }

  const handleModalCloseComplete = (event: CustomEvent) => {
    console.log('modalCloseComplete', event)
  }

  const handleSideModalCloseComplete = (event: CustomEvent) => {
    console.log('sideModalCloseComplete', event)
  }

  return (
    <>
      <WppTypography className={styles.subheading} type="2xl-heading">
        Regular Modals
      </WppTypography>
      <div className={styles.container}>
        <WppButton onClick={handleOpenModal}>Open Modal (size s)</WppButton>
        <WppModal
          open={isModalOpen}
          onWppModalClose={handleCloseReasonForModal}
          onWppModalCloseComplete={handleModalCloseComplete}
          onWppModalOpen={handleOpenModal}
        >
          <div slot="header">Modal Title</div>
          <div slot="body">
            <p>Modal content that is really really really really really very loooooong</p>
          </div>
          <div className={styles.modalActions} slot="actions">
            <WppButton variant="secondary" onClick={handleCloseModal}>
              Cancel
            </WppButton>
            <WppButton variant="destructive" className={styles.margin} onClick={handleActionModal}>
              Confirm
            </WppButton>
          </div>
        </WppModal>
        <WppButton
          onClick={handleOpenRegularModal}
          className={(styles.button, styles.margin)}
          data-testid="regular-modal"
        >
          Open Modal (size m)
        </WppButton>
        <WppModal
          open={isRegularModalOpen}
          onWppModalClose={handleCloseRegularModal}
          onWppModalOpen={handleOpenRegularModal}
          size="m"
        >
          <div slot="header">Regular Modal</div>
          <p slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <div slot="actions" className={styles.buttons}>
            <WppButton variant="secondary" className={styles.button} onClick={handleCloseRegularModal}>
              Cancel
            </WppButton>
            <WppButton variant="primary">Confirm</WppButton>
          </div>
        </WppModal>
        <WppButton
          onClick={handleOpenWarningModal}
          className={(styles.button, styles.margin)}
          data-testid="warning-modal"
        >
          Open Warning Modal (size s)
        </WppButton>
        <WppModal
          open={isWarningModalOpen}
          onWppModalClose={handleCloseWarningModal}
          onWppModalOpen={handleOpenWarningModal}
        >
          <h3 className={styles.header} slot="header">
            <WppIconWarning slot="icon-start" />
            <span className={styles.text}>This is a warning message</span>
          </h3>
          <p slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <div slot="actions" className={styles.buttons}>
            <WppButton variant="secondary" className={styles.button} onClick={handleCloseWarningModal}>
              Cancel
            </WppButton>
            <WppButton variant="destructive">Confirm</WppButton>
          </div>
        </WppModal>
        <WppButton className={styles.margin} onClick={handleOpenErrorModal} data-testid="error-modal">
          Open Error Modal (size m)
        </WppButton>
        <WppModal
          size="m"
          open={isErrorModalOpen}
          onWppModalClose={handleCloseErrorModal}
          onWppModalOpen={handleOpenErrorModal}
        >
          <h3 className={styles.header} slot="header">
            <WppIconError slot="icon-start" />
            <span className={styles.text}>This is an error message</span>
          </h3>
          <p slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <div slot="actions" className={styles.buttons}>
            <WppButton variant="primary">Confirm</WppButton>
          </div>
        </WppModal>
      </div>

      <WppTypography className={styles.subheading} type="2xl-heading">
        Side Modals
      </WppTypography>
      <div className={styles.container}>
        <WppButton onClick={handleOpenSideModal}>Open Modal (size s)</WppButton>
        <WppSideModal
          open={isSideModalOpen}
          onWppSideModalClose={handleCloseReasonForSideModal}
          onWppSideModalOpen={handleOpenSideModal}
          onWppSideModalCloseComplete={handleSideModalCloseComplete}
          size="s"
        >
          {isShowSecondPage ? (
            <SecondPage handleCloseSideModal={handleCloseSideModal} />
          ) : (
            <FirstPage handleNextPage={handleNextPage} handleCloseSideModal={handleCloseSideModal} />
          )}
        </WppSideModal>
        <WppButton
          onClick={handleOpenSideModalWithControls}
          className={(styles.button, styles.margin)}
          data-testid="side-modal-with-controls"
        >
          Open Modal with Controls (size m)
        </WppButton>
        <WppSideModal
          open={isSideModalWithControlsOpen}
          onWppSideModalClose={handleCloseSideModalWithControls}
          onWppSideModalOpen={handleOpenSideModalWithControls}
          size="m"
        >
          <ThirdPage handleCloseSideModal={handleCloseSideModalWithControls} />
        </WppSideModal>

        <WppButton
          className={styles.margin}
          onClick={handleOpenSideModalWithoutControls}
          data-testid="side-modal-without-controls"
        >
          Open Modal w/o Controls (size l)
        </WppButton>
        <WppSideModal
          open={isSideModalWithoutControlsOpen}
          onWppSideModalClose={handleCloseSideModalWithoutControls}
          onWppSideModalOpen={handleOpenSideModalWithoutControls}
          size="l"
        >
          <FourthPage />
        </WppSideModal>
        <WppButton className={styles.margin} onClick={() => setIsSideModalXLOpen(true)}>
          Open Modal (size xl)
        </WppButton>
        <WppSideModal
          open={isSideModalXLOpen}
          onWppSideModalClose={() => setIsSideModalXLOpen(false)}
          onWppSideModalCloseComplete={handleSideModalCloseComplete}
          size="xl"
        >
          <FourthPage />
        </WppSideModal>
        <WppButton className={styles.margin} onClick={() => setIsSideModal2XLOpen(true)}>
          Open Modal (size 2xl)
        </WppButton>
        <WppSideModal
          open={isSideModal2XLOpen}
          onWppSideModalClose={() => setIsSideModal2XLOpen(false)}
          onWppSideModalCloseComplete={handleSideModalCloseComplete}
          size="2xl"
        >
          <FourthPage />
        </WppSideModal>

        <WppButton className={styles.margin} onClick={() => setIsSideModalBackdropOpen(true)}>
          Open Modal without overlay
        </WppButton>
        <WppSideModal
          open={isSideModalBackdropOpen}
          backdropVisible={false}
          onWppSideModalClose={() => setIsSideModalBackdropOpen(false)}
          onWppSideModalOpen={() => setIsSideModalBackdropOpen(true)}
          size="s"
        >
          {isShowSecondPage ? (
            <SecondPage handleCloseSideModal={handleCloseSideModal} />
          ) : (
            <FirstPage handleNextPage={handleNextPage} handleCloseSideModal={handleCloseSideModal} />
          )}
        </WppSideModal>
      </div>
      {/* TODO: Remove after QA https://jira.uhub.biz/browse/WPPLONOP-3764 */}
      <WppToast
        className="toast-item"
        header="Info Header"
        message="Info Message Text"
        type="information"
        duration={60000}
      />
      <div className={styles.empty}>
        <WppTypography type="l-strong">Empty space to make the scrollbar appear</WppTypography>
      </div>
    </>
  )
}
