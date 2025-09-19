import { ChangeDetectionStrategy, Component, HostListener, ChangeDetectorRef } from '@angular/core'

@Component({
  selector: 'app-vertical-stepper-example',
  templateUrl: './vertical-stepperVC.html',
  styleUrls: ['./vertical-stepperVC.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalStepperVC {
  public LAST_PAGE = 10
  public FIRST_PAGE = 1
  public REQUIRED_STEP = 7

  public currentStep = this.FIRST_PAGE
  public isChecked = false
  public isError = false

  constructor(private cdr: ChangeDetectorRef) {
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

    this.currentStep += 1
  }

  handlePreviousStep = () => {
    if (this.currentStep < 0) return

    this.currentStep -= 1
  }

  public getLabelConfig = (text: string) => ({
    text,
  })

  handleChange = (event: Event) => {
    const clickedIndex = (event as CustomEvent).detail.index

    if (clickedIndex === undefined || clickedIndex === null) return

    this.currentStep = clickedIndex

    this.cdr.detectChanges()
  }

  handleCheckbox = ({ detail }: any) => {
    const { checked } = detail

    this.isChecked = checked
    this.isError = !checked
  }

  getPageClassName = () => `inner page-${this.currentStep}`
}
