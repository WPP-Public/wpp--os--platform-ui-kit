import { EventEmitter } from '../../stencil-public-runtime';
import { LoadMoreChangeEventDetail } from './types';
/**
 * @part container - Container element
 * @part progress-text - Progress text element
 * @part button - Load more button element
 */
export declare class WppLoadMore {
  progressPercentage: number;
  /**
   * The total number of items.
   */
  readonly totalItems: number;
  /**
   * The number of items that have been loaded.
   */
  readonly itemsLoaded: number;
  /**
   * Determines whether to show the progress bar.
   */
  readonly showProgressBar: boolean;
  /**
   * Determines whether the component is in a loading state.
   */
  readonly loading: boolean;
  /**
   * Determines whether the component is disabled.
   */
  readonly disabled: boolean;
  /**
   * Defines the amount by which to increment the itemsLoaded when the button is clicked.
   */
  readonly incrementBy: number;
  /**
   * Emitted when the "Load more" button is clicked.
   */
  wppClickLoadMore: EventEmitter<LoadMoreChangeEventDetail>;
  updateProgress(): void;
  componentWillLoad(): void;
  private handleClick;
  private isDisabled;
  private hostCssClasses;
  private progressTextCssClasses;
  private progressContainerCssClasses;
  render(): any;
}
