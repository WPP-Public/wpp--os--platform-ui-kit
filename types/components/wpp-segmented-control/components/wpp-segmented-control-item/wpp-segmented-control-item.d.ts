import { EventEmitter } from '../../../../stencil-public-runtime';
import { SegmentedControlItemChangeEventDetail, SegmentedControlItemSize } from '../../types';
/**
 * @slot - Can contain either plain text or an icon depending on the `variant` prop. Use icons provided with the component library or custom **.svg** files that can be styled with the CSS color attribute. The default slot, without the name attribute.
 * @part item - Wrapper that can contain label or icon
 */
export declare class WppSegmentedControlItem {
  host: HTMLWppSegmentedControlItemElement;
  /**
   * Defines the item size.
   */
  readonly size: SegmentedControlItemSize;
  /**
   * If the component is active.
   *
   * @internal - This prop is controlled by container like Segmented Control, do not set it manually.
   */
  readonly active: boolean;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * Indicates value of item (must be unique)
   */
  readonly value: string | number;
  /**
   * Defines the number of elements within a specific item.
   * The counter is only displayed when the `variant` is set to 'text'.
   */
  readonly counter: number;
  /**
   * Defines the item style.
   * - 'text': Displays text with an optional counter if provided.
   * - 'icon': Displays an icon without a counter.
   */
  readonly variant: 'text' | 'icon';
  /**
   * If the item size is relative to the control bar size.
   */
  readonly hugContentOff: boolean;
  /**
   * Emitted when an item is clicked.
   */
  wppChangeSegmentedControlItem: EventEmitter<SegmentedControlItemChangeEventDetail>;
  /**
   * Emitted when an item is in focus.
   */
  wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when an item loses focus.
   */
  wppBlur: EventEmitter<FocusEvent>;
  private handleClickSegmentedControl;
  private onFocus;
  private onBlur;
  private cssClasses;
  private hostCssClasses;
  private get tabIndex();
  render(): any;
}
