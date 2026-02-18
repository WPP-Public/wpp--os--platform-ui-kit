import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppCheckboxGroup } from '../wpp-checkbox-group';
import { WppCheckbox } from '../../wpp-checkbox/wpp-checkbox';
describe('wpp-checkbox-group', () => {
  let timeoutSpy;
  beforeAll(() => {
    timeoutSpy = jest.spyOn(global, 'setTimeout').mockImplementation((cb) => {
      cb();
      return 0;
    });
  });
  afterAll(() => {
    timeoutSpy.mockRestore();
  });
  const createGroup = async (html = `
    <wpp-checkbox-group>
      <wpp-checkbox class="wpp-checkbox" value="a"></wpp-checkbox>
      <wpp-checkbox class="wpp-checkbox" value="b"></wpp-checkbox>
    </wpp-checkbox-group>
  `) => {
    const page = await newSpecPage({
      components: [WppCheckboxGroup],
      html,
    });
    return {
      page,
      instance: page.rootInstance,
      root: page.root,
    };
  };
  const create = async (props = {}) => {
    const page = await newSpecPage({
      components: [WppCheckboxGroup],
      html: `<wpp-checkbox-group></wpp-checkbox-group>`,
    });
    const instance = page.rootInstance;
    Object.assign(instance, props);
    await page.waitForChanges();
    return {
      page,
      root: page.root,
      instance,
    };
  };
  it('should render checkbox-group with 4 items', async () => {
    const page = await newSpecPage({
      components: [WppCheckboxGroup, WppCheckbox],
      template: () => (h("wpp-checkbox-group-v3-5-0", null, h("wpp-checkbox-v3-5-0", { required: true, name: "email", value: "email", labelConfig: { text: 'Email' } }), h("wpp-checkbox-v3-5-0", { required: true, name: "mail", value: "mail", labelConfig: { text: 'Mail' } }), h("wpp-checkbox-v3-5-0", { required: true, name: "phone", value: "phone", labelConfig: { text: 'Phone' } }), h("wpp-checkbox-v3-5-0", { required: true, name: "fax", value: "fax", labelConfig: { text: 'Fax' } }))),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('adds value when checkbox is clicked', async () => {
    const { instance, root } = (await createGroup());
    const changeSpy = jest.fn();
    root.addEventListener('wppChange', changeSpy);
    instance.value = [];
    instance.onClickCheckbox(new CustomEvent('wppClickCheckbox', {
      detail: { value: 'a' },
    }));
    expect(instance.value).toEqual(['a']);
    expect(changeSpy).toHaveBeenCalledWith(expect.objectContaining({
      detail: { value: ['a'] },
    }));
  });
  it('removes value when checkbox is clicked again', async () => {
    const { instance } = (await createGroup());
    instance.value = ['a'];
    instance.onClickCheckbox(new CustomEvent('wppClickCheckbox', {
      detail: { value: 'a' },
    }));
    expect(instance.value).toEqual([]);
  });
  it('should emit wppFocus and wppBlur events', async () => {
    const page = await newSpecPage({
      components: [WppCheckboxGroup],
      html: `<wpp-checkbox-group></wpp-checkbox-group>`,
    });
    const focusSpy = jest.fn();
    const blurSpy = jest.fn();
    page?.root?.addEventListener('wppFocus', focusSpy);
    page?.root?.addEventListener('wppBlur', blurSpy);
    page?.root?.dispatchEvent(new FocusEvent('focus'));
    page?.root?.dispatchEvent(new FocusEvent('blur'));
    await page.waitForChanges();
    expect(focusSpy).toHaveBeenCalledTimes(1);
    expect(blurSpy).toHaveBeenCalledTimes(1);
  });
  it('renders label when labelConfig.text is provided', async () => {
    const { root } = await create({
      labelConfig: { text: 'My label' },
    });
    const label = root.shadowRoot?.querySelector('wpp-label');
    expect(label).not.toBeNull();
    expect(label?.getAttribute('id')).toBe('label-id');
  });
  it('adds aria-describedby when message exists', async () => {
    const { root } = await create({
      message: 'Something went wrong',
    });
    const group = root.shadowRoot?.querySelector('.group-container');
    expect(group?.getAttribute('aria-describedby')).toBe('description-id');
  });
  it('renders inline message when message is provided', async () => {
    const { root } = await create({
      message: 'Error message',
      messageType: 'error',
    });
    const message = root.shadowRoot?.querySelector('wpp-inline-message');
    expect(message).not.toBeNull();
    expect(message?.getAttribute('message')).toBe('Error message');
  });
  it('applies gap style when gap is provided', async () => {
    const { root } = await create({
      gap: 12,
    });
    const content = root.shadowRoot?.querySelector('.content');
    expect(content?.style.gap).toBe('12px');
  });
});
