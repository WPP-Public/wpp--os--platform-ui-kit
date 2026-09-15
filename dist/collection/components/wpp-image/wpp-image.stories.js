import { styleMap } from 'lit-html/directives/style-map.js';
import { html } from 'lit-html';
import { unsafeHTML } from 'lit-html/directives/unsafe-html.js';
import { transformToVersionedTag } from '../../utils/utils';
import { imageList } from './const';
export default {
  title: 'Design System/Icons & Images/Images',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
    options: { showPanel: true },
  },
  argTypes: {
    width: {
      control: { type: 'number' },
    },
    height: {
      control: { type: 'number' },
    },
  },
};
const pageStyle = {
  display: 'flex',
  justifyContent: 'center',
  padding: '4rem 20px',
  minHeight: '100vh',
  boxSizing: 'border-box',
};
const pageWrapper = {
  maxWidth: '1000px',
  width: '100%',
};
const headerStyle = {
  display: 'flex',
  marginBottom: '24px',
  fontWeight: '700',
};
const contentWrapper = {
  display: 'flex',
  flexWrap: 'wrap',
  marginLeft: '-46px',
  marginBottom: '24px',
  fontFamily: 'var(--wpp-font-family)',
};
const itemWrapper = {
  display: 'flex',
  flexDirection: 'column',
  marginTop: '46px',
  marginLeft: '46px',
  alignItems: 'center',
};
const labelStyle = {
  marginTop: '10px',
};
const getEmptyStates = ({ width, height }) => imageList.groups[0].images.map(image => {
  const tag = transformToVersionedTag(`wpp-empty-${image.name}`);
  // The tag name is versioned at build time, so the graphics are written as
  // markup rather than as a lit template - which means the size controls have
  // to be interpolated in as attributes to reach the component at all.
  const size = `${width == null ? '' : ` width="${width}"`}${height == null ? '' : ` height="${height}"`}`;
  return html `
      <div style=${styleMap(itemWrapper)}>
        ${unsafeHTML(`<${tag}${size}></${tag}>`)}
        <wpp-typography-v4-4-0 type="xs-body" style=${styleMap(labelStyle)}>${image.label}</wpp-typography-v4-4-0>
      </div>
    `;
});
export const EmptyStates = {
  render: args => html `
    <div style=${styleMap(pageStyle)}>
      <div style=${styleMap(pageWrapper)}>
        <wpp-typography-v4-4-0 type="3xl-heading" tag="h3" style=${styleMap(headerStyle)}>
          Empty States
        </wpp-typography-v4-4-0>
        <hr />
        <section style=${styleMap(contentWrapper)}>${getEmptyStates(args)}</section>
      </div>
    </div>
  `,
  args: {
    width: 160,
    height: 160,
  },
};
