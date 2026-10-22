import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppMediaViewer } from '../wpp-media-viewer';
import { LOCALES_DEFAULTS, MAX_POOLED_CANVASES, POOL_IDLE_TIMEOUT } from '../const';
import { ResizeObserverMock } from '../../../common/test/mocks';
// The real engine is an ESM bundle of three.js that needs WebGL; the spec drives a small stand-in that
// keeps the same public surface the component uses.
const mockEngine = {
  pendingLoads: [],
  webglUnavailable: false,
  navigationModes: [],
  destroyed: 0,
  contextsLost: 0,
  resizes: 0,
  gpuChecks: 0,
  checkedCanvas: undefined,
};
jest.mock('online-3d-viewer', () => {
  class Coord3D {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
    }
    Clone() {
      return new Coord3D(this.x, this.y, this.z);
    }
    Length() {
      return Math.hypot(this.x, this.y, this.z);
    }
    Normalize() {
      const length = this.Length() || 1;
      this.x /= length;
      this.y /= length;
      this.z /= length;
      return this;
    }
    Offset(direction, distance) {
      const normal = direction.Clone().Normalize();
      this.x += normal.x * distance;
      this.y += normal.y * distance;
      this.z += normal.z * distance;
      return this;
    }
    Rotate() {
      return this;
    }
  }
  class Camera {
    constructor(eye, center, up, fov) {
      this.eye = eye;
      this.center = center;
      this.up = up;
      this.fov = fov;
    }
    Clone() {
      return new Camera(this.eye.Clone(), this.center.Clone(), this.up.Clone(), this.fov);
    }
  }
  const fitDistance = 1 / Math.sin((22.5 * Math.PI) / 180);
  class Viewer {
    constructor() {
      this.settings = { animationSteps: 40 };
      this.renderer = { resetState: jest.fn() };
      this.camera = new Camera(new Coord3D(0, 0, 10), new Coord3D(0, 0, 0), new Coord3D(0, 1, 0), 45);
      this.canvas = null;
    }
    Init(canvas) {
      if (mockEngine.webglUnavailable)
        throw new Error('Error creating WebGL context.');
      this.canvas = canvas;
    }
    Resize() {
      mockEngine.resizes++;
    }
    SetBackgroundColor() { }
    SetNavigationMode(mode) {
      mockEngine.navigationModes.push(mode);
    }
    SetUpVector() { }
    GetCamera() {
      return this.camera;
    }
    SetCamera(camera) {
      this.camera = camera;
    }
    GetCanvas() {
      return this.canvas;
    }
    SetMainObject() { }
    GetBoundingSphere() {
      return { center: { x: 0, y: 0, z: 0 }, radius: 1 };
    }
    AdjustClippingPlanesToSphere() { }
    FitSphereToWindow() {
      this.camera.eye = new Coord3D(0, 0, fitDistance);
    }
    Clear() { }
    Render() { }
    Destroy() {
      mockEngine.destroyed++;
    }
  }
  class ThreeModelLoader {
    LoadModel(inputFiles, _settings, callbacks) {
      mockEngine.pendingLoads.push({ inputFiles, callbacks });
    }
    RevokeObjectUrls() { }
  }
  const sub = (a, b) => new Coord3D(a.x - b.x, a.y - b.y, a.z - b.z);
  return {
    Coord3D,
    Camera,
    Viewer,
    ThreeModelLoader,
    ImportSettings: class {
    },
    RGBAColor: class {
    },
    NavigationMode: { FixedUpVector: 1, FreeOrbit: 2 },
    Direction: { X: 1, Y: 2, Z: 3 },
    ImportErrorCode: { NoImportableFile: 1, FailedToLoadFile: 2, ImportFailed: 3, UnknownError: 4 },
    InputFilesFromUrls: (urls) => urls,
    InputFilesFromFileObjects: (files) => files,
    DisposeThreeObjects: () => undefined,
    SubCoord3D: sub,
    CrossVector3D: (a, b) => new Coord3D(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x),
    VectorAngle3D: () => Math.PI / 2,
    CoordDistance3D: (a, b) => sub(a, b).Length(),
    HasHighpDriverIssue: (canvas) => {
      mockEngine.gpuChecks++;
      mockEngine.checkedCanvas = canvas;
      return false;
    },
  };
});
// The mock DOM has no File; the component only reads name and size
class FileStub {
  constructor(parts, name) {
    this.name = name;
    this.size = parts.join('').length;
  }
}
// The mock DOM's canvas has no WebGL; teardown releases the context through WEBGL_lose_context
const webglContextStub = {
  isContextLost: () => false,
  getExtension: (name) => name === 'WEBGL_lose_context' ? { loseContext: () => mockEngine.contextsLost++ } : null,
};
const loadResult = (mainFile = 'axes.glb') => ({
  model: { MeshCount: () => 5, TriangleCount: () => 594 },
  mainFile,
  usedFiles: [mainFile],
});
const flush = async (page) => {
  await new Promise(resolve => setTimeout(resolve, 0));
  await page.waitForChanges();
};
const shadow = (page) => page.root.shadowRoot;
const viewport = (page) => shadow(page).querySelector('[role="application"]');
const toolbars = (page) => Array.from(shadow(page).querySelectorAll('wpp-floating-toolbar'));
const toolbar = (page, label) => toolbars(page).find(element => element.ariaProps?.label === label);
const zoomActions = (page) => toolbar(page, LOCALES_DEFAULTS.zoomToolbarLabel).actionButtonsConfig;
const liveRegion = (page) => shadow(page).querySelector('[aria-live="polite"]').textContent;
const errorState = (page) => {
  const root = shadow(page).querySelector('.error-state');
  const lines = root ? Array.from(root.querySelectorAll('wpp-typography')) : [];
  return {
    title: lines[0]?.textContent,
    text: lines[1]?.textContent,
    lines,
    retry: root?.querySelector('wpp-button') ?? null,
  };
};
const resolveLoad = async (page, index = mockEngine.pendingLoads.length - 1, mainFile = 'axes.glb') => {
  mockEngine.pendingLoads[index].callbacks.onModelFinished(loadResult(mainFile), {});
  await page.waitForChanges();
};
const renderViewer = async (template = () => h("wpp-media-viewer-v4-6-0", null)) => {
  const page = await newSpecPage({ components: [WppMediaViewer], template });
  await flush(page);
  return page;
};
const loadedViewer = async () => {
  const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { src: "/models/axes.glb" }));
  await resolveLoad(page);
  return page;
};
const fileInput = (page) => shadow(page).querySelector('input[type="file"]');
const pickFiles = async (page, files) => {
  const input = fileInput(page);
  Object.defineProperty(input, 'files', { configurable: true, value: files });
  input.dispatchEvent(new Event('change'));
  await page.waitForChanges();
};
const dragEvent = (type, files = []) => {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperty(event, 'dataTransfer', { value: { types: ['Files'], files, dropEffect: 'none' } });
  return event;
};
describe('wpp-media-viewer', () => {
  beforeEach(() => {
    mockEngine.pendingLoads = [];
    mockEngine.webglUnavailable = false;
    mockEngine.navigationModes = [];
    mockEngine.destroyed = 0;
    mockEngine.contextsLost = 0;
    mockEngine.resizes = 0;
    Object.assign(global, { ResizeObserver: ResizeObserverMock, File: FileStub });
    ResizeObserverMock.reset();
    Object.getPrototypeOf(document.createElement('canvas')).getContext = () => webglContextStub;
    Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: true });
  });
  // The renderer's page-wide state outlives a page: each test starts with the GPU check done (its own tests use a fresh
  // module) and, as WebKit keeps removed viewers' canvases for later ones, with none kept
  beforeEach(async () => {
    const { ModelRenderer } = await import('../model-renderer');
    const pageState = ModelRenderer;
    pageState.isGpuChecked = true;
    clearTimeout(pageState.poolTimer);
    pageState.canvasPool.length = 0;
  });
  describe('creation and defaults', () => {
    it('renders the empty state with a labelled, focusable 3D view', async () => {
      const page = await renderViewer();
      const view = viewport(page);
      expect(view.getAttribute('tabindex')).toBe('0');
      expect(view.getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.viewportEmptyLabel);
      expect(shadow(page).getElementById(view.getAttribute('aria-describedby')).textContent).toBe(LOCALES_DEFAULTS.keyboardInstructions);
      expect(view.hasAttribute('aria-busy')).toBe(false);
    });
    it('defaults to 400 × 400 pixels', async () => {
      const page = await renderViewer();
      expect(page.root.style.width).toBe('400px');
      expect(page.root.style.height).toBe('400px');
    });
    it('renders the upload, zoom and fullscreen toolbars with zoom and fullscreen disabled', async () => {
      const page = await renderViewer();
      const upload = toolbar(page, LOCALES_DEFAULTS.uploadToolbarLabel).actionButtonsConfig[0];
      const fullscreen = toolbar(page, LOCALES_DEFAULTS.fullscreenToolbarLabel).actionButtonsConfig[0];
      expect(toolbars(page).length).toBe(3);
      expect(upload.disabled).toBeFalsy();
      expect(zoomActions(page).every(action => action.disabled)).toBe(true);
      expect(fullscreen.disabled).toBe(true);
    });
    // Agreed with design: the three toolbars are always on screen, and zoom and fullscreen only work
    // while a model is on it - so they stay disabled through loading, a failure and the empty view.
    // Per the design: loading and the error state own the whole surface, so no toolbars there. On the
    // empty view the bars are back, with zoom and fullscreen disabled until a model is on screen.
    it('gives every control a tooltip holding the same words as its accessible name', async () => {
      const page = await loadedViewer();
      const named = (bar) => toolbar(page, bar).actionButtonsConfig.map(action => [action.tooltip, action.ariaProps?.label]);
      expect(named(LOCALES_DEFAULTS.uploadToolbarLabel)).toEqual([
        [LOCALES_DEFAULTS.uploadButtonLabel, LOCALES_DEFAULTS.uploadButtonLabel],
      ]);
      expect(named(LOCALES_DEFAULTS.zoomToolbarLabel)).toEqual([
        [LOCALES_DEFAULTS.zoomOutButtonLabel, LOCALES_DEFAULTS.zoomOutButtonLabel],
        ['100%, reset view', '100%, reset view'],
        [LOCALES_DEFAULTS.zoomInButtonLabel, LOCALES_DEFAULTS.zoomInButtonLabel],
      ]);
      expect(named(LOCALES_DEFAULTS.fullscreenToolbarLabel)).toEqual([
        [LOCALES_DEFAULTS.enterFullscreenButtonLabel, LOCALES_DEFAULTS.enterFullscreenButtonLabel],
      ]);
    });
    it('shows the toolbars only when the surface is the model, and disables zoom without one', async () => {
      const page = await loadedViewer();
      const fullscreenAction = () => toolbar(page, LOCALES_DEFAULTS.fullscreenToolbarLabel).actionButtonsConfig[0];
      expect(toolbars(page).length).toBe(3);
      expect(zoomActions(page).some(action => !action.disabled)).toBe(true);
      expect(fullscreenAction().disabled).toBe(false);
      page.root.src = '/models/other.glb';
      await page.waitForChanges();
      expect(toolbars(page).length).toBe(0);
      expect(shadow(page).querySelector('wpp-skeleton')).not.toBeNull();
      mockEngine.pendingLoads[mockEngine.pendingLoads.length - 1].callbacks.onLoadError({ code: 2, message: null });
      await page.waitForChanges();
      expect(shadow(page).querySelector('.error-state')).not.toBeNull();
      // Upload is the way out of a failure, so it stays; nothing else has a model to act on
      expect(toolbars(page).map(bar => bar.ariaProps?.label)).toEqual([LOCALES_DEFAULTS.uploadToolbarLabel]);
      page.root.src = '';
      await page.waitForChanges();
      expect(toolbars(page).length).toBe(3);
      // The empty state shows the viewer's own surface: no skeleton, and nothing painted over it
      expect(shadow(page).querySelector('wpp-skeleton')).toBeNull();
      expect(shadow(page).querySelector('.loading-skeleton, .overlay')).toBeNull();
      expect(zoomActions(page).every(action => action.disabled)).toBe(true);
      expect(fullscreenAction().disabled).toBe(true);
      expect(toolbar(page, LOCALES_DEFAULTS.uploadToolbarLabel).actionButtonsConfig[0].disabled).toBeFalsy();
    });
    it('stays empty from its first paint when it was given no source', async () => {
      const page = await newSpecPage({ components: [WppMediaViewer], template: () => h("wpp-media-viewer-v4-6-0", null) });
      expect(shadow(page).querySelector('wpp-skeleton')).toBeNull();
      expect(toolbars(page).length).toBe(3);
      await flush(page);
    });
    it('reports every zoom change, however it was made', async () => {
      const page = await loadedViewer();
      const onZoomChange = jest.fn();
      page.root.addEventListener('wppZoomChange', onZoomChange);
      zoomActions(page)[2].onClick();
      await page.waitForChanges();
      expect(onZoomChange.mock.calls[0][0].detail).toEqual({ zoom: 125 });
      // the methods go through the same path
      await page.root.fitToView();
      await page.waitForChanges();
      expect(onZoomChange.mock.calls[1][0].detail).toEqual({ zoom: 100 });
      // and a zoom that did not move says nothing
      await page.root.fitToView();
      await page.waitForChanges();
      expect(onZoomChange).toHaveBeenCalledTimes(2);
    });
    it('starts the engine in free navigation with instant camera moves', async () => {
      await renderViewer();
      expect(mockEngine.navigationModes).toEqual([2]);
    });
  });
  describe('Testing Watchers', () => {
    it('shows the loading state, then the model, when src is set', async () => {
      const page = await renderViewer();
      const onLoad = jest.fn();
      page.root.addEventListener('wppLoad', onLoad);
      page.root.src = '/models/axes.glb';
      await page.waitForChanges();
      expect(viewport(page).getAttribute('aria-busy')).toBe('true');
      expect(shadow(page).querySelector('wpp-skeleton')).not.toBeNull();
      expect(toolbars(page).length).toBe(0);
      expect(liveRegion(page)).toBe(LOCALES_DEFAULTS.loadingAnnouncement);
      await resolveLoad(page);
      expect(onLoad.mock.calls[0][0].detail).toEqual({ fileNames: ['axes.glb'], meshCount: 5, triangleCount: 594 });
      expect(viewport(page).getAttribute('aria-label')).toBe('3D model viewer, axes.glb');
      expect(viewport(page).hasAttribute('aria-busy')).toBe(false);
      expect(shadow(page).querySelector('wpp-skeleton')).toBeNull();
      expect(liveRegion(page)).toBe('Loaded axes.glb');
      expect(zoomActions(page)[1].label).toBe('100%');
    });
    it('passes every URL of a multi-file model to the engine', async () => {
      await renderViewer(() => h("wpp-media-viewer-v4-6-0", { src: ['/m/axes.gltf', '/m/axes.bin', '/m/checker.png'] }));
      expect(mockEngine.pendingLoads[0].inputFiles).toEqual(['/m/axes.gltf', '/m/axes.bin', '/m/checker.png']);
    });
    it('shows only the latest src when an earlier load finishes later', async () => {
      const page = await renderViewer();
      const onLoad = jest.fn();
      page.root.addEventListener('wppLoad', onLoad);
      page.root.src = '/models/a.glb';
      await page.waitForChanges();
      page.root.src = '/models/b.stl';
      await page.waitForChanges();
      await resolveLoad(page, 0, 'a.glb');
      expect(onLoad).not.toHaveBeenCalled();
      await resolveLoad(page, 1, 'b.stl');
      expect(onLoad).toHaveBeenCalledTimes(1);
      expect(onLoad.mock.calls[0][0].detail.fileNames).toEqual(['b.stl']);
    });
    it('returns to the empty state when src is cleared', async () => {
      const page = await loadedViewer();
      page.root.src = '';
      await page.waitForChanges();
      expect(viewport(page).getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.viewportEmptyLabel);
      expect(zoomActions(page).every(action => action.disabled)).toBe(true);
    });
    it('switches the engine to fixed-up navigation', async () => {
      const page = await renderViewer();
      page.root.navigationMode = 'fixed-up';
      await page.waitForChanges();
      expect(mockEngine.navigationModes).toEqual([2, 1]);
    });
  });
  describe('Testing Listeners', () => {
    const press = async (page, init) => {
      const event = new KeyboardEvent('keydown', { cancelable: true, ...init });
      viewport(page).dispatchEvent(event);
      await page.waitForChanges();
      return event;
    };
    it('zooms in with +, = and NumpadAdd, out with -, and resets with Home', async () => {
      const page = await loadedViewer();
      await press(page, { key: '+' });
      expect(zoomActions(page)[1].label).toBe('125%');
      await press(page, { key: '=' });
      expect(zoomActions(page)[1].label).toBe('156%');
      await press(page, { key: 'Unidentified', code: 'NumpadAdd' });
      expect(zoomActions(page)[1].label).toBe('195%');
      await press(page, { key: '-' });
      expect(zoomActions(page)[1].label).toBe('156%');
      await press(page, { key: 'Home' });
      expect(zoomActions(page)[1].label).toBe('100%');
    });
    it('handles arrow keys and leaves other keys alone', async () => {
      const page = await loadedViewer();
      expect((await press(page, { key: 'ArrowLeft' })).defaultPrevented).toBe(true);
      expect((await press(page, { key: 'ArrowUp', shiftKey: true })).defaultPrevented).toBe(true);
      expect((await press(page, { key: 'a' })).defaultPrevented).toBe(false);
    });
    it('ignores keys while no model is shown', async () => {
      const page = await renderViewer();
      expect((await press(page, { key: '+' })).defaultPrevented).toBe(false);
    });
    it('stops at 800% and disables Zoom in', async () => {
      const page = await loadedViewer();
      for (let step = 0; step < 12; step++)
        await press(page, { key: '+' });
      expect(zoomActions(page)[1].label).toBe('800%');
      expect(zoomActions(page)[2].disabled).toBe(true);
    });
    it('stops at 25% and disables Zoom out', async () => {
      const page = await loadedViewer();
      for (let step = 0; step < 10; step++)
        await press(page, { key: '-' });
      expect(zoomActions(page)[1].label).toBe('25%');
      expect(zoomActions(page)[0].disabled).toBe(true);
    });
    it('shows the drop hint while files are dragged over, and opens dropped files', async () => {
      const page = await loadedViewer();
      const onUpload = jest.fn();
      const file = new File(['glb'], 'dropped.glb');
      const area = shadow(page).querySelector('.media-viewer');
      page.root.addEventListener('wppUpload', onUpload);
      area.dispatchEvent(dragEvent('dragenter'));
      await page.waitForChanges();
      // The drag state is the outline alone: the model underneath stays visible and the toolbars stay up
      expect(shadow(page).querySelector('.drop-overlay')).not.toBeNull();
      expect(shadow(page).querySelector('.drop-overlay').textContent).toBe('');
      expect(toolbars(page).length).toBe(3);
      area.dispatchEvent(dragEvent('drop', [file]));
      await page.waitForChanges();
      expect(shadow(page).querySelector('.drop-overlay')).toBeNull();
      expect(onUpload.mock.calls[0][0].detail.files).toEqual([file]);
      expect(mockEngine.pendingLoads[mockEngine.pendingLoads.length - 1].inputFiles).toEqual([file]);
    });
    it('clears the drop hint when the drag leaves', async () => {
      const page = await renderViewer();
      const area = shadow(page).querySelector('.media-viewer');
      area.dispatchEvent(dragEvent('dragenter'));
      area.dispatchEvent(dragEvent('dragleave'));
      await page.waitForChanges();
      expect(shadow(page).querySelector('.drop-overlay')).toBeNull();
    });
    it('warns and changes nothing when the browser refuses fullscreen', async () => {
      const page = await loadedViewer();
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => undefined);
      Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null });
      page.root.requestFullscreen = () => Promise.reject(new Error('Permissions check failed'));
      await page.root.toggleFullscreen();
      await page.waitForChanges();
      expect(warn).toHaveBeenCalledWith('wpp-media-viewer: the browser refused to change fullscreen.', expect.any(Error));
      expect(page.root.classList.contains('wpp-full-screen')).toBe(false);
      expect(toolbar(page, LOCALES_DEFAULTS.fullscreenToolbarLabel).actionButtonsConfig[0].ariaProps.label).toBe(LOCALES_DEFAULTS.enterFullscreenButtonLabel);
      warn.mockRestore();
    });
    it('reports fullscreen changes for its own host only', async () => {
      const page = await loadedViewer();
      const onFullscreenChange = jest.fn();
      page.root.addEventListener('wppFullscreenChange', onFullscreenChange);
      Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: document.body });
      document.dispatchEvent(new Event('fullscreenchange'));
      await page.waitForChanges();
      expect(onFullscreenChange).not.toHaveBeenCalled();
      Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: page.root });
      document.dispatchEvent(new Event('fullscreenchange'));
      await page.waitForChanges();
      const fullscreen = toolbar(page, LOCALES_DEFAULTS.fullscreenToolbarLabel).actionButtonsConfig[0];
      expect(onFullscreenChange.mock.calls[0][0].detail).toEqual({ isFullscreen: true });
      expect(fullscreen.icon).toBe('wpp-icon-fullscreen-minimise');
      expect(fullscreen.ariaProps.label).toBe(LOCALES_DEFAULTS.exitFullscreenButtonLabel);
      expect(page.root.classList.contains('wpp-full-screen')).toBe(true);
      Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null });
      document.dispatchEvent(new Event('fullscreenchange'));
      await page.waitForChanges();
      expect(onFullscreenChange.mock.calls[1][0].detail).toEqual({ isFullscreen: false });
      expect(page.root.style.width).toBe('400px');
    });
  });
  describe('focus', () => {
    // The mock DOM never updates activeElement; a browser reports the focused toolbar this way
    const reportFocus = (page, element) => Object.defineProperty(shadow(page), 'activeElement', { configurable: true, get: () => element });
    it('keeps the same toolbar elements through a load', async () => {
      const page = await loadedViewer();
      const before = toolbars(page);
      page.root.src = '/models/other.glb';
      await page.waitForChanges();
      await resolveLoad(page, 1, 'other.glb');
      expect(toolbars(page)).toEqual(before);
    });
    it('moves focus to the 3D view when the toolbars step aside for a load', async () => {
      const page = await loadedViewer();
      const focus = jest.spyOn(viewport(page), 'focus');
      reportFocus(page, toolbar(page, LOCALES_DEFAULTS.zoomToolbarLabel));
      page.root.src = '/models/other.glb';
      await page.waitForChanges();
      expect(toolbars(page).length).toBe(0);
      expect(focus).toHaveBeenCalledWith({ preventScroll: true });
    });
    // In a browser, focus() fires a focus event synchronously; the mock DOM doesn't
    const emulateFocusEvent = (page) => {
      const view = viewport(page);
      view.focus = () => view.dispatchEvent(new Event('focus'));
    };
    it.each([
      ['a key press', 'keydown', true],
      ['a pointer press', 'pointerdown', false],
    ])('shows the ring on the fallback focus only after %s', async (_name, inputEvent, hasRing) => {
      const page = await loadedViewer();
      emulateFocusEvent(page);
      shadow(page)
        .querySelector('.media-viewer')
        .dispatchEvent(new Event(inputEvent, { bubbles: true }));
      reportFocus(page, toolbar(page, LOCALES_DEFAULTS.zoomToolbarLabel));
      page.root.src = '/models/other.glb';
      await page.waitForChanges();
      expect(viewport(page).classList.contains('tab-focus')).toBe(hasRing);
    });
    it('leaves focus alone while the focused toolbar is still on screen', async () => {
      const page = await loadedViewer();
      const focus = jest.spyOn(viewport(page), 'focus');
      reportFocus(page, toolbar(page, LOCALES_DEFAULTS.uploadToolbarLabel));
      page.root.navigationMode = 'fixed-up';
      await page.waitForChanges();
      expect(toolbars(page).length).toBe(3);
      expect(focus).not.toHaveBeenCalled();
    });
    it('paints the focus ring for keyboard focus but not for a pointer press', async () => {
      const page = await loadedViewer();
      const view = viewport(page);
      view.dispatchEvent(new Event('focus'));
      await page.waitForChanges();
      expect(view.classList.contains('tab-focus')).toBe(true);
      view.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
      expect(view.classList.contains('tab-focus')).toBe(false);
      view.dispatchEvent(new Event('blur'));
      view.dispatchEvent(new Event('focus'));
      await page.waitForChanges();
      expect(view.classList.contains('tab-focus')).toBe(true);
      view.dispatchEvent(new Event('blur'));
      await page.waitForChanges();
      expect(view.classList.contains('tab-focus')).toBe(false);
    });
    // The mock DOM has no capture phase and its composedPath stops at shadow roots, so call the listener the
    // viewer adds to the window with the events a browser would send it
    const openPicker = (page, inputEvent) => {
      const addListener = jest.spyOn(window, 'addEventListener');
      shadow(page)
        .querySelector('.media-viewer')
        .dispatchEvent(new Event(inputEvent, { bubbles: true }));
      toolbar(page, LOCALES_DEFAULTS.uploadToolbarLabel).actionButtonsConfig[0].onClick();
      const call = addListener.mock.calls.find(([type, , capture]) => type === 'focus' && capture === true);
      addListener.mockRestore();
      return call?.[1];
    };
    const focusEvent = (target, path = [target]) => ({
      target,
      composedPath: () => path,
      stopImmediatePropagation: jest.fn(),
    });
    it('stops the focus that the file dialog opened with a pointer hands back to Upload', async () => {
      const page = await loadedViewer();
      const onFocus = openPicker(page, 'pointerdown');
      const upload = toolbar(page, LOCALES_DEFAULTS.uploadToolbarLabel);
      const event = focusEvent(upload, [upload, shadow(page), page.root]);
      onFocus(event);
      expect(event.stopImmediatePropagation).toHaveBeenCalled();
    });
    it('leaves the focus that comes back alone when the file dialog was opened from the keyboard', async () => {
      const page = await loadedViewer();
      expect(openPicker(page, 'keydown')).toBeUndefined();
    });
    it('stops listening when the viewer is removed', async () => {
      const page = await loadedViewer();
      const onFocus = openPicker(page, 'pointerdown');
      const removeListener = jest.spyOn(window, 'removeEventListener');
      try {
        page.root.remove();
        expect(removeListener).toHaveBeenCalledWith('focus', onFocus, true);
      }
      finally {
        removeListener.mockRestore();
      }
    });
    describe('Retry', () => {
      const press = (page, inputEvent) => shadow(page)
        .querySelector('.media-viewer')
        .dispatchEvent(new Event(inputEvent, { bubbles: true }));
      const failedViewer = async () => {
        const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { src: "/models/axes.glb" }));
        mockEngine.pendingLoads[0].callbacks.onLoadError({ code: 2, message: null });
        await page.waitForChanges();
        return page;
      };
      // Retry is pressed while it has focus; the mock DOM never updates activeElement, so report the view as
      // focused from here on, as a browser would once Retry has moved focus there
      const retryWith = async (page, inputEvent) => {
        press(page, inputEvent);
        errorState(page).retry.click();
        reportFocus(page, viewport(page));
        await page.waitForChanges();
      };
      afterEach(() => jest.restoreAllMocks());
      // wpp-button isn't registered in these specs, and the Retry shown after a second failure is a new element,
      // so give every wpp-button the renderer creates from here on a setFocus of its own
      const stubRetrySetFocus = (page) => {
        const setFocus = jest.fn();
        const doc = page.win.document;
        const createElementNS = doc.createElementNS.bind(doc);
        jest.spyOn(doc, 'createElementNS').mockImplementation((namespace, qualifiedName) => {
          const element = createElementNS(namespace, qualifiedName);
          if (qualifiedName.toLowerCase() === 'wpp-button')
            Object.assign(element, { setFocus });
          return element;
        });
        return setFocus;
      };
      const failAgain = async (page) => {
        mockEngine.pendingLoads[1].callbacks.onLoadError({ code: 2, message: null });
        await page.waitForChanges();
      };
      it('moves focus to the 3D view before Retry steps aside for the load', async () => {
        const page = await failedViewer();
        const focus = jest.spyOn(viewport(page), 'focus');
        await retryWith(page, 'keydown');
        expect(focus).toHaveBeenCalledWith({ preventScroll: true });
        expect(errorState(page).retry).toBeNull();
      });
      it.each([
        ['a key press', 'keydown', true],
        ['a pointer press', 'pointerdown', false],
      ])('shows the ring on the view only after %s', async (_name, inputEvent, hasRing) => {
        const page = await failedViewer();
        emulateFocusEvent(page);
        await retryWith(page, inputEvent);
        expect(viewport(page).classList.contains('tab-focus')).toBe(hasRing);
      });
      it('focuses the new Retry button when a retry from the keyboard fails again', async () => {
        const page = await failedViewer();
        const setFocus = stubRetrySetFocus(page);
        await retryWith(page, 'keydown');
        expect(setFocus).not.toHaveBeenCalled();
        await failAgain(page);
        expect(errorState(page).retry).not.toBeNull();
        expect(setFocus).toHaveBeenCalledTimes(1);
      });
      it('leaves focus on the view when a retry with a pointer fails again', async () => {
        const page = await failedViewer();
        const setFocus = stubRetrySetFocus(page);
        await retryWith(page, 'pointerdown');
        await failAgain(page);
        expect(setFocus).not.toHaveBeenCalled();
      });
      it('leaves focus on the view when the retried load succeeds', async () => {
        const page = await failedViewer();
        const setFocus = stubRetrySetFocus(page);
        await retryWith(page, 'keydown');
        await resolveLoad(page, 1);
        expect(setFocus).not.toHaveBeenCalled();
      });
    });
  });
  // WebKit browsers: Safari, and every browser on iOS. The others release WebGL contexts as before.
  const SAFARI = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.0 Safari/605.1.15';
  const CHROME_ON_IOS = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/130.0.0.0 Mobile/15E148 Safari/604.1';
  const CHROME = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';
  const FIREFOX = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:131.0) Gecko/20100101 Firefox/131.0';
  describe('GPU check', () => {
    // A fresh module, so its once-per-page check hasn't run yet
    const freshModelRenderer = () => {
      let module;
      jest.isolateModules(() => {
        module = jest.requireActual('../model-renderer');
      });
      return module.ModelRenderer;
    };
    // A viewer made by the fresh module, and the canvas it draws on
    const openViewer = (Renderer) => {
      const container = document.createElement('div');
      document.body.appendChild(container);
      new Renderer(container, { onZoomChange: () => undefined, onContextLost: () => undefined }).init();
      return container.querySelector('canvas');
    };
    // Faked, so that a kept canvas's idle wait doesn't outlive the test
    beforeEach(() => jest.useFakeTimers());
    afterEach(() => {
      jest.useRealTimers();
      Object.defineProperty(navigator, 'userAgent', { configurable: true, value: 'MockNavigator' });
    });
    const useBrowser = (userAgent) => Object.defineProperty(navigator, 'userAgent', { configurable: true, value: userAgent });
    it("runs the engine's GPU check once, as the first viewer is made", () => {
      const Renderer = freshModelRenderer();
      const checksBefore = mockEngine.gpuChecks;
      openViewer(Renderer);
      openViewer(Renderer);
      expect(mockEngine.gpuChecks).toBe(checksBefore + 1);
    });
    it('runs the GPU check on the canvas the first viewer then takes over, with its context, in WebKit', () => {
      useBrowser(SAFARI);
      const canvas = openViewer(freshModelRenderer());
      expect(canvas).toBe(mockEngine.checkedCanvas);
      expect(mockEngine.contextsLost).toBe(0);
    });
    it("releases the GPU check's context at once in other browsers, as before", () => {
      useBrowser(CHROME);
      const canvas = openViewer(freshModelRenderer());
      expect(mockEngine.checkedCanvas?.tagName).toBe('CANVAS');
      expect(canvas).not.toBe(mockEngine.checkedCanvas);
      expect(mockEngine.contextsLost).toBe(1);
    });
  });
  describe('canvas pool', () => {
    // Spied rather than faked, as the idle wait uses Node's setTimeout, which mock-doc's window doesn't see
    let setTimeoutSpy;
    const idleTimers = () => setTimeoutSpy.mock.calls
      .map(([callback, delay], index) => ({
      run: callback,
      delay,
      handle: setTimeoutSpy.mock.results[index].value,
    }))
      .filter(({ delay }) => delay === POOL_IDLE_TIMEOUT);
    beforeEach(() => {
      setTimeoutSpy = jest.spyOn(global, 'setTimeout');
    });
    // A real timer left running would fire once the spec is gone
    afterEach(() => {
      idleTimers().forEach(({ handle }) => clearTimeout(handle));
      setTimeoutSpy.mockRestore();
      Object.defineProperty(navigator, 'userAgent', { configurable: true, value: 'MockNavigator' });
    });
    const useBrowser = (userAgent) => Object.defineProperty(navigator, 'userAgent', { configurable: true, value: userAgent });
    // A viewer as the component makes one: its renderer, set up in a container on the page
    const openViewer = async () => {
      const { ModelRenderer } = await import('../model-renderer');
      const container = document.createElement('div');
      document.body.appendChild(container);
      const renderer = new ModelRenderer(container, { onZoomChange: () => undefined, onContextLost: () => undefined });
      renderer.init();
      return {
        renderer,
        canvas: container.querySelector('canvas'),
        resetState: renderer.viewer.renderer
          .resetState,
      };
    };
    it.each([
      ['Safari', SAFARI],
      ['any browser on iOS', CHROME_ON_IOS],
    ])("keeps a removed viewer's canvas and context for the next viewer in %s", async (_name, userAgent) => {
      useBrowser(userAgent);
      const first = await openViewer();
      first.renderer.destroy();
      expect(mockEngine.contextsLost).toBe(0);
      expect([first.canvas.width, first.canvas.height]).toEqual([1, 1]);
      const second = await openViewer();
      expect(second.canvas).toBe(first.canvas);
      expect(second.resetState).toHaveBeenCalled();
    });
    it.each([
      ['Chrome', CHROME],
      ['Firefox', FIREFOX],
    ])("releases a removed viewer's context at once in %s, as before", async (_name, userAgent) => {
      useBrowser(userAgent);
      const first = await openViewer();
      first.renderer.destroy();
      expect(mockEngine.contextsLost).toBe(1);
      expect((await openViewer()).canvas).not.toBe(first.canvas);
      expect(idleTimers()).toHaveLength(0);
    });
    it('skips a kept canvas whose context the browser lost since', async () => {
      useBrowser(SAFARI);
      const first = await openViewer();
      first.renderer.destroy();
      first.canvas.getContext = (() => ({ ...webglContextStub, isContextLost: () => true }));
      expect((await openViewer()).canvas).not.toBe(first.canvas);
    });
    it(`keeps no more than ${MAX_POOLED_CANVASES} canvases, releasing the context of any more`, async () => {
      useBrowser(SAFARI);
      const viewers = await Promise.all(Array.from({ length: MAX_POOLED_CANVASES + 1 }, () => openViewer()));
      viewers.forEach(({ renderer }) => renderer.destroy());
      expect(mockEngine.contextsLost).toBe(1);
    });
    it('releases the kept contexts once no viewer has been removed for a while', async () => {
      useBrowser(SAFARI);
      const viewers = [await openViewer(), await openViewer()];
      viewers.forEach(({ renderer }) => renderer.destroy());
      // Each canvas kept starts the wait again
      const timers = idleTimers();
      expect(timers).toHaveLength(2);
      timers[1].run();
      expect(mockEngine.contextsLost).toBe(2);
      expect((await openViewer()).canvas).not.toBe(viewers[0].canvas);
    });
  });
  describe('pixel ratio', () => {
    it('resizes the canvas when the device pixel ratio changes', async () => {
      const listeners = [];
      // Each spec page gets its own mock window, so the stub goes on the shared prototype
      Object.getPrototypeOf(window).matchMedia = () => ({
        addEventListener: (_type, listener) => listeners.push(listener),
        removeEventListener: () => undefined,
      });
      const page = await loadedViewer();
      // The mock DOM has no layout: give the view a size and report it the way a ResizeObserver would
      Object.defineProperty(viewport(page), 'clientWidth', { configurable: true, value: 400 });
      Object.defineProperty(viewport(page), 'clientHeight', { configurable: true, value: 400 });
      ResizeObserverMock.last?.triggerResize({ width: 400, height: 400 });
      const resizesBefore = mockEngine.resizes;
      listeners[listeners.length - 1]();
      expect(mockEngine.resizes).toBe(resizesBefore + 1);
      expect(listeners.length).toBeGreaterThan(1);
    });
  });
  describe('Testing lifecycle methods', () => {
    it('reports the WebGL error when the browser has no WebGL, with nothing to retry', async () => {
      mockEngine.webglUnavailable = true;
      const onError = jest.fn();
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { onWppError: onError }));
      expect(onError.mock.calls[0][0].detail.reason).toBe('webgl-unavailable');
      expect(onError.mock.calls[0][0].detail.message).toBe(LOCALES_DEFAULTS.webglUnavailableError);
      expect(errorState(page).title).toBe(LOCALES_DEFAULTS.errorTitle);
      expect(errorState(page).text).toBe(LOCALES_DEFAULTS.webglUnavailableError);
      // No model was ever asked for and the 3D context never started, so Retry would do nothing
      expect(errorState(page).retry).toBeNull();
      expect(toolbars(page).map(bar => bar.ariaProps?.label)).toEqual([LOCALES_DEFAULTS.uploadToolbarLabel]);
    });
    it('destroys the engine when the element is removed', async () => {
      const page = await loadedViewer();
      page.root.remove();
      await page.waitForChanges();
      expect(mockEngine.destroyed).toBe(1);
      expect(mockEngine.contextsLost).toBe(1);
    });
  });
  describe('errors', () => {
    it.each([
      [{ code: 1, message: null }, 'no-importable-file', LOCALES_DEFAULTS.noImportableFileError],
      [{ code: 2, message: null }, 'failed-to-load', LOCALES_DEFAULTS.failedToLoadError],
      [{ code: 3, message: 'Bad header' }, 'import-failed', LOCALES_DEFAULTS.importFailedError],
      [{ code: 3, message: 'Failed to load draco decoder.' }, 'decoder-failed', LOCALES_DEFAULTS.decoderFailedError],
      [{ code: 3, message: 'Failed to load occt-import-js.' }, 'decoder-failed', LOCALES_DEFAULTS.decoderFailedError],
      [{ code: 3, message: 'Failed to load rhino3dm.' }, 'decoder-failed', LOCALES_DEFAULTS.decoderFailedError],
      [{ code: 3, message: 'Failed to load web-ifc.' }, 'decoder-failed', LOCALES_DEFAULTS.decoderFailedError],
    ])('maps engine error %o to %s with a localised message', async (importError, reason, message) => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { src: "/models/broken.glb" }));
      const onError = jest.fn();
      page.root.addEventListener('wppError', onError);
      mockEngine.pendingLoads[0].callbacks.onLoadError(importError);
      await page.waitForChanges();
      expect(onError.mock.calls[0][0].detail).toEqual({
        reason,
        fileNames: ['broken.glb'],
        message,
        details: importError.message ?? undefined,
        code: importError.code,
      });
      expect(errorState(page).title).toBe(LOCALES_DEFAULTS.errorTitle);
      expect(errorState(page).text).toBe(`${message} (Error ${importError.code})`);
      expect(toolbars(page).map(bar => bar.ariaProps?.label)).toEqual([LOCALES_DEFAULTS.uploadToolbarLabel]);
      expect(liveRegion(page)).toBe(message);
      expect(viewport(page).hasAttribute('aria-busy')).toBe(false);
    });
    it('shows the error state over the empty view, with Retry', async () => {
      const page = await loadedViewer();
      page.root.src = '/models/broken.glb';
      await page.waitForChanges();
      mockEngine.pendingLoads[mockEngine.pendingLoads.length - 1].callbacks.onLoadError({ code: 2, message: null });
      await page.waitForChanges();
      expect(viewport(page).getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.viewportEmptyLabel);
      expect(errorState(page).title).toBe(LOCALES_DEFAULTS.errorTitle);
      expect(errorState(page).retry).not.toBeNull();
      expect(toolbars(page).map(bar => bar.ariaProps?.label)).toEqual([LOCALES_DEFAULTS.uploadToolbarLabel]);
      // Both lines are centred in the typography host, whose text node is only as wide as the words,
      // and the description sits a step lighter than the title, per the design
      const [title, description] = errorState(page).lines;
      expect(title.classList.contains('error-line')).toBe(true);
      expect(description.classList.contains('error-line')).toBe(true);
      expect(description.getAttribute('color')).toBe('var(--wpp-grey-color-900)');
    });
    it('leaves upload reachable from the error state, so another file can be picked', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { src: "/models/broken.glb" }));
      mockEngine.pendingLoads[0].callbacks.onLoadError({ code: 1, message: null });
      await page.waitForChanges();
      const upload = toolbar(page, LOCALES_DEFAULTS.uploadToolbarLabel).actionButtonsConfig[0];
      expect(upload.disabled).toBeFalsy();
      const replacement = new File(['glb'], 'other.glb');
      await pickFiles(page, [replacement]);
      expect(mockEngine.pendingLoads[mockEngine.pendingLoads.length - 1].inputFiles).toEqual([replacement]);
      expect(shadow(page).querySelector('.error-state')).toBeNull();
    });
    it('loads the same source again when Retry is pressed', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { src: "/models/axes.glb" }));
      mockEngine.pendingLoads[0].callbacks.onLoadError({ code: 2, message: null });
      await page.waitForChanges();
      const loadsBefore = mockEngine.pendingLoads.length;
      errorState(page).retry.click();
      await page.waitForChanges();
      expect(mockEngine.pendingLoads.length).toBe(loadsBefore + 1);
      expect(mockEngine.pendingLoads[loadsBefore].inputFiles).toEqual(['/models/axes.glb']);
      expect(shadow(page).querySelector('.error-state')).toBeNull();
      expect(shadow(page).querySelector('wpp-skeleton')).not.toBeNull();
      await resolveLoad(page);
      expect(viewport(page).getAttribute('aria-label')).toBe('3D model viewer, axes.glb');
    });
    it('translates the message it hands over with the error', async () => {
      const onError = jest.fn();
      const page = await renderViewer(() => (h("wpp-media-viewer-v4-6-0", { src: "/models/broken.glb", locales: { failedToLoadError: 'Das Modell fehlt.' } })));
      page.root.addEventListener('wppError', onError);
      mockEngine.pendingLoads[0].callbacks.onLoadError({ code: 2, message: null });
      await page.waitForChanges();
      expect(onError.mock.calls[0][0].detail.message).toBe('Das Modell fehlt.');
    });
    it('renders every word of the error state from locales, the code wording included', async () => {
      const page = await renderViewer(() => (h("wpp-media-viewer-v4-6-0", { src: "/models/broken.glb", locales: {
          errorTitle: 'Konnte nicht geladen werden',
          noImportableFileError: 'Dieser Dateityp kann nicht geöffnet werden.',
          errorWithCodeText: '{message} (Fehler {code})',
          retryButtonLabel: 'Erneut versuchen',
        } })));
      mockEngine.pendingLoads[0].callbacks.onLoadError({ code: 1, message: 'Failed to import model.' });
      await page.waitForChanges();
      expect(errorState(page).title).toBe('Konnte nicht geladen werden');
      expect(errorState(page).text).toBe('Dieser Dateityp kann nicht geöffnet werden. (Fehler 1)');
      expect(errorState(page).retry.textContent).toContain('Erneut versuchen');
      expect(liveRegion(page)).toBe('Dieser Dateityp kann nicht geöffnet werden.');
    });
  });
  describe('upload', () => {
    it('opens picked files after firing wppUpload', async () => {
      const page = await renderViewer();
      const onUpload = jest.fn();
      const files = [new File(['obj'], 'axes.obj'), new File(['mtl'], 'axes.mtl')];
      page.root.addEventListener('wppUpload', onUpload);
      await pickFiles(page, files);
      expect(onUpload.mock.calls[0][0].detail.files).toEqual(files);
      expect(mockEngine.pendingLoads[0].inputFiles).toEqual(files);
      expect(viewport(page).getAttribute('aria-busy')).toBe('true');
    });
    it('keeps the current model when wppUpload is cancelled', async () => {
      const page = await loadedViewer();
      page.root.addEventListener('wppUpload', event => event.preventDefault());
      await pickFiles(page, [new File(['glb'], 'other.glb')]);
      expect(mockEngine.pendingLoads.length).toBe(1);
      expect(viewport(page).getAttribute('aria-label')).toBe('3D model viewer, axes.glb');
    });
    it('rejects files outside the accepted extensions', async () => {
      const page = await renderViewer();
      const onUpload = jest.fn();
      const onError = jest.fn();
      page.root.addEventListener('wppUpload', onUpload);
      page.root.addEventListener('wppError', onError);
      await pickFiles(page, [new File(['x'], 'notes.txt'), new File(['glb'], 'axes.glb')]);
      expect(onUpload).not.toHaveBeenCalled();
      expect(onError.mock.calls[0][0].detail).toEqual({
        reason: 'unsupported-file',
        fileNames: ['notes.txt'],
        message: 'These files aren’t a supported type: notes.txt.',
        details: undefined,
      });
      expect(shadow(page).querySelector('.overlay')).toBeNull();
      expect(liveRegion(page)).toBe('These files aren’t a supported type: notes.txt.');
    });
    it('rejects files over maxFileSize', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { maxFileSize: 0.000001 }));
      const onError = jest.fn();
      page.root.addEventListener('wppError', onError);
      await pickFiles(page, [new File(['a larger model'], 'big.glb')]);
      expect(onError.mock.calls[0][0].detail.reason).toBe('file-too-large');
      expect(onError.mock.calls[0][0].detail.message).toBe('These files are larger than 0.000001 MB: big.glb.');
    });
    it.each([
      ['an unsupported type', () => [new File(['x'], 'notes.txt')]],
      ['a file over maxFileSize', () => [new File(['a larger model'], 'big.glb')]],
    ])('keeps the model on screen when the picked files are turned away for %s', async (_label, makeFiles) => {
      const page = await loadedViewer();
      const loadsBefore = mockEngine.pendingLoads.length;
      page.root.maxFileSize = 0.000001;
      await page.waitForChanges();
      await pickFiles(page, makeFiles());
      expect(viewport(page).getAttribute('aria-label')).toBe('3D model viewer, axes.glb');
      expect(mockEngine.pendingLoads.length).toBe(loadsBefore);
      expect(zoomActions(page).some(action => !action.disabled)).toBe(true);
    });
    it('limits the file picker to the accepted extensions', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { acceptedFileExtensions: ['glb', 'gltf'] }));
      expect(fileInput(page).getAttribute('accept')).toBe('.glb,.gltf');
      expect(fileInput(page).hasAttribute('multiple')).toBe(true);
    });
  });
  describe('control panel config', () => {
    it('hides the upload toolbar and file input', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { controlPanelConfig: { showUploadButton: false } }));
      expect(toolbar(page, LOCALES_DEFAULTS.uploadToolbarLabel)).toBeUndefined();
      expect(fileInput(page)).toBeNull();
    });
    it('renders no controls row when everything is hidden', async () => {
      const page = await renderViewer(() => (h("wpp-media-viewer-v4-6-0", { controlPanelConfig: { showUploadButton: false, showZoomControls: false, showFullscreenButton: false } })));
      expect(shadow(page).querySelector('.controls')).toBeNull();
    });
    it('hides the fullscreen toolbar where the browser does not allow fullscreen', async () => {
      Object.defineProperty(document, 'fullscreenEnabled', { configurable: true, value: false });
      const page = await renderViewer();
      expect(toolbar(page, LOCALES_DEFAULTS.fullscreenToolbarLabel)).toBeUndefined();
    });
  });
  describe('methods', () => {
    it('resolves without changes when no model is loaded', async () => {
      const page = await renderViewer();
      await expect(page.root.fitToView()).resolves.toBeUndefined();
      await expect(page.root.resetView()).resolves.toBeUndefined();
      await expect(page.root.toggleFullscreen()).resolves.toBeUndefined();
      expect(viewport(page).getAttribute('aria-label')).toBe(LOCALES_DEFAULTS.viewportEmptyLabel);
    });
    it('fits the view back to 100%', async () => {
      const page = await loadedViewer();
      viewport(page).dispatchEvent(new KeyboardEvent('keydown', { key: '+' }));
      await page.waitForChanges();
      await page.root.fitToView();
      await page.waitForChanges();
      expect(zoomActions(page)[1].label).toBe('100%');
    });
  });
  describe('Testing accessibility', () => {
    it('names every action from locales, with the zoom level in the reset action name', async () => {
      const page = await loadedViewer();
      expect(zoomActions(page).map(action => action.ariaProps.label)).toEqual([
        LOCALES_DEFAULTS.zoomOutButtonLabel,
        '100%, reset view',
        LOCALES_DEFAULTS.zoomInButtonLabel,
      ]);
    });
    it('applies partial locale overrides only to those keys', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { locales: { zoomInButtonLabel: 'Agrandir' } }));
      expect(zoomActions(page)[2].ariaProps.label).toBe('Agrandir');
      expect(zoomActions(page)[0].ariaProps.label).toBe(LOCALES_DEFAULTS.zoomOutButtonLabel);
    });
    it('lets ariaProps.label replace the 3D view name', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { ariaProps: { label: 'Chair model' } }));
      expect(viewport(page).getAttribute('aria-label')).toBe('Chair model');
    });
    it('keeps the toolbars, live region and messages outside the application role', async () => {
      const page = await renderViewer(() => h("wpp-media-viewer-v4-6-0", { src: "/models/broken.glb" }));
      mockEngine.pendingLoads[0].callbacks.onLoadError({ code: 1, message: null });
      await page.waitForChanges();
      const outside = [...toolbars(page), shadow(page).querySelector('[aria-live="polite"]')];
      expect(outside.every(element => !viewport(page).contains(element))).toBe(true);
    });
  });
  describe('Testing Snapshots', () => {
    it('renders the empty viewer', async () => {
      const page = await renderViewer();
      expect(viewport(page).getAttribute('role')).toBe('application');
      expect(page.root).toMatchSnapshot();
    });
    it('renders the host classes for normal and fullscreen views', async () => {
      const page = await loadedViewer();
      const normal = page.root.className;
      Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: page.root });
      document.dispatchEvent(new Event('fullscreenchange'));
      await page.waitForChanges();
      expect(normal).toBe('wpp-media-viewer');
      expect({ normal, fullscreen: page.root.className }).toMatchSnapshot();
      Object.defineProperty(document, 'fullscreenElement', { configurable: true, value: null });
    });
  });
});
