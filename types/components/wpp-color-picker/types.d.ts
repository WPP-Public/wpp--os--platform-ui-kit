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
