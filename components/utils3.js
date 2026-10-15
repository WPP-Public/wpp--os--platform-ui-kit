import { z as isMimeAccepted } from './utils.js';
import { h } from '@stencil/core/internal/client';

const EXTENSION_TO_TYPE = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  xls: 'application/vnd.ms-excel',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  ppt: 'application/vnd.ms-powerpoint',
  pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  txt: 'text/plain',
  csv: 'text/csv',
  html: 'text/html',
  xml: 'application/xml',
  json: 'application/json',
  png: 'image/png',
  webp: 'image/webp',
  heic: 'image/heic',
  heif: 'image/heif',
  avif: 'image/avif',
  jpg: 'image/jpg',
  jpeg: 'image/jpeg',
  gif: 'image/gif',
  bmp: 'image/bmp',
  tiff: 'image/tiff',
  svg: 'image/svg+xml',
  mp3: 'audio/mpeg',
  wav: 'audio/wav',
  ogg: 'audio/ogg',
  mp4: 'video/mp4',
  avi: 'video/x-msvideo',
  mov: 'video/quicktime',
  wmv: 'video/x-ms-wmv',
  flv: 'video/x-flv',
  rar: 'application/x-rar-compressed',
  zip: 'application/zip',
  '7z': 'application/x-7z-compressed',
  tar: 'application/x-tar',
  gz: 'application/gzip',
  bz2: 'application/x-bzip2',
  exe: 'application/x-msdownload',
  dmg: 'application/x-apple-diskimage',
  apk: 'application/vnd.android.package-archive',
  iso: 'application/x-iso9660-image',
  css: 'text/css',
  js: 'application/javascript',
  woff: 'application/font-woff',
  woff2: 'application/font-woff2',
  ttf: 'application/font-sfnt',
  otf: 'application/font-sfnt',
  eot: 'application/vnd.ms-fontobject',
  rtf: 'application/rtf',
  ics: 'text/calendar',
  jsonld: 'application/ld+json',
  key: 'application/x-iwork-keynote-sffkey',
};
const returnIconFromExtension = (fileExtension, thumbnailUrl) => {
  if (thumbnailUrl) {
    return h("img", { src: thumbnailUrl, alt: "File Thumbnail", class: "thumbnail-preview" });
  }
  switch (fileExtension) {
    // Text
    case '.txt':
      return h("wpp-icon-document-v4-5-0", null);
    // Compressed
    case '.zip':
    case '.rar':
    case '.7z':
      return h("wpp-icon-file-zip-v4-5-0", null);
    // Image
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.svg':
    case '.gif':
      return h("wpp-icon-image-v4-5-0", null);
    // Video
    case '.mp4':
    case '.mov':
    case '.avi':
    case '.wmv':
    case '.mkv':
    case '.flv':
    case '.webm':
      return h("wpp-icon-video-clip-v4-5-0", null);
    // Audio
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.wma':
    case '.m4a':
    case '.aac':
      return h("wpp-icon-music-v4-5-0", null);
    // Data
    case '.csv':
    case '.json':
    case '.xml':
    case '.db':
    case '.sqlite':
    case '.dat':
      return h("wpp-icon-database-v4-5-0", null);
    // Presentation
    case '.pptx':
    case '.key':
    case '.odp':
    case '.pps':
    case '.sldx':
    case '.ppt':
      return h("wpp-icon-pitch-v4-5-0", null);
    // Spreadsheet
    case '.xlsx':
    case '.xls':
    case '.ods':
    case '.numbers':
    case '.tsv':
      return h("wpp-icon-spreadsheet-v4-5-0", null);
    default:
      return h("wpp-icon-file-v4-5-0", null);
  }
};
/**
 * Maps a file extension to a human-readable file type category label.
 * Used as the subtitle in the chat variant of `wpp-file-upload-item`.
 */
const returnFileTypeLabel = (fileExtension) => {
  switch (fileExtension.toLowerCase()) {
    case '.txt':
      return 'Text';
    case '.zip':
    case '.rar':
    case '.7z':
      return 'Zip';
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.svg':
    case '.gif':
      return 'Image';
    case '.mp4':
    case '.mov':
    case '.avi':
    case '.wmv':
    case '.mkv':
    case '.flv':
    case '.webm':
      return 'Video';
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.wma':
    case '.m4a':
    case '.aac':
      return 'Audio';
    case '.csv':
    case '.json':
    case '.xml':
    case '.db':
    case '.sqlite':
    case '.dat':
      return 'Data';
    case '.pptx':
    case '.key':
    case '.odp':
    case '.pps':
    case '.sldx':
    case '.ppt':
      return 'Presentation';
    case '.xlsx':
    case '.xls':
    case '.ods':
    case '.numbers':
    case '.tsv':
      return 'Spreadsheet';
    default:
      return 'Document';
  }
};
const LOCALES_DEFAULTS = {
  label: 'Choose a file',
  text: 'to upload or drag it here',
  info: (accept, size) => `Only ${accept} file at ${size} MB or less`,
  infoAnyFormat: (size) => `Any file at ${size} MB or less`,
  acceptFamilyLabels: {
    'image/*': 'image',
    'video/*': 'video',
    'audio/*': 'audio',
    'text/*': 'text',
  },
  sizeError: 'File exceeds size limit',
  formatError: 'Wrong format',
  singleFileLimitError: 'Only one file is allowed',
  multipleFileLimitError: 'File limit has been reached',
  fileAdded: (fileName) => `${fileName} added`,
  fileRemoved: (fileName) => `${fileName} removed`,
  removeFile: (fileName) => `Remove file ${fileName}`,
  uploadProgress: (fileName) => `Processing ${fileName}`,
  processingComplete: (fileName) => `${fileName} processed`,
  processingFailed: (fileName, error) => `${fileName} failed: ${error}`,
};

const convertMBToBytes = (size) => size * 1024 ** 2;
const getExtension = (filename = '') => `.${filename.split('.').pop()}`;
const getExtensionsList = (acceptConfig) => Object.entries(acceptConfig).reduce((acc, [_, extensions]) => [...acc, ...extensions], []);
/**
 * MIME type implied by a file's extension, or '' when the extension is unknown.
 *
 * `EXTENSION_TO_TYPE` is keyed without the leading dot, while `getExtension` returns one, so the
 * dot is stripped here. Doing it in a single helper keeps file-upload and chat-input from drifting
 * apart on the lookup again.
 */
const inferTypeFromName = (fileName = '') => EXTENSION_TO_TYPE[getExtension(fileName).slice(1).toLowerCase()] ?? '';
/**
 * Tokens for the native `accept` attribute, one entry at a time.
 *
 * An entry that lists extensions contributes those extensions, because they are the narrower
 * filter and the picker has to agree with validation. An entry with no extensions contributes its
 * own key, which is the only way a wildcard family can reach the picker at all.
 */
const getAcceptTokens = (acceptConfig) => Object.entries(acceptConfig).flatMap(([mimeType, extensions]) => (extensions?.length ? extensions : [mimeType]));
/**
 * Human-readable version of the accept tokens for the dropzone hint.
 *
 * Wildcard families have no extension to show, so they resolve through the locale map. The lookup
 * falls back per key rather than through `mergeLocales`, which is a shallow spread and would drop
 * the untouched families the moment a consumer overrides one of them.
 */
const getAcceptLabels = (acceptConfig, familyLabels = {}, defaultFamilyLabels = {}) => getAcceptTokens(acceptConfig).map(token => {
  if (!token.endsWith('/*'))
    return token;
  const key = token.toLowerCase();
  return familyLabels[key] ?? defaultFamilyLabels[key] ?? token;
});
/**
 * Whether the configuration puts no restriction on the file at all.
 *
 * True for an absent or empty config, and for a match-everything entry that lists no extensions.
 * A match-everything entry that DOES list extensions is not unrestricted - they still narrow it.
 */
const acceptsAnyFile = (acceptConfig) => {
  if (!acceptConfig || !Object.keys(acceptConfig).length)
    return true;
  return Object.entries(acceptConfig).some(([pattern, extensions]) => pattern.trim() === '*/*' && !extensions?.length);
};
/**
 * Whether a file satisfies the accept configuration.
 *
 * Entries are a union - the file only has to satisfy one of them - while a single entry is an
 * intersection: a file must match the entry's type AND carry one of its extensions, which is what
 * the exact-MIME entries have always meant.
 *
 * A file the browser gave no type for is additionally matched against the union of every listed
 * extension. That fallback predates wildcard support and is keyed off the browser's silence rather
 * than off inference failing, because inference can succeed and still not help: `.jpg` resolves to
 * `image/jpg`, which matches neither `image/png` nor `image/jpeg`. Dropping the fallback in that
 * case would reject files that are accepted today.
 *
 * The fallback deliberately does NOT apply to a file the browser did type, so a typed `image/jpeg`
 * named `report.pdf` stays rejected under a config that lists `.pdf` for `application/pdf`.
 */
const isFileAccepted = (file, acceptConfig) => {
  const entries = Object.entries(acceptConfig);
  if (!entries.length)
    return true;
  const extension = getExtension(file.name).toLowerCase();
  const mimeType = (file.type || inferTypeFromName(file.name)).toLowerCase();
  // Deliberately not short-circuited on an empty type: the match-everything pattern accepts a file
  // the browser could not type, and only isMimeAccepted knows that.
  const matchesConfiguredType = entries.some(([pattern, extensions]) => {
    if (!isMimeAccepted(mimeType, [pattern]))
      return false;
    return extensions?.length ? extensions.map(value => value.toLowerCase()).includes(extension) : true;
  });
  if (matchesConfiguredType)
    return true;
  if (file.type)
    return false;
  return getExtensionsList(acceptConfig)
    .map(value => value.toLowerCase())
    .includes(extension);
};
const getBaseName = (fileName = '') => fileName.split('.')[0];
const renameFile = (file, newFileName) => new File([file], newFileName, { type: file.type });
const modifyPropertiesOnFile = (file, properties) => new File([file], file.name, { ...properties });
/**
 * Stable identity for a file item.
 *
 * A consumer-supplied `uid` always wins. Otherwise the key is derived from the
 * file's content so that it survives both a status change and a controlled
 * consumer handing back a freshly-built object with the same contents. It
 * deliberately does NOT include the file's position in the list, because a
 * position-derived key remounts the item whenever the list reorders.
 */
const getFileKey = (file) => {
  if (file.uid)
    return file.uid;
  // Deliberately derived only from fields nothing can rewrite mid-flight. `url`
  // is excluded on purpose: a processor may set it, which would change the key
  // of a file while its own processor is still running and orphan it.
  return `${file.name}|${file.size}|${file.lastModified ?? ''}`;
};
/** Clamps a progress value to 0-100 and rounds it to a whole number. */
const normaliseProgress = (progress) => Math.round(Math.min(100, Math.max(0, progress)));

export { LOCALES_DEFAULTS as L, inferTypeFromName as a, getBaseName as b, convertMBToBytes as c, getExtension as d, getAcceptTokens as e, getAcceptLabels as f, getFileKey as g, acceptsAnyFile as h, isFileAccepted as i, returnIconFromExtension as j, returnFileTypeLabel as k, modifyPropertiesOnFile as m, normaliseProgress as n, renameFile as r };
