import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatInput } from '../wpp-chat-input';
describe('wpp-chat-input acceptConfig matching', () => {
  // Stencil's mock DOM has no File constructor.
  if (typeof global.File === 'undefined') {
    ;
    global.File = class MockFile {
      constructor(_bits, name, options = {}) {
        this.size = 1024;
        this.lastModified = 1666971799250;
        this.name = name;
        this.type = options.type ?? '';
      }
    };
  }
  const makeFile = (name, type) => new File(['x'], name, { type });
  const flush = () => new Promise(resolve => setTimeout(resolve, 0));
  const render = async (acceptConfig, htmlAttributes) => {
    const fileUploadConfig = acceptConfig ? { acceptConfig } : {};
    return newSpecPage({
      components: [WppChatInput],
      template: () => h("wpp-chat-input-v4-5-0", { fileUploadConfig: fileUploadConfig, htmlAttributes: htmlAttributes }),
    });
  };
  const fileInput = (page) => page.root.shadowRoot.querySelector('input[type="file"]');
  describe('the attachments input accept attribute', () => {
    it('carries the wildcard when the entry lists no extensions', async () => {
      const page = await render({ 'image/*': [] });
      expect(fileInput(page)?.getAttribute('accept')).toBe('image/*');
    });
    it('carries the extensions when the entry lists them', async () => {
      const page = await render({ 'image/*': ['.png'] });
      expect(fileInput(page)?.getAttribute('accept')).toBe('.png');
    });
    it('lets an explicit htmlAttributes override win', async () => {
      const page = await render({ 'image/*': [] }, { attachmentsInput: { accept: '.pdf' } });
      expect(fileInput(page)?.getAttribute('accept')).toBe('.pdf');
    });
  });
  /** Drives chat-input's real attachment intake and reports whether the file was accepted. */
  const accepts = async (acceptConfig, name, type) => {
    const page = await render(acceptConfig);
    const details = [];
    // wppChange is bubbles:false / composed:false here too.
    page.root.addEventListener('wppChange', (event) => {
      details.push(event.detail);
    });
    const el = fileInput(page);
    Object.defineProperty(el, 'files', { value: [makeFile(name, type)], configurable: true });
    el.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    await flush();
    await page.waitForChanges();
    const last = details[details.length - 1];
    expect(last).toBeDefined();
    return { accepted: !last.hasError, files: last.files ?? [], errorFiles: last.errorFiles ?? [] };
  };
  describe('wildcard validation', () => {
    it('accepts an image under a wildcard-only config', async () => {
      const { accepted } = await accepts({ 'image/*': [] }, 'photo.png', 'image/png');
      expect(accepted).toBe(true);
    });
    it('rejects a non-image under a wildcard-only config', async () => {
      const { accepted, errorFiles } = await accepts({ 'image/*': [] }, 'notes.pdf', 'application/pdf');
      expect(accepted).toBe(false);
      expect(errorFiles[0]?.formatError).toBe(true);
    });
    it('intersects within an entry', async () => {
      expect((await accepts({ 'image/*': ['.png'] }, 'photo.png', 'image/png')).accepted).toBe(true);
      expect((await accepts({ 'image/*': ['.png'] }, 'photo.jpg', 'image/jpeg')).accepted).toBe(false);
    });
    it('matches case-insensitively', async () => {
      const { accepted } = await accepts({ 'image/png': ['.png'] }, 'photo.png', 'IMAGE/PNG');
      expect(accepted).toBe(true);
    });
  });
  describe('files the browser reports with no type', () => {
    it('infers a modern image type from the extension', async () => {
      expect((await accepts({ 'image/*': [] }, 'shot.heic', '')).accepted).toBe(true);
    });
    it('still rejects a typeless file outside the family', async () => {
      expect((await accepts({ 'image/*': [] }, 'notes.txt', '')).accepted).toBe(false);
    });
    it('keeps accepting a typeless file whose inferred type matches no configured key', async () => {
      const config = { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] };
      expect((await accepts(config, 'photo.jpg', '')).accepted).toBe(true);
    });
    it('accepts an extensionless, typeless file under the match-all pattern', async () => {
      expect((await accepts({ '*/*': [] }, '2026-10-07_12-13', '')).accepted).toBe(true);
    });
    it('resolves a type for an untyped attachment when no acceptConfig is set', async () => {
      // This branch looked the extension up with a leading dot against a dot-less map, so it
      // resolved to undefined for the whole life of the component.
      const { files } = await accepts(undefined, 'photo.png', '');
      expect(files[0]?.type).toBe('image/png');
    });
  });
});
