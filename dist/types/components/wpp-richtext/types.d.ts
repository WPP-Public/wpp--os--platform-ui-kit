import type { ValuesOf } from '../../types/utils';
import { type TiptapRichtextLocales, type TiptapRichtextValue, type TiptapSources, type TiptapUploadCallbackItem, type TiptapUploadTypes } from './tiptap-types';
export type RichtextValue = TiptapRichtextValue;
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
export declare const sources: {
  readonly api: "api";
  readonly user: "user";
  readonly silent: "silent";
};
export type Sources = TiptapSources;
export type RichtextLocales = TiptapRichtextLocales;
export declare const richtextUploadTypes: readonly ["image", "video", "attachment"];
export declare const RICHTEXT_UPLOAD_REQUEST_EVENT = "upload-request";
export type RichtextUploadTypes = TiptapUploadTypes;
export type RichtextUploadCallbackItem = TiptapUploadCallbackItem;
