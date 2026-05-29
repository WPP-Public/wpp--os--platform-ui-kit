/**
 * @file Custom Attachment Node extension for Tiptap
 * @description Renders <a class="ql-attachment"> elements with data attributes
 *   (data-size, data-type, data-last-modified, download, title).
 *   Preserves attachment links from Quill-authored HTML.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Node } from '@tiptap/core';
export interface AttachmentOptions {
  HTMLAttributes: Record<string, unknown>;
}
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    attachment: {
      setAttachment: (options: {
        href: string;
        title?: string;
        download?: string;
        dataSize?: string;
        dataType?: string;
        dataLastModified?: string;
      }) => ReturnType;
    };
  }
}
export declare const TiptapAttachment: Node<AttachmentOptions, any>;
