import { Component, Host, h, Prop, Element, Watch, State } from '@stencil/core'
import isEqual from 'lodash/isEqual'

import { Instance } from 'tippy.js'

import { AriaProps, DropdownConfig } from '../../types/common'

import { menuListConfig as tooltipConfig } from '../../common/menuListConfig'

import { ArrowBgColor, ReferenceComponentElement, TooltipThemeTypes } from './types'
import { cssStyles } from './const'
import { defaultTooltipConfig } from './config'
import { isWppElement } from '../../utils/utils'

/**
 * @slot - Can contain the tooltip anchor content. The default slot, without the name attribute.
 * @slot tooltip-content - Contains the custom content the user gives to the tooltip. To use this slot, you also have to pass `allowHTML: true` to the `config` property. Do not use WPP components (except WppTypography) in this slot.
 */
@Component({
  tag: 'wpp-tooltip',
  styleUrl: 'wpp-tooltip.scss',
  shadow: true,
})
export class WppTooltip {
  private anchorRef?: HTMLDivElement
  private slotRef?: Element
  private contentEl?: HTMLElement
  private customContentEl?: HTMLElement
  private tippyInstance?: Instance
  private arrowColor: ArrowBgColor = {}
  private readonly FORBIDDEN_PREFIX = 'wpp-'
  private readonly ALLOWED_TAGS = ['wpp-typography']

  @Element() host: HTMLWppTooltipElement

  @State() hidden: boolean = true
  @State() style: Record<string, string> = {}

  /**
   * If set, disables the tooltip.
   * @internal - This prop is for internal use only.
   */
  @Prop() readonly disabled: boolean = false

  /**
   * Defines the tooltip title.
   */
  @Prop() readonly header?: string

  /**
   * Defines the main tooltip message.
   */
  @Prop() readonly text?: string

  /**
   * If set, adds a value row under the main message.
   */
  @Prop() readonly value?: string

  /**
   * If the tooltip is styled as an error.
   */
  @Prop() readonly error: boolean = false

  /**
   * If the tooltip is styled as a warning.
   */
  @Prop() readonly warning: boolean = false

  /**
   * Sets the word breaking behaviour. By default, it is "break-word", meaning the words
   * will be broken if there is not enough space and a hyphen ("-") is added. The other option
   * is "break-all", which breaks the word but does not add the hyphen.
   */
  @Prop() readonly wordBreak?: 'break-word' | 'break-all' | 'auto-phrase' = 'break-word'

  /**
   * Defines the tooltip theme.
   */
  @Prop() readonly theme: TooltipThemeTypes = 'dark'

  /**
   * Defines the dropdown configuration. Under the hood dropdown using tippy.js,
   * all information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`
   */
  @Prop({ mutable: true }) config: DropdownConfig = {}

  /**
   * Add an external class to the tooltip wrapper. This class will be applied to this wrapper that placed in tippy box that appended to the body.
   * To add some properties to this class you have to add this class to global styles, for example
   * .tooltip-wrapper.external-class-name {
   *  ...
   * }
   */
  @Prop() readonly externalClass: string = ''

  /**
   * Defines the dropdown's width. The maximum width of the dropdown is 350px.
   */
  @Prop({ reflect: true }) readonly dropdownWidth: 'auto' | string = 'auto'

  /**
   * Contains the button `aria-` props.
   */
  @Prop() readonly ariaProps: AriaProps = {}

  /**
   * If set, makes the tooltip anchor focusable. Default is false.
   * @internal - This prop is for internal use only.
   */
  @Prop() readonly anchorTabIndex: number = 0

  @Watch('config')
  updateConfig(newConfig: DropdownConfig, oldConfig: DropdownConfig) {
    if (!isEqual(newConfig, oldConfig)) {
      this.config = newConfig

      this.tippyInstance?.setProps(newConfig)
    }
  }

  @Watch('theme')
  @Watch('error')
  @Watch('warning')
  updateTheme() {
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    })

    this.tippyInstance?.popperInstance?.update()
  }

  @Watch('text')
  textChanged(newText: string, oldText: string) {
    if (newText !== oldText && this.contentEl) {
      const contentEl = this.contentEl as HTMLWppInternalTooltipElement

      contentEl.text = newText

      requestAnimationFrame(() => {
        this.tippyInstance?.setProps({
          placement: this.config.placement || 'top',
        })
        this.tippyInstance?.popperInstance?.update()
      })
    }
  }

  @Watch('disabled')
  handleDisabledChange(newDisabled: boolean) {
    if (newDisabled) {
      if (this.tippyInstance) {
        this.tippyInstance.destroy()
        this.tippyInstance = undefined
      }
    } else {
      this.getCssValues()
      this.createTippyInstance()
    }
  }

  componentWillLoad() {
    if (this.config.allowHTML) {
      const content = this.host?.querySelector('[slot="tooltip-content"]')

      if (content) {
        const validateElement = (element: Element) => {
          element.childNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              const tagName = (node as Element).tagName.toLowerCase()

              if (tagName.startsWith(this.FORBIDDEN_PREFIX) && !this.ALLOWED_TAGS.some(el => tagName.startsWith(el))) {
                console.warn(`WPP components are not allowed in WppTooltip, except for: ${this.transformAllowedTags()}`)
              }

              validateElement(node as Element)
            }
          })
        }

        validateElement(content)
      }
    }
  }

  private handleSlotChange = () => {
    if (this.slotRef) {
      // Get all assigned elements from the slot
      const slot = this.slotRef as HTMLSlotElement
      const assignedElements = slot.assignedElements()

      this.anchorRef = (assignedElements as HTMLDivElement[])[0]
    }
  }

  componentDidLoad() {
    setTimeout(() => {
      this.getCssValues()
      this.createTippyInstance()

      this.hidden = false
    }, 0)

    if (this.config.allowHTML) {
      const content = this.host.querySelector('[slot="tooltip-content"]')

      if (content && this.customContentEl) {
        this.customContentEl.appendChild(content)
      }
    }
  }

  disconnectedCallback() {
    this.tippyInstance?.destroy()
  }

  connectedCallback() {
    this.getCssValues()
    this.tippyInstance?.setProps({
      arrow: this.arrowSVG(),
    })

    if (this.tippyInstance?.state.isDestroyed) {
      this.createTippyInstance()
    }
  }

  private transformAllowedTags = () =>
    this.ALLOWED_TAGS.map(el =>
      el
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(''),
    )

  private arrowSVG = () => {
    const arrowSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg')

    arrowSVG.setAttribute('width', '8')
    arrowSVG.setAttribute('height', '4')

    const arrowPath = document.createElementNS('http://www.w3.org/2000/svg', 'path')

    arrowPath.setAttribute('fill', this.getArrowBgColor() as string)
    arrowPath.setAttribute('fill-rule', 'evenodd')
    arrowPath.setAttribute('clip-rule', 'evenodd')
    arrowPath.setAttribute(
      'd',
      'M3.29289 0.707106C3.68342 0.316582 4.31658 0.316583 4.70711 0.707107L8 4L0 4L3.29289 0.707106Z',
    )

    arrowSVG.appendChild(arrowPath)

    return arrowSVG
  }

  private createTippyInstance = () => {
    if (this.disabled) {
      return
    }

    const content = this.config.allowHTML ? this.customContentEl : this.contentEl

    if (this.anchorRef && content) {
      this.tippyInstance = tooltipConfig({
        anchor: this.anchorRef,
        content,
        triggerElementWidth: false,
        arrow: this.arrowSVG(),
        hideOnEsc: true,
        aria: {
          expanded: undefined,
        },
        ...defaultTooltipConfig,
        ...this.config,
        onMount(instance: Instance) {
          const referenceElement = instance.reference as ReferenceComponentElement

          if (!referenceElement) return

          if (isWppElement(referenceElement)) {
            referenceElement.ariaProps = {
              ...referenceElement.ariaProps,
              describedby: `tippy-${instance.id}`,
            }
          } else {
            referenceElement.setAttribute('aria-describedby', `tippy-${instance.id}`)
          }
        },
        onHide(instance: Instance) {
          const referenceElement = instance.reference as ReferenceComponentElement

          if (!referenceElement) return

          if (isWppElement(referenceElement)) {
            const { describedby, ...restProps } = referenceElement.ariaProps

            referenceElement.ariaProps = restProps
          } else {
            referenceElement.removeAttribute('aria-describedby')
          }
        },
        onShow: (instance: Instance) => {
          if (this.dropdownWidth !== 'auto') {
            instance.popper.style.width = this.dropdownWidth
            instance.popper.style.maxWidth = this.dropdownWidth
          } else {
            instance.popper.style.maxWidth = '350px'
          }

          if (this.config.onShow) {
            return this.config.onShow(instance)
          }
        },
        popperOptions: {
          ...(this.config.popperOptions || {}),
          modifiers: [
            {
              name: 'autoUpdate',
              enabled: true,
            },
            ...((this.config.popperOptions?.modifiers as Record<string, unknown>[]) || []),
          ],
        },
      })
    }
  }

  private getArrowBgColor = () => {
    const currColor = this.error ? 'error' : this.warning ? 'warning' : this.theme
    const colorKeys: (keyof ArrowBgColor)[] = ['dark', 'light', 'error', 'warning']

    for (const colorKey of colorKeys) {
      if (!this.arrowColor[colorKey]) {
        this.arrowColor[colorKey] = getComputedStyle(this.host).getPropertyValue(`--tooltip-${colorKey}-bg-color`)
      }
    }

    return getComputedStyle(this.host).getPropertyValue(`--tooltip-${currColor}-bg-color`) || this.arrowColor[currColor]
  }

  private getCssValues = () => {
    const cssVariableNames = Object.keys(cssStyles)
    const updatedCssStyles: Record<string, string> = {}

    cssVariableNames.forEach(cssVariable => {
      const computedValue = getComputedStyle(this.host).getPropertyValue(cssVariable)
      const internalKey = `--internal-${cssVariable.substring(2)}`

      updatedCssStyles[internalKey] = computedValue
    })

    this.style = updatedCssStyles
  }

  private hostCssClasses = () => ({
    'wpp-tooltip': true,
  })

  private contentWrapperCssClasses = () => ({
    'content-wrapper': true,
    hidden: this.hidden || this.disabled,
  })

  render() {
    return (
      <Host class={this.hostCssClasses()} role="presentation">
        <div
          aria-label={this.ariaProps?.label}
          part="anchor"
          class="anchor"
          {...(this.anchorTabIndex ? { tabIndex: this.anchorTabIndex } : {})}
        >
          <slot
            part="inner"
            ref={(slotRef: Element | undefined) => (this.slotRef = slotRef)}
            onSlotchange={this.handleSlotChange}
          />
        </div>

        <div class={this.contentWrapperCssClasses()}>
          {!this.config.allowHTML ? (
            <wpp-internal-tooltip
              cssStyle={this.style}
              ref={contentEl => (this.contentEl = contentEl)}
              header={this.header}
              text={this.text}
              value={this.value}
              error={this.error}
              wordBreak={this.wordBreak}
              warning={this.warning}
              theme={this.theme}
              externalClass={this.externalClass}
              ariaProp={this.ariaProps}
            />
          ) : (
            <div
              ref={customContentEl => (this.customContentEl = customContentEl)}
              class={`tooltip-custom-content ${this.theme}`}
              id={this.ariaProps?.describedby}
            ></div>
          )}
        </div>
      </Host>
    )
  }
}
