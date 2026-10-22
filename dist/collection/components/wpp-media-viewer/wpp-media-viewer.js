import { h, Host } from '@stencil/core';
import { getAriaProps, mergeLocales } from '../../utils/utils';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
import { ARROW_DIRECTIONS, DEFAULT_ACCEPTED_FILE_EXTENSIONS, DEFAULT_CONTROL_PANEL_CONFIG, DEFAULT_SIZE, LOCALES_DEFAULTS, MAX_ZOOM, MIN_ZOOM, ORBIT_STEP_DEGREES, PAN_STEP_RATIO, ZOOM_IN_FACTOR, ZOOM_OUT_FACTOR, } from './const';
import { ERROR_LOCALE_KEYS, fileExtension, fileNameFromUrl, fillTemplate, toCssLength } from './utils';
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
export class WppMediaViewer {
  constructor() {
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
    const engine = await import('./model-renderer').catch(() => null);
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
  static get is() { return "wpp-media-viewer"; }
  static get registryIs() { return "wpp-media-viewer-v4-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-media-viewer.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-media-viewer.css"]
    };
  }
  static get properties() {
    return {
      "src": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string | string[]",
          "resolved": "string | string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "URL of the model to show, or a list of URLs when the model is split over several files (for example a\n`.gltf` with its `.bin` and textures, or an `.obj` with its `.mtl`). An empty value shows the empty state."
        },
        "attribute": "src",
        "reflect": false,
        "defaultValue": "''"
      },
      "size": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MediaViewerSize",
          "resolved": "{ width: number | `${number}%`; height: number | `${number}%`; }",
          "references": {
            "MediaViewerSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Size of the viewer. Numbers are pixels; strings are percentages. Defaults to 400 \u00D7 400 pixels, which is\nalso the minimum."
        },
        "defaultValue": "DEFAULT_SIZE"
      },
      "navigationMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "MediaViewerNavigationMode",
          "resolved": "\"fixed-up\" | \"free\"",
          "references": {
            "MediaViewerNavigationMode": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerNavigationMode"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "How dragging rotates the model. `free` turns it on all three axes; `fixed-up` keeps its up axis vertical."
        },
        "attribute": "navigation-mode",
        "reflect": false,
        "defaultValue": "'free'"
      },
      "controlPanelConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "MediaViewerControlPanelConfig",
          "resolved": "MediaViewerControlPanelConfig",
          "references": {
            "MediaViewerControlPanelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerControlPanelConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Which toolbars to show. Hiding the upload button also turns off dropping files on the viewer.\nZoom and fullscreen act on the model, so they are disabled until one is on screen. The toolbars\nthemselves are hidden while loading and on the error state, which own the whole surface."
        },
        "defaultValue": "{}"
      },
      "acceptedFileExtensions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "string[]",
          "resolved": "string[]",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "File extensions, without the dot, that can be uploaded or dropped. Other files are rejected with an\nerror. The default list covers the 3D formats that open without downloading anything, plus the files they\nreference. SVG is left out because the 2D image viewer will handle it."
        },
        "defaultValue": "DEFAULT_ACCEPTED_FILE_EXTENSIONS"
      },
      "maxFileSize": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Largest file, in MB, that can be uploaded or dropped. No limit by default."
        },
        "attribute": "max-file-size",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<MediaViewerLocales>",
          "resolved": "{ viewportLabel?: string | undefined; viewportEmptyLabel?: string | undefined; keyboardInstructions?: string | undefined; uploadToolbarLabel?: string | undefined; uploadButtonLabel?: string | undefined; zoomToolbarLabel?: string | undefined; zoomOutButtonLabel?: string | undefined; zoomInButtonLabel?: string | undefined; zoomLevelText?: string | undefined; zoomResetButtonLabel?: string | undefined; fullscreenToolbarLabel?: string | undefined; enterFullscreenButtonLabel?: string | undefined; exitFullscreenButtonLabel?: string | undefined; loadingAnnouncement?: string | undefined; loadedAnnouncement?: string | undefined; errorTitle?: string | undefined; errorWithCodeText?: string | undefined; retryButtonLabel?: string | undefined; noImportableFileError?: string | undefined; failedToLoadError?: string | undefined; importFailedError?: string | undefined; decoderFailedError?: string | undefined; unsupportedFileError?: string | undefined; fileTooLargeError?: string | undefined; webglUnavailableError?: string | undefined; contextLostError?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "MediaViewerLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Overrides for the viewer's text and accessible names."
        },
        "defaultValue": "{}"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "`aria-` attributes for the 3D view. `label` replaces the accessible name built from `locales`."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "status": {},
      "fileName": {},
      "zoom": {},
      "isFullscreen": {},
      "isDropActive": {},
      "announcement": {},
      "errorReason": {},
      "errorFileNames": {},
      "errorCode": {},
      "hasKeyboardFocus": {}
    };
  }
  static get events() {
    return [{
        "method": "wppLoad",
        "name": "wppLoad",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Fires when a model has loaded and is shown."
        },
        "complexType": {
          "original": "MediaViewerLoadEventDetail",
          "resolved": "MediaViewerLoadEventDetail",
          "references": {
            "MediaViewerLoadEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerLoadEventDetail"
            }
          }
        }
      }, {
        "method": "wppError",
        "name": "wppError",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Fires when a model can't be shown, or uploaded files are rejected. A failed load shows the error state,\nbut files turned away before loading starts leave the model on screen, so handle those - otherwise a\nrejected upload looks to a sighted user like nothing happened. `detail.message` is the error in words,\nand the same words go to the viewer's live region for screen readers."
        },
        "complexType": {
          "original": "MediaViewerErrorEventDetail",
          "resolved": "MediaViewerErrorEventDetail",
          "references": {
            "MediaViewerErrorEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerErrorEventDetail"
            }
          }
        }
      }, {
        "method": "wppZoomChange",
        "name": "wppZoomChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Fires when the zoom level changes, however it changed: the zoom actions, the wheel, a pinch, a\nkeyboard press, `fitToView()` or `resetView()`."
        },
        "complexType": {
          "original": "MediaViewerZoomChangeEventDetail",
          "resolved": "MediaViewerZoomChangeEventDetail",
          "references": {
            "MediaViewerZoomChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerZoomChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFullscreenChange",
        "name": "wppFullscreenChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Fires when the viewer enters or leaves fullscreen."
        },
        "complexType": {
          "original": "MediaViewerFullscreenChangeEventDetail",
          "resolved": "MediaViewerFullscreenChangeEventDetail",
          "references": {
            "MediaViewerFullscreenChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerFullscreenChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppUpload",
        "name": "wppUpload",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Fires when the user picks or drops files that pass validation, before they open. Call\n`preventDefault()` on the event to keep the current model, for example to store the files and then set `src`."
        },
        "complexType": {
          "original": "MediaViewerUploadEventDetail",
          "resolved": "MediaViewerUploadEventDetail",
          "references": {
            "MediaViewerUploadEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-media-viewer/types.ts::MediaViewerUploadEventDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "fitToView": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Fits the model into the view, keeping its orientation.",
          "tags": []
        }
      },
      "resetView": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Returns to the orientation the model opened with, fitted into the view.",
          "tags": []
        }
      },
      "toggleFullscreen": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Enters or leaves fullscreen. Does nothing without a model or where the browser doesn't allow fullscreen.\nBrowsers only grant it from a user gesture, so a call made outside one is refused and warns in the console.",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "src",
        "methodName": "onSrcChange"
      }, {
        "propName": "navigationMode",
        "methodName": "onNavigationModeChange"
      }];
  }
}
