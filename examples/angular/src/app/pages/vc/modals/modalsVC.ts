import { ChangeDetectionStrategy, Component } from '@angular/core'
import { ActionConfig } from '@platform-ui-kit/components-library'
import { CONFIG_CASE_1, CONFIG_CASE_2, CONFIG_CASE_3 } from './config'

@Component({
  selector: 'app-modal-example',
  templateUrl: './modalsVC.html',
  styleUrls: ['./modalsVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalsVC {
  public isShowSecondPage = false
  public isModalOpen = false
  public isSideModalOpen = false
  public isSideModalWithActionsConfigOpen: boolean = false
  public isRegularModalOpen = false
  public isErrorModalOpen = false
  public isSideModalWithControlsOpen = false
  public isSideModalWithoutControlsOpen = false
  public isFullScreenModalWithControlsOpen = false
  public isFullScreenModalWithoutControlsOpen = false
  public selectValue = ''
  public LIST = [
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
    {
      label: 'Flat',
      value: 4,
    },
    {
      label: 'Stone',
      value: 5,
    },
    {
      label: 'Plane',
      value: 6,
    },
    {
      label: 'Chair',
      value: 7,
    },
  ]

  public loading = false
  public disabled = false
  public selectedCase = 1

  public closeChildSideModal(emittedValue: any) {
    console.log(emittedValue)
    if (emittedValue === 'closeSideModal') this.isSideModalOpen = false
  }

  public tooltipConfig = {
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
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  public handleOpenSideModalWithActionsConfig(): void {
    this.isSideModalWithActionsConfigOpen = true
  }

  public handleCloseSideModalWithActionsConfig(): void {
    this.isSideModalWithActionsConfigOpen = false
  }

  public handleActionClick(event: Event): void {
    console.log('Action clicked:', event)
  }

  public handleCloseModal = () => (this.isModalOpen = false)

  public handleCloseRegularModal = () => (this.isRegularModalOpen = false)
  public handleOpenRegularModal = () => (this.isRegularModalOpen = true)

  public handleCloseErrorModal = () => (this.isErrorModalOpen = false)
  public handleOpenErrorModal = () => (this.isErrorModalOpen = true)

  public handleCloseReasonForModal = () => (this.isModalOpen = false)
  public handleOpenModal = () => (this.isModalOpen = true)

  public handleCloseSideModal = () => (this.isSideModalOpen = false)

  public handleCloseReasonForSideModal = () => (this.isSideModalOpen = false)
  public handleOpenSideModal = () => (this.isSideModalOpen = true)

  public handleCloseSideModalWithControls = () => (this.isSideModalWithControlsOpen = false)
  public handleOpenSideModalWithControls = () => (this.isSideModalWithControlsOpen = true)

  public handleCloseSideModalWithoutControls = () => (this.isSideModalWithoutControlsOpen = false)
  public handleOpenSideModalWithoutControls = () => (this.isSideModalWithoutControlsOpen = true)

  public handleCloseFullScreenModalWithControls = () => (this.isFullScreenModalWithControlsOpen = false)
  public handleOpenFullScreenModalWithControls = () => (this.isFullScreenModalWithControlsOpen = true)

  public handleCloseFullScreenModalWithoutControls = () => (this.isFullScreenModalWithoutControlsOpen = false)
  public handleOpenFullScreenModalWithoutControls = () => (this.isFullScreenModalWithoutControlsOpen = true)

  public handleActionModal = () => {
    alert('Confirm')
    this.handleCloseModal()
    this.handleCloseSideModal()
  }

  public handleNextPage = () => {
    this.isShowSecondPage = true
  }

  public openCloseTransitionEvent = (event: Event, msg: string) => {
    if ((event as CustomEvent)?.detail) {
      console.log(`${new Date().toISOString()}: ${msg} event :>>`, (event as CustomEvent)?.detail)
    } else {
      console.log(`${new Date().toISOString()}: ${msg}`)
    }
  }

  public handleChangeLoading = () => {
    this.loading = !this.loading
  }

  public handleChangeDisabled = () => {
    this.disabled = !this.disabled
  }

  public handleChangeSelectedCase = (caseNumber: number) => {
    this.selectedCase = caseNumber
  }

  public getActionsConfig = (): ActionConfig => {
    switch (this.selectedCase) {
      case 1: {
        return CONFIG_CASE_1(this.loading, this.disabled) as ActionConfig
      }
      case 2: {
        return CONFIG_CASE_2(this.loading, this.disabled, this.handleCloseSideModalWithActionsConfig) as ActionConfig
      }
      case 3: {
        return CONFIG_CASE_3(this.loading, this.disabled, this.handleCloseSideModalWithActionsConfig) as ActionConfig
      }
      default: {
        return CONFIG_CASE_1(this.loading, this.disabled) as ActionConfig
      }
    }
  }

  public handleSelectChange = (event: Event) => {
    const customEvent = event as CustomEvent

    this.selectValue = customEvent.detail.value
  }
}
