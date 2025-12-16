export default class DefaultToolbar {
  constructor() {
    this.toolbar = null;
    this.buttons = [];
  }
  create(formatter, aligner) {
    const toolbar = document.createElement('div');
    toolbar.classList.add(formatter.options.align.toolbar.mainClassName);
    this.addToolbarStyle(formatter, toolbar);
    this.addButtons(formatter, toolbar, aligner);
    this.toolbar = toolbar;
    return this.toolbar;
  }
  destroy() {
    this.toolbar = null;
    this.buttons = [];
  }
  getElement() {
    return this.toolbar;
  }
  addToolbarStyle(formatter, toolbar) {
    if (formatter.options.align.toolbar.mainStyle) {
      Object.assign(toolbar.style, formatter.options.align.toolbar.mainStyle);
    }
  }
  addButtonStyle(button, index, formatter) {
    if (formatter.options.align.toolbar.buttonStyle) {
      Object.assign(button.style, formatter.options.align.toolbar.buttonStyle);
      if (index > 0) {
        button.style.borderLeftWidth = '0';
      }
    }
    if (formatter.options.align.toolbar.svgStyle) {
      Object.assign(button.children[0].style, formatter.options.align.toolbar.svgStyle);
    }
  }
  addButtons(formatter, toolbar, aligner) {
    aligner.getAlignments().forEach((alignment, i) => {
      const button = document.createElement('span');
      button.classList.add(formatter.options.align.toolbar.buttonClassName);
      button.innerHTML = alignment.icon;
      button.addEventListener('click', () => {
        this.onButtonClick(button, formatter, alignment, aligner);
      });
      this.preselectButton(button, alignment, formatter, aligner);
      this.addButtonStyle(button, i, formatter);
      this.buttons.push(button);
      toolbar.appendChild(button);
    });
  }
  preselectButton(button, alignment, formatter, aligner) {
    if (!formatter.currentSpec) {
      return;
    }
    const target = formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }
    if (aligner.isAligned(target, alignment)) {
      this.selectButton(formatter, button);
    }
  }
  onButtonClick(button, formatter, alignment, aligner) {
    if (!formatter.currentSpec) {
      return;
    }
    const target = formatter.currentSpec.getTargetElement();
    if (!target) {
      return;
    }
    this.clickButton(button, target, formatter, alignment, aligner);
  }
  clickButton(button, alignTarget, formatter, alignment, aligner) {
    this.buttons.forEach(b => {
      this.deselectButton(formatter, b);
    });
    if (aligner.isAligned(alignTarget, alignment)) {
      if (formatter.options.align.toolbar.allowDeselect) {
        aligner.clear(alignTarget);
      }
      else {
        this.selectButton(formatter, button);
      }
    }
    else {
      this.selectButton(formatter, button);
      alignment.apply(alignTarget);
    }
    formatter.update();
  }
  selectButton(formatter, button) {
    button.classList.add('is-selected');
    if (formatter.options.align.toolbar.addButtonSelectStyle) {
      button.style.setProperty('filter', 'invert(20%)');
    }
  }
  deselectButton(formatter, button) {
    button.classList.remove('is-selected');
    if (formatter.options.align.toolbar.addButtonSelectStyle) {
      button.style.removeProperty('filter');
    }
  }
}
