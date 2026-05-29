import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig, FOCUS_TYPE, MessageTypes } from '../../types/common';
import { InlineMessageLocalesType } from './types';
/**
 * @part message-block - Wrapper around the icon and message.
 *
 * @part message-icon - message icon element
 * @part message-block - message block element
 * @part message - message element
 * @part wrapper - component wrapper element
 * @part tooltip - tooltip wrapper content
 */
export declare class WppInlineMessage {
  private themeSubscription;
  host: HTMLWppInlineMessageElement;
  isTruncated: boolean;
  hasTitle: boolean;
  focusType: FOCUS_TYPE;
  private messageRef?;
  private resizeObserver;
  private _locales;
  /**
   * Defines the title of the component. This prop is available only for inline-messages with size="l".
   */
  readonly titleText: string;
  /**
   * Defines the text of the action button. This prop is available only for inline-messages with size="l".
   */
  readonly actionBtnText: string;
  /**
   * Defines the inline message.
   */
  readonly message: string;
  /**
   * Defines the inline message style based on the available types.
   */
  readonly type: MessageTypes;
  /**
   * Defines the inline message size.
   */
  readonly size: 's' | 'm' | 'l';
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly tooltipConfig: DropdownConfig;
  /**
   * Controls message truncation behavior. When set to a number, limits visible characters to that value.
   * When set to 'auto' (default), truncates based on input width. In both cases, full message appears in tooltip when truncated.
   */
  readonly showTooltipFrom: number | 'auto';
  /**
   * If `true`, the close button on the right of the container for the inline-message with size='l' will not be displayed.
   */
  readonly hideCloseBtn: boolean;
  /**
   * Defines the component locale types.
   */
  readonly locales: Partial<InlineMessageLocalesType>;
  /**
   * Emitted when the action button is clicked. This event is emitted only for the inline-messages with size="l".
   */
  wppClickActionBtn: EventEmitter<void>;
  /**
   * Emitted when the close button is clicked. This event is emitted only for the inline-messages with size="l".
   */
  wppClickCloseBtn: EventEmitter<void>;
  onUpdateTitleText(): void;
  onUpdateLocales(newLocales: Partial<InlineMessageLocalesType>): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private setupResizeObserver;
  private checkTruncation;
  private getMessage;
  private onBlur;
  private onMouseDown;
  private onKeyUp;
  private inlineMessageWrapperCssClasses;
  private messageBlockCssClasses;
  private hostCssClasses;
  private messageCssClasses;
  private titleCssClasses;
  private getMessageTypesIcons;
  private handleClickClose;
  private handleClickActionBtn;
  private getContainerContentCssClasses;
  private renderContent;
  private getExportParts;
  render(): any;
}
