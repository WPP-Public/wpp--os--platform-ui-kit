import type Parchment from 'parchment';
type EmbedBlot = typeof Parchment.Embed;
/**
 * Creates a class that extends Quill's built-in Image format
 * (or a derived class) with functionality to recognize and
 * apply additional formats known to this package.
 *
 * Relies on the base-class implementation for width and height,
 * so it may break if inheritance is not properly preserved, i.e.
 * if another module completely overrides Image.
 *
 * To avoid import-ordering issues, this is a class factory
 * instead of a statically defined class.
 */
export declare function extendBlot(Blot: EmbedBlot): EmbedBlot;
export declare function extendBlotNames(blotNames: string[]): void;
export {};
