import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, MessageTypes } from '../../types/common';
import { ButtonState, ToastCompleteDetail, ToastIcon } from './types';
/**
 * @part body - Main content wrapper
 * @part actions - Action buttons wrapper
 * @part message - Message text
 * @part header - Header text
 * @part info-wrapper - info wrapper element
 * @part action-button - action button element
 * @part icon-start - icon-start element
 * @part icon-wrapper - icon-wrapper element
 */
export declare class WppToast {
  private timer;
  private hideTimeout;
  private contentChangeTimeout;
  private animationFrame;
  private hostElement?;
  private hasLoaded;
  host: HTMLWppToastElement;
  isShown: boolean;
  isHide: boolean;
  toastHeight: number;
  remainingTime: number;
  isMessageFitsWithinSingleLine: boolean;
  hasIconSlot: boolean;
  isHovering: boolean;
  /**
   * Defines the toast style variant.
   * This property is primarily intended for internal use in the chat component.
   */
  readonly variant?: 'default' | 'chat';
  /**
   * Defines the toast index.
   */
  readonly index?: string;
  /**
   * Defines the toast text.
   */
  readonly message: string;
  /**
   * Defines the toast header.
   */
  readonly header?: string;
  /**
   * Defines the toast style based on the available types.
   */
  readonly type: Exclude<MessageTypes, 'brand'>;
  /**
   * Defines for how long the toast is displayed.
   */
  readonly duration: number;
  /**
   * Defines the toast primary action button.
   */
  readonly primaryBtn?: ButtonState;
  /**
   * Defines the toast max message lines, by default it's 3
   */
  readonly maxMessageLines?: number;
  /**
   * If you only provide the ‘name’ key, you should use an icon from the CL (e.g., ‘wpp-icon-user’).
   * Alternatively, if you provide the ‘URL’ key, you can pass an icon using a URL (e.g., ‘https://avatar/1.jpg’)
   */
  readonly icon?: ToastIcon;
  /**
   * Contains the `aria-` props of the wpp-action-button.
   */
  readonly ariaProps: AriaProps;
  /**
   * Defines the z-index of the WppToast.
   */
  readonly zIndex: number;
  /**
   * Emitted when the toast index is displayed.
   */
  wppToastComplete: EventEmitter<ToastCompleteDetail>;
  onContentChange(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private clearAllTimers;
  private static unrefTimer;
  private isHostConnected;
  private startTimer;
  private handleMouseEnter;
  private handleMouseLeave;
  private getIconType;
  private handleCloseClick;
  private onComplete;
  private checkIfTextHasOneLine;
  private hostCssClasses;
  private iconWrapperCssClasses;
  private chatToastWrapper;
  private renderIcon;
  private isIconProvided;
  render(): any;
}
