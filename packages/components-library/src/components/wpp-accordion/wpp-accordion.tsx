import { Component, Host, h, Prop, Event, EventEmitter, State, Element, Watch, Method, Fragment } from '@stencil/core'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'
import { FOCUS_TYPE } from '../../types/common'

import { AccordionSectionChangeEventDetail, AccordionTabElements } from './types'
import { getSlotEmptyStates, transformToVersionedTag } from '../../utils/utils'

interface FocusType {
  wrapper: FOCUS_TYPE
  slot: FOCUS_TYPE
}

const getInitFocusInfo = (): FocusType => ({
  wrapper: FOCUS_TYPE.NONE,
  slot: FOCUS_TYPE.NONE,
})

/**
 * @slot header - content that is placed inside the header section
 * @slot actions - Content is placed inside the `.actions` element and add content to actions.
 * @slot tags - Content that is placed inside the `.tags` to display contextual tags.
 *
 * @part section - Defines the accordion top wrapper.
 * @part title-wrapper - Defines wrapper that contains title and chevron.
 * @part title - Defines accordion title.
 * @part icon - Defines accordion icon chevron.
 * @part counter - Defines accordion counter.
 * @part divider - Defines accordion divider.
 * @part ws-wrapper - Content slot wrapper element
 * @part ws-inner - Content slot element
 */
@Component({
  tag: 'wpp-accordion',
  styleUrl: 'wpp-accordion.scss',
  shadow: true,
})
export class WppAccordion {
  private resizeObserver: ResizeObserver
  private expandedTimeout: ReturnType<typeof setTimeout>
  private textWidthCanvas?: HTMLCanvasElement
  private prevTextContent: string = ''
  private prevFont: string = ''
  private cachedTextWidth: number = 0

  @Element() host: HTMLWppAccordionElement

  @State() maxHeight: number
  @State() toggleOverflow: boolean
  @State() focusType: FocusType = getInitFocusInfo()
  @State() hasHeaderSlot: boolean = false
  @State() hasActionsSlot: boolean = false
  @State() actionsWrapperWidth?: number
  @State() tagGroupWrapperWidth?: number
  @State() isExpandedTouched?: boolean = false
  @State() hasTagSlot: boolean = false
  @State() isTitleOverflowing: boolean = false
  @State() titleMaxWidth: number

  /**
   * If the component is expanded by default. Enabling this prop prevents users from expanding the accordion and removes the initial expansion animation.
   */
  @Prop({ reflect: true }) readonly expandedByDefault: boolean = false

  /**
   * If the component is expanded.
   */
  @Prop({ reflect: true, mutable: true }) expanded: boolean = false

  /**
   * If the component is disabled.
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If the component has a divider at the bottom.
   */
  @Prop({ reflect: true }) readonly withDivider: boolean = true

  /**
   * Defines the number of elements within a specific section.
   *
   * @deprecated - this prop will be deleted in version 4.0.0.
   */
  @Prop() readonly counter: number = 0

  /**
   * Defines the section size.
   */
  @Prop() readonly size: 's' | 'm' | 'l' | 'xl' | '2xl' = 'l'

  /**
   * If set, adds text next to the section.
   *
   * @deprecated - this prop will be deleted in version 4.0.0. If you want to use this prop, use "header" slot instead
   */
  @Prop() readonly text?: string

  /**
   * If set to true, displays `Tag` next to the section. The tag must placed in the `.tags` slot.
   */
  @Prop({ reflect: true }) readonly withTag: boolean = false

  /**
   * Emitted when the expanded state changes.
   */
  @Event({ bubbles: false, composed: false }) wppChange: EventEmitter<AccordionSectionChangeEventDetail>

  /**
   * Emitted when a section is in focus.
   */
  @Event({ bubbles: false, composed: false }) wppFocus: EventEmitter<FocusEvent>

  /**
   * Emitted when a section loses focus.
   */
  @Event({ bubbles: false, composed: false }) wppBlur: EventEmitter<FocusEvent>

  @Watch('expanded')
  updateOverflow(expanded: boolean) {
    if (expanded) {
      this.expandedTimeout = setTimeout(() => {
        this.toggleOverflow = expanded
      }, this.calcAnimationTime())
    } else {
      clearTimeout(this.expandedTimeout)

      this.toggleOverflow = expanded
    }
  }

  /**
   * Calculate the height of the content for the accordion.
   */
  @Method()
  async updateHeight() {
    this.getContentHeight()
  }

  componentWillLoad() {
    this.toggleOverflow = !this.expanded && !this.disabled

    if (this.expandedByDefault && !this.disabled) this.expanded = true
    this.updateOverflow(this.expanded)
    this.updateSlotData()
  }

  componentDidLoad() {
    const slotWrapper = (this.host.shadowRoot as ShadowRoot).querySelector('.slot-content') as HTMLSlotElement

    this.getContentHeight()

    this.resizeObserver = new ResizeObserver(() => {
      this.getContentHeight()
    })

    if (this.resizeObserver) {
      this.resizeObserver.observe(slotWrapper)
      this.resizeObserver.observe(this.host)
    }

    this.checkTitleOverflow()
  }

  componentDidUpdate() {
    this.checkTitleOverflow()
  }

  disconnectedCallback() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect()
    }
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      actions: '[slot="actions"]',
      header: '[slot="header"]',
      tags: '[slot="tags"]',
    })

    this.hasActionsSlot = !emptyStates.actions
    this.hasHeaderSlot = !emptyStates.header
    this.hasTagSlot = !emptyStates.tags

    if (!emptyStates.tags && this.disabled) {
      const tagEl = this.host?.querySelector(transformToVersionedTag('wpp-tag').toUpperCase()) as HTMLWppTagElement

      tagEl.setAttribute('disabled', this.disabled.toString())
    }

    this.getContentHeight()
  }

  private getUpdatedFocusInfo = (type: AccordionTabElements, updateValue: FOCUS_TYPE): FocusType => ({
    ...this.focusType,
    [type]: updateValue,
  })

  private getContentHeight = () => {
    requestAnimationFrame(() => {
      this.actionsWrapperWidth = (this.host.shadowRoot as ShadowRoot).querySelector('.actions')?.clientWidth || 0
      const tagsWrapper = (this.host.shadowRoot as ShadowRoot).querySelector('.tags') as HTMLElement

      this.tagGroupWrapperWidth = tagsWrapper?.clientWidth || 0

      const gaps = this.hasActionsSlot && this.hasTagSlot ? 16 : this.hasActionsSlot || this.hasTagSlot ? 8 : 0
      const usedWidth = this.actionsWrapperWidth + this.tagGroupWrapperWidth + gaps
      const titleWrapperMaxWidth = this.host.clientWidth - usedWidth

      //Removing the icon + margin width
      this.titleMaxWidth = titleWrapperMaxWidth - 28

      const titleWrapper = (this.host.shadowRoot as ShadowRoot).querySelector('.title-wrapper') as HTMLElement

      if (titleWrapper) {
        titleWrapper.style.maxWidth = `${titleWrapperMaxWidth}px`
      }

      const titleWrapperWidth = titleWrapper?.clientWidth || 0

      if (this.hasTagSlot && tagsWrapper) {
        // Add an 8px gap if there's a title
        const leftPosition = titleWrapperWidth + (this.text || this.hasHeaderSlot ? 8 : 0)

        tagsWrapper.style.left = `${leftPosition}px`
      }

      this.maxHeight = (this.host.shadowRoot as ShadowRoot).querySelector('.slot-content')?.clientHeight || 0

      this.checkTitleOverflow()
    })
  }

  private typographyType = () => {
    if (this.size === 's') return 's-strong'
    if (this.size === 'm') return 'm-strong'
    if (this.size === 'l') return 'l-strong'
    if (this.size === 'xl') return 'xl-heading'
    if (this.size === '2xl') return '2xl-heading'
  }

  private counterType = () => {
    if (this.size === 's') return 's-body'
    if (this.size === 'm') return 'm-body'
    if (this.size === 'l') return 'l-body'
    if (this.size === 'xl') return 'xl-heading'
    if (this.size === '2xl') return '2xl-heading'
  }

  private onClick = (event: Event) => {
    if (this.disabled) {
      event.preventDefault()

      return
    }

    event.preventDefault()
    this.expanded = !this.expanded
    if (!this.isExpandedTouched) this.isExpandedTouched = true
    this.wppChange.emit({
      expanded: this.expanded,
    })
  }

  private onFocus = (event: FocusEvent) => {
    this.wppFocus.emit(event)
  }

  private onBlur = (event: FocusEvent): void => {
    this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.NONE)
    this.focusType = this.getUpdatedFocusInfo('slot', FOCUS_TYPE.NONE)

    this.wppBlur.emit(event)
  }

  private onMouseDown = () => {
    this.focusType = this.getUpdatedFocusInfo('wrapper', FOCUS_TYPE.MOUSE)
    this.focusType = this.getUpdatedFocusInfo('slot', FOCUS_TYPE.MOUSE)
  }

  private onKeyUp = (event: KeyboardEvent, type: AccordionTabElements) => {
    if (event.key === 'Tab') {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB)
    }
  }

  private hostCssClasses = (isInternal: boolean) => ({
    'wpp-accordion': true,
    'wpp-section-wrapper': true,
    'wpp-disabled': this.disabled,
    'wpp-internal': isInternal,
  })

  private cssClasses = () => ({
    'wpp-section': true,
    disabled: this.disabled,
    'tab-focus': this.focusType.wrapper === FOCUS_TYPE.TAB && this.focusType.slot !== FOCUS_TYPE.TAB,
    [`size-${this.size}`]: true,
  })

  private contentCssClasses = () => ({
    content: true,
    closed: !this.toggleOverflow,
  })

  private headerCssClasses = () => ({
    header: true,
    'slot-hidden': !this.hasHeaderSlot,
  })

  private actionsCssClasses = () => ({
    actions: true,
    'slot-hidden': !this.hasActionsSlot,
  })

  private calcAnimationTime = () => 500 + Math.floor(this.maxHeight / 100) * 15

  private getAnimationStyles = () => {
    // base time is 500ms, and each 100pixels adds 15ms to the animation duration
    const time = this.calcAnimationTime()
    const skipAnimation = this.expandedByDefault && this.expanded && !this.isExpandedTouched

    return {
      '--accordion-max-height': this.maxHeight + 'px',
      '--accordion-show-animation-duration': skipAnimation ? '0' : `${time}ms`,
      '--accordion-hide-animation-duration': time / 2.5 + 'ms',
    }
  }

  private get tabIndex() {
    return this.disabled ? -1 : 0
  }

  private tagGroupCssClasses = () => ({
    tags: true,
    'slot-hidden': !this.hasTagSlot,
  })

  private getTextWidth(text: string, font: string): number {
    const canvas = this.textWidthCanvas || (this.textWidthCanvas = document.createElement('canvas'))
    const context = canvas.getContext('2d')

    if (context) {
      context.font = font
      const metrics = context.measureText(text)

      return metrics.width
    }

    return 0
  }

  private getElementFontStyle(element: HTMLElement): string {
    const computedStyles = window.getComputedStyle(element)
    const fontWeight = computedStyles.getPropertyValue('--wpp-default-type-font-weight') || computedStyles.fontWeight
    const fontSize = computedStyles.getPropertyValue('--wpp-default-type-font-size') || computedStyles.fontSize
    const fontFamily = computedStyles.getPropertyValue('--wpp-default-type-font-family') || computedStyles.fontFamily
    const lineHeight = computedStyles.getPropertyValue('--wpp-default-type-line-height') || computedStyles.lineHeight

    return `${fontWeight} ${fontSize}/${lineHeight} ${fontFamily}`
  }

  private getHeaderSlotText(): { headerTitle: string; font: string } {
    const headerSlot = this.host.shadowRoot?.querySelector('slot[name="header"]') as HTMLSlotElement
    const assignedNodes = headerSlot?.assignedNodes({ flatten: true }) || []

    let textContent = ''
    let font = ''
    let fontRetrieved = false

    assignedNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        textContent += node.textContent
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement

        if (!fontRetrieved) {
          font = this.getElementFontStyle(element)
          fontRetrieved = true
        }

        textContent += element.innerText || element.textContent || ''
      }
    })

    return { headerTitle: textContent.trim(), font }
  }

  private getTextTitleFont(): string {
    const titleTextElement = this.host.shadowRoot?.querySelector('.title-text') as HTMLElement

    if (!titleTextElement) {
      return ''
    }

    return this.getElementFontStyle(titleTextElement)
  }

  private checkTitleOverflow = () => {
    requestAnimationFrame(() => {
      let textContent = ''
      let font = ''
      let textWidth = 0

      if (this.text) {
        textContent = this.text
        font = this.getTextTitleFont()
      } else if (this.hasHeaderSlot) {
        const headerData = this.getHeaderSlotText()

        textContent = headerData.headerTitle
        font = headerData.font
      } else {
        return
      }

      if (textContent !== this.prevTextContent || font !== this.prevFont) {
        this.prevTextContent = textContent
        this.prevFont = font
        this.cachedTextWidth = this.getTextWidth(textContent, font)
      }
      textWidth = this.cachedTextWidth

      const isOverflowing = textWidth > this.titleMaxWidth

      if (this.isTitleOverflowing !== isOverflowing) {
        this.isTitleOverflowing = isOverflowing
      }
    })
  }

  render() {
    const { headerTitle } = this.getHeaderSlotText()
    const internal = !!(this.host.children[0] as HTMLSlotElement)?.assignedElements
    const style = this.getAnimationStyles()
    const tooltipText =
      this.counter > 0 ? `${this.text || headerTitle} (${this.counter})` : this.text || headerTitle || ''
    const titleContent = (
      <Fragment>
        {this.hasHeaderSlot ? (
          <WrappedSlot wrapperClass={this.headerCssClasses()} name="header" onSlotchange={this.updateSlotData} />
        ) : (
          <wpp-typography type={this.typographyType()} part="title" class="title-text">
            {this.text}
          </wpp-typography>
        )}
      </Fragment>
    )

    return (
      <Host
        class={this.hostCssClasses(internal)}
        aria-expanded={this.expanded}
        role="treeitem"
        exportparts="section, title, icon, counter, divider, title-wrapper, content"
        onFocus={this.onFocus}
        onBlur={this.onBlur}
        onMouseDown={this.onMouseDown}
        aria-disabled={this.disabled}
        onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'wrapper')}
        style={style}
        tabIndex={this.tabIndex}
      >
        <div class={this.cssClasses()} part="section">
          <div class="title-tags-wrapper" onClick={this.onClick}>
            <div class="title-wrapper" part="title-wrapper">
              <wpp-icon-chevron part="icon" />
              {this.isTitleOverflowing ? <wpp-tooltip text={tooltipText}>{titleContent}</wpp-tooltip> : titleContent}
              {this.counter > 0 && (
                <wpp-typography
                  type={this.counterType()}
                  class="counter"
                  part="counter"
                >{`(${this.counter})`}</wpp-typography>
              )}
            </div>
            {this.withTag && (
              <WrappedSlot wrapperClass={this.tagGroupCssClasses()} name="tags" onSlotchange={this.updateSlotData} />
            )}
          </div>
          <WrappedSlot wrapperClass={this.actionsCssClasses()} name="actions" onSlotchange={this.updateSlotData} />
        </div>
        <div
          class={this.contentCssClasses()}
          part="content"
          onMouseDown={this.onMouseDown}
          onKeyUp={(event: KeyboardEvent) => this.onKeyUp(event, 'slot')}
        >
          <slot class="slot-content" />
        </div>
        {this.withDivider && <wpp-divider part="divider" />}
      </Host>
    )
  }
}
