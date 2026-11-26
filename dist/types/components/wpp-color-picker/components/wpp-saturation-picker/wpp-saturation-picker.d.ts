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
   * Accessible name of the area, set by wpp-color-picker from its locales.
   */
  readonly label?: string;
  /**
   * Value text announced for the current saturation and brightness, set by wpp-color-picker from its locales.
   */
  readonly valueText?: string;
  /**
   * Event emitted when the saturation changes, containing the saturation and the brightness
   */
  saturationChanged: EventEmitter<SaturationChangeDetail>;
  onPropertyChange(): void;
  componentDidLoad(): void;
  private setupCanvas;
  private drawSaturationValuePicker;
  private handleMouseDown;
  private handleMouseUp;
  private handleMouseMove;
  private updateSaturationValue;
  private handleMarkerMouseDown;
  private handleKeyDown;
  render(): any;
}
