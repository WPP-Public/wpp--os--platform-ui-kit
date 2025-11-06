import { DropdownConfig } from '../../types/common';
import { TooltipThemeTypes } from './types';
/**
 * @slot - Can contain the tooltip anchor content. The default slot, without the name attribute.
 * @slot tooltip-content - Contains the custom content the user gives to the tooltip. To use this slot, you also have to pass `allowHTML: true` to the `config` property. Do not use WPP components (except WppTypography) in this slot.
 */
export declare class WppTooltip {
  private anchorEl?;
  private contentEl?;
  private customContentEl?;
  private tippyInstance?;
  private arrowColor;
  private readonly FORBIDDEN_PREFIX;
  private readonly ALLOWED_TAGS;
  host: HTMLWppTooltipElement;
  hidden: boolean;
  style: Record<string, string>;
  /**
   * If set, disables the tooltip.
   * @internal - This prop is for internal use only.
   */
  readonly disabled: boolean;
  /**
   * Defines the tooltip title.
   */
  readonly header?: string;
  /**
   * Defines the main tooltip message.
   */
  readonly text?: string;
  /**
   * If set, adds a value row under the main message.
   */
  readonly value?: string;
  /**
   * If the tooltip is styled as an error.
   */
  readonly error: boolean;
  /**
   * If the tooltip is styled as a warning.
   */
  readonly warning: boolean;
  /**
   * Sets the word breaking behaviour. By default, it is "break-word", meaning the words
   * will be broken if there is not enough space and a hyphen ("-") is added. The other option
   * is "break-all", which breaks the word but does not add the hyphen.
   */
  readonly wordBreak?: 'break-word' | 'break-all' | 'auto-phrase';
  /**
   * Defines the tooltip theme.
   */
  readonly theme: TooltipThemeTypes;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  config: DropdownConfig;
  /**
   * Add an external class to the tooltip wrapper. This class will be applied to this wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .tooltip-wrapper.external-class-name {
   *  ...
   * }
   */
  readonly externalClass: string;
  /**
   * Defines the dropdown's width. The maximum width of the dropdown is 350px.
   */
  readonly dropdownWidth: 'auto' | string;
  updateConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig): void;
  updateTheme(): void;
  textChanged(newText: string, oldText: string): void;
  handleDisabledChange(newDisabled: boolean): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  connectedCallback(): void;
  private transformAllowedTags;
  private arrowSVG;
  private createTippyInstance;
  private getArrowBgColor;
  private getCssValues;
  private hostCssClasses;
  private contentWrapperCssClasses;
  render(): any;
}
