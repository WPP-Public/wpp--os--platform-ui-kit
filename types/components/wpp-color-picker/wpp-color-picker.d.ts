import { EventEmitter } from '../../stencil-public-runtime';
import { ColorPickerMode, ColorPickerType, SaturationChangeDetail, ChangeColorEventDetails } from './types';
import { DropdownConfig } from '../../types/common';
import { Theme } from '../../types/theme';
import { Instance } from 'tippy.js';
import { SegmentedControlValue } from '../wpp-segmented-control/types';
export declare class WppColorPicker {
  private themeColorValues;
  private selectedCategory;
  private isSavedColorPopoverOpen;
  private anchorEl?;
  private contentEl?;
  private selectTippyInstance?;
  private currentPopoverInstance?;
  host: HTMLWppColorPickerElement;
  isDropdownVisible: boolean;
  internalOpacity: string;
  hexColor: string;
  rgbInputValues: {
    red: number;
    green: number;
    blue: number;
  };
  hue: number;
  saturation: number;
  saturationValue: number;
  tippyInstance: Instance;
  activeSegment: SegmentedControlValue;
  displayValue: string;
  internalType: ColorPickerType;
  isInComponent: boolean;
  /**
   * Used to display the initial color of the color-picker component. The color format must respect the type of the component!
   */
  readonly initialColor?: string;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  dropdownConfig: DropdownConfig;
  /**
   * The type of the color-picker. The default value is 'hex', meaning that the colors will be represented
   * in 'hex' format (E.g: "#0014CC"). The other option is 'rgba' (E.g: "rgba(0, 20, 204, 1)").
   */
  type: ColorPickerType;
  /**
   * The mode of the color-picker. The default value is "theme", meaning that the color-picker will display all the
   * colors from the app's theme. When mode is "custom", the user will have the Saturation picker,
   * Hue slider and Opacity slider and can pick any color. Finally, if mode = "theme and custom", both "theme" and "custom" modes are enabled.
   */
  readonly mode: ColorPickerMode;
  /**
   * The opacity value for colors that are in 'hex' format. This property will not work for color values
   * that are in 'rgba' format, as the opacity is already present in that format.
   */
  hexOpacity: string;
  /**
   * This property represents a list of the saved colors which are going to be displayed under the custom color-picker in the dropdown.
   * This only works for the following modes: "custom" and "theme and custom". The color values must be valid "hex" or "rgba" values.
   */
  readonly savedColors: string[];
  /**
   * This property represents an object that contains the theme of the application. By default, the color-picker tries to
   * take the default theme data from its environment. However, if the theme contains additional configuration from the default one,
   * like custom color palettes, you need to pass it as a property here.
   * Note: For OS-based application, this data is available in the "osContext" object.
   */
  readonly themeColors?: Theme;
  /**
   * If the color-picker is disabled.
   */
  readonly disabled: boolean;
  /**
   * Emitted when the "plus" icon is clicked in the "Saved colors" section. The value emitted is in rgba format.
   */
  readonly wppSaveColor: EventEmitter<string>;
  /**
   * Emitted when the "Remove color" options is clicked in the color's popover. The popover is opened when the color
   * element from "Saved colors" is clicked
   */
  readonly wppRemoveSavedColor: EventEmitter<string>;
  /**
   * Emitted when the color-picker is in focus.
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the color-picker loses focus.
   */
  readonly wppBlur: EventEmitter<void>;
  /**
   * Emitted when the color-picker selects a color to display. This happens when the dropdown of the color-picker
   * is closed.
   */
  readonly wppChange: EventEmitter<ChangeColorEventDetails>;
  handleHueChange(event: CustomEvent<number>): void;
  handleSaturationChange(event: CustomEvent<SaturationChangeDetail>): void;
  handleOpacityChange(event: CustomEvent<number>): void;
  handleHexColorChange(): void;
  handleHexOpacityChange(): void;
  handleTypeChange(): void;
  updateIsInComponent(value: boolean): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private checkInitialColorInList;
  private isValidInitialColor;
  private updateHexValue;
  private getRGBValues;
  private getHsvValues;
  private createTippyInstance;
  private handleSegmentChange;
  private handleClickThemeColor;
  private handleChangeTypeOfPicker;
  private handleSaveColor;
  private handleClickSavedColor;
  private handleRightClick;
  private handleRemoveSavedColor;
  private handleInputOpacityChange;
  private handleInputHexChange;
  private handleInputRGBChange;
  private hasColorOpacity;
  private handleAnchorClick;
  private onFocus;
  private onBlur;
  private hostCssClasses;
  private dropdownCssClasses;
  private colorBoxCssClasses;
  render(): any;
}
