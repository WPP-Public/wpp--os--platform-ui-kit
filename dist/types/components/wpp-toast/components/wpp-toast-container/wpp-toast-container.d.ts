import { ToastState } from './types';
/**
 * @part item - toast item
 */
export declare class WppToastContainer {
  host: HTMLWppToastContainerElement;
  toasts: (ToastState & {
    id: string;
  })[];
  private toastsQueue;
  private lastDisplayedAt;
  private displayTimer;
  private hideTimers;
  private hostElement?;
  /**
   * Defines the maximum number of toasts to display at once.
   */
  readonly maxToastsToDisplay: number;
  /**
   * Defines the z-index of the WppToastContainer.
   */
  readonly zIndex: number;
  /**
   * Minimum delay (ms) between two successive toasts becoming visible.
   * When toasts are added in rapid succession (or promoted from the queue back-to-back),
   * this prevents them from entering and exiting in batched "waves" — instead each toast
   * appears on its own timeline, creating a continuous, smooth flow.
   * Set to 0 to disable staggering (toasts appear immediately as slots open up).
   */
  readonly staggerInterval: number;
  componentWillLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private isHostConnected;
  private static unrefTimer;
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
  private canDisplayNow;
  private displayToast;
  private scheduleNextPromotion;
  private promoteFromQueue;
  private removeToastById;
  private hostCssClasses;
  render(): any;
}
