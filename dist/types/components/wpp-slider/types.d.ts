import { BaseFormControlEventDetail } from '../../interfaces/base-form-control-event-detail';
import { AriaProps } from '../../types/common';
import { LabelConfig } from '../wpp-label/types';
export type SliderValue = number[] | number;
export type SliderLabel = string | number;
export type SliderInputValue = string[] | string;
export type SliderTypes = 'single' | 'range' | 'middle-range';
export type SliderRangeType = 'min' | 'max';
export type SliderChangeEventDetail = BaseFormControlEventDetail<SliderValue> & {
  name?: string;
  middleValue?: number;
};
export interface MarkState {
  label?: SliderLabel;
  value: number;
}
export interface DisplayMarkState extends MarkState {
  position?: string;
}
export interface HandleType<T> {
  single: (value: number) => T;
  range: (value: number[]) => T;
  'middle-range': (value: number) => T;
}
export type SliderLabelConfig = LabelConfig;
export type InputWidth = `${number}px` | `${number}ch`;
/**
 * Aria props for the slider.
 *
 * The visible `labelConfig` label lives in `wpp-label`'s shadow root while the range input lives in
 * this component's, and `for`/`id` does not cross a shadow boundary — so the visible label can never
 * name the control on its own. The name is therefore derived from `labelConfig.text`, and these
 * props override it.
 *
 * `labelledby` ids are looked up in the tree that holds the slider (the document, or the shadow root
 * it is rendered in) and their text becomes the name; it takes precedence over `label`. The text is
 * read when the slider renders, so later changes to that element are not picked up.
 */
export type WppSliderAriaProps = AriaProps & {
  /**
   * Accessible name for the control, and the supported way to name a `single` or `middle-range`
   * slider. On a `range` slider prefer `min` and `max`: `label` alone names both thumbs from the
   * same text, which leaves them indistinguishable.
   */
  label?: string;
  /**
   * Accessible name for the lower thumb of a `range` slider.
   * Defaults to the field label followed by the `minimum` locale qualifier.
   */
  min?: Pick<AriaProps, 'label' | 'labelledby'>;
  /**
   * Accessible name for the upper thumb of a `range` slider, and for the single thumb of
   * `single` / `middle-range` sliders.
   * Defaults to the field label, followed by the `maximum` locale qualifier when there are two thumbs.
   */
  max?: Pick<AriaProps, 'label' | 'labelledby'>;
};
export interface SliderLocales {
  /**
   * Qualifier appended to the field label to name the lower thumb of a `range` slider,
   * so the two thumbs are tellable apart. Defaults to 'minimum'.
   */
  minimum?: string;
  /**
   * Qualifier appended to the field label to name the upper thumb of a `range` slider.
   * Defaults to 'maximum'.
   */
  maximum?: string;
  /**
   * Template for the spoken value of a `middle-range` slider, which shows a band rather than one
   * value. `{from}` and `{to}` are replaced with each end — the mark label at that point when there
   * is one, otherwise the number. A plain string rather than a function so it can come from a
   * translation bundle. Defaults to '{from} to {to}'.
   */
  valueRange?: string;
}
