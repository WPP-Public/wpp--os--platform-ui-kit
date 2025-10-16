import { Component, Element, h, Host, Prop } from '@stencil/core'

import { RangeOf } from '../../types/numberRange'

import { AlignItemsType, DirectionType, JustifyContentType } from './types'

/**
 * @part inner - Content slot element
 */

@Component({
  tag: 'wpp-grid',
  styleUrl: 'wpp-grid.scss',
  shadow: true,
})
export class WppGrid {
  @Element() host: HTMLWppGridElement

  /**
   If the component is a grid container.
   */
  @Prop() readonly container: boolean = false

  /**
   If the component is a grid item. Must be used inside a grid container.
   */
  @Prop() readonly item: boolean = false

  /**
   Defines the grid direction, works the same as flexbox direction.
   */
  @Prop() readonly direction: DirectionType = 'row'

  /**
   Defines the grid `justifyContent` value, works the same as `justifyContent` in flexbox.
   */
  @Prop() readonly justifyContent: JustifyContentType = 'flex-start'

  /**
   Defines the grid `alignItems`, works the same as `alignItems` in flexbox.
   */
  @Prop() readonly alignItems: AlignItemsType = 'normal'

  /**
   Defines the vertical gap between grid columns. Use only if you have more than one column.
   */
  @Prop() readonly columnSpacing?: RangeOf<24>

  /**
   Defines the horizontal gap between grid rows. Use only if you have more than one row.
   */
  @Prop() readonly rowSpacing?: RangeOf<24>

  /**
   Defines the grid item width for all screen sizes.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  @Prop() readonly all?: RangeOf<24> | 'auto' | true

  /**
   Defines the grid item width for screen size - 1280px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  @Prop() readonly sm?: RangeOf<24> | 'auto' | true

  /**
   Defines the grid item width for screen size - 1366px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  @Prop() readonly md?: RangeOf<24> | 'auto' | true

  /**
   Defines the grid item width for screen size - 1440px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  @Prop() readonly lg?: RangeOf<24> | 'auto' | true

  /**
   Defines the grid item width for screen size - 1920px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  @Prop() readonly xl?: RangeOf<24> | 'auto' | true

  /**
   Defines the grid item width for screen size - 2220px.
   Takes in a number between **1** and **24**, where **24** is **100%** of the item width. If no value is specified, the grid items take all the available screen width.
   */
  @Prop() readonly xxl?: RangeOf<24> | 'auto' | true

  /**
   If the container has full width and no margins.
   */
  @Prop() readonly fullWidth: boolean = false

  /**
   If the container's height is at **100%** and the grid content grows to fill the parent block height.
   */
  @Prop() readonly fullHeight: boolean = false

  /**
   If the container's fluid makes it fill all parent width and height
   */
  @Prop() readonly fluid: boolean = false

  private hostCssClasses = () => {
    const isContainerHaveSpacing = !!this.rowSpacing && this.container
    const isContainerHaveAlignItems = !!this.alignItems && this.container
    const isContainerHaveJustifyContent = !!this.justifyContent && this.container
    const getItemClassName = () => {
      const { sm, md, lg, xl, xxl, all } = this
      const sizeArr = [
        ['sm', sm],
        ['md', md],
        ['lg', lg],
        ['xl', xl],
        ['xxl', xxl],
        ['all', all],
      ].reduce((itemClassStr, [breakpoint, size]) => {
        if (!size) {
          return itemClassStr
        }

        if (typeof size === 'boolean') {
          return `item-${breakpoint} ${itemClassStr}`
        }

        if (size === 'auto') {
          return `item-${breakpoint}-auto ${itemClassStr}`
        }

        return `item-${breakpoint}-${size} ${itemClassStr}`
      }, '')

      return sizeArr || 'item-all'
    }

    return {
      // container styles
      container: this.container,
      [`${this.direction}`]: this.container,
      [`row-spacing-${this.rowSpacing}`]: isContainerHaveSpacing,
      [`column-spacing-${this.columnSpacing || this.rowSpacing}`]: isContainerHaveSpacing,
      [`justify-${this.justifyContent}`]: isContainerHaveJustifyContent,
      [`align-${this.alignItems}`]: isContainerHaveAlignItems,
      'full-width': this.container && this.fullWidth,
      'full-height': this.container && this.fullHeight,
      fluid: this.container && this.fluid,
      // item styles
      [`${getItemClassName()}`]: this.item,
    }
  }

  render() {
    return (
      <Host class={this.hostCssClasses()} exportparts="inner">
        <slot part="inner" />
      </Host>
    )
  }
}
