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
  },
};
export const MAX_INPUT_AREA_HEIGHT = 240;
export const MIN_TEXTAREA_HEIGHT = 52;
export const LOCALES_DEFAULTS = {
  placeholder: 'Type your message...',
  minimizedDescription: 'Expand message input',
  actionsToolbarLabel: 'Message actions',
  leftActionsGroupLabel: 'Attachments and tools',
  rightActionsGroupLabel: 'Send and character counter',
  sendLabel: 'Send message',
  attachLabel: 'Attach file',
  voiceLabel: 'Record voice message',
  attachmentsLabel: 'Attachments',
  messageInputLabel: 'Message input',
};
