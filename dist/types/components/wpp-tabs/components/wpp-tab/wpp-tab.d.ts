import { EventEmitter } from '../../../../stencil-public-runtime';
import { FOCUS_TYPE } from '../../../../types/common';
import { TabChangeEventDetail, WppTabAriaProps } from '../../types';
/**
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part counter - counter text element
 */
export declare class WppTab {
  private isMouseClicked;
  host: HTMLWppTabElement;
  focusType: FOCUS_TYPE;
  pressed: boolean;
  /**
   * If the component is active.
   */
  readonly active: boolean;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * Indicates value of the item (must be unique)
   */
  readonly value: string;
  /**
   * Defines the number of elements within a specific item.
   */
  readonly counter: number;
  /**
   * Indicates tabs size
   */
  readonly size: 'm' | 's';
  /**
   * Defines the icon that will be displayed in the tab. Must be an icon from the WPP library.
   * Example: `wpp-icon-pie-chart`.
   */
  readonly icon: `wpp-icon-${string}`;
  /**
   * Grouped ARIA props (explicit picks only).
   * tab: { label?, describedby?, controls? }
   */
  readonly ariaProps?: WppTabAriaProps;
  /**
   * Emitted when an item is clicked.
   */
  wppChangeTabControlItem: EventEmitter<TabChangeEventDetail>;
  /**
   * Emitted when an item is in focus.
   */
  wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when an item loses focus.
   */
  wppBlur: EventEmitter<FocusEvent>;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private handleVisibilityChange;
  private onFocus;
  private onBlur;
  private onKeyDown;
  private onKeyUp;
  private onMouseDown;
  private handleClickTab;
  private cssClasses;
  private get tabIndex();
  private hostCssClasses;
  render(): any;
}
