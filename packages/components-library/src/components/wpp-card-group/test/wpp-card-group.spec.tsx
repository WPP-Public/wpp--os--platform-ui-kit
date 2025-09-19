import { newSpecPage } from '@stencil/core/testing'
import { WppCardGroup } from '../wpp-card-group'
import { WppCard } from '../components/wpp-card/wpp-card'

describe('wpp-card-group', () => {
  it('renders component with items and content inside cards', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
        <wpp-card-group size='m' value='phone'>
          <wpp-card name="contact" value="email">
            <wpp-typography>Email info content</wpp-typography>
            <p slot='header'>Email</p>
          </wpp-card>
          <wpp-card name="contact" value="mail">
            <wpp-typography>Email info content</wpp-typography>
            <p slot='header'>Mail</p>
          </wpp-card>
          <wpp-card name="contact" value="phone">
            <wpp-typography>Email info content</wpp-typography>
            <p slot='header'>Phone</p>
          </wpp-card>
        </wpp-card-group>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
