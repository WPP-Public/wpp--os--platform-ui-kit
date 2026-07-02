'use strict';

require('./marked.umd-e1074c94.js');
const index = require('./index-4e03e73e.js');
const _commonjsHelpers = require('./_commonjsHelpers-bcc1208a.js');

/**
 * Normalizes Quill-style empty paragraphs and list items for Tiptap/ProseMirror.
 *
 * Quill represents empty lines as `<p><br></p>`, but when ProseMirror parses this
 * with the HardBreak extension, it creates a hardBreak node AND adds its own
 * trailing break, resulting in double-height empty lines.
 *
 * This function converts `<p><br></p>` (and variants) → `<p></p>` so ProseMirror
 * builds a correct empty paragraph node.
 *
 * Note: empty list items (`<ol><li><br></li></ol>`) are intentionally NOT
 * normalized — Tiptap's ProseMirror schema strips bare `<br>` from list items
 * and the production Quill build behaves the same way (an empty list value is
 * rendered as nothing). Adding a `<p></p>` placeholder breaks round-tripping
 * because the placeholder gets serialized back to markdown as a real list item.
 */
const normalizeEmptyParagraphs = (html) => html.replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, '<p></p>');
/**
 * Normalizes Tiptap list HTML output for backward compatibility with Quill.
 *
 * Tiptap/ProseMirror wraps every list item's content in a `<p>` tag:
 *   `<li><p>text</p></li>`
 * Quill produced tight lists without the wrapper:
 *   `<li>text</li>`
 *
 * For task list items the structure is more complex:
 *   `<li ...><label>...</label><div><p>text</p></div></li>`
 * This function also strips the `<p>` wrapper nested inside `<div>` blocks
 * within list items, producing `<div>text</div>`.
 *
 * Only single-paragraph wrappers are stripped; multi-block content is preserved.
 *
 * The `<div><p>...</p></div>` cleanup is intentionally scoped to occur only
 * inside `<li>` ancestors to avoid mutating arbitrary author-provided HTML
 * that happens to use the same wrapper pattern outside of lists.
 */
const normalizeListHtml = (html) => {
  // Strip `<p>` wrapper directly inside `<li>`. An empty `<p></p>` wrapper
  // collapses to `<br>` so empty list items match the production Quill
  // markup (`<li><br></li>`) consumers expect.
  let out = html.replace(/<li([^>]*)>\s*<p>(.*?)<\/p>\s*<\/li>/gi, (_match, attrs, inner) => `<li${attrs}>${inner.trim() === '' ? '<br>' : inner}</li>`);
  // Strip `<div><p>...</p></div>` ONLY when it appears inside an `<li>`.
  // We walk every `<li>...</li>` block and replace within it so wrappers
  // outside of lists (i.e. arbitrary consumer HTML) are left untouched.
  out = out.replace(/<li\b([^>]*)>([\s\S]*?)<\/li>/gi, (_match, attrs, inner) => {
    const cleanedInner = inner.replace(/<div>\s*<p>(.*?)<\/p>\s*<\/div>/gi, '<div>$1</div>');
    return `<li${attrs}>${cleanedInner}</li>`;
  });
  // Strip a single trailing empty paragraph that immediately follows a list.
  // ProseMirror's schema appends a placeholder `<p></p>` after the list when
  // toggling on an empty editor (so the caret has somewhere to land after
  // the list), but the production Quill output never contained this trailer
  // and Pavlo's QA flags it. We only strip when it is the final node of the
  // document so authored trailing paragraphs after lists are preserved.
  out = out.replace(/(<\/(?:ul|ol)>)\s*<p>\s*<\/p>\s*$/i, '$1');
  return out;
};
/**
 * Extracts plain text from a ProseMirror document, inserting newlines between
 * top-level block nodes. ProseMirror's `doc.textContent` concatenates all text
 * without separators, which collapses multi-block documents into a single line.
 */
function extractPlainText(doc) {
  const blocks = [];
  doc.forEach(node => {
    const text = node.textContent;
    if (text)
      blocks.push(text);
  });
  return blocks.join('\n').trim();
}

// src/jsx-runtime.ts
var h = (tag, attributes) => {
  if (tag === "slot") {
    return 0;
  }
  if (tag instanceof Function) {
    return tag(attributes);
  }
  const { children, ...rest } = attributes != null ? attributes : {};
  if (tag === "svg") {
    throw new Error(
      "SVG elements are not supported in the JSX syntax, use the array syntax instead"
    );
  }
  return [tag, rest, children];
};

// src/blockquote.tsx

// ../../node_modules/.pnpm/prosemirror-model@1.25.7/node_modules/prosemirror-model/dist/index.js
function findDiffStart(a, b, pos) {
  for (let i = 0; ; i++) {
    if (i == a.childCount || i == b.childCount)
      return a.childCount == b.childCount ? null : pos;
    let childA = a.child(i), childB = b.child(i);
    if (childA == childB) {
      pos += childA.nodeSize;
      continue;
    }
    if (!childA.sameMarkup(childB))
      return pos;
    if (childA.isText && childA.text != childB.text) {
      for (let j = 0; childA.text[j] == childB.text[j]; j++)
        pos++;
      return pos;
    }
    if (childA.content.size || childB.content.size) {
      let inner = findDiffStart(childA.content, childB.content, pos + 1);
      if (inner != null)
        return inner;
    }
    pos += childA.nodeSize;
  }
}
function findDiffEnd(a, b, posA, posB) {
  for (let iA = a.childCount, iB = b.childCount; ; ) {
    if (iA == 0 || iB == 0)
      return iA == iB ? null : { a: posA, b: posB };
    let childA = a.child(--iA), childB = b.child(--iB), size = childA.nodeSize;
    if (childA == childB) {
      posA -= size;
      posB -= size;
      continue;
    }
    if (!childA.sameMarkup(childB))
      return { a: posA, b: posB };
    if (childA.isText && childA.text != childB.text) {
      let same = 0, minSize = Math.min(childA.text.length, childB.text.length);
      while (same < minSize && childA.text[childA.text.length - same - 1] == childB.text[childB.text.length - same - 1]) {
        same++;
        posA--;
        posB--;
      }
      return { a: posA, b: posB };
    }
    if (childA.content.size || childB.content.size) {
      let inner = findDiffEnd(childA.content, childB.content, posA - 1, posB - 1);
      if (inner)
        return inner;
    }
    posA -= size;
    posB -= size;
  }
}
var Fragment = class _Fragment {
  /**
  @internal
  */
  constructor(content, size) {
    this.content = content;
    this.size = size || 0;
    if (size == null)
      for (let i = 0; i < content.length; i++)
        this.size += content[i].nodeSize;
  }
  /**
  Invoke a callback for all descendant nodes between the given two
  positions (relative to start of this fragment). Doesn't descend
  into a node when the callback returns `false`.
  */
  nodesBetween(from, to, f, nodeStart = 0, parent) {
    for (let i = 0, pos = 0; pos < to; i++) {
      let child = this.content[i], end = pos + child.nodeSize;
      if (end > from && f(child, nodeStart + pos, parent || null, i) !== false && child.content.size) {
        let start = pos + 1;
        child.nodesBetween(Math.max(0, from - start), Math.min(child.content.size, to - start), f, nodeStart + start);
      }
      pos = end;
    }
  }
  /**
  Call the given callback for every descendant node. `pos` will be
  relative to the start of the fragment. The callback may return
  `false` to prevent traversal of a given node's children.
  */
  descendants(f) {
    this.nodesBetween(0, this.size, f);
  }
  /**
  Extract the text between `from` and `to`. See the same method on
  [`Node`](https://prosemirror.net/docs/ref/#model.Node.textBetween).
  */
  textBetween(from, to, blockSeparator, leafText) {
    let text = "", first = true;
    this.nodesBetween(from, to, (node, pos) => {
      let nodeText = node.isText ? node.text.slice(Math.max(from, pos) - pos, to - pos) : !node.isLeaf ? "" : leafText ? typeof leafText === "function" ? leafText(node) : leafText : node.type.spec.leafText ? node.type.spec.leafText(node) : "";
      if (node.isBlock && (node.isLeaf && nodeText || node.isTextblock) && blockSeparator) {
        if (first)
          first = false;
        else
          text += blockSeparator;
      }
      text += nodeText;
    }, 0);
    return text;
  }
  /**
  Create a new fragment containing the combined content of this
  fragment and the other.
  */
  append(other) {
    if (!other.size)
      return this;
    if (!this.size)
      return other;
    let last = this.lastChild, first = other.firstChild, content = this.content.slice(), i = 0;
    if (last.isText && last.sameMarkup(first)) {
      content[content.length - 1] = last.withText(last.text + first.text);
      i = 1;
    }
    for (; i < other.content.length; i++)
      content.push(other.content[i]);
    return new _Fragment(content, this.size + other.size);
  }
  /**
  Cut out the sub-fragment between the two given positions.
  */
  cut(from, to = this.size) {
    if (from == 0 && to == this.size)
      return this;
    let result = [], size = 0;
    if (to > from)
      for (let i = 0, pos = 0; pos < to; i++) {
        let child = this.content[i], end = pos + child.nodeSize;
        if (end > from) {
          if (pos < from || end > to) {
            if (child.isText)
              child = child.cut(Math.max(0, from - pos), Math.min(child.text.length, to - pos));
            else
              child = child.cut(Math.max(0, from - pos - 1), Math.min(child.content.size, to - pos - 1));
          }
          result.push(child);
          size += child.nodeSize;
        }
        pos = end;
      }
    return new _Fragment(result, size);
  }
  /**
  @internal
  */
  cutByIndex(from, to) {
    if (from == to)
      return _Fragment.empty;
    if (from == 0 && to == this.content.length)
      return this;
    return new _Fragment(this.content.slice(from, to));
  }
  /**
  Create a new fragment in which the node at the given index is
  replaced by the given node.
  */
  replaceChild(index, node) {
    let current = this.content[index];
    if (current == node)
      return this;
    let copy = this.content.slice();
    let size = this.size + node.nodeSize - current.nodeSize;
    copy[index] = node;
    return new _Fragment(copy, size);
  }
  /**
  Create a new fragment by prepending the given node to this
  fragment.
  */
  addToStart(node) {
    return new _Fragment([node].concat(this.content), this.size + node.nodeSize);
  }
  /**
  Create a new fragment by appending the given node to this
  fragment.
  */
  addToEnd(node) {
    return new _Fragment(this.content.concat(node), this.size + node.nodeSize);
  }
  /**
  Compare this fragment to another one.
  */
  eq(other) {
    if (this.content.length != other.content.length)
      return false;
    for (let i = 0; i < this.content.length; i++)
      if (!this.content[i].eq(other.content[i]))
        return false;
    return true;
  }
  /**
  The first child of the fragment, or `null` if it is empty.
  */
  get firstChild() {
    return this.content.length ? this.content[0] : null;
  }
  /**
  The last child of the fragment, or `null` if it is empty.
  */
  get lastChild() {
    return this.content.length ? this.content[this.content.length - 1] : null;
  }
  /**
  The number of child nodes in this fragment.
  */
  get childCount() {
    return this.content.length;
  }
  /**
  Get the child node at the given index. Raise an error when the
  index is out of range.
  */
  child(index) {
    let found2 = this.content[index];
    if (!found2)
      throw new RangeError("Index " + index + " out of range for " + this);
    return found2;
  }
  /**
  Get the child node at the given index, if it exists.
  */
  maybeChild(index) {
    return this.content[index] || null;
  }
  /**
  Call `f` for every child node, passing the node, its offset
  into this parent node, and its index.
  */
  forEach(f) {
    for (let i = 0, p = 0; i < this.content.length; i++) {
      let child = this.content[i];
      f(child, p, i);
      p += child.nodeSize;
    }
  }
  /**
  Find the first position at which this fragment and another
  fragment differ, or `null` if they are the same.
  */
  findDiffStart(other, pos = 0) {
    return findDiffStart(this, other, pos);
  }
  /**
  Find the first position, searching from the end, at which this
  fragment and the given fragment differ, or `null` if they are
  the same. Since this position will not be the same in both
  nodes, an object with two separate positions is returned.
  */
  findDiffEnd(other, pos = this.size, otherPos = other.size) {
    return findDiffEnd(this, other, pos, otherPos);
  }
  /**
  Find the index and inner offset corresponding to a given relative
  position in this fragment. The result object will be reused
  (overwritten) the next time the function is called. @internal
  */
  findIndex(pos) {
    if (pos == 0)
      return retIndex(0, pos);
    if (pos == this.size)
      return retIndex(this.content.length, pos);
    if (pos > this.size || pos < 0)
      throw new RangeError(`Position ${pos} outside of fragment (${this})`);
    for (let i = 0, curPos = 0; ; i++) {
      let cur = this.child(i), end = curPos + cur.nodeSize;
      if (end >= pos) {
        if (end == pos)
          return retIndex(i + 1, end);
        return retIndex(i, curPos);
      }
      curPos = end;
    }
  }
  /**
  Return a debugging string that describes this fragment.
  */
  toString() {
    return "<" + this.toStringInner() + ">";
  }
  /**
  @internal
  */
  toStringInner() {
    return this.content.join(", ");
  }
  /**
  Create a JSON-serializeable representation of this fragment.
  */
  toJSON() {
    return this.content.length ? this.content.map((n) => n.toJSON()) : null;
  }
  /**
  Deserialize a fragment from its JSON representation.
  */
  static fromJSON(schema, value) {
    if (!value)
      return _Fragment.empty;
    if (!Array.isArray(value))
      throw new RangeError("Invalid input for Fragment.fromJSON");
    return _Fragment.fromArray(value.map(schema.nodeFromJSON));
  }
  /**
  Build a fragment from an array of nodes. Ensures that adjacent
  text nodes with the same marks are joined together.
  */
  static fromArray(array) {
    if (!array.length)
      return _Fragment.empty;
    let joined, size = 0;
    for (let i = 0; i < array.length; i++) {
      let node = array[i];
      size += node.nodeSize;
      if (i && node.isText && array[i - 1].sameMarkup(node)) {
        if (!joined)
          joined = array.slice(0, i);
        joined[joined.length - 1] = node.withText(joined[joined.length - 1].text + node.text);
      } else if (joined) {
        joined.push(node);
      }
    }
    return new _Fragment(joined || array, size);
  }
  /**
  Create a fragment from something that can be interpreted as a
  set of nodes. For `null`, it returns the empty fragment. For a
  fragment, the fragment itself. For a node or array of nodes, a
  fragment containing those nodes.
  */
  static from(nodes) {
    if (!nodes)
      return _Fragment.empty;
    if (nodes instanceof _Fragment)
      return nodes;
    if (Array.isArray(nodes))
      return this.fromArray(nodes);
    if (nodes.attrs)
      return new _Fragment([nodes], nodes.nodeSize);
    throw new RangeError("Can not convert " + nodes + " to a Fragment" + (nodes.nodesBetween ? " (looks like multiple versions of prosemirror-model were loaded)" : ""));
  }
};
Fragment.empty = new Fragment([], 0);
var found = { index: 0, offset: 0 };
function retIndex(index, offset) {
  found.index = index;
  found.offset = offset;
  return found;
}
var ReplaceError = class extends Error {
};
var Slice = class _Slice {
  /**
  Create a slice. When specifying a non-zero open depth, you must
  make sure that there are nodes of at least that depth at the
  appropriate side of the fragment—i.e. if the fragment is an
  empty paragraph node, `openStart` and `openEnd` can't be greater
  than 1.
  
  It is not necessary for the content of open nodes to conform to
  the schema's content constraints, though it should be a valid
  start/end/middle for such a node, depending on which sides are
  open.
  */
  constructor(content, openStart, openEnd) {
    this.content = content;
    this.openStart = openStart;
    this.openEnd = openEnd;
  }
  /**
  The size this slice would add when inserted into a document.
  */
  get size() {
    return this.content.size - this.openStart - this.openEnd;
  }
  /**
  @internal
  */
  insertAt(pos, fragment) {
    let content = insertInto(this.content, pos + this.openStart, fragment, this.openStart + 1, this.openEnd + 1);
    return content && new _Slice(content, this.openStart, this.openEnd);
  }
  /**
  @internal
  */
  removeBetween(from, to) {
    return new _Slice(removeRange(this.content, from + this.openStart, to + this.openStart), this.openStart, this.openEnd);
  }
  /**
  Tests whether this slice is equal to another slice.
  */
  eq(other) {
    return this.content.eq(other.content) && this.openStart == other.openStart && this.openEnd == other.openEnd;
  }
  /**
  @internal
  */
  toString() {
    return this.content + "(" + this.openStart + "," + this.openEnd + ")";
  }
  /**
  Convert a slice to a JSON-serializable representation.
  */
  toJSON() {
    if (!this.content.size)
      return null;
    let json = { content: this.content.toJSON() };
    if (this.openStart > 0)
      json.openStart = this.openStart;
    if (this.openEnd > 0)
      json.openEnd = this.openEnd;
    return json;
  }
  /**
  Deserialize a slice from its JSON representation.
  */
  static fromJSON(schema, json) {
    if (!json)
      return _Slice.empty;
    let openStart = json.openStart || 0, openEnd = json.openEnd || 0;
    if (typeof openStart != "number" || typeof openEnd != "number")
      throw new RangeError("Invalid input for Slice.fromJSON");
    return new _Slice(Fragment.fromJSON(schema, json.content), openStart, openEnd);
  }
  /**
  Create a slice from a fragment by taking the maximum possible
  open value on both side of the fragment.
  */
  static maxOpen(fragment, openIsolating = true) {
    let openStart = 0, openEnd = 0;
    for (let n = fragment.firstChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.firstChild)
      openStart++;
    for (let n = fragment.lastChild; n && !n.isLeaf && (openIsolating || !n.type.spec.isolating); n = n.lastChild)
      openEnd++;
    return new _Slice(fragment, openStart, openEnd);
  }
};
Slice.empty = new Slice(Fragment.empty, 0, 0);
function removeRange(content, from, to) {
  let { index, offset } = content.findIndex(from), child = content.maybeChild(index);
  let { index: indexTo, offset: offsetTo } = content.findIndex(to);
  if (offset == from || child.isText) {
    if (offsetTo != to && !content.child(indexTo).isText)
      throw new RangeError("Removing non-flat range");
    return content.cut(0, from).append(content.cut(to));
  }
  if (index != indexTo)
    throw new RangeError("Removing non-flat range");
  return content.replaceChild(index, child.copy(removeRange(child.content, from - offset - 1, to - offset - 1)));
}
function insertInto(content, dist, insert, openStart, openEnd, parent) {
  let { index, offset } = content.findIndex(dist), child = content.maybeChild(index);
  if (offset == dist || child.isText) {
    if (parent && openStart <= 0 && openEnd <= 0 && !parent.canReplace(index, index, insert))
      return null;
    return content.cut(0, dist).append(insert).append(content.cut(dist));
  }
  let inner = insertInto(child.content, dist - offset - 1, insert, index == 0 ? openStart - 1 : 0, index == content.childCount - 1 ? openEnd - 1 : 0, child);
  return inner && content.replaceChild(index, child.copy(inner));
}

// ../../node_modules/.pnpm/prosemirror-transform@1.12.0/node_modules/prosemirror-transform/dist/index.js
var lower16 = 65535;
var factor16 = Math.pow(2, 16);
function makeRecover(index, offset) {
  return index + offset * factor16;
}
function recoverIndex(value) {
  return value & lower16;
}
function recoverOffset(value) {
  return (value - (value & lower16)) / factor16;
}
var DEL_BEFORE = 1;
var DEL_AFTER = 2;
var DEL_ACROSS = 4;
var DEL_SIDE = 8;
var MapResult = class {
  /**
  @internal
  */
  constructor(pos, delInfo, recover) {
    this.pos = pos;
    this.delInfo = delInfo;
    this.recover = recover;
  }
  /**
  Tells you whether the position was deleted, that is, whether the
  step removed the token on the side queried (via the `assoc`)
  argument from the document.
  */
  get deleted() {
    return (this.delInfo & DEL_SIDE) > 0;
  }
  /**
  Tells you whether the token before the mapped position was deleted.
  */
  get deletedBefore() {
    return (this.delInfo & (DEL_BEFORE | DEL_ACROSS)) > 0;
  }
  /**
  True when the token after the mapped position was deleted.
  */
  get deletedAfter() {
    return (this.delInfo & (DEL_AFTER | DEL_ACROSS)) > 0;
  }
  /**
  Tells whether any of the steps mapped through deletes across the
  position (including both the token before and after the
  position).
  */
  get deletedAcross() {
    return (this.delInfo & DEL_ACROSS) > 0;
  }
};
var StepMap = class _StepMap {
  /**
  Create a position map. The modifications to the document are
  represented as an array of numbers, in which each group of three
  represents a modified chunk as `[start, oldSize, newSize]`.
  */
  constructor(ranges, inverted = false) {
    this.ranges = ranges;
    this.inverted = inverted;
    if (!ranges.length && _StepMap.empty)
      return _StepMap.empty;
  }
  /**
  @internal
  */
  recover(value) {
    let diff = 0, index = recoverIndex(value);
    if (!this.inverted)
      for (let i = 0; i < index; i++)
        diff += this.ranges[i * 3 + 2] - this.ranges[i * 3 + 1];
    return this.ranges[index * 3] + diff + recoverOffset(value);
  }
  mapResult(pos, assoc = 1) {
    return this._map(pos, assoc, false);
  }
  map(pos, assoc = 1) {
    return this._map(pos, assoc, true);
  }
  /**
  @internal
  */
  _map(pos, assoc, simple) {
    let diff = 0, oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (let i = 0; i < this.ranges.length; i += 3) {
      let start = this.ranges[i] - (this.inverted ? diff : 0);
      if (start > pos)
        break;
      let oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex], end = start + oldSize;
      if (pos <= end) {
        let side = !oldSize ? assoc : pos == start ? -1 : pos == end ? 1 : assoc;
        let result = start + diff + (side < 0 ? 0 : newSize);
        if (simple)
          return result;
        let recover = pos == (assoc < 0 ? start : end) ? null : makeRecover(i / 3, pos - start);
        let del = pos == start ? DEL_AFTER : pos == end ? DEL_BEFORE : DEL_ACROSS;
        if (assoc < 0 ? pos != start : pos != end)
          del |= DEL_SIDE;
        return new MapResult(result, del, recover);
      }
      diff += newSize - oldSize;
    }
    return simple ? pos + diff : new MapResult(pos + diff, 0, null);
  }
  /**
  @internal
  */
  touches(pos, recover) {
    let diff = 0, index = recoverIndex(recover);
    let oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (let i = 0; i < this.ranges.length; i += 3) {
      let start = this.ranges[i] - (this.inverted ? diff : 0);
      if (start > pos)
        break;
      let oldSize = this.ranges[i + oldIndex], end = start + oldSize;
      if (pos <= end && i == index * 3)
        return true;
      diff += this.ranges[i + newIndex] - oldSize;
    }
    return false;
  }
  /**
  Calls the given function on each of the changed ranges included in
  this map.
  */
  forEach(f) {
    let oldIndex = this.inverted ? 2 : 1, newIndex = this.inverted ? 1 : 2;
    for (let i = 0, diff = 0; i < this.ranges.length; i += 3) {
      let start = this.ranges[i], oldStart = start - (this.inverted ? diff : 0), newStart = start + (this.inverted ? 0 : diff);
      let oldSize = this.ranges[i + oldIndex], newSize = this.ranges[i + newIndex];
      f(oldStart, oldStart + oldSize, newStart, newStart + newSize);
      diff += newSize - oldSize;
    }
  }
  /**
  Create an inverted version of this map. The result can be used to
  map positions in the post-step document to the pre-step document.
  */
  invert() {
    return new _StepMap(this.ranges, !this.inverted);
  }
  /**
  @internal
  */
  toString() {
    return (this.inverted ? "-" : "") + JSON.stringify(this.ranges);
  }
  /**
  Create a map that moves all positions by offset `n` (which may be
  negative). This can be useful when applying steps meant for a
  sub-document to a larger document, or vice-versa.
  */
  static offset(n) {
    return n == 0 ? _StepMap.empty : new _StepMap(n < 0 ? [0, -n, 0] : [0, 0, n]);
  }
};
StepMap.empty = new StepMap([]);
var stepsByID = /* @__PURE__ */ Object.create(null);
var Step = class {
  /**
  Get the step map that represents the changes made by this step,
  and which can be used to transform between positions in the old
  and the new document.
  */
  getMap() {
    return StepMap.empty;
  }
  /**
  Try to merge this step with another one, to be applied directly
  after it. Returns the merged step when possible, null if the
  steps can't be merged.
  */
  merge(other) {
    return null;
  }
  /**
  Deserialize a step from its JSON representation. Will call
  through to the step class' own implementation of this method.
  */
  static fromJSON(schema, json) {
    if (!json || !json.stepType)
      throw new RangeError("Invalid input for Step.fromJSON");
    let type = stepsByID[json.stepType];
    if (!type)
      throw new RangeError(`No step type ${json.stepType} defined`);
    return type.fromJSON(schema, json);
  }
  /**
  To be able to serialize steps to JSON, each step needs a string
  ID to attach to its JSON representation. Use this method to
  register an ID for your step classes. Try to pick something
  that's unlikely to clash with steps from other modules.
  */
  static jsonID(id, stepClass) {
    if (id in stepsByID)
      throw new RangeError("Duplicate use of step JSON ID " + id);
    stepsByID[id] = stepClass;
    stepClass.prototype.jsonID = id;
    return stepClass;
  }
};
var StepResult = class _StepResult {
  /**
  @internal
  */
  constructor(doc, failed) {
    this.doc = doc;
    this.failed = failed;
  }
  /**
  Create a successful step result.
  */
  static ok(doc) {
    return new _StepResult(doc, null);
  }
  /**
  Create a failed step result.
  */
  static fail(message) {
    return new _StepResult(null, message);
  }
  /**
  Call [`Node.replace`](https://prosemirror.net/docs/ref/#model.Node.replace) with the given
  arguments. Create a successful result if it succeeds, and a
  failed one if it throws a `ReplaceError`.
  */
  static fromReplace(doc, from, to, slice) {
    try {
      return _StepResult.ok(doc.replace(from, to, slice));
    } catch (e) {
      if (e instanceof ReplaceError)
        return _StepResult.fail(e.message);
      throw e;
    }
  }
};
function mapFragment(fragment, f, parent) {
  let mapped = [];
  for (let i = 0; i < fragment.childCount; i++) {
    let child = fragment.child(i);
    if (child.content.size)
      child = child.copy(mapFragment(child.content, f, child));
    if (child.isInline)
      child = f(child, parent, i);
    mapped.push(child);
  }
  return Fragment.fromArray(mapped);
}
var AddMarkStep = class _AddMarkStep extends Step {
  /**
  Create a mark step.
  */
  constructor(from, to, mark) {
    super();
    this.from = from;
    this.to = to;
    this.mark = mark;
  }
  apply(doc) {
    let oldSlice = doc.slice(this.from, this.to), $from = doc.resolve(this.from);
    let parent = $from.node($from.sharedDepth(this.to));
    let slice = new Slice(mapFragment(oldSlice.content, (node, parent2) => {
      if (!node.isAtom || !parent2.type.allowsMarkType(this.mark.type))
        return node;
      return node.mark(this.mark.addToSet(node.marks));
    }, parent), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc, this.from, this.to, slice);
  }
  invert() {
    return new RemoveMarkStep(this.from, this.to, this.mark);
  }
  map(mapping) {
    let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deleted && to.deleted || from.pos >= to.pos)
      return null;
    return new _AddMarkStep(from.pos, to.pos, this.mark);
  }
  merge(other) {
    if (other instanceof _AddMarkStep && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from)
      return new _AddMarkStep(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    return null;
  }
  toJSON() {
    return {
      stepType: "addMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number")
      throw new RangeError("Invalid input for AddMarkStep.fromJSON");
    return new _AddMarkStep(json.from, json.to, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("addMark", AddMarkStep);
var RemoveMarkStep = class _RemoveMarkStep extends Step {
  /**
  Create a mark-removing step.
  */
  constructor(from, to, mark) {
    super();
    this.from = from;
    this.to = to;
    this.mark = mark;
  }
  apply(doc) {
    let oldSlice = doc.slice(this.from, this.to);
    let slice = new Slice(mapFragment(oldSlice.content, (node) => {
      return node.mark(this.mark.removeFromSet(node.marks));
    }, doc), oldSlice.openStart, oldSlice.openEnd);
    return StepResult.fromReplace(doc, this.from, this.to, slice);
  }
  invert() {
    return new AddMarkStep(this.from, this.to, this.mark);
  }
  map(mapping) {
    let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    if (from.deleted && to.deleted || from.pos >= to.pos)
      return null;
    return new _RemoveMarkStep(from.pos, to.pos, this.mark);
  }
  merge(other) {
    if (other instanceof _RemoveMarkStep && other.mark.eq(this.mark) && this.from <= other.to && this.to >= other.from)
      return new _RemoveMarkStep(Math.min(this.from, other.from), Math.max(this.to, other.to), this.mark);
    return null;
  }
  toJSON() {
    return {
      stepType: "removeMark",
      mark: this.mark.toJSON(),
      from: this.from,
      to: this.to
    };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number")
      throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");
    return new _RemoveMarkStep(json.from, json.to, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("removeMark", RemoveMarkStep);
var AddNodeMarkStep = class _AddNodeMarkStep extends Step {
  /**
  Create a node mark step.
  */
  constructor(pos, mark) {
    super();
    this.pos = pos;
    this.mark = mark;
  }
  apply(doc) {
    let node = doc.nodeAt(this.pos);
    if (!node)
      return StepResult.fail("No node at mark step's position");
    let updated = node.type.create(node.attrs, null, this.mark.addToSet(node.marks));
    return StepResult.fromReplace(doc, this.pos, this.pos + 1, new Slice(Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
  }
  invert(doc) {
    let node = doc.nodeAt(this.pos);
    if (node) {
      let newSet = this.mark.addToSet(node.marks);
      if (newSet.length == node.marks.length) {
        for (let i = 0; i < node.marks.length; i++)
          if (!node.marks[i].isInSet(newSet))
            return new _AddNodeMarkStep(this.pos, node.marks[i]);
        return new _AddNodeMarkStep(this.pos, this.mark);
      }
    }
    return new RemoveNodeMarkStep(this.pos, this.mark);
  }
  map(mapping) {
    let pos = mapping.mapResult(this.pos, 1);
    return pos.deletedAfter ? null : new _AddNodeMarkStep(pos.pos, this.mark);
  }
  toJSON() {
    return { stepType: "addNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.pos != "number")
      throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");
    return new _AddNodeMarkStep(json.pos, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("addNodeMark", AddNodeMarkStep);
var RemoveNodeMarkStep = class _RemoveNodeMarkStep extends Step {
  /**
  Create a mark-removing step.
  */
  constructor(pos, mark) {
    super();
    this.pos = pos;
    this.mark = mark;
  }
  apply(doc) {
    let node = doc.nodeAt(this.pos);
    if (!node)
      return StepResult.fail("No node at mark step's position");
    let updated = node.type.create(node.attrs, null, this.mark.removeFromSet(node.marks));
    return StepResult.fromReplace(doc, this.pos, this.pos + 1, new Slice(Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
  }
  invert(doc) {
    let node = doc.nodeAt(this.pos);
    if (!node || !this.mark.isInSet(node.marks))
      return this;
    return new AddNodeMarkStep(this.pos, this.mark);
  }
  map(mapping) {
    let pos = mapping.mapResult(this.pos, 1);
    return pos.deletedAfter ? null : new _RemoveNodeMarkStep(pos.pos, this.mark);
  }
  toJSON() {
    return { stepType: "removeNodeMark", pos: this.pos, mark: this.mark.toJSON() };
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.pos != "number")
      throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");
    return new _RemoveNodeMarkStep(json.pos, schema.markFromJSON(json.mark));
  }
};
Step.jsonID("removeNodeMark", RemoveNodeMarkStep);
var ReplaceStep = class _ReplaceStep extends Step {
  /**
  The given `slice` should fit the 'gap' between `from` and
  `to`—the depths must line up, and the surrounding nodes must be
  able to be joined with the open sides of the slice. When
  `structure` is true, the step will fail if the content between
  from and to is not just a sequence of closing and then opening
  tokens (this is to guard against rebased replace steps
  overwriting something they weren't supposed to).
  */
  constructor(from, to, slice, structure = false) {
    super();
    this.from = from;
    this.to = to;
    this.slice = slice;
    this.structure = structure;
  }
  apply(doc) {
    if (this.structure && contentBetween(doc, this.from, this.to))
      return StepResult.fail("Structure replace would overwrite content");
    return StepResult.fromReplace(doc, this.from, this.to, this.slice);
  }
  getMap() {
    return new StepMap([this.from, this.to - this.from, this.slice.size]);
  }
  invert(doc) {
    return new _ReplaceStep(this.from, this.from + this.slice.size, doc.slice(this.from, this.to));
  }
  map(mapping) {
    let to = mapping.mapResult(this.to, -1);
    let from = this.from == this.to && _ReplaceStep.MAP_BIAS < 0 ? to : mapping.mapResult(this.from, 1);
    if (from.deletedAcross && to.deletedAcross)
      return null;
    return new _ReplaceStep(from.pos, Math.max(from.pos, to.pos), this.slice, this.structure);
  }
  merge(other) {
    if (!(other instanceof _ReplaceStep) || other.structure || this.structure)
      return null;
    if (this.from + this.slice.size == other.from && !this.slice.openEnd && !other.slice.openStart) {
      let slice = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(this.slice.content.append(other.slice.content), this.slice.openStart, other.slice.openEnd);
      return new _ReplaceStep(this.from, this.to + (other.to - other.from), slice, this.structure);
    } else if (other.to == this.from && !this.slice.openStart && !other.slice.openEnd) {
      let slice = this.slice.size + other.slice.size == 0 ? Slice.empty : new Slice(other.slice.content.append(this.slice.content), other.slice.openStart, this.slice.openEnd);
      return new _ReplaceStep(other.from, this.to, slice, this.structure);
    } else {
      return null;
    }
  }
  toJSON() {
    let json = { stepType: "replace", from: this.from, to: this.to };
    if (this.slice.size)
      json.slice = this.slice.toJSON();
    if (this.structure)
      json.structure = true;
    return json;
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number")
      throw new RangeError("Invalid input for ReplaceStep.fromJSON");
    return new _ReplaceStep(json.from, json.to, Slice.fromJSON(schema, json.slice), !!json.structure);
  }
};
ReplaceStep.MAP_BIAS = 1;
Step.jsonID("replace", ReplaceStep);
var ReplaceAroundStep = class _ReplaceAroundStep extends Step {
  /**
  Create a replace-around step with the given range and gap.
  `insert` should be the point in the slice into which the content
  of the gap should be moved. `structure` has the same meaning as
  it has in the [`ReplaceStep`](https://prosemirror.net/docs/ref/#transform.ReplaceStep) class.
  */
  constructor(from, to, gapFrom, gapTo, slice, insert, structure = false) {
    super();
    this.from = from;
    this.to = to;
    this.gapFrom = gapFrom;
    this.gapTo = gapTo;
    this.slice = slice;
    this.insert = insert;
    this.structure = structure;
  }
  apply(doc) {
    if (this.structure && (contentBetween(doc, this.from, this.gapFrom) || contentBetween(doc, this.gapTo, this.to)))
      return StepResult.fail("Structure gap-replace would overwrite content");
    let gap = doc.slice(this.gapFrom, this.gapTo);
    if (gap.openStart || gap.openEnd)
      return StepResult.fail("Gap is not a flat range");
    let inserted = this.slice.insertAt(this.insert, gap.content);
    if (!inserted)
      return StepResult.fail("Content does not fit in gap");
    return StepResult.fromReplace(doc, this.from, this.to, inserted);
  }
  getMap() {
    return new StepMap([
      this.from,
      this.gapFrom - this.from,
      this.insert,
      this.gapTo,
      this.to - this.gapTo,
      this.slice.size - this.insert
    ]);
  }
  invert(doc) {
    let gap = this.gapTo - this.gapFrom;
    return new _ReplaceAroundStep(this.from, this.from + this.slice.size + gap, this.from + this.insert, this.from + this.insert + gap, doc.slice(this.from, this.to).removeBetween(this.gapFrom - this.from, this.gapTo - this.from), this.gapFrom - this.from, this.structure);
  }
  map(mapping) {
    let from = mapping.mapResult(this.from, 1), to = mapping.mapResult(this.to, -1);
    let gapFrom = this.from == this.gapFrom ? from.pos : mapping.map(this.gapFrom, -1);
    let gapTo = this.to == this.gapTo ? to.pos : mapping.map(this.gapTo, 1);
    if (from.deletedAcross && to.deletedAcross || gapFrom < from.pos || gapTo > to.pos)
      return null;
    return new _ReplaceAroundStep(from.pos, to.pos, gapFrom, gapTo, this.slice, this.insert, this.structure);
  }
  toJSON() {
    let json = {
      stepType: "replaceAround",
      from: this.from,
      to: this.to,
      gapFrom: this.gapFrom,
      gapTo: this.gapTo,
      insert: this.insert
    };
    if (this.slice.size)
      json.slice = this.slice.toJSON();
    if (this.structure)
      json.structure = true;
    return json;
  }
  /**
  @internal
  */
  static fromJSON(schema, json) {
    if (typeof json.from != "number" || typeof json.to != "number" || typeof json.gapFrom != "number" || typeof json.gapTo != "number" || typeof json.insert != "number")
      throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");
    return new _ReplaceAroundStep(json.from, json.to, json.gapFrom, json.gapTo, Slice.fromJSON(schema, json.slice), json.insert, !!json.structure);
  }
};
Step.jsonID("replaceAround", ReplaceAroundStep);
function contentBetween(doc, from, to) {
  let $from = doc.resolve(from), dist = to - from, depth = $from.depth;
  while (dist > 0 && depth > 0 && $from.indexAfter(depth) == $from.node(depth).childCount) {
    depth--;
    dist--;
  }
  if (dist > 0) {
    let next = $from.node(depth).maybeChild($from.indexAfter(depth));
    while (dist > 0) {
      if (!next || next.isLeaf)
        return true;
      next = next.firstChild;
      dist--;
    }
  }
  return false;
}
var AttrStep = class _AttrStep extends Step {
  /**
  Construct an attribute step.
  */
  constructor(pos, attr, value) {
    super();
    this.pos = pos;
    this.attr = attr;
    this.value = value;
  }
  apply(doc) {
    let node = doc.nodeAt(this.pos);
    if (!node)
      return StepResult.fail("No node at attribute step's position");
    let attrs = /* @__PURE__ */ Object.create(null);
    for (let name in node.attrs)
      attrs[name] = node.attrs[name];
    attrs[this.attr] = this.value;
    let updated = node.type.create(attrs, null, node.marks);
    return StepResult.fromReplace(doc, this.pos, this.pos + 1, new Slice(Fragment.from(updated), 0, node.isLeaf ? 0 : 1));
  }
  getMap() {
    return StepMap.empty;
  }
  invert(doc) {
    return new _AttrStep(this.pos, this.attr, doc.nodeAt(this.pos).attrs[this.attr]);
  }
  map(mapping) {
    let pos = mapping.mapResult(this.pos, 1);
    return pos.deletedAfter ? null : new _AttrStep(pos.pos, this.attr, this.value);
  }
  toJSON() {
    return { stepType: "attr", pos: this.pos, attr: this.attr, value: this.value };
  }
  static fromJSON(schema, json) {
    if (typeof json.pos != "number" || typeof json.attr != "string")
      throw new RangeError("Invalid input for AttrStep.fromJSON");
    return new _AttrStep(json.pos, json.attr, json.value);
  }
};
Step.jsonID("attr", AttrStep);
var DocAttrStep = class _DocAttrStep extends Step {
  /**
  Construct an attribute step.
  */
  constructor(attr, value) {
    super();
    this.attr = attr;
    this.value = value;
  }
  apply(doc) {
    let attrs = /* @__PURE__ */ Object.create(null);
    for (let name in doc.attrs)
      attrs[name] = doc.attrs[name];
    attrs[this.attr] = this.value;
    let updated = doc.type.create(attrs, doc.content, doc.marks);
    return StepResult.ok(updated);
  }
  getMap() {
    return StepMap.empty;
  }
  invert(doc) {
    return new _DocAttrStep(this.attr, doc.attrs[this.attr]);
  }
  map(mapping) {
    return this;
  }
  toJSON() {
    return { stepType: "docAttr", attr: this.attr, value: this.value };
  }
  static fromJSON(schema, json) {
    if (typeof json.attr != "string")
      throw new RangeError("Invalid input for DocAttrStep.fromJSON");
    return new _DocAttrStep(json.attr, json.value);
  }
};
Step.jsonID("docAttr", DocAttrStep);
var TransformError = class extends Error {
};
TransformError = function TransformError2(message) {
  let err = Error.call(this, message);
  err.__proto__ = TransformError2.prototype;
  return err;
};
TransformError.prototype = Object.create(Error.prototype);
TransformError.prototype.constructor = TransformError;
TransformError.prototype.name = "TransformError";

// ../../node_modules/.pnpm/prosemirror-state@1.4.4/node_modules/prosemirror-state/dist/index.js
var classesById = /* @__PURE__ */ Object.create(null);
var Selection = class {
  /**
  Initialize a selection with the head and anchor and ranges. If no
  ranges are given, constructs a single range across `$anchor` and
  `$head`.
  */
  constructor($anchor, $head, ranges) {
    this.$anchor = $anchor;
    this.$head = $head;
    this.ranges = ranges || [new SelectionRange($anchor.min($head), $anchor.max($head))];
  }
  /**
  The selection's anchor, as an unresolved position.
  */
  get anchor() {
    return this.$anchor.pos;
  }
  /**
  The selection's head.
  */
  get head() {
    return this.$head.pos;
  }
  /**
  The lower bound of the selection's main range.
  */
  get from() {
    return this.$from.pos;
  }
  /**
  The upper bound of the selection's main range.
  */
  get to() {
    return this.$to.pos;
  }
  /**
  The resolved lower  bound of the selection's main range.
  */
  get $from() {
    return this.ranges[0].$from;
  }
  /**
  The resolved upper bound of the selection's main range.
  */
  get $to() {
    return this.ranges[0].$to;
  }
  /**
  Indicates whether the selection contains any content.
  */
  get empty() {
    let ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++)
      if (ranges[i].$from.pos != ranges[i].$to.pos)
        return false;
    return true;
  }
  /**
  Get the content of this selection as a slice.
  */
  content() {
    return this.$from.doc.slice(this.from, this.to, true);
  }
  /**
  Replace the selection with a slice or, if no slice is given,
  delete the selection. Will append to the given transaction.
  */
  replace(tr, content = Slice.empty) {
    let lastNode = content.content.lastChild, lastParent = null;
    for (let i = 0; i < content.openEnd; i++) {
      lastParent = lastNode;
      lastNode = lastNode.lastChild;
    }
    let mapFrom = tr.steps.length, ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      let { $from, $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
      tr.replaceRange(mapping.map($from.pos), mapping.map($to.pos), i ? Slice.empty : content);
      if (i == 0)
        selectionToInsertionEnd(tr, mapFrom, (lastNode ? lastNode.isInline : lastParent && lastParent.isTextblock) ? -1 : 1);
    }
  }
  /**
  Replace the selection with the given node, appending the changes
  to the given transaction.
  */
  replaceWith(tr, node) {
    let mapFrom = tr.steps.length, ranges = this.ranges;
    for (let i = 0; i < ranges.length; i++) {
      let { $from, $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
      let from = mapping.map($from.pos), to = mapping.map($to.pos);
      if (i) {
        tr.deleteRange(from, to);
      } else {
        tr.replaceRangeWith(from, to, node);
        selectionToInsertionEnd(tr, mapFrom, node.isInline ? -1 : 1);
      }
    }
  }
  /**
  Find a valid cursor or leaf node selection starting at the given
  position and searching back if `dir` is negative, and forward if
  positive. When `textOnly` is true, only consider cursor
  selections. Will return null when no valid selection position is
  found.
  */
  static findFrom($pos, dir, textOnly = false) {
    let inner = $pos.parent.inlineContent ? new TextSelection($pos) : findSelectionIn($pos.node(0), $pos.parent, $pos.pos, $pos.index(), dir, textOnly);
    if (inner)
      return inner;
    for (let depth = $pos.depth - 1; depth >= 0; depth--) {
      let found2 = dir < 0 ? findSelectionIn($pos.node(0), $pos.node(depth), $pos.before(depth + 1), $pos.index(depth), dir, textOnly) : findSelectionIn($pos.node(0), $pos.node(depth), $pos.after(depth + 1), $pos.index(depth) + 1, dir, textOnly);
      if (found2)
        return found2;
    }
    return null;
  }
  /**
  Find a valid cursor or leaf node selection near the given
  position. Searches forward first by default, but if `bias` is
  negative, it will search backwards first.
  */
  static near($pos, bias = 1) {
    return this.findFrom($pos, bias) || this.findFrom($pos, -bias) || new AllSelection($pos.node(0));
  }
  /**
  Find the cursor or leaf node selection closest to the start of
  the given document. Will return an
  [`AllSelection`](https://prosemirror.net/docs/ref/#state.AllSelection) if no valid position
  exists.
  */
  static atStart(doc) {
    return findSelectionIn(doc, doc, 0, 0, 1) || new AllSelection(doc);
  }
  /**
  Find the cursor or leaf node selection closest to the end of the
  given document.
  */
  static atEnd(doc) {
    return findSelectionIn(doc, doc, doc.content.size, doc.childCount, -1) || new AllSelection(doc);
  }
  /**
  Deserialize the JSON representation of a selection. Must be
  implemented for custom classes (as a static class method).
  */
  static fromJSON(doc, json) {
    if (!json || !json.type)
      throw new RangeError("Invalid input for Selection.fromJSON");
    let cls = classesById[json.type];
    if (!cls)
      throw new RangeError(`No selection type ${json.type} defined`);
    return cls.fromJSON(doc, json);
  }
  /**
  To be able to deserialize selections from JSON, custom selection
  classes must register themselves with an ID string, so that they
  can be disambiguated. Try to pick something that's unlikely to
  clash with classes from other modules.
  */
  static jsonID(id, selectionClass) {
    if (id in classesById)
      throw new RangeError("Duplicate use of selection JSON ID " + id);
    classesById[id] = selectionClass;
    selectionClass.prototype.jsonID = id;
    return selectionClass;
  }
  /**
  Get a [bookmark](https://prosemirror.net/docs/ref/#state.SelectionBookmark) for this selection,
  which is a value that can be mapped without having access to a
  current document, and later resolved to a real selection for a
  given document again. (This is used mostly by the history to
  track and restore old selections.) The default implementation of
  this method just converts the selection to a text selection and
  returns the bookmark for that.
  */
  getBookmark() {
    return TextSelection.between(this.$anchor, this.$head).getBookmark();
  }
};
Selection.prototype.visible = true;
var SelectionRange = class {
  /**
  Create a range.
  */
  constructor($from, $to) {
    this.$from = $from;
    this.$to = $to;
  }
};
var warnedAboutTextSelection = false;
function checkTextSelection($pos) {
  if (!warnedAboutTextSelection && !$pos.parent.inlineContent) {
    warnedAboutTextSelection = true;
    console["warn"]("TextSelection endpoint not pointing into a node with inline content (" + $pos.parent.type.name + ")");
  }
}
var TextSelection = class _TextSelection extends Selection {
  /**
  Construct a text selection between the given points.
  */
  constructor($anchor, $head = $anchor) {
    checkTextSelection($anchor);
    checkTextSelection($head);
    super($anchor, $head);
  }
  /**
  Returns a resolved position if this is a cursor selection (an
  empty text selection), and null otherwise.
  */
  get $cursor() {
    return this.$anchor.pos == this.$head.pos ? this.$head : null;
  }
  map(doc, mapping) {
    let $head = doc.resolve(mapping.map(this.head));
    if (!$head.parent.inlineContent)
      return Selection.near($head);
    let $anchor = doc.resolve(mapping.map(this.anchor));
    return new _TextSelection($anchor.parent.inlineContent ? $anchor : $head, $head);
  }
  replace(tr, content = Slice.empty) {
    super.replace(tr, content);
    if (content == Slice.empty) {
      let marks = this.$from.marksAcross(this.$to);
      if (marks)
        tr.ensureMarks(marks);
    }
  }
  eq(other) {
    return other instanceof _TextSelection && other.anchor == this.anchor && other.head == this.head;
  }
  getBookmark() {
    return new TextBookmark(this.anchor, this.head);
  }
  toJSON() {
    return { type: "text", anchor: this.anchor, head: this.head };
  }
  /**
  @internal
  */
  static fromJSON(doc, json) {
    if (typeof json.anchor != "number" || typeof json.head != "number")
      throw new RangeError("Invalid input for TextSelection.fromJSON");
    return new _TextSelection(doc.resolve(json.anchor), doc.resolve(json.head));
  }
  /**
  Create a text selection from non-resolved positions.
  */
  static create(doc, anchor, head = anchor) {
    let $anchor = doc.resolve(anchor);
    return new this($anchor, head == anchor ? $anchor : doc.resolve(head));
  }
  /**
  Return a text selection that spans the given positions or, if
  they aren't text positions, find a text selection near them.
  `bias` determines whether the method searches forward (default)
  or backwards (negative number) first. Will fall back to calling
  [`Selection.near`](https://prosemirror.net/docs/ref/#state.Selection^near) when the document
  doesn't contain a valid text position.
  */
  static between($anchor, $head, bias) {
    let dPos = $anchor.pos - $head.pos;
    if (!bias || dPos)
      bias = dPos >= 0 ? 1 : -1;
    if (!$head.parent.inlineContent) {
      let found2 = Selection.findFrom($head, bias, true) || Selection.findFrom($head, -bias, true);
      if (found2)
        $head = found2.$head;
      else
        return Selection.near($head, bias);
    }
    if (!$anchor.parent.inlineContent) {
      if (dPos == 0) {
        $anchor = $head;
      } else {
        $anchor = (Selection.findFrom($anchor, -bias, true) || Selection.findFrom($anchor, bias, true)).$anchor;
        if ($anchor.pos < $head.pos != dPos < 0)
          $anchor = $head;
      }
    }
    return new _TextSelection($anchor, $head);
  }
};
Selection.jsonID("text", TextSelection);
var TextBookmark = class _TextBookmark {
  constructor(anchor, head) {
    this.anchor = anchor;
    this.head = head;
  }
  map(mapping) {
    return new _TextBookmark(mapping.map(this.anchor), mapping.map(this.head));
  }
  resolve(doc) {
    return TextSelection.between(doc.resolve(this.anchor), doc.resolve(this.head));
  }
};
var NodeSelection = class _NodeSelection extends Selection {
  /**
  Create a node selection. Does not verify the validity of its
  argument.
  */
  constructor($pos) {
    let node = $pos.nodeAfter;
    let $end = $pos.node(0).resolve($pos.pos + node.nodeSize);
    super($pos, $end);
    this.node = node;
  }
  map(doc, mapping) {
    let { deleted, pos } = mapping.mapResult(this.anchor);
    let $pos = doc.resolve(pos);
    if (deleted)
      return Selection.near($pos);
    return new _NodeSelection($pos);
  }
  content() {
    return new Slice(Fragment.from(this.node), 0, 0);
  }
  eq(other) {
    return other instanceof _NodeSelection && other.anchor == this.anchor;
  }
  toJSON() {
    return { type: "node", anchor: this.anchor };
  }
  getBookmark() {
    return new NodeBookmark(this.anchor);
  }
  /**
  @internal
  */
  static fromJSON(doc, json) {
    if (typeof json.anchor != "number")
      throw new RangeError("Invalid input for NodeSelection.fromJSON");
    return new _NodeSelection(doc.resolve(json.anchor));
  }
  /**
  Create a node selection from non-resolved positions.
  */
  static create(doc, from) {
    return new _NodeSelection(doc.resolve(from));
  }
  /**
  Determines whether the given node may be selected as a node
  selection.
  */
  static isSelectable(node) {
    return !node.isText && node.type.spec.selectable !== false;
  }
};
NodeSelection.prototype.visible = false;
Selection.jsonID("node", NodeSelection);
var NodeBookmark = class _NodeBookmark {
  constructor(anchor) {
    this.anchor = anchor;
  }
  map(mapping) {
    let { deleted, pos } = mapping.mapResult(this.anchor);
    return deleted ? new TextBookmark(pos, pos) : new _NodeBookmark(pos);
  }
  resolve(doc) {
    let $pos = doc.resolve(this.anchor), node = $pos.nodeAfter;
    if (node && NodeSelection.isSelectable(node))
      return new NodeSelection($pos);
    return Selection.near($pos);
  }
};
var AllSelection = class _AllSelection extends Selection {
  /**
  Create an all-selection over the given document.
  */
  constructor(doc) {
    super(doc.resolve(0), doc.resolve(doc.content.size));
  }
  replace(tr, content = Slice.empty) {
    if (content == Slice.empty) {
      tr.delete(0, tr.doc.content.size);
      let sel = Selection.atStart(tr.doc);
      if (!sel.eq(tr.selection))
        tr.setSelection(sel);
    } else {
      super.replace(tr, content);
    }
  }
  toJSON() {
    return { type: "all" };
  }
  /**
  @internal
  */
  static fromJSON(doc) {
    return new _AllSelection(doc);
  }
  map(doc) {
    return new _AllSelection(doc);
  }
  eq(other) {
    return other instanceof _AllSelection;
  }
  getBookmark() {
    return AllBookmark;
  }
};
Selection.jsonID("all", AllSelection);
var AllBookmark = {
  map() {
    return this;
  },
  resolve(doc) {
    return new AllSelection(doc);
  }
};
function findSelectionIn(doc, node, pos, index, dir, text = false) {
  if (node.inlineContent)
    return TextSelection.create(doc, pos);
  for (let i = index - (dir > 0 ? 0 : 1); dir > 0 ? i < node.childCount : i >= 0; i += dir) {
    let child = node.child(i);
    if (!child.isAtom) {
      let inner = findSelectionIn(doc, child, pos + dir, dir < 0 ? child.childCount : 0, dir, text);
      if (inner)
        return inner;
    } else if (!text && NodeSelection.isSelectable(child)) {
      return NodeSelection.create(doc, pos - (dir < 0 ? child.nodeSize : 0));
    }
    pos += child.nodeSize * dir;
  }
  return null;
}
function selectionToInsertionEnd(tr, startLen, bias) {
  let last = tr.steps.length - 1;
  if (last < startLen)
    return;
  let step = tr.steps[last];
  if (!(step instanceof ReplaceStep || step instanceof ReplaceAroundStep))
    return;
  let map = tr.mapping.maps[last], end;
  map.forEach((_from, _to, _newFrom, newTo) => {
    if (end == null)
      end = newTo;
  });
  tr.setSelection(Selection.near(tr.doc.resolve(end), bias));
}
function bind(f, self) {
  return !self || !f ? f : f.bind(self);
}
var FieldDesc = class {
  constructor(name, desc, self) {
    this.name = name;
    this.init = bind(desc.init, self);
    this.apply = bind(desc.apply, self);
  }
};
[
  new FieldDesc("doc", {
    init(config) {
      return config.doc || config.schema.topNodeType.createAndFill();
    },
    apply(tr) {
      return tr.doc;
    }
  }),
  new FieldDesc("selection", {
    init(config, instance) {
      return config.selection || Selection.atStart(instance.doc);
    },
    apply(tr) {
      return tr.selection;
    }
  }),
  new FieldDesc("storedMarks", {
    init(config) {
      return config.storedMarks || null;
    },
    apply(tr, _marks, _old, state) {
      return state.selection.$cursor ? tr.storedMarks : null;
    }
  }),
  new FieldDesc("scrollToSelection", {
    init() {
      return 0;
    },
    apply(tr, prev) {
      return tr.scrolledIntoView ? prev + 1 : prev;
    }
  })
];

// src/handleBackspace.ts
var handleBackspace$1 = (editor, type) => {
  var _a;
  const { state, view } = editor;
  const { selection } = state;
  if (!selection.empty) return false;
  const { $from } = selection;
  if ($from.parentOffset !== 0) return false;
  const parentDepth = $from.depth - 1;
  const parent = $from.node(parentDepth);
  const index = $from.index(parentDepth);
  if (index === 0) return false;
  if (parent.type === type) {
    return editor.commands.lift(type.name);
  }
  const previous = parent.child(index - 1);
  if (previous.type !== type || !((_a = previous.lastChild) == null ? void 0 : _a.isTextblock)) {
    return false;
  }
  const blockStart = $from.before();
  const insideBlockquoteEnd = blockStart - 1;
  const targetPos = insideBlockquoteEnd - 1;
  const { tr } = state;
  tr.delete(blockStart, $from.after()).insert(targetPos, $from.parent.content);
  tr.setSelection(TextSelection.create(tr.doc, targetPos));
  view.dispatch(tr.scrollIntoView());
  return true;
};
var inputRegex$3 = /^\s*>\s$/;
var Blockquote = index.Node3.create({
  name: "blockquote",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  group: "block",
  defining: true,
  parseHTML() {
    return [{ tag: "blockquote" }];
  },
  renderHTML({ HTMLAttributes }) {
    return /* @__PURE__ */ h("blockquote", { ...index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), children: /* @__PURE__ */ h("slot", {}) });
  },
  parseMarkdown: (token, helpers) => {
    var _a;
    const parseBlockChildren = (_a = helpers.parseBlockChildren) != null ? _a : helpers.parseChildren;
    return helpers.createNode("blockquote", void 0, parseBlockChildren(token.tokens || []));
  },
  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }
    const prefix = ">";
    const result = [];
    node.content.forEach((child, index) => {
      var _a, _b;
      const childContent = (_b = (_a = h.renderChild) == null ? void 0 : _a.call(h, child, index)) != null ? _b : h.renderChildren([child]);
      const lines = childContent.split("\n");
      const linesWithPrefix = lines.map((line) => {
        if (line.trim() === "") {
          return prefix;
        }
        return `${prefix} ${line}`;
      });
      result.push(linesWithPrefix.join("\n"));
    });
    return result.join(`
${prefix}
`);
  },
  addCommands() {
    return {
      setBlockquote: () => ({ commands }) => {
        return commands.wrapIn(this.name);
      },
      toggleBlockquote: () => ({ commands }) => {
        return commands.toggleWrap(this.name);
      },
      unsetBlockquote: () => ({ commands }) => {
        return commands.lift(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-b": () => this.editor.commands.toggleBlockquote(),
      Backspace: () => handleBackspace$1(this.editor, this.type)
    };
  },
  addInputRules() {
    return [
      index.wrappingInputRule({
        find: inputRegex$3,
        type: this.type
      })
    ];
  }
});

// src/bold.tsx
var starInputRegex$1 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))$/;
var starPasteRegex$1 = /(?:^|\s)(\*\*(?!\s+\*\*)((?:[^*]+))\*\*(?!\s+\*\*))/g;
var underscoreInputRegex$1 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))$/;
var underscorePasteRegex$1 = /(?:^|\s)(__(?!\s+__)((?:[^_]+))__(?!\s+__))/g;
var Bold = index.Mark.create({
  name: "bold",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "strong"
      },
      {
        tag: "b",
        getAttrs: (node) => node.style.fontWeight !== "normal" && null
      },
      {
        style: "font-weight=400",
        clearMark: (mark) => mark.type.name === this.name
      },
      {
        style: "font-weight",
        getAttrs: (value) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return /* @__PURE__ */ h("strong", { ...index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), children: /* @__PURE__ */ h("slot", {}) });
  },
  markdownTokenName: "strong",
  parseMarkdown: (token, helpers) => {
    return helpers.applyMark("bold", helpers.parseInline(token.tokens || []));
  },
  markdownOptions: {
    htmlReopen: {
      open: "<strong>",
      close: "</strong>"
    }
  },
  renderMarkdown: (node, h) => {
    return `**${h.renderChildren(node)}**`;
  },
  addCommands() {
    return {
      setBold: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleBold: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetBold: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-b": () => this.editor.commands.toggleBold(),
      "Mod-B": () => this.editor.commands.toggleBold()
    };
  },
  addInputRules() {
    return [
      index.markInputRule({
        find: starInputRegex$1,
        type: this.type
      }),
      index.markInputRule({
        find: underscoreInputRegex$1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      index.markPasteRule({
        find: starPasteRegex$1,
        type: this.type
      }),
      index.markPasteRule({
        find: underscorePasteRegex$1,
        type: this.type
      })
    ];
  }
});

// src/code.ts
var inputRegexMatch = (text) => {
  const match = /`([^`]+)`(?!`)$/.exec(text);
  if (!match) {
    return null;
  }
  if (match.index > 0 && text[match.index - 1] === "`") {
    return null;
  }
  return {
    index: match.index,
    text: match[0],
    replaceWith: match[1]
  };
};
var pasteRegexMatch = (text) => {
  const regex = /`([^`]+)`(?!`)/g;
  const matches = [];
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > 0 && text[match.index - 1] === "`") {
      continue;
    }
    matches.push({
      index: match.index,
      text: match[0],
      replaceWith: match[1]
    });
  }
  return matches;
};
var Code = index.Mark.create({
  name: "code",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  excludes: "_",
  code: true,
  exitable: true,
  parseHTML() {
    return [{ tag: "code" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["code", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  markdownTokenName: "codespan",
  parseMarkdown: (token, helpers) => {
    return helpers.applyMark("code", [{ type: "text", text: token.text || "" }]);
  },
  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }
    return `\`${h.renderChildren(node.content)}\``;
  },
  addCommands() {
    return {
      setCode: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleCode: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetCode: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-e": () => this.editor.commands.toggleCode()
    };
  },
  addInputRules() {
    return [
      index.markInputRule({
        find: inputRegexMatch,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      index.markPasteRule({
        find: pasteRegexMatch,
        type: this.type
      })
    ];
  }
});

// src/code-block.ts
var DEFAULT_TAB_SIZE = 4;
var backtickInputRegex = /^```([a-z]+)?[\s\n]$/;
var tildeInputRegex = /^~~~([a-z]+)?[\s\n]$/;
var CodeBlock = index.Node3.create({
  name: "codeBlock",
  addOptions() {
    return {
      languageClassPrefix: "language-",
      exitOnTripleEnter: true,
      exitOnArrowDown: true,
      defaultLanguage: null,
      enableTabIndentation: false,
      tabSize: DEFAULT_TAB_SIZE,
      HTMLAttributes: {}
    };
  },
  content: "text*",
  marks: "",
  group: "block",
  code: true,
  defining: true,
  addAttributes() {
    return {
      language: {
        default: this.options.defaultLanguage,
        parseHTML: (element) => {
          var _a;
          const { languageClassPrefix } = this.options;
          if (!languageClassPrefix) {
            return null;
          }
          const classNames = [...((_a = element.firstElementChild) == null ? void 0 : _a.classList) || []];
          const languages = classNames.filter((className) => className.startsWith(languageClassPrefix)).map((className) => className.replace(languageClassPrefix, ""));
          const language = languages[0];
          if (!language) {
            return null;
          }
          return language;
        },
        rendered: false
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "pre",
        preserveWhitespace: "full"
      }
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "pre",
      index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
      [
        "code",
        {
          class: node.attrs.language ? this.options.languageClassPrefix + node.attrs.language : null
        },
        0
      ]
    ];
  },
  markdownTokenName: "code",
  parseMarkdown: (token, helpers) => {
    var _a, _b;
    if (((_a = token.raw) == null ? void 0 : _a.startsWith("```")) === false && ((_b = token.raw) == null ? void 0 : _b.startsWith("~~~")) === false && token.codeBlockStyle !== "indented") {
      return [];
    }
    return helpers.createNode(
      "codeBlock",
      { language: token.lang || null },
      token.text ? [helpers.createTextNode(token.text)] : []
    );
  },
  renderMarkdown: (node, h) => {
    var _a;
    let output = "";
    const language = ((_a = node.attrs) == null ? void 0 : _a.language) || "";
    if (!node.content) {
      output = `\`\`\`${language}

\`\`\``;
    } else {
      const lines = [`\`\`\`${language}`, h.renderChildren(node.content), "```"];
      output = lines.join("\n");
    }
    return output;
  },
  addCommands() {
    return {
      setCodeBlock: (attributes) => ({ commands }) => {
        return commands.setNode(this.name, attributes);
      },
      toggleCodeBlock: (attributes) => ({ commands }) => {
        return commands.toggleNode(this.name, "paragraph", attributes);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-c": () => this.editor.commands.toggleCodeBlock(),
      // remove code block when at start of document or code block is empty
      Backspace: () => {
        const { empty, $anchor } = this.editor.state.selection;
        const isAtStart = $anchor.pos === 1;
        if (!empty || $anchor.parent.type.name !== this.name) {
          return false;
        }
        if (isAtStart || !$anchor.parent.textContent.length) {
          return this.editor.commands.clearNodes();
        }
        return false;
      },
      // handle tab indentation
      Tab: ({ editor }) => {
        var _a;
        if (!this.options.enableTabIndentation) {
          return false;
        }
        const tabSize = (_a = this.options.tabSize) != null ? _a : DEFAULT_TAB_SIZE;
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;
        if ($from.parent.type !== this.type) {
          return false;
        }
        const indent = " ".repeat(tabSize);
        if (empty) {
          return editor.commands.insertContent(indent);
        }
        return editor.commands.command(({ tr }) => {
          const { from, to } = selection;
          const text = state.doc.textBetween(from, to, "\n", "\n");
          const lines = text.split("\n");
          const indentedText = lines.map((line) => indent + line).join("\n");
          tr.replaceWith(from, to, state.schema.text(indentedText));
          return true;
        });
      },
      // handle shift+tab reverse indentation
      "Shift-Tab": ({ editor }) => {
        var _a;
        if (!this.options.enableTabIndentation) {
          return false;
        }
        const tabSize = (_a = this.options.tabSize) != null ? _a : DEFAULT_TAB_SIZE;
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;
        if ($from.parent.type !== this.type) {
          return false;
        }
        if (empty) {
          return editor.commands.command(({ tr }) => {
            var _a2;
            const { pos } = $from;
            const codeBlockStart = $from.start();
            const codeBlockEnd = $from.end();
            const allText = state.doc.textBetween(codeBlockStart, codeBlockEnd, "\n", "\n");
            const lines = allText.split("\n");
            let currentLineIndex = 0;
            let charCount = 0;
            const relativeCursorPos = pos - codeBlockStart;
            for (let i = 0; i < lines.length; i += 1) {
              if (charCount + lines[i].length >= relativeCursorPos) {
                currentLineIndex = i;
                break;
              }
              charCount += lines[i].length + 1;
            }
            const currentLine = lines[currentLineIndex];
            const leadingSpaces = ((_a2 = currentLine.match(/^ */)) == null ? void 0 : _a2[0]) || "";
            const spacesToRemove = Math.min(leadingSpaces.length, tabSize);
            if (spacesToRemove === 0) {
              return true;
            }
            let lineStartPos = codeBlockStart;
            for (let i = 0; i < currentLineIndex; i += 1) {
              lineStartPos += lines[i].length + 1;
            }
            tr.delete(lineStartPos, lineStartPos + spacesToRemove);
            const cursorPosInLine = pos - lineStartPos;
            if (cursorPosInLine <= spacesToRemove) {
              tr.setSelection(index.TextSelection.create(tr.doc, lineStartPos));
            }
            return true;
          });
        }
        return editor.commands.command(({ tr }) => {
          const { from, to } = selection;
          const text = state.doc.textBetween(from, to, "\n", "\n");
          const lines = text.split("\n");
          const reverseIndentText = lines.map((line) => {
            var _a2;
            const leadingSpaces = ((_a2 = line.match(/^ */)) == null ? void 0 : _a2[0]) || "";
            const spacesToRemove = Math.min(leadingSpaces.length, tabSize);
            return line.slice(spacesToRemove);
          }).join("\n");
          tr.replaceWith(from, to, state.schema.text(reverseIndentText));
          return true;
        });
      },
      // exit node on triple enter
      Enter: ({ editor }) => {
        if (!this.options.exitOnTripleEnter) {
          return false;
        }
        const { state } = editor;
        const { selection } = state;
        const { $from, empty } = selection;
        if (!empty || $from.parent.type !== this.type) {
          return false;
        }
        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        const endsWithDoubleNewline = $from.parent.textContent.endsWith("\n\n");
        if (!isAtEnd || !endsWithDoubleNewline) {
          return false;
        }
        return editor.chain().command(({ tr }) => {
          tr.delete($from.pos - 2, $from.pos);
          return true;
        }).exitCode().run();
      },
      // exit node on arrow down
      ArrowDown: ({ editor }) => {
        if (!this.options.exitOnArrowDown) {
          return false;
        }
        const { state } = editor;
        const { selection, doc } = state;
        const { $from, empty } = selection;
        if (!empty || $from.parent.type !== this.type) {
          return false;
        }
        const isAtEnd = $from.parentOffset === $from.parent.nodeSize - 2;
        if (!isAtEnd) {
          return false;
        }
        const after = $from.after();
        if (after === void 0) {
          return false;
        }
        const nodeAfter = doc.nodeAt(after);
        if (nodeAfter) {
          return editor.commands.command(({ tr }) => {
            tr.setSelection(index.Selection.near(doc.resolve(after)));
            return true;
          });
        }
        return editor.commands.exitCode();
      }
    };
  },
  addInputRules() {
    return [
      index.textblockTypeInputRule({
        find: backtickInputRegex,
        type: this.type,
        getAttributes: (match) => ({
          language: match[1]
        })
      }),
      index.textblockTypeInputRule({
        find: tildeInputRegex,
        type: this.type,
        getAttributes: (match) => ({
          language: match[1]
        })
      })
    ];
  },
  addProseMirrorPlugins() {
    return [
      // this plugin creates a code block for pasted content from VS Code
      // we can also detect the copied code language
      new index.Plugin({
        key: new index.PluginKey("codeBlockVSCodeHandler"),
        props: {
          handlePaste: (view, event) => {
            if (!event.clipboardData) {
              return false;
            }
            if (this.editor.isActive(this.type.name)) {
              return false;
            }
            const text = event.clipboardData.getData("text/plain");
            const vscode = event.clipboardData.getData("vscode-editor-data");
            const vscodeData = vscode ? JSON.parse(vscode) : void 0;
            const language = vscodeData == null ? void 0 : vscodeData.mode;
            if (!text || !language) {
              return false;
            }
            const { tr, schema } = view.state;
            const textNode = schema.text(text.replace(/\r\n?/g, "\n"));
            tr.replaceSelectionWith(this.type.create({ language }, textNode));
            if (tr.selection.$from.parent.type !== this.type) {
              tr.setSelection(
                index.TextSelection.near(tr.doc.resolve(Math.max(0, tr.selection.from - 2)))
              );
            }
            tr.setMeta("paste", true);
            view.dispatch(tr);
            return true;
          }
        }
      })
    ];
  }
});

// src/document.ts
var Document = index.Node3.create({
  name: "doc",
  topNode: true,
  content: "block+",
  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }
    return h.renderChildren(node.content, "\n\n");
  }
});

// src/hard-break.ts
var HardBreak = index.Node3.create({
  name: "hardBreak",
  markdownTokenName: "br",
  addOptions() {
    return {
      keepMarks: true,
      HTMLAttributes: {}
    };
  },
  inline: true,
  group: "inline",
  selectable: false,
  linebreakReplacement: true,
  parseHTML() {
    return [{ tag: "br" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["br", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  renderText() {
    return "\n";
  },
  renderMarkdown: () => `  
`,
  parseMarkdown: () => {
    return {
      type: "hardBreak"
    };
  },
  addCommands() {
    return {
      setHardBreak: () => ({ commands, chain, state, editor }) => {
        return commands.first([
          () => commands.exitCode(),
          () => commands.command(() => {
            const { selection, storedMarks } = state;
            if (selection.$from.parent.type.spec.isolating) {
              return false;
            }
            const { keepMarks } = this.options;
            const { splittableMarks } = editor.extensionManager;
            const marks = storedMarks || selection.$to.parentOffset && selection.$from.marks();
            return chain().insertContent({ type: this.name }).command(({ tr, dispatch }) => {
              if (dispatch && marks && keepMarks) {
                const filteredMarks = marks.filter(
                  (mark) => splittableMarks.includes(mark.type.name)
                );
                tr.ensureMarks(filteredMarks);
              }
              return true;
            }).run();
          })
        ]);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Enter": () => this.editor.commands.setHardBreak(),
      "Shift-Enter": () => this.editor.commands.setHardBreak()
    };
  }
});

// src/heading.ts
var Heading = index.Node3.create({
  name: "heading",
  addOptions() {
    return {
      levels: [1, 2, 3, 4, 5, 6],
      HTMLAttributes: {}
    };
  },
  content: "inline*",
  group: "block",
  defining: true,
  addAttributes() {
    return {
      level: {
        default: 1,
        rendered: false
      }
    };
  },
  parseHTML() {
    return this.options.levels.map((level) => ({
      tag: `h${level}`,
      attrs: { level }
    }));
  },
  renderHTML({ node, HTMLAttributes }) {
    const hasLevel = this.options.levels.includes(node.attrs.level);
    const level = hasLevel ? node.attrs.level : this.options.levels[0];
    return [`h${level}`, index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  parseMarkdown: (token, helpers) => {
    return helpers.createNode(
      "heading",
      { level: token.depth || 1 },
      helpers.parseInline(token.tokens || [])
    );
  },
  renderMarkdown: (node, h) => {
    var _a;
    const level = ((_a = node.attrs) == null ? void 0 : _a.level) ? parseInt(node.attrs.level, 10) : 1;
    const headingChars = "#".repeat(level);
    if (!node.content) {
      return "";
    }
    return `${headingChars} ${h.renderChildren(node.content)}`;
  },
  addCommands() {
    return {
      setHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.setNode(this.name, attributes);
      },
      toggleHeading: (attributes) => ({ commands }) => {
        if (!this.options.levels.includes(attributes.level)) {
          return false;
        }
        return commands.toggleNode(this.name, "paragraph", attributes);
      }
    };
  },
  addKeyboardShortcuts() {
    return this.options.levels.reduce(
      (items, level) => ({
        ...items,
        [`Mod-Alt-${level}`]: () => this.editor.commands.toggleHeading({ level })
      }),
      {}
    );
  },
  addInputRules() {
    return this.options.levels.map((level) => {
      return index.textblockTypeInputRule({
        find: new RegExp(`^(#{${Math.min(...this.options.levels)},${level}})\\s$`),
        type: this.type,
        getAttributes: {
          level
        }
      });
    });
  }
});

// src/horizontal-rule.ts
var HorizontalRule = index.Node3.create({
  name: "horizontalRule",
  addOptions() {
    return {
      HTMLAttributes: {},
      nextNodeType: "paragraph"
    };
  },
  group: "block",
  parseHTML() {
    return [{ tag: "hr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["hr", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  markdownTokenName: "hr",
  parseMarkdown: (token, helpers) => {
    return helpers.createNode("horizontalRule");
  },
  renderMarkdown: () => {
    return "---";
  },
  addCommands() {
    return {
      setHorizontalRule: () => ({ chain, state }) => {
        if (!index.canInsertNode(state, state.schema.nodes[this.name])) {
          return false;
        }
        const { selection } = state;
        const { $to: $originTo } = selection;
        const currentChain = chain();
        if (index.isNodeSelection(selection)) {
          currentChain.insertContentAt($originTo.pos, {
            type: this.name
          });
        } else {
          currentChain.insertContent({ type: this.name });
        }
        return currentChain.command(({ state: chainState, tr, dispatch }) => {
          if (dispatch) {
            const { $to } = tr.selection;
            const posAfter = $to.end();
            if ($to.nodeAfter) {
              if ($to.nodeAfter.isTextblock) {
                tr.setSelection(index.TextSelection.create(tr.doc, $to.pos + 1));
              } else if ($to.nodeAfter.isBlock) {
                tr.setSelection(index.NodeSelection.create(tr.doc, $to.pos));
              } else {
                tr.setSelection(index.TextSelection.create(tr.doc, $to.pos));
              }
            } else {
              const nodeType = chainState.schema.nodes[this.options.nextNodeType] || $to.parent.type.contentMatch.defaultType;
              const node = nodeType == null ? void 0 : nodeType.create();
              if (node) {
                tr.insert(posAfter, node);
                tr.setSelection(index.TextSelection.create(tr.doc, posAfter + 1));
              }
            }
            tr.scrollIntoView();
          }
          return true;
        }).run();
      }
    };
  },
  addInputRules() {
    return [
      index.nodeInputRule({
        find: /^(?:---|—-|___\s|\*\*\*\s)$/,
        type: this.type
      })
    ];
  }
});

// src/italic.ts
var starInputRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))$/;
var starPasteRegex = /(?:^|\s)(\*(?!\s+\*)((?:[^*]+))\*(?!\s+\*))/g;
var underscoreInputRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))$/;
var underscorePasteRegex = /(?:^|\s)(_(?!\s+_)((?:[^_]+))_(?!\s+_))/g;
var Italic = index.Mark.create({
  name: "italic",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "em"
      },
      {
        tag: "i",
        getAttrs: (node) => node.style.fontStyle !== "normal" && null
      },
      {
        style: "font-style=normal",
        clearMark: (mark) => mark.type.name === this.name
      },
      {
        style: "font-style=italic"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["em", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setItalic: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleItalic: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetItalic: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  markdownTokenName: "em",
  parseMarkdown: (token, helpers) => {
    return helpers.applyMark("italic", helpers.parseInline(token.tokens || []));
  },
  markdownOptions: {
    htmlReopen: {
      open: "<em>",
      close: "</em>"
    }
  },
  renderMarkdown: (node, h) => {
    return `*${h.renderChildren(node)}*`;
  },
  addKeyboardShortcuts() {
    return {
      "Mod-i": () => this.editor.commands.toggleItalic(),
      "Mod-I": () => this.editor.commands.toggleItalic()
    };
  },
  addInputRules() {
    return [
      index.markInputRule({
        find: starInputRegex,
        type: this.type
      }),
      index.markInputRule({
        find: underscoreInputRegex,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      index.markPasteRule({
        find: starPasteRegex,
        type: this.type
      }),
      index.markPasteRule({
        find: underscorePasteRegex,
        type: this.type
      })
    ];
  }
});

// THIS FILE IS AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY
// See update-tlds.js for encoding/decoding format
// https://data.iana.org/TLD/tlds-alpha-by-domain.txt
const encodedTlds = 'aaa1rp3bb0ott3vie4c1le2ogado5udhabi7c0ademy5centure6ountant0s9o1tor4d0s1ult4e0g1ro2tna4f0l1rica5g0akhan5ency5i0g1rbus3force5tel5kdn3l0ibaba4pay4lfinanz6state5y2sace3tom5m0azon4ericanexpress7family11x2fam3ica3sterdam8nalytics7droid5quan4z2o0l2partments8p0le4q0uarelle8r0ab1mco4chi3my2pa2t0e3s0da2ia2sociates9t0hleta5torney7u0ction5di0ble3o3spost5thor3o0s4w0s2x0a2z0ure5ba0by2idu3namex4d1k2r0celona5laycard4s5efoot5gains6seball5ketball8uhaus5yern5b0c1t1va3cg1n2d1e0ats2uty4er2rlin4st0buy5t2f1g1h0arti5i0ble3d1ke2ng0o3o1z2j1lack0friday9ockbuster8g1omberg7ue3m0s1w2n0pparibas9o0ats3ehringer8fa2m1nd2o0k0ing5sch2tik2on4t1utique6x2r0adesco6idgestone9oadway5ker3ther5ussels7s1t1uild0ers6siness6y1zz3v1w1y1z0h3ca0b1fe2l0l1vinklein9m0era3p2non3petown5ital0one8r0avan4ds2e0er0s4s2sa1e1h1ino4t0ering5holic7ba1n1re3c1d1enter4o1rn3f0a1d2g1h0anel2nel4rity4se2t2eap3intai5ristmas6ome4urch5i0priani6rcle4sco3tadel4i0c2y3k1l0aims4eaning6ick2nic1que6othing5ud3ub0med6m1n1o0ach3des3ffee4llege4ogne5m0mbank4unity6pany2re3uter5sec4ndos3struction8ulting7tact3ractors9oking4l1p2rsica5untry4pon0s4rses6pa2r0edit0card4union9icket5own3s1uise0s6u0isinella9v1w1x1y0mru3ou3z2dad1nce3ta1e1ing3sun4y2clk3ds2e0al0er2s3gree4livery5l1oitte5ta3mocrat6ntal2ist5si0gn4v2hl2iamonds6et2gital5rect0ory7scount3ver5h2y2j1k1m1np2o0cs1tor4g1mains5t1wnload7rive4tv2ubai3pont4rban5vag2r2z2earth3t2c0o2deka3u0cation8e1g1mail3erck5nergy4gineer0ing9terprises10pson4quipment8r0icsson6ni3s0q1tate5t1u0rovision8s2vents5xchange6pert3osed4ress5traspace10fage2il1rwinds6th3mily4n0s2rm0ers5shion4t3edex3edback6rrari3ero6i0delity5o2lm2nal1nce1ial7re0stone6mdale6sh0ing5t0ness6j1k1lickr3ghts4r2orist4wers5y2m1o0o0d1tball6rd1ex2sale4um3undation8x2r0ee1senius7l1ogans4ntier7tr2ujitsu5n0d2rniture7tbol5yi3ga0l0lery3o1up4me0s3p1rden4y2b0iz3d0n2e0a1nt0ing5orge5f1g0ee3h1i0ft0s3ves2ing5l0ass3e1obal2o4m0ail3bh2o1x2n1odaddy5ld0point6f2odyear5g0le4p1t1v2p1q1r0ainger5phics5tis4een3ipe3ocery4up4s1t1u0cci3ge2ide2tars5ru3w1y2hair2mburg5ngout5us3bo2dfc0bank7ealth0care8lp1sinki6re1mes5iphop4samitsu7tachi5v2k0t2m1n1ockey4ldings5iday5medepot5goods5s0ense7nda3rse3spital5t0ing5t0els3mail5use3w2r1sbc3t1u0ghes5yatt3undai7ibm2cbc2e1u2d1e0ee3fm2kano4l1m0amat4db2mo0bilien9n0c1dustries8finiti5o2g1k1stitute6urance4e4t0ernational10uit4vestments10o1piranga7q1r0ish4s0maili5t0anbul7t0au2v3jaguar4va3cb2e0ep2tzt3welry6io2ll2m0p2nj2o0bs1urg4t1y2p0morgan6rs3uegos4niper7kaufen5ddi3e0rryhotels6properties14fh2g1h1i0a1ds2m1ndle4tchen5wi3m1n1oeln3matsu5sher5p0mg2n2r0d1ed3uokgroup8w1y0oto4z2la0caixa5mborghini8er3nd0rover6xess5salle5t0ino3robe5w0yer5b1c1ds2ease3clerc5frak4gal2o2xus4gbt3i0dl2fe0insurance9style7ghting6ke2lly3mited4o2ncoln4k2ve1ing5k1lc1p2oan0s3cker3us3l1ndon4tte1o3ve3pl0financial11r1s1t0d0a3u0ndbeck6xe1ury5v1y2ma0drid4if1son4keup4n0agement7go3p1rket0ing3s4riott5shalls7ttel5ba2c0kinsey7d1e0d0ia3et2lbourne7me1orial6n0u2rck0msd7g1h1iami3crosoft7l1ni1t2t0subishi9k1l0b1s2m0a2n1o0bi0le4da2e1i1m1nash3ey2ster5rmon3tgage6scow4to0rcycles9v0ie4p1q1r1s0d2t0n1r2u0seum3ic4v1w1x1y1z2na0b1goya4me2vy3ba2c1e0c1t0bank4flix4work5ustar5w0s2xt0direct7us4f0l2g0o2hk2i0co2ke1on3nja3ssan1y5l1o0kia3rton4w0ruz3tv4p1r0a1w2tt2u1yc2z2obi1server7ffice5kinawa6layan0group9lo3m0ega4ne1g1l0ine5oo2pen3racle3nge4g0anic5igins6saka4tsuka4t2vh3pa0ge2nasonic7ris2s1tners4s1y3y2ccw3e0t2f0izer5g1h0armacy6d1ilips5one2to0graphy6s4ysio5ics1tet2ures6d1n0g1k2oneer5zza4k1l0ace2y0station9umbing5s3m1n0c2ohl2ker3litie5rn2st3r0axi3ess3ime3o0d0uctions8f1gressive8mo2perties3y5tection8u0dential9s1t1ub2w0c2y2qa1pon3uebec3st5racing4dio4e0ad1lestate6tor2y4cipes5d0umbrella9hab3ise0n3t2liance6n0t0als5pair3ort3ublican8st0aurant8view0s5xroth6ich0ardli6oh3l1o1p2o0cks3deo3gers4om3s0vp3u0gby3hr2n2w0e2yukyu6sa0arland6fe0ty4kura4le1on3msclub4ung5ndvik0coromant12ofi4p1rl2s1ve2xo3b0i1s2c0b1haeffler7midt4olarships8ol3ule3warz5ience5ot3d1e0arch3t2cure1ity6ek2lect4ner3rvices6ven3w1x0y3fr2g1h0angrila6rp3ell3ia1ksha5oes2p0ping5uji3w3i0lk2na1gles5te3j1k0i0n2y0pe4l0ing4m0art3ile4n0cf3o0ccer3ial4ftbank4ware6hu2lar2utions7ng1y2y2pa0ce3ort2t3r0l2s1t0ada2ples4r1tebank4farm7c0group6ockholm6rage3e3ream4udio2y3yle4u0cks3pplies3y2ort5rf1gery5zuki5v1watch4iss4x1y0dney4stems6z2tab1ipei4lk2obao4rget4tamotors6r2too4x0i3c0i2d0k2eam2ch0nology8l1masek5nnis4va3f1g1h0d1eater2re6iaa2ckets5enda4ps2res2ol4j0maxx4x2k0maxx5l1m0all4n1o0day3kyo3ols3p1ray3shiba5tal3urs3wn2yota3s3r0ade1ing4ining5vel0ers0insurance16ust3v2t1ube2i1nes3shu4v0s2w1z2ua1bank3s2g1k1nicom3versity8o2ol2ps2s1y1z2va0cations7na1guard7c1e0gas3ntures6risign5mögensberater2ung14sicherung10t2g1i0ajes4deo3g1king4llas4n1p1rgin4sa1ion4va1o3laanderen9n1odka3lvo3te1ing3o2yage5u2wales2mart4ter4ng0gou5tch0es6eather0channel12bcam3er2site5d0ding5ibo2r3f1hoswho6ien2ki2lliamhill9n0dows4e1ners6me2oodside6rk0s2ld3w2s1tc1f3xbox3erox4ihuan4n2xx2yz3yachts4hoo3maxun5ndex5e1odobashi7ga2kohama6u0tube6t1un3za0ppos4ra3ero3ip2m1one3uerich6w2';
// Internationalized domain names containing non-ASCII
const encodedUtlds = 'ελ1υ2бг1ел3дети4ею2католик6ом3мкд2он1сква6онлайн5рг3рус2ф2сайт3рб3укр3қаз3հայ3ישראל5קום3ابوظبي5رامكو5لاردن4بحرين5جزائر5سعودية6عليان5مغرب5مارات5یران5بارت2زار4يتك3ھارت5تونس4سودان3رية5شبكة4عراق2ب2مان4فلسطين6قطر3كاثوليك6وم3مصر2ليسيا5وريتانيا7قع4همراه5پاکستان7ڀارت4कॉम3नेट3भारत0म्3ोत5संगठन5বাংলা5ভারত2ৰত4ਭਾਰਤ4ભારત4ଭାରତ4இந்தியா6லங்கை6சிங்கப்பூர்11భారత్5ಭಾರತ4ഭാരതം5ලංකා4คอม3ไทย3ລາວ3გე2みんな3アマゾン4クラウド4グーグル4コム2ストア3セール3ファッション6ポイント4世界2中信1国1國1文网3亚马逊3企业2佛山2信息2健康2八卦2公司1益2台湾1灣2商城1店1标2嘉里0大酒店5在线2大拿2天主教3娱乐2家電2广东2微博2慈善2我爱你3手机2招聘2政务1府2新加坡2闻2时尚2書籍2机构2淡马锡3游戏2澳門2点看2移动2组织机构4网址1店1站1络2联通2谷歌2购物2通販2集团2電訊盈科4飞利浦3食品2餐厅2香格里拉3港2닷넷1컴2삼성2한국2';

/**
 * Finite State Machine generation utilities
 */

/**
 * @template T
 * @typedef {{ [group: string]: T[] }} Collections
 */

/**
 * @typedef {{ [group: string]: true }} Flags
 */

// Keys in scanner Collections instances
const numeric = 'numeric';
const ascii = 'ascii';
const alpha = 'alpha';
const asciinumeric = 'asciinumeric';
const alphanumeric = 'alphanumeric';
const domain = 'domain';
const emoji = 'emoji';
const scheme = 'scheme';
const slashscheme = 'slashscheme';
const whitespace = 'whitespace';

/**
 * @template T
 * @param {string} name
 * @param {Collections<T>} groups to register in
 * @returns {T[]} Current list of tokens in the given collection
 */
function registerGroup(name, groups) {
  if (!(name in groups)) {
    groups[name] = [];
  }
  return groups[name];
}

/**
 * @template T
 * @param {T} t token to add
 * @param {Collections<T>} groups
 * @param {Flags} flags
 */
function addToGroups(t, flags, groups) {
  if (flags[numeric]) {
    flags[asciinumeric] = true;
    flags[alphanumeric] = true;
  }
  if (flags[ascii]) {
    flags[asciinumeric] = true;
    flags[alpha] = true;
  }
  if (flags[asciinumeric]) {
    flags[alphanumeric] = true;
  }
  if (flags[alpha]) {
    flags[alphanumeric] = true;
  }
  if (flags[alphanumeric]) {
    flags[domain] = true;
  }
  if (flags[emoji]) {
    flags[domain] = true;
  }
  for (const k in flags) {
    const group = registerGroup(k, groups);
    if (group.indexOf(t) < 0) {
      group.push(t);
    }
  }
}

/**
 * @template T
 * @param {T} t token to check
 * @param {Collections<T>} groups
 * @returns {Flags} group flags that contain this token
 */
function flagsForToken(t, groups) {
  const result = {};
  for (const c in groups) {
    if (groups[c].indexOf(t) >= 0) {
      result[c] = true;
    }
  }
  return result;
}

/**
 * @template T
 * @typedef {null | T } Transition
 */

/**
 * Define a basic state machine state. j is the list of character transitions,
 * jr is the list of regex-match transitions, jd is the default state to
 * transition to t is the accepting token type, if any. If this is the terminal
 * state, then it does not emit a token.
 *
 * The template type T represents the type of the token this state accepts. This
 * should be a string (such as of the token exports in `text.js`) or a
 * MultiToken subclass (from `multi.js`)
 *
 * @template T
 * @param {T} [token] Token that this state emits
 */
function State(token = null) {
  // this.n = null; // DEBUG: State name
  /** @type {{ [input: string]: State<T> }} j */
  this.j = {}; // IMPLEMENTATION 1
  // this.j = []; // IMPLEMENTATION 2
  /** @type {[RegExp, State<T>][]} jr */
  this.jr = [];
  /** @type {?State<T>} jd */
  this.jd = null;
  /** @type {?T} t */
  this.t = token;
}

/**
 * Scanner token groups
 * @type Collections<string>
 */
State.groups = {};
State.prototype = {
  accepts() {
    return !!this.t;
  },
  /**
   * Follow an existing transition from the given input to the next state.
   * Does not mutate.
   * @param {string} input character or token type to transition on
   * @returns {?State<T>} the next state, if any
   */
  go(input) {
    const state = this;
    const nextState = state.j[input];
    if (nextState) {
      return nextState;
    }
    for (let i = 0; i < state.jr.length; i++) {
      const regex = state.jr[i][0];
      const nextState = state.jr[i][1]; // note: might be empty to prevent default jump
      if (nextState && regex.test(input)) {
        return nextState;
      }
    }
    // Nowhere left to jump! Return default, if any
    return state.jd;
  },
  /**
   * Whether the state has a transition for the given input. Set the second
   * argument to true to only look for an exact match (and not a default or
   * regular-expression-based transition)
   * @param {string} input
   * @param {boolean} exactOnly
   */
  has(input, exactOnly = false) {
    return exactOnly ? input in this.j : !!this.go(input);
  },
  /**
   * Short for "transition all"; create a transition from the array of items
   * in the given list to the same final resulting state.
   * @param {string | string[]} inputs Group of inputs to transition on
   * @param {Transition<T> | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   */
  ta(inputs, next, flags, groups) {
    for (let i = 0; i < inputs.length; i++) {
      this.tt(inputs[i], next, flags, groups);
    }
  },
  /**
   * Short for "take regexp transition"; defines a transition for this state
   * when it encounters a token which matches the given regular expression
   * @param {RegExp} regexp Regular expression transition (populate first)
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  tr(regexp, next, flags, groups) {
    groups = groups || State.groups;
    let nextState;
    if (next && next.j) {
      nextState = next;
    } else {
      // Token with maybe token groups
      nextState = new State(next);
      if (flags && groups) {
        addToGroups(next, flags, groups);
      }
    }
    this.jr.push([regexp, nextState]);
    return nextState;
  },
  /**
   * Short for "take transitions", will take as many sequential transitions as
   * the length of the given input and returns the
   * resulting final state.
   * @param {string | string[]} input
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of token groups
   * @returns {State<T>} taken after the given input
   */
  ts(input, next, flags, groups) {
    let state = this;
    const len = input.length;
    if (!len) {
      return state;
    }
    for (let i = 0; i < len - 1; i++) {
      state = state.tt(input[i]);
    }
    return state.tt(input[len - 1], next, flags, groups);
  },
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * Specify a token group flags to define groups that this token belongs to.
   * The token will be added to corresponding entires in the given groups
   * object.
   *
   * @param {string} input character, token type to transition on
   * @param {T | State<T>} [next] Transition options
   * @param {Flags} [flags] Collections flags to add token to
   * @param {Collections<T>} [groups] Master list of groups
   * @returns {State<T>} taken after the given input
   */
  tt(input, next, flags, groups) {
    groups = groups || State.groups;
    const state = this;

    // Check if existing state given, just a basic transition
    if (next && next.j) {
      state.j[input] = next;
      return next;
    }
    const t = next;

    // Take the transition with the usual default mechanisms and use that as
    // a template for creating the next state
    let nextState,
      templateState = state.go(input);
    if (templateState) {
      nextState = new State();
      Object.assign(nextState.j, templateState.j);
      nextState.jr.push.apply(nextState.jr, templateState.jr);
      nextState.jd = templateState.jd;
      nextState.t = templateState.t;
    } else {
      nextState = new State();
    }
    if (t) {
      // Ensure newly token is in the same groups as the old token
      if (groups) {
        if (nextState.t && typeof nextState.t === 'string') {
          const allFlags = Object.assign(flagsForToken(nextState.t, groups), flags);
          addToGroups(t, allFlags, groups);
        } else if (flags) {
          addToGroups(t, flags, groups);
        }
      }
      nextState.t = t; // overwrite anything that was previously there
    }
    state.j[input] = nextState;
    return nextState;
  }
};

// Helper functions to improve minification (not exported outside linkifyjs module)

/**
 * @template T
 * @param {State<T>} state
 * @param {string | string[]} input
 * @param {Flags} [flags]
 * @param {Collections<T>} [groups]
 */
const ta = (state, input, next, flags, groups) => state.ta(input, next, flags, groups);

/**
 * @template T
 * @param {State<T>} state
 * @param {RegExp} regexp
 * @param {T | State<T>} [next]
 * @param {Flags} [flags]
 * @param {Collections<T>} [groups]
 */
const tr = (state, regexp, next, flags, groups) => state.tr(regexp, next, flags, groups);

/**
 * @template T
 * @param {State<T>} state
 * @param {string | string[]} input
 * @param {T | State<T>} [next]
 * @param {Flags} [flags]
 * @param {Collections<T>} [groups]
 */
const ts = (state, input, next, flags, groups) => state.ts(input, next, flags, groups);

/**
 * @template T
 * @param {State<T>} state
 * @param {string} input
 * @param {T | State<T>} [next]
 * @param {Collections<T>} [groups]
 * @param {Flags} [flags]
 */
const tt = (state, input, next, flags, groups) => state.tt(input, next, flags, groups);

/******************************************************************************
Text Tokens
Identifiers for token outputs from the regexp scanner
******************************************************************************/

// A valid web domain token
const WORD = 'WORD'; // only contains a-z
const UWORD = 'UWORD'; // contains letters other than a-z, used for IDN
const ASCIINUMERICAL = 'ASCIINUMERICAL'; // contains a-z, 0-9
const ALPHANUMERICAL = 'ALPHANUMERICAL'; // contains numbers and letters other than a-z, used for IDN

// Special case of word
const LOCALHOST = 'LOCALHOST';

// Valid top-level domain, special case of WORD (see tlds.js)
const TLD = 'TLD';

// Valid IDN TLD, special case of UWORD (see tlds.js)
const UTLD = 'UTLD';

// The scheme portion of a web URI protocol. Supported types include: `mailto`,
// `file`, and user-defined custom protocols. Limited to schemes that contain
// only letters
const SCHEME = 'SCHEME';

// Similar to SCHEME, except makes distinction for schemes that must always be
// followed by `://`, not just `:`. Supported types include `http`, `https`,
// `ftp`, `ftps`
const SLASH_SCHEME = 'SLASH_SCHEME';

// Any sequence of digits 0-9
const NUM = 'NUM';

// Any number of consecutive whitespace characters that are not newline
const WS = 'WS';

// New line (unix style)
const NL = 'NL'; // \n

// Opening/closing bracket classes
// TODO: Rename OPEN -> LEFT and CLOSE -> RIGHT in v5 to fit with Unicode names
// Also rename angle brackes to LESSTHAN and GREATER THAN
const OPENBRACE = 'OPENBRACE'; // {
const CLOSEBRACE = 'CLOSEBRACE'; // }
const OPENBRACKET = 'OPENBRACKET'; // [
const CLOSEBRACKET = 'CLOSEBRACKET'; // ]
const OPENPAREN = 'OPENPAREN'; // (
const CLOSEPAREN = 'CLOSEPAREN'; // )
const OPENANGLEBRACKET = 'OPENANGLEBRACKET'; // <
const CLOSEANGLEBRACKET = 'CLOSEANGLEBRACKET'; // >
const FULLWIDTHLEFTPAREN = 'FULLWIDTHLEFTPAREN'; // （
const FULLWIDTHRIGHTPAREN = 'FULLWIDTHRIGHTPAREN'; // ）
const LEFTCORNERBRACKET = 'LEFTCORNERBRACKET'; // 「
const RIGHTCORNERBRACKET = 'RIGHTCORNERBRACKET'; // 」
const LEFTWHITECORNERBRACKET = 'LEFTWHITECORNERBRACKET'; // 『
const RIGHTWHITECORNERBRACKET = 'RIGHTWHITECORNERBRACKET'; // 』
const FULLWIDTHLESSTHAN = 'FULLWIDTHLESSTHAN'; // ＜
const FULLWIDTHGREATERTHAN = 'FULLWIDTHGREATERTHAN'; // ＞

// Various symbols
const AMPERSAND = 'AMPERSAND'; // &
const APOSTROPHE = 'APOSTROPHE'; // '
const ASTERISK = 'ASTERISK'; // *
const AT = 'AT'; // @
const BACKSLASH = 'BACKSLASH'; // \
const BACKTICK = 'BACKTICK'; // `
const CARET = 'CARET'; // ^
const COLON = 'COLON'; // :
const COMMA = 'COMMA'; // ,
const DOLLAR = 'DOLLAR'; // $
const DOT = 'DOT'; // .
const EQUALS = 'EQUALS'; // =
const EXCLAMATION = 'EXCLAMATION'; // !
const HYPHEN = 'HYPHEN'; // -
const PERCENT = 'PERCENT'; // %
const PIPE = 'PIPE'; // |
const PLUS = 'PLUS'; // +
const POUND = 'POUND'; // #
const QUERY = 'QUERY'; // ?
const QUOTE = 'QUOTE'; // "
const FULLWIDTHMIDDLEDOT = 'FULLWIDTHMIDDLEDOT'; // ・

const SEMI = 'SEMI'; // ;
const SLASH = 'SLASH'; // /
const TILDE = 'TILDE'; // ~
const UNDERSCORE = 'UNDERSCORE'; // _

// Emoji symbol
const EMOJI$1 = 'EMOJI';

// Default token - anything that is not one of the above
const SYM = 'SYM';

var tk = /*#__PURE__*/Object.freeze({
	__proto__: null,
	ALPHANUMERICAL: ALPHANUMERICAL,
	AMPERSAND: AMPERSAND,
	APOSTROPHE: APOSTROPHE,
	ASCIINUMERICAL: ASCIINUMERICAL,
	ASTERISK: ASTERISK,
	AT: AT,
	BACKSLASH: BACKSLASH,
	BACKTICK: BACKTICK,
	CARET: CARET,
	CLOSEANGLEBRACKET: CLOSEANGLEBRACKET,
	CLOSEBRACE: CLOSEBRACE,
	CLOSEBRACKET: CLOSEBRACKET,
	CLOSEPAREN: CLOSEPAREN,
	COLON: COLON,
	COMMA: COMMA,
	DOLLAR: DOLLAR,
	DOT: DOT,
	EMOJI: EMOJI$1,
	EQUALS: EQUALS,
	EXCLAMATION: EXCLAMATION,
	FULLWIDTHGREATERTHAN: FULLWIDTHGREATERTHAN,
	FULLWIDTHLEFTPAREN: FULLWIDTHLEFTPAREN,
	FULLWIDTHLESSTHAN: FULLWIDTHLESSTHAN,
	FULLWIDTHMIDDLEDOT: FULLWIDTHMIDDLEDOT,
	FULLWIDTHRIGHTPAREN: FULLWIDTHRIGHTPAREN,
	HYPHEN: HYPHEN,
	LEFTCORNERBRACKET: LEFTCORNERBRACKET,
	LEFTWHITECORNERBRACKET: LEFTWHITECORNERBRACKET,
	LOCALHOST: LOCALHOST,
	NL: NL,
	NUM: NUM,
	OPENANGLEBRACKET: OPENANGLEBRACKET,
	OPENBRACE: OPENBRACE,
	OPENBRACKET: OPENBRACKET,
	OPENPAREN: OPENPAREN,
	PERCENT: PERCENT,
	PIPE: PIPE,
	PLUS: PLUS,
	POUND: POUND,
	QUERY: QUERY,
	QUOTE: QUOTE,
	RIGHTCORNERBRACKET: RIGHTCORNERBRACKET,
	RIGHTWHITECORNERBRACKET: RIGHTWHITECORNERBRACKET,
	SCHEME: SCHEME,
	SEMI: SEMI,
	SLASH: SLASH,
	SLASH_SCHEME: SLASH_SCHEME,
	SYM: SYM,
	TILDE: TILDE,
	TLD: TLD,
	UNDERSCORE: UNDERSCORE,
	UTLD: UTLD,
	UWORD: UWORD,
	WORD: WORD,
	WS: WS
});

// Note that these two Unicode ones expand into a really big one with Babel
const ASCII_LETTER = /[a-z]/;
const LETTER = /\p{L}/u; // Any Unicode character with letter data type
const EMOJI = /\p{Emoji}/u; // Any Unicode emoji character
const DIGIT = /\d/;
const SPACE = /\s/;

/**
	The scanner provides an interface that takes a string of text as input, and
	outputs an array of tokens instances that can be used for easy URL parsing.
*/

const CR = '\r'; // carriage-return character
const LF = '\n'; // line-feed character
const EMOJI_VARIATION = '\ufe0f'; // Variation selector, follows heart and others
const EMOJI_JOINER = '\u200d'; // zero-width joiner
const OBJECT_REPLACEMENT = '\ufffc'; // whitespace placeholder that sometimes appears in rich text editors

let tlds = null,
  utlds = null; // don't change so only have to be computed once

/**
 * Scanner output token:
 * - `t` is the token name (e.g., 'NUM', 'EMOJI', 'TLD')
 * - `v` is the value of the token (e.g., '123', '❤️', 'com')
 * - `s` is the start index of the token in the original string
 * - `e` is the end index of the token in the original string
 * @typedef {{t: string, v: string, s: number, e: number}} Token
 */

/**
 * @template T
 * @typedef {{ [collection: string]: T[] }} Collections
 */

/**
 * Initialize the scanner character-based state machine for the given start
 * state
 * @param {[string, boolean][]} customSchemes List of custom schemes, where each
 * item is a length-2 tuple with the first element set to the string scheme, and
 * the second element set to `true` if the `://` after the scheme is optional
 */
function init$2(customSchemes = []) {
  // Frequently used states (name argument removed during minification)
  /** @type Collections<string> */
  const groups = {}; // of tokens
  State.groups = groups;
  /** @type State<string> */
  const Start = new State();
  if (tlds == null) {
    tlds = decodeTlds(encodedTlds);
  }
  if (utlds == null) {
    utlds = decodeTlds(encodedUtlds);
  }

  // States for special URL symbols that accept immediately after start
  tt(Start, "'", APOSTROPHE);
  tt(Start, '{', OPENBRACE);
  tt(Start, '}', CLOSEBRACE);
  tt(Start, '[', OPENBRACKET);
  tt(Start, ']', CLOSEBRACKET);
  tt(Start, '(', OPENPAREN);
  tt(Start, ')', CLOSEPAREN);
  tt(Start, '<', OPENANGLEBRACKET);
  tt(Start, '>', CLOSEANGLEBRACKET);
  tt(Start, '（', FULLWIDTHLEFTPAREN);
  tt(Start, '）', FULLWIDTHRIGHTPAREN);
  tt(Start, '「', LEFTCORNERBRACKET);
  tt(Start, '」', RIGHTCORNERBRACKET);
  tt(Start, '『', LEFTWHITECORNERBRACKET);
  tt(Start, '』', RIGHTWHITECORNERBRACKET);
  tt(Start, '＜', FULLWIDTHLESSTHAN);
  tt(Start, '＞', FULLWIDTHGREATERTHAN);
  tt(Start, '&', AMPERSAND);
  tt(Start, '*', ASTERISK);
  tt(Start, '@', AT);
  tt(Start, '`', BACKTICK);
  tt(Start, '^', CARET);
  tt(Start, ':', COLON);
  tt(Start, ',', COMMA);
  tt(Start, '$', DOLLAR);
  tt(Start, '.', DOT);
  tt(Start, '=', EQUALS);
  tt(Start, '!', EXCLAMATION);
  tt(Start, '-', HYPHEN);
  tt(Start, '%', PERCENT);
  tt(Start, '|', PIPE);
  tt(Start, '+', PLUS);
  tt(Start, '#', POUND);
  tt(Start, '?', QUERY);
  tt(Start, '"', QUOTE);
  tt(Start, '/', SLASH);
  tt(Start, ';', SEMI);
  tt(Start, '~', TILDE);
  tt(Start, '_', UNDERSCORE);
  tt(Start, '\\', BACKSLASH);
  tt(Start, '・', FULLWIDTHMIDDLEDOT);
  const Num = tr(Start, DIGIT, NUM, {
    [numeric]: true
  });
  tr(Num, DIGIT, Num);
  const Asciinumeric = tr(Num, ASCII_LETTER, ASCIINUMERICAL, {
    [asciinumeric]: true
  });
  const Alphanumeric = tr(Num, LETTER, ALPHANUMERICAL, {
    [alphanumeric]: true
  });

  // State which emits a word token
  const Word = tr(Start, ASCII_LETTER, WORD, {
    [ascii]: true
  });
  tr(Word, DIGIT, Asciinumeric);
  tr(Word, ASCII_LETTER, Word);
  tr(Asciinumeric, DIGIT, Asciinumeric);
  tr(Asciinumeric, ASCII_LETTER, Asciinumeric);

  // Same as previous, but specific to non-fsm.ascii alphabet words
  const UWord = tr(Start, LETTER, UWORD, {
    [alpha]: true
  });
  tr(UWord, ASCII_LETTER); // Non-accepting
  tr(UWord, DIGIT, Alphanumeric);
  tr(UWord, LETTER, UWord);
  tr(Alphanumeric, DIGIT, Alphanumeric);
  tr(Alphanumeric, ASCII_LETTER); // Non-accepting
  tr(Alphanumeric, LETTER, Alphanumeric); // Non-accepting

  // Whitespace jumps
  // Tokens of only non-newline whitespace are arbitrarily long
  // If any whitespace except newline, more whitespace!
  const Nl = tt(Start, LF, NL, {
    [whitespace]: true
  });
  const Cr = tt(Start, CR, WS, {
    [whitespace]: true
  });
  const Ws = tr(Start, SPACE, WS, {
    [whitespace]: true
  });
  tt(Start, OBJECT_REPLACEMENT, Ws);
  tt(Cr, LF, Nl); // \r\n
  tt(Cr, OBJECT_REPLACEMENT, Ws);
  tr(Cr, SPACE, Ws);
  tt(Ws, CR); // non-accepting state to avoid mixing whitespaces
  tt(Ws, LF); // non-accepting state to avoid mixing whitespaces
  tr(Ws, SPACE, Ws);
  tt(Ws, OBJECT_REPLACEMENT, Ws);

  // Emoji tokens. They are not grouped by the scanner except in cases where a
  // zero-width joiner is present
  const Emoji = tr(Start, EMOJI, EMOJI$1, {
    [emoji]: true
  });
  tt(Emoji, '#'); // no transition, emoji regex seems to match #
  tr(Emoji, EMOJI, Emoji);
  tt(Emoji, EMOJI_VARIATION, Emoji);
  // tt(Start, EMOJI_VARIATION, Emoji); // This one is sketchy

  const EmojiJoiner = tt(Emoji, EMOJI_JOINER);
  tt(EmojiJoiner, '#');
  tr(EmojiJoiner, EMOJI, Emoji);
  // tt(EmojiJoiner, EMOJI_VARIATION, Emoji); // also sketchy

  // Generates states for top-level domains
  // Note that this is most accurate when tlds are in alphabetical order
  const wordjr = [[ASCII_LETTER, Word], [DIGIT, Asciinumeric]];
  const uwordjr = [[ASCII_LETTER, null], [LETTER, UWord], [DIGIT, Alphanumeric]];
  for (let i = 0; i < tlds.length; i++) {
    fastts(Start, tlds[i], TLD, WORD, wordjr);
  }
  for (let i = 0; i < utlds.length; i++) {
    fastts(Start, utlds[i], UTLD, UWORD, uwordjr);
  }
  addToGroups(TLD, {
    tld: true,
    ascii: true
  }, groups);
  addToGroups(UTLD, {
    utld: true,
    alpha: true
  }, groups);

  // Collect the states generated by different protocols. NOTE: If any new TLDs
  // get added that are also protocols, set the token to be the same as the
  // protocol to ensure parsing works as expected.
  fastts(Start, 'file', SCHEME, WORD, wordjr);
  fastts(Start, 'mailto', SCHEME, WORD, wordjr);
  fastts(Start, 'http', SLASH_SCHEME, WORD, wordjr);
  fastts(Start, 'https', SLASH_SCHEME, WORD, wordjr);
  fastts(Start, 'ftp', SLASH_SCHEME, WORD, wordjr);
  fastts(Start, 'ftps', SLASH_SCHEME, WORD, wordjr);
  addToGroups(SCHEME, {
    scheme: true,
    ascii: true
  }, groups);
  addToGroups(SLASH_SCHEME, {
    slashscheme: true,
    ascii: true
  }, groups);

  // Register custom schemes. Assumes each scheme is asciinumeric with hyphens
  customSchemes = customSchemes.sort((a, b) => a[0] > b[0] ? 1 : -1);
  for (let i = 0; i < customSchemes.length; i++) {
    const sch = customSchemes[i][0];
    const optionalSlashSlash = customSchemes[i][1];
    const flags = optionalSlashSlash ? {
      [scheme]: true
    } : {
      [slashscheme]: true
    };
    if (sch.indexOf('-') >= 0) {
      flags[domain] = true;
    } else if (!ASCII_LETTER.test(sch)) {
      flags[numeric] = true; // numbers only
    } else if (DIGIT.test(sch)) {
      flags[asciinumeric] = true;
    } else {
      flags[ascii] = true;
    }
    ts(Start, sch, sch, flags);
  }

  // Localhost token
  ts(Start, 'localhost', LOCALHOST, {
    ascii: true
  });

  // Set default transition for start state (some symbol)
  Start.jd = new State(SYM);
  return {
    start: Start,
    tokens: Object.assign({
      groups
    }, tk)
  };
}

/**
	Given a string, returns an array of TOKEN instances representing the
	composition of that string.

	@method run
	@param {State<string>} start scanner starting state
	@param {string} str input string to scan
	@return {Token[]} list of tokens, each with a type and value
*/
function run$1(start, str) {
  // State machine is not case sensitive, so input is tokenized in lowercased
  // form (still returns regular case). Uses selective `toLowerCase` because
  // lowercasing the entire string causes the length and character position to
  // vary in some non-English strings with V8-based runtimes.
  const iterable = stringToArray(str.replace(/[A-Z]/g, c => c.toLowerCase()));
  const charCount = iterable.length; // <= len if there are emojis, etc
  const tokens = []; // return value

  // cursor through the string itself, accounting for characters that have
  // width with length 2 such as emojis
  let cursor = 0;

  // Cursor through the array-representation of the string
  let charCursor = 0;

  // Tokenize the string
  while (charCursor < charCount) {
    let state = start;
    let nextState = null;
    let tokenLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    let charsSinceAccepts = -1;
    while (charCursor < charCount && (nextState = state.go(iterable[charCursor]))) {
      state = nextState;

      // Keep track of the latest accepting state
      if (state.accepts()) {
        sinceAccepts = 0;
        charsSinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts += iterable[charCursor].length;
        charsSinceAccepts++;
      }
      tokenLength += iterable[charCursor].length;
      cursor += iterable[charCursor].length;
      charCursor++;
    }

    // Roll back to the latest accepting state
    cursor -= sinceAccepts;
    charCursor -= charsSinceAccepts;
    tokenLength -= sinceAccepts;

    // No more jumps, just make a new token from the last accepting one
    tokens.push({
      t: latestAccepting.t,
      // token type/name
      v: str.slice(cursor - tokenLength, cursor),
      // string value
      s: cursor - tokenLength,
      // start index
      e: cursor // end index (excluding)
    });
  }
  return tokens;
}

/**
 * Convert a String to an Array of characters, taking into account that some
 * characters like emojis take up two string indexes.
 *
 * Adapted from core-js (MIT license)
 * https://github.com/zloirock/core-js/blob/2d69cf5f99ab3ea3463c395df81e5a15b68f49d9/packages/core-js/internals/string-multibyte.js
 *
 * @function stringToArray
 * @param {string} str
 * @returns {string[]}
 */
function stringToArray(str) {
  const result = [];
  const len = str.length;
  let index = 0;
  while (index < len) {
    let first = str.charCodeAt(index);
    let second;
    let char = first < 0xd800 || first > 0xdbff || index + 1 === len || (second = str.charCodeAt(index + 1)) < 0xdc00 || second > 0xdfff ? str[index] // single character
    : str.slice(index, index + 2); // two-index characters
    result.push(char);
    index += char.length;
  }
  return result;
}

/**
 * Fast version of ts function for when transition defaults are well known
 * @param {State<string>} state
 * @param {string} input
 * @param {string} t
 * @param {string} defaultt
 * @param {[RegExp, State<string>][]} jr
 * @returns {State<string>}
 */
function fastts(state, input, t, defaultt, jr) {
  let next;
  const len = input.length;
  for (let i = 0; i < len - 1; i++) {
    const char = input[i];
    if (state.j[char]) {
      next = state.j[char];
    } else {
      next = new State(defaultt);
      next.jr = jr.slice();
      state.j[char] = next;
    }
    state = next;
  }
  next = new State(t);
  next.jr = jr.slice();
  state.j[input[len - 1]] = next;
  return next;
}

/**
 * Converts a string of Top-Level Domain names encoded in update-tlds.js back
 * into a list of strings.
 * @param {str} encoded encoded TLDs string
 * @returns {str[]} original TLDs list
 */
function decodeTlds(encoded) {
  const words = [];
  const stack = [];
  let i = 0;
  let digits = '0123456789';
  while (i < encoded.length) {
    let popDigitCount = 0;
    while (digits.indexOf(encoded[i + popDigitCount]) >= 0) {
      popDigitCount++; // encountered some digits, have to pop to go one level up trie
    }
    if (popDigitCount > 0) {
      words.push(stack.join('')); // whatever preceded the pop digits must be a word
      for (let popCount = parseInt(encoded.substring(i, i + popDigitCount), 10); popCount > 0; popCount--) {
        stack.pop();
      }
      i += popDigitCount;
    } else {
      stack.push(encoded[i]); // drop down a level into the trie
      i++;
    }
  }
  return words;
}

/**
 * An object where each key is a valid DOM Event Name such as `click` or `focus`
 * and each value is an event handler function.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Element#events
 * @typedef {?{ [event: string]: Function }} EventListeners
 */

/**
 * All formatted properties required to render a link, including `tagName`,
 * `attributes`, `content` and `eventListeners`.
 * @typedef {{ tagName: any, attributes: {[attr: string]: any}, content: string,
 * eventListeners: EventListeners }} IntermediateRepresentation
 */

/**
 * Specify either an object described by the template type `O` or a function.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `O`
 * @template O
 * @typedef {O | ((value: string, type: string, token: MultiToken) => O)} OptObj
 */

/**
 * Specify either a function described by template type `F` or an object.
 *
 * Each key in the object should be a link type (`'url'`, `'hashtag`', etc.). Each
 * value should be a function with template type `F` that is called when the
 * corresponding link type is encountered.
 * @template F
 * @typedef {F | { [type: string]: F}} OptFn
 */

/**
 * Specify either a value with template type `V`, a function that returns `V` or
 * an object where each value resolves to `V`.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `V`
 *
 * For the object, each key should be a link type (`'url'`, `'hashtag`', etc.).
 * Each value should either have type `V` or a function that returns V. This
 * function similarly takes a string value and a token.
 *
 * Example valid types for `Opt<string>`:
 *
 * ```js
 * 'hello'
 * (value, type, token) => 'world'
 * { url: 'hello', email: (value, token) => 'world'}
 * ```
 * @template V
 * @typedef {V | ((value: string, type: string, token: MultiToken) => V) | { [type: string]: V | ((value: string, token: MultiToken) => V) }} Opt
 */

/**
 * See available options: https://linkify.js.org/docs/options.html
 * @typedef {{
 * 	defaultProtocol?: string,
 *  events?: OptObj<EventListeners>,
 * 	format?: Opt<string>,
 * 	formatHref?: Opt<string>,
 * 	nl2br?: boolean,
 * 	tagName?: Opt<any>,
 * 	target?: Opt<string>,
 * 	rel?: Opt<string>,
 * 	validate?: Opt<boolean>,
 * 	truncate?: Opt<number>,
 * 	className?: Opt<string>,
 * 	attributes?: OptObj<({ [attr: string]: any })>,
 *  ignoreTags?: string[],
 * 	render?: OptFn<((ir: IntermediateRepresentation) => any)>
 * }} Opts
 */

/**
 * @type Required<Opts>
 */
const defaults = {
  defaultProtocol: 'http',
  events: null,
  format: noop,
  formatHref: noop,
  nl2br: false,
  tagName: 'a',
  target: null,
  rel: null,
  validate: true,
  truncate: Infinity,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};

/**
 * Utility class for linkify interfaces to apply specified
 * {@link Opts formatting and rendering options}.
 *
 * @param {Opts | Options} [opts] Option value overrides.
 * @param {(ir: IntermediateRepresentation) => any} [defaultRender] (For
 *   internal use) default render function that determines how to generate an
 *   HTML element based on a link token's derived tagName, attributes and HTML.
 *   Similar to render option
 */
function Options(opts, defaultRender = null) {
  let o = Object.assign({}, defaults);
  if (opts) {
    o = Object.assign(o, opts instanceof Options ? opts.o : opts);
  }

  // Ensure all ignored tags are uppercase
  const ignoredTags = o.ignoreTags;
  const uppercaseIgnoredTags = [];
  for (let i = 0; i < ignoredTags.length; i++) {
    uppercaseIgnoredTags.push(ignoredTags[i].toUpperCase());
  }
  /** @protected */
  this.o = o;
  if (defaultRender) {
    this.defaultRender = defaultRender;
  }
  this.ignoreTags = uppercaseIgnoredTags;
}
Options.prototype = {
  o: defaults,
  /**
   * @type string[]
   */
  ignoreTags: [],
  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender(ir) {
    return ir;
  },
  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check(token) {
    return this.get('validate', token.toString(), token);
  },
  // Private methods

  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get(key, operator, token) {
    const isCallable = operator != null;
    let option = this.o[key];
    if (!option) {
      return option;
    }
    if (typeof option === 'object') {
      option = token.t in option ? option[token.t] : defaults[key];
      if (typeof option === 'function' && isCallable) {
        option = option(operator, token);
      }
    } else if (typeof option === 'function' && isCallable) {
      option = option(operator, token.t, token);
    }
    return option;
  },
  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj(key, operator, token) {
    let obj = this.o[key];
    if (typeof obj === 'function' && operator != null) {
      obj = obj(operator, token.t, token);
    }
    return obj;
  },
  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render(token) {
    const ir = token.render(this); // intermediate representation
    const renderFn = this.get('render', null, token) || this.defaultRender;
    return renderFn(ir, token.t, token);
  }
};
function noop(val) {
  return val;
}

/******************************************************************************
	Multi-Tokens
	Tokens composed of arrays of TextTokens
******************************************************************************/

/**
 * @param {string} value
 * @param {Token[]} tokens
 */
function MultiToken(value, tokens) {
  this.t = 'token';
  this.v = value;
  this.tk = tokens;
}

/**
 * Abstract class used for manufacturing tokens of text tokens. That is rather
 * than the value for a token being a small string of text, it's value an array
 * of text tokens.
 *
 * Used for grouping together URLs, emails, hashtags, and other potential
 * creations.
 * @class MultiToken
 * @property {string} t
 * @property {string} v
 * @property {Token[]} tk
 * @abstract
 */
MultiToken.prototype = {
  isLink: false,
  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString() {
    return this.v;
  },
  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
   */
  toHref(scheme) {
    return this.toString();
  },
  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString(options) {
    const val = this.toString();
    const truncate = options.get('truncate', val, this);
    const formatted = options.get('format', val, this);
    return truncate && formatted.length > truncate ? formatted.substring(0, truncate) + '…' : formatted;
  },
  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref(options) {
    return options.get('formatHref', this.toHref(options.get('defaultProtocol')), this);
  },
  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex() {
    return this.tk[0].s;
  },
  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex() {
    return this.tk[this.tk.length - 1].e;
  },
  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject(protocol = defaults.defaultProtocol) {
    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(protocol),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject(options) {
    return {
      type: this.t,
      value: this.toFormattedString(options),
      isLink: this.isLink,
      href: this.toFormattedHref(options),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },
  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate(options) {
    return options.get('validate', this.toString(), this);
  },
  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render(options) {
    const token = this;
    const href = this.toHref(options.get('defaultProtocol'));
    const formattedHref = options.get('formatHref', href, this);
    const tagName = options.get('tagName', href, token);
    const content = this.toFormattedString(options);
    const attributes = {};
    const className = options.get('className', href, token);
    const target = options.get('target', href, token);
    const rel = options.get('rel', href, token);
    const attrs = options.getObj('attributes', href, token);
    const eventListeners = options.getObj('events', href, token);
    attributes.href = formattedHref;
    if (className) {
      attributes.class = className;
    }
    if (target) {
      attributes.target = target;
    }
    if (rel) {
      attributes.rel = rel;
    }
    if (attrs) {
      Object.assign(attributes, attrs);
    }
    return {
      tagName,
      attributes,
      content,
      eventListeners
    };
  }
};

/**
 * Create a new token that can be emitted by the parser state machine
 * @param {string} type readable type of the token
 * @param {object} props properties to assign or override, including isLink = true or false
 * @returns {new (value: string, tokens: Token[]) => MultiToken} new token class
 */
function createTokenClass(type, props) {
  class Token extends MultiToken {
    constructor(value, tokens) {
      super(value, tokens);
      this.t = type;
    }
  }
  for (const p in props) {
    Token.prototype[p] = props[p];
  }
  Token.t = type;
  return Token;
}

/**
	Represents a list of tokens making up a valid email address
*/
const Email = createTokenClass('email', {
  isLink: true,
  toHref() {
    return 'mailto:' + this.toString();
  }
});

/**
	Represents some plain text
*/
const Text$1 = createTokenClass('text');

/**
	Multi-linebreak token - represents a line break
	@class Nl
*/
const Nl = createTokenClass('nl');

/**
	Represents a list of text tokens making up a valid URL
	@class Url
*/
const Url = createTokenClass('url', {
  isLink: true,
  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref(scheme = defaults.defaultProtocol) {
    // Check if already has a prefix scheme
    return this.hasProtocol() ? this.v : `${scheme}://${this.v}`;
  },
  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol() {
    const tokens = this.tk;
    return tokens.length >= 2 && tokens[0].t !== LOCALHOST && tokens[1].t === COLON;
  }
});

/**
	Not exactly parser, more like the second-stage scanner (although we can
	theoretically hotswap the code here with a real parser in the future... but
	for a little URL-finding utility abstract syntax trees may be a little
	overkill).

	URL format: http://en.wikipedia.org/wiki/URI_scheme
	Email format: http://en.wikipedia.org/wiki/EmailAddress (links to RFC in
	reference)

	@module linkify
	@submodule parser
	@main run
*/

const makeState = arg => new State(arg);

/**
 * Generate the parser multi token-based state machine
 * @param {{ groups: Collections<string> }} tokens
 */
function init$1({
  groups
}) {
  // Types of characters the URL can definitely end in
  const qsAccepting = groups.domain.concat([AMPERSAND, ASTERISK, AT, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, NUM, PERCENT, PIPE, PLUS, POUND, SLASH, SYM, TILDE, UNDERSCORE]);

  // Types of tokens that can follow a URL and be part of the query string
  // but cannot be the very last characters
  // Characters that cannot appear in the URL at all should be excluded
  const qsNonAccepting = [APOSTROPHE, COLON, COMMA, DOT, EXCLAMATION, PERCENT, QUERY, QUOTE, SEMI, OPENANGLEBRACKET, CLOSEANGLEBRACKET, OPENBRACE, CLOSEBRACE, CLOSEBRACKET, OPENBRACKET, OPENPAREN, CLOSEPAREN, FULLWIDTHLEFTPAREN, FULLWIDTHRIGHTPAREN, LEFTCORNERBRACKET, RIGHTCORNERBRACKET, LEFTWHITECORNERBRACKET, RIGHTWHITECORNERBRACKET, FULLWIDTHLESSTHAN, FULLWIDTHGREATERTHAN];

  // For addresses without the mailto prefix
  // Tokens allowed in the localpart of the email
  const localpartAccepting = [AMPERSAND, APOSTROPHE, ASTERISK, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, OPENBRACE, CLOSEBRACE, PERCENT, PIPE, PLUS, POUND, QUERY, SLASH, SYM, TILDE, UNDERSCORE];

  // The universal starting state.
  /**
   * @type State<Token>
   */
  const Start = makeState();
  const Localpart = tt(Start, TILDE); // Local part of the email address
  ta(Localpart, localpartAccepting, Localpart);
  ta(Localpart, groups.domain, Localpart);
  const Domain = makeState(),
    Scheme = makeState(),
    SlashScheme = makeState();
  ta(Start, groups.domain, Domain); // parsed string ends with a potential domain name (A)
  ta(Start, groups.scheme, Scheme); // e.g., 'mailto'
  ta(Start, groups.slashscheme, SlashScheme); // e.g., 'http'

  ta(Domain, localpartAccepting, Localpart);
  ta(Domain, groups.domain, Domain);
  const LocalpartAt = tt(Domain, AT); // Local part of the email address plus @

  tt(Localpart, AT, LocalpartAt); // close to an email address now

  // Local part of an email address can be e.g. 'http' or 'mailto'
  tt(Scheme, AT, LocalpartAt);
  tt(SlashScheme, AT, LocalpartAt);
  const LocalpartDot = tt(Localpart, DOT); // Local part of the email address plus '.' (localpart cannot end in .)
  ta(LocalpartDot, localpartAccepting, Localpart);
  ta(LocalpartDot, groups.domain, Localpart);
  const EmailDomain = makeState();
  ta(LocalpartAt, groups.domain, EmailDomain); // parsed string starts with local email info + @ with a potential domain name
  ta(EmailDomain, groups.domain, EmailDomain);
  const EmailDomainDot = tt(EmailDomain, DOT); // domain followed by DOT
  ta(EmailDomainDot, groups.domain, EmailDomain);
  const Email$1 = makeState(Email); // Possible email address (could have more tlds)
  ta(EmailDomainDot, groups.tld, Email$1);
  ta(EmailDomainDot, groups.utld, Email$1);
  tt(LocalpartAt, LOCALHOST, Email$1);

  // Hyphen can jump back to a domain name
  const EmailDomainHyphen = tt(EmailDomain, HYPHEN); // parsed string starts with local email info + @ with a potential domain name
  tt(EmailDomainHyphen, HYPHEN, EmailDomainHyphen);
  ta(EmailDomainHyphen, groups.domain, EmailDomain);
  ta(Email$1, groups.domain, EmailDomain);
  tt(Email$1, DOT, EmailDomainDot);
  tt(Email$1, HYPHEN, EmailDomainHyphen);

  // Account for dots and hyphens. Hyphens are usually parts of domain names
  // (but not TLDs)
  const DomainHyphen = tt(Domain, HYPHEN); // domain followed by hyphen
  const DomainDot = tt(Domain, DOT); // domain followed by DOT
  tt(DomainHyphen, HYPHEN, DomainHyphen);
  ta(DomainHyphen, groups.domain, Domain);
  ta(DomainDot, localpartAccepting, Localpart);
  ta(DomainDot, groups.domain, Domain);
  const DomainDotTld = makeState(Url); // Simplest possible URL with no query string
  ta(DomainDot, groups.tld, DomainDotTld);
  ta(DomainDot, groups.utld, DomainDotTld);
  ta(DomainDotTld, groups.domain, Domain);
  ta(DomainDotTld, localpartAccepting, Localpart);
  tt(DomainDotTld, DOT, DomainDot);
  tt(DomainDotTld, HYPHEN, DomainHyphen);
  tt(DomainDotTld, AT, LocalpartAt);
  const DomainDotTldColon = tt(DomainDotTld, COLON); // URL followed by colon (potential port number here)
  const DomainDotTldColonPort = makeState(Url); // TLD followed by a port number
  ta(DomainDotTldColon, groups.numeric, DomainDotTldColonPort);

  // Long URL with optional port and maybe query string
  const Url$1 = makeState(Url);

  // URL with extra symbols at the end, followed by an opening bracket
  const UrlNonaccept = makeState(); // URL followed by some symbols (will not be part of the final URL)

  // Query strings
  ta(Url$1, qsAccepting, Url$1);
  ta(Url$1, qsNonAccepting, UrlNonaccept);
  ta(UrlNonaccept, qsAccepting, Url$1);
  ta(UrlNonaccept, qsNonAccepting, UrlNonaccept);

  // Become real URLs after `SLASH` or `COLON NUM SLASH`
  // Here works with or without scheme:// prefix
  tt(DomainDotTld, SLASH, Url$1);
  tt(DomainDotTldColonPort, SLASH, Url$1);

  // Note that domains that begin with schemes are treated slighly differently
  const SchemeColon = tt(Scheme, COLON); // e.g., 'mailto:'
  const SlashSchemeColon = tt(SlashScheme, COLON); // e.g., 'http:'
  const SlashSchemeColonSlash = tt(SlashSchemeColon, SLASH); // e.g., 'http:/'

  const UriPrefix = tt(SlashSchemeColonSlash, SLASH); // e.g., 'http://'

  // Scheme states can transition to domain states
  ta(Scheme, groups.domain, Domain);
  tt(Scheme, DOT, DomainDot);
  tt(Scheme, HYPHEN, DomainHyphen);
  ta(SlashScheme, groups.domain, Domain);
  tt(SlashScheme, DOT, DomainDot);
  tt(SlashScheme, HYPHEN, DomainHyphen);

  // Force URL with scheme prefix followed by anything sane
  ta(SchemeColon, groups.domain, Url$1);
  tt(SchemeColon, SLASH, Url$1);
  tt(SchemeColon, QUERY, Url$1);
  ta(UriPrefix, groups.domain, Url$1);
  ta(UriPrefix, qsAccepting, Url$1);
  tt(UriPrefix, SLASH, Url$1);
  const bracketPairs = [[OPENBRACE, CLOSEBRACE],
  // {}
  [OPENBRACKET, CLOSEBRACKET],
  // []
  [OPENPAREN, CLOSEPAREN],
  // ()
  [OPENANGLEBRACKET, CLOSEANGLEBRACKET],
  // <>
  [FULLWIDTHLEFTPAREN, FULLWIDTHRIGHTPAREN],
  // （）
  [LEFTCORNERBRACKET, RIGHTCORNERBRACKET],
  // 「」
  [LEFTWHITECORNERBRACKET, RIGHTWHITECORNERBRACKET],
  // 『』
  [FULLWIDTHLESSTHAN, FULLWIDTHGREATERTHAN] // ＜＞
  ];
  for (let i = 0; i < bracketPairs.length; i++) {
    const [OPEN, CLOSE] = bracketPairs[i];
    const UrlOpen = tt(Url$1, OPEN); // URL followed by open bracket

    // Continue not accepting for open brackets
    tt(UrlNonaccept, OPEN, UrlOpen);

    // URL that begins with an opening bracket, followed by a symbols.
    // Note that the final state can still be `UrlOpen` (if the URL has a
    // single opening bracket for some reason).
    const UrlOpenQ = makeState(Url);
    ta(UrlOpen, qsAccepting, UrlOpenQ);
    const UrlOpenSyms = makeState(); // UrlOpen followed by some symbols it cannot end it
    ta(UrlOpen, qsNonAccepting, UrlOpenSyms);

    // Closing bracket component. This character WILL be included in the URL.
    // Must come after qsNonAccepting (which includes all close-bracket tokens)
    // so that CLOSE -> Url wins over CLOSE -> UrlOpenSyms.
    tt(UrlOpen, CLOSE, Url$1);

    // URL that begins with an opening bracket, followed by some symbols
    ta(UrlOpenQ, qsAccepting, UrlOpenQ);
    ta(UrlOpenQ, qsNonAccepting, UrlOpenSyms);
    ta(UrlOpenSyms, qsAccepting, UrlOpenQ);
    ta(UrlOpenSyms, qsNonAccepting, UrlOpenSyms);

    // Close brace/bracket to become regular URL
    tt(UrlOpenQ, CLOSE, Url$1);
    tt(UrlOpenSyms, CLOSE, Url$1);
  }
  tt(Start, LOCALHOST, DomainDotTld); // localhost is a valid URL state
  tt(Start, NL, Nl); // single new line

  return {
    start: Start,
    tokens: tk
  };
}

/**
 * Run the parser state machine on a list of scanned string-based tokens to
 * create a list of multi tokens, each of which represents a URL, email address,
 * plain text, etc.
 *
 * @param {State<MultiToken>} start parser start state
 * @param {string} input the original input used to generate the given tokens
 * @param {Token[]} tokens list of scanned tokens
 * @returns {MultiToken[]}
 */
function run(start, input, tokens) {
  let len = tokens.length;
  let cursor = 0;
  let multis = [];
  let textTokens = [];
  while (cursor < len) {
    let state = start;
    let secondState = null;
    let nextState = null;
    let multiLength = 0;
    let latestAccepting = null;
    let sinceAccepts = -1;
    while (cursor < len && !(secondState = state.go(tokens[cursor].t))) {
      // Starting tokens with nowhere to jump to.
      // Consider these to be just plain text
      textTokens.push(tokens[cursor++]);
    }
    while (cursor < len && (nextState = secondState || state.go(tokens[cursor].t))) {
      // Get the next state
      secondState = null;
      state = nextState;

      // Keep track of the latest accepting state
      if (state.accepts()) {
        sinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts++;
      }
      cursor++;
      multiLength++;
    }
    if (sinceAccepts < 0) {
      // No accepting state was found, part of a regular text token add
      // the first text token to the text tokens array and try again from
      // the next
      cursor -= multiLength;
      if (cursor < len) {
        textTokens.push(tokens[cursor]);
        cursor++;
      }
    } else {
      // Accepting state!
      // First close off the textTokens (if available)
      if (textTokens.length > 0) {
        multis.push(initMultiToken(Text$1, input, textTokens));
        textTokens = [];
      }

      // Roll back to the latest accepting state
      cursor -= sinceAccepts;
      multiLength -= sinceAccepts;

      // Create a new multitoken
      const Multi = latestAccepting.t;
      const subtokens = tokens.slice(cursor - multiLength, cursor);
      multis.push(initMultiToken(Multi, input, subtokens));
    }
  }

  // Finally close off the textTokens (if available)
  if (textTokens.length > 0) {
    multis.push(initMultiToken(Text$1, input, textTokens));
  }
  return multis;
}

/**
 * Utility function for instantiating a new multitoken with all the relevant
 * fields during parsing.
 * @param {new (value: string, tokens: Token[]) => MultiToken} Multi class to instantiate
 * @param {string} input original input string
 * @param {Token[]} tokens consecutive tokens scanned from input string
 * @returns {MultiToken}
 */
function initMultiToken(Multi, input, tokens) {
  const startIdx = tokens[0].s;
  const endIdx = tokens[tokens.length - 1].e;
  const value = input.slice(startIdx, endIdx);
  return new Multi(value, tokens);
}

const warn = typeof console !== 'undefined' && console && console.warn || (() => {});
const warnAdvice = 'until manual call of linkify.init(). Register all schemes and plugins before invoking linkify the first time.';

// Side-effect initialization state
const INIT = {
  scanner: null,
  parser: null,
  tokenQueue: [],
  pluginQueue: [],
  customSchemes: [],
  initialized: false
};

/**
 * @typedef {{
 * 	start: State<string>,
 * 	tokens: { groups: Collections<string> } & typeof tk
 * }} ScannerInit
 */

/**
 * @typedef {{
 * 	start: State<MultiToken>,
 * 	tokens: typeof multi
 * }} ParserInit
 */

/**
 * @typedef {(arg: { scanner: ScannerInit }) => void} TokenPlugin
 */

/**
 * @typedef {(arg: { scanner: ScannerInit, parser: ParserInit }) => void} Plugin
 */

/**
 * De-register all plugins and reset the internal state-machine. Used for
 * testing; not required in practice.
 * @private
 */
function reset() {
  State.groups = {};
  INIT.scanner = null;
  INIT.parser = null;
  INIT.tokenQueue = [];
  INIT.pluginQueue = [];
  INIT.customSchemes = [];
  INIT.initialized = false;
  return INIT;
}

/**
 * Detect URLs with the following additional protocol. Anything with format
 * "protocol://..." will be considered a link. If `optionalSlashSlash` is set to
 * `true`, anything with format "protocol:..." will be considered a link.
 * @param {string} scheme
 * @param {boolean} [optionalSlashSlash]
 */
function registerCustomProtocol(scheme, optionalSlashSlash = false) {
  if (INIT.initialized) {
    warn(`linkifyjs: already initialized - will not register custom scheme "${scheme}" ${warnAdvice}`);
  }
  if (!/^[0-9a-z]+(-[0-9a-z]+)*$/.test(scheme)) {
    throw new Error(`linkifyjs: incorrect scheme format.
1. Must only contain digits, lowercase ASCII letters or "-"
2. Cannot start or end with "-"
3. "-" cannot repeat`);
  }
  INIT.customSchemes.push([scheme, optionalSlashSlash]);
}

/**
 * Initialize the linkify state machine. Called automatically the first time
 * linkify is called on a string, but may be called manually as well.
 */
function init() {
  // Initialize scanner state machine and plugins
  INIT.scanner = init$2(INIT.customSchemes);
  for (let i = 0; i < INIT.tokenQueue.length; i++) {
    INIT.tokenQueue[i][1]({
      scanner: INIT.scanner
    });
  }

  // Initialize parser state machine and plugins
  INIT.parser = init$1(INIT.scanner.tokens);
  for (let i = 0; i < INIT.pluginQueue.length; i++) {
    INIT.pluginQueue[i][1]({
      scanner: INIT.scanner,
      parser: INIT.parser
    });
  }
  INIT.initialized = true;
  return INIT;
}

/**
 * Parse a string into tokens that represent linkable and non-linkable sub-components
 * @param {string} str
 * @return {MultiToken[]} tokens
 */
function tokenize(str) {
  if (!INIT.initialized) {
    init();
  }
  return run(INIT.parser.start, str, run$1(INIT.scanner.start, str));
}
tokenize.scan = run$1; // for testing

/**
 * Find a list of linkable items in the given string.
 * @param {string} str string to find links in
 * @param {string | Opts} [type] either formatting options or specific type of
 * links to find, e.g., 'url' or 'email'
 * @param {Opts} [opts] formatting options for final output. Cannot be specified
 * if opts already provided in `type` argument
 */
function find(str, type = null, opts = null) {
  if (type && typeof type === 'object') {
    if (opts) {
      throw Error(`linkifyjs: Invalid link type ${type}; must be a string`);
    }
    opts = type;
    type = null;
  }
  const options = new Options(opts);
  const tokens = tokenize(str);
  const filtered = [];
  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    if (token.isLink && (!type || token.t === type) && options.check(token)) {
      filtered.push(token.toFormattedObject(options));
    }
  }
  return filtered;
}

// src/link.ts

// src/helpers/whitespace.ts
var UNICODE_WHITESPACE_PATTERN = "[\0- \xA0\u1680\u180E\u2000-\u2029\u205F\u3000]";
var UNICODE_WHITESPACE_REGEX = new RegExp(UNICODE_WHITESPACE_PATTERN);
var UNICODE_WHITESPACE_REGEX_END = new RegExp(`${UNICODE_WHITESPACE_PATTERN}$`);
var UNICODE_WHITESPACE_REGEX_GLOBAL = new RegExp(UNICODE_WHITESPACE_PATTERN, "g");

// src/helpers/autolink.ts
function isValidLinkStructure(tokens) {
  if (tokens.length === 1) {
    return tokens[0].isLink;
  }
  if (tokens.length === 3 && tokens[1].isLink) {
    return ["()", "[]"].includes(tokens[0].value + tokens[2].value);
  }
  return false;
}
function autolink(options) {
  return new index.Plugin({
    key: new index.PluginKey("autolink"),
    appendTransaction: (transactions, oldState, newState) => {
      const docChanges = transactions.some((transaction) => transaction.docChanged) && !oldState.doc.eq(newState.doc);
      const preventAutolink = transactions.some(
        (transaction) => transaction.getMeta("preventAutolink")
      );
      if (!docChanges || preventAutolink) {
        return;
      }
      const { tr } = newState;
      const transform = index.combineTransactionSteps(oldState.doc, [...transactions]);
      const changes = index.getChangedRanges(transform);
      changes.forEach(({ newRange }) => {
        const nodesInChangedRanges = index.findChildrenInRange(
          newState.doc,
          newRange,
          (node) => node.isTextblock
        );
        let textBlock;
        let textBeforeWhitespace;
        if (nodesInChangedRanges.length > 1) {
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(
            textBlock.pos,
            textBlock.pos + textBlock.node.nodeSize,
            void 0,
            " "
          );
        } else if (nodesInChangedRanges.length) {
          const endText = newState.doc.textBetween(newRange.from, newRange.to, " ", " ");
          if (!UNICODE_WHITESPACE_REGEX_END.test(endText)) {
            return;
          }
          textBlock = nodesInChangedRanges[0];
          textBeforeWhitespace = newState.doc.textBetween(
            textBlock.pos,
            newRange.to,
            void 0,
            " "
          );
        }
        if (textBlock && textBeforeWhitespace) {
          const wordsBeforeWhitespace = textBeforeWhitespace.split(UNICODE_WHITESPACE_REGEX).filter(Boolean);
          if (wordsBeforeWhitespace.length <= 0) {
            return false;
          }
          const lastWordBeforeSpace = wordsBeforeWhitespace[wordsBeforeWhitespace.length - 1];
          const lastWordAndBlockOffset = textBlock.pos + textBeforeWhitespace.lastIndexOf(lastWordBeforeSpace);
          if (!lastWordBeforeSpace) {
            return false;
          }
          const linksBeforeSpace = tokenize(lastWordBeforeSpace).map(
            (t) => t.toObject(options.defaultProtocol)
          );
          if (!isValidLinkStructure(linksBeforeSpace)) {
            return false;
          }
          linksBeforeSpace.filter((link) => link.isLink).map((link) => ({
            ...link,
            from: lastWordAndBlockOffset + link.start + 1,
            to: lastWordAndBlockOffset + link.end + 1
          })).filter((link) => {
            if (!newState.schema.marks.code) {
              return true;
            }
            return !newState.doc.rangeHasMark(link.from, link.to, newState.schema.marks.code);
          }).filter((link) => options.validate(link.value)).filter((link) => options.shouldAutoLink(link.value)).forEach((link) => {
            if (index.getMarksBetween(link.from, link.to, newState.doc).some(
              (item) => item.mark.type === options.type
            )) {
              return;
            }
            tr.addMark(
              link.from,
              link.to,
              options.type.create({
                href: link.href
              })
            );
          });
        }
      });
      if (!tr.steps.length) {
        return;
      }
      return tr;
    }
  });
}
function clickHandler(options) {
  return new index.Plugin({
    key: new index.PluginKey("handleClickLink"),
    props: {
      handleClick: (view, pos, event) => {
        var _a, _b;
        if (event.button !== 0) {
          return false;
        }
        if (!view.editable) {
          return false;
        }
        let link = null;
        if (event.target instanceof HTMLAnchorElement) {
          link = event.target;
        } else {
          const target = event.target;
          if (!target) {
            return false;
          }
          const root = options.editor.view.dom;
          link = target.closest("a");
          if (link && !root.contains(link)) {
            link = null;
          }
        }
        if (!link) {
          return false;
        }
        let handled = false;
        if (options.enableClickSelection) {
          const commandResult = options.editor.commands.extendMarkRange(options.type.name);
          handled = commandResult;
        }
        if (options.openOnClick) {
          const attrs = index.getAttributes(view.state, options.type.name);
          const href = (_a = link.href) != null ? _a : attrs.href;
          const target = (_b = link.target) != null ? _b : attrs.target;
          if (href) {
            window.open(href, target);
            handled = true;
          }
        }
        return handled;
      }
    }
  });
}
function pasteHandler(options) {
  return new index.Plugin({
    key: new index.PluginKey("handlePasteLink"),
    props: {
      handlePaste: (view, _event, slice) => {
        const { shouldAutoLink } = options;
        const { state } = view;
        const { selection } = state;
        const { empty } = selection;
        if (empty) {
          return false;
        }
        let textContent = "";
        slice.content.forEach((node) => {
          textContent += node.textContent;
        });
        const link = find(textContent, { defaultProtocol: options.defaultProtocol }).find(
          (item) => item.isLink && item.value === textContent
        );
        if (!textContent || !link || shouldAutoLink !== void 0 && !shouldAutoLink(link.value)) {
          return false;
        }
        return options.editor.commands.setMark(options.type, {
          href: link.href
        });
      }
    }
  });
}
function isAllowedUri(uri, protocols) {
  const allowedProtocols = [
    "http",
    "https",
    "ftp",
    "ftps",
    "mailto",
    "tel",
    "callto",
    "sms",
    "cid",
    "xmpp"
  ];
  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol = typeof protocol === "string" ? protocol : protocol.scheme;
      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }
  return !uri || uri.replace(UNICODE_WHITESPACE_REGEX_GLOBAL, "").match(
    new RegExp(
      // oxlint-disable-next-line no-useless-escape
      `^(?:(?:${allowedProtocols.join("|")}):|[^a-z]|[a-z0-9+.-]+(?:[^a-z+.-:]|$))`,
      "i"
    )
  );
}
var Link = index.Mark.create({
  name: "link",
  priority: 1e3,
  keepOnSplit: false,
  exitable: true,
  onCreate() {
    if (this.options.validate && !this.options.shouldAutoLink) {
      this.options.shouldAutoLink = this.options.validate;
      console.warn(
        "The `validate` option is deprecated. Rename to the `shouldAutoLink` option instead."
      );
    }
    this.options.protocols.forEach((protocol) => {
      if (typeof protocol === "string") {
        registerCustomProtocol(protocol);
        return;
      }
      registerCustomProtocol(protocol.scheme, protocol.optionalSlashes);
    });
  },
  onDestroy() {
    reset();
  },
  inclusive() {
    return this.options.autolink;
  },
  addOptions() {
    return {
      openOnClick: true,
      enableClickSelection: false,
      linkOnPaste: true,
      autolink: true,
      protocols: [],
      defaultProtocol: "http",
      HTMLAttributes: {
        target: "_blank",
        rel: "noopener noreferrer nofollow",
        class: null
      },
      isAllowedUri: (url, ctx) => !!isAllowedUri(url, ctx.protocols),
      validate: (url) => !!url,
      shouldAutoLink: (url) => {
        const hasProtocol = /^[a-z][a-z0-9+.-]*:\/\//i.test(url);
        const hasMaybeProtocol = /^[a-z][a-z0-9+.-]*:/i.test(url);
        if (hasProtocol || hasMaybeProtocol && !url.includes("@")) {
          return true;
        }
        const urlWithoutUserinfo = url.includes("@") ? url.split("@").pop() : url;
        const hostname = urlWithoutUserinfo.split(/[/?#:]/)[0];
        if (/^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
          return false;
        }
        if (!/\./.test(hostname)) {
          return false;
        }
        return true;
      }
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML(element) {
          return element.getAttribute("href");
        }
      },
      target: {
        default: this.options.HTMLAttributes.target
      },
      rel: {
        default: this.options.HTMLAttributes.rel
      },
      class: {
        default: this.options.HTMLAttributes.class
      },
      title: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "a[href]",
        getAttrs: (dom) => {
          const href = dom.getAttribute("href");
          if (!href || !this.options.isAllowedUri(href, {
            defaultValidate: (url) => !!isAllowedUri(url, this.options.protocols),
            protocols: this.options.protocols,
            defaultProtocol: this.options.defaultProtocol
          })) {
            return false;
          }
          return null;
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    if (!this.options.isAllowedUri(HTMLAttributes.href, {
      defaultValidate: (href) => !!isAllowedUri(href, this.options.protocols),
      protocols: this.options.protocols,
      defaultProtocol: this.options.defaultProtocol
    })) {
      return ["a", index.mergeAttributes(this.options.HTMLAttributes, { ...HTMLAttributes, href: "" }), 0];
    }
    return ["a", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  markdownTokenName: "link",
  parseMarkdown: (token, helpers) => {
    return helpers.applyMark("link", helpers.parseInline(token.tokens || []), {
      href: token.href,
      title: token.title || null
    });
  },
  renderMarkdown: (node, h) => {
    var _a, _b, _c, _d;
    const href = (_b = (_a = node.attrs) == null ? void 0 : _a.href) != null ? _b : "";
    const title = (_d = (_c = node.attrs) == null ? void 0 : _c.title) != null ? _d : "";
    const text = h.renderChildren(node);
    return title ? `[${text}](${href} "${title}")` : `[${text}](${href})`;
  },
  addCommands() {
    return {
      setLink: (attributes) => ({ chain }) => {
        const { href } = attributes;
        if (!this.options.isAllowedUri(href, {
          defaultValidate: (url) => !!isAllowedUri(url, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        })) {
          return false;
        }
        return chain().setMark(this.name, attributes).setMeta("preventAutolink", true).run();
      },
      toggleLink: (attributes) => ({ chain }) => {
        const { href } = attributes || {};
        if (href && !this.options.isAllowedUri(href, {
          defaultValidate: (url) => !!isAllowedUri(url, this.options.protocols),
          protocols: this.options.protocols,
          defaultProtocol: this.options.defaultProtocol
        })) {
          return false;
        }
        return chain().toggleMark(this.name, attributes, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      },
      unsetLink: () => ({ chain }) => {
        return chain().unsetMark(this.name, { extendEmptyMarkRange: true }).setMeta("preventAutolink", true).run();
      }
    };
  },
  addPasteRules() {
    return [
      index.markPasteRule({
        find: (text) => {
          const foundLinks = [];
          if (text) {
            const { protocols, defaultProtocol } = this.options;
            const links = find(text).filter(
              (item) => item.isLink && this.options.isAllowedUri(item.value, {
                defaultValidate: (href) => !!isAllowedUri(href, protocols),
                protocols,
                defaultProtocol
              })
            );
            if (links.length) {
              links.forEach((link) => {
                if (!this.options.shouldAutoLink(link.value)) {
                  return;
                }
                foundLinks.push({
                  text: link.value,
                  data: {
                    href: link.href
                  },
                  index: link.start
                });
              });
            }
          }
          return foundLinks;
        },
        type: this.type,
        getAttributes: (match) => {
          var _a;
          return {
            href: (_a = match.data) == null ? void 0 : _a.href
          };
        }
      })
    ];
  },
  addProseMirrorPlugins() {
    const plugins = [];
    const { protocols, defaultProtocol } = this.options;
    if (this.options.autolink) {
      plugins.push(
        autolink({
          type: this.type,
          defaultProtocol: this.options.defaultProtocol,
          validate: (url) => this.options.isAllowedUri(url, {
            defaultValidate: (href) => !!isAllowedUri(href, protocols),
            protocols,
            defaultProtocol
          }),
          shouldAutoLink: this.options.shouldAutoLink
        })
      );
    }
    plugins.push(
      clickHandler({
        type: this.type,
        editor: this.editor,
        openOnClick: this.options.openOnClick === "whenNotEditable" ? true : this.options.openOnClick,
        enableClickSelection: this.options.enableClickSelection
      })
    );
    if (this.options.linkOnPaste) {
      plugins.push(
        pasteHandler({
          editor: this.editor,
          defaultProtocol: this.options.defaultProtocol,
          type: this.type,
          shouldAutoLink: this.options.shouldAutoLink
        })
      );
    }
    return plugins;
  }
});

// src/index.ts
var index_default$d = Link;

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var ListItemName = "listItem";
var TextStyleName = "textStyle";
var bulletListInputRegex = /^\s*([-+*])\s$/;
var BulletList = index.Node3.create({
  name: "bulletList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: false,
      keepAttributes: false
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [{ tag: "ul" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["ul", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (token, helpers) => {
    if (token.type !== "list" || token.ordered) {
      return [];
    }
    return {
      type: "bulletList",
      content: token.items ? helpers.parseChildren(token.items) : []
    };
  },
  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }
    return h.renderChildren(node.content, "\n");
  },
  markdownOptions: {
    indentsContent: true
  },
  addCommands() {
    return {
      toggleBulletList: () => ({ commands, chain }) => {
        if (this.options.keepAttributes) {
          return chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(ListItemName, this.editor.getAttributes(TextStyleName)).run();
        }
        return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-8": () => this.editor.commands.toggleBulletList()
    };
  },
  addInputRules() {
    let inputRule = index.wrappingInputRule({
      find: bulletListInputRegex,
      type: this.type
    });
    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = index.wrappingInputRule({
        find: bulletListInputRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: () => {
          return this.editor.getAttributes(TextStyleName);
        },
        editor: this.editor
      });
    }
    return [inputRule];
  }
});

// src/helpers/getBranchingNestedListAtCursor.ts
var getBranchingNestedListAtCursor = (state, itemName, wrapperNames) => {
  const { selection } = state;
  if (!selection.empty) {
    return null;
  }
  const { $from } = selection;
  if (!$from.parent.isTextblock) {
    return null;
  }
  if ($from.parentOffset !== $from.parent.content.size) {
    return null;
  }
  let listItemDepth = -1;
  for (let depth = $from.depth; depth > 0; depth -= 1) {
    if ($from.node(depth).type.name === itemName) {
      listItemDepth = depth;
      break;
    }
  }
  if (listItemDepth < 0) {
    return null;
  }
  const listItem = $from.node(listItemDepth);
  const indexInListItem = $from.index(listItemDepth);
  if (indexInListItem + 1 >= listItem.childCount) {
    return null;
  }
  const nextChild = listItem.child(indexInListItem + 1);
  if (!wrapperNames.includes(nextChild.type.name)) {
    return null;
  }
  const itemType = state.schema.nodes[itemName];
  let hasBranching = false;
  nextChild.forEach((child) => {
    if (child.type === itemType && child.childCount > 1) {
      hasBranching = true;
    }
  });
  if (!hasBranching) {
    return null;
  }
  const nodeAfter = state.doc.resolve($from.after()).nodeAfter;
  if (!nodeAfter || !wrapperNames.includes(nodeAfter.type.name)) {
    return null;
  }
  const items = [];
  nodeAfter.forEach((child) => {
    items.push(child);
  });
  if (items.length === 0) {
    return null;
  }
  return {
    listItemDepth,
    nestedList: nodeAfter,
    nestedListPos: $from.after(),
    insertPos: $from.after(listItemDepth),
    items
  };
};

// src/helpers/hoistBranchingNestedList.ts
var hoistBranchingNestedList = (state, dispatch, itemName, wrapperNames) => {
  const context = getBranchingNestedListAtCursor(state, itemName, wrapperNames);
  if (!context) {
    return false;
  }
  const { selection } = state;
  const { nestedList, nestedListPos, insertPos, items } = context;
  const tr = state.tr;
  tr.delete(nestedListPos, nestedListPos + nestedList.nodeSize);
  const mappedInsertPos = tr.mapping.map(insertPos);
  tr.insert(mappedInsertPos, index.Fragment.from(items));
  tr.setSelection(selection.map(tr.doc, tr.mapping));
  if (dispatch) {
    dispatch(tr);
  }
  return true;
};

// src/helpers/handleDeleteBranchingNestedList.ts
var handleDeleteBranchingNestedList = (editor, itemName, wrapperNames) => {
  return hoistBranchingNestedList(editor.state, editor.view.dispatch, itemName, wrapperNames);
};

// src/helpers/createBranchingListDeleteKeymap.ts
var createBranchingListDeleteKeymap = (itemName, wrapperNames) => {
  return index.Extension.create({
    name: `${itemName}BranchingDeleteKeymap`,
    priority: 101,
    addKeyboardShortcuts() {
      const handleDelete2 = () => handleDeleteBranchingNestedList(this.editor, itemName, wrapperNames);
      return {
        Delete: handleDelete2,
        "Mod-Delete": handleDelete2
      };
    }
  });
};

// src/item/list-item.ts
function isSameLineOrderedListToken(token) {
  var _a, _b;
  const nestedToken = (_a = token.tokens) == null ? void 0 : _a[0];
  return Boolean(
    token.text && ((_b = token.tokens) == null ? void 0 : _b.length) === 1 && (nestedToken == null ? void 0 : nestedToken.type) === "list" && nestedToken.ordered && nestedToken.raw === token.text
  );
}
function parseSameLineOrderedListText(text, helpers) {
  if (helpers.tokenizeInline) {
    return helpers.parseInline(helpers.tokenizeInline(text));
  }
  return helpers.parseInline([
    {
      type: "text",
      raw: text,
      text
    }
  ]);
}
var ListItem = index.Node3.create({
  name: "listItem",
  addOptions() {
    return {
      HTMLAttributes: {},
      bulletListTypeName: "bulletList",
      orderedListTypeName: "orderedList"
    };
  },
  content: "paragraph block*",
  defining: true,
  parseHTML() {
    return [
      {
        tag: "li"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["li", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  markdownTokenName: "list_item",
  parseMarkdown: (token, helpers) => {
    var _a;
    if (token.type !== "list_item") {
      return [];
    }
    const parseBlockChildren = (_a = helpers.parseBlockChildren) != null ? _a : helpers.parseChildren;
    let content = [];
    if (token.tokens && token.tokens.length > 0) {
      if (isSameLineOrderedListToken(token)) {
        return {
          type: "listItem",
          content: [
            {
              type: "paragraph",
              content: parseSameLineOrderedListText(token.text || "", helpers)
            }
          ]
        };
      }
      const hasParagraphTokens = token.tokens.some((t) => t.type === "paragraph");
      if (hasParagraphTokens) {
        content = parseBlockChildren(token.tokens);
      } else {
        const firstToken = token.tokens[0];
        if (firstToken && firstToken.type === "text" && firstToken.tokens && firstToken.tokens.length > 0) {
          const inlineContent = helpers.parseInline(firstToken.tokens);
          content = [
            {
              type: "paragraph",
              content: inlineContent
            }
          ];
          if (token.tokens.length > 1) {
            const remainingTokens = token.tokens.slice(1);
            const additionalContent = parseBlockChildren(remainingTokens);
            content.push(...additionalContent);
          }
        } else {
          content = parseBlockChildren(token.tokens);
        }
      }
    }
    if (content.length === 0) {
      content = [
        {
          type: "paragraph",
          content: []
        }
      ];
    }
    return {
      type: "listItem",
      content
    };
  },
  renderMarkdown: (node, h, ctx) => {
    return index.renderNestedMarkdownContent(
      node,
      h,
      (context) => {
        var _a, _b;
        if (context.parentType === "bulletList") {
          return "- ";
        }
        if (context.parentType === "orderedList") {
          const start = ((_b = (_a = context.meta) == null ? void 0 : _a.parentAttrs) == null ? void 0 : _b.start) || 1;
          return `${start + context.index}. `;
        }
        return "- ";
      },
      ctx
    );
  },
  addExtensions() {
    return [
      createBranchingListDeleteKeymap(this.name, [
        this.options.bulletListTypeName,
        this.options.orderedListTypeName
      ])
    ];
  },
  addKeyboardShortcuts() {
    return {
      Enter: () => this.editor.commands.splitListItem(this.name),
      Tab: () => this.editor.commands.sinkListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
  }
});

// src/keymap/listHelpers/index.ts
var listHelpers_exports = {};
__export(listHelpers_exports, {
  findListItemPos: () => findListItemPos,
  getNextListDepth: () => getNextListDepth,
  handleBackspace: () => handleBackspace,
  handleDelete: () => handleDelete,
  hasListBefore: () => hasListBefore,
  hasListItemAfter: () => hasListItemAfter,
  hasListItemBefore: () => hasListItemBefore,
  listItemHasSubList: () => listItemHasSubList,
  nextListIsDeeper: () => nextListIsDeeper,
  nextListIsHigher: () => nextListIsHigher
});
var findListItemPos = (typeOrName, state) => {
  const { $from } = state.selection;
  const nodeType = index.getNodeType(typeOrName, state.schema);
  let currentNode = null;
  let currentDepth = $from.depth;
  let currentPos = $from.pos;
  let targetDepth = null;
  while (currentDepth > 0 && targetDepth === null) {
    currentNode = $from.node(currentDepth);
    if (currentNode.type === nodeType) {
      targetDepth = currentDepth;
    } else {
      currentDepth -= 1;
      currentPos -= 1;
    }
  }
  if (targetDepth === null) {
    return null;
  }
  return { $pos: state.doc.resolve(currentPos), depth: targetDepth };
};
var getNextListDepth = (typeOrName, state) => {
  const listItemPos = findListItemPos(typeOrName, state);
  if (!listItemPos) {
    return false;
  }
  const [, depth] = index.getNodeAtPosition(state, typeOrName, listItemPos.$pos.pos + 4);
  return depth;
};

// src/keymap/listHelpers/hasListBefore.ts
var hasListBefore = (editorState, name, parentListTypes) => {
  const { $anchor } = editorState.selection;
  const previousNodePos = Math.max(0, $anchor.pos - 2);
  const previousNode = editorState.doc.resolve(previousNodePos).node();
  if (!previousNode || !parentListTypes.includes(previousNode.type.name)) {
    return false;
  }
  return true;
};

// src/keymap/listHelpers/handleBackspace.ts
var handleBackspace = (editor, name, parentListTypes) => {
  if (editor.commands.undoInputRule()) {
    return true;
  }
  if (editor.state.selection.from !== editor.state.selection.to) {
    return false;
  }
  if (!index.isNodeActive(editor.state, name) && hasListBefore(editor.state, name, parentListTypes)) {
    const { $anchor } = editor.state.selection;
    const $listPos = editor.state.doc.resolve($anchor.before() - 1);
    const listDescendants = [];
    $listPos.node().descendants((node, pos) => {
      if (node.type.name === name) {
        listDescendants.push({ node, pos });
      }
    });
    const lastItem = listDescendants.at(-1);
    if (!lastItem) {
      return false;
    }
    const $lastItemPos = editor.state.doc.resolve($listPos.start() + lastItem.pos + 1);
    return editor.chain().cut({ from: $anchor.start() - 1, to: $anchor.end() + 1 }, $lastItemPos.end()).joinForward().run();
  }
  if (!index.isNodeActive(editor.state, name)) {
    return false;
  }
  if (!index.isAtStartOfNode(editor.state)) {
    return false;
  }
  return editor.chain().liftListItem(name).run();
};

// src/keymap/listHelpers/nextListIsDeeper.ts
var nextListIsDeeper = (typeOrName, state) => {
  const listDepth = getNextListDepth(typeOrName, state);
  const listItemPos = findListItemPos(typeOrName, state);
  if (!listItemPos || !listDepth) {
    return false;
  }
  if (listDepth > listItemPos.depth) {
    return true;
  }
  return false;
};

// src/keymap/listHelpers/nextListIsHigher.ts
var nextListIsHigher = (typeOrName, state) => {
  const listDepth = getNextListDepth(typeOrName, state);
  const listItemPos = findListItemPos(typeOrName, state);
  if (!listItemPos || !listDepth) {
    return false;
  }
  if (listDepth < listItemPos.depth) {
    return true;
  }
  return false;
};

// src/keymap/listHelpers/handleDelete.ts
var handleDelete = (editor, name) => {
  if (!index.isNodeActive(editor.state, name)) {
    return false;
  }
  if (!index.isAtEndOfNode(editor.state, name)) {
    return false;
  }
  const { selection } = editor.state;
  const { $from, $to } = selection;
  if (!selection.empty && $from.sameParent($to)) {
    return false;
  }
  if (nextListIsDeeper(name, editor.state)) {
    return editor.chain().focus(editor.state.selection.from + 4).lift(name).joinBackward().run();
  }
  if (nextListIsHigher(name, editor.state)) {
    return editor.chain().joinForward().joinBackward().run();
  }
  return editor.commands.joinItemForward();
};

// src/keymap/listHelpers/hasListItemAfter.ts
var hasListItemAfter = (typeOrName, state) => {
  var _a;
  const { $anchor } = state.selection;
  const $targetPos = state.doc.resolve($anchor.pos - $anchor.parentOffset - 2);
  if ($targetPos.index() === $targetPos.parent.childCount - 1) {
    return false;
  }
  if (((_a = $targetPos.nodeAfter) == null ? void 0 : _a.type.name) !== typeOrName) {
    return false;
  }
  return true;
};

// src/keymap/listHelpers/hasListItemBefore.ts
var hasListItemBefore = (typeOrName, state) => {
  var _a;
  const { $anchor } = state.selection;
  const $targetPos = state.doc.resolve($anchor.pos - 2);
  if ($targetPos.index() === 0) {
    return false;
  }
  if (((_a = $targetPos.nodeBefore) == null ? void 0 : _a.type.name) !== typeOrName) {
    return false;
  }
  return true;
};
var listItemHasSubList = (typeOrName, state, node) => {
  if (!node) {
    return false;
  }
  const nodeType = index.getNodeType(typeOrName, state.schema);
  let hasSubList = false;
  node.descendants((child) => {
    if (child.type === nodeType) {
      hasSubList = true;
    }
  });
  return hasSubList;
};

// src/keymap/list-keymap.ts
var ListKeymap = index.Extension.create({
  name: "listKeymap",
  addOptions() {
    return {
      listTypes: [
        {
          itemName: "listItem",
          wrapperNames: ["bulletList", "orderedList"]
        },
        {
          itemName: "taskItem",
          wrapperNames: ["taskList"]
        }
      ]
    };
  },
  addKeyboardShortcuts() {
    return {
      Delete: ({ editor }) => {
        let handled = false;
        this.options.listTypes.forEach(({ itemName }) => {
          if (editor.state.schema.nodes[itemName] === void 0) {
            return;
          }
          if (handleDelete(editor, itemName)) {
            handled = true;
          }
        });
        return handled;
      },
      "Mod-Delete": ({ editor }) => {
        let handled = false;
        this.options.listTypes.forEach(({ itemName }) => {
          if (editor.state.schema.nodes[itemName] === void 0) {
            return;
          }
          if (handleDelete(editor, itemName)) {
            handled = true;
          }
        });
        return handled;
      },
      Backspace: ({ editor }) => {
        let handled = false;
        this.options.listTypes.forEach(({ itemName, wrapperNames }) => {
          if (editor.state.schema.nodes[itemName] === void 0) {
            return;
          }
          if (handleBackspace(editor, itemName, wrapperNames)) {
            handled = true;
          }
        });
        return handled;
      },
      "Mod-Backspace": ({ editor }) => {
        let handled = false;
        this.options.listTypes.forEach(({ itemName, wrapperNames }) => {
          if (editor.state.schema.nodes[itemName] === void 0) {
            return;
          }
          if (handleBackspace(editor, itemName, wrapperNames)) {
            handled = true;
          }
        });
        return handled;
      }
    };
  }
});

// src/ordered-list/utils.ts
var ORDERED_LIST_ITEM_REGEX = /^(\s*)(\d+)\.\s+(.*)$/;
var INDENTED_LINE_REGEX = /^\s/;
function isBlockContentLine(line) {
  const trimmedLine = line.trimStart();
  return (
    // oxlint-disable-next-line prefer-string-starts-ends-with
    /^[-+*]\s+/.test(trimmedLine) || // oxlint-disable-next-line prefer-string-starts-ends-with
    /^\d+\.\s+/.test(trimmedLine) || // oxlint-disable-next-line prefer-string-starts-ends-with
    /^>\s?/.test(trimmedLine) || // oxlint-disable-next-line prefer-string-starts-ends-with
    /^```/.test(trimmedLine) || // oxlint-disable-next-line prefer-string-starts-ends-with
    /^~~~/.test(trimmedLine)
  );
}
function splitItemContent(contentLines) {
  const paragraphLines = [];
  const blockLines = [];
  let reachedBlockBoundary = false;
  contentLines.forEach((line) => {
    if (reachedBlockBoundary) {
      blockLines.push(line);
      return;
    }
    if (line.trim() === "") {
      reachedBlockBoundary = true;
      blockLines.push(line);
      return;
    }
    if (paragraphLines.length > 0 && isBlockContentLine(line)) {
      reachedBlockBoundary = true;
      blockLines.push(line);
      return;
    }
    paragraphLines.push(line);
  });
  return {
    paragraphLines,
    blockLines
  };
}
function collectOrderedListItems(lines) {
  const listItems = [];
  let currentLineIndex = 0;
  let consumed = 0;
  while (currentLineIndex < lines.length) {
    const line = lines[currentLineIndex];
    const match = line.match(ORDERED_LIST_ITEM_REGEX);
    if (!match) {
      break;
    }
    const [, indent, number, content] = match;
    const indentLevel = indent.length;
    const itemContentLines = [content];
    let nextLineIndex = currentLineIndex + 1;
    const itemLines = [line];
    let sawBlankLine = false;
    while (nextLineIndex < lines.length) {
      const nextLine = lines[nextLineIndex];
      const nextMatch = nextLine.match(ORDERED_LIST_ITEM_REGEX);
      if (nextMatch) {
        break;
      }
      if (nextLine.trim() === "") {
        itemLines.push(nextLine);
        itemContentLines.push("");
        sawBlankLine = true;
        nextLineIndex += 1;
      } else if (nextLine.match(INDENTED_LINE_REGEX)) {
        itemLines.push(nextLine);
        itemContentLines.push(nextLine.slice(indentLevel + 2));
        nextLineIndex += 1;
      } else {
        if (sawBlankLine) {
          break;
        }
        itemLines.push(nextLine);
        itemContentLines.push(nextLine);
        nextLineIndex += 1;
      }
    }
    listItems.push({
      indent: indentLevel,
      number: parseInt(number, 10),
      content: itemContentLines.join("\n").trim(),
      contentLines: itemContentLines,
      raw: itemLines.join("\n")
    });
    consumed = nextLineIndex;
    currentLineIndex = nextLineIndex;
  }
  return [listItems, consumed];
}
function buildNestedStructure(items, baseIndent, lexer) {
  const result = [];
  let currentIndex = 0;
  while (currentIndex < items.length) {
    const item = items[currentIndex];
    if (item.indent === baseIndent) {
      const { paragraphLines, blockLines } = splitItemContent(item.contentLines);
      const mainText = paragraphLines.join("\n").trim();
      const tokens = [];
      if (mainText) {
        tokens.push({
          type: "paragraph",
          raw: mainText,
          tokens: lexer.inlineTokens(mainText)
        });
      }
      const additionalContent = blockLines.join("\n").trim();
      if (additionalContent) {
        const blockTokens = lexer.blockTokens(additionalContent);
        tokens.push(...blockTokens);
      }
      let lookAheadIndex = currentIndex + 1;
      const nestedItems = [];
      while (lookAheadIndex < items.length && items[lookAheadIndex].indent > baseIndent) {
        nestedItems.push(items[lookAheadIndex]);
        lookAheadIndex += 1;
      }
      if (nestedItems.length > 0) {
        const nextIndent = Math.min(...nestedItems.map((nestedItem) => nestedItem.indent));
        const nestedListItems = buildNestedStructure(nestedItems, nextIndent, lexer);
        tokens.push({
          type: "list",
          ordered: true,
          start: nestedItems[0].number,
          items: nestedListItems,
          raw: nestedItems.map((nestedItem) => nestedItem.raw).join("\n")
        });
      }
      result.push({
        type: "list_item",
        raw: item.raw,
        tokens
      });
      currentIndex = lookAheadIndex;
    } else {
      currentIndex += 1;
    }
  }
  return result;
}
function parseListItems(items, helpers) {
  return items.map((item) => {
    if (item.type !== "list_item") {
      return helpers.parseChildren([item])[0];
    }
    const content = [];
    if (item.tokens && item.tokens.length > 0) {
      item.tokens.forEach((itemToken) => {
        if (itemToken.type === "paragraph" || itemToken.type === "list" || itemToken.type === "blockquote" || itemToken.type === "code") {
          content.push(...helpers.parseChildren([itemToken]));
        } else if (itemToken.type === "text" && itemToken.tokens) {
          const inlineContent = helpers.parseChildren([itemToken]);
          content.push({
            type: "paragraph",
            content: inlineContent
          });
        } else {
          const parsed = helpers.parseChildren([itemToken]);
          if (parsed.length > 0) {
            content.push(...parsed);
          }
        }
      });
    }
    return {
      type: "listItem",
      content
    };
  });
}

// src/ordered-list/ordered-list.ts
var ListItemName2 = "listItem";
var TextStyleName2 = "textStyle";
var orderedListInputRegex = /^(\d+)\.\s$/;
var OrderedList = index.Node3.create({
  name: "orderedList",
  addOptions() {
    return {
      itemTypeName: "listItem",
      HTMLAttributes: {},
      keepMarks: false,
      keepAttributes: false
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  addAttributes() {
    return {
      start: {
        default: 1,
        parseHTML: (element) => {
          return element.hasAttribute("start") ? parseInt(element.getAttribute("start") || "", 10) : 1;
        }
      },
      type: {
        default: null,
        parseHTML: (element) => element.getAttribute("type")
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: "ol"
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    const { start, ...attributesWithoutStart } = HTMLAttributes;
    return start === 1 ? ["ol", index.mergeAttributes(this.options.HTMLAttributes, attributesWithoutStart), 0] : ["ol", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  markdownTokenName: "list",
  parseMarkdown: (token, helpers) => {
    if (token.type !== "list" || !token.ordered) {
      return [];
    }
    const startValue = token.start || 1;
    const content = token.items ? parseListItems(token.items, helpers) : [];
    if (startValue !== 1) {
      return {
        type: "orderedList",
        attrs: { start: startValue },
        content
      };
    }
    return {
      type: "orderedList",
      content
    };
  },
  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }
    return h.renderChildren(node.content, "\n");
  },
  markdownTokenizer: {
    name: "orderedList",
    level: "block",
    start: (src) => {
      const match = src.match(/^(\s*)(\d+)\.\s+/);
      const index = match == null ? void 0 : match.index;
      return index !== void 0 ? index : -1;
    },
    tokenize: (src, _tokens, lexer) => {
      var _a;
      const lines = src.split("\n");
      const [listItems, consumed] = collectOrderedListItems(lines);
      if (listItems.length === 0) {
        return void 0;
      }
      const items = buildNestedStructure(listItems, 0, lexer);
      if (items.length === 0) {
        return void 0;
      }
      const startValue = ((_a = listItems[0]) == null ? void 0 : _a.number) || 1;
      return {
        type: "list",
        ordered: true,
        start: startValue,
        items,
        raw: lines.slice(0, consumed).join("\n")
      };
    }
  },
  markdownOptions: {
    indentsContent: true
  },
  addCommands() {
    return {
      toggleOrderedList: () => ({ commands, chain }) => {
        if (this.options.keepAttributes) {
          return chain().toggleList(this.name, this.options.itemTypeName, this.options.keepMarks).updateAttributes(ListItemName2, this.editor.getAttributes(TextStyleName2)).run();
        }
        return commands.toggleList(this.name, this.options.itemTypeName, this.options.keepMarks);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-7": () => this.editor.commands.toggleOrderedList()
    };
  },
  addInputRules() {
    let inputRule = index.wrappingInputRule({
      find: orderedListInputRegex,
      type: this.type,
      getAttributes: (match) => ({ start: +match[1] }),
      joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1]
    });
    if (this.options.keepMarks || this.options.keepAttributes) {
      inputRule = index.wrappingInputRule({
        find: orderedListInputRegex,
        type: this.type,
        keepMarks: this.options.keepMarks,
        keepAttributes: this.options.keepAttributes,
        getAttributes: (match) => ({ start: +match[1], ...this.editor.getAttributes(TextStyleName2) }),
        joinPredicate: (match, node) => node.childCount + node.attrs.start === +match[1],
        editor: this.editor
      });
    }
    return [inputRule];
  }
});
var inputRegex$2 = /^\s*(\[([( |x])?\])\s$/;
var TaskItem = index.Node3.create({
  name: "taskItem",
  addOptions() {
    return {
      nested: false,
      HTMLAttributes: {},
      taskListTypeName: "taskList",
      a11y: void 0
    };
  },
  content() {
    return this.options.nested ? "paragraph block*" : "paragraph+";
  },
  defining: true,
  addAttributes() {
    return {
      checked: {
        default: false,
        keepOnSplit: false,
        parseHTML: (element) => {
          const dataChecked = element.getAttribute("data-checked");
          return dataChecked === "" || dataChecked === "true";
        },
        renderHTML: (attributes) => ({
          "data-checked": attributes.checked
        })
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: `li[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ node, HTMLAttributes }) {
    return [
      "li",
      index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        "data-type": this.name
      }),
      [
        "label",
        [
          "input",
          {
            type: "checkbox",
            checked: node.attrs.checked ? "checked" : null
          }
        ],
        ["span"]
      ],
      ["div", 0]
    ];
  },
  parseMarkdown: (token, h) => {
    const content = [];
    if (token.tokens && token.tokens.length > 0) {
      content.push(h.createNode("paragraph", {}, h.parseInline(token.tokens)));
    } else if (token.text) {
      content.push(h.createNode("paragraph", {}, [h.createNode("text", { text: token.text })]));
    } else {
      content.push(h.createNode("paragraph", {}, []));
    }
    if (token.nestedTokens && token.nestedTokens.length > 0) {
      const nestedContent = h.parseChildren(token.nestedTokens);
      content.push(...nestedContent);
    }
    return h.createNode("taskItem", { checked: token.checked || false }, content);
  },
  renderMarkdown: (node, h) => {
    var _a;
    const checkedChar = ((_a = node.attrs) == null ? void 0 : _a.checked) ? "x" : " ";
    const prefix = `- [${checkedChar}] `;
    return index.renderNestedMarkdownContent(node, h, prefix);
  },
  addExtensions() {
    if (!this.options.nested) {
      return [];
    }
    return [createBranchingListDeleteKeymap(this.name, [this.options.taskListTypeName])];
  },
  addKeyboardShortcuts() {
    const shortcuts = {
      Enter: () => this.editor.commands.splitListItem(this.name),
      "Shift-Tab": () => this.editor.commands.liftListItem(this.name)
    };
    if (!this.options.nested) {
      return shortcuts;
    }
    return {
      ...shortcuts,
      Tab: () => this.editor.commands.sinkListItem(this.name)
    };
  },
  addNodeView() {
    return ({ node, HTMLAttributes, getPos, editor }) => {
      const listItem = document.createElement("li");
      const checkboxWrapper = document.createElement("label");
      const checkboxStyler = document.createElement("span");
      const checkbox = document.createElement("input");
      const content = document.createElement("div");
      const updateA11Y = (currentNode) => {
        var _a, _b;
        checkbox.ariaLabel = ((_b = (_a = this.options.a11y) == null ? void 0 : _a.checkboxLabel) == null ? void 0 : _b.call(_a, currentNode, checkbox.checked)) || `Task item checkbox for ${currentNode.textContent || "empty task item"}`;
      };
      updateA11Y(node);
      checkboxWrapper.contentEditable = "false";
      checkbox.type = "checkbox";
      checkbox.addEventListener("mousedown", (event) => event.preventDefault());
      checkbox.addEventListener("change", (event) => {
        if (!editor.isEditable && !this.options.onReadOnlyChecked) {
          checkbox.checked = !checkbox.checked;
          return;
        }
        const { checked } = event.target;
        if (editor.isEditable && typeof getPos === "function") {
          editor.chain().focus(void 0, { scrollIntoView: false }).command(({ tr }) => {
            const position = getPos();
            if (typeof position !== "number") {
              return false;
            }
            const currentNode = tr.doc.nodeAt(position);
            tr.setNodeMarkup(position, void 0, {
              ...currentNode == null ? void 0 : currentNode.attrs,
              checked
            });
            return true;
          }).run();
        }
        if (!editor.isEditable && this.options.onReadOnlyChecked) {
          if (!this.options.onReadOnlyChecked(node, checked)) {
            checkbox.checked = !checkbox.checked;
          }
        }
      });
      Object.entries(this.options.HTMLAttributes).forEach(([key, value]) => {
        listItem.setAttribute(key, value);
      });
      listItem.dataset.checked = node.attrs.checked;
      checkbox.checked = node.attrs.checked;
      checkboxWrapper.append(checkbox, checkboxStyler);
      listItem.append(checkboxWrapper, content);
      Object.entries(HTMLAttributes).forEach(([key, value]) => {
        listItem.setAttribute(key, value);
      });
      let prevRenderedAttributeKeys = new Set(Object.keys(HTMLAttributes));
      return {
        dom: listItem,
        contentDOM: content,
        update: (updatedNode) => {
          if (updatedNode.type !== this.type) {
            return false;
          }
          listItem.dataset.checked = updatedNode.attrs.checked;
          checkbox.checked = updatedNode.attrs.checked;
          updateA11Y(updatedNode);
          const extensionAttributes = editor.extensionManager.attributes;
          const newHTMLAttributes = index.getRenderedAttributes(updatedNode, extensionAttributes);
          const newKeys = new Set(Object.keys(newHTMLAttributes));
          const staticAttrs = this.options.HTMLAttributes;
          prevRenderedAttributeKeys.forEach((key) => {
            if (!newKeys.has(key)) {
              if (key in staticAttrs) {
                listItem.setAttribute(key, staticAttrs[key]);
              } else {
                listItem.removeAttribute(key);
              }
            }
          });
          Object.entries(newHTMLAttributes).forEach(([key, value]) => {
            if (value === null || value === void 0) {
              if (key in staticAttrs) {
                listItem.setAttribute(key, staticAttrs[key]);
              } else {
                listItem.removeAttribute(key);
              }
            } else {
              listItem.setAttribute(key, value);
            }
          });
          prevRenderedAttributeKeys = newKeys;
          return true;
        }
      };
    };
  },
  addInputRules() {
    return [
      index.wrappingInputRule({
        find: inputRegex$2,
        type: this.type,
        getAttributes: (match) => ({
          checked: match[match.length - 1] === "x"
        })
      })
    ];
  }
});
var TaskList = index.Node3.create({
  name: "taskList",
  addOptions() {
    return {
      itemTypeName: "taskItem",
      HTMLAttributes: {}
    };
  },
  group: "block list",
  content() {
    return `${this.options.itemTypeName}+`;
  },
  parseHTML() {
    return [
      {
        tag: `ul[data-type="${this.name}"]`,
        priority: 51
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      "ul",
      index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, { "data-type": this.name }),
      0
    ];
  },
  parseMarkdown: (token, h) => {
    return h.createNode("taskList", {}, h.parseChildren(token.items || []));
  },
  renderMarkdown: (node, h) => {
    if (!node.content) {
      return "";
    }
    return h.renderChildren(node.content, "\n");
  },
  markdownTokenizer: {
    name: "taskList",
    level: "block",
    start(src) {
      var _a;
      const index = (_a = src.match(/^\s*[-+*]\s+\[([ xX])\]\s+/)) == null ? void 0 : _a.index;
      return index !== void 0 ? index : -1;
    },
    tokenize(src, tokens, lexer) {
      const parseTaskListContent = (content) => {
        const nestedResult = index.parseIndentedBlocks(
          content,
          {
            itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
            extractItemData: (match) => ({
              indentLevel: match[1].length,
              mainContent: match[4],
              checked: match[3].toLowerCase() === "x"
            }),
            createToken: (data, nestedTokens) => ({
              type: "taskItem",
              raw: "",
              mainContent: data.mainContent,
              indentLevel: data.indentLevel,
              checked: data.checked,
              text: data.mainContent,
              tokens: lexer.inlineTokens(data.mainContent),
              nestedTokens
            }),
            // Allow recursive nesting
            customNestedParser: parseTaskListContent
          },
          lexer
        );
        if (nestedResult) {
          return [
            {
              type: "taskList",
              raw: nestedResult.raw,
              items: nestedResult.items
            }
          ];
        }
        return lexer.blockTokens(content);
      };
      const result = index.parseIndentedBlocks(
        src,
        {
          itemPattern: /^(\s*)([-+*])\s+\[([ xX])\]\s+(.*)$/,
          extractItemData: (match) => ({
            indentLevel: match[1].length,
            mainContent: match[4],
            checked: match[3].toLowerCase() === "x"
          }),
          createToken: (data, nestedTokens) => ({
            type: "taskItem",
            raw: "",
            mainContent: data.mainContent,
            indentLevel: data.indentLevel,
            checked: data.checked,
            text: data.mainContent,
            tokens: lexer.inlineTokens(data.mainContent),
            nestedTokens
          }),
          // Use the recursive parser for nested content
          customNestedParser: parseTaskListContent
        },
        lexer
      );
      if (!result) {
        return void 0;
      }
      return {
        type: "taskList",
        raw: result.raw,
        items: result.items
      };
    }
  },
  markdownOptions: {
    indentsContent: true
  },
  addCommands() {
    return {
      toggleTaskList: () => ({ commands }) => {
        return commands.toggleList(this.name, this.options.itemTypeName);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-9": () => this.editor.commands.toggleTaskList()
    };
  }
});

// src/kit/index.ts
index.Extension.create({
  name: "listKit",
  addExtensions() {
    const extensions = [];
    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options.bulletList));
    }
    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem));
    }
    if (this.options.listKeymap !== false) {
      extensions.push(ListKeymap.configure(this.options.listKeymap));
    }
    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options.orderedList));
    }
    if (this.options.taskItem !== false) {
      extensions.push(TaskItem.configure(this.options.taskItem));
    }
    if (this.options.taskList !== false) {
      extensions.push(TaskList.configure(this.options.taskList));
    }
    return extensions;
  }
});

// src/paragraph.ts
var EMPTY_PARAGRAPH_MARKDOWN = "&nbsp;";
var NBSP_CHAR = "\xA0";
var Paragraph = index.Node3.create({
  name: "paragraph",
  priority: 1e3,
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  group: "block",
  content: "inline*",
  parseHTML() {
    return [{ tag: "p" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["p", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  parseMarkdown: (token, helpers) => {
    const tokens = token.tokens || [];
    if (tokens.length === 1 && tokens[0].type === "image") {
      return helpers.parseChildren([tokens[0]]);
    }
    const content = helpers.parseInline(tokens);
    const hasExplicitEmptyParagraphMarker = tokens.length === 1 && tokens[0].type === "text" && (tokens[0].raw === EMPTY_PARAGRAPH_MARKDOWN || tokens[0].text === EMPTY_PARAGRAPH_MARKDOWN || tokens[0].raw === NBSP_CHAR || tokens[0].text === NBSP_CHAR);
    if (hasExplicitEmptyParagraphMarker && content.length === 1 && content[0].type === "text" && (content[0].text === EMPTY_PARAGRAPH_MARKDOWN || content[0].text === NBSP_CHAR)) {
      return helpers.createNode("paragraph", void 0, []);
    }
    return helpers.createNode("paragraph", void 0, content);
  },
  renderMarkdown: (node, h, ctx) => {
    var _a, _b;
    if (!node) {
      return "";
    }
    const content = Array.isArray(node.content) ? node.content : [];
    if (content.length === 0) {
      const previousContent = Array.isArray((_a = ctx == null ? void 0 : ctx.previousNode) == null ? void 0 : _a.content) ? ctx.previousNode.content : [];
      const previousNodeIsEmptyParagraph = ((_b = ctx == null ? void 0 : ctx.previousNode) == null ? void 0 : _b.type) === "paragraph" && previousContent.length === 0;
      return previousNodeIsEmptyParagraph ? EMPTY_PARAGRAPH_MARKDOWN : "";
    }
    return h.renderChildren(content);
  },
  addCommands() {
    return {
      setParagraph: () => ({ commands }) => {
        return commands.setNode(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Alt-0": () => this.editor.commands.setParagraph()
    };
  }
});

// src/strike.ts
var inputRegex$1 = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))$/;
var pasteRegex = /(?:^|\s)(~~(?!\s+~~)((?:[^~]+))~~(?!\s+~~))/g;
var Strike = index.Mark.create({
  name: "strike",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "s"
      },
      {
        tag: "del"
      },
      {
        tag: "strike"
      },
      {
        style: "text-decoration",
        consuming: false,
        getAttrs: (style) => style.includes("line-through") ? {} : false
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["s", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  markdownTokenName: "del",
  parseMarkdown: (token, helpers) => {
    return helpers.applyMark("strike", helpers.parseInline(token.tokens || []));
  },
  renderMarkdown: (node, h) => {
    return `~~${h.renderChildren(node)}~~`;
  },
  addCommands() {
    return {
      setStrike: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleStrike: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetStrike: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-s": () => this.editor.commands.toggleStrike()
    };
  },
  addInputRules() {
    return [
      index.markInputRule({
        find: inputRegex$1,
        type: this.type
      })
    ];
  },
  addPasteRules() {
    return [
      index.markPasteRule({
        find: pasteRegex,
        type: this.type
      })
    ];
  }
});

// src/text.ts
var Text = index.Node3.create({
  name: "text",
  group: "inline",
  parseMarkdown: (token) => {
    return {
      type: "text",
      text: token.text || ""
    };
  },
  renderMarkdown: (node) => node.text || ""
});

// src/underline.ts
var Underline = index.Mark.create({
  name: "underline",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  parseHTML() {
    return [
      {
        tag: "u"
      },
      {
        style: "text-decoration",
        consuming: false,
        getAttrs: (style) => style.includes("underline") ? {} : false
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["u", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  parseMarkdown(token, helpers) {
    return helpers.applyMark(this.name || "underline", helpers.parseInline(token.tokens || []));
  },
  renderMarkdown(node, helpers) {
    return `++${helpers.renderChildren(node)}++`;
  },
  markdownTokenizer: {
    name: "underline",
    level: "inline",
    start(src) {
      return src.indexOf("++");
    },
    tokenize(src, _tokens, lexer) {
      const rule = /^(\+\+)([\s\S]+?)(\+\+)/;
      const match = rule.exec(src);
      if (!match) {
        return void 0;
      }
      const innerContent = match[2].trim();
      return {
        type: "underline",
        raw: match[0],
        text: innerContent,
        tokens: lexer.inlineTokens(innerContent)
      };
    }
  },
  addCommands() {
    return {
      setUnderline: () => ({ commands }) => {
        return commands.setMark(this.name);
      },
      toggleUnderline: () => ({ commands }) => {
        return commands.toggleMark(this.name);
      },
      unsetUnderline: () => ({ commands }) => {
        return commands.unsetMark(this.name);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-u": () => this.editor.commands.toggleUnderline(),
      "Mod-U": () => this.editor.commands.toggleUnderline()
    };
  }
});

// src/index.ts
var index_default$c = Underline;

/**
Create a plugin that, when added to a ProseMirror instance,
causes a decoration to show up at the drop position when something
is dragged over the editor.

Nodes may add a `disableDropCursor` property to their spec to
control the showing of a drop cursor inside them. This may be a
boolean or a function, which will be called with a view and a
position, and should return a boolean.
*/
function dropCursor(options = {}) {
    return new index.Plugin({
        view(editorView) { return new DropCursorView(editorView, options); }
    });
}
class DropCursorView {
    constructor(editorView, options) {
        var _a;
        this.editorView = editorView;
        this.cursorPos = null;
        this.element = null;
        this.timeout = -1;
        this.width = (_a = options.width) !== null && _a !== void 0 ? _a : 1;
        this.color = options.color === false ? undefined : (options.color || "black");
        this.class = options.class;
        this.handlers = ["dragover", "dragend", "drop", "dragleave"].map(name => {
            let handler = (e) => { this[name](e); };
            editorView.dom.addEventListener(name, handler);
            return { name, handler };
        });
    }
    destroy() {
        this.handlers.forEach(({ name, handler }) => this.editorView.dom.removeEventListener(name, handler));
    }
    update(editorView, prevState) {
        if (this.cursorPos != null && prevState.doc != editorView.state.doc) {
            if (this.cursorPos > editorView.state.doc.content.size)
                this.setCursor(null);
            else
                this.updateOverlay();
        }
    }
    setCursor(pos) {
        if (pos == this.cursorPos)
            return;
        this.cursorPos = pos;
        if (pos == null) {
            this.element.parentNode.removeChild(this.element);
            this.element = null;
        }
        else {
            this.updateOverlay();
        }
    }
    updateOverlay() {
        let $pos = this.editorView.state.doc.resolve(this.cursorPos);
        let isBlock = !$pos.parent.inlineContent, rect;
        let editorDOM = this.editorView.dom, editorRect = editorDOM.getBoundingClientRect();
        let scaleX = editorRect.width / editorDOM.offsetWidth, scaleY = editorRect.height / editorDOM.offsetHeight;
        if (isBlock) {
            let before = $pos.nodeBefore, after = $pos.nodeAfter;
            if (before || after) {
                let node = this.editorView.nodeDOM(this.cursorPos - (before ? before.nodeSize : 0));
                if (node) {
                    let nodeRect = node.getBoundingClientRect();
                    let top = before ? nodeRect.bottom : nodeRect.top;
                    if (before && after)
                        top = (top + this.editorView.nodeDOM(this.cursorPos).getBoundingClientRect().top) / 2;
                    let halfWidth = (this.width / 2) * scaleY;
                    rect = { left: nodeRect.left, right: nodeRect.right, top: top - halfWidth, bottom: top + halfWidth };
                }
            }
        }
        if (!rect) {
            let coords = this.editorView.coordsAtPos(this.cursorPos);
            let halfWidth = (this.width / 2) * scaleX;
            rect = { left: coords.left - halfWidth, right: coords.left + halfWidth, top: coords.top, bottom: coords.bottom };
        }
        let parent = this.editorView.dom.offsetParent;
        if (!this.element) {
            this.element = parent.appendChild(document.createElement("div"));
            if (this.class)
                this.element.className = this.class;
            this.element.style.cssText = "position: absolute; z-index: 50; pointer-events: none;";
            if (this.color) {
                this.element.style.backgroundColor = this.color;
            }
        }
        this.element.classList.toggle("prosemirror-dropcursor-block", isBlock);
        this.element.classList.toggle("prosemirror-dropcursor-inline", !isBlock);
        let parentLeft, parentTop;
        if (!parent || parent == document.body && getComputedStyle(parent).position == "static") {
            parentLeft = -pageXOffset;
            parentTop = -pageYOffset;
        }
        else {
            let rect = parent.getBoundingClientRect();
            let parentScaleX = rect.width / parent.offsetWidth, parentScaleY = rect.height / parent.offsetHeight;
            parentLeft = rect.left - parent.scrollLeft * parentScaleX;
            parentTop = rect.top - parent.scrollTop * parentScaleY;
        }
        this.element.style.left = (rect.left - parentLeft) / scaleX + "px";
        this.element.style.top = (rect.top - parentTop) / scaleY + "px";
        this.element.style.width = (rect.right - rect.left) / scaleX + "px";
        this.element.style.height = (rect.bottom - rect.top) / scaleY + "px";
    }
    scheduleRemoval(timeout) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => this.setCursor(null), timeout);
    }
    dragover(event) {
        if (!this.editorView.editable)
            return;
        let pos = this.editorView.posAtCoords({ left: event.clientX, top: event.clientY });
        let node = pos && pos.inside >= 0 && this.editorView.state.doc.nodeAt(pos.inside);
        let disableDropCursor = node && node.type.spec.disableDropCursor;
        let disabled = typeof disableDropCursor == "function"
            ? disableDropCursor(this.editorView, pos, event)
            : disableDropCursor;
        if (pos && !disabled) {
            let target = pos.pos;
            if (this.editorView.dragging && this.editorView.dragging.slice) {
                let point = index.dropPoint(this.editorView.state.doc, target, this.editorView.dragging.slice);
                if (point != null)
                    target = point;
            }
            this.setCursor(target);
            this.scheduleRemoval(5000);
        }
    }
    dragend() {
        this.scheduleRemoval(20);
    }
    drop() {
        this.scheduleRemoval(20);
    }
    dragleave(event) {
        if (!this.editorView.dom.contains(event.relatedTarget))
            this.setCursor(null);
    }
}

/**
Gap cursor selections are represented using this class. Its
`$anchor` and `$head` properties both point at the cursor position.
*/
class GapCursor extends index.Selection {
    /**
    Create a gap cursor.
    */
    constructor($pos) {
        super($pos, $pos);
    }
    map(doc, mapping) {
        let $pos = doc.resolve(mapping.map(this.head));
        return GapCursor.valid($pos) ? new GapCursor($pos) : index.Selection.near($pos);
    }
    content() { return index.Slice.empty; }
    eq(other) {
        return other instanceof GapCursor && other.head == this.head;
    }
    toJSON() {
        return { type: "gapcursor", pos: this.head };
    }
    /**
    @internal
    */
    static fromJSON(doc, json) {
        if (typeof json.pos != "number")
            throw new RangeError("Invalid input for GapCursor.fromJSON");
        return new GapCursor(doc.resolve(json.pos));
    }
    /**
    @internal
    */
    getBookmark() { return new GapBookmark(this.anchor); }
    /**
    @internal
    */
    static valid($pos) {
        let parent = $pos.parent;
        if (parent.inlineContent || !closedBefore($pos) || !closedAfter($pos))
            return false;
        let override = parent.type.spec.allowGapCursor;
        if (override != null)
            return override;
        let deflt = parent.contentMatchAt($pos.index()).defaultType;
        return deflt && deflt.isTextblock;
    }
    /**
    @internal
    */
    static findGapCursorFrom($pos, dir, mustMove = false) {
        search: for (;;) {
            if (!mustMove && GapCursor.valid($pos))
                return $pos;
            let pos = $pos.pos, next = null;
            // Scan up from this position
            for (let d = $pos.depth;; d--) {
                let parent = $pos.node(d);
                if (dir > 0 ? $pos.indexAfter(d) < parent.childCount : $pos.index(d) > 0) {
                    next = parent.child(dir > 0 ? $pos.indexAfter(d) : $pos.index(d) - 1);
                    break;
                }
                else if (d == 0) {
                    return null;
                }
                pos += dir;
                let $cur = $pos.doc.resolve(pos);
                if (GapCursor.valid($cur))
                    return $cur;
            }
            // And then down into the next node
            for (;;) {
                let inside = dir > 0 ? next.firstChild : next.lastChild;
                if (!inside) {
                    if (next.isAtom && !next.isText && !index.NodeSelection.isSelectable(next)) {
                        $pos = $pos.doc.resolve(pos + next.nodeSize * dir);
                        mustMove = false;
                        continue search;
                    }
                    break;
                }
                next = inside;
                pos += dir;
                let $cur = $pos.doc.resolve(pos);
                if (GapCursor.valid($cur))
                    return $cur;
            }
            return null;
        }
    }
}
GapCursor.prototype.visible = false;
GapCursor.findFrom = GapCursor.findGapCursorFrom;
index.Selection.jsonID("gapcursor", GapCursor);
class GapBookmark {
    constructor(pos) {
        this.pos = pos;
    }
    map(mapping) {
        return new GapBookmark(mapping.map(this.pos));
    }
    resolve(doc) {
        let $pos = doc.resolve(this.pos);
        return GapCursor.valid($pos) ? new GapCursor($pos) : index.Selection.near($pos);
    }
}
function needsGap(type) {
    return type.isAtom || type.spec.isolating || type.spec.createGapCursor;
}
function closedBefore($pos) {
    for (let d = $pos.depth; d >= 0; d--) {
        let index = $pos.index(d), parent = $pos.node(d);
        // At the start of this parent, look at next one
        if (index == 0) {
            if (parent.type.spec.isolating)
                return true;
            continue;
        }
        // See if the node before (or its first ancestor) is closed
        for (let before = parent.child(index - 1);; before = before.lastChild) {
            if ((before.childCount == 0 && !before.inlineContent) || needsGap(before.type))
                return true;
            if (before.inlineContent)
                return false;
        }
    }
    // Hit start of document
    return true;
}
function closedAfter($pos) {
    for (let d = $pos.depth; d >= 0; d--) {
        let index = $pos.indexAfter(d), parent = $pos.node(d);
        if (index == parent.childCount) {
            if (parent.type.spec.isolating)
                return true;
            continue;
        }
        for (let after = parent.child(index);; after = after.firstChild) {
            if ((after.childCount == 0 && !after.inlineContent) || needsGap(after.type))
                return true;
            if (after.inlineContent)
                return false;
        }
    }
    return true;
}

/**
Create a gap cursor plugin. When enabled, this will capture clicks
near and arrow-key-motion past places that don't have a normally
selectable position nearby, and create a gap cursor selection for
them. The cursor is drawn as an element with class
`ProseMirror-gapcursor`. You can either include
`style/gapcursor.css` from the package's directory or add your own
styles to make it visible.
*/
function gapCursor() {
    return new index.Plugin({
        props: {
            decorations: drawGapCursor,
            createSelectionBetween(_view, $anchor, $head) {
                return $anchor.pos == $head.pos && GapCursor.valid($head) ? new GapCursor($head) : null;
            },
            handleClick,
            handleKeyDown: handleKeyDown$1,
            handleDOMEvents: { beforeinput: beforeinput }
        }
    });
}
const handleKeyDown$1 = index.keydownHandler({
    "ArrowLeft": arrow$1("horiz", -1),
    "ArrowRight": arrow$1("horiz", 1),
    "ArrowUp": arrow$1("vert", -1),
    "ArrowDown": arrow$1("vert", 1)
});
function arrow$1(axis, dir) {
    const dirStr = axis == "vert" ? (dir > 0 ? "down" : "up") : (dir > 0 ? "right" : "left");
    return function (state, dispatch, view) {
        let sel = state.selection;
        let $start = dir > 0 ? sel.$to : sel.$from, mustMove = sel.empty;
        if (sel instanceof index.TextSelection) {
            if (!view.endOfTextblock(dirStr) || $start.depth == 0)
                return false;
            mustMove = false;
            $start = state.doc.resolve(dir > 0 ? $start.after() : $start.before());
        }
        let $found = GapCursor.findGapCursorFrom($start, dir, mustMove);
        if (!$found)
            return false;
        if (dispatch)
            dispatch(state.tr.setSelection(new GapCursor($found)));
        return true;
    };
}
function handleClick(view, pos, event) {
    if (!view || !view.editable)
        return false;
    let $pos = view.state.doc.resolve(pos);
    if (!GapCursor.valid($pos))
        return false;
    let clickPos = view.posAtCoords({ left: event.clientX, top: event.clientY });
    if (clickPos && clickPos.inside > -1 && index.NodeSelection.isSelectable(view.state.doc.nodeAt(clickPos.inside)))
        return false;
    view.dispatch(view.state.tr.setSelection(new GapCursor($pos)));
    return true;
}
// This is a hack that, when a composition starts while a gap cursor
// is active, quickly creates an inline context for the composition to
// happen in, to avoid it being aborted by the DOM selection being
// moved into a valid position.
function beforeinput(view, event) {
    if (event.inputType != "insertCompositionText" || !(view.state.selection instanceof GapCursor))
        return false;
    let { $from } = view.state.selection;
    let insert = $from.parent.contentMatchAt($from.index()).findWrapping(view.state.schema.nodes.text);
    if (!insert)
        return false;
    let frag = index.Fragment.empty;
    for (let i = insert.length - 1; i >= 0; i--)
        frag = index.Fragment.from(insert[i].createAndFill(null, frag));
    let tr = view.state.tr.replace($from.pos, $from.pos, new index.Slice(frag, 0, 0));
    tr.setSelection(index.TextSelection.near(tr.doc.resolve($from.pos + 1)));
    view.dispatch(tr);
    return false;
}
function drawGapCursor(state) {
    if (!(state.selection instanceof GapCursor))
        return null;
    let node = document.createElement("div");
    node.className = "ProseMirror-gapcursor";
    return index.DecorationSet.create(state.doc, [index.Decoration.widget(state.selection.head, node, { key: "gapcursor" })]);
}

var GOOD_LEAF_SIZE = 200;

// :: class<T> A rope sequence is a persistent sequence data structure
// that supports appending, prepending, and slicing without doing a
// full copy. It is represented as a mostly-balanced tree.
var RopeSequence = function RopeSequence () {};

RopeSequence.prototype.append = function append (other) {
  if (!other.length) { return this }
  other = RopeSequence.from(other);

  return (!this.length && other) ||
    (other.length < GOOD_LEAF_SIZE && this.leafAppend(other)) ||
    (this.length < GOOD_LEAF_SIZE && other.leafPrepend(this)) ||
    this.appendInner(other)
};

// :: (union<[T], RopeSequence<T>>) → RopeSequence<T>
// Prepend an array or other rope to this one, returning a new rope.
RopeSequence.prototype.prepend = function prepend (other) {
  if (!other.length) { return this }
  return RopeSequence.from(other).append(this)
};

RopeSequence.prototype.appendInner = function appendInner (other) {
  return new Append(this, other)
};

// :: (?number, ?number) → RopeSequence<T>
// Create a rope repesenting a sub-sequence of this rope.
RopeSequence.prototype.slice = function slice (from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from >= to) { return RopeSequence.empty }
  return this.sliceInner(Math.max(0, from), Math.min(this.length, to))
};

// :: (number) → T
// Retrieve the element at the given position from this rope.
RopeSequence.prototype.get = function get (i) {
  if (i < 0 || i >= this.length) { return undefined }
  return this.getInner(i)
};

// :: ((element: T, index: number) → ?bool, ?number, ?number)
// Call the given function for each element between the given
// indices. This tends to be more efficient than looping over the
// indices and calling `get`, because it doesn't have to descend the
// tree for every element.
RopeSequence.prototype.forEach = function forEach (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  if (from <= to)
    { this.forEachInner(f, from, to, 0); }
  else
    { this.forEachInvertedInner(f, from, to, 0); }
};

// :: ((element: T, index: number) → U, ?number, ?number) → [U]
// Map the given functions over the elements of the rope, producing
// a flat array.
RopeSequence.prototype.map = function map (f, from, to) {
    if ( from === void 0 ) from = 0;
    if ( to === void 0 ) to = this.length;

  var result = [];
  this.forEach(function (elt, i) { return result.push(f(elt, i)); }, from, to);
  return result
};

// :: (?union<[T], RopeSequence<T>>) → RopeSequence<T>
// Create a rope representing the given array, or return the rope
// itself if a rope was given.
RopeSequence.from = function from (values) {
  if (values instanceof RopeSequence) { return values }
  return values && values.length ? new Leaf(values) : RopeSequence.empty
};

var Leaf = /*@__PURE__*/(function (RopeSequence) {
  function Leaf(values) {
    RopeSequence.call(this);
    this.values = values;
  }

  if ( RopeSequence ) Leaf.__proto__ = RopeSequence;
  Leaf.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Leaf.prototype.constructor = Leaf;

  var prototypeAccessors = { length: { configurable: true },depth: { configurable: true } };

  Leaf.prototype.flatten = function flatten () {
    return this.values
  };

  Leaf.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    return new Leaf(this.values.slice(from, to))
  };

  Leaf.prototype.getInner = function getInner (i) {
    return this.values[i]
  };

  Leaf.prototype.forEachInner = function forEachInner (f, from, to, start) {
    for (var i = from; i < to; i++)
      { if (f(this.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    for (var i = from - 1; i >= to; i--)
      { if (f(this.values[i], start + i) === false) { return false } }
  };

  Leaf.prototype.leafAppend = function leafAppend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(this.values.concat(other.flatten())) }
  };

  Leaf.prototype.leafPrepend = function leafPrepend (other) {
    if (this.length + other.length <= GOOD_LEAF_SIZE)
      { return new Leaf(other.flatten().concat(this.values)) }
  };

  prototypeAccessors.length.get = function () { return this.values.length };

  prototypeAccessors.depth.get = function () { return 0 };

  Object.defineProperties( Leaf.prototype, prototypeAccessors );

  return Leaf;
}(RopeSequence));

// :: RopeSequence
// The empty rope sequence.
RopeSequence.empty = new Leaf([]);

var Append = /*@__PURE__*/(function (RopeSequence) {
  function Append(left, right) {
    RopeSequence.call(this);
    this.left = left;
    this.right = right;
    this.length = left.length + right.length;
    this.depth = Math.max(left.depth, right.depth) + 1;
  }

  if ( RopeSequence ) Append.__proto__ = RopeSequence;
  Append.prototype = Object.create( RopeSequence && RopeSequence.prototype );
  Append.prototype.constructor = Append;

  Append.prototype.flatten = function flatten () {
    return this.left.flatten().concat(this.right.flatten())
  };

  Append.prototype.getInner = function getInner (i) {
    return i < this.left.length ? this.left.get(i) : this.right.get(i - this.left.length)
  };

  Append.prototype.forEachInner = function forEachInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from < leftLen &&
        this.left.forEachInner(f, from, Math.min(to, leftLen), start) === false)
      { return false }
    if (to > leftLen &&
        this.right.forEachInner(f, Math.max(from - leftLen, 0), Math.min(this.length, to) - leftLen, start + leftLen) === false)
      { return false }
  };

  Append.prototype.forEachInvertedInner = function forEachInvertedInner (f, from, to, start) {
    var leftLen = this.left.length;
    if (from > leftLen &&
        this.right.forEachInvertedInner(f, from - leftLen, Math.max(to, leftLen) - leftLen, start + leftLen) === false)
      { return false }
    if (to < leftLen &&
        this.left.forEachInvertedInner(f, Math.min(from, leftLen), to, start) === false)
      { return false }
  };

  Append.prototype.sliceInner = function sliceInner (from, to) {
    if (from == 0 && to == this.length) { return this }
    var leftLen = this.left.length;
    if (to <= leftLen) { return this.left.slice(from, to) }
    if (from >= leftLen) { return this.right.slice(from - leftLen, to - leftLen) }
    return this.left.slice(from, leftLen).append(this.right.slice(0, to - leftLen))
  };

  Append.prototype.leafAppend = function leafAppend (other) {
    var inner = this.right.leafAppend(other);
    if (inner) { return new Append(this.left, inner) }
  };

  Append.prototype.leafPrepend = function leafPrepend (other) {
    var inner = this.left.leafPrepend(other);
    if (inner) { return new Append(inner, this.right) }
  };

  Append.prototype.appendInner = function appendInner (other) {
    if (this.left.depth >= Math.max(this.right.depth, other.depth) + 1)
      { return new Append(this.left, new Append(this.right, other)) }
    return new Append(this, other)
  };

  return Append;
}(RopeSequence));

// ProseMirror's history isn't simply a way to roll back to a previous
// state, because ProseMirror supports applying changes without adding
// them to the history (for example during collaboration).
//
// To this end, each 'Branch' (one for the undo history and one for
// the redo history) keeps an array of 'Items', which can optionally
// hold a step (an actual undoable change), and always hold a position
// map (which is needed to move changes below them to apply to the
// current document).
//
// An item that has both a step and a selection bookmark is the start
// of an 'event' — a group of changes that will be undone or redone at
// once. (It stores only the bookmark, since that way we don't have to
// provide a document until the selection is actually applied, which
// is useful when compressing.)
// Used to schedule history compression
const max_empty_items = 500;
class Branch {
    constructor(items, eventCount) {
        this.items = items;
        this.eventCount = eventCount;
    }
    // Pop the latest event off the branch's history and apply it
    // to a document transform.
    popEvent(state, preserveItems) {
        if (this.eventCount == 0)
            return null;
        let end = this.items.length;
        for (;; end--) {
            let next = this.items.get(end - 1);
            if (next.selection) {
                --end;
                break;
            }
        }
        let remap, mapFrom;
        if (preserveItems) {
            remap = this.remapping(end, this.items.length);
            mapFrom = remap.maps.length;
        }
        let transform = state.tr;
        let selection, remaining;
        let addAfter = [], addBefore = [];
        this.items.forEach((item, i) => {
            if (!item.step) {
                if (!remap) {
                    remap = this.remapping(end, i + 1);
                    mapFrom = remap.maps.length;
                }
                mapFrom--;
                addBefore.push(item);
                return;
            }
            if (remap) {
                addBefore.push(new Item(item.map));
                let step = item.step.map(remap.slice(mapFrom)), map;
                if (step && transform.maybeStep(step).doc) {
                    map = transform.mapping.maps[transform.mapping.maps.length - 1];
                    addAfter.push(new Item(map, undefined, undefined, addAfter.length + addBefore.length));
                }
                mapFrom--;
                if (map)
                    remap.appendMap(map, mapFrom);
            }
            else {
                transform.maybeStep(item.step);
            }
            if (item.selection) {
                selection = remap ? item.selection.map(remap.slice(mapFrom)) : item.selection;
                remaining = new Branch(this.items.slice(0, end).append(addBefore.reverse().concat(addAfter)), this.eventCount - 1);
                return false;
            }
        }, this.items.length, 0);
        return { remaining: remaining, transform, selection: selection };
    }
    // Create a new branch with the given transform added.
    addTransform(transform, selection, histOptions, preserveItems) {
        let newItems = [], eventCount = this.eventCount;
        let oldItems = this.items, lastItem = !preserveItems && oldItems.length ? oldItems.get(oldItems.length - 1) : null;
        for (let i = 0; i < transform.steps.length; i++) {
            let step = transform.steps[i].invert(transform.docs[i]);
            let item = new Item(transform.mapping.maps[i], step, selection), merged;
            if (merged = lastItem && lastItem.merge(item)) {
                item = merged;
                if (i)
                    newItems.pop();
                else
                    oldItems = oldItems.slice(0, oldItems.length - 1);
            }
            newItems.push(item);
            if (selection) {
                eventCount++;
                selection = undefined;
            }
            if (!preserveItems)
                lastItem = item;
        }
        let overflow = eventCount - histOptions.depth;
        if (overflow > DEPTH_OVERFLOW) {
            oldItems = cutOffEvents(oldItems, overflow);
            eventCount -= overflow;
        }
        return new Branch(oldItems.append(newItems), eventCount);
    }
    remapping(from, to) {
        let maps = new index.Mapping;
        this.items.forEach((item, i) => {
            let mirrorPos = item.mirrorOffset != null && i - item.mirrorOffset >= from
                ? maps.maps.length - item.mirrorOffset : undefined;
            maps.appendMap(item.map, mirrorPos);
        }, from, to);
        return maps;
    }
    addMaps(array) {
        if (this.eventCount == 0)
            return this;
        return new Branch(this.items.append(array.map(map => new Item(map))), this.eventCount);
    }
    // When the collab module receives remote changes, the history has
    // to know about those, so that it can adjust the steps that were
    // rebased on top of the remote changes, and include the position
    // maps for the remote changes in its array of items.
    rebased(rebasedTransform, rebasedCount) {
        if (!this.eventCount)
            return this;
        let rebasedItems = [], start = Math.max(0, this.items.length - rebasedCount);
        let mapping = rebasedTransform.mapping;
        let newUntil = rebasedTransform.steps.length;
        let eventCount = this.eventCount;
        this.items.forEach(item => { if (item.selection)
            eventCount--; }, start);
        let iRebased = rebasedCount;
        this.items.forEach(item => {
            let pos = mapping.getMirror(--iRebased);
            if (pos == null)
                return;
            newUntil = Math.min(newUntil, pos);
            let map = mapping.maps[pos];
            if (item.step) {
                let step = rebasedTransform.steps[pos].invert(rebasedTransform.docs[pos]);
                let selection = item.selection && item.selection.map(mapping.slice(iRebased + 1, pos));
                if (selection)
                    eventCount++;
                rebasedItems.push(new Item(map, step, selection));
            }
            else {
                rebasedItems.push(new Item(map));
            }
        }, start);
        let newMaps = [];
        for (let i = rebasedCount; i < newUntil; i++)
            newMaps.push(new Item(mapping.maps[i]));
        let items = this.items.slice(0, start).append(newMaps).append(rebasedItems);
        let branch = new Branch(items, eventCount);
        if (branch.emptyItemCount() > max_empty_items)
            branch = branch.compress(this.items.length - rebasedItems.length);
        return branch;
    }
    emptyItemCount() {
        let count = 0;
        this.items.forEach(item => { if (!item.step)
            count++; });
        return count;
    }
    // Compressing a branch means rewriting it to push the air (map-only
    // items) out. During collaboration, these naturally accumulate
    // because each remote change adds one. The `upto` argument is used
    // to ensure that only the items below a given level are compressed,
    // because `rebased` relies on a clean, untouched set of items in
    // order to associate old items with rebased steps.
    compress(upto = this.items.length) {
        let remap = this.remapping(0, upto), mapFrom = remap.maps.length;
        let items = [], events = 0;
        this.items.forEach((item, i) => {
            if (i >= upto) {
                items.push(item);
                if (item.selection)
                    events++;
            }
            else if (item.step) {
                let step = item.step.map(remap.slice(mapFrom)), map = step && step.getMap();
                mapFrom--;
                if (map)
                    remap.appendMap(map, mapFrom);
                if (step) {
                    let selection = item.selection && item.selection.map(remap.slice(mapFrom));
                    if (selection)
                        events++;
                    let newItem = new Item(map.invert(), step, selection), merged, last = items.length - 1;
                    if (merged = items.length && items[last].merge(newItem))
                        items[last] = merged;
                    else
                        items.push(newItem);
                }
            }
            else if (item.map) {
                mapFrom--;
            }
        }, this.items.length, 0);
        return new Branch(RopeSequence.from(items.reverse()), events);
    }
}
Branch.empty = new Branch(RopeSequence.empty, 0);
function cutOffEvents(items, n) {
    let cutPoint;
    items.forEach((item, i) => {
        if (item.selection && (n-- == 0)) {
            cutPoint = i;
            return false;
        }
    });
    return items.slice(cutPoint);
}
class Item {
    constructor(
    // The (forward) step map for this item.
    map, 
    // The inverted step
    step, 
    // If this is non-null, this item is the start of a group, and
    // this selection is the starting selection for the group (the one
    // that was active before the first step was applied)
    selection, 
    // If this item is the inverse of a previous mapping on the stack,
    // this points at the inverse's offset
    mirrorOffset) {
        this.map = map;
        this.step = step;
        this.selection = selection;
        this.mirrorOffset = mirrorOffset;
    }
    merge(other) {
        if (this.step && other.step && !other.selection) {
            let step = other.step.merge(this.step);
            if (step)
                return new Item(step.getMap().invert(), step, this.selection);
        }
    }
}
// The value of the state field that tracks undo/redo history for that
// state. Will be stored in the plugin state when the history plugin
// is active.
class HistoryState {
    constructor(done, undone, prevRanges, prevTime, prevComposition) {
        this.done = done;
        this.undone = undone;
        this.prevRanges = prevRanges;
        this.prevTime = prevTime;
        this.prevComposition = prevComposition;
    }
}
const DEPTH_OVERFLOW = 20;
// Record a transformation in undo history.
function applyTransaction(history, state, tr, options) {
    let historyTr = tr.getMeta(historyKey), rebased;
    if (historyTr)
        return historyTr.historyState;
    if (tr.getMeta(closeHistoryKey))
        history = new HistoryState(history.done, history.undone, null, 0, -1);
    let appended = tr.getMeta("appendedTransaction");
    if (tr.steps.length == 0) {
        return history;
    }
    else if (appended && appended.getMeta(historyKey)) {
        if (appended.getMeta(historyKey).redo)
            return new HistoryState(history.done.addTransform(tr, undefined, options, mustPreserveItems(state)), history.undone, rangesFor(tr.mapping.maps), history.prevTime, history.prevComposition);
        else
            return new HistoryState(history.done, history.undone.addTransform(tr, undefined, options, mustPreserveItems(state)), null, history.prevTime, history.prevComposition);
    }
    else if (tr.getMeta("addToHistory") !== false && !(appended && appended.getMeta("addToHistory") === false)) {
        // Group transforms that occur in quick succession into one event.
        let composition = tr.getMeta("composition");
        let newGroup = history.prevTime == 0 ||
            (!appended && history.prevComposition != composition &&
                (history.prevTime < (tr.time || 0) - options.newGroupDelay || !isAdjacentTo(tr, history.prevRanges)));
        let prevRanges = appended ? mapRanges(history.prevRanges, tr.mapping) : rangesFor(tr.mapping.maps);
        return new HistoryState(history.done.addTransform(tr, newGroup ? state.selection.getBookmark() : undefined, options, mustPreserveItems(state)), Branch.empty, prevRanges, tr.time, composition == null ? history.prevComposition : composition);
    }
    else if (rebased = tr.getMeta("rebased")) {
        // Used by the collab module to tell the history that some of its
        // content has been rebased.
        return new HistoryState(history.done.rebased(tr, rebased), history.undone.rebased(tr, rebased), mapRanges(history.prevRanges, tr.mapping), history.prevTime, history.prevComposition);
    }
    else {
        return new HistoryState(history.done.addMaps(tr.mapping.maps), history.undone.addMaps(tr.mapping.maps), mapRanges(history.prevRanges, tr.mapping), history.prevTime, history.prevComposition);
    }
}
function isAdjacentTo(transform, prevRanges) {
    if (!prevRanges)
        return false;
    if (!transform.docChanged)
        return true;
    let adjacent = false;
    transform.mapping.maps[0].forEach((start, end) => {
        for (let i = 0; i < prevRanges.length; i += 2)
            if (start <= prevRanges[i + 1] && end >= prevRanges[i])
                adjacent = true;
    });
    return adjacent;
}
function rangesFor(maps) {
    let result = [];
    for (let i = maps.length - 1; i >= 0 && result.length == 0; i--)
        maps[i].forEach((_from, _to, from, to) => result.push(from, to));
    return result;
}
function mapRanges(ranges, mapping) {
    if (!ranges)
        return null;
    let result = [];
    for (let i = 0; i < ranges.length; i += 2) {
        let from = mapping.map(ranges[i], 1), to = mapping.map(ranges[i + 1], -1);
        if (from <= to)
            result.push(from, to);
    }
    return result;
}
// Apply the latest event from one branch to the document and shift the event
// onto the other branch.
function histTransaction(history, state, redo) {
    let preserveItems = mustPreserveItems(state);
    let histOptions = historyKey.get(state).spec.config;
    let pop = (redo ? history.undone : history.done).popEvent(state, preserveItems);
    if (!pop)
        return null;
    let selection = pop.selection.resolve(pop.transform.doc);
    let added = (redo ? history.done : history.undone).addTransform(pop.transform, state.selection.getBookmark(), histOptions, preserveItems);
    let newHist = new HistoryState(redo ? added : pop.remaining, redo ? pop.remaining : added, null, 0, -1);
    return pop.transform.setSelection(selection).setMeta(historyKey, { redo, historyState: newHist });
}
let cachedPreserveItems = false, cachedPreserveItemsPlugins = null;
// Check whether any plugin in the given state has a
// `historyPreserveItems` property in its spec, in which case we must
// preserve steps exactly as they came in, so that they can be
// rebased.
function mustPreserveItems(state) {
    let plugins = state.plugins;
    if (cachedPreserveItemsPlugins != plugins) {
        cachedPreserveItems = false;
        cachedPreserveItemsPlugins = plugins;
        for (let i = 0; i < plugins.length; i++)
            if (plugins[i].spec.historyPreserveItems) {
                cachedPreserveItems = true;
                break;
            }
    }
    return cachedPreserveItems;
}
const historyKey = new index.PluginKey("history");
const closeHistoryKey = new index.PluginKey("closeHistory");
/**
Returns a plugin that enables the undo history for an editor. The
plugin will track undo and redo stacks, which can be used with the
[`undo`](https://prosemirror.net/docs/ref/#history.undo) and [`redo`](https://prosemirror.net/docs/ref/#history.redo) commands.

You can set an `"addToHistory"` [metadata
property](https://prosemirror.net/docs/ref/#state.Transaction.setMeta) of `false` on a transaction
to prevent it from being rolled back by undo.
*/
function history(config = {}) {
    config = { depth: config.depth || 100,
        newGroupDelay: config.newGroupDelay || 500 };
    return new index.Plugin({
        key: historyKey,
        state: {
            init() {
                return new HistoryState(Branch.empty, Branch.empty, null, 0, -1);
            },
            apply(tr, hist, state) {
                return applyTransaction(hist, state, tr, config);
            }
        },
        config,
        props: {
            handleDOMEvents: {
                beforeinput(view, e) {
                    let inputType = e.inputType;
                    let command = inputType == "historyUndo" ? undo : inputType == "historyRedo" ? redo : null;
                    if (!command || !view.editable)
                        return false;
                    e.preventDefault();
                    return command(view.state, view.dispatch);
                }
            }
        }
    });
}
function buildCommand(redo, scroll) {
    return (state, dispatch) => {
        let hist = historyKey.getState(state);
        if (!hist || (redo ? hist.undone : hist.done).eventCount == 0)
            return false;
        if (dispatch) {
            let tr = histTransaction(hist, state, redo);
            if (tr)
                dispatch(scroll ? tr.scrollIntoView() : tr);
        }
        return true;
    };
}
/**
A command function that undoes the last change, if any.
*/
const undo = buildCommand(false, true);
/**
A command function that redoes the last undone change, if any.
*/
const redo = buildCommand(true, true);

// src/character-count/character-count.ts
var CharacterCount = index.Extension.create({
  name: "characterCount",
  addOptions() {
    return {
      limit: null,
      autoTrim: true,
      mode: "textSize",
      textCounter: (text) => text.length,
      wordCounter: (text) => text.split(" ").filter((word) => word !== "").length
    };
  },
  addStorage() {
    return {
      characters: () => 0,
      words: () => 0
    };
  },
  onBeforeCreate() {
    this.storage.characters = (options) => {
      const node = (options == null ? void 0 : options.node) || this.editor.state.doc;
      const mode = (options == null ? void 0 : options.mode) || this.options.mode;
      if (mode === "textSize") {
        const text = node.textBetween(0, node.content.size, void 0, " ");
        return this.options.textCounter(text);
      }
      return node.nodeSize;
    };
    this.storage.words = (options) => {
      const node = (options == null ? void 0 : options.node) || this.editor.state.doc;
      const text = node.textBetween(0, node.content.size, " ", " ");
      return this.options.wordCounter(text);
    };
  },
  addProseMirrorPlugins() {
    let initialEvaluationDone = false;
    return [
      new index.Plugin({
        key: new index.PluginKey("characterCount"),
        appendTransaction: (transactions, oldState, newState) => {
          if (initialEvaluationDone) {
            return;
          }
          const limit = this.options.limit;
          const autoTrim = this.options.autoTrim;
          if (limit === null || limit === void 0 || limit === 0 || autoTrim === false) {
            initialEvaluationDone = true;
            return;
          }
          const initialContentSize = this.storage.characters({ node: newState.doc });
          if (initialContentSize > limit) {
            const over = initialContentSize - limit;
            const from = 0;
            const to = over;
            console.warn(
              `[CharacterCount] Initial content exceeded limit of ${limit} characters. Content was automatically trimmed.`
            );
            const tr = newState.tr.deleteRange(from, to);
            initialEvaluationDone = true;
            return tr;
          }
          initialEvaluationDone = true;
        },
        filterTransaction: (transaction, state) => {
          const limit = this.options.limit;
          if (!transaction.docChanged || limit === 0 || limit === null || limit === void 0) {
            return true;
          }
          const oldSize = this.storage.characters({ node: state.doc });
          const newSize = this.storage.characters({ node: transaction.doc });
          if (newSize <= limit) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize <= oldSize) {
            return true;
          }
          if (oldSize > limit && newSize > limit && newSize > oldSize) {
            return false;
          }
          const isPaste = transaction.getMeta("paste");
          if (!isPaste) {
            return false;
          }
          const pos = transaction.selection.$head.pos;
          const over = newSize - limit;
          const from = pos - over;
          const to = pos;
          transaction.deleteRange(from, to);
          const updatedSize = this.storage.characters({ node: transaction.doc });
          if (updatedSize > limit) {
            return false;
          }
          return true;
        }
      })
    ];
  }
});
var Dropcursor = index.Extension.create({
  name: "dropCursor",
  addOptions() {
    return {
      color: "currentColor",
      width: 1,
      class: void 0
    };
  },
  addProseMirrorPlugins() {
    return [dropCursor(this.options)];
  }
});
index.Extension.create({
  name: "focus",
  addOptions() {
    return {
      className: "has-focus",
      mode: "all"
    };
  },
  addProseMirrorPlugins() {
    return [
      new index.Plugin({
        key: new index.PluginKey("focus"),
        props: {
          decorations: ({ doc, selection }) => {
            const { isEditable, isFocused } = this.editor;
            const { anchor } = selection;
            const decorations = [];
            if (!isEditable || !isFocused) {
              return index.DecorationSet.create(doc, []);
            }
            let maxLevels = 0;
            if (this.options.mode === "deepest") {
              doc.descendants((node, pos) => {
                if (node.isText) {
                  return;
                }
                const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
                if (!isCurrent) {
                  return false;
                }
                maxLevels += 1;
              });
            }
            let currentLevel = 0;
            doc.descendants((node, pos) => {
              if (node.isText) {
                return false;
              }
              const isCurrent = anchor >= pos && anchor <= pos + node.nodeSize - 1;
              if (!isCurrent) {
                return false;
              }
              currentLevel += 1;
              const outOfScope = this.options.mode === "deepest" && maxLevels - currentLevel > 0 || this.options.mode === "shallowest" && currentLevel > 1;
              if (outOfScope) {
                return this.options.mode === "deepest";
              }
              decorations.push(
                index.Decoration.node(pos, pos + node.nodeSize, {
                  class: this.options.className
                })
              );
            });
            return index.DecorationSet.create(doc, decorations);
          }
        }
      })
    ];
  }
});
var Gapcursor = index.Extension.create({
  name: "gapCursor",
  addProseMirrorPlugins() {
    return [gapCursor()];
  },
  extendNodeSchema(extension) {
    var _a;
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      allowGapCursor: (_a = index.callOrReturn(index.getExtensionField(extension, "allowGapCursor", context))) != null ? _a : null
    };
  }
});
var DEFAULT_DATA_ATTRIBUTE = "placeholder";
var PLUGIN_KEY = new index.PluginKey("tiptap__placeholder");
var VIEWPORT_OVERSCAN_PX = 200;
function createPlaceholderDecoration(options) {
  const {
    editor,
    placeholder,
    dataAttribute,
    pos,
    node,
    isEmptyDoc,
    hasAnchor,
    classes: { emptyNode, emptyEditor }
  } = options;
  const classes = [emptyNode];
  if (isEmptyDoc) {
    classes.push(emptyEditor);
  }
  return index.Decoration.node(pos, pos + node.nodeSize, {
    class: classes.join(" "),
    [dataAttribute]: typeof placeholder === "function" ? placeholder({
      editor,
      node,
      pos,
      hasAnchor
    }) : placeholder
  });
}

// src/placeholder/utils/buildPlaceholderDecorations.ts
function resolveEmptyNodeClass(emptyNodeClass, props) {
  return typeof emptyNodeClass === "function" ? emptyNodeClass(props) : emptyNodeClass;
}
function buildPlaceholderDecorations({
  editor,
  options,
  dataAttribute,
  doc,
  selection
}) {
  var _a, _b;
  const active = editor.isEditable || !options.showOnlyWhenEditable;
  if (!active) {
    return null;
  }
  const { anchor } = selection;
  const decorations = [];
  const isEmptyDoc = editor.isEmpty;
  const useResolvedPath = options.showOnlyCurrent && !options.includeChildren;
  if (useResolvedPath) {
    const resolved = doc.resolve(anchor);
    const node = resolved.depth > 0 ? resolved.node(1) : resolved.nodeAfter;
    const nodeStart = resolved.depth > 0 ? resolved.before(1) : anchor;
    if (node && node.type.isTextblock && index.isNodeEmpty(node)) {
      const hasAnchor = anchor >= nodeStart && anchor <= nodeStart + node.nodeSize;
      decorations.push(
        createPlaceholderDecoration({
          editor,
          isEmptyDoc,
          dataAttribute,
          hasAnchor,
          placeholder: options.placeholder,
          classes: {
            emptyEditor: options.emptyEditorClass,
            emptyNode: resolveEmptyNodeClass(options.emptyNodeClass, {
              editor,
              node,
              pos: nodeStart,
              hasAnchor
            })
          },
          node,
          pos: nodeStart
        })
      );
    }
  } else {
    const pluginState = PLUGIN_KEY.getState(editor.state);
    const from = (_a = pluginState == null ? void 0 : pluginState.topPos) != null ? _a : 0;
    const to = (_b = pluginState == null ? void 0 : pluginState.bottomPos) != null ? _b : doc.content.size;
    doc.nodesBetween(from, to, (node, pos) => {
      const hasAnchor = anchor >= pos && anchor <= pos + node.nodeSize;
      const isEmpty = !node.isLeaf && index.isNodeEmpty(node);
      if (!node.type.isTextblock) {
        return options.includeChildren;
      }
      if ((hasAnchor || !options.showOnlyCurrent) && isEmpty) {
        decorations.push(
          createPlaceholderDecoration({
            editor,
            isEmptyDoc,
            dataAttribute,
            hasAnchor,
            placeholder: options.placeholder,
            classes: {
              emptyEditor: options.emptyEditorClass,
              emptyNode: resolveEmptyNodeClass(options.emptyNodeClass, {
                editor,
                node,
                pos,
                hasAnchor
              })
            },
            node,
            pos
          })
        );
      }
      return options.includeChildren;
    });
  }
  return index.DecorationSet.create(doc, decorations);
}

// src/placeholder/utils/preparePlaceholderAttribute.ts
function preparePlaceholderAttribute(attr) {
  return attr.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "").replace(/^[0-9-]+/, "").replace(/^-+/, "").toLowerCase();
}

// src/placeholder/utils/findScrollParent.ts
function isScrollable(el) {
  const style = getComputedStyle(el);
  const overflow = `${style.overflow} ${style.overflowY} ${style.overflowX}`;
  return /auto|scroll|overlay/.test(overflow);
}
function findScrollParent(element) {
  let el = element;
  while (el) {
    if (isScrollable(el)) {
      return el;
    }
    const parent = el.parentElement;
    if (!parent) {
      const root = el.getRootNode();
      if (root instanceof ShadowRoot) {
        el = root.host;
        continue;
      }
      return window;
    }
    el = parent;
  }
  return window;
}

// src/placeholder/utils/getViewportBoundaryPositions.ts
function getContainerRect(container) {
  if (container === window) {
    return { top: 0, bottom: window.innerHeight };
  }
  return container.getBoundingClientRect();
}
function getViewportBoundaryPositions({
  doc,
  view,
  scrollContainer
}) {
  const editorRect = view.dom.getBoundingClientRect();
  const containerRect = scrollContainer ? getContainerRect(scrollContainer) : { top: 0, bottom: window.innerHeight };
  const visibleTop = Math.max(editorRect.top, containerRect.top) - VIEWPORT_OVERSCAN_PX;
  const visibleBottom = Math.min(editorRect.bottom, containerRect.bottom) + VIEWPORT_OVERSCAN_PX;
  if (visibleTop >= visibleBottom) {
    return { top: 0, bottom: doc.content.size };
  }
  const isRTL = getComputedStyle(view.dom).direction === "rtl";
  const x = isRTL ? Math.max(editorRect.right - 2, editorRect.left + 2) : editorRect.left + 2;
  const topPos = view.posAtCoords({ left: x, top: visibleTop + 2 });
  const bottomPos = view.posAtCoords({ left: x, top: visibleBottom - 2 });
  return {
    top: topPos ? topPos.pos : 0,
    bottom: bottomPos ? bottomPos.pos : doc.content.size
  };
}

// src/placeholder/utils/viewportTracking.ts
var viewportPluginState = {
  /**
   * Initialises the viewport state with no known positions.
   * @returns The initial viewport state.
   */
  init() {
    return { topPos: null, bottomPos: null };
  },
  /**
   * Updates the viewport state from incoming transactions.
   * @param tr - The transaction being applied.
   * @param prev - The previous viewport state.
   * @returns The next viewport state.
   */
  apply(tr, prev) {
    const meta = tr.getMeta(PLUGIN_KEY);
    if (meta == null ? void 0 : meta.positions) {
      return { topPos: meta.positions.top, bottomPos: meta.positions.bottom };
    }
    if (!tr.docChanged) {
      return prev;
    }
    return {
      topPos: prev.topPos !== null ? tr.mapping.map(prev.topPos) : null,
      bottomPos: prev.bottomPos !== null ? tr.mapping.map(prev.bottomPos) : null
    };
  }
};
function createViewportPluginView(view) {
  const scrollContainer = findScrollParent(view.dom);
  const computeAndDispatch = () => {
    const positions = getViewportBoundaryPositions({
      view,
      doc: view.state.doc,
      scrollContainer
    });
    const prev = PLUGIN_KEY.getState(view.state);
    if ((prev == null ? void 0 : prev.topPos) === positions.top && (prev == null ? void 0 : prev.bottomPos) === positions.bottom) {
      return;
    }
    const tr = view.state.tr.setMeta(PLUGIN_KEY, { positions });
    view.dispatch(tr);
  };
  let frame = null;
  let lastCompute = 0;
  const MIN_SCROLL_INTERVAL = 150;
  const scheduleFrame = () => {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      const now = performance.now();
      if (now - lastCompute >= MIN_SCROLL_INTERVAL) {
        lastCompute = now;
        computeAndDispatch();
      } else {
        scheduleFrame();
      }
    });
  };
  scrollContainer.addEventListener("scroll", scheduleFrame, { passive: true });
  computeAndDispatch();
  return {
    update(_view, prevState) {
      if (view.state.doc.content.size !== prevState.doc.content.size) {
        scheduleFrame();
      }
    },
    destroy: () => {
      if (frame !== null) {
        cancelAnimationFrame(frame);
      }
      scrollContainer.removeEventListener("scroll", scheduleFrame);
    }
  };
}

// src/placeholder/plugins/PlaceholderPlugin.ts
function createPlaceholderPlugin({ editor, options }) {
  const dataAttribute = options.dataAttribute ? `data-${preparePlaceholderAttribute(options.dataAttribute)}` : `data-${DEFAULT_DATA_ATTRIBUTE}`;
  return new index.Plugin({
    key: PLUGIN_KEY,
    state: viewportPluginState,
    view: createViewportPluginView,
    props: {
      decorations: ({ doc, selection }) => buildPlaceholderDecorations({ editor, options, dataAttribute, doc, selection })
    }
  });
}

// src/placeholder/placeholder.ts
var Placeholder = index.Extension.create({
  name: "placeholder",
  addOptions() {
    return {
      emptyEditorClass: "is-editor-empty",
      emptyNodeClass: "is-empty",
      dataAttribute: DEFAULT_DATA_ATTRIBUTE,
      placeholder: "Write something \u2026",
      showOnlyWhenEditable: true,
      showOnlyCurrent: true,
      includeChildren: false
    };
  },
  addProseMirrorPlugins() {
    return [createPlaceholderPlugin({ editor: this.editor, options: this.options })];
  }
});
var selectionStyle = `.ProseMirror:not(.ProseMirror-focused) *::selection {
  background: transparent;
}

.ProseMirror:not(.ProseMirror-focused) *::-moz-selection {
  background: transparent;
}`;
index.Extension.create({
  name: "selection",
  addOptions() {
    return {
      className: "selection"
    };
  },
  addProseMirrorPlugins() {
    const { editor, options } = this;
    if (editor.options.injectCSS && typeof document !== "undefined") {
      index.createStyleTag(selectionStyle, editor.options.injectNonce, "selection");
    }
    return [
      new index.Plugin({
        key: new index.PluginKey("selection"),
        props: {
          decorations(state) {
            if (state.selection.empty || editor.isFocused || !editor.isEditable || index.isNodeSelection(state.selection) || editor.view.dragging) {
              return null;
            }
            return index.DecorationSet.create(state.doc, [
              index.Decoration.inline(state.selection.from, state.selection.to, {
                class: options.className
              })
            ]);
          }
        }
      })
    ];
  }
});
var skipTrailingNodeMeta = "skipTrailingNode";
function nodeEqualsType({
  types,
  node
}) {
  return node && Array.isArray(types) && types.includes(node.type) || (node == null ? void 0 : node.type) === types;
}
var TrailingNode = index.Extension.create({
  name: "trailingNode",
  addOptions() {
    return {
      node: void 0,
      notAfter: []
    };
  },
  addProseMirrorPlugins() {
    var _a;
    const plugin = new index.PluginKey(this.name);
    const defaultNode = this.options.node || ((_a = this.editor.schema.topNodeType.contentMatch.defaultType) == null ? void 0 : _a.name) || "paragraph";
    const disabledNodes = Object.entries(this.editor.schema.nodes).map(([, value]) => value).filter((node) => (this.options.notAfter || []).concat(defaultNode).includes(node.name));
    return [
      new index.Plugin({
        key: plugin,
        appendTransaction: (transactions, __, state) => {
          const { doc, tr, schema } = state;
          const shouldInsertNodeAtEnd = plugin.getState(state);
          const endPosition = doc.content.size;
          const type = schema.nodes[defaultNode];
          if (transactions.some((transaction) => transaction.getMeta(skipTrailingNodeMeta))) {
            return;
          }
          if (!shouldInsertNodeAtEnd) {
            return;
          }
          return tr.insert(endPosition, type.create());
        },
        state: {
          init: (_, state) => {
            const lastNode = state.tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          },
          apply: (tr, value) => {
            if (!tr.docChanged) {
              return value;
            }
            if (tr.getMeta("__uniqueIDTransaction")) {
              return value;
            }
            const lastNode = tr.doc.lastChild;
            return !nodeEqualsType({ node: lastNode, types: disabledNodes });
          }
        }
      })
    ];
  }
});
var UndoRedo = index.Extension.create({
  name: "undoRedo",
  addOptions() {
    return {
      depth: 100,
      newGroupDelay: 500
    };
  },
  addCommands() {
    return {
      undo: () => ({ state, dispatch }) => {
        return undo(state, dispatch);
      },
      redo: () => ({ state, dispatch }) => {
        return redo(state, dispatch);
      }
    };
  },
  addProseMirrorPlugins() {
    return [history(this.options)];
  },
  addKeyboardShortcuts() {
    return {
      "Mod-z": () => this.editor.commands.undo(),
      "Shift-Mod-z": () => this.editor.commands.redo(),
      "Mod-y": () => this.editor.commands.redo(),
      // Russian keyboard layouts
      "Mod-\u044F": () => this.editor.commands.undo(),
      "Shift-Mod-\u044F": () => this.editor.commands.redo()
    };
  }
});

// src/starter-kit.ts
var StarterKit = index.Extension.create({
  name: "starterKit",
  addExtensions() {
    var _a, _b, _c, _d;
    const extensions = [];
    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options.bold));
    }
    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options.blockquote));
    }
    if (this.options.bulletList !== false) {
      extensions.push(BulletList.configure(this.options.bulletList));
    }
    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options.code));
    }
    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure(this.options.codeBlock));
    }
    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options.document));
    }
    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options.dropcursor));
    }
    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options.gapcursor));
    }
    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options.hardBreak));
    }
    if (this.options.heading !== false) {
      extensions.push(Heading.configure(this.options.heading));
    }
    if (this.options.undoRedo !== false) {
      extensions.push(UndoRedo.configure(this.options.undoRedo));
    }
    if (this.options.horizontalRule !== false) {
      extensions.push(HorizontalRule.configure(this.options.horizontalRule));
    }
    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options.italic));
    }
    if (this.options.listItem !== false) {
      extensions.push(ListItem.configure(this.options.listItem));
    }
    if (this.options.listKeymap !== false) {
      extensions.push(ListKeymap.configure((_a = this.options) == null ? void 0 : _a.listKeymap));
    }
    if (this.options.link !== false) {
      extensions.push(Link.configure((_b = this.options) == null ? void 0 : _b.link));
    }
    if (this.options.orderedList !== false) {
      extensions.push(OrderedList.configure(this.options.orderedList));
    }
    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options.paragraph));
    }
    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options.strike));
    }
    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options.text));
    }
    if (this.options.underline !== false) {
      extensions.push(Underline.configure((_c = this.options) == null ? void 0 : _c.underline));
    }
    if (this.options.trailingNode !== false) {
      extensions.push(TrailingNode.configure((_d = this.options) == null ? void 0 : _d.trailingNode));
    }
    return extensions;
  }
});

// src/index.ts
var index_default$b = StarterKit;

// src/text-align.ts
var TextAlign = index.Extension.create({
  name: "textAlign",
  addOptions() {
    return {
      types: [],
      alignments: ["left", "center", "right", "justify"],
      defaultAlignment: null
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          textAlign: {
            default: this.options.defaultAlignment,
            parseHTML: (element) => {
              const alignment = element.style.textAlign;
              return this.options.alignments.includes(alignment) ? alignment : this.options.defaultAlignment;
            },
            renderHTML: (attributes) => {
              if (!attributes.textAlign) {
                return {};
              }
              return { style: `text-align: ${attributes.textAlign}` };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setTextAlign: (alignment) => ({ commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false;
        }
        return this.options.types.map((type) => commands.updateAttributes(type, { textAlign: alignment })).some((response) => response);
      },
      unsetTextAlign: () => ({ commands }) => {
        return this.options.types.map((type) => commands.resetAttributes(type, "textAlign")).some((response) => response);
      },
      toggleTextAlign: (alignment) => ({ editor, commands }) => {
        if (!this.options.alignments.includes(alignment)) {
          return false;
        }
        if (editor.isActive({ textAlign: alignment })) {
          return commands.unsetTextAlign();
        }
        return commands.setTextAlign(alignment);
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      "Mod-Shift-l": () => this.editor.commands.setTextAlign("left"),
      "Mod-Shift-e": () => this.editor.commands.setTextAlign("center"),
      "Mod-Shift-r": () => this.editor.commands.setTextAlign("right"),
      "Mod-Shift-j": () => this.editor.commands.setTextAlign("justify")
    };
  }
});

// src/index.ts
var index_default$a = TextAlign;

// src/index.ts
var index_default$9 = Placeholder;

// src/index.ts
var index_default$8 = CharacterCount;

// src/text-style/index.ts
var MAX_FIND_CHILD_SPAN_DEPTH = 20;
var findChildSpans = (element, depth = 0) => {
  const childSpans = [];
  if (!element.children.length || depth > MAX_FIND_CHILD_SPAN_DEPTH) {
    return childSpans;
  }
  Array.from(element.children).forEach((child) => {
    if (child.tagName === "SPAN") {
      childSpans.push(child);
    } else if (child.children.length) {
      childSpans.push(...findChildSpans(child, depth + 1));
    }
  });
  return childSpans;
};
var mergeNestedSpanStyles = (element) => {
  if (!element.children.length) {
    return;
  }
  const childSpans = findChildSpans(element);
  if (!childSpans) {
    return;
  }
  childSpans.forEach((childSpan) => {
    var _a, _b;
    const childStyle = childSpan.getAttribute("style");
    const closestParentSpanStyleOfChild = (_b = (_a = childSpan.parentElement) == null ? void 0 : _a.closest("span")) == null ? void 0 : _b.getAttribute("style");
    childSpan.setAttribute("style", `${closestParentSpanStyleOfChild};${childStyle}`);
  });
};
var TextStyle = index.Mark.create({
  name: "textStyle",
  priority: 101,
  addOptions() {
    return {
      HTMLAttributes: {},
      mergeNestedSpanStyles: true
    };
  },
  parseHTML() {
    return [
      {
        tag: "span",
        consuming: false,
        getAttrs: (element) => {
          const hasStyles = element.hasAttribute("style");
          if (!hasStyles) {
            return false;
          }
          if (this.options.mergeNestedSpanStyles) {
            mergeNestedSpanStyles(element);
          }
          return {};
        }
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["span", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  },
  addCommands() {
    return {
      toggleTextStyle: (attributes) => ({ commands }) => {
        return commands.toggleMark(this.name, attributes);
      },
      removeEmptyTextStyle: () => ({ tr }) => {
        const { selection } = tr;
        tr.doc.nodesBetween(selection.from, selection.to, (node, pos) => {
          if (node.isTextblock) {
            return true;
          }
          if (!node.marks.filter((mark) => mark.type === this.type).some((mark) => Object.values(mark.attrs).some((value) => !!value))) {
            tr.removeMark(pos, pos + node.nodeSize, this.type);
          }
        });
        return true;
      }
    };
  }
});
var BackgroundColor = index.Extension.create({
  name: "backgroundColor",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          backgroundColor: {
            default: null,
            parseHTML: (element) => {
              var _a;
              const value = (_a = index.getStyleProperty(element, "background-color")) != null ? _a : element.style.backgroundColor;
              return value == null ? void 0 : value.replace(/['"]+/g, "");
            },
            renderHTML: (attributes) => {
              if (!attributes.backgroundColor) {
                return {};
              }
              return {
                style: `background-color: ${attributes.backgroundColor}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setBackgroundColor: (backgroundColor) => ({ chain }) => {
        return chain().setMark("textStyle", { backgroundColor }).run();
      },
      unsetBackgroundColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { backgroundColor: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var Color = index.Extension.create({
  name: "color",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: (element) => {
              var _a;
              const value = (_a = index.getStyleProperty(element, "color")) != null ? _a : element.style.color;
              return value == null ? void 0 : value.replace(/['"]+/g, "");
            },
            renderHTML: (attributes) => {
              if (!attributes.color) {
                return {};
              }
              return {
                style: `color: ${attributes.color}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setColor: (color) => ({ chain }) => {
        return chain().setMark("textStyle", { color }).run();
      },
      unsetColor: () => ({ chain }) => {
        return chain().setMark("textStyle", { color: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var FontFamily = index.Extension.create({
  name: "fontFamily",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontFamily: {
            default: null,
            // Prefer the raw inline `style` attribute so unquoted or
            // single-quoted multi-word names are preserved instead of being
            // canonicalized by `element.style.fontFamily`, which forces double
            // quotes that then get HTML-encoded to `&quot;` on serialization.
            parseHTML: (element) => {
              var _a;
              return (_a = index.getStyleProperty(element, "font-family")) != null ? _a : element.style.fontFamily;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontFamily) {
                return {};
              }
              return {
                style: `font-family: ${attributes.fontFamily}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontFamily: (fontFamily) => ({ chain }) => {
        return chain().setMark("textStyle", { fontFamily }).run();
      },
      unsetFontFamily: () => ({ chain }) => {
        return chain().setMark("textStyle", { fontFamily: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var FontSize = index.Extension.create({
  name: "fontSize",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            // Prefer the raw inline `style` attribute so the original format
            // is preserved instead of the canonicalized value returned by
            // `element.style.fontSize`.
            parseHTML: (element) => {
              var _a;
              return (_a = index.getStyleProperty(element, "font-size")) != null ? _a : element.style.fontSize;
            },
            renderHTML: (attributes) => {
              if (!attributes.fontSize) {
                return {};
              }
              return {
                style: `font-size: ${attributes.fontSize}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setFontSize: (fontSize) => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize }).run();
      },
      unsetFontSize: () => ({ chain }) => {
        return chain().setMark("textStyle", { fontSize: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
var LineHeight = index.Extension.create({
  name: "lineHeight",
  addOptions() {
    return {
      types: ["textStyle"]
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          lineHeight: {
            default: null,
            // Prefer the raw inline `style` attribute so the original format
            // is preserved instead of the canonicalized value returned by
            // `element.style.lineHeight`.
            parseHTML: (element) => {
              var _a;
              return (_a = index.getStyleProperty(element, "line-height")) != null ? _a : element.style.lineHeight;
            },
            renderHTML: (attributes) => {
              if (!attributes.lineHeight) {
                return {};
              }
              return {
                style: `line-height: ${attributes.lineHeight}`
              };
            }
          }
        }
      }
    ];
  },
  addCommands() {
    return {
      setLineHeight: (lineHeight) => ({ chain }) => {
        return chain().setMark("textStyle", { lineHeight }).run();
      },
      unsetLineHeight: () => ({ chain }) => {
        return chain().setMark("textStyle", { lineHeight: null }).removeEmptyTextStyle().run();
      }
    };
  }
});
index.Extension.create({
  name: "textStyleKit",
  addExtensions() {
    const extensions = [];
    if (this.options.backgroundColor !== false) {
      extensions.push(BackgroundColor.configure(this.options.backgroundColor));
    }
    if (this.options.color !== false) {
      extensions.push(Color.configure(this.options.color));
    }
    if (this.options.fontFamily !== false) {
      extensions.push(FontFamily.configure(this.options.fontFamily));
    }
    if (this.options.fontSize !== false) {
      extensions.push(FontSize.configure(this.options.fontSize));
    }
    if (this.options.lineHeight !== false) {
      extensions.push(LineHeight.configure(this.options.lineHeight));
    }
    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options.textStyle));
    }
    return extensions;
  }
});

// src/index.ts
var index_default$7 = Color;

//#region src/tablemap.ts
let readFromCache;
let addToCache;
if (typeof WeakMap != "undefined") {
	let cache = /* @__PURE__ */ new WeakMap();
	readFromCache = (key) => cache.get(key);
	addToCache = (key, value) => {
		cache.set(key, value);
		return value;
	};
} else {
	const cache = [];
	const cacheSize = 10;
	let cachePos = 0;
	readFromCache = (key) => {
		for (let i = 0; i < cache.length; i += 2) if (cache[i] == key) return cache[i + 1];
	};
	addToCache = (key, value) => {
		if (cachePos == cacheSize) cachePos = 0;
		cache[cachePos++] = key;
		return cache[cachePos++] = value;
	};
}
/**
* A table map describes the structure of a given table. To avoid
* recomputing them all the time, they are cached per table node. To
* be able to do that, positions saved in the map are relative to the
* start of the table, rather than the start of the document.
*
* @public
*/
var TableMap = class {
	constructor(width, height, map, problems) {
		this.width = width;
		this.height = height;
		this.map = map;
		this.problems = problems;
	}
	findCell(pos) {
		for (let i = 0; i < this.map.length; i++) {
			const curPos = this.map[i];
			if (curPos != pos) continue;
			const left = i % this.width;
			const top = i / this.width | 0;
			let right = left + 1;
			let bottom = top + 1;
			for (let j = 1; right < this.width && this.map[i + j] == curPos; j++) right++;
			for (let j = 1; bottom < this.height && this.map[i + this.width * j] == curPos; j++) bottom++;
			return {
				left,
				top,
				right,
				bottom
			};
		}
		throw new RangeError(`No cell with offset ${pos} found`);
	}
	colCount(pos) {
		for (let i = 0; i < this.map.length; i++) if (this.map[i] == pos) return i % this.width;
		throw new RangeError(`No cell with offset ${pos} found`);
	}
	nextCell(pos, axis, dir) {
		const { left, right, top, bottom } = this.findCell(pos);
		if (axis == "horiz") {
			if (dir < 0 ? left == 0 : right == this.width) return null;
			return this.map[top * this.width + (dir < 0 ? left - 1 : right)];
		} else {
			if (dir < 0 ? top == 0 : bottom == this.height) return null;
			return this.map[left + this.width * (dir < 0 ? top - 1 : bottom)];
		}
	}
	rectBetween(a, b) {
		const { left: leftA, right: rightA, top: topA, bottom: bottomA } = this.findCell(a);
		const { left: leftB, right: rightB, top: topB, bottom: bottomB } = this.findCell(b);
		return {
			left: Math.min(leftA, leftB),
			top: Math.min(topA, topB),
			right: Math.max(rightA, rightB),
			bottom: Math.max(bottomA, bottomB)
		};
	}
	cellsInRect(rect) {
		const result = [];
		const seen = {};
		for (let row = rect.top; row < rect.bottom; row++) for (let col = rect.left; col < rect.right; col++) {
			const index = row * this.width + col;
			const pos = this.map[index];
			if (seen[pos]) continue;
			seen[pos] = true;
			if (col == rect.left && col && this.map[index - 1] == pos || row == rect.top && row && this.map[index - this.width] == pos) continue;
			result.push(pos);
		}
		return result;
	}
	positionAt(row, col, table) {
		for (let i = 0, rowStart = 0;; i++) {
			const rowEnd = rowStart + table.child(i).nodeSize;
			if (i == row) {
				let index = col + row * this.width;
				const rowEndIndex = (row + 1) * this.width;
				while (index < rowEndIndex && this.map[index] < rowStart) index++;
				return index == rowEndIndex ? rowEnd - 1 : this.map[index];
			}
			rowStart = rowEnd;
		}
	}
	static get(table) {
		return readFromCache(table) || addToCache(table, computeMap(table));
	}
};
function computeMap(table) {
	if (table.type.spec.tableRole != "table") throw new RangeError("Not a table node: " + table.type.name);
	const width = findWidth(table), height = table.childCount;
	const map = [];
	let mapPos = 0;
	let problems = null;
	const colWidths = [];
	for (let i = 0, e = width * height; i < e; i++) map[i] = 0;
	for (let row = 0, pos = 0; row < height; row++) {
		const rowNode = table.child(row);
		pos++;
		for (let i = 0;; i++) {
			while (mapPos < map.length && map[mapPos] != 0) mapPos++;
			if (i == rowNode.childCount) break;
			const cellNode = rowNode.child(i);
			const { colspan, rowspan, colwidth } = cellNode.attrs;
			for (let h = 0; h < rowspan; h++) {
				if (h + row >= height) {
					(problems || (problems = [])).push({
						type: "overlong_rowspan",
						pos,
						n: rowspan - h
					});
					break;
				}
				const start = mapPos + h * width;
				for (let w = 0; w < colspan; w++) {
					if (map[start + w] == 0) map[start + w] = pos;
					else (problems || (problems = [])).push({
						type: "collision",
						row,
						pos,
						n: colspan - w
					});
					const colW = colwidth && colwidth[w];
					if (colW) {
						const widthIndex = (start + w) % width * 2, prev = colWidths[widthIndex];
						if (prev == null || prev != colW && colWidths[widthIndex + 1] == 1) {
							colWidths[widthIndex] = colW;
							colWidths[widthIndex + 1] = 1;
						} else if (prev == colW) colWidths[widthIndex + 1]++;
					}
				}
			}
			mapPos += colspan;
			pos += cellNode.nodeSize;
		}
		const expectedPos = (row + 1) * width;
		let missing = 0;
		while (mapPos < expectedPos) if (map[mapPos++] == 0) missing++;
		if (missing) (problems || (problems = [])).push({
			type: "missing",
			row,
			n: missing
		});
		pos++;
	}
	if (width === 0 || height === 0) (problems || (problems = [])).push({ type: "zero_sized" });
	const tableMap = new TableMap(width, height, map, problems);
	let badWidths = false;
	for (let i = 0; !badWidths && i < colWidths.length; i += 2) if (colWidths[i] != null && colWidths[i + 1] < height) badWidths = true;
	if (badWidths) findBadColWidths(tableMap, colWidths, table);
	return tableMap;
}
function findWidth(table) {
	let width = -1;
	let hasRowSpan = false;
	for (let row = 0; row < table.childCount; row++) {
		const rowNode = table.child(row);
		let rowWidth = 0;
		if (hasRowSpan) for (let j = 0; j < row; j++) {
			const prevRow = table.child(j);
			for (let i = 0; i < prevRow.childCount; i++) {
				const cell = prevRow.child(i);
				if (j + cell.attrs.rowspan > row) rowWidth += cell.attrs.colspan;
			}
		}
		for (let i = 0; i < rowNode.childCount; i++) {
			const cell = rowNode.child(i);
			rowWidth += cell.attrs.colspan;
			if (cell.attrs.rowspan > 1) hasRowSpan = true;
		}
		if (width == -1) width = rowWidth;
		else if (width != rowWidth) width = Math.max(width, rowWidth);
	}
	return width;
}
function findBadColWidths(map, colWidths, table) {
	if (!map.problems) map.problems = [];
	const seen = {};
	for (let i = 0; i < map.map.length; i++) {
		const pos = map.map[i];
		if (seen[pos]) continue;
		seen[pos] = true;
		const node = table.nodeAt(pos);
		if (!node) throw new RangeError(`No cell with offset ${pos} found`);
		let updated = null;
		const attrs = node.attrs;
		for (let j = 0; j < attrs.colspan; j++) {
			const colWidth = colWidths[(i + j) % map.width * 2];
			if (colWidth != null && (!attrs.colwidth || attrs.colwidth[j] != colWidth)) (updated || (updated = freshColWidth(attrs)))[j] = colWidth;
		}
		if (updated) map.problems.unshift({
			type: "colwidth mismatch",
			pos,
			colwidth: updated
		});
	}
}
function freshColWidth(attrs) {
	if (attrs.colwidth) return attrs.colwidth.slice();
	const result = [];
	for (let i = 0; i < attrs.colspan; i++) result.push(0);
	return result;
}
/**
* @public
*/
function tableNodeTypes(schema) {
	let result = schema.cached.tableNodeTypes;
	if (!result) {
		result = schema.cached.tableNodeTypes = {};
		for (const name in schema.nodes) {
			const type = schema.nodes[name], role = type.spec.tableRole;
			if (role) result[role] = type;
		}
	}
	return result;
}

//#endregion
//#region src/util.ts
/**
* @public
*/
const tableEditingKey = new index.PluginKey("selectingCells");
/**
* @public
*/
function cellAround($pos) {
	for (let d = $pos.depth - 1; d > 0; d--) if ($pos.node(d).type.spec.tableRole == "row") return $pos.node(0).resolve($pos.before(d + 1));
	return null;
}
function cellWrapping($pos) {
	for (let d = $pos.depth; d > 0; d--) {
		const role = $pos.node(d).type.spec.tableRole;
		if (role === "cell" || role === "header_cell") return $pos.node(d);
	}
	return null;
}
/**
* @public
*/
function isInTable(state) {
	const $head = state.selection.$head;
	for (let d = $head.depth; d > 0; d--) if ($head.node(d).type.spec.tableRole == "row") return true;
	return false;
}
/**
* @internal
*/
function selectionCell(state) {
	const sel = state.selection;
	if ("$anchorCell" in sel && sel.$anchorCell) return sel.$anchorCell.pos > sel.$headCell.pos ? sel.$anchorCell : sel.$headCell;
	else if ("node" in sel && sel.node && sel.node.type.spec.tableRole == "cell") return sel.$anchor;
	const $cell = cellAround(sel.$head) || cellNear(sel.$head);
	if ($cell) return $cell;
	throw new RangeError(`No cell found around position ${sel.head}`);
}
/**
* @public
*/
function cellNear($pos) {
	for (let after = $pos.nodeAfter, pos = $pos.pos; after; after = after.firstChild, pos++) {
		const role = after.type.spec.tableRole;
		if (role == "cell" || role == "header_cell") return $pos.doc.resolve(pos);
	}
	for (let before = $pos.nodeBefore, pos = $pos.pos; before; before = before.lastChild, pos--) {
		const role = before.type.spec.tableRole;
		if (role == "cell" || role == "header_cell") return $pos.doc.resolve(pos - before.nodeSize);
	}
}
/**
* @public
*/
function pointsAtCell($pos) {
	return $pos.parent.type.spec.tableRole == "row" && !!$pos.nodeAfter;
}
/**
* @public
*/
function moveCellForward($pos) {
	return $pos.node(0).resolve($pos.pos + $pos.nodeAfter.nodeSize);
}
/**
* @internal
*/
function inSameTable($cellA, $cellB) {
	return $cellA.depth == $cellB.depth && $cellA.pos >= $cellB.start(-1) && $cellA.pos <= $cellB.end(-1);
}
/**
* @public
*/
function nextCell($pos, axis, dir) {
	const table = $pos.node(-1);
	const map = TableMap.get(table);
	const tableStart = $pos.start(-1);
	const moved = map.nextCell($pos.pos - tableStart, axis, dir);
	return moved == null ? null : $pos.node(0).resolve(tableStart + moved);
}
/**
* @public
*/
function removeColSpan(attrs, pos, n = 1) {
	const result = {
		...attrs,
		colspan: attrs.colspan - n
	};
	if (result.colwidth) {
		result.colwidth = result.colwidth.slice();
		result.colwidth.splice(pos, n);
		if (!result.colwidth.some((w) => w > 0)) result.colwidth = null;
	}
	return result;
}
/**
* @public
*/
function addColSpan(attrs, pos, n = 1) {
	const result = {
		...attrs,
		colspan: attrs.colspan + n
	};
	if (result.colwidth) {
		result.colwidth = result.colwidth.slice();
		for (let i = 0; i < n; i++) result.colwidth.splice(pos, 0, 0);
	}
	return result;
}
/**
* @public
*/
function columnIsHeader(map, table, col) {
	const headerCell = tableNodeTypes(table.type.schema).header_cell;
	for (let row = 0; row < map.height; row++) if (table.nodeAt(map.map[col + row * map.width]).type != headerCell) return false;
	return true;
}

//#endregion
//#region src/cellselection.ts
/**
* A [`Selection`](http://prosemirror.net/docs/ref/#state.Selection)
* subclass that represents a cell selection spanning part of a table.
* With the plugin enabled, these will be created when the user
* selects across cells, and will be drawn by giving selected cells a
* `selectedCell` CSS class.
*
* @public
*/
var CellSelection = class CellSelection extends index.Selection {
	constructor($anchorCell, $headCell = $anchorCell) {
		const table = $anchorCell.node(-1);
		const map = TableMap.get(table);
		const tableStart = $anchorCell.start(-1);
		const rect = map.rectBetween($anchorCell.pos - tableStart, $headCell.pos - tableStart);
		const doc = $anchorCell.node(0);
		const cells = map.cellsInRect(rect).filter((p) => p != $headCell.pos - tableStart);
		cells.unshift($headCell.pos - tableStart);
		const ranges = cells.map((pos) => {
			const cell = table.nodeAt(pos);
			if (!cell) throw new RangeError(`No cell with offset ${pos} found`);
			const from = tableStart + pos + 1;
			return new index.SelectionRange(doc.resolve(from), doc.resolve(from + cell.content.size));
		});
		super(ranges[0].$from, ranges[0].$to, ranges);
		this.$anchorCell = $anchorCell;
		this.$headCell = $headCell;
	}
	map(doc, mapping) {
		const $anchorCell = doc.resolve(mapping.map(this.$anchorCell.pos));
		const $headCell = doc.resolve(mapping.map(this.$headCell.pos));
		if (pointsAtCell($anchorCell) && pointsAtCell($headCell) && inSameTable($anchorCell, $headCell)) {
			const tableChanged = this.$anchorCell.node(-1) != $anchorCell.node(-1);
			if (tableChanged && this.isRowSelection()) return CellSelection.rowSelection($anchorCell, $headCell);
			else if (tableChanged && this.isColSelection()) return CellSelection.colSelection($anchorCell, $headCell);
			else return new CellSelection($anchorCell, $headCell);
		}
		return index.TextSelection.between($anchorCell, $headCell);
	}
	content() {
		const table = this.$anchorCell.node(-1);
		const map = TableMap.get(table);
		const tableStart = this.$anchorCell.start(-1);
		const rect = map.rectBetween(this.$anchorCell.pos - tableStart, this.$headCell.pos - tableStart);
		const seen = {};
		const rows = [];
		for (let row = rect.top; row < rect.bottom; row++) {
			const rowContent = [];
			for (let index = row * map.width + rect.left, col = rect.left; col < rect.right; col++, index++) {
				const pos = map.map[index];
				if (seen[pos]) continue;
				seen[pos] = true;
				const cellRect = map.findCell(pos);
				let cell = table.nodeAt(pos);
				if (!cell) throw new RangeError(`No cell with offset ${pos} found`);
				const extraLeft = rect.left - cellRect.left;
				const extraRight = cellRect.right - rect.right;
				if (extraLeft > 0 || extraRight > 0) {
					let attrs = cell.attrs;
					if (extraLeft > 0) attrs = removeColSpan(attrs, 0, extraLeft);
					if (extraRight > 0) attrs = removeColSpan(attrs, attrs.colspan - extraRight, extraRight);
					if (cellRect.left < rect.left) {
						cell = cell.type.createAndFill(attrs);
						if (!cell) throw new RangeError(`Could not create cell with attrs ${JSON.stringify(attrs)}`);
					} else cell = cell.type.create(attrs, cell.content);
				}
				if (cellRect.top < rect.top || cellRect.bottom > rect.bottom) {
					const attrs = {
						...cell.attrs,
						rowspan: Math.min(cellRect.bottom, rect.bottom) - Math.max(cellRect.top, rect.top)
					};
					if (cellRect.top < rect.top) cell = cell.type.createAndFill(attrs);
					else cell = cell.type.create(attrs, cell.content);
				}
				rowContent.push(cell);
			}
			rows.push(table.child(row).copy(index.Fragment.from(rowContent)));
		}
		const fragment = this.isColSelection() && this.isRowSelection() ? table : rows;
		return new index.Slice(index.Fragment.from(fragment), 1, 1);
	}
	replace(tr, content = index.Slice.empty) {
		const mapFrom = tr.steps.length, ranges = this.ranges;
		for (let i = 0; i < ranges.length; i++) {
			const { $from, $to } = ranges[i], mapping = tr.mapping.slice(mapFrom);
			tr.replace(mapping.map($from.pos), mapping.map($to.pos), i ? index.Slice.empty : content);
		}
		const sel = index.Selection.findFrom(tr.doc.resolve(tr.mapping.slice(mapFrom).map(this.to)), -1);
		if (sel) tr.setSelection(sel);
	}
	replaceWith(tr, node) {
		this.replace(tr, new index.Slice(index.Fragment.from(node), 0, 0));
	}
	forEachCell(f) {
		const table = this.$anchorCell.node(-1);
		const map = TableMap.get(table);
		const tableStart = this.$anchorCell.start(-1);
		const cells = map.cellsInRect(map.rectBetween(this.$anchorCell.pos - tableStart, this.$headCell.pos - tableStart));
		for (let i = 0; i < cells.length; i++) f(table.nodeAt(cells[i]), tableStart + cells[i]);
	}
	isColSelection() {
		const anchorTop = this.$anchorCell.index(-1);
		const headTop = this.$headCell.index(-1);
		if (Math.min(anchorTop, headTop) > 0) return false;
		const anchorBottom = anchorTop + this.$anchorCell.nodeAfter.attrs.rowspan;
		const headBottom = headTop + this.$headCell.nodeAfter.attrs.rowspan;
		return Math.max(anchorBottom, headBottom) == this.$headCell.node(-1).childCount;
	}
	static colSelection($anchorCell, $headCell = $anchorCell) {
		const table = $anchorCell.node(-1);
		const map = TableMap.get(table);
		const tableStart = $anchorCell.start(-1);
		const anchorRect = map.findCell($anchorCell.pos - tableStart);
		const headRect = map.findCell($headCell.pos - tableStart);
		const doc = $anchorCell.node(0);
		if (anchorRect.top <= headRect.top) {
			if (anchorRect.top > 0) $anchorCell = doc.resolve(tableStart + map.map[anchorRect.left]);
			if (headRect.bottom < map.height) $headCell = doc.resolve(tableStart + map.map[map.width * (map.height - 1) + headRect.right - 1]);
		} else {
			if (headRect.top > 0) $headCell = doc.resolve(tableStart + map.map[headRect.left]);
			if (anchorRect.bottom < map.height) $anchorCell = doc.resolve(tableStart + map.map[map.width * (map.height - 1) + anchorRect.right - 1]);
		}
		return new CellSelection($anchorCell, $headCell);
	}
	isRowSelection() {
		const table = this.$anchorCell.node(-1);
		const map = TableMap.get(table);
		const tableStart = this.$anchorCell.start(-1);
		const anchorLeft = map.colCount(this.$anchorCell.pos - tableStart);
		const headLeft = map.colCount(this.$headCell.pos - tableStart);
		if (Math.min(anchorLeft, headLeft) > 0) return false;
		const anchorRight = anchorLeft + this.$anchorCell.nodeAfter.attrs.colspan;
		const headRight = headLeft + this.$headCell.nodeAfter.attrs.colspan;
		return Math.max(anchorRight, headRight) == map.width;
	}
	eq(other) {
		return other instanceof CellSelection && other.$anchorCell.pos == this.$anchorCell.pos && other.$headCell.pos == this.$headCell.pos;
	}
	static rowSelection($anchorCell, $headCell = $anchorCell) {
		const table = $anchorCell.node(-1);
		const map = TableMap.get(table);
		const tableStart = $anchorCell.start(-1);
		const anchorRect = map.findCell($anchorCell.pos - tableStart);
		const headRect = map.findCell($headCell.pos - tableStart);
		const doc = $anchorCell.node(0);
		if (anchorRect.left <= headRect.left) {
			if (anchorRect.left > 0) $anchorCell = doc.resolve(tableStart + map.map[anchorRect.top * map.width]);
			if (headRect.right < map.width) $headCell = doc.resolve(tableStart + map.map[map.width * (headRect.top + 1) - 1]);
		} else {
			if (headRect.left > 0) $headCell = doc.resolve(tableStart + map.map[headRect.top * map.width]);
			if (anchorRect.right < map.width) $anchorCell = doc.resolve(tableStart + map.map[map.width * (anchorRect.top + 1) - 1]);
		}
		return new CellSelection($anchorCell, $headCell);
	}
	toJSON() {
		return {
			type: "cell",
			anchor: this.$anchorCell.pos,
			head: this.$headCell.pos
		};
	}
	static fromJSON(doc, json) {
		return new CellSelection(doc.resolve(json.anchor), doc.resolve(json.head));
	}
	static create(doc, anchorCell, headCell = anchorCell) {
		return new CellSelection(doc.resolve(anchorCell), doc.resolve(headCell));
	}
	getBookmark() {
		return new CellBookmark(this.$anchorCell.pos, this.$headCell.pos);
	}
};
CellSelection.prototype.visible = false;
index.Selection.jsonID("cell", CellSelection);
/**
* @public
*/
var CellBookmark = class CellBookmark {
	constructor(anchor, head) {
		this.anchor = anchor;
		this.head = head;
	}
	map(mapping) {
		return new CellBookmark(mapping.map(this.anchor), mapping.map(this.head));
	}
	resolve(doc) {
		const $anchorCell = doc.resolve(this.anchor), $headCell = doc.resolve(this.head);
		if ($anchorCell.parent.type.spec.tableRole == "row" && $headCell.parent.type.spec.tableRole == "row" && $anchorCell.index() < $anchorCell.parent.childCount && $headCell.index() < $headCell.parent.childCount && inSameTable($anchorCell, $headCell)) return new CellSelection($anchorCell, $headCell);
		else return index.Selection.near($headCell, 1);
	}
};
function drawCellSelection(state) {
	if (!(state.selection instanceof CellSelection)) return null;
	const cells = [];
	state.selection.forEachCell((node, pos) => {
		cells.push(index.Decoration.node(pos, pos + node.nodeSize, { class: "selectedCell" }));
	});
	return index.DecorationSet.create(state.doc, cells);
}
function isCellBoundarySelection({ $from, $to }) {
	if ($from.pos == $to.pos || $from.pos < $to.pos - 6) return false;
	let afterFrom = $from.pos;
	let beforeTo = $to.pos;
	let depth = $from.depth;
	for (; depth >= 0; depth--, afterFrom++) if ($from.after(depth + 1) < $from.end(depth)) break;
	for (let d = $to.depth; d >= 0; d--, beforeTo--) if ($to.before(d + 1) > $to.start(d)) break;
	return afterFrom == beforeTo && /row|table/.test($from.node(depth).type.spec.tableRole);
}
function isTextSelectionAcrossCells({ $from, $to }) {
	let fromCellBoundaryNode;
	let toCellBoundaryNode;
	for (let i = $from.depth; i > 0; i--) {
		const node = $from.node(i);
		if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
			fromCellBoundaryNode = node;
			break;
		}
	}
	for (let i = $to.depth; i > 0; i--) {
		const node = $to.node(i);
		if (node.type.spec.tableRole === "cell" || node.type.spec.tableRole === "header_cell") {
			toCellBoundaryNode = node;
			break;
		}
	}
	return fromCellBoundaryNode !== toCellBoundaryNode && $to.parentOffset === 0;
}
function normalizeSelection(state, tr, allowTableNodeSelection) {
	const sel = (tr || state).selection;
	const doc = (tr || state).doc;
	let normalize;
	let role;
	if (sel instanceof index.NodeSelection && (role = sel.node.type.spec.tableRole)) {
		if (role == "cell" || role == "header_cell") normalize = CellSelection.create(doc, sel.from);
		else if (role == "row") {
			const $cell = doc.resolve(sel.from + 1);
			normalize = CellSelection.rowSelection($cell, $cell);
		} else if (!allowTableNodeSelection) {
			const map = TableMap.get(sel.node);
			const start = sel.from + 1;
			const lastCell = start + map.map[map.width * map.height - 1];
			normalize = CellSelection.create(doc, start + 1, lastCell);
		}
	} else if (sel instanceof index.TextSelection && isCellBoundarySelection(sel)) normalize = index.TextSelection.create(doc, sel.from);
	else if (sel instanceof index.TextSelection && isTextSelectionAcrossCells(sel)) normalize = index.TextSelection.create(doc, sel.$from.start(), sel.$from.end());
	if (normalize) (tr || (tr = state.tr)).setSelection(normalize);
	return tr;
}

//#endregion
//#region src/fixtables.ts
/**
* @public
*/
const fixTablesKey = new index.PluginKey("fix-tables");
/**
* Helper for iterating through the nodes in a document that changed
* compared to the given previous document. Useful for avoiding
* duplicate work on each transaction.
*
* @public
*/
function changedDescendants(old, cur, offset, f) {
	const oldSize = old.childCount, curSize = cur.childCount;
	outer: for (let i = 0, j = 0; i < curSize; i++) {
		const child = cur.child(i);
		for (let scan = j, e = Math.min(oldSize, i + 3); scan < e; scan++) if (old.child(scan) == child) {
			j = scan + 1;
			offset += child.nodeSize;
			continue outer;
		}
		f(child, offset);
		if (j < oldSize && old.child(j).sameMarkup(child)) changedDescendants(old.child(j), child, offset + 1, f);
		else child.nodesBetween(0, child.content.size, f, offset + 1);
		offset += child.nodeSize;
	}
}
/**
* Inspect all tables in the given state's document and return a
* transaction that fixes them, if necessary. If `oldState` was
* provided, that is assumed to hold a previous, known-good state,
* which will be used to avoid re-scanning unchanged parts of the
* document.
*
* @public
*/
function fixTables(state, oldState) {
	let tr;
	const check = (node, pos) => {
		if (node.type.spec.tableRole == "table") tr = fixTable(state, node, pos, tr);
	};
	if (!oldState) state.doc.descendants(check);
	else if (oldState.doc != state.doc) changedDescendants(oldState.doc, state.doc, 0, check);
	return tr;
}
function fixTable(state, table, tablePos, tr) {
	const map = TableMap.get(table);
	if (!map.problems) return tr;
	if (!tr) tr = state.tr;
	const mustAdd = [];
	for (let i = 0; i < map.height; i++) mustAdd.push(0);
	for (let i = 0; i < map.problems.length; i++) {
		const prob = map.problems[i];
		if (prob.type == "collision") {
			const cell = table.nodeAt(prob.pos);
			if (!cell) continue;
			const attrs = cell.attrs;
			for (let j = 0; j < attrs.rowspan; j++) mustAdd[prob.row + j] += prob.n;
			tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, removeColSpan(attrs, attrs.colspan - prob.n, prob.n));
		} else if (prob.type == "missing") mustAdd[prob.row] += prob.n;
		else if (prob.type == "overlong_rowspan") {
			const cell = table.nodeAt(prob.pos);
			if (!cell) continue;
			tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
				...cell.attrs,
				rowspan: cell.attrs.rowspan - prob.n
			});
		} else if (prob.type == "colwidth mismatch") {
			const cell = table.nodeAt(prob.pos);
			if (!cell) continue;
			tr.setNodeMarkup(tr.mapping.map(tablePos + 1 + prob.pos), null, {
				...cell.attrs,
				colwidth: prob.colwidth
			});
		} else if (prob.type == "zero_sized") {
			const pos = tr.mapping.map(tablePos);
			tr.delete(pos, pos + table.nodeSize);
		}
	}
	let first, last;
	for (let i = 0; i < mustAdd.length; i++) if (mustAdd[i]) {
		if (first == null) first = i;
		last = i;
	}
	for (let i = 0, pos = tablePos + 1; i < map.height; i++) {
		const row = table.child(i);
		const end = pos + row.nodeSize;
		const add = mustAdd[i];
		if (add > 0) {
			let role = "cell";
			if (row.firstChild) role = row.firstChild.type.spec.tableRole;
			const nodes = [];
			for (let j = 0; j < add; j++) {
				const node = tableNodeTypes(state.schema)[role].createAndFill();
				if (node) nodes.push(node);
			}
			const side = (i == 0 || first == i - 1) && last == i ? pos + 1 : end - 1;
			tr.insert(tr.mapping.map(side), nodes);
		}
		pos = end;
	}
	return tr.setMeta(fixTablesKey, { fixTables: true });
}

//#endregion
//#region src/commands.ts
/**
* Helper to get the selected rectangle in a table, if any. Adds table
* map, table node, and table start offset to the object for
* convenience.
*
* @public
*/
function selectedRect(state) {
	const sel = state.selection;
	const $pos = selectionCell(state);
	const table = $pos.node(-1);
	const tableStart = $pos.start(-1);
	const map = TableMap.get(table);
	return {
		...sel instanceof CellSelection ? map.rectBetween(sel.$anchorCell.pos - tableStart, sel.$headCell.pos - tableStart) : map.findCell($pos.pos - tableStart),
		tableStart,
		map,
		table
	};
}
/**
* Add a column at the given position in a table.
*
* @public
*/
function addColumn(tr, { map, tableStart, table }, col) {
	let refColumn = col > 0 ? -1 : 0;
	if (columnIsHeader(map, table, col + refColumn)) refColumn = col == 0 || col == map.width ? null : 0;
	for (let row = 0; row < map.height; row++) {
		const index = row * map.width + col;
		if (col > 0 && col < map.width && map.map[index - 1] == map.map[index]) {
			const pos = map.map[index];
			const cell = table.nodeAt(pos);
			tr.setNodeMarkup(tr.mapping.map(tableStart + pos), null, addColSpan(cell.attrs, col - map.colCount(pos)));
			row += cell.attrs.rowspan - 1;
		} else {
			const type = refColumn == null ? tableNodeTypes(table.type.schema).cell : table.nodeAt(map.map[index + refColumn]).type;
			const pos = map.positionAt(row, col, table);
			tr.insert(tr.mapping.map(tableStart + pos), type.createAndFill());
		}
	}
	return tr;
}
/**
* Command to add a column before the column with the selection.
*
* @public
*/
function addColumnBefore(state, dispatch) {
	if (!isInTable(state)) return false;
	if (dispatch) {
		const rect = selectedRect(state);
		dispatch(addColumn(state.tr, rect, rect.left));
	}
	return true;
}
/**
* Command to add a column after the column with the selection.
*
* @public
*/
function addColumnAfter(state, dispatch) {
	if (!isInTable(state)) return false;
	if (dispatch) {
		const rect = selectedRect(state);
		dispatch(addColumn(state.tr, rect, rect.right));
	}
	return true;
}
/**
* @public
*/
function removeColumn(tr, { map, table, tableStart }, col) {
	const mapStart = tr.mapping.maps.length;
	for (let row = 0; row < map.height;) {
		const index = row * map.width + col;
		const pos = map.map[index];
		const cell = table.nodeAt(pos);
		const attrs = cell.attrs;
		if (col > 0 && map.map[index - 1] == pos || col < map.width - 1 && map.map[index + 1] == pos) tr.setNodeMarkup(tr.mapping.slice(mapStart).map(tableStart + pos), null, removeColSpan(attrs, col - map.colCount(pos)));
		else {
			const start = tr.mapping.slice(mapStart).map(tableStart + pos);
			tr.delete(start, start + cell.nodeSize);
		}
		row += attrs.rowspan;
	}
}
/**
* Command function that removes the selected columns from a table.
*
* @public
*/
function deleteColumn(state, dispatch) {
	if (!isInTable(state)) return false;
	if (dispatch) {
		const rect = selectedRect(state);
		const tr = state.tr;
		if (rect.left == 0 && rect.right == rect.map.width) return false;
		for (let i = rect.right - 1;; i--) {
			removeColumn(tr, rect, i);
			if (i == rect.left) break;
			const table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
			if (!table) throw new RangeError("No table found");
			rect.table = table;
			rect.map = TableMap.get(table);
		}
		dispatch(tr);
	}
	return true;
}
/**
* @public
*/
function rowIsHeader(map, table, row) {
	var _table$nodeAt;
	const headerCell = tableNodeTypes(table.type.schema).header_cell;
	for (let col = 0; col < map.width; col++) if (((_table$nodeAt = table.nodeAt(map.map[col + row * map.width])) === null || _table$nodeAt === void 0 ? void 0 : _table$nodeAt.type) != headerCell) return false;
	return true;
}
/**
* @public
*/
function addRow(tr, { map, tableStart, table }, row) {
	let rowPos = tableStart;
	for (let i = 0; i < row; i++) rowPos += table.child(i).nodeSize;
	const cells = [];
	let refRow = row > 0 ? -1 : 0;
	if (rowIsHeader(map, table, row + refRow)) refRow = row == 0 || row == map.height ? null : 0;
	for (let col = 0, index = map.width * row; col < map.width; col++, index++) if (row > 0 && row < map.height && map.map[index] == map.map[index - map.width]) {
		const pos = map.map[index];
		const attrs = table.nodeAt(pos).attrs;
		tr.setNodeMarkup(tableStart + pos, null, {
			...attrs,
			rowspan: attrs.rowspan + 1
		});
		col += attrs.colspan - 1;
	} else {
		var _table$nodeAt2;
		const type = refRow == null ? tableNodeTypes(table.type.schema).cell : (_table$nodeAt2 = table.nodeAt(map.map[index + refRow * map.width])) === null || _table$nodeAt2 === void 0 ? void 0 : _table$nodeAt2.type;
		const node = type === null || type === void 0 ? void 0 : type.createAndFill();
		if (node) cells.push(node);
	}
	tr.insert(rowPos, tableNodeTypes(table.type.schema).row.create(null, cells));
	return tr;
}
/**
* Add a table row before the selection.
*
* @public
*/
function addRowBefore(state, dispatch) {
	if (!isInTable(state)) return false;
	if (dispatch) {
		const rect = selectedRect(state);
		dispatch(addRow(state.tr, rect, rect.top));
	}
	return true;
}
/**
* Add a table row after the selection.
*
* @public
*/
function addRowAfter(state, dispatch) {
	if (!isInTable(state)) return false;
	if (dispatch) {
		const rect = selectedRect(state);
		dispatch(addRow(state.tr, rect, rect.bottom));
	}
	return true;
}
/**
* @public
*/
function removeRow(tr, { map, table, tableStart }, row) {
	let rowPos = 0;
	for (let i = 0; i < row; i++) rowPos += table.child(i).nodeSize;
	const nextRow = rowPos + table.child(row).nodeSize;
	const mapFrom = tr.mapping.maps.length;
	tr.delete(rowPos + tableStart, nextRow + tableStart);
	const seen = /* @__PURE__ */ new Set();
	for (let col = 0, index = row * map.width; col < map.width; col++, index++) {
		const pos = map.map[index];
		if (seen.has(pos)) continue;
		seen.add(pos);
		if (row > 0 && pos == map.map[index - map.width]) {
			const attrs = table.nodeAt(pos).attrs;
			tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + tableStart), null, {
				...attrs,
				rowspan: attrs.rowspan - 1
			});
			col += attrs.colspan - 1;
		} else if (row < map.height && pos == map.map[index + map.width]) {
			const cell = table.nodeAt(pos);
			const attrs = cell.attrs;
			const copy = cell.type.create({
				...attrs,
				rowspan: cell.attrs.rowspan - 1
			}, cell.content);
			const newPos = map.positionAt(row + 1, col, table);
			tr.insert(tr.mapping.slice(mapFrom).map(tableStart + newPos), copy);
			col += attrs.colspan - 1;
		}
	}
}
/**
* Remove the selected rows from a table.
*
* @public
*/
function deleteRow(state, dispatch) {
	if (!isInTable(state)) return false;
	if (dispatch) {
		const rect = selectedRect(state), tr = state.tr;
		if (rect.top == 0 && rect.bottom == rect.map.height) return false;
		for (let i = rect.bottom - 1;; i--) {
			removeRow(tr, rect, i);
			if (i == rect.top) break;
			const table = rect.tableStart ? tr.doc.nodeAt(rect.tableStart - 1) : tr.doc;
			if (!table) throw new RangeError("No table found");
			rect.table = table;
			rect.map = TableMap.get(rect.table);
		}
		dispatch(tr);
	}
	return true;
}
function isEmpty(cell) {
	const c = cell.content;
	return c.childCount == 1 && c.child(0).isTextblock && c.child(0).childCount == 0;
}
function cellsOverlapRectangle({ width, height, map }, rect) {
	let indexTop = rect.top * width + rect.left, indexLeft = indexTop;
	let indexBottom = (rect.bottom - 1) * width + rect.left, indexRight = indexTop + (rect.right - rect.left - 1);
	for (let i = rect.top; i < rect.bottom; i++) {
		if (rect.left > 0 && map[indexLeft] == map[indexLeft - 1] || rect.right < width && map[indexRight] == map[indexRight + 1]) return true;
		indexLeft += width;
		indexRight += width;
	}
	for (let i = rect.left; i < rect.right; i++) {
		if (rect.top > 0 && map[indexTop] == map[indexTop - width] || rect.bottom < height && map[indexBottom] == map[indexBottom + width]) return true;
		indexTop++;
		indexBottom++;
	}
	return false;
}
/**
* Merge the selected cells into a single cell. Only available when
* the selected cells' outline forms a rectangle.
*
* @public
*/
function mergeCells(state, dispatch) {
	const sel = state.selection;
	if (!(sel instanceof CellSelection) || sel.$anchorCell.pos == sel.$headCell.pos) return false;
	const rect = selectedRect(state), { map } = rect;
	if (cellsOverlapRectangle(map, rect)) return false;
	if (dispatch) {
		const tr = state.tr;
		const seen = {};
		let content = index.Fragment.empty;
		let mergedPos;
		let mergedCell;
		for (let row = rect.top; row < rect.bottom; row++) for (let col = rect.left; col < rect.right; col++) {
			const cellPos = map.map[row * map.width + col];
			const cell = rect.table.nodeAt(cellPos);
			if (seen[cellPos] || !cell) continue;
			seen[cellPos] = true;
			if (mergedPos == null) {
				mergedPos = cellPos;
				mergedCell = cell;
			} else {
				if (!isEmpty(cell)) content = content.append(cell.content);
				const mapped = tr.mapping.map(cellPos + rect.tableStart);
				tr.delete(mapped, mapped + cell.nodeSize);
			}
		}
		if (mergedPos == null || mergedCell == null) return true;
		tr.setNodeMarkup(mergedPos + rect.tableStart, null, {
			...addColSpan(mergedCell.attrs, mergedCell.attrs.colspan, rect.right - rect.left - mergedCell.attrs.colspan),
			rowspan: rect.bottom - rect.top
		});
		if (content.size > 0) {
			const end = mergedPos + 1 + mergedCell.content.size;
			const start = isEmpty(mergedCell) ? mergedPos + 1 : end;
			tr.replaceWith(start + rect.tableStart, end + rect.tableStart, content);
		}
		tr.setSelection(new CellSelection(tr.doc.resolve(mergedPos + rect.tableStart)));
		dispatch(tr);
	}
	return true;
}
/**
* Split a selected cell, whose rowpan or colspan is greater than one,
* into smaller cells. Use the first cell type for the new cells.
*
* @public
*/
function splitCell(state, dispatch) {
	const nodeTypes = tableNodeTypes(state.schema);
	return splitCellWithType(({ node }) => {
		return nodeTypes[node.type.spec.tableRole];
	})(state, dispatch);
}
/**
* Split a selected cell, whose rowpan or colspan is greater than one,
* into smaller cells with the cell type (th, td) returned by getType function.
*
* @public
*/
function splitCellWithType(getCellType) {
	return (state, dispatch) => {
		const sel = state.selection;
		let cellNode;
		let cellPos;
		if (!(sel instanceof CellSelection)) {
			var _cellAround;
			cellNode = cellWrapping(sel.$from);
			if (!cellNode) return false;
			cellPos = (_cellAround = cellAround(sel.$from)) === null || _cellAround === void 0 ? void 0 : _cellAround.pos;
		} else {
			if (sel.$anchorCell.pos != sel.$headCell.pos) return false;
			cellNode = sel.$anchorCell.nodeAfter;
			cellPos = sel.$anchorCell.pos;
		}
		if (cellNode == null || cellPos == null) return false;
		if (cellNode.attrs.colspan == 1 && cellNode.attrs.rowspan == 1) return false;
		if (dispatch) {
			let baseAttrs = cellNode.attrs;
			const attrs = [];
			const colwidth = baseAttrs.colwidth;
			if (baseAttrs.rowspan > 1) baseAttrs = {
				...baseAttrs,
				rowspan: 1
			};
			if (baseAttrs.colspan > 1) baseAttrs = {
				...baseAttrs,
				colspan: 1
			};
			const rect = selectedRect(state), tr = state.tr;
			for (let i = 0; i < rect.right - rect.left; i++) attrs.push(colwidth ? {
				...baseAttrs,
				colwidth: colwidth && colwidth[i] ? [colwidth[i]] : null
			} : baseAttrs);
			let lastCell;
			for (let row = rect.top; row < rect.bottom; row++) {
				let pos = rect.map.positionAt(row, rect.left, rect.table);
				if (row == rect.top) pos += cellNode.nodeSize;
				for (let col = rect.left, i = 0; col < rect.right; col++, i++) {
					if (col == rect.left && row == rect.top) continue;
					tr.insert(lastCell = tr.mapping.map(pos + rect.tableStart, 1), getCellType({
						node: cellNode,
						row,
						col
					}).createAndFill(attrs[i]));
				}
			}
			tr.setNodeMarkup(cellPos, getCellType({
				node: cellNode,
				row: rect.top,
				col: rect.left
			}), attrs[0]);
			if (sel instanceof CellSelection) tr.setSelection(new CellSelection(tr.doc.resolve(sel.$anchorCell.pos), lastCell ? tr.doc.resolve(lastCell) : void 0));
			dispatch(tr);
		}
		return true;
	};
}
/**
* Returns a command that sets the given attribute to the given value,
* and is only available when the currently selected cell doesn't
* already have that attribute set to that value.
*
* @public
*/
function setCellAttr(name, value) {
	return function(state, dispatch) {
		if (!isInTable(state)) return false;
		const $cell = selectionCell(state);
		if ($cell.nodeAfter.attrs[name] === value) return false;
		if (dispatch) {
			const tr = state.tr;
			if (state.selection instanceof CellSelection) state.selection.forEachCell((node, pos) => {
				if (node.attrs[name] !== value) tr.setNodeMarkup(pos, null, {
					...node.attrs,
					[name]: value
				});
			});
			else tr.setNodeMarkup($cell.pos, null, {
				...$cell.nodeAfter.attrs,
				[name]: value
			});
			dispatch(tr);
		}
		return true;
	};
}
function deprecated_toggleHeader(type) {
	return function(state, dispatch) {
		if (!isInTable(state)) return false;
		if (dispatch) {
			const types = tableNodeTypes(state.schema);
			const rect = selectedRect(state), tr = state.tr;
			const cells = rect.map.cellsInRect(type == "column" ? {
				left: rect.left,
				top: 0,
				right: rect.right,
				bottom: rect.map.height
			} : type == "row" ? {
				left: 0,
				top: rect.top,
				right: rect.map.width,
				bottom: rect.bottom
			} : rect);
			const nodes = cells.map((pos) => rect.table.nodeAt(pos));
			for (let i = 0; i < cells.length; i++) if (nodes[i].type == types.header_cell) tr.setNodeMarkup(rect.tableStart + cells[i], types.cell, nodes[i].attrs);
			if (tr.steps.length === 0) for (let i = 0; i < cells.length; i++) tr.setNodeMarkup(rect.tableStart + cells[i], types.header_cell, nodes[i].attrs);
			dispatch(tr);
		}
		return true;
	};
}
function isHeaderEnabledByType(type, rect, types) {
	const cellPositions = rect.map.cellsInRect({
		left: 0,
		top: 0,
		right: type == "row" ? rect.map.width : 1,
		bottom: type == "column" ? rect.map.height : 1
	});
	for (let i = 0; i < cellPositions.length; i++) {
		const cell = rect.table.nodeAt(cellPositions[i]);
		if (cell && cell.type !== types.header_cell) return false;
	}
	return true;
}
/**
* Toggles between row/column header and normal cells (Only applies to first row/column).
* For deprecated behavior pass `useDeprecatedLogic` in options with true.
*
* @public
*/
function toggleHeader(type, options) {
	options = options || { useDeprecatedLogic: false };
	if (options.useDeprecatedLogic) return deprecated_toggleHeader(type);
	return function(state, dispatch) {
		if (!isInTable(state)) return false;
		if (dispatch) {
			const types = tableNodeTypes(state.schema);
			const rect = selectedRect(state), tr = state.tr;
			const isHeaderRowEnabled = isHeaderEnabledByType("row", rect, types);
			const isHeaderColumnEnabled = isHeaderEnabledByType("column", rect, types);
			const selectionStartsAt = (type === "column" ? isHeaderRowEnabled : type === "row" ? isHeaderColumnEnabled : false) ? 1 : 0;
			const cellsRect = type == "column" ? {
				left: 0,
				top: selectionStartsAt,
				right: 1,
				bottom: rect.map.height
			} : type == "row" ? {
				left: selectionStartsAt,
				top: 0,
				right: rect.map.width,
				bottom: 1
			} : rect;
			const newType = type == "column" ? isHeaderColumnEnabled ? types.cell : types.header_cell : type == "row" ? isHeaderRowEnabled ? types.cell : types.header_cell : types.cell;
			rect.map.cellsInRect(cellsRect).forEach((relativeCellPos) => {
				const cellPos = relativeCellPos + rect.tableStart;
				const cell = tr.doc.nodeAt(cellPos);
				if (cell) tr.setNodeMarkup(cellPos, newType, cell.attrs);
			});
			dispatch(tr);
		}
		return true;
	};
}
/**
* Toggles whether the selected row contains header cells.
*
* @public
*/
toggleHeader("row", { useDeprecatedLogic: true });
/**
* Toggles whether the selected column contains header cells.
*
* @public
*/
toggleHeader("column", { useDeprecatedLogic: true });
/**
* Toggles whether the selected cells are header cells.
*
* @public
*/
const toggleHeaderCell = toggleHeader("cell", { useDeprecatedLogic: true });
function findNextCell($cell, dir) {
	if (dir < 0) {
		const before = $cell.nodeBefore;
		if (before) return $cell.pos - before.nodeSize;
		for (let row = $cell.index(-1) - 1, rowEnd = $cell.before(); row >= 0; row--) {
			const rowNode = $cell.node(-1).child(row);
			const lastChild = rowNode.lastChild;
			if (lastChild) return rowEnd - 1 - lastChild.nodeSize;
			rowEnd -= rowNode.nodeSize;
		}
	} else {
		if ($cell.index() < $cell.parent.childCount - 1) return $cell.pos + $cell.nodeAfter.nodeSize;
		const table = $cell.node(-1);
		for (let row = $cell.indexAfter(-1), rowStart = $cell.after(); row < table.childCount; row++) {
			const rowNode = table.child(row);
			if (rowNode.childCount) return rowStart + 1;
			rowStart += rowNode.nodeSize;
		}
	}
	return null;
}
/**
* Returns a command for selecting the next (direction=1) or previous
* (direction=-1) cell in a table.
*
* @public
*/
function goToNextCell(direction) {
	return function(state, dispatch) {
		if (!isInTable(state)) return false;
		const cell = findNextCell(selectionCell(state), direction);
		if (cell == null) return false;
		if (dispatch) {
			const $cell = state.doc.resolve(cell);
			dispatch(state.tr.setSelection(index.TextSelection.between($cell, moveCellForward($cell))).scrollIntoView());
		}
		return true;
	};
}
/**
* Deletes the table around the selection, if any.
*
* @public
*/
function deleteTable(state, dispatch) {
	const $pos = state.selection.$anchor;
	for (let d = $pos.depth; d > 0; d--) if ($pos.node(d).type.spec.tableRole == "table") {
		if (dispatch) dispatch(state.tr.delete($pos.before(d), $pos.after(d)).scrollIntoView());
		return true;
	}
	return false;
}
/**
* Deletes the content of the selected cells, if they are not empty.
*
* @public
*/
function deleteCellSelection(state, dispatch) {
	const sel = state.selection;
	if (!(sel instanceof CellSelection)) return false;
	if (dispatch) {
		const tr = state.tr;
		const baseContent = tableNodeTypes(state.schema).cell.createAndFill().content;
		sel.forEachCell((cell, pos) => {
			if (!cell.content.eq(baseContent)) tr.replace(tr.mapping.map(pos + 1), tr.mapping.map(pos + cell.nodeSize - 1), new index.Slice(baseContent, 0, 0));
		});
		if (tr.docChanged) dispatch(tr);
	}
	return true;
}

//#endregion
//#region src/copypaste.ts
/**
* Get a rectangular area of cells from a slice, or null if the outer
* nodes of the slice aren't table cells or rows.
*
* @internal
*/
function pastedCells(slice) {
	if (slice.size === 0) return null;
	let { content, openStart, openEnd } = slice;
	while (content.childCount == 1 && (openStart > 0 && openEnd > 0 || content.child(0).type.spec.tableRole == "table")) {
		openStart--;
		openEnd--;
		content = content.child(0).content;
	}
	const first = content.child(0);
	const role = first.type.spec.tableRole;
	const schema = first.type.schema, rows = [];
	if (role == "row") for (let i = 0; i < content.childCount; i++) {
		let cells = content.child(i).content;
		const left = i ? 0 : Math.max(0, openStart - 1);
		const right = i < content.childCount - 1 ? 0 : Math.max(0, openEnd - 1);
		if (left || right) cells = fitSlice(tableNodeTypes(schema).row, new index.Slice(cells, left, right)).content;
		rows.push(cells);
	}
	else if (role == "cell" || role == "header_cell") rows.push(openStart || openEnd ? fitSlice(tableNodeTypes(schema).row, new index.Slice(content, openStart, openEnd)).content : content);
	else return null;
	return ensureRectangular(schema, rows);
}
function ensureRectangular(schema, rows) {
	const widths = [];
	for (let i = 0; i < rows.length; i++) {
		const row = rows[i];
		for (let j = row.childCount - 1; j >= 0; j--) {
			const { rowspan, colspan } = row.child(j).attrs;
			for (let r = i; r < i + rowspan; r++) widths[r] = (widths[r] || 0) + colspan;
		}
	}
	let width = 0;
	for (let r = 0; r < widths.length; r++) width = Math.max(width, widths[r]);
	for (let r = 0; r < widths.length; r++) {
		if (r >= rows.length) rows.push(index.Fragment.empty);
		if (widths[r] < width) {
			const empty = tableNodeTypes(schema).cell.createAndFill();
			const cells = [];
			for (let i = widths[r]; i < width; i++) cells.push(empty);
			rows[r] = rows[r].append(index.Fragment.from(cells));
		}
	}
	return {
		height: rows.length,
		width,
		rows
	};
}
function fitSlice(nodeType, slice) {
	const node = nodeType.createAndFill();
	return new index.Transform(node).replace(0, node.content.size, slice).doc;
}
/**
* Clip or extend (repeat) the given set of cells to cover the given
* width and height. Will clip rowspan/colspan cells at the edges when
* they stick out.
*
* @internal
*/
function clipCells({ width, height, rows }, newWidth, newHeight) {
	if (width != newWidth) {
		const added = [];
		const newRows = [];
		for (let row = 0; row < rows.length; row++) {
			const frag = rows[row], cells = [];
			for (let col = added[row] || 0, i = 0; col < newWidth; i++) {
				let cell = frag.child(i % frag.childCount);
				if (col + cell.attrs.colspan > newWidth) cell = cell.type.createChecked(removeColSpan(cell.attrs, cell.attrs.colspan, col + cell.attrs.colspan - newWidth), cell.content);
				cells.push(cell);
				col += cell.attrs.colspan;
				for (let j = 1; j < cell.attrs.rowspan; j++) added[row + j] = (added[row + j] || 0) + cell.attrs.colspan;
			}
			newRows.push(index.Fragment.from(cells));
		}
		rows = newRows;
		width = newWidth;
	}
	if (height != newHeight) {
		const newRows = [];
		for (let row = 0, i = 0; row < newHeight; row++, i++) {
			const cells = [], source = rows[i % height];
			for (let j = 0; j < source.childCount; j++) {
				let cell = source.child(j);
				if (row + cell.attrs.rowspan > newHeight) cell = cell.type.create({
					...cell.attrs,
					rowspan: Math.max(1, newHeight - cell.attrs.rowspan)
				}, cell.content);
				cells.push(cell);
			}
			newRows.push(index.Fragment.from(cells));
		}
		rows = newRows;
		height = newHeight;
	}
	return {
		width,
		height,
		rows
	};
}
function growTable(tr, map, table, start, width, height, mapFrom) {
	const schema = tr.doc.type.schema;
	const types = tableNodeTypes(schema);
	let empty;
	let emptyHead;
	if (width > map.width) for (let row = 0, rowEnd = 0; row < map.height; row++) {
		const rowNode = table.child(row);
		rowEnd += rowNode.nodeSize;
		const cells = [];
		let add;
		if (rowNode.lastChild == null || rowNode.lastChild.type == types.cell) add = empty || (empty = types.cell.createAndFill());
		else add = emptyHead || (emptyHead = types.header_cell.createAndFill());
		for (let i = map.width; i < width; i++) cells.push(add);
		tr.insert(tr.mapping.slice(mapFrom).map(rowEnd - 1 + start), cells);
	}
	if (height > map.height) {
		const cells = [];
		for (let i = 0, start$1 = (map.height - 1) * map.width; i < Math.max(map.width, width); i++) {
			const header = i >= map.width ? false : table.nodeAt(map.map[start$1 + i]).type == types.header_cell;
			cells.push(header ? emptyHead || (emptyHead = types.header_cell.createAndFill()) : empty || (empty = types.cell.createAndFill()));
		}
		const emptyRow = types.row.create(null, index.Fragment.from(cells)), rows = [];
		for (let i = map.height; i < height; i++) rows.push(emptyRow);
		tr.insert(tr.mapping.slice(mapFrom).map(start + table.nodeSize - 2), rows);
	}
	return !!(empty || emptyHead);
}
function isolateHorizontal(tr, map, table, start, left, right, top, mapFrom) {
	if (top == 0 || top == map.height) return false;
	let found = false;
	for (let col = left; col < right; col++) {
		const index = top * map.width + col, pos = map.map[index];
		if (map.map[index - map.width] == pos) {
			found = true;
			const cell = table.nodeAt(pos);
			const { top: cellTop, left: cellLeft } = map.findCell(pos);
			tr.setNodeMarkup(tr.mapping.slice(mapFrom).map(pos + start), null, {
				...cell.attrs,
				rowspan: top - cellTop
			});
			tr.insert(tr.mapping.slice(mapFrom).map(map.positionAt(top, cellLeft, table)), cell.type.createAndFill({
				...cell.attrs,
				rowspan: cellTop + cell.attrs.rowspan - top
			}));
			col += cell.attrs.colspan - 1;
		}
	}
	return found;
}
function isolateVertical(tr, map, table, start, top, bottom, left, mapFrom) {
	if (left == 0 || left == map.width) return false;
	let found = false;
	for (let row = top; row < bottom; row++) {
		const index = row * map.width + left, pos = map.map[index];
		if (map.map[index - 1] == pos) {
			found = true;
			const cell = table.nodeAt(pos);
			const cellLeft = map.colCount(pos);
			const updatePos = tr.mapping.slice(mapFrom).map(pos + start);
			tr.setNodeMarkup(updatePos, null, removeColSpan(cell.attrs, left - cellLeft, cell.attrs.colspan - (left - cellLeft)));
			tr.insert(updatePos + cell.nodeSize, cell.type.createAndFill(removeColSpan(cell.attrs, 0, left - cellLeft)));
			row += cell.attrs.rowspan - 1;
		}
	}
	return found;
}
/**
* Insert the given set of cells (as returned by `pastedCells`) into a
* table, at the position pointed at by rect.
*
* @internal
*/
function insertCells(state, dispatch, tableStart, rect, cells) {
	let table = tableStart ? state.doc.nodeAt(tableStart - 1) : state.doc;
	if (!table) throw new Error("No table found");
	let map = TableMap.get(table);
	const { top, left } = rect;
	const right = left + cells.width, bottom = top + cells.height;
	const tr = state.tr;
	let mapFrom = 0;
	function recomp() {
		table = tableStart ? tr.doc.nodeAt(tableStart - 1) : tr.doc;
		if (!table) throw new Error("No table found");
		map = TableMap.get(table);
		mapFrom = tr.mapping.maps.length;
	}
	if (growTable(tr, map, table, tableStart, right, bottom, mapFrom)) recomp();
	if (isolateHorizontal(tr, map, table, tableStart, left, right, top, mapFrom)) recomp();
	if (isolateHorizontal(tr, map, table, tableStart, left, right, bottom, mapFrom)) recomp();
	if (isolateVertical(tr, map, table, tableStart, top, bottom, left, mapFrom)) recomp();
	if (isolateVertical(tr, map, table, tableStart, top, bottom, right, mapFrom)) recomp();
	for (let row = top; row < bottom; row++) {
		const from = map.positionAt(row, left, table), to = map.positionAt(row, right, table);
		tr.replace(tr.mapping.slice(mapFrom).map(from + tableStart), tr.mapping.slice(mapFrom).map(to + tableStart), new index.Slice(cells.rows[row - top], 0, 0));
	}
	recomp();
	tr.setSelection(new CellSelection(tr.doc.resolve(tableStart + map.positionAt(top, left, table)), tr.doc.resolve(tableStart + map.positionAt(bottom - 1, right - 1, table))));
	dispatch(tr);
}

//#endregion
//#region src/input.ts
const handleKeyDown = index.keydownHandler({
	ArrowLeft: arrow("horiz", -1),
	ArrowRight: arrow("horiz", 1),
	ArrowUp: arrow("vert", -1),
	ArrowDown: arrow("vert", 1),
	"Shift-ArrowLeft": shiftArrow("horiz", -1),
	"Shift-ArrowRight": shiftArrow("horiz", 1),
	"Shift-ArrowUp": shiftArrow("vert", -1),
	"Shift-ArrowDown": shiftArrow("vert", 1),
	Backspace: deleteCellSelection,
	"Mod-Backspace": deleteCellSelection,
	Delete: deleteCellSelection,
	"Mod-Delete": deleteCellSelection
});
function maybeSetSelection(state, dispatch, selection) {
	if (selection.eq(state.selection)) return false;
	if (dispatch) dispatch(state.tr.setSelection(selection).scrollIntoView());
	return true;
}
/**
* @internal
*/
function arrow(axis, dir) {
	return (state, dispatch, view) => {
		if (!view) return false;
		const sel = state.selection;
		if (sel instanceof CellSelection) return maybeSetSelection(state, dispatch, index.Selection.near(sel.$headCell, dir));
		if (axis != "horiz" && !sel.empty) return false;
		const end = atEndOfCell(view, axis, dir);
		if (end == null) return false;
		if (axis == "horiz") return maybeSetSelection(state, dispatch, index.Selection.near(state.doc.resolve(sel.head + dir), dir));
		else {
			const $cell = state.doc.resolve(end);
			const $next = nextCell($cell, axis, dir);
			let newSel;
			if ($next) newSel = index.Selection.near($next, 1);
			else if (dir < 0) newSel = index.Selection.near(state.doc.resolve($cell.before(-1)), -1);
			else newSel = index.Selection.near(state.doc.resolve($cell.after(-1)), 1);
			return maybeSetSelection(state, dispatch, newSel);
		}
	};
}
function shiftArrow(axis, dir) {
	return (state, dispatch, view) => {
		if (!view) return false;
		const sel = state.selection;
		let cellSel;
		if (sel instanceof CellSelection) cellSel = sel;
		else {
			const end = atEndOfCell(view, axis, dir);
			if (end == null) return false;
			cellSel = new CellSelection(state.doc.resolve(end));
		}
		const $head = nextCell(cellSel.$headCell, axis, dir);
		if (!$head) return false;
		return maybeSetSelection(state, dispatch, new CellSelection(cellSel.$anchorCell, $head));
	};
}
function handleTripleClick(view, pos) {
	const doc = view.state.doc, $cell = cellAround(doc.resolve(pos));
	if (!$cell) return false;
	view.dispatch(view.state.tr.setSelection(new CellSelection($cell)));
	return true;
}
/**
* @public
*/
function handlePaste(view, _, slice) {
	if (!isInTable(view.state)) return false;
	let cells = pastedCells(slice);
	const sel = view.state.selection;
	if (sel instanceof CellSelection) {
		if (!cells) cells = {
			width: 1,
			height: 1,
			rows: [index.Fragment.from(fitSlice(tableNodeTypes(view.state.schema).cell, slice))]
		};
		const table = sel.$anchorCell.node(-1);
		const start = sel.$anchorCell.start(-1);
		const rect = TableMap.get(table).rectBetween(sel.$anchorCell.pos - start, sel.$headCell.pos - start);
		cells = clipCells(cells, rect.right - rect.left, rect.bottom - rect.top);
		insertCells(view.state, view.dispatch, start, rect, cells);
		return true;
	} else if (cells) {
		const $cell = selectionCell(view.state);
		const start = $cell.start(-1);
		insertCells(view.state, view.dispatch, start, TableMap.get($cell.node(-1)).findCell($cell.pos - start), cells);
		return true;
	} else return false;
}
function handleMouseDown$1(view, startEvent) {
	var _cellUnderMouse;
	if (startEvent.button != 0) return;
	if (startEvent.ctrlKey || startEvent.metaKey) return;
	const startDOMCell = domInCell(view, startEvent.target);
	let $anchor;
	if (startEvent.shiftKey && view.state.selection instanceof CellSelection) {
		setCellSelection(view.state.selection.$anchorCell, startEvent);
		startEvent.preventDefault();
	} else if (startEvent.shiftKey && startDOMCell && ($anchor = cellAround(view.state.selection.$anchor)) != null && ((_cellUnderMouse = cellUnderMouse(view, startEvent)) === null || _cellUnderMouse === void 0 ? void 0 : _cellUnderMouse.pos) != $anchor.pos) {
		setCellSelection($anchor, startEvent);
		startEvent.preventDefault();
	} else if (!startDOMCell) return;
	function setCellSelection($anchor$1, event) {
		let $head = cellUnderMouse(view, event);
		const starting = tableEditingKey.getState(view.state) == null;
		if (!$head || !inSameTable($anchor$1, $head)) if (starting) $head = $anchor$1;
		else return;
		const selection = new CellSelection($anchor$1, $head);
		if (starting || !view.state.selection.eq(selection)) {
			const tr = view.state.tr.setSelection(selection);
			if (starting) tr.setMeta(tableEditingKey, $anchor$1.pos);
			view.dispatch(tr);
		}
	}
	function stop() {
		view.root.removeEventListener("mouseup", stop);
		view.root.removeEventListener("dragstart", stop);
		view.root.removeEventListener("mousemove", move);
		if (tableEditingKey.getState(view.state) != null) view.dispatch(view.state.tr.setMeta(tableEditingKey, -1));
	}
	function move(_event) {
		const event = _event;
		const anchor = tableEditingKey.getState(view.state);
		let $anchor$1;
		if (anchor != null) $anchor$1 = view.state.doc.resolve(anchor);
		else if (domInCell(view, event.target) != startDOMCell) {
			$anchor$1 = cellUnderMouse(view, startEvent);
			if (!$anchor$1) return stop();
		}
		if ($anchor$1) setCellSelection($anchor$1, event);
	}
	view.root.addEventListener("mouseup", stop);
	view.root.addEventListener("dragstart", stop);
	view.root.addEventListener("mousemove", move);
}
function atEndOfCell(view, axis, dir) {
	if (!(view.state.selection instanceof index.TextSelection)) return null;
	const { $head } = view.state.selection;
	for (let d = $head.depth - 1; d >= 0; d--) {
		const parent = $head.node(d);
		if ((dir < 0 ? $head.index(d) : $head.indexAfter(d)) != (dir < 0 ? 0 : parent.childCount)) return null;
		if (parent.type.spec.tableRole == "cell" || parent.type.spec.tableRole == "header_cell") {
			const cellPos = $head.before(d);
			const dirStr = axis == "vert" ? dir > 0 ? "down" : "up" : dir > 0 ? "right" : "left";
			return view.endOfTextblock(dirStr) ? cellPos : null;
		}
	}
	return null;
}
function domInCell(view, dom) {
	for (; dom && dom != view.dom; dom = dom.parentNode) if (dom.nodeName == "TD" || dom.nodeName == "TH") return dom;
	return null;
}
function cellUnderMouse(view, event) {
	const mousePos = view.posAtCoords({
		left: event.clientX,
		top: event.clientY
	});
	if (!mousePos) return null;
	let { inside, pos } = mousePos;
	return inside >= 0 && cellAround(view.state.doc.resolve(inside)) || cellAround(view.state.doc.resolve(pos));
}

//#endregion
//#region src/tableview.ts
/**
* @public
*/
var TableView$1 = class {
	constructor(node, defaultCellMinWidth) {
		this.node = node;
		this.defaultCellMinWidth = defaultCellMinWidth;
		this.dom = document.createElement("div");
		this.dom.className = "tableWrapper";
		this.table = this.dom.appendChild(document.createElement("table"));
		this.table.style.setProperty("--default-cell-min-width", `${defaultCellMinWidth}px`);
		this.colgroup = this.table.appendChild(document.createElement("colgroup"));
		updateColumnsOnResize(node, this.colgroup, this.table, defaultCellMinWidth);
		this.contentDOM = this.table.appendChild(document.createElement("tbody"));
	}
	update(node) {
		if (node.type != this.node.type) return false;
		this.node = node;
		updateColumnsOnResize(node, this.colgroup, this.table, this.defaultCellMinWidth);
		return true;
	}
	ignoreMutation(record) {
		return record.type == "attributes" && (record.target == this.table || this.colgroup.contains(record.target));
	}
};
/**
* @public
*/
function updateColumnsOnResize(node, colgroup, table, defaultCellMinWidth, overrideCol, overrideValue) {
	let totalWidth = 0;
	let fixedWidth = true;
	let nextDOM = colgroup.firstChild;
	const row = node.firstChild;
	if (!row) return;
	for (let i = 0, col = 0; i < row.childCount; i++) {
		const { colspan, colwidth } = row.child(i).attrs;
		for (let j = 0; j < colspan; j++, col++) {
			const hasWidth = overrideCol == col ? overrideValue : colwidth && colwidth[j];
			const cssWidth = hasWidth ? hasWidth + "px" : "";
			totalWidth += hasWidth || defaultCellMinWidth;
			if (!hasWidth) fixedWidth = false;
			if (!nextDOM) {
				const col$1 = document.createElement("col");
				col$1.style.width = cssWidth;
				colgroup.appendChild(col$1);
			} else {
				if (nextDOM.style.width != cssWidth) nextDOM.style.width = cssWidth;
				nextDOM = nextDOM.nextSibling;
			}
		}
	}
	while (nextDOM) {
		var _nextDOM$parentNode;
		const after = nextDOM.nextSibling;
		(_nextDOM$parentNode = nextDOM.parentNode) === null || _nextDOM$parentNode === void 0 || _nextDOM$parentNode.removeChild(nextDOM);
		nextDOM = after;
	}
	if (fixedWidth) {
		table.style.width = totalWidth + "px";
		table.style.minWidth = "";
	} else {
		table.style.width = "";
		table.style.minWidth = totalWidth + "px";
	}
}

//#endregion
//#region src/columnresizing.ts
/**
* @public
*/
const columnResizingPluginKey = new index.PluginKey("tableColumnResizing");
/**
* @public
*/
function columnResizing({ handleWidth = 5, cellMinWidth = 25, defaultCellMinWidth = 100, View = TableView$1, lastColumnResizable = true } = {}) {
	const plugin = new index.Plugin({
		key: columnResizingPluginKey,
		state: {
			init(_, state) {
				var _plugin$spec;
				const nodeViews = (_plugin$spec = plugin.spec) === null || _plugin$spec === void 0 || (_plugin$spec = _plugin$spec.props) === null || _plugin$spec === void 0 ? void 0 : _plugin$spec.nodeViews;
				const tableName = tableNodeTypes(state.schema).table.name;
				if (View && nodeViews) nodeViews[tableName] = (node, view) => {
					return new View(node, defaultCellMinWidth, view);
				};
				return new ResizeState(-1, false);
			},
			apply(tr, prev) {
				return prev.apply(tr);
			}
		},
		props: {
			attributes: (state) => {
				const pluginState = columnResizingPluginKey.getState(state);
				return pluginState && pluginState.activeHandle > -1 ? { class: "resize-cursor" } : {};
			},
			handleDOMEvents: {
				mousemove: (view, event) => {
					handleMouseMove(view, event, handleWidth, lastColumnResizable);
				},
				mouseleave: (view) => {
					handleMouseLeave(view);
				},
				mousedown: (view, event) => {
					handleMouseDown(view, event, cellMinWidth, defaultCellMinWidth);
				}
			},
			decorations: (state) => {
				const pluginState = columnResizingPluginKey.getState(state);
				if (pluginState && pluginState.activeHandle > -1) return handleDecorations(state, pluginState.activeHandle);
			},
			nodeViews: {}
		}
	});
	return plugin;
}
/**
* @public
*/
var ResizeState = class ResizeState {
	constructor(activeHandle, dragging) {
		this.activeHandle = activeHandle;
		this.dragging = dragging;
	}
	apply(tr) {
		const state = this;
		const action = tr.getMeta(columnResizingPluginKey);
		if (action && action.setHandle != null) return new ResizeState(action.setHandle, false);
		if (action && action.setDragging !== void 0) return new ResizeState(state.activeHandle, action.setDragging);
		if (state.activeHandle > -1 && tr.docChanged) {
			let handle = tr.mapping.map(state.activeHandle, -1);
			if (!pointsAtCell(tr.doc.resolve(handle))) handle = -1;
			return new ResizeState(handle, state.dragging);
		}
		return state;
	}
};
function handleMouseMove(view, event, handleWidth, lastColumnResizable) {
	if (!view.editable) return;
	const pluginState = columnResizingPluginKey.getState(view.state);
	if (!pluginState) return;
	if (!pluginState.dragging) {
		const target = domCellAround(event.target);
		let cell = -1;
		if (target) {
			const { left, right } = target.getBoundingClientRect();
			if (event.clientX - left <= handleWidth) cell = edgeCell(view, event, "left", handleWidth);
			else if (right - event.clientX <= handleWidth) cell = edgeCell(view, event, "right", handleWidth);
		}
		if (cell != pluginState.activeHandle) {
			if (!lastColumnResizable && cell !== -1) {
				const $cell = view.state.doc.resolve(cell);
				const table = $cell.node(-1);
				const map = TableMap.get(table);
				const tableStart = $cell.start(-1);
				if (map.colCount($cell.pos - tableStart) + $cell.nodeAfter.attrs.colspan - 1 == map.width - 1) return;
			}
			updateHandle(view, cell);
		}
	}
}
function handleMouseLeave(view) {
	if (!view.editable) return;
	const pluginState = columnResizingPluginKey.getState(view.state);
	if (pluginState && pluginState.activeHandle > -1 && !pluginState.dragging) updateHandle(view, -1);
}
function handleMouseDown(view, event, cellMinWidth, defaultCellMinWidth) {
	var _view$dom$ownerDocume;
	if (!view.editable) return false;
	const win = (_view$dom$ownerDocume = view.dom.ownerDocument.defaultView) !== null && _view$dom$ownerDocume !== void 0 ? _view$dom$ownerDocume : window;
	const pluginState = columnResizingPluginKey.getState(view.state);
	if (!pluginState || pluginState.activeHandle == -1 || pluginState.dragging) return false;
	const cell = view.state.doc.nodeAt(pluginState.activeHandle);
	const width = currentColWidth(view, pluginState.activeHandle, cell.attrs);
	view.dispatch(view.state.tr.setMeta(columnResizingPluginKey, { setDragging: {
		startX: event.clientX,
		startWidth: width
	} }));
	function finish(event$1) {
		win.removeEventListener("mouseup", finish);
		win.removeEventListener("mousemove", move);
		const pluginState$1 = columnResizingPluginKey.getState(view.state);
		if (pluginState$1 === null || pluginState$1 === void 0 ? void 0 : pluginState$1.dragging) {
			updateColumnWidth(view, pluginState$1.activeHandle, draggedWidth(pluginState$1.dragging, event$1, cellMinWidth));
			view.dispatch(view.state.tr.setMeta(columnResizingPluginKey, { setDragging: null }));
		}
	}
	function move(event$1) {
		if (!event$1.which) return finish(event$1);
		const pluginState$1 = columnResizingPluginKey.getState(view.state);
		if (!pluginState$1) return;
		if (pluginState$1.dragging) {
			const dragged = draggedWidth(pluginState$1.dragging, event$1, cellMinWidth);
			displayColumnWidth(view, pluginState$1.activeHandle, dragged, defaultCellMinWidth);
		}
	}
	displayColumnWidth(view, pluginState.activeHandle, width, defaultCellMinWidth);
	win.addEventListener("mouseup", finish);
	win.addEventListener("mousemove", move);
	event.preventDefault();
	return true;
}
function currentColWidth(view, cellPos, { colspan, colwidth }) {
	const width = colwidth && colwidth[colwidth.length - 1];
	if (width) return width;
	const dom = view.domAtPos(cellPos);
	let domWidth = dom.node.childNodes[dom.offset].offsetWidth, parts = colspan;
	if (colwidth) {
		for (let i = 0; i < colspan; i++) if (colwidth[i]) {
			domWidth -= colwidth[i];
			parts--;
		}
	}
	return domWidth / parts;
}
function domCellAround(target) {
	while (target && target.nodeName != "TD" && target.nodeName != "TH") target = target.classList && target.classList.contains("ProseMirror") ? null : target.parentNode;
	return target;
}
function edgeCell(view, event, side, handleWidth) {
	const offset = side == "right" ? -handleWidth : handleWidth;
	const found = view.posAtCoords({
		left: event.clientX + offset,
		top: event.clientY
	});
	if (!found) return -1;
	const { pos } = found;
	const $cell = cellAround(view.state.doc.resolve(pos));
	if (!$cell) return -1;
	if (side == "right") return $cell.pos;
	const map = TableMap.get($cell.node(-1)), start = $cell.start(-1);
	const index = map.map.indexOf($cell.pos - start);
	return index % map.width == 0 ? -1 : start + map.map[index - 1];
}
function draggedWidth(dragging, event, resizeMinWidth) {
	const offset = event.clientX - dragging.startX;
	return Math.max(resizeMinWidth, dragging.startWidth + offset);
}
function updateHandle(view, value) {
	view.dispatch(view.state.tr.setMeta(columnResizingPluginKey, { setHandle: value }));
}
function updateColumnWidth(view, cell, width) {
	const $cell = view.state.doc.resolve(cell);
	const table = $cell.node(-1), map = TableMap.get(table), start = $cell.start(-1);
	const col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
	const tr = view.state.tr;
	for (let row = 0; row < map.height; row++) {
		const mapIndex = row * map.width + col;
		if (row && map.map[mapIndex] == map.map[mapIndex - map.width]) continue;
		const pos = map.map[mapIndex];
		const attrs = table.nodeAt(pos).attrs;
		const index = attrs.colspan == 1 ? 0 : col - map.colCount(pos);
		if (attrs.colwidth && attrs.colwidth[index] == width) continue;
		const colwidth = attrs.colwidth ? attrs.colwidth.slice() : zeroes(attrs.colspan);
		colwidth[index] = width;
		tr.setNodeMarkup(start + pos, null, {
			...attrs,
			colwidth
		});
	}
	if (tr.docChanged) view.dispatch(tr);
}
function displayColumnWidth(view, cell, width, defaultCellMinWidth) {
	const $cell = view.state.doc.resolve(cell);
	const table = $cell.node(-1), start = $cell.start(-1);
	const col = TableMap.get(table).colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
	let dom = view.domAtPos($cell.start(-1)).node;
	while (dom && dom.nodeName != "TABLE") dom = dom.parentNode;
	if (!dom) return;
	updateColumnsOnResize(table, dom.firstChild, dom, defaultCellMinWidth, col, width);
}
function zeroes(n) {
	return Array(n).fill(0);
}
function handleDecorations(state, cell) {
	const decorations = [];
	const $cell = state.doc.resolve(cell);
	const table = $cell.node(-1);
	if (!table) return index.DecorationSet.empty;
	const map = TableMap.get(table);
	const start = $cell.start(-1);
	const col = map.colCount($cell.pos - start) + $cell.nodeAfter.attrs.colspan - 1;
	for (let row = 0; row < map.height; row++) {
		const index$1 = col + row * map.width;
		if ((col == map.width - 1 || map.map[index$1] != map.map[index$1 + 1]) && (row == 0 || map.map[index$1] != map.map[index$1 - map.width])) {
			var _columnResizingPlugin;
			const cellPos = map.map[index$1];
			const pos = start + cellPos + table.nodeAt(cellPos).nodeSize - 1;
			const dom = document.createElement("div");
			dom.className = "column-resize-handle";
			if ((_columnResizingPlugin = columnResizingPluginKey.getState(state)) === null || _columnResizingPlugin === void 0 ? void 0 : _columnResizingPlugin.dragging) decorations.push(index.Decoration.node(start + cellPos, start + cellPos + table.nodeAt(cellPos).nodeSize, { class: "column-resize-dragging" }));
			decorations.push(index.Decoration.widget(pos, dom));
		}
	}
	return index.DecorationSet.create(state.doc, decorations);
}

//#endregion
//#region src/index.ts
/**
* Creates a [plugin](http://prosemirror.net/docs/ref/#state.Plugin)
* that, when added to an editor, enables cell-selection, handles
* cell-based copy/paste, and makes sure tables stay well-formed (each
* row has the same width, and cells don't overlap).
*
* You should probably put this plugin near the end of your array of
* plugins, since it handles mouse and arrow key events in tables
* rather broadly, and other plugins, like the gap cursor or the
* column-width dragging plugin, might want to get a turn first to
* perform more specific behavior.
*
* @public
*/
function tableEditing({ allowTableNodeSelection = false } = {}) {
	return new index.Plugin({
		key: tableEditingKey,
		state: {
			init() {
				return null;
			},
			apply(tr, cur) {
				const set = tr.getMeta(tableEditingKey);
				if (set != null) return set == -1 ? null : set;
				if (cur == null || !tr.docChanged) return cur;
				const { deleted, pos } = tr.mapping.mapResult(cur);
				return deleted ? null : pos;
			}
		},
		props: {
			decorations: drawCellSelection,
			handleDOMEvents: { mousedown: handleMouseDown$1 },
			createSelectionBetween(view) {
				return tableEditingKey.getState(view.state) != null ? view.state.selection : null;
			},
			handleTripleClick,
			handleKeyDown,
			handlePaste
		},
		appendTransaction(_, oldState, state) {
			return normalizeSelection(state, fixTables(state, oldState), allowTableNodeSelection);
		}
	});
}

// src/cell/table-cell.ts

// src/utilities/parseAlign.ts
function normalizeTableCellAlign(value) {
  if (value === "left" /* Left */ || value === "right" /* Right */ || value === "center" /* Center */) {
    return value;
  }
  return null;
}
function parseAlign(element) {
  const styleAlign = (element.style.textAlign || "").trim().toLowerCase();
  const attrAlign = (element.getAttribute("align") || "").trim().toLowerCase();
  const align = styleAlign || attrAlign;
  return normalizeTableCellAlign(align);
}
function normalizeTableCellAlignFromAttributes(attributes) {
  return normalizeTableCellAlign(attributes == null ? void 0 : attributes.align);
}
function createAlignAttribute() {
  return {
    default: null,
    parseHTML: (element) => parseAlign(element),
    renderHTML: (attributes) => {
      if (!attributes.align) {
        return {};
      }
      return {
        style: `text-align: ${attributes.align}`
      };
    }
  };
}

// src/cell/table-cell.ts
var TableCell = index.Node3.create({
  name: "tableCell",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          var _a, _b;
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? colwidth.split(",").map((width) => parseInt(width, 10)) : null;
          if (!value) {
            const cols = (_a = element.closest("table")) == null ? void 0 : _a.querySelectorAll("colgroup > col");
            const cellIndex = Array.from(((_b = element.parentElement) == null ? void 0 : _b.children) || []).indexOf(element);
            if (cellIndex && cellIndex > -1 && cols && cols[cellIndex]) {
              const colWidth = cols[cellIndex].getAttribute("width");
              return colWidth ? [parseInt(colWidth, 10)] : null;
            }
          }
          return value;
        }
      },
      align: createAlignAttribute()
    };
  },
  tableRole: "cell",
  isolating: true,
  parseHTML() {
    return [{ tag: "td" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["td", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});
var TableHeader = index.Node3.create({
  name: "tableHeader",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "block+",
  addAttributes() {
    return {
      colspan: {
        default: 1
      },
      rowspan: {
        default: 1
      },
      colwidth: {
        default: null,
        parseHTML: (element) => {
          const colwidth = element.getAttribute("colwidth");
          const value = colwidth ? colwidth.split(",").map((width) => parseInt(width, 10)) : null;
          return value;
        }
      },
      align: createAlignAttribute()
    };
  },
  tableRole: "header_cell",
  isolating: true,
  parseHTML() {
    return [{ tag: "th" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["th", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});
var TableRow = index.Node3.create({
  name: "tableRow",
  addOptions() {
    return {
      HTMLAttributes: {}
    };
  },
  content: "(tableCell | tableHeader)*",
  tableRole: "row",
  parseHTML() {
    return [{ tag: "tr" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["tr", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0];
  }
});

// src/table/utilities/colStyle.ts
function getColStyleDeclaration(minWidth, width) {
  if (width) {
    return ["width", `${Math.max(width, minWidth)}px`];
  }
  return ["min-width", `${minWidth}px`];
}

// src/table/TableView.ts
function updateColumns(node, colgroup, table, cellMinWidth, overrideCol, overrideValue) {
  var _a;
  let totalWidth = 0;
  let fixedWidth = true;
  let nextDOM = colgroup.firstChild;
  const row = node.firstChild;
  if (row !== null) {
    for (let i = 0, col = 0; i < row.childCount; i += 1) {
      const { colspan, colwidth } = row.child(i).attrs;
      for (let j = 0; j < colspan; j += 1, col += 1) {
        const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
        const cssWidth = hasWidth ? `${hasWidth}px` : "";
        totalWidth += hasWidth || cellMinWidth;
        if (!hasWidth) {
          fixedWidth = false;
        }
        if (!nextDOM) {
          const colElement = document.createElement("col");
          const [propertyKey, propertyValue] = getColStyleDeclaration(cellMinWidth, hasWidth);
          colElement.style.setProperty(propertyKey, propertyValue);
          colgroup.appendChild(colElement);
        } else {
          if (nextDOM.style.width !== cssWidth) {
            const [propertyKey, propertyValue] = getColStyleDeclaration(cellMinWidth, hasWidth);
            nextDOM.style.setProperty(propertyKey, propertyValue);
          }
          nextDOM = nextDOM.nextSibling;
        }
      }
    }
  }
  while (nextDOM) {
    const after = nextDOM.nextSibling;
    (_a = nextDOM.parentNode) == null ? void 0 : _a.removeChild(nextDOM);
    nextDOM = after;
  }
  const hasUserWidth = node.attrs.style && typeof node.attrs.style === "string" && /\bwidth\s*:/i.test(node.attrs.style);
  if (fixedWidth && !hasUserWidth) {
    table.style.width = `${totalWidth}px`;
    table.style.minWidth = "";
  } else {
    table.style.width = "";
    table.style.minWidth = `${totalWidth}px`;
  }
}
var TableView = class {
  constructor(node, cellMinWidth, _view, HTMLAttributes = {}) {
    this.node = node;
    this.cellMinWidth = cellMinWidth;
    this.dom = document.createElement("div");
    this.dom.className = "tableWrapper";
    this.table = this.dom.appendChild(document.createElement("table"));
    for (const [key, value] of Object.entries(HTMLAttributes)) {
      if (value !== void 0 && value !== null) {
        if (key === "style") {
          this.table.style.cssText = String(value);
        } else {
          this.table.setAttribute(key, String(value));
        }
      }
    }
    if (node.attrs.style) {
      this.table.style.cssText = node.attrs.style;
    }
    this.colgroup = this.table.appendChild(document.createElement("colgroup"));
    updateColumns(node, this.colgroup, this.table, cellMinWidth);
    this.contentDOM = this.table.appendChild(document.createElement("tbody"));
  }
  update(node) {
    if (node.type !== this.node.type) {
      return false;
    }
    this.node = node;
    updateColumns(node, this.colgroup, this.table, this.cellMinWidth);
    return true;
  }
  ignoreMutation(mutation) {
    const target = mutation.target;
    const isInsideWrapper = this.dom.contains(target);
    const isInsideContent = this.contentDOM.contains(target);
    if (isInsideWrapper && !isInsideContent) {
      if (mutation.type === "attributes" || mutation.type === "childList" || mutation.type === "characterData") {
        return true;
      }
    }
    return false;
  }
};

// src/table/utilities/createColGroup.ts
function createColGroup(node, cellMinWidth, overrideCol, overrideValue) {
  let totalWidth = 0;
  let fixedWidth = true;
  const cols = [];
  const row = node.firstChild;
  if (!row) {
    return {};
  }
  for (let i = 0, col = 0; i < row.childCount; i += 1) {
    const { colspan, colwidth } = row.child(i).attrs;
    for (let j = 0; j < colspan; j += 1, col += 1) {
      const hasWidth = overrideCol === col ? overrideValue : colwidth && colwidth[j];
      totalWidth += hasWidth || cellMinWidth;
      if (!hasWidth) {
        fixedWidth = false;
      }
      const [property, value] = getColStyleDeclaration(cellMinWidth, hasWidth);
      cols.push(["col", { style: `${property}: ${value}` }]);
    }
  }
  const tableWidth = fixedWidth ? `${totalWidth}px` : "";
  const tableMinWidth = fixedWidth ? "" : `${totalWidth}px`;
  const colgroup = ["colgroup", {}, ...cols];
  return { colgroup, tableWidth, tableMinWidth };
}

// src/table/utilities/createCell.ts
function createCell(cellType, cellContent) {
  if (cellContent) {
    return cellType.createChecked(null, cellContent);
  }
  return cellType.createAndFill();
}

// src/table/utilities/getTableNodeTypes.ts
function getTableNodeTypes(schema) {
  if (schema.cached.tableNodeTypes) {
    return schema.cached.tableNodeTypes;
  }
  const roles = {};
  Object.keys(schema.nodes).forEach((type) => {
    const nodeType = schema.nodes[type];
    if (nodeType.spec.tableRole) {
      roles[nodeType.spec.tableRole] = nodeType;
    }
  });
  schema.cached.tableNodeTypes = roles;
  return roles;
}

// src/table/utilities/createTable.ts
function createTable(schema, rowsCount, colsCount, withHeaderRow, cellContent) {
  const types = getTableNodeTypes(schema);
  const headerCells = [];
  const cells = [];
  for (let index = 0; index < colsCount; index += 1) {
    const cell = createCell(types.cell, cellContent);
    if (cell) {
      cells.push(cell);
    }
    if (withHeaderRow) {
      const headerCell = createCell(types.header_cell, cellContent);
      if (headerCell) {
        headerCells.push(headerCell);
      }
    }
  }
  const rows = [];
  for (let index = 0; index < rowsCount; index += 1) {
    rows.push(types.row.createChecked(null, withHeaderRow && index === 0 ? headerCells : cells));
  }
  return types.table.createChecked(null, rows);
}
function isCellSelection(value) {
  return value instanceof CellSelection;
}

// src/table/utilities/deleteTableWhenAllCellsSelected.ts
var deleteTableWhenAllCellsSelected = ({ editor }) => {
  const { selection } = editor.state;
  if (!isCellSelection(selection)) {
    return false;
  }
  let cellCount = 0;
  const table = index.findParentNodeClosestToPos(selection.ranges[0].$from, (node) => {
    return node.type.name === "table";
  });
  table == null ? void 0 : table.node.descendants((node) => {
    if (node.type.name === "table") {
      return false;
    }
    if (["tableCell", "tableHeader"].includes(node.type.name)) {
      cellCount += 1;
    }
  });
  const allCellsSelected = cellCount === selection.ranges.length;
  if (!allCellsSelected) {
    return false;
  }
  editor.commands.deleteTable();
  return true;
};

// src/table/utilities/markdown.ts
var DEFAULT_CELL_LINE_SEPARATOR = "";
function collapseWhitespace(s) {
  return (s || "").replace(/\s+/g, " ").trim();
}
function renderTableToMarkdown(node, h, options = {}) {
  var _a;
  const cellSep = (_a = options.cellLineSeparator) != null ? _a : DEFAULT_CELL_LINE_SEPARATOR;
  if (!node || !node.content || node.content.length === 0) {
    return "";
  }
  const rows = [];
  node.content.forEach((rowNode) => {
    const cells = [];
    if (rowNode.content) {
      rowNode.content.forEach((cellNode) => {
        let raw = "";
        if (cellNode.content && Array.isArray(cellNode.content) && cellNode.content.length > 1) {
          const parts = cellNode.content.map(
            (child) => h.renderChildren(child)
          );
          raw = parts.join(cellSep);
        } else {
          raw = cellNode.content ? h.renderChildren(cellNode.content) : "";
        }
        const text = collapseWhitespace(raw);
        const isHeader = cellNode.type === "tableHeader";
        const align = normalizeTableCellAlignFromAttributes(cellNode.attrs);
        cells.push({ text, isHeader, align });
      });
    }
    rows.push(cells);
  });
  const columnCount = rows.reduce((max, r) => Math.max(max, r.length), 0);
  if (columnCount === 0) {
    return "";
  }
  const colWidths = Array.from({ length: columnCount }).fill(0);
  rows.forEach((r) => {
    var _a2;
    for (let i = 0; i < columnCount; i += 1) {
      const cell = ((_a2 = r[i]) == null ? void 0 : _a2.text) || "";
      const len = cell.length;
      if (len > colWidths[i]) {
        colWidths[i] = len;
      }
      if (colWidths[i] < 3) {
        colWidths[i] = 3;
      }
    }
  });
  const pad = (s, width) => s + " ".repeat(Math.max(0, width - s.length));
  const headerRow = rows[0];
  const hasHeader = headerRow.some((c) => c.isHeader);
  const colAlignments = Array.from({
    length: columnCount
  }).fill(null);
  rows.forEach((r) => {
    var _a2;
    for (let i = 0; i < columnCount; i += 1) {
      if (!colAlignments[i] && ((_a2 = r[i]) == null ? void 0 : _a2.align)) {
        colAlignments[i] = r[i].align;
      }
    }
  });
  let out = "\n";
  const headerTexts = Array.from({ length: columnCount }).map(
    (_, i) => hasHeader ? headerRow[i] && headerRow[i].text || "" : ""
  );
  out += `| ${headerTexts.map((t, i) => pad(t, colWidths[i])).join(" | ")} |
`;
  out += `| ${colWidths.map((w, index) => {
    const dashCount = Math.max(3, w);
    const alignment = colAlignments[index];
    if (alignment === "left" /* Left */) {
      return `:${"-".repeat(dashCount)}`;
    }
    if (alignment === "right" /* Right */) {
      return `${"-".repeat(dashCount)}:`;
    }
    if (alignment === "center" /* Center */) {
      return `:${"-".repeat(dashCount)}:`;
    }
    return "-".repeat(dashCount);
  }).join(" | ")} |
`;
  const body = hasHeader ? rows.slice(1) : rows;
  body.forEach((r) => {
    out += `| ${Array.from({ length: columnCount }).fill(0).map((_, i) => pad(r[i] && r[i].text || "", colWidths[i])).join(" | ")} |
`;
  });
  return out;
}
var markdown_default = renderTableToMarkdown;

// src/table/table.ts
var Table = index.Node3.create({
  name: "table",
  // @ts-ignore
  addOptions() {
    return {
      HTMLAttributes: {},
      resizable: false,
      renderWrapper: false,
      handleWidth: 5,
      cellMinWidth: 25,
      // TODO: fix
      View: TableView,
      lastColumnResizable: true,
      allowTableNodeSelection: false
    };
  },
  content: "tableRow+",
  tableRole: "table",
  isolating: true,
  group: "block",
  parseHTML() {
    return [{ tag: "table" }];
  },
  renderHTML({ node, HTMLAttributes }) {
    const { colgroup, tableWidth, tableMinWidth } = createColGroup(node, this.options.cellMinWidth);
    const userStyles = HTMLAttributes.style;
    function getTableStyle() {
      if (userStyles) {
        return userStyles;
      }
      return tableWidth ? `width: ${tableWidth}` : `min-width: ${tableMinWidth}`;
    }
    const table = [
      "table",
      index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        style: getTableStyle()
      }),
      colgroup,
      ["tbody", 0]
    ];
    return this.options.renderWrapper ? ["div", { class: "tableWrapper" }, table] : table;
  },
  parseMarkdown: (token, h) => {
    const rows = [];
    const alignments = Array.isArray(token.align) ? token.align : [];
    if (token.header) {
      const headerCells = [];
      token.header.forEach((cell, index) => {
        var _a;
        const align = normalizeTableCellAlign((_a = alignments[index]) != null ? _a : cell.align);
        const attrs = align ? { align } : {};
        headerCells.push(
          h.createNode("tableHeader", attrs, [
            { type: "paragraph", content: h.parseInline(cell.tokens) }
          ])
        );
      });
      rows.push(h.createNode("tableRow", {}, headerCells));
    }
    if (token.rows) {
      token.rows.forEach((row) => {
        const bodyCells = [];
        row.forEach((cell, index) => {
          var _a;
          const align = normalizeTableCellAlign((_a = alignments[index]) != null ? _a : cell.align);
          const attrs = align ? { align } : {};
          bodyCells.push(
            h.createNode("tableCell", attrs, [
              { type: "paragraph", content: h.parseInline(cell.tokens) }
            ])
          );
        });
        rows.push(h.createNode("tableRow", {}, bodyCells));
      });
    }
    return h.createNode("table", void 0, rows);
  },
  renderMarkdown: (node, h) => {
    return markdown_default(node, h);
  },
  addCommands() {
    return {
      insertTable: ({ rows = 3, cols = 3, withHeaderRow = true } = {}) => ({ tr, dispatch, editor }) => {
        const node = createTable(editor.schema, rows, cols, withHeaderRow);
        if (dispatch) {
          const offset = tr.selection.from + 1;
          tr.replaceSelectionWith(node).scrollIntoView().setSelection(index.TextSelection.near(tr.doc.resolve(offset)));
        }
        return true;
      },
      addColumnBefore: () => ({ state, dispatch }) => {
        return addColumnBefore(state, dispatch);
      },
      addColumnAfter: () => ({ state, dispatch }) => {
        return addColumnAfter(state, dispatch);
      },
      deleteColumn: () => ({ state, dispatch }) => {
        return deleteColumn(state, dispatch);
      },
      addRowBefore: () => ({ state, dispatch }) => {
        return addRowBefore(state, dispatch);
      },
      addRowAfter: () => ({ state, dispatch }) => {
        return addRowAfter(state, dispatch);
      },
      deleteRow: () => ({ state, dispatch }) => {
        return deleteRow(state, dispatch);
      },
      deleteTable: () => ({ state, dispatch }) => {
        return deleteTable(state, dispatch);
      },
      mergeCells: () => ({ state, dispatch }) => {
        return mergeCells(state, dispatch);
      },
      splitCell: () => ({ state, dispatch }) => {
        return splitCell(state, dispatch);
      },
      toggleHeaderColumn: () => ({ state, dispatch }) => {
        return toggleHeader("column")(state, dispatch);
      },
      toggleHeaderRow: () => ({ state, dispatch }) => {
        return toggleHeader("row")(state, dispatch);
      },
      toggleHeaderCell: () => ({ state, dispatch }) => {
        return toggleHeaderCell(state, dispatch);
      },
      mergeOrSplit: () => ({ state, dispatch }) => {
        if (mergeCells(state, dispatch)) {
          return true;
        }
        return splitCell(state, dispatch);
      },
      setCellAttribute: (name, value) => ({ state, dispatch }) => {
        return setCellAttr(name, value)(state, dispatch);
      },
      goToNextCell: () => ({ state, dispatch }) => {
        return goToNextCell(1)(state, dispatch);
      },
      goToPreviousCell: () => ({ state, dispatch }) => {
        return goToNextCell(-1)(state, dispatch);
      },
      fixTables: () => ({ state, dispatch }) => {
        if (dispatch) {
          fixTables(state);
        }
        return true;
      },
      setCellSelection: (position) => ({ tr, dispatch }) => {
        if (dispatch) {
          const selection = CellSelection.create(tr.doc, position.anchorCell, position.headCell);
          tr.setSelection(selection);
        }
        return true;
      }
    };
  },
  addKeyboardShortcuts() {
    return {
      Tab: () => {
        if (this.editor.commands.goToNextCell()) {
          return true;
        }
        if (!this.editor.can().addRowAfter()) {
          return false;
        }
        return this.editor.chain().addRowAfter().goToNextCell().run();
      },
      "Shift-Tab": () => this.editor.commands.goToPreviousCell(),
      Backspace: deleteTableWhenAllCellsSelected,
      "Mod-Backspace": deleteTableWhenAllCellsSelected,
      Delete: deleteTableWhenAllCellsSelected,
      "Mod-Delete": deleteTableWhenAllCellsSelected
    };
  },
  addProseMirrorPlugins() {
    const isResizable = this.options.resizable && this.editor.isEditable;
    return [
      ...isResizable ? [
        columnResizing({
          handleWidth: this.options.handleWidth,
          cellMinWidth: this.options.cellMinWidth,
          defaultCellMinWidth: this.options.cellMinWidth,
          View: this.options.View,
          lastColumnResizable: this.options.lastColumnResizable
        })
      ] : [],
      tableEditing({
        allowTableNodeSelection: this.options.allowTableNodeSelection
      })
    ];
  },
  addNodeView() {
    const isResizable = this.options.resizable && this.editor.isEditable;
    const View = this.options.View;
    if (isResizable || !View) {
      return null;
    }
    return ({ node, view, HTMLAttributes }) => {
      const mergedAttributes = index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
      return new View(node, this.options.cellMinWidth, view, mergedAttributes);
    };
  },
  extendNodeSchema(extension) {
    const context = {
      name: extension.name,
      options: extension.options,
      storage: extension.storage
    };
    return {
      tableRole: index.callOrReturn(index.getExtensionField(extension, "tableRole", context))
    };
  }
});

// src/kit/index.ts
index.Extension.create({
  name: "tableKit",
  addExtensions() {
    const extensions = [];
    if (this.options.table !== false) {
      extensions.push(Table.configure(this.options.table));
    }
    if (this.options.tableCell !== false) {
      extensions.push(TableCell.configure(this.options.tableCell));
    }
    if (this.options.tableHeader !== false) {
      extensions.push(TableHeader.configure(this.options.tableHeader));
    }
    if (this.options.tableRow !== false) {
      extensions.push(TableRow.configure(this.options.tableRow));
    }
    return extensions;
  }
});

// src/index.ts
var index_default$6 = TableRow;

// src/index.ts
var index_default$5 = TableCell;

// src/index.ts
var index_default$4 = TableHeader;

// src/typography.ts
var emDash = (override) => index.textInputRule({
  find: /--$/,
  replace: override != null ? override : "\u2014"
});
var ellipsis = (override) => index.textInputRule({
  find: /\.\.\.$/,
  replace: override != null ? override : "\u2026"
});
var openDoubleQuote = (override) => index.textInputRule({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(")$/,
  replace: override != null ? override : "\u201C"
});
var closeDoubleQuote = (override) => index.textInputRule({
  find: /"$/,
  replace: override != null ? override : "\u201D"
});
var openSingleQuote = (override) => index.textInputRule({
  find: /(?:^|[\s{[(<'"\u2018\u201C])(')$/,
  replace: override != null ? override : "\u2018"
});
var closeSingleQuote = (override) => index.textInputRule({
  find: /'$/,
  replace: override != null ? override : "\u2019"
});
var leftArrow = (override) => index.textInputRule({
  find: /<-$/,
  replace: override != null ? override : "\u2190"
});
var rightArrow = (override) => index.textInputRule({
  find: /->$/,
  replace: override != null ? override : "\u2192"
});
var copyright = (override) => index.textInputRule({
  find: /\(c\)$/,
  replace: override != null ? override : "\xA9"
});
var trademark = (override) => index.textInputRule({
  find: /\(tm\)$/,
  replace: override != null ? override : "\u2122"
});
var servicemark = (override) => index.textInputRule({
  find: /\(sm\)$/,
  replace: override != null ? override : "\u2120"
});
var registeredTrademark = (override) => index.textInputRule({
  find: /\(r\)$/,
  replace: override != null ? override : "\xAE"
});
var oneHalf = (override) => index.textInputRule({
  find: /(?:^|\s)(1\/2)\s$/,
  replace: override != null ? override : "\xBD"
});
var plusMinus = (override) => index.textInputRule({
  find: /\+\/-$/,
  replace: override != null ? override : "\xB1"
});
var notEqual = (override) => index.textInputRule({
  find: /!=$/,
  replace: override != null ? override : "\u2260"
});
var laquo = (override) => index.textInputRule({
  find: /<<$/,
  replace: override != null ? override : "\xAB"
});
var raquo = (override) => index.textInputRule({
  find: />>$/,
  replace: override != null ? override : "\xBB"
});
var multiplication = (override) => index.textInputRule({
  find: /\d+\s?([*x])\s?\d+$/,
  replace: override != null ? override : "\xD7"
});
var superscriptTwo = (override) => index.textInputRule({
  find: /\^2$/,
  replace: override != null ? override : "\xB2"
});
var superscriptThree = (override) => index.textInputRule({
  find: /\^3$/,
  replace: override != null ? override : "\xB3"
});
var oneQuarter = (override) => index.textInputRule({
  find: /(?:^|\s)(1\/4)\s$/,
  replace: override != null ? override : "\xBC"
});
var threeQuarters = (override) => index.textInputRule({
  find: /(?:^|\s)(3\/4)\s$/,
  replace: override != null ? override : "\xBE"
});
var Typography = index.Extension.create({
  name: "typography",
  addOptions() {
    return {
      closeDoubleQuote: "\u201D",
      closeSingleQuote: "\u2019",
      copyright: "\xA9",
      ellipsis: "\u2026",
      emDash: "\u2014",
      laquo: "\xAB",
      leftArrow: "\u2190",
      multiplication: "\xD7",
      notEqual: "\u2260",
      oneHalf: "\xBD",
      oneQuarter: "\xBC",
      openDoubleQuote: "\u201C",
      openSingleQuote: "\u2018",
      plusMinus: "\xB1",
      raquo: "\xBB",
      registeredTrademark: "\xAE",
      rightArrow: "\u2192",
      servicemark: "\u2120",
      superscriptThree: "\xB3",
      superscriptTwo: "\xB2",
      threeQuarters: "\xBE",
      trademark: "\u2122"
    };
  },
  addInputRules() {
    var _a, _b;
    const rules = [];
    if (this.options.emDash !== false) {
      rules.push(emDash(this.options.emDash));
    }
    if (this.options.ellipsis !== false) {
      rules.push(ellipsis(this.options.ellipsis));
    }
    const isRTL = this.editor.options.textDirection === "rtl";
    if ((_a = this.options.doubleQuotes) == null ? void 0 : _a.rtl) {
      const { open, close } = this.options.doubleQuotes.rtl;
      rules.push(openDoubleQuote(open));
      rules.push(closeDoubleQuote(close));
    } else if (isRTL) {
      rules.push(openDoubleQuote("\u201D"));
      rules.push(closeDoubleQuote("\u201C"));
    } else {
      if (this.options.openDoubleQuote !== false) {
        rules.push(openDoubleQuote(this.options.openDoubleQuote));
      }
      if (this.options.closeDoubleQuote !== false) {
        rules.push(closeDoubleQuote(this.options.closeDoubleQuote));
      }
    }
    if ((_b = this.options.singleQuotes) == null ? void 0 : _b.rtl) {
      const { open, close } = this.options.singleQuotes.rtl;
      rules.push(openSingleQuote(open));
      rules.push(closeSingleQuote(close));
    } else if (isRTL) {
      rules.push(openSingleQuote("\u2019"));
      rules.push(closeSingleQuote("\u2018"));
    } else {
      if (this.options.openSingleQuote !== false) {
        rules.push(openSingleQuote(this.options.openSingleQuote));
      }
      if (this.options.closeSingleQuote !== false) {
        rules.push(closeSingleQuote(this.options.closeSingleQuote));
      }
    }
    if (this.options.leftArrow !== false) {
      rules.push(leftArrow(this.options.leftArrow));
    }
    if (this.options.rightArrow !== false) {
      rules.push(rightArrow(this.options.rightArrow));
    }
    if (this.options.copyright !== false) {
      rules.push(copyright(this.options.copyright));
    }
    if (this.options.trademark !== false) {
      rules.push(trademark(this.options.trademark));
    }
    if (this.options.servicemark !== false) {
      rules.push(servicemark(this.options.servicemark));
    }
    if (this.options.registeredTrademark !== false) {
      rules.push(registeredTrademark(this.options.registeredTrademark));
    }
    if (this.options.oneHalf !== false) {
      rules.push(oneHalf(this.options.oneHalf));
    }
    if (this.options.plusMinus !== false) {
      rules.push(plusMinus(this.options.plusMinus));
    }
    if (this.options.notEqual !== false) {
      rules.push(notEqual(this.options.notEqual));
    }
    if (this.options.laquo !== false) {
      rules.push(laquo(this.options.laquo));
    }
    if (this.options.raquo !== false) {
      rules.push(raquo(this.options.raquo));
    }
    if (this.options.multiplication !== false) {
      rules.push(multiplication(this.options.multiplication));
    }
    if (this.options.superscriptTwo !== false) {
      rules.push(superscriptTwo(this.options.superscriptTwo));
    }
    if (this.options.superscriptThree !== false) {
      rules.push(superscriptThree(this.options.superscriptThree));
    }
    if (this.options.oneQuarter !== false) {
      rules.push(oneQuarter(this.options.oneQuarter));
    }
    if (this.options.threeQuarters !== false) {
      rules.push(threeQuarters(this.options.threeQuarters));
    }
    return rules;
  }
});

// src/index.ts
var index_default$3 = Typography;

// src/index.ts
var index_default$2 = TaskList;

// src/index.ts
var index_default$1 = TaskItem;

var marked_umd = _commonjsHelpers.createCommonjsModule(function (module, exports) {
/**
 * marked v17.0.6 - a markdown parser
 * Copyright (c) 2018-2026, MarkedJS. (MIT License)
 * Copyright (c) 2011-2018, Christopher Jeffrey. (MIT License)
 * https://github.com/markedjs/marked
 */

/**
 * DO NOT EDIT THIS FILE
 * The code in this file is generated from files in ./src/
 */
(function(g,f){{module.exports=f();}}(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : _commonjsHelpers.commonjsGlobal,function(){var exports={};var __exports=exports;var module={exports};
var G=Object.defineProperty;var Re=Object.getOwnPropertyDescriptor;var Oe=Object.getOwnPropertyNames;var Te=Object.prototype.hasOwnProperty;var we=(l,e)=>{for(var t in e)G(l,t,{get:e[t],enumerable:!0});},ye=(l,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let r of Oe(e))!Te.call(l,r)&&r!==t&&G(l,r,{get:()=>e[r],enumerable:!(n=Re(e,r))||n.enumerable});return l};var Pe=l=>ye(G({},"__esModule",{value:!0}),l);var xt={};we(xt,{Hooks:()=>P,Lexer:()=>x,Marked:()=>A,Parser:()=>b,Renderer:()=>y,TextRenderer:()=>S,Tokenizer:()=>w,defaults:()=>R,getDefaults:()=>_,lexer:()=>mt,marked:()=>g,options:()=>pt,parse:()=>gt,parseInline:()=>dt,parser:()=>ft,setOptions:()=>ct,use:()=>ht,walkTokens:()=>kt});module.exports=Pe(xt);function _(){return {async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var R=_();function N(l){R=l;}var L={exec:()=>null};function k(l,e=""){let t=typeof l=="string"?l:l.source,n={replace:(r,i)=>{let s=typeof i=="string"?i:i.source;return s=s.replace(m.caret,"$1"),t=t.replace(r,s),n},getRegex:()=>new RegExp(t,e)};return n}var Se=(()=>{try{return !!new RegExp("(?<=1)(?<!1)")}catch{return !1}})(),m={codeRemoveIndent:/^(?: {1,4}| {0,3}\t)/gm,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+) *)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\] +\S/,listReplaceTask:/^\[[ xX]\] +/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:l=>new RegExp(`^( {0,3}${l})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`),hrRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)`),fencesBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}(?:\`\`\`|~~~)`),headingBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}#`),htmlBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}<(?:[a-z].*>|!--)`,"i"),blockquoteBeginRegex:l=>new RegExp(`^ {0,${Math.min(3,l-1)}}>`)},$e=/^(?:[ \t]*(?:\n|$))+/,_e=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,Le=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,B=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,Me=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,j=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,ie=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |blockCode|fences|blockquote|heading|html|table))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,oe=k(ie).replace(/bull/g,j).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,"").getRegex(),ze=k(ie).replace(/bull/g,j).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),F=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,Ee=/^[^\n]+/,U=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\])+/,Ie=k(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace("label",U).replace("title",/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/).getRegex(),Ae=k(/^(bull)([ \t][^\n]+?)?(?:\n|$)/).replace(/bull/g,j).getRegex(),v="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",K=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,Ce=k("^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))","i").replace("comment",K).replace("tag",v).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),ae=k(F).replace("hr",B).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex(),Be=k(/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/).replace("paragraph",ae).getRegex(),W={blockquote:Be,code:_e,def:Ie,fences:Le,heading:Me,hr:B,html:Ce,lheading:oe,list:Ae,newline:$e,paragraph:ae,table:L,text:Ee},re=k("^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)").replace("hr",B).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("blockquote"," {0,3}>").replace("code","(?: {4}| {0,3}	)[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex(),De={...W,lheading:ze,table:re,paragraph:k(F).replace("hr",B).replace("heading"," {0,3}#{1,6}(?:\\s|$)").replace("|lheading","").replace("table",re).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)])[ \\t]").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",v).getRegex()},qe={...W,html:k(`^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))`).replace("comment",K).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:L,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:k(F).replace("hr",B).replace("heading",` *#{1,6} *[^
]`).replace("lheading",oe).replace("|table","").replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").replace("|tag","").getRegex()},ve=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,He=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,le=/^( {2,}|\\)\n(?!\s*$)/,Ze=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,z=/[\p{P}\p{S}]/u,H=/[\s\p{P}\p{S}]/u,X=/[^\s\p{P}\p{S}]/u,Ge=k(/^((?![*_])punctSpace)/,"u").replace(/punctSpace/g,H).getRegex(),ue=/(?!~)[\p{P}\p{S}]/u,Ne=/(?!~)[\s\p{P}\p{S}]/u,Qe=/(?:[^\s\p{P}\p{S}]|~)/u,je=k(/link|precode-code|html/,"g").replace("link",/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace("precode-",Se?"(?<!`)()":"(^^|[^`])").replace("code",/(?<b>`+)[^`]+\k<b>(?!`)/).replace("html",/<(?! )[^<>]*?>/).getRegex(),pe=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Fe=k(pe,"u").replace(/punct/g,z).getRegex(),Ue=k(pe,"u").replace(/punct/g,ue).getRegex(),ce="^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)",Ke=k(ce,"gu").replace(/notPunctSpace/g,X).replace(/punctSpace/g,H).replace(/punct/g,z).getRegex(),We=k(ce,"gu").replace(/notPunctSpace/g,Qe).replace(/punctSpace/g,Ne).replace(/punct/g,ue).getRegex(),Xe=k("^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)","gu").replace(/notPunctSpace/g,X).replace(/punctSpace/g,H).replace(/punct/g,z).getRegex(),Je=k(/^~~?(?:((?!~)punct)|[^\s~])/,"u").replace(/punct/g,z).getRegex(),Ve="^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)",Ye=k(Ve,"gu").replace(/notPunctSpace/g,X).replace(/punctSpace/g,H).replace(/punct/g,z).getRegex(),et=k(/\\(punct)/,"gu").replace(/punct/g,z).getRegex(),tt=k(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace("scheme",/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace("email",/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),nt=k(K).replace("(?:-->|$)","-->").getRegex(),rt=k("^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>").replace("comment",nt).replace("attribute",/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),q=/(?:\[(?:\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/,st=k(/^!?\[(label)\]\(\s*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?\s*\)/).replace("label",q).replace("href",/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]*/).replace("title",/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/).getRegex(),he=k(/^!?\[(label)\]\[(ref)\]/).replace("label",q).replace("ref",U).getRegex(),ke=k(/^!?\[(ref)\](?:\[\])?/).replace("ref",U).getRegex(),it=k("reflink|nolink(?!\\()","g").replace("reflink",he).replace("nolink",ke).getRegex(),se=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,J={_backpedal:L,anyPunctuation:et,autolink:tt,blockSkip:je,br:le,code:He,del:L,delLDelim:L,delRDelim:L,emStrongLDelim:Fe,emStrongRDelimAst:Ke,emStrongRDelimUnd:Xe,escape:ve,link:st,nolink:ke,punctuation:Ge,reflink:he,reflinkSearch:it,tag:rt,text:Ze,url:L},ot={...J,link:k(/^!?\[(label)\]\((.*?)\)/).replace("label",q).getRegex(),reflink:k(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",q).getRegex()},Q={...J,emStrongRDelimAst:We,emStrongLDelim:Ue,delLDelim:Je,delRDelim:Ye,url:k(/^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace("protocol",se).replace("email",/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:k(/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/).replace("protocol",se).getRegex()},at={...Q,br:k(le).replace("{2,}","*").getRegex(),text:k(Q.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()},D={normal:W,gfm:De,pedantic:qe},E={normal:J,gfm:Q,breaks:at,pedantic:ot};var lt={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},de=l=>lt[l];function T(l,e){if(e){if(m.escapeTest.test(l))return l.replace(m.escapeReplace,de)}else if(m.escapeTestNoEncode.test(l))return l.replace(m.escapeReplaceNoEncode,de);return l}function V(l){try{l=encodeURI(l).replace(m.percentDecode,"%");}catch{return null}return l}function Y(l,e){let t=l.replace(m.findPipe,(i,s,a)=>{let o=!1,u=s;for(;--u>=0&&a[u]==="\\";)o=!o;return o?"|":" |"}),n=t.split(m.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),e)if(n.length>e)n.splice(e);else for(;n.length<e;)n.push("");for(;r<n.length;r++)n[r]=n[r].trim().replace(m.slashPipe,"|");return n}function I(l,e,t){let n=l.length;if(n===0)return "";let r=0;for(;r<n;){let i=l.charAt(n-r-1);if(i===e&&!t)r++;else if(i!==e&&t)r++;else break}return l.slice(0,n-r)}function ge(l,e){if(l.indexOf(e[1])===-1)return -1;let t=0;for(let n=0;n<l.length;n++)if(l[n]==="\\")n++;else if(l[n]===e[0])t++;else if(l[n]===e[1]&&(t--,t<0))return n;return t>0?-2:-1}function fe(l,e=0){let t=e,n="";for(let r of l)if(r==="	"){let i=4-t%4;n+=" ".repeat(i),t+=i;}else n+=r,t++;return n}function me(l,e,t,n,r){let i=e.href,s=e.title||null,a=l[1].replace(r.other.outputLinkReplace,"$1");n.state.inLink=!0;let o={type:l[0].charAt(0)==="!"?"image":"link",raw:t,href:i,title:s,text:a,tokens:n.inlineTokens(a)};return n.state.inLink=!1,o}function ut(l,e,t){let n=l.match(t.other.indentCodeCompensation);if(n===null)return e;let r=n[1];return e.split(`
`).map(i=>{let s=i.match(t.other.beginningSpace);if(s===null)return i;let[a]=s;return a.length>=r.length?i.slice(r.length):i}).join(`
`)}var w=class{options;rules;lexer;constructor(e){this.options=e||R;}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return {type:"space",raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let n=t[0].replace(this.rules.other.codeRemoveIndent,"");return {type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?n:I(n,`
`)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let n=t[0],r=ut(n,t[3]||"",this.rules);return {type:"code",raw:n,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,"$1"):t[2],text:r}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let n=t[2].trim();if(this.rules.other.endingHash.test(n)){let r=I(n,"#");(this.options.pedantic||!r||this.rules.other.endingSpaceChar.test(r))&&(n=r.trim());}return {type:"heading",raw:t[0],depth:t[1].length,text:n,tokens:this.lexer.inline(n)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return {type:"hr",raw:I(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let n=I(t[0],`
`).split(`
`),r="",i="",s=[];for(;n.length>0;){let a=!1,o=[],u;for(u=0;u<n.length;u++)if(this.rules.other.blockquoteStart.test(n[u]))o.push(n[u]),a=!0;else if(!a)o.push(n[u]);else break;n=n.slice(u);let p=o.join(`
`),c=p.replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,"");r=r?`${r}
${p}`:p,i=i?`${i}
${c}`:c;let d=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,s,!0),this.lexer.state.top=d,n.length===0)break;let h=s.at(-1);if(h?.type==="code")break;if(h?.type==="blockquote"){let O=h,f=O.raw+`
`+n.join(`
`),$=this.blockquote(f);s[s.length-1]=$,r=r.substring(0,r.length-O.raw.length)+$.raw,i=i.substring(0,i.length-O.text.length)+$.text;break}else if(h?.type==="list"){let O=h,f=O.raw+`
`+n.join(`
`),$=this.list(f);s[s.length-1]=$,r=r.substring(0,r.length-h.raw.length)+$.raw,i=i.substring(0,i.length-O.raw.length)+$.raw,n=f.substring(s.at(-1).raw.length).split(`
`);continue}}return {type:"blockquote",raw:r,tokens:s,text:i}}}list(e){let t=this.rules.block.list.exec(e);if(t){let n=t[1].trim(),r=n.length>1,i={type:"list",raw:"",ordered:r,start:r?+n.slice(0,-1):"",loose:!1,items:[]};n=r?`\\d{1,9}\\${n.slice(-1)}`:`\\${n}`,this.options.pedantic&&(n=r?n:"[*+-]");let s=this.rules.other.listItemRegex(n),a=!1;for(;e;){let u=!1,p="",c="";if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;p=t[0],e=e.substring(p.length);let d=fe(t[2].split(`
`,1)[0],t[1].length),h=e.split(`
`,1)[0],O=!d.trim(),f=0;if(this.options.pedantic?(f=2,c=d.trimStart()):O?f=t[1].length+1:(f=d.search(this.rules.other.nonSpaceChar),f=f>4?1:f,c=d.slice(f),f+=t[1].length),O&&this.rules.other.blankLine.test(h)&&(p+=h+`
`,e=e.substring(h.length+1),u=!0),!u){let $=this.rules.other.nextBulletRegex(f),ee=this.rules.other.hrRegex(f),te=this.rules.other.fencesBeginRegex(f),ne=this.rules.other.headingBeginRegex(f),xe=this.rules.other.htmlBeginRegex(f),be=this.rules.other.blockquoteBeginRegex(f);for(;e;){let Z=e.split(`
`,1)[0],C;if(h=Z,this.options.pedantic?(h=h.replace(this.rules.other.listReplaceNesting,"  "),C=h):C=h.replace(this.rules.other.tabCharGlobal,"    "),te.test(h)||ne.test(h)||xe.test(h)||be.test(h)||$.test(h)||ee.test(h))break;if(C.search(this.rules.other.nonSpaceChar)>=f||!h.trim())c+=`
`+C.slice(f);else {if(O||d.replace(this.rules.other.tabCharGlobal,"    ").search(this.rules.other.nonSpaceChar)>=4||te.test(d)||ne.test(d)||ee.test(d))break;c+=`
`+h;}O=!h.trim(),p+=Z+`
`,e=e.substring(Z.length+1),d=C.slice(f);}}i.loose||(a?i.loose=!0:this.rules.other.doubleBlankLine.test(p)&&(a=!0)),i.items.push({type:"list_item",raw:p,task:!!this.options.gfm&&this.rules.other.listIsTask.test(c),loose:!1,text:c,tokens:[]}),i.raw+=p;}let o=i.items.at(-1);if(o)o.raw=o.raw.trimEnd(),o.text=o.text.trimEnd();else return;i.raw=i.raw.trimEnd();for(let u of i.items){if(this.lexer.state.top=!1,u.tokens=this.lexer.blockTokens(u.text,[]),u.task){if(u.text=u.text.replace(this.rules.other.listReplaceTask,""),u.tokens[0]?.type==="text"||u.tokens[0]?.type==="paragraph"){u.tokens[0].raw=u.tokens[0].raw.replace(this.rules.other.listReplaceTask,""),u.tokens[0].text=u.tokens[0].text.replace(this.rules.other.listReplaceTask,"");for(let c=this.lexer.inlineQueue.length-1;c>=0;c--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[c].src)){this.lexer.inlineQueue[c].src=this.lexer.inlineQueue[c].src.replace(this.rules.other.listReplaceTask,"");break}}let p=this.rules.other.listTaskCheckbox.exec(u.raw);if(p){let c={type:"checkbox",raw:p[0]+" ",checked:p[0]!=="[ ]"};u.checked=c.checked,i.loose?u.tokens[0]&&["paragraph","text"].includes(u.tokens[0].type)&&"tokens"in u.tokens[0]&&u.tokens[0].tokens?(u.tokens[0].raw=c.raw+u.tokens[0].raw,u.tokens[0].text=c.raw+u.tokens[0].text,u.tokens[0].tokens.unshift(c)):u.tokens.unshift({type:"paragraph",raw:c.raw,text:c.raw,tokens:[c]}):u.tokens.unshift(c);}}if(!i.loose){let p=u.tokens.filter(d=>d.type==="space"),c=p.length>0&&p.some(d=>this.rules.other.anyLine.test(d.raw));i.loose=c;}}if(i.loose)for(let u of i.items){u.loose=!0;for(let p of u.tokens)p.type==="text"&&(p.type="paragraph");}return i}}html(e){let t=this.rules.block.html.exec(e);if(t)return {type:"html",block:!0,raw:t[0],pre:t[1]==="pre"||t[1]==="script"||t[1]==="style",text:t[0]}}def(e){let t=this.rules.block.def.exec(e);if(t){let n=t[1].toLowerCase().replace(this.rules.other.multipleSpaceGlobal," "),r=t[2]?t[2].replace(this.rules.other.hrefBrackets,"$1").replace(this.rules.inline.anyPunctuation,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,"$1"):t[3];return {type:"def",tag:n,raw:t[0],href:r,title:i}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Y(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,"").split("|"),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,"").split(`
`):[],s={type:"table",raw:t[0],header:[],align:[],rows:[]};if(n.length===r.length){for(let a of r)this.rules.other.tableAlignRight.test(a)?s.align.push("right"):this.rules.other.tableAlignCenter.test(a)?s.align.push("center"):this.rules.other.tableAlignLeft.test(a)?s.align.push("left"):s.align.push(null);for(let a=0;a<n.length;a++)s.header.push({text:n[a],tokens:this.lexer.inline(n[a]),header:!0,align:s.align[a]});for(let a of i)s.rows.push(Y(a,s.header.length).map((o,u)=>({text:o,tokens:this.lexer.inline(o),header:!1,align:s.align[u]})));return s}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let n=t[1].trim();return {type:"heading",raw:t[0],depth:t[2].charAt(0)==="="?1:2,text:n,tokens:this.lexer.inline(n)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let n=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return {type:"paragraph",raw:t[0],text:n,tokens:this.lexer.inline(n)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return {type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return {type:"escape",raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return !this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){let t=this.rules.inline.link.exec(e);if(t){let n=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(n)){if(!this.rules.other.endAngleBracket.test(n))return;let s=I(n.slice(0,-1),"\\");if((n.length-s.length)%2===0)return}else {let s=ge(t[2],"()");if(s===-2)return;if(s>-1){let o=(t[0].indexOf("!")===0?5:4)+t[1].length+s;t[2]=t[2].substring(0,s),t[0]=t[0].substring(0,o).trim(),t[3]="";}}let r=t[2],i="";if(this.options.pedantic){let s=this.rules.other.pedanticHrefTitle.exec(r);s&&(r=s[1],i=s[3]);}else i=t[3]?t[3].slice(1,-1):"";return r=r.trim(),this.rules.other.startAngleBracket.test(r)&&(this.options.pedantic&&!this.rules.other.endAngleBracket.test(n)?r=r.slice(1):r=r.slice(1,-1)),me(t,{href:r&&r.replace(this.rules.inline.anyPunctuation,"$1"),title:i&&i.replace(this.rules.inline.anyPunctuation,"$1")},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=(n[2]||n[1]).replace(this.rules.other.multipleSpaceGlobal," "),i=t[r.toLowerCase()];if(!i){let s=n[0].charAt(0);return {type:"text",raw:s,text:s}}return me(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=""){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||!r[1]&&!r[2]&&!r[3]&&!r[4]||r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))return;if(!(r[1]||r[3]||"")||!n||this.rules.inline.punctuation.exec(n)){let s=[...r[0]].length-1,a,o,u=s,p=0,c=r[0][0]==="*"?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd;for(c.lastIndex=0,t=t.slice(-1*e.length+s);(r=c.exec(t))!==null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a)continue;if(o=[...a].length,r[3]||r[4]){u+=o;continue}else if((r[5]||r[6])&&s%3&&!((s+o)%3)){p+=o;continue}if(u-=o,u>0)continue;o=Math.min(o,o+u+p);let d=[...r[0]][0].length,h=e.slice(0,s+r.index+d+o);if(Math.min(s,o)%2){let f=h.slice(1,-1);return {type:"em",raw:h,text:f,tokens:this.lexer.inlineTokens(f)}}let O=h.slice(2,-2);return {type:"strong",raw:h,text:O,tokens:this.lexer.inlineTokens(O)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let n=t[2].replace(this.rules.other.newLineCharGlobal," "),r=this.rules.other.nonSpaceChar.test(n),i=this.rules.other.startingSpaceChar.test(n)&&this.rules.other.endingSpaceChar.test(n);return r&&i&&(n=n.substring(1,n.length-1)),{type:"codespan",raw:t[0],text:n}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return {type:"br",raw:t[0]}}del(e,t,n=""){let r=this.rules.inline.delLDelim.exec(e);if(!r)return;if(!(r[1]||"")||!n||this.rules.inline.punctuation.exec(n)){let s=[...r[0]].length-1,a,o,u=s,p=this.rules.inline.delRDelim;for(p.lastIndex=0,t=t.slice(-1*e.length+s);(r=p.exec(t))!==null;){if(a=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!a||(o=[...a].length,o!==s))continue;if(r[3]||r[4]){u+=o;continue}if(u-=o,u>0)continue;o=Math.min(o,o+u);let c=[...r[0]][0].length,d=e.slice(0,s+r.index+c+o),h=d.slice(s,-s);return {type:"del",raw:d,text:h,tokens:this.lexer.inlineTokens(h)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let n,r;return t[2]==="@"?(n=t[1],r="mailto:"+n):(n=t[1],r=n),{type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let n,r;if(t[2]==="@")n=t[0],r="mailto:"+n;else {let i;do i=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??"";while(i!==t[0]);n=t[0],t[1]==="www."?r="http://"+t[0]:r=t[0];}return {type:"link",raw:t[0],text:n,href:r,tokens:[{type:"text",raw:n,text:n}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let n=this.lexer.state.inRawBlock;return {type:"text",raw:t[0],text:t[0],escaped:n}}}};var x=class l{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||R,this.options.tokenizer=this.options.tokenizer||new w,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0};let t={other:m,block:D.normal,inline:E.normal};this.options.pedantic?(t.block=D.pedantic,t.inline=E.pedantic):this.options.gfm&&(t.block=D.gfm,this.options.breaks?t.inline=E.breaks:t.inline=E.gfm),this.tokenizer.rules=t;}static get rules(){return {block:D,inline:E}}static lex(e,t){return new l(t).lex(e)}static lexInline(e,t){return new l(t).inlineTokens(e)}lex(e){e=e.replace(m.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let t=0;t<this.inlineQueue.length;t++){let n=this.inlineQueue[t];this.inlineTokens(n.src,n.tokens);}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){for(this.tokenizer.lexer=this,this.options.pedantic&&(e=e.replace(m.tabCharGlobal,"    ").replace(m.spaceLine,""));e;){let r;if(this.options.extensions?.block?.some(s=>(r=s.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let s=t.at(-1);r.raw.length===1&&s!==void 0?s.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(r=this.tokenizer.fences(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.heading(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.hr(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.blockquote(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.list(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.html(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="paragraph"||s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.raw,this.inlineQueue.at(-1).src=s.text):this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title},t.push(r));continue}if(r=this.tokenizer.table(e)){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.lheading(e)){e=e.substring(r.raw.length),t.push(r);continue}let i=e;if(this.options.extensions?.startBlock){let s=1/0,a=e.slice(1),o;this.options.extensions.startBlock.forEach(u=>{o=u.call({lexer:this},a),typeof o=="number"&&o>=0&&(s=Math.min(s,o));}),s<1/0&&s>=0&&(i=e.substring(0,s+1));}if(this.state.top&&(r=this.tokenizer.paragraph(i))){let s=t.at(-1);n&&s?.type==="paragraph"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r),n=i.length!==e.length,e=e.substring(r.raw.length);continue}if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let s=t.at(-1);s?.type==="text"?(s.raw+=(s.raw.endsWith(`
`)?"":`
`)+r.raw,s.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=s.text):t.push(r);continue}if(e){let s="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(s);break}else throw new Error(s)}}return this.state.top=!0,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=e,r=null;if(this.tokens.links){let o=Object.keys(this.tokens.links);if(o.length>0)for(;(r=this.tokenizer.rules.inline.reflinkSearch.exec(n))!==null;)o.includes(r[0].slice(r[0].lastIndexOf("[")+1,-1))&&(n=n.slice(0,r.index)+"["+"a".repeat(r[0].length-2)+"]"+n.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex));}for(;(r=this.tokenizer.rules.inline.anyPunctuation.exec(n))!==null;)n=n.slice(0,r.index)+"++"+n.slice(this.tokenizer.rules.inline.anyPunctuation.lastIndex);let i;for(;(r=this.tokenizer.rules.inline.blockSkip.exec(n))!==null;)i=r[2]?r[2].length:0,n=n.slice(0,r.index+i)+"["+"a".repeat(r[0].length-i-2)+"]"+n.slice(this.tokenizer.rules.inline.blockSkip.lastIndex);n=this.options.hooks?.emStrongMask?.call({lexer:this},n)??n;let s=!1,a="";for(;e;){s||(a=""),s=!1;let o;if(this.options.extensions?.inline?.some(p=>(o=p.call({lexer:this},e,t))?(e=e.substring(o.raw.length),t.push(o),!0):!1))continue;if(o=this.tokenizer.escape(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.tag(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.link(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let p=t.at(-1);o.type==="text"&&p?.type==="text"?(p.raw+=o.raw,p.text+=o.text):t.push(o);continue}if(o=this.tokenizer.emStrong(e,n,a)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.codespan(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.br(e)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.del(e,n,a)){e=e.substring(o.raw.length),t.push(o);continue}if(o=this.tokenizer.autolink(e)){e=e.substring(o.raw.length),t.push(o);continue}if(!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),t.push(o);continue}let u=e;if(this.options.extensions?.startInline){let p=1/0,c=e.slice(1),d;this.options.extensions.startInline.forEach(h=>{d=h.call({lexer:this},c),typeof d=="number"&&d>=0&&(p=Math.min(p,d));}),p<1/0&&p>=0&&(u=e.substring(0,p+1));}if(o=this.tokenizer.inlineText(u)){e=e.substring(o.raw.length),o.raw.slice(-1)!=="_"&&(a=o.raw.slice(-1)),s=!0;let p=t.at(-1);p?.type==="text"?(p.raw+=o.raw,p.text+=o.text):t.push(o);continue}if(e){let p="Infinite loop on byte: "+e.charCodeAt(0);if(this.options.silent){console.error(p);break}else throw new Error(p)}}return t}};var y=class{options;parser;constructor(e){this.options=e||R;}space(e){return ""}code({text:e,lang:t,escaped:n}){let r=(t||"").match(m.notSpaceStart)?.[0],i=e.replace(m.endingNewline,"")+`
`;return r?'<pre><code class="language-'+T(r)+'">'+(n?i:T(i,!0))+`</code></pre>
`:"<pre><code>"+(n?i:T(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return `<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return ""}heading({tokens:e,depth:t}){return `<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return `<hr>
`}list(e){let t=e.ordered,n=e.start,r="";for(let a=0;a<e.items.length;a++){let o=e.items[a];r+=this.listitem(o);}let i=t?"ol":"ul",s=t&&n!==1?' start="'+n+'"':"";return "<"+i+s+`>
`+r+"</"+i+`>
`}listitem(e){return `<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return "<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"> '}paragraph({tokens:e}){return `<p>${this.parser.parseInline(e)}</p>
`}table(e){let t="",n="";for(let i=0;i<e.header.length;i++)n+=this.tablecell(e.header[i]);t+=this.tablerow({text:n});let r="";for(let i=0;i<e.rows.length;i++){let s=e.rows[i];n="";for(let a=0;a<s.length;a++)n+=this.tablecell(s[a]);r+=this.tablerow({text:n});}return r&&(r=`<tbody>${r}</tbody>`),`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return `<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?"th":"td";return (e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return `<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return `<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return `<code>${T(e,!0)}</code>`}br(e){return "<br>"}del({tokens:e}){return `<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,tokens:n}){let r=this.parser.parseInline(n),i=V(e);if(i===null)return r;e=i;let s='<a href="'+e+'"';return t&&(s+=' title="'+T(t)+'"'),s+=">"+r+"</a>",s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=V(e);if(i===null)return T(n);e=i;let s=`<img src="${e}" alt="${T(n)}"`;return t&&(s+=` title="${T(t)}"`),s+=">",s}text(e){return "tokens"in e&&e.tokens?this.parser.parseInline(e.tokens):"escaped"in e&&e.escaped?e.text:T(e.text)}};var S=class{strong({text:e}){return e}em({text:e}){return e}codespan({text:e}){return e}del({text:e}){return e}html({text:e}){return e}text({text:e}){return e}link({text:e}){return ""+e}image({text:e}){return ""+e}br(){return ""}checkbox({raw:e}){return e}};var b=class l{options;renderer;textRenderer;constructor(e){this.options=e||R,this.options.renderer=this.options.renderer||new y,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new S;}static parse(e,t){return new l(t).parse(e)}static parseInline(e,t){return new l(t).parseInline(e)}parse(e){this.renderer.parser=this;let t="";for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let s=r,a=this.options.extensions.renderers[s.type].call({parser:this},s);if(a!==!1||!["space","hr","heading","code","table","blockquote","list","html","def","paragraph","text"].includes(s.type)){t+=a||"";continue}}let i=r;switch(i.type){case"space":{t+=this.renderer.space(i);break}case"hr":{t+=this.renderer.hr(i);break}case"heading":{t+=this.renderer.heading(i);break}case"code":{t+=this.renderer.code(i);break}case"table":{t+=this.renderer.table(i);break}case"blockquote":{t+=this.renderer.blockquote(i);break}case"list":{t+=this.renderer.list(i);break}case"checkbox":{t+=this.renderer.checkbox(i);break}case"html":{t+=this.renderer.html(i);break}case"def":{t+=this.renderer.def(i);break}case"paragraph":{t+=this.renderer.paragraph(i);break}case"text":{t+=this.renderer.text(i);break}default:{let s='Token with "'+i.type+'" type was not found.';if(this.options.silent)return console.error(s),"";throw new Error(s)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n="";for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let a=this.options.extensions.renderers[i.type].call({parser:this},i);if(a!==!1||!["escape","html","link","image","strong","em","codespan","br","del","text"].includes(i.type)){n+=a||"";continue}}let s=i;switch(s.type){case"escape":{n+=t.text(s);break}case"html":{n+=t.html(s);break}case"link":{n+=t.link(s);break}case"image":{n+=t.image(s);break}case"checkbox":{n+=t.checkbox(s);break}case"strong":{n+=t.strong(s);break}case"em":{n+=t.em(s);break}case"codespan":{n+=t.codespan(s);break}case"br":{n+=t.br(s);break}case"del":{n+=t.del(s);break}case"text":{n+=t.text(s);break}default:{let a='Token with "'+s.type+'" type was not found.';if(this.options.silent)return console.error(a),"";throw new Error(a)}}}return n}};var P=class{options;block;constructor(e){this.options=e||R;}static passThroughHooks=new Set(["preprocess","postprocess","processAllTokens","emStrongMask"]);static passThroughHooksRespectAsync=new Set(["preprocess","postprocess","processAllTokens"]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?x.lex:x.lexInline}provideParser(e=this.block){return e?b.parse:b.parseInline}};var A=class{defaults=_();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=b;Renderer=y;TextRenderer=S;Lexer=x;Tokenizer=w;Hooks=P;constructor(...e){this.use(...e);}walkTokens(e,t){let n=[];for(let r of e)switch(n=n.concat(t.call(this,r)),r.type){case"table":{let i=r;for(let s of i.header)n=n.concat(this.walkTokens(s.tokens,t));for(let s of i.rows)for(let a of s)n=n.concat(this.walkTokens(a.tokens,t));break}case"list":{let i=r;n=n.concat(this.walkTokens(i.items,t));break}default:{let i=r;this.defaults.extensions?.childTokens?.[i.type]?this.defaults.extensions.childTokens[i.type].forEach(s=>{let a=i[s].flat(1/0);n=n.concat(this.walkTokens(a,t));}):i.tokens&&(n=n.concat(this.walkTokens(i.tokens,t)));}}return n}use(...e){let t=this.defaults.extensions||{renderers:{},childTokens:{}};return e.forEach(n=>{let r={...n};if(r.async=this.defaults.async||r.async||!1,n.extensions&&(n.extensions.forEach(i=>{if(!i.name)throw new Error("extension name required");if("renderer"in i){let s=t.renderers[i.name];s?t.renderers[i.name]=function(...a){let o=i.renderer.apply(this,a);return o===!1&&(o=s.apply(this,a)),o}:t.renderers[i.name]=i.renderer;}if("tokenizer"in i){if(!i.level||i.level!=="block"&&i.level!=="inline")throw new Error("extension level must be 'block' or 'inline'");let s=t[i.level];s?s.unshift(i.tokenizer):t[i.level]=[i.tokenizer],i.start&&(i.level==="block"?t.startBlock?t.startBlock.push(i.start):t.startBlock=[i.start]:i.level==="inline"&&(t.startInline?t.startInline.push(i.start):t.startInline=[i.start]));}"childTokens"in i&&i.childTokens&&(t.childTokens[i.name]=i.childTokens);}),r.extensions=t),n.renderer){let i=this.defaults.renderer||new y(this.defaults);for(let s in n.renderer){if(!(s in i))throw new Error(`renderer '${s}' does not exist`);if(["options","parser"].includes(s))continue;let a=s,o=n.renderer[a],u=i[a];i[a]=(...p)=>{let c=o.apply(i,p);return c===!1&&(c=u.apply(i,p)),c||""};}r.renderer=i;}if(n.tokenizer){let i=this.defaults.tokenizer||new w(this.defaults);for(let s in n.tokenizer){if(!(s in i))throw new Error(`tokenizer '${s}' does not exist`);if(["options","rules","lexer"].includes(s))continue;let a=s,o=n.tokenizer[a],u=i[a];i[a]=(...p)=>{let c=o.apply(i,p);return c===!1&&(c=u.apply(i,p)),c};}r.tokenizer=i;}if(n.hooks){let i=this.defaults.hooks||new P;for(let s in n.hooks){if(!(s in i))throw new Error(`hook '${s}' does not exist`);if(["options","block"].includes(s))continue;let a=s,o=n.hooks[a],u=i[a];P.passThroughHooks.has(s)?i[a]=p=>{if(this.defaults.async&&P.passThroughHooksRespectAsync.has(s))return (async()=>{let d=await o.call(i,p);return u.call(i,d)})();let c=o.call(i,p);return u.call(i,c)}:i[a]=(...p)=>{if(this.defaults.async)return (async()=>{let d=await o.apply(i,p);return d===!1&&(d=await u.apply(i,p)),d})();let c=o.apply(i,p);return c===!1&&(c=u.apply(i,p)),c};}r.hooks=i;}if(n.walkTokens){let i=this.defaults.walkTokens,s=n.walkTokens;r.walkTokens=function(a){let o=[];return o.push(s.call(this,a)),i&&(o=o.concat(i.call(this,a))),o};}this.defaults={...this.defaults,...r};}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return x.lex(e,t??this.defaults)}parser(e,t){return b.parse(e,t??this.defaults)}parseMarkdown(e){return (n,r)=>{let i={...r},s={...this.defaults,...i},a=this.onError(!!s.silent,!!s.async);if(this.defaults.async===!0&&i.async===!1)return a(new Error("marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise."));if(typeof n>"u"||n===null)return a(new Error("marked(): input parameter is undefined or null"));if(typeof n!="string")return a(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(n)+", string expected"));if(s.hooks&&(s.hooks.options=s,s.hooks.block=e),s.async)return (async()=>{let o=s.hooks?await s.hooks.preprocess(n):n,p=await(s.hooks?await s.hooks.provideLexer(e):e?x.lex:x.lexInline)(o,s),c=s.hooks?await s.hooks.processAllTokens(p):p;s.walkTokens&&await Promise.all(this.walkTokens(c,s.walkTokens));let h=await(s.hooks?await s.hooks.provideParser(e):e?b.parse:b.parseInline)(c,s);return s.hooks?await s.hooks.postprocess(h):h})().catch(a);try{s.hooks&&(n=s.hooks.preprocess(n));let u=(s.hooks?s.hooks.provideLexer(e):e?x.lex:x.lexInline)(n,s);s.hooks&&(u=s.hooks.processAllTokens(u)),s.walkTokens&&this.walkTokens(u,s.walkTokens);let c=(s.hooks?s.hooks.provideParser(e):e?b.parse:b.parseInline)(u,s);return s.hooks&&(c=s.hooks.postprocess(c)),c}catch(o){return a(o)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let r="<p>An error occurred:</p><pre>"+T(n.message+"",!0)+"</pre>";return t?Promise.resolve(r):r}if(t)return Promise.reject(n);throw n}}};var M=new A;function g(l,e){return M.parse(l,e)}g.options=g.setOptions=function(l){return M.setOptions(l),g.defaults=M.defaults,N(g.defaults),g};g.getDefaults=_;g.defaults=R;g.use=function(...l){return M.use(...l),g.defaults=M.defaults,N(g.defaults),g};g.walkTokens=function(l,e){return M.walkTokens(l,e)};g.parseInline=M.parseInline;g.Parser=b;g.parser=b.parse;g.Renderer=y;g.TextRenderer=S;g.Lexer=x;g.lexer=x.lex;g.Tokenizer=w;g.Hooks=P;g.parse=g;var pt=g.options,ct=g.setOptions,ht=g.use,kt=g.walkTokens,dt=g.parseInline,gt=g,ft=b.parse,mt=x.lex;

if(__exports != exports)module.exports = exports;return module.exports}));
//# sourceMappingURL=marked.umd.js.map
});

// src/Extension.ts
function wrapInMarkdownBlock(prefix, content) {
  const lines = content.split("\n");
  const output = lines.flatMap((line) => [line, ""]).map((line) => `${prefix}${line}`).join("\n");
  return output.slice(0, output.length - 1);
}
function findMarksToClose(currentMarks, nextNode) {
  const marksToClose = [];
  Array.from(currentMarks.entries()).forEach(([markType, currentMark]) => {
    if (!nextNode) {
      marksToClose.push(markType);
      return;
    }
    const nextMark = (nextNode.marks || []).find(
      (mark) => mark.type === markType && index.attrsEqual(mark.attrs, currentMark.attrs)
    );
    if (!nextMark) {
      marksToClose.push(markType);
    }
  });
  return marksToClose;
}
function findMarksToOpen(activeMarks, currentMarks) {
  const marksToOpen = [];
  Array.from(currentMarks.entries()).forEach(([markType, mark]) => {
    const activeMark = activeMarks.get(markType);
    if (!activeMark || !index.attrsEqual(activeMark.attrs, mark.attrs)) {
      marksToOpen.push({ type: markType, mark });
    }
  });
  return marksToOpen;
}
function findMarksToCloseAtEnd(activeMarks, currentMarks, nextNode, markSetsEqual) {
  const isLastNode = !nextNode;
  const nextNodeHasNoMarks = nextNode && (!nextNode.marks || nextNode.marks.length === 0);
  const nextNodeHasDifferentMarks = nextNode && nextNode.marks && !markSetsEqual(currentMarks, new Map(nextNode.marks.map((mark) => [mark.type, mark])));
  const marksToCloseAtEnd = [];
  if (isLastNode || nextNodeHasNoMarks || nextNodeHasDifferentMarks) {
    if (nextNode && nextNode.marks) {
      Array.from(activeMarks.entries()).reverse().forEach(([markType, activeMark]) => {
        const nextMark = nextNode.marks.find(
          (m) => m.type === markType && index.attrsEqual(m.attrs, activeMark.attrs)
        );
        if (!nextMark) {
          marksToCloseAtEnd.push(markType);
        }
      });
    } else if (isLastNode || nextNodeHasNoMarks) {
      marksToCloseAtEnd.push(...Array.from(activeMarks.keys()).reverse());
    }
  }
  return marksToCloseAtEnd;
}
function closeMarksBeforeNode(activeMarks, getMarkClosing) {
  let beforeMarkdown = "";
  Array.from(activeMarks.keys()).reverse().forEach((markType) => {
    const mark = activeMarks.get(markType);
    const closeMarkdown = getMarkClosing(markType, mark);
    if (closeMarkdown) {
      beforeMarkdown = closeMarkdown + beforeMarkdown;
    }
  });
  activeMarks.clear();
  return beforeMarkdown;
}
function reopenMarksAfterNode(marksToReopen, activeMarks, getMarkOpening) {
  let afterMarkdown = "";
  Array.from(marksToReopen.entries()).forEach(([markType, mark]) => {
    const openMarkdown = getMarkOpening(markType, mark);
    if (openMarkdown) {
      afterMarkdown += openMarkdown;
    }
    activeMarks.set(markType, mark);
  });
  return afterMarkdown;
}
function isTaskItem(item) {
  const raw = item.raw || item.text || "";
  const match = raw.match(/^(\s*)[-+*]\s+\[([ xX])\]\s+/);
  if (match) {
    return { isTask: true, checked: match[2].toLowerCase() === "x", indentLevel: match[1].length };
  }
  return { isTask: false, indentLevel: 0 };
}
function assumeContentType(content, contentType) {
  if (typeof content !== "string") {
    return "json";
  }
  return contentType;
}

// src/MarkdownManager.ts
var isHtmlUnknownElement = (element) => {
  const ctor = window.HTMLUnknownElement;
  return typeof ctor === "function" && element instanceof ctor;
};
var MarkdownManager = class {
  /**
   * Create a MarkdownManager.
   * @param options.marked Optional marked instance to use (injected).
   * @param options.markedOptions Optional options to pass to marked.setOptions
   * @param options.indentation Indentation settings (style and size).
   * @param options.extensions An array of Tiptap extensions to register for markdown parsing and rendering.
   */
  constructor(options) {
    this.activeParseLexer = null;
    /**
     * Order in which extensions were registered. Used to resolve mark nesting
     * deterministically when several marks open on the same text node.
     *
     * The flattened extensions passed to the manager are pre-sorted by Tiptap's
     * extension priority (descending), which is also the order ProseMirror uses
     * to assign mark ranks. Recording that index here lets the serializer place
     * higher-priority / lower-rank marks (e.g. link with priority 1000) on the
     * outside without inspecting any rendered markdown output.
     */
    this.extensionRanks = /* @__PURE__ */ new Map();
    this.baseExtensions = [];
    this.extensions = [];
    /** Set of extension names whose `code` spec property is truthy (nodes and marks). */
    this.codeTypes = /* @__PURE__ */ new Set();
    /** Lazy cache of tag names declared by the registered schema's parseDOM rules. */
    this.schemaParseDomTagsCache = null;
    this.lastParseResult = null;
    var _a, _b, _c, _d, _e;
    this.markedInstance = (_a = options == null ? void 0 : options.marked) != null ? _a : marked_umd.marked;
    this.indentStyle = (_c = (_b = options == null ? void 0 : options.indentation) == null ? void 0 : _b.style) != null ? _c : "space";
    this.indentSize = (_e = (_d = options == null ? void 0 : options.indentation) == null ? void 0 : _d.size) != null ? _e : 2;
    this.baseExtensions = (options == null ? void 0 : options.extensions) || [];
    if ((options == null ? void 0 : options.markedOptions) && typeof this.markedInstance.setOptions === "function") {
      this.markedInstance.setOptions(options.markedOptions);
    }
    this.registry = /* @__PURE__ */ new Map();
    this.nodeTypeRegistry = /* @__PURE__ */ new Map();
    if (options == null ? void 0 : options.extensions) {
      this.baseExtensions = options.extensions;
      const flattened = index.sortExtensions(index.flattenExtensions(options.extensions));
      flattened.forEach((ext) => this.registerExtension(ext));
    }
  }
  /** Returns the underlying marked instance. */
  get instance() {
    return this.markedInstance;
  }
  /** Returns the correct indentCharacter (space or tab) */
  get indentCharacter() {
    return this.indentStyle === "space" ? " " : "	";
  }
  /** Returns the correct indentString repeated X times */
  get indentString() {
    return this.indentCharacter.repeat(this.indentSize);
  }
  /** Helper to quickly check whether a marked instance is available. */
  hasMarked() {
    return !!this.markedInstance;
  }
  /**
   * Register a Tiptap extension (Node/Mark/Extension). This will read
   * `markdownName`, `parseMarkdown`, `renderMarkdown` and `priority` from the
   * extension config (using the same resolution used across the codebase).
   */
  registerExtension(extension) {
    var _a, _b;
    this.extensions.push(extension);
    const isCode = index.callOrReturn(index.getExtensionField(extension, "code"));
    const name = extension.name;
    if (isCode) {
      this.codeTypes.add(name);
    }
    if (!this.extensionRanks.has(name)) {
      this.extensionRanks.set(name, this.extensionRanks.size);
    }
    const tokenName = index.getExtensionField(
      extension,
      "markdownTokenName"
    ) || name;
    const parseMarkdown = index.getExtensionField(extension, "parseMarkdown");
    const renderMarkdown = index.getExtensionField(extension, "renderMarkdown");
    const tokenizer = index.getExtensionField(extension, "markdownTokenizer");
    const markdownCfg = (_a = index.getExtensionField(extension, "markdownOptions")) != null ? _a : null;
    const isIndenting = (_b = markdownCfg == null ? void 0 : markdownCfg.indentsContent) != null ? _b : false;
    const htmlReopen = markdownCfg == null ? void 0 : markdownCfg.htmlReopen;
    const spec = {
      tokenName,
      nodeName: name,
      parseMarkdown,
      renderMarkdown,
      isIndenting,
      htmlReopen,
      tokenizer
    };
    if (tokenName && parseMarkdown) {
      const parseExisting = this.registry.get(tokenName) || [];
      parseExisting.push(spec);
      this.registry.set(tokenName, parseExisting);
    }
    if (renderMarkdown) {
      const renderExisting = this.nodeTypeRegistry.get(name) || [];
      renderExisting.push(spec);
      this.nodeTypeRegistry.set(name, renderExisting);
    }
    if (tokenizer && this.hasMarked()) {
      this.registerTokenizer(tokenizer);
    }
  }
  createLexer() {
    return new this.markedInstance.Lexer();
  }
  createTokenizerHelpers(lexer) {
    return {
      inlineTokens: (src) => lexer.inlineTokens(src),
      blockTokens: (src) => lexer.blockTokens(src)
    };
  }
  tokenizeInline(src) {
    var _a;
    return ((_a = this.activeParseLexer) != null ? _a : this.createLexer()).inlineTokens(src);
  }
  /**
   * Register a custom tokenizer with marked.js for parsing non-standard markdown syntax.
   */
  registerTokenizer(tokenizer) {
    if (!this.hasMarked()) {
      return;
    }
    const { name, start, level = "inline", tokenize } = tokenizer;
    const createTokenizerHelpers = this.createTokenizerHelpers.bind(this);
    const createLexer = this.createLexer.bind(this);
    let startCb;
    if (!start) {
      startCb = (src) => {
        const result = tokenize(src, [], this.createTokenizerHelpers(this.createLexer()));
        if (result && result.raw) {
          const index = src.indexOf(result.raw);
          return index;
        }
        return -1;
      };
    } else {
      startCb = typeof start === "function" ? start : (src) => src.indexOf(start);
    }
    const markedExtension = {
      name,
      level,
      start: startCb,
      tokenizer(src, tokens) {
        const helper = this.lexer ? createTokenizerHelpers(this.lexer) : createTokenizerHelpers(createLexer());
        const result = tokenize(src, tokens, helper);
        if (result && result.type) {
          return {
            ...result,
            type: result.type || name,
            raw: result.raw || "",
            tokens: result.tokens || []
          };
        }
        return void 0;
      },
      childTokens: []
    };
    this.markedInstance.use({
      extensions: [markedExtension]
    });
  }
  /** Get registered handlers for a token type and try each until one succeeds. */
  getHandlersForToken(type) {
    try {
      return this.registry.get(type) || [];
    } catch {
      return [];
    }
  }
  /** Get the first handler for a token type (for backwards compatibility). */
  getHandlerForToken(type) {
    const markdownHandlers = this.getHandlersForToken(type);
    if (markdownHandlers.length > 0) {
      return markdownHandlers[0];
    }
    const nodeTypeHandlers = this.getHandlersForNodeType(type);
    return nodeTypeHandlers.length > 0 ? nodeTypeHandlers[0] : void 0;
  }
  /** Get registered handlers for a node type (for rendering). */
  getHandlersForNodeType(type) {
    try {
      return this.nodeTypeRegistry.get(type) || [];
    } catch {
      return [];
    }
  }
  /**
   * Serialize a ProseMirror-like JSON document (or node array) to a Markdown string
   * using registered renderers and fallback renderers.
   */
  serialize(docOrContent) {
    if (!docOrContent) {
      return "";
    }
    const result = this.renderNodes(docOrContent, docOrContent);
    return this.isEmptyOutput(result) ? "" : result;
  }
  /**
   * Check if the markdown output represents an empty document.
   * Empty documents may contain only &nbsp; entities or non-breaking space characters
   * which are used by the Paragraph extension to preserve blank lines.
   */
  isEmptyOutput(markdown) {
    if (!markdown || markdown.trim() === "") {
      return true;
    }
    const cleanedOutput = markdown.replace(/&nbsp;/g, "").replace(/\u00A0/g, "").trim();
    return cleanedOutput === "";
  }
  /**
   * Parse markdown string into Tiptap JSON document using registered extension handlers.
   */
  parse(markdown) {
    if (!this.hasMarked()) {
      throw new Error("No marked instance available for parsing");
    }
    const previousParseLexer = this.activeParseLexer;
    const parseLexer = this.createLexer();
    this.activeParseLexer = parseLexer;
    try {
      const tokens = parseLexer.lex(markdown);
      const content = this.parseTokens(tokens, true);
      return {
        type: "doc",
        content
      };
    } finally {
      this.activeParseLexer = previousParseLexer;
    }
  }
  /**
   * Convert an array of marked tokens into Tiptap JSON nodes using registered extension handlers.
   */
  parseTokens(tokens, parseImplicitEmptyParagraphs = false) {
    const nonSpaceTokenIndexes = tokens.reduce((indexes, token, index) => {
      if (token.type !== "space") {
        indexes.push(index);
      }
      return indexes;
    }, []);
    let previousNonSpaceTokenIndex = -1;
    let nextNonSpaceTokenPointer = 0;
    return tokens.flatMap((token, index) => {
      var _a;
      while (nextNonSpaceTokenPointer < nonSpaceTokenIndexes.length && nonSpaceTokenIndexes[nextNonSpaceTokenPointer] < index) {
        previousNonSpaceTokenIndex = nonSpaceTokenIndexes[nextNonSpaceTokenPointer];
        nextNonSpaceTokenPointer += 1;
      }
      if (parseImplicitEmptyParagraphs && token.type === "space") {
        const nextNonSpaceTokenIndex = (_a = nonSpaceTokenIndexes[nextNonSpaceTokenPointer]) != null ? _a : -1;
        return this.createImplicitEmptyParagraphsFromSpace(
          token,
          previousNonSpaceTokenIndex,
          nextNonSpaceTokenIndex
        );
      }
      const parsed = this.parseToken(token, parseImplicitEmptyParagraphs);
      if (parsed === null) {
        return [];
      }
      return Array.isArray(parsed) ? parsed : [parsed];
    });
  }
  createImplicitEmptyParagraphsFromSpace(token, previousNonSpaceTokenIndex, nextNonSpaceTokenIndex) {
    const separatorCount = this.countParagraphSeparators(token.raw || "");
    if (separatorCount === 0) {
      return [];
    }
    const isBoundarySpace = previousNonSpaceTokenIndex === -1 || nextNonSpaceTokenIndex === -1;
    const emptyParagraphCount = Math.max(separatorCount - (isBoundarySpace ? 0 : 1), 0);
    return Array.from({ length: emptyParagraphCount }, () => ({ type: "paragraph", content: [] }));
  }
  countParagraphSeparators(raw) {
    return (raw.replace(/\r\n/g, "\n").match(/\n\n/g) || []).length;
  }
  /**
   * Parse a single token into Tiptap JSON using the appropriate registered handler.
   */
  parseToken(token, parseImplicitEmptyParagraphs = false) {
    if (!token.type) {
      return null;
    }
    if (token.type === "list") {
      return this.parseListToken(token);
    }
    const handlers = this.getHandlersForToken(token.type);
    const helpers = this.createParseHelpers();
    const result = handlers.find((handler) => {
      if (!handler.parseMarkdown) {
        return false;
      }
      const parseResult = handler.parseMarkdown(token, helpers);
      const normalized = this.normalizeParseResult(parseResult);
      if (normalized && (!Array.isArray(normalized) || normalized.length > 0)) {
        this.lastParseResult = normalized;
        return true;
      }
      return false;
    });
    if (result && this.lastParseResult) {
      const toReturn = this.lastParseResult;
      this.lastParseResult = null;
      return toReturn;
    }
    return this.parseFallbackToken(token, parseImplicitEmptyParagraphs);
  }
  /**
   * Parse a list token, handling mixed bullet and task list items by splitting them into separate lists.
   * This ensures that consecutive task items and bullet items are grouped and parsed as separate list nodes.
   *
   * @param token The list token to parse
   * @returns Array of parsed list nodes, or null if parsing fails
   */
  parseListToken(token) {
    if (!token.items || token.items.length === 0) {
      return this.parseTokenWithHandlers(token);
    }
    const hasTask = token.items.some((item) => isTaskItem(item).isTask);
    const hasNonTask = token.items.some((item) => !isTaskItem(item).isTask);
    if (!hasTask || !hasNonTask || this.getHandlersForToken("taskList").length === 0) {
      return this.parseTokenWithHandlers(token);
    }
    const groups = [];
    let currentGroup = [];
    let currentType = null;
    for (let i = 0; i < token.items.length; i += 1) {
      const item = token.items[i];
      const { isTask, checked, indentLevel } = isTaskItem(item);
      let processedItem = item;
      if (isTask) {
        const raw = item.raw || item.text || "";
        const lines = raw.split("\n");
        const firstLineMatch = lines[0].match(/^\s*[-+*]\s+\[([ xX])\]\s+(.*)$/);
        const mainContent = firstLineMatch ? firstLineMatch[2] : "";
        let nestedTokens = [];
        if (lines.length > 1) {
          const nestedRaw = lines.slice(1).join("\n");
          if (nestedRaw.trim()) {
            const nestedLines = lines.slice(1);
            const nonEmptyLines = nestedLines.filter((line) => line.trim());
            if (nonEmptyLines.length > 0) {
              const minIndent = Math.min(
                ...nonEmptyLines.map((line) => line.length - line.trimStart().length)
              );
              const trimmedLines = nestedLines.map((line) => {
                if (!line.trim()) {
                  return "";
                }
                return line.slice(minIndent);
              });
              const nestedContent = trimmedLines.join("\n").trim();
              if (nestedContent) {
                nestedTokens = this.markedInstance.lexer(`${nestedContent}
`);
              }
            }
          }
        }
        processedItem = {
          type: "taskItem",
          raw: "",
          mainContent,
          indentLevel,
          checked: checked != null ? checked : false,
          text: mainContent,
          tokens: this.tokenizeInline(mainContent),
          nestedTokens
        };
      }
      const itemType = isTask ? "taskList" : "list";
      if (currentType !== itemType) {
        if (currentGroup.length > 0) {
          groups.push({ type: currentType, items: currentGroup });
        }
        currentGroup = [processedItem];
        currentType = itemType;
      } else {
        currentGroup.push(processedItem);
      }
    }
    if (currentGroup.length > 0) {
      groups.push({ type: currentType, items: currentGroup });
    }
    const results = [];
    for (let i = 0; i < groups.length; i += 1) {
      const group = groups[i];
      const subToken = { ...token, type: group.type, items: group.items };
      const parsed = this.parseToken(subToken);
      if (parsed) {
        if (Array.isArray(parsed)) {
          results.push(...parsed);
        } else {
          results.push(parsed);
        }
      }
    }
    return results.length > 0 ? results : null;
  }
  /**
   * Parse a token using registered handlers (extracted for reuse).
   */
  parseTokenWithHandlers(token) {
    if (!token.type) {
      return null;
    }
    const handlers = this.getHandlersForToken(token.type);
    const helpers = this.createParseHelpers();
    const result = handlers.find((handler) => {
      if (!handler.parseMarkdown) {
        return false;
      }
      const parseResult = handler.parseMarkdown(token, helpers);
      const normalized = this.normalizeParseResult(parseResult);
      if (normalized && (!Array.isArray(normalized) || normalized.length > 0)) {
        this.lastParseResult = normalized;
        return true;
      }
      return false;
    });
    if (result && this.lastParseResult) {
      const toReturn = this.lastParseResult;
      this.lastParseResult = null;
      return toReturn;
    }
    return this.parseFallbackToken(token);
  }
  /**
   * Creates helper functions for parsing markdown tokens.
   * @returns An object containing helper functions for parsing.
   */
  createParseHelpers() {
    return {
      parseInline: (tokens) => this.parseInlineTokens(tokens),
      tokenizeInline: (src) => this.tokenizeInline(src),
      parseChildren: (tokens) => this.parseTokens(tokens),
      parseBlockChildren: (tokens) => this.parseTokens(tokens, true),
      createTextNode: (text, marks) => {
        const node = {
          type: "text",
          text,
          marks: marks || void 0
        };
        return node;
      },
      createNode: (type, attrs, content) => {
        const node = {
          type,
          attrs: attrs || void 0,
          content: content || void 0
        };
        if (!attrs || Object.keys(attrs).length === 0) {
          delete node.attrs;
        }
        return node;
      },
      applyMark: (markType, content, attrs) => ({
        mark: markType,
        content,
        attrs: attrs && Object.keys(attrs).length > 0 ? attrs : void 0
      })
    };
  }
  /**
   * Escape special regex characters in a string.
   */
  escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  /**
   * Parse inline tokens (bold, italic, links, etc.) into text nodes with marks.
   * This is the complex part that handles mark nesting and boundaries.
   */
  parseInlineTokens(tokens) {
    var _a, _b, _c, _d;
    const result = [];
    for (let i = 0; i < tokens.length; i += 1) {
      const token = tokens[i];
      if (token.type === "text") {
        result.push({
          type: "text",
          text: index.decodeHtmlEntities(token.text || "")
        });
      } else if (token.type === "escape") {
        result.push({
          type: "text",
          text: token.text || ""
        });
      } else if (token.type === "html") {
        const raw = ((_b = (_a = token.raw) != null ? _a : token.text) != null ? _b : "").toString();
        const isClosing = /^<\/[\s]*[\w-]+/i.test(raw);
        const openMatch = raw.match(/^<[\s]*([\w-]+)(\s|>|\/|$)/i);
        if (!isClosing && openMatch && !/\/>$/.test(raw)) {
          const tagName = openMatch[1];
          const escapedTagName = this.escapeRegex(tagName);
          const closingRegex = new RegExp(`^<\\/\\s*${escapedTagName}\\b`, "i");
          let foundIndex = -1;
          const parts = [raw];
          for (let j = i + 1; j < tokens.length; j += 1) {
            const t = tokens[j];
            const tRaw = ((_d = (_c = t.raw) != null ? _c : t.text) != null ? _d : "").toString();
            parts.push(tRaw);
            if (t.type === "html" && closingRegex.test(tRaw)) {
              foundIndex = j;
              break;
            }
          }
          if (foundIndex !== -1) {
            const mergedRaw = parts.join("");
            const mergedToken = {
              type: "html",
              raw: mergedRaw,
              text: mergedRaw,
              block: false
            };
            const parsed = this.parseHTMLToken(mergedToken);
            if (parsed) {
              const normalized = this.normalizeParseResult(parsed);
              if (Array.isArray(normalized)) {
                result.push(...normalized);
              } else if (normalized) {
                result.push(normalized);
              }
            }
            i = foundIndex;
            continue;
          }
        }
        const parsedSingle = this.parseHTMLToken(token);
        if (parsedSingle) {
          const normalized = this.normalizeParseResult(parsedSingle);
          if (Array.isArray(normalized)) {
            result.push(...normalized);
          } else if (normalized) {
            result.push(normalized);
          }
        }
      } else if (token.type) {
        const markHandler = this.getHandlerForToken(token.type);
        if (markHandler && markHandler.parseMarkdown) {
          const helpers = this.createParseHelpers();
          const parsed = markHandler.parseMarkdown(token, helpers);
          if (this.isMarkResult(parsed)) {
            const markedContent = this.applyMarkToContent(parsed.mark, parsed.content, parsed.attrs);
            result.push(...markedContent);
          } else {
            const normalized = this.normalizeParseResult(parsed);
            if (Array.isArray(normalized)) {
              result.push(...normalized);
            } else if (normalized) {
              result.push(normalized);
            }
          }
        } else if (token.tokens) {
          result.push(...this.parseInlineTokens(token.tokens));
        }
      }
    }
    for (let i = result.length - 1; i > 0; i -= 1) {
      const current = result[i];
      const previous = result[i - 1];
      if (current.type === "text" && previous.type === "text") {
        const currentMarks = current.marks || [];
        const previousMarks = previous.marks || [];
        if (index.marksEqual(currentMarks, previousMarks)) {
          previous.text = (previous.text || "") + (current.text || "");
          result.splice(i, 1);
        }
      }
    }
    return result;
  }
  /**
   * Apply a mark to content nodes.
   */
  applyMarkToContent(markType, content, attrs) {
    return content.map((node) => {
      if (node.type === "text") {
        const existingMarks = node.marks || [];
        const newMark = attrs ? { type: markType, attrs } : { type: markType };
        return {
          ...node,
          marks: [...existingMarks, newMark]
        };
      }
      return {
        ...node,
        content: node.content ? this.applyMarkToContent(markType, node.content, attrs) : void 0
      };
    });
  }
  /**
  * Check if a parse result represents a mark to be applied.
  */
  isMarkResult(result) {
    return result && typeof result === "object" && "mark" in result;
  }
  /**
   * Normalize parse results to ensure they're valid JSONContent.
   */
  normalizeParseResult(result) {
    if (!result) {
      return null;
    }
    if (this.isMarkResult(result)) {
      return result.content;
    }
    return result;
  }
  /**
   * Fallback parsing for common tokens when no specific handler is registered.
   */
  parseFallbackToken(token, parseImplicitEmptyParagraphs = false) {
    switch (token.type) {
      case "paragraph":
        return {
          type: "paragraph",
          content: token.tokens ? this.parseInlineTokens(token.tokens) : []
        };
      case "heading":
        return {
          type: "heading",
          attrs: { level: token.depth || 1 },
          content: token.tokens ? this.parseInlineTokens(token.tokens) : []
        };
      case "text":
        return {
          type: "text",
          text: index.decodeHtmlEntities(token.text || "")
        };
      case "html":
        return this.parseHTMLToken(token);
      // handle Marked escape tokens as literal text (e.g. backslash-escaped characters)
      case "escape":
        return {
          type: "text",
          text: token.text || ""
        };
      case "space":
        return null;
      default:
        if (token.tokens) {
          return this.parseTokens(token.tokens, parseImplicitEmptyParagraphs);
        }
        return null;
    }
  }
  /**
   * Parse an HTML token from marked into JSONContent using the registered
   * extensions' `parseHTML` rules. Falls back to literal text when the HTML
   * has nothing for the schema to keep.
   *
   * @param token Marked HTML token (block or inline).
   * @example
   *   parseHTMLToken({ type: 'html', raw: '<em>hi</em>', block: false })
   *   // → text node with an italic mark
   */
  parseHTMLToken(token) {
    const html = token.text || token.raw || "";
    if (!html.trim()) {
      return null;
    }
    if (typeof window === "undefined") {
      if (token.block) {
        return {
          type: "paragraph",
          content: [
            {
              type: "text",
              text: html
            }
          ]
        };
      }
      return {
        type: "text",
        text: html
      };
    }
    if (this.isUnrecognizedHtml(html)) {
      return this.htmlAsLiteralText(html, !!token.block);
    }
    try {
      const parsed = index.generateJSON(html, this.baseExtensions);
      if (parsed.type === "doc" && parsed.content) {
        if (token.block) {
          return parsed.content;
        }
        if (parsed.content.length === 1 && parsed.content[0].type === "paragraph" && parsed.content[0].content) {
          return parsed.content[0].content;
        }
        return parsed.content;
      }
      return parsed;
    } catch (error) {
      throw new Error(`Failed to parse HTML in markdown: ${error}`);
    }
  }
  /**
   * Returns true when the HTML contains an element the browser classifies as
   * `HTMLUnknownElement` – unless a registered extension declares the tag
   * name in its parseDOM rules, in which case it is treated as a known
   * custom element.
   *
   * Recognized but empty elements such as `<em></em>` or `<span></span>`,
   * and hyphenated custom elements like `<my-mention>`, are not considered
   * unrecognized.
   *
   * @param html Raw HTML string from a marked token.
   * @example
   *   isUnrecognizedHtml('<enter foo bar>')  // → true
   *   isUnrecognizedHtml('<em></em>')        // → false (empty, but real tag)
   *   isUnrecognizedHtml('<em>hi</em>')      // → false
   *   isUnrecognizedHtml('<my-el></my-el>')  // → false (valid custom element)
   *   isUnrecognizedHtml('<br>')             // → false
   */
  isUnrecognizedHtml(html) {
    if (typeof window === "undefined" || typeof window.DOMParser === "undefined") {
      return false;
    }
    const dom = new window.DOMParser().parseFromString(`<body>${html}</body>`, "text/html").body;
    const elements = dom.querySelectorAll("*");
    if (elements.length === 0) {
      return false;
    }
    const schemaTags = this.getSchemaParseDomTags();
    return Array.from(elements).some((el) => {
      if (!isHtmlUnknownElement(el)) {
        return false;
      }
      const tagName = el.tagName.toLowerCase();
      return !schemaTags.has(tagName);
    });
  }
  /**
   * Collect the lower-cased tag names declared by the registered extensions'
   * parseDOM rules, so custom node/mark elements that use non-hyphenated,
   * non-standard tag names are treated as recognized HTML. Result is cached for the
   * lifetime of the manager since extensions don't change after registration.
   *
   * @example
   *   // After registering an extension with parseDOM [{ tag: 'something' }]
   *   getSchemaParseDomTags().has('something') // → true
   */
  getSchemaParseDomTags() {
    if (this.schemaParseDomTagsCache) {
      return this.schemaParseDomTagsCache;
    }
    const tags = /* @__PURE__ */ new Set();
    try {
      const schema = index.getSchema(this.baseExtensions);
      const collect = (spec) => {
        const parseDOM = spec == null ? void 0 : spec.parseDOM;
        if (!Array.isArray(parseDOM)) {
          return;
        }
        parseDOM.forEach((rule) => {
          if (typeof (rule == null ? void 0 : rule.tag) === "string") {
            const match = rule.tag.match(/^[a-zA-Z][\w-]*/);
            if (match) {
              tags.add(match[0].toLowerCase());
            }
          }
        });
      };
      Object.values(schema.nodes).forEach((type) => collect(type.spec));
      Object.values(schema.marks).forEach((type) => collect(type.spec));
    } catch {
    }
    this.schemaParseDomTagsCache = tags;
    return tags;
  }
  /**
   * Build a JSONContent that preserves the original HTML markup as literal
   * text. Used when the HTML would otherwise be silently dropped during
   * schema-aware parsing.
   *
   * @param html Raw HTML string to preserve verbatim.
   * @param isBlock Whether to wrap the text in a paragraph node (block tokens)
   *   or return it as a bare text node (inline tokens).
   * @example
   *   htmlAsLiteralText('<enter foo>', true)
   *   // → { type: 'paragraph', content: [{ type: 'text', text: '<enter foo>' }] }
   */
  htmlAsLiteralText(html, isBlock) {
    const text = html.replace(/\s+$/, "");
    if (!text) {
      return null;
    }
    if (isBlock) {
      return {
        type: "paragraph",
        content: [{ type: "text", text }]
      };
    }
    return { type: "text", text };
  }
  /**
   * Encode HTML entities in text unless the node is inside a code context
   * (code mark or code-block parent) where literal characters should be preserved.
   * Also backslash-escape markdown-significant characters in non-code text to
   * prevent them from being misinterpreted as formatting delimiters.
   */
  encodeTextForMarkdown(text, node, parentNode) {
    const isInsideCode = (parentNode == null ? void 0 : parentNode.type) != null && this.codeTypes.has(parentNode.type) || (node.marks || []).some((m) => this.codeTypes.has(typeof m === "string" ? m : m.type));
    if (isInsideCode) {
      return text;
    }
    return this.escapeMarkdownSyntax(index.encodeHtmlEntities(text));
  }
  /**
   * Backslash-escape characters that have special meaning in markdown inline
   * syntax. This prevents literal characters in text nodes from being
   * misinterpreted as formatting delimiters when the output is parsed again.
   *
   * The set covers the most common inline markdown syntax characters.
   * Characters inside code blocks/code marks are skipped by the caller
   * (`encodeTextForMarkdown`) via the existing `isInsideCode` guard.
   */
  escapeMarkdownSyntax(text) {
    return text.replace(/([\\`*_[\]~])/g, "\\$1");
  }
  renderNodeToMarkdown(node, parentNode, index = 0, level = 0, meta = {}) {
    var _a;
    if (node.type === "text") {
      return this.encodeTextForMarkdown(node.text || "", node, parentNode);
    }
    if (!node.type) {
      return "";
    }
    const handler = this.getHandlerForToken(node.type);
    if (!handler) {
      return "";
    }
    const previousNode = Array.isArray(parentNode == null ? void 0 : parentNode.content) && index > 0 ? parentNode.content[index - 1] : void 0;
    const helpers = {
      renderChildren: (nodes, separator) => {
        const childLevel = handler.isIndenting ? level + 1 : level;
        if (!Array.isArray(nodes) && nodes.content) {
          return this.renderNodes(
            nodes.content,
            node,
            separator || "",
            index,
            childLevel
          );
        }
        return this.renderNodes(nodes, node, separator || "", index, childLevel);
      },
      renderChild: (childNode, childIndex) => {
        const childLevel = handler.isIndenting ? level + 1 : level;
        return this.renderNodeToMarkdown(childNode, node, childIndex, childLevel);
      },
      indent: (content) => {
        return this.indentString + content;
      },
      wrapInBlock: wrapInMarkdownBlock
    };
    const context = {
      index,
      level,
      parentType: parentNode == null ? void 0 : parentNode.type,
      previousNode,
      meta: {
        parentAttrs: parentNode == null ? void 0 : parentNode.attrs,
        ...meta
      }
    };
    const rendered = ((_a = handler.renderMarkdown) == null ? void 0 : _a.call(handler, node, helpers, context)) || "";
    return rendered;
  }
  /**
   * Render a node or an array of nodes. Parent type controls how children
   * are joined (which determines newline insertion between children).
   */
  renderNodes(nodeOrNodes, parentNode, separator = "", index = 0, level = 0) {
    if (!Array.isArray(nodeOrNodes)) {
      if (!nodeOrNodes.type) {
        return "";
      }
      return this.renderNodeToMarkdown(nodeOrNodes, parentNode, index, level);
    }
    return this.renderNodesWithMarkBoundaries(nodeOrNodes, parentNode, separator, level);
  }
  /**
   * Render an array of nodes while properly tracking mark boundaries.
   * This handles cases where marks span across multiple text nodes.
   */
  renderNodesWithMarkBoundaries(nodes, parentNode, separator = "", level = 0) {
    const result = [];
    const activeMarks = /* @__PURE__ */ new Map();
    const reopenWithHtmlOnNextOpen = /* @__PURE__ */ new Set();
    const markOpeningModes = /* @__PURE__ */ new Map();
    nodes.forEach((node, i) => {
      const nextNode = i < nodes.length - 1 ? nodes[i + 1] : null;
      if (!node.type) {
        return;
      }
      if (node.type === "text") {
        let textContent = this.encodeTextForMarkdown(node.text || "", node, parentNode);
        const currentMarks = new Map((node.marks || []).map((mark) => [mark.type, mark]));
        const marksToOpen = this.getMarksToOpenForSerialization(activeMarks, currentMarks, nextNode);
        const marksToClose = findMarksToClose(currentMarks, nextNode);
        const activeMarksClosingHere = marksToClose.filter((markType) => activeMarks.has(markType));
        const hasCrossedBoundary = activeMarksClosingHere.length > 0 && marksToOpen.length > 0;
        let middleTrailingWhitespace = "";
        if (marksToClose.length > 0 && !hasCrossedBoundary) {
          const middleTrailingMatch = textContent.match(/(\s+)$/);
          if (middleTrailingMatch) {
            middleTrailingWhitespace = middleTrailingMatch[1];
            textContent = textContent.slice(0, -middleTrailingWhitespace.length);
          }
        }
        if (!hasCrossedBoundary) {
          marksToClose.slice().reverse().forEach((markType) => {
            if (!activeMarks.has(markType)) {
              return;
            }
            const mark = currentMarks.get(markType);
            const closeMarkdown = this.getMarkClosing(
              markType,
              mark,
              markOpeningModes.get(markType)
            );
            if (closeMarkdown) {
              textContent += closeMarkdown;
            }
            if (activeMarks.has(markType)) {
              activeMarks.delete(markType);
              markOpeningModes.delete(markType);
            }
          });
        }
        let leadingWhitespace = "";
        if (marksToOpen.length > 0) {
          const leadingMatch = textContent.match(/^(\s+)/);
          if (leadingMatch) {
            leadingWhitespace = leadingMatch[1];
            textContent = textContent.slice(leadingWhitespace.length);
          }
        }
        marksToOpen.forEach(({ type, mark }) => {
          const openingMode = reopenWithHtmlOnNextOpen.has(type) ? "html" : "markdown";
          const openMarkdown = this.getMarkOpening(type, mark, openingMode);
          if (openMarkdown) {
            textContent = openMarkdown + textContent;
          }
          markOpeningModes.set(type, openingMode);
          reopenWithHtmlOnNextOpen.delete(type);
        });
        if (!hasCrossedBoundary) {
          marksToOpen.slice().reverse().forEach(({ type, mark }) => {
            activeMarks.set(type, mark);
          });
        }
        textContent = leadingWhitespace + textContent;
        let marksToCloseAtEnd;
        if (hasCrossedBoundary) {
          const nextMarkTypes = new Set(((nextNode == null ? void 0 : nextNode.marks) || []).map((mark) => mark.type));
          marksToOpen.forEach(({ type }) => {
            if (nextMarkTypes.has(type) && this.getHtmlReopenTags(type)) {
              reopenWithHtmlOnNextOpen.add(type);
            }
          });
          const activeMarkKeys = Array.from(activeMarks.keys());
          const activeMarksClosingHereLifo = activeMarksClosingHere.slice().sort((a, b) => activeMarkKeys.indexOf(b) - activeMarkKeys.indexOf(a));
          marksToCloseAtEnd = [
            ...marksToOpen.map((m) => m.type),
            // inner (opened here) — close first
            ...activeMarksClosingHereLifo
            // outer (were active before) — close last, LIFO
          ];
        } else {
          marksToCloseAtEnd = findMarksToCloseAtEnd(
            activeMarks,
            currentMarks,
            nextNode,
            this.markSetsEqual.bind(this)
          );
        }
        let trailingWhitespace = "";
        if (marksToCloseAtEnd.length > 0) {
          const trailingMatch = textContent.match(/(\s+)$/);
          if (trailingMatch) {
            trailingWhitespace = trailingMatch[1];
            textContent = textContent.slice(0, -trailingWhitespace.length);
          }
        }
        marksToCloseAtEnd.forEach((markType) => {
          var _a;
          const mark = (_a = activeMarks.get(markType)) != null ? _a : currentMarks.get(markType);
          const closeMarkdown = this.getMarkClosing(markType, mark, markOpeningModes.get(markType));
          if (closeMarkdown) {
            textContent += closeMarkdown;
          }
          activeMarks.delete(markType);
          markOpeningModes.delete(markType);
        });
        textContent += trailingWhitespace;
        textContent += middleTrailingWhitespace;
        result.push(textContent);
      } else {
        const nodeMarkTypes = new Set((node.marks || []).map((mark) => mark.type));
        const marksToReopen = /* @__PURE__ */ new Map();
        const openingModesToReopen = /* @__PURE__ */ new Map();
        activeMarks.forEach((mark, type) => {
          var _a;
          if (nodeMarkTypes.has(type)) {
            marksToReopen.set(type, mark);
            openingModesToReopen.set(type, (_a = markOpeningModes.get(type)) != null ? _a : "markdown");
          }
        });
        const beforeMarkdown = closeMarksBeforeNode(activeMarks, (markType, mark) => {
          return this.getMarkClosing(markType, mark, markOpeningModes.get(markType));
        });
        markOpeningModes.clear();
        const nodeContent = this.renderNodeToMarkdown(node, parentNode, i, level);
        const afterMarkdown = node.type === "hardBreak" ? "" : reopenMarksAfterNode(marksToReopen, activeMarks, (markType, mark) => {
          var _a;
          const openingMode = (_a = openingModesToReopen.get(markType)) != null ? _a : "markdown";
          markOpeningModes.set(markType, openingMode);
          return this.getMarkOpening(markType, mark, openingMode);
        });
        result.push(beforeMarkdown + nodeContent + afterMarkdown);
      }
    });
    return result.join(separator);
  }
  /**
   * Get the opening markdown syntax for a mark type.
   */
  getMarkOpening(markType, mark, openingMode = "markdown") {
    var _a;
    if (openingMode === "html") {
      return ((_a = this.getHtmlReopenTags(markType)) == null ? void 0 : _a.open) || "";
    }
    const handlers = this.getHandlersForNodeType(markType);
    const handler = handlers.length > 0 ? handlers[0] : void 0;
    if (!handler || !handler.renderMarkdown) {
      return "";
    }
    const placeholder = "\uE000__TIPTAP_MARKDOWN_PLACEHOLDER__\uE001";
    const syntheticNode = {
      type: markType,
      attrs: mark.attrs || {},
      content: [{ type: "text", text: placeholder }]
    };
    try {
      const rendered = handler.renderMarkdown(
        syntheticNode,
        {
          renderChildren: () => placeholder,
          renderChild: () => placeholder,
          indent: (content) => content,
          wrapInBlock: (prefix, content) => prefix + content
        },
        { index: 0, level: 0, parentType: "text", meta: {} }
      );
      const placeholderIndex = rendered.indexOf(placeholder);
      return placeholderIndex >= 0 ? rendered.substring(0, placeholderIndex) : "";
    } catch (err) {
      throw new Error(`Failed to get mark opening for ${markType}: ${err}`);
    }
  }
  /**
   * Get the closing markdown syntax for a mark type.
   */
  getMarkClosing(markType, mark, openingMode = "markdown") {
    var _a;
    if (openingMode === "html") {
      return ((_a = this.getHtmlReopenTags(markType)) == null ? void 0 : _a.close) || "";
    }
    const handlers = this.getHandlersForNodeType(markType);
    const handler = handlers.length > 0 ? handlers[0] : void 0;
    if (!handler || !handler.renderMarkdown) {
      return "";
    }
    const placeholder = "\uE000__TIPTAP_MARKDOWN_PLACEHOLDER__\uE001";
    const syntheticNode = {
      type: markType,
      attrs: mark.attrs || {},
      content: [{ type: "text", text: placeholder }]
    };
    try {
      const rendered = handler.renderMarkdown(
        syntheticNode,
        {
          renderChildren: () => placeholder,
          renderChild: () => placeholder,
          indent: (content) => content,
          wrapInBlock: (prefix, content) => prefix + content
        },
        { index: 0, level: 0, parentType: "text", meta: {} }
      );
      const placeholderIndex = rendered.indexOf(placeholder);
      const placeholderEnd = placeholderIndex + placeholder.length;
      return placeholderIndex >= 0 ? rendered.substring(placeholderEnd) : "";
    } catch (err) {
      throw new Error(`Failed to get mark closing for ${markType}: ${err}`);
    }
  }
  /**
   * Returns the inline HTML tags an extension exposes for overlap-boundary
   * reopen handling, if that mark explicitly opted into HTML reopen mode.
   */
  getHtmlReopenTags(markType) {
    const handlers = this.getHandlersForNodeType(markType);
    const handler = handlers.length > 0 ? handlers[0] : void 0;
    return handler == null ? void 0 : handler.htmlReopen;
  }
  /**
   * Check if two mark sets are equal (same types and matching attributes).
   */
  markSetsEqual(marks1, marks2) {
    if (marks1.size !== marks2.size) {
      return false;
    }
    return Array.from(marks1.entries()).every(([type, mark]) => {
      const otherMark = marks2.get(type);
      return otherMark && index.attrsEqual(mark.attrs, otherMark.attrs);
    });
  }
  /**
   * Decide the order in which marks open on the current text node.
   *
   * The returned array is iterated head-first when prepending opening
   * delimiters, so the first entry becomes the innermost mark in the emitted
   * markdown and the last becomes the outermost. Two stable signals drive
   * the order — neither one inspects any rendered markdown:
   *
   *   1. Marks that end on this node must be inner relative to marks that
   *      continue into the next node, otherwise the delimiters interleave
   *      instead of nesting.
   *   2. Within each lifetime group, marks are sorted so that lower
   *      registration ranks (i.e. higher Tiptap extension priorities) end up
   *      outermost. ProseMirror assigns mark ranks in the same priority-aware
   *      order Tiptap uses when building the schema, so link (priority 1000)
   *      naturally wraps bold/italic without the serializer needing to peek
   *      at how any particular mark renders.
   */
  getMarksToOpenForSerialization(activeMarks, currentMarks, nextNode) {
    const marksToOpen = findMarksToOpen(activeMarks, currentMarks);
    if (marksToOpen.length <= 1) {
      return marksToOpen;
    }
    const nextMarks = (nextNode == null ? void 0 : nextNode.marks) || [];
    const continuesInNextNode = (markType, attrs) => nextMarks.some((m) => m.type === markType && index.attrsEqual(m.attrs, attrs));
    const byRankInnerFirst = (a, b) => {
      var _a, _b;
      const rankA = (_a = this.extensionRanks.get(a.type)) != null ? _a : Number.MAX_SAFE_INTEGER;
      const rankB = (_b = this.extensionRanks.get(b.type)) != null ? _b : Number.MAX_SAFE_INTEGER;
      if (rankA !== rankB) {
        return rankB - rankA;
      }
      return a.type.localeCompare(b.type);
    };
    const endingHere = marksToOpen.filter((mark) => !continuesInNextNode(mark.type, mark.mark.attrs)).sort(byRankInnerFirst);
    const continuing = marksToOpen.filter((mark) => continuesInNextNode(mark.type, mark.mark.attrs)).sort(byRankInnerFirst);
    return [...endingHere, ...continuing];
  }
};
var MarkdownManager_default = MarkdownManager;

// src/Extension.ts
var Markdown = index.Extension.create({
  name: "markdown",
  addOptions() {
    return {
      indentation: { style: "space", size: 2 },
      marked: void 0,
      markedOptions: {}
    };
  },
  addCommands() {
    return {
      setContent: (content, options) => {
        if (!(options == null ? void 0 : options.contentType)) {
          return index.commands_exports.setContent(content, options);
        }
        const actualContentType = assumeContentType(content, options == null ? void 0 : options.contentType);
        if (actualContentType !== "markdown" || !this.editor.markdown) {
          return index.commands_exports.setContent(content, options);
        }
        const mdContent = this.editor.markdown.parse(content);
        return index.commands_exports.setContent(mdContent, options);
      },
      insertContent: (value, options) => {
        if (!(options == null ? void 0 : options.contentType)) {
          return index.commands_exports.insertContent(value, options);
        }
        const actualContentType = assumeContentType(value, options == null ? void 0 : options.contentType);
        if (actualContentType !== "markdown" || !this.editor.markdown) {
          return index.commands_exports.insertContent(value, options);
        }
        const mdContent = this.editor.markdown.parse(value);
        return index.commands_exports.insertContent(mdContent, options);
      },
      insertContentAt: (position, value, options) => {
        if (!(options == null ? void 0 : options.contentType)) {
          return index.commands_exports.insertContentAt(position, value, options);
        }
        const actualContentType = assumeContentType(value, options == null ? void 0 : options.contentType);
        if (actualContentType !== "markdown" || !this.editor.markdown) {
          return index.commands_exports.insertContentAt(position, value, options);
        }
        const mdContent = this.editor.markdown.parse(value);
        return index.commands_exports.insertContentAt(position, mdContent, options);
      }
    };
  },
  addStorage() {
    return {
      manager: new MarkdownManager_default({
        indentation: this.options.indentation,
        marked: this.options.marked,
        markedOptions: this.options.markedOptions,
        extensions: []
      })
    };
  },
  onBeforeCreate() {
    var _a;
    if (this.editor.markdown) {
      console.error(
        "[tiptap][markdown]: There is already a `markdown` property on the editor instance. This might lead to unexpected behavior."
      );
      return;
    }
    this.storage.manager = new MarkdownManager_default({
      indentation: this.options.indentation,
      marked: this.options.marked,
      markedOptions: this.options.markedOptions,
      extensions: this.editor.extensionManager.baseExtensions
    });
    this.editor.markdown = this.storage.manager;
    this.editor.getMarkdown = () => {
      return this.storage.manager.serialize(this.editor.getJSON());
    };
    if (!this.editor.options.contentType) {
      return;
    }
    const assumedType = assumeContentType(
      this.editor.options.content,
      this.editor.options.contentType
    );
    if (assumedType !== "markdown") {
      return;
    }
    if (!this.editor.markdown) {
      throw new Error(
        '[tiptap][markdown]: The `contentType` option is set to "markdown", but the Markdown extension is not added to the editor. Please add the Markdown extension to use this feature.'
      );
    }
    if (this.editor.options.content === void 0 || typeof this.editor.options.content !== "string") {
      throw new Error(
        '[tiptap][markdown]: The `contentType` option is set to "markdown", but the initial content is not a string. Please provide the initial content as a markdown string.'
      );
    }
    const json = this.editor.markdown.parse(this.editor.options.content);
    if ((_a = json.content) == null ? void 0 : _a.length) {
      this.editor.options.content = json;
    }
  }
});

/**
 * @file Custom FontSize mark extension for Tiptap
 * @description Preserves ql-size-* CSS classes on <span> elements,
 *   ensuring backward-compatibility with content created in the Quill editor.
 *   Adds setFontSize / unsetFontSize commands so the toolbar picker can apply sizes.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const TiptapFontSize = index.Mark.create({
  name: 'fontSize',
  addOptions() {
    return {
      sizes: ['2xs', 'xs', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'],
    };
  },
  addAttributes() {
    return {
      size: {
        default: null,
        parseHTML: (element) => {
          const cls = element.className || '';
          const match = cls.match(/ql-size-(\S+)/);
          return match ? match[1] : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.size)
            return {};
          return { class: `ql-size-${attributes.size}` };
        },
      },
    };
  },
  parseHTML() {
    // Quill applies ql-size-* classes to multiple inline tags, not just <span>.
    // We must match all of them so font sizes are preserved when parsing legacy HTML.
    //
    // `consuming: false` is critical — without it, the first matching mark (e.g. Bold
    // for <strong>) would consume the element and prevent FontSize from also matching.
    // `priority: 60` (above the default 50) ensures FontSize is evaluated before
    // Bold/Italic/Underline so the ql-size-* class is captured before those marks
    // consume the tag.
    const tags = ['span', 'strong', 'em', 'u', 's', 'sub', 'sup'];
    return tags.map(tag => ({
      tag,
      consuming: false,
      priority: 60,
      getAttrs: (el) => {
        const cls = el.className || '';
        return /ql-size-\S+/.test(cls) ? {} : false;
      },
    }));
  },
  renderHTML({ HTMLAttributes }) {
    return ['span', index.mergeAttributes(HTMLAttributes), 0];
  },
  addCommands() {
    return {
      setFontSize: (size) => ({ commands }) => {
        if (!size) {
          return commands.unsetMark(this.name);
        }
        return commands.setMark(this.name, { size });
      },
      unsetFontSize: () => ({ commands }) => commands.unsetMark(this.name),
    };
  },
});

/**
 * @file Custom Video Node extension for Tiptap
 * @description Preserves <video> elements from Quill-authored HTML.
 *   Uses a NodeView wrapper with contenteditable="false" to ensure the video
 *   renders correctly (thumbnail + controls) inside a contenteditable editor.
 *   Supports src, controls, width, height attributes.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const TiptapVideo = index.Node3.create({
  name: 'video',
  group: 'block',
  atom: true,
  draggable: true,
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      src: {
        default: null,
      },
      controls: {
        default: true,
        parseHTML: (element) => element.hasAttribute('controls'),
        renderHTML: (attributes) => {
          if (!attributes.controls)
            return {};
          return { controls: '' };
        },
      },
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute('width'),
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute('height'),
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'video[src]',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ['video', index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  addNodeView() {
    return ({ node, HTMLAttributes }) => {
      // Outer wrapper isolates the video from the editor's contenteditable="true"
      const wrapper = document.createElement('div');
      wrapper.setAttribute('contenteditable', 'false');
      wrapper.setAttribute('data-video-wrapper', '');
      wrapper.classList.add('richtext-video-wrapper');
      const video = document.createElement('video');
      const attrs = index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
      Object.entries(attrs).forEach(([key, value]) => {
        if (value === '' || value === true) {
          video.setAttribute(key, '');
        }
        else if (value != null && value !== false) {
          video.setAttribute(key, String(value));
        }
      });
      // Ensure controls and preload are set for proper thumbnail/interaction
      if (node.attrs.controls !== false) {
        video.setAttribute('controls', '');
      }
      video.setAttribute('preload', 'metadata');
      wrapper.appendChild(video);
      return {
        dom: wrapper,
        update: updatedNode => {
          if (updatedNode.type.name !== this.name)
            return false;
          video.setAttribute('src', updatedNode.attrs.src || '');
          if (updatedNode.attrs.width)
            video.setAttribute('width', String(updatedNode.attrs.width));
          if (updatedNode.attrs.height)
            video.setAttribute('height', String(updatedNode.attrs.height));
          return true;
        },
      };
    };
  },
  addCommands() {
    return {
      setVideo: options => ({ commands }) => commands.insertContent({
        type: this.name,
        attrs: options,
      }),
    };
  },
});

// src/image.ts
var inputRegex = /(?:^|\s)(!\[(.+|:?)]\((\S+)(?:(?:\s+)["'](\S+)["'])?\))$/;
var Image = index.Node3.create({
  name: "image",
  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
      resize: false
    };
  },
  inline() {
    return this.options.inline;
  },
  group() {
    return this.options.inline ? "inline" : "block";
  },
  draggable: true,
  addAttributes() {
    return {
      src: {
        default: null
      },
      alt: {
        default: null
      },
      title: {
        default: null
      },
      width: {
        default: null
      },
      height: {
        default: null
      }
    };
  },
  parseHTML() {
    return [
      {
        tag: this.options.allowBase64 ? "img[src]" : 'img[src]:not([src^="data:"])'
      }
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["img", index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },
  parseMarkdown: (token, helpers) => {
    return helpers.createNode("image", {
      src: token.href,
      title: token.title,
      alt: token.text
    });
  },
  renderMarkdown: (node) => {
    var _a, _b, _c, _d, _e, _f;
    const src = (_b = (_a = node.attrs) == null ? void 0 : _a.src) != null ? _b : "";
    const alt = (_d = (_c = node.attrs) == null ? void 0 : _c.alt) != null ? _d : "";
    const title = (_f = (_e = node.attrs) == null ? void 0 : _e.title) != null ? _f : "";
    return title ? `![${alt}](${src} "${title}")` : `![${alt}](${src})`;
  },
  addNodeView() {
    if (!this.options.resize || !this.options.resize.enabled || typeof document === "undefined") {
      return null;
    }
    const { directions, minWidth, minHeight, alwaysPreserveAspectRatio } = this.options.resize;
    return ({ node, getPos, HTMLAttributes, editor }) => {
      const el = document.createElement("img");
      el.draggable = false;
      const mergedAttributes = index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes);
      Object.entries(mergedAttributes).forEach(([key, value]) => {
        if (value != null) {
          switch (key) {
            case "width":
            case "height":
              break;
            default:
              el.setAttribute(key, value);
              break;
          }
        }
      });
      if (mergedAttributes.src !== null) {
        el.src = mergedAttributes.src;
      }
      const nodeView = new index.ResizableNodeView({
        element: el,
        editor,
        node,
        getPos,
        onResize: (width, height) => {
          el.style.width = `${width}px`;
          el.style.height = `${height}px`;
        },
        onCommit: (width, height) => {
          const pos = getPos();
          if (pos === void 0) {
            return;
          }
          this.editor.chain().setNodeSelection(pos).updateAttributes(this.name, {
            width,
            height
          }).run();
        },
        onUpdate: (updatedNode, _decorations, _innerDecorations) => {
          if (updatedNode.type !== node.type) {
            return false;
          }
          return true;
        },
        options: {
          directions,
          min: {
            width: minWidth,
            height: minHeight
          },
          preserveAspectRatio: alwaysPreserveAspectRatio === true
        }
      });
      const dom = nodeView.dom;
      dom.style.visibility = "hidden";
      dom.style.pointerEvents = "none";
      el.onload = () => {
        dom.style.visibility = "";
        dom.style.pointerEvents = "";
      };
      return nodeView;
    };
  },
  addCommands() {
    return {
      setImage: (options) => ({ commands }) => {
        return commands.insertContent({
          type: this.name,
          attrs: options
        });
      }
    };
  },
  addInputRules() {
    return [
      index.nodeInputRule({
        find: inputRegex,
        type: this.type,
        getAttributes: (match) => {
          const [, , alt, src, title] = match;
          return { src, alt, title };
        }
      })
    ];
  }
});

// src/index.ts
var index_default = Image;

/**
 * @file Custom Image extension for Tiptap preserving Quill attributes
 * @description Extends the base Tiptap Image to support width, height,
 *   and ql-float-* CSS classes from Quill-authored HTML.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const TiptapImage = index_default.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (element) => element.getAttribute('width'),
        renderHTML: (attributes) => {
          if (!attributes.width)
            return {};
          return { width: attributes.width };
        },
      },
      height: {
        default: null,
        parseHTML: (element) => element.getAttribute('height'),
        renderHTML: (attributes) => {
          if (!attributes.height)
            return {};
          return { height: attributes.height };
        },
      },
      float: {
        default: null,
        parseHTML: (element) => {
          const cls = element.className || '';
          const match = cls.match(/ql-float-(\S+)/);
          return match ? match[1] : null;
        },
        renderHTML: (attributes) => {
          if (!attributes.float)
            return {};
          return { class: `ql-float-${attributes.float}` };
        },
      },
      'data-align': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-align'),
        renderHTML: (attributes) => {
          if (!attributes['data-align'])
            return {};
          return { 'data-align': attributes['data-align'] };
        },
      },
    };
  },
});

/**
 * @file Custom Attachment Node extension for Tiptap
 * @description Renders <a class="ql-attachment"> elements with data attributes
 *   (data-size, data-type, data-last-modified, download, title).
 *   Preserves attachment links from Quill-authored HTML.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const TiptapAttachment = index.Node3.create({
  name: 'attachment',
  inline: true,
  group: 'inline',
  content: 'inline*',
  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },
  addAttributes() {
    return {
      href: {
        default: null,
        parseHTML: (element) => element.getAttribute('href'),
      },
      target: {
        default: '_blank',
        parseHTML: (element) => element.getAttribute('target') || '_blank',
      },
      download: {
        default: null,
        parseHTML: (element) => element.getAttribute('download'),
      },
      title: {
        default: null,
        parseHTML: (element) => element.getAttribute('title'),
      },
      rel: {
        default: 'noopener noreferrer nofollow',
        parseHTML: (element) => element.getAttribute('rel') || 'noopener noreferrer nofollow',
      },
      'data-size': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-size'),
        renderHTML: (attributes) => {
          if (!attributes['data-size'])
            return {};
          return { 'data-size': attributes['data-size'] };
        },
      },
      'data-type': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-type'),
        renderHTML: (attributes) => {
          if (!attributes['data-type'])
            return {};
          return { 'data-type': attributes['data-type'] };
        },
      },
      'data-last-modified': {
        default: null,
        parseHTML: (element) => element.getAttribute('data-last-modified'),
        renderHTML: (attributes) => {
          if (!attributes['data-last-modified'])
            return {};
          return { 'data-last-modified': attributes['data-last-modified'] };
        },
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: 'a.ql-attachment',
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'a',
      index.mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'ql-attachment',
        rel: 'noopener noreferrer nofollow',
      }),
      0,
    ];
  },
  addCommands() {
    return {
      setAttachment: options => ({ commands }) => commands.insertContent({
        type: this.name,
        attrs: {
          href: options.href,
          title: options.title || options.download,
          download: options.download,
          'data-size': options.dataSize,
          'data-type': options.dataType,
          'data-last-modified': options.dataLastModified,
        },
        content: [{ type: 'text', text: options.download || options.title || 'Attachment' }],
      }),
    };
  },
});

/**
 * @file Custom indent extension for Tiptap paragraph indentation
 * @description Adds indent/outdent support for paragraphs (non-list content).
 *   Quill supported paragraph indentation via indent classes. This extension
 *   adds an `indent` attribute to Paragraph nodes and renders it as margin-left.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const TiptapIndent = index.Extension.create({
  name: 'indent',
  addOptions() {
    return {
      types: ['paragraph', 'heading'],
      minLevel: 0,
      maxLevel: 8,
    };
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          indent: {
            default: 0,
            parseHTML: (element) => {
              // Parse Quill indent classes (ql-indent-1 through ql-indent-8)
              const cls = element.className || '';
              const match = cls.match(/ql-indent-(\d+)/);
              if (match) {
                return parseInt(match[1], 10);
              }
              // Parse inline margin-left style
              const marginLeft = element.style?.marginLeft;
              if (marginLeft) {
                const px = parseInt(marginLeft, 10);
                if (!isNaN(px) && px > 0) {
                  return Math.min(Math.round(px / 30), this.options.maxLevel);
                }
              }
              return 0;
            },
            renderHTML: (attributes) => {
              const indent = attributes.indent;
              if (!indent || indent <= 0)
                return {};
              return {
                style: `margin-left: ${indent * 30}px`,
              };
            },
          },
        },
      },
    ];
  },
  addCommands() {
    return {
      increaseIndent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        const { from, to } = selection;
        let changed = false;
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0;
            if (currentIndent < this.options.maxLevel) {
              if (dispatch) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: currentIndent + 1,
                });
              }
              changed = true;
            }
          }
        });
        return changed;
      },
      decreaseIndent: () => ({ tr, state, dispatch }) => {
        const { selection } = state;
        const { from, to } = selection;
        let changed = false;
        state.doc.nodesBetween(from, to, (node, pos) => {
          if (this.options.types.includes(node.type.name)) {
            const currentIndent = node.attrs.indent || 0;
            if (currentIndent > this.options.minLevel) {
              if (dispatch) {
                tr.setNodeMarkup(pos, undefined, {
                  ...node.attrs,
                  indent: currentIndent - 1,
                });
              }
              changed = true;
            }
          }
        });
        return changed;
      },
    };
  },
});

/**
 * @file Fixes for @tiptap/markdown integration bugs
 * @description
 *   Addresses issues in @tiptap/markdown where:
 *   1. Custom tokenizers (ordered list) prevent `marked.lexer()` from populating
 *      inline tokens on subsequent paragraph tokens, silently dropping content.
 *   2. Intentional blank lines (triple newlines) between blocks are collapsed to
 *      standard block separators.
 *   3. Serialized markdown output includes trailing newlines from structural
 *      empty paragraphs.
 *   @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
/**
 * Preserves intentional blank lines in markdown by inserting `&nbsp;` markers.
 * Replaces runs of 3+ consecutive newlines (i.e. one or more visible blank lines
 * between blocks) with exactly `\n\n&nbsp;\n\n`. This produces a single empty
 * paragraph node that the Paragraph extension already recognises as an intentional
 * blank line.
 *
 * The replacement is idempotent: re-parsing serialized output with blank lines
 * will stabilise after one round-trip.
 *
 * Only operates outside fenced code blocks to avoid corrupting code content.
 */
function preserveBlankLines(markdown) {
  // Split on fenced code-block boundaries, alternating between prose and code
  const parts = markdown.split(/(^```[^\n]*$[\s\S]*?^```[^\n]*$)/m);
  return parts
    .map((part, i) => {
    // Odd indices are code blocks — leave unchanged
    if (i % 2 === 1)
      return part;
    // Strip trailing whitespace from each line (outside code blocks).
    // In markdown, trailing `  ` means a hard <br>, but the Tiptap editor
    // uses hardBreak nodes instead, so leftover trailing spaces are artifacts.
    let cleaned = part.replace(/[ \t]+$/gm, '');
    // Prose sections: collapse 3+ newlines into a single blank-line marker
    cleaned = cleaned.replace(/\n{3,}/g, '\n\n&nbsp;\n\n');
    return cleaned;
  })
    .join('');
}
/**
 * Extension that patches the MarkdownManager after the Markdown extension
 * initializes it. Fixes:
 *
 * - **Bug 1 (P0):** When a custom `markdownTokenizer` (e.g. ordered list) is
 *   registered, the `registerTokenizer` wrapper unconditionally sets
 *   `tokens: []` on the returned token. This causes `marked.Lexer` to skip
 *   inline tokenization for subsequent paragraph tokens, producing empty
 *   `<p></p>` elements. The fix monkey-patches `MarkdownManager.parse()` to
 *   re-populate empty inline tokens before parsing.
 *
 * - **Bug 2 (P1):** Standard markdown collapses multiple blank lines into a
 *   single block separator. The fix pre-processes the markdown to insert `&nbsp;`
 *   markers between consecutive blank lines, which the Paragraph extension already
 *   recognises as intentional empty paragraphs.
 *
 * - **Bug 3 (P1):** `MarkdownManager.serialize()` emits trailing `\n\n` from
 *   structural empty paragraphs. The fix trims the serialized output.
 */
const TiptapMarkdownFix = index.Extension.create({
  name: 'markdownFix',
  // Run after the Markdown extension (priority 100 by default) sets up the
  // MarkdownManager, but before the editor creates the view.
  priority: 50,
  onBeforeCreate() {
    const storage = this.editor.storage.markdown;
    if (!storage?.manager)
      return;
    // Cast to `any` to access private MarkdownManager internals at runtime
    // (TS private modifiers are erased in compiled JS)
    const manager = storage.manager;
    // --- Fix Bugs 1 & 2: patch the parse pipeline ---
    const originalParse = manager.parse.bind(manager);
    manager.parse = (markdown) => {
      if (!manager.hasMarked())
        return originalParse(markdown);
      // Bug 2: preserve intentional blank lines before lexing
      const preprocessed = preserveBlankLines(markdown);
      // Run the lexer to get tokens (via the public `instance` getter)
      const tokens = manager.instance.lexer(preprocessed);
      // Bug 1: re-populate empty inline tokens for paragraph & heading tokens.
      // The custom ordered-list tokenizer's wrapper sets `tokens: []` on its
      // result, which causes `marked` to skip the inline-tokenization walk
      // for the NEXT paragraph token in the sequence.
      for (const token of tokens) {
        if ((token.type === 'paragraph' || token.type === 'heading') &&
          Array.isArray(token.tokens) &&
          token.tokens.length === 0 &&
          token.text) {
          // Re-tokenize the inline content from the text
          token.tokens = manager.lexer.inlineTokens(token.text);
        }
      }
      // Now parse the fixed tokens using the internal parseTokens method
      const content = manager.parseTokens(tokens, true);
      return { type: 'doc', content };
    };
    // --- Fix Bug 3: trim trailing newlines from serialized markdown ---
    const originalSerialize = manager.serialize.bind(manager);
    manager.serialize = (docOrContent) => {
      const result = originalSerialize(docOrContent);
      return typeof result === 'string' ? result.trim() : result;
    };
    // --- Fix Bug 4: escape inline markdown syntax in unmarked plain text ---
    //
    // `@tiptap/markdown` only HTML-encodes entities in `encodeTextForMarkdown`
    // and never escapes markdown control characters. That means any text node
    // typed into the editor that *happens* to contain valid CommonMark syntax
    // (e.g. `[label](url)`, `*emphasis*`, `` `code` ``) round-trips through
    // `serialize` → `parse` and is reborn as that formatted node in the read-
    // only view, even though the editor showed it as literal text. The
    // canonical example Pavlo flagged: type `[link](url)` in the editor →
    // editor leaves it as plain text (the InputRule didn't fire because
    // the closing `)` wasn't typed last, or the user pasted), but the view
    // re-parses the markdown and renders a real link.
    //
    // The standard `prosemirror-markdown` serializer escapes these characters
    // (``[`*\\~\[\]_]``) on every text node. Mirror that behaviour by patching
    // `encodeTextForMarkdown`. Code marks/blocks are still left untouched —
    // backslashes inside fenced/inline code would render literally per
    // CommonMark §6.1.
    const originalEncode = manager.encodeTextForMarkdown.bind(manager);
    // Match only the markdown control characters that, if left bare in
    // unmarked text, can be re-parsed as a different node/mark on a later
    // round-trip through `parse()`. This mirrors the canonical escape set
    // used by `prosemirror-markdown`'s `defaultMarkdownSerializer`. We do
    // NOT escape every punctuation character (e.g. `.`, `-`, `(`, `)`) —
    // those are only meaningful at the start of a line / inside link
    // syntax, never inline, and escaping them would clutter the output.
    const MARKDOWN_ESCAPE_RE = /[\\`*~[\]_]/g;
    manager.encodeTextForMarkdown = (text, node, parentNode) => {
      const encoded = originalEncode(text, node, parentNode);
      // Skip code contexts — the original method already returns the raw text
      // there and escaping inside ``` ``` ``` would render literal backslashes.
      const isInsideCode = (parentNode?.type != null && manager.codeTypes?.has?.(parentNode.type)) ||
        (node?.marks || []).some((m) => manager.codeTypes?.has?.(typeof m === 'string' ? m : m.type));
      if (isInsideCode)
        return encoded;
      return encoded.replace(MARKDOWN_ESCAPE_RE, '\\$&');
    };
  },
});

/**
 * @file Tiptap markdown shortcuts extension for wpp-richtext
 * @description InputRules-based auto-formatting for markdown shortcuts.
 *   Handles: # → Heading, > → Blockquote, ``` → Code block, - → Bullet list,
 *   1. → Ordered list, *text* → Italic, **text** → Bold, ~~text~~ → Strikethrough,
 *   `code` → Inline code.
 *
 *   StarterKit's bold/italic/strike input rules require a whitespace or
 *   start-of-line BEFORE the opening delimiter, so mid-word markdown such as
 *   `middle~~strike~~end` or `a**b**c` is never converted.
 *
 *   This extension adds extra mid-word patterns. Each pattern uses a negative
 *   lookbehind/lookahead AGAINST the marker character so the rules cannot
 *   accidentally match inside another marker pair — e.g. the italic rule will
 *   not fire when the engine encounters the inner `*b*` of `a**b**` because
 *   the lookbehind sees `*` and the lookahead also sees `*`.
 *
 *   Bold:    `(?<!\*)\*\*(?!\*) … (?<!\*)\*\*(?!\*)`
 *   Italic:  `(?<![\*_])\*(?!\*) … \*(?!\*)`
 *   Strike:  `(?<!~)~~(?!~) … (?<!~)~~(?!~)`
 *
 *   Order matters within this extension — bold is registered before italic so
 *   that, for inputs where both could match (none with the patterns above),
 *   bold would win.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
/**
 * Mid-word markdown delimiter patterns for bold/italic/strike. The regex shape
 * is `<lookbehind><open>(content)<close><lookahead>$` where lookbehind/ahead
 * exclude the marker character so adjacent markers (e.g. `**` vs `*`) don't
 * cross-trigger.
 */
const MID_WORD_INPUT_PATTERNS = [
  // Bold: **text** and __text__ — opening `**` must not be preceded by `*`.
  { mark: 'bold', regex: /(?<!\*)\*\*(?!\*)([^*]+)\*\*(?!\*)$/ },
  { mark: 'bold', regex: /(?<!_)__(?!_)([^_]+)__(?!_)$/ },
  // Italic: single `*`/`_`, must not be adjacent to another marker char.
  { mark: 'italic', regex: /(?<![*_])\*(?!\*)([^*]+?)\*(?!\*)$/ },
  { mark: 'italic', regex: /(?<![*_])_(?!_)([^_]+?)_(?!_)$/ },
  // Strikethrough: `~~text~~` — opening `~~` must not be preceded by `~`.
  { mark: 'strike', regex: /(?<!~)~~(?!~)([^~]+)~~(?!~)$/ },
];
const MID_WORD_PASTE_PATTERNS = [
  { mark: 'bold', regex: /(?<!\*)\*\*(?!\*)([^*]+)\*\*(?!\*)/g },
  { mark: 'bold', regex: /(?<!_)__(?!_)([^_]+)__(?!_)/g },
  { mark: 'italic', regex: /(?<![*_])\*(?!\*)([^*]+?)\*(?!\*)/g },
  { mark: 'italic', regex: /(?<![*_])_(?!_)([^_]+?)_(?!_)/g },
  { mark: 'strike', regex: /(?<!~)~~(?!~)([^~]+)~~(?!~)/g },
];
const TiptapMarkdownShortcuts = index.Extension.create({
  name: 'markdownShortcuts',
  addInputRules() {
    const rules = [];
    // Horizontal rule: --- or *** or ___ at start of line
    rules.push(new index.InputRule({
      find: /^([-*_]){3,}\s$/,
      handler: ({ state, range }) => {
        const { tr } = state;
        const hrNode = state.schema.nodes.horizontalRule;
        if (hrNode) {
          tr.delete(range.from, range.to);
          tr.replaceWith(range.from, range.from, hrNode.create());
        }
      },
    }));
    // Mid-word bold/italic/strike rules.
    for (const { mark, regex } of MID_WORD_INPUT_PATTERNS) {
      const type = this.editor.schema.marks[mark];
      if (type) {
        rules.push(index.markInputRule({ find: regex, type }));
      }
    }
    // Markdown inline link: `[text](url)` typed inline.
    //
    // CommonMark §6.3 defines an inline link as `[label](destination)`
    // with NO whitespace allowed between the closing `]` and opening `(`.
    // The production Quill build behaves the same way: typing
    // `[label] (url)` with a space leaves the literal markdown syntax in
    // place and only the bare URL is auto-linked. We follow CommonMark
    // strictly here to match production.
    //
    // The pattern requires the closing `)` to have just been typed (`$`
    // anchor), captures the link label and href, then:
    //   1. clears any link mark autolink may have applied to the URL
    //      within the matched range (Tiptap's `Link` extension's autolink
    //      can fire on `)` as a word boundary, wrapping the URL in a link
    //      mark before this rule runs);
    //   2. replaces the matched range with the label text carrying a
    //      fresh link mark pointing at the captured href;
    //   3. clears the stored link mark so subsequent typing isn't part of
    //      the new link.
    //
    // Capture groups exclude `]`, `(`, `)`, and (for href) whitespace so
    // a stray `[` earlier in the line cannot greedily consume the rest
    // of the paragraph.
    const linkMark = this.editor.schema.marks.link;
    if (linkMark) {
      rules.push(new index.InputRule({
        find: /\[([^\]]+)\]\(([^\s)]+)\)$/,
        handler: ({ state, range, match }) => {
          const [, label, href] = match;
          if (!label || !href)
            return;
          const { tr } = state;
          const mark = linkMark.create({ href });
          tr.removeMark(range.from, range.to, linkMark);
          tr.replaceWith(range.from, range.to, state.schema.text(label, [mark]));
          tr.removeStoredMark(linkMark);
        },
      }));
    }
    return rules;
  },
  addPasteRules() {
    const rules = [];
    for (const { mark, regex } of MID_WORD_PASTE_PATTERNS) {
      const type = this.editor.schema.marks[mark];
      if (type) {
        rules.push(index.markPasteRule({ find: regex, type }));
      }
    }
    return rules;
  },
});

/**
 * @file Markdown paste handler for wpp-richtext
 * @description Augments `@tiptap/markdown` so that pasted plain text
 *   containing markdown syntax is parsed and rendered as rich content rather
 *   than inserted verbatim. Tiptap's input rules in
 *   `tiptap-markdown-shortcuts.ts` only fire on keystrokes — never on paste —
 *   which is why a dedicated paste plugin is needed for markdown-aware pastes.
 *
 *   The plugin only intervenes when the clipboard payload is plain text
 *   (no `text/html`), so HTML pastes from web pages, Word, or another Tiptap
 *   editor continue to flow through Tiptap's built-in HTML paste pipeline.
 *
 *   Conversion is delegated to `editor.commands.insertContent(text,
 *   { contentType: 'markdown' })` — the Markdown extension overrides
 *   `insertContent` to route through its `MarkdownManager.parse()` and pass
 *   the resulting ProseMirror document into the standard insertion flow.
 *   That handles inline-vs-block placement correctly (e.g. an inline
 *   `[label](url)` stays inline inside the host paragraph instead of forcing
 *   a new block).
 *
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
/**
 * Cheap heuristic to decide whether a pasted plain-text blob contains
 * markdown worth parsing. Avoids running the full markdown lexer on every
 * paste (e.g. someone pasting "hello world" should stay a literal paragraph).
 *
 * Patterns intentionally cover everything Pavlo's QA flagged plus the
 * common GFM-flavoured bits we already document elsewhere in the editor.
 */
/**
 * Patterns that uniquely identify markdown structural syntax. When ANY of
 * these match the pasted plain text we always parse as markdown, even if
 * the clipboard also carries a `text/html` payload. This is necessary
 * because most operating systems auto-wrap URLs in `<a>` tags inside the
 * clipboard HTML payload, so pasting `[label](https://example.com)` arrives
 * as plain text + `<a href="https://example.com">https://example.com</a>` in
 * HTML. Without this override the markdown link syntax is lost.
 */
const STRONG_MARKDOWN_PATTERNS = [
  /^[ \t]{0,3}#{1,6}[ \t]+\S/m,
  /^\S[^\n]*\n[ \t]{0,3}(?:=+|-+)[ \t]*$/m,
  /^[ \t]{0,3}>[ \t]?/m,
  /^[ \t]{0,3}(?:[-*+]|\d+[.)])[ \t]+\S/m,
  // Fenced code block — REQUIRE both opening AND closing fence on separate
  // lines. The previous pattern matched any opening fence, so pasting an
  // incomplete snippet like "``` code" (no closing line) was routed to the
  // markdown parser, which produced an empty/malformed code block and the
  // text never rendered. Demoting unbalanced fences to non-markdown lets
  // the default Tiptap paste insert them verbatim as plain text instead.
  /(?:^|\n)[ \t]{0,3}```[^\n]*\n[\s\S]*?\n[ \t]{0,3}```[ \t]*(?:\n|$)/,
  /(?:^|\n)[ \t]{0,3}~~~[^\n]*\n[\s\S]*?\n[ \t]{0,3}~~~[ \t]*(?:\n|$)/,
  /!?\[[^\]\n]+\]\([^)\n]+\)/,
  /^[ \t]{0,3}(?:\*\*\*|---|___)[ \t]*$/m, // Horizontal rule
];
/**
 * Patterns that hint at markdown but are too weak to override an HTML
 * clipboard payload (a real rich-text source could legitimately produce
 * the same characters as plain text).
 */
const WEAK_MARKDOWN_PATTERNS = [
  /`[^`\n]+`/,
  /(\*\*|__)[^\s*_][^*_\n]*\1/,
  /~~[^~\n]+~~/, // Strikethrough
];
const hasStrongMarkdown = (text) => !!text && STRONG_MARKDOWN_PATTERNS.some(re => re.test(text));
const looksLikeMarkdown = (text) => {
  if (!text)
    return false;
  return hasStrongMarkdown(text) || WEAK_MARKDOWN_PATTERNS.some(re => re.test(text));
};
/**
 * Tag names that indicate the clipboard HTML carries real rich-text
 * formatting (came from another editor / a webpage / Word / etc.) and
 * should be respected over the plain-text markdown path. Wrapper-only HTML
 * such as `<meta><div><span>...</span></div>` (the typical clipboard
 * payload from VS Code, Notepad, code blocks on GitHub, etc.) is treated
 * as plain text.
 */
const RICH_HTML_TAGS = new Set([
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'blockquote',
  'ul',
  'ol',
  'li',
  'pre',
  'code',
  'strong',
  'em',
  'b',
  'i',
  'u',
  's',
  'strike',
  'del',
  'a',
  'img',
  'video',
  'iframe',
  'table',
  'tr',
  'td',
  'th',
  'hr',
]);
const htmlHasRichFormatting = (html) => {
  if (!html)
    return false;
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return Array.from(doc.body.querySelectorAll('*')).some(el => RICH_HTML_TAGS.has(el.tagName.toLowerCase()));
  }
  catch {
    // If anything goes wrong with parsing, fall back to a conservative
    // regex check against the raw markup.
    return /<\s*(?:h[1-6]|blockquote|ul|ol|li|pre|code|strong|em|b|i|u|s|del|a|img|table|hr)\b/i.test(html);
  }
};
const markdownPastePluginKey = new index.PluginKey('wppRichtextMarkdownPaste');
/**
 * Type-erased helper that injects the Markdown-extension-only `contentType`
 * option into the `insertContent` chain command. The base `@tiptap/core`
 * type for `insertContent` does not list `contentType`, but the Markdown
 * extension augments the interface at runtime; we cast at the call site
 * rather than redeclaring the module here.
 */
const insertMarkdown = (chain, markdown) => {
  return chain.insertContent(markdown, { contentType: 'markdown' });
};
const TiptapMarkdownPaste = index.Extension.create({
  name: 'wppRichtextMarkdownPaste',
  addProseMirrorPlugins() {
    const editor = this.editor;
    return [
      new index.Plugin({
        key: markdownPastePluginKey,
        props: {
          handlePaste(_view, event) {
            const clipboard = event.clipboardData;
            if (!clipboard)
              return false;
            const text = clipboard.getData('text/plain');
            if (!looksLikeMarkdown(text))
              return false;
            // Strong markdown structural syntax (headings, lists, blockquotes,
            // fenced code, link/image, hr) wins unconditionally — the OS
            // commonly auto-wraps URLs inside the clipboard's text/html as
            // <a href=...> tags, so deferring to HTML there would strip the
            // markdown link syntax. For weaker indicators (bold/italic/code
            // span/strike) we still defer when the HTML carries genuine rich
            // formatting, since the text could legitimately be plain prose
            // copied from a rich source.
            if (!hasStrongMarkdown(text)) {
              const html = clipboard.getData('text/html');
              if (htmlHasRichFormatting(html))
                return false;
            }
            // Sanity-check the Markdown extension is wired up before claiming
            // the paste — without it, falling through to Tiptap's default
            // text paste is the better outcome.
            const markdownStorage = editor.storage.markdown;
            if (!markdownStorage?.manager)
              return false;
            event.preventDefault();
            insertMarkdown(editor.chain().focus(), text).run();
            return true;
          },
        },
      }),
    ];
  },
});

/**
 * @file Shift+Enter behavior inside list items
 * @description By default Tiptap inserts a `hardBreak` on Shift+Enter, which
 *   inside an `<ol>`/`<ul>` produces a continuation line that is *not* numbered.
 *   Quill's behavior — which our richtext component aims to preserve — splits
 *   the list item so each new line is rendered as the next numbered/bulleted
 *   entry. This extension restores that behavior only when the selection is
 *   inside a list item; outside of lists, Shift+Enter still inserts a hardBreak.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 */
const ListShiftEnter = index.Extension.create({
  name: 'listShiftEnter',
  addKeyboardShortcuts() {
    return {
      'Shift-Enter': () => {
        const { editor } = this;
        const listItemType = editor.schema.nodes.listItem;
        if (!listItemType) {
          return false;
        }
        const { $from } = editor.state.selection;
        let inListItem = false;
        for (let depth = $from.depth; depth > 0; depth -= 1) {
          if ($from.node(depth).type === listItemType) {
            inListItem = true;
            break;
          }
        }
        if (!inListItem) {
          return false;
        }
        return editor.commands.splitListItem('listItem');
      },
    };
  },
});

/**
 * @file Tiptap v3 editor configuration for wpp-richtext
 * @description Configures all Tiptap extensions and provides the
 *   `buildTiptapExtensions()` factory function.
 * @see https://jira.uhub.biz/browse/WPPOPENDS-1287
 * @see https://tiptap.dev/docs/editor/getting-started/configuration
 */
/**
 * Default formats supported by the Tiptap editor, mapped from the Quill defaults.
 * Each format name maps to a Tiptap extension.
 */
const TIPTAP_DEFAULT_FORMATS = [
  'bold',
  'italic',
  'underline',
  'strike',
  'code',
  'link',
  'blockquote',
  'heading',
  'codeBlock',
  'hardBreak',
  'horizontalRule',
  'bulletList',
  'orderedList',
  'listItem',
  'listKeymap',
  'indent',
  'taskList',
  'taskItem',
  'textAlign',
  'image',
  'color',
  'textStyle',
  'table',
  'tableRow',
  'tableCell',
  'tableHeader',
  'typography',
  'placeholder',
  'characterCount',
  'fontSize',
  'video',
  'attachment',
];
/**
 * Mapping from legacy format names to Tiptap extension names.
 * Used to translate the consumer's `formats` prop.
 *
 * Only formats that have a corresponding Tiptap extension actually wired up
 * in `buildTiptapExtensions()` below are included. Unsupported legacy formats that
 * have no Tiptap equivalent here (e.g. `background`, `formula`, `script`)
 * are intentionally omitted so the whitelist translation never silently
 * promises support that the editor cannot deliver. If consumers pass an
 * unknown format name it falls through unchanged via `translateLegacyFormat`,
 * matching the previous "ignore unknowns" behaviour.
 */
const LEGACY_FORMAT_TO_TIPTAP_FORMAT_MAP = {
  bold: 'bold',
  italic: 'italic',
  underline: 'underline',
  strike: 'strike',
  code: 'code',
  link: 'link',
  blockquote: 'blockquote',
  header: 'heading',
  'code-block': 'codeBlock',
  list: 'bulletList',
  indent: 'listItem',
  align: 'textAlign',
  direction: 'textAlign',
  image: 'image',
  color: 'color',
  font: 'textStyle',
  size: 'textStyle',
  video: 'video',
  attachment: 'attachment',
};
const FORMAT_DEPENDENCIES = {
  bulletList: ['listItem', 'listKeymap'],
  orderedList: ['listItem', 'listKeymap'],
  list: ['bulletList', 'orderedList', 'listItem', 'listKeymap'],
  taskList: ['taskItem'],
  table: ['tableRow', 'tableCell', 'tableHeader'],
  color: ['textStyle'],
  fontSize: ['textStyle'],
  size: ['fontSize', 'textStyle'],
  indent: ['listItem', 'listKeymap'],
};
function resolveAllowedFormats(formats) {
  const resolvedFormats = new Set();
  const sourceFormats = formats.length > 0 ? formats : [...TIPTAP_DEFAULT_FORMATS];
  for (const format of sourceFormats) {
    const translatedFormat = LEGACY_FORMAT_TO_TIPTAP_FORMAT_MAP[format] || format;
    resolvedFormats.add(format);
    resolvedFormats.add(translatedFormat);
    FORMAT_DEPENDENCIES[format]?.forEach(dependency => resolvedFormats.add(dependency));
    FORMAT_DEPENDENCIES[translatedFormat]?.forEach(dependency => resolvedFormats.add(dependency));
  }
  return resolvedFormats;
}
function starterKitFormatOptions(allowedFormats) {
  return {
    blockquote: allowedFormats.has('blockquote') ? {} : false,
    bold: allowedFormats.has('bold') ? {} : false,
    bulletList: allowedFormats.has('bulletList') ? {} : false,
    code: allowedFormats.has('code') ? {} : false,
    codeBlock: allowedFormats.has('codeBlock') ? {} : false,
    hardBreak: allowedFormats.has('hardBreak') ? {} : false,
    heading: allowedFormats.has('heading') ? { levels: [1, 2, 3] } : false,
    horizontalRule: allowedFormats.has('horizontalRule') ? {} : false,
    italic: allowedFormats.has('italic') ? {} : false,
    listItem: allowedFormats.has('listItem') ? {} : false,
    listKeymap: allowedFormats.has('listKeymap') ? {} : false,
    link: false,
    orderedList: allowedFormats.has('orderedList') ? {} : false,
    strike: allowedFormats.has('strike') ? {} : false,
    underline: false,
  };
}
/** Toolbar alias definitions for legacy consumer aliases. */
const TIPTAP_DEFAULT_TOOLBAR_ALIASES = {
  size: ['fontSize'],
  fontStyle: ['bold', 'italic', 'underline', 'strike'],
  textBlocks: ['codeBlock', 'blockquote'],
  lists: ['orderedList', 'bulletList', 'outdent', 'indent'],
  align: ['alignLeft', 'alignCenter', 'alignRight', 'alignJustify'],
  embed: ['link'],
  undo: ['undo', 'redo'],
};
/**
 * Builds the array of Tiptap extensions based on component props.
 * Maps the existing format whitelist to Tiptap extensions.
 *
 * @param config - Component prop values to configure extensions
 * @returns Configured Tiptap extensions array
 */
function buildTiptapExtensions(config) {
  const { formats = [], placeholder, charactersLimit } = config;
  // Translate legacy format names to Tiptap equivalents.
  const allowedFormats = resolveAllowedFormats(formats);
  const extensions = [];
  // StarterKit v3 bundles several user-facing formats. Keep the structural
  // editor essentials enabled, but gate bundled marks/nodes via `formats`.
  // Link and Underline stay disabled here and are added explicitly below.
  extensions.push(index_default$b.configure(starterKitFormatOptions(allowedFormats)));
  // Underline (not in StarterKit)
  if (allowedFormats.has('underline')) {
    // Override the default markdown serialization (`++text++`) to emit
    // raw HTML (`<u>text</u>`) so consumers downstream of `getMarkdown()`
    // get a portable, widely-supported representation. Round-trip back into
    // the editor still works because Underline.parseHTML() recognises `<u>`.
    extensions.push(index_default$c.extend({
      renderMarkdown(_node, helpers) {
        return `<u>${helpers.renderChildren(_node)}</u>`;
      },
    }));
  }
  // Text alignment
  if (allowedFormats.has('textAlign')) {
    extensions.push(index_default$a.configure({
      types: ['heading', 'paragraph'],
      alignments: ['left', 'center', 'right', 'justify'],
    }));
  }
  // Links
  if (allowedFormats.has('link')) {
    extensions.push(index_default$d.configure({
      openOnClick: false,
      autolink: true,
      HTMLAttributes: {
        rel: 'noopener noreferrer nofollow',
        target: '_blank',
      },
    }));
  }
  // Images (extended for width, height, ql-float-* classes)
  if (allowedFormats.has('image')) {
    extensions.push(TiptapImage.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: 'richtext-image',
      },
    }));
  }
  // Video
  if (allowedFormats.has('video')) {
    extensions.push(TiptapVideo);
  }
  // Attachment
  if (allowedFormats.has('attachment')) {
    extensions.push(TiptapAttachment);
  }
  // Text styling (color, font size)
  if (allowedFormats.has('textStyle') || allowedFormats.has('color') || allowedFormats.has('fontSize')) {
    extensions.push(TextStyle);
  }
  if (allowedFormats.has('color')) {
    extensions.push(index_default$7);
  }
  // Tables
  if (allowedFormats.has('table')) {
    extensions.push(Table.configure({ resizable: true }), index_default$6, index_default$5, index_default$4);
  }
  // Task lists (GitHub-flavored markdown checkboxes)
  if (allowedFormats.has('taskList')) {
    extensions.push(index_default$2, index_default$1.configure({
      nested: true,
    }));
  }
  // Typography (smart quotes, dashes, ellipsis)
  if (allowedFormats.has('typography')) {
    extensions.push(index_default$3);
  }
  // Markdown support — native parse/serialize via @tiptap/markdown
  // Replaces the custom processMarkdownValue()/Turndown pipeline
  extensions.push(Markdown);
  // Fixes for @tiptap/markdown integration bugs (must come after Markdown)
  extensions.push(TiptapMarkdownFix);
  // Paragraph/heading indentation
  if (allowedFormats.has('indent')) {
    extensions.push(TiptapIndent);
  }
  // Mid-word markdown shortcuts (bold/italic/strike) + horizontal rule input rule
  extensions.push(TiptapMarkdownShortcuts);
  // Pasted plain-text markdown (`# heading`, `> quote`, fenced code, links,
  // list items) is parsed by the MarkdownManager and converted to rich
  // content, matching the markdown paste behavior from the legacy editor.
  extensions.push(TiptapMarkdownPaste);
  // Shift+Enter inside lists splits into a new numbered/bulleted item (Quill parity)
  if (allowedFormats.has('bulletList') || allowedFormats.has('orderedList')) {
    extensions.push(ListShiftEnter);
  }
  // Font size (ql-size-* CSS classes)
  if (allowedFormats.has('fontSize') || allowedFormats.has('textStyle')) {
    extensions.push(TiptapFontSize);
  }
  // Placeholder
  if (placeholder) {
    extensions.push(index_default$9.configure({
      placeholder,
    }));
  }
  // Character count
  if (charactersLimit) {
    extensions.push(index_default$8.configure({
      limit: null, // We handle limit display ourselves, don't hard-limit input
    }));
  }
  return extensions;
}

exports.TIPTAP_DEFAULT_TOOLBAR_ALIASES = TIPTAP_DEFAULT_TOOLBAR_ALIASES;
exports.buildTiptapExtensions = buildTiptapExtensions;
exports.extractPlainText = extractPlainText;
exports.normalizeEmptyParagraphs = normalizeEmptyParagraphs;
exports.normalizeListHtml = normalizeListHtml;
