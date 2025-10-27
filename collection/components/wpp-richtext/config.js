import { Quill } from './types';
import { ImageFormats } from './plugins/quill-image-formats';
import { ImageActions } from './plugins/quill-image-actions';
import { WppQuillToolbar } from './plugins/wpp-quill-toolbar';
// @ts-ignore No module declaration
import { Image, Video, Attachment } from './plugins/quill-upload';
import { defaultFormats, quillImageFormats, quillUploadFormats } from './const';
// @ts-ignore No module declaration
import WppTheme from './themes/wpp';
import TurndownService from 'turndown';
import { gfm } from 'turndown-plugin-gfm';
const SizeAttributor = Quill.import('attributors/class/size');
SizeAttributor.whitelist = ['2xs', 'xs', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'];
Quill.register(SizeAttributor, true);
Quill.register({ 'themes/wpp': WppTheme });
// media upload modules
Quill.register('modules/imageUpload', Image);
Quill.register('modules/videoUpload', Video);
Quill.register('modules/attachmentUpload', Attachment);
// image and video positioning modules (width, height, float, align)
ImageFormats.extendBlotNames = ['formats/image', 'formats/video'];
Quill.register('modules/imageFormats', ImageFormats);
Quill.register('modules/imageActions', ImageActions);
const keyboardModule = Quill.import('modules/keyboard');
// Remove base tab bindings to allow focus through elements using keyboard
delete keyboardModule.DEFAULTS.bindings.tab;
delete keyboardModule.DEFAULTS.bindings['remove tab'];
// Improve toolbar configuration
Quill.register('modules/toolbar', WppQuillToolbar, true);
Quill.register('modules/imageLibrary', () => { });
Quill.DEFAULTS.formats = [...defaultFormats, ...quillImageFormats, ...quillUploadFormats];
Quill.DEFAULTS.modules = {
  history: {
    delay: 1000,
    maxStack: 100,
    userOnly: true,
  },
  toolbar: {
    container: ['size', 'fontStyle', 'textBlocks', 'lists', 'align', 'embed', 'undo'],
    aliases: {
      size: [{ size: ['2xs', 'xs', false, 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'] }],
      fontStyle: ['bold', 'italic', 'underline', 'strike'],
      textBlocks: ['code-block', 'blockquote'],
      lists: [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      align: [{ align: '' }, { align: 'center' }, { align: 'right' }, { align: 'justify' }],
      /**
       * (Media buttons are commented out and are intended to be added based on project requirements,
       * in wpp-richtext[modules] attribute)
       */
      embed: ['link' /* , 'image', 'video', 'attachment', { imageLibrary: [] } */],
      undo: ['undo', 'redo'],
    },
  },
  /**
   * Enables custom upload handler instead of Quill's base64 data URLs embedding,
   * see wppUploadRequest event handler in examples
   * (to be enabled per project requirements, in wpp-richtext[modules])
   */
  // imageUpload: true,
  // videoUpload: true,
  // attachmentUpload: true,
  // Allows image position editing (width/height and float:left|right)
  imageActions: true,
  imageFormats: true,
};
export const quillMarkdownOptions = {
  // Tags to ignore while parsing Markdown:
  ignoreTags: [],
  // Patterns to trigger markdown formatting:
  tags: {
    blockquote: { pattern: /^>\s/g },
    bold: { pattern: /(\*\*|__)(.*?)\1/g },
    code: { pattern: /`([^`]+)`/g },
    header: { pattern: /^(#{1,6})\s(.+)/gm },
    // ** TODO: = is not supported by Quill's markdown module **
    setextHeader: { pattern: /^(.*)\n(=+|-+)\s*$/gm },
    // ** TODO: + is not supported by Quill's markdown module **
    list: { pattern: /^(\*|-|\+|\d+\.)\s+/gm },
    strikethrough: { pattern: /~~(.*?)~~/g },
    url: { pattern: /\[(.*?)\]\((.*?)\)/g },
    image: { pattern: /!\[(.*?)\]\((.*?)\)/g },
    video: { pattern: /!\[video\]\((.*?)\)/g },
    attachment: { pattern: /!\[attachment\]\((.*?)\)/g },
    // ** TODO: - * are not supported by Quill's markdown module **
    hr: { pattern: /^([-_*]){3,}$/gm },
    taskList: { pattern: /^(\s*)-\s\[( |x)\]\s(.+)$/gm },
    // ** TODO: This pattern is not supported by Quill's markdown module **
    superscript: { pattern: /\^(.+?)\^/g },
    // ** TODO: This pattern is not supported by Quill's markdown module **
    subscript: { pattern: /~(.+?)~/g },
    // ** TODO: This pattern is not supported by Quill's markdown module **
    table: { pattern: /\|(.+)\|\n\|([-| ]+)\|\n((\|.*\|\n)*)/gm },
    lineBreak: { pattern: / {2,}\n/g },
    fencedCode: { pattern: /^(`{3,}|~{3,})(\w+)?\n([\s\S]+?)\n\1\s*$/gm },
    // ** TODO: This pattern is not supported by Quill's markdown module **
    autoLink: { pattern: /<((https?:\/\/|www\.)[^\s<>]+)>/g },
    // ** TODO: This pattern is not supported by Quill's markdown module **
    autoEmail: { pattern: /<([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})>/g },
  },
};
// Configure Turndown to use GitHub Flavored Markdown (GFM)
const turndownService = new TurndownService({ headingStyle: 'atx' });
turndownService.use(gfm);
turndownService.escape = (text) => text.replace(/([\\`{}[\]()#+\-.!])/g, '\\$1');
turndownService.addRule('strikethrough', {
  filter: ['del', 's', 'strike'],
  replacement(content) {
    return `~~${content}~~`;
  },
});
turndownService.addRule('underline', {
  filter: (node) => {
    if (node instanceof HTMLElement) {
      return (node.nodeName === 'U' ||
        (node.style && (node.style.textDecoration === 'underline' || node.style.textDecorationLine === 'underline')));
    }
    return false;
  },
  replacement: (content) => `<u>${content}</u>`,
});
turndownService.addRule('codeBlock', {
  filter(node) {
    return node.nodeName === 'PRE' && node.firstChild !== null && node.firstChild.nodeName === 'CODE';
  },
  replacement(content, node) {
    const language = node.firstChild instanceof HTMLElement
      ? node.firstChild.getAttribute('class')?.replace('language-', '') || ''
      : '';
    return `\`\`\`${language}\n${content}\n\`\`\``;
  },
});
turndownService.addRule('customHeading', {
  filter(node) {
    return !!node.nodeName && /^H[1-6]$/.test(node.nodeName) && Boolean(node.textContent?.trim());
  },
  replacement(_content, node) {
    const element = node;
    let rawText = element.textContent || '';
    rawText = rawText.trim();
    rawText = rawText.replace(/^\\/, '');
    const headerMatch = rawText.match(/^(#+)\s+(.*)/);
    if (headerMatch) {
      const headerLevel = headerMatch[1].length;
      const headerText = headerMatch[2].trim();
      return `${'#'.repeat(headerLevel)} ${headerText}`;
    }
    const hLevel = Number(element.nodeName.slice(1));
    return `${'#'.repeat(hLevel)} ${rawText}`;
  },
});
turndownService.addRule('fencedCodeBlock', {
  filter: (node) => node.nodeName === 'PRE',
  replacement: (content, node) => {
    let language = '';
    if (node.firstElementChild && node.firstElementChild.nodeName === 'CODE') {
      const classAttr = node.firstElementChild.getAttribute('class');
      if (classAttr) {
        language = classAttr.replace('language-', '');
      }
    }
    return `\`\`\`${language}\n${content}\n\`\`\``;
  },
});
turndownService.addRule('emphasis', {
  filter: ['em', 'i'],
  replacement: (content) => 
  // For HTML to Markdown conversion, add italics markdown
  `_${content}_`,
});
export default turndownService;
