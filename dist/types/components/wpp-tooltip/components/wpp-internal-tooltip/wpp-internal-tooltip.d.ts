import { TooltipThemeTypes } from '../../types';
import { AriaProps } from '../../../../types/common';
/**
 * @part tooltip-content - tooltip content wrapper element
 * @part header - header component
 * @part text - Main text content
 * @part value - value text element
 * @part icon-error - icon error element
 *
 * @internal - this component is used in wpp-tooltip component
 */
export declare class WppTooltip {
  host: HTMLWppInternalTooltipElement;
  /**
   * Indicates tooltip style
   *
   * @internal - this prop is used by wpp-tooltip component
   */
  readonly cssStyle?: Record<string, string>;
  /**
   * Indicates tooltip title
   */
  readonly header?: string;
  /**
   * Sets the main tooltip message
   */
  readonly text?: string;
  /**
   * Sets the word breaking behaviour. By default, it is "break-word", meaning the words
   * will be broken if there is not enough space and a hyphen ("-") is added. The other option
   * is "break-all", which breaks the word but does not add the hyphen.
   */
  readonly wordBreak?: 'break-word' | 'break-all' | 'auto-phrase';
  /**
   * When set, adds a value row below the main message
   */
  readonly value?: string;
  /**
   * If `true`, the tooltip is displayed in an error state
   */
  readonly error: boolean;
  /**
   * If `true`, the tooltip is displayed in a warning state
   */
  readonly warning: boolean;
  /**
   * Tooltip theme, can be `dark` or `light`, default value is `dark`, not related to the WPP theme
   */
  readonly theme: TooltipThemeTypes;
  /**
   * Add an external class to the tooltip wrapper. This class will be applied to this wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .tooltip-wrapper.external-class-name {
   *  ...
   * }
   */
  readonly externalClass: string;
  /**
   * Contains the tooltip `aria-` props.
   */
  readonly ariaProp: AriaProps;
  private cssClasses;
  private hostCssClasses;
  private headerCssClasses;
  private textCssClasses;
  private valueCssClasses;
  private getIconBasedOnProps;
  private getTextLines;
  render(): any;
}
