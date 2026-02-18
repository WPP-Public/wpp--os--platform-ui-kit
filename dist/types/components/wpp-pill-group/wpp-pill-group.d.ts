import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { PillSize, PillValue, PillChangeEventDetail, PillType } from '../wpp-pill/types';
import { PillGroupChangeEvent, PillGroupValue, PillGroupLabelConfig } from './types';
/**
 * @slot - Can contain only the `wpp-pill` components that are displayed in `pill-group`. It can be only <wpp-pill>. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part content - content wrapper element
 * @part inner - Content slot element
 */
export declare class WppPillGroup implements BaseComponent, BaseFormControl<PillGroupValue> {
  readonly host: HTMLWppPillGroupElement;
  /**
   * Defines the pill group name.
   */
  readonly name: string;
  /**
   * Defines the pill group size.
   */
  readonly size: PillSize;
  /**
   * Defines the pill group value.
   */
  value?: PillGroupValue;
  /**
   * Indicates the type of the pill
   */
  readonly type: PillType;
  /**
   * If the pill group is required.
   */
  readonly required: boolean;
  /**
   * Indicates label config
   */
  labelConfig?: PillGroupLabelConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Emitted when the pill group value changes.
   */
  readonly wppChange: EventEmitter<PillGroupChangeEvent>;
  /**
   * Emitted when the pill group receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the pill group loses focus
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  handleClick(event: CustomEvent<PillChangeEventDetail>): void;
  onValueChange(newValue: PillValue): void;
  onUpdateSize(newSize: PillSize): void;
  componentDidLoad(): void;
  private setPillsSize;
  private setActivePill;
  private onFocus;
  private onBlur;
  private hostCssClasses;
  render(): any;
}
