import { html } from 'lit-html';
const INITIAL_TOP_DISTANCE = 32;
const HEIGHT_OF_HANDLE = 12;
const DISTANCE_BETWEEN_HANDLES = 20;
/** These 2 functions are helper functions to render handle inside nodes for storybook */
const renderHandle = (top, isSelected, type, isLoading) => html `<div
    style="position: absolute; z-index: 20; right: ${type === 'source'
  ? '0'
  : '100%'}; top: ${top}px; transform: translate(50%, -50%); width: 6px;
    height: 6px; min-width: 5px; min-height: 5px; border-radius: 100%;"
  >
    <wpp-handle-v4-3-0 .isSelected=${isSelected} .type=${type} .isLoading=${isLoading} />
  </div>`;
export const renderHandles = (handles, isSelected, isLoading) => {
  if (handles === '1 handle') {
    return ['target', 'source'].map(item => renderHandle(INITIAL_TOP_DISTANCE, isSelected, item, isLoading));
  }
  return html `
    ${Array.from({ length: 3 }).map((_, index) => renderHandle(index === 0
    ? INITIAL_TOP_DISTANCE
    : INITIAL_TOP_DISTANCE + HEIGHT_OF_HANDLE + index * DISTANCE_BETWEEN_HANDLES + (index - 1) * HEIGHT_OF_HANDLE, isSelected, 'target', isLoading))}
    ${Array.from({ length: 3 }).map((_, index) => renderHandle(index === 0
    ? INITIAL_TOP_DISTANCE
    : INITIAL_TOP_DISTANCE + HEIGHT_OF_HANDLE + index * DISTANCE_BETWEEN_HANDLES + (index - 1) * HEIGHT_OF_HANDLE, isSelected, 'source', isLoading))}
  `;
};
