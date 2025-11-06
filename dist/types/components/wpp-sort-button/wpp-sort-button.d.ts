import { AriaProps } from '../../types/common';
/**
 * @slot - Contains the main text content. The default slot, without the name attribute.
 *
 * @part button - Button element
 * @part icon - Icon element
 * @part text - Main text content
 * @part inner - Content slot element
 */
export declare class WppSortButton {
  /**
   * Defines the button name.
   */
  readonly name?: string;
  /**
   * Contains the button `aria-` props.
   */
  readonly ariaProps: AriaProps;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the button should be in focus on page load.
   */
  readonly autoFocus: boolean;
  private hostCssClasses;
  private buttonCssClasses;
  render(): any;
}
