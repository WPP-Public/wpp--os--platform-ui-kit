import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, DropdownConfig, FOCUS_TYPE } from '../../types/common';
import { BooleanFormControl } from '../../interfaces/boolean-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { ToggleChangeEvent, ToggleValue, ToggleLabelConfig } from './types';
/**
 * @part label - Label text element
 * @part input - input element
 */
export declare class WppToggle implements BaseComponent, BooleanFormControl<ToggleValue> {
  private inputRef?;
  focusType: FOCUS_TYPE;
  readonly host: HTMLWppToggleElement;
  /**
   * Defines the toggle name.
   */
  readonly name?: string;
  /**
   * Defines the toggle value.
   */
  value: ToggleValue;
  /**
   * If the toggle is on.
   */
  checked: boolean;
  /**
   * If the toggle is required.
   */
  readonly required: boolean;
  /**
   * If the toggle is disabled.
   */
  readonly disabled: boolean;
  /**
   * If `true`, the toggle should be focused on page load
   */
  readonly autoFocus: boolean;
  /**
   * Defines the toggle size.
   */
  readonly size: 'm' | 's';
  /**
   * If the toggle works as controlled component.
   */
  readonly controlled: boolean;
  /**
   * Contains the toggle `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Indicates label config
   */
  labelConfig?: ToggleLabelConfig;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Emitted when toggle state changes.
   */
  readonly wppChange: EventEmitter<ToggleChangeEvent>;
  /**
   * Emitted when the toggle is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the toggle loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Method that sets focus on the native input.
   */
  setFocus(): Promise<void>;
  private onClick;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private hostCssClasses;
  private labelCssClasses;
  private onKeyDown;
  render(): any;
}
