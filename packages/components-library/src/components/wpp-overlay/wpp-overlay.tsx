import { Component, Host, h, Event, EventEmitter, Prop, Watch, Element, State } from '@stencil/core'
import { Z_INDEX } from '../../common/consts'

const OVERLAY_ANIMATION_DURATION = 200

@Component({
  tag: 'wpp-overlay',
  styleUrl: 'wpp-overlay.scss',
  shadow: true,
})
export class WppOverlay {
  @Element() host: HTMLWppOverlayElement

  // Used to add additional properties to the overlay when it is hidden.
  // Note: This is also needed (besides the `isVisible` prop) because those properties are added when the close animation ends
  // (the close animation starts when `isVisible=false`, but we need those props when animation ends).
  @State() isHidden: boolean = false

  /**
   * Controls the visibility of the overlay.
   */
  @Prop() readonly isVisible: boolean = false

  /**
   * Defines the z-index of the overlay.
   */
  @Prop() readonly zIndex?: string = `${Z_INDEX.OVERLAY}`

  /**
   * Emitted when the overlay is clicked.
   */
  @Event() wppClick: EventEmitter<void>

  @Watch('isVisible')
  handleVisibleChange(newValue: boolean) {
    if (newValue) {
      this.isHidden = false
    } else {
      setTimeout(() => {
        this.isHidden = true
      }, OVERLAY_ANIMATION_DURATION)
    }
  }

  componentWillLoad() {
    if (!this.isVisible) {
      this.isHidden = true
    }
  }

  private handleClick = () => {
    this.wppClick.emit()
  }

  private getOverlayCssClasses = () => ({
    overlay: true,
    'overlay--visible': this.isVisible,
    'overlay--hidden': this.isHidden,
  })

  render() {
    return (
      <Host>
        <div class={this.getOverlayCssClasses()} style={{ zIndex: this.zIndex }} onClick={this.handleClick}></div>
      </Host>
    )
  }
}
