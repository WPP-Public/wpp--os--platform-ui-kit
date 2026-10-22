export const LOCALES_DEFAULTS = {
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
export const DEFAULT_SIZE = { width: 400, height: 400 };
export const DEFAULT_CONTROL_PANEL_CONFIG = {
  showUploadButton: true,
  showZoomControls: true,
  showFullscreenButton: true,
};
/**
 * 3D formats the engine opens without downloading anything, plus the files they reference (glTF buffers,
 * OBJ materials, textures). SVG is left out: the 2D image viewer will handle it. STEP, IGES, BREP, IFC, 3dm
 * and FCStd also work, but they load their decoders from cdn.jsdelivr.net, so devs opt in to them explicitly.
 */
export const DEFAULT_ACCEPTED_FILE_EXTENSIONS = [
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
export const MIN_ZOOM = 25;
export const MAX_ZOOM = 800;
/** Camera distance multipliers for one zoom step. */
export const ZOOM_IN_FACTOR = 0.8;
export const ZOOM_OUT_FACTOR = 1.25;
/** Which way each arrow key turns or moves the model, as [x, y]. */
export const ARROW_DIRECTIONS = {
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
};
/** Keyboard steps: degrees per arrow press, and pan distance as a share of the camera distance. */
export const ORBIT_STEP_DEGREES = 10;
export const PAN_STEP_RATIO = 0.05;
/** How the engine reports a decoder it couldn't download or start (Draco, STEP/IGES/BREP/FCStd, 3dm, IFC). */
export const DECODER_ERROR_MESSAGES = [
  'Failed to load draco decoder.',
  'Failed to load occt-import-js.',
  'Failed to load rhino3dm.',
  'Failed to load web-ifc.',
];
// Most canvases a WebKit page keeps for reuse by viewers created later. Browsers allow about 16 live WebGL contexts per
// page, so more would never be reused.
export const MAX_POOLED_CANVASES = 16;
// How long, in milliseconds, kept canvases wait for a new viewer before their contexts are released. Remounts and
// re-renders replace a viewer within moments; after this, nothing is held for a viewer that may never come.
export const POOL_IDLE_TIMEOUT = 10000;
