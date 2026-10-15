export const LOCALES_DEFAULTS = {
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
/**
 * Levels used when a model is selected and the user has not chosen one for it yet:
 * "Reasoning: Auto, with fallback to Medium. Verbosity: Medium." (Mustafa, 23 Sep 2026).
 * Matched against the ids the consumer supplies, first hit wins; a model offering none of them
 * gets no default rather than an arbitrary guess. These literals are the platform's
 * `ReasoningLevel` / `LlmOutputVerbosity` enum values.
 */
export const DEFAULT_REASONING_IDS = ['auto', 'medium'];
export const DEFAULT_VERBOSITY_IDS = ['medium'];
/**
 * Geometry for a level submenu, which the design aligns with the bottom of the model menu rather
 * than with the row that opens it. Popper's skidding offset moves the popup along the trigger's
 * cross axis, so for a `right-end` placement a skidding equal to the gap between the row and the
 * menu's bottom edge puts the last level in line with the menu's last row. The fallback is that
 * gap when the menu is not a popup and there is nothing to measure against.
 */
export const MODEL_OPTIONS_SUBMENU_FALLBACK_SKIDDING = 8;
export const MODEL_OPTIONS_SUBMENU_DISTANCE = 9;
/**
 * The footer actions rendered below an assistant message when a dev passes no `messageActions`.
 * The node has no quote action — unlike wpp-chat-conversation, its single-row chat bar has no
 * place to show the resulting quote, so the design drops it here (confirmed by design, Sep 2026).
 */
export const getDefaultMessageActions = (locales) => [
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
export const COPIED_CONFIRMATION_TIMEOUT = 3000;
/** Icon rendered beside a message's token count when the message does not override it. */
export const DEFAULT_TOKEN_COUNT_ICON = 'wpp-icon-premium';
export const DEFAULT_MESSAGE_ACTIONS = getDefaultMessageActions(LOCALES_DEFAULTS);
