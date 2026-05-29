/**
 * @file Tiptap v3 type definitions for wpp-richtext
 * @description Replaces/extends the Quill-based types.ts during WPPOPENDS-1287 migration.
 *   All types preserve backward compatibility with the existing public API.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
export const tiptapUploadTypes = ['image', 'video', 'attachment'];
export const TIPTAP_UPLOAD_REQUEST_EVENT = 'upload-request';
export const tiptapFormats = {
  html: 'html',
  text: 'text',
  json: 'json',
  markdown: 'markdown',
};
export const tiptapSources = {
  api: 'api',
  user: 'user',
  silent: 'silent',
};
