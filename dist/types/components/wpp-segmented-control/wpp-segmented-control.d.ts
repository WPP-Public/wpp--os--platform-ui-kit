import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { SegmentedControlChangeEventDetail, SegmentedControlValue, SegmentedControlItemChangeEventDetail, SegmentedControlItemSize, SegmentedControlLabelConfig } from './types';
/**
 * @slot - Should contain only the `segmented-control-item` elements. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part label - Label text element
 */
export declare class WppSegmentedControl implements BaseComponent, BaseFormControl<SegmentedControlValue> {
  host: HTMLWppSegmentedControlElement;
  previousActiveElement: Element | null;
  /**
   * Defines the segmented control size.
   */
  readonly size: SegmentedControlItemSize;
  /**
   * If the item size is relative to the control bar size.
   */
  readonly hugContentOff: boolean;
  /**
   * Defines the control bar width, with the leftover space distributed evenly between the items. Must be in pixels, e.g. **800px**.
   * Requires hugContentOff to be set to true for the width to take effect.
   */
  readonly width: string;
  /**
   * Defines the component style.
   */
  readonly variant: 'text' | 'icon';
  /**
   * If `true`, the segmented control is required
   */
  readonly required: boolean;
  /**
   * Indicates selected value
   */
  value: SegmentedControlValue;
  /**
   * Indicates label config
   */
  labelConfig?: SegmentedControlLabelConfig;
  /**
   * Defines the dropdown configuration for the label tooltip.
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Emitted when the active item has changed, emits value of the active item
   */
  readonly wppChange: EventEmitter<SegmentedControlChangeEventDetail>;
  /**
   * Emitted when the segmented control receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the segmented control loses focus
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  handleChangeSegmentedControlItemClick(event: CustomEvent<SegmentedControlItemChangeEventDetail>): void;
  valueChanged(newValue: string): void;
  widthChange(newValue: string): void;
  onUpdateSize(newSize: SegmentedControlItemSize): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private setSegmentedControlItemsSize;
  private onFocus;
  private onBlur;
  private cssClasses;
  private hostCssClasses;
  render(): any;
}
