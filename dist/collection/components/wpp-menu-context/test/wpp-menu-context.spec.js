import { newSpecPage } from '@stencil/core/testing';
import { WppMenuContext } from '../wpp-menu-context';
import { WppListItem } from '../../wpp-list-item/wpp-list-item';
import { CONTEXT_ITEM_TAG } from '../constants';
describe('wpp-menu-context', () => {
  it('should render empty context', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext],
      html: `<wpp-menu-context></wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  describe('Testing "handleClick" function', () => {
    let page = undefined;
    let hideMock;
    beforeEach(async () => {
      page = await newSpecPage({
        components: [WppMenuContext, WppListItem],
        html: `<wpp-menu-context>
      <wpp-button
        slot="trigger-element"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
      });
      hideMock = jest.fn();
    });
    afterEach(() => {
      jest.clearAllMocks();
    });
    it('Test that "handleClick" returns when the dropdown of the menu-context is not visible.', async () => {
      if (!page)
        return;
      Object.defineProperty(page.rootInstance, 'tippyInstance', {
        value: {
          state: { isVisible: false },
          hide: hideMock,
        },
      });
      const event = new CustomEvent('wppChangeListItem', {
        detail: { value: 'option-1' },
      });
      window.dispatchEvent(event);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(hideMock).not.toHaveBeenCalled();
    });
    it('Test that "handleClick" returns when the dropdown is visible, but specific events are fired', async () => {
      if (!page)
        return;
      Object.defineProperty(page.rootInstance, 'tippyInstance', {
        value: {
          state: { isVisible: true },
          hide: hideMock,
        },
      });
      // Defining different types of events we are going to test the function with.
      const selectBasedEvent = new CustomEvent('wppChangeListItem', {
        detail: { isSelectBasedEvent: true },
      });
      selectBasedEvent.composedPath = jest.fn();
      const autocompleteBasedEvent = new CustomEvent('wppChangeListItem', {
        detail: { isAutocompleteBasedEvent: true },
      });
      autocompleteBasedEvent.composedPath = jest.fn();
      window.dispatchEvent(selectBasedEvent);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(hideMock).not.toHaveBeenCalled();
      expect(selectBasedEvent.composedPath).not.toHaveBeenCalled();
      window.dispatchEvent(autocompleteBasedEvent);
      await page.waitForChanges();
      expect(hideMock).not.toHaveBeenCalled();
      expect(autocompleteBasedEvent.composedPath).not.toHaveBeenCalled();
    });
    it('Test that the tippy hides when a valid event is fired and the dropdown is visible.', async () => {
      if (!page)
        return;
      Object.defineProperty(page.rootInstance, 'tippyInstance', {
        value: {
          state: { isVisible: true },
          hide: hideMock,
        },
      });
      const event = new CustomEvent('wppChangeListItem', {
        detail: { value: 'option-1' },
      });
      const listItemAttributes = {
        label: 'Option 1',
        tagName: CONTEXT_ITEM_TAG,
        disabled: false,
        role: 'list-item',
      };
      event.composedPath = jest.fn().mockReturnValue([
        {
          ...listItemAttributes,
          getAttribute: jest.fn((key) => key === 'disabled' ? String(listItemAttributes[key]) : listItemAttributes[key]),
        },
      ]);
      window.dispatchEvent(event);
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      expect(event.composedPath).toHaveBeenCalled();
      expect(hideMock).toHaveBeenCalled();
    });
  });
  it('should render context with button', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context>
      <wpp-button
        .size="m"
        .disabled=${false}
        .loading=${false}
        variant="destructive"
        slot="parent"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render context item with custom svg and default right icon', async () => {
    const page = await newSpecPage({
      components: [WppListItem],
      html: `<wpp-list-item is-extended="${true}">
        <wpp-icon-plus slot="icon-start"></wpp-icon-plus>
        Item
      </wpp-list-item>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render context be the same width as anchor', async () => {
    const page = await newSpecPage({
      components: [WppMenuContext, WppListItem],
      html: `<wpp-menu-context .is-list-have-trigger-element-width=${true}>
      <wpp-button
        .size="m"
        .disabled=${false}
        .loading=${false}
        variant="destructive"
        slot="trigger-element"
        >Button</wpp-button
      >
      <div>
        <wpp-list-item>Item</wpp-list-item>
      </div>
      </wpp-menu-context>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
});
