import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFileUploadItem } from '../components/wpp-file-upload-item';
import { returnFileTypeLabel } from '../const';
const urlFile = (overrides = {}) => ({
  url: 'https://fake-url/report.pdf',
  name: 'report.pdf',
  size: 45260,
  type: 'application/pdf',
  lastModified: 1666971799250,
  ...overrides,
});
describe('wpp-file-upload-item', () => {
  it('defaults to the compact variant and keeps the single-line layout', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-3-0", { file: urlFile() }),
    });
    const host = page.root;
    expect(host.classList.contains('variant-default')).toBe(true);
    expect(host.classList.contains('variant-chat')).toBe(false);
    expect(host.shadowRoot?.querySelector('.thumbnail')).toBeNull();
    expect(host.shadowRoot?.querySelector('.icon-wrapper')).not.toBeNull();
  });
  it('keeps the total file size while FileReader progress updates the percentage', async () => {
    let progressHandler;
    const reader = {
      onload: null,
      onloadend: null,
      set onprogress(handler) {
        progressHandler = handler ?? undefined;
      },
      readAsArrayBuffer: jest.fn(),
      readAsBinaryString: jest.fn(),
      readAsDataURL: jest.fn(),
    };
    const originalFileReader = global.FileReader;
    Object.defineProperty(global, 'FileReader', {
      configurable: true,
      writable: true,
      value: jest.fn(() => reader),
    });
    try {
      const file = {
        name: 'uploading-video.mp4',
        size: 15 * 1024 * 1024,
        type: 'video/mp4',
        lastModified: 1666971799250,
      };
      const page = await newSpecPage({
        components: [WppFileUploadItem],
        template: () => h("wpp-file-upload-item-v4-3-0", { file: file }),
      });
      progressHandler?.({
        loaded: 5 * 1024 * 1024,
        total: 15 * 1024 * 1024,
      });
      await page.waitForChanges();
      const loading = page.root?.shadowRoot?.querySelector('[part="loading"]');
      const percentage = page.root?.shadowRoot?.querySelector('[part="percentage"]');
      expect(loading?.textContent?.trim()).toBe('15 MB');
      expect(loading?.textContent).not.toContain('/');
      expect(percentage?.textContent?.trim()).toBe('33.3%');
    }
    finally {
      Object.defineProperty(global, 'FileReader', {
        configurable: true,
        writable: true,
        value: originalFileReader,
      });
    }
  });
  it.each([
    ['completed', {}],
    ['error', { sizeError: true }],
  ])('shows only the total file size in the %s state', async (_state, overrides) => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-3-0", { file: urlFile({ size: 15 * 1024 * 1024, ...overrides }) }),
    });
    const size = page.root?.shadowRoot?.querySelector('[part="loading"], [part="error-message"]');
    expect(size?.textContent?.trim()).toBe('15 MB');
    expect(size?.textContent).not.toContain('/');
  });
  it('renders the thumbnail card, file name and file-type subtitle in the chat variant', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-3-0", { variant: "chat", file: urlFile() }),
    });
    const host = page.root;
    expect(host.classList.contains('variant-chat')).toBe(true);
    const thumbnail = host.shadowRoot?.querySelector('.thumbnail');
    expect(thumbnail).not.toBeNull();
    expect(host.shadowRoot?.querySelector('[part="file-name"]')?.textContent).toContain('report.pdf');
    expect(host.shadowRoot?.querySelector('.subtitle')?.textContent).toBe('Document');
  });
  it('wraps the subtitle in a tooltip whose text mirrors the subtitle for truncation', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-3-0", { variant: "chat", file: urlFile() }),
    });
    const host = page.root;
    const subtitle = host.shadowRoot?.querySelector('.subtitle');
    const subtitleTooltip = subtitle?.closest('wpp-tooltip');
    expect(subtitleTooltip).not.toBeNull();
    expect(subtitleTooltip?.getAttribute('text') ?? subtitleTooltip?.text).toBe('Document');
  });
  it('renders the error icon and danger subtitle for a file with an error', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => (h("wpp-file-upload-item-v4-3-0", { variant: "chat", file: urlFile({ sizeError: true }), locales: { sizeError: 'Too big', formatError: 'Wrong format' } })),
    });
    const host = page.root;
    expect(host.shadowRoot?.querySelector('.thumbnail.error')).not.toBeNull();
    expect(host.shadowRoot?.querySelector('wpp-icon-error')).not.toBeNull();
    const subtitle = host.shadowRoot?.querySelector('.subtitle');
    expect(subtitle?.classList.contains('subtitle-error')).toBe(true);
    expect(subtitle?.textContent).toBe('Too big');
  });
  it('keeps the delete icon when deletable is not disabled and drops it when deletable is false', async () => {
    const withDelete = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-3-0", { variant: "chat", file: urlFile() }),
    });
    expect(withDelete.root?.shadowRoot?.querySelector('[part="cross-icon"]')).not.toBeNull();
    const withoutDelete = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-3-0", { variant: "chat", file: urlFile({ deletable: false }) }),
    });
    expect(withoutDelete.root?.shadowRoot?.querySelector('[part="cross-icon"]')).toBeNull();
  });
});
describe('returnFileTypeLabel', () => {
  it.each([
    ['.png', 'Image'],
    ['.jpg', 'Image'],
    ['.txt', 'Text'],
    ['.zip', 'Zip'],
    ['.mp4', 'Video'],
    ['.mp3', 'Audio'],
    ['.json', 'Data'],
    ['.pptx', 'Presentation'],
    ['.xlsx', 'Spreadsheet'],
    ['.docx', 'Document'],
  ])('maps %s to %s', (extension, label) => {
    expect(returnFileTypeLabel(extension)).toBe(label);
  });
});
