import { EventEmitter } from '../../stencil-public-runtime';
import { ArtefactAction, ArtefactAriaProps, ArtefactLocales, ArtefactSize } from './types';
/**
 * @slot body - Contains the main content of the artefact.
 * @slot handles - Should contain custom handle elements for integration with React Flow library.
 */
export declare class WppArtefact {
  private themeSubscription;
  private resizeObserver;
  private titleRef;
  private _locales;
  host: HTMLWppArtefactElement;
  defaultActions: ArtefactAction[];
  dropdownActions: ArtefactAction[];
  hasScrollbar: boolean;
  /**
   * Defines the artefact size. Setting this attribute changes the width of the artefact.
   */
  readonly size: ArtefactSize;
  /**
   * Defines the title of the artefact, which is displayed in the header section. This prop is required.
   */
  readonly artefactTitle: string;
  /**
   * Defines the additional actions available for the artefact. The actions are added to the dropdown menu in the footer section.
   * The `icon` should correspond to a valid icon name in the design system.
   */
  readonly actions: ArtefactAction[];
  /**
   * Allows removing the Pin action from the dropdown list, which is rendered by default.
   */
  readonly withPinAction: boolean;
  /**
   * Allows specifing the position in the dropdown list of the Pin action. By default, it will be rendered at the top of the list.
   */
  readonly pinActionPosition: number;
  /**
   * Indicates the locales for the artefact component
   */
  readonly locales: Partial<ArtefactLocales>;
  /**
   * Defines the icon that will be rendered on the left of the title. Should contain the name of a valid icon from the library.
   */
  readonly titleIcon?: `wpp-icon-${string}`;
  /**
   * Defines if the WppArtefact is selected. The value of this property should be available in the `props: NodeProps`, which are handled by React Flow.
   */
  readonly isSelected: boolean;
  /**
   * Defines the ARIA-label for the button of the actions menu.
   */
  readonly ariaProps: ArtefactAriaProps;
  /**
   * Emitted when an action is clicked. The event detail contains the `ArtefactAction` object corresponding to the clicked action.
   * This event is emitted for both default actions (copy, download, delete) and additional actions provided via the `actions` prop.
   */
  wppActionClick: EventEmitter<ArtefactAction>;
  onUpdateLocales(newLocales: Partial<ArtefactLocales>): void;
  onUpdatePinAction(): void;
  connectedCallback(): void;
  componentWillLoad(): void;
  disconnectedCallback(): void;
  private updateDropdownActions;
  private handleActionClick;
  private getArtefactWrapperClasses;
  render(): any;
}
