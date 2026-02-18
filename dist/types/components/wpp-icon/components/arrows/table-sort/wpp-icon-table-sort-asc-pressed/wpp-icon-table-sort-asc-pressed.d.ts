export declare class WppIconTableSortAscPressed {
  /**
   * Defines the icon size, where `s` is **16px** and `m` is **20px**.
   */
  readonly size: 's' | 'm';
  /**
   * Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same.
   */
  readonly width?: number;
  /**
   * Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected.
   */
  readonly height?: number;
  /**
   * Defines the icon color.
   * @deprecated This prop is maintained for backward compatibility but won't affect the icon since arrows have different colors.
   * This property will be removed in version 5.0.0.
   */
  readonly color: string;
  /**
   * Defines the up arrow color.
   */
  readonly upArrowColor: string;
  /**
   * Defines the down arrow color.
   */
  readonly downArrowColor: string;
  render(): any;
}
