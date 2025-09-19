import { useState } from 'react'
import {
  WppAvatar,
  WppButton,
  WppCard,
  WppModal,
  WppSideModal,
  WppSelect,
  WppToast,
  WppInlineMessage,
  WppTextareaInput,
  WppFileUpload,
  WppFullScreenModal,
  WppStepper,
  WppStep,
  WppRadio,
  WppTypography,
  WppDivider,
  WppActionButton,
  WppIconRemoveCircle,
  WppDatepicker,
} from '@platform-ui-kit/components-library-react'

import styles from './ModalsVC.module.scss'
import stepperStyles from './../Steppers/CommonStepperVC.module.scss'
import { CONFIG_CASE_1, CONFIG_CASE_2, CONFIG_CASE_3 } from './config'
import { ActionConfig } from '@platform-ui-kit/components-library'
import { SAMPLE_LIST_1, SAMPLE_LIST_MULTIPLE } from '../../SingleSelect/consts'

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
      <p>First Page Body</p>
      <WppSelect
        placeholder="Placeholder"
        list={[
          {
            label: 'Car',
            value: 1,
          },
          {
            label: 'House',
            value: 2,
            disabled: true,
          },
          {
            label: 'Apartment',
            value: 3,
          },
        ]}
      ></WppSelect>
      <WppTextareaInput
        placeholder="Enter text"
        value="Regular Text Area with Limit"
        charactersLimit={10}
        required
        labelConfig={{
          text: 'Regular Text Area with Limit',
        }}
      />
      <WppFileUpload />
    </div>
    <div className={styles.modalActions} slot="actions">
      <WppButton variant="secondary" onClick={handleCloseSideModal} className={styles.button}>
        Cancel
      </WppButton>
      <WppButton variant="destructive" onClick={handleNextPage}>
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

const ThirdPage = ({
  handleCloseSideModal,
  handleCloseFullScreenModal,
}: {
  handleCloseSideModal?: () => void
  handleCloseFullScreenModal?: () => void
}) => (
  <>
    <div slot="header">Page Title</div>
    <div slot="body">
      Page Body
      <WppFileUpload />
      <WppSelect placeholder="Placeholder" list={SAMPLE_LIST_1}></WppSelect>
      <div className={stepperStyles.main}>
        <div className={stepperStyles.wrapper} style={{ height: '200px' }}>
          <div className={stepperStyles.stepper}>
            <WppStepper activeStep={1}>
              <WppStep>
                <p slot="label" className={stepperStyles.text}>
                  Step
                </p>
              </WppStep>
              <WppStep>
                <p slot="label" className={stepperStyles.text}>
                  Step
                </p>
              </WppStep>
              <WppStep>
                <p slot="label" className={stepperStyles.text}>
                  Step
                </p>
              </WppStep>
            </WppStepper>
          </div>
          <div className={stepperStyles.pages}>
            <div className={`${stepperStyles.inner}`}>
              <div className={stepperStyles.page} style={{ height: '200px' }}>
                <h3>Page 1</h3>
                <WppRadio className={stepperStyles.margin} labelConfig={{ text: 'Option 1' }} required />
              </div>
            </div>
          </div>
        </div>
        <div className={stepperStyles.buttons}>
          <WppButton>Previous Step</WppButton>
          <WppButton>Next Step</WppButton>
        </div>
      </div>
    </div>
    <div slot="actions" className={styles.buttons}>
      <WppButton
        variant="secondary"
        onClick={handleCloseSideModal || handleCloseFullScreenModal}
        className={styles.button}
      >
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
          className={[styles.avatar, 'hover-avatar'].join(' ')}
          withTooltip
          size="s"
          name="John Smith Junior"
          color="var(--wpp-dataviz-color-cat-dark-9)"
        />
        <WppCard className={styles.card}>
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

      <WppSelect placeholder="Placeholder" list={SAMPLE_LIST_1}></WppSelect>

      <h3>File Upload</h3>
      <WppFileUpload />
    </div>
  </>
)

const FifthPage = () => (
  <>
    <div slot="header">Fifth Page Title</div>
    <div slot="body">
      <p>This is the content of the fifth page, used to demonstrate the `actionsConfig` feature.</p>
    </div>
  </>
)

const contentWithDropdown = () => (
  <>
    <div slot="header">Scenario 01</div>
    <div slot="body" className={styles.dropdownsContent}>
      <WppDatepicker name="datepicker-small" size="s" />

      <WppSelect
        withFolder
        name="select-component"
        data-testid="default-multiple-select-scenario-1"
        type="multiple"
        labelConfig={{
          text: 'Size M',
        }}
        placeholder={'Choose option'}
        value={[]}
        list={SAMPLE_LIST_MULTIPLE}
        onWppChange={(e: CustomEvent) => {
          console.log('On Change multiple', e.detail)
        }}
      />
    </div>
  </>
)

export const ModalsVCPage = () => {
  const [isShowSecondPage, setSecondPage] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false)
  const [isSideModalOpen, setSideModalOpen] = useState(false)

  const [loading, setLoading] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const [selectedCase, setSelectedCase] = useState<number>(1)

  const handleCloseModal = () => setModalOpen(false)
  const [isRegularModalOpen, setRegularModalStatus] = useState(false)
  const [isErrorModalOpen, setErrorModalStatus] = useState(false)
  const [isSideModalWithControlsOpen, setSideModalWithControlsStatus] = useState(false)
  const [isSideModalWithoutControlsOpen, setSideModalWithoutControlsStatus] = useState(false)
  const [isFullScreenModalWithControlsOpen, setFullScreenModalWithControlsStatus] = useState(false)
  const [isFullScreenModalWithoutControlsOpen, setFullScreenModalWithoutControlsStatus] = useState(false)

  const [isOpenSideModalScenario1, setIsOpenSideModalScenario1] = useState(false)
  const [isOpenModalScenario1, setIsOpenModalScenario1] = useState(false)
  const [isOpenFullScreenModalScenario1, setIsOpenFullScreenModalScenario1] = useState(false)

  const handleCloseRegularModal = () => setRegularModalStatus(false)
  const handleOpenRegularModal = () => setRegularModalStatus(true)

  const handleCloseErrorModal = () => setErrorModalStatus(false)
  const handleOpenErrorModal = () => setErrorModalStatus(true)

  const handleCloseReasonForModal = (event: CustomEvent) => {
    console.log('event :>> ', event?.detail)
    setModalOpen(false)
  }
  const handleOpenModal = () => setModalOpen(true)

  const handleCloseSideModal = () => setSideModalOpen(false)

  const handleCloseReasonForSideModal = (event: CustomEvent) => {
    console.log('event :>> ', event?.detail)
    setSideModalOpen(false)
  }

  const [isSideModalWithActionsConfigOpen, setSideModalWithActionsConfigOpen] = useState(false)
  const handleOpenSideModalWithActionsConfig = () => setSideModalWithActionsConfigOpen(true)
  const handleCloseSideModalWithActionsConfig = () => setSideModalWithActionsConfigOpen(false)

  const handleOpenSideModal = () => setSideModalOpen(true)

  const handleCloseSideModalWithControls = () => setSideModalWithControlsStatus(false)
  const handleOpenSideModalWithControls = () => setSideModalWithControlsStatus(true)

  const handleCloseSideModalWithoutControls = () => setSideModalWithoutControlsStatus(false)
  const handleOpenSideModalWithoutControls = () => setSideModalWithoutControlsStatus(true)

  const handleCloseFullScreenModalWithControls = () => setFullScreenModalWithControlsStatus(false)
  const handleOpenFullScreenModalWithControls = () => setFullScreenModalWithControlsStatus(true)

  const handleCloseFullScreenModalWithoutControls = () => setFullScreenModalWithoutControlsStatus(false)
  const handleOpenFullScreenModalWithoutControls = () => setFullScreenModalWithoutControlsStatus(true)

  const handleActionModal = () => {
    alert('Confirm')
    handleCloseModal()
    handleCloseSideModal()
  }

  const handleNextPage = () => {
    setSecondPage(true)
  }

  const transitionHandlerMessage = (msg: string, event: CustomEvent) => {
    if (event?.detail) {
      console.log(`${new Date().toISOString()}: ${msg} event :>>`, event?.detail)
    } else {
      console.log(`${new Date().toISOString()}: ${msg}`)
    }
  }

  const getActionsConfig = (): ActionConfig => {
    switch (selectedCase) {
      case 1: {
        return CONFIG_CASE_1(loading, disabled) as ActionConfig
      }
      case 2: {
        return CONFIG_CASE_2(loading, disabled, handleCloseSideModalWithActionsConfig) as ActionConfig
      }
      case 3: {
        return CONFIG_CASE_3(loading, disabled, handleCloseSideModalWithActionsConfig) as ActionConfig
      }
      default: {
        return CONFIG_CASE_1(loading, disabled) as ActionConfig
      }
    }
  }

  return (
    <>
      <>
        <WppButton onClick={handleOpenModal}>Open Modal (Custom Width)</WppButton>
        <WppModal
          data-testid="wpp-modal-custom-width"
          className={styles.custom}
          open={isModalOpen}
          onWppModalClose={handleCloseReasonForModal}
          onWppModalOpen={handleOpenModal}
          onWppModalCloseStart={transitionHandlerMessage.bind(null, 'Close animation start!')}
          onWppModalCloseComplete={transitionHandlerMessage.bind(null, 'Close animation complete!')}
          onWppModalOpenStart={transitionHandlerMessage.bind(null, 'Open animation start!')}
          onWppModalOpenComplete={transitionHandlerMessage.bind(null, 'Open animation complete!')}
        >
          <div slot="header">Modal Title</div>
          <div slot="body">
            <p>Modal content</p>
            <WppSelect placeholder="Placeholder" list={SAMPLE_LIST_1}></WppSelect>
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

        <WppButton className={styles.margin} onClick={handleOpenSideModal}>
          Open Side Modal (S Size)
        </WppButton>
        <WppSideModal
          open={isSideModalOpen}
          onWppSideModalClose={handleCloseReasonForSideModal}
          onWppSideModalOpen={handleOpenSideModal}
          onWppSideModalCloseStart={transitionHandlerMessage.bind(null, 'Close animation start!')}
          onWppSideModalCloseComplete={transitionHandlerMessage.bind(null, 'Close animation complete!')}
          onWppSideModalOpenStart={transitionHandlerMessage.bind(null, 'Open animation start!')}
          onWppSideModalOpenComplete={transitionHandlerMessage.bind(null, 'Open animation complete!')}
          size="s"
          data-testid="wpp-side-modal-size-s"
        >
          {isShowSecondPage ? (
            <SecondPage handleCloseSideModal={handleCloseSideModal} />
          ) : (
            <FirstPage handleNextPage={handleNextPage} handleCloseSideModal={handleCloseSideModal} />
          )}
        </WppSideModal>
      </>

      <div className={styles.container}>
        <WppButton onClick={handleOpenRegularModal} className={styles.button} data-testid="regular-modal">
          Open Regular Modal (M Size)
        </WppButton>
        <WppModal
          open={isRegularModalOpen}
          onWppModalClose={handleCloseRegularModal}
          onWppModalOpen={handleOpenRegularModal}
          size="m"
          data-testid="regular-modal-size-m"
        >
          <div slot="header">Regular Modal</div>
          <div slot="body">
            <p style={{ padding: '100px 0' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
            <WppSelect placeholder="Placeholder" list={SAMPLE_LIST_1}></WppSelect>
          </div>
          <div slot="actions" className={styles.buttons}>
            <WppButton variant="secondary" className={styles.button} onClick={handleCloseRegularModal}>
              Cancel
            </WppButton>
            <WppButton variant="primary">Confirm</WppButton>
          </div>
        </WppModal>

        <WppButton onClick={handleOpenErrorModal} className={styles.button} data-testid="error-modal">
          Open Error Modal (S Size)
        </WppButton>
        <WppModal
          open={isErrorModalOpen}
          onWppModalClose={handleCloseErrorModal}
          onWppModalOpen={handleOpenErrorModal}
          size="s"
          data-testid="wpp-modal-size-s"
        >
          <div className={styles.header} slot="header">
            <span className={styles.text}>This is an error message</span>
          </div>
          <div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
          <div slot="actions" className={styles.buttons}>
            <WppButton variant="secondary" className={styles.button} onClick={handleCloseErrorModal}>
              Cancel
            </WppButton>
            <WppButton variant="destructive">Confirm</WppButton>
          </div>
        </WppModal>
      </div>

      <div className={styles.container}>
        <WppButton
          onClick={handleOpenSideModalWithControls}
          className={styles.button}
          data-testid="side-modal-with-controls"
        >
          Side Modal with Controls (M Size)
        </WppButton>
        <WppSideModal
          open={isSideModalWithControlsOpen}
          onWppSideModalClose={handleCloseSideModalWithControls}
          onWppSideModalOpen={handleOpenSideModalWithControls}
          size="m"
          data-testid="side-modal-with-controls-m-size"
        >
          <ThirdPage handleCloseSideModal={handleCloseSideModalWithControls} />
        </WppSideModal>

        <WppButton onClick={handleOpenSideModalWithoutControls} data-testid="side-modal-without-controls">
          Side Modal w/o Controls (L Size)
        </WppButton>
        <WppSideModal
          open={isSideModalWithoutControlsOpen}
          onWppSideModalClose={handleCloseSideModalWithoutControls}
          onWppSideModalOpen={handleOpenSideModalWithoutControls}
          size="l"
          data-testid="wpp-side-modal-size-l"
        >
          <FourthPage />
        </WppSideModal>
      </div>

      <div className={styles.container}>
        <WppButton
          onClick={handleOpenFullScreenModalWithControls}
          className={styles.button}
          data-testid="fullscreen-modal-with-controls-button"
        >
          Full Screen Modal with Controls
        </WppButton>
        <WppFullScreenModal
          open={isFullScreenModalWithControlsOpen}
          onWppFullScreenModalClose={handleCloseFullScreenModalWithControls}
          onWppFullScreenModalOpen={handleOpenFullScreenModalWithControls}
          onWppFullScreenModalCloseStart={transitionHandlerMessage.bind(null, 'Close animation start!')}
          onWppFullScreenModalCloseComplete={transitionHandlerMessage.bind(null, 'Close animation complete!')}
          onWppFullScreenModalOpenStart={transitionHandlerMessage.bind(null, 'Open animation start!')}
          onWppFullScreenModalOpenComplete={transitionHandlerMessage.bind(null, 'Open animation complete!')}
          data-testid="fullscreen-side-modal-with-controls-m-size"
        >
          <ThirdPage handleCloseFullScreenModal={handleCloseFullScreenModalWithControls} />
        </WppFullScreenModal>

        <WppButton
          onClick={handleOpenFullScreenModalWithoutControls}
          data-testid="fullscreen-modal-without-controls-button"
        >
          Full Screen Modal w/o Controls
        </WppButton>
        <WppFullScreenModal
          data-testid="fullscreen-modal-without-controls"
          open={isFullScreenModalWithoutControlsOpen}
          onWppFullScreenModalClose={handleCloseFullScreenModalWithoutControls}
          onWppFullScreenModalOpen={handleOpenFullScreenModalWithoutControls}
        >
          <FourthPage />
        </WppFullScreenModal>
      </div>

      <div className={styles.actionsContainer}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Side Modal with new property `actionsConfig`
        </WppTypography>
        <WppButton
          onClick={handleOpenSideModalWithActionsConfig}
          className={styles.button}
          data-testid="side-modal-with-actionsconfig"
        >
          Side Modal with ActionsConfig (New Example)
        </WppButton>

        <form id="test-form">
          <WppSideModal
            open={isSideModalWithActionsConfigOpen}
            onWppSideModalClose={handleCloseSideModalWithActionsConfig}
            onWppSideModalOpen={handleOpenSideModalWithActionsConfig}
            size="m"
            actionsConfig={getActionsConfig()}
            data-testid="wpp-side-modal-size-m-actionsConfig"
          >
            <FifthPage />
          </WppSideModal>
        </form>

        <div className={styles.actionsSection}>
          <WppButton
            data-testid="wpp-button-trigger-loading"
            onClick={() => setLoading(!loading)}
            className={styles.actionItem}
          >
            Trigger loading in buttons
          </WppButton>
          <WppButton
            data-testid="wpp-button-toggle-disable"
            onClick={() => setDisabled(!disabled)}
            className={styles.actionItem}
          >
            {disabled ? 'Enable' : 'Disable'} buttons
          </WppButton>
        </div>
      </div>

      <div className={styles.configurations}>
        <WppTypography className={styles.sectionTitle} type="xl-heading">
          Setting different button configurations to the side-modal in order to test restrictions
        </WppTypography>
        <div className={styles.section}>
          <WppTypography className={styles.subTitle} type="xl-heading">
            Case 01
          </WppTypography>

          <div className={styles.sectionContent}>
            <WppButton
              data-testid="wpp-button-set-config-1"
              onClick={() => setSelectedCase(1)}
              className={styles.sectionSetBtn}
            >
              Set configuration to:{' '}
            </WppButton>

            <div className={styles.btnsContainer}>
              <WppButton variant="primary" className={styles.btnItem}>
                Submit
              </WppButton>
            </div>
          </div>

          <WppDivider />
        </div>

        <div className={styles.section}>
          <WppTypography className={styles.subTitle} type="xl-heading">
            Case 02
          </WppTypography>

          <div className={styles.sectionContent}>
            <WppButton
              data-testid="wpp-button-set-config-2"
              onClick={() => setSelectedCase(2)}
              className={styles.sectionSetBtn}
            >
              Set configuration to:{' '}
            </WppButton>

            <div className={styles.btnsContainer}>
              <WppButton variant="secondary" className={styles.btnItem}>
                Close
              </WppButton>
              <WppButton className={styles.btnItem}>Submit</WppButton>
            </div>
          </div>

          <WppDivider />
        </div>

        <div className={styles.section}>
          <WppTypography className={styles.subTitle} type="xl-heading">
            Case 03
          </WppTypography>

          <div className={styles.sectionContent}>
            <WppButton
              data-testid="wpp-button-set-config-3"
              onClick={() => setSelectedCase(3)}
              className={styles.sectionSetBtn}
            >
              Set configuration to:{' '}
            </WppButton>

            <div className={styles.btnsContainer}>
              <WppActionButton variant="destructive">
                <WppIconRemoveCircle slot="icon-start" />
                Remove
              </WppActionButton>
              <WppButton variant="secondary" className={styles.btnItem}>
                Close
              </WppButton>
              <WppButton className={styles.btnItem}>Submit</WppButton>
            </div>
          </div>

          <WppDivider />
        </div>
      </div>
      <div className={styles.scenario}>
        <WppTypography type="2xl-heading">Scenario 01: dropdown components in side-modal</WppTypography>

        <WppTypography className={styles.subTitle} type="l-body">
          The width of the dropdown should be at least as big as the width of the anchor element.
        </WppTypography>

        <div className={styles.content}>
          <WppButton
            onClick={() => setIsOpenSideModalScenario1(true)}
            className={styles.button}
            data-testid="side-modal-scenario-1"
          >
            Side Modal with dropdowns
          </WppButton>

          <WppButton
            onClick={() => setIsOpenModalScenario1(true)}
            className={styles.button}
            data-testid="modal-scenario-1"
          >
            Modal with dropdowns
          </WppButton>

          <WppButton
            onClick={() => setIsOpenFullScreenModalScenario1(true)}
            className={styles.button}
            data-testid="fullscreen-modal-scenario-1"
          >
            FullScreen Modal with dropdowns
          </WppButton>

          <WppSideModal
            open={isOpenSideModalScenario1}
            onWppSideModalClose={() => setIsOpenSideModalScenario1(false)}
            size="m"
            actionsConfig={CONFIG_CASE_2(false, false, () => setIsOpenSideModalScenario1(false)) as ActionConfig}
            data-testid="wpp-side-modal-scenario-1"
          >
            {contentWithDropdown()}
          </WppSideModal>

          <WppModal
            open={isOpenModalScenario1}
            onWppModalClose={() => setIsOpenModalScenario1(false)}
            size="m"
            data-testid="wpp-side-modal-scenario-1"
          >
            {contentWithDropdown()}
          </WppModal>

          <WppFullScreenModal
            open={isOpenFullScreenModalScenario1}
            onWppFullScreenModalClose={() => setIsOpenFullScreenModalScenario1(false)}
            data-testid="wpp-side-modal-scenario-1"
          >
            {contentWithDropdown()}
          </WppFullScreenModal>
        </div>
      </div>
      {/* TODO: Remove after QA https://jira.uhub.biz/browse/WPPLONOP-3764 */}
      <WppToast
        className={styles.withMargin}
        header="Info Header"
        message="Info Message Text"
        type="information"
        duration={60000}
      />
    </>
  )
}
