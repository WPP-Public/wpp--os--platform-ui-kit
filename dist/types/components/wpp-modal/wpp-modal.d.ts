import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps } from '../../types/common';
import { ModalActionsConfig, ModalCloseDetails, ModalCloseReason, ModalFormConfig } from './types';
/**
 * @slot header - Content that is displayed within the `.modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions (DEPRECATED) - Content that is displayed within the `.modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

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
  private topOffset;
  private timeouts;
  private themeSubscription;
  host: HTMLWppModalElement;
  private dialogRef?;
  hasHeaderSlot: boolean;
  hasBodySlot: boolean;
  hasActionsSlot: boolean;
  closeReason: ModalCloseReason | null;
  isBodyScrollable: boolean;
  headerLabel: string;
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
   * If `true` - the modal will be rendered below the OS bar.
   */
  readonly osBarCompatible: boolean;
  /**
   * Contains the modal `aria-` props.
   *
   * `labelledby` is intentionally not defaulted: it previously pointed at an id rendered inside
   * the shadow root, which an `aria-labelledby` on the host can never resolve, leaving the dialog
   * with no accessible name. When you do supply one it must name an element in your own tree
   * scope, and it is used verbatim. Otherwise the name is derived from the `header` slot.
   */
  readonly ariaProps: AriaProps;
  /**
   * Configuration for rendering action buttons.
   *
   * Accepts an object with:
   * - `buttonConfig`: primary WppButton (variant "primary" / "destructive").
   * - `secondaryButtonConfig` (optional): secondary WppButton.
   */
  readonly actionsConfig?: ModalActionsConfig;
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
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private updateSlotData;
  /**
   * The dialog's accessible name is derived from the slotted header, because an `aria-labelledby`
   * on the host cannot reference an id that lives inside the shadow root – IDREFs do not cross the
   * shadow boundary. Anything the consumer supplies wins, since their ids and labels resolve in
   * their own tree scope.
   */
  private updateHeaderLabel;
  private handleTransitionStart;
  private handleTransitionEnd;
  private renderActionBtn;
  private renderActionsConfig;
  private focusDialog;
  private headerCssClasses;
  private bodyCssClasses;
  private actionsCssClasses;
  private hostCssClasses;
  private modalCssClasses;
  render(): any;
}
