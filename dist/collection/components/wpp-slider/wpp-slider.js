import { Host, h } from '@stencil/core';
import { FOCUS_TYPE } from '../../types/common';
import { DEFAULT_INPUT_WIDTH, formatDecimalWithMask, getDefaultMaskOptions, getMaskOptionsForInput, parseMaskedInput, } from './consts';
import { transformToVersionedTag } from '../../utils/utils';
const getInitFocusInfo = () => ({
  min: FOCUS_TYPE.NONE,
  max: FOCUS_TYPE.NONE,
});
/**
 * @part label - Label text element
 * @part control-wrapper - controls wrapper element
 * @part editable-input-wrapper - controls editable input wrapper element
 * @part input-number - input number element
 * @part input-wrapper - input wrapper element
 * @part input-min - input-min element
 * @part input-max - input-max element
 * @part divider - divider element
 * @part value - slider value text element
 * @part value-wrapper - value-wrapper element
 * @part value-divider - value-divider element
 * @part mark - mark element
 * @part mark-circle - mark bg circle element
 * @part mark-inner - mark inner element
 * @part slider - slider element
 * @part input-slider-min - input-slider-min element
 * @part input-slider-max - input-slider-max element
 * @part marks-list - marks list element
 */
export class WppSlider {
  constructor() {
    this.segmentWidth = 0;
    this.totalWidth = 0;
    this.computeSegmentWidth = () => {
      if (!this.clickableAreaRef)
        return;
      this.totalWidth = this.clickableAreaRef.clientWidth;
      const numberOfSegments = Math.ceil((this.max - this.min) / this.step);
      this.segmentWidth = this.totalWidth / numberOfSegments;
    };
    this.onUpdateMinMaxValues = (valueType, newValue) => {
      this.handleType({
        single: () => {
          this.value = newValue;
        },
        range: value => {
          if (valueType === 'min') {
            this.value = [Math.max(newValue, value[0]), value[1]];
          }
          if (valueType === 'max') {
            this.value = [value[0], Math.min(newValue, value[1])];
          }
        },
      });
      this.computeSegmentWidth();
      this.getDisplayMarks();
    };
    this.handleType = (handlers) => {
      if (this.type === 'range' && Array.isArray(this.value)) {
        return handlers.range(this.value);
      }
      return handlers.single(this.value);
    };
    this.getSliderInputValue = () => Array.isArray(this.value) ? this.value.map(String) : String(this.value);
    this.getDisplayMarks = () => {
      let marks;
      if (Array.isArray(this.marks)) {
        marks = this.continuous
          ? [this.marks[0], this.marks[this.marks.length - 1]]
          : this.marks
            .sort((a, b) => a.value - b.value)
            .filter(mark => mark.value <= this.max && mark.value >= this.min);
      }
      else {
        marks = this.continuous
          ? [
            { value: this.min, label: this.min },
            { value: this.max, label: this.max },
          ]
          : [...Array(Math.floor((this.max - this.min) / this.step) + 1)].map((_, i) => ({
            value: this.min + i * this.step,
            label: this.min + i * this.step,
          }));
      }
      marks = marks.map(mark => ({
        ...mark,
        position: this.calculateProgressBar(mark.value),
      }));
      this.displayMarks = marks;
      this.applyTruncationToMarks();
    };
    /**
     * @method applyTruncationToMarks
     * Measures internal label elements to determine if text is truncated.
     * Sets tooltipTexts accordingly to enable tooltips for truncated labels.
     */
    this.applyTruncationToMarks = () => {
      requestAnimationFrame(() => {
        this.computeSegmentWidth();
        const newTooltipTexts = {};
        const totalMarks = this.displayMarks.length;
        const marks = this.marksListRef?.querySelectorAll(`${transformToVersionedTag('wpp-typography')}[part="label"]`);
        if (!marks)
          return;
        this.displayMarks.forEach((mark, index) => {
          const labelElement = Array.from(marks).find(item => item.id.includes(`${mark.value}`));
          if (labelElement && typeof mark.label === 'string') {
            const typographySpan = labelElement.shadowRoot?.querySelector('[part="typography"]');
            if (typographySpan) {
              const flexUnits = index === 0 || index === totalMarks - 1 ? 0.45 : 0.95;
              const maxWidth = flexUnits * this.segmentWidth;
              const labelContainer = labelElement.parentElement;
              if (labelContainer) {
                if (labelContainer.style?.setProperty) {
                  labelContainer.style?.setProperty('--label-max-width', `${maxWidth}px`);
                }
              }
              const isOverflowing = typographySpan.scrollWidth > maxWidth;
              if (isOverflowing) {
                newTooltipTexts[mark.value] = mark.label;
              }
            }
          }
        });
        this.tooltipTexts = newTooltipTexts;
      });
    };
    this.handleInputChange = (type) => (event) => {
      const target = event.target;
      const inputMaskOptions = getMaskOptionsForInput(this.type, type, this.maskOptions);
      const inputValue = parseMaskedInput(target.value, inputMaskOptions);
      if (target.value === '' ||
        target.value === inputMaskOptions?.postfix ||
        target.value === inputMaskOptions?.prefix) {
        this.handleType({
          single: () => {
            this.onUpdateInputValue(String(this.value));
          },
          range: value => {
            this.value = value;
            this.inputValue = this.getSliderInputValue();
          },
        });
        return;
      }
      const nearestLowerValue = Math.floor((inputValue - this.min) / this.step) * this.step + this.min;
      this.handleType({
        single: () => {
          const newValue = Math.max(Math.min(nearestLowerValue, this.max), this.min);
          this.value = newValue;
        },
        range: value => {
          if (type === 'min') {
            const newValue = Math.min(Math.max(nearestLowerValue, this.min), value[1] - this.step);
            this.value = [newValue, value[1]];
          }
          if (type === 'max') {
            const newValue = Math.max(Math.min(nearestLowerValue, this.max), value[0] + this.step);
            this.value = [value[0], newValue];
          }
        },
      });
      const newInputValue = this.getSliderInputValue();
      if (this.inputValue === newInputValue) {
        this.onUpdateInputValue(newInputValue);
      }
      else {
        this.inputValue = this.getSliderInputValue();
      }
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.getUpdatedFocusInfo = (type, updateValue) => ({
      ...this.focusType,
      [type]: updateValue,
    });
    this.handleBlur = (event) => {
      this.focusType = getInitFocusInfo();
      const target = event.target;
      const type = target.classList.contains('min-input')
        ? 'min'
        : target.classList.contains('max-input')
          ? 'max'
          : null;
      if (type) {
        this.handleInputChange(type)(event);
      }
      else {
        this.handleInputChange()(event);
      }
      this.wppBlur.emit(event);
    };
    this.handleFocus = (event) => {
      this.wppFocus.emit(event);
    };
    this.handleInputBlur = (type) => {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.NONE);
    };
    this.handleInputMouseDown = (type) => {
      this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.MOUSE);
    };
    this.handleInputKeyUp = (event, type) => {
      if (event.key === 'Tab')
        this.focusType = this.getUpdatedFocusInfo(type, FOCUS_TYPE.TAB);
    };
    this.handleMarkClick = (event, mark) => {
      event.stopPropagation();
      this.handleType({
        single: () => {
          this.value = mark.value;
        },
        range: value => {
          const distanceToTheStart = Math.abs(value[0] - mark.value);
          const distanceToTheEnd = Math.abs(value[1] - mark.value);
          if (distanceToTheStart <= distanceToTheEnd) {
            this.value = [mark.value, value[1]];
          }
          else {
            this.value = [value[0], mark.value];
          }
        },
      });
      this.inputValue = this.getSliderInputValue();
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.handleSliderWrapperClick = (event) => {
      if (this.disabled || this.segmentWidth === 0)
        return;
      const clickedSegmentPosition = 1 + event.offsetX / this.segmentWidth;
      const clickedSegmentNumber = Math.trunc(clickedSegmentPosition);
      // This value determines which half of the segment was clicked. -1 means that the first half was clicked and that the clicked segment
      // is placed on the right of the mark, so we should approximate to the starting mark of the segment (left one).
      const halfOfSegment = clickedSegmentPosition > Math.round(clickedSegmentPosition) ? -1 : 0;
      const clickedValue = this.min + (clickedSegmentNumber + halfOfSegment) * this.step;
      this.handleType({
        single: () => {
          this.value = Math.round(clickedValue);
          this.inputValue = String(this.value);
        },
        range: value => {
          const distanceFromEndThumb = Math.abs(clickedValue - value[1]);
          const distanceFromStartThumb = Math.abs(clickedValue - value[0]);
          if (distanceFromEndThumb === distanceFromStartThumb) {
            if (halfOfSegment === -1) {
              this.value = [value[0], clickedValue];
            }
            else {
              this.value = [clickedValue, value[1]];
            }
          }
          if (clickedValue > value[1] || distanceFromEndThumb < distanceFromStartThumb) {
            this.value = [value[0], clickedValue];
          }
          if (clickedValue < value[0] || distanceFromEndThumb > distanceFromStartThumb) {
            this.value = [clickedValue, value[1]];
          }
          this.inputValue = this.value.map(String);
        },
      });
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.handleSingleSliderChange = (event) => {
      this.value = Number(event.target.value);
      this.inputValue = String(this.value);
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.handleRangeSliderChange = (type) => (event) => {
      event.preventDefault();
      event.stopPropagation();
      const target = event.target;
      this.handleType({
        single: () => { },
        range: value => {
          if (type === 'min') {
            this.value = [Math.min(value[1] - this.step, Number(target.value)), value[1]];
            target.value = String(Math.min(this.value[1] - this.step, Number(target.value)));
          }
          if (type === 'max') {
            this.value = [value[0], Math.max(value[0] + this.step, Number(target.value))];
            target.value = String(Math.max(this.value[0] + this.step, Number(target.value)));
          }
        },
      });
      this.inputValue = this.getSliderInputValue();
      this.wppChange.emit({
        value: this.value,
        name: this.name,
      });
    };
    this.markCssClasses = (markValue) => ({
      'mark-item': true,
      active: this.value >= markValue ||
        (Array.isArray(this.value) && this.value[0] <= markValue && this.value[1] >= markValue),
      disabled: this.disabled,
      first: markValue === this.min,
      last: markValue === this.max,
    });
    this.singleSliderWrapperCssClasses = () => ({
      'single-slider-wrapper': true,
      disabled: this.disabled,
    });
    this.rangeSliderWrapperCssClasses = () => ({
      'range-slider-wrapper': true,
      disabled: this.disabled,
    });
    this.controlCssClasses = () => ({
      'with-value': this.withValue,
      'without-label': !this.labelConfig?.text,
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    });
    this.hostCssClasses = () => ({
      'wpp-slider': true,
    });
    this.marksListCssClasses = () => ({
      'marks-list': true,
      [`size-${this.size}`]: true,
    });
    this.inputColumnCssClasses = () => ({
      'input-column': true,
      [`size-${this.size}`]: true,
    });
    this.labelCssClasses = () => ({
      label: true,
      [`size-${this.size}`]: true,
    });
    this.editableInputCssClasses = () => ({
      'with-input': this.withInput,
      'inputs-range': this.withInput && this.type === 'range',
      disabled: this.disabled,
      [`size-${this.size}`]: true,
    });
    this.calculateProgressBar = (value) => (value - this.min) * (1 / (this.max - this.min)) * 100 + '%';
    this.renderControl = () => {
      const label = this.labelConfig?.text && (h("wpp-label-v2-22-0", { htmlFor: this.name, optional: !this.required, disabled: this.disabled, config: this.labelConfig, tooltipConfig: this.labelTooltipConfig, part: "label" }));
      if (this.withValue && !this.withInput) {
        return (h("div", { class: this.controlCssClasses(), part: "control-wrapper" }, label, this.handleType({
          single: value => (h("wpp-typography-v2-22-0", { type: "s-midi", part: "value" }, value)),
          range: value => (h("div", { class: "range-value-wrapper", part: "value-wrapper" }, h("wpp-typography-v2-22-0", { type: "s-midi", part: "value" }, value[0]), h("wpp-divider-v2-22-0", { part: "value-divider", class: { divider: true, disabled: this.disabled } }), h("wpp-typography-v2-22-0", { type: "s-midi", part: "value" }, value[1]))),
        })));
      }
      return label;
    };
    this.renderEditableInput = () => (h("div", { class: this.editableInputCssClasses(), part: "editable-input-wrapper" }, this.handleType({
      single: () => (h("wpp-input-v2-22-0", { ref: inputRef => (this.inputRef = inputRef), type: "decimal", disabled: this.disabled, part: "input-number", onBlur: this.handleBlur, onFocus: this.handleFocus, style: { width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }, class: { [`size-${this.size}`]: true }, maskOptions: {
          decimalPatternOptions: this.maskOptions
            ? {
              ...getDefaultMaskOptions(this.step),
              ...this.maskOptions,
            }
            : getDefaultMaskOptions(this.step),
        } })),
      range: () => (h("div", { class: "range-input-wrapper", part: "input-wrapper" }, h("wpp-input-v2-22-0", { ref: inputRef => (this.inputRef = inputRef), type: "decimal", disabled: this.disabled, part: "input-min", onBlur: this.handleBlur, onFocus: this.handleFocus, style: { width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }, class: { 'min-input': true, [`size-${this.size}`]: true }, maskOptions: {
          decimalPatternOptions: this.maskOptions && this.maskOptions[0]
            ? {
              ...getDefaultMaskOptions(this.step),
              ...this.maskOptions[0],
            }
            : getDefaultMaskOptions(this.step),
        } }), h("wpp-divider-v2-22-0", { class: { 'wpp-disabled': this.disabled }, part: "divider" }), h("wpp-input-v2-22-0", { ref: inputRef => (this.inputMaxRef = inputRef), type: "decimal", disabled: this.disabled, part: "input-max", onBlur: this.handleBlur, onFocus: this.handleFocus, style: { width: this.inputWidth ? this.inputWidth : DEFAULT_INPUT_WIDTH }, class: { 'max-input': true, [`size-${this.size}`]: true }, maskOptions: {
          decimalPatternOptions: this.maskOptions && this.maskOptions[1]
            ? {
              ...getDefaultMaskOptions(this.step),
              ...this.maskOptions[1],
            }
            : getDefaultMaskOptions(this.step),
        } }))),
    })));
    this.renderMarks = () => {
      if (this.displayMarks.length > 0) {
        const totalMarks = this.displayMarks.length;
        const calculateDynamicOffset = (index, totalMarks) => {
          if (index === 0 || index === totalMarks - 1)
            return 0;
          const midpoint = Math.floor(totalMarks / 2);
          return (midpoint - index) * 2;
        };
        return this.displayMarks.map((mark, index) => {
          const dynamicOffset = calculateDynamicOffset(index, totalMarks);
          const isFirstMark = index === 0;
          const isLastMark = index === totalMarks - 1;
          const style = {
            '--mark-left-dynamic': isFirstMark || isLastMark
              ? `calc(${mark.position} - var(--slider-mark-size) / 2)`
              : `calc(${mark.position} - var(--slider-mark-size) / 2 + ${dynamicOffset}px)`,
          };
          const isTruncated = !!this.tooltipTexts[mark.value];
          const labelText = mark.label !== null && mark.label !== undefined ? String(mark.label) : '';
          const tooltipPlacement = 'bottom';
          const labelContent = (h("wpp-typography-v2-22-0", { id: `mark-label-${mark.value}`, class: this.labelCssClasses(), type: "xs-body", part: "label" }, labelText));
          return (h("div", { onClick: event => this.handleMarkClick(event, mark), class: this.markCssClasses(mark.value), style: style, part: "mark" }, !this.continuous && (h("div", { class: "circle", part: "mark-circle" }, h("div", { class: "mark", part: "mark-inner" }))), h("div", { class: "label-container" }, isTruncated ? (h("wpp-tooltip-v2-22-0", { config: { placement: tooltipPlacement }, text: this.tooltipTexts[mark.value] }, labelContent)) : (labelContent))));
        });
      }
    };
    this.tooltipTexts = {};
    this.displayMarks = [];
    this.inputValue = undefined;
    this.focusType = getInitFocusInfo();
    this.name = undefined;
    this.inputWidth = DEFAULT_INPUT_WIDTH;
    this.value = undefined;
    this.marks = false;
    this.type = 'single';
    this.min = 1;
    this.max = 100;
    this.step = 1;
    this.continuous = false;
    this.required = false;
    this.disabled = false;
    this.withInput = false;
    this.withValue = false;
    this.ariaProps = {};
    this.labelTooltipConfig = {
      popperOptions: { strategy: 'fixed' },
    };
    this.labelConfig = undefined;
    this.size = 'm';
    this.maskOptions = undefined;
  }
  onUpdateMinValue(newValue) {
    this.onUpdateMinMaxValues('min', newValue);
  }
  onUpdateMaxValue(newValue) {
    this.onUpdateMinMaxValues('max', newValue);
  }
  onUpdateStepValue(newStepValue) {
    this.handleType({
      single: () => {
        this.value = this.min;
      },
      range: () => {
        this.value = [this.min, this.min + newStepValue];
      },
    });
    this.computeSegmentWidth();
    this.getDisplayMarks();
  }
  onUpdateInputValue(newInputValue) {
    if (this.type === 'single') {
      const inputMaskOptions = getMaskOptionsForInput(this.type, undefined, this.maskOptions);
      if (this.inputRef) {
        this.inputRef.value = formatDecimalWithMask(Number(newInputValue), inputMaskOptions);
      }
    }
    else {
      const [minValue, maxValue] = newInputValue.map(Number);
      const minInputMaskOptions = getMaskOptionsForInput(this.type, 'min', this.maskOptions);
      if (this.inputRef) {
        this.inputRef.value = formatDecimalWithMask(minValue, minInputMaskOptions);
      }
      const maxInputMaskOptions = getMaskOptionsForInput(this.type, 'max', this.maskOptions);
      if (this.inputMaxRef) {
        this.inputMaxRef.value = formatDecimalWithMask(maxValue, maxInputMaskOptions);
      }
    }
  }
  /**
   * Sets focus on native input
   */
  async setFocus() {
    this.inputRef?.focus();
  }
  componentWillLoad() {
    this.getDisplayMarks();
  }
  componentDidLoad() {
    this.handleType({
      single: value => {
        this.inputValue = String(value);
      },
      range: value => {
        this.inputValue = value.map(String);
      },
    });
    this.computeSegmentWidth();
    this.getDisplayMarks();
    this.applyTruncationToMarks();
    window.addEventListener('load', () => {
      this.computeSegmentWidth();
      this.getDisplayMarks();
      this.applyTruncationToMarks();
    });
    window.addEventListener('resize', this.applyTruncationToMarks);
  }
  disconnectedCallback() {
    window.removeEventListener('resize', this.applyTruncationToMarks);
    window.removeEventListener('load', () => {
      this.computeSegmentWidth();
      this.getDisplayMarks();
      this.applyTruncationToMarks();
    });
  }
  render() {
    const style = this.handleType({
      single: value => ({
        '--active-single-progress-bar': this.calculateProgressBar(value),
      }),
      range: value => ({
        '--active-range-from-progress-bar': this.calculateProgressBar(value[0]),
        '--active-range-to-progress-bar': this.calculateProgressBar(value[1]),
      }),
    });
    return (h(Host, { class: this.hostCssClasses(), exportparts: "label, input-number, input-wrapper, input-min, divider, input-max, control-wrapper, editable-input-wrapper, value, value-wrapper, value-divider, mark, mark-circle, mark-inner, slider, input-slider-min, input-slider-max, marks-list" }, this.renderControl(), h("div", { class: "slider-container" }, h("div", { class: "slider-column" }, this.handleType({
      single: value => (h("div", { class: this.singleSliderWrapperCssClasses(), part: "slider" }, h("div", { ref: elRef => (this.clickableAreaRef = elRef), class: "slider-clickable-wrapper", onClick: this.handleSliderWrapperClick }), h("input", { class: { slider: true, [`max-range-${this.focusType.max}`]: true }, type: "range", name: this.name, id: this.name, min: this.min, max: this.max, step: this.step, value: value, required: this.required, disabled: this.disabled, "aria-label": this.ariaProps.label, part: "input-slider-max", onInput: this.handleSingleSliderChange, onBlur: () => this.handleInputBlur('max'), onKeyUp: (event) => this.handleInputKeyUp(event, 'max'), onMouseDown: () => this.handleInputMouseDown('max'), style: style, title: "" }))),
      range: value => (h("div", { class: this.rangeSliderWrapperCssClasses(), part: "slider" }, h("div", { ref: elRef => (this.clickableAreaRef = elRef), class: "slider-clickable-wrapper", onClick: this.handleSliderWrapperClick }), h("input", { class: { slider: true, [`min-range-${this.focusType.min}`]: true }, type: "range", name: this.name, min: this.min, max: this.max, step: this.step, value: value[0], required: this.required, disabled: this.disabled, "aria-label": this.ariaProps.label, part: "input-slider-min", style: style, onInput: this.handleRangeSliderChange('min'), onBlur: () => this.handleInputBlur('min'), onMouseDown: () => this.handleInputMouseDown('min'), onKeyUp: (event) => this.handleInputKeyUp(event, 'min'), onClick: event => {
          event.preventDefault();
          event.stopPropagation();
        }, title: "" }), h("input", { class: { slider: true, [`max-range-${this.focusType.max}`]: true }, type: "range", name: this.name, min: this.min, max: this.max, step: this.step, value: value[1], required: this.required, disabled: this.disabled, "aria-label": this.ariaProps.label, part: "input-slider-max", onInput: this.handleRangeSliderChange('max'), onBlur: () => this.handleInputBlur('max'), onMouseDown: () => this.handleInputMouseDown('max'), onKeyUp: (event) => this.handleInputKeyUp(event, 'max'), onClick: event => {
          event.preventDefault();
          event.stopPropagation();
        }, title: "" }))),
    }), this.marks && (h("div", { ref: el => (this.marksListRef = el), class: this.marksListCssClasses(), part: "marks-list" }, this.renderMarks()))), this.withInput && this.continuous && (h("div", { class: this.inputColumnCssClasses() }, this.renderEditableInput())))));
  }
  static get is() { return "wpp-slider"; }
  static get registryIs() { return "wpp-slider-v2-22-0"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["wpp-slider.scss"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["wpp-slider.css"]
    };
  }
  static get properties() {
    return {
      "name": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the slider name."
        },
        "attribute": "name",
        "reflect": false
      },
      "inputWidth": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "InputWidth",
          "resolved": "`${number}px`",
          "references": {
            "InputWidth": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-slider/types.tsx::InputWidth"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the width of the inputs in \"px\". Same width will apply to both inputs in the range slider.\nThe default value is \"68px\"."
        },
        "attribute": "input-width",
        "reflect": false,
        "defaultValue": "DEFAULT_INPUT_WIDTH"
      },
      "value": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "SliderValue",
          "resolved": "number | number[]",
          "references": {
            "SliderValue": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-slider/types.tsx::SliderValue"
            }
          }
        },
        "required": true,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the default slider value."
        },
        "attribute": "value",
        "reflect": true
      },
      "marks": {
        "type": "boolean",
        "mutable": false,
        "complexType": {
          "original": "MarkState[] | boolean",
          "resolved": "MarkState[] | boolean",
          "references": {
            "MarkState": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-slider/types.tsx::MarkState"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the marker values between which users can move the slider."
        },
        "attribute": "marks",
        "reflect": false,
        "defaultValue": "false"
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "SliderTypes",
          "resolved": "\"range\" | \"single\" | undefined",
          "references": {
            "SliderTypes": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-slider/types.tsx::SliderTypes"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the slider type."
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'single'"
      },
      "min": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the minimum allowed slider value."
        },
        "attribute": "min",
        "reflect": false,
        "defaultValue": "1"
      },
      "max": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the the maximum allowed slider value."
        },
        "attribute": "max",
        "reflect": false,
        "defaultValue": "100"
      },
      "step": {
        "type": "number",
        "mutable": false,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Defines the interval between slider markers."
        },
        "attribute": "step",
        "reflect": false,
        "defaultValue": "1"
      },
      "continuous": {
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
          "text": "If the slider is continuous."
        },
        "attribute": "continuous",
        "reflect": false,
        "defaultValue": "false"
      },
      "required": {
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
          "text": "If the slider is required."
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "disabled": {
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
          "text": "If the slider is disabled."
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "withInput": {
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
          "text": "If the slider has an input field that allows users to enter a value for the slider to display."
        },
        "attribute": "with-input",
        "reflect": false,
        "defaultValue": "false"
      },
      "withValue": {
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
          "text": "If the slider displays its current value."
        },
        "attribute": "with-value",
        "reflect": false,
        "defaultValue": "false"
      },
      "ariaProps": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "AriaProps",
          "resolved": "AriaProps",
          "references": {
            "AriaProps": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::AriaProps"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Contains the slider `aria-` props."
        },
        "defaultValue": "{}"
      },
      "labelTooltipConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DropdownConfig",
          "resolved": "DropdownConfig",
          "references": {
            "DropdownConfig": {
              "location": "import",
              "path": "../../types/common",
              "id": "src/types/common.ts::DropdownConfig"
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Tooltip config for label, under the hood tooltip using tippy.js,\nall information about this library and available props you can see via this link `https://atomiks.github.io/tippyjs/v6/all-props/`"
        },
        "defaultValue": "{\n    popperOptions: { strategy: 'fixed' },\n  }"
      },
      "labelConfig": {
        "type": "unknown",
        "mutable": true,
        "complexType": {
          "original": "SliderLabelConfig",
          "resolved": "LabelConfig | undefined",
          "references": {
            "SliderLabelConfig": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-slider/types.tsx::SliderLabelConfig"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Indicates label config"
        }
      },
      "size": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'s' | 'm'",
          "resolved": "\"m\" | \"s\" | undefined",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the size of the slider."
        },
        "attribute": "size",
        "reflect": false,
        "defaultValue": "'m'"
      },
      "maskOptions": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "DecimalMaskOptions | DecimalMaskOptions[]",
          "resolved": "DecimalMaskOptions | DecimalMaskOptions[] | undefined",
          "references": {
            "DecimalMaskOptions": {
              "location": "import",
              "path": "../wpp-input/types",
              "id": "src/components/wpp-input/types.ts::DecimalMaskOptions"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "Defines the mask options for the inputs."
        },
        "defaultValue": "undefined"
      }
    };
  }
  static get states() {
    return {
      "tooltipTexts": {},
      "displayMarks": {},
      "inputValue": {},
      "focusType": {}
    };
  }
  static get events() {
    return [{
        "method": "wppChange",
        "name": "wppChange",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the slider value changes."
        },
        "complexType": {
          "original": "SliderChangeEventDetail",
          "resolved": "BaseFormControlEventDetail<SliderValue> & { name?: string | undefined; }",
          "references": {
            "SliderChangeEventDetail": {
              "location": "import",
              "path": "./types",
              "id": "src/components/wpp-slider/types.tsx::SliderChangeEventDetail"
            }
          }
        }
      }, {
        "method": "wppFocus",
        "name": "wppFocus",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the slider is in focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }, {
        "method": "wppBlur",
        "name": "wppBlur",
        "bubbles": false,
        "cancelable": true,
        "composed": false,
        "docs": {
          "tags": [],
          "text": "Emitted when the slider loses focus."
        },
        "complexType": {
          "original": "FocusEvent",
          "resolved": "FocusEvent",
          "references": {
            "FocusEvent": {
              "location": "global",
              "id": "global::FocusEvent"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "setFocus": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "Sets focus on native input",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "host"; }
  static get watchers() {
    return [{
        "propName": "min",
        "methodName": "onUpdateMinValue"
      }, {
        "propName": "max",
        "methodName": "onUpdateMaxValue"
      }, {
        "propName": "step",
        "methodName": "onUpdateStepValue"
      }, {
        "propName": "inputValue",
        "methodName": "onUpdateInputValue"
      }];
  }
}
