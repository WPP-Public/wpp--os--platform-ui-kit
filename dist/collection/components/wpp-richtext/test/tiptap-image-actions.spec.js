/**
 * @file Unit tests for extensions/tiptap-image-actions.ts
 * @description Tests for TiptapImageActions extension registration and image rendering.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TiptapImageActions } from '../extensions';
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('wpp-richtext', () => {
  describe('extensions/tiptap-image-actions', () => {
    it('should have the correct name', () => {
      expect(TiptapImageActions.name).toBe('imageActions');
    });
    it('should register with the editor without errors', () => {
      const editor = new Editor({
        extensions: [StarterKit, Image, TiptapImageActions],
        content: '<p>Test</p>',
      });
      expect(editor).toBeDefined();
      editor.destroy();
    });
    it('should preserve image content when extension is active', () => {
      const editor = new Editor({
        extensions: [StarterKit, Image, TiptapImageActions],
        content: '<p><img src="https://placehold.co/100" alt="test"></p>',
      });
      const json = editor.getJSON();
      const findNode = (node, type) => {
        if (node.type === type)
          return node;
        return node.content?.reduce((found, child) => found || findNode(child, type), null);
      };
      const imageNode = findNode(json, 'image');
      expect(imageNode).toBeDefined();
      expect(imageNode?.attrs?.src).toBe('https://placehold.co/100');
      editor.destroy();
    });
    it('should work with editor that has no images', () => {
      const editor = new Editor({
        extensions: [StarterKit, Image, TiptapImageActions],
        content: '<p>No images here</p>',
      });
      const json = editor.getJSON();
      expect(json.content?.[0]?.content?.[0]?.text).toBe('No images here');
      editor.destroy();
    });
  });
});
