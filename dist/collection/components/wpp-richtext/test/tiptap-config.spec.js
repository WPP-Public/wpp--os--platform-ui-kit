/**
 * @file Unit tests for tiptap-config.ts
 * @description Tests for buildTiptapExtensions(), turndown service re-export,
 *   and format translation.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
// Mock Quill before any imports can pull it in
jest.mock('quill', () => ({
  default: { import: () => ({}), register: () => { }, DEFAULTS: { formats: [], modules: {} } },
}));
// Mock the old config module that imports Quill
jest.mock('../config', () => ({
  __esModule: true,
  default: {
    turndown: (html) => html,
    use: () => { },
    addRule: () => { },
    escape: (text) => text,
  },
  quillMarkdownOptions: { tags: {} },
}));
import { Editor } from '@tiptap/core';
import { buildTiptapExtensions, translateQuillFormat } from '../tiptap-config';
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
    });
    describe('translateQuillFormat()', () => {
      it('should translate known Quill format names', () => {
        expect(translateQuillFormat('code-block')).toBe('codeBlock');
        expect(translateQuillFormat('strike')).toBe('strike');
      });
      it('should return the input for unknown formats', () => {
        expect(translateQuillFormat('bold')).toBe('bold');
        expect(translateQuillFormat('unknown-format')).toBe('unknown-format');
      });
    });
    // turndownService tests are in utils.spec.ts (library-agnostic, same config)
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
