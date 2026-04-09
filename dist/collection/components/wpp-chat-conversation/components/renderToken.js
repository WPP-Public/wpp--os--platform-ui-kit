import { Fragment, h } from '@stencil/core';
import { handleDownload } from './utils';
const renderImageNode = (role, data, className) => {
  const img = (h(Fragment, null, h("img", { src: data.href, alt: data.alt, class: className, loading: "lazy", onError: (e) => {
      const wrap = e.target.closest('.chat-image-error-wrap');
      wrap?.classList.add('chat-image-broken');
    } }), h("wpp-icon-image-v4-0-0", { role: "presentation", "aria-hidden": "true" })));
  return data.linkHref ? (h("a", { href: data.linkHref, target: "_blank", rel: "noopener noreferrer", class: "chat-image-link" }, img)) : role === 'assistant' ? (h(Fragment, null, h("wpp-action-button-v4-0-0", { class: "image-download-button", variant: "secondary", onClick: () => handleDownload(data.href, data.alt) }, h("wpp-icon-download-v4-0-0", { slot: "icon-start", "aria-hidden": "true" })), img)) : (img);
};
export const renderToken = (token, role = 'user') => {
  switch (token.type) {
    case 'space':
      return null;
    case 'heading': {
      const headingTypes = ['2xl-heading', 'xl-heading', 'l-body', 'm-body', 's-body', 'xs-body'];
      const type = headingTypes[token.depth - 1] || 's-body';
      const tag = `h${token.depth}`;
      return (h("wpp-typography-v4-0-0", { type: type, tag: tag }, token.tokens ? token.tokens.map(t => renderToken(t)) : token.text));
    }
    case 'del':
      return h("del", null, token.tokens?.map(t => renderToken(t)));
    case 'paragraph':
      return (h("wpp-typography-v4-0-0", { type: "s-body", tag: "p" }, token.tokens ? token.tokens.map(t => renderToken(t)) : token.text));
    case 'blockquote':
      return h("blockquote", { class: "chat-quote" }, token.tokens?.map(t => renderToken(t)));
    case 'strong':
      return (h("wpp-typography-v4-0-0", { type: "s-strong", tag: "span" }, token.tokens?.map(t => renderToken(t))));
    case 'em':
      return h("em", null, token.tokens?.map(t => renderToken(t)));
    case 'codespan':
      return h("code", { class: "inline-code" }, token.text);
    case 'code':
      return (h("pre", { class: "code-block" }, h("div", { class: "code-lang" }, h("span", null, token.lang || 'plaintext'), h("wpp-icon-copy-v4-0-0", { class: "code-block-copy-icon", size: "s", color: "var(--wpp-grey-color-600)", onClick: () => {
          navigator.clipboard.writeText(token.text);
        } })), h("code", null, token.text)));
    case 'br':
      return h("br", null);
    case 'escape':
      return token.text;
    case 'list': {
      const ListTag = token.ordered ? 'ol' : 'ul';
      const isTaskList = token.items.some((item) => item.task);
      return (h(ListTag, { class: `chat-list ${isTaskList ? 'chat-list-task' : ''} ${ListTag === 'ol' ? 'chat-list-ordered' : 'chat-list-nonordered'}` }, token.items.map((item) => renderToken(item))));
    }
    case 'list_item': {
      const nestedLists = token.tokens?.filter(t => t.type === 'list') || [];
      const inlineContent = token.tokens?.filter(t => t.type !== 'list') || [];
      return (h("li", { class: `chat-list-item ${token.task ? `chat-list-item-task ${token.checked ? 'chat-list-item-task-checked' : ''}` : ''}` }, token.task && h("wpp-icon-tick-v4-0-0", null), inlineContent.length > 0 && (h("wpp-typography-v4-0-0", { type: "s-body" }, inlineContent.map(t => renderToken(t)))), nestedLists.map(t => renderToken(t))));
    }
    case 'table': {
      return (h("div", { class: "chat-table-wrapper" }, h("table", { class: "chat-table" }, h("thead", null, h("tr", null, token.header.map((cell, i) => (h("th", { key: i }, h("wpp-typography-v4-0-0", { type: "s-strong" }, cell.tokens?.map((t) => renderToken(t)) ?? cell.text)))))), h("tbody", null, token.rows.map((row, r) => (h("tr", { key: r }, row.map((cell, c) => (h("td", { key: c }, h("wpp-typography-v4-0-0", { type: "s-body" }, cell.tokens?.map((t) => renderToken(t)) ?? cell.text)))))))))));
    }
    case 'link':
      if (token.title) {
        return (h("wpp-tooltip-v4-0-0", { text: token.title }, h("a", { href: token.href, target: "_blank", rel: "noopener noreferrer", class: "chat-link" }, token.tokens?.length ? token.tokens.map((t) => renderToken(t)) : token.text)));
      }
      return (h("a", { href: token.href, target: "_blank", rel: "noopener noreferrer", title: token.title, class: "chat-link" }, token.tokens?.length ? token.tokens.map((t) => renderToken(t)) : token.text));
    case 'image': {
      return (h("div", { class: "chat-image-single chat-image-error-wrap" }, renderImageNode(role, { href: token.href, alt: token.text || token.title || '' }, 'chat-image-full')));
    }
    case 'image_group': {
      const { images } = token;
      if (images.length === 1) {
        return (h("div", { class: "chat-image-single chat-image-error-wrap" }, renderImageNode(role, images[0], 'chat-image-full')));
      }
      const [first, ...rest] = images;
      return (h("div", { class: "chat-image-grid" }, h("div", { class: "chat-image-grid-first chat-image-error-wrap" }, renderImageNode(role, first, 'chat-image-full')), h("div", { class: "chat-image-grid-row" }, rest.map((data, i) => (h("div", { key: i, class: "chat-image-grid-item chat-image-error-wrap" }, renderImageNode(role, data)))))));
    }
    case 'hr':
      return h("wpp-divider-v4-0-0", null);
    case 'text':
      return token.tokens
        ? token.tokens.flatMap(t => renderToken(t)).filter((t) => t !== null)
        : token.text;
    case 'html':
    case 'tag':
      // Intentionally ignore raw HTML from LLM output for security
      return null;
    default:
      return 'text' in token ? h("wpp-typography-v4-0-0", { type: "s-body" }, token.text) : null;
  }
};
