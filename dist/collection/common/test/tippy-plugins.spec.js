import { hideOnPopperBlur } from '../tippy-plugins';
describe('hideOnPopperBlur', () => {
  const createInstance = (popper) => {
    const instance = {
      popper,
      props: { hideOnPopperBlur: true },
      hide: jest.fn(),
    };
    return instance;
  };
  const setupPopper = () => {
    const popper = document.createElement('div');
    document.body.appendChild(popper);
    const instance = createInstance(popper);
    const hooks = hideOnPopperBlur.fn(instance);
    hooks.onCreate();
    return { popper, instance };
  };
  afterEach(() => {
    document.body.innerHTML = '';
  });
  it('hides when focus moves to an element outside the popper', () => {
    const { popper, instance } = setupPopper();
    const outside = document.createElement('button');
    document.body.appendChild(outside);
    popper.dispatchEvent(new FocusEvent('focusout', { relatedTarget: outside }));
    expect(instance.hide).toHaveBeenCalled();
  });
  it('does not hide when focus stays inside the popper', () => {
    const { popper, instance } = setupPopper();
    const inside = document.createElement('button');
    popper.appendChild(inside);
    popper.dispatchEvent(new FocusEvent('focusout', { relatedTarget: inside }));
    expect(instance.hide).not.toHaveBeenCalled();
  });
  it('does not hide when there is no related target', () => {
    const { popper, instance } = setupPopper();
    popper.dispatchEvent(new FocusEvent('focusout'));
    expect(instance.hide).not.toHaveBeenCalled();
  });
  it('does not hide when focus moves into a nested popup anchored inside the popper', () => {
    const { popper, instance } = setupPopper();
    // Submenu popups are appended to the document root, not to the parent
    // popper, but their Tippy reference (anchor) lives inside the parent menu.
    const nestedAnchor = document.createElement('div');
    popper.appendChild(nestedAnchor);
    const nestedPopper = document.createElement('div');
    nestedPopper.setAttribute('data-tippy-root', '');
    nestedPopper._tippy = { reference: nestedAnchor };
    document.body.appendChild(nestedPopper);
    const nestedItem = document.createElement('button');
    nestedPopper.appendChild(nestedItem);
    popper.dispatchEvent(new FocusEvent('focusout', { relatedTarget: nestedItem }));
    expect(instance.hide).not.toHaveBeenCalled();
  });
  it('hides when focus moves into an unrelated popup', () => {
    const { popper, instance } = setupPopper();
    const unrelatedAnchor = document.createElement('div');
    document.body.appendChild(unrelatedAnchor);
    const unrelatedPopper = document.createElement('div');
    unrelatedPopper.setAttribute('data-tippy-root', '');
    unrelatedPopper._tippy = { reference: unrelatedAnchor };
    document.body.appendChild(unrelatedPopper);
    const unrelatedItem = document.createElement('button');
    unrelatedPopper.appendChild(unrelatedItem);
    popper.dispatchEvent(new FocusEvent('focusout', { relatedTarget: unrelatedItem }));
    expect(instance.hide).toHaveBeenCalled();
  });
});
