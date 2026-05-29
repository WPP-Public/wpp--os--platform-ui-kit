/**
 * @file Unit tests for extensions/index.ts barrel exports
 * @description Verifies all exports from the extensions barrel are defined.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { TiptapImageUpload, UploadingImage, TiptapImageActions, TiptapMarkdownShortcuts, executeToolbarCommand, isFormatActive, resolveToolbarAliases, TOOLBAR_ACTIONS, } from '../extensions';
describe('wpp-richtext', () => {
  describe('extensions/index', () => {
    it('should export TiptapImageUpload', () => {
      expect(TiptapImageUpload).toBeDefined();
    });
    it('should export UploadingImage', () => {
      expect(UploadingImage).toBeDefined();
    });
    it('should export TiptapImageActions', () => {
      expect(TiptapImageActions).toBeDefined();
    });
    it('should export TiptapMarkdownShortcuts', () => {
      expect(TiptapMarkdownShortcuts).toBeDefined();
    });
    it('should export executeToolbarCommand', () => {
      expect(executeToolbarCommand).toBeDefined();
      expect(typeof executeToolbarCommand).toBe('function');
    });
    it('should export isFormatActive', () => {
      expect(isFormatActive).toBeDefined();
      expect(typeof isFormatActive).toBe('function');
    });
    it('should export resolveToolbarAliases', () => {
      expect(resolveToolbarAliases).toBeDefined();
      expect(typeof resolveToolbarAliases).toBe('function');
    });
    it('should export TOOLBAR_ACTIONS', () => {
      expect(TOOLBAR_ACTIONS).toBeDefined();
      expect(Array.isArray(TOOLBAR_ACTIONS)).toBe(true);
    });
  });
});
