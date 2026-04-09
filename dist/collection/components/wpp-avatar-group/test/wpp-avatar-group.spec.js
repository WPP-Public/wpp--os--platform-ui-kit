import { newSpecPage } from '@stencil/core/testing';
import { WppAvatarGroup } from '../wpp-avatar-group';
import { h } from '@stencil/core';
import { AVATAR_COLORS_VARIANTS } from '../const';
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
      template: () => h("wpp-avatar-group-v4-0-0", { avatars: avatars }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should toggle tippy show() depending on pressed key', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    const instance = page.rootInstance;
    const showSpy = jest.fn();
    instance.menuContextTippyRef = { show: showSpy };
    const testCases = [
      { key: 'Enter', shouldCall: true },
      { key: ' ', shouldCall: true },
      { key: 'Escape', shouldCall: false },
      { key: 'Tab', shouldCall: false },
      { key: 'A', shouldCall: false },
    ];
    for (const { key, shouldCall } of testCases) {
      showSpy.mockClear(); // reset for each key event
      instance['onKeyDown'](new KeyboardEvent('keydown', { key }));
      if (shouldCall) {
        expect(showSpy).toHaveBeenCalled();
      }
      else {
        expect(showSpy).not.toHaveBeenCalled();
      }
    }
  });
  it('should emit wppSelectItem with correct values', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    const instance = page.rootInstance;
    const spy = jest.spyOn(instance.wppSelectItem, 'emit');
    const mockEvent = {
      detail: { value: 'john' },
    };
    instance['handleAvatarClick'](mockEvent, 3, false);
    expect(spy).toHaveBeenCalledWith({
      value: 'john',
      avatarIndex: 3,
      fromDropdown: false,
    });
  });
  it('should assign colors only to avatars without src & color', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    const instance = page.rootInstance;
    const avatars = [
      { name: 'A', src: undefined, color: undefined },
      { name: 'B', src: undefined, color: undefined },
      { name: 'C', src: 'img.png', color: undefined },
      { name: 'D', src: undefined, color: 'red' },
    ];
    const result = instance['getAvatarsWithColors']([...avatars]);
    expect(result[0].color).toBe(AVATAR_COLORS_VARIANTS[0]);
    expect(result[1].color).toBe(AVATAR_COLORS_VARIANTS[1]);
    expect(result[2].color).toBe(undefined);
    expect(result[3].color).toBe('red');
  });
  it('should assign colors and cycle when index exceeds AVATAR_COLORS_VARIANTS length', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    const instance = page.rootInstance;
    const avatars = Array(AVATAR_COLORS_VARIANTS.length + 2)
      .fill(0)
      .map((_, i) => ({
      name: `A${i}`,
      src: undefined,
      color: undefined,
    }));
    const result = instance['getAvatarsWithColors']([...avatars]);
    for (let i = 0; i < AVATAR_COLORS_VARIANTS.length; i++) {
      expect(result[i].color).toBe(AVATAR_COLORS_VARIANTS[i]);
    }
    expect(result[AVATAR_COLORS_VARIANTS.length].color).toBe(AVATAR_COLORS_VARIANTS[0]);
    expect(result[AVATAR_COLORS_VARIANTS.length + 1].color).toBe(AVATAR_COLORS_VARIANTS[1]);
  });
  it('emits with value and index', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    const inst = page.rootInstance;
    const emitSpy = jest.spyOn(inst.wppSelectItem, 'emit');
    const el = document.createElement('wpp-list-item');
    inst['handleListItemClick']({ currentTarget: el }, 2);
    expect(emitSpy).toHaveBeenCalledWith({
      value: el,
      fromDropdown: true,
      avatarIndex: 2,
    });
  });
  it('should default interactable to true when undefined', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    const inst = page.rootInstance;
    inst.avatars = [
      { name: 'A', src: 'a.png' },
      { name: 'B', src: 'b.png', interactable: true },
    ];
    await page.waitForChanges();
    const result = inst['getAvatarsWithColors'](inst.avatars);
    expect(result[0].interactable ?? true).toBe(true);
    expect(result[1].interactable).toBe(true);
  });
  it('calls handleAvatarClick when wpp-avatar dispatches wppClick', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    // Prepare avatars so at least one avatar is rendered
    page.rootInstance.avatars = [{ name: 'John', src: 'john.png' }];
    await page.waitForChanges();
    const inst = page.rootInstance;
    const spy = jest.spyOn(inst.wppSelectItem, 'emit');
    const avatar = page.root?.shadowRoot?.querySelector('wpp-avatar');
    avatar?.dispatchEvent(new CustomEvent('wppClick', {
      detail: { value: 'John' },
      bubbles: true,
      composed: true,
    }));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith({
      value: 'John',
      avatarIndex: 0,
      fromDropdown: false,
    });
  });
  it('reads merged dropdownConfig from <wpp-menu-context> and runs onCreate/onShow/onDestroy', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group></wpp-avatar-group>`,
    });
    const inst = page.rootInstance;
    inst.dropdownConfig = { onShow: jest.fn() };
    inst.avatars = [
      { name: 'a' },
      { name: 'b' },
      { name: 'c' },
      { name: 'd' },
      { name: 'e' },
      { name: 'f' },
      { name: 'g' },
    ];
    await page.waitForChanges();
    const menu = page.root?.shadowRoot?.querySelector('wpp-menu-context');
    expect(menu).not.toBeNull();
    const dropdownConfig = menu.dropdownConfig;
    expect(dropdownConfig).toBeDefined();
    expect(typeof dropdownConfig.onCreate).toBe('function');
    expect(typeof dropdownConfig.onShow).toBe('function');
    expect(typeof dropdownConfig.onDestroy).toBe('function');
    const fakeListItem = { setFocus: jest.fn() };
    const fakeInstance = {
      popper: {
        querySelector: jest.fn().mockReturnValue(fakeListItem),
      },
    };
    dropdownConfig.onCreate(fakeInstance);
    expect(inst.menuContextTippyRef).toBe(fakeInstance);
    dropdownConfig.onShow(fakeInstance);
    expect(fakeInstance.popper.querySelector).toHaveBeenCalledWith('.wpp-list-item');
    expect(fakeListItem.setFocus).toHaveBeenCalled();
    expect(inst.dropdownConfig.onShow).toHaveBeenCalledWith(fakeInstance);
    dropdownConfig.onDestroy();
    expect(inst.menuContextTippyRef).toBeUndefined();
  });
  it('should call handleListItemClick when hidden avatar is clicked', async () => {
    const page = await newSpecPage({
      components: [WppAvatarGroup],
      html: `<wpp-avatar-group max-avatars-to-display="2"></wpp-avatar-group>`,
    });
    const inst = page.rootInstance;
    // Provide more avatars than maxAvatarsToDisplay
    inst.avatars = [{ name: 'A' }, { name: 'B' }, { name: 'C' }, { name: 'D' }];
    await page.waitForChanges();
    // Spy on the emitted event
    const spy = jest.spyOn(inst.wppSelectItem, 'emit');
    // Find the first hidden wpp-list-item (the 3rd avatar triggers overflow)
    const hiddenItem = page.root?.shadowRoot?.querySelector('wpp-list-item[value="C"]');
    expect(hiddenItem).not.toBeNull();
    // Dispatch a fake wppChangeListItem event
    hiddenItem.dispatchEvent(new CustomEvent('wppChangeListItem', {
      detail: { value: 'C' },
      bubbles: true,
      composed: true,
    }));
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledWith({
      value: hiddenItem,
      fromDropdown: true,
      avatarIndex: 2, // "C" is at index 2 in the full avatars array (A=0, B=1, C=2)
    });
  });
  describe('nonInteractive prop on dropdown list items (WPPOPENDS-1169)', () => {
    it('should render wpp-list-item with nonInteractive attribute only when avatar.interactable is false', async () => {
      const avatars = [
        { name: 'A', interactable: true },
        { name: 'B', interactable: true },
        { name: 'C', interactable: false },
        { name: 'D' }, // undefined interactable - should default to interactable
      ];
      const page = await newSpecPage({
        components: [WppAvatarGroup],
        template: () => h("wpp-avatar-group-v4-0-0", { avatars: avatars, maxAvatarsToDisplay: 2 }),
      });
      await page.waitForChanges();
      const listItemC = page.root?.shadowRoot?.querySelector('wpp-list-item[value="C"]');
      const listItemD = page.root?.shadowRoot?.querySelector('wpp-list-item[value="D"]');
      expect(listItemC).not.toBeNull();
      expect(listItemD).not.toBeNull();
      // C has interactable: false, so nonInteractive should be true
      expect(listItemC?.outerHTML).toContain('noninteractive');
      // D has undefined interactable, so nonInteractive should be false (attribute absent)
      expect(listItemD?.outerHTML).not.toContain('noninteractive');
    });
    it('should render wpp-list-item without nonInteractive attribute when avatar.interactable is true', async () => {
      const avatars = [
        { name: 'A', interactable: true },
        { name: 'B', interactable: true },
        { name: 'C', interactable: true },
        { name: 'D', interactable: true },
      ];
      const page = await newSpecPage({
        components: [WppAvatarGroup],
        template: () => h("wpp-avatar-group-v4-0-0", { avatars: avatars, maxAvatarsToDisplay: 2 }),
      });
      await page.waitForChanges();
      const listItemC = page.root?.shadowRoot?.querySelector('wpp-list-item[value="C"]');
      const listItemD = page.root?.shadowRoot?.querySelector('wpp-list-item[value="D"]');
      expect(listItemC).not.toBeNull();
      expect(listItemD).not.toBeNull();
      // Both have interactable: true, so nonInteractive should be false (attribute absent)
      expect(listItemC?.outerHTML).not.toContain('noninteractive');
      expect(listItemD?.outerHTML).not.toContain('noninteractive');
    });
    it('should render mixed interactable states correctly', async () => {
      const avatars = [
        { name: 'A', interactable: true },
        { name: 'B', interactable: false },
        { name: 'C', interactable: true },
        { name: 'D', interactable: false },
        { name: 'E' }, // undefined (defaults to interactable)
      ];
      const page = await newSpecPage({
        components: [WppAvatarGroup],
        template: () => h("wpp-avatar-group-v4-0-0", { avatars: avatars, maxAvatarsToDisplay: 2 }),
      });
      await page.waitForChanges();
      const listItemC = page.root?.shadowRoot?.querySelector('wpp-list-item[value="C"]');
      const listItemD = page.root?.shadowRoot?.querySelector('wpp-list-item[value="D"]');
      const listItemE = page.root?.shadowRoot?.querySelector('wpp-list-item[value="E"]');
      // C has interactable: true
      expect(listItemC?.outerHTML).not.toContain('noninteractive');
      // D has interactable: false
      expect(listItemD?.outerHTML).toContain('noninteractive');
      // E has undefined interactable (defaults to interactable)
      expect(listItemE?.outerHTML).not.toContain('noninteractive');
    });
  });
});
