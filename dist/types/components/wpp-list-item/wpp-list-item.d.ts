import { EventEmitter } from '../../stencil-public-runtime';
import { ContainerStateType, TooltipConfig, ListItemChangeEventDetail, ListItemState, ListValue } from './types';
import { DropdownConfig } from '../../types/common';
import { TypographyType } from '../wpp-typography/types';
import { ThemeColorValue } from '../../../src/types/theme-tokens';
/**
 * @slot left - May contain an icon or avatar that will be placed before the label, e.g. a plus icon, avatar
 * @slot right - May contain an icon, text or tag, action button that will be placed after the label, e.g. a plus icon, action button
 * @slot label - Main text
 * @slot caption - Caption text
 * @slot subtitle - Subtitle text
 *
 * @part item - Wrapper that contains label, icon, caption
 * @part info-wrapper - Wrapper that contains left-icon, label and caption
 * @part body-wrapper - Wrapper that contains label and caption
 * @part checkbox - checkbox element
 */
export declare class WppListItem {
  private tooltipId;
  private itemWrapper;
  private eventSource;
  private hasRightSlotIcon;
  private debouncedResizeHandler;
  private previousLabelText;
  private labelObserver;
  protected wrapperRef?: HTMLDivElement;
  protected highlightRef?: HTMLDivElement;
  host: HTMLWppListItemElement;
  loading: boolean;
  mounted: boolean;
  hasCaptionSlot: boolean;
  hasLeftSlot: boolean;
  hasRightSlot: boolean;
  hasCaptionHighlight: boolean;
  hasTooltip: boolean;
  hasToggle: boolean;
  hasSubtitleSlot: boolean;
  componentState: ListItemState;
  /**
   * Custom Typography for label text
   * @example
   * labelTypography={{ color: var(--wpp-brand-color), type: 's-midi' }}
   */
  readonly labelTypography?: {
    color?: ThemeColorValue;
    type?: TypographyType;
  };
  /**
   * Custom Typography for caption text
   * @example
   * captionTypography={{ color: var(--wpp-warning-color-500), type: 's-caption' }}
   */
  readonly captionTypography?: {
    color?: ThemeColorValue;
    type?: TypographyType;
  };
  /**
   * Indicates the value of list item
   */
  readonly value?: ListValue;
  /**
   * Indicates the label of list item
   */
  readonly label?: string;
  /**
   * If `true`, the component is checked.
   */
  checked: boolean;
  /**
   * If the component is active.
   */
  readonly active: boolean;
  /**
   * If `true`, the component is selectable.
   */
  readonly selectable: boolean;
  /**
   * If `true`, the component is multiple.
   */
  readonly multiple: boolean;
  /**
   * If `true`, the checkbox is in indeterminate state. Only applies when `multiple` is true.
   * @internal - This prop is controlled by WppSelect when the list item is used inside the select dropdown with `showSelectAllOption` enabled
   */
  readonly indeterminate: boolean;
  /**
   * If `true`, the component is disabled
   */
  readonly disabled: boolean;
  /**
   * If `true`, it will be used to highlight matching parts of the label or caption text in the component.
   */
  readonly highlight: string;
  /**
   * Show if the item list container is visible.
   */
  readonly containerState?: ContainerStateType;
  /**
   * If the component is extended.
   */
  readonly isExtended: boolean;
  /**
   * Tooltip config for the slots.
   */
  readonly tooltipConfig: TooltipConfig;
  /**
   * Configuration of tooltip's dropdown.
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   *  If you pass a href here menu-item will be rendered as a tag. This config allow you to customize link
   */
  readonly linkConfig: {
    href?: string;
    rel?: string;
    target?: string;
    onClick?: (e: PointerEvent) => void;
  };
  /**
   * If 'true', the component is hidden.
   *
   * @internal - This prop is controlled by Autocomplete
   */
  hidden: boolean;
  /**
   * If 'true', the component won't have hover effects.
   *
   * @internal - This prop is controlled by Autocomplete
   */
  readonly isLoadingItem: boolean;
  /**
   * If 'false', the component will have hover/active style states
   */
  nonInteractive: boolean;
  /**
   * Value for a name attribute on checkbox input
   * Used in WppSelect component
   */
  readonly checkboxName?: string;
  /**
   * Emitted when the list item was clicked
   */
  wppChangeListItem: EventEmitter<ListItemChangeEventDetail>;
  /**
   * Sets focus on the list-item element.
   */
  setFocus(): Promise<void>;
  onResize(): void;
  typographyLabel(): void;
  typographyCaption(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private applyTypographyVariables;
  private removeTriggerWrapperAttributes;
  disconnectedCallback(): void;
  highlightUpdate(newValue: string): void;
  handleViewChange(newContainerState: ContainerStateType): void;
  disabledChanged(): void;
  private setupLabelContentObserver;
  private checkHasTooltip;
  protected handleComponentMount: () => void;
  private getHighlightedText;
  private getSlotText;
  private subtitleSlotCssClasses;
  componentWillRender(): void;
  private updateComponentState;
  private updateSlotData;
  private handleItemClick;
  private handleRightWrapperClick;
  private hostCssClasses;
  private itemWrapperCssClasses;
  private labelSlotCssClasses;
  private leftSlotCssClasses;
  private rightSlotCssClasses;
  private captionSlotCssClasses;
  private ulWrapperCssClasses;
  private renderBody;
  private renderRightSlot;
  private renderLeftSlot;
  private handleMouseEnter;
  private handleMouseLeave;
  private handleMouseDown;
  private handleMouseUp;
  private handleKeyDown;
  render(): any;
}
