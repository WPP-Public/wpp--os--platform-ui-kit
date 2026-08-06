import { EventEmitter } from '../../stencil-public-runtime';
import { SidePanelCloseDetails, SidePanelCloseReason, SidePanelActionsConfig, SidePanelLocalesType, SidePanelResizeDetails, SidePanelAriaProps } from './types';
/**
 * @slot (default) - Content that is displayed within the body of the side panel. The body container has 16px padding.
 */
export declare class WppSidePanel {
  host: HTMLWppSidePanelElement;
  private timeouts;
  private isResizing;
  private resizeStartX;
  private pendingWidth;
  private panelRef?;
  private bodyRef?;
  private themeSubscription;
  private titleRef?;
  isHidden: boolean;
  closeReason: SidePanelCloseReason | null;
  currentWidth: number;
  /**
   * The title displayed in the header section of the side panel.
   */
  readonly panelTitle: string;
  /**
   * If the side panel is open.
   */
  open: boolean;
  /**
   * Configuration for the two action buttons rendered at the bottom of the panel.
   *
   * The `actionsConfig` is a tuple of exactly 2 items:
   * - the first item renders as the secondary (left) button
   * - the second item renders as the primary (right) button
   */
  readonly actionsConfig?: SidePanelActionsConfig;
  /**
   * Defines the z-index of the WppSidePanel.
   */
  readonly zIndex: number;
  /**
   * Contains the panel `aria-` props.
   */
  readonly ariaProps: SidePanelAriaProps;
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<SidePanelLocalesType>;
  /**
   * Handles the side panel closing actions (cross click / escape press).
   */
  wppSidePanelClose: EventEmitter<SidePanelCloseDetails>;
  /**
   * Event emitted when the open animation starts.
   */
  wppSidePanelOpenStart: EventEmitter<void>;
  /**
   * Event emitted when the open animation ends.
   */
  wppSidePanelOpenComplete: EventEmitter<void>;
  /**
   * Event emitted when the close animation starts.
   */
  wppSidePanelCloseStart: EventEmitter<SidePanelCloseDetails>;
  /**
   * Event emitted when the close animation ends.
   */
  wppSidePanelCloseComplete: EventEmitter<SidePanelCloseDetails>;
  /**
   * Event emitted when the panel width changes: once on release for a pointer drag, and on
   * every step for keyboard resizing. The detail contains the new width in pixels.
   */
  wppSidePanelResize: EventEmitter<SidePanelResizeDetails>;
  /**
   * Method for opening the side panel.
   */
  openPanel(): Promise<void>;
  /**
   * Method for closing the side panel.
   */
  closePanel(): Promise<void>;
  protected handleChangeOpenStatus(openStatus: boolean): void;
  protected handleCloseOnEsc(event: KeyboardEvent): void;
  componentDidLoad(): void;
  private setScrollbarWidth;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private get _locales();
  private clampWidth;
  private applyWidthVar;
  private handleCloseClick;
  private handleResizeStart;
  private handleResizeMove;
  private handleResizeEnd;
  private toggleResizeListeners;
  private handleResizeKeyDown;
  private handleTransitionStart;
  private handleTransitionEnd;
  private focusPanel;
  private hostCssClasses;
  private panelCssClasses;
  private renderActions;
  render(): any;
}
