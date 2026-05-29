import { default as _Quill } from 'quill';
export const Quill = _Quill;
/**
 * Debug levels for the richtext component. Controls verbosity of internal
 * console output. Set via the `debug` prop on `wpp-richtext`.
 *
 * - `error` — only errors
 * - `warn`  — errors + warnings (default)
 * - `log`   — errors + warnings + general logs
 * - `info`  — everything (most verbose)
 */
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
