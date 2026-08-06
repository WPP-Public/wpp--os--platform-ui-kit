import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSelect } from '../wpp-select';
import { MOCK_MULTIPLE_LIST, MOCK_SINGLE_LIST } from './mocks';
describe('wpp-select: scrollSelectedItemIntoView', () => {
  const renderSingleSelect = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => h("wpp-select-v4-3-0", { type: "single", list: MOCK_SINGLE_LIST, value: "car", ...props }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    return page;
  };
  describe('scrollSelectedListItemIntoView', () => {
    it('should not scroll when scrollSelectedItemIntoView prop is false (default)', async () => {
      const page = await renderSingleSelect();
      const instance = page.rootInstance;
      const mockListRef = { scrollTo: jest.fn(), clientHeight: 100 };
      const mockSelectedItemRef = { offsetTop: 100, offsetHeight: 40 };
      instance['listRef'] = mockListRef;
      instance['selectedItemRef'] = mockSelectedItemRef;
      instance['scrollSelectedListItemIntoView']();
      expect(mockListRef.scrollTo).not.toHaveBeenCalled();
    });
    it('should not scroll when type is not single', async () => {
      const page = await renderSingleSelect({
        type: 'multiple',
        list: MOCK_MULTIPLE_LIST,
        value: [],
        scrollSelectedItemIntoView: true,
      });
      const instance = page.rootInstance;
      const mockListRef = { scrollTo: jest.fn(), clientHeight: 100 };
      const mockSelectedItemRef = { offsetTop: 100, offsetHeight: 40 };
      instance['listRef'] = mockListRef;
      instance['selectedItemRef'] = mockSelectedItemRef;
      instance['scrollSelectedListItemIntoView']();
      expect(mockListRef.scrollTo).not.toHaveBeenCalled();
    });
    it('should not scroll when selectedItemRef is not set', async () => {
      const page = await renderSingleSelect({ scrollSelectedItemIntoView: true });
      const instance = page.rootInstance;
      const mockListRef = { scrollTo: jest.fn(), clientHeight: 100 };
      instance['listRef'] = mockListRef;
      instance['selectedItemRef'] = undefined;
      instance['scrollSelectedListItemIntoView']();
      expect(mockListRef.scrollTo).not.toHaveBeenCalled();
    });
    it('should not scroll when listRef is not set', async () => {
      const page = await renderSingleSelect({ scrollSelectedItemIntoView: true });
      const instance = page.rootInstance;
      const mockSelectedItemRef = { offsetTop: 100, offsetHeight: 40 };
      instance['listRef'] = undefined;
      instance['selectedItemRef'] = mockSelectedItemRef;
      // should return early without throwing
      expect(() => instance['scrollSelectedListItemIntoView']()).not.toThrow();
    });
    it('should call scrollTo with correct top when selected item is below the visible area', async () => {
      const page = await renderSingleSelect({ scrollSelectedItemIntoView: true });
      const instance = page.rootInstance;
      // itemBottom = 100 + 40 = 140; top = max(0, 140 + 4 - 100) = 44
      const mockListRef = { scrollTo: jest.fn(), clientHeight: 100 };
      const mockSelectedItemRef = { offsetTop: 100, offsetHeight: 40 };
      instance['listRef'] = mockListRef;
      instance['selectedItemRef'] = mockSelectedItemRef;
      instance['scrollSelectedListItemIntoView']();
      expect(mockListRef.scrollTo).toHaveBeenCalledWith({ top: 44, behavior: 'smooth' });
    });
  });
});
