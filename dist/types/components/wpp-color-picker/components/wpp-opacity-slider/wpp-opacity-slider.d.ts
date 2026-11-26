import { EventEmitter } from '../../../../stencil-public-runtime';
/**
 * @internal
 */
export declare class OpacitySlider {
  private canvas;
  private isDragging;
  private devicePixelRatio;
  host: HTMLWppOpacitySliderElement;
  /**
   * Hex color of the slider.
   */
  readonly hexColor: string;
  /**
   * Opacity value of the slider. Values between: [0, 1]
   */
  readonly opacity: number;
  /**
   * Accessible name of the slider, set by wpp-color-picker from its locales.
   */
  readonly label?: string;
  /**
   * Event emitted when the opacity value changes
   */
  opacityChanged: EventEmitter<number>;
  onPropertyChange(): void;
  componentDidLoad(): void;
  private setupCanvas;
  private drawOpacitySlider;
  private handleMouseDown;
  private handleMouseUp;
  private handleMouseMove;
  private updateOpacity;
  private handleKeyDown;
  render(): any;
}
