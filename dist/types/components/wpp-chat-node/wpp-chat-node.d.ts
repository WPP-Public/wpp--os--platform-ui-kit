import { EventEmitter } from '../../stencil-public-runtime';
import type { ChatNodeAction, ChatNodeMessageAction, ChatNodeMessageActionClickDetail, ChatNodeAvatarConfig, ChatNodeLocales, ChatNodeMessage, ChatNodeMicEventDetail, ChatNodeModel, ChatNodeModelOptionsEventDetail, ChatNodeSelectableModel, ChatNodeSelectedModel, ChatNodeSendEventDetail, WppChatNodeSize } from './types';
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
   * Id of the currently selected reasoning level. It must match the `id` of one of the
   * selected model's `reasoningOptions`; an id that matches nothing leaves the submenu with
   * no row checked rather than silently selecting a level the consumer did not ask for.
   * Leave it unset for "no level chosen". Picking a different model from the dropdown clears
   * it, because option ids are scoped to a model.
   */
  selectedReasoning?: string;
  /**
   * Id of the currently selected verbosity level, matched against the selected model's
   * `verbosityOptions`. Behaves exactly like `selectedReasoning`.
   */
  selectedVerbosity?: string;
  /**
   * Indicates the locales for the chat-node component.
   */
  readonly locales: Partial<ChatNodeLocales>;
  /**
   * Emitted when the user clicks the send button or presses Enter.
   */
  wppSend: EventEmitter<ChatNodeSendEventDetail>;
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
   * Emitted when a level is picked from the "Reasoning" submenu. The detail carries the
   * resulting state of the whole selection — the model plus both levels — so a consumer can
   * forward it to the backend without mirroring the component's internals. Rendered only
   * when the selected model supplies `reasoningOptions`.
   */
  wppReasoningSelect: EventEmitter<ChatNodeModelOptionsEventDetail>;
  /**
   * Emitted when a level is picked from the "Verbosity" submenu, with the same resulting
   * state payload as `wppReasoningSelect`. Rendered only when the selected model supplies
   * `verbosityOptions`.
   */
  wppVerbositySelect: EventEmitter<ChatNodeModelOptionsEventDetail>;
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
  /**
   * Id of the message currently showing its copy confirmation. Keyed by message rather than a bare
   * boolean so copying one response never flashes a checkmark on another.
   */
  private copiedMessageId;
  /**
   * Keys (`<messageId>::<actionId>`) of toggle actions the component tracks itself. An action that
   * leaves `isActive` undefined is UNCONTROLLED — the component flips it so the button works with
   * no wiring — while one that sets `isActive` explicitly stays controlled and is never keyed here.
   * Scoped per message so pinning one response never marks another.
   */
  private toggledActionKeys;
  private _locales;
  private bodyRef?;
  private titleRef?;
  private recognition;
  private responseWaitTimer?;
  private copyResetHandle;
  /**
   * The levels the user last chose for each model, so switching away from a model and back
   * restores their choice instead of resetting it (Mustafa, 23 Sep 2026).
   *
   * This is INSTANCE state, not a persisted session: it lives as long as this element does, so a
   * consumer that needs the selection to survive a remount or a page reload owns that itself and
   * feeds it back through `selectedReasoning` / `selectedVerbosity`.
   */
  private modelOptionMemory;
  /** Which mount-time defaults `componentWillLoad` applied, for `componentDidLoad` to emit. */
  private pendingModelOptionDefaults;
  /**
   * The last model the option watch actually resolved for. Tracked here rather than read from the
   * watch's `oldValue`, because `selectedModel` goes transiently null on the way from a string
   * preset to a model object (see `onUpdateSelectedModel`) and `oldValue` would then be that null,
   * losing the previous model's levels instead of remembering them.
   */
  private lastResolvedModelId?;
  /** The two level submenus, by kind, so their popper offset can measure against the model menu. */
  private modelOptionsSubmenuRefs;
  private modelOptionsDropdownConfigs;
  private static unrefTimer;
  onUpdateLocales(newLocales: Partial<ChatNodeLocales>): void;
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
   * Programmatically update an already-added message, merging `changes` over it.
   *
   * Messages live in the component's internal state, so this is the only way to change one after
   * it has been added — needed for controlled per-message action state such as flipping a pin's
   * `isActive`. Unknown ids are ignored.
   */
  updateMessage(id: string, changes: Partial<ChatNodeMessage>): Promise<void>;
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
  private handleClickAudioRecording;
  private handleAttach;
  private handleActionClick;
  private handleModelSelect;
  private handleModelChange;
  private handleModelMenuShow;
  private handleModelMenuHide;
  /**
   * The level to pre-select for a model the user has not chosen one for yet: the first of the
   * documented defaults the model actually offers, or nothing when it offers none of them.
   */
  private resolveDefaultOptionId;
  /**
   * The remembered level for a model, but only if that model still offers it — a consumer can
   * change a model's option list between selections, and a remembered id that no longer exists
   * would leave the submenu with nothing checked.
   */
  private getRememberedOptionId;
  /**
   * Fills in only the levels the consumer left unset for the model selected at mount. It must not
   * overwrite: a level passed alongside the model is the consumer seeding an explicit selection
   * and outranks any default. Returns what it filled so `componentDidLoad` can emit exactly that.
   */
  private applyModelOptionDefaults;
  /** The levels that apply to a model: what the user last chose for it, else the defaults. */
  private resolveModelOptions;
  /**
   * The levels offered by whichever model is selected. `Auto` and `Premium` are built-in
   * presets that carry no per-LLM levels, so they resolve to an empty list and render no row.
   */
  private getModelOptions;
  private getSelectedModelOption;
  private emitModelOptionsState;
  private handleReasoningSelect;
  private handleVerbositySelect;
  private handleMessageActionClick;
  private toggleKey;
  /** Controlled `isActive` when the dev supplies one, otherwise the component's own toggle state. */
  private isActionActive;
  private clearCopyReset;
  private copyMessageToClipboard;
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
   * How far the submenu has to slide past its own row to sit flush with the bottom of the model
   * menu. Measured when popper asks rather than hard-coded, because it depends on which row opened
   * the submenu — Reasoning sits one row higher than Verbosity.
   */
  private getModelOptionsSubmenuSkidding;
  /**
   * Built once per kind and cached, because `wpp-menu-context` diffs `dropdownConfig` by value and
   * a fresh `offset` closure on every render would read as a change and re-apply the tippy props.
   */
  private getModelOptionsDropdownConfig;
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
  private renderModelOptionsSubmenu;
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
  private hasTokenCount;
  /**
   * The DS component file renders the token count as an Action Button instance, so it IS a
   * wpp-action-button — not a styled div — and it emits wppMessageActionClick like the other
   * footer actions. The only deviation from the button's defaults is the grey-600 icon, set through the
   * button's own `--wpp-action-button-secondary-icon-color` hook in SCSS.
   */
  private renderTokenCount;
  private renderMessageAction;
  private renderMessageActions;
  private renderMessages;
  render(): any;
}
