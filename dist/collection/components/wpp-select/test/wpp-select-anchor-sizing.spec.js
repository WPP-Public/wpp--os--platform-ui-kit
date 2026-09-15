import { join } from 'path';
import { readStyleSheet, scssDeclarations } from '../../common/test-utils/scss-declarations';
describe('wpp-select anchor sizing', () => {
  // The anchor used to have no height of its own: it was `--wpp-typography-s-body-line-height`
  // plus padding and borders. When that token moved 22px -> 20px the whole control silently
  // shrank to 30px/38px and stopped lining up with wpp-input in a row.
  const styles = readStyleSheet(join(__dirname, '..', 'wpp-select.scss'));
  const inputStyles = readStyleSheet(join(__dirname, '..', '..', 'wpp-input', 'wpp-input.scss'));
  const anchor = (size) => scssDeclarations(styles, [':host', '.anchor', `&.size-${size}`]);
  const inputHeight = (size) => scssDeclarations(inputStyles, [':host'])[`--text-input-height-${size}`].match(/,\s*([^)]+)\)/)[1]
    .trim();
  it('should give the boxed anchor the height wpp-input uses for the same size', () => {
    expect(anchor('s').height).toBe('32px');
    expect(anchor('m').height).toBe('40px');
    expect(anchor('s').height).toBe(inputHeight('s'));
    expect(anchor('m').height).toBe(inputHeight('m'));
  });
  it('should not size the anchor content from a typography token', () => {
    const overflowContainer = scssDeclarations(styles, [':host', '.anchor', '.overflow-container']);
    expect(overflowContainer.height).toBeUndefined();
  });
  it('should keep the borderless anchor variants sized by their content', () => {
    expect(scssDeclarations(styles, [':host', '.anchor', '&.anchor-button']).height).toBe('auto');
    expect(scssDeclarations(styles, [':host(.wpp-text-select)', '.anchor']).height).toBe('auto');
  });
  it('should let the combined select embed wpp-input at its own default height', () => {
    const combinedInput = scssDeclarations(styles, [':host(.wpp-combined-select)', '.inputs-container', '.wpp-input']);
    expect(combinedInput['--wpp-input-height-s']).toBeUndefined();
    expect(combinedInput['--wpp-input-height-m']).toBeUndefined();
  });
});
