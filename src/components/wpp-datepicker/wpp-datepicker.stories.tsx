import { StoryObj, Meta } from '@storybook/web-components'
import { html } from 'lit-html'

import { Components } from '../../components'

import { generatePreset } from './utils'
import { DAYS, DAYS_MIN, DAYS_SHORT, MONTHS, MONTHS_SHORT } from './const'

type DatepickerWithLimits = Components.WppDatepicker & {
  min: string
  max: string
}

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
  },
} as Meta<DatepickerWithLimits>

export const Single: StoryObj<DatepickerWithLimits> = {
  render: args => {
    if (!args.view) {
      args.view = 'days'
    }

    return html`<wpp-datepicker-v3-2-0
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
      @wppDateClear="${(e: any) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e: any) => console.log('wppChange', e.detail)}"
    ></wpp-datepicker-v3-2-0>`
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
}

Single.parameters = {
  controls: { exclude: ['range'] },
}

export const Range: StoryObj<DatepickerWithLimits> = {
  render: args =>
    html`<wpp-datepicker-v3-2-0
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
      @wppDateClear="${(e: any) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e: any) => console.log('wppChange', e.detail)}"
    ></wpp-datepicker-v3-2-0>`,
  args: {
    range: true,
    static: false,
    size: 'm',
    required: true,
    disabled: false,
    placeholder: '',
    message: '',
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
}

Range.parameters = {
  controls: { exclude: ['range'] },
}

export const RangeWithPresets: StoryObj<DatepickerWithLimits> = {
  render: args =>
    html`<wpp-datepicker-v3-2-0
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
      .locale="${args.locale}"
      .value="${args.value}"
      .toggleSelected="${args.toggleSelected}"
      @wppDateClear="${(e: any) => console.log('wppDateClear', e.detail)}"
      @wppChange="${(e: any) => console.log('wppChange', e.detail)}"
    ></wpp-datepicker-v3-2-0>`,
  args: {
    range: true,
    static: false,
    size: 'm',
    required: true,
    disabled: false,
    placeholder: '',
    message: '',
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
}

RangeWithPresets.parameters = {
  controls: { exclude: ['range'] },
}

export const DependableDatepickers: StoryObj<DatepickerWithLimits> = {
  render: args => {
    if (!args.view) {
      args.view = 'days'
    }

    let sharedValue: any = null

    const handleDateChange = (e: any) => {
      sharedValue = e.detail.formattedDate
      const secondDatepicker = document.querySelector('#second-datepicker') as any

      if (secondDatepicker) {
        secondDatepicker.value = sharedValue
      }
    }

    return html`
      <div>
        <wpp-datepicker-v3-2-0
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
          @wppDateClear="${(e: any) => console.log('wppDateClear', e.detail)}"
          @wppChange="${handleDateChange}"
        ></wpp-datepicker-v3-2-0>

        <wpp-datepicker-v3-2-0
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
          .locale="${args.locale}"
          .toggleSelected="${args.toggleSelected}"
          .view="${args.view}"
        ></wpp-datepicker-v3-2-0>
      </div>
    `
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
    locale: {
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
}

DependableDatepickers.parameters = {
  controls: { exclude: ['range', 'locale'] },
}
