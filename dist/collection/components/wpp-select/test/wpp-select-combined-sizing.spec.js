import { join } from 'path';
import { readStyleSheet, scssDeclarations } from '../../common/test-utils/scss-declarations';
describe('wpp-select combined sizing', () => {
  // The combined select draws the control's border on the embedded wpp-input's host and strips
  // the inner input's own. That host sits inside the select's shadow tree, where the document
  // box-sizing reset does not reach, so it used to measure the inner input plus 2px of border
  // and never quite matched the anchor beside it.
  const styles = readStyleSheet(join(__dirname, '..', 'wpp-select.scss'));
  const combinedInput = (...rest) => scssDeclarations(styles, [':host(.wpp-combined-select)', '.inputs-container', '.wpp-input', ...rest]);
  const anchor = (size) => scssDeclarations(styles, [':host', '.anchor', `&.size-${size}`]);
  it('should size the embedded input host to the anchor height for each size', () => {
    const host = combinedInput();
    expect(host['box-sizing']).toBe('border-box');
    expect(host.height).toBe(anchor('m').height);
    expect(combinedInput('&.wpp-size-s').height).toBe(anchor('s').height);
  });
  it('should let the inner input fill the bordered host instead of overriding its height token', () => {
    expect(combinedInput('&::part(body), &::part(anchor), &::part(input)').height).toBe('100%');
    expect(combinedInput('&::part(input)').border).toBe('none');
  });
});
