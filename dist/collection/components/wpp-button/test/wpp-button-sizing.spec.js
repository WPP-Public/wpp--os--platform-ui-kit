import { join } from 'path';
import { readStyleSheet, scssDeclarations } from '../../common/test-utils/scss-declarations';
describe('wpp-button sizing', () => {
  // The button had no height of its own: its 9px/5px vertical padding was picked to land on
  // 40px/32px around a 22px `--wpp-typography-s-strong-line-height`. When that token moved to
  // 20px the whole control shrank to 38px/30px and stopped lining up with wpp-input in a row.
  const styles = readStyleSheet(join(__dirname, '..', 'wpp-button.scss'));
  const inputStyles = readStyleSheet(join(__dirname, '..', '..', 'wpp-input', 'wpp-input.scss'));
  const button = (size) => scssDeclarations(styles, ['.button', `&.size-${size}`]);
  const inputHeight = (size) => scssDeclarations(inputStyles, [':host'])[`--text-input-height-${size}`].match(/,\s*([^)]+)\)/)[1]
    .trim();
  it('should give the button the height wpp-input uses for the same size', () => {
    expect(button('m').height).toBe('40px');
    expect(button('s').height).toBe('32px');
    expect(button('m').height).toBe(inputHeight('m'));
    expect(button('s').height).toBe(inputHeight('s'));
  });
  it('should not derive the height from a typography token', () => {
    expect(button('m').height).not.toContain('--wpp-typography');
    expect(button('s').height).not.toContain('--wpp-typography');
  });
});
