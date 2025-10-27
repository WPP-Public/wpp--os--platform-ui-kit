const LEFT_ALIGN = 'left';
const CENTER_ALIGN = 'center';
const RIGHT_ALIGN = 'right';
export default class DefaultAligner {
  constructor(quill, options) {
    this.quill = quill;
    this.applyStyle = options.aligner.applyStyle;
    this.alignAttribute = options.attribute;
    this.alignments = {
      [LEFT_ALIGN]: {
        name: LEFT_ALIGN,
        icon: options.icons.left,
        apply: (el) => {
          const ctx = this.getContext(el);
          if (!ctx)
            return;
          this.quill.formatLine(ctx.index, 1, 'align', false, 'user');
          this.quill.formatText(ctx.index, 1, 'float', 'left', 'user');
          if (ctx.precedesNewline) {
            this.quill.deleteText(ctx.index + 1, 1, 'user');
          }
        },
      },
      [RIGHT_ALIGN]: {
        name: RIGHT_ALIGN,
        icon: options.icons.right,
        apply: (el) => {
          const ctx = this.getContext(el);
          if (!ctx)
            return;
          this.quill.formatLine(ctx.index, 1, 'align', false, 'user');
          this.quill.formatText(ctx.index, 1, 'float', 'right', 'user');
          if (ctx.precedesNewline) {
            this.quill.deleteText(ctx.index + 1, 1, 'user');
          }
        },
      },
    };
  }
  getContext(el) {
    const blot = this.quill.constructor.find(el);
    if (!blot)
      return null;
    const index = this.quill.getIndex(blot);
    if (typeof index !== 'number')
      return null;
    const next = this.quill.getContents(index + 1, 1);
    return {
      blot,
      index,
      precedesNewline: next && next.ops && typeof next.ops[0]?.insert === 'string' && next.ops[0].insert.startsWith('\n'),
    };
  }
  getAlignments() {
    return Object.keys(this.alignments).map(k => this.alignments[k]);
  }
  clear(el) {
    const ctx = this.getContext(el);
    if (!ctx)
      return;
    this.quill.formatLine(ctx.index, 1, 'align', false, 'user');
    this.quill.formatText(ctx.index, 1, 'float', false, 'user');
    if (ctx.precedesNewline)
      this.quill.deleteText(ctx.index + 1, 1, 'user');
  }
  isAligned(el, alignment) {
    const ctx = this.getContext(el);
    if (!ctx)
      return false;
    const contents = this.quill.getContents(ctx.index);
    if (!contents.ops)
      return false;
    const [{ attributes }] = contents.ops;
    switch (alignment.name) {
      case LEFT_ALIGN:
      case RIGHT_ALIGN:
        return attributes?.float === alignment.name;
      case CENTER_ALIGN:
        return attributes?.align === 'center';
      default:
        return false;
    }
  }
}
