import { ToastState } from './types';
/**
 * @part item - toast item
 */
export declare class WppToastContainer {
  host: HTMLWppToastContainerElement;
  toasts: (ToastState & {
    id: string;
  })[];
  toastsQueue: (ToastState & {
    id: string;
  })[];
  /**
   * Defines the maximum number of toasts to display at once.
   */
  readonly maxToastsToDisplay: number;
  /**
   * Method for adding toasts to `toast-container`.
   */
  addToast(data: ToastState): Promise<string>;
  /**
   * Method for hiding toasts from `toast-container`.
   */
  hideToast(id: string): Promise<void>;
  /**
   * Method for updating toast from `toast-container`.
   */
  updateToast(id: string, updatedData: Partial<Omit<ToastState, 'duration'>>): Promise<void>;
  private handleToastComplete;
  private removeToastById;
  private hostCssClasses;
  render(): any;
}
