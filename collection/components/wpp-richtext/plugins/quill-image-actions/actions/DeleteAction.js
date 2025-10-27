import Action from './Action';
export default class DeleteAction extends Action {
  constructor() {
    super(...arguments);
    this.onKeyUp = (e) => {
      if (!this.formatter.currentSpec) {
        return;
      }
      // delete or backspace
      if (e.keyCode === 46 || e.keyCode === 8) {
        const node = this.formatter.currentSpec.getTargetElement();
        if (node) {
          const blot = this.formatter.quill.constructor.find(node);
          if (blot) {
            blot.deleteAt(0);
          }
        }
        this.formatter.hide();
      }
    };
  }
  onCreate() {
    document.addEventListener('keyup', this.onKeyUp, true);
    // @ts-expect-error 2769 imprecise Quill typing
    this.formatter.quill.root.addEventListener('input', this.onKeyUp, true);
  }
  onDestroy() {
    document.removeEventListener('keyup', this.onKeyUp);
    // @ts-expect-error 2769 imprecise Quill typing
    this.formatter.quill.root.removeEventListener('input', this.onKeyUp);
  }
}
