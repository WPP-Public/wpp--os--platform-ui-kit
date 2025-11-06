import { h, F as Fragment } from './index-9177bb6d.js';
import { d as renderIcons } from './utils-d8896618.js';

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
    return h("img", { src: thumbnailUrl, alt: "File Thumbnail", class: "thumbnail-preview" });
  }
  switch (fileExtension) {
    // Text
    case '.txt':
      return h("wpp-icon-document-v2-22-0", null);
    // Compressed
    case '.zip':
    case '.rar':
    case '.7z':
      return h("wpp-icon-file-zip-v2-22-0", null);
    // Image
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.svg':
    case '.gif':
      return h("wpp-icon-image-v2-22-0", null);
    // Video
    case '.mp4':
    case '.mov':
    case '.avi':
    case '.wmv':
    case '.mkv':
    case '.flv':
    case '.webm':
      return h("wpp-icon-video-clip-v2-22-0", null);
    // Audio
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.wma':
    case '.m4a':
    case '.aac':
      return h("wpp-icon-music-v2-22-0", null);
    // Data
    case '.csv':
    case '.json':
    case '.xml':
    case '.db':
    case '.sqlite':
    case '.dat':
      return h("wpp-icon-database-v2-22-0", null);
    // Presentation
    case '.pptx':
    case '.key':
    case '.odp':
    case '.pdf':
    case '.pps':
    case '.sldx':
    case '.ppt':
      return h("wpp-icon-pitch-v2-22-0", null);
    // Spreadsheet
    case '.xlsx':
    case '.xls':
    case '.ods':
    case '.numbers':
    case '.tsv':
      return h("wpp-icon-spreadsheet-v2-22-0", null);
    //  * WPPOPENDS-512 WPPOPENDS-311
    // Adding an edge case to ensure inclusion
    // Extracting all the icon names from iconsList, to force register and prevent tree shaking during build
    case '.rtf':
      return h(Fragment, null, renderIcons());
    default:
      return h("wpp-icon-file-v2-22-0", null);
  }
};

export { EXTENSION_TO_TYPE as E, returnIconFromExtension as r };
