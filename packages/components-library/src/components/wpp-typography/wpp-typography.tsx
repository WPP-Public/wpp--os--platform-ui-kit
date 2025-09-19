import { Component, h, Prop, Host, Element, Watch } from '@stencil/core'

import { TypographyType } from './types'
import { CSS_ATTRIBUTES, PREFIX_FOR_TYPE, VARIABLE_PREFIX } from './consts'

/**
 * @part typography - Main content wrapper element
 * @part inner - Content slot element
 */
@Component({
  tag: 'wpp-typography',
  styleUrl: 'wpp-typography.scss',
  shadow: true,
})
export class WppTypography {
  @Element() host: HTMLWppTypographyElement

  /**
   * Defines the typography style.
   */
  @Prop({ reflect: true }) readonly type: TypographyType = 'm-body'

  /**
   * Defines the typography semantic tag.
   */
  @Prop() readonly tag: 'span' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' = 'span'

  @Watch('type')
  handleTypeChange() {
    this.getTypographyStylesFromTheme()
    this.updateTypographyClasses()
  }

  componentWillLoad() {
    this.getTypographyStylesFromTheme()
    this.updateTypographyClasses()
  }

  private updateTypographyClasses = () => {
    const fontStyle = getComputedStyle(this.host).getPropertyValue('--wpp-typography-font-style').trim()

    if (fontStyle === 'italic') {
      this.host.classList.add('italic')
    } else {
      this.host.classList.remove('italic')
    }
  }

  private getAvailableTypeFromTheme = () => {
    const typeParts = this.type.split('-')
    const CSSVariable = `${VARIABLE_PREFIX}-${this.type}-font-size`

    if (
      getComputedStyle(this.host).getPropertyValue(CSSVariable) ||
      getComputedStyle(document.body).getPropertyValue(CSSVariable)
    ) {
      return this.type
    }

    if (['9xl', '8xl', '7xl', '6xl'].includes(typeParts[0])) {
      return '5xl-display'
    }

    if (typeParts.length === 3) {
      return `${typeParts[0]}-${typeParts[1]}`
    }

    if (typeParts.length === 2 && ['light', 'emphasis'].includes(typeParts[1])) {
      return `${typeParts[0]}-body`
    }

    return this.type
  }

  private getTypographyStylesFromTheme = () => {
    const typographyStyles: Record<string, string> = {}
    const availableType = this.getAvailableTypeFromTheme()

    CSS_ATTRIBUTES.forEach((attribute: string) => {
      const cssVariableName = `${VARIABLE_PREFIX}-${availableType}-${attribute}`
      let propertyValue

      if (getComputedStyle(this.host).getPropertyValue(cssVariableName).trim()) {
        propertyValue = getComputedStyle(this.host).getPropertyValue(cssVariableName).trim()
      } else {
        propertyValue = getComputedStyle(document.body).getPropertyValue(cssVariableName).trim()
      }

      typographyStyles[`${PREFIX_FOR_TYPE}-${attribute}`] = propertyValue
    })

    Object.entries(typographyStyles).forEach(([property, value]) => {
      this.host.style.setProperty(property, value)
    })
  }

  private typographyCssClasses = () => ({
    typography: true,
    italic: this.host.classList.contains('italic'),
  })

  render() {
    const TypographyTag = this.tag

    return (
      <Host class="wpp-typography" exportparts="typography, inner">
        <TypographyTag class={this.typographyCssClasses()} part="typography" exportparts="typography">
          <slot part="inner" />
        </TypographyTag>
      </Host>
    )
  }
}
