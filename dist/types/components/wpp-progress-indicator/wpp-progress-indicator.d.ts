import { AriaProps } from '../../types/common';
/**
 * @part line - progress line element
 * @part circle - progress circle element
 * @part body - Main content wrapper
 * @part label - Label text element
 */
export declare class WppProgressIndicator {
  host: HTMLWppProgressIndicatorElement;
  /**
   * Defines the progress indicator width in pixels. If left `undefined`, the linear indicators are **100%** in width, and circle indicators are **80px** by default.
   */
  readonly width?: number;
  /**
   * Defines the progress indicator type.
   */
  readonly variant: 'bar' | 'circle';
  /**
   * Defines the loading progress. If `undefined`, the loading progress is infinite.
   */
  readonly value?: number;
  /**
   * If the loading percentage is displayed.
   */
  readonly isShowPercentage: boolean;
  /**
   * Defines the loading label.
   * @deprecated This property will be removed in version 5.0.0.
   */
  readonly label?: string;
  /**
   * Contains the `aria-` props of the progess-indicator component.
   */
  readonly ariaProps: AriaProps;
  /**
   * If set to `true` and `value` is `0`, the component will show a 0% empty state
   * instead of the indeterminate loading animation.
   */
  readonly forceIntermediateEmptyState?: boolean;
  private setComponentWidth;
  progressChange(newProgressValue: number): void;
  widthChange(newWidthValue: number): void;
  componentDidLoad(): void;
  private lineCssClasses;
  private circleWrapperCssClasses;
  private circleCssClasses;
  private hostCssClasses;
  private progressBarCssClasses;
  render(): any;
}
