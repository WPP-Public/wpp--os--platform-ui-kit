import { Placement, Strategy } from '@floating-ui/dom'
import { PLACEMENTS } from '../../common/consts'
import { DropdownConfigFloating } from '../../types/common'

export const getMappedValues = (dropdownConfig: DropdownConfigFloating, isNestedContext: boolean) => {
  if (!dropdownConfig)
    return {
      placement: (isNestedContext ? 'right-start' : 'bottom-start') as Placement,
      strategy: (isNestedContext ? 'fixed' : 'absolute') as Strategy,
      offset: isNestedContext ? { mainAxis: 9, crossAxis: -9 } : 4,
    }

  const { offset, placement, popperOptions, ...rest } = dropdownConfig

  const mappedOffset =
    offset === undefined
      ? isNestedContext
        ? { mainAxis: 9, crossAxis: -9 }
        : 4
      : typeof offset === 'number'
      ? offset
      : offset.length > 0
      ? { mainAxis: offset[1], crossAxis: offset[0] }
      : 0

  const mappedPlacement = !placement
    ? isNestedContext
      ? 'right-start'
      : 'bottom-start'
    : PLACEMENTS.includes(placement)
    ? placement
    : 'bottom-start'

  const mappedStrategy: string | undefined = popperOptions
    ? popperOptions?.strategy
    : isNestedContext
    ? 'fixed'
    : 'absolute'

  return {
    ...rest,
    placement: mappedPlacement as Placement,
    strategy: mappedStrategy as Strategy,
    offset: mappedOffset,
  }
}
