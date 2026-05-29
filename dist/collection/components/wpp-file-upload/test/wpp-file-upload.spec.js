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
      template: () => (h("wpp-file-upload-v4-1-0", { acceptConfig: {
          'video/quicktime': ['.mov'],
          'video/x-msvideo': ['.avi'],
        } })),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render file uploader with file items based on url', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => h("wpp-file-upload-v4-1-0", { value: value }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should reset a controlled file upload when value changes to an empty array', async () => {
    const page = await newSpecPage({
      components: [WppFileUpload, WppFileUploadItem],
      template: () => h("wpp-file-upload-v4-1-0", { controlled: true, value: value }),
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
      template: () => h("wpp-file-upload-v4-1-0", { controlled: true, value: value }),
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
