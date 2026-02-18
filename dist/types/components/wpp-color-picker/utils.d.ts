import { ThemeColor } from '../../types/theme';
import { DropdownConfig } from '../../types/common';
import { ColorSection, HexValueWithOpacity, ThemeSection } from './types';
export declare const DEFAULT_VALUE_RGBA = "rgba(217, 217, 217, 1)";
export declare const DEFAULT_VALUE_HEX = "#D9D9D9";
export declare const MAXIMUM_NUMBER_OF_SAVED_COLORS = 33;
export declare const RGB_INPUTS: string[];
export declare const RGB_INPUT_CONFIG: {
  decimalPatternOptions: {
    min: number;
    max: number;
    minimumFractionDigits: number;
    maximumFractionDigits: number;
  };
};
export declare const OPACITY_INPUT_CONFIG: {
  decimalPatternOptions: {
    min: number;
    max: number;
    minimumFractionDigits: number;
    maximumFractionDigits: number;
    postfix: string;
  };
};
export declare const defaultDropdownConfig: DropdownConfig;
export declare const DEFAULT_THEME_SECTIONS: ThemeSection[];
export declare const rgbaToHex: (rgba: string) => HexValueWithOpacity;
export declare const hexToRGBA: (color: HexValueWithOpacity) => string;
export declare function isValidRgba(rgba: string): boolean;
export declare const isValid6DigitHex: (hex: string) => boolean;
export declare const isValid8DigitHex: (hex: string) => boolean;
/**
 * This function is used to get the default theme data applied on a page. The returning
 * object represents a matrix with data for each color section.
 */
export declare const getColorsFromThemeOnPage: (host: HTMLWppColorPickerElement) => Array<ColorSection>;
/**
 * This function is used to transform the theme object passed to the component. The returning
 * object represents a matrix with data for each color section.
 */
export declare const getColorsForSections: (themeColors: ThemeColor) => Array<ColorSection>;
export declare const hexToRgb: (hex: string) => {
  red: number;
  green: number;
  blue: number;
};
export declare const contrastWithWhite: (hex: string) => number;
export declare const hslToRgb: (h: number, s: number, l: number) => string;
export declare function hexToHsv(hex: string): {
  h: number;
  s: number;
  v: number;
};
export declare const rgbToHex: (r: number, g: number, b: number) => string;
export declare function hsvToHex(h: number, s: number, v: number): string;
