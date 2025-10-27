/**
 * @part body - Main content element
 */
export declare class WppDivider {
  host: HTMLWppDividerElement;
  /**
   * If true, the divider will be vertical. Defaults to false.
   */
  readonly vertical: boolean;
  /**
   * If true, the divider will be interactive and can be dragged to resize. Defaults to false.
   */
  readonly resizable: boolean;
  private hostCssClasses;
  private dividerCssClasses;
  render(): any;
}
