import { EventEmitter } from '../../stencil-public-runtime';
import { FOCUS_TYPE } from '../../types/common';
import { AccordionSectionChangeEventDetail } from './types';
interface FocusType {
  wrapper: FOCUS_TYPE;
  slot: FOCUS_TYPE;
}
/**
 * @slot header - content that is placed inside the header section
 * @slot actions - Content is placed inside the `.actions` element and add content to actions.
 * @slot tags - Content that is placed inside the `.tags` to display contextual tags.
 *
 * @part section - Defines the accordion top wrapper.
 * @part title-wrapper - Defines wrapper that contains title and chevron.
 * @part title - Defines accordion title.
 * @part icon - Defines accordion icon chevron.
 * @part counter - Defines accordion counter.
 * @part divider - Defines accordion divider.
 * @part ws-wrapper - Content slot wrapper element
 * @part ws-inner - Content slot element
 */
export declare class WppAccordion {
  private resizeObserver;
  private expandedTimeout;
  private textWidthCanvas?;
  private prevTextContent;
  private prevFont;
  private cachedTextWidth;
  host: HTMLWppAccordionElement;
  maxHeight: number;
  toggleOverflow: boolean;
  focusType: FocusType;
  hasHeaderSlot: boolean;
  hasActionsSlot: boolean;
  actionsWrapperWidth?: number;
  tagGroupWrapperWidth?: number;
  isExpandedTouched?: boolean;
  hasTagSlot: boolean;
  isTitleOverflowing: boolean;
  titleMaxWidth: number;
  /**
   * If the component is expanded by default. Enabling this prop prevents users from expanding the accordion and removes the initial expansion animation.
   */
  readonly expandedByDefault: boolean;
  /**
   * If the component is expanded.
   */
  expanded: boolean;
  /**
   * If the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * If the component has a divider at the bottom.
   */
  readonly withDivider: boolean;
  /**
   * Defines the number of elements within a specific section.
   *
   * @deprecated - this prop will be deleted in version ***
   */
  readonly counter: number;
  /**
   * Defines the section size.
   */
  readonly size: 's' | 'm' | 'l' | 'xl' | '2xl';
  /**
   * If set, adds text next to the section.
   *
   * @deprecated - this prop will be deleted in version ***. If you want to use this prop, use "header" slot instead
   */
  readonly text?: string;
  /**
   * If set to true, displays `Tag` next to the section. The tag must placed in the `.tags` slot.
   */
  readonly withTag: boolean;
  /**
   * Emitted when the expanded state changes.
   */
  wppChange: EventEmitter<AccordionSectionChangeEventDetail>;
  /**
   * Emitted when a section is in focus.
   */
  wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when a section loses focus.
   */
  wppBlur: EventEmitter<FocusEvent>;
  updateOverflow(expanded: boolean): void;
  /**
   * Calculate the height of the content for the accordion.
   */
  updateHeight(): Promise<void>;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  disconnectedCallback(): void;
  private updateSlotData;
  private getUpdatedFocusInfo;
  private getContentHeight;
  private typographyType;
  private counterType;
  private onClick;
  private onFocus;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private hostCssClasses;
  private cssClasses;
  private contentCssClasses;
  private headerCssClasses;
  private actionsCssClasses;
  private calcAnimationTime;
  private getAnimationStyles;
  private get tabIndex();
  private tagGroupCssClasses;
  private getTextWidth;
  private getElementFontStyle;
  private getHeaderSlotText;
  private getTextTitleFont;
  private checkTitleOverflow;
  render(): any;
}
export {};
