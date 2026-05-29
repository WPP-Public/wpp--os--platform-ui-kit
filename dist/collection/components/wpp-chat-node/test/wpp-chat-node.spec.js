import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatNode } from '../wpp-chat-node';
const getRenderRoot = (root) => {
  const renderRoot = root?.shadowRoot ?? root;
  expect(renderRoot).toBeTruthy();
  return renderRoot;
};
describe('wpp-chat-node', () => {
  describe('Initialization', () => {
    it('should create component instance', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.rootInstance).toBeTruthy();
    });
    it('should default isLoading to false', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.rootInstance.isLoading).toBe(false);
    });
    it('should default isSelected to false', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.rootInstance.isSelected).toBe(false);
    });
    it('should default size to m', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.rootInstance.size).toBe('m');
    });
    it('should default nodeTitle to New canvas', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node/>`,
      });
      expect(page.rootInstance.nodeTitle).toBe('New canvas');
      expect(getRenderRoot(page.root).querySelector('.node-title')?.textContent).toBe('New canvas');
    });
  });
  describe('CSS classes', () => {
    it('should have wpp-chat-node host class', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.root?.classList.contains('wpp-chat-node')).toBe(true);
    });
    it('should have wpp-size-m class by default', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.root?.classList.contains('wpp-size-m')).toBe(true);
    });
    it('should have wpp-size-s class when size is s', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" size="s"/>`,
      });
      expect(page.root?.classList.contains('wpp-size-s')).toBe(true);
    });
    it('should add loading-node class when isLoading is true', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-loading="true"/>`,
      });
      const container = getRenderRoot(page.root).querySelector('.node-container');
      expect(container?.classList.contains('loading-node')).toBe(true);
    });
    it('should add selected-node class when isSelected is true', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-selected="true"/>`,
      });
      const container = getRenderRoot(page.root).querySelector('.node-container');
      expect(container?.classList.contains('selected-node')).toBe(true);
    });
    it('should not apply selected wrapper class while loading', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-selected="true" is-loading="true"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const container = renderRoot.querySelector('.node-container');
      const wrapper = renderRoot.querySelector('.node-wrapper');
      expect(container?.classList.contains('selected-node')).toBe(true);
      expect(container?.classList.contains('loading-node')).toBe(true);
      expect(wrapper?.classList.contains('is-selected')).toBe(false);
    });
  });
  describe('Rendering', () => {
    it('should render the header with a tooltip-backed truncated title for size m', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="My node"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const tooltip = renderRoot.querySelector('.title-tooltip');
      const title = renderRoot.querySelector('.node-title');
      expect(tooltip).toBeTruthy();
      expect(tooltip.getAttribute('text')).toBe('My node');
      expect(title?.textContent).toBe('My node');
    });
    it('should render a built-in chat bar with input and action buttons', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const chatBar = getRenderRoot(page.root).querySelector('.node-chat-bar');
      const input = chatBar?.querySelector('.chat-input');
      const actionButtons = chatBar?.querySelectorAll('wpp-action-button');
      expect(chatBar).toBeTruthy();
      expect(input).toBeTruthy();
      expect(actionButtons?.length).toBe(2);
    });
    it('should render the handles slot', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"><div slot="handles" class="test-handles"/></wpp-chat-node>`,
      });
      expect(page.root?.querySelector('[slot="handles"]')).toBeTruthy();
    });
    it('should not render a header icon by default', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(getRenderRoot(page.root).querySelector('wpp-icon-service')).toBeNull();
    });
    it('should render title icon prop when provided', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" title-icon="wpp-icon-service"/>`,
      });
      const titleIcon = getRenderRoot(page.root).querySelector('.title-icon');
      expect(titleIcon?.firstElementChild?.tagName.toLowerCase()).toContain('wpp-icon-service');
    });
    it('should render a slotted left icon when provided', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"><wpp-icon-service slot="left-icon"/></wpp-chat-node>`,
      });
      expect(page.root?.querySelector('[slot="left-icon"]')).toBeTruthy();
      expect(getRenderRoot(page.root).querySelector('.title-icon')).toBeNull();
    });
    it('should NOT render header or body for size s', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" size="s"/>`,
      });
      const shadowRoot = getRenderRoot(page.root);
      expect(shadowRoot.querySelector('.node-header')).toBeNull();
      expect(shadowRoot.querySelector('.node-body')).toBeNull();
      expect(shadowRoot.querySelector('.node-chat-bar')).toBeTruthy();
    });
    it('should match snapshot in idle state', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Idle"/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should match snapshot in selected state', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Selected" is-selected="true"/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should match snapshot in loading state', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Loading" is-loading="true"/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
    it('should match snapshot in size s', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="" size="s"/>`,
      });
      expect(page.root).toMatchSnapshot();
    });
  });
  describe('Action menu', () => {
    it('should keep simple attach behavior when no menu items are configured', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const attachSpy = jest.spyOn(page.rootInstance.wppAttach, 'emit');
      const renderRoot = getRenderRoot(page.root);
      const tooltip = renderRoot.querySelector('.node-chat-bar wpp-tooltip');
      const attachButton = renderRoot.querySelector('.node-chat-bar wpp-action-button');
      expect(tooltip.getAttribute('text')).toBe('Attach file');
      attachButton?.dispatchEvent(new MouseEvent('click'));
      expect(attachSpy).toHaveBeenCalled();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should use custom attach tooltip locale when no menu items are configured', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h('wpp-chat-node', { nodeTitle: 'Test', locales: { attachAction: 'Attach context' } }),
      });
      const tooltip = getRenderRoot(page.root).querySelector('.node-chat-bar wpp-tooltip');
      expect(tooltip.getAttribute('text')).toBe('Attach context');
    });
    it('should use custom message input label and placeholder locales', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h('wpp-chat-node', {
          nodeTitle: 'Test',
          locales: { messageInputLabel: 'Chat message', messageInput: 'Type a message...' },
        }),
      });
      const input = getRenderRoot(page.root).querySelector('.chat-input');
      expect(input.getAttribute('aria-label')).toBe('Chat message');
      expect(input.getAttribute('placeholder')).toBe('Type a message...');
    });
    it('should render action and model menu items when configured', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-1-0", { nodeTitle: "Test", actions: [{ icon: 'wpp-icon-document', label: 'Some link...' }], models: [{ id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' }] })),
      });
      const renderRoot = getRenderRoot(page.root);
      const menuContexts = renderRoot.querySelectorAll('wpp-menu-context');
      const menuContext = menuContexts[0];
      const modelMenuContext = menuContexts[1];
      const listItems = renderRoot.querySelectorAll('wpp-list-item');
      expect(menuContext).toBeTruthy();
      expect(menuContext?.hasAttribute('appendtolistwrapper')).toBe(true);
      expect(modelMenuContext).toBeTruthy();
      expect(modelMenuContext.hasAttribute('appendtolistwrapper')).toBe(true);
      expect(listItems?.length).toBe(3);
      expect(listItems?.[0].textContent).toContain('Some link...');
      expect(listItems?.[1].textContent).toContain('ChatGPT 4.5');
      expect(listItems?.[2].getAttribute('checked')).not.toBeNull();
    });
    it('should render assistant message attachments and default message actions', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      await page.rootInstance.addMessage({
        id: 'assistant-media',
        role: 'assistant',
        content: 'Here are the draft assets.',
        attachments: [
          { name: 'Street scene', type: 'image/jpeg', url: '/media/video/img.png' },
          { name: 'Preview clip', type: 'video/mp4', thumbnailUrl: '/media/video/img.png' },
          { name: 'Missing image', type: 'image/jpeg' },
        ],
      });
      await page.waitForChanges();
      const renderRoot = getRenderRoot(page.root);
      const attachments = renderRoot.querySelectorAll('.chat-attachment');
      const actionButtons = renderRoot.querySelectorAll('.chat-message-actions wpp-action-button');
      expect(attachments.length).toBe(3);
      expect(attachments[1].querySelector('.chat-attachment-play')).toBeTruthy();
      expect(attachments[2].querySelector('.chat-attachment-fallback')).toBeTruthy();
      expect(actionButtons.length).toBe(4);
    });
    it('should render default message actions when messageActions is undefined', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      Reflect.set(page.root, 'messageActions', undefined);
      await page.waitForChanges();
      await page.rootInstance.addMessage({
        id: 'assistant-default-actions',
        role: 'assistant',
        content: 'Ready for review.',
      });
      await page.waitForChanges();
      const actionButtons = getRenderRoot(page.root).querySelectorAll('.chat-message-actions wpp-action-button');
      expect(actionButtons.length).toBe(4);
    });
    it('should use locale labels for default message action tooltips', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h('wpp-chat-node', {
          nodeTitle: 'Test',
          locales: {
            copyMessageAction: 'Copiar',
            likeMessageAction: 'Me gusta',
            dislikeMessageAction: 'No me gusta',
            regenerateMessageAction: 'Regenerar',
          },
        }),
      });
      await page.rootInstance.addMessage({
        id: 'assistant-localized-actions',
        role: 'assistant',
        content: 'Ready for review.',
      });
      await page.waitForChanges();
      const tooltips = Array.from(getRenderRoot(page.root).querySelectorAll('.chat-message-actions wpp-tooltip'));
      expect(tooltips.map(tooltip => tooltip.getAttribute('text'))).toEqual([
        'Copiar',
        'Me gusta',
        'No me gusta',
        'Regenerar',
      ]);
    });
    it('should update default message action labels when locales change', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      await page.rootInstance.addMessage({
        id: 'assistant-locale-update-actions',
        role: 'assistant',
        content: 'Ready for review.',
      });
      await page.waitForChanges();
      let tooltips = Array.from(getRenderRoot(page.root).querySelectorAll('.chat-message-actions wpp-tooltip'));
      expect(tooltips.map(tooltip => tooltip.getAttribute('text'))).toEqual(['Copy', 'Like', 'Dislike', 'Regenerate']);
      const chatNode = page.root;
      chatNode.locales = {
        copyMessageAction: 'Copiar',
        likeMessageAction: 'Me gusta',
        dislikeMessageAction: 'No me gusta',
        regenerateMessageAction: 'Regenerar',
      };
      await page.waitForChanges();
      tooltips = Array.from(getRenderRoot(page.root).querySelectorAll('.chat-message-actions wpp-tooltip'));
      expect(tooltips.map(tooltip => tooltip.getAttribute('text'))).toEqual([
        'Copiar',
        'Me gusta',
        'No me gusta',
        'Regenerar',
      ]);
    });
    it('should keep explicit messageActions labels when locales are provided', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h('wpp-chat-node', {
          nodeTitle: 'Test',
          messageActions: [{ id: 'custom-copy', icon: 'wpp-icon-copy', label: 'Custom copy label' }],
          locales: { copyMessageAction: 'Copiar' },
        }),
      });
      await page.rootInstance.addMessage({
        id: 'assistant-custom-actions',
        role: 'assistant',
        content: 'Ready for review.',
      });
      await page.waitForChanges();
      const tooltips = Array.from(getRenderRoot(page.root).querySelectorAll('.chat-message-actions wpp-tooltip'));
      expect(tooltips.map(tooltip => tooltip.getAttribute('text'))).toEqual(['Custom copy label']);
    });
    it('should emit wppMessageActionClick when an assistant message action is clicked', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const actionSpy = jest.spyOn(page.rootInstance.wppMessageActionClick, 'emit');
      await page.rootInstance.addMessage({
        id: 'assistant-action',
        role: 'assistant',
        content: 'Ready for review.',
        actions: [{ id: 'copy', icon: 'wpp-icon-copy', label: 'Copy response' }],
      });
      await page.waitForChanges();
      const actionButton = getRenderRoot(page.root).querySelector('.chat-message-actions wpp-action-button');
      actionButton.dispatchEvent(new MouseEvent('click'));
      expect(actionSpy).toHaveBeenCalledWith({
        message: {
          id: 'assistant-action',
          role: 'assistant',
          content: 'Ready for review.',
          actions: [{ id: 'copy', icon: 'wpp-icon-copy', label: 'Copy response' }],
        },
        action: { id: 'copy', icon: 'wpp-icon-copy', label: 'Copy response' },
      });
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should emit wppActionClick when an action item is selected', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-1-0", { nodeTitle: "Test", actions: [{ icon: 'wpp-icon-document', label: 'Some link...' }] })),
      });
      const actionSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const actionItem = getRenderRoot(page.root).querySelector('wpp-list-item');
      actionItem?.dispatchEvent(new CustomEvent('wppChangeListItem'));
      expect(actionSpy).toHaveBeenCalledWith({ icon: 'wpp-icon-document', label: 'Some link...' });
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should emit wppModelSelect when a model item is selected', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-1-0", { nodeTitle: "Test", models: [
            { id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' },
            { id: 'claude-sonnet', label: 'Claude Sonnet', icon: 'wpp-icon-ai' },
          ] })),
      });
      const modelSpy = jest.spyOn(page.rootInstance.wppModelSelect, 'emit');
      const modelItems = getRenderRoot(page.root).querySelectorAll('.chat-models-menu wpp-list-item');
      modelItems?.[1].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(modelSpy).toHaveBeenCalledWith({ id: 'claude-sonnet', label: 'Claude Sonnet', icon: 'wpp-icon-ai' });
      expect(modelItems?.[1].getAttribute('checked')).not.toBeNull();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
  });
  describe('Interaction states', () => {
    it('should apply selected-node while the user interacts with the node and clear it on outside interaction', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const container = renderRoot.querySelector('.node-container');
      expect(container?.classList.contains('selected-node')).toBe(false);
      const input = renderRoot.querySelector('input');
      input.value = 'hello';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(container?.classList.contains('selected-node')).toBe(true);
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
      expect(container?.classList.contains('selected-node')).toBe(false);
    });
    it('should show loading after send until an assistant response chunk arrives', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const container = renderRoot.querySelector('.node-container');
      const input = renderRoot.querySelector('.chat-input');
      const sendButton = renderRoot.querySelectorAll('.node-chat-bar wpp-action-button')[1];
      input.value = 'Hello';
      input.dispatchEvent(new Event('input'));
      sendButton?.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(container?.classList.contains('loading-node')).toBe(true);
      await page.rootInstance.addMessage({ id: 'assistant-1', content: '', role: 'assistant' });
      await page.rootInstance.appendChunk('Hi');
      await page.waitForChanges();
      expect(container?.classList.contains('loading-node')).toBe(false);
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should render stop icon and emit wppStop while loading', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-loading="true"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const stopSpy = jest.spyOn(page.rootInstance.wppStop, 'emit');
      const sendButton = renderRoot.querySelectorAll('.node-chat-bar wpp-action-button')[1];
      expect(sendButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-stop');
      expect(sendButton.ariaProps.label).toBe('Stop response');
      sendButton.dispatchEvent(new MouseEvent('click'));
      expect(stopSpy).toHaveBeenCalled();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
  });
});
