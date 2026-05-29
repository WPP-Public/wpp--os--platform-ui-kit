import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { AvatarVariant, AvatarState, AvatarGroupChangeEventDetail } from './types';
import { Instance } from 'tippy.js';
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
export declare class WppAvatarGroup {
  menuContextTippyRef?: Instance;
  /**
   * Defines a list of avatars with specific attributes, such as name, src, color, and so on: `avatars={[{name: '', src: ''}]}`
   */
  readonly avatars: AvatarState[];
  /**
   * Defines how many avatars to show before `+x`, where `x` is the number of hidden avatars.
   */
  readonly maxAvatarsToDisplay: number;
  /**
   * Defines the avatar size.
   */
  readonly size: 'xs' | 's';
  /**
   * Defines the avatar variant.
   */
  readonly variant: AvatarVariant;
  /**
   * If the avatar has a tooltip that displays the full name on hover.
   */
  readonly withTooltip: boolean;
  /**
   * Defines the tooltip configuration. Under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  tooltipConfig: DropdownConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * Sets the tabindex for all avatars in the group. Use -1 to remove from tab order
   * when inside composite widgets like trees where arrow keys are used for navigation.
   */
  readonly avatarsIndex: number;
  /**
   * Emitted when the avatar item is clicked.
   */
  wppSelectItem: EventEmitter<AvatarGroupChangeEventDetail>;
  private avatarGroupWrapperCssClasses;
  private getAvatarsWithColors;
  private handleAvatarClick;
  private onKeyDown;
  private handleListItemClick;
  render(): any;
}
