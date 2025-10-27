import AlignAction from '../actions/align/AlignAction';
import ResizeAction from '../actions/ResizeAction';
import Quill from 'quill';
export default class BlotSpec {
  constructor(formatter) {
    this.formatter = formatter;
  }
  init() { }
  getActions() {
    return [AlignAction, ResizeAction];
  }
  getTargetElement() {
    return null;
  }
  getOverlayElement() {
    return this.getTargetElement();
  }
  setSelection() {
    const blot = Quill.find(this.getTargetElement());
    if (blot) {
      const index = this.formatter.quill.getIndex(blot);
      this.formatter.quill.setSelection(index + blot.length(), 0);
    }
  }
  onHide() { }
}
