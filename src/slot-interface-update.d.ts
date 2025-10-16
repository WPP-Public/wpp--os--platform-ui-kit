import { JSX as StencilJSX } from '@stencil/core'

declare module '@stencil/core' {
  namespace JSX {
    interface IntrinsicElements {
      slot: StencilJSX.Slot & { part?: string }
    }
  }
}
