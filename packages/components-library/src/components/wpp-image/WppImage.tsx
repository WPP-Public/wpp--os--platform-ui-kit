import { FunctionalComponent, h, Host } from '@stencil/core'

export interface WppImageProps {
  name: string
  width?: number
  height?: number
  viewBoxX?: number
  viewBoxY?: number
  viewBoxWidth?: number
  viewBoxHeight?: number
}

export const WppImage: FunctionalComponent<WppImageProps> = (
  { name, width, height, viewBoxX = 0, viewBoxY = 0, viewBoxWidth = 100, viewBoxHeight = 100 },
  children,
) => {
  const imageWidth = width || height
  const imageHeight = height || width || 'auto'

  return (
    <Host class={{ 'wpp-image': true, [name]: true }}>
      <svg
        width={imageWidth}
        height={imageHeight}
        viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
        fill="none"
        role="img"
      >
        {children}
      </svg>
    </Host>
  )
}
