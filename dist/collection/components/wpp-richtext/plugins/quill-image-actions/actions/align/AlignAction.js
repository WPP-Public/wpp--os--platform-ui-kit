import Action from '../Action';
import DefaultAligner from './DefaultAligner';
import DefaultToolbar from './DefaultToolbar';
class AlignAction extends Action {
  constructor(formatter) {
    super(formatter);
    this.aligner = new DefaultAligner(formatter.quill, formatter.options.align);
    this.toolbar = new DefaultToolbar();
  }
  onCreate() {
    const toolbar = this.toolbar.create(this.formatter, this.aligner);
    this.formatter.overlay.appendChild(toolbar);
  }
  onDestroy() {
    const toolbar = this.toolbar.getElement();
    if (!toolbar) {
      return;
    }
    this.formatter.overlay.removeChild(toolbar);
    this.toolbar.destroy();
  }
}
AlignAction.formats = ['float'];
export default AlignAction;
