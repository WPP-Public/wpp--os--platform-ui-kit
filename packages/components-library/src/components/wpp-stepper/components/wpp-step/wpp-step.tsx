import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Watch } from '@stencil/core'

import { OrientationType, StepLocales, StepChangeEventDetail } from '../../types'
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot'

/**
 * @slot label - Text content displayed within the cell.
 * @slot description - Text displayed as the description of the step, right below the title.
 * @slot - Can be used to display substeps for a specific step. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part step - step content wrapper element
 * @part step-bg - step bg element
 * @part step-label - step label text element
 * @part step-index - step index text element
 * @part last-step - last step wrapper element
 * @part last-step-text - last step text element
 * @part optional - optional text element
 * @part icon - step icon (warning, error)
 */

@Component({
  tag: 'wpp-step',
  styleUrl: 'wpp-step.scss',
  shadow: true,
})
export class WppStep {
  @Element() host: HTMLWppStepElement

  @State() tooltipText: string | null = null

  @State() labelTooltipText: string | null = null

  /**
   * If the current active step is indicated. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  @Prop() readonly active: boolean = false

  /**
   * If a specific step is complete. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  @Prop() readonly completed: boolean = false

  /**
   * If a step has a substep that must be completed. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  @Prop() readonly completedLine: boolean = false

  /**
   * If a step is a substep.
   */
  @Prop({ reflect: true }) readonly substep: boolean = false

  /**
   * @internal - Defines the last substep of the step index.
   */
  @Prop({ reflect: true }) readonly lastSubstepStepIndex?: number

  /**
   * Defines the current step number. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  @Prop({ reflect: true }) readonly step?: number

  /**
   * Defines the current step index. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  @Prop({ reflect: true }) readonly index?: number

  /**
   * Defines the step width. This prop is used in horizontal steppers only. When the `stepAmount` prop is used in `Stepper`, this prop is passed automatically.
   */
  @Prop({ reflect: true }) readonly width?: number

  /**
   * Defines If a step is styled as an error.
   */
  @Prop({ reflect: true }) readonly error: boolean = false

  /**
   * If `true`, step indicates warning
   */
  @Prop({ reflect: true }) readonly warning: boolean = false

  /**
   * If a step is the last step. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  @Prop({ reflect: true }) readonly lastStep: boolean = false

  /**
   * If a step is optional.
   *
   * @deprecated this prop will be deleted in version 4.0.0
   */
  @Prop({ reflect: true }) readonly optional?: boolean = false

  /**
   * Defines the step orientation. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component.
   */
  @Prop({ reflect: true }) readonly orientation: OrientationType = 'vertical'

  /**
   * @internal - If `true`, this step is expanded
   */
  @Prop({ reflect: true }) readonly expanded: boolean = false

  /**
   * @internal - Indicates currently displayed step
   */
  @Prop({ reflect: true }) readonly displayedStep: boolean = false

  /**
   * @internal - Indicates if step has description.
   */
  @Prop({ reflect: true }) readonly hasDescription: boolean = false

  /**
   * Indicates iconDescription when hover on warning or error icons
   */
  @Prop({ reflect: true }) readonly iconDescription: string

  /**
   * Emitted when the step was selected
   */
  @Event({ bubbles: false, composed: false }) wppStepChange: EventEmitter<StepChangeEventDetail>

  /**
   * Emitted when the description or label has changed.
   *
   * @internal - This event is controlled by Stepper, do not set it manually.
   */
  @Event({ bubbles: false, composed: false }) readonly wppStepUpdate: EventEmitter

  /**
   * Indicates locales for step component
   *
   * @deprecated this prop will be deleted in version 4.0.0
   */
  @Prop() readonly locales: StepLocales = {
    optional: 'Optional',
  }

  componentDidLoad() {
    this.applyTruncationIfNeeded()

    if (this.orientation === 'vertical') {
      window.addEventListener('resize', this.applyTruncationIfNeeded)
    }
  }

  disconnectedCallback() {
    if (this.orientation === 'vertical') {
      window.removeEventListener('resize', this.applyTruncationIfNeeded)
    }
  }

  @Watch('warning')
  @Watch('error')
  watchErrorIcon() {
    this.applyTruncationIfNeeded()
  }

  private applyTruncationIfNeeded = () => {
    setTimeout(() => {
      // Label
      const labelEl: HTMLDivElement | null = this.host.querySelector('[slot="label"]')

      if (labelEl && labelEl.scrollWidth > labelEl.clientWidth) {
        this.labelTooltipText = labelEl.textContent
      } else {
        this.labelTooltipText = null
      }

      // Description
      if (this.hasDescription && this.orientation === 'vertical') {
        const descriptionEl: HTMLDivElement | null = this.host.querySelector('[slot="description"]')

        if (!descriptionEl) return

        if (descriptionEl.clientWidth < descriptionEl.scrollWidth) {
          this.tooltipText = descriptionEl.textContent
        } else {
          this.tooltipText = null
        }
      }
    })
  }

  private isSubStep = (): boolean => {
    if (this.orientation === 'horizontal') {
      return false
    }

    return this.substep
  }

  private renderStep = () => {
    if (!this.isSubStep() && this.completed) {
      return <wpp-icon-tick color="var(--wpp-grey-color-000)" />
    }

    if (this.isSubStep()) {
      return null
    }

    return this.step
  }

  private handleSlotChange = () => {
    this.wppStepUpdate.emit()

    this.applyTruncationIfNeeded()
  }

  private stepWrapperCssClasses = () => ({
    'step-wrapper': true,
    'substep-wrapper': this.isSubStep(),
    active: this.displayedStep,
    completed: this.completed || this.active,
    'step-has-description': this.hasDescription,
  })

  private stepTextWrapperCssClasses = () => ({
    'text-wrapper': true,
    'inactive-text': !this.active && !this.completed,
    'with-icon': this.error || this.warning,
  })

  private stepCssClasses = () => ({
    step: true,
    completed: this.completed || this.active,
    [`${this.orientation}`]: true,
  })

  private stepIndexCssClasses = () => ({
    'step-index': true,
    active: this.active,
    completed: this.completed,
    substep: this.isSubStep(),
    error: this.error && this.orientation !== 'vertical',
    warning: this.warning && this.orientation !== 'vertical',
  })

  private stepConnectorCssClasses = () => ({
    connector: true,
    'connector-substep': this.isSubStep(),
    [`connector-${this.orientation}`]: true,
  })

  private connectorLineCssClasses = () => ({
    'connector-line': true,
    'completed-line': this.completed || this.completedLine,
  })

  private stepBgCssClasses = () => ({
    'step-bg': true,
    active: this.displayedStep,
  })

  private hostCssClasses = () => ({
    'wpp-step': true,
    'wpp-expanded': this.expanded,
    [`wpp-${this.orientation}`]: true,
  })

  private handleStepClick = (event: Event): void => {
    event.stopPropagation()
    event.preventDefault()

    this.wppStepChange.emit({ index: this.index })
  }

  private renderStepTypeData = () => {
    let icon

    if (this.error) icon = <wpp-icon-error />
    if (this.warning) icon = <wpp-icon-warning />

    if (!icon) return null

    if (this.iconDescription) {
      return (
        <wpp-tooltip config={{ placement: 'bottom' }} text={this.iconDescription}>
          {icon}
        </wpp-tooltip>
      )
    }

    return (
      <div class="icon" part="icon">
        {icon}
      </div>
    )
  }

  render() {
    return (
      <Host
        class={this.hostCssClasses()}
        exportparts="wrapper, step, step-bg, step-index, step-label, optional, icon, last-step, last-step-text, label, label-wrapper, ws-wrapper, ws-inner"
        onClick={this.handleStepClick}
      >
        <div class={this.stepWrapperCssClasses()} part="wrapper">
          {this.orientation === 'vertical' && (
            <div class={this.stepBgCssClasses()} part="step-bg">
              <div class={this.stepTextWrapperCssClasses()} part="step-label">
                {!this.labelTooltipText ? (
                  <WrappedSlot onSlotchange={this.handleSlotChange} name="label" />
                ) : (
                  <wpp-tooltip class="label-tooltip" config={{ placement: 'right' }} text={this.labelTooltipText}>
                    <WrappedSlot onSlotchange={this.handleSlotChange} wrapperClass={'label-wrapper'} name="label" />
                  </wpp-tooltip>
                )}
                {this.tooltipText ? (
                  <div class="step-description">
                    <wpp-tooltip class="description-tooltip" config={{ placement: 'right' }} text={this.tooltipText}>
                      <WrappedSlot onSlotchange={this.handleSlotChange} name="description" />
                    </wpp-tooltip>
                  </div>
                ) : (
                  <div class="step-description">
                    <slot onSlotchange={this.handleSlotChange} name="description" />
                  </div>
                )}
              </div>
              {this.renderStepTypeData()}
            </div>
          )}

          <div class={this.stepCssClasses()} part="step">
            <span class={this.stepIndexCssClasses()} part="step-index">
              {this.renderStep()}
            </span>
            {this.orientation === 'horizontal' && (
              <div class={this.stepTextWrapperCssClasses()} part="step-label">
                <WrappedSlot name="label" />
                {this.renderStepTypeData()}
              </div>
            )}
          </div>
          {!this.lastStep && (
            <div class={this.stepConnectorCssClasses()} part="last-step">
              <span class={this.connectorLineCssClasses()} part="last-step-text" />
            </div>
          )}
        </div>
        <WrappedSlot wrapperClass="steps-list-container" />
      </Host>
    )
  }
}
