import { FunctionalComponent, h } from '@stencil/core'
import { JSXBase } from '@stencil/core/internal'

interface Props extends JSXBase.SlotAttributes {
  wrapperClass?: JSXBase.HTMLAttributes<HTMLDivElement>['class']
  role?: string
  tabIndex?: number
  'aria-label'?: string
  'aria-labelledby'?: string
  title?: string
}

/**
 * Helper component that unifies slot wrapping across the project
 */
export const WrappedSlot: FunctionalComponent<Props> = (
  { wrapperClass, role, tabIndex, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledby, title, ...slotProps },
  children,
) => (
  <div
    class={wrapperClass}
    part={`${slotProps.name || 'ws'}-wrapper`}
    role={role}
    tabIndex={tabIndex}
    aria-label={ariaLabel}
    aria-labelledby={ariaLabelledby}
    title={title}
  >
    <slot part={slotProps.name || 'ws-inner'} {...slotProps}>
      {children}
    </slot>
  </div>
)
