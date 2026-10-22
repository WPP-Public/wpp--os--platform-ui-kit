import { ActionButtonData } from './types';
import { AriaProps } from '../../types/common';
/**
 * @part action - Every action button, for styling the set from outside.
 * @part action-{id} - One action button, named after its config `id` (for example `action-zoom-level`).
 * @part action-tooltip - The tooltip wrapper around an action that sets one.
 * @part button - The native button inside each action.
 */
export declare class WppFloatingToolbar {
  host: HTMLWppFloatingToolbarElement;
  private items;
  private _actionButtonsConfig;
  private themeSubscription;
  private hasIdProp;
  private pendingFocusIndex;
  private isPointerInput;
  selectedIdentifier: string | number | undefined;
  rovingIdentifier: string | number | undefined;
  /**
   * Defines the action buttons configuration.
   * Must contain between 1 and 7 items. Each item needs an `icon`, a text `label`, or both.
   * When the focused action becomes disabled, focus moves to the nearest enabled action. If none is left
   * enabled, the toolbar can't hold focus and the browser moves it to the page, so move it somewhere useful
   * yourself (for example to the content the toolbar controls).
   */
  readonly actionButtonsConfig: ActionButtonData[];
  /**
   * Defines whether the buttons will have a "selected" state after being clicked.
   */
  readonly selectable: boolean;
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
  componentDidRender(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  private validateActionButtonConfig;
  private identifierAt;
  private indexOfIdentifier;
  private getFocusedIdentifier;
  private nearestEnabledIndex;
  private getRovingIndex;
  private handleBtnClick;
  private renderActionButton;
  private getEnabledButtons;
  private focusItem;
  private onPointerDown;
  private onKeyDown;
  private hostCssClasses;
  private wrapperCssClasses;
  render(): any;
}
