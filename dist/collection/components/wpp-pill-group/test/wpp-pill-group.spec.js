import { newSpecPage } from '@stencil/core/testing';
import { WppPillGroup } from '../wpp-pill-group';
import { WppPill } from '../components/wpp-pill/wpp-pill';
import { h } from '@stencil/core';
describe('wpp-pill-group', () => {
  it('renders single type pill with items and attributes', async () => {
    const page = await newSpecPage({
      components: [WppPillGroup, WppPill],
      html: `
        <wpp-pill-group type="single" size="m" value="phone">
          <wpp-pill name="contact" value="email" label="Email"></wpp-pill>
          <wpp-pill name="contact" value="mail" label="Mail"></wpp-pill>
          <wpp-pill name="contact" value="phone" label="Phone"></wpp-pill>
        </wpp-pill-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders display type pill with items and attributes', async () => {
    const page = await newSpecPage({
      components: [WppPillGroup, WppPill],
      html: `
        <wpp-pill-group type="display" size="m" value="phone">
          <wpp-pill name="contact" value="email" label="Email" removable="true"></wpp-pill>
          <wpp-pill name="contact" value="mail" label="Mail" removable="true"></wpp-pill>
          <wpp-pill name="contact" value="phone" label="Phone" removable="true"></wpp-pill>
        </wpp-pill-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders draggable type pill with items and attributes', async () => {
    const page = await newSpecPage({
      components: [WppPillGroup, WppPill],
      html: `
        <wpp-pill-group type="draggable" size="m" value="phone">
          <wpp-pill name="contact" value="email" label="Email" removable="true"></wpp-pill>
          <wpp-pill name="contact" value="mail" label="Mail" removable="true"></wpp-pill>
          <wpp-pill name="contact" value="phone" label="Phone" removable="true"></wpp-pill>
        </wpp-pill-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with users with prop src and color attributes', async () => {
    const value = ['email', 'mail'];
    const page = await newSpecPage({
      components: [WppPillGroup, WppPill],
      template: () => (h("wpp-pill-group-v2-22-0", { size: "m", type: "multiple", value: value }, h("wpp-pill-v2-22-0", { name: "contact", value: "email", label: "Email" }), h("wpp-pill-v2-22-0", { name: "contact", value: "mail", label: "Mail" }), h("wpp-pill-v2-22-0", { name: "contact", value: "phone", label: "Phone" }))),
    });
    expect(page.root).toMatchSnapshot();
  });
});
