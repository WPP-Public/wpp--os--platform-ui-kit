/**
 * @file Unit tests for tiptap-config.ts
 * @description Tests for buildTiptapExtensions() and format translation.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Editor } from '@tiptap/core';
import { buildTiptapExtensions, translateLegacyFormat } from '../tiptap-config';
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('wpp-richtext', () => {
  describe('tiptap-config', () => {
    describe('buildTiptapExtensions()', () => {
      it('should return an array of extensions', () => {
        const extensions = buildTiptapExtensions({});
        expect(Array.isArray(extensions)).toBe(true);
        expect(extensions.length).toBeGreaterThan(0);
      });
      it('should include StarterKit extension', () => {
        const extensions = buildTiptapExtensions({});
        const names = extensions.map(e => e.name);
        // StarterKit bundles bold, italic, heading, etc. under one name
        expect(names).toContain('starterKit');
      });
      it('should include Underline extension', () => {
        const extensions = buildTiptapExtensions({});
        const names = extensions.map(e => e.name);
        expect(names).toContain('underline');
      });
      it('should include TextAlign extension', () => {
        const extensions = buildTiptapExtensions({});
        const names = extensions.map(e => e.name);
        expect(names).toContain('textAlign');
      });
      it('should include Link extension', () => {
        const extensions = buildTiptapExtensions({});
        const names = extensions.map(e => e.name);
        expect(names).toContain('link');
      });
      it('should include Image extension', () => {
        const extensions = buildTiptapExtensions({});
        const names = extensions.map(e => e.name);
        expect(names).toContain('image');
      });
      it('should create a valid Editor with the extensions', () => {
        const extensions = buildTiptapExtensions({});
        const editor = new Editor({
          extensions,
          content: '<p>Test</p>',
        });
        expect(editor).toBeDefined();
        expect(editor.getJSON().content?.[0]?.content?.[0]?.text).toBe('Test');
        editor.destroy();
      });
      it('should respect placeholder option', () => {
        const extensions = buildTiptapExtensions({ placeholder: 'Type here...' });
        const editor = new Editor({
          extensions,
          content: '',
        });
        expect(editor).toBeDefined();
        editor.destroy();
      });
      it('should respect charactersLimit option', () => {
        const extensions = buildTiptapExtensions({ charactersLimit: 100 });
        const editor = new Editor({
          extensions,
          content: '',
        });
        expect(editor).toBeDefined();
        expect(editor.storage.characterCount).toBeDefined();
        editor.destroy();
      });
      it('should disable StarterKit bundled formats outside an explicit whitelist', () => {
        const extensions = buildTiptapExtensions({ formats: ['bold'] });
        const editor = new Editor({
          extensions,
          content: '<p>Test</p>',
        });
        expect(editor.schema.marks.bold).toBeDefined();
        expect(editor.schema.marks.italic).toBeUndefined();
        expect(editor.schema.marks.strike).toBeUndefined();
        expect(editor.schema.nodes.heading).toBeUndefined();
        expect(editor.schema.nodes.blockquote).toBeUndefined();
        expect(editor.schema.nodes.codeBlock).toBeUndefined();
        expect(editor.schema.nodes.bulletList).toBeUndefined();
        expect(editor.schema.nodes.orderedList).toBeUndefined();
        expect(editor.schema.marks.link).toBeUndefined();
        editor.destroy();
      });
      it('should expand legacy list whitelist to required Tiptap list formats', () => {
        const extensions = buildTiptapExtensions({ formats: ['list'] });
        const editor = new Editor({
          extensions,
          content: '<p>Item</p>',
        });
        expect(editor.schema.nodes.bulletList).toBeDefined();
        expect(editor.schema.nodes.orderedList).toBeDefined();
        expect(editor.schema.nodes.listItem).toBeDefined();
        expect(editor.schema.nodes.heading).toBeUndefined();
        expect(editor.schema.marks.bold).toBeUndefined();
        editor.destroy();
      });
      it('should keep indent extension enabled when indent is whitelisted', () => {
        const extensions = buildTiptapExtensions({ formats: ['indent'] });
        const names = extensions.map(e => e.name);
        const editor = new Editor({
          extensions,
          content: '<p>Item</p>',
        });
        expect(names).toContain('indent');
        expect(editor.commands.increaseIndent()).toBe(true);
        expect(editor.getJSON().content?.[0]?.attrs?.indent).toBe(1);
        editor.destroy();
      });
    });
    describe('translateLegacyFormat()', () => {
      it('should translate known legacy format names', () => {
        expect(translateLegacyFormat('code-block')).toBe('codeBlock');
        expect(translateLegacyFormat('strike')).toBe('strike');
      });
      it('should return the input for unknown formats', () => {
        expect(translateLegacyFormat('bold')).toBe('bold');
        expect(translateLegacyFormat('unknown-format')).toBe('unknown-format');
      });
    });
    describe('Editor with extensions can handle formatting', () => {
      let editor;
      beforeEach(() => {
        const extensions = buildTiptapExtensions({});
        editor = new Editor({
          extensions,
          content: '<p>Hello World</p>',
        });
      });
      afterEach(() => {
        editor.destroy();
      });
      it('should apply bold formatting', () => {
        editor.commands.setContent('<p><strong>Bold text</strong></p>');
        const json = editor.getJSON();
        const marks = json.content?.[0]?.content?.[0]?.marks;
        expect(marks).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'bold' })]));
      });
      it('should apply italic formatting', () => {
        editor.commands.setContent('<p><em>Italic text</em></p>');
        const json = editor.getJSON();
        const marks = json.content?.[0]?.content?.[0]?.marks;
        expect(marks).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'italic' })]));
      });
      it('should handle headings', () => {
        editor.commands.setContent('<h1>Heading 1</h1>');
        const json = editor.getJSON();
        expect(json.content?.[0]?.type).toBe('heading');
        expect(json.content?.[0]?.attrs?.level).toBe(1);
      });
      it('should handle lists', () => {
        editor.commands.setContent('<ul><li>Item 1</li></ul>');
        const json = editor.getJSON();
        expect(json.content?.[0]?.type).toBe('bulletList');
        expect(json.content?.[0]?.content?.[0]?.type).toBe('listItem');
      });
      it('should handle blockquote', () => {
        editor.commands.setContent('<blockquote><p>Quoted</p></blockquote>');
        const json = editor.getJSON();
        expect(json.content?.[0]?.type).toBe('blockquote');
      });
      it('should handle links', () => {
        editor.commands.setContent('<p><a href="https://example.com">Link</a></p>');
        const json = editor.getJSON();
        const marks = json.content?.[0]?.content?.[0]?.marks;
        expect(marks).toEqual(expect.arrayContaining([
          expect.objectContaining({ type: 'link', attrs: expect.objectContaining({ href: 'https://example.com' }) }),
        ]));
      });
    });
  });
});
