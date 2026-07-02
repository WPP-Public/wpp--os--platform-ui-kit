import { newSpecPage } from '@stencil/core/testing';
import { WppListItem } from '../wpp-list-item';
import * as themeUtils from '../../../utils/subscribe-to-theme';
const dispatchRightSlotClick = (listItem, rightSlotContent) => {
  const rightSlot = listItem.shadowRoot?.querySelector('slot[name="right"]');
  const rightSlotWrapper = rightSlot.parentElement;
  const clickEvent = new MouseEvent('click', { bubbles: true, composed: true });
  Object.defineProperty(clickEvent, 'composedPath', {
    value: () => [rightSlotContent, rightSlot, rightSlotWrapper],
  });
  rightSlot.dispatchEvent(clickEvent);
};
describe('wpp-list-item', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
               <p slot="label">Text</p>
             </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label and avatar', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
                <p slot="label">Text</p>
                <wpp-avatar
                      size="s"
                      src="https://cdna.artstation.com/p/assets/images/images/004/966/196/large/hossein-diba-1.jpg?1487536028"
                      slot="left"
                />
             </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label and chevron', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
               <p slot="label">Text</p>
               <wpp-icon-chevron slot="right" />
             </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label and caption', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item>
               <p slot="label">Text</p>
               <p slot="caption">Caption</p>
             </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label and checkbox', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item multiple>
               <p slot="label">Text</p>
             </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with label, caption and checkbox with checked state', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item multiple checked>
               <p slot="label">Text</p>
               <p slot="caption">Caption</p>
             </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 100));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  describe('right slot click behavior', () => {
    it('toggles a selectable item when decorative right slot content is clicked', async () => {
      const page = await newSpecPage({
        components: [WppListItem],
        html: `<wpp-list-item multiple selectable value="email">
                 <p slot="label">Email</p>
                 <wpp-tag slot="right" label="Vendors available"></wpp-tag>
               </wpp-list-item>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      await page.waitForChanges();
      const listItem = page.root;
      const changeHandler = jest.fn();
      const rightSlotTag = listItem.querySelector('wpp-tag');
      listItem.addEventListener('wppChangeListItem', changeHandler);
      dispatchRightSlotClick(listItem, rightSlotTag);
      await page.waitForChanges();
      expect(listItem.checked).toBe(true);
      expect(changeHandler).toHaveBeenCalledTimes(1);
      expect(changeHandler.mock.calls[0][0].detail).toMatchObject({
        value: 'email',
        checked: true,
        label: 'Email',
      });
    });
    it('does not toggle a selectable item when interactive right slot content is clicked', async () => {
      const page = await newSpecPage({
        components: [WppListItem],
        html: `<wpp-list-item multiple selectable value="email">
                 <p slot="label">Email</p>
                 <wpp-action-button slot="right">Edit</wpp-action-button>
               </wpp-list-item>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      await page.waitForChanges();
      const listItem = page.root;
      const changeHandler = jest.fn();
      const rightSlotAction = listItem.querySelector('wpp-action-button');
      listItem.addEventListener('wppChangeListItem', changeHandler);
      dispatchRightSlotClick(listItem, rightSlotAction);
      await page.waitForChanges();
      expect(listItem.checked).toBe(false);
      expect(changeHandler).not.toHaveBeenCalled();
    });
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
        components: [WppListItem],
        html: `<wpp-list-item>
               <p slot="label">Text</p>
             </wpp-list-item>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(mockStart).toHaveBeenCalledTimes(1);
    });
    it('should unsubscribe from theme when component disconnects (disconnectedCallback)', async () => {
      const page = await newSpecPage({
        components: [WppListItem],
        html: `<wpp-list-item>
               <p slot="label">Text</p>
             </wpp-list-item>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
    it('Test that the component does not subcribe to theme changes when the isDarkTheme prop is passed explicitly from the parent component', async () => {
      await newSpecPage({
        components: [WppListItem],
        html: `<wpp-list-item is-dark-theme="true">
               <p slot="label">Text</p>
             </wpp-list-item>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(mockStart).toHaveBeenCalledTimes(0);
    });
    it('Test that the component does not unsubcribe to theme changes when the isDarkTheme prop is passed explicitly from the parent component', async () => {
      const page = await newSpecPage({
        components: [WppListItem],
        html: `<wpp-list-item is-dark-theme="true">
               <p slot="label">Text</p>
             </wpp-list-item>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalledTimes(0);
    });
    it('Test that the component unsubscribes from theme changes when `isDarkTheme` prop is undefined initially, but then gets set to a defined value', async () => {
      const page = await newSpecPage({
        components: [WppListItem],
        html: `<wpp-list-item >
               <p slot="label">Text</p>
             </wpp-list-item>`,
      });
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(mockStart).toHaveBeenCalledTimes(1);
      page.rootInstance.isDarkTheme = false;
      expect(mockStop).toHaveBeenCalledTimes(1);
    });
  });
  it('Test that `handleComponentMount` is called inside connectedCallback', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item >
               <p slot="label">Text</p>
             </wpp-list-item>`,
    });
    const handleComponentMount = jest.fn();
    page.rootInstance.handleComponentMount = handleComponentMount;
    page.rootInstance.connectedCallback();
    expect(handleComponentMount).toHaveBeenCalledTimes(1);
  });
});
