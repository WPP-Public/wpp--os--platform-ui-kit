/**
 * @file Unit tests for comparison-test-cases.ts
 * @description Tests for normalizeHtml() and runComparison() utilities.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
import { normalizeHtml, runComparison, COMPARISON_TEST_CASES } from './comparison-test-cases';
describe('wpp-richtext', () => {
  describe('comparison-test-cases', () => {
    describe('normalizeHtml()', () => {
      it('should collapse whitespace', () => {
        expect(normalizeHtml('<p>  Hello   World  </p>')).toBe('<p> Hello World </p>');
      });
      it('should strip class attributes', () => {
        expect(normalizeHtml('<p class="ql-editor">Hello</p>')).toBe('<p>Hello</p>');
      });
      it('should strip style attributes', () => {
        expect(normalizeHtml('<p style="color: red">Hello</p>')).toBe('<p>Hello</p>');
      });
      it('should strip data attributes', () => {
        expect(normalizeHtml('<div data-testid="foo">Hello</div>')).toBe('<div>Hello</div>');
      });
      it('should strip target, rel, and spellcheck attributes', () => {
        expect(normalizeHtml('<a href="https://example.com" target="_blank" rel="noopener">Link</a>')).toBe('<a href="https://example.com">Link</a>');
        expect(normalizeHtml('<pre spellcheck="false">Code</pre>')).toBe('<pre>Code</pre>');
      });
      it('should normalize self-closing tags', () => {
        expect(normalizeHtml('<br />')).toBe('<br/>');
        expect(normalizeHtml('<img   />')).toBe('<img/>');
      });
      it('should normalize tag whitespace', () => {
        expect(normalizeHtml('<p  >')).toBe('<p>');
      });
      it('should trim the result', () => {
        expect(normalizeHtml('  <p>Hello</p>  ')).toBe('<p>Hello</p>');
      });
    });
    describe('runComparison()', () => {
      it('should return match=true for matching HTML', () => {
        const result = runComparison({ id: 'test', name: 'Test', category: 'formatting', inputHtml: '', quillReferenceHtml: '<p>Hello</p>' }, '<p>Hello</p>');
        expect(result.match).toBe(true);
      });
      it('should return match=false for different HTML', () => {
        const result = runComparison({ id: 'test', name: 'Test', category: 'formatting', inputHtml: '', quillReferenceHtml: '<p>Hello</p>' }, '<p>World</p>');
        expect(result.match).toBe(false);
      });
      it('should ignore class differences', () => {
        const result = runComparison({
          id: 'test',
          name: 'Test',
          category: 'formatting',
          inputHtml: '',
          quillReferenceHtml: '<p class="ql-editor">Hello</p>',
        }, '<p>Hello</p>');
        expect(result.match).toBe(true);
      });
    });
    describe('COMPARISON_TEST_CASES', () => {
      it('should be a non-empty array', () => {
        expect(Array.isArray(COMPARISON_TEST_CASES)).toBe(true);
        expect(COMPARISON_TEST_CASES.length).toBeGreaterThan(0);
      });
      it('should have all required properties', () => {
        for (const tc of COMPARISON_TEST_CASES) {
          expect(tc.id).toBeDefined();
          expect(typeof tc.id).toBe('string');
          expect(tc.name).toBeDefined();
          expect(tc.category).toBeDefined();
          expect(typeof tc.inputHtml).toBe('string');
          expect(typeof tc.quillReferenceHtml).toBe('string');
        }
      });
      it('should include XSS test cases', () => {
        const xssCases = COMPARISON_TEST_CASES.filter(tc => tc.category === 'xss');
        expect(xssCases.length).toBeGreaterThan(0);
      });
      it('should include formatting test cases', () => {
        const formattingCases = COMPARISON_TEST_CASES.filter(tc => tc.category === 'formatting');
        expect(formattingCases.length).toBeGreaterThan(0);
      });
      it('should include edge case test cases', () => {
        const edgeCases = COMPARISON_TEST_CASES.filter(tc => tc.category === 'edge');
        expect(edgeCases.length).toBeGreaterThan(0);
      });
    });
  });
});
