import { EventEmitter } from '../../stencil-public-runtime';
import type { ChatNodeAction, ChatNodeMessageAction, ChatNodeMessageActionClickDetail, ChatNodeAvatarConfig, ChatNodeLocales, ChatNodeMessage, ChatNodeMicEventDetail, ChatNodeModel, ChatNodeSelectableModel, ChatNodeSelectedModel, WppChatNodeSize } from './types';
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
export declare class WppChatNode {
  private themeSubscription;
  host: HTMLWppChatNodeElement;
  /**
   * Defines the title of the node, displayed in the header.
   */
  readonly nodeTitle: string;
  /**
   * Defines an optional title icon rendered before the node title.
   * @deprecated The node icon is now fixed and non-customizable; this prop is maintained for backward
   * compatibility but no longer affects the rendered icon. This property will be removed in version 5.0.0.
   */
  readonly titleIcon?: `wpp-icon-${string}`;
  /**
   * Defines whether the node is in a loading state. If true, the border animates.
   */
  readonly isLoading: boolean;
  /**
   * Defines whether the node is in the selected/active state. Shows a blue border.
   */
  readonly isSelected: boolean;
  /**
   * If `true`, the primary action shows a re-run affordance (refresh icon) that
   * lets the user re-run the last response. Takes precedence over the send action
   * but not over the stop action shown while loading.
   */
  readonly isReRun: boolean;
  /**
   * Defines the chat node size. `'s'` renders the compact chat bar only.
   */
  readonly size: WppChatNodeSize;
  /**
   * Defines the user avatar configuration. Set to `false` to hide the user avatar.
   */
  readonly userAvatarConfig: ChatNodeAvatarConfig | false;
  /**
   * Defines the assistant avatar configuration. Set to `false` to hide the assistant avatar.
   */
  readonly assistantAvatarConfig: ChatNodeAvatarConfig | false;
  /**
   * Defines the actions available from the `+` button.
   * When empty (the default), the `+` button is a plain action that emits `wppAttach` on click.
   * When it contains at least one action, the `+` button instead opens a dropdown listing them,
   * and selecting one emits `wppActionClick` with the chosen action.
   */
  readonly actions: ChatNodeAction[];
  /**
   * Defines the list of AI models offered by the AI model selector on the chat bar.
   * The selector always renders a dropdown that starts with the built-in default options
   * ("Auto" / "Premium"). When this array is empty, the dropdown additionally renders a
   * "Select model or agent" action that emits `wppModelBrowse` when clicked; otherwise the
   * provided models are listed below the defaults. Picking any model emits `wppModelSelect`.
   * Note: the `icon` property is deprecated and should not be used, always aim to use `logo` for the image.
   */
  readonly models: ChatNodeModel[];
  /**
   * Defines action buttons shown below assistant messages. If omitted, localized default actions are shown.
   * Set to an empty array to hide them.
   */
  readonly messageActions?: ChatNodeMessageAction[];
  /**
   * Defines the selected AI model. Accepts a built-in default option (`'auto'` / `'premium'`) or one
   * of the provided `models`. Defaults to `'auto'`. The component keeps this in sync when the user
   * picks a model from the dropdown; it can also be set externally when selection follows a
   * different flow (e.g. from a side-modal).
   */
  selectedModel: ChatNodeSelectedModel;
  /**
   * Defines the id of the selected model. Kept for backwards compatibility: it still selects the
   * matching option from the built-in defaults (`'auto'` / `'premium'`) or from `models`, but only
   * while `selectedModel` sits at its default — `selectedModel` always takes precedence.
   * @deprecated Use `selectedModel` instead. This id-based prop will be removed in a future release.
   */
  selectedModelId?: string;
  /**
   * Indicates the locales for the chat-node component.
   */
  readonly locales: Partial<ChatNodeLocales>;
  /**
   * Emitted when the user clicks the send button or presses Enter.
   */
  wppSend: EventEmitter<{
    message: string;
  }>;
  /**
   * Emitted when the user clicks the stop button while the node is loading.
   */
  wppStop: EventEmitter<void>;
  /**
   * Emitted when the user clicks the re-run button (shown when `isReRun` is true).
   */
  wppReRun: EventEmitter<void>;
  /**
   * Emitted when the user clicks the + button while `actions` is empty.
   * When `actions` is non-empty the + button opens the actions dropdown instead and this never fires.
   */
  wppAttach: EventEmitter<void>;
  /**
   * Emitted when the user toggles the audio-record (microphone) button.
   * The detail carries the resulting state: `isRecording` is `true` when listening
   * has just started and `false` when it has just stopped.
   */
  wppMic: EventEmitter<ChatNodeMicEventDetail>;
  /**
   * Emitted when an action is selected from the + button's actions dropdown.
   */
  wppActionClick: EventEmitter<ChatNodeAction>;
  /**
   * Emitted when a model is selected from the AI model selector dropdown.
   * The detail is the selected model object — a built-in `ChatNodeDefaultModel` (`Auto` / `Premium`)
   * or one of the dev-provided `ChatNodeModel`s.
   */
  wppModelSelect: EventEmitter<ChatNodeSelectableModel>;
  /**
   * Emitted when the "Select model or agent" action from the model-selector dropdown is clicked.
   * This action is rendered only when the `models` property is an empty array.
   */
  wppModelBrowse: EventEmitter<void>;
  /**
   * Emitted when a message action button is clicked.
   */
  wppMessageActionClick: EventEmitter<ChatNodeMessageActionClickDetail>;
  private inputValue;
  private messages;
  private isActive;
  private isWaitingForResponse;
  private isAudioRecording;
  private isModelMenuOpen;
  private defaultMessageActions;
  private _locales;
  private bodyRef?;
  private titleRef?;
  private recognition;
  private responseWaitTimer?;
  private static unrefTimer;
  onUpdateLocales(newLocales: Partial<ChatNodeLocales>): void;
  onUpdateSelectedModel(newModel: ChatNodeSelectedModel): void;
  componentWillLoad(): void;
  connectedCallback(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  /**
   * Programmatically add a message (user or assistant) to the chat body.
   */
  addMessage(message: ChatNodeMessage): Promise<void>;
  /**
   * Append text to the last assistant message (for streaming).
   */
  appendChunk(chunk: string): Promise<void>;
  private scrollToBottom;
  private handleInput;
  private handleSend;
  private handleStop;
  private handleReRun;
  private handleKeyDown;
  private setupSpeechRecognition;
  private startSpeechRecognition;
  private stopSpeechRecognition;
  private handleClickAudioRecording;
  private handleAttach;
  private handleActionClick;
  private handleModelSelect;
  private handleModelChange;
  private handleModelMenuShow;
  private handleModelMenuHide;
  private handleMessageActionClick;
  private handleNodeInteraction;
  private handleWindowPointerDown;
  private activateNode;
  private clearActiveState;
  private startWaitingForResponse;
  private clearWaitingForResponse;
  private clearResponseWaitTimer;
  private getDefaultModels;
  private getSelectedModel;
  private getModelFromDeprecatedId;
  private renderIcon;
  private renderActionMenu;
  private renderModelListItem;
  /**
   * Model selector triggered by the compact logo avatar (Figma). Unlike wpp-chat-input,
   * which shows the full brand logo + model label, the node exposes only the compact logo
   * avatar. The dropdown always starts with the built-in default options ("Auto" / "Premium").
   * When `models` are provided they are listed below the defaults; when `models` is empty a
   * "Select model or agent" action is rendered instead, emitting `wppModelBrowse` on click.
   */
  private renderModelSelector;
  private renderMicrophoneBtn;
  private getPrimaryAction;
  private isPrimaryActionVisible;
  private renderSendButton;
  private renderInput;
  private renderChatBar;
  private renderAvatar;
  private getAttachmentKind;
  private handleAttachmentImageError;
  private renderAttachmentFallback;
  private renderMessageAttachments;
  private renderMessageActions;
  private renderMessages;
  render(): any;
}
