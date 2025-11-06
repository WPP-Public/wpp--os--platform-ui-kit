import { AriaProps, FOCUS_TYPE } from '../../types/common';
/**
 * @slot icon-start - Can contain an icon that will be placed before the main content, e.g. a plus icon.
 * @slot icon-end - Can contain an icon that will be placed after the main content, e.g. a plus icon. For `wpp-button` with an `aria-expanded="true"` attribute: if you place an arrow icon with the `direction="down"` attribute in this slot, the icon will be rotated.
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part spinner-wrapper - spinner wrapper element
 * @part spinner - spinner element
 * @part text - Main text content
 * @part inner - Content slot element
 */
export declare class WppButton {
  host: HTMLWppButtonElement;
  hasIconStartSlot: boolean;
  hasIconEndSlot: boolean;
  isIconOnly: boolean;
  focusType: FOCUS_TYPE;
  /**
   * Defines the button size. Setting this attribute changes the button height and padding.
   */
  readonly size: 'm' | 's';
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the component is in loading state.
   */
  readonly loading: boolean;
  /**
   * Defines the button type.
   */
  readonly variant: 'primary' | 'secondary' | 'destructive' | 'destructive-secondary';
  /**
   * If the component is inverted.
   * This prop can only be used together with the following variants: "primary" and "secondary".
   */
  readonly inverted: boolean;
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
   * Accepts id of form or FormElement reference
   */
  readonly form?: string | HTMLFormElement;
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
   * Defines the button value. This property should be used only when the button is placed
   * inside a form.
   */
  readonly value?: string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  componentWillLoad(): void;
  private updateSlotData;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private onKeyDown;
  private handleClick;
  private getSpinnerColor;
  private hostCssClasses;
  private buttonCssClasses;
  private iconStartCssClasses;
  private iconEndCssClasses;
  private loaderCssClasses;
  private contentCssClasses;
  render(): any;
}
