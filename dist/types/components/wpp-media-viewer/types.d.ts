export type MediaViewerSize = {
  width: number | `${number}%`;
  height: number | `${number}%`;
};
/**
 * `free` rotates around the screen axes with no fixed up direction, so the model can be turned on all
 * three axes. `fixed-up` keeps the model's up axis vertical, like a turntable.
 */
export type MediaViewerNavigationMode = 'free' | 'fixed-up';
export interface MediaViewerControlPanelConfig {
  showUploadButton?: boolean;
  showZoomControls?: boolean;
  showFullscreenButton?: boolean;
}
export type MediaViewerStatus = 'empty' | 'loading' | 'loaded' | 'error';
export type MediaViewerErrorReason = 'no-importable-file' | 'failed-to-load' | 'import-failed' | 'decoder-failed' | 'unsupported-file' | 'file-too-large' | 'webgl-unavailable' | 'context-lost';
export interface MediaViewerLoadEventDetail {
  /** Names of the files that make up the loaded model, main file first. */
  fileNames: string[];
  meshCount: number;
  triangleCount: number;
}
export interface MediaViewerErrorEventDetail {
  reason: MediaViewerErrorReason;
  /** Names of the files involved, when the error concerns files. */
  fileNames: string[];
  /** The error in words, from `locales`: the same sentence the error state and the live region show. */
  message: string;
  /** The engine's own message, in English, for logging. Not meant for the UI. */
  details?: string;
  /** The engine's own error code, when it gave one. Shown after the message in the error state. */
  code?: number;
}
export interface MediaViewerZoomChangeEventDetail {
  /** The new zoom level, in percent of the fitted view. */
  zoom: number;
}
export interface MediaViewerFullscreenChangeEventDetail {
  isFullscreen: boolean;
}
export interface MediaViewerUploadEventDetail {
  /** The files the user picked or dropped. Call `preventDefault()` on the event to stop the viewer opening them. */
  files: File[];
}
export interface MediaViewerLocales {
  /** Accessible name of the 3D view with a model. `{fileName}` is replaced with the main file name. */
  viewportLabel: string;
  viewportEmptyLabel: string;
  keyboardInstructions: string;
  uploadToolbarLabel: string;
  uploadButtonLabel: string;
  zoomToolbarLabel: string;
  zoomOutButtonLabel: string;
  zoomInButtonLabel: string;
  /** Visible zoom level. `{value}` is replaced with the percentage. */
  zoomLevelText: string;
  /** Accessible name of the zoom level action, which resets the view. Keep `{value}` in it so the name contains the visible text. */
  zoomResetButtonLabel: string;
  fullscreenToolbarLabel: string;
  enterFullscreenButtonLabel: string;
  exitFullscreenButtonLabel: string;
  loadingAnnouncement: string;
  /** `{fileName}` is replaced with the main file name. */
  loadedAnnouncement: string;
  /** Heading of the error state. */
  errorTitle: string;
  /** The error with the engine's code appended. `{message}` and `{code}` are replaced. */
  errorWithCodeText: string;
  retryButtonLabel: string;
  noImportableFileError: string;
  failedToLoadError: string;
  importFailedError: string;
  decoderFailedError: string;
  /** `{fileNames}` is replaced with the rejected file names. */
  unsupportedFileError: string;
  /** `{fileNames}` and `{maxFileSize}` (MB) are replaced. */
  fileTooLargeError: string;
  webglUnavailableError: string;
  contextLostError: string;
}
