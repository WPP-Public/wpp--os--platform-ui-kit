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
};
export const getDefaultMessageActions = (locales) => [
  { id: 'copy', icon: 'wpp-icon-copy', label: locales.copyMessageAction },
  { id: 'like', icon: 'wpp-icon-thumbs-up', label: locales.likeMessageAction },
  { id: 'dislike', icon: 'wpp-icon-thumbs-down', label: locales.dislikeMessageAction },
  { id: 'regenerate', icon: 'wpp-icon-refresh', label: locales.regenerateMessageAction },
];
export const DEFAULT_MESSAGE_ACTIONS = getDefaultMessageActions(LOCALES_DEFAULTS);
