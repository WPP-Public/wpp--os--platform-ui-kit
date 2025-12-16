import { EventEmitter } from '../../stencil-public-runtime';
import { SideModalCloseDetails, SideModalFormConfig, SideModalCloseReason, ActionConfig, HeaderActionsConfig } from './types';
/**
 * @slot header - Content that is displayed within the `.side-modal` element. To add header content, pass `slot="header"` – can contain the modal title.
 * @slot body - Content that is displayed within the `.side-modal` element. To add body content, pass `slot="body"` – can contain any text that describes the modal actions.
 * @slot actions - Content that is displayed within the `.side-modal` element. To add actions, pass `slot="actions"` – can contain any action buttons.
 * @deprecated The `actions` slot is deprecated and will be removed in the next major release (v3.0.0). Use the `actionsConfig` property instead.
 *
 * @part content - modal content element
 * @part wrapper - component wrapper element
 * @part overlay - side modal overlay element
 * @part header-container - root header element
 * @part header-wrapper - element for slotted header
 * @part button - Button element
 * @part back-button - Back button element
 * @part icon-cross - icon cross element
 * @part icon-chevron - icon chevron element
 * @part header-with-back-button - wrapper with header and back button elements
 * @part actions - actions slot element
 */
export declare class WppSideModal {
  private leftButtonConfig;
  private rightButtonsConfig;
  private topOffset;
  private ignoreOutsideClicks;
  host: HTMLWppSideModalElement;
  isShowContent: boolean;
  isReady: boolean;
  isHidden: boolean;
  hasHeaderSlot: boolean;
  hasBodySlot: boolean;
  hasActionsSlot: boolean;
  isScrolled: boolean;
  closeReason: SideModalCloseReason | null;
  /**
   * Configuration for rendering action buttons.
   *
   * The `actionsConfig` property is an array that can contain at most 1 of each:
   * - 1 WppButton with variant = "primary" / "destructive"
   * - 1 WppButton with variant = "secondary" / "destructive-secondary"
   * - 1 WppActionButton with variant = "primary" / "destructive". The button also has to have an icon.
   */
  readonly actionsConfig?: ActionConfig;
  /**
   * If the side modal is open.
   */
  open: boolean;
  /**
   * Indicates the side modal size
   */
  readonly size?: 's' | 'm' | 'l' | 'xl' | '2xl';
  /**
   * If the side modal can be closed by clicking outside of it.
   */
  readonly disableOutsideClick: boolean;
  /**
   * If you pass this prop wrapper of dialog will be rendered as form.
   */
  readonly formConfig?: SideModalFormConfig;
  /**
   * If the side modal has back button in the header.
   */
  readonly withBackButton: boolean;
  /**
   * If the side modal backdrop is visible.
   */
  readonly backdropVisible: boolean;
  /**
   * Defines the z-index of the WppSideModal.
   */
  readonly zIndex: number;
  /**
   * If `true` - the side modal will be rendered below the OS bar.
   */
  readonly osBarCompatible: boolean;
  /**
   * The list of actions that will be added in the header of the side-modal, on the left of the "X" icon. It can have a maximum length of 4 items.
   */
  readonly headerActionsConfig: HeaderActionsConfig;
  /**
   * Handles the side modal closing actions.
   */
  wppSideModalClose: EventEmitter<SideModalCloseDetails>;
  /**
   * Event emitted when the open animation starts.
   */
  wppSideModalOpenStart: EventEmitter<void>;
  /**
   * Event emitted when the open animation ends.
   */
  wppSideModalOpenComplete: EventEmitter<void>;
  /**
   * Event emitted when the close animation starts.
   */
  wppSideModalCloseStart: EventEmitter<SideModalCloseDetails>;
  /**
   * Event emitted when the close animation ends.
   */
  wppSideModalCloseComplete: EventEmitter<SideModalCloseDetails>;
  /**
   * Handles the side modal click actions.
   * @deprecated - this prop will be deleted in version 4.0.0 . Use `wppSideModalOpenStart`/`wppSideModalOpenComplete` instead
   */
  wppSideModalOpen: EventEmitter<void>;
  /**
   * Handles the side modal back button click.
   */
  wppSideModalBackButtonClick: EventEmitter<void>;
  protected handleCloseOnEsc(event: KeyboardEvent): void;
  protected handleChangeModalStatus(openStatus: boolean): void;
  onUpdateActionsConfig(): void;
  /**
   * Method for closing the modal.
   */
  closeModal(): Promise<void>;
  /**
   * Method for opening the modal.
   */
  openModal(): Promise<void>;
  handleClickOutside(event: MouseEvent): void;
  private updateButtons;
  private onOverlayClick;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private getTopOffset;
  private handleScroll;
  private updateSlotData;
  private handleCloseModal;
  private handleBackButtonClick;
  private handleTransitionStart;
  private handleTransitionEnd;
  private renderLeftButton;
  private renderRightButtons;
  private headerCssClasses;
  private bodyCssClasses;
  private actionsCssClasses;
  private hostCssClasses;
  private sideModalCssClasses;
  private headerContainerCssClasses;
  private renderHeaderActionButtons;
  private renderBody;
  render(): any;
}
