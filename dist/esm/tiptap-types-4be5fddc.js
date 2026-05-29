/**
 * @file Tiptap v3 type definitions for wpp-richtext
 * @description Replaces/extends the Quill-based types.ts during WPPOPENDS-1287 migration.
 *   All types preserve backward compatibility with the existing public API.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const tiptapUploadTypes = ['image', 'video', 'attachment'];
const TIPTAP_UPLOAD_REQUEST_EVENT = 'upload-request';
const tiptapFormats = {
  html: 'html',
  text: 'text',
  json: 'json',
  markdown: 'markdown',
};
const tiptapSources = {
  api: 'api',
  user: 'user',
  silent: 'silent',
};

export { TIPTAP_UPLOAD_REQUEST_EVENT as T, tiptapFormats as a, tiptapSources as b, tiptapUploadTypes as t };
