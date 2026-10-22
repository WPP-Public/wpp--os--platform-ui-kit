import { h, Host, Fragment } from '@stencil/core';
import { findSafeBoundary, getMarkdownTokens } from './utils';
import { mergeLocales, transformToVersionedTag } from '../../../utils/utils';
import { COPIED_CONFIRMATION_TIMEOUT, HOST_ARIA_ROLE, LOCALES_DEFAULTS, getDefaultActionButtons } from './consts';
import DOMPurify from 'dompurify';
import { renderToken } from './renderToken';
import { renderSlotsInListItem } from '../../wpp-autocomplete/utils';
import { LIB_COMPONENTS_PREFIX } from '../../../utils/const';
/**
 * @part attachments - Attachments strip wrapper
 * @part file-item - Individual attachment card
 * @part custom-content - Default slot wrapper for dev-supplied content
 * @part action-toolbar - Wrapper around the footer action buttons
 * @part token-count - The trailing token-count action button
 * @part icon - Icon rendered inside a footer action button
 */
export class WppChatConversationMessage {
  constructor() {
    // Streaming state
    this.accumulatedText = '';
    this.committedLength = 0;
    this.rafHandle = null;
    // Handle of the timer that reverts the copy confirmation to the idle copy icon.
    this.copyResetHandle = null;
    this.handleActionClick = (action) => {
      const isToggle = Boolean(action.activeIcon || action.activeLabel);
      let isActive = this.isActionActive(action);
      if (isToggle && action.isActive === undefined && action.id) {
        isActive = !isActive;
        this.toggledActionIds = isActive
          ? [...this.toggledActionIds, action.id]
          : this.toggledActionIds.filter(id => id !== action.id);
      }
      // The detail carries the state the action ends in, not the one it started in.
      this.wppMessageActionClick.emit({
        action: isToggle ? { ...action, isActive } : action,
        content: this.finalContent ?? '',
      });
      action.onClick?.();
      if (action.id === 'copy') {
        this.copyMessageToClipboard();
      }
    };
    this.renderActionButton = (action) => {
      const isCopyConfirmed = action.id === 'copy' && this.isCopied;
      const isToggle = Boolean(action.activeIcon || action.activeLabel);
      const isActive = this.isActionActive(action);
      const icon = isCopyConfirmed ? 'wpp-icon-done' : (isActive && action.activeIcon) || action.icon;
      const label = isCopyConfirmed ? this._locales.copiedAction : (isActive && action.activeLabel) || action.label;
      if (!icon)
        return null;
      return (h("wpp-tooltip-v4-6-0", { key: action.id, text: label, config: { placement: 'bottom' } }, h("wpp-action-button-v4-6-0", { variant: "secondary", disabled: action.disabled, loading: action.loading,
        // The derived label and toggle state come first so a dev override wins, while the
        // config-only fields (icon, text, isActive, …) are never spread onto the element.
        ariaProps: { label, ...(isToggle ? { pressed: isActive } : {}), ...action.ariaProps }, onClick: () => this.handleActionClick(action) }, h(transformToVersionedTag(icon), { slot: 'icon-start', part: 'icon' }))));
    };
    this.renderMenuContextListItems = () => (h(Fragment, null, this.menuContextListItems.map(item => {
      const { label, slots, ...rest } = item;
      return (h("wpp-list-item-v4-6-0", { ...rest, id: item.id !== undefined ? `${LIB_COMPONENTS_PREFIX}list-item-${item.id}` : undefined, role: "option" }, h("span", { slot: "label" }, label), slots && renderSlotsInListItem(slots, Boolean(label)).map((slotNode) => slotNode)));
    })));
    this.hostCssClasses = () => ({
      'wpp-chat-conversation': true,
    });
    this.shouldRenderAvatar = (type) => {
      if (this.userAvatarConfig === false && type === 'user')
        return false;
      if (this.assistantAvatarConfig === false && type === 'assistant')
        return false;
      const config = type === 'user' ? this.userAvatarConfig : this.assistantAvatarConfig;
      return Object.keys(config).length > 0;
    };
    this.containerCssClasses = () => ({
      container: true,
      [`container-${this.resolvedRole}`]: true,
      'no-user-avatar': !this.shouldRenderAvatar('user'),
      'no-assistant-avatar': !this.shouldRenderAvatar('assistant'),
    });
    this.contentCssClasses = () => ({
      content: true,
      [`content-${this.resolvedRole}`]: true,
    });
    this.messageCssClasses = () => ({
      message: true,
      [`message-${this.resolvedRole}`]: true,
      [`message-${this.currentStatus}`]: true,
    });
    this.committedTokens = [] // parsed + rendered blocks
    ;
    this.liveText = '' // current in-progress raw text
    ;
    this.currentStatus = 'complete';
    this.finalContent = '';
    this.isCopied = false;
    this.toggledActionIds = [];
    this.resolvedRole = 'user';
    this.role = 'user';
    this.content = '';
    this.status = 'complete';
    this.actionButtonsConfig = undefined;
    this.menuContextListItems = undefined;
    this.sourcesActionConfig = undefined;
    this.tokenCount = undefined;
    this.tokenCountIcon = 'wpp-icon-premium';
    this.locales = undefined;
    this.assistantAvatarConfig = {};
    this.userAvatarConfig = {};
    this.attachments = [];
  }
  async appendChunk(chunk) {
    this.accumulatedText += chunk;
    this.scheduleRefresh();
  }
  async completeStream() {
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
    const remaining = this.accumulatedText.slice(this.committedLength);
    if (remaining.trim()) {
      const tokens = getMarkdownTokens(remaining);
      if (Array.isArray(tokens) && tokens.length) {
        this.committedTokens = [...this.committedTokens, ...tokens];
      }
    }
    this.finalContent = this.accumulatedText;
    this.currentStatus = 'complete';
    // Reset streaming state
    this.accumulatedText = '';
    this.committedLength = 0;
    this.committedTokens = [];
    this.liveText = '';
  }
  async setStatus(status) {
    if (status === 'streaming') {
      this.accumulatedText = '';
      this.committedLength = 0;
      this.committedTokens = [];
      this.liveText = '';
    }
    this.currentStatus = status;
  }
  onStatusChange(newValue) {
    if (newValue === 'complete' && this.currentStatus === 'streaming') {
      this.completeStream();
    }
    else {
      this.currentStatus = newValue;
    }
  }
  onContentChange(newValue) {
    this.finalContent = newValue;
  }
  onRoleChange(newValue) {
    if (newValue !== 'user' && newValue !== 'assistant')
      return;
    this.resolvedRole = newValue;
    // Re-park immediately rather than waiting for the next render: framework bindings write this
    // AFTER the component's last render (React does, on every re-render), so a render-time-only
    // fix leaves the invalid ARIA role on the host until something else forces a re-render.
    this.parkHostAriaRole();
  }
  componentWillLoad() {
    this.currentStatus = this.status;
    this.finalContent = this.content;
    this.onRoleChange(this.role);
  }
  // Deliberately NOT connectedCallback: parking the role there runs before the props hydrate, so
  // `this.role` is already 'group' by the time componentWillLoad reads it and the message role is
  // lost (it broke 38 specs). The remaining window is pre-first-paint, so nothing renders or is
  // scanned with the invalid role.
  componentDidRender() {
    this.parkHostAriaRole();
    this.observeHostAriaRole();
  }
  /**
   * `role` is a data prop carrying a MessageRole, but it shares its name with the global ARIA
   * attribute, so "user"/"assistant" would sit on the host as an invalid ARIA role (axe:
   * aria-roles, critical). Park a valid role there instead; `resolvedRole` keeps the real value.
   */
  parkHostAriaRole() {
    const current = this.host?.getAttribute('role');
    if (current === HOST_ARIA_ROLE)
      return;
    // Capture a message role written straight to the attribute before overwriting it, so an
    // attribute-only update still drives the layout.
    if (current === 'user' || current === 'assistant') {
      this.resolvedRole = current;
    }
    this.host?.setAttribute('role', HOST_ARIA_ROLE);
  }
  /**
   * Framework bindings re-assert `role` outside Stencil's prop lifecycle — React rewrites it on
   * every re-render — so the only reliable guard is observing the attribute itself.
   *
   * Why not the `@Watch('role')` alone: it was tried and measured. With the watcher as the sole
   * guard, hosts read `role="group"` on first paint but reverted to `role="user"`/`"assistant"`
   * after the very next React re-render (toggling any page state), because React's identical
   * re-write is not a change from Stencil's point of view once the prop already holds that value,
   * so the watcher never fires. With this observer, five consecutive forced re-renders and a raw
   * `setAttribute('role', 'assistant')` all held at `group`, and axe's aria-roles rule went from
   * 1 critical node per message to 0. mock-doc does not deliver MutationObserver records, so this
   * is verified in the browser rather than in a spec.
   *
   * Re-parking is idempotent: the guard in `parkHostAriaRole` makes the observer's own write a
   * no-op, so it cannot loop.
   */
  observeHostAriaRole() {
    if (this.roleObserver || typeof MutationObserver === 'undefined')
      return;
    this.roleObserver = new MutationObserver(() => this.parkHostAriaRole());
    this.roleObserver.observe(this.host, { attributes: true, attributeFilter: ['role'] });
  }
  disconnectedCallback() {
    this.clearCopyReset();
    this.roleObserver?.disconnect();
    this.roleObserver = undefined;
    if (this.rafHandle !== null) {
      cancelAnimationFrame(this.rafHandle);
      this.rafHandle = null;
    }
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  /**
   * The footer actions as rendered: the built-in defaults with any dev override merged on top.
   *
   * Overrides are matched by `id` so config order stops being load-bearing — a dev can retarget a
   * single action without restating the others. An override with no `id` falls back to the default
   * at the same index, which keeps pre-existing positional configs (handlers only, no icons) wired.
   * Anything left over is appended as an extra action and must bring its own icon.
   */
  get mergedActions() {
    const defaults = getDefaultActionButtons(this._locales);
    const overrides = this.actionButtonsConfig;
    if (!overrides?.length)
      return defaults;
    const merged = new Map(defaults.map(action => [action.id, { ...action }]));
    const extras = [];
    overrides.forEach((override, ndx) => {
      const targetId = override.id ?? defaults[ndx]?.id;
      if (targetId && merged.has(targetId)) {
        merged.set(targetId, { ...merged.get(targetId), ...override, id: targetId });
      }
      else {
        extras.push({ ...override });
      }
    });
    return [...merged.values(), ...extras];
  }
  /** Controlled `isActive` when the dev supplies one, otherwise the component's own toggle state. */
  isActionActive(action) {
    return action.isActive ?? (!!action.id && this.toggledActionIds.includes(action.id));
  }
  clearCopyReset() {
    if (this.copyResetHandle !== null) {
      clearTimeout(this.copyResetHandle);
      this.copyResetHandle = null;
    }
  }
  async copyMessageToClipboard() {
    const text = this.finalContent?.trim();
    if (!text || !navigator.clipboard?.writeText)
      return;
    try {
      await navigator.clipboard.writeText(text);
    }
    catch {
      // The clipboard can reject (denied permission, insecure context). Leave the button in its
      // idle state rather than confirming a copy that did not happen.
      return;
    }
    // Restart the window on a repeat click instead of stacking timers.
    this.clearCopyReset();
    this.isCopied = true;
    this.copyResetHandle = setTimeout(() => {
      this.isCopied = false;
      this.copyResetHandle = null;
    }, COPIED_CONFIRMATION_TIMEOUT);
  }
  scheduleRefresh() {
    if (this.rafHandle !== null)
      return;
    this.rafHandle = requestAnimationFrame(() => {
      this.rafHandle = null;
      this.refreshDisplay();
    });
  }
  refreshDisplay() {
    const uncommitted = this.accumulatedText.slice(this.committedLength);
    const boundary = findSafeBoundary(uncommitted);
    if (boundary !== -1) {
      const toCommit = uncommitted.slice(0, boundary);
      const tokens = getMarkdownTokens(toCommit);
      if (Array.isArray(tokens) && tokens.length) {
        this.committedTokens = [...this.committedTokens, ...tokens];
      }
      this.committedLength += boundary;
      this.liveText = uncommitted.slice(boundary);
      // Multiple blocks may have completed this frame
      this.refreshDisplay();
    }
    else {
      this.liveText = uncommitted;
    }
  }
  renderStreaming() {
    return (h("div", { class: "message-text" }, this.committedTokens.map((token) => renderToken(token, this.resolvedRole)), h("span", { class: "streaming-live" }, DOMPurify.sanitize(this.liveText), h("span", { class: "cursor", "aria-hidden": "true" }))));
  }
  renderComplete() {
    const tokens = getMarkdownTokens(this.finalContent);
    if (!Array.isArray(tokens)) {
      return (h("wpp-typography-v4-6-0", { type: "s-body", tag: "p" }, DOMPurify.sanitize(this.finalContent)));
    }
    return h("div", { class: "message-text" }, tokens.map((token) => renderToken(token, this.resolvedRole)));
  }
  renderAttachments() {
    if (!this.attachments || this.attachments.length === 0)
      return null;
    return (h("div", { class: "attachments", part: "attachments", role: "list" }, this.attachments.map((file, index) => (h("wpp-file-upload-item-v4-6-0", { key: index, variant: "chat", part: "file-item", role: "listitem", "aria-posinset": (index + 1).toString(), "aria-setsize": this.attachments.length.toString(), file: {
        name: file.name,
        url: file.url,
        type: file.type,
        size: file.size || 0,
        deletable: false,
        ...file.fileItemProps,
      } })))));
  }
  hasTokenCount() {
    return typeof this.tokenCount === 'string' && this.tokenCount.trim().length > 0;
  }
  /**
   * The DS component file renders the token count as an Action Button instance (S-Strong text,
   * ghost hover, 6px radius), so it IS a wpp-action-button here — not a styled div — and it emits
   * the same event as the other footer actions so a consumer can hook usage details onto it. The
   * only deviation from the button's defaults is the grey-600 icon, set through the button's own
   * `--wpp-action-button-secondary-icon-color` hook in SCSS (an icon `color` prop loses to the
   * button's ::slotted rule).
   */
  renderTokenCount() {
    return (h("wpp-action-button-v4-6-0", { variant: "secondary", class: "token-count", part: "token-count", ariaProps: { label: `${this._locales.tokenCountLabel} ${this.tokenCount}` }, onClick: () => this.handleActionClick({ id: 'tokenCount', label: this._locales.tokenCountLabel }) }, h(transformToVersionedTag(this.tokenCountIcon), { slot: 'icon-start' }), this.tokenCount));
  }
  hasTextContent() {
    return !!this.finalContent && this.finalContent.trim().length > 0;
  }
  render() {
    return (h(Host, { class: this.hostCssClasses() }, h("div", { class: this.containerCssClasses() }, this.shouldRenderAvatar('assistant') && (h("div", { class: "avatar-wrapper ai-avatar" }, this.resolvedRole === 'assistant' && (h("wpp-avatar-v4-6-0", { size: "s", icon: "wpp-icon-ai", role: "presentation", ...this.assistantAvatarConfig })))), h("div", { class: this.contentCssClasses() }, h("div", { class: this.messageCssClasses() }, this.currentStatus === 'streaming' && this.renderStreaming(), this.currentStatus === 'complete' && this.hasTextContent() && this.renderComplete(), h("slot", { part: "custom-content" }), this.currentStatus === 'complete' && !!this.attachments?.length && this.renderAttachments()), this.resolvedRole === 'assistant' && this.currentStatus === 'complete' && (h("div", { class: "actions" }, h("div", { class: "action-toolbar", part: "action-toolbar" }, this.mergedActions.map(this.renderActionButton), this.menuContextListItems && (h("wpp-menu-context-v4-6-0", null, h("wpp-action-button-v4-6-0", { variant: "secondary", slot: "trigger-element" }, h("wpp-icon-more-v4-6-0", { slot: "icon-start", direction: "horizontal" })), this.renderMenuContextListItems()))), this.hasTokenCount()
      ? this.renderTokenCount()
      : this.sourcesActionConfig && (h("div", { class: "sources-action" }, h("wpp-action-button-v4-6-0", { variant: "secondary", ariaProps: this.sourcesActionConfig.ariaProps, disabled: this.sourcesActionConfig.disabled, loading: this.sourcesActionConfig.loading, onClick: () => this.sourcesActionConfig.onClick?.() }, this.sourcesActionConfig.text))), h("span", { class: "sr-only", "aria-live": "polite" }, this.isCopied ? this._locales.copiedAction : '')))), this.shouldRenderAvatar('user') && (h("div", { class: "avatar-wrapper user-avatar" }, this.resolvedRole === 'user' && h("wpp-avatar-v4-6-0", { size: "s", role: "presentation", ...this.userAvatarConfig }))))));
  }
  static get is() { return "wpp-chat-conversation-message"; }
  static get registryIs() { return "wpp-chat-conversation-message-v4-6-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-conversation-message.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-conversation-message.css"]
    };
  }
  static get properties() {
    return {
      "role": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "MessageRole",
          "resolved": "\"assistant\" | \"user\"",
          "references": {
            "MessageRole": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::MessageRole"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the role of the message.\n\nWrite-only in practice: `role` collides with the global ARIA attribute of the same name, and\n\"user\"/\"assistant\" are not valid ARIA roles, so the component parks a valid role on the host\nand tracks the message role internally. Reading `el.role` back therefore returns the parked\nARIA role, not the message role \u2014 set it, don't read it."
        },
        "attribute": "role",
        "reflect": false,
        "defaultValue": "'user'"
      },
      "content": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the content of the message."
        },
        "attribute": "content",
        "reflect": false,
        "defaultValue": "''"
      },
      "status": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "MessageStatus",
          "resolved": "\"complete\" | \"loading\" | \"streaming\"",
          "references": {
            "MessageStatus": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::MessageStatus"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the status of the message."
        },
        "attribute": "status",
        "reflect": false,
        "defaultValue": "'complete'"
      },
      "actionButtonsConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActionButtonDataConfig[]",
          "resolved": "ActionButtonDataConfig[]",
          "references": {
            "ActionButtonDataConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::ActionButtonDataConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the action buttons configuration."
        }
      },
      "menuContextListItems": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ListItemInterface[]",
          "resolved": "ListItemInterface[]",
          "references": {
            "ListItemInterface": {
              "location": "import",
              "path": "../../wpp-select/types",
              "id": "src/components/wpp-select/types.ts::ListItemInterface"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "The response footer is now Quote / Copy / Pin plus the token count, with no overflow\nmenu (WPPOPENDS-1594). Still rendered for backwards compatibility; it will be removed in the\nnext major. Put any extra action in `actionButtonsConfig` instead."
            }],
          "text": "Defines the list items for the context menu."
        }
      },
      "sourcesActionConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ActionButtonDataConfig",
          "resolved": "(Partial<Partial<Pick<WppActionButton, \"value\" | \"disabled\" | \"loading\" | \"autoFocus\" | \"name\" | \"form\" | \"type\" | \"ariaProps\">> & { id?: string | undefined; onClick?: (() => void) | undefined; tooltip?: string | undefined; } & { icon: `wpp-icon-${string}`; label?: string | undefined; }> & { text?: string | undefined; label?: string | undefined; isActive?: boolean | undefined; activeIcon?: `wpp-icon-${string}` | undefined; activeLabel?: string | undefined; }) | (Partial<Partial<Pick<WppActionButton, \"value\" | \"disabled\" | \"loading\" | \"autoFocus\" | \"name\" | \"form\" | \"type\" | \"ariaProps\">> & { id?: string | undefined; onClick?: (() => void) | undefined; tooltip?: string | undefined; } & { icon?: undefined; label: string; }> & { text?: string | undefined; label?: string | undefined; isActive?: boolean | undefined; activeIcon?: `wpp-icon-${string}` | undefined; activeLabel?: string | undefined; })",
          "references": {
            "ActionButtonDataConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::ActionButtonDataConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "Use `tokenCount` instead. The footer's trailing slot now shows the response's token\ncount. Still rendered for backwards compatibility, but suppressed whenever `tokenCount` is set."
            }],
          "text": "Defines the source action button configuration."
        }
      },
      "tokenCount": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Token count for this response, already formatted for display (e.g. `'30,000'`). The footer tag is\nrendered only when this is a non-empty string, so omit it for the Auto/Premium model options."
        },
        "attribute": "token-count",
        "reflect": false
      },
      "tokenCountIcon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "`wpp-icon-${string}`",
          "resolved": "`wpp-icon-${string}`",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Icon rendered beside `tokenCount`."
        },
        "attribute": "token-count-icon",
        "reflect": false,
        "defaultValue": "'wpp-icon-premium'"
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ChatConversationMessageLocales>",
          "resolved": "undefined | { quoteAction?: string | undefined; copyAction?: string | undefined; copiedAction?: string | undefined; pinAction?: string | undefined; unpinAction?: string | undefined; tokenCountLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatConversationMessageLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-conversation/components/types.ts::ChatConversationMessageLocales"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Partial translation overrides for the footer, deep-merged over the English defaults."
        }
      },
      "assistantAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "AvatarConfig | false",
          "resolved": "boolean | { icon?: string | undefined; name?: string | undefined; ariaProps?: AriaProps | undefined; src?: string | undefined; color?: string | undefined; withTooltip?: boolean | undefined; }",
          "references": {
            "AvatarConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::AvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- The component should no longer render an avatar for the AI model."
            }],
          "text": "Defines the avatar configuration for the assistant avatar."
        },
        "attribute": "assistant-avatar-config",
        "reflect": false,
        "defaultValue": "{}"
      },
      "userAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "AvatarConfig | false",
          "resolved": "boolean | { icon?: string | undefined; name?: string | undefined; ariaProps?: AriaProps | undefined; src?: string | undefined; color?: string | undefined; withTooltip?: boolean | undefined; }",
          "references": {
            "AvatarConfig": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::AvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "- The component should no longer render an avatar for the user."
            }],
          "text": "Defines the avatar configuration for the user avatar."
        },
        "attribute": "user-avatar-config",
        "reflect": false,
        "defaultValue": "{}"
      },
      "attachments": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatAttachment[]",
          "resolved": "ChatAttachment[]",
          "references": {
            "ChatAttachment": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::ChatAttachment"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the attachments for the message."
        },
        "defaultValue": "[]"
      }
    };
  }
  static get states() {
    return {
      "committedTokens": {},
      "liveText": {},
      "currentStatus": {},
      "finalContent": {},
      "isCopied": {},
      "toggledActionIds": {},
      "resolvedRole": {}
    };
  }
  static get events() {
    return [{
        "method": "wppMessageActionClick",
        "name": "wppMessageActionClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a footer action button is clicked. The detail carries the merged action config\n(including its `id` \u2014 `quote`, `copy` or `pin` for the built-in defaults) and the message's\nresolved text, which is the only reliable source of that text after a streamed response."
        },
        "complexType": {
          "original": "ChatConversationMessageActionClickDetail",
          "resolved": "ChatConversationMessageActionClickDetail",
          "references": {
            "ChatConversationMessageActionClickDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-conversation/components/types.ts::ChatConversationMessageActionClickDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "appendChunk": {
        "complexType": {
          "signature": "(chunk: string) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "completeStream": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "setStatus": {
        "complexType": {
          "signature": "(status: MessageStatus) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "MessageStatus": {
              "location": "import",
              "path": "../types",
              "id": "src/components/wpp-chat-conversation/types.ts::MessageStatus"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "status",
        "methodName": "onStatusChange"
      }, {
        "propName": "content",
        "methodName": "onContentChange"
      }, {
        "propName": "role",
        "methodName": "onRoleChange"
      }];
  }
}
