'use strict';

const index = require('./index-ecf423ba.js');

const convertMBToBytes = (size) => size * 1024 ** 2;
const getExtension = (filename = '') => `.${filename.split('.').pop()}`;
const getExtensionsList = (acceptConfig) => Object.entries(acceptConfig).reduce((acc, [_, extensions]) => [...acc, ...extensions], []);
const getBaseName = (fileName = '') => fileName.split('.')[0];
const renameFile = (file, newFileName) => new File([file], newFileName, { type: file.type });
const modifyPropertiesOnFile = (file, properties) => new File([file], file.name, { ...properties });

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
    return index.h("img", { src: thumbnailUrl, alt: "File Thumbnail", class: "thumbnail-preview" });
  }
  switch (fileExtension) {
    // Text
    case '.txt':
      return index.h("wpp-icon-document-v3-4-0", null);
    // Compressed
    case '.zip':
    case '.rar':
    case '.7z':
      return index.h("wpp-icon-file-zip-v3-4-0", null);
    // Image
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.svg':
    case '.gif':
      return index.h("wpp-icon-image-v3-4-0", null);
    // Video
    case '.mp4':
    case '.mov':
    case '.avi':
    case '.wmv':
    case '.mkv':
    case '.flv':
    case '.webm':
      return index.h("wpp-icon-video-clip-v3-4-0", null);
    // Audio
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.wma':
    case '.m4a':
    case '.aac':
      return index.h("wpp-icon-music-v3-4-0", null);
    // Data
    case '.csv':
    case '.json':
    case '.xml':
    case '.db':
    case '.sqlite':
    case '.dat':
      return index.h("wpp-icon-database-v3-4-0", null);
    // Presentation
    case '.pptx':
    case '.key':
    case '.odp':
    case '.pdf':
    case '.pps':
    case '.sldx':
    case '.ppt':
      return index.h("wpp-icon-pitch-v3-4-0", null);
    // Spreadsheet
    case '.xlsx':
    case '.xls':
    case '.ods':
    case '.numbers':
    case '.tsv':
      return index.h("wpp-icon-spreadsheet-v3-4-0", null);
    default:
      return index.h("wpp-icon-file-v3-4-0", null);
  }
};
const LOCALES_DEFAULTS = {
  label: 'Choose a file',
  text: 'to upload or drag it here',
  info: (accept, size) => `Only ${accept} file at ${size} MB or less`,
  sizeError: 'File exceeds size limit',
  formatError: 'Wrong format',
  singleFileLimitError: 'Only one file is allowed',
  multipleFileLimitError: 'File limit has been reached',
};

exports.EXTENSION_TO_TYPE = EXTENSION_TO_TYPE;
exports.LOCALES_DEFAULTS = LOCALES_DEFAULTS;
exports.convertMBToBytes = convertMBToBytes;
exports.getBaseName = getBaseName;
exports.getExtension = getExtension;
exports.getExtensionsList = getExtensionsList;
exports.modifyPropertiesOnFile = modifyPropertiesOnFile;
exports.renameFile = renameFile;
exports.returnIconFromExtension = returnIconFromExtension;
