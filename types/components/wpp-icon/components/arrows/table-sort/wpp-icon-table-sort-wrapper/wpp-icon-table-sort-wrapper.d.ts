export type SortDirection = 'none' | 'ascending' | 'descending';
export type TableSortState = 'default' | 'hover' | 'pressed';
export declare class WppIconTableSortWrapper {
  host: HTMLWppIconTableSortWrapperElement;
  isHoveredState: boolean;
  isPressedState: boolean;
  /**
   * Defines the icon size, where `s` is **16px** and `m` is **20px**.
   */
  readonly size: 's' | 'm';
  /**
   * Defines the icon width and changes its default size.
   */
  readonly width?: number;
  /**
   * Defines the icon height and changes its default size.
   */
  readonly height?: number;
  /**
   * The current sort direction
   */
  readonly direction: SortDirection;
  /**
   * Whether the icon should respond to interactions
   */
  readonly interactive: boolean;
  /**
   * Color configuration for all states and directions.
   * colorUnsorted - Base color for unsorted state (both arrows)
   * colorUnsortedHover - Base color for unsorted hover state (both arrows)
   * colorUnsortedPressed - Base color for unsorted pressed state (both arrows)
   * colorAscendingUp - Up arrow color for ascending state
   * colorAscendingDown - Down arrow color for ascending state
   * colorAscendingDownHover - Down arrow color for ascending hover state
   * colorAscendingDownPressed - Down arrow color for ascending pressed state
   * colorDescendingUp - Up arrow color for descending state
   * colorDescendingUpHover - Up arrow color for descending hover state
   * colorDescendingUpPressed - Up arrow color for descending pressed state
   * colorDescendingDown - Down arrow color for descending state
   */
  readonly colors?: {
    unsorted?: string;
    unsortedHover?: string;
    unsortedPressed?: string;
    ascendingUp?: string;
    ascendingDown?: string;
    ascendingDownHover?: string;
    ascendingDownPressed?: string;
    descendingUp?: string;
    descendingUpHover?: string;
    descendingUpPressed?: string;
    descendingDown?: string;
  };
  /**
   * Is the icon currently hovered
   * This is used to apply hover styles when the icon is interactive.
   */
  readonly isHovered?: boolean;
  /**
   * Is the icon currently pressed
   * This is used to apply pressed styles when the icon is interactive.
   */
  readonly isPressed?: boolean;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private defaultColors;
  private onMouseEnter;
  private onMouseLeave;
  private onMouseDown;
  private onMouseUp;
  private getCurrentState;
  private readonly colorMap;
  private readonly iconMap;
  private getArrowColors;
  private getIconTag;
  private getIconComponent;
  render(): any;
}
