import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps } from '../../types/common';
import { FullScreenModalCloseDetails, FullScreenModalCloseReason, FullScreenModalFormConfig } from './types';
/**
 * @slot header - Content that is displayed within the `.full-screen-modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.full-screen-modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.full-screen-modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

 *
 * @part wrapper - component wrapper element
 * @part overlay - overlay element
 * @part content - modal content element
 * @part header - header slot element
 * @part body - Main slot content wrapper
 * @part actions - actions slot element
 */
export declare class WppFullScreenModal {
  host: HTMLWppFullScreenModalElement;
  private dialogRef?;
  private topOffset;
  private timeouts;
  private themeSubscription;
  hasHeaderSlot: boolean;
  hasBodySlot: boolean;
  hasActionsSlot: boolean;
  closeReason: FullScreenModalCloseReason | null;
  /**
   * Indicates is the modal open.
   */
  open: boolean;
  /**
   * Makes overlay transparent
   */
  readonly withTransparentOverlay: boolean;
  /**
   * If the modal can be closed by clicking outside of it.
   */
  readonly disableOutsideClick: boolean;
  /**
   * If you pass this prop wrapper of dialog will be rendered as form.
   */
  readonly formConfig?: FullScreenModalFormConfig;
  /**
   * Defines the z-index of the WppFullScreenModal.
   */
  readonly zIndex: number;
  /**
   * If `true` - the full-screen modal will be rendered below the OS bar.
   */
  readonly osBarCompatible: boolean;
  /**
   * Contains the modal `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Handles the modal closing actions.
   */
  wppFullScreenModalClose: EventEmitter<FullScreenModalCloseDetails>;
  /**
   * Event emitted when the open animation starts.
   */
  wppFullScreenModalOpenStart: EventEmitter<void>;
  /**
   * Event emitted when the open animation ends.
   */
  wppFullScreenModalOpenComplete: EventEmitter<void>;
  /**
   * Event emitted when the close animation starts.
   */
  wppFullScreenModalCloseStart: EventEmitter<FullScreenModalCloseDetails>;
  /**
   * Event emitted when the close animation ends.
   */
  wppFullScreenModalCloseComplete: EventEmitter<FullScreenModalCloseDetails>;
  protected handleCloseOnEsc(event: KeyboardEvent): void;
  protected handleChangeFullScreenModalStatus(openStatus: boolean): void;
  /**
   * Method for closing the full screen modal.
   */
  closeFullScreenModal(): Promise<void>;
  /**
   * Method for opening the full screen modal.
   */
  openFullScreenModal(): Promise<void>;
  private onOverlayClick;
  componentDidLoad(): void;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private updateSlotData;
  private handleTransitionStart;
  private handleTransitionEnd;
  private focusDialog;
  private handleCloseModal;
  private headerCssClasses;
  private bodyCssClasses;
  private actionsCssClasses;
  private hostCssClasses;
  private fullScreenModalCssClasses;
  private headerContainerCssClasses;
  render(): any;
}
