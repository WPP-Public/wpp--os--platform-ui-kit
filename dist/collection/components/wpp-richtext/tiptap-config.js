/**
 * @file Tiptap v3 editor configuration for wpp-richtext
 * @description Configures all Tiptap extensions and provides the
 *   `buildTiptapExtensions()` factory function.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 * @see https://tiptap.dev/docs/editor/getting-started/configuration
 */
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import Link from '@tiptap/extension-link';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import { Table } from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Typography from '@tiptap/extension-typography';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Markdown } from '@tiptap/markdown';
import { TiptapFontSize } from './extensions/tiptap-font-size';
import { TiptapVideo } from './extensions/tiptap-video';
import { TiptapImage } from './extensions/tiptap-image';
import { TiptapAttachment } from './extensions/tiptap-attachment';
import { TiptapIndent } from './extensions/tiptap-indent';
import { TiptapMarkdownFix } from './extensions/tiptap-markdown-fix';
import { TiptapMarkdownShortcuts } from './extensions/tiptap-markdown-shortcuts';
import { TiptapMarkdownPaste } from './extensions/tiptap-markdown-paste';
import { ListShiftEnter } from './extensions/tiptap-list-shift-enter';
/**
 * Default formats supported by the Tiptap editor, mapped from the Quill defaults.
 * Each format name maps to a Tiptap extension.
 */
export const TIPTAP_DEFAULT_FORMATS = [
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'link',
  'blockquote',
  'heading',
  'codeBlock',
  'hardBreak',
  'horizontalRule',
  'bulletList',
  'orderedList',
  'listItem',
  'listKeymap',
  'indent',
  'taskList',
  'taskItem',
  'textAlign',
  'image',
  'color',
  'textStyle',
  'table',
  'tableRow',
  'tableCell',
  'tableHeader',
  'typography',
  'placeholder',
  'characterCount',
  'fontSize',
  'video',
  'attachment',
];
/**
 * Mapping from legacy format names to Tiptap extension names.
 * Used to translate the consumer's `formats` prop.
 *
 * Only formats that have a corresponding Tiptap extension actually wired up
 * in `buildTiptapExtensions()` below are included. Unsupported legacy formats that
 * have no Tiptap equivalent here (e.g. `background`, `formula`, `script`)
 * are intentionally omitted so the whitelist translation never silently
 * promises support that the editor cannot deliver. If consumers pass an
 * unknown format name it falls through unchanged via `translateLegacyFormat`,
 * matching the previous "ignore unknowns" behaviour.
 */
const LEGACY_FORMAT_TO_TIPTAP_FORMAT_MAP = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strike: 'strike',
  code: 'code',
  link: 'link',
  blockquote: 'blockquote',
  header: 'heading',
  'code-block': 'codeBlock',
  list: 'bulletList',
  indent: 'listItem',
  align: 'textAlign',
  direction: 'textAlign',
  image: 'image',
  color: 'color',
  font: 'textStyle',
  size: 'textStyle',
  video: 'video',
  attachment: 'attachment',
};
const FORMAT_DEPENDENCIES = {
  bulletList: ['listItem', 'listKeymap'],
  orderedList: ['listItem', 'listKeymap'],
  list: ['bulletList', 'orderedList', 'listItem', 'listKeymap'],
  taskList: ['taskItem'],
  table: ['tableRow', 'tableCell', 'tableHeader'],
  color: ['textStyle'],
  fontSize: ['textStyle'],
  size: ['fontSize', 'textStyle'],
  indent: ['listItem', 'listKeymap'],
};
function resolveAllowedFormats(formats) {
  const resolvedFormats = new Set();
  const sourceFormats = formats.length > 0 ? formats : [...TIPTAP_DEFAULT_FORMATS];
  for (const format of sourceFormats) {
    const translatedFormat = LEGACY_FORMAT_TO_TIPTAP_FORMAT_MAP[format] || format;
    resolvedFormats.add(format);
    resolvedFormats.add(translatedFormat);
    FORMAT_DEPENDENCIES[format]?.forEach(dependency => resolvedFormats.add(dependency));
    FORMAT_DEPENDENCIES[translatedFormat]?.forEach(dependency => resolvedFormats.add(dependency));
  }
  return resolvedFormats;
}
function starterKitFormatOptions(allowedFormats) {
  return {
    blockquote: allowedFormats.has('blockquote') ? {} : false,
    bold: allowedFormats.has('bold') ? {} : false,
    bulletList: allowedFormats.has('bulletList') ? {} : false,
    code: allowedFormats.has('code') ? {} : false,
    codeBlock: allowedFormats.has('codeBlock') ? {} : false,
    hardBreak: allowedFormats.has('hardBreak') ? {} : false,
    heading: allowedFormats.has('heading') ? { levels: [1, 2, 3] } : false,
    horizontalRule: allowedFormats.has('horizontalRule') ? {} : false,
    italic: allowedFormats.has('italic') ? {} : false,
    listItem: allowedFormats.has('listItem') ? {} : false,
    listKeymap: allowedFormats.has('listKeymap') ? {} : false,
    link: false,
    orderedList: allowedFormats.has('orderedList') ? {} : false,
    strike: allowedFormats.has('strike') ? {} : false,
    underline: false,
  };
}
/** Toolbar alias definitions for legacy consumer aliases. */
export const TIPTAP_DEFAULT_TOOLBAR_ALIASES = {
  size: ['fontSize'],
  fontStyle: ['bold', 'italic', 'underline', 'strike'],
  textBlocks: ['codeBlock', 'blockquote'],
  lists: ['orderedList', 'bulletList', 'outdent', 'indent'],
  align: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
  embed: ['link'],
  undo: ['undo', 'redo'],
};
/**
 * Builds the array of Tiptap extensions based on component props.
 * Maps the existing format whitelist to Tiptap extensions.
 *
 * @param config - Component prop values to configure extensions
 * @returns Configured Tiptap extensions array
 */
export function buildTiptapExtensions(config) {
  const { formats = [], placeholder, charactersLimit } = config;
  // Translate legacy format names to Tiptap equivalents.
  const allowedFormats = resolveAllowedFormats(formats);
  const extensions = [];
  // StarterKit v3 bundles several user-facing formats. Keep the structural
  // editor essentials enabled, but gate bundled marks/nodes via `formats`.
  // Link and Underline stay disabled here and are added explicitly below.
  extensions.push(StarterKit.configure(starterKitFormatOptions(allowedFormats)));
  // Underline (not in StarterKit)
  if (allowedFormats.has('underline')) {
    // Override the default markdown serialization (`++text++`) to emit
    // raw HTML (`<u>text</u>`) so consumers downstream of `getMarkdown()`
    // get a portable, widely-supported representation. Round-trip back into
    // the editor still works because Underline.parseHTML() recognises `<u>`.
    extensions.push(Underline.extend({
      renderMarkdown(_node, helpers) {
        return `<u>${helpers.renderChildren(_node)}</u>`;
      },
    }));
  }
  // Text alignment
  if (allowedFormats.has('textAlign')) {
    extensions.push(TextAlign.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
    }));
  }
  // Links
  if (allowedFormats.has('link')) {
    extensions.push(Link.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: {
        rel: 'noopener noreferrer nofollow',
        target: '_blank',
      },
    }));
  }
  // Images (extended for width, height, ql-float-* classes)
  if (allowedFormats.has('image')) {
    extensions.push(TiptapImage.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: 'richtext-image',
      },
    }));
  }
  // Video
  if (allowedFormats.has('video')) {
    extensions.push(TiptapVideo);
  }
  // Attachment
  if (allowedFormats.has('attachment')) {
    extensions.push(TiptapAttachment);
  }
  // Text styling (color, font size)
  if (allowedFormats.has('textStyle') || allowedFormats.has('color') || allowedFormats.has('fontSize')) {
    extensions.push(TextStyle);
  }
  if (allowedFormats.has('color')) {
    extensions.push(Color);
  }
  // Tables
  if (allowedFormats.has('table')) {
    extensions.push(Table.configure({ resizable: true }), TableRow, TableCell, TableHeader);
  }
  // Task lists (GitHub-flavored markdown checkboxes)
  if (allowedFormats.has('taskList')) {
    extensions.push(TaskList, TaskItem.configure({
      nested: true,
    }));
  }
  // Typography (smart quotes, dashes, ellipsis)
  if (allowedFormats.has('typography')) {
    extensions.push(Typography);
  }
  // Markdown support — native parse/serialize via @tiptap/markdown
  // Replaces the custom processMarkdownValue()/Turndown pipeline
  extensions.push(Markdown);
  // Fixes for @tiptap/markdown integration bugs (must come after Markdown)
  extensions.push(TiptapMarkdownFix);
  // Paragraph/heading indentation
  if (allowedFormats.has('indent')) {
    extensions.push(TiptapIndent);
  }
  // Mid-word markdown shortcuts (bold/italic/strike) + horizontal rule input rule
  extensions.push(TiptapMarkdownShortcuts);
  // Pasted plain-text markdown (`# heading`, `> quote`, fenced code, links,
  // list items) is parsed by the MarkdownManager and converted to rich
  // content, matching the markdown paste behavior from the legacy editor.
  extensions.push(TiptapMarkdownPaste);
  // Shift+Enter inside lists splits into a new numbered/bulleted item (Quill parity)
  if (allowedFormats.has('bulletList') || allowedFormats.has('orderedList')) {
    extensions.push(ListShiftEnter);
  }
  // Font size (ql-size-* CSS classes)
  if (allowedFormats.has('fontSize') || allowedFormats.has('textStyle')) {
    extensions.push(TiptapFontSize);
  }
  // Placeholder
  if (placeholder) {
    extensions.push(Placeholder.configure({
      placeholder,
    }));
  }
  // Character count
  if (charactersLimit) {
    extensions.push(CharacterCount.configure({
      limit: null, // We handle limit display ourselves, don't hard-limit input
    }));
  }
  return extensions;
}
/**
 * Translates a legacy format name to its Tiptap equivalent.
 * Returns the original name if no mapping exists.
 */
export function translateLegacyFormat(format) {
  return LEGACY_FORMAT_TO_TIPTAP_FORMAT_MAP[format] || format;
}
