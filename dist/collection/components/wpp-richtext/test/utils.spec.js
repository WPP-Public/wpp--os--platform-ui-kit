import { processMarkdownValue } from '../utils';
// Suppress console.log during tests
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('wpp-richtext', () => {
  describe('utils', () => {
    describe('processMarkdownValue', () => {
      describe('basic markdown conversion', () => {
        it('should convert heading to HTML', () => {
          const { html } = processMarkdownValue('# Heading');
          expect(html).toContain('<h1>Heading</h1>');
        });
        it('should convert paragraph to HTML', () => {
          const { html } = processMarkdownValue('Some text');
          expect(html).toContain('<p>Some text</p>');
        });
        it('should convert unordered list to HTML', () => {
          const { html } = processMarkdownValue('* Item 1\n* Item 2');
          expect(html).toContain('<ul>');
          expect(html).toContain('<li>Item 1</li>');
          expect(html).toContain('<li>Item 2</li>');
          expect(html).toContain('</ul>');
        });
        it('should convert ordered list to HTML', () => {
          const { html } = processMarkdownValue('1. First\n2. Second');
          expect(html).toContain('<ol>');
          expect(html).toContain('<li>First</li>');
          expect(html).toContain('<li>Second</li>');
          expect(html).toContain('</ol>');
        });
      });
      describe('blank line preservation', () => {
        it('should preserve single blank line between paragraph and list', () => {
          const { html } = processMarkdownValue('Text\n\n* Item');
          // Single blank line should create &nbsp; paragraph
          expect(html).toContain('<p>&nbsp;</p>');
        });
        it('should preserve multiple blank lines', () => {
          const { html } = processMarkdownValue('Text\n\n\n* Item');
          // Multiple blank lines should still create visible blank line
          expect(html).toContain('<p>&nbsp;</p>');
        });
        it('should not add blank line when there is none in source', () => {
          // Heading followed directly by list (single newline)
          const { html } = processMarkdownValue('# Heading\n* Item');
          // Should NOT have &nbsp; between heading and list
          // The output should be heading followed by list
          expect(html).toContain('<h1>Heading</h1>');
          expect(html).toContain('<ul>');
        });
      });
      describe('list indentation preservation', () => {
        it('should preserve nested unordered list indentation', () => {
          const { html } = processMarkdownValue('* Item 1\n  * Nested Item');
          expect(html).toContain('ql-indent-1');
        });
        it('should preserve nested ordered list indentation', () => {
          const { html } = processMarkdownValue('1. First\n  2. Nested Second');
          expect(html).toContain('ql-indent-1');
        });
        it('should handle multiple levels of nesting', () => {
          const { html } = processMarkdownValue('* Level 0\n  * Level 1\n    * Level 2');
          expect(html).toContain('ql-indent-1');
          expect(html).toContain('ql-indent-2');
        });
      });
      describe('single newline handling (breaks: true)', () => {
        it('should convert single newline within paragraph to <br>', () => {
          const { html } = processMarkdownValue('Line 1\nLine 2');
          expect(html).toContain('<br>');
        });
      });
      describe('plain text extraction', () => {
        it('should extract plain text from markdown', () => {
          const { plainText } = processMarkdownValue('# Heading\n\nSome **bold** text');
          expect(plainText).toContain('Heading');
          expect(plainText).toContain('Some');
          expect(plainText).toContain('bold');
          expect(plainText).toContain('text');
        });
        it('should return empty plain text for empty input', () => {
          const { plainText } = processMarkdownValue('');
          expect(plainText).toBe('');
        });
      });
      describe('edge cases', () => {
        it('should handle empty input', () => {
          const { html, plainText } = processMarkdownValue('');
          expect(html).toBe('');
          expect(plainText).toBe('');
        });
        it('should handle null-ish input', () => {
          const { html, plainText } = processMarkdownValue(null);
          expect(html).toBe('');
          expect(plainText).toBe('');
        });
        it('should handle undefined input', () => {
          const { html, plainText } = processMarkdownValue(undefined);
          expect(html).toBe('');
          expect(plainText).toBe('');
        });
        it('should handle input with only whitespace', () => {
          const { plainText } = processMarkdownValue('   \n\n   ');
          expect(plainText.trim()).toBe('');
        });
      });
      describe('GFM features', () => {
        it('should handle bold text with asterisks', () => {
          const { html } = processMarkdownValue('**bold**');
          expect(html).toContain('<strong>bold</strong>');
        });
        it('should handle italic text with asterisks', () => {
          const { html } = processMarkdownValue('*italic*');
          expect(html).toContain('<em>italic</em>');
        });
        it('should handle inline code', () => {
          const { html } = processMarkdownValue('`code`');
          expect(html).toContain('<code>code</code>');
        });
        it('should handle links', () => {
          const { html } = processMarkdownValue('[text](http://example.com)');
          expect(html).toContain('<a href="http://example.com"');
          expect(html).toContain('text</a>');
        });
      });
    });
  });
});
