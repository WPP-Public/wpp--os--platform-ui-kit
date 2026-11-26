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
  private contentRef?;
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
   * Defines the avatar icon (e.g. `wpp-icon-premium`). Icon avatars are always rendered as a
   * rounded rectangle (like logo avatars), regardless of the `variant` value.
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
  /**
   * Method that sets focus on the avatar: its tooltip trigger when it has a tooltip, otherwise the host. The
   * keyboard focus ring shows unless `focusVisible` is false, which suits focus moved in response to a pointer press.
   */
  setFocus(options?: {
    focusVisible?: boolean;
  }): Promise<void>;
  colorChange(newValue: string): void;
  srcChange(): void;
  componentWillLoad(): void;
  componentDidRender(): void;
  private isAvatarIcon;
  private getUserAbbreviation;
  private handleImageLoadFailure;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private onKeyDown;
  private renderIcon;
  private handleClick;
  private hostCssClasses;
  private contentWrapperCssClasses;
  private imageWrapperCssClasses;
  private imageCssClasses;
  /** A tooltip is only shown for named (non-icon) avatars that opted in via `withTooltip`. */
  private hasTooltip;
  /**
   * A tooltip avatar's content is its focusable, labelled button, unless the avatar is presentational: then it is
   * decoration inside another control (e.g. a pill, which demotes its `icon-start` avatar), and a button there would
   * be a nested interactive control and an extra Tab stop. Its tooltip still opens on hover.
   */
  private hasFocusableTooltipTrigger;
  /**
   * Explicitly presentational avatars are removed from the a11y tree. Tooltip avatars leave their
   * host unsemanticed because their content, the tooltip's trigger, is the focusable, labelled button.
   */
  private getHostAriaProps;
  /**
   * The tooltip shows when its trigger, the slotted content, takes focus, so for a tooltip avatar that content is
   * the button. `index` decides whether it is in the Tab order (0) or only focusable from code (-1).
   */
  private getTooltipTriggerProps;
  render(): any;
}
