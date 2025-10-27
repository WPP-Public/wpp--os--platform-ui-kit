import { EventEmitter } from '../../../../stencil-public-runtime';
import { SaturationChangeDetail } from '../../types';
/**
 * @internal
 */
export declare class SaturationPicker {
  private canvas;
  private isDragging;
  private devicePixelRatio;
  host: HTMLWppSaturationPickerElement;
  /**
   * Saturation value.
   */
  saturation: number;
  /**
   * Corresponds to brightness in HSV
   */
  value: number;
  /**
   * Hue value to get the color.
   */
  readonly hue: number;
  /**
   * Event emitted when the saturation changes, containing the saturation and the brightness
   */
  saturationChanged: EventEmitter<SaturationChangeDetail>;
  markerX: number;
  markerY: number;
  onPropertyChange(): void;
  componentDidLoad(): void;
  private setupCanvas;
  private drawSaturationValuePicker;
  private updateMarkerPosition;
  private handleMouseDown;
  private handleMouseUp;
  private handleMouseMove;
  private updateSaturationValue;
  private handleMarkerMouseDown;
  render(): any;
}
