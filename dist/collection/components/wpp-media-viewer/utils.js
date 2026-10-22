/** Replaces each `{name}` placeholder in a locale string with its value. */
export const fillTemplate = (template, values) => Object.entries(values).reduce((text, [name, value]) => text.split(`{${name}}`).join(String(value)), template);
export const fileNameFromUrl = (url) => {
  const path = url.split(/[?#]/)[0];
  return decodeURIComponent(path.substring(path.lastIndexOf('/') + 1));
};
export const fileExtension = (fileName) => {
  const dot = fileName.lastIndexOf('.');
  return dot === -1 ? '' : fileName.substring(dot + 1).toLowerCase();
};
/** A size prop value as CSS: a number is pixels, a string is used as written. */
export const toCssLength = (value) => (typeof value === 'number' ? `${value}px` : value);
export const ERROR_LOCALE_KEYS = {
  'no-importable-file': 'noImportableFileError',
  'failed-to-load': 'failedToLoadError',
  'import-failed': 'importFailedError',
  'decoder-failed': 'decoderFailedError',
  'unsupported-file': 'unsupportedFileError',
  'file-too-large': 'fileTooLargeError',
  'webgl-unavailable': 'webglUnavailableError',
  'context-lost': 'contextLostError',
};
