import { proxyCustomElement, HTMLElement, createEvent, h, Fragment, Host } from '@stencil/core/internal/client';
import { c as convertMBToBytes, e as getAcceptTokens, m as modifyPropertiesOnFile, a as inferTypeFromName, i as isFileAccepted, b as getBaseName, d as getExtension, r as renameFile } from './utils3.js';
import { W as WrappedSlot } from './WrappedSlot.js';
import { g as getSlotEmptyStates, d as debounce, k as transformToVersionedTag, y as mergeLocales } from './utils.js';
import { Z as Z_INDEX } from './consts.js';
import { t as themeSubscriptionController } from './subscribe-to-theme.js';
import { S as SpeechRecognitionService } from './speech-recognition.js';
import { r as registerLoadingHaloAngle } from './loading-halo.js';
import { d as defineCustomElement$B } from './wpp-action-button2.js';
import { d as defineCustomElement$A } from './wpp-avatar2.js';
import { d as defineCustomElement$z } from './wpp-button2.js';
import { d as defineCustomElement$y } from './wpp-checkbox2.js';
import { d as defineCustomElement$x } from './wpp-divider2.js';
import { d as defineCustomElement$w } from './wpp-file-upload-item2.js';
import { d as defineCustomElement$v } from './wpp-icon-arrow2.js';
import { d as defineCustomElement$u } from './wpp-icon-chevron2.js';
import { d as defineCustomElement$t } from './wpp-icon-cross2.js';
import { d as defineCustomElement$s } from './wpp-icon-dash2.js';
import { d as defineCustomElement$r } from './wpp-icon-database2.js';
import { d as defineCustomElement$q } from './wpp-icon-document2.js';
import { d as defineCustomElement$p } from './wpp-icon-error2.js';
import { d as defineCustomElement$o } from './wpp-icon-file2.js';
import { d as defineCustomElement$n } from './wpp-icon-file-zip2.js';
import { d as defineCustomElement$m } from './wpp-icon-image2.js';
import { d as defineCustomElement$l } from './wpp-icon-info-message2.js';
import { d as defineCustomElement$k } from './wpp-icon-mic-on2.js';
import { d as defineCustomElement$j } from './wpp-icon-music2.js';
import { d as defineCustomElement$i } from './wpp-icon-pitch2.js';
import { d as defineCustomElement$h } from './wpp-icon-plus2.js';
import { d as defineCustomElement$g } from './wpp-icon-spreadsheet2.js';
import { d as defineCustomElement$f } from './wpp-icon-stop2.js';
import { d as defineCustomElement$e } from './wpp-icon-success2.js';
import { d as defineCustomElement$d } from './wpp-icon-tick2.js';
import { d as defineCustomElement$c } from './wpp-icon-video-clip2.js';
import { d as defineCustomElement$b } from './wpp-icon-warning2.js';
import { d as defineCustomElement$a } from './wpp-inline-message2.js';
import { d as defineCustomElement$9 } from './wpp-internal-label2.js';
import { d as defineCustomElement$8 } from './wpp-internal-tooltip2.js';
import { d as defineCustomElement$7 } from './wpp-label2.js';
import { d as defineCustomElement$6 } from './wpp-list-item2.js';
import { d as defineCustomElement$5 } from './wpp-menu-context2.js';
import { d as defineCustomElement$4 } from './wpp-spinner2.js';
import { d as defineCustomElement$3 } from './wpp-toast2.js';
import { d as defineCustomElement$2 } from './wpp-tooltip2.js';
import { d as defineCustomElement$1 } from './wpp-typography2.js';

const TOAST_DURATION = 5000;
const debounceWithControl = (callback, timeout) => {
  let timer;
  return {
    call: (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        timer = undefined;
        callback(...args);
      }, timeout);
    },
    cancel: () => {
      clearTimeout(timer);
      timer = undefined;
    },
    flush: (...args) => {
      clearTimeout(timer);
      timer = undefined;
      callback(...args);
    },
  };
};

const DEFAULT_FILE_UPLOAD_CONFIG = {
  acceptConfig: {},
  size: 50,
  maxFiles: 0,
  multiple: true,
  showOnlyNewErrors: false,
  controlled: false,
  locales: {
    sizeError: 'File exceeds the allowed size limit',
    formatError: 'Invalid file format',
    limitError: 'Files limit reached',
    removeFile: (name) => `Remove file ${name}`,
    uploadProgress: (name) => `Processing ${name}`,
  },
};
const MAX_INPUT_AREA_HEIGHT = 240;
const MIN_TEXTAREA_HEIGHT = 52;
/**
 * How long the send/stop button takes to collapse out of the actions bar.
 * Should be kept in sync with `--chat-input-action-transition-duration` from the `scss` file.
 */
const PRIMARY_ACTION_TRANSITION_MS = 200;
/**
 * Reserved `ChatInputAction.id` that auto-wires an actions-menu entry to the
 * same file picker used by `enableAttach`. Consumers can still listen for the
 * `wppActionsMenuItemClick` event on top of the built-in behavior.
 */
const UPLOAD_ACTION_ID = 'upload';
const UPLOAD_ICON = 'wpp-icon-attach';
/**
 * Sits between the model name and the selected reasoning level in the selector trigger
 * (`Gemini 3.5 Flash\u30FBHigh`). This is U+30FB KATAKANA MIDDLE DOT, taken verbatim from the
 * Figma text node — it carries its own wide side bearings, which is why the design shows visual
 * gaps without any space characters. Do NOT "fix" it to a bullet plus spaces; that reads the
 * same but is not what the design specifies.
 *
 * Not a locale string: it is punctuation, and the same glyph is used in every language.
 */
const MODEL_REASONING_SEPARATOR = '\u30FB';
/**
 * Levels used when a model is selected and the user has not chosen one for it yet:
 * "Reasoning: Auto, with fallback to Medium. Verbosity: Medium." (Mustafa, 23 Sep 2026).
 *
 * Matched against the ids the consumer supplies in `reasoningOptions` / `verbosityOptions`,
 * first hit wins. A model offering none of these ids gets no default rather than an arbitrary
 * guess, so nothing is pre-selected. These literals are the platform's `ReasoningLevel` /
 * `LlmOutputVerbosity` enum values — the only place the component assumes anything about an
 * option's meaning.
 */
const DEFAULT_REASONING_IDS = ['auto', 'medium'];
const DEFAULT_VERBOSITY_IDS = ['medium'];
/**
 * Geometry for a level submenu, which the design bottom-aligns with the model menu rather than
 * with the row that opens it.
 *
 * Popper's skidding offset moves the popup along the trigger's cross axis, so for a `right-end`
 * placement the submenu's bottom lands `skidding` pixels below the trigger row's bottom. Both
 * popups carry 8px of their own padding, so a skidding equal to the gap between the row and the
 * menu's bottom edge puts the last level in line with the menu's last row. `*_FALLBACK_SKIDDING`
 * is that gap when the menu is not a popup at all and there is nothing to measure against.
 */
const MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING = 8;
const MODEL_OPTIONS_SUBMENU_DISTANCE = 9;
const LOCALES_DEFAULTS = {
  placeholder: 'Type your message...',
  minimizedDescription: 'Expand message input',
  actionsToolbarLabel: 'Message actions',
  leftActionsGroupLabel: 'Attachments and tools',
  rightActionsGroupLabel: 'Send and character counter',
  sendLabel: 'Send message',
  stopLabel: 'Stop response',
  attachLabel: 'Attach file',
  voiceLabel: 'Record voice message',
  attachmentsLabel: 'Attachments',
  messageInputLabel: 'Message input',
  actionsMenuLabel: 'More actions',
  audioRecordButtonLabel: 'Start audio recording',
  audioStopRecordButtonLabel: 'Stop audio recording',
  audioLanguage: 'en-US',
  // Specific to AI model selector
  modelSelectorBtnLabel: 'Select AI model',
  modelAutoOptionLabel: 'Auto',
  modelAutoOptionCaption: 'Picks the right model per task',
  modelPremiumOptionLabel: 'Premium',
  modelPremiumOptionCaption: 'Favours high-end, efficient models',
  modelSelectorListItemLabel: 'Select model or agent',
  modelReasoningLabel: 'Reasoning',
  modelVerbosityLabel: 'Verbosity',
};
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

const wppChatInputCss = "@charset \"UTF-8\";:host{--chat-input-container-min-width:var(--wpp-chat-input-container-min-width, 351px);--chat-input-container-bg-color:var(--wpp-chat-input-container-bg-color, var(--wpp-grey-color-000));--chat-input-container-border-width:var(--wpp-chat-input-container-border-width, 1px);--chat-input-container-loading-border-width:var(--wpp-chat-input-container-loading-border-width, 2px);--chat-input-container-border-color-active:var(\n    --wpp-chat-input-container-border-color-active,\n    var(--wpp-primary-color-500)\n  );--chat-input-container-border-radius:var(--wpp-chat-input-container-border-radius, var(--wpp-border-radius-m));--chat-input-area-min-height:var(--wpp-chat-input-area-min-height, 52px);--chat-input-area-max-height:var(--wpp-chat-input-area-max-height, 240px);--chat-input-area-padding:var(\n    --wpp-chat-input-area-padding,\n    calc(16px - var(--chat-input-container-border-width)) 16px 4px 16px\n  );--chat-input-area-placeholder-color:var(--wpp-chat-input-area-placeholder-color, var(--wpp-grey-color-700));--chat-text-input-min-height:var(--wpp-chat-text-input-min-height, 52px);--chat-text-input-padding:var(--wpp-chat-text-input-padding, 0);--chat-text-input-bg-color:var(--wpp-chat-text-input-bg-color, transparent);--chat-text-input-placeholder-color:var(--wpp-chat-text-input-placeholder-color, var(--wpp-grey-color-700));--chat-actions-bar-padding:var(\n    --wpp-chat-actions-bar-padding,\n    12px 16px calc(16px - var(--chat-input-container-border-width)) 12px\n  );--chat-s-size-actions-bar-padding:var(\n    --wpp-chat-s-size-actions-bar-padding,\n    8px 16px calc(8px - var(--chat-input-container-border-width)) 12px\n  );--chat-actions-bar-color:var(--wpp-chat-actions-bar-color, var(--wpp-grey-color-1000));--chat-actions-bar-color-disabled:var(--wpp-chat-actions-bar-color-disabled, var(--wpp-grey-color-400));--chat-actions-bar-char-counter-color:var(--wpp-chat-actions-bar-char-counter-color, var(--wpp-danger-color-500));--chat-actions-bar-char-counter-color-disabled:var(\n    --wpp-chat-actions-bar-char-counter-color-disabled,\n    var(--wpp-danger-color-300)\n  );--chat-text-input-minimized-width:var(--wpp-chat-text-input-minimized-width, 203px);--chat-text-input-minimized-height:var(--wpp-chat-text-input-minimized-height, 22px);--chat-text-input-minimized-padding:var(\n    --wpp-chat-text-input-minimized-padding,\n    calc(8px - var(--chat-input-container-border-width)) 16px calc(8px - var(--chat-input-container-border-width)) 12px\n  );--chat-input-transition-timing:0.3s cubic-bezier(0.4, 0, 0.2, 1);--chat-input-action-transition-duration:200ms;--chat-minimized-focus-ring-color:var(--wpp-focus-ring-color, var(--wpp-primary-color-600));--chat-minimized-focus-ring-width:var(--wpp-focus-ring-width, var(--wpp-border-width-m));--chat-minimized-focus-ring-radius:var(--wpp-chat-input-container-border-radius, var(--wpp-border-radius-m));--chat-minimized-first-border-color-focus:var(\n    --wpp-chat-minimized-first-border-color-focus,\n    var(--wpp-grey-color-000)\n  );--chat-minimized-second-border-color-focus:var(\n    --wpp-chat-minimized-second-border-color-focus,\n    var(--wpp-brand-color)\n  );--chat-minimized-border-radius-focus:var(--wpp-chat-minimized-border-radius-focus, var(--wpp-border-radius-xs));display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;-ms-flex-align:center;align-items:center;width:100%;isolation:isolate}.chat-input-container{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;background-color:var(--chat-input-container-bg-color);border-radius:var(--chat-input-container-border-radius);border:var(--chat-input-container-border-width) solid transparent;min-width:var(--chat-input-container-min-width);width:100%;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-box-shadow:var(--wpp-box-shadow-s);box-shadow:var(--wpp-box-shadow-s);-webkit-transition:width var(--chat-input-transition-timing), height var(--chat-input-transition-timing);transition:width var(--chat-input-transition-timing), height var(--chat-input-transition-timing);will-change:width, height;cursor:text}.chat-input-container.is-focused{border-color:var(--chat-input-container-border-color-active)}.chat-input-container.is-loading::before{content:\"\";position:absolute;z-index:-1;inset:calc(-1 * (var(--chat-input-container-border-width) + var(--chat-input-container-loading-border-width) + 13px));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, color-mix(in srgb, var(--wpp-loading-halo-glow-color, var(--wpp-dataviz-color-seq-brand-400)) 65%, transparent) 16%, transparent 40%);-webkit-filter:blur(10px);filter:blur(10px);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--chat-input-container-border-radius) + var(--chat-input-container-loading-border-width) + 6px)}.chat-input-container.is-loading::after{content:\"\";position:absolute;z-index:-1;inset:calc(-1 * (var(--chat-input-container-border-width) + var(--chat-input-container-loading-border-width)));pointer-events:none;background:conic-gradient(from var(--wpp-loading-halo-angle), transparent 0%, var(--wpp-loading-halo-highlight-color, var(--wpp-dataviz-color-seq-brand-600)) 12%, var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900)) 30%, transparent 46%);-webkit-animation:wpp-loading-halo-rotate 2s linear infinite;animation:wpp-loading-halo-rotate 2s linear infinite;border-radius:calc(var(--chat-input-container-border-radius) + var(--chat-input-container-loading-border-width))}@media (prefers-reduced-motion: reduce){.chat-input-container.is-loading::before{display:none}.chat-input-container.is-loading::after{-webkit-animation:none;animation:none;background:var(--wpp-loading-halo-base-color, var(--wpp-dataviz-color-seq-brand-900))}}@-webkit-keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}@keyframes wpp-loading-halo-rotate{to{--wpp-loading-halo-angle:360deg}}.chat-input-container:not(.is-focused):hover{-webkit-box-shadow:var(--wpp-box-shadow-m);box-shadow:var(--wpp-box-shadow-m)}.chat-input-container.disabled{pointer-events:none;cursor:not-allowed}.chat-input-container.has-alert{gap:0}.alert{-ms-flex-item-align:stretch;align-self:stretch;border-top-left-radius:var(--chat-input-container-border-radius);border-top-right-radius:var(--chat-input-container-border-radius);overflow:hidden}.alert[hidden]{display:none}.chat-file-upload-toast{position:absolute;top:8px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);cursor:pointer}.input-area{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family, system-ui, sans-serif));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);display:-ms-flexbox;display:flex;-ms-flex-direction:column-reverse;flex-direction:column-reverse;-ms-flex-align:stretch;align-items:stretch;color:var(--wpp-grey-color-1000);min-height:var(--chat-input-area-min-height);max-height:var(--chat-input-area-max-height);overflow-y:hidden;-ms-flex:1;flex:1;padding:var(--chat-input-area-padding);gap:12px;-webkit-box-sizing:border-box;box-sizing:border-box;border-radius:var(--wpp-border-radius-m) var(--wpp-border-radius-m) 0 0;-webkit-transition:height var(--chat-input-transition-timing);transition:height var(--chat-input-transition-timing);will-change:height;-webkit-transform-origin:bottom;transform-origin:bottom}.input-area .attachments{-ms-flex-order:3;order:3}.input-area .references{-ms-flex-order:2;order:2}.input-area .text-input{-ms-flex-order:1;order:1}.input-area:not(.minimized){scrollbar-gutter:stable;scrollbar-width:thin;scrollbar-color:var(--wpp-grey-color-400) transparent}.input-area::-webkit-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-moz-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area:-ms-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-ms-input-placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::placeholder{color:var(--chat-input-area-placeholder-color)}.input-area::-webkit-scrollbar{width:4px;height:4px}.input-area::-webkit-scrollbar-thumb{background-color:var(--wpp-grey-color-400);border-radius:var(--wpp-border-radius-xs);margin:6px}.input-area::-webkit-scrollbar-track{background:transparent}.input-area textarea{width:100%;min-height:var(--chat-text-input-min-height);resize:none;border:none;outline:none;padding:var(--chat-text-input-padding);font-family:inherit;font-weight:inherit;font-size:inherit;line-height:inherit;background-color:var(--chat-text-input-bg-color);overflow:hidden;-webkit-box-sizing:border-box;box-sizing:border-box;color:inherit;-webkit-transition:min-height var(--chat-input-transition-timing);transition:min-height var(--chat-input-transition-timing);will-change:min-height;-webkit-transform-origin:bottom;transform-origin:bottom;margin:0}.input-area textarea::-webkit-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::-moz-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea:-ms-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::-ms-input-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea::placeholder{color:var(--chat-text-input-placeholder-color)}.input-area textarea:hover,.input-area textarea:focus-within{color:var(--wpp-grey-color-1000)}.input-area textarea:active{color:var(--wpp-grey-color-1000)}.input-area textarea:disabled{cursor:not-allowed;color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-webkit-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-moz-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled:-ms-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::-ms-input-placeholder{color:var(--wpp-grey-color-500)}.input-area textarea:disabled::placeholder{color:var(--wpp-grey-color-500)}.input-area.minimized{min-height:0;padding:var(--chat-text-input-minimized-padding)}.input-area.minimized .input-area-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;gap:8px}.input-area.minimized .input-area-wrapper .actions-menu{--wpp-mc-wrapper-width:auto;display:-ms-flexbox;display:flex}.input-area.minimized .input-area-wrapper .sr-only{position:absolute !important;width:1px !important;height:1px !important;padding:0 !important;margin:-1px !important;overflow:hidden !important;clip:rect(0, 0, 0, 0) !important;-webkit-clip-path:inset(50%) !important;clip-path:inset(50%) !important;border:0 !important;white-space:nowrap !important}.input-area.minimized .minimized-input{-ms-flex-align:center;align-items:center;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;width:100%;min-width:var(--chat-text-input-minimized-width);outline:none}.input-area.minimized .minimized-input .input-value{width:100%}.input-area.minimized .minimized-input .input-value.disabled{color:var(--wpp-grey-color-500)}.input-area.minimized .minimized-input .input-value-placeholder{color:var(--chat-text-input-placeholder-color)}.input-area.minimized .minimized-input .input-value-placeholder.disabled{color:var(--wpp-grey-color-500)}.actions-bar{display:-ms-flexbox;display:flex;-ms-flex-pack:justify;justify-content:space-between;-ms-flex-align:end;align-items:flex-end;padding:var(--chat-actions-bar-padding);border-radius:0 0 var(--wpp-border-radius-m) var(--wpp-border-radius-m)}.actions-bar.size-s{padding:var(--chat-s-size-actions-bar-padding)}.actions-bar .left-actions{display:-ms-flexbox;display:flex;gap:8px;-ms-flex-align:center;align-items:center;}.actions-bar .left-actions .actions-menu{--wpp-mc-wrapper-width:auto;display:-ms-inline-flexbox;display:inline-flex;-ms-flex:0 0 auto;flex:0 0 auto;width:auto}.actions-bar .left-actions .select{display:-ms-flexbox;display:flex;width:100%;--wpp-action-button-padding:4px 6px;--wpp-action-button-icon-start-padding:8px;--wpp-action-button-icon-end-padding:6px;--wpp-action-button-icon-start-margin:8px;--wpp-action-button-icon-end-margin:8px;--wpp-action-button-bg-color-active:var(--wpp-grey-color-300);--wpp-action-button-opacity-active:1;}.actions-bar .left-actions .select ::slotted(.wpp-action-button:not(.with-icon-end)){--wpp-action-button-padding:4px 8px}.actions-bar .left-actions .wpp-action-button::part(button){color:var(--chat-actions-bar-color)}.actions-bar .left-actions.disabled .wpp-action-button::part(button){cursor:not-allowed;color:var(--chat-actions-bar-color-disabled)}.right-actions{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center}.right-actions .select{line-height:0}.right-actions .char-counter{color:var(--chat-actions-bar-char-counter-color)}.right-actions .wpp-action-button::part(button){color:var(--chat-actions-bar-color)}.right-actions.disabled .wpp-action-button::part(button){cursor:not-allowed;color:var(--chat-actions-bar-color-disabled)}.right-actions.disabled .char-counter{color:var(--chat-actions-bar-char-counter-color-disabled)}.play-btn{--button-padding-s:6px;margin-left:8px;max-width:32px;opacity:1;overflow:clip;overflow-clip-margin:8px;-webkit-transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, -webkit-transform var(--chat-input-action-transition-duration) ease;transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, -webkit-transform var(--chat-input-action-transition-duration) ease;transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, transform var(--chat-input-action-transition-duration) ease;transition:max-width var(--chat-input-action-transition-duration) ease, opacity var(--chat-input-action-transition-duration) ease, margin-left var(--chat-input-action-transition-duration) ease, transform var(--chat-input-action-transition-duration) ease, -webkit-transform var(--chat-input-action-transition-duration) ease}.play-btn::part(icon-start-wrapper){margin:0}.play-btn.is-hidden{max-width:0;margin-left:0;opacity:0;-webkit-transform:scale(0.85);transform:scale(0.85);pointer-events:none}.model-selector{height:32px;margin-right:4px}.select-model-trigger.size-s:not(.is-chat-expanded){--wpp-list-item-padding:4px}.select-model-trigger.size-s:not(.is-chat-expanded)::part(left-wrapper){margin-right:0}.select-model-trigger.is-menu-opened{--li-bg-color:var(--wpp-grey-color-300);--wpp-icon-color:var(--wpp-grey-color-900)}.attachments{display:-ms-flexbox;display:flex;-ms-flex-direction:row;flex-direction:row;gap:8px;width:100%;-ms-flex:0 0 auto;flex:0 0 auto;overflow:auto hidden;scrollbar-width:thin;scrollbar-color:transparent transparent;-webkit-transition:scrollbar-color 0.3s ease-in-out;transition:scrollbar-color 0.3s ease-in-out}.attachments::-webkit-scrollbar{height:4px}.attachments::-webkit-scrollbar-thumb{background-color:transparent;border-radius:var(--wpp-border-radius-xs, 4px);-webkit-transition:background-color 0.3s ease-in-out;transition:background-color 0.3s ease-in-out}.attachments:hover,.attachments:focus-within{scrollbar-color:var(--wpp-grey-color-400) transparent}.attachments:hover::-webkit-scrollbar-thumb,.attachments:focus-within::-webkit-scrollbar-thumb{background-color:var(--wpp-grey-color-400)}.attachments .wpp-file-upload-item{--wpp-file-upload-item-chat-gap:0}.attachments .wpp-file-upload-item::part(file-item){margin-top:0}.attachments .wpp-file-upload-item::part(controls){-ms-flex-pack:end;justify-content:flex-end}.attachments .wpp-file-upload-item::part(thumbnail){margin-right:8px}.attachments .wpp-file-upload-item::part(cross-icon){margin-left:12px}.references{display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:end;align-items:flex-end;gap:8px;width:100%;-ms-flex:0 0 auto;flex:0 0 auto}.references[hidden]{display:none}.input-area.minimized .minimized-input:focus-visible{border-radius:var(--chat-minimized-border-radius-focus);outline:none;-webkit-box-shadow:0 0 0 1px var(--chat-minimized-first-border-color-focus), 0 0 0 3px var(--chat-minimized-second-border-color-focus);box-shadow:0 0 0 1px var(--chat-minimized-first-border-color-focus), 0 0 0 3px var(--chat-minimized-second-border-color-focus)}:host([data-wpp-theme=dark]) .chat-input-container{background-color:var(--wpp-grey-color-100)}";

const WppChatInput = /*@__PURE__*/ proxyCustomElement(class WppChatInput extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.wppSend = createEvent(this, "wppSend", 1);
    this.wppStop = createEvent(this, "wppStop", 1);
    this.wppMic = createEvent(this, "wppMic", 1);
    this.wppChange = createEvent(this, "wppChange", 1);
    this.wppFileUploadItemDelete = createEvent(this, "wppFileUploadItemDelete", 1);
    this.wppFileUploadItemClick = createEvent(this, "wppFileUploadItemClick", 1);
    this.wppMessageChanged = createEvent(this, "wppMessageChanged", 1);
    this.wppActionsMenuToggle = createEvent(this, "wppActionsMenuToggle", 1);
    this.wppActionsMenuItemClick = createEvent(this, "wppActionsMenuItemClick", 1);
    this.wppModelSelect = createEvent(this, "wppModelSelect", 1);
    this.wppModelBrowse = createEvent(this, "wppModelBrowse", 1);
    this.wppReasoningSelect = createEvent(this, "wppReasoningSelect", 1);
    this.wppVerbositySelect = createEvent(this, "wppVerbositySelect", 1);
    this.scrollTimeout = null;
    this.stopBtnHideTimeout = null;
    this.inputAreaId = `wpp-ci-area`;
    this.textareaAutoId = `wpp-ci-ta`;
    this.minimizedDescId = `wpp-ci-min-desc`;
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
    this.recognition = new SpeechRecognitionService();
    this.themeSubscription = themeSubscriptionController(() => this.host);
    this.aiModelBtn = null;
    this.reInitValue = (list) => {
      this.successAttachmentsList = list.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = list.filter(this.isFileWithError);
    };
    this.checkInteractedItem = (event) => {
      const path = event.composedPath();
      if (!this.isFocused || !this.host || path.includes(this.host))
        return;
      // Dropdowns (the model selector, the actions menu) are portalled out of the host, so an
      // interaction inside one still belongs to this chat input. The whole composed path has to
      // be searched for the tippy wrapper: the event target is usually an element inside a
      // `wpp-list-item`'s shadow root, and walking `parentElement` up from there stops at the
      // shadow boundary long before it reaches the wrapper that carries the id — which is why an
      // `s`-size input collapsed whenever a model row was clicked anywhere but on its label text.
      const isInsideDropdown = path.some(node => node.id?.includes('tippy-'));
      if (!isInsideDropdown) {
        this.handleSimpleBlur();
      }
    };
    this.onExpandedKeyDown = (e) => {
      if (e.key === 'Escape' && this.size === 's' && this.isChatInputExpanded) {
        e.preventDefault();
        e.stopPropagation();
        this.handleSimpleBlur();
      }
    };
    this.handleFileLoaded = (event) => {
      const { name, size } = event.detail;
      // Find the file in your state and set uploaded = true
      const updateUploadedFlag = (file) => {
        if (file.name === name && file.size === size) {
          const fileCopy = file;
          fileCopy.uploaded = true;
        }
        return file;
      };
      this.successAttachmentsList = this.successAttachmentsList.map(updateUploadedFlag);
      this.errorAttachmentsList = this.errorAttachmentsList.map(updateUploadedFlag);
      this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    };
    this.actionsMenuDropdownConfig = {
      onShow: () => {
        this.actionsMenuOpen = true;
        this.wppActionsMenuToggle.emit({ open: true });
      },
      onHide: () => {
        this.actionsMenuOpen = false;
        this.wppActionsMenuToggle.emit({ open: false });
      },
    };
    this.handleActionsMenuItemClick = (action) => {
      if (action.disabled)
        return;
      if (action.id === UPLOAD_ACTION_ID && !this.disabled) {
        this.handleFileSelection();
      }
      this.wppActionsMenuItemClick.emit(action);
    };
    this.updateSlotData = () => {
      const emptyStates = getSlotEmptyStates(this.host.childNodes, {
        select: '[slot="select"]',
        alert: '[slot="alert"]',
        references: '[slot="references"]',
      });
      this.hasSelectSlot = !emptyStates.select;
      this.hasAlertSlot = !emptyStates.alert;
      this.hasReferencesSlot = !emptyStates.references;
    };
    // A fresh alert appearing in the slot should always be shown, even if a
    // previous one was dismissed.
    this.handleAlertSlotChange = () => {
      this.updateSlotData();
      this.isAlertDismissed = false;
    };
    this.handleReferencesSlotChange = () => {
      this.updateSlotData();
      // References add height to the input area, so recompute whether it needs to
      // scroll once the slotted content has been laid out.
      requestAnimationFrame(() => this.adjustTextareaHeight(false));
    };
    this.handleScroll = () => {
      if (this.scrollTimeout)
        clearTimeout(this.scrollTimeout);
      this.scrollTimeout = setTimeout(() => {
        this.checkAttachmentsVisibility();
      }, 100);
    };
    this.handlePaste = async (event) => {
      if (this.disabled)
        return;
      this.textareaRef?.focus();
      const items = event.clipboardData?.items;
      if (!items) {
        await this.adjustTextareaHeight(false);
        return;
      }
      const handled = await this.handleFilePaste(event, items);
      if (handled)
        return;
      // Adjust textarea height after paste for non-image content
      await this.adjustTextareaHeight(false);
    };
    /**
     * Handles image file pasting from clipboard items.
     * Returns true if files were handled, false otherwise.
     */
    this.handleFilePaste = async (event, items) => {
      const files = Array.from(items)
        .filter(item => item.kind === 'file' && item.type.startsWith('image/'))
        .map(item => item.getAsFile())
        .filter((file) => !!file);
      if (files.length > 0) {
        event.preventDefault();
        await this.handleFileLoad(files);
        await this.adjustTextareaHeight();
        return true;
      }
      return false;
    };
    this.handleInput = (event) => {
      if (this.disabled)
        return;
      const target = event.target;
      const inputValue = target.value;
      this.internalValue = inputValue;
      this.emitMessageChangedEvent(inputValue);
    };
    this.emitMessageChangedEvent = (inputValue) => {
      if (this.debounceEnabled && this.debouncedHandleInput) {
        this.debouncedHandleInput.call(inputValue);
      }
      else {
        this.wppMessageChanged.emit({ value: inputValue });
      }
      if (!inputValue.trim() && this.textareaRef) {
        this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`;
      }
      this.adjustTextareaHeight(false, inputValue);
    };
    this.debouncedAdjustTextareaHeight = debounce(() => this.adjustTextareaHeight(), 50);
    this.adjustTextareaHeight = (reset = false, value, waitForInputArea = false) => new Promise(resolve => {
      if (!this.textareaRef || !this.inputAreaRef) {
        resolve();
        return;
      }
      if (reset) {
        this.textareaRef.style.minHeight = `${MIN_TEXTAREA_HEIGHT}px`;
        resolve();
        return;
      }
      const attachmentsElement = this.inputAreaRef.querySelector('.attachments');
      const attachmentsHeight = attachmentsElement?.scrollHeight || 0;
      const gap = attachmentsElement ? parseFloat(getComputedStyle(attachmentsElement).gap) || 0 : 0;
      const referencesElement = this.inputAreaRef.querySelector('.references');
      const referencesHeight = referencesElement && !referencesElement.hasAttribute('hidden') ? referencesElement.scrollHeight : 0;
      const referencesGap = referencesHeight ? parseFloat(getComputedStyle(this.inputAreaRef).rowGap) || 0 : 0;
      const messageText = value !== undefined ? value : this.textareaRef.value;
      const textAreaContentHeight = Math.max(this.calculateTextHeight(messageText), MIN_TEXTAREA_HEIGHT);
      const totalHeight = attachmentsHeight + referencesHeight + textAreaContentHeight + gap + referencesGap;
      const reachMaxHeight = totalHeight > MAX_INPUT_AREA_HEIGHT;
      this.inputAreaRef.style.overflowY = reachMaxHeight ? 'auto' : 'hidden';
      this.textareaRef.style.minHeight = `${textAreaContentHeight}px`;
      // --- Wait for the correct transition ---
      if (waitForInputArea) {
        // Used for expand/collapse: listen for height transition on input-area
        const computedStyle = window.getComputedStyle(this.inputAreaRef);
        const transitionDuration = parseFloat(computedStyle.transitionDuration) || 0;
        if (transitionDuration > 0) {
          const handler = (e) => {
            if (e.propertyName === 'height') {
              this.inputAreaRef?.removeEventListener('transitionend', handler);
              resolve();
            }
          };
          this.inputAreaRef.addEventListener('transitionend', handler);
        }
        else {
          resolve();
        }
      }
      else {
        // Used for textarea min-height (typing/paste)
        const computedStyle = window.getComputedStyle(this.textareaRef);
        const transitionDuration = parseFloat(computedStyle.transitionDuration) || 0;
        if (transitionDuration > 0) {
          const handler = (e) => {
            if (e.propertyName === 'min-height') {
              this.textareaRef?.removeEventListener('transitionend', handler);
              resolve();
            }
          };
          this.textareaRef.addEventListener('transitionend', handler);
        }
        else {
          resolve();
        }
      }
    });
    this.isFileWithError = (file) => !!(file.formatError || file.sizeError || file.validatorError);
    this.handleDeleteItem = (event) => {
      const { name, size } = event.detail;
      const updatedFilesList = this.attachments.filter(file => file.name + file.size !== name + size);
      this.successAttachmentsList = updatedFilesList.filter(file => !this.isFileWithError(file));
      this.errorAttachmentsList = updatedFilesList.filter(this.isFileWithError);
      if (this.inputRef)
        this.inputRef.value = '';
      this.wppChange.emit({
        value: this.successAttachmentsList,
        hasError: this.errorAttachmentsList.length > 0,
        errorFiles: this.errorAttachmentsList,
        files: updatedFilesList,
      });
      this.wppFileUploadItemDelete.emit(event.detail);
      this.attachments = updatedFilesList;
    };
    this.handleClickItem = (event) => this.wppFileUploadItemClick.emit(event.detail);
    this.handleChange = async () => {
      this.clearDialogState();
      const files = this.inputRef?.files;
      if (!files?.length)
        return;
      if (this.isMaximumFilesSet() && this.successAttachmentsList.length === this.mergedFileUploadConfig.maxFiles) {
        this.displayToast(this.mergedFileUploadConfig.locales.limitError, 'error');
        return;
      }
      const filesToLoad = this.mergedFileUploadConfig.multiple ? Array.from(files) : [files[0]];
      await this.handleFileLoad(filesToLoad);
      if (this.debouncedAdjustTextareaHeight) {
        requestAnimationFrame(() => this.debouncedAdjustTextareaHeight());
      }
      if (this.inputRef)
        this.inputRef.value = '';
    };
    this.isMaximumFilesSet = () => this.mergedFileUploadConfig.maxFiles > 0;
    this.validateFileSize = (file) => {
      if (file.size > convertMBToBytes(this.mergedFileUploadConfig.size ?? 0)) {
        file.sizeError = true;
      }
      else {
        file.sizeError = false;
      }
      return file;
    };
    this.isAcceptConfigFilled = () => !!this.mergedFileUploadConfig.acceptConfig && Object.keys(this.mergedFileUploadConfig.acceptConfig).length > 0;
    this.getAcceptTokens = () => this.isAcceptConfigFilled() ? getAcceptTokens(this.mergedFileUploadConfig.acceptConfig) : [];
    this.validateFileType = (file) => {
      if (!this.isAcceptConfigFilled()) {
        if (!file.type) {
          return modifyPropertiesOnFile(file, { type: inferTypeFromName(file.name) });
        }
        return file;
      }
      file.formatError = !isFileAccepted(file, this.mergedFileUploadConfig.acceptConfig);
      return file;
    };
    this.customValidation = (file) => {
      file.validatorError = this.mergedFileUploadConfig.validator?.(file) || undefined;
      return file;
    };
    this.displayErrorListByShowingOption = (newFilesWithErrors) => this.mergedFileUploadConfig.showOnlyNewErrors
      ? newFilesWithErrors
      : [...this.errorAttachmentsList, ...newFilesWithErrors];
    this.generateUniqueName = (fileName, fileList) => {
      const baseName = getBaseName(fileName);
      const extension = getExtension(fileName);
      let counter = 1;
      const isNameTaken = (file) => {
        const currentCounter = counter;
        return file.name === `${baseName}-${currentCounter}${extension}`;
      };
      while (fileList.some(file => isNameTaken(file))) {
        counter++;
      }
      return `${baseName}-${counter}${extension}`;
    };
    this.handleClick = () => {
      if (!this.disabled) {
        this.textareaRef?.focus();
      }
    };
    this.onKeyDown = (event) => {
      if (event.key === 'Enter') {
        // When "Shift" + "Enter" are pressed, keep default behaviour (new line)
        if (event.shiftKey)
          return;
        // Pressing "Enter" is equivalent to pressing "Send" icon
        event.preventDefault();
        this.handleSend();
      }
    };
    this.onMinimizedKeyDown = (e) => {
      if (this.disabled)
        return;
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.minimizedPressed = true;
        this.handleSizeToggle();
      }
    };
    this.onMinimizedKeyUp = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.minimizedPressed = false;
      }
    };
    this.onWindowFocus = () => {
      if (this.isFileDialogOpen) {
        this.clearDialogState();
      }
    };
    this.clearDialogState = () => {
      this.isFileDialogOpen = false;
    };
    this.handleOnFocus = () => {
      if (!this.isFocused) {
        this.addExpandedListeners();
      }
      this.isFocused = true;
    };
    this.handleClickAudioRecording = (event) => {
      event.stopPropagation();
      event.preventDefault();
      if (!this.recognition.isSupported) {
        console.warn('SpeechRecognition API is not supported in this browser.');
        return;
      }
      this.isAudioRecording = !this.isAudioRecording;
      if (this.isAudioRecording) {
        this.wppMic.emit({ isRecording: true });
        this.recognition.startRecognition({
          baseText: this.internalValue,
          onTranscript: newOutput => {
            if (this.internalValue === newOutput)
              return;
            this.internalValue = newOutput;
            this.emitMessageChangedEvent(this.internalValue);
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
    this.shouldDisplaySend = () => this.disabled || this.errorAttachmentsList.length > 0
      ? false
      : !!this.internalValue.trim() || this.isGenerating || this.successAttachmentsList.length > 0;
    this.renderMicrophoneBtn = (recordButtonLabel) => (h("wpp-action-button-v4-6-0", { "data-testid": "wpp-micophone-btn", onClick: this.handleClickAudioRecording, variant: "secondary", ariaProps: { label: recordButtonLabel }, disabled: this.disabled }, this.isAudioRecording ? h("wpp-icon-stop-v4-6-0", { slot: "icon-start" }) : h("wpp-icon-mic-on-v4-6-0", { slot: "icon-start" })));
    this.renderActionsMenu = () => (h("wpp-menu-context-v4-6-0", { class: "actions-menu", part: "actions-menu", dropdownConfig: this.actionsMenuDropdownConfig }, h("wpp-action-button-v4-6-0", { slot: "trigger-element", class: "actions-menu-trigger", "data-testid": "actions-menu-trigger-button", variant: "secondary", disabled: this.disabled, ariaProps: {
        label: this.getActionsMenuButtonLabel(),
        expanded: this.ariaProps?.actionsMenuButton?.expanded ?? this.actionsMenuOpen,
        haspopup: 'menu',
      } }, h("wpp-icon-plus-v4-6-0", { slot: "icon-start" })), h("div", null, h("wpp-list-item-v4-6-0", { "data-testid": `actions-menu-item-${UPLOAD_ACTION_ID}`, disabled: this.disabled, onWppChangeListItem: () => this.handleActionsMenuItemClick({
        id: UPLOAD_ACTION_ID,
        icon: UPLOAD_ICON,
        label: this.getAttachButtonLabel(),
        disabled: this.disabled || this.isFileDialogOpen,
      }) }, h(transformToVersionedTag(UPLOAD_ICON), { slot: 'left' }), h("span", { slot: "label" }, this.getAttachButtonLabel())), this.actions.map(action => (h("wpp-list-item-v4-6-0", { key: action.id, "data-testid": `actions-menu-item-${action.id}`, disabled: action.disabled || this.disabled, onWppChangeListItem: () => this.handleActionsMenuItemClick(action) }, h(transformToVersionedTag(action.icon), { slot: 'left' }), h("span", { slot: "label" }, action.label)))))));
    this.getSelectedModel = () => {
      // `selectedModel` is transiently null between React removing the attribute and setting the
      // property (see `onSelectedModelChange`). Resolve that to the built-in default rather than
      // dereferencing it - both this method's own `models.find` and every caller assume a model.
      if (!this.selectedModel || this.selectedModel === 'auto') {
        return getDefaultModelOptions(this._locales)[0];
      }
      else if (this.selectedModel === 'premium') {
        return getDefaultModelOptions(this._locales)[1];
      }
      return this.models.length === 0
        ? this.selectedModel
        : this.models.find((model) => model.id === this.selectedModel.id) || getDefaultModelOptions(this._locales)[0];
    };
    this.handleModelMenuShow = () => {
      this.isModelMenuOpen = true;
    };
    this.handleModelMenuHide = () => {
      this.isModelMenuOpen = false;
    };
    this.handleModelSelect = (model) => {
      // Assigning `selectedModel` is what carries the levels over — `handleSelectedModelChange`
      // watches it, so picking from this dropdown and having the platform set the prop from a
      // side-modal take exactly the same path.
      if (model.id === 'auto') {
        this.selectedModel = 'auto';
      }
      else if (model.id === 'premium') {
        this.selectedModel = 'premium';
      }
      else {
        this.selectedModel = model;
      }
      this.wppModelSelect.emit(model);
    };
    this.handleModelChange = () => {
      this.wppModelBrowse.emit();
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
     * The levels that apply to a model: what the user last chose for it, else the defaults.
     */
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
     * Fills in only the levels the consumer left unset for the model selected at mount. It must not
     * overwrite: a level passed alongside the model is the consumer seeding an explicit selection
     * (a restored session, say) and outranks any default.
     *
     * Returns which levels it filled, so `componentDidLoad` can emit exactly those — the write has
     * to happen before the first render to avoid a frame with nothing checked, but the events wait
     * until listeners are attached.
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
      if (this.selectedReasoning === option.id)
        return;
      this.selectedReasoning = option.id;
      this.emitModelOptionsState(this.wppReasoningSelect);
    };
    this.handleVerbositySelect = (option) => {
      if (this.selectedVerbosity === option.id)
        return;
      this.selectedVerbosity = option.id;
      this.emitModelOptionsState(this.wppVerbositySelect);
    };
    this.renderModelSelector = (size) => {
      const selectedModel = this.getSelectedModel();
      const isCustomModel = this.selectedModel !== 'auto' && this.selectedModel !== 'premium';
      const reasoningOptions = this.getModelOptions('reasoningOptions');
      const verbosityOptions = this.getModelOptions('verbosityOptions');
      const selectedReasoning = this.getSelectedModelOption('reasoningOptions', this.selectedReasoning);
      const triggerAvatar = (h("wpp-avatar-v4-6-0", { slot: "left", variant: "square", size: "xs", role: "presentation", src: selectedModel.logo, name: selectedModel.label }));
      return (h("wpp-menu-context-v4-6-0", { isBtnTrigger: true, class: "model-selector", dropdownConfig: { onShow: this.handleModelMenuShow, onHide: this.handleModelMenuHide, placement: 'top-start' } }, h("wpp-list-item-v4-6-0", { slot: "trigger-element", class: this.modelSelectorTriggerCssClasses(), role: "button", disabled: this.disabled, "aria-label": this._locales.modelSelectorBtnLabel }, triggerAvatar, size === 'm' && (h(Fragment, null, h("span", { slot: "label" }, selectedModel.label, selectedReasoning && `${MODEL_REASONING_SEPARATOR}${selectedReasoning.label}`), h("wpp-icon-chevron-v4-6-0", { slot: "right", direction: this.isModelMenuOpen ? 'up' : 'down' })))), h("div", { class: "wpp-model-dropdown" }, getDefaultModelOptions(this._locales).map((model) => this.renderModelListItem(model, model.id === selectedModel.id)), h("wpp-divider-v4-6-0", null), this.models.length > 0
        ? this.models.map((model) => this.renderModelListItem(model, model.id === selectedModel.id))
        : // Nothing lists the selected model when the list is browsed externally, so
          // surface it here — otherwise the dropdown never shows what is in use.
          isCustomModel && this.renderModelListItem(selectedModel, true), reasoningOptions.length > 0 &&
        this.renderModelOptionsSubmenu('reasoning', this._locales.modelReasoningLabel, reasoningOptions, this.selectedReasoning, this.handleReasoningSelect), verbosityOptions.length > 0 &&
        this.renderModelOptionsSubmenu('verbosity', this._locales.modelVerbosityLabel, verbosityOptions, this.selectedVerbosity, this.handleVerbositySelect), this.models.length === 0 && (h(Fragment, null, isCustomModel && h("wpp-divider-v4-6-0", null), h("wpp-list-item-v4-6-0", { onWppChangeListItem: this.handleModelChange }, h("span", { slot: "label" }, this._locales.modelSelectorListItemLabel), h("wpp-icon-chevron-v4-6-0", { slot: "right", direction: "right" })))))));
    };
    this.renderModelListItem = (model, checked) => (h("wpp-list-item-v4-6-0", { key: model.id, checked: checked, role: "menuitemradio", "aria-checked": String(checked), onWppChangeListItem: () => this.handleModelSelect(model) }, h("wpp-avatar-v4-6-0", { role: "presentation", slot: "left", size: "xs", variant: "square", src: model.logo, name: model.label }), h("span", { slot: "label" }, model.label), model?.caption && (h("span", { slot: "caption" }, model.caption))));
    /**
     * How far the submenu has to slide past its own row to sit flush with the bottom of the model
     * menu. Measured when popper asks rather than hard-coded, because it depends on which row opened
     * the submenu — Reasoning sits one row higher than Verbosity.
     */
    this.getModelOptionsSubmenuSkidding = (kind) => {
      const submenu = this.modelOptionsSubmenuRefs[kind];
      const menuRoot = submenu?.closest('[data-tippy-root]');
      if (!submenu || !menuRoot)
        return MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING;
      return menuRoot.getBoundingClientRect().bottom - submenu.getBoundingClientRect().bottom;
    };
    /**
     * Built once per kind and cached, because `wpp-menu-context` diffs `dropdownConfig` by value and
     * a fresh `offset` closure on every render would read as a change and re-apply the tippy props.
     */
    this.getModelOptionsDropdownConfig = (kind) => {
      const config = this.modelOptionsDropdownConfigs[kind] ?? {
        placement: 'right-end',
        offset: () => [this.getModelOptionsSubmenuSkidding(kind), MODEL_OPTIONS_SUBMENU_DISTANCE],
        popperOptions: {
          modifiers: [{ name: 'flip', options: { fallbackPlacements: ['right-start', 'left-end', 'left-start'] } }],
        },
      };
      this.modelOptionsDropdownConfigs[kind] = config;
      return config;
    };
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
     */
    this.renderModelOptionsSubmenu = (kind, label, options, selectedId, onSelect) => (h("wpp-menu-context-v4-6-0", { class: "model-options-menu", ref: element => (this.modelOptionsSubmenuRefs[kind] = element), dropdownConfig: this.getModelOptionsDropdownConfig(kind) }, h("wpp-list-item-v4-6-0", { slot: "trigger-element", isExtended: true }, h("span", { slot: "label" }, label)), h("div", { class: "wpp-model-options-dropdown" }, options.map((option) => (h("wpp-list-item-v4-6-0", { key: option.id, checked: option.id === selectedId, labelTypography: { type: 's-midi' }, role: "menuitemradio", "aria-checked": String(option.id === selectedId), onWppChangeListItem: () => onSelect(option) }, h("span", { slot: "label" }, option.label), option.caption && h("span", { slot: "caption" }, option.caption)))))));
    this.clearStopBtnHideTimeout = () => {
      if (!this.stopBtnHideTimeout)
        return;
      clearTimeout(this.stopBtnHideTimeout);
      this.stopBtnHideTimeout = null;
    };
    this.handleSendClick = (event) => {
      event.stopPropagation();
      this.handleSend();
    };
    this.handleStopBtnClick = (event) => {
      event.stopPropagation();
      this.handleStop();
      this.isStopBtnHiding = true;
      this.clearStopBtnHideTimeout();
      this.stopBtnHideTimeout = setTimeout(() => {
        this.stopBtnHideTimeout = null;
        this.isStopBtnHiding = false;
      }, PRIMARY_ACTION_TRANSITION_MS);
    };
    /**
     * The stop button is still on screen while it animates out, but it is no longer actionable —
     * `is-hidden` and `inert` must be driven by the same condition so it never becomes an invisible
     * focus target.
     */
    this.isPrimaryActionInteractive = () => this.shouldDisplaySend() && !this.isStopBtnHiding;
    this.renderSendStopBtn = () => {
      const interactive = this.isPrimaryActionInteractive();
      // While hidden the button stays in the DOM (to animate the collapse), but must leave the
      // focus order and a11y tree so its focusable inner control does not trip axe's aria-hidden-focus.
      const inertProps = interactive ? {} : { inert: true };
      return this.isGenerating || this.isStopBtnHiding ? (h("wpp-action-button-v4-6-0", { class: { 'play-btn': true, 'is-hidden': !interactive }, "data-testid": "stop-icon-only-button", onClick: this.handleStopBtnClick, ariaProps: { label: this.getStopButtonLabel() }, ...inertProps }, h("wpp-icon-stop-v4-6-0", { slot: "icon-start" }))) : (h("wpp-button-v4-6-0", { class: { 'play-btn': true, 'is-hidden': !interactive }, "data-testid": "send-icon-only-button", size: "s", onClick: this.handleSendClick, ariaProps: { label: this.getSendButtonLabel() }, ...inertProps }, h("wpp-icon-arrow-v4-6-0", { direction: "up", slot: "icon-start" })));
    };
    this.modelSelectorTriggerCssClasses = () => ({
      'select-model-trigger': true,
      [`size-${this.size}`]: true,
      'is-menu-opened': this.isModelMenuOpen,
      'is-chat-expanded': this.size === 's' && this.isChatInputExpanded,
    });
    this.hostCssClasses = () => ({
      'wpp-chat-input': true,
    });
    this.chatToastClasses = () => ({
      'chat-file-upload-toast': true,
    });
    this.chatInputContainerClasses = () => ({
      'chat-input-container': true,
      'is-focused': this.isFocused,
      'is-loading': this.isGenerating,
      'has-alert': this.hasAlertSlot && !this.isAlertDismissed,
      disabled: this.disabled,
    });
    this.inputAreaClasses = () => ({
      ...(this.size === 's' && { [this.isChatInputExpanded ? 'expanded' : 'minimized']: true }),
      'input-area': true,
    });
    this.attachmentsWrapperClasses = () => ({
      attachments: true,
    });
    this.textInputClasses = () => ({
      'text-input': true,
    });
    this.inputAreaWrapperClasses = () => ({
      'input-area-wrapper': true,
    });
    this.minimizedInput = () => ({
      'minimized-input': true,
    });
    this.inputValue = () => ({
      'input-value': true,
      disabled: this.disabled,
      'input-value-placeholder': !this.internalValue,
    });
    this.actionsBarClasses = () => ({
      'actions-bar': true,
      [`size-${this.size}`]: true,
    });
    this.leftActionsClasses = () => ({
      'left-actions': true,
      disabled: this.disabled,
    });
    this.selectClasses = () => ({
      select: true,
      'slot-hidden': !this.hasSelectSlot,
      disabled: this.disabled,
    });
    this.rightActionsClasses = () => ({
      'right-actions': true,
      disabled: this.disabled,
    });
    this.size = 'm';
    this.placeholder = 'Type your message...';
    this.enableAttach = false;
    this.enableMic = false;
    this.disabled = false;
    this.isGenerating = false;
    this.fileUploadConfig = {
      /**
       * Format of the file upload result.
       */
      format: 'base64',
      /**
       * If `true`, allows multiple files to be uploaded at once.
       */
      multiple: true,
      /**
       * Maximum number of files allowed for upload.
       * Set to `0` for no restriction.
       */
      maxFiles: 0,
      /**
       * Maximum allowed size of each file in MB.
       */
      size: 150,
      /**
       * Object defining accepted MIME types and their corresponding extensions.
       * Example: `{ 'image/png': ['.png'], 'application/pdf': ['.pdf'] }`.
       */
      acceptConfig: {},
      /**
       * Defines custom validation function for uploaded files.
       * Should return `null` if the file is valid, or a string error message otherwise.
       */
      validator: () => null,
      /**
       * If `true`, replaces existing error messages with new ones for failed uploads.
       * If `false`, retains existing errors and appends new ones.
       */
      showOnlyNewErrors: false,
      /**
       * If `true`, the file upload works as controlled component.
       */
      controlled: false,
      /**
       * Indicates locales for file upload component
       */
      locales: {
        sizeError: 'File exceeds size limit',
        formatError: 'Wrong format',
        limitError: 'Files limit reached',
        removeFile: (name) => `Remove file ${name}`,
        uploadProgress: (name) => `Processing ${name}`,
      },
    };
    this.charactersLimit = undefined;
    this.attachments = [];
    this.withSelect = false;
    this.models = [];
    this.selectedModel = 'auto';
    this.selectedReasoning = undefined;
    this.selectedVerbosity = undefined;
    this.actions = [];
    this.textValue = '';
    this.debounceEnabled = true;
    this.debounceDelay = 300;
    this.zIndex = Z_INDEX.CHAT;
    this.textareaAriaLabel = undefined;
    this.textareaId = undefined;
    this.textareaName = undefined;
    this.htmlAttributes = undefined;
    this.ariaProps = undefined;
    this.locales = {};
    this.successAttachmentsList = [];
    this.errorAttachmentsList = [];
    this.toastMessage = '';
    this.toastType = 'information';
    this.showToast = false;
    this.areAttachmentsVisible = true;
    this.hasSelectSlot = false;
    this.hasAlertSlot = false;
    this.isAlertDismissed = false;
    this.hasReferencesSlot = false;
    this.isChatInputExpanded = false;
    this.minimizedPressed = false;
    this.isFileDialogOpen = false;
    this.internalValue = '';
    this.actionsMenuOpen = false;
    this.isFocused = false;
    this.isAudioRecording = false;
    this.isModelMenuOpen = false;
    this.isStopBtnHiding = false;
  }
  onAttachmentsChange(newValue) {
    if (this.mergedFileUploadConfig.controlled) {
      this.reInitValue(newValue);
    }
    if (this.debouncedAdjustTextareaHeight) {
      requestAnimationFrame(() => this.debouncedAdjustTextareaHeight());
    }
  }
  onTextValueChange(value) {
    if (value !== this.internalValue) {
      this.internalValue = value;
      this.adjustTextareaHeight(false, value);
    }
  }
  componentWillLoad() {
    if (!this.textValue?.trim() && this.textValue !== this.internalValue) {
      this.internalValue = this.textValue;
    }
    this.aiModelBtn = this.host.querySelector('[slot="select"] > [slot="trigger-element"]');
    this.aiModelBtn?.addEventListener('focus', this.handleOnFocus);
    this.debouncedHandleInput = debounceWithControl((value) => {
      this.wppMessageChanged.emit({ value });
    }, this.debounceDelay);
    const list = [...this.attachments, ...(this.successAttachmentsList || []), ...(this.errorAttachmentsList || [])];
    this.reInitValue(list);
    // Before the first render, so the submenus never paint with nothing checked.
    this.lastResolvedModelId = this.getSelectedModel()?.id;
    this.pendingModelOptionDefaults = this.applyModelOptionDefaults();
  }
  componentDidLoad() {
    this.recognition.setupRecognition(this._locales.audioLanguage);
    // Emitted here rather than in `componentWillLoad` so a consumer's listeners are attached. A
    // default the component picked has to reach the consumer, or its next render pushes the
    // unset value straight back over it.
    if (this.pendingModelOptionDefaults.reasoningChanged)
      this.emitModelOptionsState(this.wppReasoningSelect);
    if (this.pendingModelOptionDefaults.verbosityChanged)
      this.emitModelOptionsState(this.wppVerbositySelect);
    requestAnimationFrame(() => {
      this.initializeObserver();
    });
    const debouncedResizeHandler = debounce(() => {
      if (this.textareaRef) {
        this.textareaRef.style.height = 'auto';
        this.forceRecalculateHeight();
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
      }
    }, 150);
    const resizeObserver = new ResizeObserver(() => {
      debouncedResizeHandler();
    });
    if (this.inputAreaRef) {
      resizeObserver.observe(this.inputAreaRef);
    }
    this.resizeObserver = resizeObserver;
    window.addEventListener('focus', this.onWindowFocus, true);
  }
  addExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = new AbortController();
    const signal = this.expandedListenersAbort.signal;
    document.addEventListener('mousedown', this.checkInteractedItem, { capture: true, signal });
    document.addEventListener('focusin', this.checkInteractedItem, { capture: true, signal });
  }
  removeExpandedListeners() {
    this.expandedListenersAbort?.abort();
    this.expandedListenersAbort = undefined;
  }
  connectedCallback() {
    // This is needed so the animation from "Processing" state works as expected (this component uses shadow DOM).
    registerLoadingHaloAngle();
    this.themeSubscription.start();
  }
  disconnectedCallback() {
    this.disconnectObserver();
    this.themeSubscription.stop();
    this.recognition.stopRecognition();
    this.clearStopBtnHideTimeout();
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
      this.scrollTimeout = null;
    }
    if (this.resizeObserver && this.inputAreaRef) {
      this.resizeObserver.unobserve(this.inputAreaRef);
    }
    this.removeExpandedListeners();
    window.removeEventListener('focus', this.onWindowFocus, true);
    this.aiModelBtn?.removeEventListener('focus', this.handleOnFocus);
  }
  get _locales() {
    return mergeLocales(LOCALES_DEFAULTS, this.locales);
  }
  /**
   * Carries the reasoning/verbosity levels across a model change, whichever way the model was
   * changed — picked from this dropdown, or set by the platform after its own side-modal flow.
   *
   * The user's choice is remembered per model for the lifetime of this element and restored when
   * they come back to it; a model they have not chosen a level for yet takes the documented
   * defaults. It deliberately does NOT reset (Mustafa, 23 Sep 2026 — resetting was the earlier
   * behaviour and read as a worse experience).
   *
   * It EMITS whatever it applies, which is the part that is easy to get wrong: these are
   * controlled props, so a component that silently rewrote them would be overwritten again by the
   * next render of a consumer holding its own state. Emitting keeps the two in step. Only levels
   * that actually changed emit, so a model change that leaves a level alone stays quiet.
   */
  onSelectedModelChange(newValue) {
    // `selectedModel` takes either a string preset or a model object. Going from the string to an
    // object makes React remove the attribute, and Stencil's attributeChangedCallback assigns that
    // removal as `null` before the property set lands - so this watch sees a null it must ignore
    // rather than resolve. The real value arrives on the very next call.
    if (newValue === null || newValue === undefined)
      return;
    const previousModelId = this.lastResolvedModelId;
    const nextModelId = typeof newValue === 'string' ? newValue : newValue.id;
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
  onSizeChange(newValue, oldValue) {
    if (newValue !== oldValue && this.size === 's') {
      this.handleSizeToggle();
    }
  }
  /**
   * Maximize the input area when the user clicks on it.
   */
  handleSizeToggle() {
    if (this.size === 's' && !this.disabled) {
      this.isChatInputExpanded = true;
      requestAnimationFrame(() => {
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
        this.handleClick();
      });
    }
  }
  /**
   * Minimize the input area when it loses focus.
   */
  handleSimpleBlur() {
    if (this.size === 's' && this.isChatInputExpanded) {
      this.isChatInputExpanded = false;
    }
    this.removeExpandedListeners();
    this.isFocused = false;
  }
  forceRecalculateHeight() {
    if (this.textareaRef) {
      const currentValue = this.textareaRef.value;
      this.textareaRef.value = '';
      this.textareaRef.value = currentValue;
    }
  }
  calculateTextHeight(text) {
    if (!this.textareaRef || !text)
      return MIN_TEXTAREA_HEIGHT;
    const mirrorDiv = document.createElement('div');
    const computedStyle = window.getComputedStyle(this.textareaRef);
    mirrorDiv.style.position = 'absolute';
    mirrorDiv.style.visibility = 'hidden';
    mirrorDiv.style.whiteSpace = 'pre-wrap';
    mirrorDiv.style.wordWrap = 'break-word';
    mirrorDiv.style.padding = computedStyle.padding;
    mirrorDiv.style.width = this.textareaRef.offsetWidth + 'px';
    mirrorDiv.style.fontFamily = computedStyle.fontFamily;
    mirrorDiv.style.fontSize = computedStyle.fontSize;
    mirrorDiv.style.lineHeight = computedStyle.lineHeight;
    mirrorDiv.style.boxSizing = computedStyle.boxSizing;
    mirrorDiv.style.letterSpacing = computedStyle.letterSpacing;
    mirrorDiv.textContent = (text || ' ') + '\u200b';
    document.body.appendChild(mirrorDiv);
    const height = mirrorDiv.offsetHeight;
    document.body.removeChild(mirrorDiv);
    return height;
  }
  // Getter to merge defaults with provided config
  get mergedFileUploadConfig() {
    return {
      ...DEFAULT_FILE_UPLOAD_CONFIG,
      ...this.fileUploadConfig,
      locales: {
        ...DEFAULT_FILE_UPLOAD_CONFIG.locales,
        ...this.fileUploadConfig?.locales,
      },
    };
  }
  // Precedence helpers: ariaProps > locales > internal defaults
  getPlaceholderText() {
    return this._locales.placeholder ?? this.placeholder;
  }
  getMinimizedAriaLabel() {
    return this.ariaProps?.minimizedTrigger?.label ?? (this.internalValue || this.getPlaceholderText());
  }
  getMinimizedDescriptionText() {
    return this._locales.minimizedDescription;
  }
  getTextareaLabel() {
    return (this.ariaProps?.textarea?.label ?? this.textareaAriaLabel ?? this._locales.messageInputLabel ?? 'Message input');
  }
  getActionsToolbarLabel() {
    return this.ariaProps?.actionsToolbar?.label ?? this._locales.actionsToolbarLabel;
  }
  getLeftActionsLabel() {
    return this.ariaProps?.leftActionsGroup?.label ?? this._locales.leftActionsGroupLabel;
  }
  getRightActionsLabel() {
    return this.ariaProps?.rightActionsGroup?.label ?? this._locales.rightActionsGroupLabel;
  }
  getSendButtonLabel() {
    return this.ariaProps?.sendButton?.label ?? this._locales.sendLabel;
  }
  getStopButtonLabel() {
    return this.ariaProps?.stopButton?.label ?? this._locales.stopLabel;
  }
  getAttachButtonLabel() {
    return this.ariaProps?.attachButton?.label ?? this._locales.attachLabel;
  }
  getActionsMenuButtonLabel() {
    return this.ariaProps?.actionsMenuButton?.label ?? this._locales.actionsMenuLabel;
  }
  getAudioRecordButtonLabel() {
    return this.ariaProps?.audioRecordButton?.label ?? this._locales.audioRecordButtonLabel;
  }
  getAudioStopRecordButtonLabel() {
    return this.ariaProps?.audioStopRecordButton?.label ?? this._locales.audioStopRecordButtonLabel;
  }
  checkAttachmentsVisibility() {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement || !this.inputAreaRef) {
      this.areAttachmentsVisible = false;
      return;
    }
    // Attachments lay out horizontally, so they are fully visible only when the
    // row is not overflowing its horizontal scroll container.
    const { scrollWidth, clientWidth } = attachmentsElement;
    const horizontallyVisible = scrollWidth <= clientWidth + 1;
    // The input area is `column-reverse` with `overflow-y: hidden` and a fixed
    // max-height, so a tall textarea pushes the attachments row off the top
    // where it gets clipped out of view. Compare the row's box against the input
    // area's box to detect that vertical clipping, which a horizontal-only check
    // misses (e.g. long text + a single file that fits the row).
    const areaRect = this.inputAreaRef.getBoundingClientRect();
    const rowRect = attachmentsElement.getBoundingClientRect();
    const verticallyVisible = rowRect.top >= areaRect.top - 1 && rowRect.bottom <= areaRect.bottom + 1;
    this.areAttachmentsVisible = horizontallyVisible && verticallyVisible;
  }
  // The slotted alert lives in the light DOM, so its close event bubbles up to
  // the chat input. Hiding it here keeps the alert dismissal contained to the
  // alert area without disturbing the rest of the chat input. References share
  // the same close event, so we only react when the alert itself was dismissed.
  handleAlertClose(event) {
    const target = event.target;
    if (target?.getAttribute('slot') === 'alert') {
      this.isAlertDismissed = true;
    }
  }
  disconnectObserver() {
    if (this.inputAreaRef) {
      this.inputAreaRef.removeEventListener('scroll', this.handleScroll);
    }
  }
  initializeObserver() {
    if (!this.inputAreaRef)
      return;
    this.inputAreaRef.addEventListener('scroll', this.handleScroll);
    this.checkAttachmentsVisibility();
  }
  /**
   * Scrolls the attachments list to the specified file type.
   * @param fileType 'error' for error files, 'success' for success files (or '' for any file)
   */
  scrollToAttachment(type = '') {
    const attachmentsElement = this.inputAreaRef?.querySelector('.attachments');
    if (!attachmentsElement)
      return;
    let selector = '.wpp-file-upload-item';
    if (type === 'error')
      selector += '.error';
    if (type === 'success')
      selector += ':not(.error)';
    // New files are appended to the end of each list, so the most recently added
    // file is the LAST element matching the selector. Target it so clicking the
    // toast reveals the file the user just added, not the oldest matching one.
    const matches = attachmentsElement.querySelectorAll(selector);
    const attachment = matches[matches.length - 1];
    if (attachment) {
      // Attachments scroll horizontally, so align along the inline axis while
      // using block: 'nearest' to avoid nudging the surrounding page vertically.
      attachment.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      return;
    }
    // Fallback: scroll back to the first attachment (start of the horizontal row).
    attachmentsElement.scrollTo({ left: 0, behavior: 'smooth' });
  }
  displayToast(message, type) {
    this.checkAttachmentsVisibility();
    if (this.areAttachmentsVisible || !this.attachments?.length) {
      return;
    }
    this.toastMessage = message;
    this.toastType = type;
    this.showToast = true;
    setTimeout(() => (this.showToast = false), TOAST_DURATION);
  }
  handleSend() {
    if (this.debounceEnabled && this.textareaRef) {
      this.debouncedHandleInput.flush(this.textareaRef.value);
    }
    if (this.disabled ||
      this.isGenerating ||
      (!this.internalValue.trim() && !this.successAttachmentsList.length) ||
      this.errorAttachmentsList.length)
      return;
    this.isAudioRecording = false;
    this.recognition.stopRecognition();
    const reasoning = this.getSelectedModelOption('reasoningOptions', this.selectedReasoning);
    const verbosity = this.getSelectedModelOption('verbosityOptions', this.selectedVerbosity);
    this.wppSend.emit({
      message: this.internalValue.trim(),
      attachments: this.successAttachmentsList,
      model: this.getSelectedModel(),
      // Spread rather than assign `null`: a level the selected model does not offer is
      // absent from the payload, matching how `attachments` behaves.
      ...(reasoning ? { reasoning } : {}),
      ...(verbosity ? { verbosity } : {}),
    });
    Object.assign(this, {
      internalValue: '',
      successAttachmentsList: [],
      errorAttachmentsList: [],
    });
    this.wppChange.emit({ value: [], hasError: false, errorFiles: [], files: [] });
    this.adjustTextareaHeight(true);
    if (this.size === 's') {
      // Collapse back to the minimized resting state. Use the blur routine so it
      // also clears `isFocused` (and tears down the expanded listeners); just
      // setting `isChatInputExpanded = false` would leave the active focus border
      // painted on the minimized input after sending.
      this.handleSimpleBlur();
    }
  }
  handleStop() {
    if (this.disabled)
      return;
    this.wppStop.emit();
  }
  handleFileSelection() {
    if (!this.inputRef || this.isFileDialogOpen)
      return;
    this.isFileDialogOpen = true;
    this.inputRef.click();
  }
  async handleFileLoad(filesList) {
    if (!filesList.length)
      return;
    const existingAttachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const filteredFiles = filesList
      .filter(Boolean)
      .map(file => existingAttachments.some(item => item.name === file.name)
      ? renameFile(file, this.generateUniqueName(file.name, existingAttachments))
      : file);
    const filteredFilesInitLength = filteredFiles.length;
    if (this.isMaximumFilesSet()) {
      const maxFiles = this.mergedFileUploadConfig.maxFiles;
      const remainingSlots = Math.max(0, maxFiles - existingAttachments.length);
      filteredFiles.length = Math.min(filteredFiles.length, remainingSlots);
      if (remainingSlots === 0)
        return;
      this.displayToast('Uploading...', 'information');
    }
    const validatedFiles = filteredFiles.map(file => {
      if ('url' in file)
        return file;
      this.validateFileSize(file);
      // Reassigned, as in wpp-file-upload: for an untyped file this returns a replacement carrying
      // the type resolved from its extension, and dropping it left the attachment untyped.
      file = this.validateFileType(file);
      this.customValidation(file);
      return file;
    });
    const [batchSuccessFiles, batchErrorFiles] = [
      validatedFiles.filter(file => !this.isFileWithError(file)),
      validatedFiles.filter(this.isFileWithError),
    ];
    this.successAttachmentsList = [...this.successAttachmentsList, ...batchSuccessFiles];
    this.errorAttachmentsList = this.displayErrorListByShowingOption(batchErrorFiles);
    this.attachments = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    this.wppChange.emit({
      value: this.successAttachmentsList,
      hasError: !!this.errorAttachmentsList.length,
      errorFiles: this.errorAttachmentsList,
      files: this.attachments,
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.checkAttachmentsVisibility();
        const label = batchErrorFiles.length > 0 ? 'Upload FAILED' : 'Uploaded Successfully';
        const fileCount = batchErrorFiles.length || batchSuccessFiles.length;
        const fileLabel = fileCount === 1 ? 'File' : 'Files';
        if (batchErrorFiles.length === 0 &&
          this.isMaximumFilesSet() &&
          this.mergedFileUploadConfig.maxFiles < filteredFilesInitLength) {
          this.displayToast(this.mergedFileUploadConfig.locales.limitError, 'error');
        }
        else if (fileCount > 0) {
          this.displayToast(`${fileCount} ${fileLabel} ${label}`, batchErrorFiles.length > 0 ? 'error' : 'success');
        }
        if (this.debouncedAdjustTextareaHeight) {
          this.debouncedAdjustTextareaHeight();
        }
      });
    });
  }
  handleToastClick(event) {
    event.stopPropagation();
    this.scrollToAttachment(this.toastType === 'error' ? 'error' : 'success');
  }
  render() {
    const allFiles = [...this.successAttachmentsList, ...this.errorAttachmentsList];
    const isMaximizedS = this.isChatInputExpanded && this.size === 's';
    const maximizedSorSizeM = isMaximizedS || this.size === 'm';
    const isMinimizedS = this.size === 's' && !this.isChatInputExpanded;
    const placeholderText = this.getPlaceholderText();
    const recordButtonLabel = this.isAudioRecording
      ? this.getAudioStopRecordButtonLabel()
      : this.getAudioRecordButtonLabel();
    const ariaInvalid = this.ariaProps?.textarea?.invalid !== undefined ? this.ariaProps.textarea.invalid : undefined;
    return (h(Host, { class: this.hostCssClasses(), size: this.size, style: { zIndex: this.zIndex.toString() }, exportparts: "chat-input-container, alert, toast, input-area, attachments, references, text-input, actions-bar, left-actions, right-actions, file-item, actions-menu", onClick: isMinimizedS ? this.handleSizeToggle : this.handleClick, onFocus: this.handleOnFocus }, h("div", { class: this.chatInputContainerClasses(), onKeyDown: this.onExpandedKeyDown, part: "chat-input-container" }, h("div", { class: "alert", part: "alert", hidden: !this.hasAlertSlot || this.isAlertDismissed }, h("slot", { name: "alert", onSlotchange: this.handleAlertSlotChange })), this.showToast && (h("wpp-toast-v4-6-0", { message: this.toastMessage, type: this.toastType, duration: TOAST_DURATION, variant: "chat", part: "toast", class: this.chatToastClasses(), onClick: event => this.handleToastClick(event) })), h("div", { id: this.inputAreaId, class: this.inputAreaClasses(), ref: el => (this.inputAreaRef = el), part: "input-area" }, maximizedSorSizeM ? (h(Fragment, null, allFiles?.length > 0 && (h("div", { class: this.attachmentsWrapperClasses(), part: "attachments", role: "list", "aria-label": this._locales.attachmentsLabel }, allFiles.map((file, index) => (h("wpp-file-upload-item-v4-6-0", { key: index, file: file, variant: "chat", format: this.mergedFileUploadConfig.format, currentIndex: index, onWppDelete: this.handleDeleteItem, onWppClick: this.handleClickItem, locales: {
        sizeError: this.mergedFileUploadConfig.locales.sizeError,
        formatError: this.mergedFileUploadConfig.locales.formatError,
        removeFile: this.mergedFileUploadConfig.locales.removeFile,
        uploadProgress: this.mergedFileUploadConfig.locales.uploadProgress,
      }, part: "file-item", class: this.isFileWithError(file) ? 'error' : '', onFileLoaded: this.handleFileLoaded, uploaded: !!file.uploaded, role: "listitem", "aria-posinset": (index + 1).toString(), "aria-setsize": allFiles.length.toString() }))))), h("div", { class: "references", part: "references", hidden: !this.hasReferencesSlot }, h("slot", { name: "references", onSlotchange: this.handleReferencesSlotChange })), h("textarea", { id: (this.htmlAttributes?.textarea?.id ?? this.textareaId) || this.textareaAutoId, name: this.htmlAttributes?.textarea?.name ?? this.textareaName ?? 'message', class: this.textInputClasses(), placeholder: placeholderText, value: this.internalValue, ref: el => (this.textareaRef = el), onInput: this.handleInput, onPaste: this.handlePaste, disabled: this.disabled, onKeyDown: this.onKeyDown, part: "text-input", "aria-label": this.getTextareaLabel(), "aria-invalid": ariaInvalid, autocomplete: this.htmlAttributes?.textarea?.autocomplete, maxLength: this.htmlAttributes?.textarea?.maxLength, "data-gramm": "false", "data-gramm_editor": "false" }))) : (h("div", { class: this.inputAreaWrapperClasses() }, this.renderActionsMenu(), h("div", { class: this.minimizedInput(), part: "minimized-input", "data-pressed": this.minimizedPressed ? 'true' : null, role: "button", tabindex: this.disabled ? -1 : 0, "aria-expanded": this.isChatInputExpanded ? 'true' : 'false', "aria-controls": this.inputAreaId, "aria-label": this.getMinimizedAriaLabel(), "aria-describedby": this.minimizedDescId, onKeyDown: this.onMinimizedKeyDown, onKeyUp: this.onMinimizedKeyUp }, h("wpp-typography-v4-6-0", { class: this.inputValue(), type: "s-body" }, this.internalValue || placeholderText)), h("span", { id: this.minimizedDescId, class: "sr-only" }, this.getMinimizedDescriptionText()), h("div", { class: this.rightActionsClasses() }, !this.withSelect && this.renderModelSelector('s'), this.renderMicrophoneBtn(recordButtonLabel), this.renderSendStopBtn())))), maximizedSorSizeM && (h("div", { class: this.actionsBarClasses(), part: "actions-bar", role: "toolbar", "aria-label": this.getActionsToolbarLabel() }, h("div", { class: this.leftActionsClasses(), part: "left-actions", role: "group", "aria-label": this.getLeftActionsLabel() }, this.renderActionsMenu(), this.enableMic && (h("wpp-action-button-v4-6-0", { "data-testid": "mic-icon-only-button", variant: "secondary", disabled: this.disabled, ariaProps: { label: this._locales.voiceLabel } }, h("wpp-icon-mic-on-v4-6-0", { slot: "icon-start" })))), h("div", { class: this.rightActionsClasses(), part: "right-actions", role: "group", "aria-label": this.getRightActionsLabel() }, this.withSelect ? (h(WrappedSlot, { wrapperClass: this.selectClasses(), name: "select", onSlotchange: this.updateSlotData })) : (this.renderModelSelector('m')), this.renderMicrophoneBtn(recordButtonLabel), this.renderSendStopBtn()))), h("input", { class: "file-loader", type: "file", ref: inputRef => (this.inputRef = inputRef), style: { display: 'none' }, multiple: this.htmlAttributes?.attachmentsInput?.multiple ?? this.mergedFileUploadConfig.multiple, onChange: this.handleChange, accept: this.htmlAttributes?.attachmentsInput?.accept ?? this.getAcceptTokens().join(), title: "", id: this.htmlAttributes?.attachmentsInput?.id ?? 'wpp-ci-file', name: this.htmlAttributes?.attachmentsInput?.name ?? 'attachments', "aria-hidden": "true" }))));
  }
  static get registryIs() { return "wpp-chat-input-v4-6-0"; }
  get host() { return this; }
  static get watchers() { return {
    "attachments": ["onAttachmentsChange"],
    "textValue": ["onTextValueChange"],
    "selectedModel": ["onSelectedModelChange"],
    "size": ["onSizeChange"]
  }; }
  static get style() { return wppChatInputCss; }
}, [1, "wpp-chat-input", "wpp-chat-input-v4-6-0", {
    "size": [1],
    "placeholder": [1],
    "enableAttach": [4, "enable-attach"],
    "enableMic": [4, "enable-mic"],
    "disabled": [4],
    "isGenerating": [4, "is-generating"],
    "fileUploadConfig": [16],
    "charactersLimit": [2, "characters-limit"],
    "attachments": [1040],
    "withSelect": [516, "with-select"],
    "models": [16],
    "selectedModel": [1025, "selected-model"],
    "selectedReasoning": [1025, "selected-reasoning"],
    "selectedVerbosity": [1025, "selected-verbosity"],
    "actions": [16],
    "textValue": [1, "text-value"],
    "debounceEnabled": [4, "debounce-enabled"],
    "debounceDelay": [2, "debounce-delay"],
    "zIndex": [2, "z-index"],
    "textareaAriaLabel": [1, "textarea-aria-label"],
    "textareaId": [1, "textarea-id"],
    "textareaName": [1, "textarea-name"],
    "htmlAttributes": [16],
    "ariaProps": [16],
    "locales": [16],
    "successAttachmentsList": [32],
    "errorAttachmentsList": [32],
    "toastMessage": [32],
    "toastType": [32],
    "showToast": [32],
    "areAttachmentsVisible": [32],
    "hasSelectSlot": [32],
    "hasAlertSlot": [32],
    "isAlertDismissed": [32],
    "hasReferencesSlot": [32],
    "isChatInputExpanded": [32],
    "minimizedPressed": [32],
    "isFileDialogOpen": [32],
    "internalValue": [32],
    "actionsMenuOpen": [32],
    "isFocused": [32],
    "isAudioRecording": [32],
    "isModelMenuOpen": [32],
    "isStopBtnHiding": [32]
  }, [[0, "wppClose", "handleAlertClose"]]]);
function defineCustomElement() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["wpp-chat-input-v4-6-0", "wpp-action-button-v4-6-0", "wpp-avatar-v4-6-0", "wpp-button-v4-6-0", "wpp-checkbox-v4-6-0", "wpp-divider-v4-6-0", "wpp-file-upload-item-v4-6-0", "wpp-icon-arrow-v4-6-0", "wpp-icon-chevron-v4-6-0", "wpp-icon-cross-v4-6-0", "wpp-icon-dash-v4-6-0", "wpp-icon-database-v4-6-0", "wpp-icon-document-v4-6-0", "wpp-icon-error-v4-6-0", "wpp-icon-file-v4-6-0", "wpp-icon-file-zip-v4-6-0", "wpp-icon-image-v4-6-0", "wpp-icon-info-message-v4-6-0", "wpp-icon-mic-on-v4-6-0", "wpp-icon-music-v4-6-0", "wpp-icon-pitch-v4-6-0", "wpp-icon-plus-v4-6-0", "wpp-icon-spreadsheet-v4-6-0", "wpp-icon-stop-v4-6-0", "wpp-icon-success-v4-6-0", "wpp-icon-tick-v4-6-0", "wpp-icon-video-clip-v4-6-0", "wpp-icon-warning-v4-6-0", "wpp-inline-message-v4-6-0", "wpp-internal-label-v4-6-0", "wpp-internal-tooltip-v4-6-0", "wpp-label-v4-6-0", "wpp-list-item-v4-6-0", "wpp-menu-context-v4-6-0", "wpp-spinner-v4-6-0", "wpp-toast-v4-6-0", "wpp-tooltip-v4-6-0", "wpp-typography-v4-6-0"];
  components.forEach(tagName => { switch (tagName) {
    case "wpp-chat-input-v4-6-0":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, WppChatInput);
      }
      break;
    case "wpp-action-button-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$B();
      }
      break;
    case "wpp-avatar-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$A();
      }
      break;
    case "wpp-button-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$z();
      }
      break;
    case "wpp-checkbox-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$y();
      }
      break;
    case "wpp-divider-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$x();
      }
      break;
    case "wpp-file-upload-item-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$w();
      }
      break;
    case "wpp-icon-arrow-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$v();
      }
      break;
    case "wpp-icon-chevron-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$u();
      }
      break;
    case "wpp-icon-cross-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$t();
      }
      break;
    case "wpp-icon-dash-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$s();
      }
      break;
    case "wpp-icon-database-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$r();
      }
      break;
    case "wpp-icon-document-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$q();
      }
      break;
    case "wpp-icon-error-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$p();
      }
      break;
    case "wpp-icon-file-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$o();
      }
      break;
    case "wpp-icon-file-zip-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$n();
      }
      break;
    case "wpp-icon-image-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$m();
      }
      break;
    case "wpp-icon-info-message-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$l();
      }
      break;
    case "wpp-icon-mic-on-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$k();
      }
      break;
    case "wpp-icon-music-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$j();
      }
      break;
    case "wpp-icon-pitch-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$i();
      }
      break;
    case "wpp-icon-plus-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$h();
      }
      break;
    case "wpp-icon-spreadsheet-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$g();
      }
      break;
    case "wpp-icon-stop-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$f();
      }
      break;
    case "wpp-icon-success-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$e();
      }
      break;
    case "wpp-icon-tick-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$d();
      }
      break;
    case "wpp-icon-video-clip-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$c();
      }
      break;
    case "wpp-icon-warning-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$b();
      }
      break;
    case "wpp-inline-message-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$a();
      }
      break;
    case "wpp-internal-label-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$9();
      }
      break;
    case "wpp-internal-tooltip-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$8();
      }
      break;
    case "wpp-label-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$7();
      }
      break;
    case "wpp-list-item-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$6();
      }
      break;
    case "wpp-menu-context-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$5();
      }
      break;
    case "wpp-spinner-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$4();
      }
      break;
    case "wpp-toast-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$3();
      }
      break;
    case "wpp-tooltip-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$2();
      }
      break;
    case "wpp-typography-v4-6-0":
      if (!customElements.get(tagName)) {
        defineCustomElement$1();
      }
      break;
  } });
}

export { WppChatInput as W, defineCustomElement as d };
