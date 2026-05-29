/**
 * @file Tiptap v3 editor configuration for wpp-richtext
 * @description Replaces the Quill-based config.ts during WPPOPENDS-1287 migration.
 *   Configures all Tiptap extensions, the TurndownService (library-agnostic, carried over),
 *   and provides the `buildTiptapExtensions()` factory function.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 * @see https://tiptap.dev/docs/editor/getting-started/configuration
 */
import { type Extensions } from '@tiptap/core';
export { default as turndownService, quillMarkdownOptions } from './config';
/**
 * Default formats supported by the Tiptap editor, mapped from the Quill defaults.
 * Each format name maps to a Tiptap extension.
 */
export declare const TIPTAP_DEFAULT_FORMATS: readonly ["bold", "italic", "underline", "strike", "code", "link", "blockquote", "heading", "codeBlock", "bulletList", "orderedList", "listItem", "taskList", "taskItem", "textAlign", "image", "color", "textStyle", "table", "tableRow", "tableCell", "tableHeader", "typography", "placeholder", "characterCount", "fontSize", "video", "attachment"];
/** Toolbar alias definitions (matches existing Quill default module aliases) */
export declare const TIPTAP_DEFAULT_TOOLBAR_ALIASES: Record<string, string[]>;
export interface TiptapExtensionConfig {
  formats?: string[];
  placeholder?: string;
  charactersLimit?: number;
}
/**
 * Builds the array of Tiptap extensions based on component props.
 * Maps existing Quill format whitelist to Tiptap extensions.
 *
 * @param config - Component prop values to configure extensions
 * @returns Configured Tiptap extensions array
 */
export declare function buildTiptapExtensions(config: TiptapExtensionConfig): Extensions;
/**
 * Translates a Quill format name to its Tiptap equivalent.
 * Returns the original name if no mapping exists.
 */
export declare function translateQuillFormat(quillFormat: string): string;
