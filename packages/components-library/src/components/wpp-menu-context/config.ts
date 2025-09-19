import { DropdownConfig } from '../../types/common'
import { Z_INDEX } from '../../common/consts'

export const defaultDropdownConfig: DropdownConfig = {
  trigger: 'click',
  placement: 'bottom-start',
  offset: [0, 4],
  zIndex: Z_INDEX.CONTEXT_MENU,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['top-start'],
        },
      },
    ],
  },
}

export const defaultNestedDropdownConfig: DropdownConfig = {
  trigger: 'mouseenter focus',
  hideOnClick: false,
  placement: 'right-start',
  offset: [-8, 9],
  zIndex: Z_INDEX.CONTEXT_MENU,
  popperOptions: {
    modifiers: [
      {
        name: 'flip',
        options: {
          fallbackPlacements: ['left-start', 'left'],
        },
      },
    ],
  },
}

export const setDefaultDropdownConfig = (isNested: boolean): DropdownConfig =>
  isNested ? defaultNestedDropdownConfig : defaultDropdownConfig
