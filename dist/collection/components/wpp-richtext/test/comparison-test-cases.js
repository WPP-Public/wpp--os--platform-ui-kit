/**
 * @file Comparison test cases for Quill→Tiptap migration validation
 * @description Predefined HTML test cases with frozen Quill reference output used to compare
 *   side-by-side with live Tiptap editor output. Covers formatting, lists, links, images,
 *   mixed content, edge cases, and XSS safety.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
export const COMPARISON_TEST_CASES = [
  // ── Formatting ──────────────────────────────────────────────────────
  {
    id: 'bold',
    name: 'Bold text',
    category: 'formatting',
    inputHtml: '<p><strong>Bold text</strong></p>',
    quillReferenceHtml: '<p><strong>Bold text</strong></p>',
  },
  {
    id: 'italic',
    name: 'Italic text',
    category: 'formatting',
    inputHtml: '<p><em>Italic text</em></p>',
    quillReferenceHtml: '<p><em>Italic text</em></p>',
  },
  {
    id: 'underline',
    name: 'Underline text',
    category: 'formatting',
    inputHtml: '<p><u>Underline text</u></p>',
    quillReferenceHtml: '<p><u>Underline text</u></p>',
  },
  {
    id: 'strike',
    name: 'Strikethrough text',
    category: 'formatting',
    inputHtml: '<p><s>Strikethrough</s></p>',
    quillReferenceHtml: '<p><s>Strikethrough</s></p>',
  },
  {
    id: 'heading1',
    name: 'Heading 1',
    category: 'formatting',
    inputHtml: '<h1>Heading 1</h1>',
    quillReferenceHtml: '<h1>Heading 1</h1>',
  },
  {
    id: 'heading2',
    name: 'Heading 2',
    category: 'formatting',
    inputHtml: '<h2>Heading 2</h2>',
    quillReferenceHtml: '<h2>Heading 2</h2>',
  },
  {
    id: 'heading3',
    name: 'Heading 3',
    category: 'formatting',
    inputHtml: '<h3>Heading 3</h3>',
    quillReferenceHtml: '<h3>Heading 3</h3>',
  },
  {
    id: 'combined-inline',
    name: 'Bold + Italic + Underline combined',
    category: 'formatting',
    inputHtml: '<p><strong><em><u>All three</u></em></strong></p>',
    quillReferenceHtml: '<p><strong><em><u>All three</u></em></strong></p>',
  },
  // ── Lists ───────────────────────────────────────────────────────────
  {
    id: 'unordered-list',
    name: 'Unordered list',
    category: 'lists',
    inputHtml: '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
    quillReferenceHtml: '<ul><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>',
  },
  {
    id: 'ordered-list',
    name: 'Ordered list',
    category: 'lists',
    inputHtml: '<ol><li>First</li><li>Second</li><li>Third</li></ol>',
    quillReferenceHtml: '<ol><li>First</li><li>Second</li><li>Third</li></ol>',
  },
  {
    id: 'nested-list',
    name: 'Nested list (2 levels)',
    category: 'lists',
    inputHtml: '<ul><li>Parent<ul><li>Child 1</li><li>Child 2</li></ul></li></ul>',
    quillReferenceHtml: '<ul><li><p>Parent</p><ul><li><p>Child 1</p></li><li><p>Child 2</p></li></ul></li></ul>',
  },
  // ── Blocks ──────────────────────────────────────────────────────────
  {
    id: 'blockquote',
    name: 'Blockquote',
    category: 'blocks',
    inputHtml: '<blockquote>Quoted text</blockquote>',
    quillReferenceHtml: '<blockquote>Quoted text</blockquote>',
  },
  {
    id: 'code-block',
    name: 'Code block',
    category: 'blocks',
    inputHtml: '<pre><code>const x = 42;</code></pre>',
    quillReferenceHtml: '<pre><code>const x = 42;</code></pre>',
  },
  {
    id: 'horizontal-rule',
    name: 'Horizontal rule',
    category: 'blocks',
    inputHtml: '<p>Above</p><hr><p>Below</p>',
    quillReferenceHtml: '<p>Above</p><hr><p>Below</p>',
  },
  // ── Links ───────────────────────────────────────────────────────────
  {
    id: 'link',
    name: 'Simple link',
    category: 'links',
    inputHtml: '<p><a href="https://example.com">Example</a></p>',
    quillReferenceHtml: '<p><a href="https://example.com" rel="noopener noreferrer nofollow" target="_blank">Example</a></p>',
  },
  {
    id: 'link-with-formatting',
    name: 'Bold link',
    category: 'links',
    inputHtml: '<p><a href="https://example.com"><strong>Bold Link</strong></a></p>',
    quillReferenceHtml: '<p><a href="https://example.com" rel="noopener noreferrer nofollow" target="_blank"><strong>Bold Link</strong></a></p>',
  },
  // ── Images ──────────────────────────────────────────────────────────
  {
    id: 'image',
    name: 'Simple image',
    category: 'images',
    inputHtml: '<p><img src="https://placehold.co/100" alt="test"></p>',
    quillReferenceHtml: '<p><img src="https://placehold.co/100" alt="test"></p>',
  },
  // ── Mixed ───────────────────────────────────────────────────────────
  {
    id: 'mixed-document',
    name: 'Complex mixed document',
    category: 'mixed',
    inputHtml: [
      '<h1>Title</h1>',
      '<p>A paragraph with <strong>bold</strong> and <em>italic</em> text.</p>',
      '<ul><li>Item A</li><li>Item B</li></ul>',
      '<blockquote>A quote</blockquote>',
      '<p><a href="https://example.com">A link</a></p>',
    ].join(''),
    quillReferenceHtml: [
      '<h1>Title</h1>',
      '<p>A paragraph with <strong>bold</strong> and <em>italic</em> text.</p>',
      '<ul><li><p>Item A</p></li><li><p>Item B</p></li></ul>',
      '<blockquote><p>A quote</p></blockquote>',
      '<p><a href="https://example.com" rel="noopener noreferrer nofollow" target="_blank">A link</a></p>',
    ].join(''),
  },
  // ── Edge Cases ──────────────────────────────────────────────────────
  {
    id: 'empty-content',
    name: 'Empty content',
    category: 'edge',
    inputHtml: '',
    quillReferenceHtml: '',
  },
  {
    id: 'html-entities',
    name: 'HTML entities',
    category: 'edge',
    inputHtml: '<p>&amp; &lt; &gt; &quot; &#39;</p>',
    quillReferenceHtml: '<p>&amp; &lt; &gt; " \'</p>',
  },
  {
    id: 'unicode',
    name: 'Unicode characters',
    category: 'edge',
    inputHtml: '<p>Hello 🌍 Привет 你好 مرحبا</p>',
    quillReferenceHtml: '<p>Hello 🌍 Привет 你好 مرحبا</p>',
  },
  {
    id: 'whitespace-only',
    name: 'Whitespace-only content',
    category: 'edge',
    inputHtml: '<p>   </p>',
    quillReferenceHtml: '<p>   </p>',
  },
  // ── XSS Safety ──────────────────────────────────────────────────────
  {
    id: 'xss-script-tag',
    name: 'XSS: <script> injection',
    category: 'xss',
    inputHtml: '<p>Safe text</p><script>alert("XSS")</script>',
    quillReferenceHtml: '<p>Safe text</p>',
  },
  {
    id: 'xss-onerror',
    name: 'XSS: img onerror handler',
    category: 'xss',
    inputHtml: '<p><img src="x" onerror="alert(\'XSS\')"></p>',
    quillReferenceHtml: '<p><img src="x"></p>',
  },
  {
    id: 'xss-javascript-href',
    name: 'XSS: javascript: protocol href',
    category: 'xss',
    inputHtml: '<p><a href="javascript:alert(\'XSS\')">Click me</a></p>',
    quillReferenceHtml: '<p>Click me</p>',
  },
  {
    id: 'xss-event-handler',
    name: 'XSS: onmouseover event',
    category: 'xss',
    inputHtml: '<p onmouseover="alert(\'XSS\')">Hover me</p>',
    quillReferenceHtml: '<p>Hover me</p>',
  },
  // ── Markdown round-trip ─────────────────────────────────────────────
  {
    id: 'markdown-bold',
    name: 'Markdown: bold round-trip',
    category: 'markdown',
    inputHtml: '<p><strong>Bold text</strong></p>',
    quillReferenceHtml: '<p><strong>Bold text</strong></p>',
  },
  {
    id: 'markdown-heading',
    name: 'Markdown: heading round-trip',
    category: 'markdown',
    inputHtml: '<h2>Heading Two</h2>',
    quillReferenceHtml: '<h2>Heading Two</h2>',
  },
  {
    id: 'markdown-list',
    name: 'Markdown: list round-trip',
    category: 'markdown',
    inputHtml: '<ul><li>Alpha</li><li>Beta</li></ul>',
    quillReferenceHtml: '<ul><li>Alpha</li><li>Beta</li></ul>',
  },
];
/**
 * Normalize HTML for comparison — strips insignificant whitespace,
 * class attributes, self-closing tag differences.
 */
export function normalizeHtml(html) {
  return html
    .replace(/\s+/g, ' ')
    .replace(/\s*\/>/g, '/>')
    .replace(/<([a-z]+)\s*>/g, '<$1>')
    .replace(/\sclass="[^"]*"/g, '')
    .replace(/\sstyle="[^"]*"/g, '')
    .replace(/\sdata-[a-z-]+="[^"]*"/g, '')
    .replace(/\starget="[^"]*"/g, '')
    .replace(/\srel="[^"]*"/g, '')
    .replace(/\sspellcheck="[^"]*"/g, '')
    .trim();
}
/**
 * Run a single comparison test.
 * Returns match status and diff details.
 */
export function runComparison(testCase, tiptapOutput) {
  const expected = normalizeHtml(testCase.quillReferenceHtml);
  const actual = normalizeHtml(tiptapOutput);
  return {
    match: expected === actual,
    normalized: { expected, actual },
  };
}
