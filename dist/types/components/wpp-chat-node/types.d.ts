export type WppChatNodeSize = 's' | 'm';
export interface ChatNodeMessageAttachment {
  name: string;
  type: string;
  url?: string;
  thumbnailUrl?: string;
  alt?: string;
}
export interface ChatNodeMessageAction {
  id: string;
  icon: `wpp-icon-${string}`;
  label: string;
}
export interface ChatNodeMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  attachments?: ChatNodeMessageAttachment[];
  actions?: ChatNodeMessageAction[];
}
export interface ChatNodeAvatarConfig {
  /** Name to show abbreviated initials */
  name?: string;
  /** Icon component name (e.g. 'wpp-icon-ai') */
  icon?: string;
  /** Avatar background color */
  color?: string;
}
export interface ChatNodeAction {
  icon: `wpp-icon-${string}`;
  label: string;
}
export interface ChatNodeModel {
  id: string;
  label: string;
  icon?: `wpp-icon-${string}`;
  /** Brand/model logo image URL rendered inside the model-selector logo avatar. */
  logo?: string;
}
export interface ChatNodeDefaultModel extends ChatNodeModel {
  caption: string;
}
/**
 * A model option surfaced by the selector: either a built-in default option
 * (`ChatNodeDefaultModel`) or a dev-provided `ChatNodeModel`.
 *
 * Declared as a single named alias (rather than an inline `ChatNodeModel | ChatNodeDefaultModel`
 * union in the `@Event()` type) because Stencil's Angular output target only aliases the first
 * member of a union of complex types when generating the proxy, leaving the rest unresolved.
 */
export type ChatNodeSelectableModel = ChatNodeModel | ChatNodeDefaultModel;
export type ChatNodeSelectedModel = 'auto' | 'premium' | ChatNodeModel;
export interface ChatNodeMessageActionClickDetail {
  message: ChatNodeMessage;
  action: ChatNodeMessageAction;
}
export interface ChatNodeMicEventDetail {
  /** `true` when the microphone just started listening, `false` when it stopped. */
  isRecording: boolean;
}
export interface ChatNodeLocales {
  attachAction: string;
  actionsMenu: string;
  messageInputLabel: string;
  messageInput: string;
  sendMessage: string;
  stopResponse: string;
  /** Accessible label for the re-run action shown when `isReRun` is true. */
  reRunResponse: string;
  copyMessageAction: string;
  likeMessageAction: string;
  dislikeMessageAction: string;
  regenerateMessageAction: string;
  /** Accessible name for the horizontally scrollable attachments strip (a keyboard tab stop). */
  attachmentsRegionLabel: string;
  /** Accessible label for the audio-record button when idle. */
  audioRecordAction: string;
  /** Accessible label for the audio-record button while listening. */
  audioStopRecordAction: string;
  /** BCP-47 language tag used by the SpeechRecognition engine (e.g. `en-US`). */
  audioLanguage: string;
  /** Accessible label for the model-selector trigger (logo avatar). */
  modelSelectorLabel: string;
  /** Label for the built-in "Auto" default model option. */
  modelAutoOptionLabel: string;
  /** Caption shown under the "Auto" default model option. */
  modelAutoOptionCaption: string;
  /** Label for the built-in "Premium" default model option. */
  modelPremiumOptionLabel: string;
  /** Caption shown under the "Premium" default model option. */
  modelPremiumOptionCaption: string;
  /** Label for the "Select model or agent" action shown when no `models` are provided. */
  modelSelectorListItemLabel: string;
}
