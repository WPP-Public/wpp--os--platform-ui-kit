import { html } from 'lit-html';
import { useState } from 'storybook/internal/preview-api';
const meta = {
  title: 'Design System/Components/AI/Focus Artefact',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': { hidden: true },
    },
  },
  argTypes: {
    artefactTitle: { control: 'text' },
    titleIcon: { control: 'text' },
    // Pixels (e.g. 480) or a percentage of the parent (e.g. 40%)
    width: { control: 'text' },
  },
};
export default meta;
const logEvent = (name) => (event) => console.log(`${name}:`, event.detail);
// The chat's minimum width, which the artefact leaves it
const CHAT_MIN_WIDTH = 280;
// Appended to the content on demand, so the body overflows and its scroll can be checked
const MORE_CONTENT = Array.from({ length: 12 }, (_, ndx) => `Paragraph ${ndx + 1}. More content of the artefact, added so that it no longer fits the body. ` +
  'The header stays in place while the content scrolls below it.');
export const FocusArtefact = {
  args: {
    artefactTitle: 'Title',
    titleIcon: 'wpp-icon-document',
    width: '50%',
    versions: [
      { id: 'v1', label: 'Version 1' },
      { id: 'v2', label: 'Version 2' },
      { id: 'v3', label: 'Version 3' },
    ],
    menuActions: [
      { id: 'rename', label: 'Rename', icon: 'wpp-icon-edit' },
      { id: 'delete', label: 'Delete', icon: 'wpp-icon-trash' },
    ],
  },
  render: args => {
    const [withMoreContent, setWithMoreContent] = useState(false);
    return html `
      <div style="display: flex; flex-direction: column; align-items: flex-start; gap: 16px;">
        <wpp-button-v4-6-0 variant="secondary" @click=${() => setWithMoreContent(!withMoreContent)}>
          ${withMoreContent ? 'Remove extra content' : 'Add more content'}
        </wpp-button-v4-6-0>

        <div style="display: flex; width: 100%; height: 280px;">
          <div
            style="flex: 1; box-sizing: border-box; min-width: ${CHAT_MIN_WIDTH}px; padding: 16px; background-color: var(--wpp-grey-color-100); border: 2px dashed var(--wpp-grey-color-400);"
          >
            <wpp-typography-v4-6-0 type="s-body">Container (minimum width: ${CHAT_MIN_WIDTH}px)</wpp-typography-v4-6-0>
          </div>

          <wpp-focus-artefact-v4-6-0
            .width=${args.width}
            .artefactTitle=${args.artefactTitle}
            .titleIcon=${args.titleIcon}
            .menuActions=${args.menuActions}
            .versions=${args.versions}
            .selectedVersionId=${args.selectedVersionId}
            .locales=${args.locales}
            @wppActionClick=${logEvent('wppActionClick')}
            @wppVersionSelect=${logEvent('wppVersionSelect')}
            @wppClose=${logEvent('wppClose')}
            @wppResize=${logEvent('wppResize')}
          >
            <div slot="body" style="display: flex; flex-direction: column; gap: 8px; padding: 16px;">
              <wpp-typography-v4-6-0 type="s-body">The content of the artefact goes here.</wpp-typography-v4-6-0>
              ${withMoreContent
      ? MORE_CONTENT.map(text => html `<wpp-typography-v4-6-0 type="s-body">${text}</wpp-typography-v4-6-0>`)
      : null}
            </div>
          </wpp-focus-artefact-v4-6-0>
        </div>
      </div>
    `;
  },
};
