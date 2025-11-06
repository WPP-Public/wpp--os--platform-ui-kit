import { MediaDragElement, QuillInstance } from './types';
export declare function ignoreHistory(quill: QuillInstance, changes: () => void): void;
export declare const embedBlotInnerHtmlRegexp: RegExp;
export declare const exportHtml: (html: string) => string;
export declare function createDragThumbnail(node: MediaDragElement): MediaDragElement;
