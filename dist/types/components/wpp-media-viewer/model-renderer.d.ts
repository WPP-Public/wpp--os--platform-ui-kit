import { ImportResult } from 'online-3d-viewer';
import { MediaViewerErrorReason, MediaViewerNavigationMode } from './types';
export interface ModelRendererCallbacks {
  /** The camera distance changed through the engine's own pointer, wheel or touch handling. */
  onZoomChange: () => void;
  /** The browser dropped the WebGL context (eviction or GPU reset). */
  onContextLost: () => void;
}
export interface ModelLoadHandlers {
  onSuccess: (result: ImportResult) => void;
  /** message is the engine's own English text, for devs only; code is its own error code. */
  onError: (reason: MediaViewerErrorReason, message?: string, code?: number) => void;
}
/**
 * Drives the Online 3D Viewer engine for wpp-media-viewer: one canvas and one engine Viewer per
 * component, a fresh model loader per load, and a full teardown. Kept apart from the component so the
 * toolbar and states don't depend on the renderer.
 */
export declare class ModelRenderer {
  private readonly container;
  private readonly callbacks;
  private static isGpuChecked;
  private static canvasPool;
  private static poolTimer?;
  private readonly viewer;
  private readonly canvas;
  private loader;
  private generation;
  private boundingSphere;
  private initialCamera;
  private navigationMode;
  private width;
  private height;
  private pixelRatioQuery;
  private destroyed;
  constructor(container: HTMLElement, callbacks: ModelRendererCallbacks);
  private static takeCanvas;
  private static keepCanvas;
  private static emptyPool;
  private static releaseCanvas;
  /** Throws when the browser can't create a WebGL context. */
  init(): void;
  get hasModel(): boolean;
  setBackgroundColor(rgb: [number, number, number]): void;
  setNavigationMode(mode: MediaViewerNavigationMode): void;
  resize(width: number, height: number): void;
  /**
   * Loads a model from URLs or File objects. A newer load, clear() or destroy() discards this one's
   * result. Each load gets its own loader, so it never merges with files from an earlier load.
   */
  load(source: string[] | File[], handlers: ModelLoadHandlers): void;
  /** Removes the model and discards any load in progress. */
  clear(): void;
  /** Zoom level in percent of the fitted view, or 100 without a model. */
  getZoom(): number;
  /** Multiplies the camera distance by factor, within the zoom bounds. */
  zoomBy(factor: number): void;
  /** Fits the model into the view, keeping the current orientation. */
  fit(): void;
  /** Returns to the orientation the model opened with, fitted to the view. */
  reset(): void;
  /** Rotates the camera around the model, like a pointer drag of the same angle. */
  orbit(angleXDeg: number, angleYDeg: number): void;
  /** Moves the view sideways or up and down, by a share of the camera distance. */
  pan(ratioX: number, ratioY: number): void;
  destroy(): void;
  private showModel;
  private clearModel;
  private getFitDistance;
  private setDistance;
  private onNavigation;
  private onContextLost;
  private watchPixelRatio;
  private onPixelRatioChange;
}
