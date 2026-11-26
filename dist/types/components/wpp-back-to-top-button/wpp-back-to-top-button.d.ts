import { AriaProps, FOCUS_TYPE } from '../../types/common';
import { BackToTopButtonLocaleInterface } from './types';
/**
 * @part button - Button element
 * @part icon - Icon element
 */
export declare class WppBackToTopButton {
  private buttonRef?;
  private themeSubscription;
  host: HTMLWppBackToTopButtonElement;
  focusType: FOCUS_TYPE;
  isPressed: boolean;
  validAriaProps: Record<string, string>;
  /**
   * Contains the button `aria-` props.
   *
   * `labelledby` names elements in your own page: their text becomes the button's name, because the
   * native button lives in this component's shadow root, where your ids cannot be referenced.
   */
  readonly ariaProps: AriaProps;
  /**
   * Localised strings. `label` names the button when `ariaProps` provides no `label` and its `labelledby`
   * ids name nothing, so passing other `aria-` props no longer drops the name. Precedence: ariaProps >
   * locales > defaults.
   */
  readonly locales?: Partial<BackToTopButtonLocaleInterface>;
  /**
   * Method that sets focus on the native button.
   */
  setFocus(): Promise<void>;
  onUpdateAriaProps(): void;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
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
