import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppTextareaInput } from '../wpp-textarea-input';
import { WppInlineMessage } from '../../wpp-inline-message/wpp-inline-message';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
describe('wpp-textarea-input', () => {
  it('renders component', async () => {
    const page = await newSpecPage({
      components: [WppTextareaInput],
      html: `<wpp-textarea-input />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with error message and label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppTextareaInput, WppInlineMessage, WppLabel, WppInternalLabel],
      template: () => h("wpp-textarea-input-v4-7-0", { "message-type": "warning", message: "warning message", labelConfig: labelConfig }),
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with characters-limit message', async () => {
    const page = await newSpecPage({
      components: [WppTextareaInput],
      html: `<wpp-textarea-input characters-limit="40" warning-threshold="30" error-threshold="25" />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('renders component with characters-limit and warning text messages', async () => {
    const page = await newSpecPage({
      components: [WppTextareaInput, WppInlineMessage],
      html: `<wpp-textarea-input characters-limit="40" warning-threshold="30" error-threshold="25" message='Warning message' message-type='warning' />`,
    });
    expect(page.root).toMatchSnapshot();
  });
  describe('Testing accessibility', () => {
    const getTextarea = (page) => page.root?.shadowRoot?.querySelector('textarea');
    it.each([
      [true, true],
      [undefined, false],
    ])('draws the focus ring from setFocus(%s): %s', async (isOutlined, hasRing) => {
      const page = await newSpecPage({
        components: [WppTextareaInput],
        html: `<wpp-textarea-input />`,
      });
      await page.root.setFocus(isOutlined);
      await page.waitForChanges();
      expect(getTextarea(page).classList.contains('tab-focus')).toBe(hasRing);
    });
    it('should keep the message and counter in the description when ariaProps adds its own describedby', async () => {
      const page = await newSpecPage({
        components: [WppTextareaInput, WppInlineMessage],
        template: () => (h("wpp-textarea-input-v4-7-0", { name: "bio", message: "Too long", messageType: "error", charactersLimit: 20, ariaProps: { describedby: 'extra-hint' } })),
      });
      const textarea = getTextarea(page);
      const ids = (textarea.getAttribute('aria-describedby') ?? '').split(' ');
      expect(ids).toContain('extra-hint');
      expect(ids).toContain(textarea.getAttribute('aria-errormessage'));
      expect(ids.map(id => page.root?.shadowRoot?.getElementById(id)?.getAttribute('data-testid'))).toContain('char-entered-label');
    });
    it('should keep the visible label in the name when ariaProps adds its own labelledby', async () => {
      const page = await newSpecPage({
        components: [WppTextareaInput, WppLabel, WppInternalLabel],
        template: () => (h("wpp-textarea-input-v4-7-0", { name: "bio", labelConfig: { text: 'Bio' }, ariaProps: { labelledby: 'section-title' } })),
      });
      const ids = (getTextarea(page).getAttribute('aria-labelledby') ?? '').split(' ');
      const label = page.root?.shadowRoot?.querySelector('wpp-label');
      expect(ids).toEqual([label.id, 'section-title']);
    });
    it('should still apply the other aria- props from ariaProps', async () => {
      const page = await newSpecPage({
        components: [WppTextareaInput],
        template: () => h("wpp-textarea-input-v4-7-0", { name: "comment", ariaProps: { label: 'Comment' } }),
      });
      expect(getTextarea(page).getAttribute('aria-label')).toBe('Comment');
    });
  });
});
