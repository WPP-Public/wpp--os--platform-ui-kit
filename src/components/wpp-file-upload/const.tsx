import { h } from '@stencil/core'
import { FileUploadLocales } from './types'

export const EXTENSION_TO_TYPE: { [key: string]: string } = {
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
}

export const returnIconFromExtension = (fileExtension: string, thumbnailUrl: string | null) => {
  if (thumbnailUrl) {
    return <img src={thumbnailUrl} alt="File Thumbnail" class="thumbnail-preview" />
  }

  switch (fileExtension) {
    // Text
    case '.txt':
      return <wpp-icon-document />

    // Compressed
    case '.zip':
    case '.rar':
    case '.7z':
      return <wpp-icon-file-zip />

    // Image
    case '.png':
    case '.jpg':
    case '.jpeg':
    case '.svg':
    case '.gif':
      return <wpp-icon-image />

    // Video
    case '.mp4':
    case '.mov':
    case '.avi':
    case '.wmv':
    case '.mkv':
    case '.flv':
    case '.webm':
      return <wpp-icon-video-clip />

    // Audio
    case '.mp3':
    case '.wav':
    case '.ogg':
    case '.wma':
    case '.m4a':
    case '.aac':
      return <wpp-icon-music />

    // Data
    case '.csv':
    case '.json':
    case '.xml':
    case '.db':
    case '.sqlite':
    case '.dat':
      return <wpp-icon-database />

    // Presentation
    case '.pptx':
    case '.key':
    case '.odp':
    case '.pdf':
    case '.pps':
    case '.sldx':
    case '.ppt':
      return <wpp-icon-pitch />

    // Spreadsheet
    case '.xlsx':
    case '.xls':
    case '.ods':
    case '.numbers':
    case '.tsv':
      return <wpp-icon-spreadsheet />

    default:
      return <wpp-icon-file />
  }
}

export const LOCALES_DEFAULTS: FileUploadLocales = {
  label: 'Choose a file',
  text: 'to upload or drag it here',
  info: (accept: string, size: number) => `Only ${accept} file at ${size} MB or less`,
  sizeError: 'File exceeds size limit',
  formatError: 'Wrong format',
  singleFileLimitError: 'Only one file is allowed',
  multipleFileLimitError: 'File limit has been reached',
}
