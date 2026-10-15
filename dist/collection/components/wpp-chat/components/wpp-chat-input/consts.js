export const DEFAULT_FILE_UPLOAD_CONFIG = {
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
export const MAX_INPUT_AREA_HEIGHT = 240;
export const MIN_TEXTAREA_HEIGHT = 52;
/**
 * How long the send/stop button takes to collapse out of the actions bar.
 * Should be kept in sync with `--chat-input-action-transition-duration` from the `scss` file.
 */
export const PRIMARY_ACTION_TRANSITION_MS = 200;
/**
 * Reserved `ChatInputAction.id` that auto-wires an actions-menu entry to the
 * same file picker used by `enableAttach`. Consumers can still listen for the
 * `wppActionsMenuItemClick` event on top of the built-in behavior.
 */
export const UPLOAD_ACTION_ID = 'upload';
export const UPLOAD_ICON = 'wpp-icon-attach';
/**
 * Sits between the model name and the selected reasoning level in the selector trigger
 * (`Gemini 3.5 Flash\u30FBHigh`). This is U+30FB KATAKANA MIDDLE DOT, taken verbatim from the
 * Figma text node — it carries its own wide side bearings, which is why the design shows visual
 * gaps without any space characters. Do NOT "fix" it to a bullet plus spaces; that reads the
 * same but is not what the design specifies.
 *
 * Not a locale string: it is punctuation, and the same glyph is used in every language.
 */
export const MODEL_REASONING_SEPARATOR = '\u30FB';
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
export const DEFAULT_REASONING_IDS = ['auto', 'medium'];
export const DEFAULT_VERBOSITY_IDS = ['medium'];
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
export const MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING = 8;
export const MODEL_OPTIONS_SUBMENU_DISTANCE = 9;
export const LOCALES_DEFAULTS = {
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
export const getDefaultModelOptions = (locales) => [
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
