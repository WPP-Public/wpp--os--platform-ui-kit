import { TIPTAP_UPLOAD_REQUEST_EVENT, tiptapSources, tiptapUploadTypes, } from './tiptap-types';
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
export const sources = tiptapSources;
export const richtextUploadTypes = tiptapUploadTypes;
export const RICHTEXT_UPLOAD_REQUEST_EVENT = TIPTAP_UPLOAD_REQUEST_EVENT;
