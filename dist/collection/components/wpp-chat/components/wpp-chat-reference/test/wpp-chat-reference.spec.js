import { newSpecPage } from '@stencil/core/testing';
import { WppChatReference } from '../wpp-chat-reference';
describe('wpp-chat-reference', () => {
  it('should render a file reference by default', async () => {
    const page = await newSpecPage({
      components: [WppChatReference],
      html: `<wpp-chat-reference name="hero.png" file-type="PNG image" src="hero.png"></wpp-chat-reference>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root).toHaveAttribute('type');
    expect(page.root?.getAttribute('type')).toBe('file');
    const image = page.root?.shadowRoot?.querySelector('.thumbnail-image');
    expect(image).not.toBeNull();
    expect(image.getAttribute('src')).toBe('hero.png');
  });
  it('should render a fallback icon when no thumbnail src is provided', async () => {
    const page = await newSpecPage({
      components: [WppChatReference],
      html: `<wpp-chat-reference name="budget.xlsx" file-type="Spreadsheet"></wpp-chat-reference>`,
    });
    expect(page.root?.shadowRoot?.querySelector('.thumbnail-image')).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('.thumbnail')?.children.length).toBeGreaterThan(0);
  });
  it('should render a text reference with the requested line count', async () => {
    const page = await newSpecPage({
      components: [WppChatReference],
      html: `<wpp-chat-reference type="text" lines="2" text="Summarise the report"></wpp-chat-reference>`,
    });
    expect(page.root?.getAttribute('type')).toBe('text');
    expect(page.root?.getAttribute('lines')).toBe('2');
    const text = page.root?.shadowRoot?.querySelector('.text');
    expect(text?.classList.contains('lines-2')).toBe(true);
  });
  it('should emit wppClose when the close icon is clicked', async () => {
    const page = await newSpecPage({
      components: [WppChatReference],
      html: `<wpp-chat-reference name="hero.png"></wpp-chat-reference>`,
    });
    const closeSpy = jest.fn();
    page.root?.addEventListener('wppClose', closeSpy);
    const close = page.root?.shadowRoot?.querySelector('.close');
    close.click();
    await page.waitForChanges();
    expect(closeSpy).toHaveBeenCalled();
  });
  it('should emit wppClose on Enter and Space key presses', async () => {
    const page = await newSpecPage({
      components: [WppChatReference],
      html: `<wpp-chat-reference name="hero.png"></wpp-chat-reference>`,
    });
    const instance = page.rootInstance;
    const closeSpy = jest.fn();
    instance.wppClose = { emit: closeSpy };
    instance.handleCloseKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    instance.handleCloseKeyDown(new KeyboardEvent('keydown', { key: ' ' }));
    instance.handleCloseKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
    expect(closeSpy).toHaveBeenCalledTimes(2);
  });
  it('should not render the close icon when removable is false', async () => {
    const page = await newSpecPage({
      components: [WppChatReference],
      html: `<wpp-chat-reference name="hero.png" removable="false"></wpp-chat-reference>`,
    });
    expect(page.root?.shadowRoot?.querySelector('.close')).toBeNull();
  });
  it('should expose the localised remove label on the close icon', async () => {
    const page = await newSpecPage({
      components: [WppChatReference],
      html: `<wpp-chat-reference name="hero.png"></wpp-chat-reference>`,
    });
    const close = page.root?.shadowRoot?.querySelector('.close');
    expect(close?.getAttribute('aria-label')).toBe('Remove reference');
  });
});
