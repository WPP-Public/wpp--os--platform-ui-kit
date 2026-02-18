import { r as registerInstance, c as createEvent, h, H as Host, g as getElement } from './index-9177bb6d.js';
import { W as WrappedSlot } from './WrappedSlot-629d3e4f.js';

const wppStepCss = ":host{display:block;--step-width:var(--wpp-step-width, 20px);--step-height:var(--wpp-step-height, 20px);--step-with-description-height:var(--wpp-step-with-description-height, 50px);--step-slider-width:var(--wpp-step-border-width, 2px);--step-line-min-height:var(--wpp-step-line-min-heigth, 32px);--step-with-description-line-min-heigth:var(--wpp-step-with-description-line-min-height, 34px);--step-connector-line-border-color:var(--wpp-step-connector-line-border-color, var(--wpp-grey-color-400));--step-connector-line-border-color-completed:var(\n    --wpp-step-connector-line-border-color-completed,\n    var(--wpp-brand-color)\n  );--step-text-color:var(--wpp-step-text-color, var(--wpp-grey-color-400));--step-optional-text-font-weight:var(--wpp-step-optional-text-font-weight, 400);--step-text-color-active:var(--wpp-step-text-color-active, var(--wpp-brand-color));--step-text-color-completed:var(--wpp-step-text-color-completed, var(--wpp-brand-color));--step-bg-color:var(--wpp-step-bg-color, var(--wpp-grey-color-000));--step-bg-color-completed:var(--wpp-step-bg-color-completed, var(--wpp-brand-color));--step-border-color:var(--wpp-step-border-color, var(--wpp-grey-color-400));--step-border-color-active:var(--wpp-step-border-color-active, var(--wpp-brand-color));--step-border-color-completed:var(--wpp-step-border-color-completed, var(--wpp-brand-color));--step-substep-width:var(--wpp-step-subtask-width, 8px);--step-substep-height:var(--wpp-step-subtask-height, 8px);--step-container-width:var(--wpp-step-container-width, 100%);--step-vertical-line-width:var(--wpp-step-vertical-line-width, 2px);--step-circle-radius:var(--wpp-step-circle-radius, var(--wpp-border-radius-round));--step-vertical-text-margin:var(--wpp-step-vertical-text-margin, 4px);--step-vertical-bg-color:var(--wpp-step-vertical-bg-color, transparent);--step-vertical-bg-color-hover:var(--wpp-step-vertical-bg-color-hover, var(--wpp-grey-color-200));--step-vertical-bg-color-pressed:var(--wpp-step-vertical-bg-color-pressed, var(--wpp-grey-color-300));--step-vertical-bg-color-active:var(--wpp-step-vertical-bg-color-active, var(--wpp-primary-color-100));--step-vertical-text-color:var(--wpp-step-vertical-text-color, var(--wpp-text-color-disabled));--step-vertical-text-color-active:var(--wpp-step-vertical-text-color-active, var(--wpp-brand-color));--step-vertical-text-margin-left:var(--wpp-step-vertical-text-margin-left, 40px);--step-vertical-text-margin-right:var(--wpp-step-vertical-text-margin-left, 8px);--step-vertical-icon-margin-right:var(--wpp-step-vertical-icon-margin-right, 8px);--step-horizontal-step-index-bg-color:var(--wpp-step-horizontal-step-index-bg-color, transparent);--step-horizontal-step-index-bg-color-hover:var(\n    --wpp-step-horizontal-step-index-bg-color-hover,\n    var(--wpp-grey-color-200)\n  );--step-horizontal-step-index-bg-color-pressed:var(\n    --wpp-step-horizontal-step-index-bg-color-pressed,\n    var(--wpp-grey-color-300)\n  );--step-horizontal-step-index-bg-color-active:var(\n    --wpp-step-horizontal-step-index-bg-color-active,\n    var(--wpp-primary-color-100)\n  );--step-horizontal-text-wrapper-bg-color:var(--wpp-step-horizontal-text-wrapper-bg-color, transparent);--step-horizontal-text-wrapper-bg-color-hover:var(\n    --wpp-step-horizontal-text-wrapper-bg-color-hover,\n    var(--wpp-grey-color-200)\n  );--step-horizontal-text-wrapper-bg-color-pressed:var(\n    --wpp-step-horizontal-text-wrapper-bg-color-pressed,\n    var(--wpp-grey-color-300)\n  );--step-horizontal-text-wrapper-bg-color-active:var(\n    --wpp-step-horizontal-text-wrapper-bg-color-active,\n    var(--wpp-primary-color-100)\n  );--step-horizontal-text-wrapper-padding:var(--wpp-step-horizontal-text-wrapper-padding, 1px 12px);--step-horizontal-text-wrapper-border-radius:var(\n    --wpp-step-horizontal-text-wrapper-padding,\n    var(--wpp-border-radius-s)\n  );--step-horizontal-text-wrapper-margin:var(--wpp-step-horizontal-text-wrapper-margin, 8px);--step-horizontal-text-color:var(--wpp-step-horizontal-text-color, var(--wpp-text-color-disabled));--step-horizontal-text-color-active:var(--wpp-step-horizontal-text-color-active, var(--wpp-brand-color));--step-horizontal-icon-margin-left:var(--wpp-step-horizontal-icon-margin-left, 8px);--step-horizontal-line-width:var(--wpp-step-horizontal-line-width, 2px)}.text-wrapper{font-size:var(--wpp-typography-s-strong-font-size, 14px);line-height:var(--wpp-typography-s-strong-line-height, 22px);font-weight:var(--wpp-typography-s-strong-font-weight, 700);color:var(--wpp-typography-s-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-strong-letter-spacing, 0)}.text-wrapper.inactive-text{color:var(--wpp-grey-color-500)}.text-wrapper.inactive-text .wpp-typography{color:var(--wpp-grey-color-500)}.horizontal{-ms-flex-direction:column;flex-direction:column}.horizontal .text-wrapper{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-top:var(--step-vertical-text-margin)}.horizontal .text-wrapper .wpp-typography::part(typography){font-weight:var(--step-optional-text-font-weight)}.horizontal .horizontal-optional-text{margin-left:4px;font-size:14px}.vertical .text-wrapper{position:absolute;left:32px;margin:0;white-space:nowrap}.vertical .text-wrapper .wpp-typography::part(typography){font-weight:var(--step-optional-text-font-weight)}.vertical .wpp-typography{color:var(--wpp-grey-color-800)}.step-wrapper{position:relative;width:var(--step-container-width)}.step-wrapper.substep-wrapper{margin-left:6px}.step-wrapper.substep-wrapper .text-wrapper{left:24px;margin:0}.step-wrapper.substep-wrapper .text-wrapper.inactive-text{color:var(--wpp-grey-color-500)}.step{position:relative;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;text-align:left}.step-index{font-size:var(--wpp-typography-xs-strong-font-size, 12px);line-height:var(--wpp-typography-xs-strong-line-height, 20px);font-weight:var(--wpp-typography-xs-strong-font-weight, 700);color:var(--wpp-typography-xs-strong-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-strong-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-strong-letter-spacing, 0);z-index:2;display:-ms-flexbox;display:flex;-ms-flex-negative:0;flex-shrink:0;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:var(--step-width);height:var(--step-height);color:var(--step-text-color);background-color:var(--step-bg-color);border:var(--step-slider-width) solid var(--step-border-color);border-radius:var(--step-circle-radius);-webkit-transition:0.2s ease-in-out;transition:0.2s ease-in-out}.step-index.active{color:var(--step-text-color-active);border-color:var(--step-border-color-active)}.step-index.completed{color:var(--step-text-color-completed);background-color:var(--step-bg-color-completed);border-color:var(--step-border-color-completed)}.step-index.error{position:relative}.connector-horizontal{position:absolute;top:12px;left:calc(50% - 4px);-ms-flex:1 1 auto;flex:1 1 auto;width:calc(100% - 20px)}.connector-horizontal .connector-line{display:block;border-color:var(--step-connector-line-border-color);border-top-width:var(--step-vertical-line-width);border-top-style:solid}.connector-vertical{position:relative;left:-3px;width:var(--step-vertical-line-width)}.connector-vertical .connector-line{display:block;min-height:var(--step-line-min-height);border-color:var(--step-connector-line-border-color);border-left-width:var(--step-vertical-line-width);border-left-style:solid}.connector{-ms-flex:1 1 auto;flex:1 1 auto;margin-left:14px;z-index:1}.connector .completed-line{border-color:var(--step-connector-line-border-color-completed)}.substep{width:var(--step-substep-width);height:var(--step-substep-height)}.connector-substep{margin-left:8px}:host(.wpp-last-step) .connector{opacity:0}:host(.wpp-last-step[expanded]) .connector,:host(.wpp-last-step[expanded=true]) .connector{opacity:1}:host(.wpp-vertical){--step-label-width:var(--wpp-step-label-width, 104px);width:100%}:host(.wpp-vertical):host(.wpp-step) .steps-list-container{height:0;-webkit-transition:height 0.5s, opacity 0.3s;transition:height 0.5s, opacity 0.3s;opacity:0}:host(.wpp-vertical):host(.wpp-expanded) .steps-list-container{height:var(--steps-list-container-height);opacity:1;-webkit-transition:height 0.5s, opacity 0.5s;transition:height 0.5s, opacity 0.5s}:host(.wpp-vertical):host([active]:not([completed])) .step-bg:not(.active):hover~.step .step-index{background-color:var(--step-vertical-bg-color-hover);-webkit-transition:0s;transition:0s}:host(.wpp-vertical):host([active]:not([completed])) .step-bg:not(.active):active~.step .step-index{background-color:var(--step-vertical-bg-color-pressed);-webkit-transition:0s;transition:0s}:host(.wpp-vertical) .step{width:var(--step-width)}:host(.wpp-vertical) .step.completed .text-wrapper{color:var(--step-vertical-text-color-active)}:host(.wpp-vertical) .step-wrapper .step-bg{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;border-radius:var(--wpp-border-radius-s);width:var(--vertical-stepper-width);height:36px;top:-6px;left:calc(var(--step-vertical-icon-margin-right) * -1)}:host(.wpp-vertical) .step-wrapper .step-bg.active{background:var(--step-vertical-bg-color-active)}:host(.wpp-vertical) .step-wrapper .step-bg .text-wrapper{width:calc(100% - var(--step-vertical-text-margin-left) - var(--step-vertical-icon-margin-right) - var(--step-vertical-text-margin-right));text-align:start;left:var(--step-vertical-text-margin-left);position:absolute}:host(.wpp-vertical) .step-wrapper .step-bg .text-wrapper.inactive-text{color:var(--step-vertical-text-color)}:host(.wpp-vertical) .step-wrapper .step-bg .text-wrapper.with-icon{width:calc(100% - var(--step-vertical-text-margin-left) - var(--step-vertical-icon-margin-right) - var(--step-vertical-text-margin-right) - 20px)}:host(.wpp-vertical) .step-wrapper .step-bg .text-wrapper ::slotted([slot=label]),:host(.wpp-vertical) .step-wrapper .step-bg .text-wrapper ::slotted([slot=description]){overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:block;width:var(--step-label-width)}:host(.wpp-vertical) .step-wrapper .step-bg .text-wrapper.with-icon ::slotted([slot=label]),:host(.wpp-vertical) .step-wrapper .step-bg .text-wrapper.with-icon ::slotted([slot=description]){width:calc(var(--step-label-width) - 20px)}:host(.wpp-vertical) .step-wrapper .step-bg .wpp-tooltip,:host(.wpp-vertical) .step-wrapper .step-bg .icon{position:absolute;right:var(--step-vertical-icon-margin-right)}:host(.wpp-vertical) .step-wrapper .step-bg .label-tooltip{position:relative;right:0}:host(.wpp-vertical) .step-wrapper .step-bg .label-tooltip:hover{cursor:pointer}:host(.wpp-vertical) .step-wrapper.step-has-description .step-bg{overflow:hidden;top:-4px;height:var(--step-with-description-height)}:host(.wpp-vertical) .step-wrapper.step-has-description .step-bg .step-description{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0);color:var(--wpp-grey-color-800)}:host(.wpp-vertical) .step-wrapper.step-has-description .step-bg .description-tooltip,:host(.wpp-vertical) .step-wrapper.step-has-description .step-bg .label-tooltip{position:relative;right:0}:host(.wpp-vertical) .step-wrapper.step-has-description .step-bg .description-tooltip:hover,:host(.wpp-vertical) .step-wrapper.step-has-description .step-bg .label-tooltip:hover{cursor:pointer}:host(.wpp-vertical) .step-wrapper.step-has-description .connector-vertical .connector-line{min-height:var(--step-with-description-line-min-heigth)}:host(.wpp-vertical) .step-wrapper:not(.substep-wrapper) .text-wrapper{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host(.wpp-vertical) .step-wrapper.substep-wrapper .step-bg{top:-12px;left:-14px}:host(.wpp-vertical) .step-wrapper.substep-wrapper .text-wrapper{font-size:var(--wpp-typography-xs-body-font-size, 12px);line-height:var(--wpp-typography-xs-body-line-height, 20px);font-weight:var(--wpp-typography-xs-body-font-weight, 400);color:var(--wpp-typography-xs-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-body-letter-spacing, 0)}:host(.wpp-vertical) .step-wrapper.substep-wrapper .text-wrapper.inactive-text{color:var(--step-vertical-text-color)}:host(.wpp-vertical) .step-wrapper.substep-wrapper.active .text-wrapper{font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0);color:var(--step-vertical-text-color-active)}:host(.wpp-vertical) .step-wrapper.active .step-index.active:not(.completed){background:var(--step-vertical-bg-color-active)}:host(.wpp-vertical) .step-wrapper.active .step-bg{cursor:pointer;background:var(--step-vertical-bg-color-active)}:host(.wpp-vertical) .step-wrapper.active .step-bg .text-wrapper{color:var(--step-vertical-text-color-active)}:host(.wpp-vertical) .step-wrapper.active .step-bg .text-wrapper .wpp-typography{color:var(--step-vertical-text-color-active)}:host(.wpp-vertical) .step-wrapper.active .step-bg.active .text-wrapper{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);color:var(--step-vertical-text-color-active)}:host(.wpp-vertical) .step-wrapper.active.substep-wrapper .step-bg.active .text-wrapper{font-size:var(--wpp-typography-xs-midi-font-size, 12px);line-height:var(--wpp-typography-xs-midi-line-height, 20px);font-weight:var(--wpp-typography-xs-midi-font-weight, 500);color:var(--wpp-typography-xs-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-xs-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-xs-midi-letter-spacing, 0);color:var(--step-vertical-text-color-active)}:host(.wpp-vertical) .step-wrapper.completed .step-bg{cursor:pointer}:host(.wpp-vertical) .step-wrapper.completed:not(.active) .step-bg:hover{background-color:var(--step-vertical-bg-color-hover)}:host(.wpp-vertical) .step-wrapper.completed:not(.active) .step-bg:active{background-color:var(--step-vertical-bg-color-pressed)}:host(.wpp-horizontal) .step-wrapper .text-wrapper{font-size:var(--wpp-typography-s-midi-font-size, 14px);line-height:var(--wpp-typography-s-midi-line-height, 22px);font-weight:var(--wpp-typography-s-midi-font-weight, 500);color:var(--wpp-typography-s-midi-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-midi-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-midi-letter-spacing, 0);padding:var(--step-horizontal-text-wrapper-padding);background-color:var(--step-horizontal-text-wrapper-bg-color);border-radius:var(--step-horizontal-text-wrapper-border-radius);margin-top:var(--step-horizontal-text-wrapper-margin);cursor:pointer}:host(.wpp-horizontal) .step-wrapper .text-wrapper.inactive-text{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0);cursor:initial;color:var(--step-horizontal-text-color)}:host(.wpp-horizontal) .step-wrapper .text-wrapper.with-icon .wpp-tooltip,:host(.wpp-horizontal) .step-wrapper .text-wrapper.with-icon .icon{margin-left:var(--step-horizontal-icon-margin-left)}:host(.wpp-horizontal) .step-wrapper .text-wrapper.with-icon .icon{display:-ms-inline-flexbox;display:inline-flex}:host(.wpp-horizontal) .step-wrapper.active .step-index{background-color:var(--step-horizontal-step-index-bg-color-active)}:host(.wpp-horizontal) .step-wrapper.active .text-wrapper{color:var(--step-horizontal-text-color-active);background-color:var(--step-horizontal-text-wrapper-bg-color-active)}:host(.wpp-horizontal) .step-wrapper.completed:not(.active) .step-index{cursor:pointer}:host(.wpp-horizontal) .step-wrapper.completed:not(.active) .step-index:hover~.text-wrapper{background-color:var(--step-horizontal-text-wrapper-bg-color-hover)}:host(.wpp-horizontal) .step-wrapper.completed:not(.active) .step-index:active~.text-wrapper{background-color:var(--step-horizontal-text-wrapper-bg-color-pressed)}:host(.wpp-horizontal) .step-wrapper.completed:not(.active) .text-wrapper{font-size:var(--wpp-typography-s-body-font-size, 14px);line-height:var(--wpp-typography-s-body-line-height, 22px);font-weight:var(--wpp-typography-s-body-font-weight, 400);color:var(--wpp-typography-s-body-color, var(--wpp-text-color));font-family:var(--wpp-typography-s-body-font-family, var(--wpp-font-family));letter-spacing:var(--wpp-typography-s-body-letter-spacing, 0)}:host(.wpp-horizontal) .step-wrapper.completed:not(.active) .text-wrapper:hover{background-color:var(--step-horizontal-text-wrapper-bg-color-hover)}:host(.wpp-horizontal) .step-wrapper.completed:not(.active) .text-wrapper:active{background-color:var(--step-horizontal-text-wrapper-bg-color-pressed)}:host(.wpp-horizontal) .step-wrapper.completed.active .step-index{cursor:pointer}:host(.wpp-horizontal) .step-wrapper.completed.active .step-index.active.completed{background-color:var(--step-horizontal-text-color-active)}";

const WppStep = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.wppStepChange = createEvent(this, "wppStepChange", 1);
    this.wppStepUpdate = createEvent(this, "wppStepUpdate", 1);
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
        return h("wpp-icon-tick-v3-5-0", { color: "var(--wpp-grey-color-000)" });
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
        icon = h("wpp-icon-error-v3-5-0", null);
      if (this.warning)
        icon = h("wpp-icon-warning-v3-5-0", null);
      if (!icon)
        return null;
      if (this.iconDescription) {
        return (h("wpp-tooltip-v3-5-0", { config: { placement: 'bottom' }, text: this.iconDescription }, icon));
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
    return (h(Host, { class: this.hostCssClasses(), exportparts: "wrapper, step, step-bg, step-index, step-label, optional, icon, last-step, last-step-text, label, label-wrapper, ws-wrapper, ws-inner", onClick: this.handleStepClick }, h("div", { class: this.stepWrapperCssClasses(), part: "wrapper" }, this.orientation === 'vertical' && (h("div", { class: this.stepBgCssClasses(), part: "step-bg" }, h("div", { class: this.stepTextWrapperCssClasses(), part: "step-label" }, !this.labelTooltipText ? (h(WrappedSlot, { onSlotchange: this.handleSlotChange, name: "label" })) : (h("wpp-tooltip-v3-5-0", { class: "label-tooltip", config: { placement: 'right' }, text: this.labelTooltipText }, h(WrappedSlot, { onSlotchange: this.handleSlotChange, wrapperClass: 'label-wrapper', name: "label" }))), this.tooltipText ? (h("div", { class: "step-description" }, h("wpp-tooltip-v3-5-0", { class: "description-tooltip", config: { placement: 'right' }, text: this.tooltipText }, h(WrappedSlot, { onSlotchange: this.handleSlotChange, name: "description" })))) : (h("div", { class: "step-description" }, h("slot", { onSlotchange: this.handleSlotChange, name: "description" })))), this.renderStepTypeData())), h("div", { class: this.stepCssClasses(), part: "step" }, h("span", { class: this.stepIndexCssClasses(), part: "step-index" }, this.renderStep()), this.orientation === 'horizontal' && (h("div", { class: this.stepTextWrapperCssClasses(), part: "step-label" }, h(WrappedSlot, { name: "label" }), this.renderStepTypeData()))), !this.lastStep && (h("div", { class: this.stepConnectorCssClasses(), part: "last-step" }, h("span", { class: this.connectorLineCssClasses(), part: "last-step-text" })))), h(WrappedSlot, { wrapperClass: "steps-list-container" })));
  }
  static get registryIs() { return "wpp-step-v3-5-0"; }
  get host() { return getElement(this); }
  static get watchers() { return {
    "warning": ["watchErrorIcon"],
    "error": ["watchErrorIcon"]
  }; }
};
WppStep.style = wppStepCss;

export { WppStep as wpp_step };
