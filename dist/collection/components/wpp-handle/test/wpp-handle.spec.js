import { newSpecPage } from '@stencil/core/testing';
import { WppHandle } from '../wpp-handle';
describe('Testing WppHandle', () => {
  describe('Snapshot testing', () => {
    it('Testing Handle with type="soruce" and isSelected="false"', async () => {
      const page = await newSpecPage({
        components: [WppHandle],
        html: `<wpp-handle type="source" is-selected="false">
                <div slot="body"></div>
            </wpp-handle>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing Handle with type="soruce" and isSelected="true"', async () => {
      const page = await newSpecPage({
        components: [WppHandle],
        html: `<wpp-handle type="source" is-selected="true">
                <div slot="body"></div>
            </wpp-handle>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing Handle with type="target" and isSelected="false"', async () => {
      const page = await newSpecPage({
        components: [WppHandle],
        html: `<wpp-handle type="target" is-selected="false">
                <div slot="body"></div>
            </wpp-handle>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
    it('Testing Handle with type="target" and isSelected="true"', async () => {
      const page = await newSpecPage({
        components: [WppHandle],
        html: `<wpp-handle type="target" is-selected="true">
                <div slot="body"></div>
            </wpp-handle>`,
      });
      await page.waitForChanges();
      expect(page.root).toMatchSnapshot();
    });
  });
});
