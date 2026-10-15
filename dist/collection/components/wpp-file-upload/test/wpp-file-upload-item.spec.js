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
      template: () => h("wpp-file-upload-item-v4-5-0", { file: urlFile() }),
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
        template: () => h("wpp-file-upload-item-v4-5-0", { file: file }),
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
      template: () => h("wpp-file-upload-item-v4-5-0", { file: urlFile({ size: 15 * 1024 * 1024, ...overrides }) }),
    });
    const size = page.root?.shadowRoot?.querySelector('[part="loading"], [part="error-message"]');
    expect(size?.textContent?.trim()).toBe('15 MB');
    expect(size?.textContent).not.toContain('/');
  });
  it('renders the thumbnail card, file name and file-type subtitle in the chat variant', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { variant: "chat", file: urlFile() }),
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
      template: () => h("wpp-file-upload-item-v4-5-0", { variant: "chat", file: urlFile() }),
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
      template: () => (h("wpp-file-upload-item-v4-5-0", { variant: "chat", file: urlFile({ sizeError: true }), locales: { sizeError: 'Too big', formatError: 'Wrong format' } })),
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
      template: () => h("wpp-file-upload-item-v4-5-0", { variant: "chat", file: urlFile() }),
    });
    expect(withDelete.root?.shadowRoot?.querySelector('[part="cross-icon"]')).not.toBeNull();
    const withoutDelete = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { variant: "chat", file: urlFile({ deletable: false }) }),
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
describe('backend processing status model', () => {
  const statusFile = (overrides) => urlFile(overrides);
  it('still shows a percentage when status is uploading without an explicit progress value', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'uploading' }) }),
    });
    const shadow = page.root.shadowRoot;
    expect(shadow?.querySelector('wpp-spinner')).not.toBeNull();
    expect(shadow?.querySelector('[part="file-item"]')?.getAttribute('aria-busy')).toBe('true');
    // The design has one loading treatment: spinner + percentage. A file that has
    // not reported progress yet reads 0%, it does not hide the percentage.
    expect(shadow?.querySelector('[part="percentage"]')?.textContent?.trim()).toBe('0%');
    expect(shadow?.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('0');
  });
  it('exposes determinate progress on a progressbar matching the rendered percentage', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'uploading', progress: 42 }) }),
    });
    const shadow = page.root.shadowRoot;
    const progressbar = shadow?.querySelector('[role="progressbar"]');
    expect(shadow?.querySelector('[part="percentage"]')?.textContent?.trim()).toBe('42%');
    expect(progressbar?.getAttribute('aria-valuenow')).toBe('42');
    expect(progressbar?.getAttribute('aria-valuemin')).toBe('0');
    expect(progressbar?.getAttribute('aria-valuemax')).toBe('100');
    expect(progressbar?.getAttribute('aria-label')).toBe('Processing report.pdf');
  });
  it('clamps and rounds out-of-range progress values', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'uploading', progress: 140 }) }),
    });
    const shadow = page.root.shadowRoot;
    expect(shadow?.querySelector('[part="percentage"]')?.textContent?.trim()).toBe('100%');
    expect(shadow?.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('100');
  });
  it('keeps the delete control outside the progressbar so it is not made presentational', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'uploading', progress: 42 }) }),
    });
    const shadow = page.root.shadowRoot;
    const progressbar = shadow?.querySelector('[role="progressbar"]');
    expect(shadow?.querySelector('[part="cross-icon"]')).not.toBeNull();
    expect(progressbar?.querySelector('[part="cross-icon"]')).toBeNull();
  });
  it('renders the backend error message and clears the busy state', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'error', processingError: 'Infected file' }) }),
    });
    const shadow = page.root.shadowRoot;
    expect(shadow?.querySelector('.inline-message-error')?.getAttribute('message')).toBe('Infected file');
    expect(shadow?.querySelector('[part="file-item"]')?.getAttribute('aria-busy')).toBeNull();
    expect(shadow?.querySelector('wpp-spinner')).toBeNull();
  });
  it('keeps a backend-errored file deletable', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'error', processingError: 'Infected file' }) }),
    });
    const cross = page.root.shadowRoot?.querySelector('[part="cross-icon"]');
    expect(cross).not.toBeNull();
    expect(cross?.getAttribute('tabindex')).toBe('0');
  });
  it('shows no spinner or percentage once the status is done', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'done' }) }),
    });
    const shadow = page.root.shadowRoot;
    expect(shadow?.querySelector('wpp-spinner')).toBeNull();
    expect(shadow?.querySelector('[part="percentage"]')).toBeNull();
    expect(shadow?.querySelector('[part="file-item"]')?.getAttribute('aria-busy')).toBeNull();
  });
  it('still honours the deprecated isLoading flag', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ isLoading: true }) }),
    });
    const shadow = page.root.shadowRoot;
    expect(shadow?.querySelector('wpp-spinner')).not.toBeNull();
    expect(shadow?.querySelector('[part="file-item"]')?.getAttribute('aria-busy')).toBe('true');
  });
  it('lets an explicit status take precedence over the deprecated isLoading flag', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: statusFile({ isLoading: true, status: 'done' }) }),
    });
    const shadow = page.root.shadowRoot;
    expect(shadow?.querySelector('wpp-spinner')).toBeNull();
    expect(shadow?.querySelector('[part="file-item"]')?.getAttribute('aria-busy')).toBeNull();
  });
  it('localises the delete control label', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => (h("wpp-file-upload-item-v4-5-0", { file: urlFile(), locales: { removeFile: (name) => `Supprimer ${name}` } })),
    });
    expect(page.root.shadowRoot?.querySelector('[part="cross-icon"]')?.getAttribute('aria-label')).toBe('Supprimer report.pdf');
  });
  it('localises the progressbar accessible name', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => (h("wpp-file-upload-item-v4-5-0", { file: statusFile({ status: 'uploading', progress: 10 }), locales: { uploadProgress: (name) => `Traitement de ${name}` } })),
    });
    expect(page.root.shadowRoot?.querySelector('[role="progressbar"]')?.getAttribute('aria-label')).toBe('Traitement de report.pdf');
  });
});
describe('keyboard operability while a file is processing', () => {
  const uploading = (overrides = {}) => urlFile({ status: 'uploading', progress: 42, ...overrides });
  const renderItem = async (file) => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: file }),
    });
    const shadow = page.root.shadowRoot;
    return { page, shadow, cross: shadow.querySelector('[part="cross-icon"]') };
  };
  it('keeps the delete control in the tab order while the file is processing', async () => {
    const { cross } = await renderItem(uploading());
    expect(cross).not.toBeNull();
    expect(cross.getAttribute('tabindex')).toBe('0');
    expect(cross.getAttribute('role')).toBe('button');
    expect(cross.hasAttribute('aria-disabled')).toBe(false);
  });
  it('removes a processing file on Enter', async () => {
    const { page, cross } = await renderItem(uploading());
    const deleted = jest.fn();
    page.root?.addEventListener('wppDelete', deleted);
    cross.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    await page.waitForChanges();
    expect(deleted).toHaveBeenCalledTimes(1);
  });
  it('removes a processing file on Space', async () => {
    const { page, cross } = await renderItem(uploading());
    const deleted = jest.fn();
    page.root?.addEventListener('wppDelete', deleted);
    cross.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await page.waitForChanges();
    expect(deleted).toHaveBeenCalledTimes(1);
  });
  it('shows the design-system focus ring once the control is reached with Tab', async () => {
    const { page, shadow, cross } = await renderItem(uploading());
    expect(cross.classList.contains('tab-focus')).toBe(false);
    cross.dispatchEvent(new KeyboardEvent('keyup', { key: 'Tab' }));
    await page.waitForChanges();
    const refreshed = shadow.querySelector('[part="cross-icon"]');
    expect(refreshed.classList.contains('tab-focus')).toBe(true);
  });
  it('takes the delete control out of the tab order when the parent is disabled', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: uploading(), parentDisabled: true }),
    });
    const cross = page.root.shadowRoot?.querySelector('[part="cross-icon"]');
    expect(cross.getAttribute('tabindex')).toBe('-1');
    expect(cross.getAttribute('aria-disabled')).toBe('true');
  });
  // The delete control is re-created in a different wrapper when a file settles to
  // an error, which is what makes the focus restore in componentDidUpdate necessary.
  // Only the re-creation is asserted here: Stencil's mock DOM implements no `focus`
  // method at all, so whether focus actually moves is verified in a real browser.
  it('re-creates the delete control in the error wrapper when the file settles to an error', async () => {
    const file = uploading();
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: file }),
    });
    const shadow = page.root.shadowRoot;
    const before = shadow.querySelector('[part="cross-icon"]');
    expect(shadow.querySelector('.error-wrapper [part="cross-icon"]')).toBeNull();
    const instance = page.rootInstance;
    instance.file = { ...file, status: 'error', processingError: 'Rejected by server' };
    await page.waitForChanges();
    const after = shadow.querySelector('[part="cross-icon"]');
    expect(after).not.toBeNull();
    expect(after).not.toBe(before);
    expect(shadow.querySelector('.error-wrapper [part="cross-icon"]')).not.toBeNull();
    expect(shadow.querySelector('.inline-message-error')?.getAttribute('message')).toBe('Rejected by server');
  });
});
describe('progress precedence', () => {
  const withReaderProgress = async (file, readerPercent) => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: file }),
    });
    page.rootInstance.percentage = readerPercent;
    await page.waitForChanges();
    return page.root.shadowRoot;
  };
  it('prefers a backend-supplied progress over the local read', async () => {
    const shadow = await withReaderProgress(urlFile({ status: 'uploading', progress: 20 }), 100);
    expect(shadow.querySelector('[part="percentage"]')?.textContent?.trim()).toBe('20%');
    expect(shadow.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('20');
  });
  it('does not borrow the local read for a backend file that has not reported yet', async () => {
    // The local read finishes almost immediately, so falling back to it would show 100%
    // for a file the backend has not started on.
    const shadow = await withReaderProgress(urlFile({ status: 'uploading' }), 100);
    expect(shadow.querySelector('[part="percentage"]')?.textContent?.trim()).toBe('0%');
    expect(shadow.querySelector('[role="progressbar"]')?.getAttribute('aria-valuenow')).toBe('0');
  });
  it('still uses the local read for a file that is not backend-driven', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: urlFile() }),
    });
    const instance = page.rootInstance;
    // A file with no status is driven by the local read, so put it mid-read.
    instance.isLoadingFinished = false;
    instance.percentage = 33.3;
    await page.waitForChanges();
    const shadow = page.root.shadowRoot;
    expect(shadow.querySelector('[part="percentage"]')?.textContent?.trim()).toBe('33.3%');
  });
});
describe('a disabled uploader', () => {
  it('does not let the delete control remove a file', async () => {
    const page = await newSpecPage({
      components: [WppFileUploadItem],
      template: () => h("wpp-file-upload-item-v4-5-0", { file: urlFile(), parentDisabled: true }),
    });
    const cross = page.root.shadowRoot?.querySelector('[part="cross-icon"]');
    const deleted = jest.fn();
    page.root?.addEventListener('wppDelete', deleted);
    cross.click();
    cross.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    cross.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
    await page.waitForChanges();
    expect(deleted).not.toHaveBeenCalled();
  });
});
