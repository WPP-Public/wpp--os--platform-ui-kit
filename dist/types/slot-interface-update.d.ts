import { JSX as StencilJSX } from './stencil-public-runtime'

declare module '@stencil/core' {
  namespace JSX {
    interface IntrinsicElements {
      slot: StencilJSX.Slot & { part?: string }
    }
  }
}
