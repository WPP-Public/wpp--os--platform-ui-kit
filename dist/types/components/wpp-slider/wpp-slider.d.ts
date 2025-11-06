import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps, DropdownConfig, FOCUS_TYPE } from '../../types/common';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { DisplayMarkState, MarkState, SliderInputValue, SliderChangeEventDetail, SliderLabelConfig, SliderTypes, SliderValue, InputWidth } from './types';
import { DecimalMaskOptions } from '../wpp-input/types';
interface FocusType {
  min: FOCUS_TYPE;
  max: FOCUS_TYPE;
}
/**
 * @part label - Label text element
 * @part control-wrapper - controls wrapper element
 * @part editable-input-wrapper - controls editable input wrapper element
 * @part input-number - input number element
 * @part input-wrapper - input wrapper element
 * @part input-min - input-min element
 * @part input-max - input-max element
 * @part divider - divider element
 * @part value - slider value text element
 * @part value-wrapper - value-wrapper element
 * @part value-divider - value-divider element
 * @part mark - mark element
 * @part mark-circle - mark bg circle element
 * @part mark-inner - mark inner element
 * @part slider - slider element
 * @part input-slider-min - input-slider-min element
 * @part input-slider-max - input-slider-max element
 * @part marks-list - marks list element
 */
export declare class WppSlider implements BaseComponent, BaseFormControl<SliderValue> {
  private inputRef?;
  private inputMaxRef?;
  private clickableAreaRef?;
  private marksListRef?;
  private segmentWidth;
  private totalWidth;
  host: HTMLWppSliderElement;
  tooltipTexts: Record<number, string>;
  displayMarks: DisplayMarkState[];
  inputValue: SliderInputValue;
  focusType: FocusType;
  /**
   * Defines the slider name.
   */
  readonly name?: string;
  /**
   * Defines the width of the inputs in "px". Same width will apply to both inputs in the range slider.
   * The default value is "68px".
   */
  readonly inputWidth: InputWidth;
  /**
   * Defines the default slider value.
   */
  value: SliderValue;
  /**
   * Defines the marker values between which users can move the slider.
   */
  readonly marks: MarkState[] | boolean;
  /**
   * Defines the slider type.
   */
  readonly type?: SliderTypes;
  /**
   * Defines the minimum allowed slider value.
   */
  min: number;
  /**
   * Defines the the maximum allowed slider value.
   */
  max: number;
  /**
   * Defines the interval between slider markers.
   */
  readonly step: number;
  /**
   * If the slider is continuous.
   */
  readonly continuous: boolean;
  /**
   * If the slider is required.
   */
  readonly required: boolean;
  /**
   * If the slider is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the slider has an input field that allows users to enter a value for the slider to display.
   */
  readonly withInput: boolean;
  /**
   * If the slider displays its current value.
   */
  readonly withValue: boolean;
  /**
   * Contains the slider `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * Tooltip config for label, under the hood tooltip using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Indicates label config
   */
  labelConfig?: SliderLabelConfig;
  /**
   * Defines the size of the slider.
   */
  readonly size?: 's' | 'm';
  /**
   * Defines the mask options for the inputs.
   */
  readonly maskOptions?: DecimalMaskOptions | DecimalMaskOptions[];
  /**
   * Emitted when the slider value changes.
   */
  readonly wppChange: EventEmitter<SliderChangeEventDetail>;
  /**
   * Emitted when the slider is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the slider loses focus.
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  onUpdateMinValue(newValue: number): void;
  onUpdateMaxValue(newValue: number): void;
  onUpdateStepValue(newStepValue: number): void;
  onUpdateInputValue(newInputValue: SliderInputValue): void;
  /**
   * Sets focus on native input
   */
  setFocus(): Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private computeSegmentWidth;
  private onUpdateMinMaxValues;
  private handleType;
  private getSliderInputValue;
  private getDisplayMarks;
  /**
   * @method applyTruncationToMarks
   * Measures internal label elements to determine if text is truncated.
   * Sets tooltipTexts accordingly to enable tooltips for truncated labels.
   */
  private applyTruncationToMarks;
  private handleInputChange;
  private getUpdatedFocusInfo;
  private handleBlur;
  private handleFocus;
  private handleInputBlur;
  private handleInputMouseDown;
  private handleInputKeyUp;
  private handleMarkClick;
  private handleSliderWrapperClick;
  private handleSingleSliderChange;
  private handleRangeSliderChange;
  private markCssClasses;
  private singleSliderWrapperCssClasses;
  private rangeSliderWrapperCssClasses;
  private controlCssClasses;
  private hostCssClasses;
  private marksListCssClasses;
  private inputColumnCssClasses;
  private labelCssClasses;
  private editableInputCssClasses;
  private calculateProgressBar;
  private renderControl;
  private renderEditableInput;
  private renderMarks;
  render(): any;
}
export {};
