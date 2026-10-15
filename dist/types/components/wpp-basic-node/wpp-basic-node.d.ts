import { EventEmitter } from '../../stencil-public-runtime';
import { BasicNodeLocales, BasicNodeAction, BasicNodeAriaProps } from './types';
/**
 * @slot body - Contains the main content of the basic node.
 * @slot handles - Should contain custom handle elements for integration with React Flow library.
 */
export declare class WppBasicNode {
  private themeSubscription;
  private resizeObserver;
  private slotObserver;
  private bodyRef;
  private titleRef;
  private errorIconRef;
  private shouldFocusErrorIcon;
  hasScrollbar: boolean;
  hasContent: boolean;
  isErrorDismissed: boolean;
  host: HTMLWppBasicNodeElement;
  /**
   * Defines the title of the node, which is displayed in the header section. This prop is required.
   */
  readonly nodeTitle: string;
  /**
   * Defines whether the node is in a loading state. If true, an arc rotates around the border of the node
   * with a soft glow behind it.
   */
  readonly isLoading: boolean;
  /**
   * Defines whether the node is in the re-run state. When true (and not loading), the primary action button
   * shows a refresh icon instead of the play icon, indicating the node can be run again.
   */
  readonly isReRun: boolean;
  /**
   * Defines the error message of the node. When provided, the node is rendered in the error state:
   * an error icon is displayed in the header and the message is shown in an inline message at the top of the body.
   */
  readonly errorMessage: string | undefined;
  /**
   * Defines the additional actions available for the Basic Node. The actions are added to the dropdown menu in the footer section.
   * The `icon` should correspond to a valid icon name in the design system.
   */
  readonly actions: BasicNodeAction[];
  /**
   * Indicates the locales for the basic-node component
   */
  readonly locales: Partial<BasicNodeLocales>;
  /**
   * Defines if the WppBasicNode is selected. The value of this property should be available in the `props: NodeProps`, which are handled by React Flow.
   */
  readonly isSelected: boolean;
  /**
   * Defines the ARIA props for the button of the actions menu.
   */
  readonly ariaProps: BasicNodeAriaProps;
  /**
   * Emitted when an action is clicked. The event detail contains the `BasicNodeAction` object corresponding to the clicked action.
   */
  wppActionClick: EventEmitter<BasicNodeAction>;
  /**
   * Emitted when the user dismisses the error inline message with its close button.
   * The error icon remains in the header until `errorMessage` is cleared.
   */
  wppDismissError: EventEmitter<void>;
  onErrorMessageChange(): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  private get _locales();
  private checkBodyForScroll;
  private handleActionClick;
  /**
   * Reflects whether any content is projected into the `body` slot in the `hasContent` state.
   * Runs on load and whenever the slotted content changes (see `slotObserver`).
   */
  private updateHasContent;
  private getPrimaryAction;
  private getErrorAnnouncement;
  private handleErrorDismiss;
  private handlePrimaryActionClick;
  private getNodeContainerClasses;
  private getNodeWrapperClasses;
  private getErrorMessageClasses;
  private getErrorIconClasses;
  render(): any;
}
