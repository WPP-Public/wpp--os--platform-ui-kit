import { PLACEMENTS } from '../../common/consts';
export const getMappedValues = (dropdownConfig, isNestedContext) => {
  if (!dropdownConfig)
    return {
      placement: (isNestedContext ? 'right-start' : 'bottom-start'),
      strategy: (isNestedContext ? 'fixed' : 'absolute'),
      offset: isNestedContext ? { mainAxis: 9, crossAxis: -9 } : 4,
    };
  const { offset, placement, popperOptions, ...rest } = dropdownConfig;
  const mappedOffset = offset === undefined
    ? isNestedContext
      ? { mainAxis: 9, crossAxis: -9 }
      : 4
    : typeof offset === 'number'
      ? offset
      : offset.length > 0
        ? { mainAxis: offset[1], crossAxis: offset[0] }
        : 0;
  const mappedPlacement = !placement
    ? isNestedContext
      ? 'right-start'
      : 'bottom-start'
    : PLACEMENTS.includes(placement)
      ? placement
      : 'bottom-start';
  const mappedStrategy = popperOptions
    ? popperOptions?.strategy
    : isNestedContext
      ? 'fixed'
      : 'absolute';
  return {
    ...rest,
    placement: mappedPlacement,
    strategy: mappedStrategy,
    offset: mappedOffset,
  };
};
