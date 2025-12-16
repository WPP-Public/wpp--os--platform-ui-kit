import { EventEmitter } from '../../stencil-public-runtime';
import { TabsChangeEventDetail, TabChangeEventDetail, TabsLocaleInterface, WppTabsAriaProps } from './types';
/**
 * @slot - Should contain only the tab control elements. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part inner - Content slot element
 * @part counter - tabs slider element
 */
export declare class WppTabs {
  host: HTMLWppTabsElement;
  position: string;
  previousActiveTab: Element | null;
  _locales: TabsLocaleInterface;
  /**
   * Defines the active tab `itemId`.
   */
  value: string;
  /**
   * Indicates tabs size
   */
  readonly size: 'm' | 's';
  /**
   * Grouped ARIA props for the tablist: { label?, labelledby? }
   * Precedence: ariaProps > locales > defaults
   */
  readonly ariaProps?: WppTabsAriaProps;
  /**
   * Locales for accessible strings. Only tablistLabel currently.
   */
  readonly locales?: Partial<TabsLocaleInterface>;
  /**
   * Emitted when the active tab has changed, emits index of the active tab
   */
  wppChange: EventEmitter<TabsChangeEventDetail>;
  handleChangeTabControlItemClick(event: CustomEvent<TabChangeEventDetail>): void;
  onLocalesChange(newLocales?: Partial<TabsLocaleInterface>): void;
  handleKeydown(event: KeyboardEvent): void;
  sizeChanged(newSize: string): void;
  valueChanged(newValue: string): void;
  private resizeObserver;
  private getTabs;
  private redrawUnderline;
  private lengthChange;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private hostCssClasses;
  render(): any;
}
