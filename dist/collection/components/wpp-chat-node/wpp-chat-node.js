import { Fragment, h, Host } from '@stencil/core';
import { transformToVersionedTag } from '../../utils/utils';
import { COPIED_CONFIRMATION_TIMEOUT, DEFAULT_REASONING_IDS, DEFAULT_TOKEN_COUNT_ICON, DEFAULT_VERBOSITY_IDS, getDefaultMessageActions, getDefaultModelOptions, LOCALES_DEFAULTS, MODEL_OPTIONS_SUBMENU_DISTANCE, MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING, } from './consts';
import { themeSubscriptionController } from '../../utils/subscribe-to-theme';
import { registerLoadingHaloAngle } from '../../utils/loading-halo';
import { SpeechRecognitionService } from '../../utils/speech-recognition';
const RESPONSE_WAIT_TIMEOUT_MS = 30000;
/**
 * Card-style node intended for use inside a React Flow canvas.
 * It renders a chat bar footer, an optional messages body,
 * and left/right handles positioned outside the card wrapper so they are never clipped.
 *
 * Selection is driven by an `isSelected` prop.
 * Loading shows an animated gradient border.
 * Resize is handled externally by React Flow's `<NodeResizer />`.
 *
 * The header always renders a fixed `wpp-icon-service` node icon that cannot be hidden, removed, or changed.
 *
 * @slot left-icon - Deprecated. No longer rendered; the header always shows the fixed `wpp-icon-service` node icon. This slot will be removed in version 5.0.0.
 * @slot - Default slot for the messages body (e.g. chat messages list).
 * @slot handles - Slot for React Flow `<Handle>` elements. Positioned outside the card so they are not clipped.
 */
export class WppChatNode {
  constructor() {
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this._locales = LOCALES_DEFAULTS;
    this.recognition = new SpeechRecognitionService();
    this.copyResetHandle = null;
    /**
     * The levels the user last chose for each model, so switching away from a model and back
     * restores their choice instead of resetting it (Mustafa, 23 Sep 2026).
     *
     * This is INSTANCE state, not a persisted session: it lives as long as this element does, so a
     * consumer that needs the selection to survive a remount or a page reload owns that itself and
     * feeds it back through `selectedReasoning` / `selectedVerbosity`.
     */
    this.modelOptionMemory = new Map();
    /** Which mount-time defaults `componentWillLoad` applied, for `componentDidLoad` to emit. */
    this.pendingModelOptionDefaults = { reasoningChanged: false, verbosityChanged: false };
    /** The two level submenus, by kind, so their popper offset can measure against the model menu. */
    this.modelOptionsSubmenuRefs = {};
    this.modelOptionsDropdownConfigs = {};
    this.handleInput = (event) => {
      const target = event.target;
      this.activateNode();
      this.inputValue = target.value;
    };
    this.handleSend = () => {
      if (!this.inputValue.trim())
        return;
      this.activateNode();
      this.startWaitingForResponse();
      this.isAudioRecording = false;
      this.recognition.stopRecognition();
      const message = {
        id: `msg-${Date.now()}`,
        content: this.inputValue.trim(),
        role: 'user',
      };
      this.messages = [...this.messages, message];
      const reasoning = this.getSelectedModelOption('reasoningOptions', this.selectedReasoning);
      const verbosity = this.getSelectedModelOption('verbosityOptions', this.selectedVerbosity);
      this.wppSend.emit({
        message: message.content,
        model: this.getSelectedModel(),
        // Spread rather than assign `null`: a level the selected model does not offer is
        // absent from the payload.
        ...(reasoning ? { reasoning } : {}),
        ...(verbosity ? { verbosity } : {}),
      });
      this.inputValue = '';
      this.scrollToBottom();
    };
    this.handleStop = () => {
      this.activateNode();
      this.clearWaitingForResponse();
      this.wppStop.emit();
    };
    this.handleReRun = () => {
      this.activateNode();
      this.wppReRun.emit();
    };
    this.handleKeyDown = (event) => {
      this.activateNode();
      if (event.key === 'Enter') {
        event.preventDefault();
        this.handleSend();
      }
    };
    this.handleClickAudioRecording = (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.activateNode();
      if (!this.recognition.isSupported) {
        console.warn('SpeechRecognition API is not supported in this browser.');
        return;
      }
      this.isAudioRecording = !this.isAudioRecording;
      if (this.isAudioRecording) {
        this.wppMic.emit({ isRecording: true });
        this.recognition.startRecognition({
          baseText: this.inputValue,
          onTranscript: newOutput => {
            if (this.inputValue === newOutput)
              return;
            this.inputValue = newOutput;
          },
          onStop: () => {
            this.isAudioRecording = false;
            this.wppMic.emit({ isRecording: false });
          },
        });
      }
      else {
        this.wppMic.emit({ isRecording: false });
        this.recognition.stopRecognition();
      }
    };
    this.handleAttach = () => {
      this.activateNode();
      this.wppAttach.emit();
    };
    this.handleActionClick = (action) => {
      this.activateNode();
      this.wppActionClick.emit(action);
    };
    this.handleModelSelect = (model) => {
      this.activateNode();
      if (model.id === 'auto') {
        this.selectedModel = 'auto';
      }
      else if (model.id === 'premium') {
        this.selectedModel = 'premium';
      }
      else {
        this.selectedModel = model;
      }
      // Assigning `selectedModel` above is what carries the levels over — `onSelectedModelChange`
      // watches it, so picking from this dropdown and having the platform set the prop take the
      // same path.
      this.selectedModelId = model.id;
      this.wppModelSelect.emit(model);
    };
    this.handleModelChange = () => {
      this.activateNode();
      this.wppModelBrowse.emit();
    };
    this.handleModelMenuShow = () => {
      this.activateNode();
      this.isModelMenuOpen = true;
    };
    this.handleModelMenuHide = () => {
      this.isModelMenuOpen = false;
    };
    /**
     * The level to pre-select for a model the user has not chosen one for yet: the first of the
     * documented defaults the model actually offers, or nothing when it offers none of them.
     */
    this.resolveDefaultOptionId = (options, defaultIds) => defaultIds.find(defaultId => options.some(option => option.id === defaultId));
    /**
     * The remembered level for a model, but only if that model still offers it — a consumer can
     * change a model's option list between selections, and a remembered id that no longer exists
     * would leave the submenu with nothing checked.
     */
    this.getRememberedOptionId = (options, rememberedId) => options.find(option => option.id === rememberedId)?.id;
    /**
     * Fills in only the levels the consumer left unset for the model selected at mount. It must not
     * overwrite: a level passed alongside the model is the consumer seeding an explicit selection
     * and outranks any default. Returns what it filled so `componentDidLoad` can emit exactly that.
     */
    this.applyModelOptionDefaults = () => {
      const { reasoning, verbosity } = this.resolveModelOptions(this.getSelectedModel());
      const reasoningChanged = this.selectedReasoning === undefined && reasoning !== undefined;
      const verbosityChanged = this.selectedVerbosity === undefined && verbosity !== undefined;
      if (reasoningChanged)
        this.selectedReasoning = reasoning;
      if (verbosityChanged)
        this.selectedVerbosity = verbosity;
      return { reasoningChanged, verbosityChanged };
    };
    /** The levels that apply to a model: what the user last chose for it, else the defaults. */
    this.resolveModelOptions = (model) => {
      const remembered = this.modelOptionMemory.get(model.id);
      const reasoningOptions = model.reasoningOptions || [];
      const verbosityOptions = model.verbosityOptions || [];
      return {
        reasoning: this.getRememberedOptionId(reasoningOptions, remembered?.reasoning) ??
          this.resolveDefaultOptionId(reasoningOptions, DEFAULT_REASONING_IDS),
        verbosity: this.getRememberedOptionId(verbosityOptions, remembered?.verbosity) ??
          this.resolveDefaultOptionId(verbosityOptions, DEFAULT_VERBOSITY_IDS),
      };
    };
    /**
     * The levels offered by whichever model is selected. `Auto` and `Premium` are built-in
     * presets that carry no per-LLM levels, so they resolve to an empty list and render no row.
     */
    this.getModelOptions = (kind) => this.getSelectedModel()[kind] || [];
    this.getSelectedModelOption = (kind, selectedId) => this.getModelOptions(kind).find(option => option.id === selectedId) || null;
    this.emitModelOptionsState = (emitter) => {
      emitter.emit({
        model: this.getSelectedModel(),
        reasoning: this.getSelectedModelOption('reasoningOptions', this.selectedReasoning),
        verbosity: this.getSelectedModelOption('verbosityOptions', this.selectedVerbosity),
      });
    };
    this.handleReasoningSelect = (option) => {
      this.activateNode();
      if (this.selectedReasoning === option.id)
        return;
      this.selectedReasoning = option.id;
      this.emitModelOptionsState(this.wppReasoningSelect);
    };
    this.handleVerbositySelect = (option) => {
      this.activateNode();
      if (this.selectedVerbosity === option.id)
        return;
      this.selectedVerbosity = option.id;
      this.emitModelOptionsState(this.wppVerbositySelect);
    };
    this.handleMessageActionClick = (message, action) => {
      this.activateNode();
      const isToggle = Boolean(action.activeIcon || action.activeLabel);
      let isActive = this.isActionActive(message, action);
      if (isToggle && action.isActive === undefined) {
        const key = this.toggleKey(message, action);
        isActive = !isActive;
        this.toggledActionKeys = isActive
          ? [...this.toggledActionKeys, key]
          : this.toggledActionKeys.filter(item => item !== key);
      }
      // The detail carries the state the action ends in, not the one it started in.
      this.wppMessageActionClick.emit({ message, action: isToggle ? { ...action, isActive } : action });
      if (action.id === 'copy') {
        this.copyMessageToClipboard(message);
      }
    };
    this.handleNodeInteraction = () => {
      this.activateNode();
    };
    // The active border is held for as long as the user is working in the node and
    // is released on the next pointer-down outside of it, mirroring the selected
    // state React Flow drives through `isSelected`.
    this.handleWindowPointerDown = (event) => {
      const target = event.target;
      if (!(target instanceof Node) || !this.host.contains(target)) {
        this.clearActiveState();
      }
    };
    this.activateNode = () => {
      this.isActive = true;
    };
    this.clearActiveState = () => {
      this.isActive = false;
    };
    this.startWaitingForResponse = () => {
      const hostElement = this.host;
      this.isWaitingForResponse = true;
      this.clearResponseWaitTimer();
      this.responseWaitTimer = setTimeout(() => {
        this.responseWaitTimer = undefined;
        if (hostElement.isConnected) {
          this.isWaitingForResponse = false;
        }
      }, RESPONSE_WAIT_TIMEOUT_MS);
      WppChatNode.unrefTimer(this.responseWaitTimer);
    };
    this.clearWaitingForResponse = () => {
      this.clearResponseWaitTimer();
      this.isWaitingForResponse = false;
    };
    this.clearResponseWaitTimer = () => {
      if (this.responseWaitTimer !== undefined) {
        clearTimeout(this.responseWaitTimer);
        this.responseWaitTimer = undefined;
      }
    };
    this.handleAttachmentImageError = (event) => {
      const attachment = event.target.closest('.chat-attachment');
      attachment?.classList.add('is-broken');
    };
    this.nodeTitle = 'New canvas';
    this.titleIcon = undefined;
    this.isLoading = false;
    this.isSelected = false;
    this.isReRun = false;
    this.size = 'm';
    this.userAvatarConfig = false;
    this.assistantAvatarConfig = { icon: 'wpp-icon-ai' };
    this.actions = [];
    this.models = [];
    this.messageActions = undefined;
    this.selectedModel = 'auto';
    this.selectedModelId = undefined;
    this.selectedReasoning = undefined;
    this.selectedVerbosity = undefined;
    this.locales = {};
    this.inputValue = '';
    this.messages = [];
    this.isActive = false;
    this.isWaitingForResponse = false;
    this.isAudioRecording = false;
    this.isModelMenuOpen = false;
    this.defaultMessageActions = [];
    this.copiedMessageId = null;
    this.toggledActionKeys = [];
  }
  static unrefTimer(timer) {
    if (typeof timer === 'object' && timer !== null && 'unref' in timer) {
      const unref = timer.unref;
      if (typeof unref === 'function') {
        unref.call(timer);
      }
    }
  }
  onUpdateLocales(newLocales) {
    this._locales = { ...LOCALES_DEFAULTS, ...newLocales };
    this.defaultMessageActions = getDefaultMessageActions(this._locales);
  }
  /**
   * Keeps the deprecated `selectedModelId` in step, and carries the reasoning/verbosity levels
   * across a model change — whichever way the model was changed, picked from this dropdown or set
   * by the platform.
   *
   * The user's choice is remembered per model for the lifetime of this element and restored when
   * they come back to it; a model they have not chosen a level for yet takes the documented
   * defaults. It deliberately does NOT reset (Mustafa, 23 Sep 2026).
   *
   * It EMITS whatever it applies: these are controlled props, so a component that silently
   * rewrote them would be overwritten again by the next render of a consumer holding its own
   * state. Only levels that actually changed emit.
   */
  onUpdateSelectedModel(newModel) {
    this.selectedModelId = typeof newModel === 'string' ? newModel : newModel?.id;
    // `selectedModel` takes either a string preset or a model object. Going from the string to an
    // object makes React remove the attribute, and Stencil's attributeChangedCallback assigns that
    // removal as `null` before the property set lands - so this watch sees a null it must ignore
    // rather than resolve. The real value arrives on the very next call.
    if (newModel === null || newModel === undefined)
      return;
    const previousModelId = this.lastResolvedModelId;
    const nextModelId = typeof newModel === 'string' ? newModel : newModel.id;
    if (previousModelId === nextModelId)
      return;
    if (previousModelId !== undefined) {
      this.modelOptionMemory.set(previousModelId, {
        reasoning: this.selectedReasoning,
        verbosity: this.selectedVerbosity,
      });
    }
    const { reasoning, verbosity } = this.resolveModelOptions(this.getSelectedModel());
    const reasoningChanged = reasoning !== this.selectedReasoning;
    const verbosityChanged = verbosity !== this.selectedVerbosity;
    this.selectedReasoning = reasoning;
    this.selectedVerbosity = verbosity;
    this.lastResolvedModelId = nextModelId;
    if (reasoningChanged)
      this.emitModelOptionsState(this.wppReasoningSelect);
    if (verbosityChanged)
      this.emitModelOptionsState(this.wppVerbositySelect);
  }
  componentWillLoad() {
    this._locales = { ...LOCALES_DEFAULTS, ...this.locales };
    this.defaultMessageActions = getDefaultMessageActions(this._locales);
    // Before the first render, so the submenus never paint with nothing checked.
    this.lastResolvedModelId = this.getSelectedModel()?.id;
    this.pendingModelOptionDefaults = this.applyModelOptionDefaults();
  }
  connectedCallback() {
    // Needed for the loading animation to rotate (see `registerLoadingHaloAngle`).
    registerLoadingHaloAngle();
    this.themeSubscription.start();
    window.addEventListener('pointerdown', this.handleWindowPointerDown, true);
  }
  componentDidLoad() {
    this.recognition.setupRecognition(this._locales.audioLanguage);
    // Emitted here rather than in `componentWillLoad` so a consumer's listeners are attached. A
    // default the component picked has to reach the consumer, or its next render pushes the unset
    // value straight back over it.
    if (this.pendingModelOptionDefaults.reasoningChanged)
      this.emitModelOptionsState(this.wppReasoningSelect);
    if (this.pendingModelOptionDefaults.verbosityChanged)
      this.emitModelOptionsState(this.wppVerbositySelect);
  }
  disconnectedCallback() {
    this.themeSubscription.stop();
    window.removeEventListener('pointerdown', this.handleWindowPointerDown, true);
    this.recognition.stopRecognition();
    this.clearResponseWaitTimer();
    this.clearCopyReset();
  }
  /**
   * Programmatically add a message (user or assistant) to the chat body.
   */
  async addMessage(message) {
    this.messages = [...this.messages, message];
    if (message.role === 'assistant' && message.content.trim()) {
      this.clearWaitingForResponse();
    }
    this.scrollToBottom();
  }
  /**
   * Programmatically update an already-added message, merging `changes` over it.
   *
   * Messages live in the component's internal state, so this is the only way to change one after
   * it has been added — needed for controlled per-message action state such as flipping a pin's
   * `isActive`. Unknown ids are ignored.
   */
  async updateMessage(id, changes) {
    if (!this.messages.some(message => message.id === id))
      return;
    this.messages = this.messages.map(message => (message.id === id ? { ...message, ...changes } : message));
  }
  /**
   * Append text to the last assistant message (for streaming).
   */
  async appendChunk(chunk) {
    const last = this.messages[this.messages.length - 1];
    if (last && last.role === 'assistant') {
      if (chunk.trim()) {
        this.clearWaitingForResponse();
      }
      this.messages = [...this.messages.slice(0, -1), { ...last, content: last.content + chunk }];
      this.scrollToBottom();
    }
  }
  scrollToBottom() {
    requestAnimationFrame(() => {
      if (this.bodyRef) {
        this.bodyRef.scrollTop = this.bodyRef.scrollHeight;
      }
    });
  }
  toggleKey(message, action) {
    return `${message.id}::${action.id}`;
  }
  /** Controlled `isActive` when the dev supplies one, otherwise the component's own toggle state. */
  isActionActive(message, action) {
    return action.isActive ?? this.toggledActionKeys.includes(this.toggleKey(message, action));
  }
  clearCopyReset() {
    if (this.copyResetHandle !== null) {
      clearTimeout(this.copyResetHandle);
      this.copyResetHandle = null;
    }
  }
  async copyMessageToClipboard(message) {
    const text = message.content?.trim();
    if (!text || !navigator.clipboard?.writeText)
      return;
    try {
      await navigator.clipboard.writeText(text);
    }
    catch {
      // The clipboard can reject (denied permission, insecure context). Leave the button idle
      // rather than confirming a copy that did not happen.
      return;
    }
    // Restart the window on a repeat click instead of stacking timers.
    this.clearCopyReset();
    this.copiedMessageId = message.id;
    this.copyResetHandle = setTimeout(() => {
      this.copiedMessageId = null;
      this.copyResetHandle = null;
    }, COPIED_CONFIRMATION_TIMEOUT);
  }
  getDefaultModels() {
    return getDefaultModelOptions(this._locales);
  }
  // The selector always resolves to a model: the built-in defaults ("Auto" / "Premium")
  // are prepended to the dev-provided `models`, and the selection falls back to "Auto".
  getSelectedModel() {
    // `selectedModel` is transiently null between React removing the attribute and setting the
    // property (see `onUpdateSelectedModel`). Resolve that to the built-in default rather than
    // dereferencing it - both this method's own `models.find` and every caller assume a model.
    if (!this.selectedModel || this.selectedModel === 'auto') {
      return this.getModelFromDeprecatedId() ?? this.getDefaultModels()[0];
    }
    else if (this.selectedModel === 'premium') {
      return this.getDefaultModels()[1];
    }
    return this.models.length === 0
      ? this.selectedModel
      : this.models.find(model => model.id === this.selectedModel.id) || this.getDefaultModels()[0];
  }
  getModelFromDeprecatedId() {
    const selectedModelId = this.selectedModelId;
    if (!selectedModelId)
      return undefined;
    const selectableModels = [...this.getDefaultModels(), ...this.models];
    return selectableModels.find(model => model.id === selectedModelId);
  }
  renderIcon(icon, slot) {
    if (!icon)
      return null;
    return h(transformToVersionedTag(icon), slot ? { slot } : {});
  }
  renderActionMenu() {
    const hasActions = this.actions.length > 0;
    if (!hasActions) {
      return (h("wpp-tooltip-v4-5-0", { text: this._locales.attachAction, config: { placement: 'bottom' } }, h("wpp-action-button-v4-5-0", { variant: "secondary", ariaProps: { label: this._locales.attachAction }, onClick: this.handleAttach }, h("wpp-icon-plus-v4-5-0", { slot: "icon-start" }))));
    }
    return (h("wpp-menu-context-v4-5-0", { class: "chat-actions-menu-context", style: { width: 'fit-content' } }, h("wpp-action-button-v4-5-0", { slot: "trigger-element", variant: "secondary", ariaProps: { label: this._locales.actionsMenu } }, h("wpp-icon-plus-v4-5-0", { slot: "icon-start" })), h("div", { class: "chat-actions-menu" }, this.actions.map(action => (h("wpp-list-item-v4-5-0", { key: `${action.icon}-${action.label}`, onWppChangeListItem: () => this.handleActionClick(action) }, this.renderIcon(action.icon, 'left'), h("span", { slot: "label" }, action.label)))))));
  }
  renderModelListItem(model, checked) {
    return (h("wpp-list-item-v4-5-0", { key: model.id, checked: checked, role: "menuitemradio", "aria-checked": String(checked), onWppChangeListItem: () => this.handleModelSelect(model) }, h("wpp-avatar-v4-5-0", { slot: "left", size: "xs", variant: "square", role: "presentation", src: model.logo, icon: model.icon, name: model.label }), h("span", { slot: "label" }, model.label), model.caption && (h("span", { slot: "caption" }, model.caption))));
  }
  /**
   * How far the submenu has to slide past its own row to sit flush with the bottom of the model
   * menu. Measured when popper asks rather than hard-coded, because it depends on which row opened
   * the submenu — Reasoning sits one row higher than Verbosity.
   */
  getModelOptionsSubmenuSkidding(kind) {
    const submenu = this.modelOptionsSubmenuRefs[kind];
    const menuRoot = submenu?.closest('[data-tippy-root]');
    if (!submenu || !menuRoot)
      return MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING;
    return menuRoot.getBoundingClientRect().bottom - submenu.getBoundingClientRect().bottom;
  }
  /**
   * Built once per kind and cached, because `wpp-menu-context` diffs `dropdownConfig` by value and
   * a fresh `offset` closure on every render would read as a change and re-apply the tippy props.
   */
  getModelOptionsDropdownConfig(kind) {
    const config = this.modelOptionsDropdownConfigs[kind] ?? {
      placement: 'right-end',
      offset: () => [this.getModelOptionsSubmenuSkidding(kind), MODEL_OPTIONS_SUBMENU_DISTANCE],
      popperOptions: {
        modifiers: [{ name: 'flip', options: { fallbackPlacements: ['right-start', 'left-end', 'left-start'] } }],
      },
    };
    this.modelOptionsDropdownConfigs[kind] = config;
    return config;
  }
  /**
   * One row in the model dropdown that opens a submenu of levels. `wpp-menu-context` treats
   * itself as nested when its first child is a `wpp-list-item`, which gives the submenu the
   * APG behaviour for free: right-side placement, ArrowRight/ArrowLeft, Escape and roving.
   *
   * The nested default top-aligns the submenu with its row (`right-start`), which sends a long
   * list of levels spilling below the model menu. The design aligns it with the bottom of the
   * model menu instead, so the placement is flipped to `right-end` and the skidding offset closes
   * the gap between the row and the menu's bottom edge. A list too tall to sit there without
   * leaving the viewport falls back to `right-start` before it is allowed to jump to the other
   * side, so the fallbacks are spelled out rather than left to the nested default.
   *
   * `isExtended` is what marks the row as a submenu trigger rather than a leaf: without it
   * `wpp-menu-context` treats a click on the row as a selection and dismisses the whole
   * dropdown. It also renders the right-pointing chevron itself.
   */
  renderModelOptionsSubmenu(kind, label, options, selectedId, onSelect) {
    return (h("wpp-menu-context-v4-5-0", { class: "model-options-menu", ref: element => (this.modelOptionsSubmenuRefs[kind] = element), dropdownConfig: this.getModelOptionsDropdownConfig(kind) }, h("wpp-list-item-v4-5-0", { slot: "trigger-element", isExtended: true }, h("span", { slot: "label" }, label)), h("div", { class: "wpp-model-options-dropdown" }, options.map(option => (h("wpp-list-item-v4-5-0", { key: option.id, checked: option.id === selectedId, labelTypography: { type: 's-midi' }, role: "menuitemradio", "aria-checked": String(option.id === selectedId), onWppChangeListItem: () => onSelect(option) }, h("span", { slot: "label" }, option.label), option.caption && h("span", { slot: "caption" }, option.caption)))))));
  }
  /**
   * Model selector triggered by the compact logo avatar (Figma). Unlike wpp-chat-input,
   * which shows the full brand logo + model label, the node exposes only the compact logo
   * avatar. The dropdown always starts with the built-in default options ("Auto" / "Premium").
   * When `models` are provided they are listed below the defaults; when `models` is empty a
   * "Select model or agent" action is rendered instead, emitting `wppModelBrowse` on click.
   */
  renderModelSelector() {
    const selectedModel = this.getSelectedModel();
    const isCustomModel = this.selectedModel !== 'auto' && this.selectedModel !== 'premium';
    const reasoningOptions = this.getModelOptions('reasoningOptions');
    const verbosityOptions = this.getModelOptions('verbosityOptions');
    // `logo` (an image URL) wins when provided; `icon` is the asset-free fallback for
    // hosts that cannot serve the brand logos (e.g. Storybook), and initials last.
    const triggerAvatar = (h("wpp-avatar-v4-5-0", { slot: "icon-start", class: "model-avatar", variant: "square", size: "xs", role: "presentation", src: selectedModel.logo, icon: selectedModel.icon, name: selectedModel.label || '' }));
    return (h("wpp-menu-context-v4-5-0", { class: "chat-model-selector", style: { width: 'fit-content' }, dropdownConfig: {
        onShow: this.handleModelMenuShow,
        onHide: this.handleModelMenuHide,
        // Per Figma (Chat Input / Model Selector): the dropdown opens ABOVE the trigger and
        // is left-aligned to it — its left edge lines up with the trigger's left edge and it
        // extends to the right ('top-start'). Fall back to 'bottom-start' (still left-aligned)
        // only when there is no room above.
        placement: 'top-start',
        popperOptions: {
          modifiers: [{ name: 'flip', options: { fallbackPlacements: ['bottom-start'] } }],
        },
      } }, h("wpp-action-button-v4-5-0", { slot: "trigger-element", class: "model-selector-trigger", variant: "secondary", ariaProps: { label: this._locales.modelSelectorLabel, expanded: this.isModelMenuOpen, haspopup: 'menu' } }, triggerAvatar), h("div", { class: "wpp-model-dropdown" }, this.getDefaultModels().map(model => this.renderModelListItem(model, model.id === selectedModel.id)), h("wpp-divider-v4-5-0", null), this.models.length > 0
      ? this.models.map(model => this.renderModelListItem(model, model.id === selectedModel.id))
      : // Nothing lists the selected model when the list is browsed externally, so
        // surface it here — otherwise the dropdown never shows what is in use.
        isCustomModel && this.renderModelListItem(selectedModel, true), reasoningOptions.length > 0 &&
      this.renderModelOptionsSubmenu('reasoning', this._locales.modelReasoningLabel, reasoningOptions, this.selectedReasoning, this.handleReasoningSelect), verbosityOptions.length > 0 &&
      this.renderModelOptionsSubmenu('verbosity', this._locales.modelVerbosityLabel, verbosityOptions, this.selectedVerbosity, this.handleVerbositySelect), this.models.length === 0 && (h(Fragment, null, isCustomModel && h("wpp-divider-v4-5-0", null), h("wpp-list-item-v4-5-0", { onWppChangeListItem: this.handleModelChange }, h("span", { slot: "label" }, this._locales.modelSelectorListItemLabel), h("wpp-icon-chevron-v4-5-0", { slot: "right", direction: "right" })))))));
  }
  renderMicrophoneBtn() {
    const recordLabel = this.isAudioRecording ? this._locales.audioStopRecordAction : this._locales.audioRecordAction;
    return (h("wpp-action-button-v4-5-0", { class: "mic-btn", "data-testid": "chat-node-mic-btn", variant: "secondary", ariaProps: { label: recordLabel }, onClick: this.handleClickAudioRecording }, this.isAudioRecording ? h("wpp-icon-stop-v4-5-0", { slot: "icon-start" }) : h("wpp-icon-mic-on-v4-5-0", { slot: "icon-start" })));
  }
  // The primary action follows a fixed priority: stop (while loading/processing)
  // > re-run (when `isReRun`) > send (once the input has content).
  getPrimaryAction(isLoadingActive) {
    if (isLoadingActive) {
      return {
        icon: 'wpp-icon-stop',
        label: this._locales.stopResponse,
        handler: this.handleStop,
        variant: 'secondary',
      };
    }
    if (this.isReRun) {
      return {
        icon: 'wpp-icon-refresh',
        label: this._locales.reRunResponse,
        handler: this.handleReRun,
        variant: 'primary',
      };
    }
    return {
      icon: 'wpp-icon-play',
      label: this._locales.sendMessage,
      handler: this.handleSend,
      variant: 'primary',
    };
  }
  isPrimaryActionVisible(isLoadingActive) {
    return isLoadingActive || this.isReRun || this.inputValue.trim().length > 0;
  }
  // The button is always rendered so it can fade/scale in smoothly (and the mic
  // slides over) via the `.is-hidden` transition instead of popping in on mount.
  renderSendButton(isLoadingActive) {
    const visible = this.isPrimaryActionVisible(isLoadingActive);
    const { icon, label, handler, variant } = this.getPrimaryAction(isLoadingActive);
    return (h("wpp-button-v4-5-0", { class: { 'play-btn': true, 'is-hidden': !visible }, size: "s", variant: variant,
      // While hidden the button stays in the DOM (to animate the fade), but must leave the
      // focus order and a11y tree so its focusable inner control does not trip axe's
      // aria-hidden-focus (SC 4.1.2). `inert` does exactly that without the disabled-grey
      // styling; it is set via ref because Stencil's JSX types don't expose the attribute.
      ref: (el) => {
        if (!el)
          return;
        if (visible)
          el.removeAttribute('inert');
        else
          el.setAttribute('inert', '');
      }, ariaProps: { label }, onClick: visible ? handler : undefined }, this.renderIcon(icon, 'icon-start')));
  }
  renderInput() {
    return (h("input", { class: "chat-input", type: "text",
      // Free-form chat message with no standard autofill token; declare autocomplete="off"
      // so browsers do not offer autofill and the field satisfies WCAG 1.3.5 (autocomplete-valid).
      autocomplete: "off", "aria-label": this._locales.messageInputLabel, placeholder: this._locales.messageInput, value: this.inputValue, onInput: this.handleInput, onKeyDown: this.handleKeyDown }));
  }
  // Single-row chat bar matching the Figma spec for both sizes: the `+` menu and
  // the input sit on the left (input grows), and the model-selector logo avatar,
  // microphone and the send/stop button sit on the right. The send button only
  // appears once the input has content (Active Filled) or while processing.
  renderChatBar(isLoadingActive) {
    const barClasses = {
      'node-chat-bar': true,
      'audio-recording': this.isAudioRecording,
    };
    return (h("div", { class: barClasses }, h("div", { class: "left-actions" }, this.renderActionMenu(), this.renderInput()), h("div", { class: "right-actions" }, h("div", { class: "right-actions-controls" }, this.renderModelSelector(), this.renderMicrophoneBtn()), this.renderSendButton(isLoadingActive))));
  }
  renderAvatar(config) {
    if (config === false)
      return null;
    return (h("wpp-avatar-v4-5-0", { class: "message-avatar", size: "s", variant: "circle", name: config.name || '', icon: config.icon, color: config.color, role: "presentation" }));
  }
  getAttachmentKind(attachment) {
    if (attachment.type.startsWith('image/'))
      return 'image';
    if (attachment.type.startsWith('video/'))
      return 'video';
    return 'file';
  }
  renderAttachmentFallback(kind) {
    const fallbackIcon = kind === 'video' ? 'wpp-icon-video-clip' : kind === 'image' ? 'wpp-icon-image' : 'wpp-icon-document';
    return h("span", { class: "chat-attachment-fallback" }, this.renderIcon(fallbackIcon));
  }
  renderMessageAttachments(message) {
    const attachments = message.attachments ?? [];
    if (attachments.length === 0)
      return null;
    return (
    // The attachments strip scrolls horizontally with no visible scrollbar, so it must be a
    // keyboard tab stop to stay operable via arrow keys (WCAG 2.1.1). A label names the region
    // now that it is focusable.
    h("div", { class: "chat-attachments", role: "list", tabIndex: 0, "aria-label": this._locales.attachmentsRegionLabel }, attachments.map((attachment, index) => {
      const kind = this.getAttachmentKind(attachment);
      const imageSource = attachment.thumbnailUrl || attachment.url;
      return (h("div", { class: `chat-attachment chat-attachment-${kind}`, role: "listitem", "aria-label": attachment.name, key: `${attachment.name}-${index}` }, imageSource ? (h("img", { src: imageSource, alt: attachment.alt || attachment.name, loading: "lazy", onError: this.handleAttachmentImageError })) : (this.renderAttachmentFallback(kind)), h("span", { class: "chat-attachment-broken-icon" }, this.renderAttachmentFallback(kind)), kind === 'video' && (h("span", { class: "chat-attachment-play", "aria-hidden": "true" }, this.renderIcon('wpp-icon-play-filled')))));
    })));
  }
  hasTokenCount(message) {
    return typeof message.tokenCount === 'string' && message.tokenCount.trim().length > 0;
  }
  /**
   * The DS component file renders the token count as an Action Button instance, so it IS a
   * wpp-action-button — not a styled div — and it emits wppMessageActionClick like the other
   * footer actions. The only deviation from the button's defaults is the grey-600 icon, set through the
   * button's own `--wpp-action-button-secondary-icon-color` hook in SCSS.
   */
  renderTokenCount(message) {
    const icon = message.tokenCountIcon ?? DEFAULT_TOKEN_COUNT_ICON;
    const action = { id: 'tokenCount', icon, label: this._locales.tokenCountLabel };
    return (h("wpp-action-button-v4-5-0", { variant: "secondary", class: "chat-token-count", ariaProps: { label: `${this._locales.tokenCountLabel} ${message.tokenCount}` }, onClick: () => this.handleMessageActionClick(message, action) }, h(transformToVersionedTag(icon), { slot: 'icon-start' }), message.tokenCount));
  }
  renderMessageAction(message, action) {
    const isCopyConfirmed = action.id === 'copy' && this.copiedMessageId === message.id;
    const isToggle = Boolean(action.activeIcon || action.activeLabel);
    const isActive = this.isActionActive(message, action);
    const icon = isCopyConfirmed ? 'wpp-icon-done' : (isActive && action.activeIcon) || action.icon;
    const label = isCopyConfirmed ? this._locales.copiedMessageAction : (isActive && action.activeLabel) || action.label;
    return (h("wpp-tooltip-v4-5-0", { key: action.id, text: label, config: { placement: 'bottom' } }, h("wpp-action-button-v4-5-0", { variant: "secondary", ariaProps: { label, ...(isToggle ? { pressed: isActive } : {}) }, onClick: () => this.handleMessageActionClick(message, action) }, this.renderIcon(icon, 'icon-start'))));
  }
  renderMessageActions(message) {
    if (message.role !== 'assistant')
      return null;
    const actions = message.actions ?? this.messageActions ?? this.defaultMessageActions;
    const hasRenderableContent = Boolean(message.content.trim() || message.attachments?.length);
    const showTokenCount = this.hasTokenCount(message);
    if (!hasRenderableContent || (actions.length === 0 && !showTokenCount))
      return null;
    return (h("div", { class: "chat-message-actions" }, actions.map(action => this.renderMessageAction(message, action)), showTokenCount && this.renderTokenCount(message), h("span", { class: "sr-only", "aria-live": "polite" }, this.copiedMessageId === message.id ? this._locales.copiedMessageAction : '')));
  }
  renderMessages() {
    if (this.messages.length === 0)
      return null;
    return this.messages.map(msg => {
      const avatarConfig = msg.role === 'user' ? this.userAvatarConfig : this.assistantAvatarConfig;
      const hasContent = msg.content.length > 0;
      const hasAttachments = Boolean(msg.attachments?.length);
      if (!hasContent && !hasAttachments)
        return null;
      return (h("div", { class: {
          'chat-message': true,
          [`chat-message-${msg.role}`]: true,
          'chat-message-no-avatar': avatarConfig === false,
        }, key: msg.id }, this.renderAvatar(avatarConfig), h("div", { class: `chat-message-content chat-message-content-${msg.role}` }, hasContent && (h("div", { class: `chat-bubble chat-bubble-${msg.role}` }, h("wpp-typography-v4-5-0", { type: "s-body" }, msg.content))), this.renderMessageAttachments(msg), this.renderMessageActions(msg))));
    });
  }
  render() {
    const isSizeS = this.size === 's';
    const isLoadingActive = !isSizeS && (this.isLoading || this.isWaitingForResponse);
    // While loading, the loading ring owns the border — the selected state is suppressed so the
    // two never co-occur (they are mutually exclusive at the source, not via a CSS guard).
    const isSelectedActive = (this.isSelected || this.isActive) && !isLoadingActive;
    const containerClasses = {
      'node-container': true,
      'loading-node': isLoadingActive,
      'selected-node': isSelectedActive,
    };
    const wrapperClasses = {
      'node-wrapper': true,
      'is-selected': isSelectedActive && !isLoadingActive,
    };
    if (isSizeS) {
      return (h(Host, { class: { 'wpp-chat-node': true, 'wpp-size-s': true }, onFocusin: this.handleNodeInteraction, onPointerDown: this.handleNodeInteraction }, h("div", { class: containerClasses }, h("div", { class: wrapperClasses }, this.renderChatBar(false))), h("slot", { name: "handles" })));
    }
    return (h(Host, { class: { 'wpp-chat-node': true, 'wpp-size-m': true }, onFocusin: this.handleNodeInteraction, onPointerDown: this.handleNodeInteraction }, h("div", { class: containerClasses }, h("div", { class: wrapperClasses }, h("div", { class: "node-header" }, h("span", { class: "title-icon" }, h("wpp-icon-service-v4-5-0", { color: "var(--wpp-grey-color-700)" })), h("wpp-tooltip-v4-5-0", { text: this.nodeTitle, class: "title-tooltip", config: {
        placement: 'top',
        onShow: () => {
          if (!this.titleRef || this.titleRef.clientWidth >= this.titleRef.scrollWidth)
            return false;
        },
      } }, h("p", { ref: el => (this.titleRef = el), class: "node-title" }, this.nodeTitle))), h("wpp-divider-v4-5-0", null), h("div", { class: "node-body", ref: el => (this.bodyRef = el) }, this.renderMessages(), h("slot", null)), h("wpp-divider-v4-5-0", null), this.renderChatBar(isLoadingActive))), h("slot", { name: "handles" })));
  }
  static get is() { return "wpp-chat-node"; }
  static get registryIs() { return "wpp-chat-node-v4-5-0"; }
  static get encapsulation() { return "scoped"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-chat-node.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-chat-node.css"]
    };
  }
  static get properties() {
    return {
      "nodeTitle": {
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
          "text": "Defines the title of the node, displayed in the header."
        },
        "attribute": "node-title",
        "reflect": false,
        "defaultValue": "'New canvas'"
      },
      "titleIcon": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "`wpp-icon-${string}`",
          "resolved": "`wpp-icon-${string}` | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "The node icon is now fixed and non-customizable; this prop is maintained for backward\ncompatibility but no longer affects the rendered icon. This property will be removed in version 5.0.0."
            }],
          "text": "Defines an optional title icon rendered before the node title."
        },
        "attribute": "title-icon",
        "reflect": false
      },
      "isLoading": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines whether the node is in a loading state. If true, the border animates."
        },
        "attribute": "is-loading",
        "reflect": false,
        "defaultValue": "false"
      },
      "isSelected": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines whether the node is in the selected/active state. Shows a blue border."
        },
        "attribute": "is-selected",
        "reflect": false,
        "defaultValue": "false"
      },
      "isReRun": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, the primary action shows a re-run affordance (refresh icon) that\nlets the user re-run the last response. Takes precedence over the send action\nbut not over the stop action shown while loading."
        },
        "attribute": "is-re-run",
        "reflect": false,
        "defaultValue": "false"
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "WppChatNodeSize",
          "resolved": "\"m\" | \"s\"",
          "references": {
            "WppChatNodeSize": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::WppChatNodeSize"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the chat node size. `'s'` renders the compact chat bar only."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "userAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeAvatarConfig | false",
          "resolved": "ChatNodeAvatarConfig | boolean",
          "references": {
            "ChatNodeAvatarConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the user avatar configuration. Set to `false` to hide the user avatar."
        },
        "attribute": "user-avatar-config",
        "reflect": false,
        "defaultValue": "false"
      },
      "assistantAvatarConfig": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeAvatarConfig | false",
          "resolved": "ChatNodeAvatarConfig | boolean",
          "references": {
            "ChatNodeAvatarConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAvatarConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the assistant avatar configuration. Set to `false` to hide the assistant avatar."
        },
        "attribute": "assistant-avatar-config",
        "reflect": false,
        "defaultValue": "{ icon: 'wpp-icon-ai' }"
      },
      "actions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeAction[]",
          "resolved": "ChatNodeAction[]",
          "references": {
            "ChatNodeAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAction"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the actions available from the `+` button.\nWhen empty (the default), the `+` button is a plain action that emits `wppAttach` on click.\nWhen it contains at least one action, the `+` button instead opens a dropdown listing them,\nand selecting one emits `wppActionClick` with the chosen action."
        },
        "defaultValue": "[]"
      },
      "models": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeModel[]",
          "resolved": "ChatNodeModel[]",
          "references": {
            "ChatNodeModel": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeModel"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the list of AI models offered by the AI model selector on the chat bar.\nThe selector always renders a dropdown that starts with the built-in default options\n(\"Auto\" / \"Premium\"). When this array is empty, the dropdown additionally renders a\n\"Select model or agent\" action that emits `wppModelBrowse` when clicked; otherwise the\nprovided models are listed below the defaults. Picking any model emits `wppModelSelect`.\nNote: the `icon` property is deprecated and should not be used, always aim to use `logo` for the image."
        },
        "defaultValue": "[]"
      },
      "messageActions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "ChatNodeMessageAction[]",
          "resolved": "ChatNodeMessageAction[] | undefined",
          "references": {
            "ChatNodeMessageAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMessageAction"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines action buttons shown below assistant messages. If omitted, localized default actions are shown.\nSet to an empty array to hide them."
        }
      },
      "selectedModel": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "ChatNodeSelectedModel",
          "resolved": "\"auto\" | \"premium\" | ChatNodeModel",
          "references": {
            "ChatNodeSelectedModel": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeSelectedModel"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the selected AI model. Accepts a built-in default option (`'auto'` / `'premium'`) or one\nof the provided `models`. Defaults to `'auto'`. The component keeps this in sync when the user\npicks a model from the dropdown; it can also be set externally when selection follows a\ndifferent flow (e.g. from a side-modal)."
        },
        "attribute": "selected-model",
        "reflect": false,
        "defaultValue": "'auto'"
      },
      "selectedModelId": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "Use `selectedModel` instead. This id-based prop will be removed in a future release."
            }],
          "text": "Defines the id of the selected model. Kept for backwards compatibility: it still selects the\nmatching option from the built-in defaults (`'auto'` / `'premium'`) or from `models`, but only\nwhile `selectedModel` sits at its default \u2014 `selectedModel` always takes precedence."
        },
        "attribute": "selected-model-id",
        "reflect": false
      },
      "selectedReasoning": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Id of the currently selected reasoning level. It must match the `id` of one of the\nselected model's `reasoningOptions`; an id that matches nothing leaves the submenu with\nno row checked rather than silently selecting a level the consumer did not ask for.\nLeave it unset for \"no level chosen\". Picking a different model from the dropdown clears\nit, because option ids are scoped to a model."
        },
        "attribute": "selected-reasoning",
        "reflect": false
      },
      "selectedVerbosity": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Id of the currently selected verbosity level, matched against the selected model's\n`verbosityOptions`. Behaves exactly like `selectedReasoning`."
        },
        "attribute": "selected-verbosity",
        "reflect": false
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Partial<ChatNodeLocales>",
          "resolved": "{ attachAction?: string | undefined; actionsMenu?: string | undefined; messageInputLabel?: string | undefined; messageInput?: string | undefined; sendMessage?: string | undefined; stopResponse?: string | undefined; reRunResponse?: string | undefined; copyMessageAction?: string | undefined; copiedMessageAction?: string | undefined; pinMessageAction?: string | undefined; unpinMessageAction?: string | undefined; tokenCountLabel?: string | undefined; likeMessageAction?: string | undefined; dislikeMessageAction?: string | undefined; regenerateMessageAction?: string | undefined; attachmentsRegionLabel?: string | undefined; audioRecordAction?: string | undefined; audioStopRecordAction?: string | undefined; audioLanguage?: string | undefined; modelSelectorLabel?: string | undefined; modelAutoOptionLabel?: string | undefined; modelAutoOptionCaption?: string | undefined; modelPremiumOptionLabel?: string | undefined; modelPremiumOptionCaption?: string | undefined; modelSelectorListItemLabel?: string | undefined; modelReasoningLabel?: string | undefined; modelVerbosityLabel?: string | undefined; }",
          "references": {
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatNodeLocales": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates the locales for the chat-node component."
        },
        "defaultValue": "{}"
      }
    };
  }
  static get states() {
    return {
      "inputValue": {},
      "messages": {},
      "isActive": {},
      "isWaitingForResponse": {},
      "isAudioRecording": {},
      "isModelMenuOpen": {},
      "defaultMessageActions": {},
      "copiedMessageId": {},
      "toggledActionKeys": {}
    };
  }
  static get events() {
    return [{
        "method": "wppSend",
        "name": "wppSend",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the send button or presses Enter."
        },
        "complexType": {
          "original": "ChatNodeSendEventDetail",
          "resolved": "ChatNodeSendEventDetail",
          "references": {
            "ChatNodeSendEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeSendEventDetail"
            }
          }
        }
      }, {
        "method": "wppStop",
        "name": "wppStop",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the stop button while the node is loading."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppReRun",
        "name": "wppReRun",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the re-run button (shown when `isReRun` is true)."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppAttach",
        "name": "wppAttach",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user clicks the + button while `actions` is empty.\nWhen `actions` is non-empty the + button opens the actions dropdown instead and this never fires."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppMic",
        "name": "wppMic",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when the user toggles the audio-record (microphone) button.\nThe detail carries the resulting state: `isRecording` is `true` when listening\nhas just started and `false` when it has just stopped."
        },
        "complexType": {
          "original": "ChatNodeMicEventDetail",
          "resolved": "ChatNodeMicEventDetail",
          "references": {
            "ChatNodeMicEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMicEventDetail"
            }
          }
        }
      }, {
        "method": "wppActionClick",
        "name": "wppActionClick",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when an action is selected from the + button's actions dropdown."
        },
        "complexType": {
          "original": "ChatNodeAction",
          "resolved": "ChatNodeAction",
          "references": {
            "ChatNodeAction": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeAction"
            }
          }
        }
      }, {
        "method": "wppModelSelect",
        "name": "wppModelSelect",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": "Emitted when a model is selected from the AI model selector dropdown.\nThe detail is the selected model object \u2014 a built-in `ChatNodeDefaultModel` (`Auto` / `Premium`)\nor one of the dev-provided `ChatNodeModel`s."
        },
        "complexType": {
          "original": "ChatNodeSelectableModel",
          "resolved": "ChatNodeDefaultModel | ChatNodeModel",
          "references": {
            "ChatNodeSelectableModel": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeSelectableModel"
            }
          }
        }
      }, {
        "method": "wppModelBrowse",
        "name": "wppModelBrowse",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the \"Select model or agent\" action from the model-selector dropdown is clicked.\nThis action is rendered only when the `models` property is an empty array."
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }, {
        "method": "wppReasoningSelect",
        "name": "wppReasoningSelect",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a level is picked from the \"Reasoning\" submenu. The detail carries the\nresulting state of the whole selection \u2014 the model plus both levels \u2014 so a consumer can\nforward it to the backend without mirroring the component's internals. Rendered only\nwhen the selected model supplies `reasoningOptions`."
        },
        "complexType": {
          "original": "ChatNodeModelOptionsEventDetail",
          "resolved": "ChatNodeModelOptionsEventDetail",
          "references": {
            "ChatNodeModelOptionsEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeModelOptionsEventDetail"
            }
          }
        }
      }, {
        "method": "wppVerbositySelect",
        "name": "wppVerbositySelect",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a level is picked from the \"Verbosity\" submenu, with the same resulting\nstate payload as `wppReasoningSelect`. Rendered only when the selected model supplies\n`verbosityOptions`."
        },
        "complexType": {
          "original": "ChatNodeModelOptionsEventDetail",
          "resolved": "ChatNodeModelOptionsEventDetail",
          "references": {
            "ChatNodeModelOptionsEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeModelOptionsEventDetail"
            }
          }
        }
      }, {
        "method": "wppMessageActionClick",
        "name": "wppMessageActionClick",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when a message action button is clicked."
        },
        "complexType": {
          "original": "ChatNodeMessageActionClickDetail",
          "resolved": "ChatNodeMessageActionClickDetail",
          "references": {
            "ChatNodeMessageActionClickDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMessageActionClickDetail"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "addMessage": {
        "complexType": {
          "signature": "(message: ChatNodeMessage) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "ChatNodeMessage": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMessage"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Programmatically add a message (user or assistant) to the chat body.",
          "tags": []
        }
      },
      "updateMessage": {
        "complexType": {
          "signature": "(id: string, changes: Partial<ChatNodeMessage>) => Promise<void>",
          "parameters": [{
              "tags": [],
              "text": ""
            }, {
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "Partial": {
              "location": "global",
              "id": "global::Partial"
            },
            "ChatNodeMessage": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-chat-node/types.ts::ChatNodeMessage"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Programmatically update an already-added message, merging `changes` over it.\n\nMessages live in the component's internal state, so this is the only way to change one after\nit has been added \u2014 needed for controlled per-message action state such as flipping a pin's\n`isActive`. Unknown ids are ignored.",
          "tags": []
        }
      },
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
          "text": "Append text to the last assistant message (for streaming).",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "locales",
        "methodName": "onUpdateLocales"
      }, {
        "propName": "selectedModel",
        "methodName": "onUpdateSelectedModel"
      }];
  }
}
