import { Component, h, Prop, Element, Watch, Host, State, Fragment, Event, EventEmitter } from '@stencil/core'

import { FOCUS_TYPE, DropdownConfig, AriaProps } from '../../../../types/common'

import { AVATAR_COLORS_VARIANTS } from '../../const'
import { AvatarChangeEventDetail, AvatarSize, AvatarVariant } from '../../types'
import { transformToVersionedTag } from '../../../../utils/utils'

/**
 * @part image - Image element
 * @part icon - Icon element
 * @part content - content wrapper element
 * @part tooltip - tooltip wrapper content
 */
@Component({
  tag: 'wpp-avatar',
  styleUrl: 'wpp-avatar.scss',
  shadow: true,
})
export class WppAvatar {
  @Element() host: HTMLWppAvatarElement

  @State() isImageFailedToLoad = false

  @State() focusType: FOCUS_TYPE

  /**
   * Defines a username that is abbreviated if the image source is not provided.
   */
  @Prop() readonly name: string = ''

  /**
   * Defines the avatar size.
   */
  @Prop() readonly size: AvatarSize = 'xs'

  /**
   * Defines the avatar type.
   */
  @Prop() readonly variant: AvatarVariant = 'circle'

  /**
   * Defines the avatar image path.
   */
  @Prop() readonly src?: string

  /**
   * Defines the avatar icon. This prop will work if variant='circle', and you can pass icon as wpp-icon-premium.
   */
  @Prop() readonly icon?: string

  /**
   * Defines the avatar background color.
   */
  @Prop() readonly color?: string

  /**
   * Defines and displays the number of hidden avatars.
   */
  @Prop() readonly amountOfHiddenAvatars?: number

  /**
   * If the avatar has a tooltip that displays the full username on hover.
   */
  @Prop() readonly withTooltip: boolean = false

  /**
   * If `true`, the avatar is interactable (have hover effect).
   */
  @Prop() readonly interactable: boolean = false

  /**
   * Indicates the avatar tab index.
   *
   * @internal - This prop is controlled by avatar group
   */
  @Prop() readonly index: number = 0

  /**
   * Role of the avatar component.
   */
  @Prop() readonly role: string = 'button'

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`.
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {
    placement: 'bottom',
  }

  /**
   * Emitted when the avatar item is clicked.
   */
  @Event({ bubbles: false, composed: false }) wppClick: EventEmitter<AvatarChangeEventDetail>

  @Watch('color')
  colorChange(newValue: string) {
    if (!this.isAvatarIcon()) this.host.style.setProperty('--wpp-avatar-generated-bg-color', `${newValue}`)
  }

  @Watch('src')
  srcChange() {
    this.isImageFailedToLoad = false
  }

  componentWillLoad() {
    if (!this.isAvatarIcon()) {
      this.colorChange(this.color || AVATAR_COLORS_VARIANTS[Math.floor(Math.random() * AVATAR_COLORS_VARIANTS.length)])
    }

    if (this.variant === 'circle') {
      this.host.style.setProperty('--avatar-border-radius', 'var(--wpp-border-radius-round)')
    } else {
      const size = ['xl', 'l'].includes(this.size) ? 'm' : this.size === '2xl' ? 'l' : this.size

      this.host.style.setProperty('--avatar-border-radius', `var(--wpp-border-radius-${size})`)
    }
  }

  private isAvatarIcon = () => !!this.icon

  private getUserAbbreviation = (name: string) =>
    name
      .split(' ')
      .slice(0, 1)
      .map(item => item[0])
      .join('')

  private handleImageLoadFailure = () => {
    this.isImageFailedToLoad = true
  }

  private onBlur = () => {
    this.focusType = FOCUS_TYPE.NONE
  }

  private onMouseDown = () => {
    this.focusType = FOCUS_TYPE.MOUSE
  }

  private onKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'Tab') this.focusType = FOCUS_TYPE.TAB
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()

      this.handleClick()
    }
  }

  private getIconSize = () => {
    if (this.size === 'xs') return 16
    if (this.size === 's') return 20
    if (this.size === 'm') return 24
    if (this.size === 'l') return 28
    if (this.size === 'xl') return 32
    if (this.size === '2xl') return 48
    if (this.size === '3xl') return 56
    if (this.size === '4xl') return 64
  }

  private renderIcon = () => {
    if (!this.icon) return null

    if (this.isAvatarIcon()) {
      return h(transformToVersionedTag(this.icon), {
        width: this.getIconSize(),
        height: this.getIconSize(),
        part: 'icon',
      })
    }
  }

  private handleClick = () => {
    this.wppClick.emit({ value: this.host })
  }

  private hostCssClasses = () => ({
    'wpp-avatar': true,
    interactable: this.interactable,
    'with-tooltip': this.withTooltip,
    'tab-focus': this.focusType === FOCUS_TYPE.TAB,
    [`size-${this.size}`]: true,
  })

  private contentWrapperCssClasses = () => ({
    'without-image': true,
    'interactable-wrapper': this.interactable,
    square: this.variant === 'square',
    'icon-wrapper': this.isAvatarIcon(),
    'with-amount-of-hidden-avatars': !!this.amountOfHiddenAvatars,
  })

  private imageWrapperCssClasses = () => ({
    'image-wrapper': true,
    'interactable-wrapper': this.interactable,
    square: this.variant === 'square',
  })

  private imageCssClasses = () => ({
    image: true,
    square: this.variant === 'square',
  })

  render() {
    const content =
      this.src && !this.isImageFailedToLoad ? (
        <div class={this.imageWrapperCssClasses()} part="content">
          <img
            src={this.src}
            alt={`${this.name} - avatar`}
            class={this.imageCssClasses()}
            onError={this.handleImageLoadFailure}
            part="image"
          />
        </div>
      ) : (
        <Fragment>
          <div class={this.contentWrapperCssClasses()} part="content">
            {this.amountOfHiddenAvatars ? `+${this.amountOfHiddenAvatars}` : this.getUserAbbreviation(this.name)}
            {this.renderIcon()}
          </div>
        </Fragment>
      )

    return (
      <Host
        class={this.hostCssClasses()}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        onKeyDown={this.onKeyDown}
        onKeyUp={this.onKeyUp}
        onClick={this.handleClick}
        exportparts="image, content, tooltip"
        {...((this.withTooltip && !this.isAvatarIcon()) || this.role === 'presentation'
          ? { role: 'presentation' }
          : { role: this.role, tabIndex: this.index, ariaLabel: this.ariaProps.label })}
      >
        {this.withTooltip && !this.isAvatarIcon() ? (
          <wpp-tooltip
            text={this.name}
            config={this.tooltipConfig}
            part="tooltip"
            ariaProps={{ label: `User: ${this.name}`, role: 'button' }}
          >
            {content}
          </wpp-tooltip>
        ) : (
          content
        )}
      </Host>
    )
  }
}
