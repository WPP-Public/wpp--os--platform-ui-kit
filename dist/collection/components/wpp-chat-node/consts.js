export const LOCALES_DEFAULTS = {
  attachAction: 'Attach file',
  actionsMenu: 'Open chat actions',
  messageInputLabel: 'Message',
  messageInput: 'Message...',
  sendMessage: 'Send message',
  stopResponse: 'Stop response',
  copyMessageAction: 'Copy',
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
export const getDefaultMessageActions = (locales) => [
  { id: 'copy', icon: 'wpp-icon-copy', label: locales.copyMessageAction },
  { id: 'like', icon: 'wpp-icon-thumbs-up', label: locales.likeMessageAction },
  { id: 'dislike', icon: 'wpp-icon-thumbs-down', label: locales.dislikeMessageAction },
  { id: 'regenerate', icon: 'wpp-icon-refresh', label: locales.regenerateMessageAction },
];
export const DEFAULT_MESSAGE_ACTIONS = getDefaultMessageActions(LOCALES_DEFAULTS);
