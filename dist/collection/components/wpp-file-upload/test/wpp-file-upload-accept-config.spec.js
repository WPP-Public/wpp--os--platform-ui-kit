import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFileUpload } from '../wpp-file-upload';
describe('wpp-file-upload acceptConfig matching', () => {
  // Stencil's mock DOM has neither constructor, so provide the minimum the intake path touches.
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
  /** Renders the component and returns the page plus a live list of wppChange details. */
  const render = async (acceptConfig, extraProps = {}) => {
    const page = await newSpecPage({
      // The item is deliberately not registered: nothing here asserts on it, and its thumbnail
      // path would start a FileReader whose callback outlives the page teardown.
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { acceptConfig: acceptConfig, size: 1, ...extraProps }),
    });
    const details = [];
    // wppChange is bubbles:false / composed:false - a document-level listener never sees it.
    page.root.addEventListener('wppChange', (event) => {
      details.push(event.detail);
    });
    return { page, details };
  };
  const input = (page) => page.root.shadowRoot.querySelector('input[type="file"]');
  const hintText = (page) => page.root.shadowRoot.querySelector('p.text-info')?.textContent ?? '';
  /** Drives the component's real intake path rather than calling a private method. */
  const intake = async (page, files) => {
    const el = input(page);
    Object.defineProperty(el, 'files', { value: files, configurable: true });
    el.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    await flush();
    await page.waitForChanges();
  };
  /** Intakes one file and reports whether the component accepted it. */
  const accepts = async (acceptConfig, name, type) => {
    const { page, details } = await render(acceptConfig);
    await intake(page, [makeFile(name, type)]);
    const last = details[details.length - 1];
    expect(last).toBeDefined();
    return !last.hasError && !last.errorFiles?.length;
  };
  describe('the native accept attribute', () => {
    it('uses the wildcard key when the entry lists no extensions', async () => {
      const { page } = await render({ 'image/*': [] });
      expect(input(page).getAttribute('accept')).toBe('image/*');
    });
    it('uses the extensions when the entry lists them, keeping the picker aligned with validation', async () => {
      const { page } = await render({ 'image/*': ['.png'] });
      expect(input(page).getAttribute('accept')).toBe('.png');
    });
    it('is unchanged for an exact MIME entry that lists extensions', async () => {
      const { page } = await render({ 'image/png': ['.png'] });
      expect(input(page).getAttribute('accept')).toBe('.png');
    });
    it('uses the exact MIME key when that entry lists no extensions', async () => {
      const { page } = await render({ 'image/png': [] });
      expect(input(page).getAttribute('accept')).toBe('image/png');
    });
    it('combines entries for a mixed config', async () => {
      const { page } = await render({ 'image/*': [], 'application/pdf': ['.pdf'] });
      expect(input(page).getAttribute('accept')).toBe('image/*,.pdf');
    });
  });
  describe('wildcard matching', () => {
    it('accepts an image under a wildcard-only config', async () => {
      await expect(accepts({ 'image/*': [] }, 'photo.png', 'image/png')).resolves.toBe(true);
    });
    it('rejects a non-image under a wildcard-only config', async () => {
      await expect(accepts({ 'image/*': [] }, 'notes.pdf', 'application/pdf')).resolves.toBe(false);
    });
    it('intersects within an entry: the family must match AND the extension must be listed', async () => {
      await expect(accepts({ 'image/*': ['.png'] }, 'photo.png', 'image/png')).resolves.toBe(true);
      await expect(accepts({ 'image/*': ['.png'] }, 'photo.jpg', 'image/jpeg')).resolves.toBe(false);
    });
    it('unions across entries in a mixed config', async () => {
      const config = { 'image/*': [], 'application/pdf': ['.pdf'] };
      await expect(accepts(config, 'photo.png', 'image/png')).resolves.toBe(true);
      await expect(accepts(config, 'report.pdf', 'application/pdf')).resolves.toBe(true);
      await expect(accepts(config, 'notes.txt', 'text/plain')).resolves.toBe(false);
    });
  });
  describe('an exact MIME entry with no extensions matches on MIME alone', () => {
    it('accepts a file of that exact type', async () => {
      await expect(accepts({ 'image/png': [] }, 'photo.png', 'image/png')).resolves.toBe(true);
    });
    it('rejects a file of another type', async () => {
      await expect(accepts({ 'image/png': [] }, 'notes.pdf', 'application/pdf')).resolves.toBe(false);
    });
  });
  describe('case-insensitive matching', () => {
    it('accepts a file whose type the browser reported in upper case', async () => {
      await expect(accepts({ 'image/png': ['.png'] }, 'photo.png', 'IMAGE/PNG')).resolves.toBe(true);
    });
    it('matches an upper-case pattern against a lower-case type', async () => {
      await expect(accepts({ 'IMAGE/*': [] }, 'photo.png', 'image/png')).resolves.toBe(true);
    });
  });
  describe('files the browser reports with no type', () => {
    it('infers a modern image type from the extension', async () => {
      await expect(accepts({ 'image/*': [] }, 'shot.heic', '')).resolves.toBe(true);
      await expect(accepts({ 'image/*': [] }, 'photo.webp', '')).resolves.toBe(true);
    });
    it('still rejects a typeless file that is not in the family', async () => {
      await expect(accepts({ 'image/*': [] }, 'notes.txt', '')).resolves.toBe(false);
    });
    it('keeps accepting a typeless file whose inferred type matches no configured key', async () => {
      // The repo's own example config. EXTENSION_TO_TYPE maps jpg -> image/jpg, which matches
      // neither key, so inference succeeds and is still useless - the extension fallback has to
      // run anyway or this file regresses.
      const config = { 'image/png': ['.png'], 'image/jpeg': ['.jpg', '.jpeg'] };
      await expect(accepts(config, 'photo.jpg', '')).resolves.toBe(true);
    });
    it('keeps accepting a typeless .avi under the shipped video config', async () => {
      const config = { 'video/quicktime': ['.mov', '.avi'] };
      await expect(accepts(config, 'clip.avi', '')).resolves.toBe(true);
    });
    it('does not let the extension fallback rescue a file the browser DID type', async () => {
      // Only the browser's silence unlocks the fallback, so a typed image/jpeg named report.pdf
      // stays rejected even though .pdf is listed.
      const config = { 'image/*': ['.png'], 'application/pdf': ['.pdf'] };
      await expect(accepts(config, 'report.pdf', 'image/jpeg')).resolves.toBe(false);
    });
    it('keeps matching a typeless file against the listed extensions when its type cannot be inferred', async () => {
      // Regression guard: `log` is absent from EXTENSION_TO_TYPE, so this only passes while the
      // historical extension-union fallback survives alongside the new inference.
      await expect(accepts({ 'application/x-custom': ['.log'] }, 'app.log', '')).resolves.toBe(true);
    });
  });
  describe('the match-all pattern', () => {
    it('accepts a typed file', async () => {
      await expect(accepts({ '*/*': [] }, 'photo.png', 'image/png')).resolves.toBe(true);
    });
    it('accepts a file with no extension and no type', async () => {
      // A screenshot saved without an extension: nothing identifies it, and match-all is the one
      // pattern that should not care.
      await expect(accepts({ '*/*': [] }, '2026-10-07_12-13', '')).resolves.toBe(true);
    });
    it('accepts a typeless file whose extension is unknown', async () => {
      await expect(accepts({ '*/*': [] }, 'archive.unknownext', '')).resolves.toBe(true);
    });
    it('still narrows when the match-all entry lists extensions', async () => {
      await expect(accepts({ '*/*': ['.png'] }, 'photo.png', 'image/png')).resolves.toBe(true);
      await expect(accepts({ '*/*': ['.png'] }, 'notes.txt', 'text/plain')).resolves.toBe(false);
    });
    it('does not make an unrelated family accept an untypeable file', async () => {
      await expect(accepts({ 'image/*': [] }, '2026-10-07_12-13', '')).resolves.toBe(false);
    });
  });
  describe('the dropzone hint', () => {
    it('renders a readable family label rather than the raw pattern', async () => {
      const { page } = await render({ 'image/*': [] });
      expect(hintText(page)).toContain('image');
      expect(hintText(page)).not.toContain('image/*');
    });
    it('renders both tokens for a mixed config', async () => {
      const { page } = await render({ 'image/*': [], 'application/pdf': ['.pdf'] });
      expect(hintText(page)).toContain('image');
      expect(hintText(page)).toContain('.pdf');
    });
    it('uses a consumer override for the family label', async () => {
      const { page } = await render({ 'image/*': [] }, { locales: { acceptFamilyLabels: { 'image/*': 'imagen' } } });
      expect(hintText(page)).toContain('imagen');
    });
    it('reads as "any file" for the match-all pattern rather than printing it', async () => {
      const { page } = await render({ '*/*': [] });
      expect(hintText(page)).toBe('Any file at 1 MB or less');
    });
    it('reads as "any file" when no acceptConfig is set at all', async () => {
      const { page } = await render(undefined);
      expect(hintText(page)).toBe('Any file at 1 MB or less');
    });
    it('falls back to the raw pattern for a family it has no label for', async () => {
      const { page } = await render({ 'font/*': [] });
      expect(hintText(page)).toContain('font/*');
    });
  });
});
