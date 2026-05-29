/**
 * @file Tiptap toolbar command mapping for wpp-richtext
 * @description Maps toolbar button names to Tiptap editor commands.
 *   Replaces plugins/wpp-quill-toolbar/ which provided alias resolution.
 *   Tiptap is headless — the toolbar DOM stays in the component template.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
/**
 * Returns whether a particular format is active at the current selection.
 */
export function isFormatActive(editor, name, attrs) {
  switch (name) {
    case 'bold':
      return editor.isActive('bold');
    case 'italic':
      return editor.isActive('italic');
    case 'underline':
      return editor.isActive('underline');
    case 'strike':
      return editor.isActive('strike');
    case 'heading1':
      return editor.isActive('heading', { level: 1 });
    case 'heading2':
      return editor.isActive('heading', { level: 2 });
    case 'heading3':
      return editor.isActive('heading', { level: 3 });
    case 'blockquote':
      return editor.isActive('blockquote');
    case 'codeBlock':
    case 'code-block':
      return editor.isActive('codeBlock');
    case 'orderedList':
    case 'ordered':
      return editor.isActive('orderedList');
    case 'bulletList':
    case 'bullet':
      return editor.isActive('bulletList');
    case 'link':
      return editor.isActive('link');
    case 'alignLeft':
      // The TextAlign extension treats `left` as the implicit default and
      // does not write the attribute on the DOM node, so a fresh paragraph
      // never matches `{ textAlign: 'left' }` strictly. Treat absence of any
      // explicit alignment as "left active" so the toolbar reflects reality.
      return (editor.isActive({ textAlign: 'left' }) ||
        (!editor.isActive({ textAlign: 'center' }) &&
          !editor.isActive({ textAlign: 'right' }) &&
          !editor.isActive({ textAlign: 'justify' })));
    case 'alignCenter':
      return editor.isActive({ textAlign: 'center' });
    case 'alignRight':
      return editor.isActive({ textAlign: 'right' });
    case 'alignJustify':
      return editor.isActive({ textAlign: 'justify' });
    case 'fontSize':
      return editor.isActive('fontSize');
    default:
      return attrs ? editor.isActive(name, attrs) : editor.isActive(name);
  }
}
/**
 * Executes a toolbar command on the editor.
 */
export function executeToolbarCommand(editor, name, value) {
  const chain = editor.chain().focus();
  switch (name) {
    case 'bold':
      chain.toggleBold().run();
      break;
    case 'italic':
      chain.toggleItalic().run();
      break;
    case 'underline':
      chain.toggleUnderline().run();
      break;
    case 'strike':
      chain.toggleStrike().run();
      break;
    case 'heading1':
      chain.toggleHeading({ level: 1 }).run();
      break;
    case 'heading2':
      chain.toggleHeading({ level: 2 }).run();
      break;
    case 'heading3':
      chain.toggleHeading({ level: 3 }).run();
      break;
    case 'blockquote':
      chain.toggleBlockquote().run();
      break;
    case 'codeBlock':
    case 'code-block':
      chain.toggleCodeBlock().run();
      break;
    case 'orderedList':
    case 'ordered':
      chain.toggleOrderedList().run();
      break;
    case 'bulletList':
    case 'bullet':
      chain.toggleBulletList().run();
      break;
    case 'link': {
      if (editor.isActive('link')) {
        chain.unsetLink().run();
      }
      else if (typeof value === 'string') {
        chain.setLink({ href: value }).run();
      }
      break;
    }
    case 'image':
      // Image insertion is handled by the upload flow — this is a no-op trigger
      break;
    case 'alignLeft':
      chain.setTextAlign('left').run();
      break;
    case 'alignCenter':
      chain.setTextAlign('center').run();
      break;
    case 'alignRight':
      chain.setTextAlign('right').run();
      break;
    case 'alignJustify':
      chain.setTextAlign('justify').run();
      break;
    case 'indent':
      // Try list indent first; fall back to paragraph indent
      if (!chain.sinkListItem('listItem').run()) {
        editor.chain().focus().increaseIndent().run();
      }
      break;
    case 'outdent':
      if (!chain.liftListItem('listItem').run()) {
        editor.chain().focus().decreaseIndent().run();
      }
      break;
    case 'undo':
      chain.undo().run();
      break;
    case 'redo':
      chain.redo().run();
      break;
    case 'clean':
      chain.clearNodes().unsetAllMarks().run();
      break;
    case 'fontSize':
      // fontSize is handled by the picker, not a toggle button
      if (typeof value === 'string' && value) {
        ;
        editor.commands.setFontSize(value);
      }
      else {
        ;
        editor.commands.unsetFontSize();
      }
      break;
    default:
      console.warn(`[wpp-richtext] Unknown toolbar command: "${name}"`);
  }
}
/**
 * Resolves toolbar alias groups (matching the Quill config pattern).
 * Returns flat array of action names from alias definitions.
 */
export function resolveToolbarAliases(container, aliases) {
  const resolved = [];
  for (const item of container) {
    if (typeof item === 'string' && aliases[item]) {
      // Expand alias
      for (const aliasItem of aliases[item]) {
        if (typeof aliasItem === 'string') {
          resolved.push(aliasItem);
        }
        else {
          // Object items like { list: 'ordered' } — extract the value
          const entries = Object.entries(aliasItem);
          for (const [key, val] of entries) {
            if (typeof val === 'string') {
              resolved.push(`${key}-${val}`);
            }
            else {
              resolved.push(key);
            }
          }
        }
      }
    }
    else if (typeof item === 'string') {
      resolved.push(item);
    }
  }
  return resolved;
}
/**
 * Map of all available toolbar actions with their metadata.
 */
export const TOOLBAR_ACTIONS = [
  {
    name: 'bold',
    label: 'Bold',
    group: 'fontStyle',
    isActive: e => e.isActive('bold'),
    execute: e => executeToolbarCommand(e, 'bold'),
  },
  {
    name: 'italic',
    label: 'Italic',
    group: 'fontStyle',
    isActive: e => e.isActive('italic'),
    execute: e => executeToolbarCommand(e, 'italic'),
  },
  {
    name: 'underline',
    label: 'Underline',
    group: 'fontStyle',
    isActive: e => e.isActive('underline'),
    execute: e => executeToolbarCommand(e, 'underline'),
  },
  {
    name: 'strike',
    label: 'Strikethrough',
    group: 'fontStyle',
    isActive: e => e.isActive('strike'),
    execute: e => executeToolbarCommand(e, 'strike'),
  },
  {
    name: 'heading1',
    label: 'Heading 1',
    group: 'heading',
    isActive: e => e.isActive('heading', { level: 1 }),
    execute: e => executeToolbarCommand(e, 'heading1'),
  },
  {
    name: 'heading2',
    label: 'Heading 2',
    group: 'heading',
    isActive: e => e.isActive('heading', { level: 2 }),
    execute: e => executeToolbarCommand(e, 'heading2'),
  },
  {
    name: 'heading3',
    label: 'Heading 3',
    group: 'heading',
    isActive: e => e.isActive('heading', { level: 3 }),
    execute: e => executeToolbarCommand(e, 'heading3'),
  },
  {
    name: 'blockquote',
    label: 'Blockquote',
    group: 'textBlocks',
    isActive: e => e.isActive('blockquote'),
    execute: e => executeToolbarCommand(e, 'blockquote'),
  },
  {
    name: 'codeBlock',
    label: 'Code Block',
    group: 'textBlocks',
    isActive: e => e.isActive('codeBlock'),
    execute: e => executeToolbarCommand(e, 'codeBlock'),
  },
  {
    name: 'orderedList',
    label: 'Ordered List',
    group: 'lists',
    isActive: e => e.isActive('orderedList'),
    execute: e => executeToolbarCommand(e, 'orderedList'),
  },
  {
    name: 'bulletList',
    label: 'Bullet List',
    group: 'lists',
    isActive: e => e.isActive('bulletList'),
    execute: e => executeToolbarCommand(e, 'bulletList'),
  },
  {
    name: 'indent',
    label: 'Indent',
    group: 'lists',
    isActive: () => false,
    execute: e => executeToolbarCommand(e, 'indent'),
  },
  {
    name: 'outdent',
    label: 'Outdent',
    group: 'lists',
    isActive: () => false,
    execute: e => executeToolbarCommand(e, 'outdent'),
  },
  {
    name: 'alignLeft',
    label: 'Align Left',
    group: 'align',
    isActive: e => e.isActive({ textAlign: 'left' }),
    execute: e => executeToolbarCommand(e, 'alignLeft'),
  },
  {
    name: 'alignCenter',
    label: 'Center',
    group: 'align',
    isActive: e => e.isActive({ textAlign: 'center' }),
    execute: e => executeToolbarCommand(e, 'alignCenter'),
  },
  {
    name: 'alignRight',
    label: 'Align Right',
    group: 'align',
    isActive: e => e.isActive({ textAlign: 'right' }),
    execute: e => executeToolbarCommand(e, 'alignRight'),
  },
  {
    name: 'alignJustify',
    label: 'Justify',
    group: 'align',
    isActive: e => e.isActive({ textAlign: 'justify' }),
    execute: e => executeToolbarCommand(e, 'alignJustify'),
  },
  {
    name: 'link',
    label: 'Link',
    group: 'embed',
    isActive: e => e.isActive('link'),
    execute: e => executeToolbarCommand(e, 'link'),
  },
  { name: 'undo', label: 'Undo', group: 'undo', isActive: () => false, execute: e => executeToolbarCommand(e, 'undo') },
  { name: 'redo', label: 'Redo', group: 'undo', isActive: () => false, execute: e => executeToolbarCommand(e, 'redo') },
  {
    name: 'clean',
    label: 'Clear Formatting',
    group: 'utility',
    isActive: () => false,
    execute: e => executeToolbarCommand(e, 'clean'),
  },
  {
    name: 'fontSize',
    label: 'Font Size',
    group: 'size',
    isActive: e => e.isActive('fontSize'),
    execute: (e, value) => executeToolbarCommand(e, 'fontSize', value),
  },
];
