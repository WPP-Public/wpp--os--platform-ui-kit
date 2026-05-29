/**
 * @file Unit tests for TiptapFontSize mark extension
 * @description Verifies that ql-size-* classes are correctly parsed from ALL
 *   inline tags (span, strong, em, u, etc.), not just <span>.
 *   Validates the consuming:false + priority:60 fix for WPPOPENDS-1287.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
// Mock Quill before any imports can pull it in
jest.mock('quill', () => ({
  default: { import: () => ({}), register: () => { }, DEFAULTS: { formats: [], modules: {} } },
}));
jest.mock('../config', () => ({
  __esModule: true,
  default: {
    turndown: (html) => html,
    use: () => { },
    addRule: () => { },
    escape: (text) => text,
  },
  quillMarkdownOptions: { tags: {} },
}));
import { Editor } from '@tiptap/core';
import { buildTiptapExtensions } from '../tiptap-config';
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('TiptapFontSize mark', () => {
  let editor;
  beforeEach(() => {
    editor = new Editor({
      extensions: buildTiptapExtensions({}),
      content: '',
    });
  });
  afterEach(() => {
    editor.destroy();
  });
  it('should parse ql-size-* class from <span>', () => {
    editor.commands.setContent('<p><span class="ql-size-5xl">text</span></p>');
    const json = editor.getJSON();
    const marks = json.content?.[0]?.content?.[0]?.marks;
    expect(marks).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'fontSize', attrs: { size: '5xl' } })]));
  });
  it('should parse ql-size-* class from <strong> and preserve bold mark', () => {
    editor.commands.setContent('<p><strong class="ql-size-5xl">bold text</strong></p>');
    const json = editor.getJSON();
    const marks = json.content?.[0]?.content?.[0]?.marks;
    expect(marks).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'bold' }),
      expect.objectContaining({ type: 'fontSize', attrs: { size: '5xl' } }),
    ]));
  });
  it('should parse ql-size-* class from <em> and preserve italic mark', () => {
    editor.commands.setContent('<p><em class="ql-size-5xl">italic text</em></p>');
    const json = editor.getJSON();
    const marks = json.content?.[0]?.content?.[0]?.marks;
    expect(marks).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'italic' }),
      expect.objectContaining({ type: 'fontSize', attrs: { size: '5xl' } }),
    ]));
  });
  it('should parse ql-size-* class from <u> and preserve underline mark', () => {
    editor.commands.setContent('<p><u class="ql-size-5xl">underline text</u></p>');
    const json = editor.getJSON();
    const marks = json.content?.[0]?.content?.[0]?.marks;
    expect(marks).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'underline' }),
      expect.objectContaining({ type: 'fontSize', attrs: { size: '5xl' } }),
    ]));
  });
  it('should preserve ql-size-* on ALL tags in mixed Quill content', () => {
    // This is the exact pattern from the bug report
    editor.commands.setContent('<p><strong class="ql-size-5xl">Example </strong><em class="ql-size-5xl">rich text </em><u class="ql-size-5xl">content</u><span class="ql-size-5xl">!</span></p>');
    const json = editor.getJSON();
    const textNodes = json.content?.[0]?.content || [];
    // All 4 text nodes should have fontSize mark
    for (const node of textNodes) {
      const markTypes = (node.marks || []).map((m) => m.type);
      expect(markTypes).toContain('fontSize');
      const fontSizeMark = node.marks.find((m) => m.type === 'fontSize');
      expect(fontSizeMark.attrs.size).toBe('5xl');
    }
    // Verify specific formatting marks are also preserved
    const strongNode = textNodes.find((n) => n.text === 'Example ');
    expect(strongNode.marks.map((m) => m.type)).toContain('bold');
    const emNode = textNodes.find((n) => n.text === 'rich text ');
    expect(emNode.marks.map((m) => m.type)).toContain('italic');
    const uNode = textNodes.find((n) => n.text === 'content');
    expect(uNode.marks.map((m) => m.type)).toContain('underline');
  });
  it('should render font-sized text with ql-size-* class in JSON output', () => {
    editor.commands.setContent('<p><strong class="ql-size-5xl">Example</strong></p>');
    const json = editor.getJSON();
    const marks = json.content?.[0]?.content?.[0]?.marks;
    // Both bold and fontSize marks should be present
    expect(marks).toEqual(expect.arrayContaining([
      expect.objectContaining({ type: 'bold' }),
      expect.objectContaining({ type: 'fontSize', attrs: { size: '5xl' } }),
    ]));
  });
  it('should handle different font size values', () => {
    const sizes = ['2xs', 'xs', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'];
    for (const size of sizes) {
      editor.commands.setContent(`<p><span class="ql-size-${size}">text</span></p>`);
      const json = editor.getJSON();
      const marks = json.content?.[0]?.content?.[0]?.marks;
      expect(marks).toEqual(expect.arrayContaining([expect.objectContaining({ type: 'fontSize', attrs: { size } })]));
    }
  });
  it('should not apply fontSize mark to tags without ql-size-* class', () => {
    editor.commands.setContent('<p><strong>plain bold</strong></p>');
    const json = editor.getJSON();
    const marks = json.content?.[0]?.content?.[0]?.marks;
    expect(marks).toEqual([expect.objectContaining({ type: 'bold' })]);
    expect(marks).not.toEqual(expect.arrayContaining([expect.objectContaining({ type: 'fontSize' })]));
  });
});
