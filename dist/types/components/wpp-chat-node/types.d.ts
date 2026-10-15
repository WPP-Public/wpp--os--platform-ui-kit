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
  /**
   * Renders the action in its active (toggled-on) state, e.g. a pinned response. Leave it
   * undefined and the action is UNCONTROLLED — the component tracks the toggle itself (per
   * message), so a pin flips with no wiring. Set it and you own the state.
   */
  isActive?: boolean;
  /** Icon rendered while `isActive` is `true`. Falls back to `icon`. */
  activeIcon?: `wpp-icon-${string}`;
  /** Tooltip and accessible label used while `isActive` is `true`. Falls back to `label`. */
  activeLabel?: string;
}
export interface ChatNodeMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  attachments?: ChatNodeMessageAttachment[];
  actions?: ChatNodeMessageAction[];
  /**
   * Token count for this response, already formatted for display (e.g. `'30,000'`). The footer tag is
   * rendered only when this is a non-empty string, so omit it for the Auto/Premium model options.
   */
  tokenCount?: string;
  /** Icon rendered beside `tokenCount`. Defaults to `wpp-icon-premium`. */
  tokenCountIcon?: `wpp-icon-${string}`;
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
/**
 * A single selectable level inside the Reasoning or Verbosity submenu.
 *
 * Both the `label` and the optional `caption` are supplied by the consumer, because the
 * wording is per-LLM data owned by the platform — the component renders whatever it is
 * given and hard-codes none of it. An option without a `caption` renders a single-line row.
 */
export interface ChatNodeModelConfigOption {
  id: string;
  label: string;
  caption?: string;
}
/**
 * Which of the two level submenus a piece of plumbing belongs to. The pair is fixed by the
 * design — a model offers reasoning levels, verbosity levels, or both — so it is an explicit
 * union rather than an open string.
 */
export type ChatNodeModelOptionsKind = 'reasoning' | 'verbosity';
export interface ChatNodeModel {
  id: string;
  label: string;
  icon?: `wpp-icon-${string}`;
  /** Brand/model logo image URL rendered inside the model-selector logo avatar. */
  logo?: string;
  /**
   * Reasoning levels offered by this model. When non-empty, selecting this model adds a
   * "Reasoning" row to the model dropdown that opens a submenu of these options; omit it
   * (or pass an empty array) and no Reasoning row is rendered.
   */
  reasoningOptions?: ChatNodeModelConfigOption[];
  /**
   * Verbosity levels offered by this model. Behaves exactly like `reasoningOptions` but
   * drives the "Verbosity" row. Only supply it for models that actually support verbosity
   * — omitting it is how a model opts out of the row.
   */
  verbosityOptions?: ChatNodeModelConfigOption[];
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
/**
 * Resulting state of the model's option selection, emitted by both `wppReasoningSelect`
 * and `wppVerbositySelect` so a consumer never has to mirror the component's internals:
 * whichever level was just picked, the payload always describes the full selection.
 *
 * `reasoning` / `verbosity` are `null` when the model offers no such options, or when the
 * consumer has not selected a level yet.
 */
export interface ChatNodeModelOptionsEventDetail {
  model: ChatNodeModel;
  reasoning: ChatNodeModelConfigOption | null;
  verbosity: ChatNodeModelConfigOption | null;
}
/**
 * Payload of `wppSend`. `model` and the two levels ride along so a consumer can forward the
 * request to the backend without mirroring the selector's state; the levels are omitted
 * entirely when the selected model offers none or nothing is selected yet.
 */
export interface ChatNodeSendEventDetail {
  message: string;
  model?: ChatNodeSelectableModel;
  reasoning?: ChatNodeModelConfigOption;
  verbosity?: ChatNodeModelConfigOption;
}
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
  /** Tooltip, accessible label and live-region announcement shown while the copy confirmation is visible. */
  copiedMessageAction: string;
  /** Tooltip and accessible label for the pin action while the message is not pinned. */
  pinMessageAction: string;
  /** Tooltip and accessible label for the pin action while the message is pinned. */
  unpinMessageAction: string;
  /** Visually hidden label read before a message's token count, so the figure is not announced bare. */
  tokenCountLabel: string;
  /** @deprecated No longer part of the default message actions. Retained so existing translations resolve. */
  likeMessageAction: string;
  /** @deprecated No longer part of the default message actions. Retained so existing translations resolve. */
  dislikeMessageAction: string;
  /** @deprecated No longer part of the default message actions. Retained so existing translations resolve. */
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
  /** Label for the row that opens the Reasoning submenu. */
  modelReasoningLabel: string;
  /** Label for the row that opens the Verbosity submenu. */
  modelVerbosityLabel: string;
}
