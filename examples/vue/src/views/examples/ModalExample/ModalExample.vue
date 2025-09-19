<script setup lang="ts">
import { ref } from 'vue'

import {
  WppModal,
  WppSideModal,
  WppButton,
  WppIconError,
  WppIconWarning,
  WppActionButton,
  WppToast,
} from '@platform-ui-kit/components-library-vue'

import FirstPage from './components/FirstPage.vue'
import SecondPage from './components/SecondPage.vue'
import ThirdPage from './components/ThirdPage.vue'
import FourthPage from './components/FourthPage.vue'

const isShowSecondPage = ref(false)
const isModalOpen = ref(false)
const isSideModalOpen = ref(false)

const isRegularModalOpen = ref(false)
const isWarningModalOpen = ref(false)
const isErrorModalOpen = ref(false)
const isSideModalWithControlsOpen = ref(false)
const isSideModalWithoutControlsOpen = ref(false)

const handleCloseModal = () => (isModalOpen.value = false)

const handleCloseRegularModal = () => (isRegularModalOpen.value = false)
const handleOpenRegularModal = () => (isRegularModalOpen.value = true)

const handleCloseWarningModal = () => (isWarningModalOpen.value = false)
const handleOpenWarningModal = () => (isWarningModalOpen.value = true)

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

const handleActionModal = () => {
  alert('Confirm')
  handleCloseModal()
  handleCloseSideModal()
}

const handleNextPage = () => {
  isShowSecondPage.value = true
}
</script>

<template>
  <div class="page-container">
    <div>
      <h1>Page</h1>
      <WppButton @click="handleOpenModal">Open Modal (Custom Width)</WppButton>
      <WppModal
        class="custom"
        :open="isModalOpen"
        @wppModalClose="handleCloseReasonForModal"
        @wppModalOpen="handleOpenModal"
      >
        <div slot="header">Modal Title</div>
        <div slot="body">Modal content</div>
        <div slot="actions">
          <WppButton variant="secondary" @click="handleCloseModal"> Cancel </WppButton>
          <WppButton variant="destructive" class="margin" @click="handleActionModal"> Confirm </WppButton>
        </div>
      </WppModal>

      <WppButton class="margin" @click="handleOpenSideModal"> Open Side Modal (S Size) </WppButton>
      <WppSideModal
        :open="isSideModalOpen"
        @wppSideModalClose="handleCloseReasonForSideModal"
        @wppSideModalOpen="handleOpenSideModal"
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
      >
        <div slot="header">Regular Modal</div>
        <div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <div slot="actions" class="buttons">
          <WppButton variant="secondary" class="button" @click="handleCloseRegularModal"> Cancel </WppButton>
          <WppButton variant="primary">Confirm</WppButton>
        </div>
      </WppModal>

      <WppButton @click="handleOpenWarningModal" class="button" data-testid="warning-modal">
        Open Warning Modal (S Size)
      </WppButton>
      <WppModal
        :open="isWarningModalOpen"
        @wppModalClose="handleCloseWarningModal"
        @wppModalOpen="handleOpenWarningModal"
        size="s"
      >
        <div class="modal-header" slot="header">
          <WppIconWarning slot="icon-start" />
          <span class="text">This is a warning message</span>
        </div>
        <div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <div slot="actions" class="buttons">
          <WppButton variant="secondary" class="button" @click="handleCloseWarningModal"> Cancel </WppButton>
          <WppButton variant="destructive">Confirm</WppButton>
        </div>
      </WppModal>

      <WppButton @click="handleOpenErrorModal" data-testid="error-modal"> Open Error Modal (Custom Width) </WppButton>
      <WppModal
        class="custom"
        size="m"
        :open="isErrorModalOpen"
        @wppModalClose="handleCloseErrorModal"
        @wppModalOpen="handleOpenErrorModal"
      >
        <div class="modal-header" slot="header">
          <WppIconError slot="icon-start" />
          <span class="text">This is an error message</span>
        </div>
        <div slot="body">Lorem ipsum dolor sit amet, consectetur adipiscing elit</div>
        <div slot="actions" class="buttons">
          <WppButton variant="primary">Confirm</WppButton>
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
    <WppToast
      class="toast-item"
      header="Info Header"
      message="Info Message Text"
      type="information"
      :duration="60000"
    />
  </div>
</template>

<style scoped>
.page-container {
  height: 1200px;
}

.margin {
  margin-left: 10px;
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

.modal-header {
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
</style>
