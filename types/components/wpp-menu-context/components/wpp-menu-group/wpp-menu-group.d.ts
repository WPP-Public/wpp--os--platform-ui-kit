/**
 * @slot - Content displayed within the `menu-group` component. The default slot, without the name attribute.
 *
 * @part header - header text element
 * @part divider - divider element
 */
export declare class WppMenuGroup {
  /**
   * Defines the header message.
   */
  readonly header?: string;
  /**
   * If a divider is displayed.
   */
  readonly withDivider?: boolean;
  private hostCssClasses;
  render(): any;
}
