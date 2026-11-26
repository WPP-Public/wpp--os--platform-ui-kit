import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, FOCUS_TYPE } from '../../types/common';
import { PillChangeEventDetail, PillLocaleInterface, PillSize, PillState, PillType, PillValue } from './types';
interface FocusType {
  wrapper: FOCUS_TYPE;
  'icon-close': FOCUS_TYPE;
  'icon-draggable': FOCUS_TYPE;
}
/**
 * @slot - Contains the content displayed in the pill. The default slot, without the name attribute.
 * @slot icon-start - May contain an icon or components that will be placed before the main content, e.g. a plus icon, wpp-avatar
 *
 * @part pill-wrapper - Wrapper for the pill content
 * @part input - Input element
 * @part drag-wrapper - drag wrapper element
 * @part drag-icon - drag icon element
 * @part label - label text element
 * @part inner - Content slot element
 * @part active-icon - active icon element
 * @part remove-icon - remove icon element
 */
export declare class WppPill {
  private labelRef?;
  private resizeObserver?;
  private resizeObserverCallback?;
  private iconCrossRef;
  private iconDragRef;
  host: HTMLWppPillElement;
  hasIconStartSlot: boolean;
  hasSquareIcon: boolean;
  componentState?: PillState | null;
  focusType: FocusType;
  isOverflowTruncated: boolean;
  /**
   * Defines the pill value.
   */
  readonly value: PillValue;
  /**
   * Defines the pill size.
   * @deprecated - the pills will always display in only 1 size.
   */
  readonly size: PillSize;
  /**
   * Defines the pill type.
   */
  type: PillType;
  /**
   * If the pill is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the pill has close icon button
   * Note: This is applicable only for `type="display"` or `type="draggable"`.
   */
  readonly removable: boolean;
  /**
   * If the pill is selected.
   */
  checked: boolean;
  /**
   * Defines the pill label.
   */
  readonly label?: string;
  /**
   * Contains the pill `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Indicates locales for the pill. Holds the accessible names of the close and drag icon buttons and the
   * `aria-roledescription` of a `draggable` pill. Partial overrides are merged with the English defaults.
   */
  readonly locales: Partial<PillLocaleInterface>;
  /**
   * Defines the pill name.
   */
  readonly name?: string;
  /**
   * Defines the maximum label length (in characters) of a single item.
   * Zero or fewer means there is no limit
   * @deprecated - this prop will be deleted in version 4.0.0.
   */
  readonly maxLength?: number;
  /**
   * If set, the tooltip will be shown when the text is truncated.
   */
  readonly showTooltipOnTruncate = true;
  /**
   * Emitted when the selected state changes.
   */
  wppClick: EventEmitter<PillChangeEventDetail>;
  /**
   * Emitted when the pill is in focus.
   */
  wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the pill loses focus.
   */
  wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when the close icon clicked
   */
  wppClose: EventEmitter<MouseEvent>;
  /**
   * Emitted when the drag icon pressed
   */
  wppDragPress: EventEmitter<MouseEvent>;
  /**
   * Method that sets focus on the native button.
   */
  setFocus(): Promise<void>;
  /**
   * Moves keyboard focus to the pill's remove icon and paints its focus ring.
   *
   * The ring is a `tab-focus` class this component only sets from its own Tab keyup, so a parent
   * that re-homes focus here with a plain `focus()` moves focus invisibly (WCAG 2.4.7). Parents
   * that take focus off a removed neighbouring pill should call this instead. No-op when the pill
   * has no remove icon to focus.
   */
  setRemoveIconFocus(): Promise<void>;
  /**
   * Method that sets focus on the drag icon button. Used by the pill group to restore focus after the pills are
   * re-ordered. `withFocusRing` shows the keyboard focus ring (keyboard re-ordering); pass `false` after a mouse drag.
   */
  setFocusDragIcon(withFocusRing?: boolean): Promise<void>;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private get _locales();
  private getUpdatedFocusInfo;
  private updateSlotData;
  private makeIconStartNonInteractive;
  private onClick;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private handleKeyDown;
  private onClose;
  private onCloseKeyDown;
  private onDragPress;
  /**
   * Keeps focus on the pill's own control after a click: the host for `single` / `multiple` (it carries the role, state
   * and keyboard handling), the drag icon button for `draggable`. Without this, clicking slotted `icon-start` content
   * (e.g. an avatar with `tabindex="-1"`) would focus that content.
   */
  private focusHost;
  private updateComponentState;
  private checkTabIndex;
  private getLabelText;
  private checkLabelOverflow;
  private initResizeObserver;
  private renderLabel;
  private setLabelRef;
  private findLabelEl;
  private getPillRole;
  private getAriaRoleDescription;
  private getAriaChecked;
  private getListenersForDraggable;
  private cssClasses;
  private slotCssClasses;
  private hostCssClasses;
  render(): any;
}
export {};
