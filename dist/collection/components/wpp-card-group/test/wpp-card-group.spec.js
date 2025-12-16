import { newSpecPage } from '@stencil/core/testing';
import { WppCardGroup } from '../wpp-card-group';
import { WppCard } from '../components/wpp-card/wpp-card';
describe('wpp-card-group', () => {
  it('renders component with items and content inside cards', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
        <wpp-card-group size='m' value='phone'>
          <wpp-card name="contact" value="email">
            <wpp-typography>Email info content</wpp-typography>
            <p slot='header'>Email</p>
          </wpp-card>
          <wpp-card name="contact" value="mail">
            <wpp-typography>Email info content</wpp-typography>
            <p slot='header'>Mail</p>
          </wpp-card>
          <wpp-card name="contact" value="phone">
            <wpp-typography>Email info content</wpp-typography>
            <p slot='header'>Phone</p>
          </wpp-card>
        </wpp-card-group>`,
    });
    expect(page.root).toMatchSnapshot();
  });
});
describe('wpp-card-group value=0 handling', () => {
  it('initializes single-select with value 0', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
        <wpp-card-group>
          <wpp-card value="0"></wpp-card>
          <wpp-card value="1"></wpp-card>
        </wpp-card-group>
      `,
    });
    page.root.value = 0;
    await page.waitForChanges();
    const zero = page.root.querySelector('wpp-card[value="0"]');
    expect(zero.hasAttribute('checked')).toBe(true);
    expect(zero.checked).toBe(true);
    expect(zero.shadowRoot.querySelector('wpp-radio, wpp-checkbox')).not.toBeNull();
  });
  it('initializes multiple-select with 0 in array and toggles out correctly', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
        <wpp-card-group multiple>
          <wpp-card value="0"></wpp-card>
          <wpp-card value="1"></wpp-card>
        </wpp-card-group>
      `,
    });
    page.root.value = [0, '1'];
    await page.waitForChanges();
    const zero = page.root.querySelector('wpp-card[value="0"]');
    const one = page.root.querySelector('wpp-card[value="1"]');
    expect(zero.hasAttribute('checked')).toBe(true);
    expect(one.hasAttribute('checked')).toBe(true);
    expect(zero.checked).toBe(true);
    expect(one.checked).toBe(true);
    // Simulate the card’s wppClick (non-composed in component), but composed here for testing
    zero.dispatchEvent(new CustomEvent('wppClick', {
      detail: { value: zero.value, checked: false },
      bubbles: true,
      composed: true,
    }));
    await page.waitForChanges();
    expect(page.root.value).toEqual(['1']);
    expect(zero.checked).toBe(false);
    expect(zero.hasAttribute('checked')).toBe(false);
  });
  it('treats 0 and "0" as equal in single-select and allows empty deselection', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
        <wpp-card-group allow-empty-selection>
          <wpp-card value="0"></wpp-card>
          <wpp-card value="2"></wpp-card>
        </wpp-card-group>
      `,
    });
    page.root.value = 0;
    await page.waitForChanges();
    const zero = page.root.querySelector('wpp-card[value="0"]');
    expect(zero.hasAttribute('checked')).toBe(true);
    expect(zero.checked).toBe(true);
    zero.dispatchEvent(new CustomEvent('wppClick', {
      detail: { value: zero.value, checked: false },
      bubbles: true,
      composed: true,
    }));
    await page.waitForChanges();
    expect(page.root.value).toBe('');
    expect(zero.checked).toBe(false);
    expect(zero.hasAttribute('checked')).toBe(false);
  });
  it('handles nested card-group inside a card: inner children are not nested and selection works', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
      <wpp-card>
        <wpp-card-group>
          <wpp-card value="inner-a"></wpp-card>
          <wpp-card value="inner-b"></wpp-card>
          <wpp-card value="inner-c"></wpp-card>
        </wpp-card-group>
      </wpp-card>
    `,
    });
    const innerGroup = page.doc.querySelector('wpp-card-group');
    const innerA = innerGroup.querySelector('wpp-card[value="inner-a"]');
    const innerB = innerGroup.querySelector('wpp-card[value="inner-b"]');
    innerGroup.value = 'inner-a';
    await page.waitForChanges();
    expect(innerA.checked).toBe(true);
    expect(innerA.hasAttribute('nested')).toBe(false);
    expect(innerB.hasAttribute('nested')).toBe(false);
    expect(innerA.shadowRoot.querySelector('wpp-radio, wpp-checkbox')).not.toBeNull();
    // Select innerB by dispatching composed/bubbling wppClick
    innerB.dispatchEvent(new CustomEvent('wppClick', {
      detail: { value: innerB.value, checked: true },
      bubbles: true,
      composed: true,
    }));
    await page.waitForChanges();
    expect(innerGroup.value).toBe('inner-b');
    expect(innerB.checked).toBe(true);
    expect(innerGroup.querySelectorAll('wpp-card').length).toBe(3);
  });
  it('handles nested card-group inside a card: inner children are not nested and toggling works (multiple)', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
      <wpp-card>
        <wpp-card-group multiple>
          <wpp-card value="inner-a"></wpp-card>
          <wpp-card value="inner-b"></wpp-card>
        </wpp-card-group>
      </wpp-card>
    `,
    });
    const innerGroup = page.doc.querySelector('wpp-card-group');
    const innerA = innerGroup.querySelector('wpp-card[value="inner-a"]');
    innerGroup.value = ['inner-a'];
    await page.waitForChanges();
    expect(innerA.checked).toBe(true);
    expect(innerA.hasAttribute('nested')).toBe(false);
    innerA.dispatchEvent(new CustomEvent('wppClick', {
      detail: { value: innerA.value, checked: false },
      bubbles: true,
      composed: true,
    }));
    await page.waitForChanges();
    expect(innerGroup.value).toEqual([]);
    expect(innerA.checked).toBe(false);
    expect(innerGroup.querySelectorAll('wpp-card').length).toBe(2);
  });
  it('nested single-select with allowEmptySelection clears value on deselect', async () => {
    const page = await newSpecPage({
      components: [WppCardGroup, WppCard],
      html: `
      <wpp-card>
        <wpp-card-group allow-empty-selection>
          <wpp-card value="inner-a"></wpp-card>
          <wpp-card value="inner-b"></wpp-card>
        </wpp-card-group>
      </wpp-card>
    `,
    });
    await page.waitForChanges();
    const innerGroup = page.doc.querySelector('wpp-card-group');
    const innerA = innerGroup.querySelector('wpp-card[value="inner-a"]');
    innerGroup.value = 'inner-a';
    await page.waitForChanges();
    innerA.dispatchEvent(new CustomEvent('wppClick', {
      detail: { value: innerA.value, checked: false },
      bubbles: true,
      composed: true,
    }));
    await page.waitForChanges();
    expect(innerGroup.value).toBe('');
    expect(innerA.checked).toBe(false);
  });
});
