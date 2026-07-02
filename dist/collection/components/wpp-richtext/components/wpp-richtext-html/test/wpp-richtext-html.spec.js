import { WppRichtextHtml } from '../wpp-richtext-html';
import { newSpecPage } from '@stencil/core/testing';
describe('WppRichtextHtml', () => {
  let page;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [WppRichtextHtml],
    });
  });
  it('renders and sets default wpp theme class', async () => {
    await page.setContent('<wpp-richtext-html></wpp-richtext-html>');
    expect(page.root).toEqualHtml(`
      <wpp-richtext-html>
        <wpp-richtext-common-styles></wpp-richtext-common-styles>
        <div class="ql-container ql-wpp richtext-view-html" data-testid="richtext-editor-container">
          <div class="ql-editor" data-testid="richtext-editor"></div>
        </div>
      </wpp-richtext-html>
    `);
    expect(page.rootInstance.value).toBe(undefined);
  });
  it('renders initial value', async () => {
    await page.setContent('<wpp-richtext-html value="<p>Hallo</p>"></wpp-richtext-html>');
    expect(page.root).toEqualHtml(`
      <wpp-richtext-html value="<p>Hallo</p>">
        <wpp-richtext-common-styles></wpp-richtext-common-styles>
        <div class="ql-container ql-wpp richtext-view-html" data-testid="richtext-editor-container">
          <div class="ql-editor" data-testid="richtext-editor">
            <p>
              Hallo
            </p>
          </div>
        </div>
      </wpp-richtext-html>
    `);
    expect(page.rootInstance.value).toEqual('<p>Hallo</p>');
  });
  it('renders value update', async () => {
    await page.setContent('<wpp-richtext-html value="<p>Hallo</p>"></wpp-richtext-html>');
    const richtextHtml = page.rootInstance;
    richtextHtml.value = '<p>test</p>';
    await page.waitForChanges();
    expect(page.root).toEqualHtml(`
      <wpp-richtext-html value="<p>Hallo</p>">
        <wpp-richtext-common-styles></wpp-richtext-common-styles>
        <div class="ql-container ql-wpp richtext-view-html" data-testid="richtext-editor-container">
          <div class="ql-editor" data-testid="richtext-editor">
            <p>
              test
            </p>
          </div>
        </div>
      </wpp-richtext-html>
    `);
    expect(page.rootInstance.value).toBe('<p>test</p>');
  });
});
