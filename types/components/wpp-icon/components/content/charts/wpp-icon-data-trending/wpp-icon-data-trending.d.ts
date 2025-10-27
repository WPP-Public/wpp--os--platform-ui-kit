export declare class WppIconDataTrending {
  /**
   Defines the icon size, where `s` is **16px** and `m` is **20px**.
   */
  readonly size: 's' | 'm';
  /**
   Defines the icon width and changes its default size. If you use `width` only, the icon width and height will be the same.
   */
  readonly width?: number;
  /**
    Defines the icon height and changes its default size. If you use `height` only, the icon width will not be affected.
    */
  readonly height?: number;
  /**
   Defines the icon color.
   */
  readonly color: string;
  render(): any;
}
