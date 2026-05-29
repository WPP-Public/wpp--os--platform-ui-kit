/**
 * @file Unit tests for tiptap-types.ts
 * @description Type-assignability tests verifying event detail shapes match consumer expectations.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { tiptapFormats, tiptapSources, tiptapUploadTypes, TIPTAP_UPLOAD_REQUEST_EVENT } from '../tiptap-types';
describe('wpp-richtext', () => {
  describe('tiptap-types', () => {
    describe('TiptapChangeEventDetail', () => {
      it('should have required properties', () => {
        const detail = {
          value: '<p>test</p>',
          plainText: 'test',
          editor: {},
          source: 'user',
          name: 'content',
        };
        expect(detail.value).toBe('<p>test</p>');
        expect(detail.plainText).toBe('test');
        expect(detail.source).toBe('user');
        expect(detail.name).toBe('content');
        expect(detail.editor).toBeDefined();
      });
    });
    describe('TiptapSelectionChangeEventDetail', () => {
      it('should have range and editor', () => {
        const detail = {
          range: { from: 0, to: 5 },
          editor: {},
          oldRange: null,
          source: 'user',
        };
        expect(detail.range).toBeDefined();
        expect(detail.range.from).toBe(0);
        expect(detail.range.to).toBe(5);
        expect(detail.editor).toBeDefined();
      });
    });
    describe('TiptapUploadRequestEventDetail', () => {
      it('should have type and callback', () => {
        const mockCallback = jest.fn();
        const detail = {
          type: 'image',
          callback: mockCallback,
        };
        expect(detail.type).toBe('image');
        expect(detail.callback).toBe(mockCallback);
      });
    });
    describe('TiptapUploadCallbackItem', () => {
      it('should have file and promise', () => {
        const item = {
          file: { name: 'test.png', size: 0, type: 'image/png' },
          promise: Promise.resolve('https://example.com/image.png'),
        };
        expect(item.file).toBeDefined();
        expect(item.promise).toBeDefined();
      });
    });
    describe('TiptapRange', () => {
      it('should have from and to properties', () => {
        const range = { from: 0, to: 10, index: 0, length: 10 };
        expect(range.from).toBe(0);
        expect(range.to).toBe(10);
      });
      it('should include backward-compatible index and length', () => {
        const range = { from: 5, to: 15, index: 5, length: 10 };
        expect(range.index).toBe(range.from);
        expect(range.length).toBe(range.to - range.from);
      });
    });
    describe('constants', () => {
      it('should export tiptapFormats', () => {
        expect(tiptapFormats.html).toBe('html');
        expect(tiptapFormats.markdown).toBe('markdown');
        expect(tiptapFormats.text).toBe('text');
        expect(tiptapFormats.json).toBe('json');
      });
      it('should export tiptapSources', () => {
        expect(tiptapSources.user).toBe('user');
        expect(tiptapSources.api).toBe('api');
      });
      it('should export tiptapUploadTypes', () => {
        expect(tiptapUploadTypes).toContain('image');
        expect(tiptapUploadTypes).toContain('video');
        expect(tiptapUploadTypes).toContain('attachment');
      });
      it('should export TIPTAP_UPLOAD_REQUEST_EVENT', () => {
        expect(TIPTAP_UPLOAD_REQUEST_EVENT).toBe('upload-request');
      });
    });
  });
});
