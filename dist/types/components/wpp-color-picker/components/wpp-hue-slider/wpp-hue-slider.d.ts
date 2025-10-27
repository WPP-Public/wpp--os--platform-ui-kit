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
   * Event emitted when the hue of the slider changes.
   */
  hueChanged: EventEmitter<number>;
  markerPosition: number;
  updateHue(): void;
  componentDidLoad(): void;
  private setupCanvas;
  private drawHueSlider;
  private updateMarkerPosition;
  private handleMouseDown;
  private handleMouseUp;
  private handleMouseMove;
  private updateHueFromMouse;
  render(): any;
}
