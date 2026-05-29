import { CustomHandleType } from './types';
export declare class WppHandle {
  /**
   * Defines the type of the WppHandle. Setting this property will help to position the handle on the center of the border.
   * Target handles are placed on the left of the Node, while source handles are placed on the right.
   */
  readonly type: CustomHandleType;
  /**
   * Defines if the WppHandle is selected. The value of this property should be available in the `props: NodeProps`, which are handled by React Flow.
   * Setting this value will help positioning the Handle on the center of the border when it's selected.
   */
  readonly isSelected: boolean;
  /**
   * This property helps to position the WppHandle on the center of the board when the Node is in loading state.
   */
  readonly isLoading: boolean;
  /**
   * Defines the background color of the handle. Only colours from the theme should be used.
   */
  readonly color: string;
  private getHostClasses;
  render(): any;
}
