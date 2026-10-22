import { EventEmitter } from '../../stencil-public-runtime';
import { AriaProps } from '../../types/common';
import { MediaViewerControlPanelConfig, MediaViewerErrorEventDetail, MediaViewerErrorReason, MediaViewerFullscreenChangeEventDetail, MediaViewerLoadEventDetail, MediaViewerLocales, MediaViewerNavigationMode, MediaViewerSize, MediaViewerStatus, MediaViewerUploadEventDetail, MediaViewerZoomChangeEventDetail } from './types';
/**
 * Shows a 3D model that users can rotate, move, zoom, view in fullscreen and replace by uploading files.
 * It renders with the Online 3D Viewer engine (MIT), which brings its own copy of three.js 0.176.0.
 * Both are installed with the library, and the engine only downloads on pages that show a viewer.
 *
 * ### Formats
 * Tested: glTF and GLB (including Draco-compressed), OBJ with MTL and textures, STL, PLY, FBX, DAE, 3MF and OFF.
 * The engine also opens 3DS, AMF, WRL and BIM without downloading anything, and SVG, STEP, IGES, BREP, FCStd,
 * IFC and 3dm (see below). Models made of several files (a `.gltf` with its `.bin` and textures, an `.obj` with
 * its `.mtl`) need every file: pass all the URLs in `src`, or pick or drop all the files together.
 *
 * ### Files downloaded at runtime
 * Some formats load a decoder from `cdn.jsdelivr.net` the first time they're opened. The engine adds it as a
 * `<script>` in the page head or runs it as a worker, with no Subresource Integrity check, and the decoder then
 * downloads and compiles its WebAssembly from the same host. Add these to your Content Security Policy:
 * - Draco-compressed glTF (`draco3d`), tested: `script-src https://cdn.jsdelivr.net 'wasm-unsafe-eval'` and
 *   `connect-src https://cdn.jsdelivr.net`.
 * - STEP, IGES, BREP and FCStd (`occt-import-js`, fetched and run as a `blob:` worker), not tested yet: the
 *   Draco directives plus `worker-src blob:`.
 * - IFC (`web-ifc`) and 3dm (`rhino3dm`), not tested yet: the Draco directives.
 *
 * If the download is blocked, the load ends with a `decoder-failed` error. These formats, and SVG (which the
 * 2D image viewer will handle), aren't in the default `acceptedFileExtensions`; every format in the default
 * list opens without any download, except Draco-compressed glTF.
 *
 * ### Many viewers on one page
 * Browsers allow about 16 live WebGL contexts per page, and each viewer uses one. In a list or grid, show a
 * static preview per item and open a single live viewer for the selected item.
 *
 * The library patches the engine (`patches/online-3d-viewer+0.18.0.patch`): its GPU check runs once per page, a
 * removed viewer drops its document listeners, and a decoder that fails to start ends the load with an error instead
 * of leaving it hanging. Without the patch every viewer leaked a context.
 *
 * Safari, and every browser on iOS and iPadOS (all built on WebKit), keeps counting a removed viewer's context
 * against that limit for a few seconds. There, the viewer hands the context to the next viewer instead, so a page
 * can still show up to the limit and replace viewers freely. A context no new viewer takes is released after 10
 * seconds.
 *
 * ### States
 * Loading fills the surface with a skeleton, and a failed load replaces it with the error state: the
 * reason in words, the engine's code where it gave one, and Retry where there is something to retry -
 * not when the browser has no WebGL or the 3D context was lost, which a reload alone fixes. Both states
 * own the whole surface, so the toolbars step aside until the model or the empty view is back.
 *
 * Files turned away before loading starts - the wrong type, or over `maxFileSize` - don't disturb the
 * model on screen; they only fire `wppError`.
 *
 * `wppError` carries the reason, the words and the code for every failure, so an app can log it or react
 * to it. The live region speaks the same words the error state shows.
 *
 * ### File safety
 * Uploaded and dropped files are parsed in the browser. Keep `acceptedFileExtensions` to the formats you
 * expect, and set `maxFileSize` to match what your storage accepts.
 *
 * ### Keyboard
 * The 3D view is a single tab stop: arrow keys rotate, Shift and the arrow keys move, plus and minus zoom,
 * and Home resets the view. Each toolbar is one tab stop; use the left and right arrow keys inside it.
 *
 * ### Theme and motion
 * The 3D background takes `--wpp-grey-color-100` and follows theme changes made through the design system's
 * theme attribute. If your app swaps the token values some other way, without changing that attribute, the 3D
 * background keeps the old colour until the viewer is recreated. Camera moves are instant, so nothing animates
 * for people who prefer reduced motion.
 *
 * @part viewport - the focusable 3D view that holds the canvas
 * @part controls - the row that holds the toolbars
 */
export declare class WppMediaViewer {
  private themeSubscription;
  private renderer;
  private viewportRef?;
  private fileInputRef?;
  private retryButtonRef?;
  private resizeObserver?;
  private dragDepth;
  private savedScrollPosition;
  private isFullscreenSupported;
  private isPointerFocus;
  private focusedToolbar;
  private isPointerInput;
  private lastLoad;
  private isRetryPending;
  host: HTMLWppMediaViewerElement;
  status: MediaViewerStatus;
  fileName: string;
  zoom: number;
  isFullscreen: boolean;
  isDropActive: boolean;
  announcement: string;
  errorReason?: MediaViewerErrorReason;
  errorFileNames: string[];
  errorCode?: number;
  hasKeyboardFocus: boolean;
  /**
   * URL of the model to show, or a list of URLs when the model is split over several files (for example a
   * `.gltf` with its `.bin` and textures, or an `.obj` with its `.mtl`). An empty value shows the empty state.
   */
  readonly src: string | string[];
  /**
   * Size of the viewer. Numbers are pixels; strings are percentages. Defaults to 400 × 400 pixels, which is
   * also the minimum.
   */
  readonly size: MediaViewerSize;
  /**
   * How dragging rotates the model. `free` turns it on all three axes; `fixed-up` keeps its up axis vertical.
   */
  readonly navigationMode: MediaViewerNavigationMode;
  /**
   * Which toolbars to show. Hiding the upload button also turns off dropping files on the viewer.
   * Zoom and fullscreen act on the model, so they are disabled until one is on screen. The toolbars
   * themselves are hidden while loading and on the error state, which own the whole surface.
   */
  readonly controlPanelConfig: MediaViewerControlPanelConfig;
  /**
   * File extensions, without the dot, that can be uploaded or dropped. Other files are rejected with an
   * error. The default list covers the 3D formats that open without downloading anything, plus the files they
   * reference. SVG is left out because the 2D image viewer will handle it.
   */
  readonly acceptedFileExtensions: string[];
  /**
   * Largest file, in MB, that can be uploaded or dropped. No limit by default.
   */
  readonly maxFileSize?: number;
  /**
   * Overrides for the viewer's text and accessible names.
   */
  readonly locales: Partial<MediaViewerLocales>;
  /**
   * `aria-` attributes for the 3D view. `label` replaces the accessible name built from `locales`.
   */
  readonly ariaProps: AriaProps;
  /**
   * Fires when a model has loaded and is shown.
   */
  wppLoad: EventEmitter<MediaViewerLoadEventDetail>;
  /**
   * Fires when a model can't be shown, or uploaded files are rejected. A failed load shows the error state,
   * but files turned away before loading starts leave the model on screen, so handle those - otherwise a
   * rejected upload looks to a sighted user like nothing happened. `detail.message` is the error in words,
   * and the same words go to the viewer's live region for screen readers.
   */
  wppError: EventEmitter<MediaViewerErrorEventDetail>;
  /**
   * Fires when the zoom level changes, however it changed: the zoom actions, the wheel, a pinch, a
   * keyboard press, `fitToView()` or `resetView()`.
   */
  wppZoomChange: EventEmitter<MediaViewerZoomChangeEventDetail>;
  /**
   * Fires when the viewer enters or leaves fullscreen.
   */
  wppFullscreenChange: EventEmitter<MediaViewerFullscreenChangeEventDetail>;
  /**
   * Fires when the user picks or drops files that pass validation, before they open. Call
   * `preventDefault()` on the event to keep the current model, for example to store the files and then set `src`.
   */
  wppUpload: EventEmitter<MediaViewerUploadEventDetail>;
  /**
   * Fits the model into the view, keeping its orientation.
   */
  fitToView(): Promise<void>;
  /**
   * Returns to the orientation the model opened with, fitted into the view.
   */
  resetView(): Promise<void>;
  /**
   * Enters or leaves fullscreen. Does nothing without a model or where the browser doesn't allow fullscreen.
   * Browsers only grant it from a user gesture, so a call made outside one is refused and warns in the console.
   */
  toggleFullscreen(): Promise<void>;
  onSrcChange(): void;
  onNavigationModeChange(mode: MediaViewerNavigationMode): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  componentWillRender(): void;
  componentDidRender(): void;
  private get _locales();
  private get controls();
  private setUpRenderer;
  private applyBackgroundColor;
  private onViewportResize;
  private updateZoom;
  private get sourceUrls();
  private loadSource;
  private loadModel;
  private emitError;
  private showError;
  private get canRetry();
  private errorText;
  private onRetryClick;
  private returnFocusToRetry;
  private focusViewport;
  private handleFiles;
  private onUploadClick;
  private onFocusAfterPicker;
  private onFileInputChange;
  private hasDraggedFiles;
  private onDragEnter;
  private onDragOver;
  private onDragLeave;
  private onDrop;
  private zoomBy;
  private onViewportPointerDown;
  private onPointerInput;
  private onKeyboardInput;
  private onViewportFocus;
  private onViewportBlur;
  private onViewportKeyDown;
  private onFullscreenChange;
  private viewportLabel;
  private zoomActions;
  private hostCssClasses;
  private hostStyle;
  private renderOverlay;
  private renderControls;
  render(): any;
}
