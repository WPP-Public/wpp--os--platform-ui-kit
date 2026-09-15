import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFileUpload } from '../wpp-file-upload';
import { WppFileUploadItem } from '../components/wpp-file-upload-item';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-file-upload', () => {
  const value = [
    {
      url: 'https://fake-url.png',
      name: 'FileData.png',
      size: 45260,
      type: 'image/png',
      lastModified: 1666971799250,
    },
    {
      url: 'https://fake-url-second.png',
      name: 'FileDataSecond.png',
      size: 452607,
      type: 'image/png',
      lastModified: 1666971799250,
    },
  ];
  it('should render file upload', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      html: `<wpp-file-upload></wpp-file-upload>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render file upload with acceptConfig', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => (h("wpp-file-upload-v4-4-0", { acceptConfig: {
          'video/quicktime': ['.mov'],
          'video/x-msvideo': ['.avi'],
        } })),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render file uploader with file items based on url', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => h("wpp-file-upload-v4-4-0", { value: value }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should reset a controlled file upload when value changes to an empty array', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => h("wpp-file-upload-v4-4-0", { controlled: true, value: value }),
    });
    const fileUpload = page.root;
    expect(page.root?.shadowRoot?.querySelectorAll('wpp-file-upload-item')).toHaveLength(2);
    fileUpload.value = [];
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelectorAll('wpp-file-upload-item')).toHaveLength(0);
  });
  it('should reset a controlled file upload when value changes to undefined', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => h("wpp-file-upload-v4-4-0", { controlled: true, value: value }),
    });
    const fileUpload = page.root;
    let error;
    try {
      // @ts-expect-error simulate consumers clearing the controlled value with undefined
      fileUpload.value = undefined;
      await page.waitForChanges();
    }
    catch (caughtError) {
      error = caughtError;
    }
    expect(error).toBeUndefined();
    expect(page.root?.shadowRoot?.querySelectorAll('wpp-file-upload-item')).toHaveLength(0);
  });
  describe('accessibility (WPPOPENDS-1498)', () => {
    const getInput = (page) => page.root?.shadowRoot?.querySelector('input.file-loader');
    describe('input accessible name and description (WCAG 4.1.2 / 2.5.3)', () => {
      it('names the input from the visible dropzone text', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload],
          html: `<wpp-file-upload></wpp-file-upload>`,
        });
        const input = getInput(page);
        const labelledby = input?.getAttribute('aria-labelledby') ?? '';
        const cta = page.root?.shadowRoot?.getElementById(labelledby);
        expect(cta?.textContent).toContain('Choose a file');
        expect(cta?.textContent).toContain('to upload or drag it here');
        expect(input?.hasAttribute('title')).toBe(false);
      });
      it('prepends the external label to the accessible name when labelConfig is set', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload],
          template: () => h("wpp-file-upload-v4-4-0", { labelConfig: { text: 'Attachments' } }),
        });
        const input = getInput(page);
        const ids = input?.getAttribute('aria-labelledby')?.split(' ') ?? [];
        expect(ids).toHaveLength(2);
        expect(page.root?.shadowRoot?.getElementById(ids[0])?.tagName.toLowerCase()).toContain('wpp-label');
      });
      it('describes the input with the hint line, adding the message when one is shown', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload],
          template: () => h("wpp-file-upload-v4-4-0", { message: "Upload failed", messageType: "error" }),
        });
        const input = getInput(page);
        const ids = input?.getAttribute('aria-describedby')?.split(' ') ?? [];
        expect(ids).toHaveLength(2);
        expect(page.root?.shadowRoot?.getElementById(ids[0])?.getAttribute('part')).toBe('text-info');
        expect(page.root?.shadowRoot?.getElementById(ids[1])?.tagName.toLowerCase()).toContain('wpp-inline-message');
        expect(input?.getAttribute('aria-invalid')).toBe('true');
      });
      it('is not marked invalid without an error', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload],
          html: `<wpp-file-upload></wpp-file-upload>`,
        });
        expect(getInput(page)?.hasAttribute('aria-invalid')).toBe(false);
      });
    });
    describe('live region announcements', () => {
      it('announces a removed file and hands focus to the replacement delete control', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload, WppFileUploadItem],
          template: () => h("wpp-file-upload-v4-4-0", { value: value }),
        });
        const inst = page.rootInstance;
        const items = page.root?.shadowRoot?.querySelectorAll('wpp-file-upload-item') ?? [];
        const secondCross = items[1]?.shadowRoot?.querySelector('[part="cross-icon"]');
        const focusSpy = jest.spyOn(secondCross, 'focus');
        inst.handleDeleteItem({ detail: { name: 'FileData.png', size: 45260, index: 0 } });
        await page.waitForChanges();
        expect(page.root?.shadowRoot?.querySelector('[aria-live="polite"]')?.textContent).toBe('FileData.png removed');
        expect(focusSpy).toHaveBeenCalled();
      });
      // `deletable: false` renders no delete control, so the item that takes the removed one's
      // place may have nothing to focus. Focus has to keep looking rather than fall to the body.
      it('skips past an item that has no delete control', async () => {
        const mixed = [{ ...value[0] }, { ...value[1], deletable: false }, { ...value[0], name: 'Third.png' }];
        const page = await newSpecPage({
          components: [WppFileUpload, WppFileUploadItem],
          template: () => h("wpp-file-upload-v4-4-0", { value: mixed }),
        });
        const inst = page.rootInstance;
        const items = Array.from(page.root?.shadowRoot?.querySelectorAll('wpp-file-upload-item') ?? []);
        const crossOf = (i) => items[i]?.shadowRoot?.querySelector('[part="cross-icon"]');
        // The middle item genuinely renders no delete control.
        expect(crossOf(1)).toBeNull();
        const thirdCross = crossOf(2);
        const focusSpy = jest.spyOn(thirdCross, 'focus');
        inst.handleDeleteItem({ detail: { name: 'FileData.png', size: 45260, index: 0 } });
        await page.waitForChanges();
        expect(focusSpy).toHaveBeenCalled();
      });
      it('announces added files and per-file validation errors', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload],
          html: `<wpp-file-upload></wpp-file-upload>`,
        });
        const inst = page.rootInstance;
        await inst.handleFileLoad([
          { name: 'ok.png', size: 10, type: 'image/png' },
          { name: 'huge.png', size: 10, type: 'image/png', sizeError: true },
        ]);
        await page.waitForChanges();
        expect(page.root?.shadowRoot?.querySelector('[aria-live="polite"]')?.textContent).toBe('ok.png added. huge.png: File exceeds size limit');
      });
      // The limit error is raised on the component, not on any one file, so it has to be appended
      // explicitly — otherwise every file reports as added and the error on screen is never spoken.
      it('announces the file limit error alongside the added files', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload],
          html: `<wpp-file-upload max-files="1"></wpp-file-upload>`,
        });
        const inst = page.rootInstance;
        await inst.handleFileLoad([
          { name: 'first.png', size: 10, type: 'image/png' },
          { name: 'second.png', size: 10, type: 'image/png' },
        ]);
        await page.waitForChanges();
        const announcement = page.root?.shadowRoot?.querySelector('[aria-live="polite"]')?.textContent;
        expect(inst.isLimitReached).toBe(true);
        expect(announcement).toContain('first.png added');
        expect(announcement).toContain('File limit has been reached');
      });
    });
    describe('delete control accessible name', () => {
      it('names the delete control from the locales', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload, WppFileUploadItem],
          template: () => h("wpp-file-upload-v4-4-0", { value: value }),
        });
        const cross = page.root?.shadowRoot
          ?.querySelector('wpp-file-upload-item')
          ?.shadowRoot?.querySelector('[part="cross-icon"]');
        expect(cross?.getAttribute('aria-label')).toBe('Remove file FileData.png');
      });
      it('honours a custom removeFile locale', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload, WppFileUploadItem],
          template: () => (h("wpp-file-upload-v4-4-0", { value: value, locales: { removeFile: (name) => `Supprimer ${name}` } })),
        });
        const cross = page.root?.shadowRoot
          ?.querySelector('wpp-file-upload-item')
          ?.shadowRoot?.querySelector('[part="cross-icon"]');
        expect(cross?.getAttribute('aria-label')).toBe('Supprimer FileData.png');
      });
    });
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppFileUpload],
        html: `<wpp-file-upload></wpp-file-upload>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppFileUpload],
        html: `<wpp-file-upload></wpp-file-upload>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
