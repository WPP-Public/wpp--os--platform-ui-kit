import { Z_INDEX } from '../../common/consts';
export const defaultDropdownConfig = {
  trigger: 'manual',
  placement: 'bottom-start',
  hideOnClick: false,
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
};
export const defaultNestedDropdownConfig = {
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
};
export const setDefaultDropdownConfig = (isNested) => isNested ? defaultNestedDropdownConfig : defaultDropdownConfig;
