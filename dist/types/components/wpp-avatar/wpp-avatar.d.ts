import { EventEmitter } from '../../stencil-public-runtime';
import { FOCUS_TYPE, DropdownConfig, AriaProps } from '../../types/common';
import { AvatarChangeEventDetail, AvatarSize, AvatarVariant } from '../wpp-avatar-group/types';
/**
 * @part image - Image element
 * @part icon - Icon element
 * @part content - content wrapper element
 * @part tooltip - tooltip wrapper content
 */
export declare class WppAvatar {
  host: HTMLWppAvatarElement;
  isImageFailedToLoad: boolean;
  focusType: FOCUS_TYPE;
  /**
   * Defines a username that is abbreviated if the image source is not provided.
   */
  readonly name: string;
  /**
   * Defines the avatar size.
   */
  readonly size: AvatarSize;
  /**
   * Defines the avatar type.
   */
  readonly variant: AvatarVariant;
  /**
   * Defines the avatar image path.
   */
  readonly src?: string;
  /**
   * Defines the avatar icon. This prop will work if variant='circle', and you can pass icon as wpp-icon-premium.
   */
  readonly icon?: string;
  /**
   * Defines the avatar background color.
   */
  readonly color?: string;
  /**
   * Defines and displays the number of hidden avatars.
   */
  readonly amountOfHiddenAvatars?: number;
  /**
   * If the avatar has a tooltip that displays the full username on hover.
   */
  readonly withTooltip: boolean;
  /**
   * If `true`, the avatar is interactable (have hover effect).
   */
  readonly interactable: boolean;
  /**
   * Indicates the avatar tab index.
   *
   * @internal - This prop is controlled by avatar group
   */
  readonly index: number;
  /**
   * Role of the avatar component.
   */
  readonly role: string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`.
   */
  tooltipConfig: DropdownConfig;
  /**
   * Emitted when the avatar item is clicked.
   */
  wppClick: EventEmitter<AvatarChangeEventDetail>;
  colorChange(newValue: string): void;
  srcChange(): void;
  componentWillLoad(): void;
  private isAvatarIcon;
  private getUserAbbreviation;
  private handleImageLoadFailure;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private onKeyDown;
  private getIconSize;
  private renderIcon;
  private handleClick;
  private hostCssClasses;
  private contentWrapperCssClasses;
  private imageWrapperCssClasses;
  private imageCssClasses;
  render(): any;
}
