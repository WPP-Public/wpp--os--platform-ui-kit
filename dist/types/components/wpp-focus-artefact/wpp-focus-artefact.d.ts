import { EventEmitter } from '../../stencil-public-runtime';
import { FocusArtefactActionClickDetail, FocusArtefactAriaProps, FocusArtefactLocales, FocusArtefactMenuAction, FocusArtefactResizeDetail, FocusArtefactVersion, FocusArtefactWidth } from './types';
/**
 * WppFocusArtefact: a header with its title which is truncated in case the text is too long, an optional version selector, its actions and a
 * close button, and the artefact's content below it.
 *
 * It expands to fill its parent container, taking its full height and its full width up to its `max-width` (`100%` by
 * default; set it on the element with CSS, e.g. `900px` or `60%`). The
 * user can resize its width by dragging its left border, or with the arrow keys once that border is focused: from then
 * on, it keeps the width it was resized to (`width`). Its width never goes below 440px, nor above its `max-width`. Set
 * its width with the `width` property only: a CSS `width` on the element would override the one the component sets
 * while resizing. The body has no padding, so the content sets its own spacing.
 *
 * As the handle is on the left border, the artefact is meant to sit on the right of a split view.
 *
 * The header always renders the Quote, Pin, Copy and Download actions. The component doesn't know the
 * artefact's content, so they only emit `wppActionClick`: the app performs them. The pin flips on its own
 * and the event reports the state it ends in. Copy confirms the copy the app makes, as chat messages do: a
 * checkmark and "Copied" for 3 seconds.
 *
 * @slot body - Contains the content of the artefact.
 *
 */
export declare class WppFocusArtefact {
  private titleRef?;
  private bodyRef?;
  private resizeStartX;
  private resizeStartWidth;
  private parentObserver?;
  private bodyObserver?;
  private copiedResetTimer?;
  private titleTooltipConfig;
  private moreMenuConfig;
  private versionMenuConfig;
  host: HTMLWppFocusArtefactElement;
  isPinned: boolean;
  isMoreMenuOpen: boolean;
  isBodyScrollable: boolean;
  isVersionMenuOpen: boolean;
  isCopied: boolean;
  currentWidth: number;
  maxResizeWidth: number;
  /**
   * Defines the title of the artefact, displayed in the header. A title that doesn't fit is truncated and
   * shown in full in a tooltip.
   */
  readonly artefactTitle: string;
  /**
   * Defines the icon rendered before the title. Should be a valid icon name from the library.
   */
  readonly titleIcon: `wpp-icon-${string}`;
  /**
   * Defines the additional actions of the header. The Quote, Pin, Copy and Download actions are always
   * rendered; the actions passed here are listed in a "More actions" menu after them. When none are passed,
   * the "More actions" button is hidden.
   */
  readonly menuActions: FocusArtefactMenuAction[];
  /**
   * Defines the versions of the artefact. When at least one version is passed, a version selector is shown
   * next to the title.
   */
  readonly versions: FocusArtefactVersion[];
  /**
   * Defines the id of the selected version. Defaults to the first version. The component keeps it in sync when
   * the user picks a version from the selector.
   */
  selectedVersionId?: string;
  /**
   * Indicates the locales for the focus artefact component.
   */
  readonly locales: Partial<FocusArtefactLocales>;
  /**
   * Defines the ARIA attributes of the artefact region. Its accessible name defaults to the artefact's title.
   */
  readonly ariaProps: FocusArtefactAriaProps;
  /**
   * Defines the width of the artefact: a number of pixels, or a percentage of its parent, e.g. `'40%'`. Until it's
   * set, the artefact fills its parent, up to its `max-width`. The component keeps it in sync when the user resizes the
   * artefact, in the same unit, so the app can store it and pass it back later: a percentage stays a percentage, so
   * the artefact keeps its share of the parent when the parent's width changes. It is kept between the minimum width
   * (440px) and its `max-width`, and a number of pixels never makes it wider than its container.
   */
  width?: FocusArtefactWidth;
  /**
   * Emitted when a header action or a "More actions" menu item is clicked. For the pin, the detail carries the
   * state it ends in (`isActive`).
   */
  wppActionClick: EventEmitter<FocusArtefactActionClickDetail>;
  /**
   * Emitted when the user picks a version from the version selector.
   */
  wppVersionSelect: EventEmitter<FocusArtefactVersion>;
  /**
   * Emitted when the close button is clicked.
   */
  wppClose: EventEmitter<void>;
  /**
   * Emitted when the user resizes the artefact: once on release for a pointer drag, and on every step for keyboard
   * resizing. The detail contains the new width, in the unit `width` was given in: pixels, or a percentage of the
   * parent.
   */
  wppResize: EventEmitter<FocusArtefactResizeDetail>;
  onWidthChange(): void;
  connectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private get _locales();
  private get layoutParent();
  private get selectedVersion();
  private isPinAction;
  private isCopyAction;
  private handleActionClick;
  private confirmCopy;
  private getActionDisplay;
  private handleMenuActionClick;
  private handleVersionSelect;
  private handleClose;
  private observeBody;
  private updateBodyScrollable;
  private measureHostWidth;
  private measureParentWidth;
  private measureBounds;
  private setWidthVar;
  private applyWidth;
  private toPercentage;
  private endResize;
  private handleResizeStart;
  private handleResizeMove;
  private handleResizeEnd;
  private handleResizeKeyDown;
  private renderResizeHandle;
  private renderIcon;
  private renderTitle;
  private renderVersionSelector;
  private renderAction;
  private renderMoreMenu;
  private renderActions;
  render(): any;
}
