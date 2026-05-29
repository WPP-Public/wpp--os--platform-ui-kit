import { newSpecPage } from '@stencil/core/testing';
import { WppNavSidebar } from '../wpp-nav-sidebar';
import { WppNavSidebarItem } from '../components/wpp-nav-sidebar-item/wpp-nav-sidebar-item';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-nav-sidebar', () => {
  it('should render close navigation sidebar with items', async () => {
    const page = await newSpecPage({
      components: [WppNavSidebar, WppNavSidebarItem],
      html: `<wpp-nav-sidebar open=${false} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render open navigation sidebar with items', async () => {
    const page = await newSpecPage({
      components: [WppNavSidebar, WppNavSidebarItem],
      html: `<wpp-nav-sidebar open=${true} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('subscribing to theme changes', () => {
    let mockStart;
    let mockStop;
    beforeEach(() => {
      mockStart = jest.fn();
      mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
    });
    afterEach(() => {
      jest.restoreAllMocks();
    });
    it('Test the component subscribes when it connects (connectedCallback & componentDidLoad)', async () => {
      await newSpecPage({
        components: [WppNavSidebar, WppNavSidebarItem],
        html: `<wpp-nav-sidebar open=${false} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppNavSidebar, WppNavSidebarItem],
        html: `<wpp-nav-sidebar open=${false} application-name=${'App Name'}>
              <wpp-nav-sidebar-item label=${'Dashboard'} path=${'/dashboard'}>
                    <wpp-icon-globe slot="icon-start"></wpp-icon-globe>
                  </wpp-nav-sidebar-item>
                  <wpp-nav-sidebar-item label=${'Projects'} extended=${true}>
                    <wpp-icon-favourites slot="icon-start"></wpp-icon-favourites>
                    <wpp-nav-sidebar-item label=${'Projects 01'} path=${'/project1'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 02'} path=${'/project2'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 03'} path=${'/project3'}></wpp-nav-sidebar-item>
                    <wpp-nav-sidebar-item label=${'Projects 04'} path=${'/project4'}></wpp-nav-sidebar-item>
                  </wpp-nav-sidebar-item>
              </wpp-nav-sidebar>`,
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
