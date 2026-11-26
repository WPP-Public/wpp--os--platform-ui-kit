import { AriaProps, FOCUS_TYPE } from '../../types/common';
import { MoreButtonLocaleInterface } from './types';
export declare class WppMoreButton {
  private buttonRef?;
  host: HTMLWppMoreButtonElement;
  isPressed: boolean;
  focusType: FOCUS_TYPE;
  validAriaProps: Record<string, string>;
  /**
   * Defines the button name.
   */
  readonly name?: string;
  /**
   * Indicates the size of the button. Different sizes have different paddings.
   */
  readonly size: 's' | 'm';
  /**
   * If the button is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the component is in loading state.
   */
  readonly loading: boolean;
  /**
   * Contains the button `aria-` props.
   *
   * `labelledby` names elements in your own page: their text becomes the button's name, because the
   * native button lives in this component's shadow root, where your ids cannot be referenced.
   */
  readonly ariaProps: AriaProps;
  /**
   * Localised strings. `label` names the button when `ariaProps` provides no `label` and its `labelledby`
   * ids name nothing. Precedence: ariaProps > locales > defaults.
   */
  readonly locales?: Partial<MoreButtonLocaleInterface>;
  /**
   * Method that sets focus on the native button.
   */
  setFocus(): Promise<void>;
  onUpdateAriaProps(): void;
  componentWillLoad(): void;
  private onKeyDown;
  private onKeyUp;
  private onBlur;
  private onFocus;
  private onMouseDown;
  private getButtonAriaProps;
  private get _locales();
  private hostCssClasses;
  private buttonCssClasses;
  render(): any;
}
