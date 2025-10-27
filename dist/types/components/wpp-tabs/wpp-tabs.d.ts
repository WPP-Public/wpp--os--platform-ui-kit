import { EventEmitter } from '../../stencil-public-runtime';
import { TabsChangeEventDetail, TabChangeEventDetail } from './types';
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
  /**
   * Defines the active tab `itemId`.
   */
  value: string;
  /**
   * Indicates tabs size
   */
  readonly size: 'm' | 's';
  /**
   * Emitted when the active tab has changed, emits index of the active tab
   */
  wppChange: EventEmitter<TabsChangeEventDetail>;
  handleChangeTabControlItemClick(event: CustomEvent<TabChangeEventDetail>): void;
  sizeChanged(newSize: string): void;
  valueChanged(newValue: string): void;
  private resizeObserver;
  private redrawUnderline;
  private lengthChange;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private hostCssClasses;
  render(): any;
}
