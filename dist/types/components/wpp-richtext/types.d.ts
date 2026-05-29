import { default as _Quill, RangeStatic, Sources as QuillSources } from 'quill';
import type { ValuesOf } from '../../types/utils';
export declare const Quill: typeof _Quill & {
  DEFAULTS: Record<string, any>;
};
export type QuillInstance = _Quill & {
  clipboard?: any;
  history?: any;
  editor?: any;
  selection?: any;
  theme?: any;
  emitter?: any;
  wppRichtext?: any;
};
export type RichtextValue = string;
/**
 * Debug levels for the richtext component. Controls verbosity of internal
 * console output. Set via the `debug` prop on `wpp-richtext`.
 *
 * - `error` — only errors
 * - `warn`  — errors + warnings (default)
 * - `log`   — errors + warnings + general logs
 * - `info`  — everything (most verbose)
 */
export declare const debugLevels: {
  readonly error: "error";
  readonly warn: "warn";
  readonly log: "log";
  readonly info: "info";
};
export type DebugLevels = ValuesOf<typeof debugLevels>;
export declare const formats: {
  html: string;
  text: string;
  json: string;
  markdown: string;
};
export type Formats = ValuesOf<typeof formats>;
export declare const sources: Record<string, QuillSources>;
export type Sources = ValuesOf<typeof sources>;
/**
 * @deprecated Use TiptapChangeEventDetail from './tiptap-types' instead.
 * These Quill-based interfaces are kept only for internal legacy plugin compatibility.
 * The backward-compatible aliases for consumers are in tiptap-types.ts.
 */
export interface QuillChangeEventDetail {
  editor: QuillInstance;
  value: RichtextValue;
  source: Sources;
  name?: string;
  plainText?: string;
}
/** @deprecated Use TiptapSelectionChangeEventDetail from './tiptap-types' instead. */
export interface QuillSelectionChangeEventDetail {
  editor: QuillInstance;
  range: RangeStatic;
  oldRange: RangeStatic;
  source: Sources;
}
export interface RichtextLocales {
  charactersEntered: string;
}
export { uploadTypes as richtextUploadTypes, UPLOAD_REQUEST_EVENT as RICHTEXT_UPLOAD_REQUEST_EVENT, } from './plugins/quill-upload/types';
export type { UploadTypes as RichtextUploadTypes, UploadCallbackItem as RichtextUploadCallbackItem, } from './plugins/quill-upload/types';
export type MediaDragElement = HTMLImageElement | HTMLVideoElement;
