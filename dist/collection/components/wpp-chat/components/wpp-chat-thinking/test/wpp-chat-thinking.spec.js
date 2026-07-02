import { newSpecPage } from '@stencil/core/testing';
import { WppChatThinking } from '../wpp-chat-thinking';
describe('wpp-chat-thinking', () => {
  it('should render the default label and a spinner', async () => {
    const page = await newSpecPage({
      components: [WppChatThinking],
      html: `<wpp-chat-thinking></wpp-chat-thinking>`,
    });
    expect(page.root).toMatchSnapshot();
    expect(page.root?.shadowRoot?.querySelector('.spinner')).not.toBeNull();
    expect(page.root?.shadowRoot?.querySelector('.label')?.textContent).toBe('Thinking...');
  });
  it('should render a custom label', async () => {
    const page = await newSpecPage({
      components: [WppChatThinking],
      html: `<wpp-chat-thinking label="Generating response..."></wpp-chat-thinking>`,
    });
    expect(page.root?.shadowRoot?.querySelector('.label')?.textContent).toBe('Generating response...');
  });
  it('should expose a live status region for assistive technology', async () => {
    const page = await newSpecPage({
      components: [WppChatThinking],
      html: `<wpp-chat-thinking></wpp-chat-thinking>`,
    });
    expect(page.root?.getAttribute('role')).toBe('status');
    expect(page.root?.getAttribute('aria-live')).toBe('polite');
  });
});
