import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core'

@Component({
  selector: 'app-decimal-vertical-stepper-example',
  templateUrl: './decimal-vertical-stepperVC.html',
  styleUrls: ['./decimal-vertical-stepperVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DecimalVerticalStepperVC {
  public LAST_PAGE = 5
  public FIRST_PAGE = 1
  public REQUIRED_STEP = 3.2

  public currentStep = this.FIRST_PAGE
  public isChecked = false
  public isError = false

  public stepMap: { [key: number]: { next?: number; prev?: number } } = {
    1: { next: 2.1 },
    2: { next: 2.2, prev: 1 },
    2.1: { next: 2.2, prev: 1 },
    2.2: { next: 3.1, prev: 2.1 },
    3: { next: 3.2, prev: 2.2 },
    3.1: { next: 3.2, prev: 2.2 },
    3.2: { next: 3.3, prev: 3.1 },
    3.3: { next: 4, prev: 3.2 },
    4: { next: 5, prev: 3.3 },
    5: { prev: 4 },
  }

  constructor() {
    setTimeout(() => {
      this.updatePageHeight()
    }, 0)
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.updatePageHeight()
  }

  private updatePageHeight() {
    const pageElement = document.querySelector('.page') as HTMLElement | null
    const pageHeight = pageElement?.offsetHeight || window.innerHeight

    document.documentElement.style.setProperty('--page-height', `${pageHeight}px`)
  }

  handleNextStep = () => {
    if (this.currentStep === this.LAST_PAGE) return
    if (this.currentStep === this.REQUIRED_STEP && !this.isChecked) {
      this.isError = true

      return
    }

    const nextStep = this.stepMap[this.currentStep]?.next

    if (nextStep !== undefined) {
      this.currentStep = nextStep
    }
  }

  handlePreviousStep = () => {
    const previousStep = this.stepMap[this.currentStep]?.prev

    if (previousStep !== undefined) {
      this.currentStep = previousStep
    }
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  handleChange = (event: Event) => {
    const clickedIndex = (event as CustomEvent).detail.step

    if (clickedIndex === undefined || clickedIndex === null) return

    this.currentStep = clickedIndex
  }

  handleCheckbox = ({ detail }: any) => {
    const { checked } = detail

    this.isChecked = checked
    this.isError = !checked
  }

  getPageClassName = () => `inner decimal-page-${this.currentStep.toString().replace('.', '_')}`
}
