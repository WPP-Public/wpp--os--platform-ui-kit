import tippy, { Instance, Props } from 'tippy.js'
import { ListConfigTypes, DropdownConfig } from '../types/common'
import { hideOnEsc } from './tippy-plugins'

const defaultTippyProps: DropdownConfig = {
  trigger: 'click',
  placement: 'bottom-start',
  offset: [0, 4],
  maxWidth: 350,
  hideOnClick: true,
  zIndex: 9999,
  arrow: '',
  interactive: true,
  animation: 'fadein',
  duration: [200, 100],
  aria: {
    expanded: undefined,
  },
  popperOptions: {
    strategy: 'absolute',
  },
}

export const menuListConfig = ({
  anchor,
  popperOptions,
  triggerElementWidth,
  ...tippyPropsWithoutOptions
}: ListConfigTypes): Instance<Props> => {
  const { popperOptions: defaultPopperOptions, ...defaultTippyPropsWithoutOptions } = defaultTippyProps
  const { modifiers: defaultModifiers = [], ...defaultPopperOptionsWithoutModifiers } = defaultPopperOptions || {}
  const { modifiers = [], ...popperOptionsWithoutModifiers } = popperOptions || {}

  tippy.setDefaultProps({
    plugins: [hideOnEsc],
  })

  return tippy(anchor, {
    ...defaultTippyPropsWithoutOptions,
    ...tippyPropsWithoutOptions,
    popperOptions: {
      modifiers: [
        {
          enabled: triggerElementWidth,
          fn: ({ instance, state }) => {
            const triggerReferenceWidth = `${state.rects.reference.width}px`

            if (state.styles.popper.width !== triggerReferenceWidth) {
              state.styles.popper.width = triggerReferenceWidth
              // force update the popper instance, so it can reposition the dropdown properly
              instance.update()
            }
          },
          phase: 'beforeWrite',
        },
        ...defaultModifiers,
        ...modifiers,
      ],
      ...defaultPopperOptionsWithoutModifiers,
      ...popperOptionsWithoutModifiers,
    },
  })
}
