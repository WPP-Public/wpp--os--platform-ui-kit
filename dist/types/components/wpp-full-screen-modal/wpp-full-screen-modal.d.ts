import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps } from '../../types/common';
import { FullScreenModalCloseDetails, FullScreenModalCloseReason, FullScreenModalFormConfig, FullScreenModalLocalesType } from './types';
import { ModalActionsConfig } from '../wpp-modal/types';
/**
 * @slot header - Content that is displayed within the `.full-screen-modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.full-screen-modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions (DEPRECATED) - Content that is displayed within the `.full-screen-modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.

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
  private dialogFocus;
  private themeSubscription;
  hasHeaderSlot: boolean;
  hasBodySlot: boolean;
  hasActionsSlot: boolean;
  closeReason: FullScreenModalCloseReason | null;
  headerLabel: string;
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
   *
   * `labelledby` is intentionally not defaulted: it previously pointed at an id rendered inside
   * the shadow root, which an `aria-labelledby` on the host can never resolve, leaving the dialog
   * with no accessible name. When you do supply one it must name an element in your own tree
   * scope, and it is used verbatim. Otherwise the name is derived from the `header` slot.
   */
  readonly ariaProps: AriaProps;
  /**
   * Indicates locales for the full screen modal.
   */
  readonly locales: Partial<FullScreenModalLocalesType>;
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
  private get _locales();
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
  componentDidRender(): void;
  private handleCloseModal;
  private headerCssClasses;
  private bodyCssClasses;
  private actionsCssClasses;
  private hostCssClasses;
  private fullScreenModalCssClasses;
  private headerContainerCssClasses;
  render(): any;
}
