import { Component, Host, h, Prop, Element, Watch } from '@stencil/core'
import { AriaProps } from '../../types/common'

const DEFAULT_CIRCLE_WIDTH = 80

/**
 * @part line - progress line element
 * @part circle - progress circle element
 * @part body - Main content wrapper
 * @part label - Label text element
 */
@Component({
  tag: 'wpp-progress-indicator',
  styleUrl: 'wpp-progress-indicator.scss',
  shadow: true,
})
export class WppProgressIndicator {
  @Element() host: HTMLWppProgressIndicatorElement

  /**
   * Defines the progress indicator width in pixels. If left `undefined`, the linear indicators are **100%** in width, and circle indicators are **80px** by default.
   */
  @Prop() readonly width?: number

  /**
   * Defines the progress indicator type.
   */
  @Prop() readonly variant: 'bar' | 'circle' = 'bar'

  /**
   * Defines the loading progress. If `undefined`, the loading progress is infinite.
   */
  @Prop() readonly value?: number

  /**
   * If the loading percentage is displayed.
   */
  @Prop() readonly isShowPercentage: boolean = false

  /**
   * Defines the loading label.
   * @deprecated This property will be removed in version 5.0.0.
   */
  @Prop() readonly label?: string

  /**
   * Contains the `aria-` props of the progess-indicator component.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * If set to `true` and `value` is `0`, the component will show a 0% empty state
   * instead of the indeterminate loading animation.
   */
  @Prop() readonly forceIntermediateEmptyState?: boolean = false

  private setComponentWidth(updateWidth?: number) {
    const currentWidth = updateWidth || this.width

    if (this.variant === 'circle') {
      if (!currentWidth) {
        return this.host.style.setProperty('--pi-width', `${DEFAULT_CIRCLE_WIDTH}px`)
      }

      this.host.style.setProperty('--pi-width', `${currentWidth}px`)

      return
    }

    if (!currentWidth) return this.host.style.setProperty('--pi-width', '100%')
    this.host.style.setProperty('--pi-width', `${currentWidth}px`)
  }

  @Watch('value')
  progressChange(newProgressValue: number) {
    this.host.style.setProperty('--pi-value', `${newProgressValue}`)
  }

  @Watch('width')
  widthChange(newWidthValue: number) {
    this.setComponentWidth(newWidthValue)
  }

  componentDidLoad() {
    this.setComponentWidth()
    if (typeof this.value !== 'number') return
    this.host.style.setProperty('--pi-value', `${this.value}`)
  }

  private lineCssClasses = (
    isShowCircleInfinityLoading: boolean,
    isShowLinearInfinityLoading: boolean,
    shouldShowPercentage: boolean,
  ) => ({
    linear: this.variant === 'bar',
    circle: this.variant === 'circle',
    'infinity-scroll-circle': isShowCircleInfinityLoading,
    'infinity-scroll-linear': isShowLinearInfinityLoading,
    'percentage-text': shouldShowPercentage,
  })

  private circleWrapperCssClasses = (isShowCircleInfinityLoading: boolean) => ({
    'circle-wrapper': true,
    'infinity-scroll': isShowCircleInfinityLoading,
  })

  private circleCssClasses = (isShowCircleInfinityLoading: boolean, shouldShowPercentage: boolean) => ({
    circle: true,
    progress: true,
    'infinity-scroll-circle-progress-bar': isShowCircleInfinityLoading,
    'percentage-text': shouldShowPercentage,
  })

  private hostCssClasses = (isLinearDontHaveWidth: boolean) => ({
    'wpp-progress-indicator': true,
    'wpp-wrapper': true,
    'wpp-wrapper-linear-full-width': isLinearDontHaveWidth,
  })

  private progressBarCssClasses = (isLinearDontHaveProgress: boolean, shouldShowPercentage: boolean) => ({
    'progress-bar-wrapper': true,
    'linear-wrapper': this.variant === 'bar',
    'overflow-hide': isLinearDontHaveProgress,
    percentage: shouldShowPercentage,
  })

  render() {
    const noDefinedValue = typeof this.value !== 'number' || (this.value === 0 && !this.forceIntermediateEmptyState)
    const isCircle = this.variant === 'circle'
    const isLinearDontHaveProgress = noDefinedValue && !isCircle
    const isLinearDontHaveWidth = !this.width && !isCircle
    const isShowCircleInfinityLoading = noDefinedValue && isCircle
    const isShowLinearInfinityLoading = noDefinedValue && !isCircle
    const shouldShowPercentage =
      this.isShowPercentage &&
      typeof this.value === 'number' &&
      (this.value > 0 || (this.value === 0 && !!this.forceIntermediateEmptyState))

    const renderLine = () => (
      <div
        class={this.lineCssClasses(isShowCircleInfinityLoading, isShowLinearInfinityLoading, shouldShowPercentage)}
        part="line"
      />
    )

    const renderCircle = () => (
      <svg class={this.circleWrapperCssClasses(isShowCircleInfinityLoading)} viewBox="0 0 120 120" part="circle">
        <circle class="circle" cx="60" cy="60" r="54" fill="none" />
        <circle
          class={this.circleCssClasses(isShowCircleInfinityLoading, shouldShowPercentage)}
          cx="60"
          cy="60"
          r="54"
          fill="none"
          pathLength="100"
        />
      </svg>
    )

    return (
      <Host
        class={this.hostCssClasses(isLinearDontHaveWidth)}
        role="progressbar"
        aria-valuenow={this.value}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label={this.ariaProps?.label}
        aria-labelledby={this.ariaProps?.labelledby}
        exportparts="label, content, inner"
      >
        <div class={this.progressBarCssClasses(isLinearDontHaveProgress, shouldShowPercentage)} part="body">
          {isCircle ? renderCircle() : renderLine()}
        </div>
        {!!this.label && (
          <p class="progress-text" part="label">
            {this.label}
          </p>
        )}
      </Host>
    )
  }
}
