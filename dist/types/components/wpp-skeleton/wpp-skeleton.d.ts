export declare class WppSkeleton {
  /**
   * Indicates the skeleton variant
   */
  readonly variant: 'rectangle' | 'circle';
  /**
   * Width of skeleton, if width is not passed, then it use default values. For rectangle it's 240px, for circle - 80px
   */
  readonly width: string | number;
  /**
   * Height of skeleton, if width is not passed, then it use default value - 80px
   */
  readonly height: string | number;
  private hostCssClasses;
  private getSizeWithDimension;
  render(): any;
}
