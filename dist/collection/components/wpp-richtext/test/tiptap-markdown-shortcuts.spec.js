/**
 * @file Unit tests for extensions/tiptap-markdown-shortcuts.ts
 * @description Tests that the TiptapMarkdownShortcuts extension registers correctly
 *   and doesn't break normal text input.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import { TiptapMarkdownShortcuts } from '../extensions';
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('wpp-richtext', () => {
  describe('extensions/tiptap-markdown-shortcuts', () => {
    it('should register with the editor without errors', () => {
      const editor = new Editor({
        extensions: [StarterKit, TiptapMarkdownShortcuts],
        content: '<p>Test</p>',
      });
      expect(editor).toBeDefined();
      expect(editor.getJSON().content?.[0]?.content?.[0]?.text).toBe('Test');
      editor.destroy();
    });
    it('should not break normal text input', () => {
      const editor = new Editor({
        extensions: [StarterKit, TiptapMarkdownShortcuts],
        content: '<p>Normal text with no markdown</p>',
      });
      expect(editor.getJSON().content?.[0]?.content?.[0]?.text).toContain('Normal text with no markdown');
      editor.destroy();
    });
    it('should preserve existing content when extension is added', () => {
      const editor = new Editor({
        extensions: [StarterKit, TiptapMarkdownShortcuts],
        content: '<p><strong>Bold</strong> and <em>italic</em></p>',
      });
      const json = editor.getJSON();
      const firstParagraph = json.content?.[0];
      const boldNode = firstParagraph?.content?.find((n) => n.marks?.some((m) => m.type === 'bold'));
      const italicNode = firstParagraph?.content?.find((n) => n.marks?.some((m) => m.type === 'italic'));
      expect(boldNode).toBeDefined();
      expect(italicNode).toBeDefined();
      editor.destroy();
    });
    it('should have the correct extension name', () => {
      expect(TiptapMarkdownShortcuts.name).toBe('markdownShortcuts');
    });
  });
});
