import { Component, h, Prop, Host, Event, EventEmitter, Fragment, State } from '@stencil/core'

import { DropdownConfig } from '../../types/common'

import { AVATAR_COLORS_VARIANTS } from './const'
import { AvatarVariant, AvatarState, AvatarChangeEventDetail, AvatarGroupChangeEventDetail } from './types'
import { ListItemChangeEventDetail } from '../wpp-list-item/types'
import { Instance } from 'tippy.js'

/**
 * @part list - Avatar group list element
 * @part item - Avatar group item element
 * @part menu - Avatar group context menu element
 * @part avatar - Avatar element
 * @part hidden-item - hidden-item wrapper element
 * @part hidden-item-with-avatar - hidden-item content wrapper element
 * @part hidden-item-avatar - hidden-item avatar element
 * @part hidden-item-name - hidden-item name element
 */
@Component({
  tag: 'wpp-avatar-group',
  styleUrl: 'wpp-avatar-group.scss',
  shadow: true,
})
export class WppAvatarGroup {
  @State() menuContextTippyRef?: Instance

  /**
   * Defines a list of users with specific attributes, such as name, src, color, and so on: `users={[{name: '', src: ''}]}`
   *
   * @deprecated - this prop will be deleted in version 4.0.0. If you want to use this prop, use avatars prop instead
   */
  @Prop() readonly users: AvatarState[] = []

  /**
   * Defines a list of avatars with specific attributes, such as name, src, color, and so on: `avatars={[{name: '', src: ''}]}`
   */
  @Prop() readonly avatars: AvatarState[] = []

  /**
   * Defines how many avatars to show before `+x`, where `x` is the number of hidden avatars.
   */
  @Prop() readonly maxAvatarsToDisplay: number = 6

  /**
   * Defines the avatar size.
   */
  @Prop() readonly size: 'xs' | 's' = 'xs'

  /**
   * Defines the avatar variant.
   */
  @Prop() readonly variant: AvatarVariant = 'circle'

  /**
   * If the avatar has a tooltip that displays the full name on hover.
   */
  @Prop() readonly withTooltip: boolean = false

  /**
   * Defines the tooltip configuration. Under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) tooltipConfig: DropdownConfig = {
    placement: 'bottom',
  }

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) dropdownConfig: DropdownConfig = {}

  /**
   * Emitted when the avatar item is clicked.
   */
  @Event({ bubbles: true, composed: true }) wppSelectItem: EventEmitter<AvatarGroupChangeEventDetail>

  private avatarGroupWrapperCssClasses = () => ({
    'wpp-avatar-group': true,
    [`wpp-size-${this.size}`]: true,
    [`wpp-${this.variant}`]: true,
  })

  private getAvatarsWithColors = (avatars: AvatarState[]) => {
    let colorIndex = 0

    return avatars.map(avatar => {
      if (!avatar.src && !avatar.color) {
        avatar.color = AVATAR_COLORS_VARIANTS[colorIndex]
        colorIndex = colorIndex === AVATAR_COLORS_VARIANTS.length ? 0 : colorIndex + 1
      }

      return avatar
    })
  }

  private handleAvatarClick = (
    event: CustomEvent<AvatarChangeEventDetail>,
    avatarIndex: number,
    fromDropdown: boolean,
  ) => {
    this.wppSelectItem.emit({ value: event.detail.value, avatarIndex, fromDropdown })
  }

  private onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (this.menuContextTippyRef) {
        this.menuContextTippyRef.show()
      }
    }
  }

  private handleListItemClick = (event: CustomEvent<ListItemChangeEventDetail>, avatarIndex: number) => {
    const listItem = event.currentTarget as HTMLWppListItemElement

    this.wppSelectItem.emit({ value: listItem, fromDropdown: true, avatarIndex })
  }

  private getAvatarsList = (): AvatarState[] => (this.avatars.length ? this.avatars : this.users)

  render() {
    const avatarsWithColors = this.getAvatarsWithColors(this.getAvatarsList())

    const avatarsToDisplay = avatarsWithColors.slice(0, this.maxAvatarsToDisplay)
    const avatarsInHiddenList = avatarsWithColors.slice(this.maxAvatarsToDisplay)

    return (
      <Host
        class={this.avatarGroupWrapperCssClasses()}
        role="group"
        exportparts="list, item, menu, avatar, hidden-item, hidden-item-with-avatar, hidden-item-avatar, hidden-item-name"
      >
        <ul class="avatars-list" part="list">
          {avatarsToDisplay.map((avatar: AvatarState, avatarIndex: number) => (
            <li
              class={{
                'avatar-item': true,
                interactable: avatar.interactable ?? false,
              }}
              part="item"
            >
              <wpp-avatar
                size={this.size}
                variant={this.variant}
                name={avatar.name}
                src={avatar.src}
                withTooltip={this.withTooltip}
                tooltipConfig={this.tooltipConfig}
                interactable={avatar.interactable}
                color={avatar.color}
                onWppClick={(event: CustomEvent<AvatarChangeEventDetail>) =>
                  this.handleAvatarClick(event, avatarIndex, false)
                }
              />
            </li>
          ))}
          {this.getAvatarsList().length > this.maxAvatarsToDisplay && (
            <li class="avatar-item" part="item">
              <wpp-menu-context
                externalClass="avatar-group"
                listWidth="240px"
                dropdownConfig={{
                  ...this.dropdownConfig,
                  onShow: (instance: Instance) => {
                    const firstListItem: HTMLWppListItemElement | null =
                      instance.popper.querySelector<HTMLWppListItemElement>('.wpp-list-item')

                    if (firstListItem) {
                      firstListItem.setFocus()
                    }

                    if (this.dropdownConfig.onShow) {
                      this.dropdownConfig.onShow(instance)
                    }
                  },
                  onCreate: (instance: Instance) => {
                    this.menuContextTippyRef = instance
                  },
                  onDestroy: () => {
                    this.menuContextTippyRef = undefined
                  },
                }}
                part="menu"
                onKeyDown={this.onKeyDown}
                ariaProps={{ label: `+${avatarsInHiddenList.length} more list items with avatars` }}
              >
                <wpp-avatar
                  amountOfHiddenAvatars={avatarsInHiddenList.length}
                  size={this.size}
                  variant={this.variant}
                  slot="trigger-element"
                  part="avatar"
                />
                <Fragment>
                  {avatarsInHiddenList.map((avatar: AvatarState, avatarIndex: number) => (
                    <wpp-list-item
                      key={avatar.name}
                      onWppChangeListItem={(event: CustomEvent<ListItemChangeEventDetail>) =>
                        this.handleListItemClick(event, avatarIndex)
                      }
                      value={avatar.name}
                      part="hidden-item"
                    >
                      <wpp-avatar
                        name={avatar.name}
                        src={avatar.src}
                        color={avatar.color}
                        variant={this.variant}
                        interactable={avatar.interactable}
                        role="presentation"
                        slot="left"
                        part="hidden-item-avatar"
                      />
                      <span slot="label" class="name" part="hidden-item-name">
                        {avatar.name}
                      </span>
                    </wpp-list-item>
                  ))}
                </Fragment>
              </wpp-menu-context>
            </li>
          )}
        </ul>
      </Host>
    )
  }
}
