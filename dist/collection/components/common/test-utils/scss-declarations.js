import { readFileSync } from 'fs';
const stripComments = (source) => source.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/[^\n]*/g, '');
/** Splits a block body into the declarations and the nested blocks it owns directly. */
const parseBlock = (body) => {
  const declarations = {};
  const blocks = [];
  let pending = '';
  let depth = 0;
  let nestedStart = 0;
  for (let index = 0; index < body.length; index++) {
    const character = body[index];
    if (character === '{') {
      if (depth++ === 0)
        nestedStart = index + 1;
      continue;
    }
    if (character === '}') {
      if (--depth === 0) {
        blocks.push({ selector: pending.trim(), body: body.slice(nestedStart, index) });
        pending = '';
      }
      continue;
    }
    if (depth > 0)
      continue;
    if (character === ';') {
      const separator = pending.indexOf(':');
      if (separator !== -1) {
        declarations[pending.slice(0, separator).trim()] = pending.slice(separator + 1).trim();
      }
      pending = '';
      continue;
    }
    pending += character;
  }
  return { declarations, blocks };
};
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
export const scssDeclarations = (source, selectorPath) => {
  let scope = stripComments(source);
  for (const selector of selectorPath) {
    const match = parseBlock(scope).blocks.find(block => block.selector === selector);
    if (!match) {
      throw new Error(`SCSS block "${selectorPath.join(' > ')}" not found (missing "${selector}")`);
    }
    scope = match.body;
  }
  return parseBlock(scope).declarations;
};
export const readStyleSheet = (path) => readFileSync(path, 'utf8');
