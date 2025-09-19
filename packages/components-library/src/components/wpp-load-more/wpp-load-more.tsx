import { Component, Prop, h, State, Watch, Event, EventEmitter, Host, Method } from '@stencil/core'
import { PROGRESS_WIDTH, INCREASE_BY, ITEMS_LOADED, TOTAL_ITEMS } from './const'
import { LoadMoreChangeEventDetail } from './types'
import { AriaProps } from '../../types/common'

/**
 * @part container - Container element
 * @part progress-text - Progress text element
 * @part button - Load more button element
 */
@Component({
  tag: 'wpp-load-more',
  styleUrl: 'wpp-load-more.scss',
  shadow: true,
})
export class WppLoadMore {
  private hasToggledBtn: boolean = false
  private loadBtnRef?: HTMLWppButtonElement

  @State() progressPercentage: number = 0

  /**
   * The total number of items.
   */
  @Prop() readonly totalItems: number = TOTAL_ITEMS

  /**
   * The number of items that have been loaded.
   */
  @Prop() readonly itemsLoaded: number = ITEMS_LOADED

  /**
   * Determines whether to show the progress bar.
   */
  @Prop() readonly showProgressBar: boolean = false

  /**
   * Determines whether the component is in a loading state.
   */
  @Prop() readonly loading: boolean = false

  /**
   * Determines whether the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * Defines the amount by which to increment the itemsLoaded when the button is clicked.
   */
  @Prop() readonly incrementBy: number = INCREASE_BY

  /**
   * Aria properties that will be applied on the button only.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Emitted when the "Load more" button is clicked.
   */
  @Event() wppClickLoadMore: EventEmitter<LoadMoreChangeEventDetail>

  @Watch('itemsLoaded')
  @Watch('totalItems')
  @Watch('incrementBy')
  updateProgress() {
    this.progressPercentage =
      (Math.max(0, Math.min(this.itemsLoaded, this.totalItems)) / Math.max(0, this.totalItems)) * 100
  }

  /**
   * Method that sets focus on the load button.
   */
  @Method()
  async setFocus(): Promise<void> {
    if (this.loadBtnRef) {
      this.loadBtnRef.setFocus()
    }
  }

  componentDidRender() {
    if (!this.loading && this.hasToggledBtn && !this.isDisabled()) {
      this.hasToggledBtn = false
      this.setFocus()
    }
  }

  componentWillLoad() {
    this.updateProgress()
  }

  private handleClick = (e: Event) => {
    if (this.isDisabled()) {
      e.stopPropagation()

      return
    }

    const newItemsLoaded = Math.min(this.itemsLoaded + this.incrementBy, this.totalItems)

    this.wppClickLoadMore.emit({ newItemsLoaded, incrementBy: this.incrementBy })
  }

  private isDisabled() {
    return this.disabled || this.itemsLoaded >= this.totalItems
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      this.hasToggledBtn = true
    }
  }

  private hostCssClasses = () => ({
    'wpp-load-more': true,
    'wpp-disabled': this.isDisabled(),
  })

  private progressTextCssClasses = () => ({
    'progress-text': true,
    disabled: this.isDisabled(),
  })

  private progressContainerCssClasses = () => ({
    'progress-container': true,
    disabled: this.isDisabled(),
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} onKeyDown={this.onKeyDown} exportparts="container, progress-text, button">
        {this.showProgressBar && (
          <div class={this.progressContainerCssClasses()} part="container">
            <span id="wpp-progress-indicator-label" class={this.progressTextCssClasses()} part="progress-text">
              {Math.max(0, Math.min(this.itemsLoaded, this.totalItems))} of {Math.max(0, this.totalItems)} items
            </span>
            <wpp-progress-indicator
              class="progress-indicator"
              value={this.progressPercentage}
              width={PROGRESS_WIDTH}
              ariaProps={{ labelledby: 'wpp-progress-indicator-label' }}
            ></wpp-progress-indicator>
          </div>
        )}
        <wpp-button
          ref={refEl => (this.loadBtnRef = refEl)}
          class="load-more-button"
          variant="secondary"
          loading={this.loading && !this.isDisabled()}
          part="button"
          disabled={this.isDisabled()}
          size="s"
          onClick={this.handleClick}
          ariaProps={this.ariaProps}
        >
          Load more
        </wpp-button>
      </Host>
    )
  }
}
