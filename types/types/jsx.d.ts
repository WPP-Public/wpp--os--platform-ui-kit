import { JSXBase as StencilJSXBase } from '@stencil/core/internal/stencil-public-runtime'

// Stencil has type issues with <slot> elements.
// The narrow <slot> type that Stencil defines is targeted
// at components without `shadow: true` setup.
// In such cases Stencil implements a very basic version of <slot> support.
// This basic implementation has a lot of bugs related to conditional rendering,
// so we shouldn't use slots in components without shadowDOM.
// This definition adds native <slot> attributes.
// See: https://github.com/ionic-team/stencil/issues/530

declare module '@stencil/core/internal/stencil-public-runtime' {
  namespace JSXBase {
    interface IntrinsicElements {
      slot: JSXBase.SlotAttributes
    }
    export type SlotAttributes = Omit<StencilJSXBase.HTMLAttributes<HTMLSlotElement>, 'ref'>
  }
}
