import { MediaViewerControlPanelConfig, MediaViewerLocales, MediaViewerSize } from './types';
export declare const LOCALES_DEFAULTS: MediaViewerLocales;
export declare const DEFAULT_SIZE: MediaViewerSize;
export declare const DEFAULT_CONTROL_PANEL_CONFIG: Required<MediaViewerControlPanelConfig>;
/**
 * 3D formats the engine opens without downloading anything, plus the files they reference (glTF buffers,
 * OBJ materials, textures). SVG is left out: the 2D image viewer will handle it. STEP, IGES, BREP, IFC, 3dm
 * and FCStd also work, but they load their decoders from cdn.jsdelivr.net, so devs opt in to them explicitly.
 */
export declare const DEFAULT_ACCEPTED_FILE_EXTENSIONS: string[];
/** Zoom level bounds, in percent of the fitted view. */
export declare const MIN_ZOOM = 25;
export declare const MAX_ZOOM = 800;
/** Camera distance multipliers for one zoom step. */
export declare const ZOOM_IN_FACTOR = 0.8;
export declare const ZOOM_OUT_FACTOR = 1.25;
/** Which way each arrow key turns or moves the model, as [x, y]. */
export declare const ARROW_DIRECTIONS: Record<string, [number, number]>;
/** Keyboard steps: degrees per arrow press, and pan distance as a share of the camera distance. */
export declare const ORBIT_STEP_DEGREES = 10;
export declare const PAN_STEP_RATIO = 0.05;
/** How the engine reports a decoder it couldn't download or start (Draco, STEP/IGES/BREP/FCStd, 3dm, IFC). */
export declare const DECODER_ERROR_MESSAGES: string[];
export declare const MAX_POOLED_CANVASES = 16;
export declare const POOL_IDLE_TIMEOUT = 10000;
