import { newSpecPage } from '@stencil/core/testing'
import { WppPopover } from '../wpp-popover'

describe('wpp-popover', () => {
  it('should render component', async () => {
    const page = await newSpecPage({
      components: [WppPopover],
      html: `<wpp-popover>
               <wpp-button slot='trigger-element'>Trigger Button</wpp-button>
               <div>
                 <wpp-typography>Some content inside popover</wpp-typography>
                 <wpp-action-button>Content Button</wpp-action-button>
               </div>
             </wpp-popover>`,
    })

    await new Promise(resolve => setTimeout(resolve, 0))
    await page.waitForChanges()

    expect(page.root).toMatchSnapshot()
  })
})
