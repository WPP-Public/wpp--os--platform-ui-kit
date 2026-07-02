import { EventEmitter } from '../../../../stencil-public-runtime';
import { ChatAlertLocales, ChatAlertType } from './types';
/**
 * @part alert - root alert container
 * @part icon - status icon
 * @part message - main message text
 * @part description - secondary description text
 * @part close - close icon
 */
export declare class WppChatAlert {
  /**
   * Alert intent, controls the colour scheme and status icon.
   */
  readonly type: ChatAlertType;
  /**
   * Main message text.
   */
  readonly message: string;
  /**
   * Optional secondary text shown inline as a trailing hint on the same row as
   * the message (for example a size limit). Leave unset for a single message.
   */
  readonly description: string;
  /**
   * Whether the alert can be dismissed.
   */
  readonly closable: boolean;
  /**
   * Localisation strings.
   */
  readonly locales: Partial<ChatAlertLocales>;
  /**
   * Emitted when the close icon is activated.
   */
  wppClose: EventEmitter<void>;
  private get _locales();
  private handleClose;
  private handleCloseKeyDown;
  private renderIcon;
  render(): any;
}
