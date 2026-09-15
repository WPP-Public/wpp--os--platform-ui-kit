/** The declarations of a single SCSS block, e.g. `{ height: '32px', padding: '4px 10px' }`. */
export type Declarations = Record<string, string>;
/**
 * Reads the declarations of a nested SCSS block, addressed by its selector path. Each step of the
 * path must be a direct child of the previous one.
 *
 * Spec pages do not apply scoped CSS, so box-model regressions cannot be caught through the
 * rendered DOM. Reading the stylesheet is the next best thing, and walking the selector path keeps
 * the assertions independent of whitespace and of how the rest of the file is ordered.
 *
 * @example scssDeclarations(styles, [':host', '.anchor', '&.size-s']) // => { height: '32px', ... }
 */
export declare const scssDeclarations: (source: string, selectorPath: string[]) => Declarations;
export declare const readStyleSheet: (path: string) => string;
