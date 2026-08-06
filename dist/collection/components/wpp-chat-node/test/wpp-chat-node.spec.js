import { readFileSync } from 'fs';
import { join } from 'path';
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
    it('should not apply the selected-node class while loading (mutually exclusive)', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-selected="true" is-loading="true"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const container = renderRoot.querySelector('.node-container');
      const wrapper = renderRoot.querySelector('.node-wrapper');
      // While loading, the loading ring owns the border and selected-node is suppressed at the
      // source, so the two classes never co-occur.
      expect(container?.classList.contains('loading-node')).toBe(true);
      expect(container?.classList.contains('selected-node')).toBe(false);
      expect(wrapper?.classList.contains('is-selected')).toBe(false);
    });
    it('should apply the selected-node class when selected and not loading', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-selected="true"/>`,
      });
      const container = getRenderRoot(page.root).querySelector('.node-container');
      expect(container?.classList.contains('selected-node')).toBe(true);
      expect(container?.classList.contains('loading-node')).toBe(false);
    });
    it('should draw the loading animation only on node-container::before overlay, not via container padding', () => {
      // The spec page does not inject scoped CSS, so assert against SCSS source directly.
      // Loading ring must be painted on .node-container.loading-node::before with inset: -2px,
      // and the old padding-based .loading-node rule must not exist.
      const styles = readFileSync(join(__dirname, '..', 'wpp-chat-node.scss'), 'utf8');
      expect(styles).toMatch(/\.node-container[\s\S]*?&\.loading-node::before\s*\{[\s\S]*?animation:\s*loading-rotate/);
      expect(styles).toMatch(/\.node-container[\s\S]*?&\.loading-node::before\s*\{[\s\S]*?inset:\s*-2px/);
      expect(styles).not.toMatch(/\.loading-node\s*\{[\s\S]*?padding:\s*2px/);
    });
    it('should keep identical inner content structure between normal and loading states', async () => {
      const innerHtml = (loading) => `<wpp-chat-node node-title="Test"${loading ? ' is-loading="true"' : ''}></wpp-chat-node>`;
      const normalPage = await newSpecPage({ components: [WppChatNode], html: innerHtml(false) });
      const loadingPage = await newSpecPage({ components: [WppChatNode], html: innerHtml(true) });
      const normalWrapper = getRenderRoot(normalPage.root).querySelector('.node-wrapper');
      const loadingWrapper = getRenderRoot(loadingPage.root).querySelector('.node-wrapper');
      const childStructure = (wrapper) => Array.from(wrapper?.children ?? []).map(child => child.className || child.tagName.toLowerCase());
      expect(childStructure(loadingWrapper)).toEqual(childStructure(normalWrapper));
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
    it('should render a built-in chat bar with input, action menu and microphone', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node is-selected="true" node-title="Test"/>`,
      });
      const chatBar = getRenderRoot(page.root).querySelector('.node-chat-bar');
      const input = chatBar?.querySelector('.chat-input');
      const actionButtons = chatBar?.querySelectorAll('wpp-action-button');
      const micButton = chatBar?.querySelector('[data-testid="chat-node-mic-btn"]');
      expect(chatBar).toBeTruthy();
      expect(input).toBeTruthy();
      // Attach (+ menu), the model-selector trigger and the microphone action buttons are always
      // present (the model selector now always renders, at minimum with the built-in defaults).
      expect(actionButtons?.length).toBe(3);
      expect(micButton).toBeTruthy();
      // The send button is always in the DOM; it stays collapsed (.is-hidden) until
      // the input has content (Active Filled state) so it can transition in smoothly.
      const sendButton = chatBar?.querySelector('wpp-button');
      expect(sendButton).toBeTruthy();
      expect(sendButton?.classList.contains('is-hidden')).toBe(true);
      input.value = 'Hello';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      expect(chatBar?.querySelector('wpp-button')?.classList.contains('is-hidden')).toBe(false);
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should render the handles slot', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"><div slot="handles" class="test-handles"/></wpp-chat-node>`,
      });
      expect(page.root?.querySelector('[slot="handles"]')).toBeTruthy();
    });
    it('should always render a fixed wpp-icon-service header icon', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const titleIcon = getRenderRoot(page.root).querySelector('.title-icon');
      expect(titleIcon).toBeTruthy();
      expect(titleIcon?.firstElementChild?.tagName.toLowerCase()).toContain('wpp-icon-service');
    });
    it('should render the fixed header icon in the idle state', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(getRenderRoot(page.root).querySelectorAll('.title-icon')).toHaveLength(1);
    });
    it('should keep the fixed header icon while selected and loading', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-selected="true" is-loading="true"/>`,
      });
      const titleIcon = getRenderRoot(page.root).querySelector('.title-icon');
      expect(titleIcon?.firstElementChild?.tagName.toLowerCase()).toContain('wpp-icon-service');
    });
    it('should ignore the deprecated titleIcon prop and keep the fixed wpp-icon-service icon', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" title-icon="wpp-icon-search"/>`,
      });
      const titleIcon = getRenderRoot(page.root).querySelector('.title-icon');
      // The deprecated prop is kept for backward compatibility but must not change the rendered icon.
      expect(getRenderRoot(page.root).querySelectorAll('.title-icon')).toHaveLength(1);
      expect(titleIcon?.firstElementChild?.tagName.toLowerCase()).toContain('wpp-icon-service');
      expect(getRenderRoot(page.root).querySelector('wpp-icon-search')).toBeNull();
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
      // Free-form message field: autocomplete="off" keeps it WCAG 1.3.5 valid (no autofill token).
      expect(input.getAttribute('autocomplete')).toBe('off');
    });
    it('should render the actions menu and the avatar-triggered model selector with the built-in defaults and provided models', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", actions: [{ icon: 'wpp-icon-document', label: 'Some link...' }], selectedModel: { id: 'gpt-45', label: 'ChatGPT 4.5', logo: '/models/gpt.svg' }, models: [
            { id: 'gpt-45', label: 'ChatGPT 4.5', logo: '/models/gpt.svg' },
            { id: 'claude', label: 'Claude', logo: '/models/claude.svg' },
          ] })),
      });
      const renderRoot = getRenderRoot(page.root);
      const actionsMenu = renderRoot.querySelector('.chat-actions-menu-context');
      const modelSelector = renderRoot.querySelector('.chat-model-selector');
      const modelTriggerAvatar = modelSelector?.querySelector('.model-avatar');
      const actionItems = actionsMenu?.querySelectorAll('wpp-list-item');
      const modelItems = renderRoot.querySelectorAll('.wpp-model-dropdown wpp-list-item');
      // Neither menu may set `appendToListWrapper`: that appends the dropdown into the
      // node's own list wrapper, so it lays out inside the card instead of floating
      // anchored to its trigger. Leaving it off lets tippy append to the highest
      // container in the DOM, which is what wpp-chat-input does.
      expect(actionsMenu).toBeTruthy();
      expect(actionsMenu.hasAttribute('appendtolistwrapper')).toBe(false);
      expect(modelSelector).toBeTruthy();
      expect(modelSelector.hasAttribute('appendtolistwrapper')).toBe(false);
      // The model selector is triggered by a compact logo avatar (not a full logo + label),
      // and its dropdown opens above the trigger and is left-aligned to it (top-start) per Figma:
      // its left edge lines up with the trigger's left edge and it extends to the right. It falls
      // back to bottom-start (still left-aligned) when there is no room above.
      expect(modelTriggerAvatar).toBeTruthy();
      expect(modelSelector.dropdownConfig?.placement).toBe('top-start');
      expect(modelSelector.dropdownConfig?.popperOptions?.modifiers?.[0]).toEqual({
        name: 'flip',
        options: { fallbackPlacements: ['bottom-start'] },
      });
      expect(actionItems?.length).toBe(1);
      expect(actionItems?.[0].textContent).toContain('Some link...');
      // The dropdown always starts with the two built-in defaults (Auto, Premium), then lists
      // the provided models below them: 2 defaults + 2 models = 4 items.
      expect(modelItems?.length).toBe(4);
      expect(modelItems?.[0].textContent).toContain('Auto');
      expect(modelItems?.[1].textContent).toContain('Premium');
      expect(modelItems?.[2].textContent).toContain('ChatGPT 4.5');
      expect(modelItems?.[3].textContent).toContain('Claude');
      // selectedModel set to the ChatGPT model marks that item (not a default) as checked.
      expect(modelItems?.[2].getAttribute('checked')).not.toBeNull();
      expect(modelItems?.[0].getAttribute('checked')).toBeNull();
    });
    it('should render only the built-in defaults with a single provided model in the dropdown', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", models: [{ id: 'gpt-45', label: 'ChatGPT 4.5', logo: '/models/gpt.svg' }] })),
      });
      const renderRoot = getRenderRoot(page.root);
      const modelSelector = renderRoot.querySelector('.chat-model-selector');
      const modelItems = renderRoot.querySelectorAll('.wpp-model-dropdown wpp-list-item');
      // A single model no longer renders a static avatar: the selector always opens a dropdown
      // (built-in defaults + the single provided model = 3 items). No static single-model trigger.
      expect(renderRoot.querySelector('.model-selector-trigger.single-model')).toBeNull();
      expect(modelSelector).toBeTruthy();
      expect(modelItems.length).toBe(3);
      expect(modelItems[0].textContent).toContain('Auto');
      expect(modelItems[2].textContent).toContain('ChatGPT 4.5');
      // With no selectedModel set, the "Auto" default is selected by default.
      expect(modelItems[0].getAttribute('checked')).not.toBeNull();
    });
    it('should render the built-in defaults and a "Select model or agent" action when no models are provided', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-3-0", { nodeTitle: "Test" }),
      });
      const renderRoot = getRenderRoot(page.root);
      const modelSelector = renderRoot.querySelector('.chat-model-selector');
      const modelItems = renderRoot.querySelectorAll('.wpp-model-dropdown wpp-list-item');
      // Even with no models, the selector renders: 2 defaults + the "Select model or agent" action.
      expect(modelSelector).toBeTruthy();
      expect(modelItems.length).toBe(3);
      expect(modelItems[0].textContent).toContain('Auto');
      expect(modelItems[1].textContent).toContain('Premium');
      expect(modelItems[2].textContent).toContain('Select model or agent');
    });
    it('should emit wppModelBrowse when the "Select model or agent" action is clicked', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-3-0", { nodeTitle: "Test" }),
      });
      const selectSpy = jest.spyOn(page.rootInstance.wppModelBrowse, 'emit');
      const modelItems = getRenderRoot(page.root).querySelectorAll('.wpp-model-dropdown wpp-list-item');
      modelItems[2].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(selectSpy).toHaveBeenCalledTimes(1);
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
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
    it('exposes the horizontally scrollable attachments strip as a keyboard tab stop (WCAG 2.1.1)', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      await page.rootInstance.addMessage({
        id: 'assistant-media',
        role: 'assistant',
        content: 'Here are the draft assets.',
        attachments: [{ name: 'Street scene', type: 'image/jpeg', url: '/media/video/img.png' }],
      });
      await page.waitForChanges();
      const region = getRenderRoot(page.root).querySelector('.chat-attachments');
      expect(region?.getAttribute('tabindex')).toBe('0');
      expect(region?.getAttribute('aria-label')).toBe('Attachments');
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
        template: () => (h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", actions: [{ icon: 'wpp-icon-document', label: 'Some link...' }] })),
      });
      const actionSpy = jest.spyOn(page.rootInstance.wppActionClick, 'emit');
      const actionItem = getRenderRoot(page.root).querySelector('wpp-list-item');
      actionItem?.dispatchEvent(new CustomEvent('wppChangeListItem'));
      expect(actionSpy).toHaveBeenCalledWith({ icon: 'wpp-icon-document', label: 'Some link...' });
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should emit wppModelSelect with the model object when a provided model item is selected', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", models: [
            { id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' },
            { id: 'claude-sonnet', label: 'Claude Sonnet', icon: 'wpp-icon-ai' },
          ] })),
      });
      const modelSpy = jest.spyOn(page.rootInstance.wppModelSelect, 'emit');
      // 2 defaults + 2 provided models: the provided models start at index 2.
      const modelItems = getRenderRoot(page.root).querySelectorAll('.wpp-model-dropdown wpp-list-item');
      modelItems?.[3].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(modelSpy).toHaveBeenCalledWith({ id: 'claude-sonnet', label: 'Claude Sonnet', icon: 'wpp-icon-ai' });
      // Selecting a model syncs selectedModel, which marks that item as checked.
      expect(page.rootInstance.selectedModel).toMatchObject({ id: 'claude-sonnet' });
      expect(modelItems?.[3].getAttribute('checked')).not.toBeNull();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should emit wppModelSelect with the default model object when a built-in default option is selected', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", selectedModel: { id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' }, models: [{ id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' }] })),
      });
      const modelSpy = jest.spyOn(page.rootInstance.wppModelSelect, 'emit');
      const modelItems = getRenderRoot(page.root).querySelectorAll('.wpp-model-dropdown wpp-list-item');
      // Index 1 is the built-in "Premium" default.
      modelItems?.[1].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(modelSpy).toHaveBeenCalledWith(expect.objectContaining({ id: 'premium', label: 'Premium' }));
      expect(page.rootInstance.selectedModel).toBe('premium');
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
  });
  // The id-based `selectedModelId` prop is deprecated in favour of `selectedModel`, but it still
  // drives the selection so existing id-driven usages keep working.
  describe('Deprecated selectedModelId', () => {
    const models = [
      { id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' },
      { id: 'claude-sonnet', label: 'Claude Sonnet', icon: 'wpp-icon-ai' },
    ];
    const getModelItems = (page) => getRenderRoot(page.root).querySelectorAll('.wpp-model-dropdown wpp-list-item');
    it('should select the provided model matching the deprecated selectedModelId', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", selectedModelId: "claude-sonnet", models: models }),
      });
      // 2 built-in defaults + 2 provided models: "Claude Sonnet" is the last item.
      const modelItems = getModelItems(page);
      expect(modelItems[3].getAttribute('checked')).not.toBeNull();
      expect(modelItems[0].getAttribute('checked')).toBeNull();
      // The compact trigger avatar also resolves to the model behind the deprecated id.
      expect(getRenderRoot(page.root).querySelector('.model-avatar')?.getAttribute('name')).toBe('Claude Sonnet');
    });
    it('should select the built-in default matching the deprecated selectedModelId', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", selectedModelId: "premium", models: models }),
      });
      const modelItems = getModelItems(page);
      expect(modelItems[1].getAttribute('checked')).not.toBeNull();
      expect(modelItems[0].getAttribute('checked')).toBeNull();
    });
    it('should fall back to the "Auto" default when the deprecated selectedModelId matches no model', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", selectedModelId: "unknown-model", models: models }),
      });
      expect(getModelItems(page)[0].getAttribute('checked')).not.toBeNull();
    });
    it('should let selectedModel take precedence over the deprecated selectedModelId', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", selectedModel: models[0], selectedModelId: "claude-sonnet", models: models })),
      });
      const modelItems = getModelItems(page);
      expect(modelItems[2].getAttribute('checked')).not.toBeNull();
      expect(modelItems[3].getAttribute('checked')).toBeNull();
    });
    it('should mirror selectedModel into the deprecated selectedModelId so a stale id cannot resurface', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", selectedModelId: "claude-sonnet", models: models }),
      });
      page.rootInstance.selectedModel = 'premium';
      await page.waitForChanges();
      expect(page.rootInstance.selectedModelId).toBe('premium');
      expect(getModelItems(page)[1].getAttribute('checked')).not.toBeNull();
      // Back to the `'auto'` default: the id no longer points at "Claude Sonnet", so "Auto" wins.
      page.rootInstance.selectedModel = 'auto';
      await page.waitForChanges();
      expect(page.rootInstance.selectedModelId).toBe('auto');
      expect(getModelItems(page)[0].getAttribute('checked')).not.toBeNull();
    });
    it('should keep the deprecated selectedModelId in sync when a model is picked from the dropdown', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-3-0", { nodeTitle: "Test", selectedModelId: "claude-sonnet", models: models }),
      });
      // Re-picking the already selected option leaves `selectedModel` untouched, so the id is
      // mirrored by the selection handler rather than by the `selectedModel` watcher.
      getModelItems(page)[0].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(page.rootInstance.selectedModel).toBe('auto');
      expect(page.rootInstance.selectedModelId).toBe('auto');
      expect(getModelItems(page)[0].getAttribute('checked')).not.toBeNull();
      getModelItems(page)[3].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(page.rootInstance.selectedModelId).toBe('claude-sonnet');
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
        html: `<wpp-chat-node is-selected="true" node-title="Test"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const container = renderRoot.querySelector('.node-container');
      const input = renderRoot.querySelector('.chat-input');
      input.value = 'Hello';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      // The send button only renders once the input has content (Active Filled state).
      const sendButton = renderRoot.querySelectorAll('.node-chat-bar wpp-button')[0];
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
    it('keeps the hidden send button out of the a11y tree and tab order via inert (WCAG 4.1.2)', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const sendButton = renderRoot.querySelector('.node-chat-bar wpp-button.play-btn');
      // With an empty input the send button is still rendered (so it can fade in) but hidden.
      // It must be `inert` so its focusable inner control is removed from focus and the
      // accessibility tree. Using aria-hidden here instead would trip axe's aria-hidden-focus
      // rule, because the hidden button still contains a focusable native <button>.
      expect(sendButton).toBeTruthy();
      expect(sendButton.classList.contains('is-hidden')).toBe(true);
      expect(sendButton.hasAttribute('inert')).toBe(true);
      expect(sendButton.hasAttribute('aria-hidden')).toBe(false);
      expect(sendButton.hasAttribute('tabindex')).toBe(false);
      const input = renderRoot.querySelector('.chat-input');
      input.value = 'Hello';
      input.dispatchEvent(new Event('input'));
      await page.waitForChanges();
      // Once there is content the button becomes the active primary action: visible,
      // interactive, and back in the tab order / accessibility tree.
      expect(sendButton.classList.contains('is-hidden')).toBe(false);
      expect(sendButton.hasAttribute('inert')).toBe(false);
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
      const sendButton = renderRoot.querySelectorAll('.node-chat-bar wpp-button')[0];
      expect(sendButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-stop');
      expect(sendButton.ariaProps.label).toBe('Stop response');
      sendButton.dispatchEvent(new MouseEvent('click'));
      expect(stopSpy).toHaveBeenCalled();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should default isReRun to false', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.rootInstance.isReRun).toBe(false);
    });
    it('should render refresh icon and emit wppReRun while in the re-run state', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-re-run="true"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const reRunSpy = jest.spyOn(page.rootInstance.wppReRun, 'emit');
      const actionButton = renderRoot.querySelectorAll('.node-chat-bar wpp-button')[0];
      expect(actionButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-refresh');
      expect(actionButton.ariaProps.label).toBe('Re-run');
      actionButton.dispatchEvent(new MouseEvent('click'));
      expect(reRunSpy).toHaveBeenCalled();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should prioritise the loading (stop) state over the re-run state', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-loading="true" is-re-run="true"/>`,
      });
      const renderRoot = getRenderRoot(page.root);
      const actionButton = renderRoot.querySelectorAll('.node-chat-bar wpp-button')[0];
      expect(actionButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-stop');
      expect(actionButton.ariaProps.label).toBe('Stop response');
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
  });
  describe('Accessibility', () => {
    it('renders the decorative message avatar as presentational, not as a focusable button', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      await page.rootInstance.addMessage({
        id: 'assistant-avatar',
        role: 'assistant',
        content: 'Ready for review.',
      });
      await page.waitForChanges();
      const avatar = getRenderRoot(page.root).querySelector('.message-avatar');
      expect(avatar).toBeTruthy();
      // wpp-avatar defaults to role="button" tabindex="0"; the decorative chat avatar must opt out
      // so axe does not flag it as an ARIA command without an accessible name (SC 4.1.2).
      expect(avatar.getAttribute('role')).toBe('presentation');
    });
  });
  describe('Audio input', () => {
    it('should render a microphone button with the idle record label', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const micButton = getRenderRoot(page.root).querySelector('[data-testid="chat-node-mic-btn"]');
      expect(micButton).toBeTruthy();
      expect(micButton.ariaProps.label).toBe('Start audio recording');
      expect(micButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-mic-on');
    });
    it('should toggle to the listening state and emit wppMic when audio recording is available', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      const micSpy = jest.spyOn(page.rootInstance.wppMic, 'emit');
      // Simulate an available SpeechRecognition engine.
      const startMock = jest.fn();
      const stopMock = jest.fn();
      Reflect.set(page.rootInstance, 'recognition', { start: startMock, stop: stopMock });
      const micButton = getRenderRoot(page.root).querySelector('[data-testid="chat-node-mic-btn"]');
      micButton.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(page.rootInstance.isAudioRecording).toBe(true);
      expect(micSpy).toHaveBeenCalledTimes(1);
      expect(micSpy).toHaveBeenLastCalledWith({ isRecording: true });
      expect(startMock).toHaveBeenCalled();
      const listeningMic = getRenderRoot(page.root).querySelector('[data-testid="chat-node-mic-btn"]');
      expect(listeningMic.ariaProps.label).toBe('Stop audio recording');
      expect(listeningMic.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-stop');
      listeningMic.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(page.rootInstance.isAudioRecording).toBe(false);
      expect(micSpy).toHaveBeenCalledTimes(2);
      expect(micSpy).toHaveBeenLastCalledWith({ isRecording: false });
      expect(stopMock).toHaveBeenCalled();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should not toggle the listening state when SpeechRecognition is unavailable', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      Reflect.set(page.rootInstance, 'recognition', null);
      const micButton = getRenderRoot(page.root).querySelector('[data-testid="chat-node-mic-btn"]');
      micButton.dispatchEvent(new MouseEvent('click'));
      await page.waitForChanges();
      expect(page.rootInstance.isAudioRecording).toBe(false);
    });
  });
  describe('Re-run state', () => {
    it('should default isReRun to false', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"/>`,
      });
      expect(page.rootInstance.isReRun).toBe(false);
    });
    it('should show a refresh re-run button and emit wppReRun when isReRun is true', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-re-run="true"/>`,
      });
      const reRunSpy = jest.spyOn(page.rootInstance.wppReRun, 'emit');
      const reRunButton = getRenderRoot(page.root).querySelector('.node-chat-bar wpp-button');
      // Re-run button is visible even with an empty input.
      expect(reRunButton.classList.contains('is-hidden')).toBe(false);
      expect(reRunButton.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-refresh');
      expect(reRunButton.ariaProps.label).toBe('Re-run');
      reRunButton.dispatchEvent(new MouseEvent('click'));
      expect(reRunSpy).toHaveBeenCalled();
      window.dispatchEvent(new Event('pointerdown'));
      await page.waitForChanges();
    });
    it('should prioritise the stop action over re-run while loading', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test" is-re-run="true" is-loading="true"/>`,
      });
      const button = getRenderRoot(page.root).querySelector('.node-chat-bar wpp-button');
      expect(button.querySelector('[slot="icon-start"]')?.tagName.toLowerCase()).toContain('wpp-icon-stop');
      expect(button.ariaProps.label).toBe('Stop response');
    });
  });
});
