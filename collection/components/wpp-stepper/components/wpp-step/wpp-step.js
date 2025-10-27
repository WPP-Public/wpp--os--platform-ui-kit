import { Host, h } from '@stencil/core';
import { WrappedSlot } from '../../../common/WrappedSlot/WrappedSlot';
/**
 * @slot label - Text content displayed within the cell.
 * @slot description - Text displayed as the description of the step, right below the title.
 * @slot - Can be used to display substeps for a specific step. The default slot, without the name attribute.
 *
 * @part wrapper - component wrapper element
 * @part step - step content wrapper element
 * @part step-bg - step bg element
 * @part step-label - step label text element
 * @part step-index - step index text element
 * @part last-step - last step wrapper element
 * @part last-step-text - last step text element
 * @part optional - optional text element
 * @part icon - step icon (warning, error)
 */
export class WppStep {
  constructor() {
    this.applyTruncationIfNeeded = () => {
      setTimeout(() => {
        // Label
        const labelEl = this.host.querySelector('[slot="label"]');
        if (labelEl && labelEl.scrollWidth > labelEl.clientWidth) {
          this.labelTooltipText = labelEl.textContent;
        }
        else {
          this.labelTooltipText = null;
        }
        // Description
        if (this.hasDescription && this.orientation === 'vertical') {
          const descriptionEl = this.host.querySelector('[slot="description"]');
          if (!descriptionEl)
            return;
          if (descriptionEl.clientWidth < descriptionEl.scrollWidth) {
            this.tooltipText = descriptionEl.textContent;
          }
          else {
            this.tooltipText = null;
          }
        }
      });
    };
    this.isSubStep = () => {
      if (this.orientation === 'horizontal') {
        return false;
      }
      return this.substep;
    };
    this.renderStep = () => {
      if (!this.isSubStep() && this.completed) {
        return h("wpp-icon-tick-v3-3-0", { color: "var(--wpp-grey-color-000)" });
      }
      if (this.isSubStep()) {
        return null;
      }
      return this.step;
    };
    this.handleSlotChange = () => {
      this.wppStepUpdate.emit();
      this.applyTruncationIfNeeded();
    };
    this.stepWrapperCssClasses = () => ({
      'step-wrapper': true,
      'substep-wrapper': this.isSubStep(),
      active: this.displayedStep,
      completed: this.completed || this.active,
      'step-has-description': this.hasDescription,
    });
    this.stepTextWrapperCssClasses = () => ({
      'text-wrapper': true,
      'inactive-text': !this.active && !this.completed,
      'with-icon': this.error || this.warning,
    });
    this.stepCssClasses = () => ({
      step: true,
      completed: this.completed || this.active,
      [`${this.orientation}`]: true,
    });
    this.stepIndexCssClasses = () => ({
      'step-index': true,
      active: this.active,
      completed: this.completed,
      substep: this.isSubStep(),
      error: this.error && this.orientation !== 'vertical',
      warning: this.warning && this.orientation !== 'vertical',
    });
    this.stepConnectorCssClasses = () => ({
      connector: true,
      'connector-substep': this.isSubStep(),
      [`connector-${this.orientation}`]: true,
    });
    this.connectorLineCssClasses = () => ({
      'connector-line': true,
      'completed-line': this.completed || this.completedLine,
    });
    this.stepBgCssClasses = () => ({
      'step-bg': true,
      active: this.displayedStep,
    });
    this.hostCssClasses = () => ({
      'wpp-step': true,
      'wpp-expanded': this.expanded,
      [`wpp-${this.orientation}`]: true,
    });
    this.handleStepClick = (event) => {
      event.stopPropagation();
      event.preventDefault();
      this.wppStepChange.emit({ index: this.index });
    };
    this.renderStepTypeData = () => {
      let icon;
      if (this.error)
        icon = h("wpp-icon-error-v3-3-0", null);
      if (this.warning)
        icon = h("wpp-icon-warning-v3-3-0", null);
      if (!icon)
        return null;
      if (this.iconDescription) {
        return (h("wpp-tooltip-v3-3-0", { config: { placement: 'bottom' }, text: this.iconDescription }, icon));
      }
      return (h("div", { class: "icon", part: "icon" }, icon));
    };
    this.tooltipText = null;
    this.labelTooltipText = null;
    this.active = false;
    this.completed = false;
    this.completedLine = false;
    this.substep = false;
    this.lastSubstepStepIndex = undefined;
    this.step = undefined;
    this.index = undefined;
    this.width = undefined;
    this.error = false;
    this.warning = false;
    this.lastStep = false;
    this.optional = false;
    this.orientation = 'vertical';
    this.expanded = false;
    this.displayedStep = false;
    this.hasDescription = false;
    this.iconDescription = undefined;
    this.locales = {
      optional: 'Optional',
    };
  }
  componentDidLoad() {
    this.applyTruncationIfNeeded();
    if (this.orientation === 'vertical') {
      window.addEventListener('resize', this.applyTruncationIfNeeded);
    }
  }
  disconnectedCallback() {
    if (this.orientation === 'vertical') {
      window.removeEventListener('resize', this.applyTruncationIfNeeded);
    }
  }
  watchErrorIcon() {
    this.applyTruncationIfNeeded();
  }
  render() {
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, step, step-bg, step-index, step-label, optional, icon, last-step, last-step-text, label, label-wrapper, ws-wrapper, ws-inner", onClick: this.handleStepClick }, h("div", { class: this.stepWrapperCssClasses(), part: "wrapper" }, this.orientation === 'vertical' && (h("div", { class: this.stepBgCssClasses(), part: "step-bg" }, h("div", { class: this.stepTextWrapperCssClasses(), part: "step-label" }, !this.labelTooltipText ? (h(WrappedSlot, { onSlotchange: this.handleSlotChange, name: "label" })) : (h("wpp-tooltip-v3-3-0", { class: "label-tooltip", config: { placement: 'right' }, text: this.labelTooltipText }, h(WrappedSlot, { onSlotchange: this.handleSlotChange, wrapperClass: 'label-wrapper', name: "label" }))), this.tooltipText ? (h("div", { class: "step-description" }, h("wpp-tooltip-v3-3-0", { class: "description-tooltip", config: { placement: 'right' }, text: this.tooltipText }, h(WrappedSlot, { onSlotchange: this.handleSlotChange, name: "description" })))) : (h("div", { class: "step-description" }, h("slot", { onSlotchange: this.handleSlotChange, name: "description" })))), this.renderStepTypeData())), h("div", { class: this.stepCssClasses(), part: "step" }, h("span", { class: this.stepIndexCssClasses(), part: "step-index" }, this.renderStep()), this.orientation === 'horizontal' && (h("div", { class: this.stepTextWrapperCssClasses(), part: "step-label" }, h(WrappedSlot, { name: "label" }), this.renderStepTypeData()))), !this.lastStep && (h("div", { class: this.stepConnectorCssClasses(), part: "last-step" }, h("span", { class: this.connectorLineCssClasses(), part: "last-step-text" })))), h(WrappedSlot, { wrapperClass: "steps-list-container" })));
  }
  static get is() { return "wpp-step"; }
  static get registryIs() { return "wpp-step-v3-3-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-step.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-step.css"]
    };
  }
  static get properties() {
    return {
      "active": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If the current active step is indicated. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component."
        },
        "attribute": "active",
        "reflect": false,
        "defaultValue": "false"
      },
      "completed": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a specific step is complete. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component."
        },
        "attribute": "completed",
        "reflect": false,
        "defaultValue": "false"
      },
      "completedLine": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a step has a substep that must be completed. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component."
        },
        "attribute": "completed-line",
        "reflect": false,
        "defaultValue": "false"
      },
      "substep": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a step is a substep."
        },
        "attribute": "substep",
        "reflect": true,
        "defaultValue": "false"
      },
      "lastSubstepStepIndex": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- Defines the last substep of the step index."
            }],
          "text": ""
        },
        "attribute": "last-substep-step-index",
        "reflect": true
      },
      "step": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the current step number. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component."
        },
        "attribute": "step",
        "reflect": true
      },
      "index": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the current step index. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component."
        },
        "attribute": "index",
        "reflect": true
      },
      "width": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the step width. This prop is used in horizontal steppers only. When the `stepAmount` prop is used in `Stepper`, this prop is passed automatically."
        },
        "attribute": "width",
        "reflect": true
      },
      "error": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines If a step is styled as an error."
        },
        "attribute": "error",
        "reflect": true,
        "defaultValue": "false"
      },
      "warning": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If `true`, step indicates warning"
        },
        "attribute": "warning",
        "reflect": true,
        "defaultValue": "false"
      },
      "lastStep": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "If a step is the last step. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component."
        },
        "attribute": "last-step",
        "reflect": true,
        "defaultValue": "false"
      },
      "optional": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "this prop will be deleted in version 4.0.0"
            }],
          "text": "If a step is optional."
        },
        "attribute": "optional",
        "reflect": true,
        "defaultValue": "false"
      },
      "orientation": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "OrientationType",
          "resolved": "\"horizontal\" | \"vertical\"",
          "references": {
            "OrientationType": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-stepper/types.ts::OrientationType"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the step orientation. Do not use this prop in specific steps, as it is automaticly passed from the `Stepper` component."
        },
        "attribute": "orientation",
        "reflect": true,
        "defaultValue": "'vertical'"
      },
      "expanded": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- If `true`, this step is expanded"
            }],
          "text": ""
        },
        "attribute": "expanded",
        "reflect": true,
        "defaultValue": "false"
      },
      "displayedStep": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- Indicates currently displayed step"
            }],
          "text": ""
        },
        "attribute": "displayed-step",
        "reflect": true,
        "defaultValue": "false"
      },
      "hasDescription": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- Indicates if step has description."
            }],
          "text": ""
        },
        "attribute": "has-description",
        "reflect": true,
        "defaultValue": "false"
      },
      "iconDescription": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Indicates iconDescription when hover on warning or error icons"
        },
        "attribute": "icon-description",
        "reflect": true
      },
      "locales": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "StepLocales",
          "resolved": "StepLocales",
          "references": {
            "StepLocales": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-stepper/types.ts::StepLocales"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [{
              "name": "deprecated",
              "text": "this prop will be deleted in version 4.0.0"
            }],
          "text": "Indicates locales for step component"
        },
        "defaultValue": "{\n    optional: 'Optional',\n  }"
      }
    };
  }
  static get states() {
    return {
      "tooltipText": {},
      "labelTooltipText": {}
    };
  }
  static get events() {
    return [{
        "method": "wppStepChange",
        "name": "wppStepChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the step was selected"
        },
        "complexType": {
          "original": "StepChangeEventDetail",
          "resolved": "StepChangeEventDetail",
          "references": {
            "StepChangeEventDetail": {
              "location": "import",
              "path": "../../types",
              "id": "src/components/wpp-stepper/types.ts::StepChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppStepUpdate",
        "name": "wppStepUpdate",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [{
              "name": "internal",
              "text": "- This event is controlled by Stepper, do not set it manually."
            }],
          "text": "Emitted when the description or label has changed."
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "warning",
        "methodName": "watchErrorIcon"
      }, {
        "propName": "error",
        "methodName": "watchErrorIcon"
      }];
  }
}
