import { ChangeDetectionStrategy, Component } from '@angular/core'
import { StepChangeEventDetail } from '@platform-ui-kit/components-library'

@Component({
  selector: 'app-horizontal-stepper-example',
  templateUrl: './horizontal-stepperVC.html',
  styleUrls: ['./horizontal-stepperVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalStepperVC {
  public LAST_PAGE_COUNT = 6
  public FIRST_PAGE_COUNT = 1
  public REQUIRED_STEP_NUMBER = 4

  public currentStep = this.FIRST_PAGE_COUNT
  public isChecked = false
  public isError = false

  handleNextStep = () => {
    if (this.currentStep === this.LAST_PAGE_COUNT) return
    if (this.currentStep === this.REQUIRED_STEP_NUMBER && !this.isChecked) {
      this.isError = true

      return
    }

    this.currentStep = this.currentStep + 1
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  handlePreviousStep = () => {
    if (this.currentStep === this.FIRST_PAGE_COUNT) return

    this.currentStep = this.currentStep - 1
  }

  handleCheckbox = ({ detail }: any) => {
    const { checked } = detail

    this.isChecked = checked
    this.isError = !checked
  }

  handleStepClick = (event: Event) => {
    const index = (event as CustomEvent<StepChangeEventDetail>).detail.index

    if (!index) return

    this.currentStep = index
  }

  getPageClassName = () => `inner page-${this.currentStep}`
}
