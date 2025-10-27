import { EventEmitter } from '../../stencil-public-runtime';
export declare class WppOverlay {
  host: HTMLWppOverlayElement;
  isHidden: boolean;
  /**
   * Controls the visibility of the overlay.
   */
  readonly isVisible: boolean;
  /**
   * Defines the z-index of the WppOverlay.
   */
  readonly zIndex: number;
  /**
   * Emitted when the overlay is clicked.
   */
  wppClick: EventEmitter<void>;
  handleVisibleChange(newValue: boolean): void;
  componentWillLoad(): void;
  private handleClick;
  private getOverlayCssClasses;
  render(): any;
}
