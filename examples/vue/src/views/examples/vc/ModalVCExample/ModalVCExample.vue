<script setup lang="ts">
import { computed, ref } from 'vue'

import {
  WppModal,
  WppSideModal,
  WppFullScreenModal,
  WppButton,
  WppToast,
  WppSelect,
  WppTypography,
  WppActionButton,
  WppDivider,
  WppIconRemoveCircle,
} from '@platform-ui-kit/components-library-vue'

import { CONFIG_CASE_1, CONFIG_CASE_2, CONFIG_CASE_3 } from './config'
import FirstPage from './components/FirstPage.vue'
import SecondPage from './components/SecondPage.vue'
import ThirdPage from './components/ThirdPage.vue'
import FourthPage from './components/FourthPage.vue'
import FifthPage from './components/FifthPage.vue'
import ContentWithDropdown from './components/ContentWithDropdown.vue'
import type { ActionConfig } from '@platform-ui-kit/components-library/components'

const selectValue1 = ref('')

const loading = ref(false)
const disabled = ref(false)
const selectedCase = ref(1)

const isShowSecondPage = ref(false)
const isModalOpen = ref(false)
const isSideModalOpen = ref(false)

const isRegularModalOpen = ref(false)
const isErrorModalOpen = ref(false)
const isSideModalWithControlsOpen = ref(false)
const isSideModalWithoutControlsOpen = ref(false)
const isFullScreenModalWithControlsOpen = ref(false)
const isFullScreenModalWithoutControlsOpen = ref(false)
const isSideModalBackdropOpen = ref(false)

const isOpenSideModalScenario1 = ref(false)
const isOpenModalScenario1 = ref(false)
const isOpenFullScreenModalScenario1 = ref(false)

const handleCloseModal = () => (isModalOpen.value = false)

const handleCloseRegularModal = () => (isRegularModalOpen.value = false)
const handleOpenRegularModal = () => (isRegularModalOpen.value = true)

const handleCloseErrorModal = () => (isErrorModalOpen.value = false)
const handleOpenErrorModal = () => (isErrorModalOpen.value = true)

const handleCloseReasonForModal = () => (isModalOpen.value = false)
const handleOpenModal = () => (isModalOpen.value = true)

const handleCloseSideModal = () => (isSideModalOpen.value = false)

const handleCloseReasonForSideModal = () => (isSideModalOpen.value = false)
const handleOpenSideModal = () => (isSideModalOpen.value = true)

const handleCloseSideModalWithControls = () => (isSideModalWithControlsOpen.value = false)
const handleOpenSideModalWithControls = () => (isSideModalWithControlsOpen.value = true)

const handleCloseSideModalWithoutControls = () => (isSideModalWithoutControlsOpen.value = false)
const handleOpenSideModalWithoutControls = () => (isSideModalWithoutControlsOpen.value = true)

const handleCloseFullScreenModalWithControls = () => (isFullScreenModalWithControlsOpen.value = false)
const handleOpenFullScreenModalWithControls = () => (isFullScreenModalWithControlsOpen.value = true)

const handleCloseFullScreenModalWithoutControls = () => (isFullScreenModalWithoutControlsOpen.value = false)
const handleOpenFullScreenModalWithoutControls = () => (isFullScreenModalWithoutControlsOpen.value = true)
const handleCloseSideModalBackdrop = () => (isSideModalBackdropOpen.value = false)
const handleOpenSideModalBackdrop = () => (isSideModalBackdropOpen.value = true)

const handleActionModal = () => {
  alert('Confirm')
  handleCloseModal()
  handleCloseSideModal()
}

const handleNextPage = () => {
  isShowSecondPage.value = true
}

const openCloseTransitionEvent = (event: CustomEvent, msg: string) => {
  if (event?.detail) {
    console.log(`${new Date().toISOString()}: ${msg} event :>>`, event?.detail)
  } else {
    console.log(`${new Date().toISOString()}: ${msg}`)
  }
}
const isSideModalWithActionsConfigOpen = ref(false)

const handleOpenSideModalWithActionsConfig = () => (isSideModalWithActionsConfigOpen.value = true)
const handleCloseSideModalWithActionsConfig = () => (isSideModalWithActionsConfigOpen.value = false)

const handleChangeLoading = () => {
  loading.value = !loading.value
}

const handleChangeDisabled = () => {
  disabled.value = !disabled.value
}

const handleChangeSelectedCase = (newValue: number) => {
  selectedCase.value = newValue
}

const getActionsConfig = (): ActionConfig => {
  switch (selectedCase.value) {
    case 1: {
      return CONFIG_CASE_1(loading.value, disabled.value) as ActionConfig
    }
    case 2: {
      return CONFIG_CASE_2(loading.value, disabled.value, handleCloseSideModalWithActionsConfig) as ActionConfig
    }
    case 3: {
      return CONFIG_CASE_3(loading.value, disabled.value, handleCloseSideModalWithActionsConfig) as ActionConfig
    }
    default: {
      return CONFIG_CASE_1(loading.value, disabled.value) as ActionConfig
    }
  }
}

const handleValueChange1 = (event: CustomEvent) => {
  selectValue1.value = event.detail.value
}
</script>

<template>
  <div class="page-container">
    <div>
      <WppButton @click="handleOpenModal">Open Modal (Custom Width)</WppButton>
      <WppModal
        class="custom"
        :open="isModalOpen"
        @wppModalClose="handleCloseReasonForModal"
        @wppModalOpen="handleOpenModal"
        @wppModalCloseStart="openCloseTransitionEvent($event, 'Close animation start!')"
        @wppModalCloseComplete="openCloseTransitionEvent($event, 'Close animation complete!')"
        @wppModalOpenStart="openCloseTransitionEvent($event, 'Open animation start!')"
        @wppModalOpenComplete="openCloseTransitionEvent($event, 'Open animation complete!')"
      >
        <div slot="header">Modal Title</div>
        <div slot="body">
          <p>Modal content</p>
          <WppSelect
            placeholder="Placeholder"
            :value="selectValue1"
            @wppChange="handleValueChange1"
            :list="[
              {
                value: 1,
                label: 'Car',
              },
              {
                value: 2,
                label: 'House',
                disabled: true,
              },
              {
                value: 3,
                label: 'Apartment',
              },
              {
                value: 4,
                label: 'Flat',
              },
              {
                value: 5,
                label: 'Stone',
              },
              {
                value: 6,
                label: 'Plane',
              },
              {
                value: 7,
                label: 'Chair',
              },
            ]"
          >
          </WppSelect>
        </div>
        <div class="modal-actions" slot="actions">
          <WppButton variant="secondary" @click="handleCloseModal"> Cancel</WppButton>
          <WppButton variant="destructive" class="margin" @click="handleActionModal"> Confirm</WppButton>
        </div>
      </WppModal>

      <WppButton class="margin" @click="handleOpenSideModal"> Open Side Modal (S Size)</WppButton>
      <WppSideModal
        :open="isSideModalOpen"
        @wppSideModalClose="handleCloseReasonForSideModal"
        @wppSideModalOpen="handleOpenSideModal"
        @wppSideModalCloseStart="openCloseTransitionEvent($event, 'Close animation start!')"
        @wppSideModalCloseComplete="openCloseTransitionEvent($event, 'Close animation complete!')"
        @wppSideModalOpenStart="openCloseTransitionEvent($event, 'Open animation start!')"
        @wppSideModalOpenComplete="openCloseTransitionEvent($event, 'Open animation complete!')"
        size="s"
      >
        <SecondPage @closeSideModal="handleCloseSideModal" v-if="isShowSecondPage" />
        <FirstPage @openNextPage="handleNextPage" @closeSideModal="handleCloseSideModal" v-else />
      </WppSideModal>
    </div>

    <div class="container">
      <WppButton @click="handleOpenRegularModal" class="button" data-testid="regular-modal">
        Open Regular Modal (M Size)
      </WppButton>
      <WppModal
        :open="isRegularModalOpen"
        @wppModalClose="handleCloseRegularModal"
        @wppModalOpen="handleOpenRegularModal"
        size="m"
        data-testid="regular-modal-size-m"
      >
        <div slot="header">Regular Modal</div>
        <div slot="body">
          <p style="padding: 100px 0">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
          <WppSelect
            placeholder="Placeholder"
            :value="selectValue1"
            @wppChange="handleValueChange1"
            :list="[
              {
                value: 1,
                label: 'Car',
              },
              {
                value: 2,
                label: 'House',
                disabled: true,
              },
              {
                value: 3,
                label: 'Apartment',
              },
              {
                value: 4,
                label: 'Flat',
              },
              {
                value: 5,
                label: 'Stone',
              },
              {
                value: 6,
                label: 'Plane',
              },
              {
                value: 7,
                label: 'Chair',
              },
            ]"
          >
          </WppSelect>
        </div>
        <div slot="actions" class="buttons">
          <WppButton variant="secondary" class="button" @click="handleCloseRegularModal"> Cancel</WppButton>
          <WppButton variant="primary">Confirm</WppButton>
        </div>
      </WppModal>

      <WppButton @click="handleOpenErrorModal" class="button" data-testid="error-modal">
        Open Error Modal (S Size)
      </WppButton>
      <WppModal
        :open="isErrorModalOpen"
        @wppModalClose="handleCloseErrorModal"
        @wppModalOpen="handleOpenErrorModal"
        size="s"
      >
        <div class="header" slot="header">
          <span class="text">This is an error message</span>
        </div>
        <div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <div slot="actions" class="buttons">
          <WppButton variant="secondary" class="button" @click="handleCloseErrorModal"> Cancel</WppButton>
          <WppButton variant="destructive">Confirm</WppButton>
        </div>
      </WppModal>
    </div>

    <div class="container">
      <WppButton @click="handleOpenSideModalWithControls" class="button" data-testid="side-modal-with-controls">
        Side Modal with Controls (M Size)
      </WppButton>
      <WppSideModal
        :open="isSideModalWithControlsOpen"
        @wppSideModalClose="handleCloseSideModalWithControls"
        @wppSideModalOpen="handleOpenSideModalWithControls"
        size="m"
        data-testid="side-modal-with-controls-m-size"
      >
        <ThirdPage @closeSideModal="handleCloseSideModalWithControls" />
      </WppSideModal>

      <WppButton @click="handleOpenSideModalWithoutControls" data-testid="side-modal-without-controls">
        Side Modal w/o Controls (L Size)
      </WppButton>
      <WppSideModal
        :open="isSideModalWithoutControlsOpen"
        @wppSideModalClose="handleCloseSideModalWithoutControls"
        @wppSideModalOpen="handleOpenSideModalWithoutControls"
        size="l"
      >
        <FourthPage />
      </WppSideModal>
    </div>

    <div class="container">
      <WppButton
        @click="handleOpenFullScreenModalWithControls"
        class="button"
        data-testid="fullscreen-modal-with-controls-button"
      >
        Full Screen Modal with Controls
      </WppButton>
      <WppFullScreenModal
        :open="isFullScreenModalWithControlsOpen"
        @wppFullScreenModalClose="handleCloseFullScreenModalWithControls"
        @wppFullScreenModalOpen="handleOpenFullScreenModalWithControls"
        @wppFullScreenModalCloseStart="openCloseTransitionEvent($event, 'Close animation start!')"
        @wppFullScreenModalCloseComplete="openCloseTransitionEvent($event, 'Close animation complete!')"
        @wppFullScreenModalOpenStart="openCloseTransitionEvent($event, 'Open animation start!')"
        @wppFullScreenModalOpenComplete="openCloseTransitionEvent($event, 'Open animation complete!')"
        data-testid="fullscreen-side-modal-with-controls-m-size"
      >
        <ThirdPage @closeFullScreenModal="handleCloseFullScreenModalWithControls" />
      </WppFullScreenModal>

      <WppButton
        @click="handleOpenFullScreenModalWithoutControls"
        class="button"
        data-testid="fullscreen-modal-without-controls-button"
      >
        Full Screen Modal w/o Controls
      </WppButton>
      <WppFullScreenModal
        :open="isFullScreenModalWithoutControlsOpen"
        @wppFullScreenModalClose="handleCloseFullScreenModalWithoutControls"
        @wppFullScreenModalOpen="handleOpenFullScreenModalWithoutControls"
      >
        <FourthPage />
      </WppFullScreenModal>

      <WppButton @click="handleOpenSideModalBackdrop"> Open Modal without overlay </WppButton>
    </div>
    <div class="actionsContainer">
      <WppTypography class="sectionTitle" type="xl-heading">
        Side Modal with new property `actionsConfig`
      </WppTypography>
      <WppButton
        @click="handleOpenSideModalWithActionsConfig"
        class="button"
        data-testid="side-modal-with-actionsconfig"
      >
        Side Modal with ActionsConfig (New Example)
      </WppButton>

      <form id="test-form">
        <WppSideModal
          :open="isSideModalWithActionsConfigOpen"
          @wppSideModalClose="handleCloseSideModalWithActionsConfig"
          @wppSideModalOpen="handleOpenSideModalWithActionsConfig"
          size="m"
          :actionsConfig="getActionsConfig()"
        >
          <FifthPage />
        </WppSideModal>
      </form>

      <WppSideModal
        :open="isSideModalBackdropOpen"
        @wppSideModalClose="handleCloseSideModalBackdrop"
        @wppSideModalOpen="handleOpenSideModalBackdrop"
        :backdrop-visible="false"
        size="s"
      >
        <ThirdPage @closeSideModal="handleCloseSideModalBackdrop" />
      </WppSideModal>

      <div class="actionsSection">
        <WppButton @click="handleChangeLoading" class="actionItem"> Trigger loading in buttons </WppButton>
        <WppButton @click="handleChangeDisabled" class="actionItem">
          {{ disabled ? 'Enable' : 'Disable' }} buttons
        </WppButton>
      </div>

      <div class="configurations">
        <WppTypography class="sectionTitle" type="xl-heading">
          Setting different button configurations to the side-modal in order to test restrictions
        </WppTypography>
        <div class="section">
          <WppTypography class="subTitle" type="xl-heading"> Case 01 </WppTypography>

          <div class="sectionContent">
            <WppButton @click="handleChangeSelectedCase(1)" class="sectionSetBtn"> Set configuration to: </WppButton>

            <div class="btnsContainer">
              <WppButton variant="primary" class="btnItem"> Submit </WppButton>
            </div>
          </div>

          <WppDivider></WppDivider>
        </div>

        <div class="section">
          <WppTypography class="subTitle" type="xl-heading"> Case 02 </WppTypography>

          <div class="sectionContent">
            <WppButton @click="handleChangeSelectedCase(2)" class="sectionSetBtn"> Set configuration to: </WppButton>

            <div class="btnsContainer">
              <WppButton variant="secondary" class="btnItem"> Close </WppButton>
              <WppButton class="btnItem">Submit</WppButton>
            </div>
          </div>

          <WppDivider />
        </div>

        <div class="section">
          <WppTypography class="subTitle" type="xl-heading"> Case 03 </WppTypography>

          <div class="sectionContent">
            <WppButton @click="handleChangeSelectedCase(3)" class="sectionSetBtn"> Set configuration to: </WppButton>

            <div class="btnsContainer">
              <WppActionButton variant="destructive">
                <WppIconRemoveCircle slot="icon-start" />
                Remove
              </WppActionButton>
              <WppButton variant="secondary" class="btnItem"> Close </WppButton>
              <WppButton class="btnItem">Submit</WppButton>
            </div>
          </div>

          <WppDivider />
        </div>
      </div>
    </div>

    <div class="scenario">
      <WppTypography type="2xl-heading">Scenario 01: dropdown components in side-modal</WppTypography>

      <WppTypography class="subTitle" type="l-body">
        The width of the dropdown should be at least as big as the width of the anchor element.
      </WppTypography>

      <div class="content">
        <WppButton @click="isOpenSideModalScenario1 = true" class="button" data-testid="side-modal-scenario-1">
          Side Modal with dropdowns
        </WppButton>

        <WppButton @click="isOpenModalScenario1 = true" class="button" data-testid="modal-scenario-1">
          Modal with dropdowns
        </WppButton>

        <WppButton
          @click="isOpenFullScreenModalScenario1 = true"
          class="button"
          data-testid="fullscreen-modal-scenario-1"
        >
          FullScreen Modal with dropdowns
        </WppButton>

        <WppSideModal
          :open="isOpenSideModalScenario1"
          @wppSideModalClose="isOpenSideModalScenario1 = false"
          size="m"
          :actionsConfig="CONFIG_CASE_2(false, false, () => isOpenSideModalScenario1 = false) as ActionConfig"
          data-testid="wpp-side-modal-scenario-1"
        >
          <ContentWithDropdown />
        </WppSideModal>

        <WppModal
          :open="isOpenModalScenario1"
          @wppModalClose="isOpenModalScenario1 = false"
          size="m"
          data-testid="wpp-side-modal-scenario-1"
        >
          <ContentWithDropdown />
        </WppModal>

        <WppFullScreenModal
          :open="isOpenFullScreenModalScenario1"
          @wppFullScreenModalClose="isOpenFullScreenModalScenario1 = false"
          data-testid="wpp-side-modal-scenario-1"
        >
          <ContentWithDropdown />
        </WppFullScreenModal>
      </div>
    </div>
    <WppToast
      class="withMargin"
      header="Info Header"
      message="Info Message Text"
      type="information"
      :duration="60000"
    />
  </div>
</template>

<style scoped lang="scss">
.page-container {
  height: 1000px;
}

.margin {
  margin-left: 10px;
}

.message {
  display: flex;
  margin: 16px 0;
}

.avatar {
  flex: 0 0 auto;
  margin-top: 8px;
  margin-right: 16px;
}

.card {
  flex: 1 1 auto;
}

.message p {
  line-height: 1.3;
}

.buttons {
  display: flex;
  justify-content: flex-end;
}

.button {
  margin-right: 12px;
}

.header {
  display: flex;
  align-items: center;
}

.container {
  margin-top: 20px;
}

.text {
  margin-left: 9px;
}

.custom {
  --modal-width-m: 500px;
  --modal-width-s: 300px;
}

.withMargin {
  margin-top: 8px;
  margin-bottom: 8px;
}

.actionsSection {
  margin-top: 20px;
}

.actionItem {
  margin-right: 10px;
  margin-bottom: 10px;
}

.actionsContainer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.sectionTitle {
  margin-bottom: 20px;
}

.configurations {
  margin-top: 20px;
}

.section {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.sectionContent {
  display: flex;
  margin-top: 10px;
  margin-bottom: 20px;
}

.btnsContainer {
  margin-left: 100px;
}

.btnItem {
  margin-left: 20px;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
}

.subTitle {
  margin: 20px 0;
}
</style>
