import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppModalsPage extends BasePage {
  private _regularModalButton!: Locator
  private _regularModal!: Locator
  private _errorModalButton!: Locator
  private _sideModalWithControlsButton!: Locator
  private _sideModalWithControls!: Locator
  private _sideModalWithoutControlsButton!: Locator
  private _modalAvatar!: Locator
  private _fullScreenModalWithControlsButton!: Locator
  private _fullScreenModalWithoutControlsButton!: Locator
  private _cancelBtn!: Locator
  private _sideModalSizeM!: Locator
  private _sideModalSizeL!: Locator
  private _sideModalWithActionsConfigSizeM!: Locator
  private _triggerLoadingBtn!: Locator
  private _disableBtn!: Locator
  private _setConfigurationBtn!: Locator
  private _sideModalWithActionsConfigBtn!: Locator
  private _overlayModal!: Locator
  private _fullScreenModalWindow!: Locator
  private __fullScreenModalWindowWithControls!: Locator
  private _modalSizeM!: Locator
  private _modalSizeS!: Locator
  private _setConfigurationWithSubmitBtn!: Locator
  private _setConfigurationWithSubmitCloseBtn!: Locator
  private _setConfigurationWithSubmitCloseDeleteBtn!: Locator

  static EventTexts = {
    customEventOpenStartText: 'Open Start',
    customEventOpenEndText: 'Open End',
    customEventCloseStartText: 'Close Start',
    customEventCloseEndText: 'Close End',
    eventCloseText: 'Called: onWppSideModalClose',
  }

  get regularModalButton(): Locator {
    return this._regularModalButton
  }

  get regularModal(): Locator {
    return this._regularModal
  }

  get errorModalButton(): Locator {
    return this._errorModalButton
  }

  get sideModalWithControlsButton(): Locator {
    return this._sideModalWithControlsButton
  }

  get sideModalWithControls(): Locator {
    return this._sideModalWithControls
  }

  get sideModalWithoutControlsButton(): Locator {
    return this._sideModalWithoutControlsButton
  }

  get modalAvatar(): Locator {
    return this._modalAvatar
  }

  get fullScreenModalWithControlsButton(): Locator {
    return this._fullScreenModalWithControlsButton
  }

  get fullScreenModalWithoutControlsButton(): Locator {
    return this._fullScreenModalWithoutControlsButton
  }

  get cancelBtn(): Locator {
    return this._cancelBtn
  }

  get sideModalSizeM(): Locator {
    return this._sideModalSizeM
  }

  get sideModalSizeL(): Locator {
    return this._sideModalSizeL
  }

  get sideModalWithActionsConfigSizeM(): Locator {
    return this._sideModalWithActionsConfigSizeM
  }

  get triggerLoadingBtn(): Locator {
    return this._triggerLoadingBtn
  }

  get disableBtn(): Locator {
    return this._disableBtn
  }

  get setConfigurationBtn(): Locator {
    return this._setConfigurationBtn
  }

  get sideModalWithActionsConfigBtn(): Locator {
    return this._sideModalWithActionsConfigBtn
  }

  get overlayModal(): Locator {
    return this._overlayModal
  }

  get fullScreenModalWindow(): Locator {
    return this._fullScreenModalWindow
  }

  get fullScreenModalWindowWithControls(): Locator {
    return this.__fullScreenModalWindowWithControls
  }

  get modalSizeM(): Locator {
    return this._modalSizeM
  }

  get modalSizeS(): Locator {
    return this._modalSizeS
  }

  get setConfigurationWithSubmitBtn(): Locator {
    return this._setConfigurationWithSubmitBtn
  }

  get setConfigurationWithSubmitCloseBtn(): Locator {
    return this._setConfigurationWithSubmitCloseBtn
  }

  get setConfigurationWithSubmitCloseDeleteBtn(): Locator {
    return this._setConfigurationWithSubmitCloseDeleteBtn
  }

  async init() {
    this._regularModalButton = this.page.locator('[data-testid="regular-modal"] button')
    this._regularModal = this.page.getByTestId('regular-modal-size-m')
    this._errorModalButton = this.page.getByTestId('error-modal')
    this._sideModalWithControlsButton = this.page.getByTestId('side-modal-with-controls')
    this._sideModalWithControls = this.page.getByTestId('side-modal-with-controls-m-size')
    this._sideModalWithoutControlsButton = this.page.getByTestId('side-modal-without-controls')
    this._modalAvatar = this.page.locator('.hover-avatar')
    this._fullScreenModalWithControlsButton = this.page.getByTestId('fullscreen-modal-with-controls-button')
    this._fullScreenModalWithoutControlsButton = this.page.getByTestId(
      'fullscreen-modal-without-controls-button',
    )
    this._cancelBtn = this.page.getByTestId('wppButton')
    this._sideModalSizeM = this.page.getByTestId('side-modal-with-controls-m-size').getByTestId('wpp-side-modal-content')
    this._sideModalSizeL = this.page.getByTestId('wpp-side-modal-size-l').getByTestId('wpp-side-modal-content')
    this._sideModalWithActionsConfigSizeM = this.page.getByTestId('wpp-side-modal-size-m-actionsConfig').getByTestId('wpp-side-modal-content')
    this._triggerLoadingBtn = this.page.getByTestId('wpp-button-trigger-loading')
    this._disableBtn = this.page.getByTestId('wpp-button-toggle-disable')
    this._setConfigurationBtn = this.page.getByTestId('wppButton')
    this._sideModalWithActionsConfigBtn = this.page.getByTestId('side-modal-with-actionsconfig')
    this._overlayModal = this.page.getByTestId('wpp-side-modal-size-m-actionsConfig')
    this._fullScreenModalWindow = this.page.getByTestId('fullscreen-modal-without-controls').getByTestId('wpp-fullscreen-modal-content')
    this.__fullScreenModalWindowWithControls = this.page.getByTestId('fullscreen-side-modal-with-controls-m-size').getByTestId('wpp-fullscreen-modal-content')
    this._modalSizeM = this.page.getByTestId('regular-modal-size-m').getByTestId('wpp-modal-content')
    this._modalSizeS = this.page.getByTestId('wpp-modal-size-s').getByTestId('wpp-modal-content')
    this._setConfigurationWithSubmitBtn = this.page.getByTestId('wpp-button-set-config-1')
    this._setConfigurationWithSubmitCloseBtn = this.page.getByTestId('wpp-button-set-config-2')
    this._setConfigurationWithSubmitCloseDeleteBtn = this.page.getByTestId('wpp-button-set-config-3')
  }
}
