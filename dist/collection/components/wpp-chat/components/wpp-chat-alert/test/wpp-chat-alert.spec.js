import { newSpecPage } from '@stencil/core/testing';
import { WppChatAlert } from '../wpp-chat-alert';
describe('wpp-chat-alert', () => {
  it('should render an error alert by default', async () => {
    const page = await newSpecPage({
      components: [WppChatAlert],
      html: `<wpp-chat-alert message="Error message"></wpp-chat-alert>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root?.getAttribute('type')).toBe('error');
    expect(page.root?.shadowRoot?.querySelector('.message')?.textContent).toBe('Error message');
    expect(page.root?.shadowRoot?.querySelector('.alert')?.getAttribute('role')).toBe('alert');
  });
  it('should render the secondary description when provided', async () => {
    const page = await newSpecPage({
      components: [WppChatAlert],
      html: `<wpp-chat-alert message="Upload failed" description="Max 25 MB"></wpp-chat-alert>`,
    });
    expect(page.root?.shadowRoot?.querySelector('.description')?.textContent).toBe('Max 25 MB');
  });
  it('should not render the description when omitted', async () => {
    const page = await newSpecPage({
      components: [WppChatAlert],
      html: `<wpp-chat-alert message="Error message"></wpp-chat-alert>`,
    });
    expect(page.root?.shadowRoot?.querySelector('.description')).toBeNull();
  });
  it('should emit wppClose when the close icon is clicked', async () => {
    const page = await newSpecPage({
      components: [WppChatAlert],
      html: `<wpp-chat-alert message="Error message"></wpp-chat-alert>`,
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
      components: [WppChatAlert],
      html: `<wpp-chat-alert message="Error message"></wpp-chat-alert>`,
    });
    const instance = page.rootInstance;
    const closeSpy = jest.fn();
    instance.wppClose = { emit: closeSpy };
    instance.handleCloseKeyDown(new KeyboardEvent('keydown', { key: 'Enter' }));
    instance.handleCloseKeyDown(new KeyboardEvent('keydown', { key: ' ' }));
    instance.handleCloseKeyDown(new KeyboardEvent('keydown', { key: 'a' }));
    expect(closeSpy).toHaveBeenCalledTimes(2);
  });
  it('should not render the close icon when closable is false', async () => {
    const page = await newSpecPage({
      components: [WppChatAlert],
      html: `<wpp-chat-alert message="Error message" closable="false"></wpp-chat-alert>`,
    });
    expect(page.root?.shadowRoot?.querySelector('.close')).toBeNull();
  });
  it('should expose the localised close label on the close icon', async () => {
    const page = await newSpecPage({
      components: [WppChatAlert],
      html: `<wpp-chat-alert message="Error message"></wpp-chat-alert>`,
    });
    const close = page.root?.shadowRoot?.querySelector('.close');
    expect(close?.getAttribute('aria-label')).toBe('Dismiss');
  });
});
