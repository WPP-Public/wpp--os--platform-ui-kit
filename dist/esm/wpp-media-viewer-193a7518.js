import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-a0877c3d.js';
import { y as mergeLocales, D as getAriaProps } from './utils-49ce8daf.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-487838b3.js';

const LOCALES_DEFAULTS = {
  viewportLabel: '3D model viewer, {fileName}',
  viewportEmptyLabel: '3D model viewer, no model loaded',
  keyboardInstructions: 'Use the arrow keys to rotate, Shift and the arrow keys to move, plus and minus to zoom, and Home to reset the view.',
  uploadToolbarLabel: 'Upload',
  uploadButtonLabel: 'Upload model',
  zoomToolbarLabel: 'Zoom',
  zoomOutButtonLabel: 'Zoom out',
  zoomInButtonLabel: 'Zoom in',
  zoomLevelText: '{value}%',
  zoomResetButtonLabel: '{value}%, reset view',
  fullscreenToolbarLabel: 'Fullscreen',
  enterFullscreenButtonLabel: 'Enter fullscreen',
  exitFullscreenButtonLabel: 'Exit fullscreen',
  loadingAnnouncement: 'Loading the 3D model',
  loadedAnnouncement: 'Loaded {fileName}',
  errorTitle: 'Could not load',
  errorWithCodeText: '{message} (Error {code})',
  retryButtonLabel: 'Retry',
  noImportableFileError: 'This file type can’t be opened.',
  failedToLoadError: 'The file couldn’t be loaded.',
  importFailedError: 'The model couldn’t be read.',
  decoderFailedError: 'The decoder for this file type couldn’t be loaded.',
  unsupportedFileError: 'These files aren’t a supported type: {fileNames}.',
  fileTooLargeError: 'These files are larger than {maxFileSize} MB: {fileNames}.',
  webglUnavailableError: 'This browser can’t display 3D models.',
  contextLostError: 'The 3D view stopped working. Reload the page to try again.',
};
const DEFAULT_SIZE = { width: 400, height: 400 };
const DEFAULT_CONTROL_PANEL_CONFIG = {
  showUploadButton: true,
  showZoomControls: true,
  showFullscreenButton: true,
};
/**
 * 3D formats the engine opens without downloading anything, plus the files they reference (glTF buffers,
 * OBJ materials, textures). SVG is left out: the 2D image viewer will handle it. STEP, IGES, BREP, IFC, 3dm
 * and FCStd also work, but they load their decoders from cdn.jsdelivr.net, so devs opt in to them explicitly.
 */
const DEFAULT_ACCEPTED_FILE_EXTENSIONS = [
  'glb',
  'gltf',
  'bin',
  'obj',
  'mtl',
  'stl',
  'ply',
  'fbx',
  'dae',
  '3ds',
  '3mf',
  'amf',
  'off',
  'wrl',
  'bim',
  'png',
  'jpg',
  'jpeg',
  'tga',
  'bmp',
  'gif',
  'webp',
];
/** Zoom level bounds, in percent of the fitted view. */
const MIN_ZOOM = 25;
const MAX_ZOOM = 800;
/** Camera distance multipliers for one zoom step. */
const ZOOM_IN_FACTOR = 0.8;
const ZOOM_OUT_FACTOR = 1.25;
/** Which way each arrow key turns or moves the model, as [x, y]. */
const ARROW_DIRECTIONS = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};
/** Keyboard steps: degrees per arrow press, and pan distance as a share of the camera distance. */
const ORBIT_STEP_DEGREES = 10;
const PAN_STEP_RATIO = 0.05;
/** How the engine reports a decoder it couldn't download or start (Draco, STEP/IGES/BREP/FCStd, 3dm, IFC). */
const DECODER_ERROR_MESSAGES = [
  'Failed to load draco decoder.',
  'Failed to load occt-import-js.',
  'Failed to load rhino3dm.',
  'Failed to load web-ifc.',
];
// Most canvases a WebKit page keeps for reuse by viewers created later. Browsers allow about 16 live WebGL contexts per
// page, so more would never be reused.
const MAX_POOLED_CANVASES = 16;
// How long, in milliseconds, kept canvases wait for a new viewer before their contexts are released. Remounts and
// re-renders replace a viewer within moments; after this, nothing is held for a viewer that may never come.
const POOL_IDLE_TIMEOUT = 10000;

/** Replaces each `{name}` placeholder in a locale string with its value. */
const fillTemplate = (template, values) => Object.entries(values).reduce((text, [name, value]) => text.split(`{${name}}`).join(String(value)), template);
const fileNameFromUrl = (url) => {
  const path = url.split(/[?#]/)[0];
  return decodeURIComponent(path.substring(path.lastIndexOf('/') + 1));
};
const fileExtension = (fileName) => {
  const dot = fileName.lastIndexOf('.');
  return dot === -1 ? '' : fileName.substring(dot + 1).toLowerCase();
};
/** A size prop value as CSS: a number is pixels, a string is used as written. */
const toCssLength = (value) => (typeof value === 'number' ? `${value}px` : value);
const ERROR_LOCALE_KEYS = {
  'no-importable-file': 'noImportableFileError',
  'failed-to-load': 'failedToLoadError',
  'import-failed': 'importFailedError',
  'decoder-failed': 'decoderFailedError',
  'unsupported-file': 'unsupportedFileError',
  'file-too-large': 'fileTooLargeError',
  'webgl-unavailable': 'webglUnavailableError',
  'context-lost': 'contextLostError',
};

const wppMediaViewerCss = ":host{position:relative;display:block;-webkit-box-sizing:border-box;box-sizing:border-box;min-width:400px;min-height:400px;overflow:hidden;border-radius:var(--wpp-border-radius-m);background-color:var(--wpp-grey-color-100)}:host(.wpp-full-screen){width:100%;height:100%;border-radius:0}.media-viewer{position:absolute;inset:0}.viewport{position:absolute;inset:0;outline:none;background-color:var(--wpp-grey-color-100)}.viewport canvas{display:block}.viewport::after{content:\"\";position:absolute;inset:3px;border-radius:var(--wpp-border-radius-m);pointer-events:none}.viewport.tab-focus::after{border-radius:var(--wpp-border-radius-m);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.overlay{position:absolute;inset:0;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;padding:24px;text-align:center;pointer-events:none}.drop-overlay{position:absolute;inset:0;border:2px dashed var(--wpp-grey-color-500);border-radius:var(--wpp-border-radius-m);pointer-events:none}.loading-skeleton{position:absolute;inset:0;display:block;pointer-events:none}.zoom-toolbar::part(action-zoom-level){min-width:56px}.error-state{-ms-flex-direction:column;flex-direction:column;gap:14px;background-color:var(--wpp-grey-color-100);pointer-events:auto}.error-text{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:4px}.error-line{-ms-flex-pack:center;justify-content:center}.controls{position:absolute;right:0;bottom:0;left:0;display:-ms-flexbox;display:flex;-ms-flex-align:end;align-items:flex-end;-ms-flex-pack:justify;justify-content:space-between;padding:0 24px 24px;pointer-events:none}.controls .toolbar{pointer-events:auto}.view-options{display:-ms-flexbox;display:flex;gap:12px;margin-left:auto}.visually-hidden{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}";

const WppMediaViewer = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppLoad = createEvent(this, "wppLoad", 1);
    this.wppError = createEvent(this, "wppError", 1);
    this.wppZoomChange = createEvent(this, "wppZoomChange", 1);
    this.wppFullscreenChange = createEvent(this, "wppFullscreenChange", 1);
    this.wppUpload = createEvent(this, "wppUpload", 1);
    this.themeSubscription = themeSubscriptionController(() => this.host, () => this.applyBackgroundColor());
    this.renderer = null;
    this.dragDepth = 0;
    this.savedScrollPosition = { x: 0, y: 0 };
    this.isFullscreenSupported = false;
    // True while a pointer press is focusing the view, so that focus doesn't paint the keyboard ring
    this.isPointerFocus = false;
    // The toolbar that held focus before a render; see componentDidRender
    this.focusedToolbar = null;
    // Whether the last interaction with the viewer was a pointer press, so moved focus keeps the same look
    this.isPointerInput = false;
    // The last thing asked for, so Retry can ask for it again
    this.lastLoad = null;
    // Set by Retry: if the retried load fails again, focus goes to the new Retry button; see returnFocusToRetry
    this.isRetryPending = false;
    this.onViewportResize = () => {
      if (!this.renderer || !this.viewportRef)
        return;
      this.renderer.resize(this.viewportRef.clientWidth, this.viewportRef.clientHeight);
      this.updateZoom();
    };
    // Every route to a new zoom ends here - the actions, the wheel, a pinch, the keyboard and the methods
    this.updateZoom = () => {
      const zoom = Math.round(this.renderer?.getZoom() ?? 100);
      if (zoom === this.zoom)
        return;
      this.zoom = zoom;
      this.wppZoomChange.emit({ zoom });
    };
    this.onRetryClick = () => {
      if (!this.lastLoad)
        return;
      // Retry goes away with the error state as the load starts, so move focus now, before the browser drops it on
      // the page. A success leaves it on the view, where the model now is.
      this.focusViewport();
      this.isRetryPending = true;
      this.loadModel(this.lastLoad.source, this.lastLoad.fileNames);
    };
    this.onUploadClick = () => {
      // From the keyboard, focus coming back should show the ring and the tooltip as usual, so leave it alone
      if (this.isPointerInput)
        window.addEventListener('focus', this.onFocusAfterPicker, true);
      this.fileInputRef?.click();
    };
    // Closing the file dialog gives focus back to Upload, which would open its tooltip. Stop that focus event on its
    // way down so the tooltip never sees it; focus itself still lands on Upload. The button's focus event comes in the
    // same task as the window's own focus event, so stop listening a tick after the window's.
    this.onFocusAfterPicker = (event) => {
      if (event.target === window) {
        setTimeout(() => window.removeEventListener('focus', this.onFocusAfterPicker, true), 0);
        return;
      }
      if (event.composedPath().some(node => node.classList?.contains('upload-toolbar'))) {
        event.stopImmediatePropagation();
      }
    };
    this.onFileInputChange = () => {
      if (!this.fileInputRef?.files)
        return;
      const files = Array.from(this.fileInputRef.files);
      // Cleared so picking the same files again still fires a change
      this.fileInputRef.value = '';
      this.handleFiles(files);
    };
    this.hasDraggedFiles = (event) => this.controls.showUploadButton && !!event.dataTransfer?.types.includes('Files');
    this.onDragEnter = (event) => {
      if (!this.hasDraggedFiles(event))
        return;
      event.preventDefault();
      this.dragDepth++;
      this.isDropActive = true;
    };
    this.onDragOver = (event) => {
      if (!this.hasDraggedFiles(event))
        return;
      event.preventDefault();
      if (event.dataTransfer)
        event.dataTransfer.dropEffect = 'copy';
    };
    this.onDragLeave = (event) => {
      if (!this.hasDraggedFiles(event))
        return;
      this.dragDepth = Math.max(0, this.dragDepth - 1);
      if (this.dragDepth === 0)
        this.isDropActive = false;
    };
    this.onDrop = (event) => {
      if (!this.hasDraggedFiles(event))
        return;
      event.preventDefault();
      this.dragDepth = 0;
      this.isDropActive = false;
      this.handleFiles(Array.from(event.dataTransfer?.files ?? []));
    };
    this.zoomBy = (factor) => {
      if (!this.renderer?.hasModel)
        return;
      this.renderer.zoomBy(factor);
      this.updateZoom();
    };
    // The engine's mousedown handler prevents the browser from focusing the view, so focus it here
    this.onViewportPointerDown = () => {
      this.isPointerFocus = true;
      this.hasKeyboardFocus = false;
      this.viewportRef?.focus({ preventScroll: true });
      this.isPointerFocus = false;
    };
    this.onPointerInput = () => {
      this.isPointerInput = true;
    };
    this.onKeyboardInput = () => {
      this.isPointerInput = false;
    };
    // The ring follows how focus arrived: script focus from a pointer press would match :focus-visible too
    this.onViewportFocus = () => {
      this.hasKeyboardFocus = !this.isPointerFocus;
    };
    this.onViewportBlur = () => {
      this.hasKeyboardFocus = false;
    };
    this.onViewportKeyDown = (event) => {
      if (this.status !== 'loaded' || !this.renderer)
        return;
      const direction = ARROW_DIRECTIONS[event.key];
      if (direction) {
        if (event.shiftKey) {
          this.renderer.pan(direction[0] * PAN_STEP_RATIO, direction[1] * PAN_STEP_RATIO);
        }
        else {
          this.renderer.orbit(direction[0] * ORBIT_STEP_DEGREES, direction[1] * ORBIT_STEP_DEGREES);
        }
      }
      else if (event.key === '+' || event.key === '=' || event.code === 'NumpadAdd') {
        this.renderer.zoomBy(ZOOM_IN_FACTOR);
      }
      else if (event.key === '-' || event.code === 'NumpadSubtract') {
        this.renderer.zoomBy(ZOOM_OUT_FACTOR);
      }
      else if (event.key === 'Home') {
        this.renderer.reset();
      }
      else {
        return;
      }
      event.preventDefault();
      this.updateZoom();
    };
    this.onFullscreenChange = () => {
      const isFullscreen = document.fullscreenElement === this.host;
      if (isFullscreen === this.isFullscreen)
        return;
      this.isFullscreen = isFullscreen;
      if (!isFullscreen)
        window.scrollTo(this.savedScrollPosition.x, this.savedScrollPosition.y);
      this.wppFullscreenChange.emit({ isFullscreen });
    };
    this.hostCssClasses = () => ({
      'wpp-media-viewer': true,
      'wpp-full-screen': this.isFullscreen,
    });
    this.hostStyle = () => this.isFullscreen ? {} : { width: toCssLength(this.size.width), height: toCssLength(this.size.height) };
    this.status = 'empty';
    this.fileName = '';
    this.zoom = 100;
    this.isFullscreen = false;
    this.isDropActive = false;
    this.announcement = '';
    this.errorReason = undefined;
    this.errorFileNames = [];
    this.errorCode = undefined;
    this.hasKeyboardFocus = false;
    this.src = '';
    this.size = DEFAULT_SIZE;
    this.navigationMode = 'free';
    this.controlPanelConfig = {};
    this.acceptedFileExtensions = DEFAULT_ACCEPTED_FILE_EXTENSIONS;
    this.maxFileSize = undefined;
    this.locales = {};
    this.ariaProps = {};
  }
  /**
   * Fits the model into the view, keeping its orientation.
   */
  async fitToView() {
    if (!this.renderer?.hasModel)
      return;
    this.renderer.fit();
    this.updateZoom();
  }
  /**
   * Returns to the orientation the model opened with, fitted into the view.
   */
  async resetView() {
    if (!this.renderer?.hasModel)
      return;
    this.renderer.reset();
    this.updateZoom();
  }
  /**
   * Enters or leaves fullscreen. Does nothing without a model or where the browser doesn't allow fullscreen.
   * Browsers only grant it from a user gesture, so a call made outside one is refused and warns in the console.
   */
  async toggleFullscreen() {
    if (!this.isFullscreenSupported || this.status !== 'loaded')
      return;
    try {
      if (document.fullscreenElement === this.host) {
        await document.exitFullscreen();
      }
      else {
        this.savedScrollPosition = { x: window.scrollX, y: window.scrollY };
        await this.host.requestFullscreen();
      }
    }
    catch (error) {
      // The browser refused: the call came from somewhere other than a user gesture, or a permissions
      // policy blocks fullscreen. Nothing on screen changed, and only whoever made the call can fix it.
      console.warn('wpp-media-viewer: the browser refused to change fullscreen.', error);
    }
  }
  onSrcChange() {
    this.loadSource();
  }
  onNavigationModeChange(mode) {
    this.renderer?.setNavigationMode(mode);
  }
  connectedCallback() {
    this.themeSubscription.start();
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    // Moving the element in the DOM disconnects it, which destroys the renderer
    if (this.viewportRef && !this.renderer)
      this.setUpRenderer();
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    window.removeEventListener('focus', this.onFocusAfterPicker, true);
    this.resizeObserver?.disconnect();
    this.resizeObserver = undefined;
    this.renderer?.destroy();
    this.renderer = null;
  }
  componentWillLoad() {
    this.isFullscreenSupported = !!document.fullscreenEnabled;
    // The engine is a lazily loaded chunk, so there is a wait before loadSource() can start - measured
    // at 289ms on a dev server with a warm cache. A viewer given a source spent all of it painting the
    // empty state, toolbars and all, and only then flipped to the skeleton. It is loading from its
    // first paint instead; loadSource() comes to the same conclusion once the engine is there.
    if (this.sourceUrls.length)
      this.status = 'loading';
  }
  componentDidLoad() {
    this.setUpRenderer();
  }
  componentWillRender() {
    const active = this.host.shadowRoot?.activeElement;
    this.focusedToolbar = active?.classList.contains('toolbar') ? active : null;
  }
  // A state change (loading, an error, a lost context) can disable every action in the toolbar that has focus.
  // The toolbar can't keep focus then, so the browser would drop it on the page; move it to the 3D view instead.
  componentDidRender() {
    const toolbar = this.focusedToolbar;
    this.returnFocusToRetry();
    this.focusedToolbar = null;
    if (!toolbar)
      return;
    if (toolbar.isConnected && toolbar.actionButtonsConfig.some(action => !action.disabled))
      return;
    this.focusViewport();
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  get controls() {
    return { ...DEFAULT_CONTROL_PANEL_CONFIG, ...this.controlPanelConfig };
  }
  async setUpRenderer() {
    const engine = await import('./model-renderer-c02f9a7e.js').catch(() => null);
    // The element may have been removed, or set up again, while the engine chunk was loading
    if (!this.host.isConnected || this.renderer || !this.viewportRef)
      return;
    if (!engine) {
      this.status = 'empty';
      return;
    }
    const { ModelRenderer } = engine;
    const renderer = new ModelRenderer(this.viewportRef, {
      onZoomChange: this.updateZoom,
      onContextLost: () => this.showError('context-lost', []),
    });
    try {
      renderer.init();
    }
    catch (error) {
      this.showError('webgl-unavailable', [], error instanceof Error ? error.message : undefined);
      return;
    }
    this.renderer = renderer;
    this.renderer.setNavigationMode(this.navigationMode);
    this.applyBackgroundColor();
    this.resizeObserver = new ResizeObserver(this.onViewportResize);
    this.resizeObserver.observe(this.viewportRef);
    this.onViewportResize();
    this.loadSource();
  }
  // The engine draws its own background, so it takes the surface token's computed colour
  applyBackgroundColor() {
    if (!this.renderer || !this.viewportRef)
      return;
    const channels = getComputedStyle(this.viewportRef).backgroundColor?.match(/\d+(\.\d+)?/g);
    if (channels && channels.length >= 3) {
      this.renderer.setBackgroundColor([Number(channels[0]), Number(channels[1]), Number(channels[2])]);
    }
  }
  get sourceUrls() {
    return (Array.isArray(this.src) ? this.src : [this.src]).filter(Boolean);
  }
  loadSource() {
    if (!this.renderer)
      return;
    const urls = this.sourceUrls;
    if (!urls.length) {
      this.renderer.clear();
      this.status = 'empty';
      this.fileName = '';
      this.announcement = '';
      return;
    }
    this.loadModel(urls, urls.map(fileNameFromUrl));
  }
  loadModel(source, fileNames) {
    if (!this.renderer)
      return;
    this.lastLoad = { source, fileNames };
    this.status = 'loading';
    this.errorReason = undefined;
    this.announcement = this._locales.loadingAnnouncement;
    this.renderer.load(source, {
      onSuccess: result => {
        const loadedNames = [result.mainFile, ...result.usedFiles.filter(name => name !== result.mainFile)];
        this.status = 'loaded';
        this.fileName = result.mainFile;
        this.updateZoom();
        this.announcement = fillTemplate(this._locales.loadedAnnouncement, { fileName: result.mainFile });
        this.wppLoad.emit({
          fileNames: loadedNames,
          meshCount: result.model.MeshCount(),
          triangleCount: result.model.TriangleCount(),
        });
      },
      onError: (reason, message, code) => this.showError(reason, fileNames, message, code),
    });
  }
  // Announces the failure and hands it to the app. Rejected files stop here with the model still on screen,
  // so the app is the only one who can say anything about them; it gets the wording ready made rather than
  // having to map every reason to a sentence. A screen reader shouldn't depend on the app having bothered,
  // so the live region speaks the same words the event carries.
  emitError(reason, fileNames, details, code) {
    const message = fillTemplate(this._locales[ERROR_LOCALE_KEYS[reason]], {
      fileNames: fileNames.join(', '),
      maxFileSize: this.maxFileSize ?? '',
    });
    this.announcement = message;
    this.wppError.emit({ reason, fileNames, message, details, code });
  }
  // For a load that failed: whatever was on screen is gone, so go back to the empty view. Files turned
  // away before any loading starts use emitError instead and leave the current model where it is.
  showError(reason, fileNames, details, code) {
    this.renderer?.clear();
    this.status = 'error';
    this.fileName = '';
    this.errorReason = reason;
    this.errorFileNames = fileNames;
    this.errorCode = code;
    this.emitError(reason, fileNames, details, code);
  }
  // Nothing to retry when no load was ever asked for, or when the 3D context itself is gone
  get canRetry() {
    return !!this.lastLoad && this.errorReason !== 'webgl-unavailable' && this.errorReason !== 'context-lost';
  }
  errorText() {
    if (!this.errorReason)
      return '';
    const message = fillTemplate(this._locales[ERROR_LOCALE_KEYS[this.errorReason]], {
      fileNames: this.errorFileNames.join(', '),
      maxFileSize: this.maxFileSize ?? '',
    });
    return this.errorCode === undefined
      ? message
      : fillTemplate(this._locales.errorWithCodeText, { message, code: this.errorCode });
  }
  // Once a retried load from the keyboard has failed again, focus the new Retry button, if focus is still on the
  // view where Retry put it. A pointer user stays on the view: wpp-button's setFocus always draws the keyboard ring.
  returnFocusToRetry() {
    if (!this.isRetryPending || this.status === 'loading')
      return;
    this.isRetryPending = false;
    const isFocusOnView = this.host.shadowRoot?.activeElement === this.viewportRef;
    if (this.status !== 'error' || this.isPointerInput || !isFocusOnView)
      return;
    this.retryButtonRef?.setFocus();
  }
  // Focuses the 3D view, with the keyboard ring only when the last interaction wasn't a pointer press
  focusViewport() {
    this.isPointerFocus = this.isPointerInput;
    this.viewportRef?.focus({ preventScroll: true });
    this.isPointerFocus = false;
  }
  handleFiles(files) {
    if (!files.length)
      return;
    const accepted = this.acceptedFileExtensions.map(extension => extension.toLowerCase());
    const unsupported = files.filter(file => !accepted.includes(fileExtension(file.name)));
    if (unsupported.length) {
      this.emitError('unsupported-file', unsupported.map(file => file.name));
      return;
    }
    const maxBytes = this.maxFileSize === undefined ? Infinity : this.maxFileSize * 1024 * 1024;
    const tooLarge = files.filter(file => file.size > maxBytes);
    if (tooLarge.length) {
      this.emitError('file-too-large', tooLarge.map(file => file.name));
      return;
    }
    const event = this.wppUpload.emit({ files });
    if (event.defaultPrevented)
      return;
    this.loadModel(files, files.map(file => file.name));
  }
  viewportLabel() {
    if (this.status === 'loaded')
      return fillTemplate(this._locales.viewportLabel, { fileName: this.fileName });
    return this._locales.viewportEmptyLabel;
  }
  zoomActions(isLoaded) {
    const zoomText = fillTemplate(this._locales.zoomLevelText, { value: this.zoom });
    return [
      {
        id: 'zoom-out',
        icon: 'wpp-icon-remove',
        disabled: !isLoaded || this.zoom <= MIN_ZOOM,
        tooltip: this._locales.zoomOutButtonLabel,
        ariaProps: { label: this._locales.zoomOutButtonLabel },
        onClick: () => this.zoomBy(ZOOM_OUT_FACTOR),
      },
      {
        id: 'zoom-level',
        label: zoomText,
        disabled: !isLoaded,
        tooltip: fillTemplate(this._locales.zoomResetButtonLabel, { value: this.zoom }),
        ariaProps: { label: fillTemplate(this._locales.zoomResetButtonLabel, { value: this.zoom }) },
        onClick: () => this.resetView(),
      },
      {
        id: 'zoom-in',
        icon: 'wpp-icon-add',
        disabled: !isLoaded || this.zoom >= MAX_ZOOM,
        tooltip: this._locales.zoomInButtonLabel,
        ariaProps: { label: this._locales.zoomInButtonLabel },
        onClick: () => this.zoomBy(ZOOM_IN_FACTOR),
      },
    ];
  }
  renderOverlay() {
    // The design marks a drag with an outline round the whole viewer and nothing else, so the model
    // underneath stays visible while the file is over it
    if (this.isDropActive) {
      return h("div", { key: "drop-overlay", class: "drop-overlay" });
    }
    if (this.status === 'loading') {
      return (h("wpp-skeleton-v4-6-0", { key: "loading-skeleton", class: "loading-skeleton", variant: "rectangle", width: "100%", height: "100%" }));
    }
    if (this.status === 'error') {
      return (h("div", { key: "error-state", class: "overlay error-state", part: "error-state" }, h("div", { class: "error-text" }, h("wpp-typography-v4-6-0", { class: "error-line", type: "s-strong", tag: "p" }, this._locales.errorTitle), h("wpp-typography-v4-6-0", { class: "error-line", type: "s-body", tag: "p", color: "var(--wpp-grey-color-900)" }, this.errorText())), this.canRetry && (h("wpp-button-v4-6-0", { ref: el => (this.retryButtonRef = el), variant: "secondary", size: "s", onClick: this.onRetryClick }, h("wpp-icon-refresh-v4-6-0", { slot: "icon-start" }), this._locales.retryButtonLabel))));
    }
    return null;
  }
  renderControls(isLoaded) {
    const { showUploadButton, showZoomControls, showFullscreenButton } = this.controls;
    const showFullscreen = showFullscreenButton && this.isFullscreenSupported;
    // Loading owns the whole surface in the design, so every bar steps aside. The error state keeps
    // upload: it is the only way back to a working model, and without it a bad file is a dead end.
    const isErrorState = this.status === 'error';
    if (this.status === 'loading')
      return null;
    if (!showUploadButton && (isErrorState || (!showZoomControls && !showFullscreen)))
      return null;
    const fullscreenLabel = this.isFullscreen
      ? this._locales.exitFullscreenButtonLabel
      : this._locales.enterFullscreenButtonLabel;
    return (h("div", { key: "controls", class: "controls", part: "controls" }, showUploadButton && (h("wpp-floating-toolbar-v4-6-0", { class: "toolbar upload-toolbar", ariaProps: { label: this._locales.uploadToolbarLabel }, actionButtonsConfig: [
        {
          id: 'upload',
          icon: 'wpp-icon-upload',
          tooltip: this._locales.uploadButtonLabel,
          ariaProps: { label: this._locales.uploadButtonLabel },
          onClick: this.onUploadClick,
        },
      ] })), !isErrorState && (h("div", { class: "view-options" }, showZoomControls && (h("wpp-floating-toolbar-v4-6-0", { class: "toolbar zoom-toolbar", ariaProps: { label: this._locales.zoomToolbarLabel }, actionButtonsConfig: this.zoomActions(isLoaded) })), showFullscreen && (h("wpp-floating-toolbar-v4-6-0", { class: "toolbar", ariaProps: { label: this._locales.fullscreenToolbarLabel }, actionButtonsConfig: [
        {
          id: 'fullscreen',
          icon: this.isFullscreen ? 'wpp-icon-fullscreen-minimise' : 'wpp-icon-fullscreen',
          disabled: !isLoaded,
          tooltip: fullscreenLabel,
          ariaProps: { label: fullscreenLabel },
          onClick: () => this.toggleFullscreen(),
        },
      ] }))))));
  }
  render() {
    const isLoaded = this.status === 'loaded';
    return (h(Host, { class: this.hostCssClasses(), style: this.hostStyle() }, h("div", { class: "media-viewer", onPointerDown: this.onPointerInput, onKeyDown: this.onKeyboardInput, onDragEnter: this.onDragEnter, onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop }, h("div", { key: "viewport", ref: el => (this.viewportRef = el), class: { viewport: true, 'tab-focus': this.hasKeyboardFocus }, part: "viewport", role: "application", tabindex: "0", "aria-label": this.viewportLabel(), "aria-describedby": "keyboard-instructions", "aria-busy": this.status === 'loading' ? 'true' : undefined, ...getAriaProps(this.ariaProps), onKeyDown: this.onViewportKeyDown, onPointerDown: this.onViewportPointerDown, onFocus: this.onViewportFocus, onBlur: this.onViewportBlur }), this.renderOverlay(), this.renderControls(isLoaded), h("span", { key: "instructions", id: "keyboard-instructions", class: "visually-hidden" }, this._locales.keyboardInstructions), h("div", { key: "live-region", class: "visually-hidden", "aria-live": "polite" }, this.announcement), this.controls.showUploadButton && (h("input", { key: "file-input", ref: el => (this.fileInputRef = el), class: "file-input", type: "file", multiple: true, hidden: true, accept: this.acceptedFileExtensions.map(extension => `.${extension}`).join(','), onChange: this.onFileInputChange })))));
  }
  static get registryIs() { return "wpp-media-viewer-v4-6-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "src": ["onSrcChange"],
    "navigationMode": ["onNavigationModeChange"]
  }; }
};
WppMediaViewer.style = wppMediaViewerCss;

export { DECODER_ERROR_MESSAGES as D, MAX_ZOOM as M, POOL_IDLE_TIMEOUT as P, WppMediaViewer as W, MIN_ZOOM as a, MAX_POOLED_CANVASES as b };
