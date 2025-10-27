import { Z_INDEX } from '../../common/consts';
import { getHighestContainerInDOM } from '../../utils/utils';
export const defaultTooltipConfig = {
  placement: 'top',
  offset: [0, 7.2],
  trigger: 'mouseenter focus',
  duration: [500, 500],
  zIndex: Z_INDEX.TOOLTIP,
  popperOptions: {
    modifiers: [
      {
        name: 'arrow',
        options: {
          padding: 0,
        },
      },
    ],
  },
  appendTo: () => getHighestContainerInDOM(),
};
