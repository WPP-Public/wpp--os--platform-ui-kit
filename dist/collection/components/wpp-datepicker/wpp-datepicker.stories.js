import { html } from 'lit-html';
import { generatePreset } from './utils';
import { DAYS, DAYS_MIN, DAYS_SHORT, MONTHS, MONTHS_SHORT } from './const';
export default {
  title: 'Design System/Components/Selection and input/Datepicker',
  parameters: {
    previewTabs: {
      'storybook/docs/panel': {
        hidden: true,
      },
    },
  },
  argTypes: {
    range: { control: { type: 'boolean' } },
    static: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    size: {
      options: ['m', 's'],
      control: { type: 'select' },
    },
    view: {
      options: ['days', 'months', 'years'],
      control: { type: 'select' },
    },
    messageType: {
      options: ['null', 'warning', 'error'],
      control: { type: 'select' },
    },
    message: { type: 'string' },
    toggleSelected: { type: 'boolean' },
    maxDate: { options: ['November 2025', 'December 2025', 'May 2026'], control: { type: 'select' } },
    minDate: { options: ['November 2024', 'March 2025', 'June 2025'], control: { type: 'select' } },
  },
};
export const Single = {
  render: args => {
    if (!args.view) {
      args.view = 'days';
    }
    return html `<wpp-datepicker-v3-5-0
      .range=${args.range}
      .messageType="${args.messageType}"
      .message="${args.message}"
      .static=${args.static}
      .size="${args.size}"
      .placeholder=${args.placeholder}
      .name="${args.name}"
      .required="${args.required}"
      .disabled="${args.disabled}"
      .labelConfig="${args.labelConfig}"
      .locales="${args.locales}"
      .toggleSelected="${args.toggleSelected}"
      .view="${args.view}"
      @wppDateClear="${(e) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e) => console.log('wppChange', e.detail)}"
    ></wpp-datepicker-v3-5-0>`;
  },
  args: {
    range: false,
    static: false,
    size: 'm',
    view: 'days',
    required: true,
    disabled: false,
    placeholder: '',
    message: '',
    name: 'datepicker',
    locales: {
      days: DAYS,
      daysShort: DAYS_SHORT,
      daysMin: DAYS_MIN,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0,
      dateLocale: 'en-US',
    },
    labelConfig: {
      icon: '',
      text: '',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    toggleSelected: true,
  },
};
Single.parameters = {
  controls: { exclude: ['range', 'minDate', 'maxDate'] },
};
export const Range = {
  render: args => html `<wpp-datepicker-v3-5-0
      .range=${args.range}
      .messageType="${args.messageType}"
      .message="${args.message}"
      .static=${args.static}
      .size="${args.size}"
      .placeholder=${args.placeholder}
      .name="${args.name}"
      .required="${args.required}"
      .disabled="${args.disabled}"
      .labelConfig="${args.labelConfig}"
      .locales="${args.locales}"
      .toggleSelected="${args.toggleSelected}"
      @wppDateClear="${(e) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e) => console.log('wppChange', e.detail)}"
    ></wpp-datepicker-v3-5-0>`,
  args: {
    range: true,
    static: false,
    size: 'm',
    required: true,
    disabled: false,
    placeholder: '',
    message: '',
    name: 'datepicker',
    locales: {
      days: DAYS,
      daysShort: DAYS_SHORT,
      daysMin: DAYS_MIN,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0,
      dateLocale: 'en-US',
    },
    labelConfig: {
      icon: '',
      text: '',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    toggleSelected: true,
  },
};
Range.parameters = {
  controls: { exclude: ['range', 'minDate', 'maxDate'] },
};
export const RangeWithPresets = {
  render: args => html `<wpp-datepicker-v3-5-0
      .range=${args.range}
      .messageType="${args.messageType}"
      .message="${args.message}"
      .static=${args.static}
      .size="${args.size}"
      .placeholder=${args.placeholder}
      .name="${args.name}"
      .required="${args.required}"
      .disabled="${args.disabled}"
      .labelConfig="${args.labelConfig}"
      .presets="${args.presets}"
      .locales="${args.locales}"
      .value="${args.value}"
      .toggleSelected="${args.toggleSelected}"
      @wppDateClear="${(e) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e) => console.log('wppChange', e.detail)}"
    ></wpp-datepicker-v3-5-0>`,
  args: {
    range: true,
    static: false,
    size: 'm',
    required: true,
    disabled: false,
    placeholder: '',
    message: '',
    name: 'datepicker',
    locales: {
      days: DAYS,
      daysShort: DAYS_SHORT,
      daysMin: DAYS_MIN,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0,
      dateLocale: 'en-US',
    },
    presets: [generatePreset(7), generatePreset(14), generatePreset(30), generatePreset(90)],
    value: generatePreset(3).value,
    labelConfig: {
      icon: '',
      text: '',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    toggleSelected: true,
  },
};
RangeWithPresets.parameters = {
  controls: { exclude: ['range', 'minDate', 'maxDate'] },
};
export const DependableDatepickers = {
  render: args => {
    if (!args.view) {
      args.view = 'days';
    }
    let sharedValue = null;
    const handleDateChange = (e) => {
      sharedValue = e.detail.formattedDate;
      const secondDatepicker = document.querySelector('#second-datepicker');
      if (secondDatepicker) {
        secondDatepicker.value = sharedValue;
      }
    };
    return html `
      <div>
        <wpp-datepicker-v3-5-0
          style="margin-right: 40px;"
          .range=${args.range}
          .messageType="${args.messageType}"
          .message="${args.message}"
          .static=${args.static}
          .size="${args.size}"
          .placeholder=${args.placeholder}
          .name="${args.name}"
          .required="${args.required}"
          .disabled="${args.disabled}"
          .labelConfig="${args.labelConfig}"
          .locale="${args.locale}"
          .toggleSelected="${args.toggleSelected}"
          .view="${args.view}"
          @wppDateClear="${(e) => console.log('wppDateClear', e.detail)}"
          @wppChange="${handleDateChange}"
        ></wpp-datepicker-v3-5-0>

        <wpp-datepicker-v3-5-0
          id="second-datepicker"
          .range=${args.range}
          .messageType="${args.messageType}"
          .message="${args.message}"
          .static=${args.static}
          .size="${args.size}"
          .placeholder="Second Datepicker"
          .name="second-datepicker"
          .required="${args.required}"
          .disabled="${args.disabled}"
          .labelConfig="${args.labelConfig}"
          .locales="${args.locales}"
          .toggleSelected="${args.toggleSelected}"
          .view="${args.view}"
        ></wpp-datepicker-v3-5-0>
      </div>
    `;
  },
  args: {
    range: false,
    static: false,
    size: 'm',
    view: 'days',
    required: true,
    disabled: false,
    placeholder: '',
    message: '',
    name: 'datepicker',
    locales: {
      days: DAYS,
      daysShort: DAYS_SHORT,
      daysMin: DAYS_MIN,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'MM/dd/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0,
      dateLocale: 'en-US',
    },
    labelConfig: {
      icon: '',
      text: '',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    toggleSelected: true,
  },
};
DependableDatepickers.parameters = {
  controls: { exclude: ['range', 'locale', 'minDate', 'maxDate'] },
};
export const MonthsView = {
  render: args => html `<wpp-datepicker-v3-5-0
      .range=${args.range}
      .messageType=${args.messageType}
      .size="${args.size}"
      .message="${args.message}"
      .view="${'months'}"
      .placeholder=${args.placeholder}
      .name="${args.name}"
      .required="${args.required}"
      .disabled="${args.disabled}"
      .labelConfig="${args.labelConfig}"
      .value="${args.value}"
      .toggleSelected="${args.toggleSelected}"
      .locales="${args.locales}"
      .minDate="${args.minDate}"
      .maxDate="${args.maxDate}"
      .width=${args.width}
      @wppDateClear="${(e) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e) => console.log('wppChange', e.detail)}"
    ></wpp-datepicker-v3-5-0>`,
  args: {
    range: true,
    size: 'm',
    required: true,
    disabled: false,
    placeholder: '',
    message: '',
    name: 'datepicker',
    value: ['May 2025', 'June 2025'],
    locales: {
      dateFormat: 'MMMM yyyy',
    },
    labelConfig: {
      icon: '',
      text: 'Range datepicker in `months` view, with custom `dateFormat`, limits and width="320px"',
      description: '',
      locales: {
        optional: 'Optional',
      },
    },
    maxDate: 'November 2025',
    minDate: 'November 2024',
    toggleSelected: true,
    width: '320px',
  },
};
MonthsView.parameters = {
  controls: { exclude: ['range', 'view', 'static'] },
};
export const ButtonTrigger = {
  render: args => {
    if (!args.view) {
      args.view = 'days';
    }
    return html `<wpp-datepicker-v3-5-0
      .range=${args.range}
      .size="${args.size}"
      .name="${args.name}"
      .disabled="${args.disabled}"
      .locale="${args.locale}"
      .toggleSelected="${args.toggleSelected}"
      .view="${args.view}"
      .minDate="${args.minDate}"
      .maxDate="${args.maxDate}"
      @wppDateClear="${(e) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e) => console.log('wppChange', e.detail)}"
    >
      <wpp-button-v3-5-0 slot="trigger" ?disabled="${args.disabled}">Button</wpp-button-v3-5-0>
    </wpp-datepicker-v3-5-0>`;
  },
  args: {
    range: false,
    size: 'm',
    view: 'days',
    disabled: false,
    name: 'datepicker',
    locale: {
      days: DAYS,
      daysShort: DAYS_SHORT,
      daysMin: DAYS_MIN,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0,
      dateLocale: 'en-US',
    },
    toggleSelected: true,
  },
};
ButtonTrigger.parameters = {
  controls: {
    exclude: [
      'minDate',
      'maxDate',
      'range',
      'static',
      'message',
      'messageType',
      'placeholder',
      'required',
      'labelConfig',
    ],
  },
};
export const ButtonTriggerWithActionButton = {
  render: args => {
    if (!args.view) {
      args.view = 'days';
    }
    return html `<wpp-datepicker-v3-5-0
      .range=${args.range}
      .size="${args.size}"
      .name="${args.name}"
      .disabled="${args.disabled}"
      .locale="${args.locale}"
      .toggleSelected="${args.toggleSelected}"
      .view="${args.view}"
      .minDate="${args.minDate}"
      .maxDate="${args.maxDate}"
      @wppDateClear="${(e) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e) => console.log('wppChange', e.detail)}"
    >
      <wpp-action-button-v3-5-0 slot="trigger" ?disabled="${args.disabled}">
        <wpp-icon-calendar-v3-5-0 slot="icon-start"></wpp-icon-calendar-v3-5-0>
      </wpp-action-button-v3-5-0>
    </wpp-datepicker-v3-5-0>`;
  },
  args: {
    range: false,
    size: 'm',
    view: 'days',
    disabled: false,
    name: 'datepicker',
    locale: {
      days: DAYS,
      daysShort: DAYS_SHORT,
      daysMin: DAYS_MIN,
      months: MONTHS,
      monthsShort: MONTHS_SHORT,
      today: 'Today',
      clear: 'Clear',
      dateFormat: 'dd/MM/yyyy',
      timeFormat: 'hh:mm aa',
      firstDay: 0,
      dateLocale: 'en-US',
    },
    toggleSelected: true,
  },
};
ButtonTriggerWithActionButton.parameters = {
  controls: {
    exclude: [
      'minDate',
      'maxDate',
      'range',
      'static',
      'message',
      'messageType',
      'placeholder',
      'required',
      'labelConfig',
    ],
  },
};
