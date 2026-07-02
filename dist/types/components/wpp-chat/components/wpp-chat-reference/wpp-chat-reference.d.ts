import { EventEmitter } from '../../../../stencil-public-runtime';
import { ChatReferenceLines, ChatReferenceLocales, ChatReferenceType } from './types';
/**
 * @part reference - root reference container
 * @part block-line - leading vertical block line
 * @part thumbnail - file thumbnail container
 * @part thumbnail-image - file thumbnail image
 * @part content - reference content wrapper
 * @part name - file name text
 * @part type - file type text
 * @part text - text reference content
 * @part close - close icon
 */
export declare class WppChatReference {
  /**
   * Reference type: a file card (thumbnail + name + type) or a text snippet.
   */
  readonly type: ChatReferenceType;
  /**
   * File name shown as the title (file type).
   */
  readonly name: string;
  /**
   * Type label shown as the subtitle, e.g. "PNG image" (file type).
   */
  readonly fileType: string;
  /**
   * Thumbnail image url. When omitted, a file-type icon is shown (file type).
   */
  readonly src: string;
  /**
   * File extension used to pick the fallback icon, e.g. ".png" (file type).
   */
  readonly fileExtension: string;
  /**
   * Text content (text type).
   */
  readonly text: string;
  /**
   * Number of lines before the text is truncated with an ellipsis (text type).
   */
  readonly lines: ChatReferenceLines;
  /**
   * Whether the reference can be removed.
   */
  readonly removable: boolean;
  /**
   * Localisation strings.
   */
  readonly locales: Partial<ChatReferenceLocales>;
  /**
   * Emitted when the close icon is activated.
   */
  wppClose: EventEmitter<void>;
  private get _locales();
  private handleClose;
  private handleCloseKeyDown;
  private renderThumbnail;
  private renderFile;
  private renderText;
  render(): any;
}
