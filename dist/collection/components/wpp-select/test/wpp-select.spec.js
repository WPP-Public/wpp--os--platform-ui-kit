import { h } from '@stencil/core';
import { newSpecPage } from '@stencil/core/testing';
import { WppSelect } from '../wpp-select';
import { WppListItem } from '../../wpp-list-item/wpp-list-item';
import { WppLabel } from '../../wpp-label/wpp-label';
import { WppInternalLabel } from '../../wpp-label/components/wpp-internal-label/wpp-internal-label';
import * as themeUtils from '../../../utils/subscribe-to-theme';
import { MOCK_MULTIPLE_LIST, MOCK_SINGLE_LIST } from './mocks';
describe('wpp-select', () => {
  it('should render wpp-select with combined type with options list', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      html: `
        <wpp-select placeholder='placeholder' type='combined'>
          <wpp-list-item value="car" data-id="1"><span slot="label">Car</span></wpp-list-item>
          <wpp-list-item value="house" data-id="2" disabled><span slot="label">House</span></wpp-list-item>
          <wpp-list-item value="apartment" data-id="3"><span slot="label">Apartment</span></wpp-list-item>
        </wpp-select>`,
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  it('should render wpp-select with combined type with options list and with label, icon and tooltip description', async () => {
    const labelConfig = {
      text: 'Test label',
      locales: {
        optional: 'Optick',
      },
      icon: 'wpp-icon-mail',
      description: 'Your email will be used to send you a confirmation number',
    };
    const page = await newSpecPage({
      components: [WppSelect, WppListItem, WppLabel, WppInternalLabel],
      template: () => (h("wpp-select-v4-5-0", { placeholder: "Placeholder", type: "combined", labelConfig: labelConfig }, h("wpp-list-item-v4-5-0", { value: "car", "data-id": "1" }, h("span", { slot: "label" }, "Car")), h("wpp-list-item-v4-5-0", { value: "house", "data-id": "2", disabled: true }, h("span", { slot: "label" }, "House")), h("wpp-list-item-v4-5-0", { value: "apartment", "data-id": "3" }, h("span", { slot: "label" }, "Apartment")))),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root).toMatchSnapshot();
  });
  describe('subscribing to theme changes', () => {
    it('Test that the component subscribes to the theme changes when it loads', async () => {
      const mockStart = jest.fn();
      const mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
      await newSpecPage({
        components: [WppSelect, WppListItem, WppLabel, WppInternalLabel],
        template: () => (h("wpp-select-v4-5-0", { placeholder: "Placeholder", type: "combined" }, h("wpp-list-item-v4-5-0", { value: "car", "data-id": "1" }, h("span", { slot: "label" }, "Car")), h("wpp-list-item-v4-5-0", { value: "house", "data-id": "2", disabled: true }, h("span", { slot: "label" }, "House")), h("wpp-list-item-v4-5-0", { value: "apartment", "data-id": "3" }, h("span", { slot: "label" }, "Apartment")))),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      expect(mockStart).toHaveBeenCalled();
    });
    it('Test that the component unsubscribes to theme changes when it disconnects', async () => {
      const mockStart = jest.fn();
      const mockStop = jest.fn();
      jest.spyOn(themeUtils, 'themeSubscriptionController').mockReturnValue({
        start: mockStart,
        stop: mockStop,
      });
      const page = await newSpecPage({
        components: [WppSelect, WppListItem, WppLabel, WppInternalLabel],
        template: () => (h("wpp-select-v4-5-0", { placeholder: "Placeholder", type: "combined" }, h("wpp-list-item-v4-5-0", { value: "car", "data-id": "1" }, h("span", { slot: "label" }, "Car")), h("wpp-list-item-v4-5-0", { value: "house", "data-id": "2", disabled: true }, h("span", { slot: "label" }, "House")), h("wpp-list-item-v4-5-0", { value: "apartment", "data-id": "3" }, h("span", { slot: "label" }, "Apartment")))),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      page.root?.remove();
      expect(mockStop).toHaveBeenCalled();
    });
  });
  describe('label click behaviour', () => {
    const LABEL_CONFIG = { text: 'Test label' };
    const SELECT_NAME = 'test-select';
    const renderSelectWithLabel = async (type, disabled = false) => {
      const page = await newSpecPage({
        components: [WppSelect, WppLabel, WppInternalLabel],
        template: () => (h("wpp-select-v4-5-0", { name: SELECT_NAME, type: type, placeholder: "Placeholder", list: MOCK_SINGLE_LIST, labelConfig: LABEL_CONFIG, disabled: disabled })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const anchor = page.root?.shadowRoot?.querySelector('.anchor');
      const wppLabel = page.root?.shadowRoot?.querySelector('wpp-label');
      return {
        wppLabel,
        // The control the label is bound to through `htmlFor`.
        anchorInput: anchor.querySelector('input.input'),
      };
    };
    it.each(['single', 'combined'])('should bind the %s select label to the input rendered inside the anchor', async (type) => {
      const { wppLabel, anchorInput } = await renderSelectWithLabel(type);
      expect(wppLabel.htmlFor).toBe(SELECT_NAME);
      expect(anchorInput.id).toBe(SELECT_NAME);
    });
  });
  it('should render single select warning state without a message', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => h("wpp-select-v4-5-0", { messageType: "warning", list: MOCK_SINGLE_LIST }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('.anchor')).toHaveClass('with-warnings');
    expect(page.root?.shadowRoot?.querySelector('wpp-inline-message')).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).toBeNull();
  });
  describe('Testing label hover state', () => {
    it('applies the hover class to a single-select anchor while its label is hovered', async () => {
      const page = await newSpecPage({
        components: [WppSelect, WppLabel, WppInternalLabel],
        template: () => h("wpp-select-v4-5-0", { labelConfig: { text: 'Select label' }, list: MOCK_SINGLE_LIST }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const label = page.root?.shadowRoot?.querySelector('wpp-label');
      const anchor = page.root?.shadowRoot?.querySelector('.anchor');
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(anchor).toHaveClass('label-hovered');
      label.dispatchEvent(new MouseEvent('mouseleave'));
      await page.waitForChanges();
      expect(anchor).not.toHaveClass('label-hovered');
    });
    it('does not apply the hover class to a disabled single-select anchor', async () => {
      const page = await newSpecPage({
        components: [WppSelect, WppLabel, WppInternalLabel],
        template: () => h("wpp-select-v4-5-0", { disabled: true, labelConfig: { text: 'Select label' }, list: MOCK_SINGLE_LIST }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const label = page.root?.shadowRoot?.querySelector('wpp-label');
      const anchor = page.root?.shadowRoot?.querySelector('.anchor');
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(anchor).not.toHaveClass('label-hovered');
    });
    it('applies the hover class to a multiple-select anchor while its label is hovered', async () => {
      const page = await newSpecPage({
        components: [WppSelect, WppLabel, WppInternalLabel],
        template: () => (h("wpp-select-v4-5-0", { type: "multiple", value: [], labelConfig: { text: 'Select label' }, list: MOCK_MULTIPLE_LIST })),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const label = page.root?.shadowRoot?.querySelector('wpp-label');
      const anchor = page.root?.shadowRoot?.querySelector('.anchor');
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(anchor).toHaveClass('label-hovered');
      label.dispatchEvent(new MouseEvent('mouseleave'));
      await page.waitForChanges();
      expect(anchor).not.toHaveClass('label-hovered');
    });
    it('applies the hover class to a combined-select container while its label is hovered', async () => {
      const page = await newSpecPage({
        components: [WppSelect, WppLabel, WppInternalLabel],
        template: () => h("wpp-select-v4-5-0", { type: "combined", labelConfig: { text: 'Select label' }, list: MOCK_SINGLE_LIST }),
      });
      await new Promise(resolve => setTimeout(resolve, 0));
      await page.waitForChanges();
      const label = page.root?.shadowRoot?.querySelector('wpp-label');
      const container = page.root?.shadowRoot?.querySelector('.inputs-container');
      label.dispatchEvent(new MouseEvent('mouseenter'));
      await page.waitForChanges();
      expect(container).toHaveClass('label-hovered');
      label.dispatchEvent(new MouseEvent('mouseleave'));
      await page.waitForChanges();
      expect(container).not.toHaveClass('label-hovered');
    });
  });
  it('should render multiple select error state without a message', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => h("wpp-select-v4-5-0", { type: "multiple", value: [], messageType: "error", list: MOCK_MULTIPLE_LIST }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('.anchor')).toHaveClass('with-errors');
    expect(page.root?.shadowRoot?.querySelector('wpp-inline-message')).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).toBeNull();
  });
  it('should render combined select warning state without a message', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => h("wpp-select-v4-5-0", { type: "combined", messageType: "warning", list: MOCK_SINGLE_LIST }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('.inputs-container')).toHaveClass('with-warnings');
    expect(page.root?.shadowRoot?.querySelector('wpp-inline-message')).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).toBeNull();
  });
  it('should not render a message tooltip when messageInTooltip is enabled without a message', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => h("wpp-select-v4-5-0", { messageType: "error", messageInTooltip: true, list: MOCK_SINGLE_LIST }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('.anchor')).toHaveClass('with-errors');
    expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).toBeNull();
  });
  it('should keep rendering an inline message when message is provided', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => h("wpp-select-v4-5-0", { messageType: "warning", message: "Review this value", list: MOCK_SINGLE_LIST }),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('.anchor')).toHaveClass('with-warnings');
    expect(page.root?.shadowRoot?.querySelector('wpp-inline-message')).not.toBeNull();
    expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).toBeNull();
  });
  it('should keep rendering a message tooltip when message and messageInTooltip are provided', async () => {
    const page = await newSpecPage({
      components: [WppSelect],
      template: () => (h("wpp-select-v4-5-0", { messageType: "error", message: "This value is invalid", messageInTooltip: true, list: MOCK_SINGLE_LIST })),
    });
    await new Promise(resolve => setTimeout(resolve, 0));
    await page.waitForChanges();
    expect(page.root?.shadowRoot?.querySelector('.anchor')).toHaveClass('with-errors');
    expect(page.root?.shadowRoot?.querySelector('wpp-inline-message')).toBeNull();
    expect(page.root?.shadowRoot?.querySelector('wpp-tooltip')).not.toBeNull();
  });
});
