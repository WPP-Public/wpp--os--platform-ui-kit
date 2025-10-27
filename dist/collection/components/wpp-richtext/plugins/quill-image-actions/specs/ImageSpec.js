import BlotSpec from './BlotSpec';
export default class ImageSpec extends BlotSpec {
  constructor(formatter) {
    super(formatter);
    this.onClick = (event) => {
      const el = event.target;
      const enabled = this.formatter.quill.root.getAttribute('contentEditable') === 'true';
      if (enabled && el instanceof HTMLElement && el.tagName === 'IMG') {
        this.el = el;
        this.formatter.show(this);
      }
    };
    this.el = null;
  }
  init() {
    this.formatter.quill.root.addEventListener('click', this.onClick.bind(this));
  }
  getTargetElement() {
    return this.el;
  }
  onHide() {
    this.el = null;
  }
}
