import { Component, Host, h, Prop, Element, Watch, State, Listen, Event, EventEmitter } from '@stencil/core'

import { transformToVersionedTag } from '../../utils/utils'

import { OrientationType, StepChangeEventDetail } from './types'

const MAX_STEPS_COUNT = 8

/**
 * @slot - Can contain only the `wpp-step` component. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part indicator - step indicator element
 */

@Component({
  tag: 'wpp-stepper',
  styleUrl: 'wpp-stepper.scss',
  shadow: true,
})
export class WppStepper {
  private prevStep: number = 0
  private componentHasLoaded: boolean = false

  private resizeObserver: ResizeObserver

  @Element() host: HTMLWppStepperElement

  @State() stepIndicator: number

  @State() stepperPosition: number

  @State() lastActiveStep: number

  @State() lastCompletedStep: number = 0

  /**
   * Defines the current active step, including support for sub-steps like `3.1`
   */
  @Prop({ reflect: true }) readonly activeStep!: number

  /**
   * Defines how many steps can be visible on the screen while the rest are hidden. Use only in the horizontal stepper. If you don't provide a value for this prop, all steps are shown.
   */
  @Prop() readonly stepAmount: number = 0

  /**
   * Defines the amount of the completed steps.
   */
  @Prop({ reflect: true }) readonly completedSteps: number = 0

  /**
   * Defines the width of the stepper. Accepts string values in pixels, such as: "400px", or string values in percetages: "100%".
   * Note: This property should be used just for the vertical Stepper.
   */
  @Prop() readonly stepperWidth: string

  /**
   * Defines the stepper orientation.
   */
  @Prop({ reflect: true }) readonly orientation: OrientationType = 'vertical'

  /**
   * By default, the "horizontal" stepper uses ResizeObserver to adjust its dimension
   * on page resize. If set to "false", the stepper won't use the ResizeObserver.
   * Note: the ResizeObserver is used just by the "horziontal" stepper.
   */
  @Prop() readonly useResizeObserver: boolean = true

  /**
   * Determines whether sub-steps should be represented as decimal values (e.g., 3.1, 3.2).
   * When set to true, sub-steps will follow a decimal notation, providing clearer differentiation
   * between main steps and their sub-steps. If set to false, sub-steps will use integer notation.
   */
  @Prop() readonly useDecimalSubSteps: boolean = false

  /**
   * If `useDecimalSubSteps` is true, emits the `step`, `index`, and `substep` properties of the active step.
   * The `step` value may include decimal values to represent sub-steps (e.g., 2.1, 3.2).
   * The `substep` property is a boolean that indicates whether the current step is a sub-step.
   * This ensures both the main step and its sub-steps can be identified and tracked accurately.
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<StepChangeEventDetail>

  @Listen('wppStepUpdate', { capture: true })
  handleStepUpdate() {
    if (this.componentHasLoaded) {
      this.setStepAttribute()
    }
  }

  @Listen('wppStepChange', { capture: true })
  handleSelectStepClick(event: CustomEvent<StepChangeEventDetail>) {
    if (this.useDecimalSubSteps) {
      event.stopPropagation()
      const stepEl = event.target as HTMLWppStepElement
      const stepValue = stepEl.step

      // Emit step value and index when using decimal sub-steps.
      if (stepValue && stepValue <= this.lastCompletedStep) {
        this.prevStep = stepValue
        if (!stepEl.substep) {
          this.wppChange.emit({ step: stepValue, index: event.detail.index })
        } else {
          // Emit event for sub-steps
          this.wppChange.emit({
            step: stepValue,
            index: event.detail.index,
            subStep: true,
          })
        }
      }
    } else {
      // Emit only the index when not using decimal sub-steps.
      if (event.detail.index && event.detail.index <= this.lastCompletedStep) {
        this.prevStep = event.detail.index
        this.wppChange.emit({ index: event.detail.index })
      }
    }
  }

  @Watch('activeStep')
  watchActiveStep() {
    this.setStepAttribute()
  }

  componentWillLoad() {
    if (this.stepperWidth && this.orientation === 'vertical') {
      this.setTextCSSVariables()

      window.addEventListener('resize', this.setTextCSSVariables)
    }
  }

  private setTextCSSVariables = () => {
    this.host.style.setProperty('--wpp-vertical-stepper-width', this.stepperWidth)

    if (this.stepperWidth.includes('%')) {
      setTimeout(() => {
        this.host.style.setProperty('--wpp-step-label-width', `${this.host.clientWidth - 54}px`)
      }, 0)
    } else if (this.stepperWidth.includes('px')) {
      this.host.style.setProperty('--wpp-step-label-width', `${parseInt(this.stepperWidth) - 54}px`)
    }
  }

  componentDidLoad() {
    if (this.orientation === 'horizontal') {
      const stepsList = this.host.querySelectorAll<HTMLWppStepElement>(transformToVersionedTag('wpp-step'))

      if (stepsList.length > MAX_STEPS_COUNT) {
        throw new Error(`Maximum amount of steps exceeded. Only ${MAX_STEPS_COUNT} steps are allowed.`)
      }
    }

    setTimeout(() => {
      this.setStepAttribute()

      this.componentHasLoaded = true
    }, 0)

    if (this.orientation === 'horizontal' && this.useResizeObserver) {
      this.resizeObserver = new ResizeObserver(this.onResize)

      if (this.resizeObserver) {
        this.resizeObserver.observe(this.host)
      }
    }
  }

  disconnectedCallback() {
    if (this.orientation === 'horizontal' && this.useResizeObserver && this.resizeObserver) {
      this.resizeObserver.disconnect()
    }

    if (this.stepperWidth && this.orientation === 'vertical') {
      window.removeEventListener('resize', this.setTextCSSVariables)
    }
  }

  private getStepperProps = () => {
    const stepperWidth = this.host.clientWidth
    const stepList = this.host.querySelectorAll<HTMLWppStepElement>(transformToVersionedTag('wpp-step'))
    const listLength = stepList.length
    const stepListLength = this.stepAmount || stepList.length
    const lastStep = stepList.length - 1
    const stepWidth = stepperWidth / stepListLength
    const isHorizontalOrientation = this.orientation === 'horizontal'

    return { stepperWidth, stepList, stepListLength, lastStep, stepWidth, isHorizontalOrientation, listLength }
  }

  private calculateStepperPosition = () => {
    const { listLength, stepWidth } = this.getStepperProps()
    const stepperStyle = this.host.style
    const isNeedToTranslateStepper = this.activeStep > this.stepAmount
    const isNeedToResetTranslatePosition = this.activeStep <= this.stepAmount
    const isLastStep = this.activeStep >= listLength + 1

    if (isNeedToTranslateStepper && this.activeStep > this.lastActiveStep && !isLastStep) {
      this.stepperPosition += stepWidth
      stepperStyle.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`)
      this.lastActiveStep = this.activeStep
    }

    if (isNeedToTranslateStepper && this.lastActiveStep && this.lastActiveStep > this.activeStep) {
      this.stepperPosition -= stepWidth
      stepperStyle.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`)
      this.lastActiveStep = this.activeStep
    }

    if (isNeedToResetTranslatePosition) {
      this.stepperPosition = 0
      stepperStyle.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`)
      this.lastActiveStep = this.activeStep
    }
  }

  private calculateStepperPositionOnResize = () => {
    const stepsLength = this.host.querySelectorAll<HTMLWppStepElement>(transformToVersionedTag('wpp-step')).length

    if (!this.stepAmount || this.stepAmount === stepsLength) return
    if (this.activeStep === 1) return

    const { listLength, stepWidth } = this.getStepperProps()
    const isLastStep = this.activeStep >= listLength + 1

    if (isLastStep || this.lastActiveStep === listLength) {
      this.stepperPosition = stepWidth * 2
      this.host.style.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`)

      return
    }
    this.stepperPosition = stepWidth
    this.host.style.setProperty('--stepper-translate-position', `-${this.stepperPosition}px`)
  }

  private setCurrentStepIndicator = () => {
    const currentStepIndicator =
      this.activeStep > this.stepAmount
        ? this.host.children.length - this.activeStep
        : this.host.children.length - this.stepAmount

    this.stepIndicator = currentStepIndicator
  }

  private setStepWidthOnResize = () => {
    const { stepWidth } = this.getStepperProps()

    this.host.querySelectorAll<HTMLWppStepElement>(transformToVersionedTag('wpp-step')).forEach(step => {
      step.style.setProperty('--step-container-width', `${stepWidth}px`)
    })
  }

  private setStepAttribute = () => {
    if (this.useDecimalSubSteps) {
      this.setStepAttributeAsDecimals()
    } else {
      this.setStepAttributeAsIntegers()
    }
  }

  private setStepAttributeAsIntegers = () => {
    let lastStepWithSubstep: HTMLWppStepElement | null = null
    let currentStep = 1

    const { stepList, lastStep, stepWidth, isHorizontalOrientation } = this.getStepperProps()

    let parentStep: HTMLWppStepElement

    stepList.forEach((step, index) => {
      if (!step.substep) {
        parentStep?.setAttribute('lastSubstepStepIndex', `${index}`)
        parentStep = step
      }
    })

    this.lastCompletedStep = Math.max(this.activeStep, this.lastCompletedStep, this.completedSteps + 1)

    if (isHorizontalOrientation && this.stepAmount) {
      this.calculateStepperPosition()
      this.setCurrentStepIndicator()
    }

    stepList.forEach((step, index) => {
      if (this.completedSteps === index) {
        step?.setAttribute('active', 'true')
      }

      const currentIndex = index + 1

      const hasDescription = !!step.querySelector<HTMLElement>('[slot="description"]')
      const isPassCurrentStep = this.lastCompletedStep > currentIndex
      const currentStepSubstep = step.querySelectorAll<HTMLWppStepElement>(transformToVersionedTag('wpp-step'))
      const isHaveSubstep = !!currentStepSubstep.length
      const lastIndexSubstep = currentStepSubstep.length - 1
      const lastSubstepStepIndex =
        currentStepSubstep[lastIndexSubstep]?.getAttribute('index') || step.getAttribute('lastSubstepStepIndex')
      const isSubStep = step?.substep
      const isStepExpanded =
        this.activeStep >= currentIndex && this.activeStep <= currentIndex + currentStepSubstep.length

      if (isHaveSubstep) {
        lastStepWithSubstep = step
        const stepHeight = currentStepSubstep[0]?.clientHeight

        if (!isHorizontalOrientation) {
          if (isStepExpanded) {
            step?.setAttribute('expanded', 'true')
            step.style.setProperty('--steps-list-container-height', `${stepHeight * currentStepSubstep.length}px`)
            step?.removeAttribute('error')
          } else {
            step?.removeAttribute('expanded')
            step.style.setProperty('--steps-list-container-height', `${stepHeight}px`)

            const stepWithError = Array.from(currentStepSubstep).find(substep => substep.error)

            if (stepWithError) {
              step?.setAttribute('error', 'true')
              step?.setAttribute('icon-description', stepWithError.iconDescription)
            }
          }
        }
      }

      if (hasDescription) {
        step?.setAttribute('has-description', 'true')
      } else {
        step?.removeAttribute('has-description')
      }

      if (isPassCurrentStep) {
        step?.setAttribute('completed', 'true')
      } else {
        step?.removeAttribute('completed')
        step?.removeAttribute('completed-line')
      }

      if (lastStep === index) {
        step?.setAttribute('last-step', 'true')
      }

      if (isHorizontalOrientation) {
        step.style.setProperty('--step-container-width', `${stepWidth}px`)
      }

      step?.setAttribute('index', `${currentIndex}`)
      step?.setAttribute('step', `${currentStep}`)
      step?.setAttribute('orientation', this.orientation)
      if (this.activeStep === currentIndex) {
        step?.setAttribute('active', 'true')
      }

      if (this.activeStep === currentIndex) {
        step?.setAttribute('displayed-step', 'true')
      } else {
        step?.removeAttribute('displayed-step')
      }

      if (isHaveSubstep && isPassCurrentStep) {
        step?.removeAttribute('completed')
        step?.setAttribute('active', 'true')
        if (isStepExpanded) {
          step?.setAttribute('completed-line', 'true')
        } else {
          step?.removeAttribute('completed-line')
        }
      }

      if (lastSubstepStepIndex) {
        const isLastElementCompleted = isHorizontalOrientation
          ? this.activeStep > +lastSubstepStepIndex
          : this.lastCompletedStep > +lastSubstepStepIndex

        if (isLastElementCompleted) {
          lastStepWithSubstep?.setAttribute('completed', 'true')
          lastStepWithSubstep = null
        }
      }

      if (!isSubStep) currentStep++

      if (isHaveSubstep && !isHorizontalOrientation && this.activeStep === currentIndex) {
        this.wppChange.emit({ index: this.activeStep < this.prevStep ? currentIndex - 1 : currentIndex + 1 })
      }
    })

    this.prevStep = this.activeStep
  }

  private setStepAttributeAsDecimals = () => {
    let subStepCounter = 1
    let mainStepCounter = 1
    let parentStep: HTMLWppStepElement | null = null
    const { stepList } = this.getStepperProps()

    this.lastCompletedStep = Math.max(this.activeStep, this.lastCompletedStep, this.completedSteps + 1)

    // First loop: process all steps and mark sub steps as completed
    stepList.forEach((step, index) => {
      const isSubStep = step.substep
      const hasSubStepElements = !!step.querySelector(transformToVersionedTag('wpp-step'))
      const currentStepSubSteps = step.querySelectorAll<HTMLWppStepElement>(transformToVersionedTag('wpp-step'))
      const hasDescription = !!step.querySelector<HTMLElement>('[slot="description"]')

      let stepValue: number

      if (isSubStep) {
        if (parentStep) {
          const parentStepValue = Number(parentStep.getAttribute('step')) || 0
          const subStepValue = Number(`${parentStepValue}.${subStepCounter}`)

          step.setAttribute('step', subStepValue.toString())
          stepValue = subStepValue
          subStepCounter++
        } else {
          stepValue = 0
        }
      } else {
        step.setAttribute('step', `${mainStepCounter}`)
        stepValue = mainStepCounter
        subStepCounter = 1
        parentStep = step
        mainStepCounter++
      }

      const mainStepIndex = Math.floor(this.activeStep)
      const subStepIndex = Math.round((this.activeStep % 1) * 10)

      const shouldExpandOnDirectNavigation = this.activeStep === stepValue && hasSubStepElements
      const isStepExpanded =
        (mainStepIndex === Math.floor(stepValue) && subStepIndex > 0 && hasSubStepElements) ||
        shouldExpandOnDirectNavigation

      if (hasSubStepElements) {
        const stepHeight = currentStepSubSteps[0]?.clientHeight || 0

        if (isStepExpanded) {
          step.setAttribute('expanded', 'true')
          step.setAttribute('active', 'true')
          step.setAttribute('completed-line', 'true')
          step.style.setProperty('--steps-list-container-height', `${stepHeight * currentStepSubSteps.length}px`)
          step.removeAttribute('error')
        } else {
          step.removeAttribute('expanded')
          step.style.setProperty('--steps-list-container-height', `${stepHeight}px`)
          const stepWithError = Array.from(currentStepSubSteps).find(substep => substep.error)

          if (stepWithError) {
            step.setAttribute('error', 'true')
            step.setAttribute('icon-description', stepWithError.iconDescription || '')
          }
        }
      }

      step.setAttribute('index', (index + 1).toString())

      if (hasDescription) {
        step.setAttribute('has-description', 'true')
      }

      // Mark substeps as completed before checking parent step
      if (isSubStep) {
        const isSubStepCompleted = this.lastCompletedStep > stepValue

        if (isSubStepCompleted) {
          step.setAttribute('completed', 'true')
        }
      }
    })

    // Second loop: after all sub steps are processed, check parent step completion and set last-step
    stepList.forEach((step, index) => {
      const isSubStep = step.substep
      const currentStepSubSteps = step.querySelectorAll<HTMLWppStepElement>(transformToVersionedTag('wpp-step'))
      const hasPassedCurrentStep = this.lastCompletedStep > (Number(step.getAttribute('step')) || 0)

      const areAllSubStepsCompleted =
        currentStepSubSteps.length > 0
          ? Array.from(currentStepSubSteps).every(substep => substep.hasAttribute('completed'))
          : hasPassedCurrentStep

      if (!isSubStep && areAllSubStepsCompleted) {
        step.setAttribute('completed', 'true')
        step.setAttribute('completed-line', 'true')
      }

      const isCurrentMainStepActive = Math.floor(this.activeStep) === Number(step.getAttribute('step'))
      const isCurrentSubStepActive = isSubStep && this.activeStep === Number(step.getAttribute('step'))
      const shouldSetActive = isCurrentMainStepActive || isCurrentSubStepActive
      const shouldSetDisplayedStep = shouldSetActive && (!currentStepSubSteps.length || isSubStep)

      if (shouldSetActive) {
        step.setAttribute('active', 'true')
      }

      if (shouldSetDisplayedStep) {
        step.setAttribute('displayed-step', 'true')
      } else {
        step.removeAttribute('displayed-step')
      }

      // Set last-step for the last main step (not a substep)
      if (!isSubStep && index === stepList.length - 1) {
        step.setAttribute('last-step', 'true')
      }

      // Emit event to update active step when navigating to main steps with sub-steps
      if (currentStepSubSteps.length && this.activeStep === Number(step.getAttribute('step'))) {
        const isSubStepClicked = this.activeStep % 1 > 0

        if (!isSubStepClicked) {
          const newStepValue =
            this.activeStep < this.prevStep
              ? Number(step.getAttribute('step')) - 0.1
              : Number(step.getAttribute('step')) + 0.1

          const newIndex = this.activeStep < this.prevStep ? index : index + currentStepSubSteps.length

          this.wppChange.emit({
            step: newStepValue,
            index: newIndex,
          })
        }
      }
    })

    this.prevStep = this.activeStep
  }

  private onResize = async () => {
    this.setStepWidthOnResize()
    this.calculateStepperPositionOnResize()
  }

  private stepperWrapperCssClasses = () => ({
    stepper: true,
    [`orientation-${this.orientation}`]: true,
  })

  private hostCssClasses = () => ({
    'wpp-stepper': true,
  })

  render() {
    const isHorizontalOrientation = this.orientation === 'horizontal'

    return (
      <Host class={this.hostCssClasses()} exportparts="wrapper, inner, indicator">
        <div class={this.stepperWrapperCssClasses()} part="wrapper">
          <slot part="inner" />
        </div>
        {isHorizontalOrientation && this.stepAmount ? (
          <div class={{ 'step-indicator': true, hide: this.stepIndicator <= 0 }} part="indicator">
            +{this.stepIndicator || 1}
          </div>
        ) : null}
      </Host>
    )
  }
}
