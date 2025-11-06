import { computePosition, flip, shift, offset, hide, autoUpdate, arrow, } from '@floating-ui/dom';
import { DEFAULT_SHOW_STYLES, DEFAULT_OFFSET, ARROW_HORIZONTAL_OFFSET, ARROW_VERTICAL_OFFSET, STATIC_SIDES, ROTATION_VALUES, } from './consts';
import { getDurationValues } from '../utils/utils';
const getArrowOffset = (staticSide, arrowOffset) => arrowOffset || (['top', 'bottom'].includes(staticSide) ? ARROW_VERTICAL_OFFSET : ARROW_HORIZONTAL_OFFSET);
const attachArrowToElement = (middlewareData, arrowEl, placement, arrowOffset, paddingOnSide) => {
  const { x: arrowX, y: arrowY } = middlewareData.arrow;
  const staticSide = STATIC_SIDES[placement.split('-')[0]];
  const rotationValue = ROTATION_VALUES[staticSide];
  const staticSideValue = (paddingOnSide || 0) - getArrowOffset(staticSide, arrowOffset);
  Object.assign(arrowEl.style, {
    left: arrowX != null ? `${arrowX}px` : '',
    top: arrowY != null ? `${arrowY}px` : '',
    right: '',
    bottom: '',
    [staticSide]: `${staticSideValue}px`,
    transform: `rotate(${rotationValue}deg)`,
  });
};
export const computeFloatingUI = ({ referenceEl, floatingEl, arrowEl, configOptions, showStyles, paddingOnSide, }) => {
  if (!referenceEl || !floatingEl)
    return undefined;
  const updatePosition = () => {
    if (arrowEl) {
      Object.assign(floatingEl.style, {
        padding: `${paddingOnSide}px`,
      });
    }
    computePosition(referenceEl, floatingEl, {
      middleware: [
        offset(configOptions?.offset || DEFAULT_OFFSET),
        configOptions?.shouldNotFlipEl ? null : flip(),
        shift({ padding: DEFAULT_OFFSET }),
        arrowEl ? arrow({ element: arrowEl, padding: DEFAULT_OFFSET }) : null,
        hide(),
      ],
      placement: configOptions?.placement || 'top',
      strategy: configOptions?.strategy,
    }).then(({ x, y, middlewareData, placement }) => {
      if (middlewareData.arrow && arrowEl) {
        attachArrowToElement(middlewareData, arrowEl, placement, configOptions?.arrowOffset, paddingOnSide);
      }
      Object.assign(floatingEl.style, {
        left: `${x}px`,
        top: `${y}px`,
        position: configOptions?.strategy || 'absolute',
        ...(configOptions?.zIndex ? { zIndex: configOptions.zIndex } : {}),
        ...(configOptions?.triggerElementWidth ? { width: `${referenceEl.getBoundingClientRect().width}px` } : {}),
        ...(showStyles || DEFAULT_SHOW_STYLES),
        visibility: middlewareData.hide?.referenceHidden ? 'hidden' : 'visible',
      });
      floatingEl.setAttribute('data-placement', placement);
    });
  };
  setTimeout(() => {
    if (configOptions?.onShow) {
      configOptions.onShow();
    }
  }, 0);
  const cleanup = autoUpdate(referenceEl, floatingEl, updatePosition, { elementResize: false });
  return cleanup;
};
export const handleAnimations = ({ portalRef, animation, duration, defaultComponentDuration, }) => {
  if (portalRef) {
    const [showDuration, hideDuration] = getDurationValues(duration, defaultComponentDuration);
    portalRef.style.setProperty('--portal-show-animation-duration', `${animation === false ? 0 : showDuration}ms`);
    portalRef.style.setProperty('--portal-hide-animation-duration', `${animation === false ? 0 : hideDuration}ms`);
  }
};
