import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps } from '../../types/common';
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
  private resizeObserver;
  host: HTMLWppModalElement;
  private dialogRef?;
  hasHeaderSlot: boolean;
  hasBodySlot: boolean;
  hasActionsSlot: boolean;
  closeReason: ModalCloseReason | null;
  isBodyScrollable: boolean;
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
   * Defines the z-index of the WppModal.
   */
  readonly zIndex: number;
  /**
   * Contains the modal `aria-` props.
   */
  readonly ariaProps: AriaProps;
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
  private setupObserver;
  private disconnectObserver;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private updateSlotData;
  private handleTransitionStart;
  private handleTransitionEnd;
  private focusDialog;
  private headerCssClasses;
  private bodyCssClasses;
  private actionsCssClasses;
  private hostCssClasses;
  private modalCssClasses;
  render(): any;
}
