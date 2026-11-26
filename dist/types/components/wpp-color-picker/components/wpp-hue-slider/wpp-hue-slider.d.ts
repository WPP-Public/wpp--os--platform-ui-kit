import { EventEmitter } from '../../../../stencil-public-runtime';
/**
 * @internal
 */
export declare class HueSlider {
  private canvas;
  private isDragging;
  private devicePixelRatio;
  host: HTMLWppHueSliderElement;
  /**
   * Hue value of the slider. Can contain values between: [0, 360].
   */
  readonly hue: number;
  /**
   * Accessible name of the slider, set by wpp-color-picker from its locales.
   */
  readonly label?: string;
  /**
   * Event emitted when the hue of the slider changes.
   */
  hueChanged: EventEmitter<number>;
  componentDidLoad(): void;
  private setupCanvas;
  private drawHueSlider;
  private handleMouseDown;
  private handleMouseUp;
  private handleMouseMove;
  private updateHueFromMouse;
  private handleKeyDown;
  render(): any;
}
