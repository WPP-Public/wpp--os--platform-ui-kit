/**
 * @file Unit tests for extensions/tiptap-image-upload.ts
 * @description Tests for TiptapImageUpload and UploadingImage extension registration
 *   and basic image insertion.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { Editor } from '@tiptap/core';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import { TiptapImageUpload, UploadingImage } from '../extensions';
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('wpp-richtext', () => {
  describe('extensions/tiptap-image-upload', () => {
    describe('UploadingImage extension', () => {
      it('should have the correct name', () => {
        expect(UploadingImage.name).toBe('uploadingImage');
      });
      it('should register with the editor without errors', () => {
        const editor = new Editor({
          extensions: [StarterKit, UploadingImage],
          content: '<p>Test</p>',
        });
        expect(editor).toBeDefined();
        editor.destroy();
      });
    });
    describe('TiptapImageUpload extension', () => {
      it('should have the correct name', () => {
        expect(TiptapImageUpload.name).toBe('imageUpload');
      });
      it('should register with the editor without errors', () => {
        const editor = new Editor({
          extensions: [StarterKit, Image, UploadingImage, TiptapImageUpload],
          content: '<p>Test</p>',
        });
        expect(editor).toBeDefined();
        editor.destroy();
      });
      it('should provide insertUploadingImage command', () => {
        const editor = new Editor({
          extensions: [StarterKit, Image, UploadingImage, TiptapImageUpload],
          content: '<p>Test</p>',
        });
        expect(editor.commands.insertUploadingImage).toBeDefined();
        expect(typeof editor.commands.insertUploadingImage).toBe('function');
        editor.destroy();
      });
      it('should provide resolveUploadingImage command', () => {
        const editor = new Editor({
          extensions: [StarterKit, Image, UploadingImage, TiptapImageUpload],
          content: '<p>Test</p>',
        });
        expect(editor.commands.resolveUploadingImage).toBeDefined();
        expect(typeof editor.commands.resolveUploadingImage).toBe('function');
        editor.destroy();
      });
      it('should provide failUploadingImage command', () => {
        const editor = new Editor({
          extensions: [StarterKit, Image, UploadingImage, TiptapImageUpload],
          content: '<p>Test</p>',
        });
        expect(editor.commands.failUploadingImage).toBeDefined();
        expect(typeof editor.commands.failUploadingImage).toBe('function');
        editor.destroy();
      });
    });
  });
});
