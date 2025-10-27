import { newSpecPage } from '@stencil/core/testing';
import { WppSegmentedControl } from '../wpp-segmented-control';
import { WppSegmentedControlItem } from '../components/wpp-segmented-control-item/wpp-segmented-control-item';
describe('wpp-segmented-control', () => {
  it('should render bar with items text and size m', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControl, WppSegmentedControlItem],
      html: `<wpp-segmented-control size="m">
               <wpp-segmented-control-item
                  active
                  value="item-1"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  value="item-2"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  value="item-3"
                >Text</wpp-segmented-control-item>
            </wpp-segmented-control>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render bar with items text and size s and hug content off', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControl, WppSegmentedControlItem],
      html: `<wpp-segmented-control size="s" hug-content-off>
               <wpp-segmented-control-item
                  active
                  hug-content-off
                  value="item-1"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  hug-content-off
                  value="item-2"
                >Text</wpp-segmented-control-item>
                <wpp-segmented-control-item
                  hug-content-off
                  value="item-3"
                >Text</wpp-segmented-control-item>
            </wpp-segmented-control>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render item with text', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render disabled item with text and size s', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item disabled size="s" value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render checked item with text and size m', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item active size="m" value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render item with text and counter', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControlItem],
      html: `<wpp-segmented-control-item counter="2" value="item-1">Text</wpp-segmented-control-item>`,
    });
    expect(page.root).toMatchSnapshot();
  });
  it('should render bar with icons and size s', async () => {
    const page = await newSpecPage({
      components: [WppSegmentedControl, WppSegmentedControlItem],
      html: `<wpp-segmented-control size="s">
               <wpp-segmented-control-item
                  active
                  variant="icon"
                  value="item-1"
                ><wpp-icon-grid-dots></wpp-icon-grid-dots></wpp-segmented-control-item>
                <wpp-segmented-control-item
                  variant="icon"
                  value="item-2"
                ><wpp-icon-list></wpp-icon-list></wpp-segmented-control-item>
                <wpp-segmented-control-item
                  variant="icon"
                  value="item-3"
                ><wpp-icon-addd-document></wpp-icon-addd-document></wpp-segmented-control-item>
            </wpp-segmented-control>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
