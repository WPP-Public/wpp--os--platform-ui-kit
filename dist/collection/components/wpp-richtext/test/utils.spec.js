import { processMarkdownValue, normalizeListHtml } from '../utils';
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
        it('should produce standard GFM output without &nbsp; markers', () => {
          const { html } = processMarkdownValue('Text\n\n* Item');
          // Standard GFM: paragraph followed by list, no &nbsp; markers
          expect(html).toContain('<p>Text</p>');
          expect(html).toContain('<ul>');
          expect(html).not.toContain('&nbsp;');
        });
        it('should handle multiple blank lines', () => {
          const { html } = processMarkdownValue('Text\n\n\n* Item');
          // Multiple blank lines should just produce paragraph and list
          expect(html).toContain('<p>Text</p>');
          expect(html).toContain('<ul>');
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
      describe('list indentation', () => {
        it('should render nested unordered lists with standard HTML nesting', () => {
          const { html } = processMarkdownValue('* Item 1\n  * Nested Item');
          // Standard GFM: nested lists use proper HTML nesting, not ql-indent classes
          expect(html).toContain('<ul>');
          expect(html).toContain('Nested Item');
        });
        it('should render nested ordered lists with standard HTML nesting', () => {
          const { html } = processMarkdownValue('1. First\n   1. Nested Second');
          expect(html).toContain('<ol>');
          expect(html).toContain('Nested Second');
        });
        it('should handle multiple levels of nesting', () => {
          const { html } = processMarkdownValue('* Level 0\n  * Level 1\n    * Level 2');
          expect(html).toContain('Level 0');
          expect(html).toContain('Level 1');
          expect(html).toContain('Level 2');
        });
      });
      describe('single newline handling (breaks: true)', () => {
        it('should convert single newline within paragraph to <br>', () => {
          const { html } = processMarkdownValue('Line 1\nLine 2');
          expect(html).toBe(`<p>Line 1<br>Line 2</p>
`);
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
    describe('normalizeListHtml', () => {
      it('should strip <p> wrappers from simple <li> content', () => {
        const input = '<ol><li><p>Item 1</p></li><li><p>Item 2</p></li></ol>';
        expect(normalizeListHtml(input)).toBe('<ol><li>Item 1</li><li>Item 2</li></ol>');
      });
      it('should strip <p> wrappers from unordered lists', () => {
        const input = '<ul><li><p>Bullet A</p></li><li><p>Bullet B</p></li></ul>';
        expect(normalizeListHtml(input)).toBe('<ul><li>Bullet A</li><li>Bullet B</li></ul>');
      });
      it('should preserve <li> attributes', () => {
        const input = '<ul><li data-checked="true"><p>Task 1</p></li></ul>';
        expect(normalizeListHtml(input)).toBe('<ul><li data-checked="true">Task 1</li></ul>');
      });
      it('should preserve inline formatting inside <p>', () => {
        const input = '<ol><li><p><strong>Bold</strong> text</p></li></ol>';
        expect(normalizeListHtml(input)).toBe('<ol><li><strong>Bold</strong> text</li></ol>');
      });
      it('should strip <p> inside <div> for task list items', () => {
        const input = '<ul data-type="taskList"><li data-checked="true"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>Task 1</p></div></li><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div><p>Task 2</p></div></li></ul>';
        expect(normalizeListHtml(input)).toBe('<ul data-type="taskList"><li data-checked="true"><label contenteditable="false"><input type="checkbox"><span></span></label><div>Task 1</div></li><li data-checked="false"><label contenteditable="false"><input type="checkbox"><span></span></label><div>Task 2</div></li></ul>');
      });
      it('should not modify HTML without list items', () => {
        const input = '<p>Hello</p><p>World</p>';
        expect(normalizeListHtml(input)).toBe(input);
      });
      it('should return empty string for empty input', () => {
        expect(normalizeListHtml('')).toBe('');
      });
      it('should emit <br> placeholder for empty <li> to match production Quill output', () => {
        // Pavlo's QA expects empty list items to round-trip as `<li><br></li>`,
        // mirroring what the production Quill editor emitted. See WPPOPENDS-1287.
        expect(normalizeListHtml('<ol><li><p></p></li></ol>')).toBe('<ol><li><br></li></ol>');
        expect(normalizeListHtml('<ul><li><p></p></li></ul>')).toBe('<ul><li><br></li></ul>');
      });
      it('should strip ProseMirror trailing empty paragraph after a list', () => {
        // ProseMirror appends `<p></p>` after a list as a caret placeholder;
        // Quill never emitted this. Strip only when the empty paragraph is
        // the final node of the document.
        expect(normalizeListHtml('<ol><li><p>Item</p></li></ol><p></p>')).toBe('<ol><li>Item</li></ol>');
        expect(normalizeListHtml('<ul><li><p></p></li></ul><p></p>')).toBe('<ul><li><br></li></ul>');
      });
      it('should preserve trailing paragraph after a list when it has content', () => {
        expect(normalizeListHtml('<ol><li><p>Item</p></li></ol><p>After</p>')).toBe('<ol><li>Item</li></ol><p>After</p>');
      });
    });
  });
});
