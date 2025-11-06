import { EventEmitter } from '../../stencil-public-runtime';
import { ModalCloseDetails, ModalCloseReason, ModalFormConfig } from './types';
/**
 * @slot header - Content that is displayed within the `.modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

 *
 * @part wrapper - component wrapper element
 * @part overlay - overlay element
 * @part content - modal content element
 * @part header - header slot element
 * @part body - Main slot content wrapper
 * @part actions - actions slot element
 */
export declare class WppModal {
  host: HTMLWppModalElement;
  hasHeaderSlot: boolean;
  hasBodySlot: boolean;
  hasActionsSlot: boolean;
  closeReason: ModalCloseReason | null;
  /**
   * Indicates is the modal open.
   */
  open: boolean;
  /**
   * Indicates the modal size
   */
  readonly size: 's' | 'm';
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
  readonly formConfig?: ModalFormConfig;
  /**
   * Handles the modal closing actions.
   */
  wppModalClose: EventEmitter<ModalCloseDetails>;
  /**
   * Event emitted when the open animation starts.
   */
  wppModalOpenStart: EventEmitter<void>;
  /**
   * Event emitted when the open animation ends.
   */
  wppModalOpenComplete: EventEmitter<void>;
  /**
   * Event emitted when the close animation starts.
   */
  wppModalCloseStart: EventEmitter<ModalCloseDetails>;
  /**
   * Event emitted when the close animation ends.
   */
  wppModalCloseComplete: EventEmitter<ModalCloseDetails>;
  /**
   * Handles the modal click actions.
   * @deprecated - this prop will be deleted in version 3.0.0 . Use `wppModalOpenStart`/`wppModalOpenComplete` instead
   */
  wppModalOpen: EventEmitter<void>;
  protected handleCloseOnEsc(event: KeyboardEvent): void;
  protected handleChangeModalStatus(openStatus: boolean): void;
  /**
   * Method for closing the modal.
   */
  closeModal(): Promise<void>;
  /**
   * Method for opening the modal.
   */
  openModal(): Promise<void>;
  private onOverlayClick;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private updateSlotData;
  private handleTransitionStart;
  private handleTransitionEnd;
  private headerCssClasses;
  private bodyCssClasses;
  private actionsCssClasses;
  private hostCssClasses;
  private modalCssClasses;
  render(): any;
}
