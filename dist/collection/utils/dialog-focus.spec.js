import { focusDialogEdge } from './dialog-focus';
// Stencil's mock DOM reports `tabIndex` -1 for anything without a `tabindex` attribute, and its slots aren't
// assigned to real shadow hosts, so the controls here declare their tab stop and the slot gets its assigned elements stubbed.
const control = (tag, attributes = {}) => {
  const element = document.createElement(tag);
  element.setAttribute('tabindex', '0');
  Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  element.focus = jest.fn();
  return element;
};
const dialogWith = (...children) => {
  const dialog = document.createElement('div');
  dialog.setAttribute('tabindex', '-1');
  dialog.focus = jest.fn();
  children.forEach(child => dialog.appendChild(child));
  document.body.appendChild(dialog);
  return dialog;
};
describe('focusDialogEdge', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });
  it('focuses the first control for the end sentinel and the last control for the start sentinel', () => {
    const input = control('input');
    const cancel = control('button');
    const confirm = control('button');
    const dialog = dialogWith(input, cancel, confirm);
    focusDialogEdge(dialog, 'first');
    expect(input.focus).toHaveBeenCalled();
    focusDialogEdge(dialog, 'last');
    expect(confirm.focus).toHaveBeenCalled();
    expect(cancel.focus).not.toHaveBeenCalled();
  });
  it('skips controls that are disabled, out of the tab order or hidden', () => {
    const first = control('button');
    const last = control('button');
    const disabled = control('button');
    const outOfOrder = control('button', { tabindex: '-1' });
    const hidden = control('button');
    const fieldset = document.createElement('fieldset');
    const inDisabledFieldset = control('input');
    disabled.disabled = true;
    hidden.checkVisibility = () => false;
    fieldset.disabled = true;
    fieldset.appendChild(inDisabledFieldset);
    focusDialogEdge(dialogWith(outOfOrder, first, last, disabled, hidden, fieldset), 'last');
    expect(last.focus).toHaveBeenCalled();
    [disabled, outOfOrder, hidden, inDisabledFieldset].forEach(element => expect(element.focus).not.toHaveBeenCalled());
  });
  it('finds the native control inside a component shadow root', () => {
    const host = document.createElement('wpp-button');
    const nativeButton = control('button');
    host.attachShadow({ mode: 'open' }).appendChild(nativeButton);
    focusDialogEdge(dialogWith(host), 'first');
    expect(nativeButton.focus).toHaveBeenCalled();
  });
  it('follows a slot to the controls assigned to it', () => {
    const slot = document.createElement('slot');
    const slotted = control('button');
    slot.assignedElements = () => [slotted];
    focusDialogEdge(dialogWith(slot), 'last');
    expect(slotted.focus).toHaveBeenCalled();
  });
  it('focuses the dialog itself when it holds no controls', () => {
    const dialog = dialogWith(document.createElement('p'));
    focusDialogEdge(dialog, 'first');
    expect(dialog.focus).toHaveBeenCalled();
  });
});
