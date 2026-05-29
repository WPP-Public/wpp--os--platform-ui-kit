import { t as tippy } from './tippy.esm-c5fe8087.js';
import { Z as Z_INDEX } from './consts-744c144f.js';

const hideOnEsc = {
  name: 'hideOnEsc',
  defaultValue: false,
  fn(instance) {
    function onKeyDown(event) {
      if (event.code === 'Escape' && instance.state.isVisible) {
        instance.hide();
      }
    }
    return {
      onShow() {
        document.addEventListener('keydown', onKeyDown);
      },
      onHide() {
        document.removeEventListener('keydown', onKeyDown);
      },
      onDestroy() {
        document.removeEventListener('keydown', onKeyDown);
      },
    };
  },
};
const hideOnPopperBlur = {
  name: 'hideOnPopperBlur',
  defaultValue: false,
  fn(instance) {
    return {
      onCreate() {
        instance.popper.addEventListener('focusout', (event) => {
          if (instance.props.hideOnPopperBlur &&
            event.relatedTarget &&
            !instance.popper.contains(event.relatedTarget)) {
            instance.hide();
          }
        });
      },
    };
  },
};
// Adds an attribute to the popper root so it is treated as inside the modal.
// Usage option: portalInside: boolean | string
//  - true - adds data-wpp-portal-inside
//  - false - removes attribute
//  - string (e.g., 'data-foo') -> uses custom attribute name
const portalInside = {
  name: 'portalInside',
  defaultValue: true,
  fn(instance) {
    let lastAttrName = null;
    const toAttrName = (value) => {
      if (value === false)
        return null;
      if (typeof value === 'string') {
        // Accept either full data-* or just a token (we’ll prefix data-)
        return value.startsWith('data-') ? value : `data-${value}`;
      }
      return 'data-wpp-portal-inside';
    };
    const apply = () => {
      const popper = instance.popper;
      if (!popper)
        return;
      // Clean previous
      if (lastAttrName) {
        popper.removeAttribute(lastAttrName);
      }
      const nextAttr = toAttrName(instance.props.portalInside);
      if (nextAttr) {
        popper.setAttribute(nextAttr, '');
      }
      lastAttrName = nextAttr;
    };
    return {
      onCreate() {
        apply();
      },
      onAfterUpdate(_, partial) {
        if (Object.prototype.hasOwnProperty.call(partial, 'portalInside')) {
          apply();
        }
      },
      onDestroy() {
        const popper = instance.popper;
        if (popper && lastAttrName) {
          popper.removeAttribute(lastAttrName);
        }
      },
    };
  },
};

const defaultTippyProps = {
  trigger: 'click',
  placement: 'bottom-start',
  offset: [0, 4],
  maxWidth: 350,
  hideOnClick: true,
  zIndex: Z_INDEX.MENU_LIST,
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
const menuListConfig = ({ anchor, popperOptions, triggerElementWidth, ...tippyPropsWithoutOptions }) => {
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

export { menuListConfig as m };
