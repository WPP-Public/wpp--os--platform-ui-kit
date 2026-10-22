import { CoordDistance3D, CrossVector3D, Direction, DisposeThreeObjects, HasHighpDriverIssue, ImportErrorCode, ImportSettings, InputFilesFromFileObjects, InputFilesFromUrls, NavigationMode, RGBAColor, SubCoord3D, ThreeModelLoader, VectorAngle3D, Viewer, } from 'online-3d-viewer';
import { DECODER_ERROR_MESSAGES, MAX_POOLED_CANVASES, MAX_ZOOM, MIN_ZOOM, POOL_IDLE_TIMEOUT } from './const';
const DEG_TO_RAD = Math.PI / 180;
// The canvas's own context. The three.js the engine bundles only makes WebGL 2 contexts, so a canvas without one
// returns null here, rather than getting a new WebGL 1 context.
const contextOf = (canvas) => canvas.getContext('webgl2');
// WebKit: Safari, and every browser on iOS and iPadOS. Chromium browsers name AppleWebKit too, for historical reasons,
// but also Chrome, which WebKit browsers don't.
const keepsReleasedContexts = () => {
  const { userAgent } = navigator;
  return /AppleWebKit/.test(userAgent) && !/Chrome\/|Chromium\//.test(userAgent);
};
const errorReasonFromImport = (importError) => {
  switch (importError.code) {
    case ImportErrorCode.NoImportableFile:
      return 'no-importable-file';
    case ImportErrorCode.FailedToLoadFile:
      return 'failed-to-load';
    default:
      return DECODER_ERROR_MESSAGES.includes(importError.message ?? '') ? 'decoder-failed' : 'import-failed';
  }
};
/**
 * Drives the Online 3D Viewer engine for wpp-media-viewer: one canvas and one engine Viewer per
 * component, a fresh model loader per load, and a full teardown. Kept apart from the component so the
 * toolbar and states don't depend on the renderer.
 */
export class ModelRenderer {
  constructor(container, callbacks) {
    this.container = container;
    this.callbacks = callbacks;
    this.viewer = new Viewer();
    this.canvas = ModelRenderer.takeCanvas();
    this.loader = null;
    this.generation = 0;
    this.boundingSphere = null;
    this.initialCamera = null;
    this.navigationMode = 'free';
    this.width = 0;
    this.height = 0;
    this.pixelRatioQuery = null;
    this.destroyed = false;
    // Wheel, Ctrl+drag and pinch zoom through the engine without bounds; pull the camera back inside them
    this.onNavigation = () => {
      if (!this.hasModel)
        return;
      const zoom = this.getZoom();
      if (zoom > MAX_ZOOM || zoom < MIN_ZOOM) {
        const camera = this.viewer.GetCamera().Clone();
        this.setDistance(camera, CoordDistance3D(camera.eye, camera.center));
      }
      this.callbacks.onZoomChange();
    };
    this.onContextLost = () => {
      if (!this.destroyed)
        this.callbacks.onContextLost();
    };
    this.onPixelRatioChange = () => {
      if (this.width > 0)
        this.viewer.Resize(this.width, this.height);
      this.watchPixelRatio();
    };
  }
  // A new viewer's canvas: a kept one whose context still works, else a new one. The engine would run its GPU check at
  // the first load, on a context of its own, when the page already holds a context per viewer: one too many on a page
  // at the limit. So it runs here first, on a canvas released like a removed viewer's, which in WebKit this first
  // viewer then takes over.
  static takeCanvas() {
    if (!ModelRenderer.isGpuChecked) {
      const canvas = document.createElement('canvas');
      ModelRenderer.isGpuChecked = true;
      // The result is cached by the engine (patched), so every loader reuses it. Given a canvas, the check (patched)
      // leaves its context alive.
      HasHighpDriverIssue(canvas);
      ModelRenderer.releaseCanvas(canvas);
    }
    // A kept canvas whose context the browser lost since (e.g. a GPU reset) is dropped
    for (let canvas = ModelRenderer.canvasPool.pop(); canvas; canvas = ModelRenderer.canvasPool.pop()) {
      if (!contextOf(canvas)?.isContextLost())
        return canvas;
    }
    return document.createElement('canvas');
  }
  // Each canvas kept starts the wait again, so the pool empties only once no viewer has been removed for a while
  static keepCanvas(canvas) {
    // A 1 × 1 drawing buffer, so a kept canvas holds next to no GPU memory
    canvas.width = 1;
    canvas.height = 1;
    ModelRenderer.canvasPool.push(canvas);
    clearTimeout(ModelRenderer.poolTimer);
    ModelRenderer.poolTimer = setTimeout(ModelRenderer.emptyPool, POOL_IDLE_TIMEOUT);
  }
  static emptyPool() {
    ModelRenderer.canvasPool.splice(0).forEach(canvas => {
      contextOf(canvas)?.getExtension('WEBGL_lose_context')?.loseContext();
    });
  }
  // Browsers allow about 16 live WebGL contexts per page. Chromium and Firefox free a released one at once, but WebKit
  // counts it until it's garbage-collected, which can take seconds: a viewer replacing another there would push a
  // page near the limit over it, and lose the oldest viewer. So in WebKit the canvas is kept, with its context, for
  // the next viewer, and the page never holds more contexts than it shows viewers at once.
  static releaseCanvas(canvas) {
    const context = contextOf(canvas);
    if (keepsReleasedContexts() &&
      context &&
      !context.isContextLost() &&
      ModelRenderer.canvasPool.length < MAX_POOLED_CANVASES) {
      ModelRenderer.keepCanvas(canvas);
      return;
    }
    context?.getExtension('WEBGL_lose_context')?.loseContext();
  }
  /** Throws when the browser can't create a WebGL context. */
  init() {
    this.container.appendChild(this.canvas);
    try {
      this.viewer.Init(this.canvas);
      // A kept canvas's context still has the WebGL state the viewer before it left
      this.viewer.renderer.resetState();
    }
    catch (error) {
      this.canvas.remove();
      throw error;
    }
    // Every camera move the component starts is instant, so nothing animates under reduced motion either
    this.viewer.settings.animationSteps = 0;
    // Registered after Init, so they run after the engine's own handlers on the same targets
    this.canvas.addEventListener('wheel', this.onNavigation);
    this.canvas.addEventListener('touchmove', this.onNavigation);
    document.addEventListener('mousemove', this.onNavigation);
    this.canvas.addEventListener('webglcontextlost', this.onContextLost);
    this.watchPixelRatio();
  }
  get hasModel() {
    return this.boundingSphere !== null;
  }
  setBackgroundColor(rgb) {
    this.viewer.SetBackgroundColor(new RGBAColor(rgb[0], rgb[1], rgb[2], 255));
  }
  setNavigationMode(mode) {
    this.navigationMode = mode;
    this.viewer.SetNavigationMode(mode === 'free' ? NavigationMode.FreeOrbit : NavigationMode.FixedUpVector);
  }
  resize(width, height) {
    this.width = width;
    this.height = height;
    this.viewer.Resize(width, height);
  }
  /**
   * Loads a model from URLs or File objects. A newer load, clear() or destroy() discards this one's
   * result. Each load gets its own loader, so it never merges with files from an earlier load.
   */
  load(source, handlers) {
    const generation = ++this.generation;
    const loader = new ThreeModelLoader();
    const inputFiles = typeof source[0] === 'string'
      ? InputFilesFromUrls(source)
      : InputFilesFromFileObjects(source);
    const isCurrent = () => !this.destroyed && generation === this.generation;
    this.clearModel();
    loader.LoadModel(inputFiles, new ImportSettings(), {
      onLoadStart: () => undefined,
      onFileListProgress: () => undefined,
      onFileLoadProgress: () => undefined,
      onImportStart: () => undefined,
      onVisualizationStart: () => undefined,
      onModelFinished: (importResult, threeObject) => {
        if (!isCurrent()) {
          DisposeThreeObjects(threeObject);
          loader.RevokeObjectUrls();
          return;
        }
        this.loader?.RevokeObjectUrls();
        this.loader = loader;
        this.showModel(threeObject);
        handlers.onSuccess(importResult);
      },
      onTextureLoaded: () => {
        if (isCurrent())
          this.viewer.Render();
      },
      onLoadError: importError => {
        if (!isCurrent()) {
          loader.RevokeObjectUrls();
          return;
        }
        handlers.onError(errorReasonFromImport(importError), importError.message ?? undefined, importError.code);
      },
    });
  }
  /** Removes the model and discards any load in progress. */
  clear() {
    this.generation++;
    this.clearModel();
  }
  /** Zoom level in percent of the fitted view, or 100 without a model. */
  getZoom() {
    const fitDistance = this.getFitDistance();
    if (fitDistance === null)
      return 100;
    const camera = this.viewer.GetCamera();
    return (fitDistance / CoordDistance3D(camera.eye, camera.center)) * 100;
  }
  /** Multiplies the camera distance by factor, within the zoom bounds. */
  zoomBy(factor) {
    const camera = this.viewer.GetCamera().Clone();
    this.setDistance(camera, CoordDistance3D(camera.eye, camera.center) * factor);
  }
  /** Fits the model into the view, keeping the current orientation. */
  fit() {
    if (!this.boundingSphere)
      return;
    this.viewer.FitSphereToWindow(this.boundingSphere, false);
  }
  /** Returns to the orientation the model opened with, fitted to the view. */
  reset() {
    if (!this.initialCamera)
      return;
    this.viewer.SetCamera(this.initialCamera.Clone());
    this.fit();
  }
  /** Rotates the camera around the model, like a pointer drag of the same angle. */
  orbit(angleXDeg, angleYDeg) {
    if (!this.hasModel)
      return;
    const camera = this.viewer.GetCamera().Clone();
    const angleX = angleXDeg * DEG_TO_RAD;
    const angleY = angleYDeg * DEG_TO_RAD;
    const viewDirection = SubCoord3D(camera.center, camera.eye).Normalize();
    const horizontalDirection = CrossVector3D(viewDirection, camera.up).Normalize();
    if (this.navigationMode === 'fixed-up') {
      const newAngle = VectorAngle3D(viewDirection, camera.up) + angleY;
      // Same limit as the engine: never rotate over the poles
      if (newAngle > 0 && newAngle < Math.PI)
        camera.eye.Rotate(horizontalDirection, -angleY, camera.center);
      camera.eye.Rotate(camera.up, -angleX, camera.center);
    }
    else {
      const verticalDirection = CrossVector3D(horizontalDirection, viewDirection).Normalize();
      camera.eye.Rotate(horizontalDirection, -angleY, camera.center);
      camera.eye.Rotate(verticalDirection, -angleX, camera.center);
      camera.up = verticalDirection;
    }
    this.viewer.SetCamera(camera);
  }
  /** Moves the view sideways or up and down, by a share of the camera distance. */
  pan(ratioX, ratioY) {
    if (!this.hasModel)
      return;
    const camera = this.viewer.GetCamera().Clone();
    const distance = CoordDistance3D(camera.eye, camera.center);
    const viewDirection = SubCoord3D(camera.center, camera.eye).Normalize();
    const horizontalDirection = CrossVector3D(viewDirection, camera.up).Normalize();
    const verticalDirection = CrossVector3D(horizontalDirection, viewDirection).Normalize();
    camera.eye.Offset(horizontalDirection, -ratioX * distance);
    camera.center.Offset(horizontalDirection, -ratioX * distance);
    camera.eye.Offset(verticalDirection, ratioY * distance);
    camera.center.Offset(verticalDirection, ratioY * distance);
    this.viewer.SetCamera(camera);
  }
  destroy() {
    if (this.destroyed)
      return;
    this.destroyed = true;
    this.generation++;
    this.canvas.removeEventListener('wheel', this.onNavigation);
    this.canvas.removeEventListener('touchmove', this.onNavigation);
    document.removeEventListener('mousemove', this.onNavigation);
    this.canvas.removeEventListener('webglcontextlost', this.onContextLost);
    this.pixelRatioQuery?.removeEventListener('change', this.onPixelRatioChange);
    this.pixelRatioQuery = null;
    this.loader?.RevokeObjectUrls();
    this.loader = null;
    // Destroy disposes the renderer and (patched) removes the engine's document listeners, but dispose() keeps the
    // WebGL context alive: it's kept or released below
    this.viewer.Destroy();
    this.canvas.remove();
    ModelRenderer.releaseCanvas(this.canvas);
  }
  showModel(threeObject) {
    this.viewer.SetMainObject(threeObject);
    this.boundingSphere = this.viewer.GetBoundingSphere(() => true);
    if (this.boundingSphere)
      this.viewer.AdjustClippingPlanesToSphere(this.boundingSphere);
    this.viewer.SetUpVector(Direction.Y, false);
    this.fit();
    this.initialCamera = this.viewer.GetCamera().Clone();
  }
  clearModel() {
    this.viewer.Clear();
    this.loader?.RevokeObjectUrls();
    this.loader = null;
    this.boundingSphere = null;
    this.initialCamera = null;
  }
  // Same formula the engine uses to fit a sphere: depends on the field of view and the canvas aspect
  getFitDistance() {
    if (!this.boundingSphere)
      return null;
    let halfFov = this.viewer.GetCamera().fov / 2;
    if (this.width > 0 && this.width < this.height)
      halfFov = (halfFov * this.width) / this.height;
    return this.boundingSphere.radius / Math.sin(halfFov * DEG_TO_RAD);
  }
  setDistance(camera, distance) {
    const fitDistance = this.getFitDistance();
    if (fitDistance === null)
      return;
    const clamped = Math.min((fitDistance * 100) / MIN_ZOOM, Math.max((fitDistance * 100) / MAX_ZOOM, distance));
    const direction = SubCoord3D(camera.eye, camera.center).Normalize();
    camera.eye = camera.center.Clone().Offset(direction, clamped);
    this.viewer.SetCamera(camera);
  }
  // A devicePixelRatio change with no size change (browser zoom, moving to another screen) needs a resize too
  watchPixelRatio() {
    this.pixelRatioQuery?.removeEventListener('change', this.onPixelRatioChange);
    this.pixelRatioQuery = window.matchMedia?.(`(resolution: ${window.devicePixelRatio}dppx)`) ?? null;
    this.pixelRatioQuery?.addEventListener('change', this.onPixelRatioChange);
  }
}
// Whether the engine's GPU check has run; see takeCanvas
ModelRenderer.isGpuChecked = false;
// WebKit only: canvases whose WebGL context outlived their viewer, kept for the next one; see releaseCanvas
ModelRenderer.canvasPool = [];
