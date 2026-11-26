export interface LoadMoreChangeEventDetail {
  newItemsLoaded: number;
  incrementBy: number;
}
export interface LoadMoreLocales {
  /**
   * Text of the load more button.
   */
  loadMore: string;
  /**
   * Progress text shown with the progress bar, e.g. "30 of 100 items". It also names the progress bar and is
   * announced politely when more items load.
   */
  itemsProgress: (loaded: number, total: number) => string;
}
