/**
 * @file Custom Video Node extension for Tiptap
 * @description Preserves <video> elements from Quill-authored HTML.
 *   Uses a NodeView wrapper with contenteditable="false" to ensure the video
 *   renders correctly (thumbnail + controls) inside a contenteditable editor.
 *   Supports src, controls, width, height attributes.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Node } from '@tiptap/core';
export interface VideoOptions {
  HTMLAttributes: Record<string, unknown>;
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    video: {
      setVideo: (options: {
        src: string;
        controls?: boolean;
        width?: number;
        height?: number;
      }) => ReturnType;
    };
  }
}
export declare const TiptapVideo: Node<VideoOptions, any>;
