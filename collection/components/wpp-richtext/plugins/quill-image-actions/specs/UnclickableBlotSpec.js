import BlotSpec from './BlotSpec';
import { ONE_PIXEL_TRANSPARENT_GIF } from '../../../../../utils/const';
const MOUSE_ENTER_ATTRIBUTE = 'data-image-actions-unclickable-bound';
const PROXY_IMAGE_CLASS = 'image-actions__proxy-image';
export default class UnclickableBlotSpec extends BlotSpec {
  constructor(formatter, selector) {
    super(formatter);
    this.onTextChange = () => {
      const arr = Array.from(document.querySelectorAll(`${this.selector}`));
      arr
        .filter(unclickable => !unclickable[MOUSE_ENTER_ATTRIBUTE])
        .forEach(unclickable => {
        unclickable[MOUSE_ENTER_ATTRIBUTE] = true;
        unclickable.addEventListener('mouseenter', this.onMouseEnter);
      });
    };
    this.onMouseEnter = (event) => {
      const unclickable = event.target;
      const enabled = this.formatter.quill.root.getAttribute('contentEditable') === 'true';
      if (enabled && unclickable instanceof HTMLElement) {
        this.nextUnclickable = unclickable;
        this.proxyImage.eventTarget = unclickable;
        this.repositionProxyImage();
      }
    };
    this.onProxyImageClick = (e) => {
      const enabled = this.formatter.quill.root.getAttribute('contentEditable') === 'true';
      e.stopPropagation();
      e.preventDefault();
      if (enabled) {
        this.unclickable = this.nextUnclickable;
        this.nextUnclickable = null;
        this.formatter.show(this);
        this.hideProxyImage();
      }
    };
    this.selector = selector;
    this.unclickable = null;
    this.nextUnclickable = null;
    this.proxyImage = this.createProxyImage();
  }
  init() {
    const quill = this.formatter.quill;
    this.formatter.quill.root.parentNode.append(this.proxyImage);
    this.hideProxyImage();
    quill.on('text-change', this.onTextChange);
    quill.root.addEventListener('scroll', () => this.repositionProxyImage());
    this.proxyImage.addEventListener('click', this.onProxyImageClick);
    this.proxyImage.addEventListener('wheel', e => quill.root.scrollBy(e.deltaX, e.deltaY));
  }
  getTargetElement() {
    return this.unclickable;
  }
  getOverlayElement() {
    return this.unclickable;
  }
  onHide() {
    this.hideProxyImage();
    this.nextUnclickable = null;
    this.unclickable = null;
  }
  createProxyImage() {
    const proxyImage = document.createElement('img');
    proxyImage.src = ONE_PIXEL_TRANSPARENT_GIF;
    proxyImage.classList.add(PROXY_IMAGE_CLASS);
    return proxyImage;
  }
  hideProxyImage() {
    Object.assign(this.proxyImage.style, {
      display: 'none',
    });
    this.proxyImage.eventTarget = null;
  }
  repositionProxyImage() {
    if (this.nextUnclickable) {
      const specRect = this.nextUnclickable.getBoundingClientRect();
      const parent = this.formatter.quill.root;
      const parentRect = parent.getBoundingClientRect();
      if (this.proxyImage) {
        Object.assign(this.proxyImage.style, {
          display: 'block',
          left: `${specRect.left - parentRect.left}px`,
          top: `${specRect.top - parentRect.top}px`,
          width: `${specRect.width}px`,
          height: `${specRect.height}px`,
        });
      }
    }
  }
}
