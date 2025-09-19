import { FunctionalComponent, h, Host } from '@stencil/core'

const ICON_SIZE_FOR_S = 16
const ICON_SIZE_FOR_M = 20

export interface Props {
  width?: number
  height?: number
  initialViewBoxNumber?: typeof ICON_SIZE_FOR_S | typeof ICON_SIZE_FOR_M
  size: 'm' | 's'
  color?: string
  name: string
  viewBoxX?: number
  viewBoxY?: number
  ariaLabel?: string
}

const sizeConfig: { [key: string]: number } = {
  s: ICON_SIZE_FOR_S,
  m: ICON_SIZE_FOR_M,
}

export const WppIcon: FunctionalComponent<Props> = (
  { width, height, size, initialViewBoxNumber = 20, color, name, viewBoxX = 0, viewBoxY = 0, ariaLabel },
  children,
) => {
  const iconHeight = height || width || sizeConfig[size]
  const iconWidth = width || sizeConfig[size]
  const style: Record<string, string> = {}

  if (color) {
    style['--wpp-prop-icon-color'] = color
  }

  return (
    <Host style={style} class={{ 'wpp-icon': true, [name]: true }} data-testid={name}>
      <svg
        width={iconWidth}
        height={iconHeight}
        viewBox={`${viewBoxX} ${viewBoxY} ${initialViewBoxNumber} ${initialViewBoxNumber}`}
        fill="none"
        role={!ariaLabel ? 'presentation' : 'img'}
        aria-hidden={!ariaLabel ? 'true' : undefined}
        aria-label={!ariaLabel ? undefined : ariaLabel}
      >
        {children}
      </svg>
    </Host>
  )
}
