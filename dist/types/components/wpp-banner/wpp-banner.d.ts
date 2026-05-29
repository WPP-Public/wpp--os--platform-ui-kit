import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, BannerTypes } from '../../types/common';
import { BannerChangeEventDetail } from './types';
/**
 * @slot - Contains the main text content. This is the default slot, without the name attribute. Use only plain text or a `<span>` with plain text to maintain consistent styling and functionality.
 * @slot actions - Can contain action buttons.
 *
 * @part left-icon - left-icon element
 * @part wrapper - component wrapper element
 * @part body - Main content wrapper
 * @part content-wrapper - content wrapper element
 * @part message - message element
 * @part actions-wrapper - actions wrapper element
 * @part close-button - close button element
 * @part close-icon - close icon element
 * @part actions-wrapper - actions slot wrapper
 * @part actions-inner - actions slot
 */
export declare class WppBanner {
  private resizeObserver;
  private messageText;
  private themeSubscription;
  host: HTMLWppBannerElement;
  hasActionsSlot: boolean;
  heightBanner: number;
  isOverflowing: boolean;
  isDarkTheme: boolean;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Role of the banner component.
   */
  readonly role: string;
  /**
   * If the banner is displayed.
   */
  show: boolean;
  /**
   * If the banner can be closed.
   */
  readonly closable: boolean;
  /**
   * Defines the banner style based on the available types.
   */
  readonly type: BannerTypes;
  /**
   * Defines the z-index of the WppBanner.
   */
  readonly zIndex: number;
  /**
   * Emitted when the banner state changes.
   */
  wppClose: EventEmitter<BannerChangeEventDetail>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private updateOverflowState;
  private updateMessageText;
  private updateSlotData;
  private handleCloseIconClick;
  private messageWrapperCssClasses;
  private tooltipCSSClasses;
  private actionsCssClasses;
  private bannerWrapperCssClasses;
  private hiddenBannerWrapperCssClasses;
  private hostCssClasses;
  private getMessageTypesIcons;
  render(): any;
}
