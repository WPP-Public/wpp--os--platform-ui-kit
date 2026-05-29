/**
 * @file Custom indent extension for Tiptap paragraph indentation
 * @description Adds indent/outdent support for paragraphs (non-list content).
 *   Quill supported paragraph indentation via indent classes. This extension
 *   adds an `indent` attribute to Paragraph nodes and renders it as margin-left.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Extension } from '@tiptap/core';
export interface IndentOptions {
  types: string[];
  minLevel: number;
  maxLevel: number;
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    indent: {
      increaseIndent: () => ReturnType;
      decreaseIndent: () => ReturnType;
    };
  }
}
export declare const TiptapIndent: Extension<IndentOptions, any>;
