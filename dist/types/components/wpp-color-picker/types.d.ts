export type ColorPickerType = 'rgba' | 'hex';
export type ColorPickerMode = 'custom' | 'theme' | 'theme and custom';
export interface SaturationChangeDetail {
  saturation: number;
  saturationValue: number;
}
export interface ThemeSection {
  keys: string[];
  title: string;
}
export interface ColorSection {
  title: string;
  colors: HexValueWithOpacity[][];
}
export interface HexValueWithOpacity {
  hexValue: string;
  opacity: string;
}
export type ChangeColorEventDetails = HexValueWithOpacity | string;
export interface ColorPickerLocales {
  /** Accessible name of the field that opens the picker, including the current value. */
  pickerLabel: (value: string) => string;
  /** Accessible name of the picker popup. */
  dialogLabel: string;
  /** Text of the segmented control that switches to the theme colors. */
  themeTab: string;
  /** Text of the segmented control that switches to the custom picker. */
  customTab: string;
  /** Accessible name of the saturation and brightness area. */
  saturationLabel: string;
  /** Value text of the saturation and brightness area, announced as it changes. */
  saturationValueText: (saturation: number, brightness: number) => string;
  /** Accessible name of the hue slider. */
  hueLabel: string;
  /** Accessible name of the opacity slider and of the opacity field. */
  opacityLabel: string;
  /** Accessible name of the color format select. */
  formatLabel: string;
  /** Option text for the hex format. */
  hexFormat: string;
  /** Option text for the RGB format. */
  rgbFormat: string;
  /** Accessible name of the hex value field. */
  hexLabel: string;
  /** Accessible name of the red channel field. */
  redLabel: string;
  /** Accessible name of the green channel field. */
  greenLabel: string;
  /** Accessible name of the blue channel field. */
  blueLabel: string;
  /** Title of the saved colors list. */
  savedColorsTitle: string;
  /** Accessible name of the button that saves the current color. */
  saveColorLabel: string;
  /** Text of the menu item that removes a saved color. */
  removeColorLabel: string;
  /** Accessible name of a theme or saved color swatch. */
  colorLabel: (hexValue: string, opacity: string) => string;
}
