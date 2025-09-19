import { Locator } from '@playwright/test'
import { BasePage } from './base.page'

export class WppStepperPage extends BasePage {
  private _nextButton!: Locator
  private _stepper!: Locator
  private _horizontalStepperTab!: Locator
  private _completedStep!: Locator
  private _completedStepVerticalStepper!: Locator
  private _firstPageVerticalStepper!: Locator
  private _thirdPageVerticalStepper!: Locator
  private _thirdStepVerticalStepper!: Locator
  private _secondPageHorizontalStepper!: Locator
  private _fourthPageHorizontalStepper!: Locator
  private _fourthStep!: Locator
  private _iconStep!: Locator
  private _iconStepVerticalStepper!: Locator
  private _errorIcon!: Locator
  private _tooltipText!: Locator
  private _stepperRadioButton!: Locator
  private _previousButton!: Locator
  private _horizontalStepperStepOne!: Locator
  private _horizontalStepperStepTwo!: Locator
  private _horizontalStepperStepThree!: Locator

  private _verticalStepperStepOne!: Locator
  private _verticalStepperStep2Substep1!: Locator
  private _verticalStepperStep2Substep2!: Locator
  private _verticalStepperStepTwo!: Locator

  get nextButton(): Locator {
    return this._nextButton
  }

  get stepper(): Locator {
    return this._stepper
  }

  get horizontalStepperTab(): Locator {
    return this._horizontalStepperTab
  }

  get completedStep(): Locator {
    return this._completedStep
  }

  get completedStepVerticalStepper(): Locator {
    return this._completedStepVerticalStepper
  }

  get firstPageVerticalStepper(): Locator {
    return this._firstPageVerticalStepper
  }

  get thirdPageVerticalStepper(): Locator {
    return this._thirdPageVerticalStepper
  }

  get thirdStepVerticalStepper(): Locator {
    return this._thirdStepVerticalStepper
  }

  get secondPageHorizontalStepper(): Locator {
    return this._secondPageHorizontalStepper
  }

  get fourthPageHorizontalStepper(): Locator {
    return this._fourthPageHorizontalStepper
  }

  get fourthStep(): Locator {
    return this._fourthStep
  }

  get iconStep(): Locator {
    return this._iconStep
  }

  get iconStepVerticalStepper(): Locator {
    return this._iconStepVerticalStepper
  }

  get errorIcon(): Locator {
    return this._errorIcon
  }

  get tooltipText(): Locator {
    return this._tooltipText
  }

  get stepperRadioButton(): Locator {
    return this._stepperRadioButton
  }

  get previousButton(): Locator {
    return this._previousButton
  }

  get horizontalStepperStepOne(): Locator {
    return this._horizontalStepperStepOne
  }

  get horizontalStepperStepTwo(): Locator {
    return this._horizontalStepperStepTwo
  }

  get horizontalStepperStepThree(): Locator {
    return this._horizontalStepperStepThree
  }

  get verticalStepperStepOne(): Locator {
    return this._verticalStepperStepOne
  }

  get verticalStepperStep2Substep1(): Locator {
    return this._verticalStepperStep2Substep1
  }

  get verticalStepperStep2Substep2(): Locator {
    return this._verticalStepperStep2Substep2
  }

  get verticalStepperStepTwo(): Locator {
    return this._verticalStepperStepTwo
  }

  async init() {
    this._nextButton = this.page.locator('[data-testid="next-button"] button')
    this._stepper = this.page.locator('[data-testid="stepper"]')
    this._horizontalStepperTab = this.page.locator('[value="horizontal"]')
    this._completedStep = this.page.locator('.step .completed')
    this._completedStepVerticalStepper = this.page.locator('.step .completed')
    this._firstPageVerticalStepper = this.page.locator('[data-testid="first-page"]')
    this._thirdPageVerticalStepper = this.page.locator('[data-testid="third-page"]')
    this._thirdStepVerticalStepper = this.page.locator('[index="5"]')
    this._secondPageHorizontalStepper = this.page.locator('[data-testid="second-page"]')
    this._fourthPageHorizontalStepper = this.page.locator('[data-testid="fourth-page"]')
    this._fourthStep = this.page.locator('[step="4"]')
    this._iconStep = this.page.locator('.step .with-icon')
    this._iconStepVerticalStepper = this.page.locator('.step-bg .with-icon')
    this._errorIcon = this.page.locator('.wpp-icon-error')
    this._errorIcon = this.page.locator('.wpp-icon-error')
    this._tooltipText = this.page.locator('[part="tooltip-content"] span')
    this._stepperRadioButton = this.page.locator('[data-testid="stepper-radio-button"]')
    this._previousButton = this.page.locator('[data-testid="previous-button"]')
    this._horizontalStepperStepOne = this.page.locator('.wpp-step.wpp-horizontal[index="1"][step="1"]')
    this._horizontalStepperStepTwo = this.page.locator('.wpp-step.wpp-horizontal[index="2"][step="2"]')
    this._horizontalStepperStepThree = this.page.locator('.wpp-step.wpp-horizontal[index="3"][step="3"]')

    this._verticalStepperStepOne = this.page.locator('.wpp-step.wpp-vertical[index="1"][step="1"]')
    this._verticalStepperStepTwo = this.page.locator('.wpp-step.wpp-vertical[index="2"][step="2"]')
    this._verticalStepperStep2Substep1 = this.page.locator('.wpp-step.wpp-vertical[index="3"][step="3"][substep]')
    this._verticalStepperStep2Substep2 = this.page.locator('.wpp-step.wpp-vertical[index="4"][step="3"][substep]')
    }
}
