import type { Quill as IQuill } from 'quill';
export * as extend from './extend';
export * as formats from './formats';
/**
 * Quill module that registers some new formats to enhance image editing.
 * Adds support for width, height and float attributes in Quill Delta and
 * HTML.
 *
 * For basic use, just register this class with Quill; its static register()
 * callback registers all supported formats and the module provides no other
 * functionality.
 *
 * For advanced use, you can skip registering the plugin; import the
 * formats directly from `formats` or `extend` and register them yourself
 * (potentially after providing tweaks or overrides).
 */
export declare class ImageFormats {
  static extendBlotNames: string[];
  static registered: boolean;
  constructor(quill: IQuill);
}
