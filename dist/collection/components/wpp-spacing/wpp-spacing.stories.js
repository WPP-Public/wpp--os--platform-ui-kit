import { html } from 'lit-html';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
export default {
  title: 'Design System/Foundations/Spacing',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: false },
  },
  argTypes: {
    direction: {
      options: ['top', 'right', 'bottom', 'left'],
      control: { type: 'select' },
    },
  },
};
export const Spacing = (args) => {
  const direction = args.direction || 'bottom';
  const baseUnit = 4;
  const multipliers = [0, 0.5, 1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 15, 16, 18, 20, 24];
  const blockStyles = Object.entries({
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center',
    width: '100px',
    height: '100px',
    'text-align': 'center',
  })
    .map(([key, value]) => key + ':' + value)
    .join('; ');
  const blocks = multipliers
    .map(multiplier => `
        <div style= "margin: 10px;">
          <div>
            <wpp-typography-v3-4-0 tag='h1' type='s-midi'>
              wpp-spacing-${baseUnit * multiplier}-${direction}
            </wpp-typography-v3-4-0>
          </div>
          <div style="display: flex; flex-direction: ${['top', 'bottom'].includes(direction) ? 'column' : 'row'};">
            <div
             style="${blockStyles}; background-color: #C2F5D4"
             class="wpp-spacing-${baseUnit * multiplier}-${direction}"
            >
              Block with spacing class
            </div>
            <div
             style="${blockStyles}; background-color: #FDEAE2"
            >
            </div>
          </div>
        </div>
      `)
    .join('');
  return html `${unsafeHTML(blocks)}`;
};
Spacing.args = {
  direction: 'bottom',
};
