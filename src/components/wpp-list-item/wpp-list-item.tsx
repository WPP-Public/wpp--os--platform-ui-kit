import {
  Component,
  Host,
  h,
  Element,
  State,
  Prop,
  Event,
  EventEmitter,
  Watch,
  Method,
  Fragment,
  Listen,
} from '@stencil/core'

import highlightWords from 'highlight-words'

import { WrappedSlot } from '../common/WrappedSlot/WrappedSlot'
import { debounce, getSlotEmptyStates, transformToVersionedTag, uuidv4 } from '../../utils/utils'

import { ContainerStateType, TooltipConfig, ListItemChangeEventDetail, ListItemState, ListValue } from './types'
import { EVENT_SOURCE, PRESENTATION_ROLE } from './const'
import { DropdownConfig } from '../../types/common'
import { TypographyType } from '../wpp-typography/types'
import { ThemeColorValue } from '../../../src/types/theme-tokens'
import { getThemeColor, isValidThemeColor } from './utils'

/**
 * @slot left - May contain an icon or avatar that will be placed before the label, e.g. a plus icon, avatar
 * @slot right - May contain an icon, text or tag, action button that will be placed after the label, e.g. a plus icon, action button
 * @slot label - Main text
 * @slot caption - Caption text
 * @slot subtitle - Subtitle text
 *
 * @part item - Wrapper that contains label, icon, caption
 * @part info-wrapper - Wrapper that contains left-icon, label and caption
 * @part body-wrapper - Wrapper that contains label and caption
 * @part checkbox - checkbox element
 */
@Component({
  tag: 'wpp-list-item',
  styleUrl: 'wpp-list-item.scss',
  shadow: true,
})
export class WppListItem {
  private tooltipId = uuidv4()
  private itemWrapper: string
  private eventSource: EVENT_SOURCE | null = null
  private hasRightSlotIcon: boolean = false
  private debouncedResizeHandler: () => void
  private previousLabelText: string = ''
  private labelObserver: MutationObserver

  protected wrapperRef?: HTMLDivElement

  protected highlightRef?: HTMLDivElement

  @Element() host: HTMLWppListItemElement

  @State() loading: boolean = true
  @State() mounted: boolean = false
  @State() hasCaptionSlot: boolean = false
  @State() hasLeftSlot: boolean = false
  @State() hasRightSlot: boolean = false
  @State() hasCaptionHighlight: boolean = false
  @State() hasTooltip: boolean = false
  @State() hasToggle: boolean = false
  @State() hasSubtitleSlot: boolean = false

  @State() componentState: ListItemState = {
    hover: false,
    active: false,
  }

  /**
   * Custom Typography for label text
   * @example
   * labelTypography={{ color: var(--wpp-brand-color), type: 's-midi' }}
   */
  @Prop({ reflect: true }) readonly labelTypography?: {
    color?: ThemeColorValue
    type?: TypographyType
  }

  /**
   * Custom Typography for caption text
   * @example
   * captionTypography={{ color: var(--wpp-warning-color-500), type: 's-caption' }}
   */
  @Prop({ reflect: true }) readonly captionTypography?: {
    color?: ThemeColorValue
    type?: TypographyType
  }

  /**
   * Indicates the value of list item
   */
  @Prop({ reflect: true }) readonly value?: ListValue

  /**
   * Indicates the label of list item
   */
  @Prop({ reflect: true }) readonly label?: string = ''

  /**
   * If `true`, the component is checked.
   */
  @Prop({ reflect: true, mutable: true }) checked: boolean = false

  /**
   * If the component is active.
   */
  @Prop({ reflect: true }) readonly active: boolean = false

  /**
   * If `true`, the component is selectable.
   */
  @Prop({ reflect: true }) readonly selectable: boolean = false

  /**
   * If `true`, the component is multiple.
   */
  @Prop({ reflect: true }) readonly multiple: boolean = false

  /**
   * If `true`, the component is disabled
   */
  @Prop({ reflect: true }) readonly disabled: boolean = false

  /**
   * If `true`, it will be used to highlight matching parts of the label or caption text in the component.
   */
  @Prop({ reflect: true }) readonly highlight: string = ''

  /**
   * Show if the item list container is visible.
   */
  @Prop({ attribute: 'container-state', reflect: true }) readonly containerState?: ContainerStateType

  /**
   * If the component is extended.
   */
  @Prop({ reflect: true }) readonly isExtended: boolean = false

  /**
   * Tooltip config for the slots.
   */
  @Prop() readonly tooltipConfig: TooltipConfig = {}

  /**
   * Configuration of tooltip's dropdown.
   */
  @Prop() readonly labelTooltipConfig: DropdownConfig = {}

  /**
   *  If you pass a href here menu-item will be rendered as a tag. This config allow you to customize link
   */
  @Prop() readonly linkConfig: {
    href?: string
    rel?: string
    target?: string
    onClick?: (e: PointerEvent) => void
  } = {}

  /**
   * If 'true', the component is hidden.
   *
   * @internal - This prop is controlled by Autocomplete
   */
  @Prop({ reflect: true, mutable: true }) hidden: boolean = false

  /**
   * If 'true', the component won't have hover effects.
   *
   * @internal - This prop is controlled by Autocomplete
   */
  @Prop({ reflect: true }) readonly isLoadingItem: boolean = false

  /**
   * If 'false', the component will have hover/active style states
   */
  @Prop({ reflect: true, mutable: true }) nonInteractive = false

  /**
   * Value for a name attribute on checkbox input
   * Used in WppSelect component
   */
  @Prop({ reflect: true }) readonly checkboxName?: string

  /**
   * Emitted when the list item was clicked
   */
  @Event({ bubbles: false, composed: false }) wppChangeListItem: EventEmitter<ListItemChangeEventDetail>

  /**
   * Sets focus on the list-item element.
   */
  @Method()
  async setFocus(): Promise<void> {
    setTimeout(() => {
      this.host.focus()
    }, 0)
  }

  @Listen('resize', { target: 'window' })
  onResize() {
    if (this.debouncedResizeHandler) {
      this.debouncedResizeHandler()
    }
  }

  @Watch('labelTypography')
  typographyLabel() {
    this.applyTypographyVariables('label', this.labelTypography || {})
  }

  @Watch('captionTypography')
  typographyCaption() {
    this.applyTypographyVariables('caption', this.captionTypography || {})
  }

  componentWillLoad() {
    this.updateSlotData()

    setTimeout(() => {
      this.hasRightSlotIcon = !!this.host.querySelector('[slot="right"].wpp-icon')
    }, 0)

    setTimeout(() => {
      this.hasToggle = !!this.host.querySelector('[slot="right"].wpp-toggle')
    }, 0)

    this.debouncedResizeHandler = debounce(() => {
      this.checkHasTooltip()
    }, 50)
  }

  componentDidLoad() {
    this.handleComponentMount()
    this.setupLabelContentObserver()
    this.removeTriggerWrapperAttributes()
    this.typographyLabel()
    this.typographyCaption()
  }

  private applyTypographyVariables(slotName: string, props?: { type?: TypographyType; color?: string }) {
    if (!props) return
    const prefix = `--wpp-list-item-${slotName}`
    const cssAttrs = ['font-weight', 'font-size', 'font-family', 'line-height', 'letter-spacing', 'text-transform']

    if (props.type) {
      cssAttrs.forEach(attr => {
        const varName = `--wpp-typography-${props.type}-${attr}`
        let value = getComputedStyle(this.host).getPropertyValue(varName).trim()

        if (!value) value = getComputedStyle(document.body).getPropertyValue(varName).trim()
        if (value) this.host.style.setProperty(`${prefix}-${attr}`, value)
      })
    }

    // Only apply custom color if the component is not disabled
    if (props.color && !this.disabled) {
      // Validate and normalize the color
      const normalizedColor = getThemeColor(props.color)

      if (!isValidThemeColor(props.color)) {
        console.warn(
          `[WppListItem] Using non-theme color "${props.color}". ` +
            `Consider using theme colors CSS variables like "var(--wpp-brand-color)"`,
        )
      }

      this.host.style.setProperty(`${prefix}-color`, normalizedColor)
    } else if (this.disabled && props.color) {
      // Remove custom color when disabled to let the disabled state color take effect
      this.host.style.removeProperty(`${prefix}-color`)
    }
  }

  private removeTriggerWrapperAttributes = () => {
    const menuContextTag = transformToVersionedTag('wpp-menu-context').toUpperCase()
    const menuContext = this.host.querySelector(`${menuContextTag}[slot="right"]`) as HTMLElement

    if (menuContext) {
      let triggerWrapper = menuContext.querySelector('.trigger-wrapper') as HTMLElement

      if (triggerWrapper) {
        triggerWrapper.removeAttribute('tabindex')
        triggerWrapper.removeAttribute('role')
      } else {
        const observer = new MutationObserver(() => {
          triggerWrapper = menuContext.querySelector('.trigger-wrapper') as HTMLElement
          if (triggerWrapper) {
            triggerWrapper.removeAttribute('tabindex')
            triggerWrapper.removeAttribute('role')
            observer.disconnect()
          }
        })

        observer.observe(menuContext, { childList: true, subtree: true })
      }
    }
  }

  disconnectedCallback() {
    this.tooltipId = uuidv4()

    if (this.labelObserver) {
      this.labelObserver.disconnect()
    }
  }

  @Watch('highlight')
  highlightUpdate(newValue: string) {
    const captionText = this.host.querySelector('[slot="caption"]')?.textContent || ''

    const chunks = highlightWords({
      text: captionText,
      query: newValue || '',
      matchExactly: true,
    })

    this.hasCaptionHighlight = chunks.some(el => el.match)
  }

  @Watch('containerState')
  handleViewChange(newContainerState: ContainerStateType) {
    if (newContainerState === 'shown') {
      this.mounted = false
      this.loading = false
      this.hasTooltip = false

      setTimeout(this.handleComponentMount, 100)
    }
    // Special state for a cases when we have list items inside context menu to trigger tooltip check
    if (newContainerState === 'tooltipTrigger') {
      requestAnimationFrame(this.checkHasTooltip)
    }
  }

  @Watch('disabled')
  disabledChanged() {
    this.typographyLabel()
    this.typographyCaption()
  }

  private setupLabelContentObserver = () => {
    const labelEl = this.host.querySelector('[slot="label"]')

    if (!labelEl) return

    // Create a new observer that will watch for text changes
    this.labelObserver = new MutationObserver(() => {
      const currentLabelText = labelEl.textContent || ''

      if (currentLabelText !== this.previousLabelText) {
        this.previousLabelText = currentLabelText
        this.updateSlotData()
        requestAnimationFrame(this.checkHasTooltip)
      }
    })

    // Configure the observer to watch for changes in text content and child nodes
    this.labelObserver.observe(labelEl, {
      characterData: true,
      childList: true,
      subtree: true,
    })
  }

  private checkHasTooltip = () => {
    let labelWrapper = this.host?.shadowRoot?.querySelector('[part="label-wrapper"]') as HTMLElement

    if (labelWrapper?.classList.contains('slot-hidden')) {
      labelWrapper = this.host?.shadowRoot?.querySelector('.highlight-text') as HTMLDivElement

      this.hasTooltip = labelWrapper.clientWidth < labelWrapper.scrollWidth

      return
    }

    const labelEl = this.host?.querySelector('[slot="label"]')

    if (!labelEl) return

    const textEl = labelEl?.shadowRoot?.querySelector('.typography')

    if (textEl) {
      this.hasTooltip = textEl.clientWidth < textEl.scrollWidth
    } else {
      this.hasTooltip = labelEl.clientWidth < labelEl.scrollWidth
    }
  }

  protected handleComponentMount = () => {
    this.mounted = true

    requestAnimationFrame(() => {
      this.checkHasTooltip()
    })

    this.loading = false
  }

  private getHighlightedText(slotName: string) {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`)

    const slotText = slotEl?.textContent || ''

    const chunks = highlightWords({
      text: slotText,
      query: this.highlight || '',
      matchExactly: true,
    })

    if (this.highlight && chunks.some(el => el.match)) {
      return (
        <span class="highlight-wrapper">
          {chunks.map(({ text, match }) =>
            match && !this.disabled ? (
              <span key={text} class="highlight" part="highlight">
                {text}
              </span>
            ) : (
              <span key={text}>{text}</span>
            ),
          )}
        </span>
      )
    }

    return slotText
  }

  private getSlotText = (slotName: string) => {
    const slotEl = this.host.querySelector(`[slot="${slotName}"]`)

    return slotEl?.textContent || ''
  }

  private subtitleSlotCssClasses = () => ({
    subtitle: true,
    'slot-hidden': !this.hasSubtitleSlot,
  })

  componentWillRender() {
    this.itemWrapper = this.linkConfig?.href ? 'a' : 'li'
  }

  private updateComponentState = (updateData: Partial<ListItemState>) => {
    if (this.nonInteractive) return
    this.componentState = {
      ...this.componentState,
      ...updateData,
    }
  }

  private updateSlotData = () => {
    const emptyStates = getSlotEmptyStates(this.host.childNodes, {
      caption: '[slot="caption"]',
      left: '[slot="left"]',
      right: '[slot="right"]',
      subtitle: '[slot="subtitle"]',
    })

    this.hasCaptionSlot = !emptyStates.caption
    this.hasLeftSlot = !emptyStates.left
    this.hasRightSlot = !emptyStates.right
    this.hasSubtitleSlot = !emptyStates.subtitle
  }

  private handleItemClick = () => {
    if (this.eventSource === EVENT_SOURCE.RIGHT_SLOT) {
      this.eventSource = null

      return
    }

    if (this.disabled || this.nonInteractive) return

    if (this.selectable && !this.nonInteractive) {
      this.checked = !this.checked
    }

    this.wppChangeListItem.emit({
      value: this.value,
      checked: this.checked,
      label: this.host.querySelector('[slot="label"]')?.textContent || '',
      target: this.host,
      isSelectBasedEvent: !!this.host.closest('.wpp-select-portal'),
      isAutocompleteBasedEvent: !!this.host.closest(transformToVersionedTag('wpp-autocomplete')),
    })
  }

  private handleRightWrapperClick = () => {
    this.eventSource = EVENT_SOURCE.RIGHT_SLOT
  }

  private hostCssClasses = () => ({
    'wpp-list-item': true,
    'wpp-disabled': this.disabled,
    'wpp-hidden': this.hidden,
    'wpp-mounted': this.mounted,
    'wpp-loading': this.loading,
  })

  private itemWrapperCssClasses = () => ({
    item: true,
    checked: this.checked,
    'has-toggle': this.hasToggle,
    selectable: this.selectable,
    multiple: this.multiple,
    disabled: this.disabled,
    'with-caption': this.hasCaptionSlot || this.hasCaptionHighlight,
    active: this.active,
    link: this.linkConfig?.href,
    'loading-item': this.isLoadingItem,
    'with-right-icon': this.hasRightSlotIcon,
    'non-interactive': this.nonInteractive,
  })

  private labelSlotCssClasses = () => ({
    label: true,
    'slot-hidden': Boolean(this.highlight),
    'custom-typography': !!this.labelTypography,
  })

  private leftSlotCssClasses = () => ({
    left: true,
    'slot-hidden': !this.hasLeftSlot,
  })

  private rightSlotCssClasses = () => ({
    right: true,
    'slot-hidden': !this.hasRightSlot && !this.isExtended && !this.active,
  })

  private captionSlotCssClasses = () => ({
    caption: true,
    'slot-hidden': !this.hasCaptionSlot || Boolean(this.highlight),
    'custom-typography': !!this.captionTypography,
  })

  private ulWrapperCssClasses = () => ({
    'ul-wrapper': true,
  })

  private renderBody = () => {
    const hasHighlight = Boolean(this.highlight)

    return (
      <div ref={ref => (this.wrapperRef = ref)} class="body-wrapper" part="body-wrapper" style={{ width: 'auto' }}>
        <WrappedSlot wrapperClass={this.labelSlotCssClasses()} name="label" onSlotchange={this.updateSlotData} />
        {hasHighlight && (
          <div class="label highlight-text-wrapper" ref={highlightRef => (this.highlightRef = highlightRef)}>
            <span class="highlight-text">{this.getHighlightedText('label')}</span>
          </div>
        )}

        <WrappedSlot wrapperClass={this.captionSlotCssClasses()} name="caption" onSlotchange={this.updateSlotData} />
        {hasHighlight && (
          <div class="caption">
            <span class="highlight-text">{this.getHighlightedText('caption')}</span>
          </div>
        )}
      </div>
    )
  }

  private renderRightSlot = () => (
    <WrappedSlot
      wrapperClass={this.rightSlotCssClasses()}
      name="right"
      onSlotchange={this.updateSlotData}
      onClick={this.handleRightWrapperClick}
    >
      {this.isExtended && <wpp-icon-chevron class="fallback-icon" size="s" part="icon-extended" />}
      {!this.isExtended && this.active && <wpp-icon-tick class="fallback-icon" part="icon-active" />}
    </WrappedSlot>
  )

  private renderLeftSlot = () => (
    <WrappedSlot wrapperClass={this.leftSlotCssClasses()} name="left" onSlotchange={this.updateSlotData} />
  )

  private handleMouseEnter = () => {
    this.updateComponentState({ hover: true })
  }

  private handleMouseLeave = () => {
    this.updateComponentState({ hover: false })
  }

  private handleMouseDown = () => {
    this.updateComponentState({ active: true })
  }

  private handleMouseUp = () => {
    this.updateComponentState({ active: false })
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    if (this.disabled || this.nonInteractive) return

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      this.handleItemClick()
    }
  }

  render() {
    const displayState = this.componentState.active ? 'active' : this.componentState.hover ? 'hover' : ''
    const tabIndex = this.disabled ? -1 : this.nonInteractive ? -1 : 0

    return (
      <Host
        class={this.hostCssClasses()}
        role={PRESENTATION_ROLE}
        exportparts="item, info-wrapper, checkbox, body-wrapper, left, label, caption, right, left-wrapper, label-wrapper, caption-wrapper, right-wrapper"
        tabIndex={tabIndex}
      >
        {this.hasSubtitleSlot && (
          <WrappedSlot
            wrapperClass={this.subtitleSlotCssClasses()}
            name="subtitle"
            onSlotchange={this.updateSlotData}
          />
        )}

        <ul
          onClick={this.handleItemClick}
          onKeyDown={this.handleKeyDown}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          class={this.ulWrapperCssClasses()}
          part="ul-wrapper"
        >
          <this.itemWrapper
            class={this.itemWrapperCssClasses()}
            part="item"
            {...(this.linkConfig?.href && this.linkConfig)}
          >
            <div class="info-wrapper" part="info-wrapper">
              {this.multiple ? (
                <wpp-checkbox
                  disabled={this.disabled}
                  checked={this.checked}
                  internalState={displayState}
                  part="checkbox"
                  name={this.checkboxName || 'wpp-list-item-checkbox'}
                />
              ) : (
                <Fragment>
                  {this.tooltipConfig.leftSlot ? (
                    <wpp-tooltip
                      key={this.tooltipId}
                      header={this.tooltipConfig.leftSlot.header}
                      text={this.tooltipConfig.leftSlot.text}
                      value={this.tooltipConfig.leftSlot.value}
                      error={this.tooltipConfig.leftSlot.error}
                      theme={this.tooltipConfig.leftSlot.theme}
                      config={this.tooltipConfig.leftSlot.config}
                      externalClass={this.tooltipConfig.leftSlot.externalClass}
                    >
                      {this.renderLeftSlot()}
                    </wpp-tooltip>
                  ) : (
                    this.renderLeftSlot()
                  )}
                </Fragment>
              )}

              {this.hasTooltip ? (
                <wpp-tooltip
                  text={this.getSlotText('label')}
                  config={{ placement: 'right', ...this.labelTooltipConfig }}
                  class="tooltip"
                >
                  {this.renderBody()}
                </wpp-tooltip>
              ) : (
                this.renderBody()
              )}
            </div>

            {this.tooltipConfig.rightSlot ? (
              <wpp-tooltip
                key={this.tooltipId}
                header={this.tooltipConfig.rightSlot.header}
                text={this.tooltipConfig.rightSlot.text}
                value={this.tooltipConfig.rightSlot.value}
                error={this.tooltipConfig.rightSlot.error}
                theme={this.tooltipConfig.rightSlot.theme}
                config={this.tooltipConfig.rightSlot.config}
                externalClass={this.tooltipConfig.rightSlot.externalClass}
              >
                {this.renderRightSlot()}
              </wpp-tooltip>
            ) : (
              this.renderRightSlot()
            )}
          </this.itemWrapper>
        </ul>
      </Host>
    )
  }
}
