import { RangeOf } from '../../types/numberRange';
import { AlignItemsType, DirectionType, JustifyContentType } from './types';
/**
 * @part inner - Content slot element
 */
export declare class WppGrid {
  host: HTMLWppGridElement;
  /**
   If the component is a grid container.
   */
  readonly container: boolean;
  /**
   If the component is a grid item. Must be used inside a grid container.
   */
  readonly item: boolean;
  /**
   Defines the grid direction, works the same as flexbox direction.
   */
  readonly direction: DirectionType;
  /**
   Defines the grid `justifyContent` value, works the same as `justifyContent` in flexbox.
   */
  readonly justifyContent: JustifyContentType;
  /**
   Defines the grid `alignItems`, works the same as `alignItems` in flexbox.
   */
  readonly alignItems: AlignItemsType;
  /**
   Defines the vertical gap between grid columns. Use only if you have more than one column.
   */
  readonly columnSpacing?: RangeOf<24>;
  /**
   Defines the horizontal gap between grid rows. Use only if you have more than one row.
   */
  readonly rowSpacing?: RangeOf<24>;
  /**
   Defines the grid item width for all screen sizes.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  readonly all?: RangeOf<24> | 'auto' | true;
  /**
   Defines the grid item width for screen size - 1280px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  readonly sm?: RangeOf<24> | 'auto' | true;
  /**
   Defines the grid item width for screen size - 1366px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  readonly md?: RangeOf<24> | 'auto' | true;
  /**
   Defines the grid item width for screen size - 1440px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  readonly lg?: RangeOf<24> | 'auto' | true;
  /**
   Defines the grid item width for screen size - 1920px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  readonly xl?: RangeOf<24> | 'auto' | true;
  /**
   Defines the grid item width for screen size - 2220px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  readonly xxl?: RangeOf<24> | 'auto' | true;
  /**
   If the container has full width and no margins.
   */
  readonly fullWidth: boolean;
  /**
   If the container's height is at **100%** and the grid content grows to fill the parent block height.
   */
  readonly fullHeight: boolean;
  /**
   If the container's fluid makes it fill all parent width and height
   */
  readonly fluid: boolean;
  private hostCssClasses;
  render(): any;
}
