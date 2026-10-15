import { r as registerInstance, c as createEvent, h, F as Fragment, H as Host, g as getElement } from './index-a0877c3d.js';
import { k as transformToVersionedTag } from './utils-f7e38fc9.js';
import { t as themeSubscriptionController } from './subscribe-to-theme-487838b3.js';
import { r as registerLoadingHaloAngle } from './loading-halo-2a7b93f0.js';
import { S as SpeechRecognitionService } from './speech-recognition-6803da23.js';
import './consts-744c144f.js';
import './theme-observer-b7886d19.js';

const LOCALES_DEFAULTS = {
  attachAction: 'Attach file',
  actionsMenu: 'Open chat actions',
  messageInputLabel: 'Message',
  messageInput: 'Message...',
  sendMessage: 'Send message',
  stopResponse: 'Stop response',
  copyMessageAction: 'Copy',
  copiedMessageAction: 'Copied',
  pinMessageAction: 'Pin',
  unpinMessageAction: 'Unpin',
  tokenCountLabel: 'Token usage',
  likeMessageAction: 'Like',
  dislikeMessageAction: 'Dislike',
  regenerateMessageAction: 'Regenerate',
  reRunResponse: 'Re-run',
  attachmentsRegionLabel: 'Attachments',
  audioRecordAction: 'Start audio recording',
  audioStopRecordAction: 'Stop audio recording',
  audioLanguage: 'en-US',
  modelSelectorLabel: 'Select model',
  modelAutoOptionLabel: 'Auto',
  modelAutoOptionCaption: 'Picks the right model per task',
  modelPremiumOptionLabel: 'Premium',
  modelPremiumOptionCaption: 'Favours high-end, efficient models',
  modelSelectorListItemLabel: 'Select model or agent',
  modelReasoningLabel: 'Reasoning',
  modelVerbosityLabel: 'Verbosity',
};
/**
 * The built-in default model options ("Auto" / "Premium") always rendered at the top of
 * the model-selector dropdown, mirroring wpp-chat-input. The logos are hosted brand assets.
 */
const getDefaultModelOptions = (locales) => [
  {
    id: 'auto',
    label: locales.modelAutoOptionLabel,
    caption: locales.modelAutoOptionCaption,
    logo: 'https://public-assets.os.wpp.com/images/social-media-and-companies-auto.svg',
  },
  {
    id: 'premium',
    label: locales.modelPremiumOptionLabel,
    caption: locales.modelPremiumOptionCaption,
    logo: 'https://public-assets.os.wpp.com/images/social-media-and-companies-premium.svg',
  },
];
/**
 * Levels used when a model is selected and the user has not chosen one for it yet:
 * "Reasoning: Auto, with fallback to Medium. Verbosity: Medium." (Mustafa, 23 Sep 2026).
 * Matched against the ids the consumer supplies, first hit wins; a model offering none of them
 * gets no default rather than an arbitrary guess. These literals are the platform's
 * `ReasoningLevel` / `LlmOutputVerbosity` enum values.
 */
const DEFAULT_REASONING_IDS = ['auto', 'medium'];
const DEFAULT_VERBOSITY_IDS = ['medium'];
/**
 * Geometry for a level submenu, which the design aligns with the bottom of the model menu rather
 * than with the row that opens it. Popper's skidding offset moves the popup along the trigger's
 * cross axis, so for a `right-end` placement a skidding equal to the gap between the row and the
 * menu's bottom edge puts the last level in line with the menu's last row. The fallback is that
 * gap when the menu is not a popup and there is nothing to measure against.
 */
const MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING = 8;
const MODEL_OPTIONS_SUBMENU_DISTANCE = 9;
/**
 * The footer actions rendered below an assistant message when a dev passes no `messageActions`.
 * The node has no quote action — unlike wpp-chat-conversation, its single-row chat bar has no
 * place to show the resulting quote, so the design drops it here (confirmed by design, Sep 2026).
 */
const getDefaultMessageActions = (locales) => [
  { id: 'copy', icon: 'wpp-icon-copy', label: locales.copyMessageAction },
  {
    id: 'pin',
    icon: 'wpp-icon-unpinned',
    activeIcon: 'wpp-icon-pinned',
    label: locales.pinMessageAction,
    activeLabel: locales.unpinMessageAction,
  },
];
/**
 * How long a message's copy confirmation (checkmark + "Copied" label) stays visible before the
 * button reverts to its idle state.
 */
const COPIED_CONFIRMATION_TIMEOUT = 3000;
/** Icon rendered beside a message's token count when the message does not override it. */
const DEFAULT_TOKEN_COUNT_ICON = 'wpp-icon-premium';

const wppChatNodeCss = "@charset \"UTF-8\";.sc-wpp-chat-node-h{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;position:relative;width:100%;height:100%;min-width:280px;max-width:440px;min-height:280px;max-height:600px;-webkit-box-sizing:border-box;box-sizing:border-box}.wpp-size-s.sc-wpp-chat-node-h{min-height:64px;max-height:64px}.wpp-size-s.sc-wpp-chat-node-h .node-container.loading-node.sc-wpp-chat-node::before,.wpp-size-s.sc-wpp-chat-node-h .node-container.loading-node.sc-wpp-chat-node::after{content:none;background:none;-webkit-animation:none;animation:none}.node-container.sc-wpp-chat-node{position:relative;-ms-flex:1 1 0px;flex:1 1 0;min-height:0;width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;border-radius:calc(var(--wpp-border-radius-l) + 2px);-webkit-box-sizing:border-box;box-sizing:border-box}.node-container.selected-node.sc-wpp-chat-node::before{content:\"\";position:absolute;z-index:0;inset:-1px;pointer-events:none;border:var(--wpp-border-width-s) solid var(--wpp-primary-color-500);border-radius:calc(var(--wpp-border-radius-l) + 1px)}.node-container.loading-node.sc-wpp-chat-node::before{content:\"\";position:absolute;z-index:0;inset:calc(-1 * (0px + 2px + 13px));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, color-mix(in srgb, var(--wpp-loading-halo-glow-color, var(--wpp-dataviz-color-seq-brand-400)) 65%, transparent) 16%, transparent 40%);-webkit-filter:blur(10px);filter:blur(10px);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--wpp-border-radius-l) + 2px + 6px)}.node-container.loading-node.sc-wpp-chat-node::after{content:\"\";position:absolute;z-index:0;inset:calc(-1 * (0px + 2px));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, var(--wpp-loading-halo-highlight-color, var(--wpp-dataviz-color-seq-brand-600)) 12%, var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900)) 30%, transparent 46%);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--wpp-border-radius-l) + 2px)}@media (prefers-reduced-motion: reduce){.node-container.loading-node.sc-wpp-chat-node::before{display:none}.node-container.loading-node.sc-wpp-chat-node::after{-webkit-animation:none;animation:none;background:var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900))}}@-webkit-keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}@keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}.node-wrapper.sc-wpp-chat-node{position:relative;-ms-flex:1 1 0px;flex:1 1 0;min-height:0;border-radius:var(--wpp-border-radius-l);background-color:var(--wpp-grey-color-000);-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s);width:100%;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;overflow:visible;z-index:1}.node-wrapper.sc-wpp-chat-node:hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.node-header.sc-wpp-chat-node{padding:15px 16px;height:64px;-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:start;justify-content:flex-start;gap:10px;-ms-flex:0 0 auto;flex:0 0 auto;min-width:0}.title-icon.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;-ms-flex:0 0 auto;flex:0 0 auto;width:20px;height:20px;color:var(--wpp-grey-color-700)}.title-tooltip.sc-wpp-chat-node{-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;overflow:hidden}.title-tooltip.sc-wpp-chat-node::part(anchor){width:100%;min-width:0}.node-title.sc-wpp-chat-node{margin:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0)}.node-body.sc-wpp-chat-node{-ms-flex:1 1 auto;flex:1 1 auto;min-height:0;overflow-y:auto;padding:0 6px 0 16px;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;gap:0;-webkit-box-sizing:border-box;box-sizing:border-box;scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.node-body.sc-wpp-chat-node::-webkit-scrollbar-track{background:transparent}.node-body.sc-wpp-chat-node::-webkit-scrollbar-thumb{background-color:var(--wpp-grey-color-400);border-radius:2px}.chat-message.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-align:start;align-items:flex-start;gap:16px;width:100%;max-width:100%;padding:24px 0;-webkit-box-sizing:border-box;box-sizing:border-box}.chat-message.sc-wpp-chat-node .message-avatar.sc-wpp-chat-node{-ms-flex:0 0 32px;flex:0 0 32px;width:32px;height:32px}.chat-message-content.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex:1 1 auto;flex:1 1 auto;-ms-flex-direction:column;flex-direction:column;gap:12px;min-width:0;max-width:100%}.chat-message-user.sc-wpp-chat-node{-ms-flex-direction:row-reverse;flex-direction:row-reverse;-ms-flex-pack:start;justify-content:flex-start}.chat-message-user.chat-message-no-avatar.sc-wpp-chat-node{-ms-flex-pack:end;justify-content:flex-end}.chat-message-user.sc-wpp-chat-node .chat-message-content.sc-wpp-chat-node{-ms-flex-align:end;align-items:flex-end;max-width:480px}.chat-message-assistant.sc-wpp-chat-node{-ms-flex-pack:start;justify-content:flex-start}.chat-message-assistant.sc-wpp-chat-node .chat-message-content.sc-wpp-chat-node{-ms-flex-align:start;align-items:flex-start}.chat-bubble.sc-wpp-chat-node{max-width:100%;padding:12px;border-radius:var(--wpp-border-radius-m);-webkit-box-sizing:border-box;box-sizing:border-box;word-wrap:break-word}.chat-bubble.sc-wpp-chat-node .wpp-typography.sc-wpp-chat-node{display:initial}.chat-bubble-user.sc-wpp-chat-node{width:100%;background-color:var(--wpp-primary-color-100);border-radius:var(--wpp-border-radius-m) 0 var(--wpp-border-radius-m) var(--wpp-border-radius-m)}.chat-bubble-assistant.sc-wpp-chat-node{padding:0;background-color:transparent;border-radius:0}.chat-attachments.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:start;align-items:flex-start;gap:8px;width:100%;overflow:auto hidden;scrollbar-width:none}.chat-attachments.sc-wpp-chat-node::-webkit-scrollbar{display:none}.chat-attachments.sc-wpp-chat-node:focus-visible{border-radius:var(--wpp-border-radius-s);outline:none;-webkit-box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color);box-shadow:0 0 0 1px var(--wpp-grey-color-000), 0 0 0 3px var(--wpp-brand-color)}.chat-attachment.sc-wpp-chat-node{position:relative;display:-ms-flexbox;display:flex;-ms-flex:0 0 82px;flex:0 0 82px;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:82px;height:80px;overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;border:var(--wpp-border-width-s) solid var(--wpp-grey-color-000);border-radius:var(--wpp-border-radius-xs);background:var(--wpp-grey-color-200);color:var(--wpp-grey-color-600)}.chat-attachment.sc-wpp-chat-node img.sc-wpp-chat-node{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.chat-attachment.is-broken.sc-wpp-chat-node img.sc-wpp-chat-node{display:none}.chat-attachment.is-broken.sc-wpp-chat-node .chat-attachment-broken-icon.sc-wpp-chat-node{display:-ms-flexbox;display:flex}.chat-attachment-video.sc-wpp-chat-node{background:var(--wpp-grey-color-1000)}.chat-attachment-fallback.sc-wpp-chat-node,.chat-attachment-broken-icon.sc-wpp-chat-node{-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:var(--wpp-grey-color-600)}.chat-attachment-fallback.sc-wpp-chat-node{display:-ms-flexbox;display:flex}.chat-attachment-broken-icon.sc-wpp-chat-node{display:none;position:absolute;inset:0;background:var(--wpp-grey-color-200)}.chat-attachment-play.sc-wpp-chat-node{position:absolute;top:50%;left:50%;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:31px;height:31px;border-radius:50%;color:var(--wpp-grey-color-000);background:color-mix(in srgb, var(--wpp-grey-color-1000) 60%, transparent);-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%)}.chat-message-actions.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;gap:4px;width:100%}.chat-message-actions.sc-wpp-chat-node wpp-tooltip.sc-wpp-chat-node,.chat-message-actions.sc-wpp-chat-node wpp-action-button.sc-wpp-chat-node{-ms-flex:0 0 auto;flex:0 0 auto}.chat-message-actions.sc-wpp-chat-node .chat-token-count.sc-wpp-chat-node{margin-left:auto}.chat-token-count.sc-wpp-chat-node{--wpp-action-button-secondary-icon-color:var(--wpp-grey-color-600);-ms-flex:0 0 auto;flex:0 0 auto}.sr-only.sc-wpp-chat-node{position:absolute;width:1px;height:1px;margin:-1px;overflow:hidden;clip:rect(0, 0, 0, 0);white-space:nowrap;border:0}.node-chat-bar.sc-wpp-chat-node{position:relative;z-index:3;display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;height:64px;padding:0 16px;gap:8px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex:0 0 auto;flex:0 0 auto}.left-actions.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;gap:4px;-ms-flex:1 1 auto;flex:1 1 auto;min-width:0}.right-actions.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;-ms-flex-pack:end;justify-content:flex-end;-ms-flex:0 0 auto;flex:0 0 auto}.right-actions-controls.sc-wpp-chat-node{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;-ms-flex-align:center;align-items:center;gap:4px}.node-chat-bar.sc-wpp-chat-node wpp-tooltip.sc-wpp-chat-node,.node-chat-bar.sc-wpp-chat-node wpp-menu-context.sc-wpp-chat-node,.node-chat-bar.sc-wpp-chat-node wpp-button.sc-wpp-chat-node{--wpp-mc-wrapper-width:fit-content;-ms-flex:0 0 auto;flex:0 0 auto}.node-chat-bar.sc-wpp-chat-node .play-btn.sc-wpp-chat-node{--button-padding-s:6px;margin-left:8px;max-width:32px;opacity:1;overflow:clip;overflow-clip-margin:4px;-webkit-transition:max-width 0.2s ease, opacity 0.2s ease, margin-left 0.2s ease, -webkit-transform 0.2s ease;transition:max-width 0.2s ease, opacity 0.2s ease, margin-left 0.2s ease, -webkit-transform 0.2s ease;transition:max-width 0.2s ease, opacity 0.2s ease, margin-left 0.2s ease, transform 0.2s ease;transition:max-width 0.2s ease, opacity 0.2s ease, margin-left 0.2s ease, transform 0.2s ease, -webkit-transform 0.2s ease}.node-chat-bar.sc-wpp-chat-node .play-btn.sc-wpp-chat-node::part(icon-start-wrapper){margin:0}.node-chat-bar.sc-wpp-chat-node .play-btn.is-hidden.sc-wpp-chat-node{max-width:0;margin-left:0;opacity:0;-webkit-transform:scale(0.85);transform:scale(0.85);pointer-events:none}.node-chat-bar.sc-wpp-chat-node .chat-actions-menu-context.sc-wpp-chat-node,.node-chat-bar.sc-wpp-chat-node .chat-model-selector.sc-wpp-chat-node{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;max-width:-webkit-fit-content;max-width:-moz-fit-content;max-width:fit-content}.model-selector-trigger.sc-wpp-chat-node{--wpp-action-button-padding:4px;--wpp-action-button-icon-start-margin:0;--wpp-action-button-bg-color-active:var(--wpp-grey-color-300);--wpp-action-button-opacity-active:1}.model-selector-trigger.sc-wpp-chat-node::part(icon-start-wrapper){margin:0}.model-avatar.sc-wpp-chat-node{pointer-events:none}.chat-actions-menu-divider.sc-wpp-chat-node{display:block;margin:4px 0}.chat-input.sc-wpp-chat-node{-ms-flex:1 1 auto;flex:1 1 auto;min-width:0;border:none;outline:none;background:transparent;font-family:var(--wpp-font-family, system-ui, sans-serif);font-size:var(--wpp-typography-s-body-font-size);font-weight:var(--wpp-typography-s-body-font-weight);line-height:var(--wpp-typography-s-body-line-height);color:var(--wpp-grey-color-1000)}.chat-input.sc-wpp-chat-node::-webkit-input-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node::-moz-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node:-ms-input-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node::-ms-input-placeholder{color:var(--wpp-grey-color-800)}.chat-input.sc-wpp-chat-node::placeholder{color:var(--wpp-grey-color-800)}.sc-wpp-chat-node-s>[slot=handles]{position:absolute;inset:0;pointer-events:none;-ms-flex:none;flex:none;z-index:2}[data-wpp-theme=dark].sc-wpp-chat-node-h .node-wrapper.sc-wpp-chat-node{background-color:var(--wpp-grey-color-100)}";

const RESPONSE_WAIT_TIMEOUT_MS = 30000;
const WppChatNode = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppSend = createEvent(this, "wppSend", 7);
    this.wppStop = createEvent(this, "wppStop", 7);
    this.wppReRun = createEvent(this, "wppReRun", 7);
    this.wppAttach = createEvent(this, "wppAttach", 7);
    this.wppMic = createEvent(this, "wppMic", 7);
    this.wppActionClick = createEvent(this, "wppActionClick", 7);
    this.wppModelSelect = createEvent(this, "wppModelSelect", 7);
    this.wppModelBrowse = createEvent(this, "wppModelBrowse", 1);
    this.wppReasoningSelect = createEvent(this, "wppReasoningSelect", 1);
    this.wppVerbositySelect = createEvent(this, "wppVerbositySelect", 1);
    this.wppMessageActionClick = createEvent(this, "wppMessageActionClick", 1);
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
  static get registryIs() { return "wpp-chat-node-v4-5-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "locales": ["onUpdateLocales"],
    "selectedModel": ["onUpdateSelectedModel"]
  }; }
};
WppChatNode.style = wppChatNodeCss;

export { WppChatNode as wpp_chat_node };
