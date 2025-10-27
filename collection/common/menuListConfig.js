import tippy from 'tippy.js';
import { hideOnEsc, hideOnPopperBlur, portalInside } from './tippy-plugins';
const defaultTippyProps = {
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
};
export const menuListConfig = ({ anchor, popperOptions, triggerElementWidth, ...tippyPropsWithoutOptions }) => {
  const { popperOptions: defaultPopperOptions, ...defaultTippyPropsWithoutOptions } = defaultTippyProps;
  const { modifiers: defaultModifiers = [], ...defaultPopperOptionsWithoutModifiers } = defaultPopperOptions || {};
  const { modifiers = [], ...popperOptionsWithoutModifiers } = popperOptions || {};
  tippy.setDefaultProps({
    plugins: [hideOnEsc, hideOnPopperBlur, portalInside],
    portalInside: true,
  });
  return tippy(anchor, {
    ...defaultTippyPropsWithoutOptions,
    ...tippyPropsWithoutOptions,
    popperOptions: {
      modifiers: [
        {
          enabled: triggerElementWidth,
          fn: ({ instance, state }) => {
            const triggerReferenceWidth = `${state.rects.reference.width}px`;
            if (state.styles.popper.width !== triggerReferenceWidth) {
              state.styles.popper.width = triggerReferenceWidth;
              // force update the popper instance, so it can reposition the dropdown properly
              instance.update();
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
  });
};
