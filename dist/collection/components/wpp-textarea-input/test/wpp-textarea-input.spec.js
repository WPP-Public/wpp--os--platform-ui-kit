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
      template: () => h("wpp-textarea-input-v3-6-0", { "message-type": "warning", message: "warning message", labelConfig: labelConfig }),
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
});
