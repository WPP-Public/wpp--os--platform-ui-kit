import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, FOCUS_TYPE } from '../../types/common';
import { PillChangeEventDetail, PillSize, PillState, PillType, PillValue } from './types';
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
  private inputEl?;
  private labelRef?;
  private resizeObserver?;
  private resizeObserverCallback?;
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
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private getUpdatedFocusInfo;
  private updateSlotData;
  private onClick;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private onClose;
  private onDragPress;
  private setFocus;
  private updateComponentState;
  private checkTabIndex;
  private getLabelText;
  private checkLabelOverflow;
  private initResizeObserver;
  private renderLabel;
  private setLabelRef;
  private findLabelEl;
  private cssClasses;
  private slotCssClasses;
  private hostCssClasses;
  render(): any;
}
export {};
