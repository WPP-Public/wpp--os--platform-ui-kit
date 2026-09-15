import { join } from 'path';
import { readStyleSheet, scssDeclarations } from '../../common/test-utils/scss-declarations';
describe('wpp-time-picker anchor sizing', () => {
  // The anchor used to be sized purely by its content, so `--wpp-typography-s-body-line-height`
  // moving 22px -> 20px shrank it to 30px/38px and broke alignment with wpp-input in a row.
  const styles = readStyleSheet(join(__dirname, '..', 'wpp-time-picker.scss'));
  const inputStyles = readStyleSheet(join(__dirname, '..', '..', 'wpp-input', 'wpp-input.scss'));
  const anchor = (size) => scssDeclarations(styles, [':host(.wpp-time-picker)', '#anchor', `&.size-${size}`]);
  const inputHeight = (size) => scssDeclarations(inputStyles, [':host'])[`--text-input-height-${size}`].match(/,\s*([^)]+)\)/)[1]
    .trim();
  it('should give the anchor the height wpp-input uses for the same size', () => {
    expect(anchor('s').height).toBe('32px');
    expect(anchor('m').height).toBe('40px');
    expect(anchor('s').height).toBe(inputHeight('s'));
    expect(anchor('m').height).toBe(inputHeight('m'));
  });
});
