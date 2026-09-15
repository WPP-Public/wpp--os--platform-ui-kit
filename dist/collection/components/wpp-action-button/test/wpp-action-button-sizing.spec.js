import { join } from 'path';
import { readStyleSheet, scssDeclarations } from '../../common/test-utils/scss-declarations';
describe('wpp-action-button sizing', () => {
  // The action button was sized by `--wpp-typography-s-strong-line-height` plus padding, so the
  // token moving 22px -> 20px shrank the text variant to 30px while the icon-only variant — whose
  // 6px padding around a 20px icon is line-height independent — stayed at the 32px Figma specifies.
  const styles = readStyleSheet(join(__dirname, '..', 'wpp-action-button.scss'));
  const host = scssDeclarations(styles, [':host']);
  it('should be 32px tall regardless of the typography token', () => {
    expect(host.height).toBe('32px');
    expect(host.height).not.toContain('--wpp-typography');
  });
  it('should keep the text and icon-only variants on the same height', () => {
    const iconOnly = scssDeclarations(styles, ['button', '&.with-icon-only']);
    const iconPadding = host['--ab-icon-padding'].match(/,\s*([^)]+)\)/)[1].trim();
    const textPadding = host['--ab-padding'].match(/,\s*([^)]+)\)/)[1].trim();
    // Icon-only: 6px + 20px icon + 6px = 32px, which is what Figma specifies for every variant.
    expect(iconOnly.padding).toBe('var(--ab-icon-padding)');
    expect(iconPadding).toBe('6px');
    // Text: Figma pads 4px around its 24px line box for the same 32px.
    expect(textPadding).toBe('4px 8px');
  });
});
