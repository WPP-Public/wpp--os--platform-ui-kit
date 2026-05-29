import { AriaProps, FOCUS_TYPE } from '../../types/common';
/**
 * @slot - Icon slot, contains `wpp-icon-plus` by default. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - spinner wrapper element
 * @part spinner - spinner element
 * @part icon-plus - icon plus element
 */
export declare class WppFloatingButton {
  private buttonRef?;
  private themeSubscription;
  host: HTMLWppFloatingButtonElement;
  focusType: FOCUS_TYPE;
  isPressed: boolean;
  validAriaProps: Record<string, string>;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the component is in loading state.
   */
  readonly loading: boolean;
  /**
   * If the button should be in focus on page load.
   */
  readonly autoFocus: boolean;
  /**
   * Defines the button name.
   * */
  readonly name?: string;
  /**
   * Defines the form to which the button belongs.
   */
  readonly form?: string;
  /**
   * Defines where to send the form-data when the form is submitted. Only for buttons with `type="submit"`.
   */
  readonly formAction?: string;
  /**
   * Defines how to encode the form-data before sending it to the server. Only for buttons with `type="submit"`.
   */
  readonly formEncType?: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
  /**
   * Defines which HTTP method to use when sending the form-data. Only for buttons with `type="submit"`.
   */
  readonly formMethod?: 'get' | 'post';
  /**
   * If the form-data is validated after submission. Only for buttons with `type="submit"`.
   */
  readonly formNoValidate: boolean;
  /**
   * Defines where to display a response after form submission. Only for buttons with `type="submit"`.
   */
  readonly formTarget?: '_self' | '_blank' | '_parent' | '_top';
  /**
   * Defines the button type.
   */
  readonly type: 'button' | 'reset' | 'submit';
  /**
   * Defines the button value.
   */
  readonly value?: string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
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
  private onMouseDown;
  private handleClick;
  private hostCssClasses;
  private buttonCssClasses;
  private loaderCssClasses;
  private contentCssClasses;
  render(): any;
}
