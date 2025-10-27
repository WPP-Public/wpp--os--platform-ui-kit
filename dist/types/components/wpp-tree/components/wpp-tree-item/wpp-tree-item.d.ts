import { EventEmitter } from '../../../../stencil-public-runtime';
import { TransformSearchQuery, TreeItemEndContentProps, TreeType } from '../../types';
import { TreeItemHighlightOptions } from '../../types';
export declare class WppTreeItem {
  host: HTMLWppTreeItemElement;
  hasIconStartSlot: boolean;
  hasIconEndSlot: boolean;
  hasIconEndContextMenu: boolean;
  isMouseOnIconEnd: boolean;
  isCollapseTransitionEnd: boolean;
  isTextWrappable: boolean;
  /**
   * Indicates current item title
   */
  readonly text?: string;
  /**
   * If 'true', it will be possible to have multiple selection
   */
  readonly multiple: boolean;
  /**
   * Indicates search param
   */
  readonly search: string;
  /**
   * Indicates current item props
   */
  readonly item: TreeType;
  /**
   * Indicates deep level of tree
   */
  readonly level: number;
  /**
   * Indicates highlightOptions for text highlight after search
   */
  readonly highlightOptions: TreeItemHighlightOptions;
  /**
   * Helper that transforms a search query to a custom string, which is then passed to the "highlightWords" library
   * in order to match it to the provided tree item text. For example, "cars!" would be transformed to "cars"
   */
  readonly transformSearchQuery?: TransformSearchQuery;
  /**
   * Defines words highlight in tree-item's title after search.
   */
  readonly disableSearchHighlight: boolean;
  /**
   *  Defines animation for open/close wpp-tree-item.
   */
  readonly disableOpenCloseAnimation: boolean;
  /**
   * Defines truncation for wpp-tree-item
   */
  readonly withItemsTruncation: boolean;
  /**
   * Specifies the content to be displayed on the right side of the tree item.
   * The content can be one of the following types: `avatar`, `avatarGroup`, `tag`, or `text`.
   * Each type supports its own set of properties, which are passed through the `TreeItemEndContentProps` interface.
   *
   * Example usage:
   * - `avatar`: Display a single avatar, typically representing a user.
   * - `avatarGroup`: Show multiple avatars grouped together.
   * - `tag`: Render a status tag with customizable label and color.
   * - `text`: Show a text label with optional tooltip.
   */
  readonly endContent?: TreeItemEndContentProps;
  /**
   * Emitted updated item details
   */
  wppTreeItemOpenChange: EventEmitter<TreeType>;
  /**
   * Emitted when updated item selectable state
   */
  wppTreeItemSelectChange: EventEmitter<TreeType>;
  onItemChange(next: TreeType, prev: TreeType): void;
  private shouldRecalculateItemHeight;
  private defaultItemHeight;
  private itemHeight;
  private getItemHeight;
  componentDidLoad(): void;
  componentDidUpdate(): void;
  private addHeightToHost;
  private updateParentHeight;
  private updateSlotData;
  private handleMouseDown;
  private handleMouseLeave;
  private handleCheckboxClick;
  private handleSwitcherClick;
  private handleItemClick;
  private handleTransitionEnd;
  private calculateItemOffset;
  private hostCssClasses;
  private treeItemClasses;
  private titleClasses;
  private iconStartCssClasses;
  private iconEndCssClasses;
  private endContentCssClasses;
  private renderTitle;
  private renderEndContent;
  render(): any;
}
