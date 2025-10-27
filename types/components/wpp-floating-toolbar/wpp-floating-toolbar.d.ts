import { ActionButtonData } from './types';
import { AriaProps } from '../../types/common';
export declare class WppFloatingToolbar {
  host: HTMLWppFloatingToolbarElement;
  private items;
  private _actionButtonsConfig;
  /**
   * Defines the action buttons configuration.
   * Must contain between 2 and 7 items.
   */
  readonly actionButtonsConfig: ActionButtonData[];
  /**
   * Defines the orientation of the floating toolbar.
   */
  readonly orientation: 'horizontal' | 'vertical';
  /**
   * Contains the floating toolbar `aria-` props.
   */
  readonly ariaProps: AriaProps;
  onUpdateActionButtonsConfig(config: ActionButtonData[]): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private validateActionButtonConfig;
  private renderActionButton;
  private setActionButtons;
  private getEnabledButtons;
  private syncTabIndexes;
  private onKeyDown;
  private hostCssClasses;
  private wrapperCssClasses;
  render(): any;
}
