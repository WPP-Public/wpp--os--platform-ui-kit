import { html } from 'lit-html';
/** These 2 functions are helper functions to render handle inside nodes for storybook */
const renderHandle = (top, isSelected, type, isLoading) => html `<div
    style="position: absolute; z-index: 20; right: ${type === 'source'
  ? '0'
  : '100%'}; top: ${top}px; transform: translate(50%, -50%); width: 6px;
    height: 6px;"
  >
    <wpp-handle-v4-2-0 .isSelected=${isSelected} .type=${type} .isLoading=${isLoading} />
  </div>`;
export const renderHandles = (handles, isSelected, isLoading) => {
  if (handles === '1 handle') {
    return ['target', 'source'].map(item => renderHandle(32, isSelected, item, isLoading));
  }
  return html `
    ${Array.from({ length: 3 }).map((_, index) => renderHandle(32 * (index + 1) + index * 12, isSelected, 'target', isLoading))}
    ${Array.from({ length: 3 }).map((_, index) => renderHandle(32 * (index + 1) + index * 12, isSelected, 'source', isLoading))}
  `;
};
