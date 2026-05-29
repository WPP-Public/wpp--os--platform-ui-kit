import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppFloatingButton } from '../wpp-floating-button';
import * as themeUtils from '../../../utils/subscribe-to-theme';
describe('wpp-floating-button', () => {
  it('should render primary floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-1-0", null),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-1-0", { disabled: true }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render loading floating button', async () => {
    const page = await newSpecPage({
      components: [WppFloatingButton],
      template: () => h("wpp-floating-button-v4-1-0", { loading: true }),
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
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-1-0", null),
      });
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppFloatingButton],
        template: () => h("wpp-floating-button-v4-1-0", null),
      });
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
});
