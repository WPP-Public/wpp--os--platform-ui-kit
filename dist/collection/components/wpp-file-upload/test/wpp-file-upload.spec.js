import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFileUpload } from '../wpp-file-upload';
import { WppFileUploadItem } from '../components/wpp-file-upload-item';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
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
      template: () => (h("wpp-file-upload-v4-6-0", { acceptConfig: {
          'video/quicktime': ['.mov'],
          'video/x-msvideo': ['.avi'],
        } })),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render file uploader with file items based on url', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => h("wpp-file-upload-v4-6-0", { value: value }),
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('label hover state', () => {
    const renderFileUploadWithLabel = async (disabled = false) => {
      const page = await newSpecPage({
        components: [WppFileUpload, WppLabel, WppInternalLabel],
        template: () => h("wpp-file-upload-v4-6-0", { disabled: disabled, labelConfig: { text: 'Attachments' } }),
      });
      await page.waitForChanges();
      return {
        label: page.root?.shadowRoot?.querySelector('.file-upload-label'),
        wrapper: page.root?.shadowRoot?.querySelector('.upload-wrapper'),
        page,
      };
    };
    it('applies the dropzone hover state while its label is hovered', async () => {
      const { label, wrapper, page } = await renderFileUploadWithLabel();
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(wrapper).toHaveClass('label-hovered');
      label.dispatchEvent(new MouseEvent('mouseleave'));
      await page.waitForChanges();
      expect(wrapper).not.toHaveClass('label-hovered');
    });
    it('does not apply the dropzone hover state from a disabled label', async () => {
      const { label, wrapper, page } = await renderFileUploadWithLabel(true);
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(wrapper).not.toHaveClass('label-hovered');
    });
  });
  it('should reset a controlled file upload when value changes to an empty array', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => h("wpp-file-upload-v4-6-0", { controlled: true, value: value }),
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
      template: () => h("wpp-file-upload-v4-6-0", { controlled: true, value: value }),
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
          template: () => h("wpp-file-upload-v4-6-0", { labelConfig: { text: 'Attachments' } }),
        });
        const input = getInput(page);
        const ids = input?.getAttribute('aria-labelledby')?.split(' ') ?? [];
        expect(ids).toHaveLength(2);
        expect(page.root?.shadowRoot?.getElementById(ids[0])?.tagName.toLowerCase()).toContain('wpp-label');
      });
      it('describes the input with the hint line, adding the message when one is shown', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload],
          template: () => h("wpp-file-upload-v4-6-0", { message: "Upload failed", messageType: "error" }),
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
          template: () => h("wpp-file-upload-v4-6-0", { value: value }),
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
          template: () => h("wpp-file-upload-v4-6-0", { value: mixed }),
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
          template: () => h("wpp-file-upload-v4-6-0", { value: value }),
        });
        const cross = page.root?.shadowRoot
          ?.querySelector('wpp-file-upload-item')
          ?.shadowRoot?.querySelector('[part="cross-icon"]');
        expect(cross?.getAttribute('aria-label')).toBe('Remove file FileData.png');
      });
      it('honours a custom removeFile locale', async () => {
        const page = await newSpecPage({
          components: [WppFileUpload, WppFileUploadItem],
          template: () => (h("wpp-file-upload-v4-6-0", { value: value, locales: { removeFile: (name) => `Supprimer ${name}` } })),
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
describe('backend processing', () => {
  // Stencil's mock DOM has no File constructor, so provide a minimal one.
  if (typeof global.File === 'undefined') {
    ;
    global.File = class MockFile {
      constructor(_bits, name, options = {}) {
        this.size = 0;
        this.lastModified = 1666971799250;
        this.name = name;
        this.type = options.type ?? '';
      }
    };
  }
  const makeFile = (name, size = 1024) => {
    const file = new File(['x'], name, { type: 'image/png' });
    Object.defineProperty(file, 'size', { value: size, configurable: true });
    return file;
  };
  const flush = () => new Promise(resolve => setTimeout(resolve, 0));
  /** Drives the component's real intake path. */
  const intake = async (page, files) => {
    const input = page.root.shadowRoot.querySelector('input[type="file"]');
    Object.defineProperty(input, 'files', { value: files, configurable: true });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    await flush();
    await page.waitForChanges();
  };
  const renderedFiles = (page) => [...page.root.shadowRoot.querySelectorAll('wpp-file-upload-item')].map((item) => item.file);
  it('marks a file done when the processor resolves nothing', async () => {
    const processor = jest.fn().mockResolvedValue(undefined);
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: processor }),
    });
    await intake(page, [makeFile('ok.png')]);
    expect(processor).toHaveBeenCalledTimes(1);
    expect(renderedFiles(page)[0].status).toBe('done');
  });
  it('marks a file errored with the message the processor resolves', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: async () => ({ error: 'Rejected by server' }) }),
    });
    await intake(page, [makeFile('bad.png')]);
    const file = renderedFiles(page)[0];
    expect(file.status).toBe('error');
    expect(file.processingError).toBe('Rejected by server');
  });
  it('marks a file errored using the message of a rejected promise', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => (h("wpp-file-upload-v4-6-0", { processor: async () => {
          throw new Error('Boom');
        } })),
    });
    await intake(page, [makeFile('boom.png')]);
    expect(renderedFiles(page)[0].processingError).toBe('Boom');
  });
  it('does not run the processor for a file that already failed synchronous validation', async () => {
    const processor = jest.fn().mockResolvedValue(undefined);
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { size: 1, processor: processor }),
    });
    await intake(page, [makeFile('too-big.png', 5 * 1024 * 1024), makeFile('fine.png')]);
    expect(processor).toHaveBeenCalledTimes(1);
    expect(processor.mock.calls[0][0].name).toBe('fine.png');
  });
  it('ignores the processor entirely while controlled', async () => {
    const processor = jest.fn().mockResolvedValue(undefined);
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => { });
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { controlled: true, processor: processor }),
    });
    await intake(page, [makeFile('a.png')]);
    await intake(page, [makeFile('b.png')]);
    const ownWarnings = warn.mock.calls.filter(([message]) => String(message).includes('[wpp-file-upload]'));
    expect(processor).not.toHaveBeenCalled();
    expect(ownWarnings).toHaveLength(1);
    warn.mockRestore();
  });
  it('runs an array of processors in sequence and stops at the first failure', async () => {
    const order = [];
    const first = jest.fn(async () => {
      order.push('first');
      return { url: 'https://cdn/x.png' };
    });
    const second = jest.fn(async (file) => {
      order.push(second.mock.calls.length && file.url ? 'second-saw-url' : 'second');
      return { error: 'stage 2 failed' };
    });
    const third = jest.fn(async () => {
      order.push('third');
    });
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: [first, second, third] }),
    });
    await intake(page, [makeFile('staged.png')]);
    expect(order).toEqual(['first', 'second-saw-url']);
    expect(third).not.toHaveBeenCalled();
    expect(renderedFiles(page)[0].processingError).toBe('stage 2 failed');
  });
  it('does not reprocess files that already carry a terminal status', async () => {
    const processor = jest.fn().mockResolvedValue(undefined);
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: processor }),
    });
    const done = makeFile('done.png');
    const errored = makeFile('errored.png');
    done.status = 'done';
    errored.status = 'error';
    await intake(page, [done, errored, makeFile('fresh.png')]);
    expect(processor).toHaveBeenCalledTimes(1);
    expect(processor.mock.calls[0][0].name).toBe('fresh.png');
  });
  it('aborts an in-flight processor when the file is removed', async () => {
    let aborted = false;
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => (h("wpp-file-upload-v4-6-0", { processor: (_file, { signal }) => new Promise(resolve => {
          signal.addEventListener('abort', () => {
            aborted = true;
            resolve(undefined);
          });
        }) })),
    });
    await intake(page, [makeFile('slow.png')]);
    const shadow = page.root.shadowRoot;
    const item = shadow.querySelector('wpp-file-upload-item');
    item.dispatchEvent(new CustomEvent('wppDelete', { detail: { name: 'slow.png', size: 1024, index: 0 } }));
    await page.waitForChanges();
    expect(aborted).toBe(true);
    expect(shadow.querySelectorAll('wpp-file-upload-item')).toHaveLength(0);
  });
  it('aborts every in-flight processor on reset', async () => {
    let abortCount = 0;
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => (h("wpp-file-upload-v4-6-0", { processor: (_file, { signal }) => new Promise(resolve => {
          signal.addEventListener('abort', () => {
            abortCount += 1;
            resolve(undefined);
          });
        }) })),
    });
    await intake(page, [makeFile('a.png'), makeFile('b.png')]);
    await page.rootInstance.reset();
    await page.waitForChanges();
    expect(abortCount).toBe(2);
  });
  it('keeps a file in its original position when it settles to an error', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => (h("wpp-file-upload-v4-6-0", { processor: async (file) => (file.name === 'b.png' ? { error: 'nope' } : undefined) })),
    });
    await intake(page, [makeFile('a.png'), makeFile('b.png'), makeFile('c.png')]);
    expect(renderedFiles(page).map((file) => file.name)).toEqual(['a.png', 'b.png', 'c.png']);
  });
  it('keeps synchronous validation errors in insertion order too', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { size: 1 }),
    });
    await intake(page, [makeFile('a.png'), makeFile('b-too-big.png', 5 * 1024 * 1024), makeFile('c.png')]);
    expect(renderedFiles(page).map((file) => file.name)).toEqual(['a.png', 'b-too-big.png', 'c.png']);
  });
  it('gives two identically named files in one batch distinct identities', async () => {
    const processor = jest.fn().mockResolvedValue(undefined);
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: processor }),
    });
    await intake(page, [makeFile('dup.txt'), makeFile('dup.txt')]);
    const names = renderedFiles(page).map((file) => file.name);
    expect(names).toHaveLength(2);
    expect(new Set(names).size).toBe(2);
    expect(processor).toHaveBeenCalledTimes(2);
  });
  it('keeps a file settling even when its processor writes a url', async () => {
    // Regression: deriving identity from `url` let a processor change its own
    // file's key mid-flight, which orphaned the file in the uploading state.
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: async () => ({ url: 'https://cdn/uploaded.png' }) }),
    });
    await intake(page, [makeFile('patched.png')]);
    const file = renderedFiles(page)[0];
    expect(file.status).toBe('done');
    expect(file.url).toBe('https://cdn/uploaded.png');
  });
  it('emits processing lifecycle events carrying the terminal status', async () => {
    const started = [];
    const ended = [];
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: async () => ({ error: 'nope' }) }),
    });
    const host = page.root;
    host.addEventListener('wppFileProcessingStart', (event) => started.push(event.detail));
    host.addEventListener('wppFileProcessingEnd', (event) => ended.push(event.detail));
    await intake(page, [makeFile('watched.png')]);
    expect(started).toHaveLength(1);
    expect(started[0].name).toBe('watched.png');
    expect(ended).toHaveLength(1);
    expect(ended[0].status).toBe('error');
    expect(ended[0].processingError).toBe('nope');
  });
});
describe('processing announcements', () => {
  const flush = () => new Promise(resolve => setTimeout(resolve, 0));
  const intake = async (page, files) => {
    const input = page.root.shadowRoot.querySelector('input[type="file"]');
    Object.defineProperty(input, 'files', { value: files, configurable: true });
    input.dispatchEvent(new Event('change'));
    await page.waitForChanges();
    await flush();
    await page.waitForChanges();
  };
  const liveText = (page) => page.root.shadowRoot.querySelector('[aria-live="polite"]')?.textContent;
  it('announces a file that finishes processing successfully', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: async () => undefined }),
    });
    await intake(page, [{ name: 'ok.png', size: 10, type: 'image/png' }]);
    expect(liveText(page)).toContain('ok.png processed');
  });
  it('announces a file that fails processing, with the reason', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      template: () => h("wpp-file-upload-v4-6-0", { processor: async () => ({ error: 'Rejected by server' }) }),
    });
    await intake(page, [{ name: 'bad.png', size: 10, type: 'image/png' }]);
    expect(liveText(page)).toContain('bad.png failed: Rejected by server');
  });
});
describe('wppChange reports the rendered order', () => {
  it('carries every file in insertion order, errors included', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload],
      html: `<wpp-file-upload size="1"></wpp-file-upload>`,
    });
    const instance = page.rootInstance;
    const details = [];
    page.root?.addEventListener('wppChange', (event) => details.push(event.detail));
    await instance.handleFileLoad([
      { name: 'A-ok.png', size: 10, type: 'image/png' },
      { name: 'B-oversized.png', size: 5 * 1024 * 1024, type: 'image/png' },
      { name: 'C-ok.png', size: 10, type: 'image/png' },
    ]);
    await page.waitForChanges();
    const detail = details[details.length - 1];
    // value and errorFiles are partitioned, so joining them would give A, C, B.
    expect(detail.value.map((file) => file.name)).toEqual(['A-ok.png', 'C-ok.png']);
    expect(detail.errorFiles.map((file) => file.name)).toEqual(['B-oversized.png']);
    expect(detail.files.map((file) => file.name)).toEqual(['A-ok.png', 'B-oversized.png', 'C-ok.png']);
  });
});
