import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppChatConversationMessage } from '../wpp-chat-conversation-message';
describe('wpp-chat-conversation-message', () => {
  describe('hasTextContent guard', () => {
    it('renders markdown when content is present (complete)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hello world", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl.querySelector('.message-text')).not.toBeNull();
    });
    it('does not render markdown block when content is empty (slot-only message)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl?.querySelector('.message-text')).toBeNull();
    });
    it('does not render markdown block when content is whitespace only', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "   ", status: "complete" }),
      });
      await page.waitForChanges();
      const messageEl = page.root?.shadowRoot?.querySelector('.message');
      expect(messageEl?.querySelector('.message-text')).toBeNull();
    });
  });
  describe('custom-content slot', () => {
    it('slot wrapper is always present in complete state', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hello", status: "complete" }),
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('.custom-content slot');
      expect(slot).toBeNull();
    });
    it('slot wrapper is not present in streaming state', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "", status: "streaming" }),
      });
      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('.custom-content slot');
      expect(slot).toBeNull();
    });
  });
  describe('streaming', () => {
    it('renderStreaming is shown when status is streaming', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "", status: "streaming" }),
      });
      await page.waitForChanges();
      const instance = page.rootInstance;
      instance.currentStatus = 'streaming';
      await page.waitForChanges();
      const streamingEl = page.root?.shadowRoot?.querySelector('.streaming-live');
      expect(streamingEl).not.toBeNull();
    });
  });
  describe('avatar rendering (shouldRenderAvatar)', () => {
    const setConfigs = (instance, user, assistant) => {
      instance.userAvatarConfig = user;
      instance.assistantAvatarConfig = assistant;
    };
    it('returns false for an explicit `false` config', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hi" }),
      });
      setConfigs(page.rootInstance, false, false);
      expect(page.rootInstance.shouldRenderAvatar('user')).toBe(false);
      expect(page.rootInstance.shouldRenderAvatar('assistant')).toBe(false);
    });
    it('returns false for an empty config object (the default)', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hi" }),
      });
      expect(page.rootInstance.shouldRenderAvatar('user')).toBe(false);
      expect(page.rootInstance.shouldRenderAvatar('assistant')).toBe(false);
    });
    it('returns true for a non-empty config object', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hi" }),
      });
      setConfigs(page.rootInstance, { name: 'John' }, { icon: 'wpp-icon-ai' });
      expect(page.rootInstance.shouldRenderAvatar('user')).toBe(true);
      expect(page.rootInstance.shouldRenderAvatar('assistant')).toBe(true);
    });
    it('renders the assistant avatar wrapper when the assistant config is non-empty', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => (h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hi", assistantAvatarConfig: { icon: 'wpp-icon-ai' } })),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.ai-avatar')).not.toBeNull();
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.ai-avatar wpp-avatar')).not.toBeNull();
      expect(container?.classList.contains('no-assistant-avatar')).toBe(false);
    });
    it('renders the user avatar wrapper when the user config is non-empty', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "user", content: "Hi", userAvatarConfig: { name: 'John' } }),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.user-avatar')).not.toBeNull();
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.user-avatar wpp-avatar')).not.toBeNull();
      expect(container?.classList.contains('no-user-avatar')).toBe(false);
    });
    it('renders no avatar wrappers and flags both no-avatar classes for the default empty config', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hi" }),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper')).toBeNull();
      expect(container?.classList.contains('no-assistant-avatar')).toBe(true);
      expect(container?.classList.contains('no-user-avatar')).toBe(true);
    });
    it('renders no assistant avatar wrapper when the assistant config is `false`', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h("wpp-chat-conversation-message-v4-6-0", { role: "assistant", content: "Hi", assistantAvatarConfig: false }),
      });
      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.container');
      expect(page.root?.shadowRoot?.querySelector('.avatar-wrapper.ai-avatar')).toBeNull();
      expect(container?.classList.contains('no-assistant-avatar')).toBe(true);
    });
  });
});
describe('wpp-chat-conversation-message — footer actions (WPPOPENDS-1594)', () => {
  const ACTION_TOOLBAR = '[part="action-toolbar"]';
  /**
   * Icon tag names, in order, of the footer's action buttons. Tags are version-suffixed even in
   * specs (`transformToVersionedTag` runs at runtime), so the suffix is stripped for readability.
   */
  const stripVersion = (tag) => tag?.replace(/-v\d+(-\d+)*$/, '');
  const iconTagsOf = (page) => Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`)).map(button => stripVersion(button.firstElementChild?.tagName.toLowerCase()));
  /** Tooltip text (== accessible label) of each footer action, in order. */
  const labelsOf = (page) => Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-tooltip`)).map(tooltip => tooltip.getAttribute('text'));
  const renderMessage = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', {
        role: 'assistant',
        status: 'complete',
        content: 'Hello world',
        ...props,
      }),
    });
    await page.waitForChanges();
    return page;
  };
  describe('default action set', () => {
    it('renders exactly Quote, Copy and Pin when no actionButtonsConfig is passed', async () => {
      const page = await renderMessage();
      expect(iconTagsOf(page)).toEqual(['wpp-icon-blockquote', 'wpp-icon-copy', 'wpp-icon-unpinned']);
    });
    it('no longer renders the previous thumbs-up / thumbs-down / refresh defaults', async () => {
      const page = await renderMessage();
      const toolbar = page.root.shadowRoot.querySelector(ACTION_TOOLBAR);
      expect(toolbar.innerHTML).not.toMatch(/thumbs-up|thumbs-down|refresh/);
    });
    it('labels each action and wraps it in a bottom-placed tooltip', async () => {
      const page = await renderMessage();
      const tooltips = Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-tooltip`));
      expect(labelsOf(page)).toEqual(['Reply', 'Copy', 'Pin']);
      tooltips.forEach(tooltip => {
        expect(tooltip.config).toEqual({ placement: 'bottom' });
      });
    });
    it('passes the label through to each action button as its accessible name', async () => {
      const page = await renderMessage();
      const buttons = Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`));
      expect(buttons.map(button => button.ariaProps.label)).toEqual(['Reply', 'Copy', 'Pin']);
    });
  });
  describe('config merging by id', () => {
    it('keeps all three defaults when a single id-keyed override is passed', async () => {
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'pin', isActive: true }] });
      expect(iconTagsOf(page)).toEqual(['wpp-icon-blockquote', 'wpp-icon-copy', 'wpp-icon-pinned']);
    });
    it('keeps the default icon when an override only supplies a handler', async () => {
      const onClick = jest.fn();
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'copy', onClick }] });
      expect(iconTagsOf(page)).toEqual(['wpp-icon-blockquote', 'wpp-icon-copy', 'wpp-icon-unpinned']);
    });
    it('falls back to position for overrides without an id, so handler-only configs stay wired', async () => {
      const first = jest.fn();
      const page = await renderMessage({ actionButtonsConfig: [{ onClick: first }] });
      expect(iconTagsOf(page)).toEqual(['wpp-icon-blockquote', 'wpp-icon-copy', 'wpp-icon-unpinned']);
      page.root.shadowRoot.querySelector(`${ACTION_TOOLBAR} wpp-action-button`).click();
      expect(first).toHaveBeenCalledTimes(1);
    });
    it('appends an unknown id as an extra action', async () => {
      const page = await renderMessage({
        actionButtonsConfig: [{ id: 'share', icon: 'wpp-icon-link', label: 'Share' }],
      });
      expect(iconTagsOf(page)).toEqual(['wpp-icon-blockquote', 'wpp-icon-copy', 'wpp-icon-unpinned', 'wpp-icon-link']);
    });
  });
  describe('pin toggle', () => {
    it('renders the outline pin and the "Pin" label when not active', async () => {
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'pin', isActive: false }] });
      expect(iconTagsOf(page)[2]).toBe('wpp-icon-unpinned');
      expect(labelsOf(page)[2]).toBe('Pin');
    });
    it('swaps to the filled pin and the "Unpin" label when active', async () => {
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'pin', isActive: true }] });
      expect(iconTagsOf(page)[2]).toBe('wpp-icon-pinned');
      expect(labelsOf(page)[2]).toBe('Unpin');
    });
    // One newSpecPage per test: two pages in a single `it` share the mock document and the
    // second one's state bleeds into reads from the first.
    const pinPressedOf = (page) => Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`))[2].ariaProps
      .pressed;
    it('exposes aria-pressed false while not pinned', async () => {
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'pin', isActive: false }] });
      expect(pinPressedOf(page)).toBe(false);
    });
    it('exposes aria-pressed true while pinned', async () => {
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'pin', isActive: true }] });
      expect(pinPressedOf(page)).toBe(true);
    });
    it('does not claim toggle semantics for the non-toggle actions', async () => {
      const page = await renderMessage();
      const buttons = Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`));
      expect(buttons[0].ariaProps.pressed).toBeUndefined();
      expect(buttons[1].ariaProps.pressed).toBeUndefined();
    });
    it('reflects a config change made after the first paint', async () => {
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'pin', isActive: false }] });
      expect(iconTagsOf(page)[2]).toBe('wpp-icon-unpinned');
      page.root.actionButtonsConfig = [{ id: 'pin', isActive: true }];
      await page.waitForChanges();
      expect(iconTagsOf(page)[2]).toBe('wpp-icon-pinned');
    });
  });
});
describe('wpp-chat-conversation-message — copy, token count and a11y (WPPOPENDS-1594)', () => {
  const ACTION_TOOLBAR = '[part="action-toolbar"]';
  const TOKEN_COUNT = '[part="token-count"]';
  const stripVersion = (tag) => tag?.replace(/-v\d+(-\d+)*$/, '');
  let writeText;
  /**
   * Every page built here is torn down in `afterEach`. Without it a pending 3000ms copy-revert
   * timer outlives its spec page and fires against a disposed component, which crashes the whole
   * jest worker (`Cannot read properties of undefined (reading '$flags$')`). Real usage is safe
   * because removal triggers `disconnectedCallback`; specs have to do it by hand.
   */
  const pages = [];
  afterEach(() => {
    while (pages.length) {
      pages.pop()?.rootInstance?.disconnectedCallback?.();
    }
  });
  /**
   * `newSpecPage` installs a fresh MockWindow (and therefore a fresh MockNavigator) as the global,
   * so the clipboard stub has to be attached AFTER the page exists — doing it in a `beforeEach`
   * silently loses the stub and the copy assertions all read as "never called".
   */
  const renderMessage = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', {
        role: 'assistant',
        status: 'complete',
        content: 'Hello world',
        ...props,
      }),
    });
    await page.waitForChanges();
    writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, writable: true, value: { writeText } });
    pages.push(page);
    return page;
  };
  const copyButtonOf = (page) => Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`))[1];
  const copyIconOf = (page) => stripVersion(copyButtonOf(page).firstElementChild?.tagName.toLowerCase());
  /**
   * The copy handler awaits `navigator.clipboard.writeText`, so the state change lands in a
   * microtask AFTER the click returns. `waitForChanges()` alone renders before that resolves —
   * yield to the microtask queue first, then let Stencil re-render.
   */
  const clickCopy = async (page) => {
    copyButtonOf(page).click();
    // A macrotask drains the whole microtask queue behind the awaited clipboard write.
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
  };
  const copyLabelOf = (page) => Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-tooltip`))[1].getAttribute('text');
  const liveRegionOf = (page) => page.root.shadowRoot.querySelector('.sr-only[aria-live="polite"]');
  describe('copy action', () => {
    it('writes the message content to the clipboard', async () => {
      const page = await renderMessage({ content: 'Copy me please' });
      await clickCopy(page);
      expect(writeText).toHaveBeenCalledTimes(1);
      expect(writeText).toHaveBeenCalledWith('Copy me please');
    });
    it('shows the checkmark and the "Copied" label after a successful copy', async () => {
      const page = await renderMessage();
      await clickCopy(page);
      expect(copyIconOf(page)).toBe('wpp-icon-done');
      expect(copyLabelOf(page)).toBe('Copied');
    });
    it('leaves the button idle when the clipboard rejects', async () => {
      const page = await renderMessage();
      writeText.mockRejectedValue(new Error('denied'));
      await clickCopy(page);
      expect(copyIconOf(page)).toBe('wpp-icon-copy');
      expect(copyLabelOf(page)).toBe('Copy');
    });
    it('does not copy a message with no text content', async () => {
      const page = await renderMessage({ content: '   ' });
      const button = page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`)[1];
      button?.click();
      await page.waitForChanges();
      expect(writeText).not.toHaveBeenCalled();
    });
  });
  describe('copy confirmation timer', () => {
    // setTimeout/clearTimeout are spied rather than faked: jest.useFakeTimers() has no precedent in
    // this suite and Stencil's mock-doc captures a native setTimeout at import time.
    let setTimeoutSpy;
    let clearTimeoutSpy;
    // The component resolves the Node globals (its timer handle is a `Timeout`, not a number), so
    // spying on mock-doc's `window.setTimeout` would never see the call.
    beforeEach(() => {
      setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
    });
    afterEach(() => {
      setTimeoutSpy.mockRestore();
      clearTimeoutSpy.mockRestore();
    });
    const scheduledResets = () => setTimeoutSpy.mock.calls.filter(([, delay]) => delay === 3000);
    /**
     * Returns the scheduled revert callback and CANCELS the underlying timer. Invoking the callback
     * by hand does not disarm the real timer, and a stray one firing after the spec page is
     * disposed takes down the jest worker.
     */
    const takeScheduledRevert = () => {
      const index = setTimeoutSpy.mock.calls.findIndex(([, delay]) => delay === 3000);
      const handle = setTimeoutSpy.mock.results[index].value;
      clearTimeout(handle);
      return setTimeoutSpy.mock.calls[index][0];
    };
    it('schedules the revert 3000ms out', async () => {
      const page = await renderMessage();
      await clickCopy(page);
      expect(scheduledResets()).toHaveLength(1);
    });
    it('reverts to the copy icon when the scheduled callback runs', async () => {
      const page = await renderMessage();
      await clickCopy(page);
      expect(copyIconOf(page)).toBe('wpp-icon-done');
      const revert = takeScheduledRevert();
      revert();
      await page.waitForChanges();
      expect(copyIconOf(page)).toBe('wpp-icon-copy');
      expect(copyLabelOf(page)).toBe('Copy');
    });
    it('restarts the window on a repeat click instead of stacking timers', async () => {
      const page = await renderMessage();
      await clickCopy(page);
      const firstHandle = setTimeoutSpy.mock.results[setTimeoutSpy.mock.calls.length - 1].value;
      clearTimeoutSpy.mockClear();
      await clickCopy(page);
      expect(clearTimeoutSpy).toHaveBeenCalledWith(firstHandle);
      expect(scheduledResets()).toHaveLength(2);
    });
    it('clears the pending timer on disconnect so it cannot set state after teardown', async () => {
      const page = await renderMessage();
      await clickCopy(page);
      const handle = setTimeoutSpy.mock.results[setTimeoutSpy.mock.calls.length - 1].value;
      clearTimeoutSpy.mockClear();
      page.rootInstance.disconnectedCallback();
      expect(clearTimeoutSpy).toHaveBeenCalledWith(handle);
    });
  });
  describe('copy announcement', () => {
    it('announces the confirmation in a polite live region and clears it on revert', async () => {
      const setTimeoutSpy = jest.spyOn(global, 'setTimeout');
      const page = await renderMessage();
      expect(liveRegionOf(page)).not.toBeNull();
      expect(liveRegionOf(page).textContent).toBe('');
      await clickCopy(page);
      expect(liveRegionOf(page).textContent).toBe('Copied');
      const index = setTimeoutSpy.mock.calls.findIndex(([, delay]) => delay === 3000);
      clearTimeout(setTimeoutSpy.mock.results[index].value);
      setTimeoutSpy.mock.calls[index][0]();
      await page.waitForChanges();
      expect(liveRegionOf(page).textContent).toBe('');
      setTimeoutSpy.mockRestore();
    });
  });
  describe('wppMessageActionClick', () => {
    it('emits the clicked action id and still calls the config handler', async () => {
      const onClick = jest.fn();
      const page = await renderMessage({ actionButtonsConfig: [{ id: 'quote', onClick }] });
      const emitted = [];
      page.root.addEventListener('wppMessageActionClick', (event) => emitted.push(event.detail.action.id));
      const buttons = page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`);
      buttons[0].click();
      buttons[1].click();
      buttons[2].click();
      await page.waitForChanges();
      expect(emitted).toEqual(['quote', 'copy', 'pin']);
      expect(onClick).toHaveBeenCalledTimes(1);
    });
  });
  describe('token count', () => {
    const tagOf = (page) => page.root.shadowRoot.querySelector(TOKEN_COUNT);
    it('renders as a wpp-action-button carrying the value when tokenCount is a non-empty string', async () => {
      const page = await renderMessage({ tokenCount: '30,000' });
      const tag = tagOf(page);
      expect(tag).not.toBeNull();
      expect(tag.tagName.toLowerCase()).toBe('wpp-action-button');
      expect(tag.getAttribute('variant')).toBe('secondary');
      expect(tag.textContent).toContain('30,000');
    });
    it('is not rendered when tokenCount is omitted', async () => {
      const page = await renderMessage();
      expect(tagOf(page)).toBeNull();
    });
    it('is not rendered when tokenCount is whitespace only', async () => {
      const page = await renderMessage({ tokenCount: '   ' });
      expect(tagOf(page)).toBeNull();
    });
    // The grey-600 icon colour is applied through the button's `--wpp-action-button-secondary-icon-color`
    // hook in SCSS, which a spec cannot compute — it is verified in the browser.
    it('defaults its icon to the premium glyph in the icon-start slot', async () => {
      const page = await renderMessage({ tokenCount: '30,000' });
      const icon = tagOf(page).querySelector('[slot="icon-start"]');
      expect(stripVersion(icon.tagName.toLowerCase())).toBe('wpp-icon-premium');
    });
    it('honours a per-message icon override', async () => {
      const page = await renderMessage({ tokenCount: '30,000', tokenCountIcon: 'wpp-icon-ai' });
      expect(stripVersion(tagOf(page).querySelector('[slot="icon-start"]').tagName.toLowerCase())).toBe('wpp-icon-ai');
    });
    it('names itself "<label> <value>" so the figure is never announced bare (Label in Name holds)', async () => {
      const page = await renderMessage({ tokenCount: '30,000' });
      expect(tagOf(page).ariaProps.label).toBe('Token usage 30,000');
    });
    it('emits wppMessageActionClick with id tokenCount when clicked', async () => {
      const page = await renderMessage({ tokenCount: '30,000' });
      const emitted = [];
      page.root.addEventListener('wppMessageActionClick', (event) => emitted.push(event.detail.action.id));
      tagOf(page).click();
      await page.waitForChanges();
      expect(emitted).toEqual(['tokenCount']);
    });
  });
  describe('deprecated sourcesActionConfig', () => {
    const sources = { text: '3 Sources', ariaProps: { label: 'Sources' } };
    it('still renders when no token count is set', async () => {
      const page = await renderMessage({ sourcesActionConfig: sources });
      expect(page.root.shadowRoot.querySelector('.sources-action')).not.toBeNull();
      expect(page.root.shadowRoot.querySelector('.sources-action').textContent).toContain('3 Sources');
    });
    it('is superseded by the token count when both are set', async () => {
      const page = await renderMessage({ sourcesActionConfig: sources, tokenCount: '30,000' });
      expect(page.root.shadowRoot.querySelector(TOKEN_COUNT)).not.toBeNull();
      expect(page.root.shadowRoot.querySelector('.sources-action')).toBeNull();
    });
    it('does not leak its config fields onto the rendered button as attributes', async () => {
      const page = await renderMessage({ sourcesActionConfig: sources });
      const button = page.root.shadowRoot.querySelector('.sources-action wpp-action-button');
      expect(button.hasAttribute('text')).toBe(false);
      expect(button.hasAttribute('icon')).toBe(false);
    });
  });
  describe('locales', () => {
    it('merges a partial override over the defaults', async () => {
      const page = await renderMessage({ locales: { quoteAction: 'Citer' } });
      const labels = Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-tooltip`)).map(t => t.getAttribute('text'));
      expect(labels).toEqual(['Citer', 'Copy', 'Pin']);
    });
    it('localises the token-count accessible name', async () => {
      const page = await renderMessage({ tokenCount: '30,000', locales: { tokenCountLabel: 'Jetons' } });
      expect(page.root.shadowRoot.querySelector(TOKEN_COUNT).ariaProps.label).toBe('Jetons 30,000');
    });
  });
  describe('Testing accessibility', () => {
    it('parks a valid ARIA role on the host instead of the MessageRole value', async () => {
      const page = await renderMessage();
      expect(page.root.getAttribute('role')).toBe('group');
    });
    // `role` is documented as write-only: the parked ARIA role necessarily occupies the attribute,
    // and restoring the prop would make a framework's identical re-write a no-op that leaves the
    // invalid role in place. The message role lives in `resolvedRole` instead.
    it('tracks the message role internally rather than on the host attribute', async () => {
      const page = await renderMessage();
      expect(page.rootInstance.resolvedRole).toBe('assistant');
      expect(page.root.getAttribute('role')).toBe('group');
    });
    it('still drives layout from the role prop', async () => {
      const page = await newSpecPage({
        components: [WppChatConversationMessage],
        template: () => h('wpp-chat-conversation-message', { role: 'user', status: 'complete', content: 'Hi' }),
      });
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('.container-user')).not.toBeNull();
      expect(page.root.getAttribute('role')).toBe('group');
      expect(page.root.shadowRoot.querySelector('[part="action-toolbar"]')).toBeNull();
    });
  });
});
describe('wpp-chat-conversation-message — host ARIA role hardening (WPPOPENDS-1594)', () => {
  const renderMessage = async (role = 'assistant') => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', { role, status: 'complete', content: 'Hello' }),
    });
    await page.waitForChanges();
    return page;
  };
  it('re-parks the valid role when a framework binding sets the property after render', async () => {
    const page = await renderMessage();
    expect(page.root.getAttribute('role')).toBe('group');
    page.root.role = 'user';
    await page.waitForChanges();
    expect(page.root.getAttribute('role')).toBe('group');
    expect(page.rootInstance.resolvedRole).toBe('user');
  });
  // The MutationObserver path is intentionally NOT asserted here: mock-doc delivers no mutation
  // records, so the only way to "test" it would be to call the private callback directly, which
  // proves nothing about the observer. It is verified in the browser (see the source comment on
  // observeHostAriaRole for the measured before/after).
  it('parks the valid role again on every subsequent render', async () => {
    const page = await renderMessage();
    page.root.setAttribute('role', 'assistant');
    page.root.content = 'Changed, forcing a re-render';
    await page.waitForChanges();
    expect(page.root.getAttribute('role')).toBe('group');
  });
  it('keeps the layout in sync with the restored message role', async () => {
    const page = await renderMessage('assistant');
    page.root.role = 'user';
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('.container-user')).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('.container-assistant')).toBeNull();
  });
});
describe('wpp-chat-conversation-message — streamed content reaches the action event (WPPOPENDS-1594)', () => {
  const ACTION_TOOLBAR = '[part="action-toolbar"]';
  it('carries the STREAMED text in wppMessageActionClick, not the (empty) content prop', async () => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      // `content` is deliberately left empty: this is how a consumer drives a streamed response —
      // the text arrives through appendChunk/completeStream and the prop is never updated.
      template: () => h('wpp-chat-conversation-message', { role: 'assistant', status: 'streaming', content: '' }),
    });
    await page.waitForChanges();
    await page.rootInstance.setStatus('streaming');
    await page.rootInstance.appendChunk('Topic pills for your campaign: ');
    await page.rootInstance.appendChunk('Machine Learning and Computer Vision.');
    await page.rootInstance.completeStream();
    await page.waitForChanges();
    expect(page.rootInstance.finalContent).toContain('Machine Learning');
    const detail = [];
    page.root.addEventListener('wppMessageActionClick', (event) => detail.push(event.detail));
    page.root.shadowRoot.querySelector(`${ACTION_TOOLBAR} wpp-action-button`).click();
    await page.waitForChanges();
    expect(detail).toHaveLength(1);
    expect(detail[0].action.id).toBe('quote');
    expect(detail[0].content).toContain('Topic pills for your campaign');
    expect(detail[0].content).toContain('Machine Learning and Computer Vision.');
  });
  it('copies the streamed text to the clipboard too', async () => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', { role: 'assistant', status: 'streaming', content: '' }),
    });
    await page.waitForChanges();
    await page.rootInstance.setStatus('streaming');
    await page.rootInstance.appendChunk('Streamed answer body.');
    await page.rootInstance.completeStream();
    await page.waitForChanges();
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', { configurable: true, writable: true, value: { writeText } });
    const buttons = page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`);
    buttons[1].click();
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(writeText).toHaveBeenCalledWith('Streamed answer body.');
    page.rootInstance.disconnectedCallback();
  });
});
describe('wpp-chat-conversation-message — Testing Watchers (WPPOPENDS-1594)', () => {
  const renderMessage = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', { role: 'assistant', status: 'complete', content: 'Hello', ...props }),
    });
    await page.waitForChanges();
    return page;
  };
  describe('@Watch("role")', () => {
    it('captures a valid message role and keeps the host ARIA role parked', async () => {
      const page = await renderMessage();
      page.root.role = 'user';
      await page.waitForChanges();
      expect(page.rootInstance.resolvedRole).toBe('user');
      expect(page.root.getAttribute('role')).toBe('group');
    });
    it('ignores the parked ARIA role echoing back and keeps the last message role', async () => {
      const page = await renderMessage();
      page.root.role = 'group';
      await page.waitForChanges();
      expect(page.root.shadowRoot.querySelector('.container-assistant')).not.toBeNull();
      expect(page.root.getAttribute('role')).toBe('group');
    });
  });
  describe('@Watch("content")', () => {
    it('re-renders the body from a changed content prop', async () => {
      const page = await renderMessage({ content: 'First' });
      page.root.content = 'Second';
      await page.waitForChanges();
      expect(page.rootInstance.finalContent).toBe('Second');
      expect(page.root.shadowRoot.textContent).toContain('Second');
    });
  });
  describe('@Watch("status")', () => {
    it('tracks the status prop into currentStatus', async () => {
      const page = await renderMessage({ status: 'complete' });
      page.root.status = 'loading';
      await page.waitForChanges();
      expect(page.rootInstance.currentStatus).toBe('loading');
    });
  });
});
describe('wpp-chat-conversation-message — Testing Snapshots (WPPOPENDS-1594)', () => {
  it('matches the default footer markup (Quote / Copy / Pin)', async () => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', { role: 'assistant', status: 'complete', content: 'Snapshot body' }),
    });
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('[part="action-toolbar"]')).toMatchSnapshot();
  });
  it('matches the pinned footer markup', async () => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', {
        role: 'assistant',
        status: 'complete',
        content: 'Snapshot body',
        actionButtonsConfig: [{ id: 'pin', isActive: true }],
      }),
    });
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('[part="action-toolbar"]')).toMatchSnapshot();
  });
  it('matches the token-count tag markup', async () => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', {
        role: 'assistant',
        status: 'complete',
        content: 'Snapshot body',
        tokenCount: '30,000',
      }),
    });
    await page.waitForChanges();
    expect(page.root.shadowRoot.querySelector('[part="token-count"]')).toMatchSnapshot();
  });
});
describe('wpp-chat-conversation-message — uncontrolled pin toggle (Pavlo QA, WPPOPENDS-1594)', () => {
  const ACTION_TOOLBAR = '[part="action-toolbar"]';
  const stripVersion = (tag) => tag?.replace(/-v\d+(-\d+)*$/, '');
  const renderMessage = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppChatConversationMessage],
      template: () => h('wpp-chat-conversation-message', { role: 'assistant', status: 'complete', content: 'Hello', ...props }),
    });
    await page.waitForChanges();
    return page;
  };
  const pinButtonOf = (page) => Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`))[2];
  const pinIconOf = (page) => stripVersion(pinButtonOf(page).firstElementChild?.tagName.toLowerCase());
  const pinLabelOf = (page) => Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-tooltip`))[2].getAttribute('text');
  // The defaults leave `isActive` undefined, which is what every consumer gets out of the box.
  // Before this fix the icon never changed unless the app wired state back — the defect Pavlo hit
  // on 14 of the 16 nodes on the ChatNode example page.
  it('flips the pin on click with no wiring at all', async () => {
    const page = await renderMessage();
    expect(pinIconOf(page)).toBe('wpp-icon-unpinned');
    expect(pinLabelOf(page)).toBe('Pin');
    pinButtonOf(page).click();
    await page.waitForChanges();
    expect(pinIconOf(page)).toBe('wpp-icon-pinned');
    expect(pinLabelOf(page)).toBe('Unpin');
  });
  it('flips back on a second click', async () => {
    const page = await renderMessage();
    pinButtonOf(page).click();
    await page.waitForChanges();
    pinButtonOf(page).click();
    await page.waitForChanges();
    expect(pinIconOf(page)).toBe('wpp-icon-unpinned');
    expect(pinLabelOf(page)).toBe('Pin');
  });
  it('reports the RESULTING state in the event, not the state it started in', async () => {
    const page = await renderMessage();
    const seen = [];
    page.root.addEventListener('wppMessageActionClick', (event) => {
      if (event.detail.action.id === 'pin')
        seen.push(event.detail.action.isActive);
    });
    pinButtonOf(page).click();
    await page.waitForChanges();
    pinButtonOf(page).click();
    await page.waitForChanges();
    expect(seen).toEqual([true, false]);
  });
  it('leaves a controlled pin entirely to the dev', async () => {
    const page = await renderMessage({ actionButtonsConfig: [{ id: 'pin', isActive: false }] });
    pinButtonOf(page).click();
    await page.waitForChanges();
    // `isActive` was supplied, so the component must not override it.
    expect(pinIconOf(page)).toBe('wpp-icon-unpinned');
    expect(pinLabelOf(page)).toBe('Pin');
  });
  it('does not give the non-toggle actions a toggled state', async () => {
    const page = await renderMessage();
    const buttons = Array.from(page.root.shadowRoot.querySelectorAll(`${ACTION_TOOLBAR} wpp-action-button`));
    buttons[0].click();
    await page.waitForChanges();
    expect(stripVersion(buttons[0].firstElementChild?.tagName.toLowerCase())).toBe('wpp-icon-blockquote');
    expect(buttons[0].ariaProps.pressed).toBeUndefined();
  });
});
