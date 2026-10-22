import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatNode } from '../wpp-chat-node';
import * as loadingHalo from '../../../utils/loading-halo';
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
    it('should register the loading animation angle on connectedCallback', async () => {
      const registerSpy = jest.spyOn(loadingHalo, 'registerLoadingHaloAngle');
      await newSpecPage({
        components: [WppChatNode],
        html: `<wpp-chat-node node-title="Test"></wpp-chat-node>`,
      });
      expect(registerSpy).toHaveBeenCalled();
      registerSpy.mockRestore();
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
      // Paired with the snapshot, which this change touched: the model rows are now a
      // single-select group, which is what makes `aria-checked` legal on them (WPPOPENDS-1593).
      const modelRows = getRenderRoot(page.root).querySelectorAll('.wpp-model-dropdown wpp-list-item');
      expect(modelRows[0].getAttribute('role')).toBe('menuitemradio');
      expect(modelRows[0].getAttribute('aria-checked')).toBe('true');
      expect(modelRows[1].getAttribute('aria-checked')).toBe('false');
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
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", actions: [{ icon: 'wpp-icon-document', label: 'Some link...' }], selectedModel: { id: 'gpt-45', label: 'ChatGPT 4.5', logo: '/models/gpt.svg' }, models: [
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
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", models: [{ id: 'gpt-45', label: 'ChatGPT 4.5', logo: '/models/gpt.svg' }] })),
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
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test" }),
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
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test" }),
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
      expect(actionButtons.length).toBe(2);
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
      expect(actionButtons.length).toBe(2);
    });
    it('should use locale labels for default message action tooltips', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h('wpp-chat-node', {
          nodeTitle: 'Test',
          locales: {
            copyMessageAction: 'Copiar',
            pinMessageAction: 'Fijar',
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
      expect(tooltips.map(tooltip => tooltip.getAttribute('text'))).toEqual(['Copiar', 'Fijar']);
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
      expect(tooltips.map(tooltip => tooltip.getAttribute('text'))).toEqual(['Copy', 'Pin']);
      const chatNode = page.root;
      chatNode.locales = {
        copyMessageAction: 'Copiar',
        pinMessageAction: 'Fijar',
      };
      await page.waitForChanges();
      tooltips = Array.from(getRenderRoot(page.root).querySelectorAll('.chat-message-actions wpp-tooltip'));
      expect(tooltips.map(tooltip => tooltip.getAttribute('text'))).toEqual(['Copiar', 'Fijar']);
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
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", actions: [{ icon: 'wpp-icon-document', label: 'Some link...' }] })),
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
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", models: [
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
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModel: { id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' }, models: [{ id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' }] })),
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
  describe('Reasoning and verbosity options (WPPOPENDS-1593)', () => {
    const REASONING_OPTIONS = [
      { id: 'none', label: 'None' },
      { id: 'medium', label: 'Medium', caption: 'Balanced with moderate reasoning' },
      { id: 'high', label: 'High', caption: 'Thorough with deep reasoning' },
    ];
    const VERBOSITY_OPTIONS = [
      { id: 'low', label: 'Low', caption: 'Concise and direct' },
      { id: 'high', label: 'High', caption: 'Comprehensive and detailed' },
    ];
    const GPT_MODEL = {
      id: 'gpt',
      label: 'GPT 5.4 Mini',
      icon: 'wpp-icon-ai',
      reasoningOptions: REASONING_OPTIONS,
      verbosityOptions: VERBOSITY_OPTIONS,
    };
    const GEMINI_MODEL = {
      id: 'gemini',
      label: 'Gemini 3.5 Flash',
      icon: 'wpp-icon-ai',
      reasoningOptions: REASONING_OPTIONS,
    };
    const getDropdown = (page) => getRenderRoot(page.root).querySelector('.wpp-model-dropdown');
    const getSubmenu = (page, label) => Array.from(getDropdown(page)?.querySelectorAll('wpp-menu-context') || []).find(menu => menu.querySelector('[slot="trigger-element"] span[slot="label"]')?.textContent === label) || null;
    const getOptionRows = (page, label) => Array.from(getSubmenu(page, label)?.querySelectorAll('.wpp-model-options-dropdown > wpp-list-item') || []);
    const mountWithModel = async (model, props = {}) => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModel: model, ...props }),
      });
      await page.waitForChanges();
      return page;
    };
    it('renders no option rows for the built-in "auto" and "premium" models', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test" }),
      });
      expect(getSubmenu(page, 'Reasoning')).toBeNull();
      expect(getSubmenu(page, 'Verbosity')).toBeNull();
    });
    it('renders a Reasoning row but no Verbosity row for a model that supplies only reasoningOptions', async () => {
      const page = await mountWithModel(GEMINI_MODEL);
      expect(getSubmenu(page, 'Reasoning')).not.toBeNull();
      expect(getSubmenu(page, 'Verbosity')).toBeNull();
    });
    it('renders both rows, and marks the submenu trigger as extended so a click cannot dismiss the menu', async () => {
      const page = await mountWithModel(GPT_MODEL);
      expect(getSubmenu(page, 'Reasoning')).not.toBeNull();
      expect(getSubmenu(page, 'Verbosity')).not.toBeNull();
      expect(getSubmenu(page, 'Reasoning')?.querySelector('[slot="trigger-element"]')?.getAttribute('isExtended')).not.toBeNull();
    });
    it('renders the option label and caption, and omits the caption element when none is supplied', async () => {
      const page = await mountWithModel(GPT_MODEL);
      const rows = getOptionRows(page, 'Reasoning');
      expect(rows.map(row => row.querySelector('span[slot="label"]')?.textContent)).toEqual(['None', 'Medium', 'High']);
      expect(rows[0].querySelector('span[slot="caption"]')).toBeNull();
      expect(rows[1].querySelector('span[slot="caption"]')?.textContent).toBe('Balanced with moderate reasoning');
    });
    it('exposes the option rows as a single-select group through role and aria-checked', async () => {
      const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
      const rows = getOptionRows(page, 'Reasoning');
      expect(rows.map(row => row.getAttribute('role'))).toEqual(['menuitemradio', 'menuitemradio', 'menuitemradio']);
      expect(rows.map(row => row.getAttribute('aria-checked'))).toEqual(['false', 'false', 'true']);
    });
    it('checks nothing when the selected id matches no option', async () => {
      const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'does-not-exist' });
      expect(getOptionRows(page, 'Reasoning').map(row => row.getAttribute('aria-checked'))).toEqual([
        'false',
        'false',
        'false',
      ]);
    });
    it('renders the selected custom model as a checked row when the models list is empty', async () => {
      const page = await mountWithModel(GPT_MODEL);
      const rowLabels = Array.from(getDropdown(page).children)
        .map(child => child.querySelector('span[slot="label"]')?.textContent)
        .filter(Boolean);
      expect(rowLabels).toEqual(['Auto', 'Premium', 'GPT 5.4 Mini', 'Reasoning', 'Verbosity', 'Select model or agent']);
    });
    it('emits wppReasoningSelect with the resulting state and updates selectedReasoning', async () => {
      const page = await mountWithModel(GPT_MODEL, { selectedVerbosity: 'low' });
      const spy = jest.fn();
      page.root.addEventListener('wppReasoningSelect', spy);
      getOptionRows(page, 'Reasoning')[2].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(page.root.selectedReasoning).toBe('high');
      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toEqual({
        model: GPT_MODEL,
        reasoning: REASONING_OPTIONS[2],
        verbosity: VERBOSITY_OPTIONS[0],
      });
    });
    it('emits wppVerbositySelect without disturbing the reasoning selection', async () => {
      const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
      const spy = jest.fn();
      page.root.addEventListener('wppVerbositySelect', spy);
      getOptionRows(page, 'Verbosity')[1].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(page.root.selectedVerbosity).toBe('high');
      expect(page.root.selectedReasoning).toBe('high');
      expect(spy.mock.calls[0][0].detail.verbosity).toEqual(VERBOSITY_OPTIONS[1]);
    });
    it('remembers the levels per model and restores them when the user comes back', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", models: [GPT_MODEL, GEMINI_MODEL], selectedModel: GPT_MODEL, selectedReasoning: "high", selectedVerbosity: "low" })),
      });
      await page.waitForChanges();
      const pickModel = async (label) => {
        const row = Array.from(getDropdown(page).children).find(child => child.querySelector('span[slot="label"]')?.textContent === label);
        row.dispatchEvent(new CustomEvent('wppChangeListItem'));
        await page.waitForChanges();
      };
      await pickModel('Gemini 3.5 Flash');
      // Gemini offers no `auto`, so reasoning falls back to `medium`, and it has no verbosity list.
      expect(page.root.selectedReasoning).toBe('medium');
      expect(page.root.selectedVerbosity).toBeUndefined();
      getOptionRows(page, 'Reasoning')[0].dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      expect(page.root.selectedReasoning).toBe('none');
      await pickModel('GPT 5.4 Mini');
      expect(page.root.selectedReasoning).toBe('high');
      expect(page.root.selectedVerbosity).toBe('low');
      await pickModel('Gemini 3.5 Flash');
      expect(page.root.selectedReasoning).toBe('none');
    });
    it('emits the levels it applies on a model change, so a controlled consumer stays in step', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", models: [GPT_MODEL, GEMINI_MODEL], selectedModel: GPT_MODEL, selectedReasoning: "high", selectedVerbosity: "low" })),
      });
      await page.waitForChanges();
      const reasoningSpy = jest.fn();
      const verbositySpy = jest.fn();
      page.root.addEventListener('wppReasoningSelect', reasoningSpy);
      page.root.addEventListener('wppVerbositySelect', verbositySpy);
      const geminiRow = Array.from(getDropdown(page).children).find(child => child.querySelector('span[slot="label"]')?.textContent === 'Gemini 3.5 Flash');
      geminiRow.dispatchEvent(new CustomEvent('wppChangeListItem'));
      await page.waitForChanges();
      // Silently rewriting a controlled prop would be undone by the consumer's next render.
      expect(reasoningSpy.mock.calls[0][0].detail.reasoning).toEqual(REASONING_OPTIONS[1]);
      expect(verbositySpy.mock.calls[0][0].detail.verbosity).toBeNull();
    });
    it('carries the model and both levels on wppSend, and omits the levels when the model has none', async () => {
      const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high', selectedVerbosity: 'low' });
      const spy = jest.fn();
      page.root.addEventListener('wppSend', spy);
      page.rootInstance.inputValue = 'hello';
      await page.waitForChanges();
      page.rootInstance.handleSend();
      await page.waitForChanges();
      expect(spy.mock.calls[0][0].detail).toMatchObject({
        message: 'hello',
        model: GPT_MODEL,
        reasoning: REASONING_OPTIONS[2],
        verbosity: VERBOSITY_OPTIONS[0],
      });
      page.root.selectedModel = 'auto';
      page.rootInstance.inputValue = 'second';
      await page.waitForChanges();
      page.rootInstance.handleSend();
      await page.waitForChanges();
      const secondDetail = spy.mock.calls[1][0].detail;
      expect(Object.prototype.hasOwnProperty.call(secondDetail, 'reasoning')).toBe(false);
      expect(Object.prototype.hasOwnProperty.call(secondDetail, 'verbosity')).toBe(false);
      // Sending starts the 30s response-wait timer. Tear the node down so `disconnectedCallback`
      // clears it — otherwise it fires against a torn-down page and kills the whole runner with
      // `TypeError: Cannot read properties of undefined (reading '$flags$')`.
      page.root.remove();
    });
    it('survives the transient null selectedModel React produces', async () => {
      const page = await mountWithModel(GPT_MODEL, { selectedReasoning: 'high' });
      // React removes the `selectedModel` attribute when the value goes from a string preset to a
      // model object, and Stencil assigns that removal as null before the property lands.
      page.root.selectedModel = null;
      await page.waitForChanges();
      expect(page.root.selectedReasoning).toBe('high');
      page.root.selectedModel = GEMINI_MODEL;
      await page.waitForChanges();
      expect(page.root.selectedReasoning).toBe('medium');
      page.root.selectedModel = GPT_MODEL;
      await page.waitForChanges();
      expect(page.root.selectedReasoning).toBe('high');
    });
    it('renders the row labels from locales', async () => {
      const page = await mountWithModel(GPT_MODEL, {
        locales: { modelReasoningLabel: 'Raisonnement', modelVerbosityLabel: 'Verbosite' },
      });
      expect(getSubmenu(page, 'Raisonnement')).not.toBeNull();
      expect(getSubmenu(page, 'Verbosite')).not.toBeNull();
    });
  });
  describe('Deprecated selectedModelId', () => {
    const models = [
      { id: 'gpt-45', label: 'ChatGPT 4.5', icon: 'wpp-icon-ai' },
      { id: 'claude-sonnet', label: 'Claude Sonnet', icon: 'wpp-icon-ai' },
    ];
    const getModelItems = (page) => getRenderRoot(page.root).querySelectorAll('.wpp-model-dropdown wpp-list-item');
    it('should select the provided model matching the deprecated selectedModelId', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModelId: "claude-sonnet", models: models }),
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
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModelId: "premium", models: models }),
      });
      const modelItems = getModelItems(page);
      expect(modelItems[1].getAttribute('checked')).not.toBeNull();
      expect(modelItems[0].getAttribute('checked')).toBeNull();
    });
    it('should fall back to the "Auto" default when the deprecated selectedModelId matches no model', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModelId: "unknown-model", models: models }),
      });
      expect(getModelItems(page)[0].getAttribute('checked')).not.toBeNull();
    });
    it('should let selectedModel take precedence over the deprecated selectedModelId', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => (h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModel: models[0], selectedModelId: "claude-sonnet", models: models })),
      });
      const modelItems = getModelItems(page);
      expect(modelItems[2].getAttribute('checked')).not.toBeNull();
      expect(modelItems[3].getAttribute('checked')).toBeNull();
    });
    it('should mirror selectedModel into the deprecated selectedModelId so a stale id cannot resurface', async () => {
      const page = await newSpecPage({
        components: [WppChatNode],
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModelId: "claude-sonnet", models: models }),
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
        template: () => h("wpp-chat-node-v4-6-0", { nodeTitle: "Test", selectedModelId: "claude-sonnet", models: models }),
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
      Reflect.set(page.rootInstance, 'recognition', {
        isSupported: true,
        startRecognition: startMock,
        stopRecognition: stopMock,
      });
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
      Reflect.set(page.rootInstance, 'recognition', { isSupported: false });
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
describe('wpp-chat-node — footer actions (WPPOPENDS-1594)', () => {
  const stripVersion = (tag) => tag?.replace(/-v\d+(-\d+)*$/, '');
  /**
   * Every page is torn down in `afterEach`. Without it a pending 3000ms copy-revert timer outlives
   * its spec page and fires against a disposed component, crashing the jest worker. Real usage is
   * safe because removal triggers `disconnectedCallback`.
   */
  const pages = [];
  let writeText;
  afterEach(() => {
    while (pages.length) {
      ;
      pages.pop()?.rootInstance?.disconnectedCallback?.();
    }
  });
  const renderNode = async (messages, props = {}) => {
    const page = await newSpecPage({
      components: [WppChatNode],
      template: () => h('wpp-chat-node', { nodeTitle: 'Test', ...props }),
    });
    for (const message of messages) {
      await page.rootInstance.addMessage(message);
    }
    await page.waitForChanges();
    // `newSpecPage` installs a fresh MockNavigator as the global, so the clipboard stub has to be
    // attached AFTER the page exists.
    writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, writable: true, value: { writeText } });
    pages.push(page);
    return page;
  };
  const rowsOf = (page) => Array.from(getRenderRoot(page.root).querySelectorAll('.chat-message-actions'));
  const buttonsIn = (row) => Array.from(row.querySelectorAll('wpp-action-button'));
  const iconsIn = (row) => buttonsIn(row).map(button => stripVersion(button.firstElementChild?.tagName.toLowerCase()));
  const labelsIn = (row) => Array.from(row.querySelectorAll('wpp-tooltip')).map(tooltip => tooltip.getAttribute('text'));
  const assistant = (id, extra = {}) => ({
    id,
    role: 'assistant',
    content: `Answer ${id}`,
    ...extra,
  });
  /**
   * The copy handler awaits `navigator.clipboard.writeText`, so its state change lands in a
   * microtask after the click returns. A macrotask drains that queue before re-rendering.
   */
  const clickAction = async (page, row, index) => {
    buttonsIn(row)[index].click();
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
  };
  describe('default action set', () => {
    it('renders exactly Copy and Pin', async () => {
      const page = await renderNode([assistant('m1')]);
      expect(iconsIn(rowsOf(page)[0])).toEqual(['wpp-icon-copy', 'wpp-icon-unpinned']);
      expect(labelsIn(rowsOf(page)[0])).toEqual(['Copy', 'Pin']);
    });
    it('does not offer a quote action, which the node has no chat bar slot to show', async () => {
      const page = await renderNode([assistant('m1')]);
      expect(iconsIn(rowsOf(page)[0])).not.toContain('wpp-icon-blockquote');
      expect(labelsIn(rowsOf(page)[0])).not.toContain('Reply');
    });
    it('no longer renders the previous like / dislike / regenerate defaults', async () => {
      const page = await renderNode([assistant('m1')]);
      expect(rowsOf(page)[0].innerHTML).not.toMatch(/thumbs-up|thumbs-down|refresh/);
    });
  });
  describe('pin toggle', () => {
    const pinnedActions = (isActive) => [
      { id: 'copy', icon: 'wpp-icon-copy', label: 'Copy' },
      {
        id: 'pin',
        icon: 'wpp-icon-unpinned',
        activeIcon: 'wpp-icon-pinned',
        label: 'Pin',
        activeLabel: 'Unpin',
        isActive,
      },
    ];
    it('renders the outline pin and the "Pin" label when not active', async () => {
      const page = await renderNode([assistant('m1', { actions: pinnedActions(false) })]);
      expect(iconsIn(rowsOf(page)[0])[1]).toBe('wpp-icon-unpinned');
      expect(labelsIn(rowsOf(page)[0])[1]).toBe('Pin');
    });
    it('swaps to the filled pin and the "Unpin" label when active', async () => {
      const page = await renderNode([assistant('m1', { actions: pinnedActions(true) })]);
      expect(iconsIn(rowsOf(page)[0])[1]).toBe('wpp-icon-pinned');
      expect(labelsIn(rowsOf(page)[0])[1]).toBe('Unpin');
    });
    it('exposes aria-pressed true while pinned', async () => {
      const page = await renderNode([assistant('m1', { actions: pinnedActions(true) })]);
      expect(buttonsIn(rowsOf(page)[0])[1].ariaProps.pressed).toBe(true);
    });
    it('does not claim toggle semantics for Copy, the one non-toggle default action', async () => {
      const page = await renderNode([assistant('m1')]);
      const buttons = buttonsIn(rowsOf(page)[0]);
      expect(buttons[0].ariaProps.pressed).toBeUndefined();
    });
  });
  describe('copy action', () => {
    it("writes that message's own content to the clipboard", async () => {
      const page = await renderNode([assistant('m1'), assistant('m2')]);
      await clickAction(page, rowsOf(page)[1], 0);
      expect(writeText).toHaveBeenCalledTimes(1);
      expect(writeText).toHaveBeenCalledWith('Answer m2');
    });
    it('shows the checkmark and the "Copied" label on the copied message', async () => {
      const page = await renderNode([assistant('m1')]);
      await clickAction(page, rowsOf(page)[0], 0);
      expect(iconsIn(rowsOf(page)[0])[0]).toBe('wpp-icon-done');
      expect(labelsIn(rowsOf(page)[0])[0]).toBe('Copied');
    });
    it('confirms on the copied message ONLY, never on its siblings', async () => {
      const page = await renderNode([assistant('m1'), assistant('m2')]);
      await clickAction(page, rowsOf(page)[0], 0);
      expect(iconsIn(rowsOf(page)[0])[0]).toBe('wpp-icon-done');
      expect(iconsIn(rowsOf(page)[1])[0]).toBe('wpp-icon-copy');
      expect(labelsIn(rowsOf(page)[1])[0]).toBe('Copy');
    });
    it('announces the confirmation only in the copied message live region', async () => {
      const page = await renderNode([assistant('m1'), assistant('m2')]);
      await clickAction(page, rowsOf(page)[0], 0);
      expect(rowsOf(page)[0].querySelector('.sr-only[aria-live="polite"]').textContent).toBe('Copied');
      expect(rowsOf(page)[1].querySelector('.sr-only[aria-live="polite"]').textContent).toBe('');
    });
    it('leaves the button idle when the clipboard rejects', async () => {
      const page = await renderNode([assistant('m1')]);
      writeText.mockRejectedValue(new Error('denied'));
      await clickAction(page, rowsOf(page)[0], 0);
      expect(iconsIn(rowsOf(page)[0])[0]).toBe('wpp-icon-copy');
    });
  });
  describe('copy confirmation timer', () => {
    let setTimeoutSpy;
    let clearTimeoutSpy;
    // The component resolves the Node globals, so spying on mock-doc's window would see nothing.
    beforeEach(() => {
      setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    });
    afterEach(() => {
      setTimeoutSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
    });
    const scheduledResets = () => setTimeoutSpy.mock.calls.filter(([, delay]) => delay === 3000);
    it('schedules the revert 3000ms out', async () => {
      const page = await renderNode([assistant('m1')]);
      await clickAction(page, rowsOf(page)[0], 0);
      expect(scheduledResets()).toHaveLength(1);
    });
    it('reverts to the copy icon when the scheduled callback runs', async () => {
      const page = await renderNode([assistant('m1')]);
      await clickAction(page, rowsOf(page)[0], 0);
      const index = setTimeoutSpy.mock.calls.findIndex(([, delay]) => delay === 3000);
      // Cancel the real timer before invoking the callback by hand, or it fires post-teardown.
      clearTimeout(setTimeoutSpy.mock.results[index].value);
      setTimeoutSpy.mock.calls[index][0]();
      await page.waitForChanges();
      expect(iconsIn(rowsOf(page)[0])[0]).toBe('wpp-icon-copy');
      expect(labelsIn(rowsOf(page)[0])[0]).toBe('Copy');
    });
    it('restarts the window on a repeat click instead of stacking timers', async () => {
      const page = await renderNode([assistant('m1')]);
      await clickAction(page, rowsOf(page)[0], 0);
      const firstIndex = setTimeoutSpy.mock.calls.findIndex(([, delay]) => delay === 3000);
      const firstHandle = setTimeoutSpy.mock.results[firstIndex].value;
      clearTimeoutSpy.mockClear();
      await clickAction(page, rowsOf(page)[0], 0);
      expect(clearTimeoutSpy).toHaveBeenCalledWith(firstHandle);
      expect(scheduledResets()).toHaveLength(2);
    });
    it('clears the pending timer on disconnect', async () => {
      const page = await renderNode([assistant('m1')]);
      await clickAction(page, rowsOf(page)[0], 0);
      const index = setTimeoutSpy.mock.calls.findIndex(([, delay]) => delay === 3000);
      const handle = setTimeoutSpy.mock.results[index].value;
      clearTimeoutSpy.mockClear();
      page.rootInstance.disconnectedCallback();
      expect(clearTimeoutSpy).toHaveBeenCalledWith(handle);
    });
  });
  describe('wppMessageActionClick', () => {
    it('emits the action id together with the originating message', async () => {
      const page = await renderNode([assistant('m1')]);
      const emitted = [];
      page.root.addEventListener('wppMessageActionClick', (event) => emitted.push(`${event.detail.action.id}:${event.detail.message.id}`));
      const row = rowsOf(page)[0];
      await clickAction(page, row, 0);
      await clickAction(page, row, 1);
      expect(emitted).toEqual(['copy:m1', 'pin:m1']);
    });
  });
  describe('token count', () => {
    const tagIn = (row) => row.querySelector('.chat-token-count');
    it('renders as a wpp-action-button only for messages with a non-empty tokenCount', async () => {
      const page = await renderNode([
        assistant('m1', { tokenCount: '30,000' }),
        assistant('m2'),
        assistant('m3', { tokenCount: '   ' }),
      ]);
      const rows = rowsOf(page);
      expect(tagIn(rows[0])).not.toBeNull();
      expect(tagIn(rows[0]).tagName.toLowerCase()).toBe('wpp-action-button');
      expect(tagIn(rows[0]).textContent).toContain('30,000');
      expect(tagIn(rows[1])).toBeNull();
      expect(tagIn(rows[2])).toBeNull();
    });
    it('defaults its icon to the premium glyph and honours an override', async () => {
      const page = await renderNode([
        assistant('m1', { tokenCount: '30,000' }),
        assistant('m2', { tokenCount: '12', tokenCountIcon: 'wpp-icon-ai' }),
      ]);
      const rows = rowsOf(page);
      const icon0 = tagIn(rows[0]).querySelector('[slot="icon-start"]');
      expect(stripVersion(icon0.tagName.toLowerCase())).toBe('wpp-icon-premium');
      expect(stripVersion(tagIn(rows[1]).querySelector('[slot="icon-start"]').tagName.toLowerCase())).toBe('wpp-icon-ai');
    });
    it('names itself "<label> <value>" and emits wppMessageActionClick with id tokenCount', async () => {
      const page = await renderNode([assistant('m1', { tokenCount: '30,000' })]);
      const emitted = [];
      page.root.addEventListener('wppMessageActionClick', (event) => emitted.push(`${event.detail.action.id}:${event.detail.message.id}`));
      expect(tagIn(rowsOf(page)[0]).ariaProps.label).toBe('Token usage 30,000');
      tagIn(rowsOf(page)[0]).click();
      await page.waitForChanges();
      expect(emitted).toEqual(['tokenCount:m1']);
    });
    it('still renders when the message has no other actions', async () => {
      const page = await renderNode([assistant('m1', { tokenCount: '30,000', actions: [] })]);
      const row = rowsOf(page)[0];
      expect(row.querySelectorAll('wpp-action-button').length).toBe(1);
      expect(tagIn(row)).not.toBeNull();
    });
    it('localises the token-count accessible name', async () => {
      const page = await renderNode([assistant('m1', { tokenCount: '30,000' })], {
        locales: { tokenCountLabel: 'Jetons' },
      });
      expect(tagIn(rowsOf(page)[0]).ariaProps.label).toBe('Jetons 30,000');
    });
  });
});
describe('wpp-chat-node — footer snapshots (WPPOPENDS-1594)', () => {
  const messageActions = [
    { id: 'copy', icon: 'wpp-icon-copy', label: 'Copy' },
    {
      id: 'pin',
      icon: 'wpp-icon-unpinned',
      activeIcon: 'wpp-icon-pinned',
      label: 'Pin',
      activeLabel: 'Unpin',
      isActive: false,
    },
  ];
  const renderWithMessage = async (message) => {
    const page = await newSpecPage({
      components: [WppChatNode],
      html: `<wpp-chat-node node-title="Test"/>`,
    });
    await page.rootInstance.addMessage(message);
    await page.waitForChanges();
    return page;
  };
  it('matches the default footer markup (Copy / Pin)', async () => {
    const page = await renderWithMessage({ id: 'snap-1', role: 'assistant', content: 'Snapshot body' });
    expect(getRenderRoot(page.root).querySelector('.chat-message-actions')).toMatchSnapshot();
  });
  it('matches the pinned footer markup', async () => {
    const page = await renderWithMessage({
      id: 'snap-2',
      role: 'assistant',
      content: 'Snapshot body',
      actions: messageActions.map(action => (action.id === 'pin' ? { ...action, isActive: true } : action)),
    });
    expect(getRenderRoot(page.root).querySelector('.chat-message-actions')).toMatchSnapshot();
  });
  it('matches the token-count tag markup', async () => {
    const page = await renderWithMessage({
      id: 'snap-3',
      role: 'assistant',
      content: 'Snapshot body',
      tokenCount: '30,000',
    });
    expect(getRenderRoot(page.root).querySelector('.chat-token-count')).toMatchSnapshot();
  });
});
describe('wpp-chat-node — updateMessage() (WPPOPENDS-1594)', () => {
  const stripVersion = (tag) => tag?.replace(/-v\d+(-\d+)*$/, '');
  const pinAction = (isActive) => ({
    id: 'pin',
    icon: 'wpp-icon-unpinned',
    activeIcon: 'wpp-icon-pinned',
    label: 'Pin',
    activeLabel: 'Unpin',
    isActive,
  });
  const renderTwo = async () => {
    const page = await newSpecPage({ components: [WppChatNode], html: `<wpp-chat-node node-title="Test"/>` });
    await page.rootInstance.addMessage({ id: 'a', role: 'assistant', content: 'Alpha', actions: [pinAction(false)] });
    await page.rootInstance.addMessage({
      id: 'b',
      role: 'assistant',
      content: 'Beta',
      actions: [pinAction(false)],
      tokenCount: '12',
    });
    await page.waitForChanges();
    return page;
  };
  const pinIconOfRow = (page, index) => {
    const row = getRenderRoot(page.root).querySelectorAll('.chat-message-actions')[index];
    return stripVersion(row.querySelector('wpp-action-button').firstElementChild?.tagName.toLowerCase());
  };
  it('flips the targeted message pin to the filled icon and leaves its sibling alone', async () => {
    const page = await renderTwo();
    await page.rootInstance.updateMessage('a', { actions: [pinAction(true)] });
    await page.waitForChanges();
    expect(pinIconOfRow(page, 0)).toBe('wpp-icon-pinned');
    expect(pinIconOfRow(page, 1)).toBe('wpp-icon-unpinned');
  });
  it('merges changes rather than replacing the message', async () => {
    const page = await renderTwo();
    await page.rootInstance.updateMessage('b', { actions: [pinAction(true)] });
    await page.waitForChanges();
    const rows = getRenderRoot(page.root).querySelectorAll('.chat-message-actions');
    // content and tokenCount were not in `changes`, so both must survive the update
    expect(getRenderRoot(page.root).textContent).toContain('Beta');
    expect(rows[1].querySelector('.chat-token-count').textContent).toContain('12');
  });
  it('ignores an unknown id without touching any message', async () => {
    const page = await renderTwo();
    await page.rootInstance.updateMessage('does-not-exist', { content: 'Nope' });
    await page.waitForChanges();
    expect(getRenderRoot(page.root).textContent).not.toContain('Nope');
    expect(pinIconOfRow(page, 0)).toBe('wpp-icon-unpinned');
    expect(pinIconOfRow(page, 1)).toBe('wpp-icon-unpinned');
  });
});
describe('wpp-chat-node — uncontrolled pin toggle (Pavlo QA, WPPOPENDS-1594)', () => {
  const stripVersion = (tag) => tag?.replace(/-v\d+(-\d+)*$/, '');
  const renderNode = async (messages) => {
    const page = await newSpecPage({ components: [WppChatNode], html: `<wpp-chat-node node-title="Test"/>` });
    for (const message of messages) {
      await page.rootInstance.addMessage(message);
    }
    await page.waitForChanges();
    return page;
  };
  const assistant = (id, extra = {}) => ({
    id,
    role: 'assistant',
    content: `Answer ${id}`,
    ...extra,
  });
  const rowsOf = (page) => Array.from(getRenderRoot(page.root).querySelectorAll('.chat-message-actions'));
  const pinOf = (row) => Array.from(row.querySelectorAll('wpp-action-button')).find(button => /wpp-icon-(un)?pinned/.test(stripVersion(button.firstElementChild?.tagName.toLowerCase()) ?? ''));
  const pinIconOf = (row) => stripVersion(pinOf(row).firstElementChild?.tagName.toLowerCase());
  it('flips the pin on click with no wiring at all', async () => {
    const page = await renderNode([assistant('m1')]);
    expect(pinIconOf(rowsOf(page)[0])).toBe('wpp-icon-unpinned');
    pinOf(rowsOf(page)[0]).click();
    await page.waitForChanges();
    expect(pinIconOf(rowsOf(page)[0])).toBe('wpp-icon-pinned');
  });
  // Scoped per message: the component keys its own toggle state by message id, so pinning one
  // response must never mark another.
  it('pins only the message that was clicked', async () => {
    const page = await renderNode([assistant('m1'), assistant('m2')]);
    pinOf(rowsOf(page)[0]).click();
    await page.waitForChanges();
    expect(pinIconOf(rowsOf(page)[0])).toBe('wpp-icon-pinned');
    expect(pinIconOf(rowsOf(page)[1])).toBe('wpp-icon-unpinned');
  });
  it('reports the RESULTING state in the event', async () => {
    const page = await renderNode([assistant('m1')]);
    const seen = [];
    page.root.addEventListener('wppMessageActionClick', (event) => {
      if (event.detail.action.id === 'pin')
        seen.push(event.detail.action.isActive);
    });
    pinOf(rowsOf(page)[0]).click();
    await page.waitForChanges();
    pinOf(rowsOf(page)[0]).click();
    await page.waitForChanges();
    expect(seen).toEqual([true, false]);
  });
  it('leaves a controlled pin entirely to the dev', async () => {
    const page = await renderNode([
      assistant('m1', {
        actions: [
          { id: 'copy', icon: 'wpp-icon-copy', label: 'Copy' },
          {
            id: 'pin',
            icon: 'wpp-icon-unpinned',
            activeIcon: 'wpp-icon-pinned',
            label: 'Pin',
            activeLabel: 'Unpin',
            isActive: false,
          },
        ],
      }),
    ]);
    pinOf(rowsOf(page)[0]).click();
    await page.waitForChanges();
    expect(pinIconOf(rowsOf(page)[0])).toBe('wpp-icon-unpinned');
  });
});
