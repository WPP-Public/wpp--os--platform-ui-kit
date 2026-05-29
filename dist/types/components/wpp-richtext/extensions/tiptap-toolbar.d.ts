/**
 * @file Tiptap toolbar command mapping for wpp-richtext
 * @description Maps toolbar button names to Tiptap editor commands.
 *   Replaces plugins/wpp-quill-toolbar/ which provided alias resolution.
 *   Tiptap is headless — the toolbar DOM stays in the component template.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import type { Editor } from '@tiptap/core';
export interface ToolbarAction {
  /** Command identifier */
  name: string;
  /** Display label */
  label: string;
  /** Whether this format is currently active at the selection */
  isActive: (editor: Editor) => boolean;
  /** Execute the command */
  execute: (editor: Editor, value?: unknown) => void;
  /** Group this action belongs to */
  group: string;
}
/**
 * Returns whether a particular format is active at the current selection.
 */
export declare function isFormatActive(editor: Editor, name: string, attrs?: Record<string, unknown>): boolean;
/**
 * Executes a toolbar command on the editor.
 */
export declare function executeToolbarCommand(editor: Editor, name: string, value?: unknown): void;
/**
 * Resolves toolbar alias groups (matching the Quill config pattern).
 * Returns flat array of action names from alias definitions.
 */
export declare function resolveToolbarAliases(container: (string | Record<string, unknown>)[], aliases: Record<string, (string | Record<string, unknown>)[]>): string[];
/**
 * Map of all available toolbar actions with their metadata.
 */
export declare const TOOLBAR_ACTIONS: ToolbarAction[];
