import { EventEmitter } from '../../stencil-public-runtime';
import { DropdownConfig } from '../../types/common';
import { BaseFormControl } from '../../interfaces/base-form-control';
import { BaseComponent } from '../../interfaces/base-component';
import { PillSize, PillChangeEventDetail, PillType } from '../wpp-pill/types';
import { PillGroupChangeEvent, PillGroupValue, PillGroupLabelConfig, PillGroupLocaleInterface, WppPillGroupAriaProps, PillGroupReorderListEvent } from './types';
/**
 * @slot - Can contain only the `wpp-pill` components that are displayed in `pill-group`. It can be only <wpp-pill>. The default slot, without the name attribute.
 *
 * @part label - Label text element
 * @part content - content wrapper element
 * @part inner - Content slot element
 */
export declare class WppPillGroup implements BaseComponent, BaseFormControl<PillGroupValue> {
  private pillItems;
  private hasFocus;
  private currentDraggedIndex;
  private isDragging;
  private grabbedPillValue;
  private grabbedPillOriginalIndex;
  private pillToFocusAfterReorder;
  private pillToFocusAfterRemoval;
  private pillsWrapperRef?;
  readonly host: HTMLWppPillGroupElement;
  /**
   * Message rendered in the live region so screen readers announce keyboard grab / move / drop / cancel actions.
   */
  liveAnnouncement: string;
  /**
   * Defines the pill group name.
   */
  readonly name: string;
  /**
   * Defines the pill group size.
   * @deprecated - the pills will always display in only 1 size.
   */
  readonly size: PillSize;
  /**
   * Defines the pill group value.
   */
  value?: PillGroupValue;
  /**
   * Indicates the type of the pill group.
   */
  readonly type: PillType;
  /**
   * If the pill group is required.
   */
  readonly required: boolean;
  /**
   * Indicates label config
   */
  labelConfig?: PillGroupLabelConfig;
  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  readonly labelTooltipConfig: DropdownConfig;
  /**
   * Contains the pill group `aria-` props. `label` names the group when it has no visible label (`labelConfig`).
   */
  readonly ariaProps: WppPillGroupAriaProps;
  /**
   * Indicates locales for the pill group. Holds the `aria-roledescription` of a `draggable` group and the messages
   * announced to screen readers while reordering pills with the keyboard. Partial overrides are merged with the
   * English defaults.
   */
  readonly locales: Partial<PillGroupLocaleInterface>;
  /**
   * Emitted when the pill group value changes.
   */
  readonly wppChange: EventEmitter<PillGroupChangeEvent>;
  /**
   * Emitted when the pill group receives focus
   */
  readonly wppFocus: EventEmitter<FocusEvent>;
  /**
   * Emitted when the pill group loses focus
   */
  readonly wppBlur: EventEmitter<FocusEvent>;
  /**
   * Emitted when two pills need to swap places, either through native drag and drop or through keyboard reordering.
   * The consumer is expected to move the item at `draggedIndex` to `toIndex`.
   */
  readonly wppReorderList: EventEmitter<PillGroupReorderListEvent>;
  handleClick(event: CustomEvent<PillChangeEventDetail>): void;
  handleClose(event: CustomEvent<Event>): void;
  onValueChange(): void;
  componentWillLoad(): void;
  componentDidLoad(): void;
  disconnectedCallback(): void;
  private get _locales();
  private setActivePill;
  private updatePill;
  private updateAriaPropsOfPill;
  private handleSlotChange;
  /**
   * Removing a pill destroys the remove icon that had focus. After a keyboard removal, focus moves to the closest pill
   * that can take it: the one that took the removed pill's place or the ones after it, then the ones before it (disabled
   * pills are skipped). With none left, the group itself takes focus, so keyboard users never lose their place.
   */
  private focusPillAfterRemoval;
  private getGroupRole;
  private handleKeyDown;
  private handleFocusin;
  private handleFocusout;
  /**
   * This function is called only when the pill group type is `single`.
   * Used to retrieve the index of the pill that is the group's only tab stop: the checked pill, or the first
   * non-disabled pill when no enabled pill is checked (`value` is empty, `null`, matches no pill or a disabled pill).
   * This way the group always stays reachable with the keyboard.
   */
  private getCurrentIndex;
  /**
   * This function is called only when the pill group type is `single`.
   * Used to get the next available pill index, based on the direction. Disabled items are ignored.
   */
  private getNextIndex;
  /**
   * This function is called only when the pill group type is `single`.
   * It searches for next non-disabled pill, based on direction, and sets focus to that pill.
   * As for type `single` we follow the accessibility pattern for radio group, we also check the pill.
   */
  private focusAndCheckNextPill;
  private handleMouseDown;
  private isGrabbedPill;
  /**
   * Text used to identify a pill in the screen reader announcements: the `label` prop, the slotted text, or the value.
   */
  private getPillLabel;
  /**
   * This function is called only when type is `draggable`. Grabs the pill, remembers where it was and announces it.
   */
  private grabPill;
  /**
   * This function is called only when type is `draggable`. Releases the pill at its current position and announces it.
   */
  private dropPill;
  /**
   * This function is called only when type is `draggable`. Releases the pill and, if it was moved, asks the consumer
   * to put it back to the position it had when it was grabbed.
   */
  private cancelMove;
  /**
   * This function is called only when type is `draggable` and finds the index of the next pill
   * that will swap places with the pill that is dragged.
   */
  private getToIndex;
  /**
   * This function is called only when type is `draggable` and emits the indexes of the 2 pills that need
   * to get swapped.
   */
  private reorderPills;
  /**
   * This function is called only when the type is `draggable`.
   * Used to keep track of the `value` of the grabbed pill and to add / remove its grabbed state.
   */
  private togglePillGrab;
  /**
   * This function is called only when the type is `draggable`.
   * Toggles the `data-grabbed` attribute used to style the grabbed pill. The grab itself is conveyed to assistive
   * technology through the live region announcements (`aria-grabbed` is deprecated and was removed in ARIA 1.2).
   */
  private setPillGrabbed;
  private isPill;
  private handleDragStart;
  private handleDragOver;
  private handleDragEnd;
  private hostCssClasses;
  render(): any;
}
