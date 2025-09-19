import { newSpecPage } from '@stencil/core/testing'
import { WppNavSidebar } from '../wpp-nav-sidebar'
import { WppNavSidebarItem } from '../components/wpp-nav-sidebar-item/wpp-nav-sidebar-item'

describe('wpp-nav-sidebar', () => {
  it('should render close navigation sidebar with items', async () => {
    const page = await newSpecPage({
      components: [WppNavSidebar, WppNavSidebarItem],
      html: `<wpp-nav-sidebar open=${false} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favorites slot="icon-start"></wpp-icon-favorites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
    })

    expect(page.root).toMatchSnapshot()
  })

  it('should render open navigation sidebar with items', async () => {
    const page = await newSpecPage({
      components: [WppNavSidebar, WppNavSidebarItem],
      html: `<wpp-nav-sidebar open=${true} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favorites slot="icon-start"></wpp-icon-favorites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
    })

    expect(page.root).toMatchSnapshot()
  })
})
