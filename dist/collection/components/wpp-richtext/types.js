import { default as _Quill } from 'quill';
export const Quill = _Quill;
export const debugLevels = {
  error: 'error',
  warn: 'warn',
  log: 'log',
  info: 'info',
};
export const formats = {
  html: 'html',
  text: 'text',
  json: 'json',
  markdown: 'markdown',
};
export const sources = {
  api: 'api',
  user: 'user',
  silent: 'silent',
};
export { uploadTypes as richtextUploadTypes, UPLOAD_REQUEST_EVENT as RICHTEXT_UPLOAD_REQUEST_EVENT, } from './plugins/quill-upload/types';
