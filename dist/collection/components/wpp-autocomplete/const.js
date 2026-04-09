import { Z_INDEX } from '../../common/consts';
import { getHighestContainerInDOM } from '../../utils/utils';
// Load more will be triggered 15px before scroll ends
export const INFINITE_SCROLL_THRESHOLD = 15;
export const DEFAULT_DROPDOWN_CONFIG = {
  maxWidth: 'none',
  hideOnClick: false,
  trigger: 'manual',
  placement: 'bottom-start',
  offset: [0, 4],
  zIndex: Z_INDEX.AUTOCOMPLETE,
  appendTo: () => getHighestContainerInDOM(),
};
export const LOCALES_DEFAULTS = {
  nothingFound: 'Nothing found',
  loading: 'Loading...',
  selected: count => `${count} selected`,
  showMore: 'Show More',
  showLess: 'Show Less',
  suggestionTitle: 'Suggestions',
  createNewElement: query => `Create "${query}"`,
  clearMultiple: 'Clear selections',
  clearSingle: 'Clear selection',
};
export const PILL_MARGIN = 8;
