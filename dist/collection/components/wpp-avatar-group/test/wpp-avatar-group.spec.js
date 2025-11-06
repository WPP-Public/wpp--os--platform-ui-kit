import { newSpecPage } from '@stencil/core/testing';
import { WppAvatarGroup } from '../wpp-avatar-group';
import { h } from '@stencil/core';
describe('wpp-avatar-group', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with users with prop src and color attributes', async () => {
    const avatars = [
      {
        name: 'Citlalli Tuva',
        src: '',
      },
      {
        name: 'Nicte Lalawethika',
        src: 'https://media.istockphoto.com/photos/colored-powder-explosion-on-black-background-picture-id1057506940?k=20&m=1057506940&s=612x612&w=0&h=3j5EA6YFVg3q-laNqTGtLxfCKVR3_o6gcVZZseNaWGk=',
      },
      {
        name: 'Wickaninnish Harald',
        src: '',
      },
      {
        name: 'Gustaf Marcus',
        src: '',
      },
      {
        name: 'Helga Karla',
        src: '',
      },
      {
        name: 'Rikard Linn',
        src: '',
      },
    ];
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      template: () => h("wpp-avatar-group-v2-22-0", { avatars: avatars }),
    });
    expect(page.root).toMatchSnapshot();
  });
});
