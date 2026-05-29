import { EventEmitter } from '../../stencil-public-runtime';
import { StickyBarButtonItem, StickyBarTabItem, StickyBarVariants, VisibilityClasses } from './types';
/**
 * @slot content - Should contain the content for the sticky bar. This slot is available only for the following variant: 'medium'
 */
export declare class WppStickyBar {
  private themeSubscription;
  visibility: VisibilityClasses;
  currentTab: string;
  buttonsList: Array<StickyBarButtonItem | null>;
  host: HTMLWppStickyBarElement;
  /**
   * The variant of the sticky-bar.
   */
  readonly variant: StickyBarVariants;
  /**
   * The title on the sticky bar.
   */
  readonly barTitle: string;
  /**
   * The offset from the top edge of the screen. In most cases, this shouldn't be used, as the sticky-bar
   * searches for the os-bar and places itself right below it. Use this just when the sticky-bar
   * does not find the os-bar.
   */
  readonly offsetFromTop?: number;
  /**
   * The zIndex of the sticky bar.
   */
  readonly zIndex: number;
  /**
   * If the sticky bar has the back button (on the left of the title).
   * By default, the back button is shown.
   */
  readonly withBackButton: boolean;
  /**
   * The distance in pixels after which the sticky bar will become visible.
   * The default value is 200px.
   */
  readonly scrollTreshold: number;
  /**
   * The configuration of the buttons. Based on this array with config items, buttons are placed on the sticky bar.
   * There can be at most 1 primary button, at most 2 secondary buttons and at most 1 action button.
   */
  readonly buttons: StickyBarButtonItem[];
  /**
   * The configuration of the tabs. Based on this array with config items, tabs are placed on the sticky bar.
   * This prop can only be used for the "with-tabs" variant.
   */
  readonly tabs: StickyBarTabItem[];
  /**
   * The size of the tab items.
   * This prop can only be used for the "with-tabs" variant.
   */
  readonly tabSize: 'm' | 's';
  /**
   * Emitted when the back icon is clicked (icon on the left of the title).
   */
  readonly wppClickBackIcon: EventEmitter<void>;
  /**
   * Emitted when one of the buttons provided in the "buttons" list is clicked. This event
   * contains the details of the StickyBarButtonItem provided to the array.
   */
  readonly wppClickBtn: EventEmitter<StickyBarButtonItem>;
  /**
   * Emitted when one of the tabs provided in the "tabs" list is clicked. This event
   * contains the details of the tab item clicked.
   */
  readonly wppClickTab: EventEmitter<StickyBarTabItem>;
  updateButtons(): void;
  updateTabs(newValue: StickyBarTabItem[]): void;
  updateOffset(newValue: number): void;
  handleScroll(): void;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentDidLoad(): void;
  private getHeightOfOsBar;
  private getButtonsList;
  private handleLeftIconClick;
  private handleButtonClick;
  private handleTabClick;
  private hostCssClasses;
  render(): any;
}
