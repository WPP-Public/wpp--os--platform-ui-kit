import { EventEmitter } from '../../stencil-public-runtime';
import { BasicNodeLocales, BasicNodeAction, BasicNodeAriaProps } from './types';
/**
 * @slot body - Contains the main content of the basic node.
 * @slot handles - Should contain custom handle elements for integration with React Flow library.
 */
export declare class WppBasicNode {
  private themeSubscription;
  private resizeObserver;
  private bodyRef;
  private titleRef;
  private _locales;
  hasScrollbar: boolean;
  host: HTMLWppBasicNodeElement;
  /**
   * Defines the title of the node, which is displayed in the header section. This prop is required.
   */
  readonly nodeTitle: string;
  /**
   * Defines whether the node is in a loading state. If true, the border of the node will be animated.
   */
  readonly isLoading: boolean;
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
  onUpdateLocales(newLocales: Partial<BasicNodeLocales>): void;
  connectedCallback(): void;
  disconnectedCallback(): void;
  componentWillLoad(): void;
  private checkBodyForScroll;
  private handleActionClick;
  private getNodeContainerClasses;
  private getNodeWrapperClasses;
  render(): any;
}
