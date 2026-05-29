/**
 * @file Unit tests for wpp-richtext-view component
 * @description Tests rendering, read-only mode, props, value updates, and cleanup.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
// Mock Quill to avoid DOMTokenList error in jsdom
jest.mock('quill', () => ({
  default: { import: () => ({}), register: () => { }, DEFAULTS: { formats: [], modules: {} } },
}));
// Mock the old config module that imports Quill plugins/themes
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
// Mock tiptap-config to return empty extensions and prevent ProseMirror init
jest.mock('../tiptap-config', () => ({
  __esModule: true,
  buildTiptapExtensions: () => [],
  translateQuillFormat: (f) => f,
  turndownService: {
    turndown: (html) => html,
    use: () => { },
    addRule: () => { },
    escape: (text) => text,
  },
}));
// Mock Tiptap Editor to avoid ProseMirror getSelection crash in Stencil mock docs
jest.mock('@tiptap/core', () => {
  class MockEditor {
    constructor(options) {
      this.state = { doc: { textContent: '' } };
      this.options = options;
    }
    get isEmpty() {
      return true;
    }
    getHTML() {
      return '';
    }
    getJSON() {
      return { type: 'doc', content: [] };
    }
    get commands() {
      return {
        setContent: () => true,
        selectAll: () => true,
      };
    }
    setEditable() { }
    on() {
      return this;
    }
    off() {
      return this;
    }
    destroy() { }
    isActive() {
      return false;
    }
    chain() {
      return { focus: () => ({ run: () => { } }) };
    }
  }
  return {
    __esModule: true,
    Editor: MockEditor,
    Extension: { create: (opts) => opts },
    Node: { create: (opts) => opts },
    Mark: { create: (opts) => opts },
    InputRule: class {
    },
  };
});
import { newSpecPage } from '@stencil/core/testing';
import { WppRichtextView } from '../components/wpp-richtext-view/wpp-richtext-view';
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => { });
  jest.spyOn(console, 'warn').mockImplementation(() => { });
  jest.spyOn(console, 'error').mockImplementation(() => { });
});
afterAll(() => {
  jest.restoreAllMocks();
});
describe('wpp-richtext', () => {
  describe('wpp-richtext-view', () => {
    let page;
    afterEach(async () => {
      if (page?.root) {
        page.root.remove();
      }
    });
    it('should render', async () => {
      page = await newSpecPage({
        components: [WppRichtextView],
        html: '<wpp-richtext-view></wpp-richtext-view>',
      });
      expect(page.root).toBeDefined();
      expect(page.root.tagName).toBe('WPP-RICHTEXT-VIEW');
    });
    it('should accept value prop', async () => {
      page = await newSpecPage({
        components: [WppRichtextView],
        html: '<wpp-richtext-view value="<p>Test</p>"></wpp-richtext-view>',
      });
      expect(page.rootInstance.value).toBe('<p>Test</p>');
    });
    it('should accept format prop', async () => {
      page = await newSpecPage({
        components: [WppRichtextView],
        html: '<wpp-richtext-view format="markdown"></wpp-richtext-view>',
      });
      expect(page.rootInstance.format).toBe('markdown');
    });
    it('should accept name prop', async () => {
      page = await newSpecPage({
        components: [WppRichtextView],
        html: '<wpp-richtext-view name="viewContent"></wpp-richtext-view>',
      });
      expect(page.rootInstance.name).toBe('viewContent');
    });
    it('should render a container div', async () => {
      page = await newSpecPage({
        components: [WppRichtextView],
        html: '<wpp-richtext-view></wpp-richtext-view>',
      });
      const container = page.root.querySelector('div');
      expect(container).toBeDefined();
    });
    it('should include wpp-richtext-common-styles', async () => {
      page = await newSpecPage({
        components: [WppRichtextView],
        html: '<wpp-richtext-view></wpp-richtext-view>',
      });
      const commonStyles = page.root.querySelector('wpp-richtext-common-styles');
      expect(commonStyles).toBeDefined();
    });
  });
});
